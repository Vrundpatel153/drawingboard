import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Insights from './pages/Insights';
import Services from './pages/Services';
import Studio from './pages/Studio';
import Work from './pages/Work';
import WorkDetail from './pages/WorkDetail';
import ServiceDetail from './pages/ServiceDetail';
import Contact from './pages/Contact';
import BlogDetail from './pages/BlogDetail';
import LegalDetail from './pages/LegalDetail';
import Admin from './pages/Admin';
import SmoothScroll from './components/SmoothScroll';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  return (
    <Router>
      <SmoothScroll>
        <div id="main">
          <div id="page-wrapper">
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
              <Route path="/services/:serviceId" element={<ServiceDetail />} />
              <Route path="/service/:serviceId" element={<ServiceDetail />} />

              {/* Insights / Blog routes */}
              <Route path="/insights" element={<Insights />} />
              <Route path="/blog" element={<Insights />} />
              <Route path="/insights/:blogId" element={<BlogDetail />} />
              <Route path="/blog/:blogId" element={<BlogDetail />} />

              {/* Contact route */}
              <Route path="/contact" element={<Contact />} />

              {/* Legal routes */}
              <Route path="/legal/:legalId" element={<LegalDetail />} />

              {/* Secret Admin Route */}
              <Route path="/admin" element={<Admin />} />

              {/* Catch-all redirect to Home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <WhatsAppButton />
        </div>
      </SmoothScroll>
    </Router>
  );
}

