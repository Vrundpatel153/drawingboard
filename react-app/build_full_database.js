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

function extractProjectDetails(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(raw);
    const html = data.html || '';

    // Extract images
    const urlRegex = /(https:\/\/framerusercontent\.com\/images\/[a-zA-Z0-9_\-\.\%\?\&=\;\+\#]+)/g;
    const images = [];
    let match;
    while ((match = urlRegex.exec(raw)) !== null) {
      let url = match[1].split('?')[0].replace(/\\/g, '').replace(/&quot;/g, '').replace(/["']/g, '');
      if (url.match(/\.(png|jpg|jpeg|svg|webp)$/i) && !images.includes(url)) {
        images.push(url);
      }
    }

    // Extract plain text paragraphs to find description
    const pMatches = html.match(/<p[^>]*>(.*?)<\/p>/gs) || [];
    const paragraphs = pMatches
      .map(p => p.replace(/<[^>]+>/g, '').trim())
      .filter(txt => txt.length > 20 && !txt.includes('The Drawing Board') && !txt.includes('Contact'));

    const description = paragraphs[0] || 'Strategic brand identity, packaging design, and digital engineering.';

    // Extract H1 or H2
    const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/s);
    const h2Match = html.match(/<h2[^>]*>(.*?)<\/h2>/s);
    let title = path.basename(filePath, '.json').replace(/\.json$/i, '');

    if (h1Match) {
      const cleanH1 = h1Match[1].replace(/<[^>]+>/g, '').trim();
      if (cleanH1.length > 2) title = cleanH1;
    } else if (h2Match) {
      const cleanH2 = h2Match[1].replace(/<[^>]+>/g, '').trim();
      if (cleanH2.length > 2) title = cleanH2;
    }

    // Clean up title formatting
    title = title
      .replace(/--/g, ' - ')
      .replace(/_/g, ' ')
      .replace(/-/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    title = title.split(' ').map(w => w.length <= 3 ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    const slug = path.basename(filePath, '.json').toLowerCase();

    // Map Category accurately
    let category = 'branding';
    let tag = 'BRANDING';
    if (slug.includes('packag') || slug.includes('food') || slug.includes('protein') || slug.includes('gelato') || slug.includes('seltzer') || slug.includes('kitchen') || slug.includes('bar') || slug.includes('bistro') || slug.includes('baker') || slug.includes('nom') || slug.includes('seul') || slug.includes('sol')) {
      category = 'packaging';
      tag = 'PACKAGING DESIGN';
    } else if (slug.includes('web') || slug.includes('shopify') || slug.includes('ui-ux') || slug.includes('daisy') || slug.includes('seneca') || slug.includes('app') || slug.includes('saas') || slug.includes('krona')) {
      category = 'web';
      tag = 'UI UX & WEB DEV';
    } else if (slug.includes('photo') || slug.includes('shoot') || slug.includes('media')) {
      category = 'photography';
      tag = 'PHOTOGRAPHY';
    }

    return {
      slug: path.basename(filePath, '.json'),
      title,
      category,
      tag,
      description,
      coverImage: images[0] || 'https://framerusercontent.com/images/SzRYtW3gumxhjmxmvpYLl0WYuVo.jpg',
      images,
      imageCount: images.length
    };
  } catch (err) {
    return { slug: path.basename(filePath, '.json'), error: err.message };
  }
}

const projectFiles = fs.readdirSync(projectsDir).filter(f => f.endsWith('.json'));
const projects = projectFiles.map(f => extractProjectDetails(path.join(projectsDir, f)));
fs.writeFileSync(path.join(dataOutputDir, 'projectsData.json'), JSON.stringify(projects, null, 2));
console.log(`Saved ${projects.length} ultra-rich projects to projectsData.json`);

const blogFiles = fs.readdirSync(blogsDir).filter(f => f.endsWith('.json'));
const blogs = blogFiles.map(f => extractProjectDetails(path.join(blogsDir, f)));
fs.writeFileSync(path.join(dataOutputDir, 'blogsData.json'), JSON.stringify(blogs, null, 2));
console.log(`Saved ${blogs.length} ultra-rich blogs to blogsData.json`);
