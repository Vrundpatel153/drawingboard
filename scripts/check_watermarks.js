const sharp = require('../react-app/node_modules/sharp');
const fs = require('fs');
const path = require('path');

async function checkAll() {
  for (let i = 1; i <= 15; i++) {
    const num = String(i).padStart(2, '0');
    const ext = (i <= 2) ? 'jpg' : 'png';
    const file = path.join(__dirname, `../react-app/public/images/rustic-cafe/rustic_cafe_${num}.${ext}`);
    if (!fs.existsSync(file)) continue;
    const meta = await sharp(file).metadata();
    const { width, height } = meta;
    const { data } = await sharp(file).raw().toBuffer({ resolveWithObject: true });
    const channels = data.length / (width * height);
    let whitePixels = 0;
    for (let y = height - 120; y < height; y++) {
      for (let x = 0; x < 200; x++) {
        const idx = Math.floor((y * width + x) * channels);
        if (data[idx] > 200 && data[idx+1] > 200 && data[idx+2] > 200) {
          whitePixels++;
        }
      }
    }
    console.log(`rustic_cafe_${num}.${ext} (${width}x${height}): ${whitePixels} white pixels`);
  }
}

checkAll();
