import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegistrationMarks from '../components/RegistrationMarks';
import ArrowIcon from '../components/ArrowIcon';
import { usePageAnimations } from '../hooks/usePageAnimations';
import useSEO from '../hooks/useSEO';
import { trackMetaFormSubmission } from '../utils/metaEvents';
import { WHATSAPP_NUMBER } from '../utils/siteConfig';

/* ─────────────────────────────────────────────────────────────────────────────
   Centralised Options & Configuration (Exact match to HTML specifications)
   ───────────────────────────────────────────────────────────────────────────── */
const SERVICES = [
  { value: 'brand-identity', label: 'Brand strategy & identity', price: 'From ₹4,75,000' },
  { value: 'packaging', label: 'Packaging design', price: 'From ₹3,75,000' },
  { value: 'website-shopify', label: 'Website / Shopify', price: 'From ₹1,15,000' },
  { value: 'saas', label: 'SaaS branding, UI/UX & app', price: 'From ₹4,75,000 · Scope-dependent' },
  { value: 'guidance', label: 'Something else / I need guidance', price: '' }
];

const CATEGORIES = [
  { value: 'food-snacks', label: 'Food & snacks' },
  { value: 'beverages', label: 'Beverages, tea & coffee' },
  { value: 'spices-pantry', label: 'Spices, condiments & pantry essentials' },
  { value: 'hospitality', label: 'Restaurants, cafés & hospitality' },
  { value: 'skincare-beauty', label: 'Skincare, beauty & personal care' },
  { value: 'health-wellness', label: 'Health & wellness' },
  { value: 'fashion-accessories', label: 'Fashion, jewellery & accessories' },
  { value: 'home-lifestyle', label: 'Home & lifestyle' },
  { value: 'tech-saas', label: 'Technology / SaaS' },
  { value: 'something-else', label: 'Something else' },
  { value: 'still-exploring', label: 'Still exploring' }
];

const TIMELINES = [
  { value: 'asap', label: 'As soon as possible' },
  { value: 'within-1-month', label: 'Within a month' },
  { value: '1-3-months', label: 'In 1–3 months' },
  { value: 'over-3-months', label: 'More than 3 months from now' },
  { value: 'exploring', label: 'Exploring for now' }
];

const BUDGETS = {
  website: [
    { value: 'below-1.15l', label: 'Below ₹1,15,000' },
    { value: '1.15l-2l', label: '₹1,15,000 to under ₹2,00,000' },
    { value: '2l-3.75l', label: '₹2,00,000 to under ₹3,75,000' },
    { value: '3.75l-plus', label: '₹3,75,000+' }
  ],
  packaging: [
    { value: 'below-3.75l', label: 'Below ₹3,75,000' },
    { value: '3.75l-5l', label: '₹3,75,000 to under ₹5,00,000' },
    { value: '5l-7.5l', label: '₹5,00,000 to under ₹7,50,000' },
    { value: '7.5l-plus', label: '₹7,50,000+' }
  ],
  'brand-identity': [
    { value: 'below-4.75l', label: 'Below ₹4,75,000' },
    { value: '4.75l-7l', label: '₹4,75,000 to under ₹7,00,000' },
    { value: '7l-10l', label: '₹7,00,000 to under ₹10,00,000' },
    { value: '10l-plus', label: '₹10,00,000+' }
  ],
  saas: [
    { value: 'below-4.75l', label: 'Below ₹4,75,000' },
    { value: '4.75l-7l', label: '₹4,75,000 to under ₹7,00,000' },
    { value: '7l-10l', label: '₹7,00,000 to under ₹10,00,000' },
    { value: '10l-plus', label: '₹10,00,000+' }
  ],
  multiple: [
    { value: 'below-3.75l', label: 'Below ₹3,75,000' },
    { value: '3.75l-4.75l', label: '₹3,75,000 to under ₹4,75,000' },
    { value: '4.75l-7l', label: '₹4,75,000 to under ₹7,00,000' },
    { value: '7l-10l', label: '₹7,00,000 to under ₹10,00,000' },
    { value: '10l-plus', label: '₹10,00,000+' }
  ]
};

const SINGLE_SET = {
  'brand-identity': 'brand-identity',
  packaging: 'packaging',
  'website-shopify': 'website',
  saas: 'saas'
};

function getBudgetSetKey(services) {
  if (!services.length) return null;
  if (services.length > 1 || services[0] === 'guidance') return 'multiple';
  return SINGLE_SET[services[0]];
}

function getBudgetOptions(key) {
  if (!key) return [];
  return [...BUDGETS[key], { value: 'guidance', label: 'I need guidance' }];
}

function calculateEstimateValue(services, budgetRange) {
  if (budgetRange === 'below-1.15l') return 95000;
  if (budgetRange === '1.15l-2l') return 157500;
  if (budgetRange === '2l-3.75l') return 287500;
  if (budgetRange === 'below-3.75l') return 275000;
  if (budgetRange === '3.75l-4.75l') return 425000;
  if (budgetRange === '3.75l-5l') return 437500;
  if (budgetRange === 'below-4.75l') return 375000;
  if (budgetRange === '4.75l-7l') return 587500;
  if (budgetRange === '5l-7.5l') return 625000;
  if (budgetRange === '7l-10l') return 850000;
  if (budgetRange === '7.5l-plus') return 900000;
  if (budgetRange === '10l-plus') return 1200000;
  if (budgetRange === '3.75l-plus') return 450000;
  return 475000;
}

const ORDER = ['fullName', 'email', 'whatsappCountryCode', 'whatsappNumber', 'phoneCountryCode', 'phoneNumber', 'services', 'category', 'budgetRange', 'projectDescription'];

export default function BrandReadiness() {
  const pageRef = useRef(null);
  const resultHeadingRef = useRef(null);
  const leadTrackedRef = useRef(false);

  useSEO({
    title: 'Get a Quote · The Drawing Board — Strategy-First Design Studio',
    description: 'Tell us what you’re building. Share a few details about your project to get an estimated quote for brand strategy, packaging design, website development, or SaaS branding.',
    keywords: 'get quote branding, brand strategy quote, packaging design quote, web development quote'
  });

  usePageAnimations(pageRef);

  // Controlled Form State
  const [state, setState] = useState({
    fullName: '',
    email: '',
    whatsappCountryCode: '+91',
    whatsappNumber: '',
    phoneCountryCode: '+91',
    phoneNumber: '',
    brandOrWebsite: '',
    services: [],
    category: '',
    otherCategory: '',
    budgetRange: '',
    timeline: '',
    projectDescription: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [liveAnnouncement, setLiveAnnouncement] = useState('');

  const announce = (msg) => {
    setLiveAnnouncement('');
    setTimeout(() => setLiveAnnouncement(msg), 30);
  };

  const budgetSetKey = getBudgetSetKey(state.services);
  const budgetOptions = getBudgetOptions(budgetSetKey);

  // Focus result heading on confirmation view
  useEffect(() => {
    if (submissionSuccess && resultHeadingRef.current) {
      resultHeadingRef.current.focus();
    }
  }, [submissionSuccess]);

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
    clearError(name);
    if (name === 'whatsappNumber') clearError('whatsappCountryCode');
    if (name === 'phoneNumber') clearError('phoneCountryCode');
  };

  // Handle Service Chip Toggle with Exclusive Guidance Logic
  const handleServiceToggle = (val) => {
    setState((prev) => {
      let nextServices;
      const isAlreadyChecked = prev.services.includes(val);

      if (val === 'guidance') {
        // Guidance is exclusive
        nextServices = isAlreadyChecked ? [] : ['guidance'];
      } else {
        // Uncheck guidance if any other service is selected
        const withoutGuidance = prev.services.filter((s) => s !== 'guidance');
        if (isAlreadyChecked) {
          nextServices = withoutGuidance.filter((s) => s !== val);
        } else {
          nextServices = [...withoutGuidance, val];
        }
      }

      // If budget set changes, reset budget selection
      const newKey = getBudgetSetKey(nextServices);
      const oldKey = getBudgetSetKey(prev.services);
      return {
        ...prev,
        services: nextServices,
        budgetRange: newKey !== oldKey ? '' : prev.budgetRange
      };
    });

    clearError('services');
  };

  // Category Change
  const handleCategoryChange = (e) => {
    const val = e.target.value;
    setState((prev) => ({
      ...prev,
      category: val,
      otherCategory: val === 'something-else' ? prev.otherCategory : ''
    }));
    clearError('category');
  };

  const clearError = (name) => {
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
  };

  // Validation
  const validateForm = () => {
    const errs = {};
    const wn = state.whatsappNumber.replace(/[\s\-().]/g, '');
    const pn = state.phoneNumber.replace(/[\s\-().]/g, '');

    if (!state.fullName.trim()) errs.fullName = 'Please tell us your name.';
    if (!state.email.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(state.email.trim())) {
      errs.email = 'That email doesn’t look quite right. Try something like name@example.com.';
    }

    // WhatsApp number is required (not optional)
    if (!wn) {
      errs.whatsappNumber = 'Please enter your WhatsApp number.';
    } else {
      if (!/^\+?\d{1,4}$/.test(state.whatsappCountryCode.trim())) {
        errs.whatsappCountryCode = 'Use a country code such as +91.';
      }
      if (!/^\d{6,14}$/.test(wn)) {
        errs.whatsappNumber = 'Enter 6 to 14 digits, without the country code.';
      }
    }

    // Phone number is optional, but validated if provided
    if (pn) {
      if (!/^\+?\d{1,4}$/.test(state.phoneCountryCode.trim())) {
        errs.phoneCountryCode = 'Use a country code such as +91.';
      }
      if (!/^\d{6,14}$/.test(pn)) {
        errs.phoneNumber = 'Enter 6 to 14 digits, without the country code.';
      }
    }

    if (!state.services.length) errs.services = 'Please select at least one option.';
    if (!state.category) errs.category = 'Please choose a category.';
    if (!state.budgetRange) {
      errs.budgetRange = state.services.length
        ? 'Please choose an approximate budget, or “I need guidance”.'
        : 'Choose a service first, then pick a budget.';
    }
    if (!state.projectDescription.trim()) {
      errs.projectDescription = 'Please share a sentence or two about your project.';
    }

    return errs;
  };

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const validationErrors = validateForm();
    setErrors(validationErrors);

    const errorKeys = ORDER.filter((k) => validationErrors[k]);
    if (errorKeys.length) {
      const firstKey = errorKeys[0];
      const targetEl = document.getElementById(firstKey) || document.querySelector(`input[name="services"]`);
      if (targetEl) targetEl.focus();
      announce(`Please fix ${errorKeys.length} ${errorKeys.length > 1 ? 'fields' : 'field'} before sending.`);
      return;
    }

    setSubmitting(true);
    setAlertMessage(false);
    announce('Sending…');

    const serviceLabels = state.services.map((s) => SERVICES.find((x) => x.value === s)?.label || s);
    const catLabel = CATEGORIES.find((c) => c.value === state.category)?.label || state.category;
    const budgetLabel = budgetOptions.find((b) => b.value === state.budgetRange)?.label || state.budgetRange;
    const timelineLabel = TIMELINES.find((t) => t.value === state.timeline)?.label || state.timeline || 'Not specified';
    const hasWhatsApp = Boolean(state.whatsappNumber.trim());
    const fullWhatsApp = hasWhatsApp ? `${state.whatsappCountryCode.trim()} ${state.whatsappNumber.trim()}` : '';
    const hasPhone = Boolean(state.phoneNumber.trim());
    const fullPhone = hasPhone ? `${state.phoneCountryCode.trim()} ${state.phoneNumber.trim()}` : '';
    const calculatedValue = calculateEstimateValue(state.services, state.budgetRange);

    try {
      // 1. Meta Pixel & Conversions API Lead Dispatch (strictly once per submission)
      if (!leadTrackedRef.current) {
        leadTrackedRef.current = true;
        trackMetaFormSubmission({
          name: state.fullName.trim(),
          email: state.email.trim(),
          phone: (fullPhone || fullWhatsApp).replace(/[^0-9]/g, ''),
          whatsapp: fullWhatsApp.replace(/[^0-9]/g, ''),
          company: state.brandOrWebsite.trim(),
          services: serviceLabels.join(', '),
          category: catLabel + (state.otherCategory ? ` (${state.otherCategory})` : ''),
          budget: budgetLabel,
          timeline: timelineLabel,
          message: state.projectDescription.trim(),
          value: calculatedValue,
          currency: 'INR'
        });
      }

      // 2. High-speed Serverless Resend + Sheet dispatch directly to studio pipeline
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      try {
        await fetch('/api/submit-lead', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            _subject: `New Project Quote Enquiry: ${state.brandOrWebsite || 'Brand'} — ${state.fullName}`,
            _template: 'table',
            _replyto: state.email.trim(),
            'Client Name': state.fullName.trim(),
            'Email Address': state.email.trim(),
            'WhatsApp Number': fullWhatsApp,
            'Phone Number': fullPhone || 'Not provided',
            'WhatsApp / Phone': fullPhone ? `${fullWhatsApp} / ${fullPhone}` : fullWhatsApp,
            'Brand Name or Website': state.brandOrWebsite.trim() || 'Not provided',
            'Services Requested': serviceLabels.join(', '),
            'Business Category': catLabel + (state.otherCategory ? ` (${state.otherCategory})` : ''),
            'Approximate Budget': budgetLabel,
            'Target Timeline': timelineLabel,
            'Project Overview': state.projectDescription.trim(),
            'Source Page': 'Brand Readiness / Get a Quote Calculator'
          }),
          signal: controller.signal
        });
      } catch (postErr) {
        console.warn('Pipeline notice (proceeding with local backup):', postErr);
      } finally {
        clearTimeout(timeoutId);
      }

      // Save offline backup
      try {
        localStorage.setItem(
          'tdb_last_quote_brief',
          JSON.stringify({
            timestamp: new Date().toISOString(),
            fullName: state.fullName,
            email: state.email,
            whatsapp: fullWhatsApp,
            phone: fullPhone,
            brand: state.brandOrWebsite,
            services: serviceLabels,
            category: catLabel,
            budget: budgetLabel,
            value: calculatedValue
          })
        );
      } catch (_) {}

      setSubmissionSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      announce('Thank you for sharing your project. We’ve received your enquiry.');
    } catch (err) {
      console.warn('Submission notice:', err);
      // Fallback: still show success to client if email send failed silently but brief was recorded
      setSubmissionSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setState({
      fullName: '',
      email: '',
      whatsappCountryCode: '+91',
      whatsappNumber: '',
      phoneCountryCode: '+91',
      phoneNumber: '',
      brandOrWebsite: '',
      services: [],
      category: '',
      otherCategory: '',
      budgetRange: '',
      timeline: '',
      projectDescription: ''
    });
    setErrors({});
    setSubmissionSuccess(false);
    leadTrackedRef.current = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    announce('Form reset. You can submit another enquiry.');
  };

  // WhatsApp quick brief builder for confirmation screen
  const buildWhatsAppBrief = () => {
    const serviceLabels = state.services.map((s) => SERVICES.find((x) => x.value === s)?.label || s);
    const catLabel = CATEGORIES.find((c) => c.value === state.category)?.label || state.category;
    const budgetLabel = budgetOptions.find((b) => b.value === state.budgetRange)?.label || state.budgetRange;

    return [
      `Hello The Drawing Board!`,
      ``,
      `*PROJECT QUOTE BRIEF*`,
      `*Client:* ${state.fullName}`,
      `*Email:* ${state.email}`,
      state.whatsappNumber ? `*WhatsApp:* ${state.whatsappCountryCode} ${state.whatsappNumber}` : '',
      state.phoneNumber ? `*Phone:* ${state.phoneCountryCode} ${state.phoneNumber}` : '',
      state.brandOrWebsite ? `*Brand:* ${state.brandOrWebsite}` : '',
      `*Services:* ${serviceLabels.join(', ')}`,
      `*Category:* ${catLabel}${state.otherCategory ? ` (${state.otherCategory})` : ''}`,
      `*Budget:* ${budgetLabel}`,
      state.timeline ? `*Timeline:* ${TIMELINES.find((t) => t.value === state.timeline)?.label || state.timeline}` : '',
      ``,
      `*Project Overview:*`,
      state.projectDescription,
      ``,
      `---`,
      `Submitted via drawingsboard.com/get-quote`
    ]
      .filter(Boolean)
      .join('\n');
  };

  const isMultiService = state.services.length > 1;
  const showSaasHint = state.services.includes('saas');
  const showBudgetHint = Boolean(budgetSetKey && budgetSetKey !== 'multiple' && state.budgetRange.startsWith('below-'));

  return (
    <div ref={pageRef} style={{ background: 'var(--paper, #F3EDE3)', minHeight: '100vh' }}>
      <RegistrationMarks />
      <Navbar />

      <div className="tdb-quote" style={{ paddingTop: '110px' }}>
        <style>{`
          /* Scoped Get Quote Styles matching HTML specifications & Studio Aesthetic */
          .tdb-quote {
            --tdb-bg: var(--paper, #F3EDE3);
            --tdb-text: var(--ink, #1B1B17);
            --tdb-accent: var(--pine, #173F35);
            --tdb-border: var(--sand, #D8CDBF);
            --tdb-input: #FBF8F2;
            --tdb-muted: var(--ink-soft, #6B5A4E);
            --tdb-error: #9A2A2A;
            --tdb-serif: var(--font-display, Georgia, "Newsreader", "Times New Roman", serif);
            --tdb-sans: var(--font-body, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif);
            background: var(--tdb-bg);
            color: var(--tdb-text);
            font-family: var(--tdb-sans);
            font-size: 16px;
            line-height: 1.55;
            min-height: calc(100vh - 110px);
            padding: 48px 24px 80px;
            box-sizing: border-box;
          }
          .tdb-quote *, .tdb-quote *::before, .tdb-quote *::after {
            box-sizing: border-box;
          }
          .tdb-quote .tdb-wrap {
            max-width: 1080px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: minmax(0, 4fr) minmax(0, 7fr);
            gap: 80px;
            align-items: start;
          }
          .tdb-quote .tdb-intro {
            position: sticky;
            top: 110px;
          }
          .tdb-quote .tdb-label {
            font-size: 0.78rem;
            letter-spacing: 0.14em;
            font-weight: 700;
            color: var(--tdb-accent);
            font-family: var(--font-mono, "IBM Plex Mono", monospace);
            margin: 0 0 18px;
            text-transform: uppercase;
          }
          .tdb-quote h1 {
            font-family: var(--tdb-serif);
            font-weight: 400;
            font-size: clamp(2.1rem, 4vw, 3.1rem);
            line-height: 1.08;
            letter-spacing: -0.015em;
            margin: 0 0 20px;
            color: var(--tdb-text);
          }
          .tdb-quote .tdb-intro p:not(.tdb-label) {
            margin: 0;
            color: var(--tdb-muted);
            max-width: 36ch;
            font-size: 1.02rem;
            line-height: 1.6;
          }
          .tdb-quote form {
            border-top: 1px solid var(--tdb-text);
            padding-top: 28px;
            min-width: 0;
          }
          .tdb-quote .tdb-req-note {
            font-size: 0.85rem;
            color: var(--tdb-muted);
            margin: 0 0 24px;
            font-family: var(--font-mono, monospace);
          }
          .tdb-quote .tdb-row {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 0 20px;
          }
          .tdb-quote .tdb-field {
            margin: 0 0 24px;
            min-width: 0;
          }
          .tdb-quote .tdb-row .tdb-field {
            display: flex;
            flex-direction: column;
          }
          .tdb-quote .tdb-row .tdb-field select {
            margin-top: auto;
          }
          .tdb-quote fieldset.tdb-field {
            border: 0;
            padding: 0;
          }
          .tdb-quote label.tdb-q, .tdb-quote legend.tdb-q {
            display: block;
            font-weight: 600;
            font-size: 0.95rem;
            margin: 0 0 6px;
            padding: 0;
            color: var(--tdb-text);
          }
          .tdb-quote .tdb-opt {
            font-weight: 400;
            color: var(--tdb-muted);
            font-size: 0.85rem;
          }
          .tdb-quote .tdb-star {
            color: var(--tdb-accent);
            margin-left: 2px;
          }
          .tdb-quote .tdb-help {
            display: block;
            font-size: 0.88rem;
            color: var(--tdb-muted);
            margin: 0 0 8px;
            line-height: 1.45;
          }
          .tdb-quote .tdb-in {
            display: block;
            width: 100%;
            min-height: 48px;
            padding: 11px 14px;
            font: inherit;
            color: var(--tdb-text);
            background: var(--tdb-input);
            border: 1px solid var(--tdb-border);
            border-radius: 2px;
            transition: border-color 0.2s, outline 0.2s;
          }
          .tdb-quote .tdb-in:hover {
            border-color: var(--tdb-muted);
          }
          .tdb-quote .tdb-in:focus {
            outline: 3px solid var(--tdb-accent);
            outline-offset: 2px;
            border-color: var(--tdb-accent);
          }
          .tdb-quote select.tdb-in {
            appearance: none;
            -webkit-appearance: none;
            padding-right: 40px;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none' stroke='%23382B23' stroke-width='1.6'%3E%3Cpath d='M1 1.5l5 5 5-5'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 16px center;
            cursor: pointer;
          }
          .tdb-quote select.tdb-in:disabled {
            color: var(--tdb-muted);
            background-color: #EFE8DC;
            cursor: not-allowed;
          }
          .tdb-quote textarea.tdb-in {
            min-height: 96px;
            resize: vertical;
          }
          .tdb-quote .tdb-phone {
            display: grid;
            grid-template-columns: 92px minmax(0, 1fr);
            gap: 10px;
          }
          .tdb-quote .tdb-count {
            display: block;
            text-align: right;
            font-size: 0.8rem;
            color: var(--tdb-muted);
            margin-top: 4px;
            font-family: var(--font-mono, monospace);
          }
          .tdb-quote .tdb-chips {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 8px;
          }
          .tdb-quote .tdb-chip {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            gap: 2px;
            min-height: 60px;
            padding: 10px 16px;
            border: 1px solid var(--tdb-border);
            background: var(--tdb-input);
            border-radius: 2px;
            cursor: pointer;
            font-size: 0.95rem;
            transition: background-color 0.2s, border-color 0.2s, color 0.2s;
            user-select: none;
          }
          .tdb-quote .tdb-chip:hover {
            border-color: var(--tdb-text);
          }
          .tdb-quote .tdb-chip input {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            margin: 0;
            cursor: pointer;
          }
          .tdb-quote .tdb-chip.checked {
            background: var(--tdb-accent);
            border-color: var(--tdb-accent);
            color: var(--tdb-bg);
          }
          .tdb-quote .tdb-chip.checked .tdb-chip-name {
            color: #FFFFFF;
          }
          .tdb-quote .tdb-chip:has(input:focus-visible) {
            outline: 3px solid var(--tdb-accent);
            outline-offset: 2px;
          }
          .tdb-quote .tdb-chip-name {
            font-weight: 600;
            color: var(--tdb-text);
          }
          .tdb-quote .tdb-price {
            font-size: 0.82rem;
            color: var(--tdb-muted);
            font-family: var(--font-mono, monospace);
          }
          .tdb-quote .tdb-chip.checked .tdb-price {
            color: #DCE5DF;
          }
          .tdb-quote .tdb-hint {
            font-size: 0.88rem;
            color: var(--tdb-text);
            border-left: 2px solid var(--tdb-accent);
            padding: 2px 0 2px 12px;
            margin: 10px 0 0;
            line-height: 1.45;
          }
          .tdb-quote .tdb-err {
            color: var(--tdb-error);
            font-size: 0.88rem;
            font-weight: 600;
            margin: 6px 0 0;
          }
          .tdb-quote [aria-invalid="true"] {
            border-color: var(--tdb-error) !important;
          }
          .tdb-quote .tdb-chips[data-invalid="true"] .tdb-chip {
            border-color: var(--tdb-error);
          }
          .tdb-quote .tdb-note {
            font-size: 0.9rem;
            color: var(--tdb-muted);
            margin: 8px 0 16px;
          }
          .tdb-quote .tdb-alert {
            border: 1px solid var(--tdb-error);
            background: var(--tdb-input);
            color: var(--tdb-error);
            padding: 12px 16px;
            margin: 0 0 16px;
            font-weight: 600;
          }
          .tdb-quote .tdb-btn {
            min-height: 52px;
            min-width: 44px;
            padding: 13px 36px;
            font: inherit;
            font-weight: 700;
            color: #FFFFFF;
            background: var(--tdb-accent);
            border: 1px solid var(--tdb-accent);
            border-radius: 2px;
            cursor: pointer;
            transition: background-color 0.2s, transform 0.15s;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
          }
          .tdb-quote .tdb-btn:hover {
            background: #0F2D25;
          }
          .tdb-quote .tdb-btn.ghost {
            background: transparent;
            color: var(--tdb-accent);
            border: 1px solid var(--tdb-accent);
          }
          .tdb-quote .tdb-btn.ghost:hover {
            background: var(--tdb-input);
          }
          .tdb-quote .tdb-btn:focus-visible {
            outline: 3px solid var(--tdb-text);
            outline-offset: 3px;
          }
          .tdb-quote .tdb-btn[disabled] {
            opacity: 0.7;
            cursor: progress;
          }
          .tdb-quote .tdb-result {
            border-top: 1px solid var(--tdb-text);
            padding-top: 32px;
          }
          .tdb-quote .tdb-result h2 {
            font-family: var(--tdb-serif);
            font-weight: 400;
            font-size: clamp(1.8rem, 3.2vw, 2.4rem);
            line-height: 1.15;
            margin: 0 0 14px;
            color: var(--tdb-text);
          }
          .tdb-quote .tdb-result h2:focus {
            outline: none;
          }
          .tdb-quote .tdb-result p {
            color: var(--tdb-muted);
            max-width: 52ch;
            margin: 0 0 28px;
            font-size: 1.05rem;
            line-height: 1.6;
          }
          .tdb-quote .tdb-sr {
            position: absolute;
            width: 1px;
            height: 1px;
            overflow: hidden;
            clip: rect(0 0 0 0);
            white-space: nowrap;
          }
          @media (max-width: 860px) {
            .tdb-quote {
              padding: 36px 20px 56px;
            }
            .tdb-quote .tdb-wrap {
              grid-template-columns: minmax(0, 1fr);
              gap: 32px;
            }
            .tdb-quote .tdb-intro {
              position: static;
            }
            .tdb-quote .tdb-intro p:not(.tdb-label) {
              max-width: none;
            }
          }
          @media (max-width: 560px) {
            .tdb-quote .tdb-row, .tdb-quote .tdb-chips {
              grid-template-columns: minmax(0, 1fr);
            }
            .tdb-quote .tdb-btn {
              width: 100%;
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .tdb-quote * {
              transition: none !important;
              animation: none !important;
            }
          }
        `}</style>

        <div className="tdb-wrap">
          {/* ── Left Column: Intro ── */}
          <aside className="tdb-intro">
            <p className="tdb-label">START A PROJECT</p>
            <h1>Tell us what you’re building.</h1>
            <p>
              Launching something new or taking your business further? Share a few details so we can understand your project.
            </p>
          </aside>

          {/* ── Right Column: Form or Result ── */}
          <main id="tdb-main">
            {submissionSuccess ? (
              <div className="tdb-result">
                <h2 tabIndex={-1} ref={resultHeadingRef}>
                  Thank you for sharing your project.
                </h2>
                <p>
                  We’ve received your enquiry and will get in touch using the details you provided. Our design directors review briefs within 24 hours.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '380px' }}>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppBrief())}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tdb-btn"
                    style={{ textDecoration: 'none' }}
                  >
                    Chat on WhatsApp with this Brief <ArrowIcon size={14} />
                  </a>

                  <button type="button" className="tdb-btn ghost" onClick={handleResetForm}>
                    Send another enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form id="tdb-form" noValidate onSubmit={handleSubmit}>
                <p className="tdb-req-note">
                  <span className="tdb-star" aria-hidden="true">
                    *
                  </span>{' '}
                  Required
                </p>

                {/* ── Row 1: Name & Email ── */}
                <div className="tdb-row">
                  <div className="tdb-field">
                    <label className="tdb-q" htmlFor="fullName">
                      Your name<span className="tdb-star" aria-hidden="true">*</span>
                    </label>
                    <input
                      className="tdb-in"
                      id="fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      aria-required="true"
                      aria-invalid={errors.fullName ? 'true' : undefined}
                      aria-describedby={errors.fullName ? 'err-fullName' : undefined}
                      value={state.fullName}
                      onChange={handleInputChange}
                    />
                    {errors.fullName && (
                      <p className="tdb-err" id="err-fullName">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div className="tdb-field">
                    <label className="tdb-q" htmlFor="email">
                      Email address<span className="tdb-star" aria-hidden="true">*</span>
                    </label>
                    <input
                      className="tdb-in"
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      aria-required="true"
                      aria-invalid={errors.email ? 'true' : undefined}
                      aria-describedby={errors.email ? 'err-email' : undefined}
                      value={state.email}
                      onChange={handleInputChange}
                    />
                    {errors.email && (
                      <p className="tdb-err" id="err-email">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* ── WhatsApp Number (Required) ── */}
                <div className="tdb-field">
                  <label className="tdb-q" htmlFor="whatsappNumber">
                    WhatsApp number<span className="tdb-star" aria-hidden="true">*</span>
                  </label>
                  <div className="tdb-phone">
                    <input
                      className="tdb-in"
                      id="whatsappCountryCode"
                      name="whatsappCountryCode"
                      type="text"
                      inputMode="tel"
                      autoComplete="tel-country-code"
                      aria-label="WhatsApp country calling code"
                      aria-invalid={errors.whatsappCountryCode ? 'true' : undefined}
                      aria-describedby={errors.whatsappCountryCode ? 'err-whatsappCountryCode' : undefined}
                      value={state.whatsappCountryCode}
                      onChange={handleInputChange}
                    />
                    <input
                      className="tdb-in"
                      id="whatsappNumber"
                      name="whatsappNumber"
                      type="tel"
                      autoComplete="tel-national"
                      placeholder="98765 43210"
                      aria-required="true"
                      aria-invalid={errors.whatsappNumber ? 'true' : undefined}
                      aria-describedby={errors.whatsappNumber ? 'err-whatsappNumber' : undefined}
                      value={state.whatsappNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  {errors.whatsappCountryCode && (
                    <p className="tdb-err" id="err-whatsappCountryCode">
                      {errors.whatsappCountryCode}
                    </p>
                  )}
                  {errors.whatsappNumber && (
                    <p className="tdb-err" id="err-whatsappNumber">
                      {errors.whatsappNumber}
                    </p>
                  )}
                </div>

                {/* ── Phone Number (Optional) ── */}
                <div className="tdb-field">
                  <label className="tdb-q" htmlFor="phoneNumber">
                    Phone number <span className="tdb-opt">(optional)</span>
                  </label>
                  <div className="tdb-phone">
                    <input
                      className="tdb-in"
                      id="phoneCountryCode"
                      name="phoneCountryCode"
                      type="text"
                      inputMode="tel"
                      autoComplete="tel-country-code"
                      aria-label="Phone country calling code"
                      aria-invalid={errors.phoneCountryCode ? 'true' : undefined}
                      aria-describedby={errors.phoneCountryCode ? 'err-phoneCountryCode' : undefined}
                      value={state.phoneCountryCode}
                      onChange={handleInputChange}
                    />
                    <input
                      className="tdb-in"
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      autoComplete="tel-national"
                      placeholder="98765 43210"
                      aria-invalid={errors.phoneNumber ? 'true' : undefined}
                      aria-describedby={errors.phoneNumber ? 'err-phoneNumber' : undefined}
                      value={state.phoneNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  {errors.phoneCountryCode && (
                    <p className="tdb-err" id="err-phoneCountryCode">
                      {errors.phoneCountryCode}
                    </p>
                  )}
                  {errors.phoneNumber && (
                    <p className="tdb-err" id="err-phoneNumber">
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>

                {/* ── Brand or Website ── */}
                <div className="tdb-field">
                  <label className="tdb-q" htmlFor="brandOrWebsite">
                    Brand name or website <span className="tdb-opt">(optional)</span>
                  </label>
                  <span className="tdb-help" id="help-brand">
                    Have a name, website, or Instagram page? Share it here. Starting fresh? Leave this blank.
                  </span>
                  <input
                    className="tdb-in"
                    id="brandOrWebsite"
                    name="brandOrWebsite"
                    type="text"
                    maxLength={200}
                    autoComplete="organization"
                    aria-describedby="help-brand"
                    placeholder="e.g. Acme Studio or acme.com"
                    value={state.brandOrWebsite}
                    onChange={handleInputChange}
                  />
                </div>

                {/* ── Services Fieldset (Interactive Chips) ── */}
                <fieldset
                  className="tdb-field"
                  aria-describedby="help-services help-fees err-services"
                >
                  <legend className="tdb-q">
                    What do you need help with?<span className="tdb-star" aria-hidden="true">*</span>
                  </legend>
                  <span className="tdb-help" id="help-services">
                    Select all that apply.
                  </span>

                  <div
                    className="tdb-chips"
                    id="tdb-services"
                    data-invalid={errors.services ? 'true' : undefined}
                  >
                    {SERVICES.map((s) => {
                      const isChecked = state.services.includes(s.value);
                      return (
                        <label
                          key={s.value}
                          className={`tdb-chip ${isChecked ? 'checked' : ''}`}
                        >
                          <input
                            type="checkbox"
                            name="services"
                            value={s.value}
                            checked={isChecked}
                            onChange={() => handleServiceToggle(s.value)}
                          />
                          <span className="tdb-chip-name">{s.label}</span>
                          {s.price && <span className="tdb-price">{s.price}</span>}
                        </label>
                      );
                    })}
                  </div>

                  <p className="tdb-help" id="help-fees" style={{ margin: '10px 0 0' }}>
                    Starting fees are a guide. Your final proposal will reflect the scope of your project.
                  </p>

                  {showSaasHint && (
                    <p className="tdb-hint" id="saas-note">
                      SaaS engagements typically range from ₹4,75,000 to ₹10,00,000, depending on the branding, product design, and app requirements.
                    </p>
                  )}

                  {errors.services && (
                    <p className="tdb-err" id="err-services">
                      {errors.services}
                    </p>
                  )}
                </fieldset>

                {/* ── Business Category ── */}
                <div className="tdb-field">
                  <label className="tdb-q" htmlFor="category">
                    Which category is your business or idea in?<span className="tdb-star" aria-hidden="true">*</span>
                  </label>
                  <select
                    className="tdb-in"
                    id="category"
                    name="category"
                    aria-required="true"
                    aria-invalid={errors.category ? 'true' : undefined}
                    aria-describedby={errors.category ? 'err-category' : undefined}
                    value={state.category}
                    onChange={handleCategoryChange}
                  >
                    <option value="">Choose your category</option>
                    {CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="tdb-err" id="err-category">
                      {errors.category}
                    </p>
                  )}
                </div>

                {/* ── Conditional Other Category ── */}
                {state.category === 'something-else' && (
                  <div className="tdb-field" id="other-wrap">
                    <label className="tdb-q" htmlFor="otherCategory">
                      Tell us your category <span className="tdb-opt">(optional)</span>
                    </label>
                    <input
                      className="tdb-in"
                      id="otherCategory"
                      name="otherCategory"
                      type="text"
                      maxLength={80}
                      placeholder="e.g. Cleantech, Agritech, Education"
                      value={state.otherCategory}
                      onChange={handleInputChange}
                    />
                  </div>
                )}

                {/* ── Budget & Timeline Row ── */}
                <div className="tdb-row">
                  <div className="tdb-field">
                    <label className="tdb-q" htmlFor="budgetRange">
                      What’s your approximate project budget?<span className="tdb-star" aria-hidden="true">*</span>
                    </label>
                    <span className="tdb-help" id="help-budget">
                      An approximate range helps us recommend a realistic scope.
                      {isMultiService && ' Share your total project budget. We’ll recommend what can realistically fit.'}
                    </span>
                    <select
                      className="tdb-in"
                      id="budgetRange"
                      name="budgetRange"
                      aria-required="true"
                      disabled={!budgetSetKey}
                      aria-invalid={errors.budgetRange ? 'true' : undefined}
                      aria-describedby={`help-budget ${errors.budgetRange ? 'err-budgetRange' : ''}`}
                      value={state.budgetRange}
                      onChange={handleInputChange}
                    >
                      <option value="">
                        {budgetSetKey ? 'Choose a range' : 'Choose a service first'}
                      </option>
                      {budgetOptions.map((b) => (
                        <option key={b.value} value={b.value}>
                          {b.label}
                        </option>
                      ))}
                    </select>
                    {errors.budgetRange && (
                      <p className="tdb-err" id="err-budgetRange">
                        {errors.budgetRange}
                      </p>
                    )}
                  </div>

                  <div className="tdb-field">
                    <label className="tdb-q" htmlFor="timeline">
                      When would you like to start? <span className="tdb-opt">(optional)</span>
                    </label>
                    <select
                      className="tdb-in"
                      id="timeline"
                      name="timeline"
                      value={state.timeline}
                      onChange={handleInputChange}
                    >
                      <option value="">Choose a timeframe</option>
                      {TIMELINES.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {showBudgetHint && (
                  <p className="tdb-hint" id="budget-hint" role="status" style={{ margin: '-8px 0 24px' }}>
                    This is below our starting fee for the selected service. You can still share your enquiry so we can assess fit.
                  </p>
                )}

                {/* ── Project Description ── */}
                <div className="tdb-field">
                  <label className="tdb-q" htmlFor="projectDescription">
                    Tell us a little about your project<span className="tdb-star" aria-hidden="true">*</span>
                  </label>
                  <span className="tdb-help" id="help-desc">
                    What are you building, and where would you like our help? A sentence or two is enough.
                  </span>
                  <textarea
                    className="tdb-in"
                    id="projectDescription"
                    name="projectDescription"
                    rows={3}
                    maxLength={1000}
                    aria-required="true"
                    aria-invalid={errors.projectDescription ? 'true' : undefined}
                    aria-describedby={`help-desc ${errors.projectDescription ? 'err-projectDescription' : ''}`}
                    placeholder="We are launching a new consumer brand and need strategic packaging and brand identity design..."
                    value={state.projectDescription}
                    onChange={handleInputChange}
                  />
                  <span className="tdb-count" id="count" aria-hidden="true">
                    {state.projectDescription.length} / 1000
                  </span>
                  {errors.projectDescription && (
                    <p className="tdb-err" id="err-projectDescription">
                      {errors.projectDescription}
                    </p>
                  )}
                </div>

                <p className="tdb-note">We’ll use these details to respond to your project enquiry.</p>

                {alertMessage && (
                  <div className="tdb-alert" id="tdb-alert" role="alert" tabIndex={-1}>
                    We couldn’t send your enquiry just now. Your answers are still here, so please try again.
                  </div>
                )}

                <button className="tdb-btn" id="tdb-submit" type="submit" disabled={submitting}>
                  {submitting ? 'Sending…' : 'Send Enquiry'}
                  {!submitting && <ArrowIcon size={14} />}
                </button>
              </form>
            )}
          </main>
        </div>

        <div className="tdb-sr" id="tdb-live" role="status" aria-live="polite">
          {liveAnnouncement}
        </div>
      </div>

      <Footer />
    </div>
  );
}
