const path = require('path');
const fs = require('fs');
const sharp = require(path.resolve(__dirname, '../react-app/node_modules/sharp'));

function createDrawingBoardBadgeSvg(width, height, centerX, centerY, scale = 1.0) {
  const circleR = Math.round(28 * scale);
  const textX = Math.round(centerX - 80 * scale);
  const circleX = Math.round(textX - circleR - 10 * scale);
  const circleY = Math.round(centerY - 25 * scale);
  const brandY = Math.round(circleY + 6 * scale);
  const copyY = Math.round(centerY + 25 * scale);
  const brandFontSize = Math.round(18 * scale);
  const copyFontSize = Math.round(14 * scale);

  return Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="${Math.round(2 * scale)}" stdDeviation="${Math.round(3 * scale)}" flood-color="#000000" flood-opacity="0.5"/>
        </filter>
      </defs>

      <!-- White Circle with The Drawing Board Monogram -->
      <g filter="url(#shadow)">
        <circle cx="${circleX}" cy="${circleY}" r="${circleR}" fill="#ffffff" />
        <rect x="${circleX - Math.round(12 * scale)}" y="${circleY - Math.round(12 * scale)}" width="${Math.round(14 * scale)}" height="${Math.round(9 * scale)}" fill="#A19071" rx="1"/>
        <rect x="${circleX - Math.round(12 * scale)}" y="${circleY - Math.round(3 * scale)}" width="${Math.round(7 * scale)}" height="${Math.round(15 * scale)}" fill="#A19071" rx="1"/>
      </g>

      <!-- Brand Name: THE DRAWING BOARD -->
      <text x="${textX}" y="${brandY}" font-family="'Constantia', 'Playfair Display', Georgia, serif" font-size="${brandFontSize}" font-weight="700" fill="#ffffff" letter-spacing="0.1em" filter="url(#shadow)">THE DRAWING BOARD</text>

      <!-- Copyright Line -->
      <text x="${centerX}" y="${copyY}" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="${copyFontSize}" font-weight="500" fill="#ffffff" fill-opacity="0.95" letter-spacing="0.03em" filter="url(#shadow)">Copyright@2026,THE DRAWING BOARD. All Rights Reserved</text>
    </svg>
  `);
}

async function patchImageWatermark(filePath, options = {}) {
  const meta = await sharp(filePath).metadata();
  const { width, height } = meta;
  const scale = options.scale || (width / 1920);
  const patchW = options.patchW || Math.round(750 * scale);
  const patchH = options.patchH || Math.round(180 * scale);
  const centerX = options.centerX || Math.round(width / 2);
  const centerY = options.centerY || (height - Math.round(100 * scale));
  const patchLeft = Math.round(centerX - patchW / 2);
  const patchTop = Math.round(centerY - patchH / 2);

  // Sample clean floor texture from slightly above the watermark
  const sampleY = Math.max(0, patchTop - patchH - Math.round(30 * scale));
  const sampleBuf = await sharp(filePath)
    .extract({ left: Math.max(0, patchLeft), top: sampleY, width: Math.min(width, patchW), height: patchH })
    .toBuffer();

  const featherMask = Buffer.from(`
    <svg width="${patchW}" height="${patchH}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="f">
          <feGaussianBlur stdDeviation="${Math.max(6, Math.round(12 * scale))}" />
        </filter>
      </defs>
      <rect x="${Math.round(15 * scale)}" y="${Math.round(15 * scale)}" width="${patchW - Math.round(30 * scale)}" height="${patchH - Math.round(30 * scale)}" rx="${Math.round(20 * scale)}" fill="#ffffff" filter="url(#f)"/>
    </svg>
  `);

  const featheredTexture = await sharp(sampleBuf)
    .ensureAlpha()
    .composite([{ input: featherMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  const brandOverlay = createDrawingBoardBadgeSvg(width, height, centerX, centerY, scale);

  const patched = await sharp(filePath)
    .composite([
      { input: featheredTexture, left: Math.max(0, patchLeft), top: patchTop, blend: 'over' },
      { input: brandOverlay, blend: 'over' }
    ])
    .toBuffer();

  const tmp = filePath + '.tmp';
  await sharp(patched).toFile(tmp);
  fs.renameSync(tmp, filePath);
  console.log('Successfully patched:', filePath);

  const rel = path.relative(path.resolve(__dirname, '../react-app/public'), filePath);
  const dist = path.resolve(__dirname, '../react-app/dist', rel);
  if (fs.existsSync(path.dirname(dist))) {
    fs.copyFileSync(filePath, dist);
    console.log('Synced to dist:', dist);
  }
}

async function run() {
  console.log('Patching ghalia_cover.jpg and ghalia_02.jpg...');
  await patchImageWatermark(path.resolve(__dirname, '../react-app/public/images/ghalia-acarverde/ghalia_cover.jpg'), {
    scale: 2880 / 1920,
    centerX: 1447,
    centerY: 1982,
    patchW: 1100,
    patchH: 260
  });
  await patchImageWatermark(path.resolve(__dirname, '../react-app/public/images/ghalia-acarverde/ghalia_02.jpg'), {
    scale: 1600 / 1920,
    centerX: 800,
    centerY: 1110,
    patchW: 750,
    patchH: 180
  });
  console.log('Done!');
}
run().catch(console.error);

