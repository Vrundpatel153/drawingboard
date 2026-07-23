import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegistrationMarks from '../components/RegistrationMarks';
import StickyMobileCTA from '../components/StickyMobileCTA';
import ArrowIcon from '../components/ArrowIcon';

export default function ServiceDetail() {
  const { serviceId } = useParams();

  return (
    <>
      <RegistrationMarks />
      <Navbar />

      <section className="hero-lite">
        <div className="wrap">
          <div className="sheet-label">
            <span className="tag">SERVICE // SPECIFICATION</span>
            <div className="rule"></div>
          </div>
          <h1>Architectural Design Service: <em>{serviceId || 'Branding'}</em></h1>
          <p>Detailed breakdown of scope, milestone timelines, deliverables, and production handoffs.</p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="guarantee">
            <div className="badge">SPECS</div>
            <div>
              <h3>Fixed Price & Scope Guarantee</h3>
              <p>All engagements are backed by milestone schedules, senior-only execution, and complete IP transfers.</p>
            </div>
          </div>

          <div className="cta-row" style={{ marginTop: '40px' }}>
            <Link to="/contact" className="btn-primary">Inquire About This Service <ArrowIcon /></Link>
            <Link to="/services" className="btn-link">View All Services <ArrowIcon size={13} /></Link>
          </div>
        </div>
      </section>

      <StickyMobileCTA title="Service Details" subtitle="Fixed Sprint Specs" buttonText="Inquire" />
      <Footer />
    </>
  );
}

