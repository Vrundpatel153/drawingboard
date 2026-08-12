import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegistrationMarks from '../components/RegistrationMarks';
import StickyMobileCTA from '../components/StickyMobileCTA';
import { usePageAnimations } from '../hooks/usePageAnimations';

export default function Studio() {
  const pageRef = useRef(null);
  usePageAnimations(pageRef);

  const teamMembers = [
    {
      name: 'Vinayak Agarwal',
      role: 'Brand Designer & Illustrator',
      image: '/images/studio/studio_about_10.jpeg',
      bio: 'Specializes in strategic brand identities, custom typography, and bespoke vector illustration systems.'
    },
    {
      name: 'Ajit Biswas',
      role: 'Web & App Developer',
      image: '/images/studio/studio_about_12.jpeg',
      bio: 'Crafts high-performance digital interfaces, React architectures, interactive motion, and custom e-commerce engines.'
    },
    {
      name: 'Vrund Patel',
      role: 'Founder & Lead Design Engineer',
      image: '/images/studio/vrund_patel.jpg',
      bio: 'Leads digital design engineering, full-stack website architectures, brand positioning systems, and technical execution.'
    },
    {
      name: 'Jane Taylor',
      role: 'UI/UX Designer',
      image: '/images/studio/studio_about_13.jpeg',
      bio: 'Focuses on user research, intuitive interface design systems, and conversion-optimized digital workflows.'
    },
    {
      name: 'Michael Wilson',
      role: 'Photographer & Art Director',
      image: '/images/studio/studio_about_14.jpg',
      bio: 'Captures high-impact commercial photography, product lighting, and cinematic brand visual direction.'
    },
    {
      name: 'Trisha Agarwal',
      role: 'Brand Designer',
      image: '/images/studio/studio_about_15.jpg',
      bio: 'Passionate about structural packaging design, tactile print finishes, dieline accuracy, and editorial aesthetics.'
    },
    {
      name: 'Omisha Ghandi',
      role: 'Creative Head',
      image: '/images/studio/studio_about_16.jpg',
      bio: 'Leads cross-disciplinary creative strategy, brand positioning, client alignment, and studio artistic vision.'
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Discovery & Research',
      desc: 'We uncover your business goals, target audience insights, and market challenges through deep research and strategic exploration.'
    },
    {
      step: '02',
      title: 'Strategy & Concept',
      desc: 'We develop a clear positioning strategy, visual architecture, and creative direction precisely aligned with your brand vision.'
    },
    {
      step: '03',
      title: 'Design & Build',
      desc: 'We craft thoughtful visual identities, tactile packaging, and bring them to life with clean, high-performance web engineering.'
    },
    {
      step: '04',
      title: 'Deliver & Support',
      desc: 'We launch your project smoothly across all touchpoints and provide ongoing strategic support for long-term growth.'
    }
  ];

  return (
    <>
      <div ref={pageRef}>
        <RegistrationMarks />
        <Navbar />

        {/* Hero & Manifesto Section */}
        <section className="hero-lite">
          <div className="wrap">
            <div className="sheet-label">
              <span className="tag">SHEET 05 // ABOUT THE STUDIO</span>
              <div className="rule"></div>
            </div>

            <h1 style={{ marginBottom: '24px' }}>
              Built on architectural discipline, <em>pure typography</em> &amp; clean code.
            </h1>

            {/* Framer About Manifesto Text */}
            <div style={{ maxWidth: '960px', margin: '0 0 24px 0' }}>
              <p style={{
                fontSize: 'clamp(16px, 2.2vw, 21px)',
                fontFamily: "'Schibsted Grotesk', sans-serif",
                fontWeight: 800,
                color: 'var(--ink)',
                lineHeight: 1.4,
                letterSpacing: '0.01em',
                textTransform: 'uppercase',
                marginBottom: '18px'
              }}>
                THE DRAWING BOARDS EXISTS TO CLOSE A FRUSTRATING GAP: EXTRAORDINARY PRODUCTS HELD DOWN BY ORDINARY BRANDING. WE HELP FOUNDERS TO BUILD BRANDS THAT STAND OUT WITHOUT LOSING CLARITY, CONVICTION, OR SCALE.
              </p>

              <p style={{
                fontSize: 'clamp(15px, 2vw, 19px)',
                fontFamily: "'Schibsted Grotesk', sans-serif",
                fontWeight: 700,
                color: 'var(--ink-soft)',
                lineHeight: 1.45,
                letterSpacing: '0.01em',
                textTransform: 'uppercase',
                margin: 0
              }}>
                WE'RE A CREATIVE AGENCY BUILT FOR BRANDS THAT WANT MORE THAN SURFACE-LEVEL DESIGN. WITH ROOTS IN BRANDING, DESIGN, DEVELOPMENT, AND PHOTOGRAPHY — WE BRING CLARITY, BEAUTY, AND IMPACT TO EVERY PROJECT.
              </p>
            </div>

            {/* Small Profile Circular Avatars & Social Proof Strip */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '24px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src="/images/studio/studio_about_04.jpg"
                  alt="Client Profile 1"
                  style={{ width: '44px', height: '44px', borderRadius: '50%', border: '2px solid var(--paper)', objectFit: 'cover', marginLeft: 0 }}
                />
                <img
                  src="/images/studio/studio_about_05.jpg"
                  alt="Client Profile 2"
                  style={{ width: '44px', height: '44px', borderRadius: '50%', border: '2px solid var(--paper)', objectFit: 'cover', marginLeft: '-12px' }}
                />
                <img
                  src="/images/studio/studio_about_06.jpg"
                  alt="Client Profile 3"
                  style={{ width: '44px', height: '44px', borderRadius: '50%', border: '2px solid var(--paper)', objectFit: 'cover', marginLeft: '-12px' }}
                />
                <img
                  src="/images/studio/studio_about_07.webp"
                  alt="Client Profile 4"
                  style={{ width: '44px', height: '44px', borderRadius: '50%', border: '2px solid var(--paper)', objectFit: 'cover', marginLeft: '-12px' }}
                />
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    border: '2px solid var(--paper)',
                    background: '#000000',
                    color: '#FFFFFF',
                    fontSize: '12px',
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: '-12px'
                  }}
                >
                  65+
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <div style={{ color: '#000000', letterSpacing: '2px', fontSize: '14px', lineHeight: 1 }}>
                  ★★★★★
                </div>
                <div className="mono" style={{ fontSize: '12.5px', color: 'var(--ink)', fontWeight: 600 }}>
                  Trusted by clients worldwide
                </div>
              </div>
            </div>

            {/* WhatsApp Link */}
            <p style={{ marginTop: '20px' }}>
              <a className="btn-link" href="https://wa.me/919428859768?text=Hello%20The%20Drawing%20Board%2C%20I%20am%20interested%20in%20discussing%20a%20project!" target="_blank" rel="noopener noreferrer" style={{ fontSize: '14.5px', color: 'var(--pine)', fontWeight: 600 }}>
                Prefer WhatsApp for discussion →
              </a>
            </p>

            {/* Stat Strip */}
            <div className="stat-strip" style={{ marginTop: '36px' }}>
              <div className="stat">
                <div className="num">50+</div>
                <div className="lbl">Brands Launched</div>
              </div>
              <div className="stat">
                <div className="num">120+</div>
                <div className="lbl">Projects Delivered</div>
              </div>
              <div className="stat">
                <div className="num">3x</div>
                <div className="lbl">Avg. Engagement Growth</div>
              </div>
              <div className="stat">
                <div className="num">4.9/5</div>
                <div className="lbl">Client Satisfaction Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* Wide Studio Banner Image */}
        <section style={{ padding: '0 0 60px 0' }}>
          <div className="wrap">
            <div style={{ border: '1px solid var(--ink)', borderRadius: '2px', overflow: 'hidden', background: 'var(--card)' }}>
              <img
                src="/images/studio/studio_about_09.jpg"
                alt="The Drawing Board Studio Environment"
                style={{ width: '100%', height: 'auto', maxHeight: '520px', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </section>

        {/* Studio Philosophy / Vision & Mission */}
        <section className="problem" style={{ borderTop: '1px solid var(--ink)', background: 'var(--card)' }}>
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">OUR PHILOSOPHY</div>
                <h2>Strategy-Led, Design-Driven, Human-Focused.</h2>
              </div>
              <p>To shape a world where brands inspire, connect, and create meaningful impact.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginTop: '20px' }}>
              <div style={{ border: '1px solid var(--ink)', padding: '28px', background: 'var(--paper)', borderRadius: '2px' }}>
                <div className="mono" style={{ fontSize: '12px', color: 'var(--pine)', fontWeight: 700, marginBottom: '10px' }}>// OUR VISION</div>
                <h3 style={{ fontSize: '20px', fontFamily: "'Schibsted Grotesk', sans-serif", fontWeight: 700, marginBottom: '12px', color: 'var(--ink)' }}>
                  Meaningful Visual Impact &amp; Authentic Connection
                </h3>
                <p style={{ fontSize: '14.5px', color: 'var(--ink-soft)', lineHeight: 1.65, margin: 0 }}>
                  To shape a world where brands inspire, connect, and create meaningful impact — through intentional design, authentic storytelling, and purposeful digital experiences.
                </p>
              </div>

              <div style={{ border: '1px solid var(--ink)', padding: '28px', background: 'var(--paper)', borderRadius: '2px' }}>
                <div className="mono" style={{ fontSize: '12px', color: 'var(--pine)', fontWeight: 700, marginBottom: '10px' }}>// OUR MISSION</div>
                <h3 style={{ fontSize: '20px', fontFamily: "'Schibsted Grotesk', sans-serif", fontWeight: 700, marginBottom: '12px', color: 'var(--ink)' }}>
                  Empowering Forward-Thinking Businesses
                </h3>
                <p style={{ fontSize: '14.5px', color: 'var(--ink-soft)', lineHeight: 1.65, margin: 0 }}>
                  We help forward-thinking businesses bring their vision to life through strategy-led branding, human-centered design, scalable development, and powerful commercial photography.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Process Section */}
        <section style={{ background: 'var(--paper)', borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)' }}>
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">OUR PROCESS</div>
                <h2>From Idea to Execution, Step by Step.</h2>
              </div>
              <p>A clear and collaborative journey that turns your vision into thoughtful strategy, bold design, and powerful code.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
              {processSteps.map((p, idx) => (
                <div key={idx} style={{ border: '1px solid var(--ink)', padding: '24px', background: 'var(--card)', borderRadius: '2px', position: 'relative' }}>
                  <div className="mono" style={{ fontSize: '28px', fontWeight: 800, color: 'var(--pine)', marginBottom: '12px', opacity: 0.9 }}>
                    {p.step}
                  </div>
                  <h4 style={{ fontSize: '17px', fontFamily: "'Schibsted Grotesk', sans-serif", fontWeight: 700, marginBottom: '10px', color: 'var(--ink)' }}>
                    {p.title}
                  </h4>
                  <p style={{ fontSize: '13.5px', color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0 }}>
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section: The People Behind the Craft */}
        <section style={{ borderBottom: '1px solid var(--ink)', background: 'var(--card)' }}>
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">OUR TEAM</div>
                <h2>The People Behind the Craft.</h2>
              </div>
              <p>A diverse mix of strategists, designers, developers, and creators — united by curiosity, craft, and care.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {teamMembers.map((member, idx) => (
                <div key={idx} style={{ border: '1px solid var(--ink)', background: 'var(--paper)', borderRadius: '2px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ width: '100%', height: '320px', overflow: 'hidden', background: '#000000' }}>
                    <img
                      src={member.image}
                      alt={member.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.4s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
                    />
                  </div>
                  <div style={{ padding: '20px', background: 'var(--paper)', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div className="mono" style={{ fontSize: '11px', color: 'var(--pine)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                        // {member.role}
                      </div>
                      <h3 style={{ fontSize: '19px', fontFamily: "'Schibsted Grotesk', sans-serif", fontWeight: 700, margin: '0 0 10px 0', color: 'var(--ink)' }}>
                        {member.name}
                      </h3>
                      <p style={{ fontSize: '13px', color: 'var(--ink-soft)', lineHeight: 1.55, margin: 0 }}>
                        {member.bio}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Client Roster */}
        <section style={{ background: 'var(--card)', borderBottom: '1px solid var(--ink)' }}>
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">SELECTED CLIENT ROSTER</div>
                <h2>Brands that trust our studio architecture.</h2>
              </div>
              <p>Partnering with seed-stage innovators through established global industry leaders.</p>
            </div>

            <div className="roster-grid">
              <Link to="/work/soul-brew-branding-packaging-design" className="roster-item" style={{ textDecoration: 'none', color: 'inherit' }}>Soul Brew</Link>
              <Link to="/work/after8%C2%AE---reimagining-intimacy-for-a-new-generation." className="roster-item" style={{ textDecoration: 'none', color: 'inherit' }}>AFTER8®</Link>
              <Link to="/work/lumen-fine-jewellery" className="roster-item" style={{ textDecoration: 'none', color: 'inherit' }}>Lumen &amp; Co.</Link>
              <Link to="/work/alder---outdoor-essentials-built-for-slower-movement" className="roster-item" style={{ textDecoration: 'none', color: 'inherit' }}>Alder Essentials</Link>
              <Link to="/work/krona-architecture-studio" className="roster-item" style={{ textDecoration: 'none', color: 'inherit' }}>Krona Studio</Link>
              <Link to="/work/good-protein-branding-packaging-design" className="roster-item" style={{ textDecoration: 'none', color: 'inherit' }}>Good Protein</Link>
              <Link to="/work/nectar-hard-seltzer" className="roster-item" style={{ textDecoration: 'none', color: 'inherit' }}>Nectar Spirits</Link>
              <Link to="/work/oras-plant-protein" className="roster-item" style={{ textDecoration: 'none', color: 'inherit' }}>Oras Plant</Link>
              <Link to="/work/picco-gelato-branding" className="roster-item" style={{ textDecoration: 'none', color: 'inherit' }}>Picco Gelato</Link>
            </div>
          </div>
        </section>

        {/* Final Call to Action */}
        <section className="final">
          <div className="wrap">
            <h2>Want to partner with our studio?</h2>
            <p>Tell us about your brand vision, requirements, and target launch window.</p>
            <Link to="/contact" className="btn-primary">Initiate Studio Project &rarr;</Link>
          </div>
        </section>

        <StickyMobileCTA title="Studio Overview" subtitle="Senior-Led Execution" buttonText="WhatsApp Us" link="https://wa.me/919428859768?text=Hello%20The%20Drawing%20Board%2C%20I%20am%20interested%20in%20discussing%20a%20project!" />
        <Footer />
      </div>
    </>
  );
}
