const fs = require('fs');

async function scrape(url, name) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
      }
    });
    console.log(`[${name}] Status:`, res.status);
    const html = await res.text();
    fs.writeFileSync(`scripts/${name}.html`, html, 'utf8');
    console.log(`[${name}] Saved ${html.length} bytes to scripts/${name}.html`);
  } catch (err) {
    console.error(`[${name}] Error:`, err.message);
  }
}

async function main() {
  await scrape('https://www.studiosevd.com/works/gusto', 'gusto');
  await scrape('https://magpie-studio.com/work/bonta/', 'bonta');
}

main();

