const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, '../public');
const MAX_WIDTH = 1920;
const QUALITY = 80;

async function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      await processDirectory(filePath);
    } else if (/\.(webp|jpg|jpeg|png)$/i.test(file)) {
      // Only process files larger than 300KB
      if (stat.size > 300 * 1024) {
        console.log(`Processing: ${file} (Size: ${(stat.size / 1024 / 1024).toFixed(2)} MB)`);
        
        const tempPath = filePath + '.tmp';
        
        try {
          const buffer = fs.readFileSync(filePath);
          const image = sharp(buffer);
          const metadata = await image.metadata();
          
          let pipeline = image;
          if (metadata.width > MAX_WIDTH) {
            pipeline = pipeline.resize(MAX_WIDTH);
          }
          
          if (/\.webp$/i.test(file)) {
            pipeline = pipeline.webp({ quality: QUALITY, effort: 6 });
          } else if (/\.jpe?g$/i.test(file)) {
            pipeline = pipeline.jpeg({ quality: QUALITY, progressive: true });
          } else if (/\.png$/i.test(file)) {
            pipeline = pipeline.png({ quality: QUALITY, compressionLevel: 8 });
          }

          await pipeline.toFile(tempPath);
          fs.renameSync(tempPath, filePath);
          
          const newStat = fs.statSync(filePath);
          console.log(`✅ Saved ${file} (New Size: ${(newStat.size / 1024 / 1024).toFixed(2)} MB)`);
        } catch (err) {
          console.error(`❌ Failed to process ${file}:`, err);
          if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        }
      }
    }
  }
}

async function main() {
  console.log('Starting image compression...');
  await processDirectory(publicDir);
  console.log('Done!');
}

main().catch(console.error);
