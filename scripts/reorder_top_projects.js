const fs = require('fs');

// 1. Reorder projectsData.json
const pPath = './react-app/src/data/projectsData.json';
const projects = JSON.parse(fs.readFileSync(pPath, 'utf8'));

const topSlugs = [
  'after8®---reimagining-intimacy-for-a-new-generation.',
  'forte-luxury-architecture-brand-identity',
  'high-life-residences',
  'orient-developers-spatial-branding',
  'dabbo-madrid-hot-dog-coffee-branding',
  'bonta-gelato-outdoor-packaging-branding',
  'gusto-handcrafted-pottery-brand-identity'
];

const topProjects = [];
const remainingProjects = [];

topSlugs.forEach(slug => {
  const p = projects.find(item => item.slug === slug);
  if (p) topProjects.push(p);
  else console.warn('Top slug not found:', slug);
});

projects.forEach(p => {
  if (!topSlugs.includes(p.slug)) {
    remainingProjects.push(p);
  }
});

const newProjects = [...topProjects, ...remainingProjects];
fs.writeFileSync(pPath, JSON.stringify(newProjects, null, 2), 'utf8');
console.log('projectsData.json reordered. Total projects:', newProjects.length);

// 2. Update Work.jsx packaging priority
const wPath = './react-app/src/pages/Work.jsx';
let workContent = fs.readFileSync(wPath, 'utf8');

const oldPackPriority = `      const packagingPriority = [
        'bonta-gelato-outdoor-packaging-branding',
        'dabbo-madrid-hot-dog-coffee-branding',
        'toodaloo-superfood-snack-packaging',`;

const newPackPriority = `      const packagingPriority = [
        'bonta-gelato-outdoor-packaging-branding',
        'dabbo-madrid-hot-dog-coffee-branding',
        'gusto-handcrafted-pottery-brand-identity',
        'toodaloo-superfood-snack-packaging',`;

if (workContent.includes(oldPackPriority)) {
  workContent = workContent.replace(oldPackPriority, newPackPriority);
  fs.writeFileSync(wPath, workContent, 'utf8');
  console.log('Work.jsx packagingPriority updated with gusto.');
} else {
  console.log('packagingPriority already contains gusto or not matched.');
}
