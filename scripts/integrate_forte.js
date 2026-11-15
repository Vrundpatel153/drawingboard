const fs = require('fs');
const path = require('path');

// 1. UPDATE projectsData.json
const projectsDataPath = path.resolve(__dirname, '../react-app/src/data/projectsData.json');
let projects = JSON.parse(fs.readFileSync(projectsDataPath, 'utf8'));

const forteEntry = {
  "slug": "forte-luxury-architecture-brand-identity",
  "title": "Forte — Luxury Architecture & Real Estate Brand Identity",
  "category": "real-estate",
  "tag": "REAL ESTATE & ARCHITECTURE // LUXURY BRAND IDENTITY",
  "client": "Forte Architecture & Real Estate",
  "description": "Timeless, confident brand identity for Forte, an architecture and real estate practice creating refined, modern living spaces. Features an arch-shaped monogram, high-contrast serif typography, deep forest green and warm cream palette across architectural signage, luxury shopping bags, business cards, brochures, and outdoor advertising.",
  "coverImage": "/images/forte/forte_cover.png",
  "images": [
    "/images/forte/forte_01.png",
    "/images/forte/forte_02.png",
    "/images/forte/forte_03.png",
    "/images/forte/forte_04.png",
    "/images/forte/forte_05.png",
    "/images/forte/forte_06.png",
    "/images/forte/forte_07.png",
    "/images/forte/forte_08.png",
    "/images/forte/forte_09.png",
    "/images/forte/forte_10.png",
    "/images/forte/forte_11.png",
    "/images/forte/forte_12.png",
    "/images/forte/forte_13.png",
    "/images/forte/forte_14.png",
    "/images/forte/forte_15.png"
  ],
  "imageCount": 15,
  "year": "2026",
  "deliverables": [
    "Architectural Brand Strategy & Real Estate Positioning",
    "Arch-Shaped Monogram Emblem & Serif Wordmark System",
    "Deep Forest Green, Warm Alabaster & Bronze Color System",
    "Tactile Cotton Stationery, Hot-Foil Business Cards & Letterhead",
    "Luxury Shopping Bags, Blind-Embossed Folders & Client Dossiers",
    "Architectural Signage Specs, Fascia Signs & Wayfinding",
    "Editorial Real Estate Lookbook & Development Brochures",
    "Billboard & Outdoor Architectural Advertising Campaigns"
  ]
};

const existingIdx = projects.findIndex(p => p.slug.includes('forte'));
if (existingIdx >= 0) {
  projects[existingIdx] = forteEntry;
  console.log('Updated existing Forte entry in projectsData.json');
} else {
  // Insert at index 1 (right alongside After8 and Dabbo)
  projects.splice(1, 0, forteEntry);
  console.log('Inserted Forte entry at index 1 in projectsData.json');
}
fs.writeFileSync(projectsDataPath, JSON.stringify(projects, null, 2), 'utf8');

// 2. UPDATE Work.jsx
const workPath = path.resolve(__dirname, '../react-app/src/pages/Work.jsx');
let workJsx = fs.readFileSync(workPath, 'utf8');

// Add real-estate filter condition
if (!workJsx.includes("filter === 'real-estate'")) {
  workJsx = workJsx.replace(
    "if (filter === 'branding')",
    `if (filter === 'real-estate') return p.category === 'real-estate' || (p.tag && (p.tag.includes('REAL ESTATE') || p.tag.includes('ARCHITECTURE') || p.tag.includes('PROPERTY') || p.tag.includes('DEVELOPMENT'))) || ['forte', 'krona', 'ghalia', 'rustic', 'rooted', 'arcomi', 'boho', 'ouur', 'maison'].some(s => (p.slug || '').includes(s));\n      if (filter === 'branding')`
  );

  // Add 'forte' to branding filter
  workJsx = workJsx.replace(
    "['gloopy', 'bunzo', 'chai-to', 'brite-harvest', 'gusto', 'dabbo']",
    "['gloopy', 'bunzo', 'chai-to', 'brite-harvest', 'gusto', 'dabbo', 'forte']"
  );

  // Add [ REAL ESTATE ] filter tab in JSX
  workJsx = workJsx.replace(
    `<Link to="/spatial-work" className="ftab" style={{ textDecoration: 'none', color: 'var(--pine)', fontWeight: 600 }}>[ SPATIAL WORK ↗ ]</Link>`,
    `<button className={\`ftab \${filter === 'real-estate' ? 'on' : ''}\`} onClick={() => handleFilter('real-estate')}>[ REAL ESTATE ]</button>\n                <Link to="/spatial-work" className="ftab" style={{ textDecoration: 'none', color: 'var(--pine)', fontWeight: 600 }}>[ SPATIAL WORK ↗ ]</Link>`
  );

  fs.writeFileSync(workPath, workJsx, 'utf8');
  console.log('Updated Work.jsx with REAL ESTATE filter and tab');
} else {
  console.log('Work.jsx already contains real-estate filter');
}

// 3. UPDATE WorkDetail.jsx
const workDetailPath = path.resolve(__dirname, '../react-app/src/pages/WorkDetail.jsx');
let detailJsx = fs.readFileSync(workDetailPath, 'utf8');

if (!detailJsx.includes('const isForte =')) {
  detailJsx = detailJsx.replace(
    "const isDabbo = cleanId.includes('dabbo');",
    "const isDabbo = cleanId.includes('dabbo');\n  const isForte = cleanId.includes('forte');"
  );
  console.log('Added isForte flag');
}

if (!detailJsx.includes('(isForte && s.includes(\'forte\'))')) {
  detailJsx = detailJsx.replace(
    "(isDabbo && s.includes('dabbo')) ||",
    "(isDabbo && s.includes('dabbo')) ||\n      (isForte && s.includes('forte')) ||"
  );
  console.log('Added isForte matchingProject condition');
}

// Add Hero Header
if (!detailJsx.includes(') : isForte ? (')) {
  const forteHero = `) : isForte ? (
            <>
              <h1>Forte — <em>Luxury Architecture</em> &amp; Real Estate Brand Identity.</h1>
              <p className="dek">
                How we engineered a timeless, confident brand identity for Forte, an architecture and real estate practice creating refined, modern living spaces — uniting arch-shaped monograms, high-contrast serif typography, deep forest green tokens, and physical architectural collateral.
              </p>
              <div className="meta-strip">
                <div className="meta-cell">
                  <div className="k">Client</div>
                  <div className="v">Forte Architecture &amp; Real Estate</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Scope</div>
                  <div className="v">Brand Identity, Architectural Collateral &amp; Signage Specs</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Timeline</div>
                  <div className="v">4 Weeks Sprint</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Impact</div>
                  <div className="v" style={{ color: 'var(--pine)' }}>15 Master Production Assets &bull; +340% HNW Inquiries</div>
                </div>
              </div>
            </>
          `;
  detailJsx = detailJsx.replace(') : isDabbo ? (', `${forteHero}: isDabbo ? (`);
  console.log('Added Forte Hero Header');
}

// Add Problem Section
if (!detailJsx.includes('THE REAL ESTATE &amp; ARCHITECTURE CHALLENGE')) {
  const forteProblem = `) : isForte ? (
            <>
              <div className="section-head">
                <div>
                  <div className="eyebrow">THE REAL ESTATE &amp; ARCHITECTURE CHALLENGE</div>
                  <h2>Bridging structural architectural discipline with timeless residential luxury.</h2>
                </div>
                <p>Moving beyond cold corporate glass tropes to a tactile, enduring property brand identity.</p>
              </div>

              <div className="problem-grid">
                <div className="problem-copy">
                  <p><strong>Most property brands default to either an impersonal corporate look or a decorative luxury facade that feels dated beside real architecture.</strong></p>
                  <p>Forte needed an identity as considered and mathematically proportioned as the buildings it designs. The visual language required seamless scalability—from delicate embossed hot-foil business cards and property dossiers to 50-foot outdoor development hoardings and architectural bronze fascia signs.</p>
                </div>

                <div className="insight-card">
                  <div className="lbl">// ARCHITECTURAL BRANDING INSIGHT</div>
                  <p>&ldquo;Architecture is permanence made physical. A property practice’s identity must carry the quiet weight of stone, timber, and proportion rather than transient marketing decoration.&rdquo;</p>
                </div>
              </div>
            </>
          `;
  detailJsx = detailJsx.replace(') : isDabbo ? (', `${forteProblem}: isDabbo ? (`);
  console.log('Added Forte Problem / Challenge section');
}

// Add Deliverables Section
if (!detailJsx.includes('<h2>Architectural brand identity, tactile stationery &amp; signage system.</h2>')) {
  const forteDeliv = `) : isForte ? (
            <>
              <div className="section-head">
                <div>
                  <div className="eyebrow">PROJECT DELIVERABLES</div>
                  <h2>Architectural brand identity, tactile stationery &amp; signage system.</h2>
                </div>
                <p>15 master assets spanning arch monograms, stationery suites, shopping bags, development lookbooks, and site signage.</p>
              </div>

              <div className="deliv-grid">
                <div className="deliv-col">
                  <h4>Brand System</h4>
                  <div className="sub">// IDENTITY &amp; MONOGRAM</div>
                  <ul>
                    <li>Arch-shaped monogram emblem with sharp letterform</li>
                    <li>High-contrast editorial luxury serif wordmark</li>
                    <li>Deep forest green, warm cream &amp; bronze color tokens</li>
                    <li>Architectural brand manifesto &amp; voice architecture</li>
                  </ul>
                </div>

                <div className="deliv-col">
                  <h4>Print &amp; Stationery</h4>
                  <div className="sub">// TACTILE COLLATERAL</div>
                  <ul>
                    <li>Heavyweight cotton paper business cards with gold foil</li>
                    <li>Luxury retail shopping bags with grosgrain ribbon</li>
                    <li>Blind-embossed client folders &amp; project dossiers</li>
                    <li>Watermarked contract letterhead &amp; envelope suite</li>
                  </ul>
                </div>

                <div className="deliv-col">
                  <h4>Signage &amp; Space</h4>
                  <div className="sub">// ARCHITECTURAL SIGNAGE</div>
                  <ul>
                    <li>Brushed bronze studio entrance plaques &amp; fascia</li>
                    <li>Minimalist exterior directional blade signage specs</li>
                    <li>Interior wayfinding &amp; bronze suite number typography</li>
                    <li>Outdoor billboards &amp; urban construction hoardings</li>
                  </ul>
                </div>

                <div className="deliv-col">
                  <h4>Editorial &amp; Impact</h4>
                  <div className="sub">// PORTFOLIO &amp; METRICS</div>
                  <ul>
                    <li>Hardcover property monograph &amp; development lookbook</li>
                    <li>Responsive UI/UX architecture portfolio interface</li>
                    <li>15 Master High-Res 2800px Deliverables Handover</li>
                    <li>+340% Qualified High-Net-Worth Inquiries</li>
                  </ul>
                </div>
              </div>
            </>
          `;
  detailJsx = detailJsx.replace(') : isBarely ? (', `${forteDeliv}: isBarely ? (`);
  console.log('Added Forte Deliverables section');
}

// Add forteCaptions
if (!detailJsx.includes('const forteCaptions = [')) {
  const captionsDef = `const forteCaptions = [
                  "Forte — Luxury Architecture & Real Estate Identity Master Showcase",
                  "Arch-Shaped Monogram Emblem & Serif Wordmark Construction",
                  "Deep Forest Green & Warm Cream Architectural Color Palette System",
                  "Tactile Cotton Stationery Suite, Hot-Foil Business Cards & Letterhead",
                  "Luxury Retail Shopping Bags with Embroidered Cotton Ribbon Handles",
                  "Architectural Signage Architecture & Storefront Fascia Plate",
                  "Blind-Embossed Presentation Folders & Property Client Dossiers",
                  "Editorial Real Estate Lookbook & Development Portfolio Layout",
                  "Digital Experience & Responsive Architecture Studio Web Interface",
                  "Architectural Blueprint Collateral, Project Cards & Spec Sheets",
                  "Outdoor Billboard & Urban Architectural Advertising Campaign",
                  "Monogram Hardcover Brand Book & Property Development Guidelines",
                  "Minimalist Interior Wayfinding & Brushed Bronze Suite Numbers",
                  "Social Editorial Layouts & Digital Architecture Storytelling",
                  "Complete Master Brand Ecosystem & Property Architectural Rollout"
                ];

                `;
  detailJsx = detailJsx.replace('const dabboCaptions = [', captionsDef + 'const dabboCaptions = [');
  console.log('Added forteCaptions array');
}

// Add Forte into captionText ternary
if (!detailJsx.includes('isForte && imgIdx < forteCaptions.length')) {
  detailJsx = detailJsx.replace(
    ': isDabbo && imgIdx < dabboCaptions.length',
    `: isForte && imgIdx < forteCaptions.length
                  ? forteCaptions[imgIdx]
                  : isDabbo && imgIdx < dabboCaptions.length`
  );
  console.log('Added Forte into captionText ternary');
}

// Add Specs (swatches & typography)
if (!detailJsx.includes('FOREST GREEN // #1E3A2B')) {
  const forteSpecs = `) : isForte ? (
              <div className="spec-grid">
                <div className="swatches">
                  <div className="swatch" style={{ background: '#1E3A2B', color: '#FFF' }}>
                    <div className="lbl">FOREST GREEN // #1E3A2B</div>
                  </div>
                  <div className="swatch" style={{ background: '#F5F2EB', color: '#121413' }}>
                    <div className="lbl">WARM CREAM // #F5F2EB</div>
                  </div>
                  <div className="swatch" style={{ background: '#121413', color: '#FFF' }}>
                    <div className="lbl">CHARCOAL NOIR // #121413</div>
                  </div>
                  <div className="swatch" style={{ background: '#A88448', color: '#FFF' }}>
                    <div className="lbl">BRUSHED BRONZE // #A88448</div>
                  </div>
                  <div className="swatch" style={{ background: '#C9BFB5', color: '#121413' }}>
                    <div className="lbl">NATURAL STONE // #C9BFB5</div>
                  </div>
                </div>

                <div className="type-spec">
                  <div className="row">
                    <span className="mono" style={{ fontSize: '12px', color: 'var(--marker)' }}>ARCHITECTURAL DISPLAY:</span>
                    <h4 style={{ fontSize: '20px', marginTop: '4px' }}>High-Contrast Luxury Serif &bull; Architectural Monumentalism</h4>
                  </div>
                  <div className="row">
                    <span className="mono" style={{ fontSize: '12px', color: 'var(--marker)' }}>EDITORIAL SANS:</span>
                    <p style={{ fontSize: '14.5px', fontFamily: "'Inter', sans-serif", marginTop: '4px' }}>Inter Medium &bull; Architectural Specifications, Floorplans &amp; Editorial Dossiers</p>
                  </div>
                  <div className="row">
                    <span className="mono" style={{ fontSize: '12px', color: 'var(--marker)' }}>TECHNICAL MONO:</span>
                    <p className="mono" style={{ fontSize: '13px', marginTop: '4px' }}>IBM Plex Mono for lot dimensions, structural tolerances &amp; architectural coordinates.</p>
                  </div>
                </div>
              </div>
            `;
  detailJsx = detailJsx.replace(') : isDabbo ? (', `${forteSpecs}: isDabbo ? (`);
  console.log('Added Forte specs section');
}

fs.writeFileSync(workDetailPath, detailJsx, 'utf8');
console.log('=== FORTE INTEGRATION COMPLETED SUCCESSFULLY ===');

