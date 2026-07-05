const fs = require('fs');
const d = JSON.parse(fs.readFileSync('public/projects/lumen-fine-jewellery.json', 'utf8'));

// Search styles for display: none or hidden-class rules
const allStyles = d.styles.join('\n');
const noneMatches = allStyles.match(/[^\n]*display\s*:\s*none[^\n]*/g) || [];
console.log('CSS rules with display:none:', noneMatches.length);
noneMatches.slice(0, 20).forEach((r, i) => console.log(i, r));

// Check for framer-h5otg7 in styles
const h5Matches = allStyles.match(/[^\n]*framer-h5otg7[^\n]*/g) || [];
console.log('\nCSS rules for framer-h5otg7:', h5Matches.length);
h5Matches.forEach((r, i) => console.log(i, r));

// Check for opacity:0 replacements
const opacityMatches = allStyles.match(/[^\n]*opacity\s*:\s*0[^\n]*/g) || [];
console.log('\nCSS rules with opacity:0:', opacityMatches.length);
opacityMatches.slice(0, 5).forEach((r, i) => console.log(i, r));

// Check for hidden- class in styles (framer SSR variant hiding)
const hiddenMatches = allStyles.match(/\.hidden-[a-z0-9]+\s*\{[^}]+\}/g) || [];
console.log('\nhidden-* CSS rules:', hiddenMatches.length);
hiddenMatches.slice(0, 10).forEach((r, i) => console.log(i, r));
