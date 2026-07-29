/**
 * generate-sitemap.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Reads project, service, blog, and legal slugs from public/ JSON files and
 * generates a complete sitemap.xml in the dist/ folder.
 *
 * Run: node generate-sitemap.js
 * Called automatically by build-dist.js postbuild.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import fs   from 'fs';
import path from 'path';

const SITE_URL  = process.env.VITE_SITE_URL || 'https://thedrawingboard.studio';
const publicDir = path.resolve('./public');
const distDir   = path.resolve('./dist');

// ─── helpers ─────────────────────────────────────────────────────────────────

const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

function getSlugs(subDir) {
  const dir = path.join(publicDir, subDir);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .map(f => path.basename(f, '.json'));
}

function url(loc, priority = '0.8', changefreq = 'monthly') {
  return `
  <url>
    <loc>${SITE_URL}${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

// ─── collect routes ──────────────────────────────────────────────────────────

const projectSlugs = getSlugs('projects');
const serviceSlugs = getSlugs('services');
const blogSlugs    = getSlugs('blogs');
const legalSlugs   = getSlugs('legal');

const staticEntries = [
  url('/',          '1.0', 'weekly'),
  url('/work',      '0.9', 'weekly'),
  url('/services',  '0.9', 'monthly'),
  url('/studio',    '0.8', 'monthly'),
  url('/insights',  '0.8', 'weekly'),
  url('/contact',   '0.7', 'monthly'),

  // Dedicated service pages
  url('/services/branding',          '0.9', 'monthly'),
  url('/services/packaging-design',  '0.9', 'monthly'),
  url('/services/development',       '0.9', 'monthly'),
];

const projectEntries = projectSlugs.map(slug =>
  url(`/work/${slug}`, '0.8', 'monthly')
);

const serviceEntries = serviceSlugs.map(slug =>
  url(`/services/${slug}`, '0.7', 'monthly')
);

const blogEntries = blogSlugs.map(slug =>
  url(`/insights/${slug}`, '0.7', 'monthly')
);

const legalEntries = legalSlugs.map(slug =>
  url(`/legal/${slug}`, '0.3', 'yearly')
);

// ─── build XML ───────────────────────────────────────────────────────────────

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${[
  ...staticEntries,
  ...projectEntries,
  ...serviceEntries,
  ...blogEntries,
  ...legalEntries,
].join('')}
</urlset>
`;

// ─── write ───────────────────────────────────────────────────────────────────

if (!fs.existsSync(distDir)) {
  console.warn('dist/ not found — run build first.');
  process.exit(1);
}

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap.trim());
console.log(`✓ sitemap.xml written (${projectSlugs.length} projects, ${serviceSlugs.length} services, ${blogSlugs.length} blogs)`);
