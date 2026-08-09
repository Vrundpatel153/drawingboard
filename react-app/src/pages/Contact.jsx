import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegistrationMarks from '../components/RegistrationMarks';
import StickyMobileCTA from '../components/StickyMobileCTA';
import ArrowIcon from '../components/ArrowIcon';
import BookCallLink from '../components/BookCallLink';
import { usePageAnimations } from '../hooks/usePageAnimations';
import { CONTACT_EMAIL, MAILTO_URL } from '../utils/siteConfig';
import { trackMetaFormSubmission } from '../utils/metaEvents';

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
    a: 'Yes, we specialize in custom Framer, Webflow, React, Next.js, and Shopify builds. We help you choose the ideal stack based on your business requirements and team workflow.'
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

const AVAILABLE_SERVICES = [
  'Branding',
  'Packaging Design',
  'UI Ux Design',
  'Web Development',
  'Photography'
];

const BUDGET_RANGES = [
  { label: '₹1,75,000 – ₹2,50,000', value: 'inr-175k-250k' },
  { label: '₹2,50,000 – ₹5,00,000', value: 'inr-250k-500k' },
  { label: '₹5,00,000 – ₹10,00,000', value: 'inr-500k-1m' },
  { label: '₹10,00,000+', value: 'inr-1m+' },
  { label: '$8,500 – $12,000', value: '8k-12k' },
  { label: '$12,000 – $25,000', value: '12k-25k' },
  { label: '$25,000 – $50,000', value: '25k-50k' },
  { label: '$50,000+', value: '50k+' }
];

const TIMELINES = [
  'ASAP (1–2 weeks)',
  '1–2 Months',
  '2–3 Months',
  'Flexible / Planning Phase'
];

export default function Contact() {
  const [openFaq, setOpenFaq] = useState(null);
  const pageRef = useRef(null);
  const navigate = useNavigate();

  // Controlled form state
  const [form, setForm] = useState({
    name: '',
    email: '',
    services: ['Branding'],
    budget: 'inr-175k-250k',
    timeline: 'ASAP (1–2 weeks)',
    message: ''
  });

  usePageAnimations(pageRef);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleServiceToggle = (svc) => {
    setForm((prev) => {
      const exists = prev.services.includes(svc);
      if (exists) {
        if (prev.services.length === 1) return prev;
        return { ...prev, services: prev.services.filter((s) => s !== svc) };
      } else {
        return { ...prev, services: [...prev.services, svc] };
      }
    });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedBudgetObj = BUDGET_RANGES.find((b) => b.value === form.budget);
    const budgetDisplay = selectedBudgetObj ? selectedBudgetObj.label : form.budget;

    // ── Build structured WhatsApp message payload ────────────────────────
    const msg = [
      `Hello The Drawing Board! 👋`,
      ``,
      `*New Project Query from ${form.name}*`,
      `Email: ${form.email}`,
      ``,
      `*Services Requested:* ${form.services.join(', ')}`,
      `*Estimated Budget:* ${budgetDisplay}`,
      `*Project Timeline:* ${form.timeline}`,
      ``,
      `*Message:*`,
      form.message || 'Ready to start project discussion.',
      ``,
      `— Sent via drawingsboards.com/contact`
    ].join('\n');

    const waUrl = `https://wa.me/919428859768?text=${encodeURIComponent(msg)}`;

    // 1. Dispatch Meta Conversions API (CAPI) & Pixel lead event
    trackMetaFormSubmission({
      name: form.name,
      email: form.email,
      services: form.services.join(', '),
      budget: budgetDisplay,
      timeline: form.timeline,
      message: form.message
    });

    // 2. Navigate current tab to /thank-you immediately
    navigate('/thank-you');

    // 3. Open WhatsApp in new tab / app
    setTimeout(() => {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }, 20);
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
              <span className="tag">SHEET 04 // CONTACT US</span>
              <div className="rule"></div>
            </div>
            <h1>Contact us</h1>
            <p className="hero-sub" style={{ maxWidth: '680px', marginTop: '12px', fontSize: '16.5px', color: 'var(--ink-soft)' }}>
              Ready to start a project, collaborate, or just say hello? Drop us a message — we typically reply within 24 hours.
            </p>
          </div>
        </section>

        {/* Contact Main Grid Section */}
        <section style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="contact-grid">
              
              {/* Left Column: Project Form */}
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="corner"></div>
                <h3>Project Inquiry</h3>
                <p className="sub">Tell us about your brand, requirements, budget, and timeline.</p>

                {/* Name & Email Fields */}
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="name">Your name *</label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="Jane Doe"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="email">Your email *</label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Services Selection */}
                <div className="field" style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '10px' }}>Services *</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {AVAILABLE_SERVICES.map((svc) => {
                      const isSelected = form.services.includes(svc);
                      return (
                        <button
                          type="button"
                          key={svc}
                          onClick={() => handleServiceToggle(svc)}
                          style={{
                            padding: '8px 14px',
                            fontSize: '12.5px',
                            fontFamily: "'IBM Plex Mono', monospace",
                            letterSpacing: '0.02em',
                            borderRadius: '2px',
                            border: isSelected ? '1.5px solid var(--pine)' : '1px solid var(--ink-soft)',
                            background: isSelected ? 'rgba(38, 59, 49, 0.12)' : 'var(--paper)',
                            color: isSelected ? 'var(--pine)' : 'var(--ink)',
                            fontWeight: isSelected ? '600' : '400',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {isSelected ? '✓ ' : '+ '}{svc}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Budget & Timeline Row */}
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="budget">Estimated Budget *</label>
                    <select id="budget" required value={form.budget} onChange={handleChange}>
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

                  <div className="field">
                    <label htmlFor="timeline">Project Timeline *</label>
                    <select id="timeline" required value={form.timeline} onChange={handleChange}>
                      {TIMELINES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message Field */}
                <div className="field">
                  <label htmlFor="message">Your message</label>
                  <textarea
                    id="message"
                    required
                    placeholder="Share your goals, product category, deliverables, or questions..."
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button type="submit" className="form-submit" style={{ marginTop: '8px' }}>
                  Submit Project Query <ArrowIcon size={13} />
                </button>

                {/* Terms Agreement Note */}
                <p className="form-fine" style={{ marginTop: '16px', fontSize: '12px', color: 'var(--ink-soft)', lineHeight: 1.5 }}>
                  By submitting, you agree to our <span style={{ textDecoration: 'underline', color: 'var(--ink)' }}>Terms</span> and <span style={{ textDecoration: 'underline', color: 'var(--ink)' }}>Privacy Policy</span>.
                </p>
              </form>

              {/* Right Column: Studio Contact, Locations, Hours & Social */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* 1. Main Studio Contact Details Card */}
                <div className="info-card" style={{ border: '1px solid var(--ink)', background: 'var(--card)' }}>
                  <div className="head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>STUDIO CONTACT DETAILS</span>
                    <span style={{ color: 'var(--pine)', fontWeight: 600 }}>● DIRECT CHANNELS</span>
                  </div>
                  
                  {/* Email */}
                  <div className="info-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '16px 20px', borderBottom: '1px dashed var(--paper-line)' }}>
                    <span style={{ fontWeight: 600, color: 'var(--ink)' }}>Email Address</span>
                    <a href={MAILTO_URL} className="val" style={{ color: 'var(--pine)', fontWeight: 600, textDecoration: 'none', wordBreak: 'break-all' }}>
                      {CONTACT_EMAIL}
                    </a>
                  </div>

                  {/* Phone Numbers */}
                  <div className="info-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '16px 20px', borderBottom: '1px dashed var(--paper-line)' }}>
                    <span style={{ fontWeight: 600, color: 'var(--ink)' }}>Phone</span>
                    <div className="val" style={{ textAlign: 'right' }}>
                      <div>
                        <a href="tel:+919428859768" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 500 }}>+91 94288 59768</a>
                        <span className="mono" style={{ fontSize: '10.5px', color: 'var(--ink-soft)', marginLeft: '6px' }}>(India)</span>
                      </div>
                      <div style={{ marginTop: '4px' }}>
                        <a href="tel:+13475550123" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 500 }}>+1 (347) 555-0123</a>
                        <span className="mono" style={{ fontSize: '10.5px', color: 'var(--ink-soft)', marginLeft: '6px' }}>(USA)</span>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Direct */}
                  <div className="info-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '16px 20px', borderBottom: '1px dashed var(--paper-line)' }}>
                    <span style={{ fontWeight: 600, color: 'var(--ink)' }}>WhatsApp</span>
                    <div className="val" style={{ textAlign: 'right' }}>
                      <div>
                        <a href="https://wa.me/919428859768" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--pine)', textDecoration: 'none', fontWeight: 600 }}>
                          +91 94288 59768
                        </a>
                        <span className="mono" style={{ fontSize: '10.5px', color: 'var(--ink-soft)', marginLeft: '6px' }}>(India)</span>
                      </div>
                      <div style={{ marginTop: '4px' }}>
                        <a href="https://wa.me/13475550123" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--pine)', textDecoration: 'none', fontWeight: 600 }}>
                          +1 (347) 555-0123
                        </a>
                        <span className="mono" style={{ fontSize: '10.5px', color: 'var(--ink-soft)', marginLeft: '6px' }}>(USA)</span>
                      </div>
                    </div>
                  </div>

                  {/* Operating Hours */}
                  <div className="info-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '16px 20px', borderBottom: '1px dashed var(--paper-line)' }}>
                    <span style={{ fontWeight: 600, color: 'var(--ink)' }}>Hours</span>
                    <div className="val" style={{ textAlign: 'right', fontSize: '13px' }}>
                      <div style={{ fontWeight: 600 }}>Monday – Friday</div>
                      <div style={{ color: 'var(--ink-soft)', marginTop: '2px' }}>9:00 AM – 6:00 PM (EST)</div>
                    </div>
                  </div>

                  {/* Follow Us / Social */}
                  <div className="info-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px' }}>
                    <span style={{ fontWeight: 600, color: 'var(--ink)' }}>Follow Us</span>
                    <div className="val" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                      <a href="https://instagram.com/thedrawingboard.studio" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--pine)', textDecoration: 'none', fontSize: '12.5px', fontWeight: 600 }}>
                        Instagram ↗
                      </a>
                      <a href="https://linkedin.com/company/thedrawingboard" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--pine)', textDecoration: 'none', fontSize: '12.5px', fontWeight: 600 }}>
                        LinkedIn ↗
                      </a>
                      <a href="https://dribbble.com/thedrawingboard" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--pine)', textDecoration: 'none', fontSize: '12.5px', fontWeight: 600 }}>
                        Dribbble ↗
                      </a>
                    </div>
                  </div>
                </div>

                {/* 2. Dedicated Studio Physical Locations Card */}
                <div className="info-card" style={{ border: '1px solid var(--ink)', background: 'var(--card)' }}>
                  <div className="head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>STUDIO PHYSICAL LOCATIONS</span>
                    <span className="mono" style={{ fontSize: '11px' }}>INDIA // USA</span>
                  </div>

                  {/* India Location */}
                  <div style={{ padding: '18px 20px', borderBottom: '1px dashed var(--paper-line)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 6px', background: 'var(--pine)', color: '#FFF', borderRadius: '2px', fontFamily: "'IBM Plex Mono', monospace" }}>INDIA</span>
                      <h4 style={{ fontSize: '14px', margin: 0, color: 'var(--ink)' }}>Kolkata Studio</h4>
                    </div>
                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--ink-soft)', lineHeight: 1.55 }}>
                      25, Netaji Subhas Rd, Fairley Place, B.B.D. Bagh, Kolkata, West Bengal 700001
                    </p>
                  </div>

                  {/* USA Location */}
                  <div style={{ padding: '18px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 6px', background: 'var(--ink)', color: '#FFF', borderRadius: '2px', fontFamily: "'IBM Plex Mono', monospace" }}>USA</span>
                      <h4 style={{ fontSize: '14px', margin: 0, color: 'var(--ink)' }}>New York Atelier</h4>
                    </div>
                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--ink-soft)', lineHeight: 1.55 }}>
                      Brooklyn, New York 123 Wythe Avenue, Suite 4B Brooklyn, NY 11249
                    </p>
                  </div>
                </div>

                {/* 3. Quick Action Buttons */}
                <div className="quick-links">
                  <BookCallLink className="quick-link pine">
                    <span>Book 15-Min Discovery Call</span>
                    <span>&rarr;</span>
                  </BookCallLink>
                  <a href={MAILTO_URL} className="quick-link">
                    <span>Email Studio ({CONTACT_EMAIL})</span>
                    <span>&rarr;</span>
                  </a>
                  <a href="https://wa.me/919428859768" target="_blank" rel="noopener noreferrer" className="quick-link">
                    <span>WhatsApp India (+91 94288 59768)</span>
                    <span>&rarr;</span>
                  </a>
                  <a href="https://wa.me/13475550123" target="_blank" rel="noopener noreferrer" className="quick-link">
                    <span>WhatsApp US (+1 347 555-0123)</span>
                    <span>&rarr;</span>
                  </a>
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
            <BookCallLink className="btn-primary">Schedule Calendar Call &rarr;</BookCallLink>
          </div>
        </section>

        <StickyMobileCTA
          title="Contact Studio"
          subtitle="Q3 Slot Availability"
          buttonText="WhatsApp Us"
          link="https://wa.me/919428859768?text=Hello%20The%20Drawing%20Board%2C%20I%20am%20interested%20in%20discussing%20a%20project!"
        />
        <Footer />
      </div>
    </>
  );
}
