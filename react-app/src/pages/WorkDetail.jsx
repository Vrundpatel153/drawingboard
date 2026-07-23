import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegistrationMarks from '../components/RegistrationMarks';
import StickyMobileCTA from '../components/StickyMobileCTA';
import ArrowIcon from '../components/ArrowIcon';
import projectsData from '../data/projectsData.json';

export default function WorkDetail() {
  const { projectId } = useParams();

  // Normalize URL decoding and slug matching
  const cleanId = decodeURIComponent(projectId || '').toLowerCase();
  
  const isAfter8 = cleanId.includes('after8') || cleanId.includes('intimacy');
  const isLumen = cleanId.includes('lumen');

  // Find matching project in dataset
  const project = projectsData.find(p => {
    const slug = (p.slug || '').toLowerCase();
    return slug === cleanId || cleanId.includes(slug) || slug.includes(cleanId);
  }) || (isAfter8 ? projectsData[0] : isLumen ? projectsData[1] : projectsData[0]);

  const currentIndex = projectsData.indexOf(project);
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];

  return (
    <>
      <RegistrationMarks />
      <Navbar />

      {/* Breadcrumbs */}
      <div className="wrap">
        <div className="crumb">
          <Link to="/work">Work</Link>
          <span className="sep">/</span>
          <span className="cur">{isAfter8 ? 'AFTER8® Case Study' : isLumen ? 'Lumen & Co. Case Study' : `${project.title} Case Study`}</span>
        </div>
      </div>

      {/* Case Hero Section */}
      <section className="case-hero">
        <div className="wrap">
          <div className="sheet-label">
            <span className="tag">
              {isAfter8 ? 'CASE STUDY // SPEC 08' : isLumen ? 'CASE STUDY // SPEC 09' : `CASE STUDY // SPEC ${String(currentIndex + 1).padStart(2, '0')}`}
            </span>
            <div className="rule"></div>
          </div>

          {isAfter8 ? (
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
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          )}
        </div>
      </section>

      {/* Dark Contrast Problem / Insight Block */}
      <section className="problem">
        <div className="wrap">
          {isAfter8 ? (
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
          {isAfter8 ? (
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
                    <li>Zero Single-Use Plastic Used</li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="section-head">
                <div>
                  <div className="eyebrow">PROJECT DELIVERABLES</div>
                  <h2>Technical execution specifications.</h2>
                </div>
                <p>A complete production-ready blueprint engineered for long-term scalability.</p>
              </div>

              <div className="deliv-grid">
                <div className="deliv-col">
                  <h4>Visual Identity</h4>
                  <div className="sub">// LOGO & MARKS</div>
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
              <h2>{project.title} — Visual System & Renders</h2>
            </div>
            <p>Detailed breakdown of typographic pairings, color swatches, and high-resolution renders.</p>
          </div>

          <div className="gallery">
            {project.images && project.images.length > 0 ? (
              project.images.map((imgUrl, imgIdx) => (
                <div key={imgIdx} className={`shot ${imgIdx === 0 ? 'wide' : ''}`}>
                  <div className="img" style={{ background: 'none' }}>
                    <img
                      src={imgUrl}
                      alt={`${project.title} figure ${imgIdx + 1}`}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="cap">
                    Figure {String(imgIdx + 1).padStart(2, '0')}: {project.title} — {imgIdx === 0 ? 'Packaging Architecture & Bottle Silhouettes' : imgIdx === 1 ? 'Rigid Box Debossing Detail' : 'Mobile Interface UI Showcase'}
                  </div>
                </div>
              ))
            ) : (
              <div className="shot wide">
                <div className="img" style={{ background: 'none' }}>
                  {project.coverImage && <img src={project.coverImage} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
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
          <p>Discover how we engineered strategy and design for {nextProject.title}.</p>
          <Link to={`/work/${nextProject.slug}`} className="btn-primary" style={{ marginRight: '14px' }}>
            View {nextProject.title} <ArrowIcon />
          </Link>
          <a href="https://cal.com/dandelion-nrvrze" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ background: 'transparent', border: '1px solid #FFF', color: '#FFF' }}>
            Book Discovery Call <ArrowIcon />
          </a>
        </div>
      </section>

      <StickyMobileCTA title={project.title} subtitle={`${project.images ? project.images.length : 1} High-Res Assets`} buttonText="Next Project" link={`/work/${nextProject.slug}`} />
      <Footer />
    </>
  );
}

