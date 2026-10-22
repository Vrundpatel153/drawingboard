/**
 * metaEvents.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Meta (Facebook) Dual-Pipeline Tracking System:
 * 1. Meta Browser Pixel (fbq) tracking
 * 2. Meta Conversions API (Graph API v19.0) direct pipeline
 * 3. Guaranteed Match Quality (fbp, fbc, external_id, client_user_agent, SHA-256 em/ph)
 * 4. Deduplication via matched eventID
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const META_PIXEL_ID = '1036567462623519';

export const META_ACCESS_TOKEN =
  'EAALE1ZCZAR41gBSFO1iULox28Ags02vVI4XPCkYr6cNdNEfe8W7pwag58ZBxSgyFfwkjdOfn1uwdm3vwxU5ytlxZBA4UccgdiBN97H5uwgM7T70SZBuylQE6ZAuMjxraVwF0hEItET1iht7KTurTMuw001PacNgchJp1jlotxL9DGO9tBt3nDx4ILodIxZCTwZDZD';

/**
 * Cookie read helper
 */
function getCookie(name) {
  if (typeof document === 'undefined') return null;
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : null;
}

/**
 * Set cookie helper
 */
function setCookie(name, value, days = 90) {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

/**
 * SHA-256 hash helper using Web Crypto API for Meta User Data
 */
async function sha256(str) {
  if (!str) return undefined;
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(str.trim().toLowerCase());
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  } catch (err) {
    return undefined;
  }
}

/**
 * Get or create persistent _fbp cookie (required by Meta Conversions API)
 */
function getOrCreateFbp() {
  let fbp = getCookie('_fbp');
  if (!fbp && typeof window !== 'undefined') {
    const creationTime = Date.now();
    const randomNum = Math.floor(Math.random() * 10000000000);
    fbp = `fb.1.${creationTime}.${randomNum}`;
    setCookie('_fbp', fbp, 90);
  }
  return fbp;
}

/**
 * Get or create persistent _fbc from fbclid URL parameter
 */
function getOrCreateFbc() {
  let fbc = getCookie('_fbc');
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const fbclid = params.get('fbclid');
    if (fbclid) {
      const creationTime = Date.now();
      fbc = `fb.1.${creationTime}.${fbclid}`;
      setCookie('_fbc', fbc, 90);
    }
  }
  return fbc;
}

/**
 * Get or create unique persistent Visitor ID for Meta external_id match
 */
async function getVisitorExternalId() {
  if (typeof window === 'undefined') return undefined;
  let rawId = localStorage.getItem('tdb_meta_ext_id');
  if (!rawId) {
    rawId = `tdb_user_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    try {
      localStorage.setItem('tdb_meta_ext_id', rawId);
    } catch (e) {}
  }
  return await sha256(rawId);
}

/**
 * Generate a unique event ID for Meta Deduplication (Browser Pixel + Conversions API)
 */
export function generateEventId(prefix = 'tdb') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Dynamic Lead Value & Currency Calculator
 * Solves the Meta Pixel diagnostic error: "All of your web Lead events are sending the same price information"
 * Dynamically computes distinct, realistic values across all service levels, budget choices, and engagement packages.
 */
export function calculateDynamicLeadValue(data = {}) {
  // If numeric value is already provided explicitly, honor it
  if (typeof data.value === 'number' && !isNaN(data.value) && data.value > 0) {
    return {
      value: Math.round(data.value),
      currency: data.currency || 'INR'
    };
  }

  const budget = String(data.budget || data.investment || '').toLowerCase();
  const services = String(data.services || data.service || data.engagement || data.content_name || '').toLowerCase();
  const path = typeof window !== 'undefined' ? (data.path || window.location.pathname).toLowerCase() : '';

  // 1. USD Budget Choices (Contact & Dev modal)
  if (budget.includes('$3,400') || budget.includes('3400')) return { value: 3400, currency: 'USD' };
  if (budget.includes('$4,960') || budget.includes('4960')) return { value: 4960, currency: 'USD' };
  if (budget.includes('$6,780') || budget.includes('6780')) return { value: 6780, currency: 'USD' };
  if (budget.includes('8,000') || budget.includes('8000')) return { value: 10000, currency: 'USD' };
  if (budget.includes('12,000') || budget.includes('12000')) return { value: 16000, currency: 'USD' };
  if (budget.includes('20,000') || budget.includes('20000')) return { value: 25000, currency: 'USD' };
  if (budget.includes('$1,200') || budget.includes('1200')) return { value: 1350, currency: 'USD' };
  if (budget.includes('$1,500') || budget.includes('1500')) return { value: 2150, currency: 'USD' };
  if (budget.includes('$2,800') || budget.includes('2800')) return { value: 4400, currency: 'USD' };
  if (budget.includes('$6,000') || budget.includes('6000')) return { value: 7500, currency: 'USD' };

  // 2. INR Budget Choices (Brand Readiness & Contact)
  if (budget.includes('u3') || budget.includes('under ₹3') || budget.includes('under 3')) {
    return { value: 250000, currency: 'INR' };
  }
  if (budget.includes('3-475') || budget.includes('3–4.75') || budget.includes('3-4.75') || budget.includes('3,25,000')) {
    return { value: 387500, currency: 'INR' };
  }
  if (budget.includes('475-7') || budget.includes('4.75–7') || budget.includes('4.75-7') || budget.includes('4,75,000')) {
    return { value: 587500, currency: 'INR' };
  }
  if (budget.includes('7-10') || budget.includes('7–10') || budget.includes('7-10') || budget.includes('6,50,000')) {
    return { value: 850000, currency: 'INR' };
  }
  if (budget.includes('10+') || budget.includes('10 lakh+') || budget.includes('8,00,000') || budget.includes('12,00,000')) {
    return { value: 1200000, currency: 'INR' };
  }

  // 3. Service / Engagement Packages
  if (services.includes('market') || services.includes('identity + pack + web')) {
    return { value: 750000, currency: 'INR' };
  }
  if (services.includes('shelf') || services.includes('brand-to-shelf')) {
    return { value: 475000, currency: 'INR' };
  }
  if (services.includes('foundation') || services.includes('brand foundation')) {
    return { value: 475000, currency: 'INR' };
  }
  if (services.includes('packaging')) {
    return { value: 325000, currency: 'INR' };
  }
  if (services.includes('saas')) {
    return { value: 650000, currency: 'INR' };
  }
  if (services.includes('development') || services.includes('web')) {
    return { value: 225000, currency: 'INR' };
  }

  // 4. Contextual Landing Page Path Fallbacks (for CTA clicks before form selection)
  if (path.includes('/packaging')) return { value: 325000, currency: 'INR' };
  if (path.includes('/brand-to-shelf')) return { value: 475000, currency: 'INR' };
  if (path.includes('/branding')) return { value: 475000, currency: 'INR' };
  if (path.includes('/saas-branding')) return { value: 650000, currency: 'INR' };
  if (path.includes('/web-development')) return { value: 225000, currency: 'INR' };
  if (path.includes('/brand-readiness')) return { value: 475000, currency: 'INR' };
  if (path.includes('/work')) return { value: 425000, currency: 'INR' };

  // 5. Default Studio Engagement Tier
  return { value: 475000, currency: 'INR' };
}

/**
 * Send event via Meta Conversions API (Graph API)
 */
async function sendConversionsApiEvent({
  eventName,
  eventId,
  eventSourceUrl,
  customData = {},
  userData = {}
}) {
  try {
    const fbp = getOrCreateFbp();
    const fbc = getOrCreateFbc() || undefined;
    const externalId = await getVisitorExternalId();

    // Normalize and hash personal identifiers if present
    const hashedEmail = userData.email ? await sha256(userData.email) : undefined;
    const hashedPhone = userData.phone ? await sha256(userData.phone.replace(/[^0-9]/g, '')) : undefined;
    const hashedFn = userData.firstName ? await sha256(userData.firstName) : undefined;
    const hashedLn = userData.lastName ? await sha256(userData.lastName) : undefined;

    const currentUrl =
      eventSourceUrl || (typeof window !== 'undefined' ? window.location.href : 'https://drawingsboard.com/');

    const userPayload = {
      client_user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      fbp: fbp || undefined,
      ...(fbc && { fbc: fbc }),
      ...(externalId && { external_id: [externalId] }),
      ...(hashedEmail && { em: [hashedEmail] }),
      ...(hashedPhone && { ph: [hashedPhone] }),
      ...(hashedFn && { fn: [hashedFn] }),
      ...(hashedLn && { ln: [hashedLn] }),
    };

    const dynamicPrice = calculateDynamicLeadValue(customData);
    const resolvedValue = customData.value !== undefined ? customData.value : dynamicPrice.value;
    const resolvedCurrency = customData.currency || dynamicPrice.currency;

    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId,
          event_source_url: currentUrl,
          action_source: 'website',
          user_data: userPayload,
          custom_data: {
            currency: resolvedCurrency,
            value: resolvedValue,
            ...customData
          }
        }
      ]
    };

    const endpoint = `https://graph.facebook.com/v19.0/${META_PIXEL_ID}/events?access_token=${encodeURIComponent(
      META_ACCESS_TOKEN
    )}`;

    // Dispatch direct server-to-server Conversions API call
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      keepalive: true,
      mode: 'cors'
    });

    if (res.ok) {
      const data = await res.json();
      console.log(`[Meta CAPI] Event "${eventName}" recorded successfully:`, data);
    } else {
      const errData = await res.json().catch(() => ({}));
      console.warn(`[Meta CAPI] Response warning for "${eventName}":`, errData);
    }
  } catch (e) {
    console.warn('[Meta CAPI] Dispatch exception:', e);
  }
}

/**
 * Google Tag Manager & GA4 DataLayer Dispatcher
 * Pushes standard and custom events to window.dataLayer for GTM triggers and GA4.
 */
function pushToDataLayer(eventName, customData = {}, eventId) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];

  const lowerName = (eventName || '').toLowerCase();
  const isLeadEvent =
    eventName === 'Lead' ||
    eventName === 'Schedule' ||
    eventName === 'Contact' ||
    lowerName.includes('lead') ||
    lowerName.includes('quote') ||
    lowerName.includes('discuss');

  const buttonLabel =
    customData.button_label ||
    customData.buttonText ||
    customData.content_name ||
    eventName;

  const conversionType =
    customData.conversion_type || (
      buttonLabel.toLowerCase().includes('quote') ? 'get_quote' :
      buttonLabel.toLowerCase().includes('discuss') ? 'discuss_your_project' :
      (customData.destination || 'lead')
    );

  const dynamicPrice = calculateDynamicLeadValue(customData);
  const resolvedValue = customData.value !== undefined ? customData.value : dynamicPrice.value;
  const resolvedCurrency = customData.currency || dynamicPrice.currency;

  // 1. Push standard custom event for Google Tag Manager triggers
  window.dataLayer.push({
    event: isLeadEvent ? 'lead_conversion' : lowerName,
    event_category: isLeadEvent ? 'Lead' : (customData.content_category || 'Engagement'),
    event_action: 'Click',
    event_label: buttonLabel,
    conversion_type: conversionType,
    button_text: buttonLabel,
    content_name: customData.content_name || eventName,
    value: resolvedValue,
    currency: resolvedCurrency,
    page_path: window.location.pathname,
    page_location: window.location.href,
    event_id: eventId,
    ...customData
  });

  // 2. Push standard GA4 generate_lead / schedule event for GTM & GA4
  if (isLeadEvent) {
    window.dataLayer.push({
      event: 'generate_lead',
      currency: resolvedCurrency,
      value: resolvedValue,
      lead_source: buttonLabel,
      lead_type: conversionType,
      event_id: eventId
    });

    if (typeof window.gtag === 'function') {
      try {
        window.gtag('event', 'generate_lead', {
          currency: resolvedCurrency,
          value: resolvedValue,
          lead_source: buttonLabel,
          event_id: eventId
        });
      } catch (err) {
        console.warn('[GA4] gtag error:', err);
      }
    }
  }

  console.log(`[GTM dataLayer] Dispatched "${isLeadEvent ? 'lead_conversion' : eventName}" (type: ${conversionType}) with eventID: ${eventId}`);
}

/**
 * Universal Meta Event Dispatcher
 * Dispatches to Meta Browser Pixel, Meta Conversions API (CAPI), and GTM dataLayer with shared eventID.
 */
export async function trackMetaEvent(eventName, customData = {}, userData = {}) {
  const eventId = generateEventId(eventName.toLowerCase());
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://drawingsboard.com/';

  // 1. Google Tag Manager dataLayer + GA4 dispatch
  pushToDataLayer(eventName, customData, eventId);

  // 2. Meta Browser Pixel dispatch (with deduplication eventID)
  if (typeof window !== 'undefined' && window.fbq) {
    try {
      window.fbq('track', eventName, customData, { eventID: eventId });
      console.log(`[Meta Pixel] fbq('${eventName}') fired with eventID: ${eventId}`);
    } catch (err) {
      console.warn('[Meta Pixel] fbq error:', err);
    }
  }

  // 3. Meta Conversions API dispatch (server-to-server with high match quality)
  await sendConversionsApiEvent({
    eventName,
    eventId,
    eventSourceUrl: currentUrl,
    customData,
    userData
  });

  return eventId;
}

/**
 * Specialized Trackers for Conversion Triggers:
 * - "Discuss Your Project"
 * - "Get Quote"
 * - WhatsApp Consultation
 * - Cal.com Discovery Call
 * - Project Brief Form Submission
 * - Direct Email & Phone
 */

export function trackDiscussProjectClick(details = {}) {
  const dynamicPrice = calculateDynamicLeadValue(details);
  const eventData = {
    content_name: 'Discuss Your Project CTA',
    content_category: 'Lead Consultation',
    conversion_type: 'discuss_your_project',
    destination: details.targetUrl?.includes('cal.com') ? 'Cal.com' : details.targetUrl?.includes('wa.me') ? 'WhatsApp' : 'Calendar',
    button_label: details.buttonText || 'Discuss Your Project',
    source_url: typeof window !== 'undefined' ? window.location.href : '',
    value: dynamicPrice.value,
    currency: dynamicPrice.currency,
    ...details
  };

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('tdb_last_lead_value', String(dynamicPrice.value));
      localStorage.setItem('tdb_last_lead_currency', dynamicPrice.currency);
      localStorage.setItem('tdb_last_lead_time', String(Date.now()));
    } catch (_) {}
  }

  trackMetaEvent('Lead', eventData);
  trackMetaEvent('Schedule', eventData);
}

export function trackGetQuoteClick(details = {}) {
  const dynamicPrice = calculateDynamicLeadValue(details);
  const eventData = {
    content_name: 'Get Quote CTA',
    content_category: 'Quote Inquiry',
    conversion_type: 'get_quote',
    destination: details.targetUrl || '/contact',
    button_label: details.buttonText || 'Get Quote',
    source_url: typeof window !== 'undefined' ? window.location.href : '',
    value: dynamicPrice.value,
    currency: dynamicPrice.currency,
    ...details
  };

  trackMetaEvent('Contact', eventData);
}

export function trackMetaWhatsAppClick(details = {}) {
  const dynamicPrice = calculateDynamicLeadValue(details);
  const eventData = {
    content_name: 'WhatsApp Consultation CTA',
    content_category: 'Lead Engagement',
    conversion_type: 'whatsapp_lead',
    destination: 'WhatsApp',
    button_label: details.buttonText || 'WhatsApp Us',
    source_url: typeof window !== 'undefined' ? window.location.href : '',
    value: dynamicPrice.value,
    currency: dynamicPrice.currency,
    ...details
  };

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('tdb_last_lead_value', String(dynamicPrice.value));
      localStorage.setItem('tdb_last_lead_currency', dynamicPrice.currency);
      localStorage.setItem('tdb_last_lead_time', String(Date.now()));
    } catch (_) {}
  }

  trackMetaEvent('Lead', eventData);
  trackMetaEvent('Contact', eventData);
}

export function trackMetaCalComClick(details = {}) {
  const isDiscuss = (details.buttonText || '').toLowerCase().includes('discuss');
  const dynamicPrice = calculateDynamicLeadValue(details);
  const eventData = {
    content_name: isDiscuss ? 'Discuss Your Project — Cal.com' : 'Cal.com 15-Min Discovery Call',
    content_category: 'Schedule Consultation',
    conversion_type: isDiscuss ? 'discuss_your_project' : 'cal_com_booking',
    destination: 'Cal.com',
    button_label: details.buttonText || 'Book a Call',
    source_url: typeof window !== 'undefined' ? window.location.href : '',
    value: dynamicPrice.value,
    currency: dynamicPrice.currency,
    ...details
  };

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('tdb_last_lead_value', String(dynamicPrice.value));
      localStorage.setItem('tdb_last_lead_currency', dynamicPrice.currency);
      localStorage.setItem('tdb_last_lead_time', String(Date.now()));
    } catch (_) {}
  }

  trackMetaEvent('Schedule', eventData);
  trackMetaEvent('Lead', eventData);
}

export function trackMetaFormSubmission(formData = {}) {
  const dynamicPrice = calculateDynamicLeadValue(formData);
  const eventValue = formData.value !== undefined ? formData.value : dynamicPrice.value;
  const eventCurrency = formData.currency || dynamicPrice.currency || 'INR';

  const eventData = {
    content_name: formData.content_name || 'Project Initiation / Quote Form Submission',
    content_category: formData.content_category || 'Direct Project Inquiry',
    conversion_type: formData.conversion_type || 'get_quote_submission',
    services: formData.services || formData.service || '',
    budget: formData.budget || '',
    timeline: formData.timeline || '',
    source_url: typeof window !== 'undefined' ? window.location.href : '',
    value: eventValue,
    currency: eventCurrency
  };

  const userData = {
    email: formData.email,
    firstName: formData.name || formData.fname,
    lastName: formData.lname,
    phone: formData.phone || formData.whatsapp
  };

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('tdb_last_lead_value', String(eventValue));
      localStorage.setItem('tdb_last_lead_currency', eventCurrency);
      localStorage.setItem('tdb_last_lead_time', String(Date.now()));
    } catch (_) {}
  }

  trackMetaEvent('Lead', eventData, userData);
}

export function trackMetaEmailClick(details = {}) {
  const dynamicPrice = calculateDynamicLeadValue(details);
  const eventData = {
    content_name: 'Email Contact Link',
    content_category: 'Direct Email Inquiry',
    conversion_type: 'email_inquiry',
    destination: 'Email',
    button_label: details.buttonText || 'Email Us',
    source_url: typeof window !== 'undefined' ? window.location.href : '',
    value: dynamicPrice.value,
    currency: dynamicPrice.currency,
    ...details
  };

  trackMetaEvent('Contact', eventData);
}

export function trackMetaPhoneClick(details = {}) {
  const dynamicPrice = calculateDynamicLeadValue(details);
  const eventData = {
    content_name: 'Phone Call Link',
    content_category: 'Direct Phone Inquiry',
    conversion_type: 'phone_inquiry',
    destination: 'Phone',
    button_label: details.buttonText || 'Call Us',
    source_url: typeof window !== 'undefined' ? window.location.href : '',
    value: dynamicPrice.value,
    currency: dynamicPrice.currency,
    ...details
  };

  trackMetaEvent('Contact', eventData);
}

