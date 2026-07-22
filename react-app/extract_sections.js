import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileNames = ['framer_home.html', 'framer_about.html', 'framer_service.html', 'framer_contact.html', 'framer_work.html'];

fileNames.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) return;
  const html = fs.readFileSync(filePath, 'utf8');

  // Extract all text inside framer-text elements
  const textMatches = html.match(/class="[^"]*framer-text[^"]*"[^>]*>(.*?)<\/(p|h1|h2|h3|h4|h5|h6|span|div)>/g) || [];
  const cleanTexts = textMatches
    .map(t => t.replace(/<[^>]+>/g, '').trim())
    .filter(t => t.length > 5);

  // Remove duplicates
  const uniqueTexts = Array.from(new Set(cleanTexts));

  console.log(`\n=================== ${file} (${uniqueTexts.length} unique text nodes) ===================`);
  console.log(uniqueTexts.slice(0, 35).join('\n---\n'));
});
