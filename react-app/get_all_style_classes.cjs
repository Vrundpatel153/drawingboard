const fs = require('fs');
const content = fs.readFileSync('src/pages/Services.jsx', 'utf8');

// Find all class names defined in the CSS text of Services.jsx
const regex = /\.framer-[a-zA-Z0-9]+/g;
let match;
const classes = new Set();
while ((match = regex.exec(content)) !== null) {
  classes.add(match[0]);
}
console.log('Found all framer classes in Services.jsx:', Array.from(classes).slice(0, 100));
