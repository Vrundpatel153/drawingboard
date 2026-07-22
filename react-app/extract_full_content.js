import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const reactAppDir = __dirname;

function searchInFile(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, 'utf8');

  // Extract all framerusercontent image URLs
  const imgRegex = /(https:\/\/framerusercontent\.com\/images\/[a-zA-Z0-9_\-\.\%\?\&=\;\+\#]+)/g;
  const images = [];
  let match;
  while ((match = imgRegex.exec(content)) !== null) {
    let url = match[1].split('?')[0].replace(/\\/g, '').replace(/&quot;/g, '').replace(/["']/g, '');
    if (url.match(/\.(png|jpg|jpeg|svg|webp)$/i) && !images.includes(url)) {
      images.push(url);
    }
  }

  return { filePath, imageCount: images.length, images: images.slice(0, 30) };
}

const filesToInspect = [
  path.join(reactAppDir, 'framer_home.html'),
  path.join(reactAppDir, 'new_framer_home.html'),
  path.join(reactAppDir, 'fresh_home.html'),
  path.join(reactAppDir, 'framer_work.html'),
  path.join(reactAppDir, 'framer_service.html'),
  path.join(reactAppDir, 'framer_contact.html'),
  path.join(reactAppDir, 'framer_about.html'),
  path.join(reactAppDir, 'framer_insights.html')
];

const results = filesToInspect.map(searchInFile).filter(Boolean);
console.log(JSON.stringify(results, null, 2));
