const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../react-app/public/images/dorada');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const images = [
  { url: 'https://mir-s3-cdn-cf.behance.net/projects/max_808/9db728225978803.Y3JvcCwzMDI3LDIzNjgsMCwzNjc.png', name: 'dorada_cover.png' },
  { url: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/dadd1b225978803.68263b5a94c59.png', name: 'dorada_01.png' },
  { url: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/809cfc225978803.68263b5a90f60.png', name: 'dorada_02.png' },
  { url: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/2f3c1d225978803.68263b5a9287e.png', name: 'dorada_03.png' },
  { url: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/4d8ce6225978803.68263b5a91cc3.png', name: 'dorada_04.png' },
  { url: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/691a1c225978803.68263b5a93293.gif', name: 'dorada_05.gif' },
  { url: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/c7ea15225978803.68263b5a9524d.png', name: 'dorada_06.png' },
  { url: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/e35bdf225978803.68263b5a96492.png', name: 'dorada_07.png' },
  { url: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/ad626f225978803.68263b5a95db8.png', name: 'dorada_08.png' },
  { url: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/aadf0d225978803.68263b5a957d2.png', name: 'dorada_09.png' },
  { url: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/66989a225978803.68263b5a92d79.png', name: 'dorada_10.png' },
  { url: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/b16de8225978803.68263b5a9172f.png', name: 'dorada_11.png' },
  { url: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/bfe4fd225978803.68263b5a944ec.png', name: 'dorada_12.png' },
  { url: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/d02424225978803.68263b5a93bf4.png', name: 'dorada_13.png' },
  { url: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/412081225978803.68263b5a92285.png', name: 'dorada_14.png' }
];

async function downloadAll() {
  for (const item of images) {
    const dest = path.join(targetDir, item.name);
    try {
      console.log(`Downloading ${item.name}...`);
      const res = await fetch(item.url);
      if (!res.ok) {
        // Fallback to 1400 if fs is not available
        const fallbackUrl = item.url.replace('/fs/', '/1400/');
        console.log(`Retrying with 1400: ${fallbackUrl}`);
        const res2 = await fetch(fallbackUrl);
        if (!res2.ok) {
          console.error(`Failed ${item.name}: ${res2.status}`);
          continue;
        }
        const buf = Buffer.from(await res2.arrayBuffer());
        fs.writeFileSync(dest, buf);
        console.log(`Saved ${item.name} (${buf.length} bytes) via fallback`);
        continue;
      }
      const buf = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(dest, buf);
      console.log(`Saved ${item.name} (${buf.length} bytes)`);
    } catch (e) {
      console.error(`Error ${item.name}:`, e.message);
    }
  }
}

downloadAll();
