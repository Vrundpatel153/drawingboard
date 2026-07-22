const fs = require('fs');
const content = fs.readFileSync('src/pages/Studio.jsx', 'utf8');

const regex = /\.framer-oNw4l\s+\.framer-353nya[^{]*\{[^}]*\}/g;
let match;
while ((match = regex.exec(content)) !== null) {
  console.log('Match found:');
  console.log(match[0]);
  console.log('------------------------------------');
}

// Also let's print any rule that has `.framer-353nya` in the file
const regex2 = /[^\}]*353nya[^{]*\{[^}]*\}/g;
while ((match = regex2.exec(content)) !== null) {
  console.log('General Match:');
  console.log(match[0].trim());
  console.log('====================================');
}
