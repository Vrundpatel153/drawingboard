const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../react-app/public/images/elsewhere');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const rawModules = [
  "26a862258253867.6af1f74d51eed.png",
  "c8d1c4258253867.6af1f74d5248c.png",
  "aad78c258253867.6af1f74d570a1.png",
  "70c7b6258253867.6af1f7483a122.png",
  "bc3e27258253867.6af1f7483a7d5.png",
  "a3f550258253867.6af1f74d544c1.gif",
  "3900fc258253867.6af1f74d537c1.png",
  "b32830258253867.6af1f74d529b3.png",
  "ba18a2258253867.6af1f748bfe64.png",
  "ce83ae258253867.6af1f748c039d.png",
  "ef6f6f258253867.6af1f74d54bee.png",
  "f7d07e258253867.6af1f749443c6.png",
  "e3edcf258253867.6af1f749447f2.png",
  "d2d37f258253867.6af1f74d53e38.png",
  "da6e8f258253867.6af1f749ace80.png",
  "3806ff258253867.6af1f749ad390.gif",
  "48d7be258253867.6af1f74d56549.png",
  "14ed69258253867.6af1f74d56b0a.png",
  "29ab60258253867.6af1f74b6375b.png",
  "b48d7c258253867.6af1f74b63b52.png",
  "14ac91258253867.6af1f74d5525d.png",
  "8d41f3258253867.6af1f74d53275.png",
  "486885258253867.6af1f74c1379c.png",
  "128831258253867.6af1f74c13c43.png",
  "148460258253867.6af1f74d52df5.png",
  "162406258253867.6af1f74d55feb.png",
  "a82027258253867.6af1f74c9c5df.png",
  "0c1c0d258253867.6af1f74c9bf16.png",
  "41ae40258253867.6af1f74d55931.png",
  "4ef618258253867.6af1f74d576e5.gif"
];

async function downloadAll() {
  // First download cover
  const coverCandidates = [
    "https://mir-s3-cdn-cf.behance.net/projects/original/02c7d9258253867.Y3JvcCwyNDI0LDE4OTYsMCww.png",
    "https://mir-s3-cdn-cf.behance.net/projects/max_808/02c7d9258253867.Y3JvcCwyNDI0LDE4OTYsMCww.png",
    "https://mir-s3-cdn-cf.behance.net/projects/404/02c7d9258253867.Y3JvcCwyNDI0LDE4OTYsMCww.png"
  ];
  for (const u of coverCandidates) {
    try {
      const res = await fetch(u);
      if (res.ok) {
        const buf = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(path.join(targetDir, 'elsewhere_cover.png'), buf);
        console.log(`Downloaded elsewhere_cover.png (${buf.length} bytes) from ${u}`);
        break;
      }
    } catch (e) {}
  }

  for (let i = 0; i < rawModules.length; i++) {
    const file = rawModules[i];
    const ext = path.extname(file);
    const destName = `elsewhere_${String(i + 1).padStart(2, '0')}${ext}`;
    const destPath = path.join(targetDir, destName);

    const candidates = [
      `https://mir-s3-cdn-cf.behance.net/project_modules/fs/${file}`,
      `https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/${file}`,
      `https://mir-s3-cdn-cf.behance.net/project_modules/1400/${file}`,
      `https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/${file}`
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
      // try with webp or fallback
      const fallbackUrl = `https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/${file}`;
      try {
        const res = await fetch(fallbackUrl);
        if (res.ok) {
          const buf = Buffer.from(await res.arrayBuffer());
          fs.writeFileSync(destPath, buf);
          console.log(`[${i+1}/${rawModules.length}] Downloaded ${destName} fallback (${buf.length} bytes)`);
          downloaded = true;
        }
      } catch (err) {}
    }
    if (!downloaded) {
      console.warn(`Failed to download ${destName}`);
    }
  }
}

downloadAll();
