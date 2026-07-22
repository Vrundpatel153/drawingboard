const fs = require('fs');
const content = fs.readFileSync('src/pages/Studio.jsx', 'utf8');

const search = 'Trusted by clients';
const idx = content.indexOf(search);
if (idx !== -1) {
  // Let's print 2000 characters before the text to see the full markup structure
  console.log(content.substring(idx - 2500, idx + 100));
} else {
  console.log('Not found');
}
