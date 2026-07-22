import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectsDir = path.join(__dirname, 'public', 'projects');
const blogsDir = path.join(__dirname, 'public', 'blogs');
const dataOutputDir = path.join(__dirname, 'src', 'data');

if (!fs.existsSync(dataOutputDir)) {
  fs.mkdirSync(dataOutputDir, { recursive: true });
}

function parseProjectFile(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    
    // Extract images using a broad URL regex
    const urlRegex = /(https:\/\/framerusercontent\.com\/images\/[a-zA-Z0-9_\-\.\%\?\&=\;\+\#]+)/g;
    const images = [];
    let match;
    while ((match = urlRegex.exec(raw)) !== null) {
      let url = match[1];
      // Clean query params for full-res image URL
      url = url.split('?')[0];
      // Clean trailing escaped characters
      url = url.replace(/\\/g, '').replace(/&quot;/g, '').replace(/["']/g, '');
      if (url.match(/\.(png|jpg|jpeg|svg|webp)$/i) && !images.includes(url)) {
        images.push(url);
      }
    }

    const data = JSON.parse(raw);
    const html = data.html || '';

    // Extract H1 or H2 title
    const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/s);
    const h2Match = html.match(/<h2[^>]*>(.*?)<\/h2>/s);
    let title = path.basename(filePath, '.json')
      .replace(/\.json$/i, '')
      .replace(/--/g, ' - ')
      .replace(/_/g, ' ')
      .replace(/-/g, ' ');

    if (h1Match) {
      const cleanH1 = h1Match[1].replace(/<[^>]+>/g, '').trim();
      if (cleanH1.length > 3) title = cleanH1;
    } else if (h2Match) {
      const cleanH2 = h2Match[1].replace(/<[^>]+>/g, '').trim();
      if (cleanH2.length > 3) title = cleanH2;
    }

    // Capitalize Title
    title = title.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    const slug = path.basename(filePath, '.json').toLowerCase();
    let category = 'branding';
    let tag = 'BRANDING • STRATEGY';
    if (slug.includes('packag') || slug.includes('food') || slug.includes('protein') || slug.includes('gelato') || slug.includes('seltzer') || slug.includes('kitchen') || slug.includes('bar') || slug.includes('bistro') || slug.includes('baker') || slug.includes('bistro')) {
      category = 'packaging';
      tag = 'PACKAGING • UNBOXING';
    } else if (slug.includes('web') || slug.includes('shopify') || slug.includes('ui-ux') || slug.includes('app') || slug.includes('saas') || slug.includes('architect') || slug.includes('dev')) {
      category = 'web';
      tag = 'WEB DESIGN • CODE';
    }
    
    return {
      slug: path.basename(filePath, '.json'),
      title,
      category,
      tag,
      coverImage: images[0] || 'https://framerusercontent.com/images/SzRYtW3gumxhjmxmvpYLl0WYuVo.jpg',
      images,
      imageCount: images.length
    };
  } catch (err) {
    return { slug: path.basename(filePath, '.json'), error: err.message };
  }
}

if (fs.existsSync(projectsDir)) {
  const files = fs.readdirSync(projectsDir).filter(f => f.endsWith('.json'));
  console.log(`Found ${files.length} project JSON files.`);
  const projects = files.map(f => parseProjectFile(path.join(projectsDir, f)));
  
  fs.writeFileSync(path.join(dataOutputDir, 'projectsData.json'), JSON.stringify(projects, null, 2));
  console.log('Saved projectsData.json with', projects.length, 'projects.');
}

if (fs.existsSync(blogsDir)) {
  const files = fs.readdirSync(blogsDir).filter(f => f.endsWith('.json'));
  console.log(`Found ${files.length} blog JSON files.`);
  const blogs = files.map(f => parseProjectFile(path.join(blogsDir, f)));
  
  fs.writeFileSync(path.join(dataOutputDir, 'blogsData.json'), JSON.stringify(blogs, null, 2));
  console.log('Saved blogsData.json with', blogs.length, 'blogs.');
}
