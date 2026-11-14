const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../react-app/public/images/ouur-cafe');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const rawModules = [
  "68a58f254354545.6a81930f76a7e.jpg",
  "b33299254354545.6a81930f761da.jpg",
  "e2e3ba254354545.6a81930f76f36.jpg",
  "8feaff254354545.6a81930f773d7.jpg",
  "027743254354545.6a81930f75d4c.jpg",
  "efacc6254354545.6a81930f76621.jpg",
  "f012ff254354545.6a81930f75895.jpg",
  "3eac7a254354545.6a81930f7536d.jpg",
  "8079f3254354545.6a81930f778b7.jpg"
];

const images = [
  { name: 'ouur_cafe_cover.jpg', file: rawModules[0] },
  ...rawModules.map((m, idx) => ({
    name: `ouur_cafe_${String(idx + 1).padStart(2, '0')}.jpg`,
    file: m
  }))
];

async function download() {
  for (const item of images) {
    const dest = path.join(targetDir, item.name);
    let downloaded = false;
    const candidates = [
      `https://mir-s3-cdn-cf.behance.net/project_modules/fs/${item.file}`,
      `https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/${item.file}`,
      `https://mir-s3-cdn-cf.behance.net/project_modules/1400/${item.file}`,
      `https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/${item.file}`
    ];
    for (const u of candidates) {
      try {
        const res = await fetch(u);
        if (res.ok) {
          const buf = Buffer.from(await res.arrayBuffer());
          fs.writeFileSync(dest, buf);
          console.log(`Downloaded ${item.name} (${buf.length} bytes) from ${u}`);
          downloaded = true;
          break;
        }
      } catch (err) {}
    }
    if (!downloaded) {
      console.warn(`Failed to download ${item.name}`);
    }
  }
}

download();
