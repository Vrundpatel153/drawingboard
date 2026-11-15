const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../react-app/src/data/projectsData.json');
const projects = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Filter out if already present to ensure idempotency
const cleanList = projects.filter(p => p.slug !== 'high-life-residences' && p.slug !== 'orient-developers-spatial-branding');

const highLifeImages = [];
for (let i = 1; i <= 29; i++) {
  const num = String(i).padStart(2, '0');
  const dir = path.resolve(__dirname, '../react-app/public/images/high-life-residences');
  const files = fs.readdirSync(dir);
  const found = files.find(f => f.startsWith(`high_life_${num}.`));
  if (found) {
    highLifeImages.push(`/images/high-life-residences/${found}`);
  }
}

const highLifeProject = {
  title: "High Life Residences — Luxury Residential Architecture & Brand Identity",
  slug: "high-life-residences",
  category: "real-estate",
  tag: "REAL ESTATE & ARCHITECTURE // LUXURY RESIDENTIAL BRANDING",
  client: "High Life by Pioneer Group",
  description: "Brand identity, environmental signage, and metropolitan campaign for High Life, a premier luxury residential tower development by Pioneer Group. Built around the central concept 'IT’S HIGH LIFE', fusing light trails, architectural grid proportions, gold-foil sales folios, bespoke penthouse editorial volumes, and mobile resident app systems.",
  coverImage: "/images/high-life-residences/high_life_cover.jpg",
  images: highLifeImages,
  imageCount: highLifeImages.length + 1,
  deliverables: [
    "Master Visual Identity System",
    "Architectural Wayfinding & Signage",
    "Editorial Hardcover Penthouse Monograph",
    "Gold-Foil VIP Sales Folio Suite",
    "Metropolitan Expressway Billboard Network",
    "Resident Mobile Companion App UI/UX",
    "Concierge Welcome Kit & Leather Key Cards",
    "Construction Site Perimeter Hoardings"
  ]
};

const orientImages = [
  "/images/orient-developers/orient_page_02.jpg",
  "/images/orient-developers/orient_page_03.jpg",
  "/images/orient-developers/orient_page_04.jpg",
  "/images/orient-developers/orient_page_05.jpg",
  "/images/orient-developers/orient_page_06.jpg",
  "/images/orient-developers/orient_page_07.jpg",
  "/images/orient-developers/orient_page_08.jpg",
  "/images/orient-developers/orient_page_09.jpg",
  "/images/orient-developers/orient_page_10.jpg",
  "/images/orient-developers/orient_02.jpg",
  "/images/orient-developers/orient_06.jpg",
  "/images/orient-developers/orient_07.jpg",
  "/images/orient-developers/orient_11.jpg",
  "/images/orient-developers/orient_12.jpg",
  "/images/orient-developers/orient_13.jpg",
  "/images/orient-developers/orient_16.jpg",
  "/images/orient-developers/orient_17.jpg"
];

const orientProject = {
  title: "Orient Developers — Spatial Design, Architecture & Legacy Brand Identity",
  slug: "orient-developers-spatial-branding",
  category: "spatial",
  tag: "SPATIAL BRANDING // REAL ESTATE & ARCHITECTURE",
  client: "Orient Developers",
  description: "Crafting spaces. Building legacies. Comprehensive commercial spatial design, environmental branding, architectural wayfinding, corporate identity suite, and luxury sales gallery presentation system for Orient Developers.",
  coverImage: "/images/orient-developers/orient_page_01.jpg",
  images: orientImages,
  imageCount: orientImages.length + 1,
  deliverables: [
    "Spatial Branding & Environmental Graphics",
    "Architectural Wayfinding & Signage Suite",
    "Corporate Stationery & Identity Guidelines",
    "Sales Gallery Presentation Collateral",
    "Material Moodboard & Architectural Finishes",
    "Print Collaterals & Specification Folios",
    "Digital Brand & Architectural Display Assets",
    "Executive Boardroom & Sales Lounge Design"
  ]
};

// Insert at top after Forte
cleanList.splice(2, 0, highLifeProject);
cleanList.splice(3, 0, orientProject);

fs.writeFileSync(filePath, JSON.stringify(cleanList, null, 2), 'utf8');
console.log(`Updated projectsData.json with ${cleanList.length} projects.`);
console.log('High Life Images count:', highLifeImages.length);
console.log('Orient Images count:', orientImages.length);
