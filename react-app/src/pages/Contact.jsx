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

const ROLES = [
  'Founder',
  'C-level Executive',
  'Team Member',
  'Investor',
  'Other'
];

const REVENUE_RANGES = [
  'Less than $50,000',
  '50k - 100k',
  '100k - 250k',
  '250k - 500k',
  '500k - 1M',
  '1M - 5M',
  '5M - 25 M',
  'Other'
];

const TEAM_STRUCTURES = [
  'Solo founder + freelancers',
  'Small in-house team with no brand lead',
  'Ops/marketing/brand manager in-house',
  'Full leadership team and scale-ready org chart'
];

const CHALLENGES = [
  'We’re launching and need clarity on our positioning, brand strategy, and identity system.',
  'Our brand feels inconsistent, we need a clear strategy and a unified visual identity.',
  'Our communication (voice, messaging, guidelines) isn’t consistent across teams or channels.',
  'We’re scaling and need packaging, identity, and brand systems that work across formats and geographies.',
  'We’ve outgrown our current brand and need to rethink our foundation before expanding.',
  'We’re preparing for fundraising or expansion and need a sharper, more cohesive brand.'
];

const BUDGET_OPTIONS = [
  { group: 'USD ($)', options: ['$ 2,500', '$ 3,000 - $4,000', '$ 5,000 - $ 10,000', '$ 10,000 - 20,000', '$ 20,000+'] },
  { group: 'INR (₹)', options: ['₹1,75,000 – ₹2,50,000', '₹2,50,000 – ₹5,00,000', '₹5,00,000 – ₹10,00,000', '₹10,00,000+'] }
];

const TIMELINE_OPTIONS = [
  'Immediately',
  'Within 30 days',
  'Within 60–90 days'
];

export default function Contact() {
  const [openFaq, setOpenFaq] = useState(null);
  const [showChannelModal, setShowChannelModal] = useState(false);
  const pageRef = useRef(null);
  const navigate = useNavigate();

  // Controlled form state containing all questionnaire fields
  const [form, setForm] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    email: '',
    companyName: '',
    role: '',
    website: '',
    annualRevenue: '',
    teamStructure: '',
    primaryChallenge: '',
    services: ['Branding'],
    budget: '$ 3,000 - $4,000',
    timeline: 'Immediately',
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
    setShowChannelModal(true);
  };

  // Structured brief builder (Strictly NO emojis for 100% OS consistency)
  const buildBriefText = (channel = 'whatsapp') => {
    if (channel === 'whatsapp') {
      return [
        `Hello The Drawing Board!`,
        ``,
        `*PROJECT INQUIRY BRIEF*`,
        ``,
        `*Client Name:* ${form.name}`,
        `*Email:* ${form.email}`,
        `*Phone Number:* ${form.phone || 'N/A'}`,
        `*WhatsApp Number:* ${form.whatsapp || 'N/A'}`,
        ``,
        `*Company / Brand:* ${form.companyName || 'N/A'}`,
        `*Role:* ${form.role || 'N/A'}`,
        `*Website / Social:* ${form.website || 'N/A'}`,
        `*Annual Revenue:* ${form.annualRevenue || 'N/A'}`,
        `*Team Structure:* ${form.teamStructure || 'N/A'}`,
        ``,
        `*Primary Challenge:*`,
        `${form.primaryChallenge || 'N/A'}`,
        ``,
        `*Services Requested:* ${form.services.join(', ')}`,
        `*Allocated Budget:* ${form.budget}`,
        `*Project Start Timeline:* ${form.timeline}`,
        ``,
        `*About the Brand / Product / Idea:*`,
        form.message || 'Ready to start project discussion.',
        ``,
        `---`,
        `Sent via drawingsboards.com/contact`
      ].join('\n');
    }

    // Email plain text format
    return [
      `PROJECT INQUIRY BRIEF — THE DRAWING BOARD`,
      `========================================`,
      ``,
      `[01. CONTACT DETAILS]`,
      `Client Name: ${form.name}`,
      `Email Address: ${form.email}`,
      `Phone Number: ${form.phone || 'N/A'}`,
      `WhatsApp Number: ${form.whatsapp || 'N/A'}`,
      ``,
      `[02. COMPANY & ORGANIZATION]`,
      `Company / Brand Name: ${form.companyName || 'N/A'}`,
      `Role within Company: ${form.role || 'N/A'}`,
      `Website / Social Profile: ${form.website || 'N/A'}`,
      `Current Annual Revenue: ${form.annualRevenue || 'N/A'}`,
      `Team Structure: ${form.teamStructure || 'N/A'}`,
      ``,
      `[03. PROJECT SCOPE & CHALLENGE]`,
      `Primary Challenge:`,
      `${form.primaryChallenge || 'N/A'}`,
      ``,
      `Services Requested: ${form.services.join(', ')}`,
      `Allocated Budget: ${form.budget}`,
      `Project Start Timeline: ${form.timeline}`,
      ``,
      `[04. BRAND / PRODUCT / VISION DETAILS]`,
      form.message || 'Ready to start project discussion.',
      ``,
      `----------------------------------------`,
      `Submitted via drawingsboards.com/contact`
    ].join('\n');
  };

  const handleSendWhatsApp = () => {
    const msg = buildBriefText('whatsapp');
    const waUrl = `https://wa.me/919428859768?text=${encodeURIComponent(msg)}`;

    // 1. Dispatch Meta Conversions API (CAPI) & Pixel lead event
    trackMetaFormSubmission({
      name: form.name,
      phone: form.phone || form.whatsapp,
      email: form.email,
      channel: 'WhatsApp',
      services: form.services.join(', '),
      budget: form.budget,
      timeline: form.timeline,
      company: form.companyName,
      role: form.role,
      annualRevenue: form.annualRevenue,
      teamStructure: form.teamStructure,
      primaryChallenge: form.primaryChallenge,
      message: form.message
    });

    setShowChannelModal(false);

    // 2. Open WhatsApp in new tab / app
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    // 3. Navigate current tab to /thank-you immediately
    navigate('/thank-you');
  };

  const handleSendMail = () => {
    const body = buildBriefText('mail');
    const subject = `Project Inquiry: ${form.name} — ${form.companyName || 'New Project'}`;
    const mailUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // 1. Dispatch Meta Conversions API (CAPI) & Pixel lead event
    trackMetaFormSubmission({
      name: form.name,
      phone: form.phone || form.whatsapp,
      email: form.email,
      channel: 'Email',
      services: form.services.join(', '),
      budget: form.budget,
      timeline: form.timeline,
      company: form.companyName,
      role: form.role,
      annualRevenue: form.annualRevenue,
      teamStructure: form.teamStructure,
      primaryChallenge: form.primaryChallenge,
      message: form.message
    });

    setShowChannelModal(false);

    // 2. Open default email client / webmail
    window.location.href = mailUrl;

    // 3. Navigate current tab to /thank-you
    setTimeout(() => {
      navigate('/thank-you');
    }, 250);
  };

  return (
    <>
      <div ref={pageRef}>
        <RegistrationMarks />
        <Navbar />

        {/* ── Smooth Interactive Channel Choice Modal ──────────────────── */}
        {showChannelModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(27, 27, 23, 0.72)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
            onClick={() => setShowChannelModal(false)}
          >
            <div
              style={{
                background: 'var(--paper)',
                border: '1.5px solid var(--ink)',
                maxWidth: '490px',
                width: '100%',
                padding: '32px 28px',
                position: 'relative',
                boxShadow: '0 24px 50px rgba(0,0,0,0.28)',
                borderRadius: '4px'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Corner mark */}
              <div
                style={{
                  position: 'absolute',
                  top: '-1px',
                  right: '-1px',
                  width: '26px',
                  height: '26px',
                  background: 'var(--marker)',
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%)'
                }}
              />

              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', color: 'var(--pine)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>
                // TRANSMISSION READY · SELECT CHANNEL
              </div>

              <h3 style={{ fontSize: '22px', fontFamily: "'Fraunces', serif", margin: '0 0 10px 0', color: 'var(--ink)' }}>
                How would you like to continue?
              </h3>

              <p style={{ fontSize: '14px', color: 'var(--ink-soft)', lineHeight: 1.5, margin: '0 0 24px 0' }}>
                Your project brief has been formatted. Choose your preferred channel to transmit directly to our team:
              </p>

              {/* 2 Smooth Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                
                {/* Option 1: Continue with WhatsApp */}
                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  style={{
                    background: '#24463B',
                    color: '#FFF',
                    border: '1.5px solid #24463B',
                    padding: '16px 20px',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    transition: 'transform 0.15s ease, background 0.15s ease',
                    boxShadow: '0 4px 12px rgba(36, 70, 59, 0.18)'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '15px', letterSpacing: '0.01em' }}>
                      Continue with WhatsApp
                    </div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.85)', marginTop: '2px', fontFamily: "'IBM Plex Mono', monospace" }}>
                      Instant direct chat · +91 94288 59768
                    </div>
                  </div>
                  <span style={{ fontSize: '18px', fontWeight: 700 }}>→</span>
                </button>

                {/* Option 2: Continue with Mail */}
                <button
                  type="button"
                  onClick={handleSendMail}
                  style={{
                    background: 'var(--card)',
                    color: 'var(--ink)',
                    border: '1.5px solid var(--ink)',
                    padding: '16px 20px',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    transition: 'transform 0.15s ease, background 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.background = 'var(--paper)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.background = 'var(--card)';
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '15px', letterSpacing: '0.01em' }}>
                      Continue with Mail
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--ink-soft)', marginTop: '2px', fontFamily: "'IBM Plex Mono', monospace" }}>
                      Open pre-filled draft to Dandelionpa7@gmail.com
                    </div>
                  </div>
                  <span style={{ fontSize: '18px', fontWeight: 700 }}>→</span>
                </button>

              </div>

              {/* Dismiss / Review Button */}
              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button
                  type="button"
                  onClick={() => setShowChannelModal(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--ink-soft)',
                    fontSize: '12.5px',
                    cursor: 'pointer',
                    fontFamily: "'IBM Plex Mono', monospace",
                    textDecoration: 'underline'
                  }}
                >
                  ← Back to review form details
                </button>
              </div>

            </div>
          </div>
        )}

        <style>{`
          .contact-section-divider {
            margin: 24px 0 16px 0;
            padding-bottom: 8px;
            border-bottom: 1px dashed var(--paper-line);
            font-family: 'IBM Plex Mono', monospace;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            color: var(--pine);
            font-weight: 600;
          }
          .contact-form select {
            width: 100%;
            background: var(--paper);
            border: 1px solid var(--ink-soft);
            padding: 12px 14px;
            font-size: 13.5px;
            font-family: inherit;
            color: var(--ink);
            border-radius: 2px;
            outline: none;
            transition: border-color 0.2s ease;
          }
          .contact-form select:focus {
            border-color: var(--pine);
          }
          .contact-form input, .contact-form textarea {
            width: 100%;
            background: var(--paper);
            border: 1px solid var(--ink-soft);
            padding: 12px 14px;
            font-size: 13.5px;
            font-family: inherit;
            color: var(--ink);
            border-radius: 2px;
            outline: none;
            transition: border-color 0.2s ease;
          }
          .contact-form input:focus, .contact-form textarea:focus {
            border-color: var(--pine);
          }
          .field-note {
            font-size: 11.5px;
            color: var(--ink-soft);
            margin-top: 4px;
            font-family: 'IBM Plex Mono', monospace;
          }
        `}</style>

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

                {/* Section 1: Contact Details */}
                <div className="contact-section-divider">// 01 · CONTACT DETAILS</div>

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

                {/* Phone & WhatsApp Fields */}
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      placeholder="+1 (555) 000-0000 / +91 ..."
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="whatsapp">WhatsApp Number *</label>
                    <input
                      type="tel"
                      id="whatsapp"
                      required
                      placeholder="+91 94288 59768 / +1 ..."
                      value={form.whatsapp}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Section 2: Company & Org Context */}
                <div className="contact-section-divider">// 02 · COMPANY & ORGANIZATION</div>

                {/* Company Name & Role */}
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="companyName">What is the name of your company or brand? *</label>
                    <input
                      type="text"
                      id="companyName"
                      required
                      placeholder="Acme Studio / Brand Name"
                      value={form.companyName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="role">What is your role within the company? *</label>
                    <select id="role" required value={form.role} onChange={handleChange}>
                      <option value="" disabled>Select your role...</option>
                      {ROLES.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Website / Social Link */}
                <div className="field">
                  <label htmlFor="website">Company Website or Social Media link (if you have any)</label>
                  <input
                    type="text"
                    id="website"
                    placeholder="https://yourbrand.com or @instagram / LinkedIn profile"
                    value={form.website}
                    onChange={handleChange}
                  />
                </div>

                {/* Revenue & Team Structure */}
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="annualRevenue">What is your current annual revenue? *</label>
                    <select id="annualRevenue" required value={form.annualRevenue} onChange={handleChange}>
                      <option value="" disabled>Select revenue range...</option>
                      {REVENUE_RANGES.map((rev) => (
                        <option key={rev} value={rev}>{rev}</option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="teamStructure">What does your current team structure look like? *</label>
                    <select id="teamStructure" required value={form.teamStructure} onChange={handleChange}>
                      <option value="" disabled>Select team structure...</option>
                      {TEAM_STRUCTURES.map((ts) => (
                        <option key={ts} value={ts}>{ts}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Section 3: Project Scope & Strategy */}
                <div className="contact-section-divider">// 03 · PROJECT SCOPE & CHALLENGE</div>

                {/* Primary Challenge */}
                <div className="field">
                  <label htmlFor="primaryChallenge">What best describes the challenge you’re trying to solve? *</label>
                  <select id="primaryChallenge" required value={form.primaryChallenge} onChange={handleChange}>
                    <option value="" disabled>Select the primary challenge...</option>
                    {CHALLENGES.map((ch) => (
                      <option key={ch} value={ch}>{ch}</option>
                    ))}
                  </select>
                </div>

                {/* Services Selection */}
                <div className="field" style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px' }}>Services *</label>
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
                    <label htmlFor="budget">What budget have you allocated for this work? *</label>
                    <div className="field-note">(Our strategy-led projects typically start at $2,500 and scale based on scope.)</div>
                    <select id="budget" required value={form.budget} onChange={handleChange} style={{ marginTop: '6px' }}>
                      {BUDGET_OPTIONS.map((grp) => (
                        <optgroup key={grp.group} label={`— ${grp.group} —`}>
                          {grp.options.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>

                  <div className="field">
                    <label htmlFor="timeline">How soon are you planning to begin this project? *</label>
                    <select id="timeline" required value={form.timeline} onChange={handleChange}>
                      {TIMELINE_OPTIONS.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Section 4: Brand & Product Vision */}
                <div className="contact-section-divider">// 04 · BRAND VISION & DETAILS</div>

                {/* Message Field */}
                <div className="field">
                  <label htmlFor="message">Tell us more about your brand/idea/product ?</label>
                  <textarea
                    id="message"
                    placeholder="Share your goals, product category, deliverables, vision, or questions..."
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
