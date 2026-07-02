import fs from 'fs';

const html = fs.readFileSync('./framer_service_new.html', 'utf-8');

console.log('--- CSS Rules for xokwx0 ---');
const regex = /\.framer-[a-zA-Z0-9_-]*xokwx0[^{]*\{[^}]*\}/g;
let match;
while ((match = regex.exec(html)) !== null) {
  console.log(match[0]);
}
