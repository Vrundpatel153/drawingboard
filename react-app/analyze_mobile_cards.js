import fs from 'fs';

const html = fs.readFileSync('./framer_service_new.html', 'utf-8');

// We saw Match 2 leads to: class="framer-1uf9gep-container"
const count = (html.match(/1uf9gep-container/g) || []).length;
console.log('Occurrences of "1uf9gep-container":', count);

// Let's print the contexts of all occurrences of 1uf9gep-container
let pos = 0;
while (true) {
  const idx = html.indexOf('1uf9gep-container', pos);
  if (idx === -1) break;
  console.log(`\n--- Occurrence at ${idx} ---`);
  console.log(html.substring(idx - 100, idx + 600));
  pos = idx + 1;
}
