import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegistrationMarks from '../components/RegistrationMarks';
import ArrowIcon from '../components/ArrowIcon';
import { usePageAnimations } from '../hooks/usePageAnimations';

export default function ThankYou() {
  const pageRef = useRef(null);
  usePageAnimations(pageRef);

  return (
    <>
      <div ref={pageRef}>
        <style>{`
          .thankyou-section {
            min-height: calc(100vh - 160px);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 100px 24px;
            text-align: center;
            position: relative;
          }

          .thankyou-tag {
            font-family: 'IBM Plex Mono', monospace;
            font-size: 10.5px;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: var(--marker);
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
          }

          .thankyou-tag::before,
          .thankyou-tag::after {
            content: '';
            display: block;
            width: 32px;
            height: 1px;
            background: var(--marker);
          }

          .thankyou-check {
            width: 64px;
            height: 64px;
            background: var(--pine);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 32px;
            box-shadow: 0 0 0 12px rgba(42, 92, 69, 0.1);
            animation: ty-pulse 2s ease-in-out infinite;
          }

          @keyframes ty-pulse {
            0%, 100% { box-shadow: 0 0 0 12px rgba(42, 92, 69, 0.1); }
            50% { box-shadow: 0 0 0 20px rgba(42, 92, 69, 0.05); }
          }

          .thankyou-check svg {
            width: 28px;
            height: 28px;
            stroke: #fff;
          }

          .thankyou-h1 {
            font-family: 'Fraunces', serif;
            font-size: clamp(36px, 6vw, 64px);
            font-weight: 600;
            color: var(--ink);
            line-height: 1.1;
            margin-bottom: 20px;
            letter-spacing: -0.01em;
          }

          .thankyou-h1 em {
            font-style: italic;
            color: var(--pine);
          }

          .thankyou-p {
            font-size: 17px;
            color: var(--ink-soft);
            line-height: 1.65;
            max-width: 540px;
            margin: 0 auto 40px;
          }

          .thankyou-cta-row {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 16px;
            flex-wrap: wrap;
            margin-bottom: 72px;
          }

          .thankyou-divider {
            width: 100%;
            max-width: 600px;
            margin: 0 auto 48px;
            border: none;
            border-top: 1px dashed var(--paper-line);
          }

          .thankyou-next-label {
            font-family: 'IBM Plex Mono', monospace;
            font-size: 10.5px;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: var(--marker);
            margin-bottom: 24px;
          }

          .thankyou-links {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 24px;
            flex-wrap: wrap;
          }

          .thankyou-link {
            font-size: 14px;
            color: var(--ink);
            text-decoration: none;
            border-bottom: 1px solid var(--paper-line);
            padding-bottom: 2px;
            transition: color 0.2s, border-color 0.2s;
          }

          .thankyou-link:hover {
            color: var(--pine);
            border-color: var(--pine);
          }

          .ty-watermark {
            position: absolute;
            bottom: 32px;
            left: 50%;
            transform: translateX(-50%);
            font-family: 'IBM Plex Mono', monospace;
            font-size: 10px;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: rgba(27, 27, 23, 0.18);
            white-space: nowrap;
          }
        `}</style>

        <RegistrationMarks />
        <Navbar />

        <section className="thankyou-section">
          {/* Pulse Check Icon */}
          <div className="thankyou-check">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <div className="thankyou-tag">Message Sent</div>

          <h1 className="thankyou-h1">
            We'll be in touch<br />
            <em>very soon.</em>
          </h1>

          <p className="thankyou-p">
            Thank you for reaching out to The Drawing Board. Your message has landed — we typically respond within one business day. In the meantime, explore our work or read more about our process.
          </p>

          <div className="thankyou-cta-row">
            <Link to="/work" className="btn-primary">
              Explore Our Work <ArrowIcon />
            </Link>
            <Link to="/" className="btn-link">
              Return Home <ArrowIcon size={13} />
            </Link>
          </div>

          <hr className="thankyou-divider" />

          <div className="thankyou-next-label">// While you wait</div>
          <div className="thankyou-links">
            <Link to="/services/branding" className="thankyou-link">Branding Services</Link>
            <Link to="/services/packaging-design" className="thankyou-link">Packaging Design</Link>
            <Link to="/services/development" className="thankyou-link">Web Development</Link>
            <Link to="/studio" className="thankyou-link">About the Studio</Link>
            <Link to="/insights" className="thankyou-link">Read Our Insights</Link>
          </div>

          <div className="ty-watermark">THE DRAWING BOARD — CREATIVE AGENCY</div>
        </section>

        <Footer />
      </div>
    </>
  );
}
