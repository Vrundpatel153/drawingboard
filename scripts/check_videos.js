const https = require('https');

const galleryIds = [
  { id: '256457871', name: 'Rustic Cafe (Rooted)' },
  { id: '256346351', name: 'Boho Cafe (Arcomi)' },
  { id: '254354545', name: 'OUUR CAFE' },
  { id: '258253867', name: 'ELSEWHERE' },
  { id: '256519459', name: 'Cafe Bakery (Maison)' },
  { id: '254623725', name: 'Ghalia Acarverde' }
];

function fetchUrl(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.on('error', (e) => resolve('ERROR: ' + e.message));
  });
}

(async () => {
  for (const g of galleryIds) {
    const html = await fetchUrl('https://www.behance.net/gallery/' + g.id);
    const hasMp4 = html.includes('.mp4');
    const hasWebm = html.includes('.webm');
    const hasVideo = html.includes('"type":"video"') || html.includes('"video_url"');
    
    // Look for mp4 URLs
    const mp4Matches = html.match(/https?:[^"'\s\\]+\.mp4[^"'\s\\]*/g) || [];
    console.log(`[${g.name}] (ID: ${g.id})`);
    console.log(`  hasMp4: ${hasMp4}, hasWebm: ${hasWebm}, hasVideoModule: ${hasVideo}`);
    if (mp4Matches.length > 0) {
      console.log(`  Found MP4s (${mp4Matches.length}):`, [...new Set(mp4Matches)]);
    }
  }
})();
