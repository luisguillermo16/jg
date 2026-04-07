/**
 * convert-services.mjs
 * Convierte las imágenes PNG de servicios a WebP de alta calidad.
 * Las PNGs originales son ~900 KB cada una — WebP las deja en ~80-150 KB.
 * 
 * Uso: node convert-services.mjs
 */

import sharp from 'sharp';
import { readdirSync, statSync } from 'fs';
import { join, basename, extname } from 'path';

const dir = './src/assets/home/icons';
const files = readdirSync(dir).filter(f => f.endsWith('.png'));

console.log(`\n🖼  Convirtiendo ${files.length} imágenes PNG → WebP...\n`);

for (const file of files) {
  const input = join(dir, file);
  const outputName = basename(file, extname(file)) + '.webp';
  const output = join(dir, outputName);
  const origSize = statSync(input).size;

  await sharp(input)
    .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 85, effort: 4 })
    .toFile(output);

  const compSize = statSync(output).size;
  const pct = Math.round((1 - compSize / origSize) * 100);
  console.log(`✓ ${file} → ${outputName}: ${Math.round(origSize/1024)}KB → ${Math.round(compSize/1024)}KB (${pct}% smaller)`);
}

console.log('\n✅ Listo! Actualiza las importaciones en homeData.ts para usar .webp\n');
