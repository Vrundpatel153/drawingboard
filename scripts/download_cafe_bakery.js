const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../react-app/public/images/cafe-bakery');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const rawModules = [
  "3f44bf256519459.6abe666d8a22f.jpg",
  "06f540256519459.6abe666d90e7d.jpg",
  "6e574b256519459.6abe666d87050.jpg",
  "3c454f256519459.6abe666d89abb.jpg",
  "2b149b256519459.6abe666f604f3.jpg",
  "12affd256519459.6abe666f5f678.jpg",
  "3acbb0256519459.6abe666f5c8d6.jpg",
  "cbec2b256519459.6abe666f60c93.jpg",
  "70424e256519459.6abe666f61491.jpg",
  "3ba619256519459.6abe666f5e0e4.jpg",
  "533e16256519459.6abe666f5d99d.jpg",
  "9c280a256519459.6abe666f5e7d5.jpg",
  "803758256519459.6abe666f5c110.jpg",
  "344f09256519459.6abe666f5fd82.jpg",
  "709d17256519459.6abe666f5b0ad.jpg",
  "6b97d5256519459.6abe666f5d249.jpg",
  "8624e9256519459.6abe666e44c26.jpg",
  "dd64b8256519459.6abe666e453ab.jpg",
  "539861256519459.6abe666eaa33c.jpg",
  "852959256519459.6abe666eaa80b.jpg",
  "f009f0256519459.6abe666f5efa7.jpg",
  "68bb90256519459.6abe666f5b856.jpg",
  "59f975256519459.6abe666f5a983.jpg"
];

async function downloadAll() {
  // First download cover
  const coverCandidates = [
    "https://mir-s3-cdn-cf.behance.net/projects/original/d9b6a0256519459.Y3JvcCwzNTAwLDI3MzcsMCw3NTM.jpg",
    "https://mir-s3-cdn-cf.behance.net/projects/max_808/d9b6a0256519459.Y3JvcCwzNTAwLDI3MzcsMCw3NTM.jpg",
    "https://mir-s3-cdn-cf.behance.net/projects/404/d9b6a0256519459.Y3JvcCwzNTAwLDI3MzcsMCw3NTM.jpg"
  ];
  for (const u of coverCandidates) {
    try {
      const res = await fetch(u);
      if (res.ok) {
        const buf = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(path.join(targetDir, 'cafe_bakery_cover.jpg'), buf);
        console.log(`Downloaded cafe_bakery_cover.jpg (${buf.length} bytes) from ${u}`);
        break;
      }
    } catch (e) {}
  }

  for (let i = 0; i < rawModules.length; i++) {
    const file = rawModules[i];
    const ext = path.extname(file);
    const destName = `cafe_bakery_${String(i + 1).padStart(2, '0')}${ext}`;
    const destPath = path.join(targetDir, destName);

    const candidates = [
      `https://mir-s3-cdn-cf.behance.net/project_modules/fs/${file}`,
      `https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/${file}`,
      `https://mir-s3-cdn-cf.behance.net/project_modules/1400/${file}`,
      `https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/${file}`,
      `https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/${file}`
    ];
    let downloaded = false;
    for (const u of candidates) {
      try {
        const res = await fetch(u);
        if (res.ok) {
          const buf = Buffer.from(await res.arrayBuffer());
          fs.writeFileSync(destPath, buf);
          console.log(`[${i+1}/${rawModules.length}] Downloaded ${destName} (${buf.length} bytes)`);
          downloaded = true;
          break;
        }
      } catch (err) {}
    }
    if (!downloaded) {
      console.warn(`Failed to download ${destName}`);
    }
  }
}

downloadAll();
