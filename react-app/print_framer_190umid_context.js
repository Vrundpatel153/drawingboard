import fs from 'fs';

const html = fs.readFileSync('./framer_service_new.html', 'utf-8');

const idx = html.indexOf('class="framer-190umid"');
if (idx === -1) {
  console.log('Not found');
  process.exit(1);
}

console.log('HTML Context of framer-190umid:');
console.log(html.substring(idx - 1500, idx + 1500));
