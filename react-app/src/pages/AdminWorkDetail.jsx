import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Renders an admin-created work page with the same visual layout
 * as the Framer-exported work pages. Sections with empty content
 * are completely omitted from the DOM.
 */
export default function AdminWorkDetail({ work }) {
  const navigate = useNavigate();

  const hasIntro = work.introduction?.trim();
  const hasDetails = work.services?.trim() || work.client?.trim() || work.year?.trim() || work.timeline?.trim();
  const hasCredits = work.credits?.some(c => c.role?.trim() || c.name?.trim());
  const hasChallenge = work.challengeTitle?.trim() || work.challengeDesc?.trim() || work.challengeBullets?.some(b => b?.trim());
  const hasSolution = work.solutionTitle?.trim() || work.solutionDesc?.trim();
  const hasOutcome = work.outcomeTitle?.trim() || work.outcomeDesc?.trim();
  const hasTestimonial = work.testimonialQuote?.trim();
  const hasGallery = work.galleryImages?.some(g => g?.trim());

  const servicesList = work.services ? work.services.split(',').map(s => s.trim()).filter(Boolean) : [];

  const handleClick = (e) => {
    const anchor = e.target.closest('a');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (!href || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http') || href.startsWith('#')) return;
    e.preventDefault();
    let target = href;
    if (target.startsWith('.')) target = target.substring(1);
    if (!target.startsWith('/')) target = '/' + target;
    if (target === '/about') target = '/studio';
    else if (target === '/blog') target = '/insights';
    window.scrollTo(0, 0);
    navigate(target);
  };

  return (
    <div className="awd-page" onClick={handleClick}>
      {/* NAV BAR */}
      <nav className="awd-nav">
        <div className="awd-nav-inner">
          <a href="/" className="awd-logo">The Drawing Board</a>
          <div className="awd-nav-links">
            <a href="/">Home</a>
            <a href="/studio">Studio</a>
            <a href="/work">Works</a>
            <a href="/service">Services</a>
            <a href="/insights">Insights</a>
          </div>
          <a href="/contact" className="awd-contact-btn">
            <span>Contact</span>
            <span className="awd-contact-arrow">↗</span>
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="awd-hero">
        <h1 className="awd-hero-title">{work.title}</h1>
        {work.heroImage && (
          <div className="awd-hero-img-wrap">
            <img src={work.heroImage} alt={work.title} className="awd-hero-img" />
          </div>
        )}
      </section>

      {/* INTRODUCTION */}
      {hasIntro && (
        <section className="awd-section awd-intro">
          <div className="awd-section-inner">
            <span className="awd-label">Introduction</span>
            <p className="awd-intro-text">{work.introduction}</p>
          </div>
        </section>
      )}

      {/* DETAILS + CREDITS */}
      {(hasDetails || hasCredits) && (
        <section className="awd-section awd-details-section">
          <div className="awd-details-grid">
            {hasDetails && (
              <div className="awd-details-block">
                <span className="awd-label">Details</span>
                <div className="awd-details-table">
                  {servicesList.length > 0 && (
                    <div className="awd-detail-row">
                      <span className="awd-detail-key">Services :</span>
                      <span className="awd-detail-value">
                        {servicesList.map((s, i) => (
                          <span key={i}>
                            {i > 0 && <span className="awd-detail-slash"> / </span>}
                            {s}
                          </span>
                        ))}
                      </span>
                    </div>
                  )}
                  {work.client?.trim() && (
                    <div className="awd-detail-row">
                      <span className="awd-detail-key">Client :</span>
                      <span className="awd-detail-value">{work.client}</span>
                    </div>
                  )}
                  {work.year?.trim() && (
                    <div className="awd-detail-row">
                      <span className="awd-detail-key">Year :</span>
                      <span className="awd-detail-value">{work.year}</span>
                    </div>
                  )}
                  {work.timeline?.trim() && (
                    <div className="awd-detail-row">
                      <span className="awd-detail-key">Timeline :</span>
                      <span className="awd-detail-value">{work.timeline}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
            {hasCredits && (
              <div className="awd-credits-block">
                <span className="awd-label">Credits</span>
                <div className="awd-details-table">
                  {work.credits.filter(c => c.role?.trim() || c.name?.trim()).map((credit, i) => (
                    <div key={i} className="awd-detail-row">
                      <span className="awd-detail-key">{credit.role} :</span>
                      <span className="awd-detail-value">{credit.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* GALLERY */}
      {hasGallery && (
        <section className="awd-section awd-gallery">
          <div className="awd-gallery-grid">
            {work.galleryImages.filter(g => g?.trim()).map((img, i) => (
              <div key={i} className="awd-gallery-item">
                <img src={img} alt={`${work.title} gallery ${i + 1}`} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* THE CHALLENGE */}
      {hasChallenge && (
        <section className="awd-section awd-challenge">
          <div className="awd-section-inner">
            <span className="awd-label">The Challenge</span>
            {work.challengeTitle?.trim() && <h2 className="awd-section-heading">{work.challengeTitle}</h2>}
            {work.challengeDesc?.trim() && <p className="awd-section-text">{work.challengeDesc}</p>}
            {work.challengeBullets?.filter(b => b?.trim()).length > 0 && (
              <ul className="awd-bullet-list">
                {work.challengeBullets.filter(b => b?.trim()).map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {/* OUR SOLUTION */}
      {hasSolution && (
        <section className="awd-section awd-solution">
          <div className="awd-section-inner">
            <span className="awd-label">Our Solution</span>
            {work.solutionTitle?.trim() && <h2 className="awd-section-heading">{work.solutionTitle}</h2>}
            {work.solutionDesc?.trim() && <p className="awd-section-text">{work.solutionDesc}</p>}
          </div>
        </section>
      )}

      {/* THE OUTCOME */}
      {hasOutcome && (
        <section className="awd-section awd-outcome">
          <div className="awd-section-inner">
            <span className="awd-label">The Outcome</span>
            {work.outcomeTitle?.trim() && <h2 className="awd-section-heading">{work.outcomeTitle}</h2>}
            {work.outcomeDesc?.trim() && <p className="awd-section-text">{work.outcomeDesc}</p>}
          </div>
        </section>
      )}

      {/* TESTIMONIAL */}
      {hasTestimonial && (
        <section className="awd-section awd-testimonial">
          <div className="awd-section-inner">
            <blockquote className="awd-quote">{work.testimonialQuote}</blockquote>
            {(work.testimonialAuthor?.trim() || work.testimonialRole?.trim()) && (
              <div className="awd-quote-author">
                {work.testimonialAuthor?.trim() && <span className="awd-quote-name">{work.testimonialAuthor}</span>}
                {work.testimonialRole?.trim() && <span className="awd-quote-role">{work.testimonialRole}</span>}
              </div>
            )}
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="awd-footer">
        <div className="awd-footer-inner">
          <div className="awd-footer-cta">
            <p className="awd-footer-tagline">Bold ideas, beautifully executed. We create brands, websites, and visual content that move businesses forward.</p>
            <a href="/contact" className="awd-footer-btn">Book a 15-min call</a>
          </div>
          <div className="awd-footer-grid">
            <div className="awd-footer-col">
              <h4>Sitemap</h4>
              <a href="/">Home</a>
              <a href="/studio">About</a>
              <a href="/service">Services</a>
              <a href="/work">Work</a>
              <a href="/insights">Blog</a>
              <a href="/contact">Contact</a>
            </div>
            <div className="awd-footer-col">
              <h4>Services</h4>
              <a href="/service/branding">Branding</a>
              <a href="/service/packaging-design">Packaging Design</a>
              <a href="/service/ui-ux-design">UI Ux Design</a>
              <a href="/service/development">Web Development</a>
            </div>
            <div className="awd-footer-col">
              <h4>Connect</h4>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">Linkedin</a>
              <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer">Dribbble</a>
              <a href="mailto:hello@catchup.com">Email Us</a>
            </div>
          </div>
          <div className="awd-footer-bottom">
            <span>© The Drawing Board 2025. All rights reserved.</span>
            <div className="awd-footer-legal">
              <a href="/legal/terms-of-service">Terms of Service</a>
              <a href="/legal/privacy-policy">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
