const fs = require('fs');
const html = fs.readFileSync('src/pages/Services.jsx', 'utf8');
const links = html.match(/<a[^>]*>.*?<\/a>/g);
if (links) {
  links.forEach(l => {
    const hrefMatch = l.match(/href="([^"]*)"/);
    const href = hrefMatch ? hrefMatch[1] : 'no-href';
    const text = l.replace(/<[^>]+>/g, '').trim();
    if (text.length > 0) {
      console.log(href, ' | ', text);
    }
  });
}
