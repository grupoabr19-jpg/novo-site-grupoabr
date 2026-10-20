import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const sourceDirectory = path.join(root, 'imagens novas de produtos', 'blog');
const outputDirectory = path.join(root, 'public', 'images', 'blog');
const manifestPath = path.join(root, 'src', 'data', 'blog-images.json');
const articles = JSON.parse(await readFile(path.join(root, 'src', 'data', 'articles.json'), 'utf8'));
const files = (await readdir(sourceDirectory)).sort((a, b) => {
  const aCopy = a.toLowerCase().includes(' copiar.');
  const bCopy = b.toLowerCase().includes(' copiar.');
  return Number(aCopy) - Number(bCopy) || a.localeCompare(b, 'pt-BR');
});

const sources = new Map();
for (const file of files) {
  const match = file.match(/^ABR_Blog_(\d{3})_(.+?)\.jpg(?:\.jpg| copiar\.jpg)?$/i);
  if (!match || sources.has(match[2])) continue;
  sources.set(match[2], { file, number: Number(match[1]) });
}

await mkdir(outputDirectory, { recursive: true });
const imported = [];
const missing = [];

for (const article of articles) {
  const source = sources.get(article.slug);
  if (!source) {
    missing.push({ number: articles.indexOf(article) + 1, slug: article.slug, title: article.title });
    continue;
  }

  await sharp(path.join(sourceDirectory, source.file))
    .rotate()
    .resize(1440, 810, { fit: 'cover', position: 'centre', withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toFile(path.join(outputDirectory, `${article.slug}.webp`));

  imported.push(article.slug);
}

await writeFile(manifestPath, `${JSON.stringify(imported, null, 2)}\n`, 'utf8');

console.log(`${imported.length} imagens importadas para public/images/blog.`);
if (missing.length) {
  console.log('Artigos sem imagem:');
  missing.forEach(item => console.log(`${String(item.number).padStart(3, '0')} — ${item.title}`));
}
