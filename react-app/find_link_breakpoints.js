import fs from 'fs';

const html = fs.readFileSync('./framer_service_new.html', 'utf-8');

const targets = [212669, 224600, 236682, 248456, 260515, 281980, 284076, 286202, 288307];

targets.forEach((pos) => {
  // Traverse backwards to find the nearest ssr-variant wrapper or breakpoint wrapper
  let currentPos = pos;
  let wrapper = 'unknown';
  while (currentPos > 0) {
    const parentFragment = html.substring(currentPos - 100, currentPos);
    if (parentFragment.includes('hidden-') || parentFragment.includes('class="ssr-variant')) {
      const classMatch = html.substring(currentPos - 200, currentPos + 200).match(/class="([^"]+)"/);
      wrapper = classMatch ? classMatch[1] : 'unknown-class';
      break;
    }
    currentPos -= 10;
  }
  console.log(`Pos ${pos} wrapped by classes: ${wrapper}`);
});
