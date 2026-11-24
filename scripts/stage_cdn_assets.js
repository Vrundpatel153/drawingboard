const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve('.');
const PUBLIC_DIR = path.join(ROOT_DIR, 'react-app', 'public');
const STAGING_DIR = path.join(ROOT_DIR, 'cdn_assets_staging');

const MEDIA_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.mp4', '.webm', '.mov', '.avif', '.ico']);

// Helper to format bytes
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Ensure staging directory exists
if (!fs.existsSync(STAGING_DIR)) {
  fs.mkdirSync(STAGING_DIR, { recursive: true });
}

// 1. Project sets
const SAAS_SET = new Set([
  'aerotech', 'covalent', 'financelti', 'folium', 'foremark',
  'helione', 'henro', 'kelarc', 'leadlines', 'melden',
  'moverunion', 'newdestin', 'pacent', 'radiance', 'seroq',
  'setience', 'skillshift', 'truehuman', 'westerico'
]);

const SPATIAL_SET = new Set([
  'boho-cafe', 'cafe-bakery', 'ghalia-acarverde', 'ouur-cafe', 'rustic-cafe', 'spatial'
]);

const BRAND_PAGE_SET = new Set([
  'development', 'live-stores', 'reel', 'studio', 'testimonials', 'think'
]);

// Friendly project display names
const PROJECT_PRETTY_NAMES = {
  'bonta': 'bonta-gelato',
  'gusto': 'gusto-pottery',
  'dabbo': 'dabbo-madrid',
  'forte': 'forte-luxury-architecture',
  'high-life-residences': 'high-life-residences',
  'orient-developers': 'orient-developers',
  'after8': 'after8-intimacy',
  'matcha-club': 'matcha-club',
  'sage-beauty-club': 'sage-beauty-club',
  'rest-religion': 'rest-religion',
  'soul-brew': 'soul-brew',
  'coastal-buns': 'coastal-buns',
  'morning-grain': 'morning-grain',
  'nail-care': 'nail-care',
  'blank-body': 'blank-body',
  'bondwith': 'bondwith',
  'bunzo-bun': 'bunzo-bun',
  'brave-rx': 'brave-rx',
  'brite-harvest': 'brite-harvest',
  'chai-to': 'chai-to',
  'crystal': 'crystal',
  'daisy': 'daisy-ui-ux',
  'dorada': 'dorada',
  'elsewhere': 'elsewhere',
  'flint': 'flint',
  'gloopy': 'gloopy',
  'kame': 'kame',
  'murami': 'murami',
  'pronto': 'pronto',
  'toodaloo': 'toodaloo',
  'yaad': 'yaad',
  'yala': 'yala',
  'banam': 'banam',
  'barely': 'barely'
};

// Scan all media files in react-app/public
const allFiles = [];
function scanPublic(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanPublic(full);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (MEDIA_EXTS.has(ext)) {
        const stat = fs.statSync(full);
        const relToPublic = path.relative(PUBLIC_DIR, full).replace(/\\/g, '/');
        allFiles.push({
          sourceFullPath: full,
          sourceRelPath: relToPublic,
          sizeBytes: stat.size,
          ext: ext
        });
      }
    }
  }
}

scanPublic(PUBLIC_DIR);
console.log(`Discovered ${allFiles.length} media files in react-app/public.`);

// Process each file into categorized staging structure
const records = [];
let idCounter = 1;

allFiles.forEach(file => {
  const parts = file.sourceRelPath.split('/');
  const ext = file.ext;
  const originalFileName = path.basename(file.sourceRelPath);
  const originalBaseName = path.basename(file.sourceRelPath, ext);

  let category = '';
  let subfolder = '';
  let newFileName = '';
  let platformLocation = '';
  let mediaType = 'image';

  if (['.mp4', '.webm', '.mov'].includes(ext)) {
    mediaType = 'video';
  } else if (ext === '.svg') {
    mediaType = 'vector';
  } else if (ext === '.gif') {
    mediaType = 'animation';
  }

  // Determine categorization
  if (parts[0] === 'images') {
    if (parts.length === 2) {
      // Direct file in images/ e.g. positioning_territory.jpeg
      category = '04-brand-pages';
      subfolder = 'think-framework';
      newFileName = `think_${originalBaseName}${ext}`;
      platformLocation = 'Think Framework / Strategic Process page';
    } else {
      const dirName = parts[1];
      if (dirName === 'saas') {
        // SaaS covers
        category = '02-saas-branding';
        subfolder = 'saas-covers';
        newFileName = `saas_cover_${originalBaseName}${ext}`;
        platformLocation = `SaaS Brand Index Overview Card (${originalBaseName})`;
      } else if (SAAS_SET.has(dirName)) {
        category = '02-saas-branding';
        subfolder = dirName;
        // Check if name already has saas_ or brand prefix
        if (originalBaseName.startsWith(dirName)) {
          newFileName = `saas_${originalBaseName}${ext}`;
        } else {
          newFileName = `saas_${dirName}_${originalBaseName}${ext}`;
        }
        platformLocation = `SaaS Detail Showcase - ${dirName}`;
      } else if (SPATIAL_SET.has(dirName)) {
        category = '03-spatial-environments';
        subfolder = dirName === 'spatial' ? 'spatial-general' : dirName;
        if (dirName === 'spatial') {
          newFileName = `spatial_general_${originalBaseName.replace(/-/g, '_')}${ext}`;
          platformLocation = 'Spatial Branding Showcase / Services';
        } else {
          newFileName = `spatial_${originalBaseName.replace(/-/g, '_')}${ext}`;
          platformLocation = `Spatial Environment Case Study - ${dirName}`;
        }
      } else if (BRAND_PAGE_SET.has(dirName)) {
        category = '04-brand-pages';
        if (dirName === 'development') {
          subfolder = 'development';
          newFileName = `dev_${originalBaseName}${ext}`;
          platformLocation = 'Digital Engineering & Shopify Development page';
        } else if (dirName === 'live-stores') {
          subfolder = 'live-stores';
          newFileName = `live_store_${originalBaseName}${ext}`;
          platformLocation = 'Live E-Commerce Stores showcase';
        } else if (dirName === 'reel') {
          subfolder = 'reel';
          newFileName = `reel_showcase_${originalBaseName}${ext}`;
          platformLocation = 'Motion Reel & Case Video grid';
        } else if (dirName === 'studio') {
          subfolder = 'studio';
          newFileName = `studio_${originalBaseName}${ext}`;
          platformLocation = 'About Studio & Founders page';
        } else if (dirName === 'testimonials') {
          subfolder = 'testimonials';
          newFileName = `testimonial_${originalBaseName.replace(/-/g, '_')}${ext}`;
          platformLocation = 'Client Testimonials & Executive Quotes';
        } else if (dirName === 'think') {
          subfolder = 'think-framework';
          newFileName = `think_${originalBaseName}${ext}`;
          platformLocation = 'Think Framework / Strategic Methodology';
        }
      } else {
        // Case Study
        const friendlyName = PROJECT_PRETTY_NAMES[dirName] || dirName;
        category = '01-case-studies';
        subfolder = friendlyName;
        // Clean up filename
        const cleanBase = originalBaseName.replace(/-/g, '_');
        newFileName = `${cleanBase}${ext}`;
        platformLocation = `Case Study - ${friendlyName}`;
      }
    }
  } else if (parts[0] === 'logos') {
    category = '05-brand-logos';
    subfolder = 'partner-and-client-marks';
    const cleanBase = originalBaseName.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_');
    newFileName = `brand_logo_${cleanBase}${ext}`;
    platformLocation = 'Partner, Client & Media Logo Carousel';
  } else if (parts[0] === '_assets') {
    if (file.sourceRelPath.includes('whatsap_screenshots')) {
      category = '06-social-proof';
      subfolder = 'whatsapp-client-reviews';
      const fileNum = String(idCounter).padStart(2, '0');
      newFileName = `proof_whatsapp_review_${fileNum}${ext}`;
      platformLocation = 'Social Proof / Client WhatsApp Feedback Carousel';
    } else if (parts[1] === 'assets' && ext === '.mp4') {
      category = '07-site-meta';
      subfolder = 'ambient-video';
      newFileName = `site_ambient_services_reel_loop${ext}`;
      platformLocation = 'Services page background video header loop';
    } else if (parts[1] === 'images') {
      category = '07-site-meta';
      subfolder = 'legacy-framer';
      newFileName = `legacy_framer_${originalBaseName}${ext}`;
      platformLocation = 'Framer legacy graphic asset';
    } else {
      category = '07-site-meta';
      subfolder = 'legacy-framer';
      newFileName = `legacy_framer_${originalBaseName}${ext}`;
      platformLocation = 'Framer legacy asset';
    }
  } else {
    // Files directly in react-app/public root
    category = '07-site-meta';
    if (originalFileName.includes('preview')) {
      subfolder = 'og-share-previews';
      newFileName = `meta_og_${originalBaseName}${ext}`;
      platformLocation = `Social Share / OpenGraph preview image (${originalBaseName})`;
    } else if (['favicon.svg', 'logo.svg', 'icons.svg'].includes(originalFileName)) {
      subfolder = 'brand-identity';
      newFileName = `site_${originalBaseName}${ext}`;
      platformLocation = 'Site Brand Iconography / Identity';
    } else {
      subfolder = 'misc';
      newFileName = `site_${originalBaseName}${ext}`;
      platformLocation = 'Site Asset';
    }
  }

  // Build target destination paths
  const targetDir = path.join(STAGING_DIR, category, subfolder);
  const targetFullPath = path.join(targetDir, newFileName);
  const targetRelPath = path.relative(ROOT_DIR, targetFullPath).replace(/\\/g, '/');

  records.push({
    id: idCounter++,
    originalPath: '/' + file.sourceRelPath,
    sourceFullPath: file.sourceFullPath,
    targetFullPath: targetFullPath,
    targetRelPath: targetRelPath,
    targetCategory: category,
    targetSubfolder: subfolder,
    targetFileName: newFileName,
    fileSizeBytes: file.sizeBytes,
    fileSizeFormatted: formatBytes(file.sizeBytes),
    mediaType: mediaType,
    fileExt: ext.replace('.', ''),
    platformLocation: platformLocation,
    cdnUrlPlaceholder: ''
  });
});

console.log(`Mapped ${records.length} assets.`);

// Check for target path collision
const targetCollisions = new Set();
const seenTargets = new Map();
records.forEach(r => {
  if (seenTargets.has(r.targetFullPath)) {
    targetCollisions.add(r.targetFullPath);
  } else {
    seenTargets.set(r.targetFullPath, r.id);
  }
});

if (targetCollisions.size > 0) {
  console.error(`COLLISION DETECTED: ${targetCollisions.size} duplicate target filenames! Resolving...`);
  // If collisions occur, resolve them by appending ID
  const resolvedMap = new Map();
  records.forEach(r => {
    if (resolvedMap.has(r.targetFullPath)) {
      const ext = path.extname(r.targetFileName);
      const base = path.basename(r.targetFileName, ext);
      r.targetFileName = `${base}_${r.id}${ext}`;
      const targetDir = path.join(STAGING_DIR, r.targetCategory, r.targetSubfolder);
      r.targetFullPath = path.join(targetDir, r.targetFileName);
      r.targetRelPath = path.relative(ROOT_DIR, r.targetFullPath).replace(/\\/g, '/');
    }
    resolvedMap.set(r.targetFullPath, r.id);
  });
  console.log('All collisions successfully resolved.');
} else {
  console.log('Zero target filename collisions. All names unique!');
}

// 2. Perform the actual file copies
console.log('Starting file copy to cdn_assets_staging/ ...');
let copiedCount = 0;
let copiedBytes = 0;

records.forEach(r => {
  const dir = path.dirname(r.targetFullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.copyFileSync(r.sourceFullPath, r.targetFullPath);
  copiedCount++;
  copiedBytes += r.fileSizeBytes;
});

console.log(`Copied ${copiedCount} files (${formatBytes(copiedBytes)}) to cdn_assets_staging/ successfully!`);

// 3. Write cdn_manifest.json
const manifestJson = records.map(r => ({
  id: r.id,
  original_path: r.originalPath,
  staged_category: r.targetCategory,
  staged_folder: r.targetSubfolder,
  staged_filename: r.targetFileName,
  staged_relative_path: r.targetRelPath,
  file_size_bytes: r.fileSizeBytes,
  file_size_formatted: r.fileSizeFormatted,
  media_type: r.mediaType,
  format: r.fileExt,
  platform_location: r.platformLocation,
  cdn_url_placeholder: `https://res.cloudinary.com/<cloud_name>/image/upload/v1/${r.targetCategory}/${r.targetSubfolder}/${r.targetFileName}`
}));

fs.writeFileSync(path.join(ROOT_DIR, 'cdn_manifest.json'), JSON.stringify(manifestJson, null, 2), 'utf8');
console.log('Generated cdn_manifest.json');

// 4. Write cdn_manifest.csv
const csvHeaders = [
  'id',
  'original_path',
  'staged_category',
  'staged_folder',
  'staged_filename',
  'staged_relative_path',
  'file_size_bytes',
  'file_size_formatted',
  'media_type',
  'format',
  'platform_location',
  'cdn_url_replacement'
];

function escapeCsv(val) {
  if (val === null || val === undefined) return '';
  const str = String(val);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

const csvRows = [csvHeaders.join(',')];
records.forEach(r => {
  const row = [
    r.id,
    escapeCsv(r.originalPath),
    escapeCsv(r.targetCategory),
    escapeCsv(r.targetSubfolder),
    escapeCsv(r.targetFileName),
    escapeCsv(r.targetRelPath),
    r.fileSizeBytes,
    escapeCsv(r.fileSizeFormatted),
    escapeCsv(r.mediaType),
    escapeCsv(r.fileExt),
    escapeCsv(r.platformLocation),
    '' // empty for user to paste CDN URL or upload results
  ];
  csvRows.push(row.join(','));
});

fs.writeFileSync(path.join(ROOT_DIR, 'cdn_manifest.csv'), csvRows.join('\n'), 'utf8');
console.log('Generated cdn_manifest.csv');

// 5. Generate cdn_assets_staging/README.md
const categoryBreakdown = {};
records.forEach(r => {
  if (!categoryBreakdown[r.targetCategory]) {
    categoryBreakdown[r.targetCategory] = { count: 0, bytes: 0, subfolders: new Set() };
  }
  categoryBreakdown[r.targetCategory].count++;
  categoryBreakdown[r.targetCategory].bytes += r.fileSizeBytes;
  categoryBreakdown[r.targetCategory].subfolders.add(r.targetSubfolder);
});

let readmeContent = `# CDN Assets Master Staging Directory

This folder contains **all image, animation, vector, and video media assets across the entire Drawing Board platform** organized and renamed for seamless bulk-upload to Cloudinary, AWS S3, BunnyCDN, Cloudflare Images, or any other Content Delivery Network.

> [!IMPORTANT]
> **Zero Code Modifications Made**: The live web application and codebase have not been modified. All original files in \`react-app/public\` remain completely untouched and operational.

---

## Staging Summary

- **Total Media Assets**: **${records.length} files**
- **Total Payload Size**: **${formatBytes(copiedBytes)}**
- **Manifest Files**:
  - \`cdn_manifest.json\` (Machine-readable full relational schema)
  - \`cdn_manifest.csv\` (Spreadsheet for bulk CDN upload & link mapping)

---

## Category Architecture

| Category Folder | Subfolders | File Count | Total Size | Platform Usage Description |
|:---|:---:|:---:|:---:|:---|
`;

Object.keys(categoryBreakdown).sort().forEach(cat => {
  const c = categoryBreakdown[cat];
  let desc = '';
  if (cat.includes('01')) desc = 'Full client identity, packaging & brand case studies';
  else if (cat.includes('02')) desc = 'SaaS product identity showcases & portfolio cards';
  else if (cat.includes('03')) desc = 'Interior architecture & spatial flagships';
  else if (cat.includes('04')) desc = 'Studio team, development, live stores & think framework';
  else if (cat.includes('05')) desc = 'Client, partner & press brand logo vectors & marks';
  else if (cat.includes('06')) desc = 'Verified WhatsApp client testimonials & reviews';
  else if (cat.includes('07')) desc = 'Social OpenGraph cards, favicons & ambient header video';

  readmeContent += `| \`${cat}/\` | ${c.subfolders.size} folders | **${c.count} files** | ${formatBytes(c.bytes)} | ${desc} |\n`;
});

readmeContent += `
---

## Cloudinary / CDN Migration Instructions

1. **Upload Entire Directory Structure**:
   Upload the contents of \`cdn_assets_staging/\` directly into your CDN preserving folder paths:
   - In Cloudinary, create a root folder named \`drawingsboard\` or upload the root folder directly. Cloudinary supports nested folder hierarchies automatically.
2. **Obtain CDN Delivery URLs**:
   Once uploaded, your CDN will provide delivery links (e.g., \`https://res.cloudinary.com/<cloud-name>/image/upload/v12345/01-case-studies/bonta-gelato/bonta_01.jpg\`).
3. **Provide Links or Domain**:
   - You can provide the CDN base URL prefix (e.g. \`https://res.cloudinary.com/<cloud-name>/image/upload/v1/\`), or
   - Fill in the \`cdn_url_replacement\` column in \`cdn_manifest.csv\`, or
   - Share the embedded links list.
4. **Instant Automated Code Update**:
   With \`cdn_manifest.json\` / \`cdn_manifest.csv\` fully indexed, swapping every asset reference across the codebase to your high-speed CDN will take only minutes with zero broken links!
`;

fs.writeFileSync(path.join(STAGING_DIR, 'README.md'), readmeContent, 'utf8');
console.log('Generated cdn_assets_staging/README.md');
console.log('All staging tasks successfully completed!');
