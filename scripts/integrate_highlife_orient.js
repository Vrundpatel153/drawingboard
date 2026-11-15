const fs = require('fs');
const path = require('path');

const workDetailPath = path.resolve(__dirname, '../react-app/src/pages/WorkDetail.jsx');
let code = fs.readFileSync(workDetailPath, 'utf8');

// 1. Add isHighLife and isOrient flags
if (!code.includes('const isHighLife =')) {
  code = code.replace(
    "const isForte = cleanId.includes('forte');",
    "const isForte = cleanId.includes('forte');\n  const isHighLife = cleanId.includes('high-life');\n  const isOrient = cleanId.includes('orient');"
  );
  console.log('Added isHighLife and isOrient flags');
}

// 2. Add matchingProject conditions
if (!code.includes('(isHighLife && s.includes(\'high-life\'))')) {
  code = code.replace(
    "(isForte && s.includes('forte')) ||",
    "(isForte && s.includes('forte')) ||\n      (isHighLife && s.includes('high-life')) ||\n      (isOrient && s.includes('orient')) ||"
  );
  console.log('Added isHighLife & isOrient matching conditions');
}

// 3. Add Specs category eyebrow / title
if (!code.includes('High Life Residences Luxury Architecture Case Study')) {
  code = code.replace(
    "? 'Forte Luxury Architecture & Real Estate Brand Identity Case Study'",
    `? 'High Life Residences Luxury Architecture & Campaign Case Study'\n              : isOrient\n              ? 'Orient Developers Spatial Architecture & Brand Identity Case Study'\n              : isForte\n              ? 'Forte Luxury Architecture & Real Estate Brand Identity Case Study'`
  );
  console.log('Added High Life & Orient case study titles');
}

if (!code.includes('LUXURY RESIDENTIAL ARCHITECTURE & CAMPAIGN SYSTEM')) {
  code = code.replace(
    "? 'CASE STUDY // SPEC 24 — LUXURY ARCHITECTURE & REAL ESTATE BRAND IDENTITY'",
    `? 'CASE STUDY // SPEC 25 — LUXURY RESIDENTIAL ARCHITECTURE & CAMPAIGN SYSTEM'\n                : isOrient\n                ? 'CASE STUDY // SPEC 26 — COMMERCIAL SPATIAL BRANDING & ARCHITECTURAL IDENTITY'\n                : isForte\n                ? 'CASE STUDY // SPEC 24 — LUXURY ARCHITECTURE & REAL ESTATE BRAND IDENTITY'`
  );
  console.log('Added High Life & Orient spec tags');
}

// 4. Add Hero Headers
const highLifeHero = `) : isHighLife ? (
            <>
              <h1>High Life — <em>Luxury Architecture</em> &amp; Real Estate Brand Identity.</h1>
              <p className="dek">
                A multi-platform brand identity and metropolitan advertising campaign for High Life, a premier residential tower development by Pioneer Group. Built around the central concept &ldquo;IT’S HIGH LIFE&rdquo;, uniting light trails, architectural grid proportions, gold-foil sales folios, bespoke penthouse monographs, and mobile resident app systems.
              </p>
              <div className="meta-strip">
                <div className="meta-cell">
                  <div className="k">Client</div>
                  <div className="v">High Life by Pioneer Group</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Scope</div>
                  <div className="v">Brand Identity, Environmental Wayfinding, Editorial Folio &amp; Mobile UI</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Timeline</div>
                  <div className="v">6 Weeks Sprint</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Impact</div>
                  <div className="v" style={{ color: 'var(--pine)' }}>30 Master Assets &bull; +420% VIP Registrations &bull; 100% Penthouse Presales</div>
                </div>
              </div>
            </>
          ) : isOrient ? (
            <>
              <h1>Orient Developers — <em>Spatial Architecture</em> &amp; Legacy Brand Identity.</h1>
              <p className="dek">
                Crafting spaces. Building legacies. Comprehensive commercial spatial design, environmental branding, architectural wayfinding, corporate identity suite, and luxury sales gallery presentation system for Orient Developers.
              </p>
              <div className="meta-strip">
                <div className="meta-cell">
                  <div className="k">Client</div>
                  <div className="v">Orient Developers</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Scope</div>
                  <div className="v">Spatial Branding, Environmental Graphics, Sales Gallery &amp; Identity</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Timeline</div>
                  <div className="v">5 Weeks Delivery</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Impact</div>
                  <div className="v" style={{ color: 'var(--pine)' }}>18 Master Folio &amp; Interior Assets &bull; 10-Part Architectural Case Study</div>
                </div>
              </div>
            </>
          `;

if (!code.includes(') : isHighLife ? (')) {
  code = code.replace(') : isForte ? (', `${highLifeHero}) : isForte ? (`);
  console.log('Added High Life & Orient Hero Headers');
}

// 5. Add Problem Section
const highLifeProblem = `) : isHighLife ? (
            <>
              <div className="section-head">
                <div>
                  <div className="eyebrow">THE HIGH-END REAL ESTATE IDENTITY CHALLENGE</div>
                  <h2>Distinguishing a landmark residential tower in a crowded metropolitan luxury market.</h2>
                </div>
                <p>Moving beyond predictable property marketing to an urban architectural icon celebrated through light and tactile craft.</p>
              </div>

              <div className="problem-grid">
                <div className="problem-copy">
                  <p><strong>Conventional real estate branding often falls into repetitive clichés: generic 3D renders paired with timid typography that fail to convey true architectural stature.</strong></p>
                  <p>High Life by Pioneer Group demanded an identity that reflects the pulse of high-altitude metropolitan living. The system needed to celebrate the nocturnal skyline through vibrant light trails, while anchoring the physical experience in ultra-premium tactile finishes—heavyweight blind-debossed Penthouse lookbooks, gold-foil sales dossiers, luminous tower signage, and a dedicated resident mobile portal.</p>
                </div>

                <div className="insight-card">
                  <div className="lbl">// ARCHITECTURAL HORIZON INSIGHT</div>
                  <p>&ldquo;Skyline architecture is not just a building; it is a viewpoint. The brand must embody the elevation, speed, and luminous atmosphere of living above the city.&rdquo;</p>
                </div>
              </div>
            </>
          ) : isOrient ? (
            <>
              <div className="section-head">
                <div>
                  <div className="eyebrow">THE SPATIAL &amp; ARCHITECTURAL LEGACY CHALLENGE</div>
                  <h2>Unifying physical architecture with corporate identity and commercial sales environments.</h2>
                </div>
                <p>Creating an environmental brand language that lives and breathes in physical space.</p>
              </div>

              <div className="problem-grid">
                <div className="problem-copy">
                  <p><strong>Orient Developers creates enduring spaces engineered to stand the test of time. Their visual and physical brand required a seamless bridge between architecture and human experience.</strong></p>
                  <p>We designed an environmental branding and spatial design system where every touchpoint—from sales gallery reception desks and architectural moodboard vitrines to executive corporate folios and digital showroom screens—articulates enduring craftsmanship, balanced proportions, and permanent architectural value.</p>
                </div>

                <div className="insight-card">
                  <div className="lbl">// SPATIAL BRANDING INSIGHT</div>
                  <p>&ldquo;When branding lives in the physical space, architecture stops being passive shelter and becomes an active, immersive brand experience.&rdquo;</p>
                </div>
              </div>
            </>
          `;

if (!code.includes('THE HIGH-END REAL ESTATE IDENTITY CHALLENGE')) {
  code = code.replace(') : isForte ? (', `${highLifeProblem}) : isForte ? (`);
  console.log('Added High Life & Orient Problem sections');
}

// 6. Add Deliverables Section
const highLifeDeliv = `) : isHighLife ? (
            <>
              <div className="section-head">
                <div>
                  <div className="eyebrow">PROJECT DELIVERABLES</div>
                  <h2>Master identity, sales gallery collaterals, wayfinding &amp; resident digital app.</h2>
                </div>
                <p>30 production assets spanning brand marks, gold-foil sales dossiers, penthouse monographs, mobile UI, and exterior site hoardings.</p>
              </div>

              <div className="deliv-grid">
                <div className="deliv-col">
                  <h4>01 / Brand System</h4>
                  <ul>
                    <li>Dynamic Light-Trail Identity</li>
                    <li>Geometric Logotype Construction</li>
                    <li>Master Token &amp; Grid Hierarchy</li>
                    <li>Obsidian &amp; Amber Palette</li>
                  </ul>
                </div>
                <div className="deliv-col">
                  <h4>02 / Print &amp; Folios</h4>
                  <ul>
                    <li>Gold-Foil Sales Folio Suite</li>
                    <li>Hardcover Penthouse Monograph</li>
                    <li>Translucent Vellum VIP Invites</li>
                    <li>Architectural Floorplate Volumes</li>
                  </ul>
                </div>
                <div className="deliv-col">
                  <h4>03 / Space &amp; Signage</h4>
                  <ul>
                    <li>Exterior Luminous Tower Signage</li>
                    <li>Sales Gallery Brass Relief</li>
                    <li>Custom Brass Residence Numbers</li>
                    <li>Construction Perimeter Hoardings</li>
                  </ul>
                </div>
                <div className="deliv-col">
                  <h4>04 / Digital &amp; Touch</h4>
                  <ul>
                    <li>Resident Companion Mobile App</li>
                    <li>Metropolitan Billboard Campaign</li>
                    <li>Concierge Leather Key-Card Sleeves</li>
                    <li>Resident Welcome Amenity Box</li>
                  </ul>
                </div>
              </div>
            </>
          ) : isOrient ? (
            <>
              <div className="section-head">
                <div>
                  <div className="eyebrow">PROJECT DELIVERABLES</div>
                  <h2>Spatial architecture, environmental graphics &amp; executive folio suite.</h2>
                </div>
                <p>18 master assets including 10-part architectural case study presentation, moodboards, environmental signage, and sales gallery.</p>
              </div>

              <div className="deliv-grid">
                <div className="deliv-col">
                  <h4>01 / Spatial Identity</h4>
                  <ul>
                    <li>Spatial Brand Architecture</li>
                    <li>Environmental Graphic Standards</li>
                    <li>Architectural Grid &amp; Proportions</li>
                    <li>Monogram Construction Specs</li>
                  </ul>
                </div>
                <div className="deliv-col">
                  <h4>02 / Executive Print</h4>
                  <ul>
                    <li>Corporate Stationery Suite</li>
                    <li>Architectural Specification Folios</li>
                    <li>Embossed Presentation Folders</li>
                    <li>Tactile Cotton Paper Stocks</li>
                  </ul>
                </div>
                <div className="deliv-col">
                  <h4>03 / Space &amp; Materials</h4>
                  <ul>
                    <li>Architectural Material Moodboards</li>
                    <li>Natural Oak &amp; Travertine Desks</li>
                    <li>Sales Lounge Reception Signage</li>
                    <li>Corridor Wayfinding Plaques</li>
                  </ul>
                </div>
                <div className="deliv-col">
                  <h4>04 / Digital &amp; Display</h4>
                  <ul>
                    <li>Digital Showroom Screen Layouts</li>
                    <li>Interactive Walkthrough Graphics</li>
                    <li>3D Architectural Render Sheets</li>
                    <li>Contractor Specification Handoff</li>
                  </ul>
                </div>
              </div>
            </>
          `;

if (!code.includes('sales gallery collaterals, wayfinding &amp; resident digital app')) {
  code = code.replace(') : isForte ? (', `${highLifeDeliv}) : isForte ? (`);
  console.log('Added High Life & Orient Deliverables sections');
}

// 7. Add Captions Arrays
const highLifeCaptions = `const highLifeCaptions = [
  "Master architectural perspective and light-trail brand identity for High Life Residences by Pioneer Group.",
  "Dynamic typographic monogram and nocturnal light-trail motion system celebrating metropolitan elevation.",
  "Gold-foil stamped residential sales presentation folio and private VIP buyer invitation suite.",
  "Mathematical logotype construction and architectural grid proportions ensuring cross-scale precision.",
  "Exterior residential façade signage specifications and illuminated crown tower branding.",
  "Master architectural color system: Obsidian Midnight, Illuminated Amber Gold, and Warm Gallery Ivory.",
  "Bespoke hardcover architectural monograph and clothbound floorplate volume for prospective buyers.",
  "High-impact metropolitan expressway billboard campaign deployed across premier urban corridors.",
  "Editorial typography hierarchy, typographic scale, and bilingual publication layout guidelines.",
  "Resident private access credentials: blind-embossed leather key-card sleeve and welcome keepsake box.",
  "Tactile print production specifications, heavyweight cotton paper stocks, and hot-foil finishing guide.",
  "Executive stationery suite: engraved correspondence cards, watermarked letterheads, and brass desk accoutrements.",
  "Environmental wayfinding iconography suite and architectural residential level directory standards.",
  "Transit lounge and private aviation terminal billboard network highlighting panoramic horizon views.",
  "Master brand identity guideline volume detailing clearspace, grid alignments, and brand governance.",
  "Sales gallery interior reception wall relief featuring custom hand-finished patinated architectural brass.",
  "Metropolitan digital outdoor billboard network campaign synchronized for twilight and evening commuter traffic.",
  "Exclusive penthouse floorplate diagrams, terrace architectural layouts, and unit marketing schematics.",
  "Hero architectural rendering of High Life tower rising against twilight metropolitan sky.",
  "Concierge amenity welcome box featuring embossed metallic ribbon, room fragrance, and resident directory.",
  "Smart resident companion mobile app UI: home automation, private amenity reservations, and concierge valet dispatch.",
  "Penthouse collector lookbook cover featuring blind debossing, gilt paper edges, and linen spine wrap.",
  "Property sales brochure interior double-page spread displaying bespoke interior specifications and material palettes.",
  "Sales gallery presentation stand and bespoke bronze brochure display furniture integration.",
  "Architectural scale model presentation plinth signage and real-time unit availability digital board.",
  "Private VIP dinner invitation suite featuring translucent vellum outer jacket and wax seal stamp.",
  "Custom solid brass residence unit numerals and corridor directional wayfinding signage plaque.",
  "Illuminated construction perimeter hoarding lightbox system showcasing architectural renders and timeline milestones.",
  "Full-scale site hoarding graphics maintaining high-end brand prestige during active tower construction.",
  "Closing High Life signature lockup and positioning statement: 'IT’S HIGH LIFE' by Pioneer Group."
];

const orientCaptions = [
  "Orient Developers master title cover: 'Crafting spaces. Building legacies.' — Architectural Spatial Design Folio.",
  "Overview & design philosophy: Thoughtful design, timeless architecture, and enduring generational value.",
  "Brand strategy & architectural positioning: Designed for today, built for enduring generations.",
  "Material moodboard: Natural oak, brushed aluminum, raw travertine, architectural glass, and warm linen.",
  "Master logo & monogram construction: 'We shape spaces that stand the test of time.'",
  "Executive corporate stationery suite: Letterhead, envelopes, and blind-embossed business cards.",
  "Print collaterals & specification folios: Heavyweight stock with precision architectural layout grid.",
  "Environmental branding: 'Branding that lives in the space' — Sales lounge & commercial reception graphics.",
  "Digital applications & interactive display surfaces for sales galleries and executive presentation screens.",
  "Final brand showcase: The complete unified spatial and architectural identity system for Orient Developers.",
  "Executive sales boardroom: Seamless integration of acoustic oak paneling, bronze lighting, and custom joinery.",
  "Private consultation lounge: Minimalist fluted millwork, natural limewash plaster, and bespoke brass accents.",
  "Reception area architectural volume: Travertine service monolith, discreet wayfinding, and atmospheric illumination.",
  "Material sample presentation tray: Direct tactile comparison of stone, timber, metal, and fabric finishes.",
  "Private client meeting salon: Acoustic drapery, refined leather seating, and integrated digital display walls.",
  "Architectural model gallery: Dedicated presentation zone with focused directional lighting and unit display tables.",
  "Corridor wayfinding and directional signage: Architectural brushed brass plaques with subtle recessed type.",
  "Exterior entrance canopy and illuminated brand mark: High-visibility prestige presence at building threshold."
];\n\n`;

if (!code.includes('const highLifeCaptions =')) {
  code = code.replace('const forteCaptions = [', `${highLifeCaptions}const forteCaptions = [`);
  console.log('Added highLifeCaptions and orientCaptions arrays');
}

// 8. Add Captions ternary condition
if (!code.includes('isHighLife && imgIdx < highLifeCaptions.length')) {
  code = code.replace(
    ": isForte && imgIdx < forteCaptions.length",
    `: isHighLife && imgIdx < highLifeCaptions.length\n                  ? highLifeCaptions[imgIdx]\n                  : isOrient && imgIdx < orientCaptions.length\n                  ? orientCaptions[imgIdx]\n                  : isForte && imgIdx < forteCaptions.length`
  );
  console.log('Added High Life & Orient captions in ternary');
}

// 9. Add Swatches & Typography Specs
const highLifeSwatches = `) : isHighLife ? (
              <div className="spec-grid">
                <div className="swatches">
                  <div className="swatch" style={{ background: '#0D1117' }}>
                    <div className="swatch-c">#0D1117</div>
                    <div className="swatch-n">Obsidian Midnight</div>
                  </div>
                  <div className="swatch" style={{ background: '#D4A359', color: '#111' }}>
                    <div className="swatch-c" style={{ color: '#111' }}>#D4A359</div>
                    <div className="swatch-n" style={{ color: '#111' }}>Amber Light Gold</div>
                  </div>
                  <div className="swatch" style={{ background: '#F5F2EB', color: '#111' }}>
                    <div className="swatch-c" style={{ color: '#111' }}>#F5F2EB</div>
                    <div className="swatch-n" style={{ color: '#111' }}>Gallery Ivory</div>
                  </div>
                  <div className="swatch" style={{ background: '#3A4D39' }}>
                    <div className="swatch-c">#3A4D39</div>
                    <div className="swatch-n">Park View Pine</div>
                  </div>
                  <div className="swatch" style={{ background: '#8C92AC' }}>
                    <div className="swatch-c">#8C92AC</div>
                    <div className="swatch-n">Skyline Titanium</div>
                  </div>
                </div>

                <div className="typeset">
                  <div className="type-row">
                    <span className="mono">DISPLAY</span>
                    <span style={{ fontFamily: "'Fraunces', serif", fontSize: '22px', fontWeight: 600 }}>High Life Display Serif — Editorial Elegance</span>
                  </div>
                  <div className="type-row">
                    <span className="mono">HEADLINE</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '18px', fontWeight: 700, letterSpacing: '0.08em' }}>ARCHITECTURAL GEOMETRIC SANS</span>
                  </div>
                  <div className="type-row">
                    <span className="mono">BODY</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--ink-soft)' }}>Inter Regular 15/24 — High-legibility technical floorplate annotations</span>
                  </div>
                  <div className="type-row">
                    <span className="mono">SPECS</span>
                    <span className="mono" style={{ fontSize: '13px', color: 'var(--pine)' }}>IBM PLEX MONO 12PT // ARCHITECTURAL WAYFINDING &amp; SIGNAGE</span>
                  </div>
                </div>
              </div>
            ) : isOrient ? (
              <div className="spec-grid">
                <div className="swatches">
                  <div className="swatch" style={{ background: '#24282B' }}>
                    <div className="swatch-c">#24282B</div>
                    <div className="swatch-n">Architectural Slate</div>
                  </div>
                  <div className="swatch" style={{ background: '#8D7B68' }}>
                    <div className="swatch-c">#8D7B68</div>
                    <div className="swatch-n">Warm Oak Taupe</div>
                  </div>
                  <div className="swatch" style={{ background: '#EAE6DF', color: '#111' }}>
                    <div className="swatch-c" style={{ color: '#111' }}>#EAE6DF</div>
                    <div className="swatch-n" style={{ color: '#111' }}>Limewash Off-White</div>
                  </div>
                  <div className="swatch" style={{ background: '#4A5568' }}>
                    <div className="swatch-c">#4A5568</div>
                    <div className="swatch-n">Structural Steel</div>
                  </div>
                  <div className="swatch" style={{ background: '#C2B092', color: '#111' }}>
                    <div className="swatch-c" style={{ color: '#111' }}>#C2B092</div>
                    <div className="swatch-n" style={{ color: '#111' }}>Raw Travertine</div>
                  </div>
                </div>

                <div className="typeset">
                  <div className="type-row">
                    <span className="mono">DISPLAY</span>
                    <span style={{ fontFamily: "'Fraunces', serif", fontSize: '22px', fontWeight: 600 }}>Orient Architectural Serif — Generational Permanence</span>
                  </div>
                  <div className="type-row">
                    <span className="mono">HEADLINE</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '18px', fontWeight: 700, letterSpacing: '0.06em' }}>SPATIAL GEOMETRIC SANS</span>
                  </div>
                  <div className="type-row">
                    <span className="mono">BODY</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--ink-soft)' }}>Inter Regular 15/24 — Refined architectural specifications</span>
                  </div>
                  <div className="type-row">
                    <span className="mono">SPECS</span>
                    <span className="mono" style={{ fontSize: '13px', color: 'var(--pine)' }}>IBM PLEX MONO 12PT // ENVIRONMENTAL BRANDING &amp; WAYFINDING</span>
                  </div>
                </div>
              </div>
            `;

if (!code.includes('#D4A359')) {
  code = code.replace(') : isForte ? (', `${highLifeSwatches}) : isForte ? (`);
  console.log('Added High Life & Orient Swatches & Typography Specs');
}

fs.writeFileSync(workDetailPath, code, 'utf8');
console.log('WorkDetail.jsx updated successfully with High Life Residences & Orient Developers!');

