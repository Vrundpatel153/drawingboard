const fs = require('fs');
const content = fs.readFileSync('src/pages/Services.jsx', 'utf8');

// Let's find all classes ending with "-container" inside the framer-1udromg container
const start = content.indexOf('class="framer-1udromg"');
if (start !== -1) {
  const segment = content.substring(start, start + 30000);
  const regex = /class="([^"]+-container)"/g;
  let match;
  const classes = new Set();
  while ((match = regex.exec(segment)) !== null) {
    classes.add(match[1]);
  }
  console.log('Found container classes inside framer-1udromg:', Array.from(classes));
} else {
  console.log('framer-1udromg not found');
}
