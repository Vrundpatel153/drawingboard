const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// ── 1. GUSTO DOWNLOAD ──
function downloadGusto() {
  console.log('=== DOWNLOADING GUSTO ASSETS ===');
  const targetDir = 'react-app/public/images/gusto';
  ensureDir(targetDir);

  const rawUrls = JSON.parse(fs.readFileSync('scripts/gusto_urls.json', 'utf8'));
  const downloadedFiles = [];

  rawUrls.forEach((url, idx) => {
    const extMatch = url.match(/\.(jpg|jpeg|png|webp|mp4)/i);
    const ext = extMatch ? extMatch[1].toLowerCase() : 'jpg';
    const num = String(idx + 1).padStart(2, '0');
    const filename = `gusto_${num}.${ext}`;
    const targetPath = path.join(targetDir, filename);

    console.log(`[Gusto ${idx + 1}/${rawUrls.length}] Downloading ${filename}...`);
    try {
      execSync(`curl.exe -s -L "${url}" -o "${targetPath}"`, { timeout: 30000 });
      const stats = fs.statSync(targetPath);
      console.log(`  -> Saved ${Math.round(stats.size / 1024)} KB`);
      downloadedFiles.push({ filename, relPath: `/images/gusto/${filename}`, size: stats.size, ext });
    } catch (err) {
      console.error(`  -> Failed: ${err.message}`);
    }
  });

  // Pick cover image (usually gusto_04 or whichever high-res landscape image looks best)
  // Let's find first big jpg image (> 100KB)
  const bigImages = downloadedFiles.filter(f => (f.ext === 'jpg' || f.ext === 'jpeg' || f.ext === 'png') && f.size > 100000);
  const coverSource = bigImages[0] ? bigImages[0].targetPath || path.join(targetDir, bigImages[0].filename) : path.join(targetDir, downloadedFiles[0].filename);
  const coverTarget = path.join(targetDir, 'gusto_cover.jpg');
  fs.copyFileSync(coverSource, coverTarget);
  console.log(`Gusto Cover created from ${path.basename(coverSource)} -> gusto_cover.jpg`);

  fs.writeFileSync('scripts/gusto_manifest.json', JSON.stringify(downloadedFiles, null, 2));
}

// ── 2. BONTA DOWNLOAD ──
function downloadBonta() {
  console.log('\n=== DOWNLOADING BONTA ASSETS ===');
  const targetDir = 'react-app/public/images/bonta';
  ensureDir(targetDir);

  // List of all verified Bonta images and videos
  const bontaList = [
    'https://magpie-studio.com/wp-content/uploads/2024/04/HeroTub_1.jpg',
    'https://magpie-studio.com/wp-content/uploads/2024/04/CaseStudy_Short_V1.mp4',
    'https://magpie-studio.com/wp-content/uploads/2024/04/Scoop-Cup_1.jpg',
    'https://magpie-studio.com/wp-content/uploads/2024/04/R204_Bonta_Logo_Bounce_Big_InandOut_Square-1.mp4',
    'https://magpie-studio.com/wp-content/uploads/2024/04/Lavender_1.jpg',
    'https://magpie-studio.com/wp-content/uploads/2024/04/Salted-Vanilla-Mayan-Choc_1.jpg',
    'https://magpie-studio.com/wp-content/uploads/2024/04/Bonta_Topo_v4.mp4',
    'https://magpie-studio.com/wp-content/uploads/2024/04/Dulce_OrangeCreamPB_1.jpg',
    'https://magpie-studio.com/wp-content/uploads/2024/04/Straciatella-PB_1.jpg',
    'https://magpie-studio.com/wp-content/uploads/2024/04/Bonta_Fridge-family-shot_V2-scaled.jpg',
    'https://magpie-studio.com/wp-content/uploads/2024/04/Bonta_Rotating-tubs_Master-LOOP_Square.mp4',
    'https://magpie-studio.com/wp-content/uploads/2024/04/Macro_Pack_1-1.jpg',
    'https://magpie-studio.com/wp-content/uploads/2024/04/Macro_Pack_2-1.jpg',
    'https://magpie-studio.com/wp-content/uploads/2024/04/Macro_Pack_4.jpg',
    'https://magpie-studio.com/wp-content/uploads/2024/04/StudioFamilyShot_InNature_1.jpg',
    'https://magpie-studio.com/wp-content/uploads/2024/04/Bonta_Illustrations_HiddenEdges.mp4',
    'https://magpie-studio.com/wp-content/uploads/2024/04/Badges_1-1.jpg',
    'https://magpie-studio.com/wp-content/uploads/2024/04/Bonta-Hat-Mockup_1.jpg',
    'https://magpie-studio.com/wp-content/uploads/2024/04/Backpack_1.jpg',
    'https://magpie-studio.com/wp-content/uploads/2024/04/T-Shirt_1.jpg',
    'https://magpie-studio.com/wp-content/uploads/2024/04/Walking-Boots_1.jpg',
    'https://magpie-studio.com/wp-content/uploads/2024/04/T-shirt_Mockup_1.jpg',
    'https://magpie-studio.com/wp-content/uploads/2024/04/Bonta-Van_1.jpg',
    'https://magpie-studio.com/wp-content/uploads/2024/04/Call-of-The-Wild-Footage_V2-1.mp4'
  ];

  const downloadedFiles = [];

  bontaList.forEach((url, idx) => {
    const extMatch = url.match(/\.(jpg|jpeg|png|webp|mp4|gif)/i);
    const ext = extMatch ? extMatch[1].toLowerCase() : 'jpg';
    const num = String(idx + 1).padStart(2, '0');
    const filename = `bonta_${num}.${ext}`;
    const targetPath = path.join(targetDir, filename);

    console.log(`[Bonta ${idx + 1}/${bontaList.length}] Downloading ${filename}...`);
    try {
      execSync(`curl.exe -s -L "${url}" -o "${targetPath}"`, { timeout: 35000 });
      const stats = fs.statSync(targetPath);
      console.log(`  -> Saved ${Math.round(stats.size / 1024)} KB`);
      downloadedFiles.push({ filename, relPath: `/images/bonta/${filename}`, size: stats.size, ext });
    } catch (err) {
      console.error(`  -> Failed: ${err.message}`);
    }
  });

  // Cover image: HeroTub or Fridge family shot
  const coverSource = path.join(targetDir, 'bonta_01.jpg');
  const coverTarget = path.join(targetDir, 'bonta_cover.jpg');
  if (fs.existsSync(coverSource)) {
    fs.copyFileSync(coverSource, coverTarget);
    console.log(`Bonta Cover created -> bonta_cover.jpg`);
  }

  fs.writeFileSync('scripts/bonta_manifest.json', JSON.stringify(downloadedFiles, null, 2));
}

downloadGusto();
downloadBonta();

// Sync to dist
function syncToDist(sub) {
  const src = `react-app/public/images/${sub}`;
  const dst = `react-app/dist/images/${sub}`;
  ensureDir(dst);
  fs.cpSync(src, dst, { recursive: true });
  console.log(`Synced ${sub} to dist/images/${sub}`);
}

syncToDist('gusto');
syncToDist('bonta');
console.log('=== ALL DOWNLOADS & SYNC COMPLETE ===');

