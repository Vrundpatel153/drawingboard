import fs from 'fs';

const html = fs.readFileSync('c:/Users/vrund/Downloads/drawingboard/react-app/framer_service.html', 'utf-8');
console.log('Searching for sticky in framer_service.html...');
const matches = html.match(/[^{}]*sticky[^}]*}/gi) || [];
console.log(`Found ${matches.length} occurrences:`);
matches.forEach((m, i) => {
  console.log(`\nMatch ${i+1}:`);
  console.log(m.trim());
});





