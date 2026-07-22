import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getMatches(content, regex) {
  const matches = [];
  let m;
  while ((m = regex.exec(content)) !== null) {
    matches.push(m[1] || m[0]);
  }
  return matches;
}

const files = ['framer_home.html', 'framer_about.html', 'framer_service.html', 'framer_contact.html', 'framer_work.html'];

files.forEach(fileName => {
  const filePath = path.join(__dirname, fileName);
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');

  console.log(`=== ${fileName} ===`);

  // Cal.com or booking links
  const calLinks = getMatches(content, /href=["']([^"']*cal\.com[^"']*)["']/g);
  if (calLinks.length > 0) console.log('Cal.com Links:', calLinks);

  // Testimonials or quotes
  const quotes = getMatches(content, /"([^"]{30,})"/g);
  if (quotes.length > 0) console.log('Quotes:', quotes.slice(0, 5));

  // Headings
  const headings = getMatches(content, /<h[1-3][^>]*>(.*?)<\/h[1-3]>/g).map(h => h.replace(/<[^>]+>/g, '').trim());
  console.log('Headings:', headings.slice(0, 8));
});
