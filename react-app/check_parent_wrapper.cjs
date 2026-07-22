const fs = require('fs');
const content = fs.readFileSync('src/pages/Studio.jsx', 'utf8');

const search = 'framer-jdfaav';
const idx = content.indexOf(search);
if (idx !== -1) {
  console.log(content.substring(idx - 6500, idx + 50));
} else {
  console.log('Not found');
}
