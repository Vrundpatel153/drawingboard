import React, { useEffect } from 'react';
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
import { injectArrowIcons } from './utils/framerPageUtils';

// A wrapper component to run DOM fixes globally on every route change
function PageFixWrapper({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Run the DOM fixes immediately and after short delays (to handle dynamic dangerouslySetInnerHTML rendering)
    const runFixes = () => {
      injectArrowIcons();
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

    // Global click handler to intercept relative Framer links and route them as SPA
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

      window.scrollTo(0, 0);
      navigate(target);
    };

    document.addEventListener('click', handleLinkClick);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      document.removeEventListener('click', handleLinkClick);
    };
  }, [location, navigate]);

  return children;
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
