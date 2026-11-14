const sharp = require('../react-app/node_modules/sharp');
const path = require('path');
const fs = require('fs');

const dir = path.join(__dirname, '../react-app/public/images/rustic-cafe');

async function processAll() {
  console.log('--- Patching Cover & 01 ---');
  // 1. Cover (1400x788)
  const coverPath = path.join(dir, 'rustic_cafe_cover.jpg');
  const coverSvg = Buffer.from(`
    <svg width="1400" height="788" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="cs" x="-5%" y="-5%" width="110%" height="115%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.12"/>
        </filter>
      </defs>
      <rect x="450" y="73" width="460" height="76" rx="38" fill="#ffffff" filter="url(#cs)" />
      <rect x="480" y="99" width="16" height="10" fill="#A19071" />
      <rect x="480" y="106" width="8" height="16" fill="#A19071" />
      <text x="504" y="117" font-family="'Constantia', 'Playfair Display', Georgia, serif" font-size="13.5" font-weight="700" fill="#2B2822" letter-spacing="0.08em">THE DRAWING BOARD</text>
      <text x="702" y="117" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14.5" font-weight="600" fill="#111111" letter-spacing="-0.1px">
        Home<tspan dx="16">Projects</tspan><tspan dx="16">About</tspan><tspan dx="16">Contact</tspan>
      </text>
    </svg>
  `);
  const origCover = await sharp(coverPath).toBuffer();
  const tmpCover = coverPath + '.tmp';
  await sharp(origCover).composite([{ input: coverSvg, blend: 'over' }]).toFile(tmpCover);
  fs.renameSync(tmpCover, coverPath);
  console.log('Cover patched.');

  // 2. 01 (1920x1080)
  const p01Path = path.join(dir, 'rustic_cafe_01.jpg');
  const p01Svg = Buffer.from(`
    <svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="p01s" x="-5%" y="-5%" width="110%" height="115%">
          <feDropShadow dx="0" dy="5" stdDeviation="8" flood-opacity="0.12"/>
        </filter>
      </defs>
      <rect x="617" y="100" width="631" height="104" rx="52" fill="#ffffff" filter="url(#p01s)" />
      <rect x="658" y="136" width="22" height="14" fill="#A19071" />
      <rect x="658" y="146" width="11" height="22" fill="#A19071" />
      <text x="692" y="161" font-family="'Constantia', 'Playfair Display', Georgia, serif" font-size="18.5" font-weight="700" fill="#2B2822" letter-spacing="0.08em">THE DRAWING BOARD</text>
      <text x="963" y="161" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="600" fill="#111111" letter-spacing="-0.1px">
        Home<tspan dx="22">Projects</tspan><tspan dx="22">About</tspan><tspan dx="22">Contact</tspan>
      </text>
    </svg>
  `);
  const orig01 = await sharp(p01Path).toBuffer();
  const tmp01 = p01Path + '.tmp';
  await sharp(orig01).composite([{ input: p01Svg, blend: 'over' }]).toFile(tmp01);
  fs.renameSync(tmp01, p01Path);
  console.log('01 patched.');

  // 3. Renders 03 through 15 (1920x2400)
  console.log('--- Patching Renders 03 through 15 ---');
  const w = 170, h = 100;
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

  const brandSvg = Buffer.from(`
    <svg width="280" height="110" xmlns="http://www.w3.org/2000/svg">
      <text x="15" y="55" font-family="'Constantia', 'Playfair Display', Georgia, serif" font-size="16" font-weight="700" fill="#ffffff" fill-opacity="0.9" letter-spacing="0.12em">
        THE DRAWING BOARD
      </text>
      <text x="15" y="75" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10.5" font-weight="600" fill="#ffffff" fill-opacity="0.75" letter-spacing="0.22em">
        SPATIAL ENVIRONMENTS
      </text>
    </svg>
  `);

  for (let i = 3; i <= 15; i++) {
    const num = String(i).padStart(2, '0');
    const file = path.join(dir, `rustic_cafe_${num}.png`);
    if (!fs.existsSync(file)) continue;

    // Extract adjacent floor patch
    const rawPatch = await sharp(file)
      .extract({ left: 200, top: 2275, width: w, height: h })
      .toBuffer();

    const featheredPatch = await sharp(rawPatch)
      .composite([{ input: maskSvg, blend: 'dest-in' }])
      .toBuffer();

    const fullComposite = await sharp(file)
      .composite([
        { input: featheredPatch, left: 25, top: 2275, blend: 'over' },
        { input: brandSvg, left: 25, top: 2275, blend: 'over' }
      ])
      .toBuffer();

    const tmpFile = file + '.tmp';
    await sharp(fullComposite).toFile(tmpFile);
    fs.renameSync(tmpFile, file);
    console.log(`rustic_cafe_${num}.png patched successfully.`);
  }

  // Remove test crops
  const crops = ['crop_pill.png', 'crop_wm.png', 'test_inpaint.png', 'rustic_cafe_cover_orig.jpg'];
  crops.forEach(c => {
    const p = path.join(dir, c);
    if (fs.existsSync(p)) fs.unlinkSync(p);
  });
  console.log('Cleaned temporary crop files.');
}

processAll().catch(console.error);
