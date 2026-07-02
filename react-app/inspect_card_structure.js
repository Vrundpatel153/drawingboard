import fs from 'fs';

const html = fs.readFileSync('./framer_service_new.html', 'utf-8');

const match = html.match(/class="framer-1fc14sw-container"[^>]*>([\s\S]*?)<\/div><\/div><\/div><\/div>/);
if (match) {
  const cardHtml = match[0];
  console.log('--- Card HTML (First 1500 chars) ---');
  console.log(cardHtml.substring(0, 1500));
} else {
  console.log('Card not found');
}
