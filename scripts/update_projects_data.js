const fs = require('fs');

const manifest = JSON.parse(fs.readFileSync('scripts/organized_manifest.json', 'utf8'));
const projects = JSON.parse(fs.readFileSync('react-app/src/data/projectsData.json', 'utf8'));

// Filter out if already added
const filtered = projects.filter(p => p.slug !== 'gusto-handcrafted-pottery-brand-identity' && p.slug !== 'bonta-gelato-outdoor-packaging-branding');

const gustoProject = {
  slug: "gusto-handcrafted-pottery-brand-identity",
  title: "Gusto — Handcrafted Pottery & Mindful Home Goods Brand Identity",
  category: "branding",
  tag: "BRAND IDENTITY & PACKAGING SYSTEM",
  client: "Gusto Ceramic & Homeware Studio",
  description: "A thoughtful and elegant pottery brand celebrating mindful living. Rooted in intentional design, Gusto creates timeless, handcrafted home goods merging functional beauty with serene organic warmth, tactile stationery packaging, and calm editorial art direction.",
  coverImage: manifest.gusto.coverImage,
  images: manifest.gusto.images,
  imageCount: manifest.gusto.images.length
};

const bontaProject = {
  slug: "bonta-gelato-outdoor-packaging-branding",
  title: "Bontà — Artisanal Small-Batch Gelato & Outdoor Adventure Packaging",
  category: "packaging",
  tag: "PACKAGING ARCHITECTURE & BRAND SYSTEM",
  client: "Bontà Gelato (Bend, Oregon)",
  description: "Artisanal small-batch gelato crafted with Pacific Northwest ingredients. Rebranded with a low-adrenaline outdoor adventure positioning ('Gelato from the great outdoors'), combining topographical Cascade mountain contour patterns with fluid gelato textures, vibrant activewear packaging, and playful outdoor character storytelling.",
  coverImage: manifest.bonta.coverImage,
  images: manifest.bonta.images,
  imageCount: manifest.bonta.images.length
};

// Insert at prominent positions
// Gusto in branding (near Elsewhere at index 8)
// Bonta in packaging (near Toodaloo / YALA at index 18)
filtered.splice(7, 0, gustoProject);
filtered.splice(18, 0, bontaProject);

fs.writeFileSync('react-app/src/data/projectsData.json', JSON.stringify(filtered, null, 2), 'utf8');
console.log('Successfully updated projectsData.json! Total projects:', filtered.length);

