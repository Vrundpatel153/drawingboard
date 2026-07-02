import fs from 'fs';

const html = fs.readFileSync('./framer_service_new.html', 'utf-8');

console.log('--- CSS Rules with display:none ---');
const regex = /\.framer-[a-zA-Z0-9_-]*((190umid)|(qkc2q4)|(D2XRP)|(1udromg))[^{]*\{[^}]*display:\s*none[^}]*\}/g;
let m;
while ((m = regex.exec(html)) !== null) {
  console.log(m[0]);
}
