const fs = require('fs');
const path = 'public/services/packaging-design.json';
if (fs.existsSync(path)) {
  console.log(`File ${path} exists.`);
  const stats = fs.statSync(path);
  console.log(`Size: ${stats.size} bytes`);
  const content = fs.readFileSync(path, 'utf8');
  console.log(`Snippet: ${content.substring(0, 200)}`);
} else {
  console.log(`File ${path} DOES NOT exist.`);
}
