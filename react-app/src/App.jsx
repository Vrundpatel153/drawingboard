import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Insights from './pages/Insights';
import Services from './pages/Services';
import Studio from './pages/Studio';
import Work from './pages/Work';
import WorkDetail from './pages/WorkDetail';
import ServiceDetail from './pages/ServiceDetail';
import BrandingPage from './pages/BrandingPage';
import PackagingPage from './pages/PackagingPage';
import DevelopmentPage from './pages/DevelopmentPage';
import Contact from './pages/Contact';
import BlogDetail from './pages/BlogDetail';
import LegalDetail from './pages/LegalDetail';
import Admin from './pages/Admin';
import ThankYou from './pages/ThankYou';
import SmoothScroll from './components/SmoothScroll';
import PageTransition from './components/PageTransition';
import WhatsAppButton from './components/WhatsAppButton';
import Preloader from './components/Preloader';
import PWAInstallBanner from './components/PWAInstallBanner';
import GlobalCTAInterceptor from './components/GlobalCTAInterceptor';
import useAnalytics from './hooks/useAnalytics';
import useSEO from './hooks/useSEO';
import usePWA from './hooks/usePWA';

/* ── RouterAnalytics must live inside <Router> to access location context ── */
function RouterAnalytics() {
  useAnalytics(); // GA4 + GTM tracking on every route change
  useSEO();       // Default SEO for routes that don't call useSEO themselves
  return null;
}

export default function App() {
  const [loading, setLoading] = useState(true);

  // Register PWA / Service Worker
  const { promptInstall } = usePWA();

  const handlePreloaderComplete = () => {
    setLoading(false);
  };

  if (loading) {
    return <Preloader onComplete={handlePreloaderComplete} />;
  }

  return (
    <Router>
      <RouterAnalytics />
      <GlobalCTAInterceptor />
      <SmoothScroll>
        <PageTransition>
          <div id="main">
            <Routes>
              <Route path="/" element={<Home />} />

              {/* Studio / About routes */}
              <Route path="/studio" element={<Studio />} />
              <Route path="/about" element={<Studio />} />
              <Route path="/studio/*" element={<Studio />} />

              {/* Work routes */}
              <Route path="/work" element={<Work />} />
              <Route path="/works" element={<Work />} />
              <Route path="/work/:projectId" element={<WorkDetail />} />
              <Route path="/works/:projectId" element={<WorkDetail />} />

              {/* Services routes */}
              <Route path="/services" element={<Services />} />
              <Route path="/service" element={<Services />} />
              {/* Dedicated Branding page */}
              <Route path="/services/branding" element={<BrandingPage />} />
              <Route path="/service/branding" element={<BrandingPage />} />
              {/* Dedicated Packaging page */}
              <Route path="/services/packaging-design" element={<PackagingPage />} />
              <Route path="/service/packaging-design" element={<PackagingPage />} />
              <Route path="/services/packaging" element={<PackagingPage />} />
              <Route path="/service/packaging" element={<PackagingPage />} />
              {/* Dedicated Development page */}
              <Route path="/services/development" element={<DevelopmentPage />} />
              <Route path="/service/development" element={<DevelopmentPage />} />
              <Route path="/services/web-development" element={<DevelopmentPage />} />
              <Route path="/service/web-development" element={<DevelopmentPage />} />
              <Route path="/services/:serviceId" element={<ServiceDetail />} />
              <Route path="/service/:serviceId" element={<ServiceDetail />} />

              {/* Insights / Blog routes */}
              <Route path="/insights" element={<Insights />} />
              <Route path="/blog" element={<Insights />} />
              <Route path="/insights/:blogId" element={<BlogDetail />} />
              <Route path="/blog/:blogId" element={<BlogDetail />} />

              {/* Contact route */}
              <Route path="/contact" element={<Contact />} />

              {/* Thank You page */}
              <Route path="/thank-you" element={<ThankYou />} />

              {/* Legal routes */}
              <Route path="/legal/:legalId" element={<LegalDetail />} />

              {/* Secret Admin Route */}
              <Route path="/admin" element={<Admin />} />

              {/* Catch-all redirect to Home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <WhatsAppButton />
          </div>
        </PageTransition>
      </SmoothScroll>

      {/* PWA Install Banner — slides up on homepage after 3s, first visit only */}
      <PWAInstallBanner promptInstall={promptInstall} />
    </Router>
  );
}
