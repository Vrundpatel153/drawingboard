const fs = require('fs');
const path = require('path');
const https = require('https');

const projects = [
  {
    name: 'gloopy',
    dir: 'react-app/public/images/gloopy',
    images: [
      'c99a46236877151.68f55078beeb0.png',
      '77a295236877151.68f5507a468ba.png',
      'f27e27236877151.68f5507a471a3.png',
      '9a2aaa236877151.68f5507a47909.png',
      '483557236877151.68f5507a4839f.png',
      '93a22a236877151.68f5507a48ae7.png',
      '6bf899236877151.68f5507a45ff7.png'
    ]
  },
  {
    name: 'bunzo-bun',
    dir: 'react-app/public/images/bunzo-bun',
    images: [
      'd8204f211621723.67269c924098b.png',
      '0a5041211621723.67269c911950e.png',
      '23906d211621723.67269c9241090.png',
      'f8a7d3211621723.67269c92416eb.png',
      '55cf1a211621723.67269c92421ca.png',
      'a519f0211621723.67269c9242bfc.png',
      '0e391e211621723.67269c924352a.png',
      '9b00be211621723.67269c9243e31.png',
      'b8d6ed211621723.67269c924452b.png',
      'bd34ef211621723.67269c9244e0c.png',
      '026c62211621723.67269c924549a.png'
    ]
  },
  {
    name: 'chai-to',
    dir: 'react-app/public/images/chai-to',
    images: [
      'a115dc202344443.66846c9b9463e.png',
      '58a9b5202344443.66846c9b95033.png',
      '700473202344443.66846c9b95570.png',
      'a791ed202344443.66846c9b95ddc.png',
      '68d7c6202344443.66846c9b962c2.png',
      'e5e77f202344443.66846c9b96ae9.png'
    ]
  },
  {
    name: 'brite-harvest',
    dir: 'react-app/public/images/brite-harvest',
    images: [
      'aff3a2201585137.667723d314703.png',
      'be41f6201585137.667723d314c38.png',
      '7e43de201585137.667723d3150ff.png',
      '108214201585137.667723d31559d.png',
      'c076ed201585137.667723d315d77.png'
    ]
  }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode} for ${url}`));
      }
      const stream = fs.createWriteStream(dest);
      res.pipe(stream);
      stream.on('finish', () => {
        stream.close();
        resolve();
      });
      stream.on('error', reject);
    }).on('error', reject);
  });
}

async function tryDownload(filename, dest) {
  const prefixes = [
    'https://mir-s3-cdn-cf.behance.net/project_modules/1400/',
    'https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/',
    'https://mir-s3-cdn-cf.behance.net/project_modules/source/',
    'https://mir-s3-cdn-cf.behance.net/project_modules/disp/'
  ];
  for (const pfx of prefixes) {
    try {
      await downloadFile(pfx + filename, dest);
      return true;
    } catch (e) {
      // try next prefix
    }
  }
  return false;
}

(async () => {
  for (const proj of projects) {
    fs.mkdirSync(proj.dir, { recursive: true });
    console.log(`\n=== Downloading ${proj.name} (${proj.images.length} images) ===`);
    let idx = 0;
    for (const img of proj.images) {
      idx++;
      const ext = path.extname(img) || '.png';
      const outName = idx === 1 ? `${proj.name}_cover${ext}` : `${proj.name}_${String(idx).padStart(2, '0')}${ext}`;
      const outPath = path.join(proj.dir, outName);
      process.stdout.write(`Downloading ${outName}... `);
      const ok = await tryDownload(img, outPath);
      if (ok) {
        const stats = fs.statSync(outPath);
        console.log(`OK (${(stats.size / 1024).toFixed(1)} KB)`);
      } else {
        console.log(`FAILED`);
      }
    }
  }
  console.log('\nAll downloads complete!');
})();
