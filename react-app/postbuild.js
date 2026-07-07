import fs from 'fs';
import path from 'path';

const distDir = './dist';

if (fs.existsSync(distDir)) {
  // 1. Copy index.html to 404.html
  fs.copyFileSync(path.join(distDir, 'index.html'), path.join(distDir, '404.html'));
  console.log('Successfully created 404.html from index.html');

  // 2. Create vercel.json
  const vercelJson = {
    "rewrites": [
      { "source": "/(.*)", "destination": "/index.html" }
    ]
  };
  fs.writeFileSync(path.join(distDir, 'vercel.json'), JSON.stringify(vercelJson, null, 2));
  console.log('Successfully created vercel.json');

  // 3. Create _redirects
  fs.writeFileSync(path.join(distDir, '_redirects'), '/*    /index.html   200\n');
  console.log('Successfully created _redirects');

  // 4. Create .nojekyll
  fs.writeFileSync(path.join(distDir, '.nojekyll'), '');
  console.log('Successfully created .nojekyll');
} else {
  console.error('Dist directory does not exist! Run build first.');
}
