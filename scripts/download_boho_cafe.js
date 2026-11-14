const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../react-app/public/images/boho-cafe');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const rawModules = [
  "8be6e6256346351.6aba336f0d1a1.jpg",
  "4fde17256346351.6aba336f0d5ad.jpg",
  "c25ba9256346351.6aba336f0c6a4.jpg",
  "b6b1fd256346351.6aba336a3993d.jpg",
  "9d5c35256346351.6aba336a38f6b.jpg",
  "e2166e256346351.6aba336b272f4.jpg",
  "e7962d256346351.6aba336b26b3e.jpg",
  "82033a256346351.6aba336b26393.jpg",
  "ad36aa256346351.6aba336f0cc8d.jpg",
  "95bcec256346351.6aba336bda139.jpg",
  "6dffb6256346351.6aba336bda76a.jpg",
  "b7bad4256346351.6aba336caffbd.jpg",
  "614ffe256346351.6aba336caf6c6.jpg",
  "3bf120256346351.6aba336cb0850.jpg",
  "948940256346351.6aba336d962ca.jpg",
  "ad3300256346351.6aba336d96acc.jpg",
  "8cad62256346351.6aba336e46ee4.jpg",
  "5af091256346351.6aba336e47730.jpg"
];

// Cover image is the first one
const images = [
  { name: 'boho_cafe_cover.jpg', file: rawModules[0] },
  ...rawModules.map((m, idx) => ({
    name: `boho_cafe_${String(idx + 1).padStart(2, '0')}.jpg`,
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
      `https://mir-s3-cdn-cf.behance.net/project_modules/max_3840_webp/${item.file}`,
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
