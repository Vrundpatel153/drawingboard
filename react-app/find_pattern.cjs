const fs = require('fs');
const content = fs.readFileSync('src/pages/Home.jsx', 'utf8');

const query = '1j2fw2t';
const index = content.indexOf(query);
if (index !== -1) {
  console.log(content.substring(index, index + 2500));
} else {
  console.log('Not found');
}
