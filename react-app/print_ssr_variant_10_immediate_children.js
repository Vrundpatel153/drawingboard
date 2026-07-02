import fs from 'fs';

const html = fs.readFileSync('./framer_service_new.html', 'utf-8');

console.log('ssr-variant 10 immediate content:');
console.log(html.substring(264287, 266000));
