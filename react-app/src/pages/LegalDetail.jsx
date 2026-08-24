import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegistrationMarks from '../components/RegistrationMarks';
import StickyMobileCTA from '../components/StickyMobileCTA';

export default function LegalDetail() {
  const { legalId } = useParams();

  const id = (legalId || '').toLowerCase();
  if (id === 'privacy-policy' || id === 'privacy') {
    return <PrivacyPolicy />;
  }
  if (id === 'terms-of-service' || id === 'terms' || id === 'terms-and-conditions') {
    return <TermsOfService />;
  }

  return (
    <>
      <RegistrationMarks />
      <Navbar />

      <section className="hero-lite">
        <div className="wrap">
          <div className="sheet-label">
            <span className="tag">LEGAL & SPECS</span>
            <div className="rule"></div>
          </div>
          <h1>Legal Specifications & <em>Policies</em></h1>
          <p style={{ marginTop: '16px', color: 'var(--ink-soft)' }}>
            The Drawing Board Studio Terms of Service, Privacy Policy, and Intellectual Property Transfer Agreements.
          </p>
        </div>
      </section>

      <section style={{ paddingTop: 0, paddingBottom: '80px' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div className="annot-card">
              <div className="corner"></div>
              <h3 style={{ fontSize: '22px', marginBottom: '12px' }}>Privacy Policy</h3>
              <p style={{ fontSize: '15px', color: 'var(--ink-soft)', lineHeight: 1.6, marginBottom: '20px' }}>
                Learn how we collect, use, and safeguard your personal information and usage data.
              </p>
              <Link to="/privacy-policy" className="btn-primary">View Privacy Policy &rarr;</Link>
            </div>

            <div className="annot-card">
              <div className="corner"></div>
              <h3 style={{ fontSize: '22px', marginBottom: '12px' }}>Terms of Service</h3>
              <p style={{ fontSize: '15px', color: 'var(--ink-soft)', lineHeight: 1.6, marginBottom: '20px' }}>
                Read our terms governing your use of our platform, services, payment, and intellectual property.
              </p>
              <Link to="/terms-of-service" className="btn-primary">View Terms of Service &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      <StickyMobileCTA title="Legal Terms" subtitle="Studio Policies" buttonText="Home →" link="/" />
      <Footer />
    </>
  );
}
