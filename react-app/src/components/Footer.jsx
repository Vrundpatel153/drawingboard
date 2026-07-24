import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
            <Link to="/" className="logo-mark">
              <div className="box"></div>The Drawing Board
            </Link>
            <p>Independent Brand, Web & Packaging Design Engineering Studio.</p>
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
            <Link to="/work/lumen">Lumen & Co.</Link>
            <Link to="/work">Verve Audio</Link>
            <Link to="/work">Kroma Coffee</Link>
          </div>
          <div className="foot-col">
            <h5>Connect</h5>
            <a href="https://cal.com/dandelion-nrvrze" target="_blank" rel="noopener noreferrer">
              Book a Call
            </a>
            <a href="mailto:hello@thedrawingboard.design">Email Studio</a>
            <a href="#">Twitter / X</a>
            <a href="#">LinkedIn</a>
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

