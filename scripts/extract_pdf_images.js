const fs = require('fs');
const path = require('path');

const buf = fs.readFileSync(path.resolve(__dirname, '../orient developer casestudy.pdf'));
const outDir = path.resolve(__dirname, '../react-app/public/images/orient-developers');
const distDir = path.resolve(__dirname, '../react-app/dist/images/orient-developers');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

let pos = 0;
let imgIndex = 0;
const extracted = [];

while ((pos = buf.indexOf(Buffer.from('/DCTDecode'), pos)) !== -1) {
  const streamStart = buf.indexOf(Buffer.from('stream'), pos);
  if (streamStart === -1) break;

  let dataStart = streamStart + 6;
  if (buf[dataStart] === 0x0D && buf[dataStart + 1] === 0x0A) dataStart += 2;
  else if (buf[dataStart] === 0x0A) dataStart += 1;

  const streamEnd = buf.indexOf(Buffer.from('endstream'), dataStart);
  if (streamEnd === -1) break;

  const imgBuf = buf.slice(dataStart, streamEnd);

  // Check if starts with JPEG SOI (0xFF, 0xD8)
  if (imgBuf[0] === 0xFF && imgBuf[1] === 0xD8) {
    // Only keep substantial images (> 20KB to ignore tiny icons/artifacts)
    if (imgBuf.length > 20000) {
      imgIndex++;
      const filename = `orient_${String(imgIndex).padStart(2, '0')}.jpg`;
      const outPath = path.join(outDir, filename);
      const distPath = path.join(distDir, filename);
      fs.writeFileSync(outPath, imgBuf);
      fs.writeFileSync(distPath, imgBuf);
      extracted.push({ index: imgIndex, sizeKB: (imgBuf.length / 1024).toFixed(1), path: outPath });
    }
  }

  pos = streamEnd + 9;
}

console.log(`Extracted ${extracted.length} high-resolution JPEG images from PDF:`);
console.log(extracted);
