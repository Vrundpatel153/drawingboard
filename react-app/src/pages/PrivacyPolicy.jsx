import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegistrationMarks from '../components/RegistrationMarks';
import StickyMobileCTA from '../components/StickyMobileCTA';
import useSEO from '../hooks/useSEO';

export default function PrivacyPolicy() {
  useSEO({
    title: 'Privacy Policy | The Drawing Board',
    description: 'Privacy Policy for The Drawing Board. Learn how we collect, use, and safeguard your personal information.',
    path: '/privacy-policy'
  });

  return (
    <>
      <RegistrationMarks />
      <Navbar />

      <section className="hero-lite">
        <div className="wrap">
          <div className="sheet-label">
            <span className="tag">LEGAL SPECIFICATION // PRIVACY</span>
            <div className="rule"></div>
          </div>
          <h1>Privacy <em>Policy</em></h1>
          <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <span className="mono" style={{ fontSize: '13px', background: 'var(--card)', padding: '6px 12px', border: '1px solid var(--paper-line)', color: 'var(--ink)' }}>
              Last updated: August 22, 2026
            </span>
            <span style={{ fontSize: '14px', color: 'var(--ink-soft)' }}>
              The Drawing Board Creative Agency
            </span>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: '10px', paddingBottom: '80px' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '28px' }}>
            
            {/* Introduction Card */}
            <div className="annot-card">
              <div className="corner"></div>
              <div className="annot-title">01. INTRODUCTION</div>
              <h3 style={{ fontSize: '22px', marginBottom: '14px', color: 'var(--ink)' }}>Welcome to The Drawing Board</h3>
              <p style={{ fontSize: '15px', color: 'var(--ink-soft)', lineHeight: 1.7 }}>
                Welcome to The Drawing Board! We are committed to protecting the privacy and security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you use our website (<a href="https://thedrawingboard.in" style={{ color: 'var(--pine)', textDecoration: 'underline' }}>https://thedrawingboard.in</a>) or our services.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="annot-card">
              <div className="corner"></div>
              <div className="annot-title">02. INFORMATION WE COLLECT</div>
              <h3 style={{ fontSize: '22px', marginBottom: '14px', color: 'var(--ink)' }}>Data Collection Categories</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div style={{ padding: '16px', background: 'var(--paper)', border: '1px solid var(--paper-line)', borderRadius: '2px' }}>
                  <h4 style={{ fontSize: '16px', color: 'var(--pine)', marginBottom: '6px' }}>Personal Information</h4>
                  <p style={{ fontSize: '14.5px', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
                    When you register an account or use our services, we may collect personal information such as your name, email address, phone number, and billing information.
                  </p>
                </div>
                <div style={{ padding: '16px', background: 'var(--paper)', border: '1px solid var(--paper-line)', borderRadius: '2px' }}>
                  <h4 style={{ fontSize: '16px', color: 'var(--pine)', marginBottom: '6px' }}>Usage Data</h4>
                  <p style={{ fontSize: '14.5px', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
                    We gather information about how you interact with our website or services, including IP address, browser type, pages visited, and device information.
                  </p>
                </div>
                <div style={{ padding: '16px', background: 'var(--paper)', border: '1px solid var(--paper-line)', borderRadius: '2px' }}>
                  <h4 style={{ fontSize: '16px', color: 'var(--pine)', marginBottom: '6px' }}>Cookies</h4>
                  <p style={{ fontSize: '14.5px', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
                    We use cookies and similar tracking technologies to enhance your experience and gather data about your preferences and browsing behavior.
                  </p>
                </div>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div className="annot-card">
              <div className="corner"></div>
              <div className="annot-title">03. HOW WE USE YOUR INFORMATION</div>
              <h3 style={{ fontSize: '22px', marginBottom: '14px', color: 'var(--ink)' }}>Purposes of Processing</h3>
              <p style={{ fontSize: '15px', color: 'var(--ink-soft)', lineHeight: 1.7, marginBottom: '16px' }}>
                We use the information we collect for the following purposes:
              </p>
              <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  'Providing and improving our services',
                  'Personalizing your experience',
                  'Communicating with you about updates, promotions, and offers',
                  'Analyzing usage trends and optimizing our website'
                ].map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14.5px', color: 'var(--ink)' }}>
                    <span style={{ width: '8px', height: '8px', background: 'var(--pine)', borderRadius: '50%', flexShrink: 0 }}></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Data Sharing and Disclosure */}
            <div className="annot-card">
              <div className="corner"></div>
              <div className="annot-title">04. DATA SHARING AND DISCLOSURE</div>
              <h3 style={{ fontSize: '22px', marginBottom: '14px', color: 'var(--ink)' }}>Third-Party Disclosures</h3>
              <p style={{ fontSize: '15px', color: 'var(--ink-soft)', lineHeight: 1.7, marginBottom: '16px' }}>
                We may share your information with third parties in the following circumstances:
              </p>
              <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  'With your consent or at your direction',
                  'To comply with legal obligations or respond to legal requests',
                  'To protect our rights, property, or safety, or the rights, property, or safety of others',
                  'In connection with a merger, acquisition, or sale of assets'
                ].map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14.5px', color: 'var(--ink)' }}>
                    <span style={{ width: '8px', height: '8px', background: 'var(--marker)', flexShrink: 0 }}></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Data Security */}
            <div className="annot-card">
              <div className="corner"></div>
              <div className="annot-title">05. DATA SECURITY</div>
              <h3 style={{ fontSize: '22px', marginBottom: '14px', color: 'var(--ink)' }}>Protection Measures</h3>
              <p style={{ fontSize: '15px', color: 'var(--ink-soft)', lineHeight: 1.7 }}>
                We implement security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            {/* Your Rights and Choices */}
            <div className="annot-card">
              <div className="corner"></div>
              <div className="annot-title">06. YOUR RIGHTS AND CHOICES</div>
              <h3 style={{ fontSize: '22px', marginBottom: '14px', color: 'var(--ink)' }}>User Control & Rights</h3>
              <p style={{ fontSize: '15px', color: 'var(--ink-soft)', lineHeight: 1.7, marginBottom: '16px' }}>
                You have the right to:
              </p>
              <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  'Access and update your personal information',
                  'Opt-out of receiving promotional communications',
                  'Request the deletion of your account and data'
                ].map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14.5px', color: 'var(--ink)' }}>
                    <span className="mono" style={{ fontSize: '12px', color: 'var(--pine)', fontWeight: 600 }}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Children's Privacy */}
            <div className="annot-card">
              <div className="corner"></div>
              <div className="annot-title">07. CHILDREN'S PRIVACY</div>
              <h3 style={{ fontSize: '22px', marginBottom: '14px', color: 'var(--ink)' }}>Protection of Minors</h3>
              <p style={{ fontSize: '15px', color: 'var(--ink-soft)', lineHeight: 1.7 }}>
                Our services are not intended for children under the age of 13. We do not knowingly collect or solicit personal information from minors. If you believe that a child has provided us with personal information, please contact us immediately.
              </p>
            </div>

            {/* Changes to This Policy */}
            <div className="annot-card">
              <div className="corner"></div>
              <div className="annot-title">08. CHANGES TO THIS POLICY</div>
              <h3 style={{ fontSize: '22px', marginBottom: '14px', color: 'var(--ink)' }}>Policy Updates</h3>
              <p style={{ fontSize: '15px', color: 'var(--ink-soft)', lineHeight: 1.7 }}>
                We may update this Privacy Policy periodically. We will notify you of any changes by posting the new policy on this page.
              </p>
            </div>

            {/* Contact Us */}
            <div className="annot-card" style={{ background: 'var(--paper)', border: '2px solid var(--pine)' }}>
              <div className="corner"></div>
              <div className="annot-title" style={{ color: 'var(--pine)' }}>09. CONTACT US</div>
              <h3 style={{ fontSize: '22px', marginBottom: '14px', color: 'var(--ink)' }}>Questions & Concerns</h3>
              <p style={{ fontSize: '15px', color: 'var(--ink-soft)', lineHeight: 1.7, marginBottom: '20px' }}>
                If you have any questions or concerns about our Privacy Policy, please contact us at:
              </p>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                <a 
                  href="tel:+919428859768" 
                  className="btn-primary" 
                  style={{ textDecoration: 'none' }}
                >
                  📞 Call Us: +91-94288-59768
                </a>
                <Link to="/terms-of-service" className="btn-secondary-card">
                  View Terms of Service &rarr;
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      <StickyMobileCTA title="Privacy Policy" subtitle="Studio Legal Documents" buttonText="Terms &rarr;" link="/terms-of-service" />
      <Footer />
    </>
  );
}
