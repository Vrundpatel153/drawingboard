const fs = require('fs');
const { execSync } = require('child_process');

const gustoUrls = JSON.parse(fs.readFileSync('scripts/gusto_urls.json', 'utf8'));

console.log('Testing gusto URLs...');
const valid = [];
gustoUrls.forEach((url, i) => {
  try {
    const head = execSync(`curl.exe -s -I -L "${url}"`, { encoding: 'utf8' });
    const clMatch = head.match(/content-length:\s*(\d+)/i);
    const ctMatch = head.match(/content-type:\s*([^\r\n]+)/i);
    const length = clMatch ? parseInt(clMatch[1]) : 0;
    const type = ctMatch ? ctMatch[1].trim() : 'unknown';
    console.log(`[${i+1}] ${type} (${Math.round(length/1024)} KB) <- ${url}`);
    if (length > 5000 || type.includes('video')) {
      valid.push({ url, length, type });
    }
  } catch (err) {
    console.log(`[${i+1}] Error: ${err.message}`);
  }
});

console.log('Valid high-res gusto assets:', valid.length);
fs.writeFileSync('scripts/gusto_filtered.json', JSON.stringify(valid, null, 2));

