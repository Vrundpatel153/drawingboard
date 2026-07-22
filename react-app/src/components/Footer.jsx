import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
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
