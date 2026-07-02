import fs from 'fs';

const html = fs.readFileSync('./framer_service_new.html', 'utf-8');

// Find all ssr-variants and print their exact tags and enclosing context
let pos = 0;
let count = 0;
while (true) {
  const idx = html.indexOf('class="ssr-variant', pos);
  if (idx === -1) break;
  count++;
  console.log(`\n--- ssr-variant ${count} at ${idx} ---`);
  const tag = html.substring(idx, html.indexOf('>', idx) + 1);
  console.log('Tag:', tag);
  pos = idx + 1;
}
