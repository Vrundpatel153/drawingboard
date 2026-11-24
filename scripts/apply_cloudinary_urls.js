const fs = require('fs');
const path = require('path');

const mapping = JSON.parse(fs.readFileSync('./cloudinary_mapping.json', 'utf8'));

// Get all keys starting with '/' and sort by length descending
const originalPathsWithSlash = Object.keys(mapping)
  .filter(k => k.startsWith('/'))
  .sort((a, b) => b.length - a.length);

console.log(`Loaded ${originalPathsWithSlash.length} asset replacement rules.`);

let totalReplacements = 0;
const modifiedFiles = [];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  let fileReplacements = 0;

  for (const p of originalPathsWithSlash) {
    const cdnUrl = mapping[p];
    const noSlash = p.slice(1);

    // Replace with leading slash
    if (content.includes(p)) {
      // Don't replace if it's already part of a cloudinary url (though cloudinary urls won't match /images/...)
      const count = content.split(p).length - 1;
      content = content.replaceAll(p, cdnUrl);
      fileReplacements += count;
    }

    // Replace without leading slash if enclosed in quotes or parens
    // e.g. "images/bonta/bonta_01.jpg" or 'images/bonta/bonta_01.jpg'
    const quoteVariants = [
      [`"${noSlash}"`, `"${cdnUrl}"`],
      [`'${noSlash}'`, `'${cdnUrl}'`],
      [`\`${noSlash}\``, `\`${cdnUrl}\``],
      [`(${noSlash})`, `(${cdnUrl})`],
      [`="${noSlash}"`, `="${cdnUrl}"`],
      [`='${noSlash}'`, `='${cdnUrl}'`]
    ];

    for (const [target, replacement] of quoteVariants) {
      if (content.includes(target)) {
        const count = content.split(target).length - 1;
        content = content.replaceAll(target, replacement);
        fileReplacements += count;
      }
    }
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    modifiedFiles.push({ file: filePath, replacements: fileReplacements });
    totalReplacements += fileReplacements;
  }
}

function scanDir(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', '.git', 'dist'].includes(entry.name)) continue;
      scanDir(full);
    } else if (/\.(jsx|js|json|css|html)$/.test(entry.name)) {
      if (entry.name.includes('manifest') || entry.name.includes('mapping') || entry.name.includes('progress') || entry.name.includes('stage_') || entry.name.includes('apply_') || entry.name.includes('verify_')) continue;
      processFile(full);
    }
  }
}

scanDir('./react-app/src');
scanDir('./react-app/public/projects');
if (fs.existsSync('./react-app/index.html')) {
  processFile(path.resolve('./react-app/index.html'));
}

console.log(`\n========================================`);
console.log(`Replacement complete!`);
console.log(`Modified ${modifiedFiles.length} files with ${totalReplacements} Cloudinary CDN links.`);
console.log(`========================================\n`);

modifiedFiles.sort((a, b) => b.replacements - a.replacements).slice(0, 30).forEach(f => {
  console.log(`  ${f.file.padEnd(70)} : ${f.replacements} replacements`);
});
