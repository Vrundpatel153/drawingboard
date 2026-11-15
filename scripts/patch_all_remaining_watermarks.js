const path = require('path');
const fs = require('fs');
const sharp = require(path.resolve(__dirname, '../react-app/node_modules/sharp'));

// Generates SVG overlay replacing "MAS+ ARCHITECTS" and copyright text with "THE DRAWING BOARD"
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

// Seamless feather patch to cover the old watermark before applying the new branding
async function patchImageWatermark(filePath, options = {}) {
  if (!fs.existsSync(filePath)) {
    console.warn('File not found:', filePath);
    return;
  }

  const meta = await sharp(filePath).metadata();
  const { width, height } = meta;

  // Defaults based on image dimensions
  const scale = options.scale || (width / 1920);
  const patchW = options.patchW || Math.round(640 * scale);
  const patchH = options.patchH || Math.round(140 * scale);
  const centerX = options.centerX || Math.round(width / 2);
  const centerY = options.centerY || (height - Math.round(100 * scale));
  const patchLeft = Math.round(centerX - patchW / 2);
  const patchTop = Math.round(centerY - patchH / 2);

  // Sample clean floor texture from slightly above the watermark
  const sampleY = Math.max(0, patchTop - patchH - Math.round(20 * scale));
  const sampleBuf = await sharp(filePath)
    .extract({ left: patchLeft, top: sampleY, width: patchW, height: patchH })
    .toBuffer();

  // Create feathered mask for seamless edge blending
  const featherMask = Buffer.from(`
    <svg width="${patchW}" height="${patchH}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="f">
          <feGaussianBlur stdDeviation="${Math.max(4, Math.round(8 * scale))}" />
        </filter>
      </defs>
      <rect x="${Math.round(10 * scale)}" y="${Math.round(10 * scale)}" width="${patchW - Math.round(20 * scale)}" height="${patchH - Math.round(20 * scale)}" rx="${Math.round(16 * scale)}" fill="#ffffff" filter="url(#f)"/>
    </svg>
  `);

  const featheredTexture = await sharp(sampleBuf)
    .ensureAlpha()
    .composite([{ input: featherMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // The Drawing Board replacement SVG
  const brandOverlay = createDrawingBoardBadgeSvg(width, height, centerX, centerY, scale);

  // Composite feathered texture over old watermark, then place new brand badge on top
  const patched = await sharp(filePath)
    .composite([
      { input: featheredTexture, left: patchLeft, top: patchTop, blend: 'over' },
      { input: brandOverlay, blend: 'over' }
    ])
    .toBuffer();

  // Save back to file
  const tmp = filePath + '.tmp';
  await sharp(patched).toFile(tmp);
  fs.renameSync(tmp, filePath);
  console.log(`Successfully patched watermark in: ${path.basename(filePath)} (${width}x${height})`);

  // Also sync to dist if dist exists
  const relPath = path.relative(path.resolve(__dirname, '../react-app/public'), filePath);
  const distPath = path.resolve(__dirname, '../react-app/dist', relPath);
  if (fs.existsSync(path.dirname(distPath))) {
    fs.copyFileSync(filePath, distPath);
    console.log(`  -> Synced to dist: ${distPath}`);
  }
}

async function main() {
  console.log('=== STARTING BATCH REPLACEMENT OF REMAINING WATERMARKS ===');

  // 1. rustic-cafe: rustic_cafe_11.png
  const rustic11 = path.resolve(__dirname, '../react-app/public/images/rustic-cafe/rustic_cafe_11.png');
  await patchImageWatermark(rustic11, { scale: 1.0, centerY: 2400 - 100 });

  // 2. boho-cafe: boho_cafe_18.jpg
  const boho18 = path.resolve(__dirname, '../react-app/public/images/boho-cafe/boho_cafe_18.jpg');
  await patchImageWatermark(boho18, { scale: 1.0, centerY: 2133 - 100 });

  // 3. ghalia-acarverde: ghalia_09, 10, 11, 19, 20, 21, 30
  const ghaliaDir = path.resolve(__dirname, '../react-app/public/images/ghalia-acarverde');
  const ghaliaFiles = [
    'ghalia_09.jpg',
    'ghalia_10.jpg',
    'ghalia_11.jpg',
    'ghalia_19.jpg',
    'ghalia_20.jpg',
    'ghalia_21.jpg',
    'ghalia_30.jpg'
  ];

  for (const name of ghaliaFiles) {
    const full = path.join(ghaliaDir, name);
    if (fs.existsSync(full)) {
      const meta = await sharp(full).metadata();
      const s = meta.width / 1920;
      await patchImageWatermark(full, { scale: s, centerY: meta.height - Math.round(95 * s) });
    }
  }

  console.log('=== ALL REMAINING WATERMARKS REPLACED AND SYNCED TO DIST ===');
}

main().catch(console.error);

