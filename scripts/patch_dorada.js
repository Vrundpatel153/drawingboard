const fs = require('fs');
const path = require('path');
const sharp = require('../react-app/node_modules/sharp');

async function patch() {
  const imgPath = path.join(__dirname, '../react-app/public/images/dorada/dorada_02.png');
  const backupPath = path.join(__dirname, '../react-app/public/images/dorada/dorada_02_orig.png');

  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(imgPath, backupPath);
  }

  // Sample blue color from original
  const { data, info } = await sharp(backupPath).raw().toBuffer({ resolveWithObject: true });
  const { width, channels } = info;
  let sampleBlue = '#0066FF';
  for (let y = 321; y <= 338; y++) {
    for (let x = 475; x <= 624; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      if (b > 200 && r < 50) {
        sampleBlue = `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
        break;
      }
    }
  }
  console.log('Sampled Blue:', sampleBlue);

  // SVG overlay to cover "© 2025 Daybreak Design" and replace with "© 2025 The Drawing Board"
  const svgOverlay = Buffer.from(`
    <svg width="1400" height="415" xmlns="http://www.w3.org/2000/svg">
      <rect x="400" y="315" width="400" height="35" fill="black" />
      <text x="403" y="334" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="16.5" font-weight="400" fill="#ffffff" letter-spacing="-0.2px">
        &#169; 2025 <tspan fill="${sampleBlue}" font-weight="500">The Drawing Board</tspan>
      </text>
    </svg>
  `);

  await sharp(backupPath)
    .composite([{ input: svgOverlay, blend: 'over' }])
    .toFile(imgPath);

  console.log('Successfully patched dorada_02.png');
}

patch().catch(console.error);
