import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegistrationMarks from '../components/RegistrationMarks';
import StickyMobileCTA from '../components/StickyMobileCTA';

const faqs = [
  {
    q: 'What is your typical turnaround time for a project?',
    a: 'Brand identity projects typically take 3 to 4 weeks. Full web design and code builds take 4 to 6 weeks. Packaging design dielines take 2 to 3 weeks. We establish fixed sprint schedules prior to kick-off.'
  },
  {
    q: 'How are project payments structured?',
    a: 'We work on a 50/50 split structure: 50% deposit upon contract sign-off to reserve your sprint slot, and 50% upon final delivery prior to domain deployment and master file handoff.'
  },
  {
    q: 'Do you build websites in Framer or Webflow?',
    a: 'Yes, we specialize in custom Framer and Webflow builds as well as bespoke HTML/CSS/JS frontend code. We help you choose the ideal stack based on your team\'s editing needs.'
  },
  {
    q: 'Who owns the final design IP and vector source files?',
    a: 'You do. Upon final invoice settlement, 100% of intellectual property rights, master vector files, dielines, and code repositories are transferred to your company.'
  },
  {
    q: 'Can we start with a small engagement or retainer sprint?',
    a: 'Absolutely. Many clients start with a focused brand sprint or landing page design before scaling into full packaging or retainer contracts.'
  }
];

export default function Contact() {
  const [openFaq, setOpenFaq] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <RegistrationMarks />
      <Navbar />

      {/* Hero Section */}
      <section className="hero-lite">
        <div className="wrap">
          <div className="sheet-label">
            <span className="tag">SHEET 04 // PROJECT INQUIRY</span>
            <div className="rule"></div>
          </div>
          <h1>Let's build something <em>extraordinary</em> together.</h1>
          <p>We are currently accepting new client engagements for Q3 & Q4. Fill out the project form below or schedule a direct calendar call.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="contact-grid">
            {/* Contact Form */}
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="corner"></div>
              <h3>Project Initiation Form</h3>
              <p className="sub">Tell us about your brand, goals, budget, and estimated timeline.</p>

              {submitted ? (
                <div style={{ background: 'var(--paper)', border: '1px solid var(--pine)', padding: '24px', textAlign: 'center', margin: '20px 0' }}>
                  <h4 style={{ color: 'var(--pine)', fontSize: '20px', marginBottom: '8px' }}>Inquiry Submitted Successfully!</h4>
                  <p style={{ fontSize: '14px', color: 'var(--ink-soft)' }}>Thank you for reaching out to The Drawing Board. Our senior team will review your specs and respond within 24 hours.</p>
                </div>
              ) : (
                <>
                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="fname">First Name *</label>
                      <input type="text" id="fname" required placeholder="Jane" />
                    </div>
                    <div className="field">
                      <label htmlFor="lname">Last Name *</label>
                      <input type="text" id="lname" required placeholder="Doe" />
                    </div>
                  </div>

                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="email">Work Email *</label>
                      <input type="email" id="email" required placeholder="jane@company.com" />
                    </div>
                    <div className="field">
                      <label htmlFor="company">Company / Brand *</label>
                      <input type="text" id="company" required placeholder="Acme Studio" />
                    </div>
                  </div>

                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="service">Primary Need *</label>
                      <select id="service" required>
                        <option value="">Select Service...</option>
                        <option value="brand">Brand Identity</option>
                        <option value="web">Web Design & Build</option>
                        <option value="packaging">Structural Packaging</option>
                        <option value="sprint">Monthly Sprints</option>
                        <option value="full">Full-Stack (Brand + Web + Pack)</option>
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="budget">Estimated Budget *</label>
                      <select id="budget" required>
                        <option value="">Select Range...</option>
                        <option value="8k-12k">$8.5k – $12k</option>
                        <option value="12k-25k">$12k – $25k</option>
                        <option value="25k-50k">$25k – $50k</option>
                        <option value="50k+">$50k+</option>
                      </select>
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="details">Project Details & Objectives *</label>
                    <textarea id="details" required placeholder="Share your vision, current challenges, key deliverables, and target launch date..."></textarea>
                  </div>

                  <button type="submit" className="form-submit">Submit Project Inquiry &rarr;</button>
                  <p className="form-fine">Guaranteed response within 24 business hours &bull; NDA friendly</p>
                </>
              )}
            </form>

            {/* Info & Quick Links Side Column */}
            <div>
              <div className="info-card">
                <div className="head">STUDIO AVAILABILITY SPECS</div>
                <div className="info-row">
                  <span>Status</span>
                  <span className="val" style={{ color: 'var(--pine)', fontWeight: 600 }}>Q3 Sprints Open</span>
                </div>
                <div className="info-row">
                  <span>Response Time</span>
                  <span className="val">&lt; 24 Hours</span>
                </div>
                <div className="info-row">
                  <span>Direct Email</span>
                  <span className="val">hello@thedrawingboard.design</span>
                </div>
                <div className="info-row">
                  <span>Studio Location</span>
                  <span className="val">New York &bull; Remote Worldwide</span>
                </div>
                <div className="info-row">
                  <span>Timezones</span>
                  <span className="val">EST / PST / GMT</span>
                </div>
              </div>

              <div className="quick-links">
                <a href="https://cal.com/dandelion-nrvrze" target="_blank" rel="noopener noreferrer" className="quick-link pine">
                  <span>Book 15-Min Discovery Call</span>
                  <span>&rarr;</span>
                </a>
                <a href="mailto:hello@thedrawingboard.design" className="quick-link">
                  <span>Email Direct Inquiry</span>
                  <span>&rarr;</span>
                </a>
                <Link to="/work" className="quick-link">
                  <span>Explore Portfolio Archive</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section style={{ background: 'var(--card)', borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)' }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">FREQUENTLY ASKED QUESTIONS</div>
              <h2>Common questions before starting.</h2>
            </div>
            <p>Everything you need to know about our engagement model and workflow.</p>
          </div>

          <div style={{ maxWidth: '860px' }}>
            {faqs.map((faq, idx) => (
              <div key={idx} className={`faq-item ${openFaq === idx ? 'open' : ''}`}>
                <button className="faq-q" onClick={() => toggleFaq(idx)}>
                  <span>{faq.q}</span>
                  <span className="plus" style={{ transform: openFaq === idx ? 'rotate(45deg)' : 'none' }}>+</span>
                </button>
                <div className="faq-a" style={{ maxHeight: openFaq === idx ? '300px' : '0' }}>
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="final">
        <div className="wrap">
          <h2>Prefer to talk live on a video call?</h2>
          <p>Pick a slot directly on our studio calendar for a quick 15-minute intro chat.</p>
          <a href="https://cal.com/dandelion-nrvrze" target="_blank" rel="noopener noreferrer" className="btn-primary">Schedule Calendar Call &rarr;</a>
        </div>
      </section>

      <StickyMobileCTA title="Contact Studio" subtitle="Q3 Slot Availability" buttonText="Book Call →" link="https://cal.com/dandelion-nrvrze" />
      <Footer />
    </>
  );
}
