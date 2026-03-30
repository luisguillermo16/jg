import sharp from 'sharp';
import { readdirSync, statSync, renameSync, unlinkSync } from 'fs';
import { join } from 'path';

sharp.cache(false);

const dir = './src/assets/galeria';
const files = readdirSync(dir).filter(f => f.endsWith('.jpg') && !f.startsWith('opt_'));

console.log(`Compressing ${files.length} images...`);

for (const file of files) {
  const input = join(dir, file);
  const output = join(dir, 'opt_' + file);
  const origSize = statSync(input).size;

  await sharp(input)
    .resize(1400, 1050, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 80, progressive: true, mozjpeg: true })
    .toFile(output);

  const compSize = statSync(output).size;
  console.log(`✓ ${file}: ${Math.round(origSize/1024)}KB → ${Math.round(compSize/1024)}KB (${Math.round((1-compSize/origSize)*100)}% smaller)`);
  
  // Replace original with compressed
  unlinkSync(input);
  renameSync(output, input);
}

console.log('\nAll images optimized!');
