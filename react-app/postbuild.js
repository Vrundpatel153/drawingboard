import fs from 'fs';
import path from 'path';
import http from 'http';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);
const distDir = path.resolve('./dist');

async function run() {
  if (!fs.existsSync(distDir)) {
    console.error('Dist directory does not exist! Run build first.');
    process.exit(1);
  }

  // 1. Copy index.html to 404.html
  fs.copyFileSync(path.join(distDir, 'index.html'), path.join(distDir, '404.html'));
  console.log('✓ Successfully created 404.html from index.html');

  // 2. Create vercel.json
  const vercelJson = {
    rewrites: [
      { source: '/(.*)', destination: '/index.html' }
    ]
  };
  fs.writeFileSync(path.join(distDir, 'vercel.json'), JSON.stringify(vercelJson, null, 2));
  console.log('✓ Successfully created vercel.json');

  // 3. Create _redirects
  fs.writeFileSync(path.join(distDir, '_redirects'), '/*    /index.html   200\n');
  console.log('✓ Successfully created _redirects');

  // 4. Create .nojekyll
  fs.writeFileSync(path.join(distDir, '.nojekyll'), '');
  console.log('✓ Successfully created .nojekyll');

  // 5. Ensure llms.txt and llms-full.txt are copied to dist
  const publicDir = path.resolve('./public');
  if (fs.existsSync(path.join(publicDir, 'llms.txt'))) {
    fs.copyFileSync(path.join(publicDir, 'llms.txt'), path.join(distDir, 'llms.txt'));
    console.log('✓ Copied llms.txt to dist');
  }
  if (fs.existsSync(path.join(publicDir, 'llms-full.txt'))) {
    fs.copyFileSync(path.join(publicDir, 'llms-full.txt'), path.join(distDir, 'llms-full.txt'));
    console.log('✓ Copied llms-full.txt to dist');
  }

  // 6. Pre-rendering all routes for SEO & AI Crawlers (Search Engine & LLM Visibility)
  const chromePaths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser'
  ];
  const chromePath = chromePaths.find(p => fs.existsSync(p));

  if (!chromePath) {
    console.warn('⚠️ Chrome/Edge executable not found for pre-rendering. Skipping pre-render step.');
    return;
  }

  console.log(`\n🚀 Starting static pre-rendering using: ${chromePath}`);

  // Static preview server to serve built dist files
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.txt': 'text/plain',
    '.woff2': 'font/woff2'
  };

  const server = http.createServer((req, res) => {
    let urlPath = req.url.split('?')[0];
    let filePath = path.join(distDir, urlPath);

    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    if (!fs.existsSync(filePath)) {
      filePath = path.join(distDir, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    try {
      const data = fs.readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    } catch (err) {
      res.writeHead(500);
      res.end('Error reading file: ' + err.message);
    }
  });

  const PORT = 4173;
  await new Promise((resolve) => server.listen(PORT, '127.0.0.1', resolve));
  console.log(`✓ Local static server active on http://127.0.0.1:${PORT}`);

  // Collect all routes
  const coreRoutes = [
    '/',
    '/branding',
    '/packaging',
    '/web-development',
    '/development',
    '/work',
    '/about',
    '/studio',
    '/contact',
    '/services'
  ];

  // Load project slugs from projectsData.json
  const projectsDataPath = path.resolve('./src/data/projectsData.json');
  let projectRoutes = [];
  if (fs.existsSync(projectsDataPath)) {
    try {
      const projects = JSON.parse(fs.readFileSync(projectsDataPath, 'utf8'));
      projectRoutes = projects.map(p => `/work/${p.slug}`);
    } catch (err) {
      console.warn('Could not parse projectsData.json for route collection:', err.message);
    }
  }

  const allRoutes = [...new Set([...coreRoutes, ...projectRoutes])];
  console.log(`📋 Total routes to pre-render: ${allRoutes.length}`);

  let successCount = 0;

  for (const route of allRoutes) {
    const targetUrl = `http://127.0.0.1:${PORT}${route}`;
    const args = [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--dump-dom',
      '--virtual-time-budget=2000',
      targetUrl
    ];

    try {
      const { stdout } = await execFileAsync(chromePath, args, { maxBuffer: 15 * 1024 * 1024 });

      // Determine output file path
      let outFilePath;
      if (route === '/') {
        outFilePath = path.join(distDir, 'index.html');
      } else {
        const routeDir = path.join(distDir, route.replace(/^\//, ''));
        fs.mkdirSync(routeDir, { recursive: true });
        outFilePath = path.join(routeDir, 'index.html');
      }

      fs.writeFileSync(outFilePath, stdout, 'utf8');
      successCount++;
      process.stdout.write(`  [${successCount}/${allRoutes.length}] Pre-rendered: ${route}\r`);
    } catch (err) {
      console.error(`\n❌ Failed to pre-render route ${route}:`, err.message);
    }
  }

  server.close();
  console.log(`\n\n🎉 Pre-rendering complete! Successfully generated ${successCount}/${allRoutes.length} static HTML pages.`);
  console.log('✨ All pages are now fully visible to Googlebot, Perplexity, ChatGPT, Claude, and AI crawlers without JS requirement.\n');
}

run().catch((err) => {
  console.error('Fatal postbuild error:', err);
  process.exit(1);
});
