import React, { useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegistrationMarks from '../components/RegistrationMarks';
import StickyMobileCTA from '../components/StickyMobileCTA';
import projectsData from '../data/projectsData.json';
import { usePageAnimations } from '../hooks/usePageAnimations';

export default function WorkDetail() {
  const { projectId } = useParams();
  const pageRef = useRef(null);

  usePageAnimations(pageRef);

  // Normalize URL decoding and slug matching
  const cleanId = decodeURIComponent(projectId || '').toLowerCase();
  
  const isAfter8 = cleanId.includes('after8') || cleanId.includes('intimacy');
  const isLumen = cleanId.includes('lumen');
  const isBondwith = cleanId.includes('bondwith');

  // Find matching project in dataset
  const project = projectsData.find(p => {
    const slug = (p.slug || '').toLowerCase();
    return slug === cleanId || cleanId.includes(slug) || slug.includes(cleanId);
  }) || (isBondwith ? projectsData[0] : isAfter8 ? projectsData[1] : isLumen ? projectsData[2] : projectsData[0]);

  const currentIndex = projectsData.indexOf(project);
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];

  return (
    <>
      <div ref={pageRef} className="work-detail-page">
        <style>{`
          /* ─────────────────────────────────────────────────────────────
             Frameless Free-Standing Full-Resolution Images in Project Pages
             - Displays full natural height & width without small box clamping
             - Work Page Grid Cards retain their original framed borders
          ───────────────────────────────────────────────────────────── */
          .work-detail-page .hero-visual {
            border: none !important;
            background: transparent !important;
            box-shadow: none !important;
            padding: 0 !important;
            aspect-ratio: auto !important;
            height: auto !important;
          }

          .work-detail-page .hero-visual::after {
            display: none !important;
          }

          .work-detail-page .hero-visual img {
            border: none !important;
            box-shadow: none !important;
            width: 100% !important;
            height: auto !important;
            max-height: none !important;
            object-fit: contain !important;
            display: block !important;
          }

          .work-detail-page .gallery {
            display: flex !important;
            flex-direction: column !important;
            gap: 48px !important;
          }

          .work-detail-page .gallery .shot {
            border: none !important;
            background: transparent !important;
            box-shadow: none !important;
            padding: 0 !important;
            width: 100% !important;
          }

          .work-detail-page .gallery .shot .img {
            border: none !important;
            background: transparent !important;
            box-shadow: none !important;
            aspect-ratio: auto !important;
            height: auto !important;
            min-height: 0 !important;
            display: block !important;
            width: 100% !important;
          }

          .work-detail-page .gallery .shot .img::after {
            display: none !important;
          }

          .work-detail-page .gallery .shot .img img {
            border: none !important;
            box-shadow: none !important;
            width: 100% !important;
            height: auto !important;
            max-height: none !important;
            object-fit: contain !important;
            display: block !important;
          }

          .work-detail-page .gallery .cap {
            border-top: none !important;
            padding: 14px 2px 0 2px !important;
            font-size: 12.5px;
            color: var(--ink-soft);
            font-family: 'IBM Plex Mono', monospace;
          }
        `}</style>
        <RegistrationMarks />
        <Navbar />

      {/* Breadcrumbs */}
      <div className="wrap">
        <div className="crumb">
          <Link to="/work">Work</Link>
          <span className="sep">/</span>
          <span className="cur">
            {isBondwith
              ? 'Bondwith Brand Guidelines'
              : isAfter8
              ? 'AFTER8® Case Study'
              : isLumen
              ? 'Lumen & Co. Case Study'
              : `${project.title} Case Study`}
          </span>
        </div>
      </div>

      {/* Case Hero Section */}
      <section className="case-hero">
        <div className="wrap">
          <div className="sheet-label">
            <span className="tag">
              {isBondwith
                ? 'CASE STUDY // SPEC 01 — BRAND GUIDELINES'
                : isAfter8
                ? 'CASE STUDY // SPEC 08'
                : isLumen
                ? 'CASE STUDY // SPEC 09'
                : `CASE STUDY // SPEC ${String(currentIndex + 1).padStart(2, '0')}`}
            </span>
            <div className="rule"></div>
          </div>

          {isBondwith ? (
            <>
              <h1>Bondwith — <em>Comprehensive brand identity</em> &amp; visual guidelines.</h1>
              <p className="dek">
                A master brand architecture featuring geometric logomark construction, responsive app iconography, cross-platform color usability matrices, and lifestyle fashion brand collateral.
              </p>
              <div className="meta-strip">
                <div className="meta-cell">
                  <div className="k">Client</div>
                  <div className="v">Bondwith</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Scope</div>
                  <div className="v">Identity &amp; Guidelines</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Timeline</div>
                  <div className="v">4 Weeks Sprint</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Impact</div>
                  <div className="v" style={{ color: 'var(--pine)' }}>32 Master System Assets</div>
                </div>
              </div>
            </>
          ) : isAfter8 ? (
            <>
              <h1>AFTER8® — Reimagining <em>intimacy & wellness</em> for a new generation.</h1>
              <p className="dek">
                How we engineered an editorial brand identity, tactile packaging dielines, and a custom e-commerce engine that scaled DTC revenue by 340% in 90 days.
              </p>
              <div className="meta-strip">
                <div className="meta-cell">
                  <div className="k">Client</div>
                  <div className="v">AFTER8® Labs</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Scope</div>
                  <div className="v">Brand, Pack & Web</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Timeline</div>
                  <div className="v">5 Weeks Sprint</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Impact</div>
                  <div className="v" style={{ color: 'var(--pine)' }}>+340% DTC Sales</div>
                </div>
              </div>
            </>
          ) : isLumen ? (
            <>
              <h1>Lumen & Co. — <em>Sustainable luxury</em> skincare packaging & web build.</h1>
              <p className="dek">
                How we engineered zero-plastic biodegradable packaging dielines and a custom Shopify store that secured placement in 45+ premier retail boutiques nationwide.
              </p>
              <div className="meta-strip">
                <div className="meta-cell">
                  <div className="k">Client</div>
                  <div className="v">Lumen & Co. Organics</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Scope</div>
                  <div className="v">Packaging & E-Commerce</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Timeline</div>
                  <div className="v">4 Weeks Sprint</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Impact</div>
                  <div className="v" style={{ color: 'var(--pine)' }}>+180% Retail Placement</div>
                </div>
              </div>
            </>
          ) : (
            <>
              <h1>{project.title}</h1>
              <p className="dek">
                {project.description || 'A strategy-first visual identity, tactile packaging system, and digital build engineered to scale market presence.'}
              </p>
              <div className="meta-strip">
                <div className="meta-cell">
                  <div className="k">Client</div>
                  <div className="v">{project.title.split(' ')[0]}</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Scope</div>
                  <div className="v">{project.tag}</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Timeline</div>
                  <div className="v">4–6 Weeks Sprint</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Impact</div>
                  <div className="v" style={{ color: 'var(--pine)' }}>
                    {project.imageCount > 0 ? `${project.imageCount} Verified Assets` : 'High Authority'}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Hero Cover Visual Container */}
          {project.coverImage && (
            <div className="hero-visual" style={{ marginTop: '40px' }}>
              <img
                src={project.coverImage}
                alt={project.title}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          )}
        </div>
      </section>

      {/* Dark Contrast Problem / Insight Block */}
      <section className="problem">
        <div className="wrap">
          {isBondwith ? (
            <>
              <div className="section-head">
                <div>
                  <div className="eyebrow">THE BRAND CHALLENGE</div>
                  <h2>Building a scalable, mathematically constructed identity system.</h2>
                </div>
                <p>Engineering a master visual guideline that unifies app, web, lifestyle apparel, and packaging.</p>
              </div>

              <div className="problem-grid">
                <div className="problem-copy">
                  <p><strong>Bondwith needed a comprehensive identity and visual guideline architecture:</strong> To establish instant recognition in digital interfaces while seamlessly expanding into physical merchandise, corporate collateral, and packaging.</p>
                  <p>We designed a precision geometric logomark, clear-space isolation boundaries, high-contrast primary and secondary color palettes, and typographic usability standards built for long-term scalability.</p>
                </div>

                <div className="insight-card">
                  <div className="lbl">// ARCHITECTURAL INSIGHT</div>
                  <p>"A great brand guideline is not merely a set of rules — it is an operating system that empowers teams to deploy consistent, high-converting design across every single touchpoint."</p>
                </div>
              </div>
            </>
          ) : isAfter8 ? (
            <>
              <div className="section-head">
                <div>
                  <div className="eyebrow">THE BRAND CHALLENGE</div>
                  <h2>Breaking away from clinical wellness clichés.</h2>
                </div>
                <p>Moving from transactional product design to an aspirational lifestyle brand.</p>
              </div>

              <div className="problem-grid">
                <div className="problem-copy">
                  <p><strong>The personal wellness sector was overcrowded with two extremes:</strong> overly medical, clinical packaging on one end, or cheap mass-market novelty branding on the other.</p>
                  <p>AFTER8® needed a sophisticated visual identity that could sit seamlessly on a nightstand alongside luxury fashion and beauty products while establishing deep consumer trust.</p>
                </div>

                <div className="insight-card">
                  <div className="lbl">// STRATEGIC INSIGHT</div>
                  <p>"Elevate the tactile experience of unboxing to mirror high-fashion perfume houses, treating intimate wellness with discretion, elegance, and architectural restraint."</p>
                </div>
              </div>
            </>
          ) : isLumen ? (
            <>
              <div className="section-head">
                <div>
                  <div className="eyebrow">THE PACKAGING CHALLENGE</div>
                  <h2>Pioneering eco-sustainability without sacrificing luxury.</h2>
                </div>
                <p>Proving that zero-plastic packaging can look and feel extraordinarily premium.</p>
              </div>

              <div className="problem-grid">
                <div className="problem-copy">
                  <p><strong>Lumen & Co. needed to launch a high-end botanical skincare line</strong> using 100% recyclable, plastic-free materials while competing against legacy luxury beauty houses.</p>
                  <p>We engineered custom molded pulp trays, heavyweight cotton paper unboxing sleeves, and soy-ink embossed labels that elevated tactile unboxing to an art form.</p>
                </div>

                <div className="insight-card">
                  <div className="lbl">// MATERIAL INSIGHT</div>
                  <p>"Sustainability should never look compromise-driven. By utilizing raw tactile textures and crisp metallic foil debossing, eco-packaging becomes an undeniable selling point."</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="section-head">
                <div>
                  <div className="eyebrow">STRATEGIC ARCHITECTURE</div>
                  <h2>Elevating brand authority & market differentiation.</h2>
                </div>
                <p>Rooted in strategy and executed with meticulous architectural restraint.</p>
              </div>

              <div className="problem-grid">
                <div className="problem-copy">
                  <p><strong>Every high-growth business requires undeniable visual clarity:</strong> {project.description}</p>
                  <p>For <strong>{project.title}</strong>, we built an integrated visual system spanning typography, structural packaging specs, and responsive code to drive long-term DTC growth.</p>
                </div>

                <div className="insight-card">
                  <div className="lbl">// STUDIO PRINCIPLE</div>
                  <p>"We turn products into enduring brand icons that scale strategically, visually, and across every physical and digital touchpoint."</p>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Deliverables / Execution Architecture */}
      <section>
        <div className="wrap">
          {isBondwith ? (
            <>
              <div className="section-head">
                <div>
                  <div className="eyebrow">EXECUTION ARCHITECTURE</div>
                  <h2>Master guideline deliverables & design specifications.</h2>
                </div>
                <p>A unified 32-asset identity system spanning brand guidelines, app iconography, and lifestyle collateral.</p>
              </div>

              <div className="deliv-grid">
                <div className="deliv-col">
                  <h4>Visual Identity</h4>
                  <div className="sub">// LOGO & GEOMETRIC SYSTEM</div>
                  <ul>
                    <li>Geometric logomark grid</li>
                    <li>Responsive app icon architecture</li>
                    <li>Primary & secondary color tokens</li>
                    <li>Monochrome & inverted marks</li>
                  </ul>
                </div>

                <div className="deliv-col">
                  <h4>Typography & Rules</h4>
                  <div className="sub">// TYPEFACE & CLEAR SPACE</div>
                  <ul>
                    <li>Poppins primary typeface hierarchy</li>
                    <li>Minimum size & isolation bounds</li>
                    <li>Color usability & contrast matrix</li>
                    <li>Logo misuse & governance rules</li>
                  </ul>
                </div>

                <div className="deliv-col">
                  <h4>Digital & UI Flow</h4>
                  <div className="sub">// APP & WEB ENVIRONMENTS</div>
                  <ul>
                    <li>Mobile app UI screens & flows</li>
                    <li>Web platform dashboard layouts</li>
                    <li>Social media asset kit templates</li>
                    <li>Digital marketing collateral</li>
                  </ul>
                </div>

                <div className="deliv-col">
                  <h4>Collateral & Fashion</h4>
                  <div className="sub">// PACKAGING & APPAREL</div>
                  <ul>
                    <li>Corporate stationery & letterhead</li>
                    <li>Structural product packaging box</li>
                    <li>Apparel & fashion merchandising</li>
                    <li>Environmental directional signage</li>
                  </ul>
                </div>
              </div>
            </>
          ) : isAfter8 ? (
            <>
              <div className="section-head">
                <div>
                  <div className="eyebrow">EXECUTION ARCHITECTURE</div>
                  <h2>Key deliverables & design specs.</h2>
                </div>
                <p>A unified system spanning brand guidelines, unboxing packaging, and custom web platform.</p>
              </div>

              <div className="deliv-grid">
                <div className="deliv-col">
                  <h4>Visual Identity</h4>
                  <div className="sub">// LOGO & MARKS</div>
                  <ul>
                    <li>High-contrast serif wordmark</li>
                    <li>Embossed monogram icon</li>
                    <li>Editorial color palette</li>
                    <li>Type hierarchy specs</li>
                  </ul>
                </div>

                <div className="deliv-col">
                  <h4>Tactile Packaging</h4>
                  <div className="sub">// DIELINES & UNBOXING</div>
                  <ul>
                    <li>Rigid magnetic closure box</li>
                    <li>FSC-certified soft-touch paper</li>
                    <li>Blind debossing & foil stamp</li>
                    <li>Sustainable inner trays</li>
                  </ul>
                </div>

                <div className="deliv-col">
                  <h4>E-Commerce Web</h4>
                  <div className="sub">// CUSTOM SHOPIFY</div>
                  <ul>
                    <li>Fluid editorial UI/UX</li>
                    <li>Sub-second page load times</li>
                    <li>Interactive product 3D view</li>
                    <li>Subscription management</li>
                  </ul>
                </div>

                <div className="deliv-col">
                  <h4>Performance Results</h4>
                  <div className="sub">// VERIFIED METRICS</div>
                  <ul>
                    <li>+340% DTC Revenue Growth</li>
                    <li>4.8x Conversion Improvement</li>
                    <li>+62% Average Order Value</li>
                    <li>Featured in Vogue & GQ</li>
                  </ul>
                </div>
              </div>
            </>
          ) : isLumen ? (
            <>
              <div className="section-head">
                <div>
                  <div className="eyebrow">PROJECT DELIVERABLES</div>
                  <h2>Technical execution specifications.</h2>
                </div>
                <p>End-to-end structural packaging dielines, 3D photorealistic renders, and Shopify development.</p>
              </div>

              <div className="deliv-grid">
                <div className="deliv-col">
                  <h4>Structural Dielines</h4>
                  <div className="sub">// 100% FSC RECYCLABLE</div>
                  <ul>
                    <li>FSC-certified unbleached cotton paper</li>
                    <li>Plastic-free inner tray molds</li>
                    <li>Soy-ink typography printing</li>
                    <li>Foil stamp brand marks</li>
                  </ul>
                </div>

                <div className="deliv-col">
                  <h4>3D Product Visuals</h4>
                  <div className="sub">// PHOTOREALISTIC RENDERS</div>
                  <ul>
                    <li>3D bottle & jar modeling</li>
                    <li>Material texture simulation</li>
                    <li>Lighting studio setups</li>
                    <li>Wholesale catalog assets</li>
                  </ul>
                </div>

                <div className="deliv-col">
                  <h4>Custom Shopify Build</h4>
                  <div className="sub">// HIGH-SPEED STOREFRONT</div>
                  <ul>
                    <li>Custom Liquid & Tailwind CSS</li>
                    <li>Instant checkout flow</li>
                    <li>Interactive ingredient modal</li>
                    <li>Wholesale portal integration</li>
                  </ul>
                </div>

                <div className="deliv-col">
                  <h4>Verified Impact</h4>
                  <div className="sub">// PERFORMANCE METRICS</div>
                  <ul>
                    <li>+180% Retail Placement Growth</li>
                    <li>45+ Boutique Stockists Signed</li>
                    <li>3.9x E-Commerce Conversion Rate</li>
                    <li>45+ Premium Retailers Placed</li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="section-head">
                <div>
                  <div className="eyebrow">PROJECT DELIVERABLES</div>
                  <h2>Master deliverables & scope specifications.</h2>
                </div>
                <p>Unified design engineering spanning brand identity, structural packaging, and code.</p>
              </div>

              <div className="deliv-grid">
                <div className="deliv-col">
                  <h4>Brand System</h4>
                  <div className="sub">// IDENTITY & MARKS</div>
                  <ul>
                    <li>Primary & secondary wordmarks</li>
                    <li>Embossed icon marks</li>
                    <li>Editorial color architecture</li>
                    <li>Type hierarchy & spacing guidelines</li>
                  </ul>
                </div>

                <div className="deliv-col">
                  <h4>Tactile Packaging</h4>
                  <div className="sub">// DIELINES & PRINT</div>
                  <ul>
                    <li>Rigid box structural dielines</li>
                    <li>FSC-certified paper specs</li>
                    <li>Foil stamp & deboss layouts</li>
                    <li>Unboxing tray engineering</li>
                  </ul>
                </div>

                <div className="deliv-col">
                  <h4>Digital Engine</h4>
                  <div className="sub">// UI/UX & DEVELOPMENT</div>
                  <ul>
                    <li>Responsive editorial UI/UX</li>
                    <li>Sub-second site performance</li>
                    <li>Conversion checkout flow</li>
                    <li>Framer / Webflow component build</li>
                  </ul>
                </div>

                <div className="deliv-col">
                  <h4>Verified Impact</h4>
                  <div className="sub">// PERFORMANCE METRICS</div>
                  <ul>
                    <li>+40% Avg Engagement Growth</li>
                    <li>Higher E-Commerce Conversions</li>
                    <li>Turnkey Master Asset Handoff</li>
                    <li>Brand Market Leadership</li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Visual Gallery Grid & Brand System Specifications */}
      <section style={{ background: 'var(--card)', borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)' }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">DESIGN SYSTEM GALLERY</div>
              <h2>{isBondwith ? 'Bondwith — 31 Master System Figures & Guideline Architecture' : isAfter8 ? 'Visual system & product showcase.' : `${project.title} — Visual System & Renders`}</h2>
            </div>
            <p>Detailed breakdown of typographic pairings, color swatches, and packaging renders.</p>
          </div>

          <div className="gallery">
            {project.images && project.images.length > 0 ? (
              project.images.map((imgUrl, imgIdx) => {
                const bondwithCaptions = [
                  "Brand Guidelines Architecture & Master Specification Cover",
                  "Visual Table of Contents & Specifications Architecture",
                  "Primary Logo Design & Core Logomark",
                  "App Icon & Mobile UI Iconography (Primary Color & Dark/Light Modes)",
                  "Full Logo Proportions & Print/Web Placement Scaling Rules",
                  "Logomark Geometric Construction & Mathematical Grid Alignment",
                  "Minimum Size Standards & Responsive Safe Bounds",
                  "Clear Space & Safe Margin Exclusion Zone Protection",
                  "Primary Brandmark Color Application & Contrast Specs",
                  "Monochrome & High-Contrast Negative Space Treatments",
                  "Primary & Supporting Color Palette Architecture",
                  "Primary Color HEX, RGB, CMYK & Pantone Formulae",
                  "Color Usability, Contrast Ratios & Background Hierarchy",
                  "Typographic Hierarchy & Editorial Heading System",
                  "Primary Typeface Specification (Poppins Weights & Scaling)",
                  "Secondary Typeface & Body Copy Implementation Guidelines",
                  "Digital UI Interface & Web Environment Application",
                  "Mobile App UX Flows & User Interaction Showcase",
                  "Web Platform Dashboard & Desktop Design System",
                  "Corporate Stationery, Letterhead & Business Collateral",
                  "Environmental Signage & Architectural Directional Elements",
                  "Structural Packaging & Product Box Packaging Specifications",
                  "Product Hangtags, Dielines & Unboxing Touchpoints",
                  "Retail Display & In-Store Merchandising Architecture",
                  "Social Media Kit & Digital Campaign Templates",
                  "Editorial Marketing Collateral & Publication Systems",
                  "Advertising Art Direction & Campaign Photography Guidelines",
                  "Lifestyle Merchandising, Wearables & Brand Swag",
                  "Apparel Collection & Garment Graphic Applications",
                  "Fashion Line Editorial Art Direction & Lookbook Specs",
                  "Brand Guidelines Version Control & Revision Governance",
                  "Master Brand Sign-off, Asset Delivery & Final Production Close"
                ];

                const after8Captions = [
                  "Complete AFTER8® Packaging Architecture & Bottle Silhouettes",
                  "Rigid Box Debossing Detail & Foil Stamping",
                  "Mobile E-Commerce Interface UI & Cart Flow",
                  "Brand Identity Monogram & Embossed Mark System",
                  "Tactile Unboxing Experience & FSC Paper Sleeve",
                  "Editorial Color Architecture & Swatch Specs",
                  "Product Variant Matte Glass Silhouettes",
                  "Discretion & Minimalist Architectural Aesthetics",
                  "Mobile E-Commerce Product Page & Subscription Flow",
                  "Structural Packaging Dielines & Inner Trays",
                  "Typographic Pairing: Fraunces Serif & Inter Sans",
                  "Interactive 3D Bottle Rendering & Lighting Studio",
                  "Soft-Touch Luxury Box & Magnetic Closure",
                  "Digital Brand Style Guide & Spacing Guidelines",
                  "Sustainable FSC-Certified Molded Inner Trays",
                  "Editorial Feature & High-Fashion Lifestyle Context",
                  "Tactile Bottle Label & Blind Deboss Detail",
                  "Complete Product Suite & Unboxing Sequence",
                  "Custom Shopify Checkout Engine & Subscription Manager",
                  "Monogram Detail & Foil Debossing Close-up",
                  "High-Contrast Serif Typography & Scale",
                  "AFTER8® Brand System Master Asset Overview"
                ];

                const isWebProject = (project.category === 'web') || (project.tag && (project.tag.includes('WEB') || project.tag.includes('UI UX')));
                const isPackagingProject = (project.category === 'packaging') || (project.tag && project.tag.includes('PACKAGING'));

                const defaultCaption = (idx) => {
                  if (isWebProject) {
                    return `${project.title} — ${idx === 0 ? 'Digital Platform & User Experience Architecture' : idx === 1 ? 'Complete UI Interface & Responsive Web Layout' : 'Interactive Component & Visual Design System'}`;
                  }
                  if (isPackagingProject) {
                    return `${project.title} — ${idx === 0 ? 'Structural Packaging Architecture & Silhouette' : idx === 1 ? 'Tactile Box Dielines & Unboxing Experience' : 'Product Suite & Label Detailing'}`;
                  }
                  return `${project.title} — ${idx === 0 ? 'Brand Identity System & Logomark Construction' : idx === 1 ? 'Typographic Hierarchy & Color Usability' : 'Collateral Applications & Design Guidelines'}`;
                };

                const captionText = isBondwith && imgIdx < bondwithCaptions.length
                  ? bondwithCaptions[imgIdx]
                  : isAfter8 && imgIdx < after8Captions.length
                  ? after8Captions[imgIdx]
                  : defaultCaption(imgIdx);

                return (
                  <div key={imgIdx} className={`shot ${imgIdx === 0 || imgIdx % 7 === 0 ? 'wide' : ''}`}>
                    <div className="img" style={{ background: 'none' }}>
                      <img
                        src={imgUrl}
                        alt={`${project.title} figure ${imgIdx + 1}`}
                        loading="lazy"
                        decoding="async"
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                    </div>
                    <div className="cap">
                      Figure {String(imgIdx + 1).padStart(2, '0')}: {captionText}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="shot wide">
                <div className="img" style={{ background: 'none' }}>
                  {project.coverImage && <img src={project.coverImage} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />}
                </div>
                <div className="cap">Figure 01: Complete {project.title} System Showcase</div>
              </div>
            )}
          </div>

          {/* Color & Type Spec Grid matching work-after8.html reference */}
          <div style={{ marginTop: '48px' }}>
            <div className="section-head" style={{ marginBottom: '20px' }}>
              <div className="eyebrow">BRAND SYSTEM SPECIFICATIONS</div>
            </div>

            <div className="spec-grid">
              <div className="swatches">
                <div className="swatch" style={{ background: '#1B1B17', color: '#FFF' }}>
                  <div className="lbl">INK // #1B1B17</div>
                </div>
                <div className="swatch" style={{ background: '#EFEBE2', color: '#1B1B17' }}>
                  <div className="lbl">PAPER // #EFEBE2</div>
                </div>
                <div className="swatch" style={{ background: '#24463B', color: '#FFF' }}>
                  <div className="lbl">PINE // #24463B</div>
                </div>
                <div className="swatch" style={{ background: '#B8412E', color: '#FFF' }}>
                  <div className="lbl">MARKER // #B8412E</div>
                </div>
              </div>

              <div className="type-spec">
                <div className="row">
                  <span className="mono" style={{ fontSize: '12px', color: 'var(--marker)' }}>PRIMARY SERIF:</span>
                  <h4 style={{ fontSize: '20px', marginTop: '4px' }}>Fraunces SemiBold &bull; 9..144 Optical</h4>
                </div>
                <div className="row">
                  <span className="mono" style={{ fontSize: '12px', color: 'var(--marker)' }}>BODY SANS:</span>
                  <p style={{ fontSize: '14.5px', fontFamily: "'Inter', sans-serif", marginTop: '4px' }}>Inter Regular & Medium for seamless legibility.</p>
                </div>
                <div className="row">
                  <span className="mono" style={{ fontSize: '12px', color: 'var(--marker)' }}>TECHNICAL MONO:</span>
                  <p className="mono" style={{ fontSize: '13px', marginTop: '4px' }}>IBM Plex Mono for lot codes & specs.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Case Study Link & Final CTA */}
      <section className="final">
        <div className="wrap">
          <h2>Explore the next case study</h2>
          <p>
            {isAfter8
              ? 'Discover how we engineered eco-luxe packaging and Shopify architecture for Lumen & Co.'
              : `Discover how we engineered strategy and design for ${nextProject.title}.`}
          </p>
          <Link to={`/work/${nextProject.slug}`} className="btn-primary" style={{ marginRight: '14px' }}>
            {isAfter8 ? 'View Lumen & Co. Case Study →' : `View ${nextProject.title} →`}
          </Link>
          <a href="https://cal.com/dandelion-nrvrze" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ background: 'transparent', border: '1px solid #FFF', color: '#FFF' }}>
            Book Discovery Call &rarr;
          </a>
        </div>
      </section>

      <StickyMobileCTA
        title={isAfter8 ? 'AFTER8® Case Study' : project.title}
        subtitle={isAfter8 ? '+340% DTC Revenue' : `${project.images ? project.images.length : 1} High-Res Assets`}
        buttonText="Next Project →"
        link={`/work/${nextProject.slug}`}
      />
      <Footer />
      </div>
    </>
  );
}
