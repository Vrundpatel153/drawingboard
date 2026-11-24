const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: 'f4xvzpqg',
  api_key: '871482397121656',
  api_secret: 'yS_-6Ruh6Vjb4RNhTW1FTl9Ac2E'
});

const MANIFEST_PATH = path.resolve('./cdn_manifest.json');
const PROGRESS_PATH = path.resolve('./cloudinary_progress.json');
const MAPPING_PATH = path.resolve('./cloudinary_mapping.json');

const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));

// Load existing progress if any
let progress = {};
if (fs.existsSync(PROGRESS_PATH)) {
  try {
    progress = JSON.parse(fs.readFileSync(PROGRESS_PATH, 'utf8'));
    console.log(`Loaded existing progress: ${Object.keys(progress).length} assets already uploaded.`);
  } catch (e) {
    progress = {};
  }
}

function saveProgress() {
  fs.writeFileSync(PROGRESS_PATH, JSON.stringify(progress, null, 2), 'utf8');
}

async function uploadSingleAsset(item, attempt = 1) {
  const filepath = path.resolve(item.staged_relative_path);
  const ext = path.extname(item.staged_filename).toLowerCase();
  const baseName = path.basename(item.staged_filename, ext);
  const folder = `drawingsboard/${item.staged_category}/${item.staged_folder}`;

  try {
    let result;
    if (['.mp4', '.webm', '.mov'].includes(ext)) {
      result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_large(filepath, {
          resource_type: 'video',
          folder: folder,
          public_id: baseName,
          chunk_size: 6000000,
          overwrite: true
        }, (err, res) => {
          if (err) reject(err);
          else resolve(res);
        });
      });
    } else if (ext === '.gif') {
      const stat = fs.statSync(filepath);
      if (stat.size > 10485760) {
        // Upload large GIF as video
        result = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_large(filepath, {
            resource_type: 'video',
            folder: folder,
            public_id: baseName,
            chunk_size: 6000000,
            overwrite: true
          }, (err, res) => {
            if (err) reject(err);
            else resolve(res);
          });
        });
      } else {
        result = await cloudinary.uploader.upload(filepath, {
          resource_type: 'image',
          folder: folder,
          public_id: baseName,
          overwrite: true
        });
      }
    } else {
      // Standard image / SVG
      result = await cloudinary.uploader.upload(filepath, {
        resource_type: 'image',
        folder: folder,
        public_id: baseName,
        overwrite: true
      });
    }

    if (!result || !result.secure_url) {
      throw new Error('Upload succeeded but secure_url missing: ' + JSON.stringify(result));
    }

    return {
      id: item.id,
      original_path: item.original_path,
      staged_filename: item.staged_filename,
      public_id: result.public_id,
      secure_url: result.secure_url,
      format: result.format,
      bytes: result.bytes,
      resource_type: result.resource_type
    };

  } catch (err) {
    if (attempt <= 3) {
      const waitMs = attempt * 2000;
      console.warn(`[Retry ${attempt}/3] ${item.staged_filename}: ${err.message}. Waiting ${waitMs}ms...`);
      await new Promise(r => setTimeout(r, waitMs));
      return uploadSingleAsset(item, attempt + 1);
    } else {
      throw new Error(`Failed to upload ${item.staged_filename} after 3 attempts: ${err.message}`);
    }
  }
}

async function runBatch() {
  const itemsToUpload = manifest.filter(m => !progress[m.id]);
  console.log(`Starting upload: ${itemsToUpload.length} remaining out of ${manifest.length} total.`);

  const CONCURRENCY = 6;
  let activeIndex = 0;
  let completed = Object.keys(progress).length;
  let failed = 0;
  const startTime = Date.now();

  async function worker(workerId) {
    while (activeIndex < itemsToUpload.length) {
      const currentIdx = activeIndex++;
      const item = itemsToUpload[currentIdx];

      try {
        const res = await uploadSingleAsset(item);
        progress[item.id] = res;
        completed++;

        if (completed % 10 === 0 || completed === manifest.length) {
          saveProgress();
          const elapsedSec = ((Date.now() - startTime) / 1000).toFixed(1);
          const rate = (completed / elapsedSec).toFixed(1);
          console.log(`[Progress ${completed}/${manifest.length}] (${((completed/manifest.length)*100).toFixed(1)}%) | Elapsed: ${elapsedSec}s | Rate: ${rate} files/s | Last: ${item.staged_filename}`);
        }
      } catch (err) {
        console.error(`[FATAL ERROR] Asset ID ${item.id} (${item.staged_filename}):`, err.message);
        failed++;
      }
    }
  }

  const workers = [];
  for (let i = 0; i < CONCURRENCY; i++) {
    workers.push(worker(i + 1));
  }

  await Promise.all(workers);
  saveProgress();

  console.log(`\n========================================`);
  console.log(`Upload batch complete! Total: ${completed}/${manifest.length}, Failed: ${failed}`);
  console.log(`Total time: ${((Date.now() - startTime) / 1000).toFixed(1)}s`);
  console.log(`========================================\n`);

  // Build clean mapping: original_path -> cloudinary secure_url
  const mapping = {};
  manifest.forEach(m => {
    if (progress[m.id]) {
      mapping[m.original_path] = progress[m.id].secure_url;
      // also map without leading slash for flexibility
      const noSlash = m.original_path.replace(/^\//, '');
      mapping[noSlash] = progress[m.id].secure_url;
    }
  });

  fs.writeFileSync(MAPPING_PATH, JSON.stringify(mapping, null, 2), 'utf8');
  console.log(`Saved mapping to ${MAPPING_PATH} (${Object.keys(mapping).length / 2} unique assets).`);
}

runBatch().catch(err => {
  console.error('Batch runner error:', err);
  saveProgress();
  process.exit(1);
});
