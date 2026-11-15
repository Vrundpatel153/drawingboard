const fs = require('fs');

const path = './react-app/src/pages/WorkDetail.jsx';
let content = fs.readFileSync(path, 'utf8').replace(/\r\n/g, '\n');

// 1. HERO SECTION CLEANUP
const heroCutStart = content.indexOf('          ) : isGusto ? (\n            <>\n              <h1>Gusto — <em>Handcrafted Pottery</em>');
const heroCutEnd = content.indexOf('          ) : isForte ? (\n            <>\n              <h1>Forte — <em>Luxury Architecture</em>');

if (heroCutStart === -1 || heroCutEnd === -1) {
  // Let's find by alternate pattern if needed
  console.error('Failed to locate hero cut boundaries!', { heroCutStart, heroCutEnd });
  process.exit(1);
}

const cleanHeroBlock = `          ) : isGusto ? (
            <>
              <h1>Gusto — <em>Handcrafted Pottery</em> &amp; Mindful Living Brand Identity.</h1>
              <p className="dek">
                A thoughtful, elegant homeware and ceramic studio celebrating the art of intentional, mindful living. Merging functional tableware with serene earthy textures, tactile stationery packaging, and calm editorial storytelling.
              </p>
              <div className="meta-strip">
                <div className="meta-cell">
                  <div className="k">Client</div>
                  <div className="v">Gusto Ceramic &amp; Homeware Studio</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Scope</div>
                  <div className="v">Brand Identity, Packaging Suite, Art Direction &amp; Motion</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Timeline</div>
                  <div className="v">4 Weeks Sprint</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Impact</div>
                  <div className="v" style={{ color: 'var(--pine)' }}>22 Master Brand &amp; Packaging Assets</div>
                </div>
              </div>
            </>
          ) : isBonta ? (
            <>
              <h1>Bontà — <em>Artisanal Gelato</em> &amp; Outdoor Adventure Packaging Architecture.</h1>
              <p className="dek">
                Born in Bend, Oregon. Rebranding small-batch Pacific Northwest gelato around &ldquo;Gelato from the great outdoors&rdquo; — blending topographical mountain contours with fluid gelato textures, vibrant activewear colors, and custom outdoor character storytelling.
              </p>
              <div className="meta-strip">
                <div className="meta-cell">
                  <div className="k">Client</div>
                  <div className="v">Bontà Gelato (Bend, Oregon)</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Scope</div>
                  <div className="v">Brand Strategy, Retail Pint Packaging Architecture &amp; Motion</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Timeline</div>
                  <div className="v">5 Weeks Delivery</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Impact</div>
                  <div className="v" style={{ color: 'var(--pine)' }}>24 Master Packaging Assets &bull; Oregon Regional Retail Expansion</div>
                </div>
              </div>
            </>
          ) : isElsewhere ? (
            <>
              <h1>ELSEWHERE — <em>Daydream Coffee Shop</em> Branding &amp; Packaging.</h1>
              <p className="dek">
                How we engineered a dreamy, contemporary hospitality brand identity inspired by the quiet beauty of daydreaming — blending earthy olive palettes, editorial typography, whimsical cloud characters, and tactile coffee packaging systems.
              </p>
              <div className="meta-strip">
                <div className="meta-cell">
                  <div className="k">Client</div>
                  <div className="v">ELSEWHERE Daydream Coffee Co.</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Scope</div>
                  <div className="v">Brand Identity, Packaging &amp; Illustration</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Timeline</div>
                  <div className="v">4 Weeks Sprint</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Impact</div>
                  <div className="v" style={{ color: 'var(--pine)' }}>30 Master Production Assets</div>
                </div>
              </div>
            </>
          ) : isHighLife ? (
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
                  <div className="v">6 Weeks Delivery</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Impact</div>
                  <div className="v" style={{ color: 'var(--pine)' }}>30 Master Assets &bull; 92% Penthouse Pre-Commitment</div>
                </div>
              </div>
            </>
          ) : isOrient ? (
            <>
              <h1>Orient Developers — <em>Spatial Design, Architecture</em> &amp; Legacy Brand Identity.</h1>
              <p className="dek">
                Complete brand architecture, spatial environmental graphics, and bespoke corporate sales folio design for Orient Developers — engineering an enduring visual and physical identity celebrating architectural permanence, balanced proportions, and multi-generational craftsmanship.
              </p>
              <div className="meta-strip">
                <div className="meta-cell">
                  <div className="k">Client</div>
                  <div className="v">Orient Developers &amp; Builders</div>
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

content = content.slice(0, heroCutStart) + cleanHeroBlock + content.slice(heroCutEnd);
console.log('Hero block replaced successfully.');

// 2. PROBLEM SECTION INSERTION
const problemTarget = `          ) : isDabbo ? (
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
            </>`;

const problemInsert = problemTarget + `
          ) : isHighLife ? (
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
                  <div className="lbl">// ARCHITECTURAL SKYLINE INSIGHT</div>
                  <p>&ldquo;True high-rise luxury isn&apos;t about golden embellishment—it&apos;s about altitude, light, and proportion. When light trails embody kinetic urban energy, the tower transforms into a living beacon across the skyline.&rdquo;</p>
                </div>
              </div>
            </>
          ) : isOrient ? (
            <>
              <div className="section-head">
                <div>
                  <div className="eyebrow">THE SPATIAL ARCHITECTURE CHALLENGE</div>
                  <h2>Translating multi-generational structural engineering into a permanent brand language.</h2>
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
          ) : isGusto ? (
            <>
              <div className="section-head">
                <div>
                  <div className="eyebrow">THE MINDFUL LIVING &amp; CRAFT CHALLENGE</div>
                  <h2>Articulating the quiet tactile beauty of handcrafted ceramics in a fast-paced digital age.</h2>
                </div>
                <p>Moving beyond generic homeware minimalism to an intentional, soulfully grounded lifestyle brand.</p>
              </div>

              <div className="problem-grid">
                <div className="problem-copy">
                  <p><strong>In an era of mass-manufactured homewares, Gusto&apos;s handcrafted ceramics represent patience, earth, and mindful presence.</strong></p>
                  <p>The studio needed a visual and packaging identity that doesn&apos;t just sell tableware, but invites people into a daily ritual of slower living. The system balances earthy raw terracotta and moss tones with serene editorial typography, tactile unboxing sleeves, and poetic pottery care guides.</p>
                </div>

                <div className="insight-card">
                  <div className="lbl">// MINDFUL CRAFT INSIGHT</div>
                  <p>&ldquo;A ceramic piece is shaped by human hands and transformed by kiln fire. The visual identity must hold that same quiet warmth—celebrating raw clay imperfections, natural glaze textures, and the serene beauty of unhurried everyday rituals.&rdquo;</p>
                </div>
              </div>
            </>
          ) : isBonta ? (
            <>
              <div className="section-head">
                <div>
                  <div className="eyebrow">THE OUTDOOR ADVENTURE CPG CHALLENGE</div>
                  <h2>Reframing artisanal gelato around low-adrenaline Pacific Northwest outdoor adventures.</h2>
                </div>
                <p>Breaking frozen dessert retail conventions with bold activewear aesthetics and playful trail culture.</p>
              </div>

              <div className="problem-grid">
                <div className="problem-copy">
                  <p><strong>Traditional ice cream branding is dominated by two extremes: whimsical childish cartoon packaging or nostalgic Italian heritage tropes.</strong></p>
                  <p>Bont&agrave; Gelato, crafted in Bend, Oregon, sits at the intersection of artisanal culinary obsession and the Pacific Northwest&apos;s outdoorsy spirit. We engineered a fresh category code: &ldquo;Gelato from the great outdoors&rdquo;—merging Cascade topographical contours with fluid gelato textures, vibrant activewear colorways, and cheeky trail character illustrations across retail pints.</p>
                </div>

                <div className="insight-card">
                  <div className="lbl">// CATEGORY INNOVATION INSIGHT</div>
                  <p>&ldquo;Gelato doesn&apos;t belong only in refined parlor dishes. When paired with Cascade mountain topographical contours, bold activewear palettes, and campfire camaraderie, it becomes the ultimate reward after an unhurried day on the trail.&rdquo;</p>
                </div>
              </div>
            </>`;

if (!content.includes(problemTarget)) {
  console.error('Failed to locate problem target!');
  process.exit(1);
}
content = content.replace(problemTarget, problemInsert);
console.log('Problem section updated successfully.');

// 3. DELIVERABLES SECTION INSERTION
const delivTarget = `                <div className="deliv-col">
                  <h4>Strategic Market Audit</h4>
                  <div className="sub">// RESEARCH &amp; POSITIONING</div>
                  <ul>
                    <li>Competitive benchmark across India &amp; global CPG</li>
                    <li>Position mapping: Nostalgia vs Luxury</li>
                    <li>Audience psychographics across wellness &amp; gifting</li>
                    <li>Sustainable, charcoal-free ingredient trust</li>
                  </ul>
                </div>
              </div>
            </>`;

const delivInsert = delivTarget + `
          ) : isHighLife ? (
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
                  <div className="sub">// IDENTITY &amp; TOKENS</div>
                  <ul>
                    <li>Dynamic Light-Trail Identity</li>
                    <li>Geometric Logotype Construction</li>
                    <li>Master Token &amp; Grid Hierarchy</li>
                    <li>Obsidian &amp; Amber Palette</li>
                  </ul>
                </div>
                <div className="deliv-col">
                  <h4>02 / Print &amp; Folios</h4>
                  <div className="sub">// ARCHITECTURAL COLLATERAL</div>
                  <ul>
                    <li>Gold-Foil Sales Folio Suite</li>
                    <li>Hardcover Penthouse Monograph</li>
                    <li>Translucent Vellum VIP Invites</li>
                    <li>Architectural Floorplate Volumes</li>
                  </ul>
                </div>
                <div className="deliv-col">
                  <h4>03 / Space &amp; Signage</h4>
                  <div className="sub">// ENVIRONMENTAL WAYFINDING</div>
                  <ul>
                    <li>Exterior Luminous Tower Signage</li>
                    <li>Sales Gallery Brass Relief</li>
                    <li>Custom Brass Residence Numbers</li>
                    <li>Construction Perimeter Hoardings</li>
                  </ul>
                </div>
                <div className="deliv-col">
                  <h4>04 / Digital &amp; Touch</h4>
                  <div className="sub">// UI/UX &amp; RESIDENT EXPERIENCE</div>
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
                  <div className="sub">// BRAND ARCHITECTURE</div>
                  <ul>
                    <li>Spatial Brand Architecture</li>
                    <li>Environmental Graphic Standards</li>
                    <li>Architectural Grid &amp; Proportions</li>
                    <li>Monogram Construction Specs</li>
                  </ul>
                </div>
                <div className="deliv-col">
                  <h4>02 / Executive Print</h4>
                  <div className="sub">// CORPORATE COLLATERAL</div>
                  <ul>
                    <li>Corporate Stationery Suite</li>
                    <li>Architectural Specification Folios</li>
                    <li>Embossed Presentation Folders</li>
                    <li>Material Sample Board Vitrines</li>
                  </ul>
                </div>
                <div className="deliv-col">
                  <h4>03 / Environment</h4>
                  <div className="sub">// SALES GALLERY &amp; SIGNAGE</div>
                  <ul>
                    <li>Sales Gallery Reception Totems</li>
                    <li>3D Cast-Bronze Exterior Signage</li>
                    <li>Architectural Floor-Plate Displays</li>
                    <li>Interactive Showroom Wayfinding</li>
                  </ul>
                </div>
                <div className="deliv-col">
                  <h4>04 / Architectural Folio</h4>
                  <div className="sub">// CASE STUDY &amp; DIGITAL</div>
                  <ul>
                    <li>10-Part Architectural Case Study Suite</li>
                    <li>Digital Showroom Screen Layouts</li>
                    <li>Commercial Project Lookbooks</li>
                    <li>Executive Portfolio Archival Box</li>
                  </ul>
                </div>
              </div>
            </>
          ) : isGusto ? (
            <>
              <div className="section-head">
                <div>
                  <div className="eyebrow">PROJECT DELIVERABLES</div>
                  <h2>Mindful ceramic brand identity &amp; tactile packaging.</h2>
                </div>
                <p>Warm terracotta and raw earth color palettes, bespoke geometric wordmark, handcrafted homeware art direction, and tactile packaging hangtags.</p>
              </div>

              <div className="deliv-grid">
                <div className="deliv-col">
                  <h4>Brand Architecture</h4>
                  <div className="sub">// IDENTITY &amp; TYPOGRAPHY</div>
                  <ul>
                    <li>Primary logotype &amp; monogram emblem</li>
                    <li>Editorial serif &amp; minimal sans type pairing</li>
                    <li>Terracotta, raw earth &amp; sage color system</li>
                    <li>Brand manifesto &amp; mindful living narrative</li>
                  </ul>
                </div>

                <div className="deliv-col">
                  <h4>Packaging &amp; Print</h4>
                  <div className="sub">// DIELINES &amp; MATERIALS</div>
                  <ul>
                    <li>FSC-certified uncoated ceramic packaging boxes</li>
                    <li>Letterpress printed business cards &amp; notes</li>
                    <li>Tactile debossed hangtags &amp; linen care labels</li>
                    <li>Minimalist tissue paper pattern wrap</li>
                  </ul>
                </div>

                <div className="deliv-col">
                  <h4>Art Direction &amp; Motion</h4>
                  <div className="sub">// LOOKBOOK &amp; VIDEO</div>
                  <ul>
                    <li>Studio product photography &amp; still life</li>
                    <li>Tactile ceramic texture &amp; glaze close-ups</li>
                    <li>Kinetic brand identity motion reveals</li>
                    <li>Editorial homeware catalog &amp; lookbook</li>
                  </ul>
                </div>

                <div className="deliv-col">
                  <h4>Verified Impact</h4>
                  <div className="sub">// PERFORMANCE METRICS</div>
                  <ul>
                    <li>22 Master Brand &amp; Packaging Assets</li>
                    <li>Complete Homeware &amp; Pottery SKU Rollout</li>
                    <li>High Social Media Engagement &amp; Press Recall</li>
                    <li>Sustainable Turnkey Packaging Specifications</li>
                  </ul>
                </div>
              </div>
            </>
          ) : isBonta ? (
            <>
              <div className="section-head">
                <div>
                  <div className="eyebrow">PROJECT DELIVERABLES</div>
                  <h2>Gelato from the great outdoors &amp; adventure packaging.</h2>
                </div>
                <p>Cascade mountain topographical contour dielines, bold activewear colorways, playful outdoor character illustrations, and retail pint packaging architecture.</p>
              </div>

              <div className="deliv-grid">
                <div className="deliv-col">
                  <h4>Brand Strategy</h4>
                  <div className="sub">// POSITIONING &amp; VOICE</div>
                  <ul>
                    <li>&ldquo;Low-adrenaline adventure&rdquo; brand positioning</li>
                    <li>Pacific Northwest regional heritage storytelling</li>
                    <li>Playful outdoor tone of voice &amp; copy matrix</li>
                    <li>National retail shelf presence strategy</li>
                  </ul>
                </div>

                <div className="deliv-col">
                  <h4>Packaging Architecture</h4>
                  <div className="sub">// RETAIL PINTS &amp; TUBS</div>
                  <ul>
                    <li>Topographical contour retail pint dielines</li>
                    <li>Scoop shop single &amp; double cup sleeves</li>
                    <li>Vibrant color-coded flavor lids &amp; seals</li>
                    <li>Whimsical character spot illustrations</li>
                  </ul>
                </div>

                <div className="deliv-col">
                  <h4>Environmental &amp; Retail</h4>
                  <div className="sub">// SCOOP SHOPS &amp; MERCH</div>
                  <ul>
                    <li>Bend, Oregon scoop shop menu architecture</li>
                    <li>Outdoor-ready apparel &amp; enameled trail mugs</li>
                    <li>Die-cut mountain trail stickers &amp; pint totes</li>
                    <li>Wooden A-frame sidewalk signage system</li>
                  </ul>
                </div>

                <div className="deliv-col">
                  <h4>Motion &amp; Digital</h4>
                  <div className="sub">// 3D LOOPS &amp; COMMERCE</div>
                  <ul>
                    <li>24 Master Brand &amp; Packaging Assets</li>
                    <li>360-degree rotating pint 3D motion loops</li>
                    <li>High-conversion mobile DTC subscription UI</li>
                    <li>National retail expansion packaging sign-off</li>
                  </ul>
                </div>
              </div>
            </>
          ) : isForte ? (
            <>
              <div className="section-head">
                <div>
                  <div className="eyebrow">PROJECT DELIVERABLES</div>
                  <h2>Timeless luxury architecture &amp; real estate brand identity.</h2>
                </div>
                <p>Architectural arch monograms, high-contrast typography, hot-foil property folios, and environmental brass signage specs.</p>
              </div>

              <div className="deliv-grid">
                <div className="deliv-col">
                  <h4>01 / Brand Architecture</h4>
                  <div className="sub">// IDENTITY &amp; TYPOGRAPHY</div>
                  <ul>
                    <li>Architectural Arch Monogram</li>
                    <li>High-Contrast Serif Typography</li>
                    <li>Master Forest Green &amp; Limestone Tokens</li>
                    <li>Comprehensive Brand Identity Manual</li>
                  </ul>
                </div>

                <div className="deliv-col">
                  <h4>02 / Print &amp; Collateral</h4>
                  <div className="sub">// FOLIOS &amp; SPECIFICATIONS</div>
                  <ul>
                    <li>Hot-Foil Embossed Stationery Suite</li>
                    <li>Heavyweight Property Dossiers</li>
                    <li>Translucent Vellum Plan Overlays</li>
                    <li>Editorial Real Estate Catalog</li>
                  </ul>
                </div>

                <div className="deliv-col">
                  <h4>03 / Environmental Signage</h4>
                  <div className="sub">// WAYFINDING &amp; DEVELOPMENT</div>
                  <ul>
                    <li>Architectural Bronze Fascia Signs</li>
                    <li>50-Foot Development Hoardings</li>
                    <li>Interior Wayfinding &amp; Room Numbering</li>
                    <li>Sales Suite Cast-Brass Plaque</li>
                  </ul>
                </div>

                <div className="deliv-col">
                  <h4>04 / Verified Impact</h4>
                  <div className="sub">// PERFORMANCE METRICS</div>
                  <ul>
                    <li>15 Master High-Resolution Assets</li>
                    <li>100% Client Approval on First Review</li>
                    <li>+340% HNW Buyer Inquiries</li>
                    <li>Production-Ready CAD &amp; Vector Handoff</li>
                  </ul>
                </div>
              </div>
            </>
          ) : isDabbo ? (
            <>
              <div className="section-head">
                <div>
                  <div className="eyebrow">PROJECT DELIVERABLES</div>
                  <h2>Artisanal Madrid street food &amp; specialty coffee packaging system.</h2>
                </div>
                <p>Custom folding hot dog clamshells, takeaway carrier boxes, specialty coffee cups, and greaseproof pattern wrapping paper.</p>
              </div>

              <div className="deliv-grid">
                <div className="deliv-col">
                  <h4>01 / Brand Identity</h4>
                  <div className="sub">// MARKS &amp; VOICE</div>
                  <ul>
                    <li>Madrid Crimson &amp; Ochre Palette</li>
                    <li>Retro-Modern Wordmark &amp; Badge</li>
                    <li>Custom Street Mascot Iconography</li>
                    <li>Energetic Spanish Tone of Voice</li>
                  </ul>
                </div>

                <div className="deliv-col">
                  <h4>02 / Structural Packaging</h4>
                  <div className="sub">// DIELINES &amp; BOXES</div>
                  <ul>
                    <li>Custom Folding Hot Dog Clamshells</li>
                    <li>Takeaway Carrier Boxes (&lsquo;dabbo&rsquo;)</li>
                    <li>Single &amp; Double Cup Carry Sleeves</li>
                    <li>Greaseproof Continuous Wrapping Paper</li>
                  </ul>
                </div>

                <div className="deliv-col">
                  <h4>03 / Retail &amp; Collateral</h4>
                  <div className="sub">// SPECIALTY COFFEE &amp; MERCH</div>
                  <ul>
                    <li>Specialty Coffee Cup System</li>
                    <li>Kraft Paper Takeaway Bags</li>
                    <li>Die-Cut Vinyl Sticker Suite</li>
                    <li>Menu Boards &amp; Mobile Ordering</li>
                  </ul>
                </div>

                <div className="deliv-col">
                  <h4>04 / Verified Impact</h4>
                  <div className="sub">// PERFORMANCE METRICS</div>
                  <ul>
                    <li>10 Master High-Res Assets</li>
                    <li>Zero-Leakage Greaseproof Testing</li>
                    <li>+280% Footfall in Madrid Barrio</li>
                    <li>Production-Ready Dieline Files</li>
                  </ul>
                </div>
              </div>
            </>`;

if (!content.includes(delivTarget)) {
  console.error('Failed to locate deliv target!');
  process.exit(1);
}
content = content.replace(delivTarget, delivInsert);
console.log('Deliverables section updated successfully.');

fs.writeFileSync(path, content, 'utf8');
console.log('WorkDetail.jsx written and updated cleanly.');
