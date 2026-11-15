const fs = require('fs');
const path = require('path');
const pdfjs = require('../react-app/node_modules/pdfjs-dist/legacy/build/pdf.js');
const { createCanvas } = require('../react-app/node_modules/canvas');

const pdfPath = path.resolve(__dirname, '../orient developer casestudy.pdf');
const outDir = path.resolve(__dirname, '../react-app/public/images/orient-developers');
const distDir = path.resolve(__dirname, '../react-app/dist/images/orient-developers');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

async function renderPages() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjs.getDocument({ data }).promise;
  console.log(`Rendering ${doc.numPages} pages from PDF...`);

  for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
    const page = await doc.getPage(pageNum);
    const viewport = page.getViewport({ scale: 2.0 }); // 2x scale for crisp retina fidelity
    const canvas = createCanvas(viewport.width, viewport.height);
    const ctx = canvas.getContext('2d');

    await page.render({
      canvasContext: ctx,
      viewport: viewport
    }).promise;

    const filename = `orient_page_${String(pageNum).padStart(2, '0')}.jpg`;
    const outPath = path.join(outDir, filename);
    const distPath = path.join(distDir, filename);

    const buf = canvas.toBuffer('image/jpeg', { quality: 0.95 });
    fs.writeFileSync(outPath, buf);
    fs.writeFileSync(distPath, buf);
    console.log(`Rendered Page ${pageNum}: ${filename} (${viewport.width}x${viewport.height}, ${(buf.length / 1024).toFixed(1)} KB)`);
  }

  console.log('All PDF pages rendered to high-resolution JPEG images!');
}

renderPages().catch(console.error);
