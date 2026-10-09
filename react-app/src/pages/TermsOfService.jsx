import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegistrationMarks from '../components/RegistrationMarks';
import StickyMobileCTA from '../components/StickyMobileCTA';
import useSEO from '../hooks/useSEO';

export default function TermsOfService() {
  useSEO({
    title: 'Terms of Service | The Drawing Board',
    description: 'Terms of Service for The Drawing Board. Read our terms, user responsibilities, and legal conditions.',
    path: '/terms-of-service'
  });

  return (
    <>
      <RegistrationMarks />
      <Navbar />

      <section className="hero-lite">
        <div className="wrap">
          <div className="sheet-label">
            <span className="sheet-meta mono">LEGAL AGREEMENT // TERMS &amp; CONDITIONS</span>
            <div className="rule"></div>
          </div>
          <h1>Terms of <em>Service</em></h1>
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

            {/* Introduction */}
            <div className="annot-card">
              <div className="corner"></div>
              <div className="annot-title">01. INTRODUCTION</div>
              <h3 style={{ fontSize: '22px', marginBottom: '14px', color: 'var(--ink)' }}>Acceptance of Terms</h3>
              <p style={{ fontSize: '15px', color: 'var(--ink-soft)', lineHeight: 1.7 }}>
                Welcome to The Drawing Board! These Terms of Service govern your use of our website and services. By accessing or using our platform, you agree to comply with these terms and conditions.
              </p>
            </div>

            {/* User Responsibilities */}
            <div className="annot-card">
              <div className="corner"></div>
              <div className="annot-title">02. USER RESPONSIBILITIES</div>
              <h3 style={{ fontSize: '22px', marginBottom: '14px', color: 'var(--ink)' }}>Platform Obligations</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div style={{ padding: '16px', background: 'var(--paper)', border: '1px solid var(--paper-line)', borderRadius: '2px' }}>
                  <h4 style={{ fontSize: '16px', color: 'var(--pine)', marginBottom: '6px' }}>Account Creation</h4>
                  <p style={{ fontSize: '14.5px', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
                    If you create an account, you are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                  </p>
                </div>
                <div style={{ padding: '16px', background: 'var(--paper)', border: '1px solid var(--paper-line)', borderRadius: '2px' }}>
                  <h4 style={{ fontSize: '16px', color: 'var(--pine)', marginBottom: '6px' }}>Prohibited Activities</h4>
                  <p style={{ fontSize: '14.5px', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
                    You agree not to engage in any illegal, unauthorized, or abusive activities on our platform. This includes but is not limited to spamming, hacking, and violating intellectual property rights.
                  </p>
                </div>
                <div style={{ padding: '16px', background: 'var(--paper)', border: '1px solid var(--paper-line)', borderRadius: '2px' }}>
                  <h4 style={{ fontSize: '16px', color: 'var(--pine)', marginBottom: '6px' }}>Content Guidelines</h4>
                  <p style={{ fontSize: '14.5px', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
                    You are responsible for the content you upload, post, or share on our platform. Content must not infringe upon the rights of others or contain offensive, defamatory, or harmful material.
                  </p>
                </div>
              </div>
            </div>

            {/* Intellectual Property */}
            <div className="annot-card">
              <div className="corner"></div>
              <div className="annot-title">03. INTELLECTUAL PROPERTY</div>
              <h3 style={{ fontSize: '22px', marginBottom: '14px', color: 'var(--ink)' }}>Ownership & Copyright</h3>
              <p style={{ fontSize: '15px', color: 'var(--ink-soft)', lineHeight: 1.7 }}>
                Our platform and its content, including but not limited to text, graphics, logos, and software, are protected by intellectual property laws. You may not use, reproduce, or distribute our content without our express permission.
              </p>
            </div>

            {/* Privacy */}
            <div className="annot-card">
              <div className="corner"></div>
              <div className="annot-title">04. PRIVACY</div>
              <h3 style={{ fontSize: '22px', marginBottom: '14px', color: 'var(--ink)' }}>Data Protection</h3>
              <p style={{ fontSize: '15px', color: 'var(--ink-soft)', lineHeight: 1.7, marginBottom: '14px' }}>
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.
              </p>
              <Link to="/privacy-policy" className="btn-secondary-card">
                Read Privacy Policy &rarr;
              </Link>
            </div>

            {/* Payment and Billing */}
            <div className="annot-card">
              <div className="corner"></div>
              <div className="annot-title">05. PAYMENT AND BILLING</div>
              <h3 style={{ fontSize: '22px', marginBottom: '14px', color: 'var(--ink)' }}>Fees & Processing</h3>
              <p style={{ fontSize: '15px', color: 'var(--ink-soft)', lineHeight: 1.7 }}>
                If our services require payment, you agree to pay all applicable fees and charges. Payments are processed securely, and we do not store your payment information.
              </p>
            </div>

            {/* Disclaimer of Warranties */}
            <div className="annot-card">
              <div className="corner"></div>
              <div className="annot-title">06. DISCLAIMER OF WARRANTIES</div>
              <h3 style={{ fontSize: '22px', marginBottom: '14px', color: 'var(--ink)' }}>Service Provision</h3>
              <p style={{ fontSize: '15px', color: 'var(--ink-soft)', lineHeight: 1.7 }}>
                Our platform is provided "as is" without warranties of any kind, express or implied. We do not guarantee the accuracy, reliability, or suitability of our services for your specific needs.
              </p>
            </div>

            {/* Limitation of Liability */}
            <div className="annot-card">
              <div className="corner"></div>
              <div className="annot-title">07. LIMITATION OF LIABILITY</div>
              <h3 style={{ fontSize: '22px', marginBottom: '14px', color: 'var(--ink)' }}>Liability Scope</h3>
              <p style={{ fontSize: '15px', color: 'var(--ink-soft)', lineHeight: 1.7 }}>
                In no event shall The Drawing Board be liable for any damages arising from your use of our platform, including but not limited to direct, indirect, incidental, or consequential damages.
              </p>
            </div>

            {/* Indemnification */}
            <div className="annot-card">
              <div className="corner"></div>
              <div className="annot-title">08. INDEMNIFICATION</div>
              <h3 style={{ fontSize: '22px', marginBottom: '14px', color: 'var(--ink)' }}>Hold Harmless Agreement</h3>
              <p style={{ fontSize: '15px', color: 'var(--ink-soft)', lineHeight: 1.7 }}>
                You agree to indemnify and hold harmless The Drawing Board, its affiliates, and employees from any claims, damages, or liabilities arising from your use of our platform or violation of these terms.
              </p>
            </div>

            {/* Governing Law */}
            <div className="annot-card">
              <div className="corner"></div>
              <div className="annot-title">09. GOVERNING LAW</div>
              <h3 style={{ fontSize: '22px', marginBottom: '14px', color: 'var(--ink)' }}>Jurisdiction & Dispute Resolution</h3>
              <p style={{ fontSize: '15px', color: 'var(--ink-soft)', lineHeight: 1.7 }}>
                These Terms of Service are governed by the laws of Kolkata, West Bengal, India. Any disputes arising from these terms shall be resolved through arbitration under the Bengal, Agra and Assam Civil Courts Act.
              </p>
            </div>

            {/* Changes to Terms */}
            <div className="annot-card">
              <div className="corner"></div>
              <div className="annot-title">10. CHANGES TO TERMS</div>
              <h3 style={{ fontSize: '22px', marginBottom: '14px', color: 'var(--ink)' }}>Modifications</h3>
              <p style={{ fontSize: '15px', color: 'var(--ink-soft)', lineHeight: 1.7 }}>
                We reserve the right to update or modify these terms at any time. We will notify you of any changes by posting the revised terms on our platform.
              </p>
            </div>

            {/* Contact Us */}
            <div className="annot-card" style={{ background: 'var(--paper)', border: '2px solid var(--pine)' }}>
              <div className="corner"></div>
              <div className="annot-title" style={{ color: 'var(--pine)' }}>11. CONTACT US</div>
              <h3 style={{ fontSize: '22px', marginBottom: '14px', color: 'var(--ink)' }}>Questions & Legal Inquiries</h3>
              <p style={{ fontSize: '15px', color: 'var(--ink-soft)', lineHeight: 1.7, marginBottom: '20px' }}>
                If you have any questions or concerns about our Terms of Service, please contact us at:
              </p>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                <a 
                  href="tel:+919428859768" 
                  className="btn-primary" 
                  style={{ textDecoration: 'none' }}
                >
                  📞 Call Us: +91-94288-59768
                </a>
                <Link to="/privacy-policy" className="btn-secondary-card">
                  View Privacy Policy &rarr;
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      <StickyMobileCTA title="Terms of Service" subtitle="Studio Legal Agreements" buttonText="Privacy &rarr;" link="/privacy-policy" />
      <Footer />
    </>
  );
}
