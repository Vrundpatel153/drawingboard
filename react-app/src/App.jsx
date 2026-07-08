import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Insights from './pages/Insights';
import Services from './pages/Services';
import Studio from './pages/Studio';
import Work from './pages/Work';
import WorkDetail from './pages/WorkDetail';
import ServiceDetail from './pages/ServiceDetail';
import Contact from './pages/Contact';
import WhatsAppButton from './components/WhatsAppButton';
import BlogDetail from './pages/BlogDetail';
import LegalDetail from './pages/LegalDetail';
import Admin from './pages/Admin';
import { injectArrowIcons, initMobileMenu } from './utils/framerPageUtils';
import gsap from 'gsap';

// A wrapper component to run DOM fixes globally on every route change
function PageFixWrapper({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const lastPathname = useRef(location.pathname);

  useEffect(() => {
    // Run the DOM fixes immediately and after short delays (to handle dynamic dangerouslySetInnerHTML rendering)
    const runFixes = () => {
      injectArrowIcons();
      initMobileMenu(navigate);
      // Also bind hover states globally
      try {
        const bindHover = (el) => {
          el.addEventListener('mouseenter', () => { el.classList.add('hover'); });
          el.addEventListener('mouseleave', () => { el.classList.remove('hover'); });
        };
        document.querySelectorAll('[class*=" framer-v-"],[class^="framer-v-"]').forEach(bindHover);
      } catch (e) {
        console.error("Global hover bind error:", e);
      }
    };

    runFixes();
    const t1 = setTimeout(runFixes, 100);
    const t2 = setTimeout(runFixes, 300);
    const t3 = setTimeout(runFixes, 600);

    // Global click handler to intercept relative Framer links and route them as SPA with transition
    const handleLinkClick = (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Skip mailto, tel, absolute http links, and hashes
      if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http') || href.startsWith('#')) {
        return;
      }

      e.preventDefault();
      let target = href;

      // Normalize path
      if (target.startsWith('.')) {
        target = target.substring(1);
      }
      if (!target.startsWith('/')) {
        target = '/' + target;
      }
      if (target === '/index.html') {
        target = '/';
      }

      // Map dynamic paths correctly
      if (target === '/about') {
        target = '/studio';
      } else if (target === '/blog') {
        target = '/insights';
      } else if (target === '/works') {
        target = '/work';
      }

      // Trigger curtain slide-in transition
      const curtain = document.getElementById('page-transition-curtain');
      const logo = document.getElementById('curtain-logo');
      
      if (curtain && logo) {
        gsap.killTweensOf([curtain, logo]);
        gsap.set(curtain, { display: 'flex', y: '100%', pointerEvents: 'all' });
        gsap.set(logo, { opacity: 0, scale: 0.8 });
        
        const tl = gsap.timeline();
        
        // Slide in
        tl.to(curtain, {
          y: '0%',
          duration: 0.4,
          ease: 'power3.out'
        });
        
        // Fade in logo
        tl.to(logo, {
          opacity: 1,
          scale: 1,
          duration: 0.25,
          ease: 'back.out(1.5)'
        }, '-=0.2');
        
        // Update route and scroll when curtain covers screen
        tl.add(() => {
          window.scrollTo(0, 0);
          navigate(target);
          lastPathname.current = target;
        });
        
        // Slide out
        tl.to(curtain, {
          y: '-100%',
          duration: 0.45,
          ease: 'power3.inOut',
          delay: 0.15 // small delay for page styles to load
        });
        
        tl.to(logo, {
          opacity: 0,
          scale: 0.9,
          duration: 0.2,
          ease: 'power2.in'
        }, '-=0.45');
        
        tl.set(curtain, { display: 'none', pointerEvents: 'none' });
      } else {
        window.scrollTo(0, 0);
        navigate(target);
      }
    };

    document.addEventListener('click', handleLinkClick);

    // Fallback animation for direct/popstate route changes (back/forward buttons)
    if (lastPathname.current !== location.pathname) {
      lastPathname.current = location.pathname;
      const curtain = document.getElementById('page-transition-curtain');
      if (curtain && window.getComputedStyle(curtain).display === 'none') {
        gsap.killTweensOf(curtain);
        gsap.set(curtain, { display: 'flex', y: '0%', opacity: 1, pointerEvents: 'all' });
        gsap.to(curtain, {
          opacity: 0,
          duration: 0.4,
          ease: 'power2.out',
          onComplete: () => {
            gsap.set(curtain, { display: 'none', pointerEvents: 'none', y: '100%', opacity: 1 });
          }
        });
      }
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      document.removeEventListener('click', handleLinkClick);
    };
  }, [location, navigate]);

  return (
    <>
      <div id="page-transition-curtain" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgb(29, 3, 86)',
        zIndex: 999999,
        display: 'none',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'none'
      }}>
        <div id="curtain-logo" style={{
          fontFamily: "'Podjog Black', sans-serif",
          fontWeight: 900,
          fontSize: '36px',
          color: '#ffffff',
          letterSpacing: '-0.07px',
          textShadow: '0 0 25px rgba(255,255,255,0.45)',
          opacity: 0,
          transform: 'scale(0.8)'
        }}>
          The Drawing Board
        </div>
      </div>
      {children}
    </>
  );
}

function App() {
  return (
    <Router>
      <PageFixWrapper>
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<Home />} />
          
          {/* Studio Routes */}
          <Route path="/studio" element={<Studio />} />
          <Route path="/about" element={<Navigate to="/studio" replace />} />
          
          {/* Works Routes */}
          <Route path="/work" element={<Work />} />
          <Route path="/work/:projectId" element={<WorkDetail />} />
          <Route path="/works" element={<Navigate to="/work" replace />} />
          
          {/* Services Routes */}
          <Route path="/service" element={<Services />} />
          <Route path="/service/:serviceId" element={<ServiceDetail />} />
          <Route path="/services" element={<Navigate to="/service" replace />} />
          
          {/* Insights Routes */}
          <Route path="/insights" element={<Insights />} />
          <Route path="/blog" element={<Navigate to="/insights" replace />} />
          <Route path="/blog/:blogId" element={<BlogDetail />} />

          {/* Legal Routes */}
          <Route path="/legal/:legalId" element={<LegalDetail />} />

          {/* Contact Route */}
          <Route path="/contact" element={<Contact />} />

          {/* Admin Route */}
          <Route path="/admin" element={<Admin />} />

          {/* Fallback to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </PageFixWrapper>
      <WhatsAppButton />
    </Router>
  );
}

export default App;
