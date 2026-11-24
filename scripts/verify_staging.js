const fs = require('fs');
const path = require('path');

const base = './cdn_assets_staging';
const dirs = fs.readdirSync(base).filter(f => fs.statSync(path.join(base, f)).isDirectory());

let grandTotalFiles = 0;
let grandTotalBytes = 0;

console.log('Category'.padEnd(25) + ' | Subdirs | Files | Size');
console.log('----------------------------------------------------');

dirs.forEach(d => {
  let catFiles = 0;
  let catBytes = 0;
  const sub = fs.readdirSync(path.join(base, d));
  
  function scan(dir) {
    for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, item.name);
      if (item.isDirectory()) {
        scan(full);
      } else {
        catFiles++;
        catBytes += fs.statSync(full).size;
      }
    }
  }
  scan(path.join(base, d));
  grandTotalFiles += catFiles;
  grandTotalBytes += catBytes;
  console.log(d.padEnd(25) + ' | ' + String(sub.length).padStart(7) + ' | ' + String(catFiles).padStart(5) + ' | ' + (catBytes / 1024 / 1024).toFixed(2).padStart(7) + ' MB');
});

console.log('----------------------------------------------------');
console.log('GRAND TOTAL'.padEnd(25) + ' |         | ' + String(grandTotalFiles).padStart(5) + ' | ' + (grandTotalBytes / 1024 / 1024).toFixed(2).padStart(7) + ' MB');
