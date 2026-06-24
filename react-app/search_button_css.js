import fs from 'fs';

const html = fs.readFileSync('framer_service.html', 'utf-8');
const searchClass = 'framer-1ufqwh3';
// Let's find all style blocks containing this class
const styles = [];
const styleRegex = /<style([^>]*)>([\s\S]*?)<\/style>/gi;
let match;
while ((match = styleRegex.exec(html)) !== null) {
  const css = match[2];
  if (css.includes(searchClass)) {
    console.log('Found class ' + searchClass + ' in a style block:');
    // Find lines matching the class
    const lines = css.split('\n');
    lines.forEach((line, i) => {
      if (line.includes(searchClass)) {
        console.log(`  Line ${i+1}: ${line.trim()}`);
      }
    });
  }
}
