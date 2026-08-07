import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegistrationMarks from '../components/RegistrationMarks';
import StickyMobileCTA from '../components/StickyMobileCTA';
import WhatsAppCTALink from '../components/WhatsAppCTALink';
import { usePageAnimations } from '../hooks/usePageAnimations';
import { CONTACT_EMAIL, MAILTO_URL, WHATSAPP_NUMBER } from '../utils/siteConfig';


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

// Map select values → readable labels for the WhatsApp message
const SERVICE_LABELS = {
  brand:     'Brand Identity',
  web:       'Web Design & Build',
  packaging: 'Structural Packaging',
  sprint:    'Monthly Sprints',
  full:      'Full-Stack (Brand + Web + Pack)',
};

const BUDGET_LABELS = {
  'inr-175k-250k': '₹1,75,000 – ₹2,50,000',
  'inr-250k-500k': '₹2,50,000 – ₹5,00,000',
  'inr-500k-1m':   '₹5,00,000 – ₹10,00,000',
  'inr-1m+':       '₹10,00,000+',
  '8k-12k':        '$8,500 – $12,000',
  '12k-25k':       '$12,000 – $25,000',
  '25k-50k':       '$25,000 – $50,000',
  '50k+':          '$50,000+',
};

export default function Contact() {
  const [openFaq, setOpenFaq] = useState(null);
  const pageRef  = useRef(null);
  const navigate = useNavigate();

  // Controlled form state so we can read values on submit
  const [form, setForm] = useState({
    fname: '', lname: '', email: '', company: '',
    service: '', budget: '', details: ''
  });

  usePageAnimations(pageRef);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ── Build the WhatsApp message from form fields ────────────────────────
    const serviceLbl = SERVICE_LABELS[form.service] || form.service;
    const budgetLbl  = BUDGET_LABELS[form.budget]   || form.budget;

    const msg = [
      `Hello The Drawing Board! 👋`,
      ``,
      `*Project Inquiry from ${form.fname} ${form.lname}*`,
      `Company / Brand: ${form.company}`,
      `Email: ${form.email}`,
      ``,
      `*Service Needed:* ${serviceLbl}`,
      `*Budget Range:* ${budgetLbl}`,
      ``,
      `*Project Details:*`,
      form.details,
      ``,
      `— Sent via thedrawingboard.studio`,
    ].join('\n');

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

    // Open WhatsApp in a new tab
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    // Navigate current tab to /thank-you
    navigate('/thank-you');
  };

  return (
    <>
      <div ref={pageRef}>
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
          <p>We are currently accepting new client engagements for Q3 &amp; Q4. Fill out the project form below or schedule a direct calendar call.</p>
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

              <div className="field-row">
                <div className="field">
                  <label htmlFor="fname">First Name *</label>
                  <input type="text" id="fname" required placeholder="Jane" value={form.fname} onChange={handleChange} />
                </div>
                <div className="field">
                  <label htmlFor="lname">Last Name *</label>
                  <input type="text" id="lname" required placeholder="Doe" value={form.lname} onChange={handleChange} />
                </div>
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="email">Work Email *</label>
                  <input type="email" id="email" required placeholder="jane@company.com" value={form.email} onChange={handleChange} />
                </div>
                <div className="field">
                  <label htmlFor="company">Company / Brand *</label>
                  <input type="text" id="company" required placeholder="Acme Studio" value={form.company} onChange={handleChange} />
                </div>
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="service">Primary Need *</label>
                  <select id="service" required value={form.service} onChange={handleChange}>
                    <option value="">Select Service...</option>
                    <option value="brand">Brand Identity</option>
                    <option value="web">Web Design &amp; Build</option>
                    <option value="packaging">Structural Packaging</option>
                    <option value="sprint">Monthly Sprints</option>
                    <option value="full">Full-Stack (Brand + Web + Pack)</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="budget">Estimated Budget *</label>
                  <select id="budget" required value={form.budget} onChange={handleChange}>
                    <option value="">Select Range...</option>
                    <optgroup label="— Indian Rupees (₹) —">
                      <option value="inr-175k-250k">₹1,75,000 – ₹2,50,000</option>
                      <option value="inr-250k-500k">₹2,50,000 – ₹5,00,000</option>
                      <option value="inr-500k-1m">₹5,00,000 – ₹10,00,000</option>
                      <option value="inr-1m+">₹10,00,000+</option>
                    </optgroup>
                    <optgroup label="— US Dollars ($) —">
                      <option value="8k-12k">$8,500 – $12,000</option>
                      <option value="12k-25k">$12,000 – $25,000</option>
                      <option value="25k-50k">$25,000 – $50,000</option>
                      <option value="50k+">$50,000+</option>
                    </optgroup>
                  </select>
                </div>
              </div>

              <div className="field">
                <label htmlFor="details">Project Details &amp; Objectives *</label>
                <textarea
                  id="details"
                  required
                  placeholder="Share your vision, current challenges, key deliverables, and target launch date..."
                  value={form.details}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className="form-submit">Submit Project Inquiry &rarr;</button>
              <p className="form-fine">
                Submitting opens WhatsApp with your details pre-filled &bull; We reply within 24 hrs &bull; NDA friendly
              </p>
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
                  <span className="val">{CONTACT_EMAIL}</span>
                </div>
                <div className="info-row">
                  <span>WhatsApp Direct</span>
                  <span className="val">+91 94288 59768</span>
                </div>
                <div className="info-row">
                  <span>Studio Location</span>
                  <span className="val">India &bull; New York &bull; Remote Worldwide</span>
                </div>
                <div className="info-row">
                  <span>Timezones</span>
                  <span className="val">IST / EST / PST / GMT</span>
                </div>
              </div>

              <div className="quick-links">
                <a href="https://cal.com/dandelion-nrvrze" target="_blank" rel="noopener noreferrer" className="quick-link pine">
                  <span>Book 15-Min Discovery Call</span>
                  <span>&rarr;</span>
                </a>
                <a href={MAILTO_URL} className="quick-link">
                  <span>Email Direct ({CONTACT_EMAIL})</span>
                  <span>&rarr;</span>
                </a>
                <WhatsAppCTALink className="quick-link">
                  <span>Chat on WhatsApp (+91 94288 59768)</span>
                  <span>&rarr;</span>
                </WhatsAppCTALink>
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
                <button type="button" className="faq-q" onClick={() => toggleFaq(idx)} aria-expanded={openFaq === idx}>
                  <span>{faq.q}</span>
                  <span className="plus" style={{ transform: openFaq === idx ? 'rotate(45deg)' : 'none' }}>+</span>
                </button>
                <div className="faq-a" style={{ display: openFaq === idx ? 'block' : 'none', overflow: 'hidden' }}>
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

      <StickyMobileCTA title="Contact Studio" subtitle="Q3 Slot Availability" buttonText="WhatsApp Us" link="https://wa.me/919428859768?text=Hello%20The%20Drawing%20Board%2C%20I%20am%20interested%20in%20discussing%20a%20project!" />
      <Footer />
      </div>
    </>
  );

}
