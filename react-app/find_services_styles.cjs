const fs = require('fs');
const content = fs.readFileSync('src/pages/Services.jsx', 'utf8');

// Find all <style> blocks in htmlContent or other parts of Services.jsx
let pos = 0;
while (true) {
  const start = content.indexOf('<style', pos);
  if (start === -1) break;
  const end = content.indexOf('</style>', start);
  if (end === -1) break;
  console.log(`Found style tag at index ${start}-${end}:`);
  console.log(content.substring(start, end + 8).substring(0, 1500));
  console.log('========================================================\n');
  pos = end + 8;
}
