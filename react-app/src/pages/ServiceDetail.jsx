import React, { useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegistrationMarks from '../components/RegistrationMarks';
import StickyMobileCTA from '../components/StickyMobileCTA';
import ArrowIcon from '../components/ArrowIcon';
import servicesData from '../data/servicesData.json';
import { usePageAnimations } from '../hooks/usePageAnimations';

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const pageRef = useRef(null);

  usePageAnimations(pageRef);

  // Normalize slug matching
  const cleanId = (serviceId || '').toLowerCase().trim();
  const service = servicesData.find((s) => {
    if (s.slug === cleanId || s.id === cleanId) return true;
    if (cleanId.includes('brand') && s.slug === 'branding') return true;
    if ((cleanId.includes('ui') || cleanId.includes('ux') || cleanId.includes('design')) && s.slug === 'design') return true;
    if ((cleanId.includes('dev') || cleanId.includes('code') || cleanId.includes('web')) && s.slug === 'development') return true;
    if ((cleanId.includes('pack') || cleanId.includes('box')) && s.slug === 'packaging-design') return true;
    if ((cleanId.includes('photo') || cleanId.includes('shoot')) && s.slug === 'photography') return true;
    return false;
  }) || servicesData[0];

  const currentIndex = servicesData.indexOf(service);
  const nextService = servicesData[(currentIndex + 1) % servicesData.length];

  return (
    <>
      <div ref={pageRef}>
        <RegistrationMarks />
        <Navbar />

        {/* Hero Section */}
        <section className="hero-lite">
          <div className="wrap">
            <div className="crumb" style={{ padding: 0, marginBottom: '20px' }}>
              <Link to="/services">Services</Link>
              <span className="sep">/</span>
              <span className="cur">{service.title}</span>
            </div>

            <div className="sheet-label">
              <span className="tag">{service.eyebrow} // SERVICE SPECIFICATION</span>
              <div className="rule"></div>
            </div>

            <h1>{service.headline}</h1>
            <p style={{ marginTop: '16px', fontSize: '18px', color: 'var(--ink-soft)' }}>
              {service.description}
            </p>

            {/* Quick Specs Strip */}
            <div className="stat-strip" style={{ marginTop: '32px' }}>
              <div className="stat">
                <div className="num">{service.startingPrice}</div>
                <div className="lbl">Starting Investment</div>
              </div>
              <div className="stat">
                <div className="num">{service.duration}</div>
                <div className="lbl">Sprint Duration</div>
              </div>
              <div className="stat">
                <div className="num">100%</div>
                <div className="lbl">IP Handoff</div>
              </div>
            </div>

            <div className="cta-row" style={{ marginTop: '36px' }}>
              <Link to="/contact" className="btn-primary">
                Inquire About {service.title} <ArrowIcon />
              </Link>
              <a href="https://cal.com/dandelion-nrvrze" target="_blank" rel="noopener noreferrer" className="btn-link">
                Schedule Discovery Call <ArrowIcon size={13} />
              </a>
            </div>
          </div>
        </section>

        {/* Visual Media Showcase Section */}
        <section style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              {/* Primary Image */}
              <div className="hero-visual has-img" style={{ height: '360px', overflow: 'hidden', border: '1px solid var(--ink)', borderRadius: '4px' }}>
                <img src={service.heroImage} alt={service.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              {/* Video Showcase */}
              <div className="hero-visual has-img" style={{ height: '360px', overflow: 'hidden', border: '1px solid var(--ink)', borderRadius: '4px' }}>
                <video
                  src={service.videoUrl || '/_assets/assets/GmWiQg0MZIvFU3cvgIL12lysLK0.mp4'}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Scope & Deliverables Architecture */}
        <section className="problem">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">DELIVERABLE ARCHITECTURE</div>
                <h2>Included deliverables & production handoffs.</h2>
              </div>
              <p>Every asset is delivered in full commercial format with complete IP transfer.</p>
            </div>

            <div className="problem-grid">
              <div className="problem-copy">
                <h4 style={{ fontSize: '20px', marginBottom: '16px' }}>Comprehensive Handoff Suite</h4>
                <ul style={{ paddingLeft: '20px', lineHeight: 1.9, fontSize: '15px', color: 'var(--ink)' }}>
                  {service.deliverables.map((item, idx) => (
                    <li key={idx}><strong>{item}</strong></li>
                  ))}
                </ul>
              </div>

              <div className="insight-card">
                <div className="lbl">// SPRINT GUARANTEE</div>
                <p>"Senior-only execution with zero junior pass-offs. Every milestone is reviewed directly with studio partners."</p>
                <div style={{ marginTop: '20px', fontSize: '14px', fontWeight: 'bold' }}>
                  Fixed Sprint Price: From {service.startingPrice}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sprint Process Timeline */}
        {service.process && (
          <section style={{ background: 'var(--card)', borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)' }}>
            <div className="wrap">
              <div className="section-head">
                <div>
                  <div className="eyebrow">SPRINT TIMELINE</div>
                  <h2>How we execute {service.title}.</h2>
                </div>
                <p>3-stage structured delivery roadmap.</p>
              </div>

              <div className="deliv-grid">
                {service.process.map((p, pIdx) => (
                  <div className="deliv-col" key={pIdx}>
                    <h4>{p.step}. {p.name}</h4>
                    <div className="sub">// PHASE {p.step}</div>
                    <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ink-soft)', marginTop: '8px' }}>
                      {p.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Gallery / Renders Section */}
        {service.gallery && service.gallery.length > 0 && (
          <section>
            <div className="wrap">
              <div className="section-head">
                <div>
                  <div className="eyebrow">VISUAL SHOWCASE</div>
                  <h2>{service.title} — Work Examples & Renders</h2>
                </div>
                <p>Selected visual assets and execution samples.</p>
              </div>

              <div className="gallery">
                {service.gallery.map((imgUrl, imgIdx) => (
                  <div key={imgIdx} className={`shot ${imgIdx === 0 ? 'wide' : ''}`}>
                    <div className="img" style={{ background: 'none' }}>
                      <img
                        src={imgUrl}
                        alt={`${service.title} asset ${imgIdx + 1}`}
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div className="cap">
                      Figure {String(imgIdx + 1).padStart(2, '0')}: {service.title} — Spec Visual #{imgIdx + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Pricing Tiers */}
        {service.pricingModels && (
          <section style={{ background: 'var(--card)', borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)' }}>
            <div className="wrap">
              <div className="section-head">
                <div>
                  <div className="eyebrow">ENGAGEMENT MODELS</div>
                  <h2>Pricing & Sprint Packages</h2>
                </div>
                <p>Transparent fixed pricing backed by milestone guarantees.</p>
              </div>

              <div className="deliv-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                {service.pricingModels.map((pm, pmIdx) => (
                  <div className="deliv-col" key={pmIdx} style={{ padding: '28px', background: 'var(--bg)', border: '1px solid var(--ink)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <h4 style={{ fontSize: '18px' }}>{pm.tier}</h4>
                      <span className="badge" style={{ fontSize: '14px', fontWeight: 'bold' }}>{pm.price}</span>
                    </div>
                    <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ink-soft)', marginBottom: '20px' }}>
                      {pm.desc}
                    </p>
                    <Link to="/contact" className="btn-primary" style={{ width: '100%', textAlign: 'center', justifyContent: 'center' }}>
                      Book This Model <ArrowIcon size={14} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQs */}
        {service.faqs && (
          <section>
            <div className="wrap">
              <div className="section-head">
                <div>
                  <div className="eyebrow">FREQUENTLY ASKED QUESTIONS</div>
                  <h2>Common questions about {service.title}.</h2>
                </div>
                <p>Everything you need to know before initiating a sprint.</p>
              </div>

              <div style={{ maxWidth: '800px' }}>
                {service.faqs.map((faq, fIdx) => (
                  <div key={fIdx} style={{ marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid var(--ink-soft)' }}>
                    <h4 style={{ fontSize: '17px', marginBottom: '8px' }}>Q: {faq.q}</h4>
                    <p style={{ fontSize: '15px', color: 'var(--ink-soft)', lineHeight: 1.6 }}>{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Other Services Switcher */}
        <section style={{ background: 'var(--card)', borderTop: '1px solid var(--ink)' }}>
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">EXPLORE MORE SERVICES</div>
                <h2>Next Practice Area</h2>
              </div>
              <p>Discover how our other practice areas integrate with {service.title}.</p>
            </div>

            <div className="cta-row">
              <Link to={`/services/${nextService.slug}`} className="btn-primary" style={{ padding: '14px 24px' }}>
                Explore {nextService.title} <ArrowIcon />
              </Link>
              <Link to="/services" className="btn-link">
                View All 5 Services <ArrowIcon size={13} />
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="final">
          <div className="wrap">
            <h2>Ready to initiate {service.title}?</h2>
            <p>Tell us about your project requirements and target launch window.</p>
            <Link to="/contact" className="btn-primary">
              Request Proposal <ArrowIcon />
            </Link>
          </div>
        </section>

        <StickyMobileCTA title={service.title} subtitle={`From ${service.startingPrice}`} buttonText="Next Service →" link={`/services/${nextService.slug}`} />
        <Footer />
      </div>
    </>
  );
}
