import fs from 'fs';

const html = fs.readFileSync('./framer_service_new.html', 'utf-8');

const regex = /@media[^{]*\{[^{}]*\.framer-[a-zA-Z0-9_-]*en75vv[^{]*\{[^}]*\}/g;
let m;
console.log('--- Media queries for en75vv ---');
while ((m = regex.exec(html)) !== null) {
  console.log(m[0]);
}
