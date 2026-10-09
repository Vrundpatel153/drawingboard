import React from 'react';
import { Link } from 'react-router-dom';
import { MAILTO_URL, DISCUSS_URL } from '../utils/siteConfig';

export default function Footer() {
  return (
    <footer style={{ opacity: 1, visibility: 'visible', display: 'block' }}>
      <div className="wrap">
        <div className="foot-grid" style={{ opacity: 1, visibility: 'visible' }}>
          <div className="foot-brand" style={{ opacity: 1, visibility: 'visible' }}>
            <Link to="/" className="foot-logo-link" aria-label="The Drawing Board Home">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="25 138 320 56" className="foot-logo-svg" style={{ height: '34px', width: 'auto', display: 'block', maxWidth: '100%' }}>
                <rect x="30.445" y="142.642" fill="#A19071" width="44.42" height="25.732"/>
                <rect x="30.445" y="159.392" fill="#A19071" width="22.685" height="30.341"/>
                <text transform="matrix(1 0 0 1 78.917 167.3428)" fill="#A19071" fontFamily="'Constantia', 'Fraunces', serif" fontSize="22.8942">THE DRAWING BOARD</text>
                <text transform="matrix(1 0 0 1 148.7827 187.6387)" fill="#A19071" fontFamily="'Inter', 'IBM Plex Mono', sans-serif" fontSize="11.0941" letterSpacing="1px" opacity="0.9">CREATIVE AGENCY</text>
              </svg>
            </Link>
            <p>Independent Brand, Web &amp; Packaging Design Engineering Studio.</p>
          </div>
          <div className="foot-col" style={{ opacity: 1, visibility: 'visible' }}>
            <h5>Navigation</h5>
            <Link to="/">Home</Link>
            <Link to="/studio">Studio</Link>
            <Link to="/work">Work</Link>
            <Link to="/services">Services</Link>
            <Link to="/brand-readiness">Get Quote</Link>
            <Link to="/insights">Insights</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="foot-col" style={{ opacity: 1, visibility: 'visible' }}>
            <h5>Selected Work</h5>
            <Link to="/work/after8">AFTER8® Wellness</Link>
            <Link to="/work/lumen">Lumen &amp; Co.</Link>
            <Link to="/work/alder---outdoor-essentials-built-for-slower-movement">Alder Essentials</Link>
            <Link to="/work/krona-architecture-studio">Krona Architecture</Link>
          </div>
          <div className="foot-col" style={{ opacity: 1, visibility: 'visible' }}>
            <h5>Legal</h5>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-service">Terms &amp; Conditions</Link>
          </div>
          <div className="foot-col" style={{ opacity: 1, visibility: 'visible' }}>
            <h5>Connect</h5>
            <a href={DISCUSS_URL} target="_blank" rel="noopener noreferrer">
              Discuss Your Project
            </a>
            <a href={MAILTO_URL}>Email Studio</a>
            <a href="https://twitter.com/thedrawingboard" target="_blank" rel="noopener noreferrer">Twitter / X</a>
            <a href="https://linkedin.com/company/thedrawingboard" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
        <div className="foot-bottom" style={{ opacity: 1, visibility: 'visible' }}>
          <span>&copy; 2026 The Drawing Board Studio. All rights reserved.</span>
          <div className="foot-legal-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <span className="foot-sep">•</span>
            <Link to="/terms-of-service">Terms &amp; Conditions</Link>
          </div>
          <span>Architectural Blueprint Editorial System</span>
        </div>
      </div>
    </footer>
  );
}
