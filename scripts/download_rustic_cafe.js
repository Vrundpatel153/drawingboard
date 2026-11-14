const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../react-app/public/images/rustic-cafe');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const images = [
  { name: 'rustic_cafe_cover.jpg', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/f1840b256457871.6abce03146f1d.jpg' },
  { name: 'rustic_cafe_01.jpg', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/f1840b256457871.6abce03146f1d.jpg', fallback: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/f1840b256457871.6abce03146f1d.jpg' },
  { name: 'rustic_cafe_02.jpg', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/e49939256457871.6abce03147685.jpg', fallback: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/e49939256457871.6abce03147685.jpg' },
  { name: 'rustic_cafe_03.png', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/92ddd9256457871.6abce03147347.png', fallback: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/92ddd9256457871.6abce03147347.png' },
  { name: 'rustic_cafe_04.png', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/5f592d256457871.6abce02bc7b26.png', fallback: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/5f592d256457871.6abce02bc7b26.png' },
  { name: 'rustic_cafe_05.png', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/382cc6256457871.6abce02bc75f7.png', fallback: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/382cc6256457871.6abce02bc75f7.png' },
  { name: 'rustic_cafe_06.png', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/9c3803256457871.6abce02ccf78e.png', fallback: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/9c3803256457871.6abce02ccf78e.png' },
  { name: 'rustic_cafe_07.png', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/5850e2256457871.6abce02ccf2d2.png', fallback: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/5850e2256457871.6abce02ccf2d2.png' },
  { name: 'rustic_cafe_08.png', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/6f8cfa256457871.6abce02ccfc1a.png', fallback: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/6f8cfa256457871.6abce02ccfc1a.png' },
  { name: 'rustic_cafe_09.png', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/99050f256457871.6abce02e088d8.png', fallback: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/99050f256457871.6abce02e088d8.png' },
  { name: 'rustic_cafe_10.png', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/946c99256457871.6abce02e09060.png', fallback: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/946c99256457871.6abce02e09060.png' },
  { name: 'rustic_cafe_11.png', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/09ad0b256457871.6abce031479c4.png', fallback: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/09ad0b256457871.6abce031479c4.png' },
  { name: 'rustic_cafe_12.png', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/67c6a5256457871.6abce02f42eec.png', fallback: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/67c6a5256457871.6abce02f42eec.png' },
  { name: 'rustic_cafe_13.png', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/6053a8256457871.6abce02f43417.png', fallback: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/6053a8256457871.6abce02f43417.png' },
  { name: 'rustic_cafe_14.png', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/907708256457871.6abce03060064.png', fallback: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/907708256457871.6abce03060064.png' },
  { name: 'rustic_cafe_15.png', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/6354eb256457871.6abce03060741.png', fallback: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/6354eb256457871.6abce03060741.png' },
];

async function download() {
  for (const item of images) {
    const dest = path.join(targetDir, item.name);
    let downloaded = false;
    for (const u of [item.url, item.fallback]) {
      if (!u) continue;
      try {
        const res = await fetch(u);
        if (res.ok) {
          const buf = Buffer.from(await res.arrayBuffer());
          fs.writeFileSync(dest, buf);
          console.log(`Downloaded ${item.name} (${buf.length} bytes) from ${u}`);
          downloaded = true;
          break;
        }
      } catch (err) {
        // try next
      }
    }
    if (!downloaded) {
      console.warn(`Failed to download ${item.name}`);
    }
  }
}

download();
