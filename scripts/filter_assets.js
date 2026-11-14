const fs = require('fs');
const path = require('path');

// 1. Analyze and filter Gusto media
function getGustoMedia() {
  const html = fs.readFileSync('scripts/gusto.html', 'utf8');
  // Match framerusercontent images and videos
  const matches = [...html.matchAll(/https:\/\/framerusercontent\.com\/(images|assets)\/[a-zA-Z0-9_-]+\.(jpg|jpeg|png|webp|mp4)/gi)].map(m => m[0]);
  const unique = [...new Set(matches)];
  console.log('Gusto unique assets:', unique.length);
  return unique;
}

// 2. Analyze and filter Bonta media
function getBontaMedia() {
  const html = fs.readFileSync('scripts/bonta.html', 'utf8');
  // Match wp-content/uploads/2024/04/ images and videos
  // Ignore thumbnails with dimensions like -300x192, -46x50, -555x600, etc.
  const raw = [...html.matchAll(/https:\/\/magpie-studio\.com\/wp-content\/uploads\/2024\/\d+\/[a-zA-Z0-9_\-\.]+\.(jpg|jpeg|png|webp|mp4)/gi)].map(m => m[0]);
  
  // Filter only Bonta specific assets (ignore other projects like NiX, Magpie logo, etc.)
  const bontaOnly = raw.filter(u => {
    const lower = u.toLowerCase();
    return lower.includes('bonta') || lower.includes('casestudy') || lower.includes('herotub') || lower.includes('wild-footage') || lower.includes('tub') || lower.includes('tote') || lower.includes('van') || lower.includes('poster') || lower.includes('scooter');
  });

  // Group by base name to get highest resolution version
  const byBase = new Map();
  for (const url of bontaOnly) {
    // Strip thumbnail suffix like -300x200 or -scaled before extension
    const filename = path.basename(url);
    const baseClean = filename.replace(/-\d+x\d+(\.[a-z0-9]+)$/i, '$1');
    const isThumb = /-\d+x\d+\.[a-z0-9]+$/i.test(filename);

    if (!byBase.has(baseClean) || !isThumb) {
      byBase.set(baseClean, url);
    }
  }

  const finalUrls = [...byBase.values()];
  console.log('Bonta unique high-res assets:', finalUrls.length);
  return finalUrls;
}

console.log('=== GUSTO ASSETS ===');
const gustoAssets = getGustoMedia();
gustoAssets.forEach((u, i) => console.log(i + 1, u));

console.log('\n=== BONTA ASSETS ===');
const bontaAssets = getBontaMedia();
bontaAssets.forEach((u, i) => console.log(i + 1, u));

fs.writeFileSync('scripts/gusto_urls.json', JSON.stringify(gustoAssets, null, 2));
fs.writeFileSync('scripts/bonta_urls.json', JSON.stringify(bontaAssets, null, 2));
