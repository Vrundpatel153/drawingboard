const fs = require('fs');
const content = fs.readFileSync('new_framer_home.html', 'utf8');

const targetStr = 'Client Satisfaction on Average';
const index = content.indexOf(targetStr);
if (index !== -1) {
  // Let's grab 5000 characters before and 5000 characters after
  const sub = content.substring(Math.max(0, index - 5000), Math.min(content.length, index + 5000));
  
  // Regex to extract all HTML tags from the substring
  const tagRegex = /<[^>]+>/g;
  let match;
  console.log('--- HTML TAGS NEAR CARD ---');
  while ((match = tagRegex.exec(sub)) !== null) {
    const tag = match[0];
    if (tag.includes('framer-') || tag.includes('data-framer-name') || tag.includes('img') || tag.includes('style=')) {
      // Print tag if it seems relevant
      console.log(tag);
    }
  }
} else {
  console.log('Not found');
}
