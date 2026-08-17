import React, { useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegistrationMarks from '../components/RegistrationMarks';
import StickyMobileCTA from '../components/StickyMobileCTA';
import projectsData from '../data/projectsData.json';
import { usePageAnimations } from '../hooks/usePageAnimations';
import After8CaseStudyView from '../components/After8CaseStudyView';

export default function WorkDetail() {
  const { projectId } = useParams();
  const pageRef = useRef(null);

  usePageAnimations(pageRef);

  // Normalize URL decoding and slug matching
  const cleanId = decodeURIComponent(projectId || '').toLowerCase();
  
  const isPronto = cleanId.includes('pronto');
  const isMatchaClub = cleanId.includes('matcha');
  const isMurami = cleanId.includes('murami');
  const isSoulBrew = cleanId.includes('soul') || cleanId.includes('brew');
  const isAfter8 = cleanId.includes('after8') || cleanId.includes('intimacy');
  const isLumen = cleanId.includes('lumen');
  const isBondwith = cleanId.includes('bondwith');

  // Find matching project in dataset
  const project = projectsData.find(p => {
    const slug = (p.slug || '').toLowerCase();
    return slug === cleanId || cleanId.includes(slug) || slug.includes(cleanId);
  }) || (isPronto ? projectsData[0] : isMatchaClub ? projectsData[1] : isMurami ? projectsData[2] : isSoulBrew ? projectsData[3] : isBondwith ? projectsData[4] : isAfter8 ? projectsData[5] : projectsData[0]);

  const currentIndex = projectsData.indexOf(project);
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];

  if (isAfter8) {
    return <After8CaseStudyView nextProject={nextProject} pageRef={pageRef} />;
  }

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
            {isPronto
              ? 'PRONTO! Case Study'
              : isMatchaClub
              ? 'Matcha Club Case Study'
              : isMurami
              ? 'Murami Case Study'
              : isBondwith
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
              {isPronto
                ? 'CASE STUDY // SPEC 01 — RESTAURANT & PACKAGING'
                : isMatchaClub
                ? 'CASE STUDY // SPEC 02 — CPG & RITUAL BRANDING'
                : isMurami
                ? 'CASE STUDY // SPEC 03 — CHARACTER & HOSPITALITY'
                : isBondwith
                ? 'CASE STUDY // SPEC 04 — BRAND GUIDELINES'
                : isAfter8
                ? 'CASE STUDY // SPEC 08'
                : isLumen
                ? 'CASE STUDY // SPEC 09'
                : `CASE STUDY // SPEC ${String(currentIndex + 1).padStart(2, '0')}`}
            </span>
            <div className="rule"></div>
          </div>

          {isPronto ? (
            <>
              <h1>PRONTO! — <em>Authentic Italian</em> Restaurant &amp; Neapolitan Pizzeria Identity.</h1>
              <p className="dek">
                How we engineered a bold, design-forward Italian restaurant visual identity, custom Neapolitan pizza packaging dielines, custom merchandise, vibrant menu systems, and kinetic motion graphics.
              </p>
              <div className="meta-strip">
                <div className="meta-cell">
                  <div className="k">Client</div>
                  <div className="v">PRONTO! Ristorante</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Scope</div>
                  <div className="v">Brand, Pack &amp; Motion</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Timeline</div>
                  <div className="v">4 Weeks Sprint</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Impact</div>
                  <div className="v" style={{ color: 'var(--pine)' }}>+180% Dine-In &amp; Takeout</div>
                </div>
              </div>
            </>
          ) : isMatchaClub ? (
            <>
              <h1>Matcha Club — <em>Mindful ceremonial ritual</em> &amp; character-driven brand identity.</h1>
              <p className="dek">
                Character-driven storytelling, mindful ceremonial matcha tin packaging, custom label systems, vibrant motion reveals, and organic wellness aesthetics.
              </p>
              <div className="meta-strip">
                <div className="meta-cell">
                  <div className="k">Client</div>
                  <div className="v">Matcha Club Co.</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Scope</div>
                  <div className="v">Identity, Pack &amp; Motion</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Timeline</div>
                  <div className="v">3 Weeks Sprint</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Impact</div>
                  <div className="v" style={{ color: 'var(--pine)' }}>+220% DTC Subscriptions</div>
                </div>
              </div>
            </>
          ) : isMurami ? (
            <>
              <h1>Murami — <em>High-energy character-driven</em> brand identity &amp; restaurant art direction.</h1>
              <p className="dek">
                High-energy character-driven visual identity, custom mascot illustration system, vibrant restaurant packaging, merchandise, and environmental brand collateral.
              </p>
              <div className="meta-strip">
                <div className="meta-cell">
                  <div className="k">Client</div>
                  <div className="v">Murami Japanese Bistro</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Scope</div>
                  <div className="v">Brand Identity &amp; Packaging</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Timeline</div>
                  <div className="v">4 Weeks Sprint</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Impact</div>
                  <div className="v" style={{ color: 'var(--pine)' }}>+310% Brand Recall</div>
                </div>
              </div>
            </>
          ) : isSoulBrew ? (
            <>
              <h1>Soul Brew — <em>Artisan Coffee &amp; Cafe</em> Brand Identity System.</h1>
              <p className="dek">
                How we engineered an authentic brand identity, hand-drawn character illustrations, tactile packaging dielines, and animated logo reveals for an artisan specialty coffee roaster.
              </p>
              <div className="meta-strip">
                <div className="meta-cell">
                  <div className="k">Client</div>
                  <div className="v">Soul Brew Roasters</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Scope</div>
                  <div className="v">Identity, Pack &amp; Motion</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Timeline</div>
                  <div className="v">4 Weeks Sprint</div>
                </div>
                <div className="meta-cell">
                  <div className="k">Impact</div>
                  <div className="v" style={{ color: 'var(--pine)' }}>+240% Brand Engagement</div>
                </div>
              </div>
            </>
          ) : isBondwith ? (
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
          {isPronto ? (
            <>
              <div className="section-head">
                <div>
                  <div className="eyebrow">THE RESTAURANT CHALLENGE</div>
                  <h2>Reinventing traditional Italian dining for modern urban culture.</h2>
                </div>
                <p>Moving beyond generic trattoria tropes to an energetic, design-forward culinary brand.</p>
              </div>

              <div className="problem-grid">
                <div className="problem-copy">
                  <p><strong>Most Italian restaurants rely on predictable clichés:</strong> generic flags, script fonts, and checked tablecloths.</p>
                  <p>PRONTO! needed a bold, retro-modern Italian identity that captures authentic Neapolitan craftsmanship while resonating with an urban, design-conscious demographic across dine-in, takeout, and delivery.</p>
                </div>

                <div className="insight-card">
                  <div className="lbl">// CULINARY BRAND INSIGHT</div>
                  <p>"Pairing bold typography with high-contrast graphic framing and tactile unboxing elevates everyday dining into a vibrant cultural lifestyle ritual."</p>
                </div>
              </div>
            </>
          ) : isMatchaClub ? (
            <>
              <div className="section-head">
                <div>
                  <div className="eyebrow">THE CEREMONIAL CHALLENGE</div>
                  <h2>Demystifying matcha into an approachable daily lifestyle ritual.</h2>
                </div>
                <p>Balancing traditional Japanese ceremonial reverence with playful, modern consumer accessibility.</p>
              </div>

              <div className="problem-grid">
                <div className="problem-copy">
                  <p><strong>Matcha brands frequently swing between two extremes:</strong> ultra-stiff ceremonial minimalism or cheap mass-market novelty.</p>
                  <p>Matcha Club required an inviting, character-driven identity that honors traditional ceremonial grades while making daily whisking and preparation joyful, tactile, and community-driven.</p>
                </div>

                <div className="insight-card">
                  <div className="lbl">// MINDFUL RITUAL INSIGHT</div>
                  <p>"Character-led visual storytelling bridges the gap between ancient tradition and modern wellness, turning daily preparation into a cherished habit."</p>
                </div>
              </div>
            </>
          ) : isMurami ? (
            <>
              <div className="section-head">
                <div>
                  <div className="eyebrow">THE BRAND CHALLENGE</div>
                  <h2>Standing out with an iconic, character-driven mascot universe.</h2>
                </div>
                <p>Merging Japanese street culture art direction with contemporary hospitality branding.</p>
              </div>

              <div className="problem-grid">
                <div className="problem-copy">
                  <p><strong>In a saturated fast-casual and modern dining landscape,</strong> standard minimalist branding easily gets lost in the noise.</p>
                  <p>Murami required an unmistakable character-led visual universe with dynamic poses, distinct high-voltage colorways, and modular applications across menus, packaging, streetwear merch, and interior spaces.</p>
                </div>

                <div className="insight-card">
                  <div className="lbl">// MASCOT &amp; ART DIRECTION INSIGHT</div>
                  <p>"A strong character mascot serves as a living brand ambassador, creating instant emotional attachment and organic social shareability across every touchpoint."</p>
                </div>
              </div>
            </>
          ) : isSoulBrew ? (
            <>
              <div className="section-head">
                <div>
                  <div className="eyebrow">THE BRAND CHALLENGE</div>
                  <h2>Standing out in a crowded specialty coffee market.</h2>
                </div>
                <p>Moving beyond generic coffee cup templates to an unforgettable, character-led visual identity.</p>
              </div>

              <div className="problem-grid">
                <div className="problem-copy">
                  <p><strong>Specialty coffee roasters often fall into predictable design traps:</strong> either minimalist industrial sterile packaging or generic stock vector badges.</p>
                  <p>Soul Brew needed a distinct, warm, and personality-filled identity system — centered around hand-drawn character artwork, custom typography, tactile unboxing sleeves, and animated brand reveals.</p>
                </div>

                <div className="insight-card">
                  <div className="lbl">// ILLUSTRATION &amp; BRAND INSIGHT</div>
                  <p>"Infusing character-driven illustration into packaging transforms a simple cup of coffee into an emotional daily ritual that customers proudly share and remember."</p>
                </div>
              </div>
            </>
          ) : isBondwith ? (
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
          {isPronto ? (
            <>
              <div className="section-head">
                <div>
                  <div className="eyebrow">PROJECT DELIVERABLES</div>
                  <h2>Master restaurant &amp; packaging specifications.</h2>
                </div>
                <p>Complete brand system, structural pizza dielines, staff apparel, and kinetic animations.</p>
              </div>

              <div className="deliv-grid">
                <div className="deliv-col">
                  <h4>Visual Identity</h4>
                  <div className="sub">// LOGO &amp; MOTION</div>
                  <ul>
                    <li>Primary bold wordmark</li>
                    <li>Custom pizza seal brand mark</li>
                    <li>Animated logo reveals &amp; motion loops</li>
                    <li>High-contrast Italian color palette</li>
                  </ul>
                </div>

                <div className="deliv-col">
                  <h4>Packaging Dielines</h4>
                  <div className="sub">// PIZZA BOXES &amp; CUPS</div>
                  <ul>
                    <li>Custom corrugated pizza boxes</li>
                    <li>Takeaway beverage cup sleeves</li>
                    <li>Paper takeaway bags &amp; tape seals</li>
                    <li>Custom greaseproof food liners</li>
                  </ul>
                </div>

                <div className="deliv-col">
                  <h4>Restaurant Collateral</h4>
                  <div className="sub">// MENUS &amp; MERCH</div>
                  <ul>
                    <li>Dine-in &amp; takeout menu systems</li>
                    <li>Embroidered staff aprons &amp; caps</li>
                    <li>Window graphics &amp; storefront signage</li>
                    <li>Digital ordering kiosk displays</li>
                  </ul>
                </div>

                <div className="deliv-col">
                  <h4>Verified Impact</h4>
                  <div className="sub">// PERFORMANCE METRICS</div>
                  <ul>
                    <li>+180% Dine-In &amp; Takeout Orders</li>
                    <li>4.9/5 Brand Satisfaction Rating</li>
                    <li>17 Master Production Assets</li>
                    <li>100% On-Time Studio Handover</li>
                  </ul>
                </div>
              </div>
            </>
          ) : isMatchaClub ? (
            <>
              <div className="section-head">
                <div>
                  <div className="eyebrow">PROJECT DELIVERABLES</div>
                  <h2>Ceremonial packaging &amp; brand asset suite.</h2>
                </div>
                <p>Character-driven storytelling, tactile aluminum tins, refill pouches, and kinetic rituals.</p>
              </div>

              <div className="deliv-grid">
                <div className="deliv-col">
                  <h4>Brand Universe</h4>
                  <div className="sub">// IDENTITY &amp; MOTION</div>
                  <ul>
                    <li>Character mascot illustration system</li>
                    <li>Animated brand marks &amp; daily rituals</li>
                    <li>Custom typographic hierarchy</li>
                    <li>Earth &amp; matcha green color palette</li>
                  </ul>
                </div>

                <div className="deliv-col">
                  <h4>Packaging Suite</h4>
                  <div className="sub">// TINS &amp; POUCHES</div>
                  <ul>
                    <li>Matte aluminum ceremonial matcha tins</li>
                    <li>Sealed eco-friendly refill pouches</li>
                    <li>Foil-stamped label architecture</li>
                    <li>Whisk &amp; scoop unboxing box dielines</li>
                  </ul>
                </div>

                <div className="deliv-col">
                  <h4>Digital Collateral</h4>
                  <div className="sub">// E-COMMERCE &amp; SOCIAL</div>
                  <ul>
                    <li>E-Commerce product render suite</li>
                    <li>Step-by-step brewing guide cards</li>
                    <li>Social media kinetic loop templates</li>
                    <li>Limited-edition merch &amp; ceramic cups</li>
                  </ul>
                </div>

                <div className="deliv-col">
                  <h4>Verified Impact</h4>
                  <div className="sub">// PERFORMANCE METRICS</div>
                  <ul>
                    <li>+220% DTC Subscription Growth</li>
                    <li>3.8x Social Engagement Multiplier</li>
                    <li>16 Master Production Deliverables</li>
                    <li>High Brand Loyalty &amp; Retention</li>
                  </ul>
                </div>
              </div>
            </>
          ) : isMurami ? (
            <>
              <div className="section-head">
                <div>
                  <div className="eyebrow">PROJECT DELIVERABLES</div>
                  <h2>Mascot universe &amp; restaurant art direction.</h2>
                </div>
                <p>Dynamic character poses, street-culture merchandise, custom packaging, and interior branding.</p>
              </div>

              <div className="deliv-grid">
                <div className="deliv-col">
                  <h4>Character System</h4>
                  <div className="sub">// MASCOT &amp; ART DIRECTION</div>
                  <ul>
                    <li>Modular character mascot system</li>
                    <li>Dynamic action poses &amp; expressions</li>
                    <li>Japanese street-culture art direction</li>
                    <li>High-voltage neon color palette</li>
                  </ul>
                </div>

                <div className="deliv-col">
                  <h4>Packaging Dielines</h4>
                  <div className="sub">// TAKEOUT &amp; CONTAINERS</div>
                  <ul>
                    <li>Custom bento box &amp; bowl sleeves</li>
                    <li>Illustrated takeaway kraft bags</li>
                    <li>Custom chopstick wrappers</li>
                    <li>Branded condiment packets &amp; cups</li>
                  </ul>
                </div>

                <div className="deliv-col">
                  <h4>Merch &amp; Spaces</h4>
                  <div className="sub">// MERCHANDISE &amp; INTERIORS</div>
                  <ul>
                    <li>Screen-printed streetwear &amp; hoodies</li>
                    <li>In-store neon signs &amp; mural specs</li>
                    <li>Illustrated menu boards</li>
                    <li>Collectible brand sticker packs</li>
                  </ul>
                </div>

                <div className="deliv-col">
                  <h4>Verified Impact</h4>
                  <div className="sub">// PERFORMANCE METRICS</div>
                  <ul>
                    <li>+310% Brand Recall &amp; Engagement</li>
                    <li>5.0x Organic Social Mentions</li>
                    <li>14 Master Production Assets</li>
                    <li>Complete Turnkey Asset Handoff</li>
                  </ul>
                </div>
              </div>
            </>
          ) : isBondwith ? (
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
              <h2>
                {isPronto
                  ? 'PRONTO! — 17 Master System Figures & Motion Assets'
                  : isMatchaClub
                  ? 'Matcha Club — 16 Ceremonial Packaging Figures & Loops'
                  : isMurami
                  ? 'Murami — 14 Mascot System Figures & Restaurant Renders'
                  : isBondwith
                  ? 'Bondwith — 31 Master System Figures & Guideline Architecture'
                  : isAfter8
                  ? 'Visual system & product showcase.'
                  : `${project.title} — Visual System & Renders`}
              </h2>
            </div>
            <p>Detailed breakdown of typographic pairings, color swatches, and packaging renders.</p>
          </div>

          <div className="gallery">
            {project.images && project.images.length > 0 ? (
              project.images.map((imgUrl, imgIdx) => {
                const prontoCaptions = [
                  "PRONTO! — Primary Bold Wordmark & Brand Seal Cover",
                  "Brand Positioning Statement & Authentic Italian Heritage",
                  "Neapolitan Pizza Box Structural Packaging & Custom Illustration",
                  "Takeaway Paper Bags & Kraft Packaging Suite",
                  "Animated Brand Mark & Pizza Slice Motion Graphics",
                  "Animated Mascot & Dynamic Brand Expression",
                  "Complete Tableware & Restaurant Dine-In Collateral",
                  "Kinetic Motion Reveal & Social Media Animation",
                  "Vibrant Colorway Matrix & Typographic Hierarchy",
                  "Custom Branded Merchandise, Aprons & Apparel",
                  "Dine-In Menu Architecture & Typography Layout",
                  "Takeout Beverage Cups & Illustrated Sleeves",
                  "Environmental Signage, Window Decals & Storefront",
                  "Animated Delivery Van & Motion Asset System",
                  "Packaging Unboxing Experience & Brand Details",
                  "Secondary Badge System & Seal Variants",
                  "PRONTO! Master Brand Assets & Design System Overview"
                ];

                const matchaClubCaptions = [
                  "Matcha Club — Mindful Character Motion Loop & Mascot Reveal",
                  "Ceremonial Grade Matcha Tin Packaging Architecture",
                  "Animated Whisking Ritual & Japanese Character Motion",
                  "Refill Pouch Packaging & Minimalist Label Architecture",
                  "Animated Mascot Steaming Cup & Daily Ritual Motion",
                  "Tactile Aluminum Tins & Matte Label Detailing",
                  "Custom Brewing Guide Card & Typographic Hierarchy",
                  "Animated Brand Mark & Kinetic Organic Loop",
                  "Complete Unboxing Experience & Chasen Whisk Box",
                  "Organic Earth & Matcha Green Color Palette Specs",
                  "Animated Matcha Sachet Motion & Pouring Reveal",
                  "Social Media Motion System & Editorial Templates",
                  "Minimalist Iconography & Ingredient Transparency Marks",
                  "Animated Character Expressions & Mascot Emotions",
                  "Ceremonial Tin Motion Reveal & Packaging Animation",
                  "Matcha Club Master Asset Suite & Design System Overview"
                ];

                const muramiCaptions = [
                  "Murami — AI-Assisted Character Mascot & Hero Illustration",
                  "Primary Wordmark Construction & High-Contrast Typography",
                  "Custom Illustrated Takeout Bags & Bento Packaging",
                  "Japanese Streetwear Merchandising & Screen-Printed Hoodies",
                  "Modular Mascot Poses & Dynamic Character Art Direction",
                  "Vibrant Packaging Dielines & Food Container Sleeves",
                  "Chopstick Packaging, Sauce Packets & Table Collateral",
                  "In-Store Environmental Graphics, Neon Signage & Mural Specs",
                  "High-Voltage Colorway System & Background Usability",
                  "Editorial Dine-In Menu Layout & Item Hierarchy",
                  "Collectible Brand Sticker Pack & Streetwear Graphics",
                  "Social Media Launch Campaign & Digital Brand Renders",
                  "Takeaway Beverage Cups & Branded Container Mockups",
                  "Murami Master Brand Guidelines & Complete Asset Suite"
                ];

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

                const soulBrewCaptions = [
                  "Soul Brew — Primary Hand-Drawn Brand Mark & Logo Seal (o1.png)",
                  "Main Logo Motion Reveal & Brand Mark Animation",
                  "Introductory Brand Identity Showcase & Character Motion",
                  "Primary Logo & Iconography Variants",
                  "Hand-Drawn Character Illustration & Mascot Design",
                  "Custom Typographic Seal & Brandmark Construction",
                  "Warm Terracotta & Warm Cream Brand Color Palette Specs",
                  "Artisan Coffee Bag Structural Packaging & Label Architecture",
                  "Retail Packaging Box Dielines & Unboxing Experience",
                  "Cold Brew Bottle Labeling & Matte Glass Mockup",
                  "Takeaway Cup System & Custom Illustrated Sleeves",
                  "Cafe Menu System & Layout Architecture",
                  "Hand-Drawn Character Illustration Expressions & Animation",
                  "Specialty Coffee Can Silhouettes & Colorway Variations",
                  "Roastery Packaging Suite & Batch Stamp Details",
                  "Brand Identity Collateral & Stationery Architecture",
                  "In-Store Retail Merchandising & Signage Guidelines",
                  "Editorial Coffee Bag Packaging & Product Renders",
                  "Interactive Menu Flip Book & Digital Animation",
                  "Technical Logo Grid Alignment & Geometric Proportions",
                  "Color Swatch Usability & High-Contrast Typography",
                  "Brand Story Animation & Origin Narrative",
                  "Visual System Guidelines & Typography Hierarchy",
                  "Artisan Cafe Branding Application Showcase",
                  "Complete Soul Brew Master Asset Suite Overview"
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

                const captionText = isPronto && imgIdx < prontoCaptions.length
                  ? prontoCaptions[imgIdx]
                  : isMatchaClub && imgIdx < matchaClubCaptions.length
                  ? matchaClubCaptions[imgIdx]
                  : isMurami && imgIdx < muramiCaptions.length
                  ? muramiCaptions[imgIdx]
                  : isSoulBrew && imgIdx < soulBrewCaptions.length
                  ? soulBrewCaptions[imgIdx]
                  : isBondwith && imgIdx < bondwithCaptions.length
                  ? bondwithCaptions[imgIdx]
                  : isAfter8 && imgIdx < after8Captions.length
                  ? after8Captions[imgIdx]
                  : defaultCaption(imgIdx);

                const isVideo = typeof imgUrl === 'string' && imgUrl.match(/\.(mp4|webm|mov)$/i);

                return (
                  <div key={imgIdx} className={`shot ${imgIdx === 0 || imgIdx % 7 === 0 ? 'wide' : ''}`}>
                    <div className="img" style={{ background: 'none' }}>
                      {isVideo ? (
                        <video
                          src={imgUrl}
                          autoPlay
                          loop
                          muted
                          playsInline
                          controls
                          style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '4px' }}
                        />
                      ) : (
                        <img
                          src={imgUrl}
                          alt={`${project.title} figure ${imgIdx + 1}`}
                          loading="lazy"
                          decoding="async"
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                      )}
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
