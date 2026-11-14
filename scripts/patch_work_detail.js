const fs = require('fs');
const path = 'react-app/src/pages/WorkDetail.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add boolean flags
if (!content.includes('const isGusto =')) {
  content = content.replace(
    "const isElsewhere = cleanId.includes('elsewhere');",
    "const isElsewhere = cleanId.includes('elsewhere');\n  const isGusto = cleanId.includes('gusto');\n  const isBonta = cleanId.includes('bonta');"
  );
}

// 2. Add to project finder fallback
if (!content.includes('(isGusto && s.includes(\'gusto\'))')) {
  content = content.replace(
    "(isElsewhere && s.includes('elsewhere')) ||",
    "(isElsewhere && s.includes('elsewhere')) ||\n      (isGusto && s.includes('gusto')) ||\n      (isBonta && s.includes('bonta')) ||"
  );
}

// 3. Add to breadcrumbs
if (!content.includes("'Gusto Handcrafted Pottery Case Study'")) {
  content = content.replace(
    ": isElsewhere\n              ? 'ELSEWHERE Coffee Shop Branding Case Study'",
    ": isGusto\n              ? 'Gusto Handcrafted Pottery Case Study'\n              : isBonta\n              ? 'Bontà Gelato Outdoor Adventure Case Study'\n              : isElsewhere\n              ? 'ELSEWHERE Coffee Shop Branding Case Study'"
  );
}

// 4. Add to sheet-label
if (!content.includes('CASE STUDY // SPEC 26 — HANDCRAFTED POTTERY')) {
  content = content.replace(
    ": isElsewhere\n                ? 'CASE STUDY // SPEC 21 — DREAMY COFFEE SHOP BRANDING & PACKAGING'",
    ": isGusto\n                ? 'CASE STUDY // SPEC 26 — HANDCRAFTED POTTERY & MINDFUL LIVING BRAND IDENTITY'\n                : isBonta\n                ? 'CASE STUDY // SPEC 27 — ARTISANAL GELATO & OUTDOOR ADVENTURE PACKAGING'\n                : isElsewhere\n                ? 'CASE STUDY // SPEC 21 — DREAMY COFFEE SHOP BRANDING & PACKAGING'"
  );
}

// 5. Add to Hero
const gustoHero = `) : isGusto ? (
            <>
              <h1>Gusto — <em>Handcrafted Pottery</em> &amp; Mindful Living Brand Identity.</h1>
              <p className="lead">
                A thoughtful, elegant homeware and ceramic studio celebrating the art of intentional, mindful living. Merging functional tableware with serene earthy textures, tactile stationery packaging, and calm editorial storytelling.
              </p>
            </>
          ) : isBonta ? (
            <>
              <h1>Bontà — <em>Artisanal Gelato</em> &amp; Outdoor Adventure Packaging Architecture.</h1>
              <p className="lead">
                Born in Bend, Oregon. Rebranding small-batch Pacific Northwest gelato around &ldquo;Gelato from the great outdoors&rdquo; — blending topographical mountain contours with fluid gelato textures, vibrant activewear colors, and custom outdoor character storytelling.
              </p>
            </>
          ) : isElsewhere ? (`;

if (!content.includes('<h1>Gusto — <em>Handcrafted Pottery</em>')) {
  content = content.replace(') : isElsewhere ? (', gustoHero);
}

// 6. Add to Deliverables
const gustoDeliverables = `) : isGusto ? (
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
                  <div className="sub">// PINTS &amp; DIELINES</div>
                  <ul>
                    <li>Cascade mountain topographical pattern wrap</li>
                    <li>Multi-flavor retail pint tub &amp; lid hierarchy</li>
                    <li>Single-serve scoop cups &amp; takeaway containers</li>
                    <li>Foil-stamped tamper-evident safety seals</li>
                  </ul>
                </div>

                <div className="deliv-col">
                  <h4>Illustration &amp; Merch</h4>
                  <div className="sub">// CHARACTERS &amp; APPAREL</div>
                  <ul>
                    <li>Custom outdoor character mascot badges</li>
                    <li>Embroidered adventure trucker hats &amp; tees</li>
                    <li>Branded refrigerated delivery van fleet graphics</li>
                    <li>Enamel pins, walking boot tags &amp; stickers</li>
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
          ) : isElsewhere ? (`;

if (!content.includes('<h2>Mindful ceramic brand identity &amp; tactile packaging.</h2>')) {
  // Replace around Elsewhere in deliverables
  content = content.replace(') : isElsewhere ? (', gustoDeliverables);
}

// 7. Add Captions Arrays
const gustoAndBontaCaptionsDef = `                const gustoCaptions = [
                  "Gusto — Handcrafted Pottery & Mindful Living Brand Emblem Cover",
                  "Mindful Living Editorial Cover & Handcrafted Ceramic Coffee Mug",
                  "Tactile Ceramic Surface & Minimalist Glaze Finish",
                  "Handcrafted Tableware Collection & Soft Morning Natural Lighting",
                  "Handcrafted Stoneware Jug & Organic Ceramic Contours",
                  "Kinetic Brand Identity Motion Reveal & Serene Pottery Craftsmanship",
                  "Minimalist Studio Art Direction: Tactile Vessels & Linen Textiles",
                  "Artisanal Dinner Plate & Glazed Ceramic Texture Detail",
                  "Earthenware Pitcher & Hand-Poured Ceramic Glaze",
                  "Fluted Stoneware Vase & Mindful Interior Architecture",
                  "Handcrafted Espresso Cups & Ceramic Saucer System",
                  "Organic Homeware Still Life: Texture, Warmth & Connection",
                  "Brand Guidelines Book: Typographic Hierarchy & Letterform Geometry",
                  "Mathematical Logomark Proportion Grid & Clear Space Isolation",
                  "Brand Positioning Manifesto: 'The Art of Mindful Living'",
                  "Primary & Supporting Color Palette: Terracotta, Raw Earth, Sage & Ceramic White",
                  "Uncoated FSC Paper Stationery & Letterpress Business Card Suite",
                  "Tactile Packaging Box Architecture & Minimalist Product Hangtags",
                  "Minimalist Retail Signage System & Wayfinding Specs",
                  "Editorial Catalog Layout & Handcrafted Pottery Lookbook",
                  "Ambient Pottery Studio Motion Graphic & Brand Identity Reveal",
                  "Handcrafted Ceramics in Motion: Warmth, Stillness & Form"
                ];

                const bontaCaptions = [
                  "Bontà Gelato Master Hero Tub Architecture: Lavender, Vanilla & Dark Chocolate",
                  "Brand Rebrand Case Study Film: 'Gelato from the Great Outdoors'",
                  "Single-Scoop Cup Architecture & Cascade Mountains Pattern Detail",
                  "Bouncing Character Mascot Logo Animation Loop",
                  "Marionberry Lavender Gelato Pint Tub & Topographical Dieline",
                  "Salted Vanilla Bean & Mayan Chocolate Duo Pint Tubs",
                  "Topographical Mountain Contour Map Animation & Gelato Fluid Dynamics",
                  "Dulce de Leche & Orange Cream Swirl Tub Packaging",
                  "Stracciatella & Peanut Butter Chocolate Pint Packaging",
                  "Complete Retail Freezer Lineup: Multi-Flavor Pint Family Architecture",
                  "360-Degree Rotating Pint Tub Master Loop & Typography Showcase",
                  "Macro Packaging Detail: Foil Embossed Lid & FSC Certified Paper Board",
                  "Macro Nutrition & Topographic Map Line Work Detail",
                  "Macro Flavor Seal & Handcrafted Pacific Northwest Ingredient Story",
                  "Outdoor Lifestyle Product Photography: Pint Tubs in Cascade Forest Setting",
                  "Hand-Drawn Outdoor Character Illustrations & Mascot Storytelling",
                  "Brand Mascot Badges & Outdoor Adventure Embroidered Patches",
                  "Custom Outdoor Adventure Trucker Hat Mockup & Merchandising",
                  "Complete Mobile E-Commerce DTC Experience & Subscription Flow",
                  "Kinetic Graphic Logo Reveal & Mountain Contour Shift Loop",
                  "'Call of the Wild' Outdoor Cinema Commercial Reel & Bend Oregon Heritage",
                  "Rotating Gelato Pint SKU Loop: All Flavors in Motion",
                  "Character Mascot Motion Reel: Hiker, Camper & Gelato Spoon",
                  "High-Energy Brand Anthem Film: Low-Adrenaline Adventure in Every Scoop"
                ];

                const isWebProject =`;

if (!content.includes('const gustoCaptions =')) {
  content = content.replace('const isWebProject =', gustoAndBontaCaptionsDef);
}

// 8. Add to Caption Picker
if (!content.includes('isGusto && imgIdx < gustoCaptions.length')) {
  content = content.replace(
    `: isElsewhere && imgIdx < elsewhereCaptions.length
                  ? elsewhereCaptions[imgIdx]`,
    `: isGusto && imgIdx < gustoCaptions.length
                  ? gustoCaptions[imgIdx]
                  : isBonta && imgIdx < bontaCaptions.length
                  ? bontaCaptions[imgIdx]
                  : isElsewhere && imgIdx < elsewhereCaptions.length
                  ? elsewhereCaptions[imgIdx]`
  );
}

// 9. Add to Brand System Specifications (Swatches & Typography)
const gustoBontaSpecs = `{isGusto ? (
              <div className="spec-grid">
                <div className="swatches">
                  <div className="swatch" style={{ background: '#C27D60', color: '#FFF' }}>
                    <div className="lbl">TERRACOTTA CLAY // #C27D60</div>
                  </div>
                  <div className="swatch" style={{ background: '#F4F0EB', color: '#1B1B17' }}>
                    <div className="lbl">GLAZED WHITE // #F4F0EB</div>
                  </div>
                  <div className="swatch" style={{ background: '#4E3B31', color: '#FFF' }}>
                    <div className="lbl">RAW EARTH // #4E3B31</div>
                  </div>
                  <div className="swatch" style={{ background: '#7E8D7B', color: '#FFF' }}>
                    <div className="lbl">SAGE MOSS // #7E8D7B</div>
                  </div>
                  <div className="swatch" style={{ background: '#1E1D1B', color: '#FFF' }}>
                    <div className="lbl">NOIR // #1E1D1B</div>
                  </div>
                </div>

                <div className="type-spec">
                  <div className="row">
                    <span className="mono" style={{ fontSize: '12px', color: 'var(--marker)' }}>PRIMARY DISPLAY:</span>
                    <h4 style={{ fontSize: '20px', marginTop: '4px' }}>Fraunces Light Optical &bull; Ceramic Balance</h4>
                  </div>
                  <div className="row">
                    <span className="mono" style={{ fontSize: '12px', color: 'var(--marker)' }}>EDITORIAL SANS:</span>
                    <p style={{ fontSize: '14.5px', fontFamily: "'Inter', sans-serif", marginTop: '4px' }}>Inter Light &amp; Regular &bull; Mindful Living Guides &amp; Studio Collateral</p>
                  </div>
                  <div className="row">
                    <span className="mono" style={{ fontSize: '12px', color: 'var(--marker)' }}>TECHNICAL MONO:</span>
                    <p className="mono" style={{ fontSize: '13px', marginTop: '4px' }}>IBM Plex Mono for pottery batch codes, firing temperatures &amp; clay origins.</p>
                  </div>
                </div>
              </div>
            ) : isBonta ? (
              <div className="spec-grid">
                <div className="swatches">
                  <div className="swatch" style={{ background: '#4A89A4', color: '#FFF' }}>
                    <div className="lbl">GLACIER BLUE // #4A89A4</div>
                  </div>
                  <div className="swatch" style={{ background: '#FFF8E7', color: '#1B1B17' }}>
                    <div className="lbl">CREAMY VANILLA // #FFF8E7</div>
                  </div>
                  <div className="swatch" style={{ background: '#264E36', color: '#FFF' }}>
                    <div className="lbl">CASCADE PINE // #264E36</div>
                  </div>
                  <div className="swatch" style={{ background: '#E86D3B', color: '#FFF' }}>
                    <div className="lbl">SUNLIT ORANGE // #E86D3B</div>
                  </div>
                  <div className="swatch" style={{ background: '#2D1E18', color: '#FFF' }}>
                    <div className="lbl">DARK COCOA // #2D1E18</div>
                  </div>
                </div>

                <div className="type-spec">
                  <div className="row">
                    <span className="mono" style={{ fontSize: '12px', color: 'var(--marker)' }}>OUTDOOR DISPLAY:</span>
                    <h4 style={{ fontSize: '20px', marginTop: '4px' }}>Bold Outdoor Geometric Sans &bull; Topographical Contrast</h4>
                  </div>
                  <div className="row">
                    <span className="mono" style={{ fontSize: '12px', color: 'var(--marker)' }}>RETAIL LABEL SANS:</span>
                    <p style={{ fontSize: '14.5px', fontFamily: "'Inter', sans-serif", marginTop: '4px' }}>Inter SemiBold &bull; Pint Flavor Hierarchy &amp; Oregon Organic Certification</p>
                  </div>
                  <div className="row">
                    <span className="mono" style={{ fontSize: '12px', color: 'var(--marker)' }}>TECHNICAL MONO:</span>
                    <p className="mono" style={{ fontSize: '13px', marginTop: '4px' }}>IBM Plex Mono for mountain coordinates, batch numbers &amp; dieline codes.</p>
                  </div>
                </div>
              </div>
            ) : isGhalia ? (`;

if (!content.includes('GLACIER BLUE // #4A89A4')) {
  content = content.replace('{isGhalia ? (', gustoBontaSpecs);
}

fs.writeFileSync(path, content, 'utf8');
console.log('WorkDetail.jsx updated successfully!');
