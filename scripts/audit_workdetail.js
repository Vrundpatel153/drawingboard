const fs = require('fs');
const c = fs.readFileSync('react-app/src/pages/WorkDetail.jsx', 'utf8');

const checks = [
  'isRooted', 'isArcomi', 'isOuur', 'isMaison', 'isGhalia',
  'isElsewhere', 'isMatcha', 'isPronto', 'isMurami', 'isDorada',
  'isToodaloo', 'isKame', 'isYala', 'isReel', 'isBanam', 'isMorningGrain'
];

checks.forEach(flag => {
  const defined = c.includes('const ' + flag);
  
  // Find where it's used
  let count = 0;
  let pos = 0;
  while ((pos = c.indexOf(flag, pos)) !== -1) {
    count++;
    pos += flag.length;
  }
  
  const problemSection = c.slice(c.indexOf('className="problem"'), c.indexOf('className="gallery-wrap"'));
  const specSection = c.slice(c.indexOf('className="spec-grid"'), c.lastIndexOf('</section>'));
  
  console.log(flag.padEnd(16), 
    `| defined: ${defined}`.padEnd(17), 
    `| total occurrences: ${count}`.padEnd(25),
    `| inProblem: ${problemSection.includes(flag)}`.padEnd(20),
    `| inSpecGrid: ${specSection.includes(flag)}`
  );
});

