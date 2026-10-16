import { readdir, readFile, stat } from 'node:fs/promises';
import { join, dirname, resolve } from 'node:path';

const root = resolve('dist');
const html = [];
async function walk(dir) {
  for (const name of await readdir(dir)) {
    const path = join(dir, name);
    (await stat(path)).isDirectory() ? await walk(path) : name.endsWith('.html') && html.push(path);
  }
}
await walk(root);
const broken = [];
for (const file of html) {
  const body = await readFile(file, 'utf8');
  for (const [, href] of body.matchAll(/href="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:|#)/.test(href)) continue;
    const clean = href.split(/[?#]/)[0];
    const target = clean.startsWith('/') ? join(root, clean) : resolve(dirname(file), clean);
    const candidates = clean.endsWith('/') ? [join(target, 'index.html')] : [target, `${target}.html`, join(target, 'index.html')];
    let found = false;
    for (const candidate of candidates) { try { if ((await stat(candidate)).isFile()) found = true; } catch {} }
    if (!found) broken.push(`${file.replace(root, '')} -> ${href}`);
  }
}
if (broken.length) { console.error(`Links internos quebrados:\n${broken.join('\n')}`); process.exit(1); }
console.log(`${html.length} páginas HTML verificadas; nenhum link interno quebrado.`);
