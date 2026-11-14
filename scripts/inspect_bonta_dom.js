const fs = require('fs');

const html = fs.readFileSync('scripts/bonta.html', 'utf8');
const allImgTags = [...html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map(m => m[1]);
const allVideoTags = [...html.matchAll(/<source[^>]+src=["']([^"']+)["']/gi)].map(m => m[1]);
const allDataSrc = [...html.matchAll(/data-src=["']([^"']+)["']/gi)].map(m => m[1]);

console.log('All <img> src:', allImgTags.length);
allImgTags.forEach((s, i) => console.log('img:', i+1, s));

console.log('\nAll <video><source> src:', allVideoTags.length);
allVideoTags.forEach((s, i) => console.log('video:', i+1, s));

console.log('\nAll data-src:', allDataSrc.length);
allDataSrc.forEach((s, i) => console.log('data-src:', i+1, s));

