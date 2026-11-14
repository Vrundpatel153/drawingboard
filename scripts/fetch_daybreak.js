const fs = require('fs');

async function main() {
  const url = 'https://www.behance.net/daybreakdesignstudio';
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5'
      }
    });
    console.log('Status:', res.status, res.statusText);
    const html = await res.text();
    console.log('HTML length:', html.length);
    fs.writeFileSync('scratch_daybreak.html', html, 'utf8');

    // Search for gallery links or project data
    const matches = [...html.matchAll(/\/gallery\/(\d+)\/([a-zA-Z0-9_-]+)/g)];
    console.log('Found gallery matches:', matches.length);
    const unique = new Map();
    for (const m of matches) {
      if (!unique.has(m[1])) {
        unique.set(m[1], { id: m[1], slug: m[2], url: `https://www.behance.net/gallery/${m[1]}/${m[2]}` });
      }
    }
    console.log('Unique projects:', unique.size);
    for (const p of unique.values()) {
      console.log(p);
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

main();
