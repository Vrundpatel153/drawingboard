const fs = require('fs');

const manifest = JSON.parse(fs.readFileSync('./cdn_manifest.json', 'utf8'));
console.log(`Starting HTTP verification of ${manifest.length} Cloudinary URLs...`);

const CONCURRENCY = 15;
let activeIndex = 0;
let successCount = 0;
let failCount = 0;
const failedItems = [];
const startTime = Date.now();

async function checkUrl(item) {
  const url = item.cdn_url;
  if (!url) {
    throw new Error('No cdn_url defined');
  }

  try {
    const res = await fetch(url, { method: 'HEAD' });
    if (res.status === 200) {
      const contentType = res.headers.get('content-type');
      const contentLength = res.headers.get('content-length');
      return { status: 200, contentType, contentLength };
    } else {
      // If HEAD returns 400 or other, try a range GET
      const getRes = await fetch(url, { method: 'GET', headers: { 'Range': 'bytes=0-100' } });
      if (getRes.status === 200 || getRes.status === 206) {
        return { status: getRes.status, contentType: getRes.headers.get('content-type') };
      }
      throw new Error(`HTTP ${res.status}`);
    }
  } catch (err) {
    throw err;
  }
}

async function worker() {
  while (activeIndex < manifest.length) {
    const idx = activeIndex++;
    const item = manifest[idx];
    try {
      await checkUrl(item);
      successCount++;
    } catch (err) {
      failCount++;
      failedItems.push({ id: item.id, url: item.cdn_url, error: err.message, path: item.staged_relative_path });
    }

    if ((successCount + failCount) % 100 === 0 || (successCount + failCount) === manifest.length) {
      const total = successCount + failCount;
      const pct = ((total / manifest.length) * 100).toFixed(1);
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      console.log(`[Verified ${total}/${manifest.length}] (${pct}%) | Success: ${successCount} | Failed: ${failCount} | Elapsed: ${elapsed}s`);
    }
  }
}

async function run() {
  const workers = [];
  for (let i = 0; i < CONCURRENCY; i++) {
    workers.push(worker());
  }
  await Promise.all(workers);

  console.log('\n========================================');
  console.log(`HTTP Audit Complete:`);
  console.log(`Total URLs Tested: ${manifest.length}`);
  console.log(`HTTP 200 OK: ${successCount} (${((successCount/manifest.length)*100).toFixed(2)}%)`);
  console.log(`Failures: ${failCount}`);
  console.log(`Total Time: ${((Date.now() - startTime) / 1000).toFixed(1)}s`);
  console.log('========================================\n');

  if (failedItems.length > 0) {
    console.error('Failed items sample:', failedItems.slice(0, 10));
    fs.writeFileSync('./cloudinary_failed_urls.json', JSON.stringify(failedItems, null, 2), 'utf8');
  }
}

run();
