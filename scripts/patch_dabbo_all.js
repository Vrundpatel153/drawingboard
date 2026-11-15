const fs = require('fs');
const path = require('path');

// 1. UPDATE projectsData.json
const projectsDataPath = path.resolve(__dirname, '../react-app/src/data/projectsData.json');
let projects = JSON.parse(fs.readFileSync(projectsDataPath, 'utf8'));

// Check if dabbo already exists
const existingIdx = projects.findIndex(p => p.slug.includes('dabbo'));
const dabboEntry = {
  "slug": "dabbo-madrid-hot-dog-coffee-branding",
  "title": "Dabbo — Madrid Street Food Hot Dog & Specialty Coffee Packaging",
  "category": "food",
  "tag": "FOOD & BEVERAGE // MADRID STREET FOOD PACKAGING",
  "client": "Dabbo Madrid (Spain)",
  "description": "Bold retro street food brand identity, custom folding hot dog clamshells, takeaway carrier boxes ('dabbo'), specialty coffee cups, and greaseproof paper packaging architecture engineered for artisanal quick-service dining in Madrid.",
  "coverImage": "/images/dabbo/dabbo_cover.jpg",
  "images": [
    "/images/dabbo/dabbo_01.jpg",
    "/images/dabbo/dabbo_02.jpg",
    "/images/dabbo/dabbo_03.jpg",
    "/images/dabbo/dabbo_04.jpg",
    "/images/dabbo/dabbo_05.jpg",
    "/images/dabbo/dabbo_06.jpg",
    "/images/dabbo/dabbo_07.jpg",
    "/images/dabbo/dabbo_08.jpg",
    "/images/dabbo/dabbo_09.jpg",
    "/images/dabbo/dabbo_10.jpg"
  ],
  "imageCount": 10,
  "year": "2026",
  "deliverables": [
    "Brand Strategy & Street Food Positioning",
    "Retro Logomark & Custom Badge System",
    "Hot Dog Clamshell Dielines & Takeaway Boxes ('Dabbo')",
    "Specialty Coffee Cups & Corrugated Thermal Sleeves",
    "Greaseproof Wrapping Liners & Fluorescent Sticker Seals",
    "Modular Menu Boards & Madrid Streetfront Signage Specs",
    "Print-Ready Packaging Dielines & Color Token Matrix"
  ]
};

if (existingIdx >= 0) {
  projects[existingIdx] = dabboEntry;
  console.log('Updated existing Dabbo entry in projectsData.json');
} else {
  // Insert at index 8 (right alongside gloopy, bonta, bunzo)
  projects.splice(8, 0, dabboEntry);
  console.log('Inserted Dabbo entry at index 8 in projectsData.json');
}

fs.writeFileSync(projectsDataPath, JSON.stringify(projects, null, 2), 'utf8');

// 2. UPDATE Work.jsx
const workJsxPath = path.resolve(__dirname, '../react-app/src/pages/Work.jsx');
let workJsx = fs.readFileSync(workJsxPath, 'utf8');

// Update branding filter if dabbo not present
if (!workJsx.includes("'dabbo'")) {
  workJsx = workJsx.replace(
    "['gloopy', 'bunzo', 'chai-to', 'brite-harvest', 'gusto']",
    "['gloopy', 'bunzo', 'chai-to', 'brite-harvest', 'gusto', 'dabbo']"
  );
  workJsx = workJsx.replace(
    "['pronto', 'matcha', 'murami', 'soul-brew', 'coastal-buns', 'dorada', 'elsewhere', 'gloopy', 'bunzo', 'bonta']",
    "['pronto', 'matcha', 'murami', 'soul-brew', 'coastal-buns', 'dorada', 'elsewhere', 'gloopy', 'bunzo', 'bonta', 'dabbo']"
  );
  workJsx = workJsx.replace(
    "['crystal-nail-care-brand', 'blank-body', 'rest-religion', 'yaad', 'barely', 'sage', 'iva', 'coastal-buns', 'toodaloo', 'kame', 'dorada', 'elsewhere', 'gloopy', 'bunzo', 'chai-to', 'brite-harvest', 'bonta', 'gusto']",
    "['crystal-nail-care-brand', 'blank-body', 'rest-religion', 'yaad', 'barely', 'sage', 'iva', 'coastal-buns', 'toodaloo', 'kame', 'dorada', 'elsewhere', 'gloopy', 'bunzo', 'chai-to', 'brite-harvest', 'bonta', 'gusto', 'dabbo']"
  );
  workJsx = workJsx.replace(
    "'bonta-gelato-outdoor-packaging-branding',",
    "'bonta-gelato-outdoor-packaging-branding',\n        'dabbo-madrid-hot-dog-coffee-branding',"
  );
  fs.writeFileSync(workJsxPath, workJsx, 'utf8');
  console.log('Updated Work.jsx with Dabbo filters');
} else {
  console.log('Work.jsx already contains dabbo');
}

// 3. UPDATE PackagingPage.jsx
const packagingPagePath = path.resolve(__dirname, '../react-app/src/pages/PackagingPage.jsx');
let packagingJsx = fs.readFileSync(packagingPagePath, 'utf8');

if (!packagingJsx.includes("'dabbo'")) {
  packagingJsx = packagingJsx.replace(
    "['pronto', 'matcha', 'murami', 'soul-brew', 'bonta']",
    "['pronto', 'matcha', 'murami', 'soul-brew', 'bonta', 'dabbo']"
  );
  packagingJsx = packagingJsx.replace(
    "['crystal-nail-care-brand', 'blank-body', 'rest-religion', 'yaad', 'barely', 'sage', 'iva', 'coastal-buns', 'toodaloo', 'kame', 'bonta', 'gusto']",
    "['crystal-nail-care-brand', 'blank-body', 'rest-religion', 'yaad', 'barely', 'sage', 'iva', 'coastal-buns', 'toodaloo', 'kame', 'bonta', 'gusto', 'dabbo']"
  );
  packagingJsx = packagingJsx.replace(
    "'bonta-gelato-outdoor-packaging-branding',",
    "'bonta-gelato-outdoor-packaging-branding',\n        'dabbo-madrid-hot-dog-coffee-branding',"
  );
  fs.writeFileSync(packagingPagePath, packagingJsx, 'utf8');
  console.log('Updated PackagingPage.jsx with Dabbo filters');
} else {
  console.log('PackagingPage.jsx already contains dabbo');
}

console.log('DONE with data and page filter patches.');

