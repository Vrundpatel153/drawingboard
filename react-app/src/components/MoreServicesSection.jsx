import React from 'react';
import { Link } from 'react-router-dom';
import ArrowIcon from './ArrowIcon';

export default function MoreServicesSection({ current = '' }) {
  const services = [
    {
      id: 'branding',
      title: 'Branding',
      desc: 'Bold, strategic visual identities that speak with purpose and scale with confidence.',
      link: '/services/branding',
      linkText: 'See branding →',
    },
    {
      id: 'packaging',
      title: 'Packaging Design',
      desc: 'Shelf-ready packaging systems built for retail and e-commerce scale.',
      link: '/services/packaging-design',
      linkText: 'See packaging →',
    },
    {
      id: 'development',
      title: 'Website & App Development',
      desc: 'High-code website and app development that performs seamlessly.',
      link: '/services/development',
      linkText: 'See development →',
    },
    {
      id: 'uiux',
      title: 'UI/UX Design',
      desc: 'Intuitive interface layouts, interactive prototypes, and design systems.',
      link: '/services',
      linkText: 'See services →',
    },
  ];

  const filtered = services.filter((s) => s.id !== current).slice(0, 3);

  return (
    <section className="more-services-sec" style={{ borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)', background: 'var(--card)', padding: '60px 0' }}>
      <div className="wrap">
        <div className="section-head" style={{ marginBottom: '32px' }}>
          <div>
            <div className="eyebrow mono" style={{ fontSize: '11.5px', color: 'var(--marker)', marginBottom: '6px', fontFamily: "'IBM Plex Mono', monospace" }}>MORE SERVICES</div>
            <h2 style={{ fontSize: 'clamp(24px, 3.2vw, 36px)', fontFamily: "'Fraunces', Georgia, serif", color: 'var(--ink)' }}>Full-service, if you need it.</h2>
          </div>
        </div>
        <div
          className="more-services-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
          }}
        >
          {filtered.map((item) => (
            <div
              key={item.id}
              className="more-service-card"
              style={{
                border: '1px solid var(--ink)',
                background: 'var(--paper)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h3 style={{ fontSize: '19px', fontFamily: "'Fraunces', Georgia, serif", marginBottom: '8px', color: 'var(--ink)' }}>{item.title}</h3>
                <p style={{ fontSize: '13.5px', color: 'var(--ink-soft)', lineHeight: '1.5', marginBottom: '18px' }}>{item.desc}</p>
              </div>
              <div>
                <Link
                  to={item.link}
                  style={{
                    fontSize: '12.5px',
                    fontWeight: 600,
                    color: 'var(--pine)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    borderBottom: '1px solid var(--pine)',
                    paddingBottom: '2px',
                  }}
                >
                  {item.linkText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
