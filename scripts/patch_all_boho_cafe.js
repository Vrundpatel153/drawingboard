const sharp = require('../react-app/node_modules/sharp');
const path = require('path');
const fs = require('fs');

const dir = path.join(__dirname, '../react-app/public/images/boho-cafe');

async function processAll() {
  console.log('--- Patching Boho Cafe Cover & 01 ---');
  // 1. Cover and 01 (1920x1080)
  const pillSvg = Buffer.from(`
    <svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="bps" x="-5%" y="-5%" width="110%" height="115%">
          <feDropShadow dx="0" dy="5" stdDeviation="8" flood-opacity="0.12"/>
        </filter>
      </defs>
      <rect x="625" y="88" width="560" height="68" rx="34" fill="#ffffff" filter="url(#bps)" />
      <rect x="654" y="112" width="16" height="10" fill="#A19071" />
      <rect x="654" y="119" width="8" height="16" fill="#A19071" />
      <text x="678" y="131" font-family="'Constantia', 'Playfair Display', Georgia, serif" font-size="15" font-weight="700" fill="#2B2822" letter-spacing="0.08em">THE DRAWING BOARD</text>
      <text x="920" y="131" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="600" fill="#111111" letter-spacing="-0.1px">
        Home<tspan dx="20">Projects</tspan><tspan dx="20">About</tspan><tspan dx="20">Contact</tspan>
      </text>
    </svg>
  `);

  for (const name of ['boho_cafe_cover.jpg', 'boho_cafe_01.jpg']) {
    const filePath = path.join(dir, name);
    if (!fs.existsSync(filePath)) continue;
    const buf = await sharp(filePath).toBuffer();
    const tmp = filePath + '.tmp';
    await sharp(buf).composite([{ input: pillSvg, blend: 'over' }]).toFile(tmp);
    fs.renameSync(tmp, filePath);
    console.log(`${name} patched.`);
  }

  // 2. Renders 03 through 18
  console.log('--- Patching Renders 03 through 18 ---');
  const w = 180, h = 100;
  const maskSvg = Buffer.from(`
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="b" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <rect x="8" y="8" width="${w - 16}" height="${h - 16}" rx="12" fill="#fff" filter="url(#b)" />
    </svg>
  `);

  for (let i = 3; i <= 18; i++) {
    const num = String(i).padStart(2, '0');
    const file = path.join(dir, `boho_cafe_${num}.jpg`);
    if (!fs.existsSync(file)) continue;

    const meta = await sharp(file).metadata();
    const { width, height } = meta;

    const patchY = height - 110;
    const rawPatch = await sharp(file)
      .extract({ left: 210, top: patchY, width: w, height: h })
      .toBuffer();

    const featheredPatch = await sharp(rawPatch)
      .ensureAlpha()
      .composite([{ input: maskSvg, blend: 'dest-in' }])
      .png()
      .toBuffer();

    const brandSvg = Buffer.from(`
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <text x="25" y="${height - 50}" font-family="'Constantia', 'Playfair Display', Georgia, serif" font-size="16" font-weight="700" fill="#ffffff" fill-opacity="0.9" letter-spacing="0.12em">
          THE DRAWING BOARD
        </text>
        <text x="25" y="${height - 30}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10.5" font-weight="600" fill="#ffffff" fill-opacity="0.75" letter-spacing="0.22em">
          SPATIAL ENVIRONMENTS
        </text>
      </svg>
    `);

    const fullComposite = await sharp(file)
      .composite([
        { input: featheredPatch, left: 15, top: patchY, blend: 'over' },
        { input: brandSvg, blend: 'over' }
      ])
      .toBuffer();

    const tmpFile = file + '.tmp';
    await sharp(fullComposite).toFile(tmpFile);
    fs.renameSync(tmpFile, file);
    console.log(`boho_cafe_${num}.jpg patched successfully.`);
  }

  console.log('All boho cafe assets successfully patched!');
}

processAll().catch(console.error);
