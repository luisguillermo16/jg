import sharp from 'sharp';
import { readdirSync, statSync, existsSync } from 'fs';
import { join, basename, extname } from 'path';

const searchDirs = [
  './src/assets/brand',
  './src/assets/home/img',
  './src/assets/gallery'
];

console.log(`\n🚀 Iniciando Optimización de Imágenes...\n`);

for (const dir of searchDirs) {
  if (!existsSync(dir)) continue;

  const files = readdirSync(dir).filter(f => f.toLowerCase().endsWith('.png') || f.toLowerCase().endsWith('.jpg'));
  
  if (files.length === 0) continue;
  
  console.log(`📂 Procesando carpeta: ${dir} (${files.length} archivos)`);

  for (const file of files) {
    const input = join(dir, file);
    const ext = extname(file);
    const outputName = basename(file, ext) + '.webp';
    const output = join(dir, outputName);
    
    // Si ya existe el webp, saltar (o podrías forzar sobrescritura)
    if (existsSync(output)) {
       // console.log(`  - ${outputName} ya existe, saltando...`);
       // continue;
    }

    const origSize = statSync(input).size;

    try {
      await sharp(input)
        .webp({ quality: 82, effort: 6 })
        .toFile(output);

      const compSize = statSync(output).size;
      const pct = Math.round((1 - compSize / origSize) * 100);
      
      if (pct > 0) {
        console.log(`  ✓ ${file} → ${outputName}: ${Math.round(origSize/1024)}KB → ${Math.round(compSize/1024)}KB (-${pct}%)`);
      } else {
        console.log(`  ⚠ ${file}: no se pudo reducir el tamaño (se mantiene original)`);
      }
    } catch (err) {
      console.error(`  ❌ Error procesando ${file}: ${err.message}`);
    }
  }
}

console.log('\n✅ Optimización completada. Recuerda actualizar las rutas en el código si es necesario.\n');
