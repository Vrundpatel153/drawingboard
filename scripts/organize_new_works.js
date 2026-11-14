const fs = require('fs');
const path = require('path');

function organize(dirName, prefix) {
  const dir = path.join('react-app/public/images', dirName);
  const files = fs.readdirSync(dir).filter(f => !f.includes('cover'));

  // Sort files nicely
  files.sort((a, b) => {
    const na = parseInt(a.replace(/[^0-9]/g, '')) || 0;
    const nb = parseInt(b.replace(/[^0-9]/g, '')) || 0;
    return na - nb;
  });

  const finalImages = [];
  files.forEach((file, idx) => {
    const ext = path.extname(file);
    const num = String(idx + 1).padStart(2, '0');
    const newName = `${prefix}_${num}${ext}`;
    const oldPath = path.join(dir, file);
    const newPath = path.join(dir, newName);

    if (oldPath !== newPath) {
      fs.renameSync(oldPath, newPath);
    }
    finalImages.push(`/images/${dirName}/${newName}`);
  });

  // Ensure cover
  const coverPath = `/images/${dirName}/${prefix}_cover.jpg`;

  // Sync to dist
  const distDir = path.join('react-app/dist/images', dirName);
  if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });
  fs.cpSync(dir, distDir, { recursive: true });

  console.log(`Organized ${dirName}: ${finalImages.length} assets`);
  return { coverImage: coverPath, images: finalImages };
}

const gustoData = organize('gusto', 'gusto');
const bontaData = organize('bonta', 'bonta');

fs.writeFileSync('scripts/organized_manifest.json', JSON.stringify({ gusto: gustoData, bonta: bontaData }, null, 2));
