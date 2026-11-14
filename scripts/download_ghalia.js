const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../react-app/public/images/ghalia-acarverde');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const rawModules = [
  "8d205f254623725.6a89be822b594.jpeg",
  "03c90f254623725.6a8880968185f.jpg",
  "d55440254623725.6a88809680e2a.jpg",
  "2c16e0254623725.6a8880967fad5.jpg",
  "492975254623725.6a8880968040c.jpg",
  "6d740f254623725.6a89bc3ee7be7.jpg",
  "67594d254623725.6a89bc3ee70fd.jpg",
  "40855f254623725.6a89bc3ee7621.jpg",
  "f6ed13254623725.6a887ed30654c.jpeg",
  "36075a254623725.6a887ed30495b.jpeg",
  "5deb3c254623725.6a887ed308723.jpeg",
  "7514da254623725.6a887ed307d5b.jpeg",
  "8f2570254623725.6a887ed303f0e.jpeg",
  "cf49aa254623725.6a887ed305c68.jpeg",
  "737e8e254623725.6a887ed309944.jpeg",
  "406ddd254623725.6a887ed305250.jpeg",
  "506e52254623725.6a887ed307575.jpeg",
  "88b307254623725.6a887ed309077.jpeg",
  "39a22d254623725.6a887ed306d92.jpeg",
  "ddb5b2254623725.6a887ed247aae.jpeg",
  "480509254623725.6a887ed247677.jpeg",
  "f296a7254623725.6a887f32e800f.jpeg",
  "d33f10254623725.6a887f32eb1b8.jpeg",
  "9e476c254623725.6a887f32e8b75.jpeg",
  "c17865254623725.6a887f32e961d.jpeg",
  "9cc56b254623725.6a887f32ea207.jpeg",
  "a07199254623725.6a887f32e9bd6.jpeg",
  "4ad82a254623725.6a887f32eb636.jpeg",
  "d996e9254623725.6a887f32e85ba.jpeg",
  "146397254623725.6a887f32e90d3.jpeg",
  "0d8f22254623725.6a887f32eac9b.jpeg",
  "15bd5f254623725.6a887f32ea746.jpeg"
];

async function downloadAll() {
  const coverCandidates = [
    "https://mir-s3-cdn-cf.behance.net/projects/original/b13655254623725.Y3JvcCwyNTkxLDIwMjYsMjMwLDM4.jpeg",
    "https://mir-s3-cdn-cf.behance.net/projects/max_808/b13655254623725.Y3JvcCwyNTkxLDIwMjYsMjMwLDM4.jpeg",
    "https://mir-s3-cdn-cf.behance.net/projects/404/b13655254623725.Y3JvcCwyNTkxLDIwMjYsMjMwLDM4.jpeg"
  ];
  for (const u of coverCandidates) {
    try {
      const res = await fetch(u);
      if (res.ok) {
        const buf = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(path.join(targetDir, 'ghalia_cover.jpg'), buf);
        console.log(`Downloaded ghalia_cover.jpg (${buf.length} bytes) from ${u}`);
        break;
      }
    } catch (e) {}
  }

  for (let i = 0; i < rawModules.length; i++) {
    const file = rawModules[i];
    const ext = '.jpg';
    const destName = `ghalia_${String(i + 1).padStart(2, '0')}${ext}`;
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

