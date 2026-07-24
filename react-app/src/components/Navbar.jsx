import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import ArrowIcon from './ArrowIcon';
import gsap from 'gsap';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    if (!headerRef.current) return;
    gsap.fromTo(
      headerRef.current,
      { y: -64, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out', delay: 0.1 }
    );
  }, []);

  return (
    <header ref={headerRef}>
      <div className="nav">
        <Link to="/" className="logo-mark">
          <div className="box"></div>
          <span>The Drawing Board</span>
        </Link>
        <nav className="navlinks">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
          <NavLink to="/studio" className={({ isActive }) => (isActive ? 'active' : '')}>
            Studio
          </NavLink>
          <NavLink to="/work" className={({ isActive }) => (isActive ? 'active' : '')}>
            Work
          </NavLink>
          <NavLink to="/services" className={({ isActive }) => (isActive ? 'active' : '')}>
            Services
          </NavLink>
          <NavLink to="/insights" className={({ isActive }) => (isActive ? 'active' : '')}>
            Insights
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>
            Contact
          </NavLink>
        </nav>
        <a className="nav-cta desktop-only-cta" href="https://cal.com/dandelion-nrvrze" target="_blank" rel="noopener noreferrer">
          Book a 15-min call <ArrowIcon size={13} />
        </a>
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Navigation"
        >
          {mobileOpen ? '[ CLOSE ]' : '[ MENU ]'}
        </button>
      </div>
      <div className={`mobile-drawer ${mobileOpen ? 'open' : ''}`}>
        <NavLink to="/" end onClick={() => setMobileOpen(false)}>
          Home
        </NavLink>
        <NavLink to="/studio" onClick={() => setMobileOpen(false)}>
          Studio
        </NavLink>
        <NavLink to="/work" onClick={() => setMobileOpen(false)}>
          Work
        </NavLink>
        <NavLink to="/services" onClick={() => setMobileOpen(false)}>
          Services
        </NavLink>
        <NavLink to="/insights" onClick={() => setMobileOpen(false)}>
          Insights
        </NavLink>
        <NavLink to="/contact" onClick={() => setMobileOpen(false)}>
          Contact
        </NavLink>
        <a
          className="btn-primary"
          style={{ marginTop: '12px', textAlign: 'center', justifyContent: 'center' }}
          href="https://cal.com/dandelion-nrvrze"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMobileOpen(false)}
        >
          Book a 15-min call <ArrowIcon />
        </a>
      </div>
    </header>
  );
}
