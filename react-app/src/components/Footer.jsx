import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MAILTO_URL } from '../utils/siteConfig';

gsap.registerPlugin(ScrollTrigger);


export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    if (!footerRef.current) return;
    const ctx = gsap.context(() => {
      const cols = footerRef.current.querySelectorAll('.foot-brand, .foot-col');
      gsap.fromTo(cols,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0,
          duration: 0.7, ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 92%',
            toggleActions: 'play none none none',
          }
        }
      );
      const bottom = footerRef.current.querySelector('.foot-bottom');
      if (bottom) {
        gsap.fromTo(bottom,
          { opacity: 0 },
          {
            opacity: 1, duration: 0.7, ease: 'power1.out', delay: 0.45,
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 92%',
              toggleActions: 'play none none none',
            }
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef}>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <Link to="/" className="foot-logo-link" aria-label="The Drawing Board Home">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="28 138 290 56" className="foot-logo-svg" style={{ height: '42px', width: 'auto', display: 'block' }}>
                <rect x="30.445" y="142.642" fill="#A19071" width="44.42" height="25.732"/>
                <rect x="30.445" y="159.392" fill="#A19071" width="22.685" height="30.341"/>
                <text transform="matrix(1 0 0 1 78.917 167.3428)" fill="#A19071" font-family="'Constantia', 'Fraunces', serif" font-size="22.8942">THE DRAWING BOARD</text>
                <text transform="matrix(1 0 0 1 148.7827 187.6387)" fill="#A19071" font-family="'Inter', 'IBM Plex Mono', sans-serif" font-size="11.0941" letter-spacing="1px" opacity="0.9">CREATIVE AGENCY</text>
              </svg>
            </Link>
            <p>Independent Brand, Web &amp; Packaging Design Engineering Studio.</p>
          </div>
          <div className="foot-col">
            <h5>Navigation</h5>
            <Link to="/">Home</Link>
            <Link to="/studio">Studio</Link>
            <Link to="/work">Work</Link>
            <Link to="/services">Services</Link>
            <Link to="/insights">Insights</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="foot-col">
            <h5>Selected Work</h5>
            <Link to="/work/after8">AFTER8® Wellness</Link>
            <Link to="/work/lumen">Lumen &amp; Co.</Link>
            <Link to="/work/alder---outdoor-essentials-built-for-slower-movement">Alder Essentials</Link>
            <Link to="/work/krona-architecture-studio">Krona Architecture</Link>
          </div>
          <div className="foot-col">
            <h5>Connect</h5>
            <a href="https://cal.com/dandelion-nrvrze" target="_blank" rel="noopener noreferrer">
              Book a Call
            </a>
            <a href={MAILTO_URL}>Email Studio</a>
            <a href="https://twitter.com/thedrawingboard" target="_blank" rel="noopener noreferrer">Twitter / X</a>
            <a href="https://linkedin.com/company/thedrawingboard" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
        <div className="foot-bottom">
          <span>&copy; 2026 The Drawing Board Studio. All rights reserved.</span>
          <span>Architectural Blueprint Editorial System</span>
        </div>
      </div>
    </footer>
  );
}

