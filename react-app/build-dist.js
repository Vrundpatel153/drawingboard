import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const __dirname = path.resolve();
const publicDir = path.join(__dirname, 'public');
const distDir = path.join(__dirname, 'dist');

console.log('=== Step 1: Running production build ===');
execSync('npm run build', { stdio: 'inherit' });

console.log('=== Step 2: Reading dynamic routes data from public/ ===');
const getSlugs = (subDir) => {
  const dirPath = path.join(publicDir, subDir);
  if (!fs.existsSync(dirPath)) return [];
  return fs.readdirSync(dirPath)
    .filter(file => file.endsWith('.json'))
    .map(file => path.basename(file, '.json'));
};

const projectSlugs = getSlugs('projects');
const serviceSlugs = getSlugs('services');
const blogSlugs = getSlugs('blogs');
const legalSlugs = getSlugs('legal');

console.log(`Found ${projectSlugs.length} projects, ${serviceSlugs.length} services, ${blogSlugs.length} blogs, ${legalSlugs.length} legals.`);

const staticRoutes = [
  'admin',
  'studio',
  'about',
  'work',
  'works',
  'service',
  'services',
  'insights',
  'blog',
  'contact',
  'legal'
];

const routes = [...staticRoutes];

projectSlugs.forEach(slug => routes.push(`work/${slug}`));
serviceSlugs.forEach(slug => routes.push(`service/${slug}`));
blogSlugs.forEach(slug => routes.push(`blog/${slug}`));
legalSlugs.forEach(slug => routes.push(`legal/${slug}`));

console.log(`=== Step 3: Copying index.html to ${routes.length} route folders ===`);
const sourceHtml = path.join(distDir, 'index.html');
if (!fs.existsSync(sourceHtml)) {
  console.error('Build failed - dist/index.html not found!');
  process.exit(1);
}

routes.forEach(route => {
  const routeFolder = path.join(distDir, route);
  fs.mkdirSync(routeFolder, { recursive: true });
  fs.copyFileSync(sourceHtml, path.join(routeFolder, 'index.html'));
});

console.log('=== Step 4: Creating fallback and redirect config files ===');

// General 404 fallback
fs.copyFileSync(sourceHtml, path.join(distDir, '404.html'));

// Netlify _redirects
fs.writeFileSync(path.join(distDir, '_redirects'), '/* /index.html 200\n');

// Vercel vercel.json
const vercelConfig = {
  cleanUrls: true,
  rewrites: [
    { source: '/(.*)', destination: '/index.html' }
  ]
};
fs.writeFileSync(path.join(distDir, 'vercel.json'), JSON.stringify(vercelConfig, null, 2));

// Apache .htaccess
const htaccessContent = `RewriteEngine On
RewriteBase /
RewriteRule ^index\\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
`;
fs.writeFileSync(path.join(distDir, '.htaccess'), htaccessContent);

console.log('=== Build completed successfully! ===');
