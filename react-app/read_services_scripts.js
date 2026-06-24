import fs from 'fs';

const html = fs.readFileSync('c:/Users/vrund/Downloads/drawingboard/services/index.html', 'utf-8');
const regex = /<script([^>]*)>([\s\S]*?)<\/script>/gi;
let m;
while ((m = regex.exec(html)) !== null) {
  const attrs = m[1];
  const code = m[2];
  if (attrs.includes('data-clone-slider') || attrs.includes('data-clone-gallery-lightbox') || attrs.includes('data-clone-marquee')) {
    console.log(`=== Script ${attrs} ===`);
    console.log(code);
  }
}
