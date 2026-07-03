const fs = require('fs');
const content = fs.readFileSync('debug_home_jsx.txt', 'utf8');

// Let's format the HTML tag starts and ends for readability
let depth = 0;
let formatted = '';
let inTag = false;
let currentTag = '';

for (let i = 0; i < content.length; i++) {
  const char = content[i];
  if (char === '<') {
    inTag = true;
    currentTag = '<';
  } else if (char === '>') {
    inTag = false;
    currentTag += '>';
    
    // Check if closing tag
    if (currentTag.startsWith('</')) {
      depth--;
    }
    
    formatted += '  '.repeat(Math.max(0, depth)) + currentTag + '\n';
    
    // Check if self-closing or opening tag
    if (!currentTag.startsWith('</') && !currentTag.endsWith('/>') && !currentTag.startsWith('<!--') && !currentTag.startsWith('<!')) {
      // Don't indent for non-container tags like img, input, br, hr unless they are block
      const tagName = currentTag.match(/<([a-zA-Z0-9]+)/);
      if (tagName) {
        const name = tagName[1].toLowerCase();
        if (!['img', 'br', 'hr', 'input', 'link', 'meta'].includes(name)) {
          depth++;
        }
      }
    }
    currentTag = '';
  } else if (inTag) {
    currentTag += char;
  } else {
    // text content
    if (char.trim() !== '') {
      formatted += '  '.repeat(Math.max(0, depth)) + char;
      // read until next tag
      while (i + 1 < content.length && content[i + 1] !== '<') {
        formatted += content[i + 1];
        i++;
      }
      formatted = formatted.trimEnd() + '\n';
    }
  }
}

fs.writeFileSync('debug_home_jsx_formatted.txt', formatted);
console.log('Wrote formatted HTML to debug_home_jsx_formatted.txt');
