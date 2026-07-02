import fs from 'fs';

const html = fs.readFileSync('./framer_service_new.html', 'utf-8');

// Find all matches for data-framer-name="Phone"
let pos = 0;
let occurrences = [];
while (true) {
  const idx = html.indexOf('data-framer-name="Phone"', pos);
  if (idx === -1) break;
  occurrences.push(idx);
  pos = idx + 1;
}

console.log(`Found ${occurrences.length} Phone nodes`);

occurrences.forEach((idx, i) => {
  console.log(`\n--- Phone node ${i + 1} at ${idx} ---`);
  console.log(html.substring(idx - 100, idx + 800));
});

// Let's print around the first occurrences of mobile cards (281719)
console.log('\n--- Service 1 (index 281719) Context ---');
console.log(html.substring(281719 - 400, 281719 + 600));
