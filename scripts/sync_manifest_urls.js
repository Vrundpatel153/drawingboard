const fs = require('fs');

const manifest = JSON.parse(fs.readFileSync('./cdn_manifest.json', 'utf8'));
const progress = JSON.parse(fs.readFileSync('./cloudinary_progress.json', 'utf8'));

manifest.forEach(m => {
  if (progress[m.id]) {
    m.cdn_url = progress[m.id].secure_url;
    m.cloudinary_public_id = progress[m.id].public_id;
  }
});

fs.writeFileSync('./cdn_manifest.json', JSON.stringify(manifest, null, 2), 'utf8');

// Also update cdn_manifest.csv
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
  'cloudinary_url'
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
manifest.forEach(m => {
  const row = [
    m.id,
    escapeCsv(m.original_path),
    escapeCsv(m.staged_category),
    escapeCsv(m.staged_folder),
    escapeCsv(m.staged_filename),
    escapeCsv(m.staged_relative_path),
    m.file_size_bytes,
    escapeCsv(m.file_size_formatted),
    escapeCsv(m.media_type),
    escapeCsv(m.format),
    escapeCsv(m.platform_location),
    escapeCsv(m.cdn_url || '')
  ];
  csvRows.push(row.join(','));
});

fs.writeFileSync('./cdn_manifest.csv', csvRows.join('\n'), 'utf8');
console.log('Successfully synced all live Cloudinary URLs into cdn_manifest.json and cdn_manifest.csv!');
