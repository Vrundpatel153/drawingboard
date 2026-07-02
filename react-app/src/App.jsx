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
import WhatsAppButton from './components/WhatsAppButton';
import BlogDetail from './pages/BlogDetail';
import LegalDetail from './pages/LegalDetail';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
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
      <WhatsAppButton />
    </Router>
  );
}

export default App;
