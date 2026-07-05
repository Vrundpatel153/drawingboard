const fs = require('fs');
const d = JSON.parse(fs.readFileSync('public/projects/lumen-fine-jewellery.json', 'utf8'));
const html = d.htmlContent;

// Find what sections have hidden-* classes
const hiddenClasses = ['hidden-vbuvjo', 'hidden-hkxzaz', 'hidden-ob5ktt', 'hidden-hiyi3', 'hidden-5z9yny', 'hidden-14pxg5e'];
hiddenClasses.forEach(cls => {
  const idx = html.indexOf(cls);
  if (idx !== -1) {
    const snippet = html.substring(Math.max(0, idx-100), Math.min(html.length, idx+200));
    console.log('\n=== ' + cls + ' ===');
    console.log(snippet);
  } else {
    console.log(cls + ': NOT found in HTML');
  }
});

// Also find breakpoints in the data-framer-hydrate
const hydrateMatch = html.match(/data-framer-hydrate-v2="([^"]+)"/);
if (hydrateMatch) {
  const decoded = hydrateMatch[1].replace(/&quot;/g, '"');
  const data = JSON.parse(decoded);
  console.log('\nBreakpoints:', JSON.stringify(data.breakpoints));
}
