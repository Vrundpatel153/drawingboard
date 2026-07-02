import fs from 'fs';

const html = fs.readFileSync('./framer_service_new.html', 'utf-8');

console.log('--- Occurrences of framer-1fc14sw-container ---');
const regex = /framer-1fc14sw-container/g;
let match;
let count = 0;
while ((match = regex.exec(html)) !== null) {
  count++;
  console.log(`Match ${count} at ${match.index}`);
}
