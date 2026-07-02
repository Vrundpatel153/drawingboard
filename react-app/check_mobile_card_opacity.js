import fs from 'fs';

const html = fs.readFileSync('./framer_service_new.html', 'utf-8');

const startIdx = html.indexOf('class="framer-190umid"');
const endIdx = html.indexOf('class="framer-y9c5l7-container"', startIdx);

const section = html.substring(startIdx, endIdx);

console.log('--- Number of elements with opacity:0 ---');
console.log('Matches:', (section.match(/opacity:\s*0[;"]/g) || []).length);
