import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegistrationMarks from '../components/RegistrationMarks';
import StickyMobileCTA from '../components/StickyMobileCTA';

export default function LegalDetail() {
  const { legalId } = useParams();

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
          <h1>Legal Specification: <em>{legalId ? legalId.toUpperCase() : 'PRIVACY'}</em></h1>
          <p style={{ marginTop: '16px', color: 'var(--ink-soft)' }}>The Drawing Board Studio Terms, Privacy Policy, and IP Transfer Agreements.</p>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="annot-card" style={{ padding: '36px', background: 'var(--card)' }}>
            <div className="corner"></div>
            <h3 style={{ fontSize: '22px', marginBottom: '12px' }}>Intellectual Property & Engagement Terms</h3>
            <p style={{ fontSize: '15px', color: 'var(--ink-soft)', lineHeight: 1.6, marginBottom: '20px' }}>
              All client contracts with The Drawing Board include full transfer of intellectual property rights, master vector files, dieline production artwork, and source code upon final payment settlement.
            </p>
            <Link to="/" className="btn-primary">&larr; Return to Home</Link>
          </div>
        </div>
      </section>

      <StickyMobileCTA title="Legal Terms" subtitle="Studio Policies" buttonText="Home →" link="/" />
      <Footer />
    </>
  );
}
