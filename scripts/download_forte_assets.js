const fs = require('fs');
const path = require('path');
const https = require('https');

const coverUrl = "https://mir-s3-cdn-cf.behance.net/projects/original/b7b51b257568569.Y3JvcCwyMzY3LDE4NTIsMjE2LDA.png";

const images = [
  { index: 1, url: "https://mir-s3-cdn-cf.behance.net/project_modules/source/a16b83257568569.6add8a941a252.png" },
  { index: 2, url: "https://mir-s3-cdn-cf.behance.net/project_modules/source/268254257568569.6add8a941c768.png" },
  { index: 3, url: "https://mir-s3-cdn-cf.behance.net/project_modules/source/84a8c1257568569.6add8a941cb9f.png" },
  { index: 4, url: "https://mir-s3-cdn-cf.behance.net/project_modules/source/8b50fb257568569.6add8a941a6b2.png" },
  { index: 5, url: "https://mir-s3-cdn-cf.behance.net/project_modules/source/8bb33f257568569.6add8a941d89f.png" },
  { index: 6, url: "https://mir-s3-cdn-cf.behance.net/project_modules/source/f35ef8257568569.6add8a941c34d.png" },
  { index: 7, url: "https://mir-s3-cdn-cf.behance.net/project_modules/source/246b61257568569.6add8a941af0e.png" },
  { index: 8, url: "https://mir-s3-cdn-cf.behance.net/project_modules/source/464d0c257568569.6add8a941dc9a.png" },
  { index: 9, url: "https://mir-s3-cdn-cf.behance.net/project_modules/source/57a423257568569.6add8a941b31e.png" },
  { index: 10, url: "https://mir-s3-cdn-cf.behance.net/project_modules/source/e3605d257568569.6add8a941bb06.png" },
  { index: 11, url: "https://mir-s3-cdn-cf.behance.net/project_modules/source/d647af257568569.6add8a941d422.png" },
  { index: 12, url: "https://mir-s3-cdn-cf.behance.net/project_modules/source/0725bc257568569.6add8a941b70a.png" },
  { index: 13, url: "https://mir-s3-cdn-cf.behance.net/project_modules/source/63d6c7257568569.6add8a941aadf.png" },
  { index: 14, url: "https://mir-s3-cdn-cf.behance.net/project_modules/source/7c6e78257568569.6add8a941bf08.png" },
  { index: 15, url: "https://mir-s3-cdn-cf.behance.net/project_modules/source/3aea9a257568569.6add8a941cfe2.png" }
];

const publicDir = path.resolve(__dirname, '../react-app/public/images/forte');
const distDir = path.resolve(__dirname, '../react-app/dist/images/forte');

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed with status code: ${res.statusCode}`));
      }
      const stream = fs.createWriteStream(dest);
      res.pipe(stream);
      stream.on('finish', () => {
        stream.close();
        resolve();
      });
      stream.on('error', reject);
    }).on('error', reject);
  });
}

async function main() {
  console.log('=== STARTING DOWNLOAD OF FORTE LUXURY ARCHITECTURE ASSETS ===');

  // Cover
  const coverPub = path.join(publicDir, 'forte_cover.png');
  const coverDist = path.join(distDir, 'forte_cover.png');
  console.log('Downloading cover...');
  await downloadFile(coverUrl, coverPub);
  fs.copyFileSync(coverPub, coverDist);
  console.log('Saved forte_cover.png');

  // 15 images
  for (const item of images) {
    const filename = `forte_${item.index < 10 ? '0' + item.index : item.index}.png`;
    const destPub = path.join(publicDir, filename);
    const destDist = path.join(distDir, filename);
    console.log(`Downloading ${filename}...`);
    await downloadFile(item.url, destPub);
    fs.copyFileSync(destPub, destDist);
    console.log(`Saved ${filename}`);
  }

  console.log('=== ALL 16 FORTE ASSETS DOWNLOADED AND SYNCED SUCCESSFULLY ===');
}

main().catch(console.error);

