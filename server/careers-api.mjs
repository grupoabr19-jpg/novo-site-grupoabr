import express from 'express';
import multer from 'multer';
import { google } from 'googleapis';
import { Readable } from 'node:stream';
import path from 'node:path';
import crypto from 'node:crypto';

const app = express();
const port = Number(process.env.PORT || 10000);
const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID || '';
const spreadsheetId = process.env.GOOGLE_SHEETS_ID || '';
const allowedOrigins = new Set((process.env.ALLOWED_ORIGINS || 'https://grupoabr.com.br,https://www.grupoabr.com.br,http://localhost:4321,http://127.0.0.1:4321').split(',').map(value => value.trim()).filter(Boolean));
const maxFileBytes = Number(process.env.MAX_FILE_BYTES || 5 * 1024 * 1024);
const rateWindowMs = 15 * 60 * 1000;
const rateLimit = 8;
const attempts = new Map();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: maxFileBytes, files: 1, fields: 12 },
});

const headers = [
  ['X-Content-Type-Options', 'nosniff'],
  ['X-Frame-Options', 'DENY'],
  ['Referrer-Policy', 'no-referrer'],
  ['Permissions-Policy', 'camera=(), microphone=(), geolocation=()'],
];

app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use((req, res, next) => {
  headers.forEach(([name, value]) => res.setHeader(name, value));
  const origin = req.get('origin');
  if (origin && allowedOrigins.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
  if (req.method === 'OPTIONS') return origin && allowedOrigins.has(origin) ? res.sendStatus(204) : res.sendStatus(403);
  next();
});

function credentials() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON não configurado');
  const parsed = JSON.parse(raw);
  if (parsed.private_key) parsed.private_key = parsed.private_key.replace(/\\n/g, '\n');
  return parsed;
}

function clients() {
  if (!folderId || !spreadsheetId) throw new Error('IDs do Drive ou da planilha não configurados');
  const auth = new google.auth.GoogleAuth({
    credentials: credentials(),
    scopes: ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/spreadsheets'],
  });
  return {
    drive: google.drive({ version: 'v3', auth }),
    sheets: google.sheets({ version: 'v4', auth }),
  };
}

function clean(value, max = 160) {
  return String(value || '').replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
}

function slug(value) {
  return clean(value, 100).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'sem-identificacao';
}

function splitList(value) {
  return String(value || '').split('|').map(item => clean(item, 220)).filter(Boolean);
}

function activeJobs(rows) {
  return rows
    .filter(row => clean(row[11]).toLowerCase() === 'ativa')
    .map(row => ({
      id: clean(row[0], 80), title: clean(row[1]), area: clean(row[2]), location: clean(row[3]), type: clean(row[4]),
      summary: clean(row[5], 500), requirements: splitList(row[6]), responsibilities: splitList(row[7]), benefits: splitList(row[8]),
      publishedAt: clean(row[9], 30), closingAt: clean(row[10], 30), order: Number(row[12]) || 9999,
    }))
    .filter(job => job.id && job.title && job.location && job.summary)
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title, 'pt-BR'));
}

async function publicVacancyRows() {
  if (!spreadsheetId) throw new Error('ID da planilha não configurado');
  const url = `https://docs.google.com/spreadsheets/d/${encodeURIComponent(spreadsheetId)}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent('Vagas')}`;
  const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
  if (!response.ok) throw new Error(`Planilha pública indisponível (${response.status})`);

  const body = await response.text();
  const start = body.indexOf('{');
  const end = body.lastIndexOf('}');
  if (start < 0 || end <= start) throw new Error('Resposta inválida da planilha pública');

  const payload = JSON.parse(body.slice(start, end + 1));
  if (payload.status !== 'ok' || !payload.table?.rows) throw new Error('A planilha pública retornou um erro');
  return payload.table.rows.map(row => (row.c || []).map(cell => cell?.f ?? cell?.v ?? ''));
}

async function vacancyRows() {
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    try {
      const { sheets } = clients();
      const response = await sheets.spreadsheets.values.get({ spreadsheetId, range: 'Vagas!A2:M1000' });
      return response.data.values || [];
    } catch (error) {
      console.warn('Leitura autenticada das vagas falhou; tentando planilha pública:', error.message);
    }
  }
  return publicVacancyRows();
}

function detectFile(file) {
  const ext = path.extname(file.originalname || '').toLowerCase();
  const data = file.buffer;
  const starts = (...bytes) => bytes.every((byte, index) => data[index] === byte);
  const signatures = {
    '.pdf': starts(0x25, 0x50, 0x44, 0x46),
    '.png': starts(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a),
    '.jpg': starts(0xff, 0xd8, 0xff),
    '.jpeg': starts(0xff, 0xd8, 0xff),
    '.webp': data.length > 12 && data.subarray(0, 4).toString() === 'RIFF' && data.subarray(8, 12).toString() === 'WEBP',
    '.doc': starts(0xd0, 0xcf, 0x11, 0xe0),
    '.docx': starts(0x50, 0x4b, 0x03, 0x04) || starts(0x50, 0x4b, 0x05, 0x06),
    '.txt': file.mimetype === 'text/plain' && !data.includes(0),
  };
  if (!Object.prototype.hasOwnProperty.call(signatures, ext) || !signatures[ext]) return null;
  const mime = { '.pdf': 'application/pdf', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.doc': 'application/msword', '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', '.txt': 'text/plain' }[ext];
  return { ext: ext === '.jpeg' ? '.jpg' : ext, mime };
}

function checkRate(req) {
  const now = Date.now();
  const key = req.ip || req.socket.remoteAddress || 'unknown';
  const current = attempts.get(key) || { count: 0, reset: now + rateWindowMs };
  if (now > current.reset) Object.assign(current, { count: 0, reset: now + rateWindowMs });
  current.count += 1;
  attempts.set(key, current);
  return current.count <= rateLimit;
}

async function ensureFolderIsPrivate(drive) {
  const response = await drive.permissions.list({ fileId: folderId, fields: 'permissions(id,type,role,allowFileDiscovery)' });
  if ((response.data.permissions || []).some(permission => permission.type === 'anyone')) {
    const error = new Error('A pasta de currículos ainda está pública por link. Restrinja o acesso antes de receber dados pessoais.');
    error.code = 'PUBLIC_FOLDER';
    throw error;
  }
}

app.get('/health', (_req, res) => {
  const configured = Boolean(process.env.GOOGLE_SERVICE_ACCOUNT_JSON && folderId && spreadsheetId);
  res.json({ ok: true, integrationConfigured: configured });
});

app.get('/api/vagas', async (_req, res) => {
  try {
    const rows = await vacancyRows();
    res.setHeader('Cache-Control', 'public, max-age=120, stale-while-revalidate=600');
    res.json({ jobs: activeJobs(rows) });
  } catch (error) {
    console.error('Falha ao carregar vagas:', error.message);
    res.status(503).json({ error: 'As vagas não puderam ser carregadas agora.' });
  }
});

app.post('/api/candidaturas', upload.single('curriculo'), async (req, res) => {
  let uploadedFileId;
  try {
    if (!checkRate(req)) return res.status(429).json({ error: 'Muitas tentativas. Aguarde alguns minutos e tente novamente.' });
    if (clean(req.body.website)) return res.status(204).end();

    const name = clean(req.body.nome, 120);
    const phone = clean(req.body.telefone, 30);
    const email = clean(req.body.email, 160);
    const city = clean(req.body.cidade, 100);
    const jobId = clean(req.body.vagaId, 80) || 'banco-de-talentos';
    let jobTitle = 'Banco de talentos';
    const consent = clean(req.body.consentimento, 10) === 'sim';
    const fileType = req.file && detectFile(req.file);

    if (!name || name.length < 3 || !phone || phone.replace(/\D/g, '').length < 10 || !consent || !req.file || !fileType) {
      return res.status(400).json({ error: 'Revise os dados e envie um currículo válido nos formatos informados.' });
    }

    const { drive, sheets } = clients();
    await ensureFolderIsPrivate(drive);
    if (jobId !== 'banco-de-talentos') {
      const selectedJob = activeJobs(await vacancyRows()).find(job => job.id === jobId);
      if (!selectedJob) return res.status(400).json({ error: 'A vaga selecionada não está mais disponível. Escolha outra opção.' });
      jobTitle = selectedJob.title;
    }

    const now = new Date();
    const stamp = now.toISOString().replace(/T/, '_').replace(/:/g, '-').replace(/\.\d{3}Z$/, 'Z');
    const protocol = `ABR-${now.toISOString().slice(0, 10).replace(/-/g, '')}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
    const safeName = `${stamp}__${slug(name)}__${slug(jobId)}__${phone.replace(/\D/g, '').slice(-4)}${fileType.ext}`;
    const description = [`Protocolo: ${protocol}`, `Candidato: ${name}`, `Telefone: ${phone}`, email && `E-mail: ${email}`, city && `Cidade: ${city}`, `Vaga: ${jobTitle} (${jobId})`, `Recebido em: ${now.toISOString()}`, `Origem: grupoabr.com.br/trabalhe-conosco/`].filter(Boolean).join('\n');

    const uploaded = await drive.files.create({
      requestBody: { name: safeName, parents: [folderId], description },
      media: { mimeType: fileType.mime, body: Readable.from(req.file.buffer) },
      fields: 'id,name,webViewLink',
    });
    uploadedFileId = uploaded.data.id;

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Candidaturas!A:L',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: { values: [[protocol, now.toISOString(), jobId, jobTitle, name, phone, email, city, uploaded.data.name, uploaded.data.webViewLink || '', clean(req.file.originalname, 180), 'grupoabr.com.br/trabalhe-conosco/']] },
    });

    res.status(201).json({ ok: true, protocol });
  } catch (error) {
    if (uploadedFileId) {
      try { const { drive } = clients(); await drive.files.delete({ fileId: uploadedFileId }); } catch { /* evita currículo sem registro */ }
    }
    console.error('Falha ao receber candidatura:', error.message);
    if (error.code === 'PUBLIC_FOLDER') return res.status(503).json({ error: 'O canal de currículos está sendo preparado com acesso restrito. Tente novamente mais tarde.' });
    res.status(500).json({ error: 'Não foi possível enviar o currículo agora. Tente novamente mais tarde.' });
  }
});

app.use((error, _req, res, _next) => {
  if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') return res.status(413).json({ error: `O arquivo deve ter no máximo ${Math.round(maxFileBytes / 1024 / 1024)} MB.` });
  console.error('Erro não tratado:', error.message);
  res.status(400).json({ error: 'Não foi possível processar o envio.' });
});

const server = app.listen(port, '0.0.0.0', () => console.log(`Careers API listening on ${port}`));
process.on('SIGTERM', () => server.close(() => process.exit(0)));

export { activeJobs, clean, detectFile, slug };
