import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import usePWA from '../hooks/usePWA';

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/studio', label: 'Studio' },
  { to: '/work', label: 'Work' },
  { to: '/services', label: 'Services' },
  { to: '/insights', label: 'Insights' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  const lastY = useRef(0);
  const hidden = useRef(false);
  const location = useLocation();
  const { promptInstall } = usePWA();

  const handleAddToHomeScreen = async () => {
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    if (isIOS) {
      alert("To add The Drawing Board to your Home Screen:\n\n1. Tap the Share icon (at bottom of Safari)\n2. Scroll down and select 'Add to Home Screen' ➕");
      return;
    }
    const outcome = await promptInstall();
    if (outcome === 'accepted') {
      setOpen(false);
    } else if (!outcome) {
      alert("To add to your Home Screen:\n\nOpen your browser menu (⋮ or Share) and select 'Add to Home Screen' or 'Install App'.");
    }
  };

  // Close on route change
  useEffect(() => { setOpen(false); }, [location.pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Scroll-aware hide/show (desktop only)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (window.innerWidth > 768) {
        if (y > lastY.current + 8 && y > 80 && !hidden.current) {
          hidden.current = true;
          gsap.to(headerRef.current, { y: '-100%', duration: 0.28, ease: 'power2.inOut' });
        } else if (y < lastY.current - 8 && hidden.current) {
          hidden.current = false;
          gsap.to(headerRef.current, { y: '0%', duration: 0.28, ease: 'power2.out' });
        }
      }
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Entrance animation
  useEffect(() => {
    gsap.fromTo(headerRef.current,
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out', delay: 0.1 }
    );
  }, []);

  return (
    <>
      {/* ── Main sticky header ── */}
      <header ref={headerRef}>
        <div className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
          <Link to="/" className="logo-mark" onClick={() => setOpen(false)} aria-label="The Drawing Board Home">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="28 138 290 56" className="nav-full-logo-svg" style={{ height: '34px', width: 'auto', display: 'block' }}>
              <rect x="30.445" y="142.642" fill="#A19071" width="44.42" height="25.732"/>
              <rect x="30.445" y="159.392" fill="#A19071" width="22.685" height="30.341"/>
              <text transform="matrix(1 0 0 1 78.917 167.3428)" fill="var(--ink)" font-family="'Constantia', 'Fraunces', serif" font-size="22.8942">THE DRAWING BOARD</text>
              <text transform="matrix(1 0 0 1 148.7827 187.6387)" fill="#A19071" font-family="'Inter', 'IBM Plex Mono', sans-serif" font-size="11.0941" letter-spacing="1px" opacity="0.9">CREATIVE AGENCY</text>
            </svg>
          </Link>

          <nav className="navlinks" aria-label="Main navigation">
            {NAV_LINKS.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end}
                className={({ isActive }) => isActive ? 'active' : undefined}>
                {label}
              </NavLink>
            ))}
          </nav>

          <a
            className="nav-cta"
            href="https://cal.com/dandelion-nrvrze"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a call
          </a>

          <button
            className={`hamburger${open ? ' hamburger--open' : ''}`}
            onClick={() => setOpen(v => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* ── Full-screen mobile drawer ── */}
      <div
        id="mobile-nav"
        className={`mobile-nav${open ? ' mobile-nav--open' : ''}`}
        aria-hidden={!open}
        role="dialog"
        aria-modal="true"
      >
        {/* Drawer header */}
        <div className="mobile-nav__head">
          <Link to="/" className="logo-mark" onClick={() => setOpen(false)} aria-label="The Drawing Board Home">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="28 138 290 56" className="nav-full-logo-svg" style={{ height: '32px', width: 'auto', display: 'block' }}>
              <rect x="30.445" y="142.642" fill="#A19071" width="44.42" height="25.732"/>
              <rect x="30.445" y="159.392" fill="#A19071" width="22.685" height="30.341"/>
              <text transform="matrix(1 0 0 1 78.917 167.3428)" fill="var(--ink)" font-family="'Constantia', 'Fraunces', serif" font-size="22.8942">THE DRAWING BOARD</text>
              <text transform="matrix(1 0 0 1 148.7827 187.6387)" fill="#A19071" font-family="'Inter', 'IBM Plex Mono', sans-serif" font-size="11.0941" letter-spacing="1px" opacity="0.9">CREATIVE AGENCY</text>
            </svg>
          </Link>
          <button
            className="mobile-nav__close"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="16" y1="4" x2="4" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Drawer links */}
        <nav className="mobile-nav__links">
          {NAV_LINKS.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end}
              className={({ isActive }) => isActive ? 'active' : undefined}
              onClick={() => setOpen(false)}>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Drawer CTA */}
        <div className="mobile-nav__foot">
          <a
            href="https://cal.com/dandelion-nrvrze"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            onClick={() => setOpen(false)}
          >
            Book a 15-min call →
          </a>

          {/* Mobile Burger Menu Add to Home Screen Option */}
          <div className="mobile-pwa-item" onClick={handleAddToHomeScreen} role="button" tabIndex={0}>
            <div className="mobile-pwa-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                <line x1="12" y1="18" x2="12.01" y2="18"></line>
              </svg>
            </div>
            <div className="mobile-pwa-text">
              <span className="mobile-pwa-title">Add to Home Screen</span>
              <span className="mobile-pwa-sub">Get instant access — no browser required</span>
            </div>
          </div>

          <p className="mono" style={{ fontSize: '11px', color: 'var(--ink-soft)', marginTop: '16px' }}>
            THE DRAWING BOARD // INDEPENDENT STUDIO
          </p>
        </div>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="mobile-nav__backdrop"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
