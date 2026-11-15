const fs = require('fs');
const path = require('path');
const https = require('https');

const manifest = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'high_life_manifest.json'), 'utf8'));
const targetDir = path.resolve(__dirname, '../react-app/public/images/high-life-residences');
const distDir = path.resolve(__dirname, '../react-app/dist/images/high-life-residences');

if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.behance.net/'
      }
    }, response => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status code ${response.statusCode}`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve());
      });
    }).on('error', err => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log(`Starting download of ${manifest.length} High Life Residences assets...`);
  for (let i = 0; i < manifest.length; i++) {
    const item = manifest[i];
    const ext = item.url.includes('.png') ? 'png' : item.url.includes('.gif') ? 'gif' : 'jpg';
    const filename = i === 0 ? `high_life_cover.${ext}` : `high_life_${String(i).padStart(2, '0')}.${ext}`;
    const targetPath = path.join(targetDir, filename);
    const distPath = path.join(distDir, filename);

    if (fs.existsSync(targetPath) && fs.statSync(targetPath).size > 1000) {
      console.log(`[${i + 1}/${manifest.length}] Already exists: ${filename}`);
    } else {
      console.log(`[${i + 1}/${manifest.length}] Downloading: ${filename}...`);
      await downloadFile(item.url, targetPath);
      console.log(`  -> Saved ${filename} (${(fs.statSync(targetPath).size / 1024 / 1024).toFixed(2)} MB)`);
    }

    fs.copyFileSync(targetPath, distPath);
  }
  console.log('All High Life Residences assets downloaded and synced to dist!');
}

main().catch(console.error);

