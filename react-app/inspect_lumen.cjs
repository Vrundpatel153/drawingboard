const fs = require('fs');
const d = JSON.parse(fs.readFileSync('public/projects/lumen-fine-jewellery.json', 'utf8'));
const html = d.htmlContent;

// Count images
const imgMatches = html.match(/<img[^>]+>/g) || [];
console.log('Total img tags:', imgMatches.length);

// Find sections
const markers = ['The Challenge', 'Our Solution', 'The Outcome', 'Other Works', 'framer-pns6bv', 'framer-h5otg7'];
markers.forEach(m => {
  const idx = html.indexOf(m);
  console.log(m + ':', idx !== -1 ? 'FOUND at ' + idx : 'NOT FOUND');
});

// Print sample img tags
imgMatches.slice(0, 10).forEach((img, i) => {
  const srcMatch = img.match(/src="([^"]+)"/);
  if (srcMatch) console.log('IMG ' + i + ':', srcMatch[1].substring(0, 100));
});
