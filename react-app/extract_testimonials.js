import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const framerHome = fs.readFileSync(path.join(__dirname, 'framer_home.html'), 'utf8');

// Find all paragraphs or quotes
const textMatches = framerHome.match(/<p[^>]*>(.*?)<\/p>/g) || [];
const quotes = textMatches
  .map(p => p.replace(/<[^>]+>/g, '').trim())
  .filter(txt => txt.length > 25);

console.log("Extracted text snippets count:", quotes.length);
console.log("Sample text snippets:");
console.log(quotes.slice(0, 20));
