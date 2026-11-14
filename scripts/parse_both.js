const fs = require('fs');

function parseGusto() {
  const html = fs.readFileSync('scripts/gusto.html', 'utf8');
  
  const title = (html.match(/<title>([^<]*)<\/title>/i) || [])[1];
  console.log('=== GUSTO ===');
  console.log('Title:', title);
  
  // Find paragraphs or rich text
  const paragraphs = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map(m => m[1].replace(/<[^>]+>/g, '').trim())
    .filter(t => t.length > 20);
  console.log('Paragraphs:', paragraphs.slice(0, 5));

  // Find all image URLs from cdn or site
  const rawUrls = [...html.matchAll(/https?:\/\/[^\s"'<>]+\.(?:jpg|jpeg|png|webp|mp4|mov)/gi)].map(m => m[0]);
  const uniqueUrls = [...new Set(rawUrls)].filter(u => !u.includes('favicon') && !u.includes('logo') && !u.includes('analytics'));
  console.log('Total media URLs:', uniqueUrls.length);
  console.log('Sample URLs:', uniqueUrls.slice(0, 10));

  fs.writeFileSync('scripts/gusto_media.json', JSON.stringify({ title, paragraphs, media: uniqueUrls }, null, 2));
}

function parseBonta() {
  const html = fs.readFileSync('scripts/bonta.html', 'utf8');
  
  const title = (html.match(/<title>([^<]*)<\/title>/i) || [])[1];
  console.log('\n=== BONTA ===');
  console.log('Title:', title);
  
  const paragraphs = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map(m => m[1].replace(/<[^>]+>/g, '').trim())
    .filter(t => t.length > 20);
  console.log('Paragraphs:', paragraphs.slice(0, 5));

  // Find image and video URLs
  const rawUrls = [...html.matchAll(/https?:\/\/[^\s"'<>]+\.(?:jpg|jpeg|png|webp|mp4|mov)/gi)].map(m => m[0]);
  const uniqueUrls = [...new Set(rawUrls)].filter(u => !u.includes('favicon') && !u.includes('logo') && !u.includes('analytics') && !u.includes('plugins') && !u.includes('themes'));
  console.log('Total media URLs:', uniqueUrls.length);
  console.log('Sample URLs:', uniqueUrls.slice(0, 10));

  fs.writeFileSync('scripts/bonta_media.json', JSON.stringify({ title, paragraphs, media: uniqueUrls }, null, 2));
}

parseGusto();
parseBonta();

