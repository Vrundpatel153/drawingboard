import fs from 'fs';

const html = fs.readFileSync('./framer_service_new.html', 'utf-8');

const targetIdx = html.indexOf('class="framer-190umid"');

// Trace backward to find all parent open tags
const parents = [];
let depth = 0;
let pos = targetIdx;

while (pos > 0) {
  const prevOpen = html.lastIndexOf('<div', pos - 1);
  const prevClose = html.lastIndexOf('</div>', pos - 1);

  if (prevOpen === -1) break;

  if (prevClose !== -1 && prevClose > prevOpen) {
    // A tag closed before our target, so we skip over it
    pos = prevOpen;
  } else {
    // This is a parent tag
    const tagContent = html.substring(prevOpen, html.indexOf('>', prevOpen) + 1);
    parents.unshift(tagContent);
    pos = prevOpen;
  }
}

console.log('--- Parents of framer-190umid ---');
parents.slice(-20).forEach((tag, idx) => {
  console.log(' '.repeat(idx * 2) + tag);
});
