import fs from 'fs';

const html = fs.readFileSync('./framer_service_new.html', 'utf-8');

// Find all matches for ssr-variant
let pos = 0;
let count = 0;
while (true) {
  const idx = html.indexOf('class="ssr-variant', pos);
  if (idx === -1) break;
  count++;
  console.log(`\n--- ssr-variant ${count} at ${idx} ---`);
  const tagContent = html.substring(idx, html.indexOf('>', idx) + 1);
  console.log('Tag:', tagContent);
  // Get text of first few headings in this variant
  const content = html.substring(idx, idx + 15000);
  const headings = content.match(/<h[2-4][^>]*>([\s\S]*?)<\/h[2-4]>/gi) || [];
  console.log('Headings in this variant:', headings.map(h => h.replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ')).slice(0, 10));
  pos = idx + 1;
}
