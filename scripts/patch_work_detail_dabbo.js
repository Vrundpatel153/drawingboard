const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../react-app/src/pages/WorkDetail.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add isDabbo flag
if (!content.includes('const isDabbo =')) {
  content = content.replace(
    "const isBonta = cleanId.includes('bonta');",
    "const isBonta = cleanId.includes('bonta');\n  const isDabbo = cleanId.includes('dabbo');"
  );
  console.log('Added isDabbo flag');
}

// 2. Add matchingProject condition
if (!content.includes('(isDabbo && s.includes(\'dabbo\'))')) {
  content = content.replace(
    "(isBonta && s.includes('bonta')) ||",
    "(isBonta && s.includes('bonta')) ||\n      (isDabbo && s.includes('dabbo')) ||"
  );
  console.log('Added isDabbo matchingProject condition');
}

// 3. Add Hero Header
if (!content.includes(') : isDabbo ? (')) {
  const dabboHero = `) : isDabbo ? (
            <>
              <h1>Dabbo — <em>Madrid Street Food Hot Dog</em> &amp; Specialty Coffee Packaging.</h1>
              <p className="dek">
                Artisanal street food brand identity, custom folding hot dog clamshells, takeaway carrier boxes (&lsquo;dabbo&rsquo;), specialty coffee cups, and greaseproof continuous-pattern wrapping paper engineered for Madrid&apos;s energetic quick-service dining scene.
              </p>
              <div className="meta-strip">
                <div className="meta-cell">
                  <div className="k">Client</div>
                  <div className="v">Dabbo Madrid (Spain)</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Scope</div>
                  <div className="v">Street Food Identity, Custom Packaging Dielines &amp; Coffee Collateral</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Timeline</div>
                  <div className="v">4 Weeks Sprint</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Impact</div>
                  <div className="v" style={{ color: 'var(--pine)' }}>10 Master High-Res Assets &bull; +280% Footfall</div>
                </div>
              </div>
            </>
          `;

  // Insert before isGloopy in Hero
  content = content.replace(') : isGloopy ? (', `${dabboHero}: isGloopy ? (`);
  console.log('Added Dabbo Hero Header');
}

// 4. Add Deliverables Section for Dabbo
if (!content.includes('<h2>Madrid street food hot dog &amp; specialty coffee packaging suite.</h2>')) {
  const dabboDeliv = `) : isDabbo ? (
            <>
              <div className="section-head">
                <div>
                  <div className="eyebrow">PROJECT DELIVERABLES</div>
                  <h2>Madrid street food hot dog &amp; specialty coffee packaging suite.</h2>
                </div>
                <p>10 master production assets spanning interlocking clamshell boxes, carrier caddies, coffee sleeves, and greaseproof wrap patterns.</p>
              </div>

              <div className="deliv-grid">
                <div className="deliv-col">
                  <h4>Brand System</h4>
                  <div className="sub">// IDENTITY &amp; TYPOGRAPHY</div>
                  <ul>
                    <li>Retro European display wordmark &amp; badge</li>
                    <li>Madrid Crimson, Brioche Cream &amp; Roast Espresso</li>
                    <li>Street food brand voice &amp; Madrid narrative</li>
                    <li>Dual-service coffee &amp; hot dog emblem stamps</li>
                  </ul>
                </div>

                <div className="deliv-col">
                  <h4>Packaging Architecture</h4>
                  <div className="sub">// DIELINES &amp; BOXES</div>
                  <ul>
                    <li>Custom folding hot dog clamshell boxes with lock tab</li>
                    <li>Cardboard takeaway carrier boxes (&lsquo;dabbo&rsquo;)</li>
                    <li>Specialty coffee cups &amp; corrugated thermal sleeves</li>
                    <li>Continuous greaseproof wrapping paper liners</li>
                  </ul>
                </div>

                <div className="deliv-col">
                  <h4>Physical Collateral</h4>
                  <div className="sub">// MERCH &amp; ENVIRONMENT</div>
                  <ul>
                    <li>Fluorescent circular sticker seals &amp; tape</li>
                    <li>Heavyweight kraft takeout shopping bags</li>
                    <li>Streetfront walk-up counter signage &amp; blade sign</li>
                    <li>Modular printed daily special menu boards</li>
                  </ul>
                </div>

                <div className="deliv-col">
                  <h4>Commercial Impact</h4>
                  <div className="sub">// PERFORMANCE METRICS</div>
                  <ul>
                    <li>10 Master High-Res 4K Production Assets</li>
                    <li>Turnkey 4-Week Fast-Track Delivery</li>
                    <li>+280% Footfall &amp; Walk-Up Order Velocity</li>
                    <li>100% Recyclable &amp; Biodegradable Food Materials</li>
                  </ul>
                </div>
              </div>
            </>
          `;

  content = content.replace(
    '{isBarely ? (\n            <>\n              <div className="section-head">\n                <div>\n                  <div className="eyebrow">PROJECT DELIVERABLES</div>\n                  <h2>Clean intimate skincare &amp; packaging architecture.</h2>',
    `{isDabbo ? (\n            <>\n              <div className="section-head">\n                <div>\n                  <div className="eyebrow">PROJECT DELIVERABLES</div>\n                  <h2>Madrid street food hot dog &amp; specialty coffee packaging suite.</h2>\n                </div>\n                <p>10 master production assets spanning interlocking clamshell boxes, carrier caddies, coffee sleeves, and greaseproof wrap patterns.</p>\n              </div>\n\n              <div className="deliv-grid">\n                <div className="deliv-col">\n                  <h4>Brand System</h4>\n                  <div className="sub">// IDENTITY &amp; TYPOGRAPHY</div>\n                  <ul>\n                    <li>Retro European display wordmark &amp; badge</li>\n                    <li>Madrid Crimson, Brioche Cream &amp; Roast Espresso</li>\n                    <li>Street food brand voice &amp; Madrid narrative</li>\n                    <li>Dual-service coffee &amp; hot dog emblem stamps</li>\n                  </ul>\n                </div>\n\n                <div className="deliv-col">\n                  <h4>Packaging Architecture</h4>\n                  <div className="sub">// DIELINES &amp; BOXES</div>\n                  <ul>\n                    <li>Custom folding hot dog clamshell boxes with lock tab</li>\n                    <li>Cardboard takeaway carrier boxes (&lsquo;dabbo&rsquo;)</li>\n                    <li>Specialty coffee cups &amp; corrugated thermal sleeves</li>\n                    <li>Continuous greaseproof wrapping paper liners</li>\n                  </ul>\n                </div>\n\n                <div className="deliv-col">\n                  <h4>Physical Collateral</h4>\n                  <div className="sub">// MERCH &amp; ENVIRONMENT</div>\n                  <ul>\n                    <li>Fluorescent circular sticker seals &amp; tape</li>\n                    <li>Heavyweight kraft takeout shopping bags</li>\n                    <li>Streetfront walk-up counter signage &amp; blade sign</li>\n                    <li>Modular printed daily special menu boards</li>\n                  </ul>\n                </div>\n\n                <div className="deliv-col">\n                  <h4>Commercial Impact</h4>\n                  <div className="sub">// PERFORMANCE METRICS</div>\n                  <ul>\n                    <li>10 Master High-Res 4K Production Assets</li>\n                    <li>Turnkey 4-Week Fast-Track Delivery</li>\n                    <li>+280% Footfall &amp; Walk-Up Order Velocity</li>\n                    <li>100% Recyclable &amp; Biodegradable Food Materials</li>\n                  </ul>\n                </div>\n              </div>\n            </>\n          ) : isBarely ? (\n            <>\n              <div className="section-head">\n                <div>\n                  <div className="eyebrow">PROJECT DELIVERABLES</div>\n                  <h2>Clean intimate skincare &amp; packaging architecture.</h2>`
  );
  console.log('Added Deliverables section for Dabbo');
}

// 5. Add The Madrid Street Food Challenge in Problem Section
if (!content.includes('THE MADRID STREET FOOD CHALLENGE')) {
  const dabboProblem = `isDabbo ? (
            <>
              <div className="section-head">
                <div>
                  <div className="eyebrow">THE MADRID STREET FOOD CHALLENGE</div>
                  <h2>Reinventing casual street dining into a cult-favorite culinary destination.</h2>
                </div>
                <p>Moving beyond generic fast-food paper wraps to an iconic, retro-modern takeaway packaging architecture.</p>
              </div>

              <div className="problem-grid">
                <div className="problem-copy">
                  <p><strong>Madrid&apos;s bustling street food landscape demanded an identity that honors Spanish culinary warmth while executing with razor-sharp Scandinavian typographic restraint.</strong></p>
                  <p>Dabbo needed a modular takeaway architecture capable of keeping artisanal grilled sausages piping hot, containing condiments without sogginess, and pairing seamlessly with high-volume specialty roasted espresso on the go.</p>
                </div>

                <div className="insight-card">
                  <div className="lbl">// PACKAGING FUNCTIONALITY INSIGHT</div>
                  <p>&ldquo;Street food packaging must perform as a mobile billboard. When custom folding clamshells lock securely and carry bold Madrid crimson branding, customers proudly carry the brand across the city plazas.&rdquo;</p>
                </div>
              </div>
            </>
          ) : `;

  content = content.replace('{isBarely ? (', `{${dabboProblem}isBarely ? (`);
  console.log('Added Dabbo Challenge / Problem section');
}

// 6. Add dabboCaptions and caption ternary
if (!content.includes('const dabboCaptions = [')) {
  const captionsDef = `const dabboCaptions = [
                  "Dabbo — Master Brand Identity & Madrid Street Food Packaging Suite",
                  "Artisanal Hot Dog Folding Clamshell Box with Precision Locking Tab",
                  "Modular Takeaway Carrier Box ('Dabbo') Engineered for Street Dining",
                  "Specialty Roasted Coffee Cups & Corrugated Thermal Embossed Sleeves",
                  "Greaseproof Repeating Pattern Food Wrapping Liners & Fast-Casual Tray Setup",
                  "Fluorescent Sticker Seal Architecture & Tamper-Evident Packaging Badges",
                  "Bespoke Retro Wordmark & Madrid Street Food Emblem Stamp Matrix",
                  "Takeaway Kraft Paper Bags with Bold Red Screen-Printed Typography",
                  "Streetfront Signage & Madrid Walk-Up Window Spatial Menu Architecture",
                  "Complete Quick-Service Brand Architecture & Production-Ready Dieline System"
                ];

                `;
  content = content.replace('const bontaCaptions = [', captionsDef + 'const bontaCaptions = [');
  console.log('Added dabboCaptions array');
}

// Update captionText ternary
if (!content.includes('isDabbo && imgIdx < dabboCaptions.length')) {
  content = content.replace(
    ': isGloopy && imgIdx < gloopyCaptions.length',
    `: isDabbo && imgIdx < dabboCaptions.length
                  ? dabboCaptions[imgIdx]
                  : isGusto && imgIdx < gustoCaptions.length
                  ? gustoCaptions[imgIdx]
                  : isBonta && imgIdx < bontaCaptions.length
                  ? bontaCaptions[imgIdx]
                  : isGloopy && imgIdx < gloopyCaptions.length`
  );
  console.log('Added Dabbo, Gusto, and Bonta into captionText ternary');
}

// 7. Add Dabbo Color Swatches and Typography in Specs
if (!content.includes('MADRID CRIMSON // #C8102E')) {
  const dabboSpecs = `) : isDabbo ? (
              <div className="spec-grid">
                <div className="swatches">
                  <div className="swatch" style={{ background: '#C8102E', color: '#FFF' }}>
                    <div className="lbl">MADRID CRIMSON // #C8102E</div>
                  </div>
                  <div className="swatch" style={{ background: '#F6F2E9', color: '#1A120E' }}>
                    <div className="lbl">BRIOCHE CREAM // #F6F2E9</div>
                  </div>
                  <div className="swatch" style={{ background: '#1A120E', color: '#FFF' }}>
                    <div className="lbl">ESPRESSO ROAST // #1A120E</div>
                  </div>
                  <div className="swatch" style={{ background: '#EAA824', color: '#1A120E' }}>
                    <div className="lbl">RETRO MUSTARD // #EAA824</div>
                  </div>
                  <div className="swatch" style={{ background: '#7A9AB8', color: '#FFF' }}>
                    <div className="lbl">SPANISH SKY // #7A9AB8</div>
                  </div>
                </div>

                <div className="type-spec">
                  <div className="row">
                    <span className="mono" style={{ fontSize: '12px', color: 'var(--marker)' }}>STREET DISPLAY:</span>
                    <h4 style={{ fontSize: '20px', marginTop: '4px' }}>Vintage European Grotesk &bull; Bold Retro Street Display</h4>
                  </div>
                  <div className="row">
                    <span className="mono" style={{ fontSize: '12px', color: 'var(--marker)' }}>MENU &amp; PACKAGING:</span>
                    <p style={{ fontSize: '14.5px', fontFamily: "'Inter', sans-serif", marginTop: '4px' }}>Inter SemiBold &bull; Clamshell Nutrition &amp; Takeaway Menu Typography</p>
                  </div>
                  <div className="row">
                    <span className="mono" style={{ fontSize: '12px', color: 'var(--marker)' }}>TECHNICAL MONO:</span>
                    <p className="mono" style={{ fontSize: '13px', marginTop: '4px' }}>IBM Plex Mono for roasting origins, dieline cut-lines &amp; batch codes.</p>
                  </div>
                </div>
              </div>
            `;
  content = content.replace(') : isBonta ? (', `${dabboSpecs}: isBonta ? (`);
  console.log('Added Dabbo specs section');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('WorkDetail.jsx patch complete!');
