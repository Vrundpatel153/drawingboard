import fs from 'fs';

const html = fs.readFileSync('./framer_service_new.html', 'utf-8');

const classes = ['hidden-1xqv3hd', 'hidden-1rwyfdt', 'hidden-9ohcpn', 'hidden-i41gn8'];

classes.forEach(c => {
  console.log(`\n--- CSS Rules for "${c}" ---`);
  const regex = new RegExp(`[^}]*\\.${c}[^{]*\\{[^}]*\\}`, 'g');
  let match;
  while ((match = regex.exec(html)) !== null) {
    console.log(match[0].trim());
  }
});
