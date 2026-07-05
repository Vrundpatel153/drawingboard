const fs = require('fs');
const content = fs.readFileSync('src/pages/Services.jsx', 'utf8');

// Find all HTML elements with classes that wrap the mobile content
// Usually they look like <div class="framer-... hidden-..."
const regex = /<div class="([^"]+)"[^>]*>/g;
let match;
const found = [];
while ((match = regex.exec(content)) !== null) {
  const cls = match[1];
  if (cls.includes('hidden-') || cls.includes('framer-C1TEG') || cls.includes('framer-deISe')) {
    found.push(match[0]);
  }
}
console.log('Found wrapper elements:', found.slice(0, 30));
