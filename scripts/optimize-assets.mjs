/**
 * Recomprime raster de la home (WebP) y reduce favicon.
 * Tras el primer uso, los orígenes son los propios .webp de src/assets/home/img.
 * Ejecutar: npm run optimize-assets
 */
import sharp from 'sharp';
import path from 'path';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const imgDir = path.join(root, 'src/assets/home/img');
const publicDir = path.join(root, 'public');

async function toWebpFromFile(inputPath, outputPath, { width, quality = 82 } = {}) {
  const buf = await fs.readFile(inputPath);
  let pipeline = sharp(buf).rotate();
  if (width) {
    pipeline = pipeline.resize(width, null, {
      withoutEnlargement: true,
      fit: 'inside',
    });
  }
  await pipeline.webp({ quality, effort: 4 }).toFile(outputPath);
  const meta = await sharp(outputPath).metadata();
  console.log(`OK ${path.relative(root, outputPath)} (${meta.width}×${meta.height})`);
}

async function faviconPng() {
  const out = path.join(publicDir, 'favicon.png');
  const buf = await fs.readFile(out);
  const small = await sharp(buf)
    .resize(32, 32, { fit: 'cover', position: 'attention' })
    .png({ compressionLevel: 9 })
    .toBuffer();
  await fs.writeFile(out, small);
  console.log('OK public/favicon.png (32×32)');
}

/** @type {{ file: string; width: number; quality?: number }[]} */
const images = [
  { file: 'hero-desktop.webp', width: 1920, quality: 80 },
  { file: 'hero-mobile.webp', width: 960, quality: 80 },
  { file: 'boda-servicios.webp', width: 900, quality: 78 },
  { file: 'concierto-servicios.webp', width: 900, quality: 78 },
  { file: 'corporativos-servicios.webp', width: 900, quality: 78 },
  { file: 'marca-servicios.webp', width: 900, quality: 78 },
  { file: 'nosotros.webp', width: 1100, quality: 80 },
];

await Promise.all(
  images.map(({ file, width, quality }) =>
    toWebpFromFile(path.join(imgDir, file), path.join(imgDir, file), { width, quality }),
  ),
);
await faviconPng();
console.log('Done.');
