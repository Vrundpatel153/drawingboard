const fs = require('fs');
const content = fs.readFileSync('src/pages/Services.jsx', 'utf8');

const startIdx = content.indexOf('<style>{`\n        /* ═══════════════════════════════════════════════════');
if (startIdx !== -1) {
  const endIdx = content.indexOf('`}</style>', startIdx);
  if (endIdx !== -1) {
    console.log(content.substring(startIdx, endIdx + 10));
  } else {
    console.log('End style tag not found');
  }
} else {
  console.log('Start style tag not found');
}
