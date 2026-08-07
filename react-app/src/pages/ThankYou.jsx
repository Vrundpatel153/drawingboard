import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegistrationMarks from '../components/RegistrationMarks';
import ArrowIcon from '../components/ArrowIcon';
import { usePageAnimations } from '../hooks/usePageAnimations';

export default function ThankYou() {
  const pageRef   = useRef(null);
  const canvasRef = useRef(null);
  usePageAnimations(pageRef);

  // ── Smooth celebration particle burst once on mount ────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle colors matching studio palette: Golden, Pine, Terracotta, Ink
    const colors = ['#A19071', '#2A5C45', '#B8412E', '#1B1B17', '#C9C3B4'];

    // Spawn 70 celebration particles starting around center-top
    const particles = Array.from({ length: 70 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 3;
      return {
        x: width / 2 + (Math.random() - 0.5) * 120,
        y: height * 0.35 + (Math.random() - 0.5) * 80,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4, // initial upward thrust
        size: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.2,
        opacity: 1,
        life: 0,
        maxLife: Math.random() * 120 + 120, // 2-4s duration
        shape: Math.random() > 0.5 ? 'rect' : 'circle',
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      let activeCount = 0;

      particles.forEach((p) => {
        if (p.life >= p.maxLife) return;
        activeCount++;

        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12; // soft gravity
        p.vx *= 0.98; // air resistance
        p.rotation += p.vRot;

        // Fade out during the last 30% of lifespan
        const fadeStart = p.maxLife * 0.7;
        if (p.life > fadeStart) {
          p.opacity = 1 - (p.life - fadeStart) / (p.maxLife - fadeStart);
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;

        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      if (activeCount > 0) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

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
            padding: 80px 24px 100px;
            text-align: center;
            position: relative;
          }

          .thankyou-badge-top {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            font-family: 'IBM Plex Mono', monospace;
            font-size: 11px;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            color: #A19071;
            background: rgba(161, 144, 113, 0.08);
            border: 1px solid rgba(161, 144, 113, 0.3);
            padding: 8px 18px;
            border-radius: 40px;
            margin-bottom: 24px;
          }

          .thankyou-check {
            width: 72px;
            height: 72px;
            background: var(--pine);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 28px;
            box-shadow: 0 0 0 14px rgba(42, 92, 69, 0.12);
            animation: ty-pulse 2.2s ease-in-out infinite;
          }

          @keyframes ty-pulse {
            0%, 100% { box-shadow: 0 0 0 14px rgba(42, 92, 69, 0.12); }
            50% { box-shadow: 0 0 0 24px rgba(42, 92, 69, 0.04); }
          }

          .thankyou-check svg {
            width: 32px;
            height: 32px;
            stroke: #fff;
          }

          .thankyou-main-title {
            font-family: 'Fraunces', serif;
            font-size: clamp(38px, 6vw, 68px);
            font-weight: 600;
            color: var(--ink);
            line-height: 1.08;
            margin-bottom: 16px;
            letter-spacing: -0.015em;
          }

          .thankyou-main-title em {
            font-style: italic;
            color: var(--pine);
          }

          .thankyou-sub {
            font-size: 17.5px;
            color: var(--ink-soft);
            line-height: 1.65;
            max-width: 560px;
            margin: 0 auto 40px;
          }

          .thankyou-cta-row {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 16px;
            flex-wrap: wrap;
            margin-bottom: 64px;
          }

          .thankyou-divider {
            width: 100%;
            max-width: 580px;
            margin: 0 auto 40px;
            border: none;
            border-top: 1px dashed var(--paper-line);
          }

          .thankyou-next-label {
            font-family: 'IBM Plex Mono', monospace;
            font-size: 10.5px;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: var(--marker);
            margin-bottom: 20px;
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

          .ty-canvas {
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: 999;
          }
        `}</style>

        {/* Celebration Particle Canvas */}
        <canvas ref={canvasRef} className="ty-canvas" />

        <RegistrationMarks />
        <Navbar />

        <section className="thankyou-section">
          {/* Prominent THANK YOU top badge */}
          <div className="thankyou-badge-top">
            <span style={{ width: '6px', height: '6px', background: '#A19071', borderRadius: '50%' }}></span>
            <span>THANK YOU // SHEET 05</span>
          </div>

          {/* Animated check circle */}
          <div className="thankyou-check">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h1 className="thankyou-main-title">
            Thank you, your message<br />
            <em>is on its way.</em>
          </h1>

          <p className="thankyou-sub">
            Your inquiry or booking has been received. Our senior studio team will review your specs and reach out within 24 hours. In the meantime, feel free to explore our case studies.
          </p>

          <div className="thankyou-cta-row">
            <Link to="/work" className="btn-primary">
              Explore Our Work <ArrowIcon />
            </Link>
            <Link to="/" className="btn-link">
              Return to Homepage <ArrowIcon size={13} />
            </Link>
          </div>

          <hr className="thankyou-divider" />

          <div className="thankyou-next-label">// Explore Studio Disciplines</div>
          <div className="thankyou-links">
            <Link to="/services/branding" className="thankyou-link">Branding Services</Link>
            <Link to="/services/packaging-design" className="thankyou-link">Packaging Design</Link>
            <Link to="/services/development" className="thankyou-link">Web Development</Link>
            <Link to="/studio" className="thankyou-link">About the Studio</Link>
            <Link to="/insights" className="thankyou-link">Read Our Insights</Link>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
