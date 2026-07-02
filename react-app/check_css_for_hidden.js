import fs from 'fs';

const content = fs.readFileSync('./src/pages/Services.jsx', 'utf-8');

// Find styles block in Services.jsx
const stylesStart = content.indexOf('const styles = [');
const stylesEnd = content.indexOf('];', stylesStart);
const stylesStr = content.substring(stylesStart, stylesEnd);

const hasHidden = stylesStr.includes('hidden-1xqv3hd');
console.log('Does the CSS styles array contain hidden-1xqv3hd?', hasHidden);
