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
      eventSourceUrl || (typeof window !== 'undefined' ? window.location.href : 'https://drawingsboards.com/');

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
            currency: 'INR',
            value: 175000,
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
 * Universal Meta Event Dispatcher
 * Dispatches to both Meta Browser Pixel and Meta Conversions API (CAPI) with shared eventID.
 */
export async function trackMetaEvent(eventName, customData = {}, userData = {}) {
  const eventId = generateEventId(eventName.toLowerCase());
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://drawingsboards.com/';

  // 1. Meta Browser Pixel dispatch (with deduplication eventID)
  if (typeof window !== 'undefined' && window.fbq) {
    try {
      window.fbq('track', eventName, customData, { eventID: eventId });
      console.log(`[Meta Pixel] fbq('${eventName}') fired with eventID: ${eventId}`);
    } catch (err) {
      console.warn('[Meta Pixel] fbq error:', err);
    }
  }

  // 2. Meta Conversions API dispatch (server-to-server with high match quality)
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
 * Specialized Trackers for WhatsApp & Cal.com Conversion Triggers
 */

export function trackMetaWhatsAppClick(details = {}) {
  const eventData = {
    content_name: 'WhatsApp Consultation CTA',
    content_category: 'Lead Engagement',
    destination: 'WhatsApp',
    button_label: details.buttonText || 'WhatsApp Us',
    source_url: typeof window !== 'undefined' ? window.location.href : '',
    ...details
  };

  // Dispatch Lead & Contact conversion events
  trackMetaEvent('Lead', eventData);
  trackMetaEvent('Contact', eventData);
}

export function trackMetaCalComClick(details = {}) {
  const eventData = {
    content_name: 'Cal.com 15-Min Discovery Call',
    content_category: 'Schedule Consultation',
    destination: 'Cal.com',
    button_label: details.buttonText || 'Book a Call',
    source_url: typeof window !== 'undefined' ? window.location.href : '',
    ...details
  };

  // Dispatch Schedule & Lead conversion events
  trackMetaEvent('Schedule', eventData);
  trackMetaEvent('Lead', eventData);
}

export function trackMetaFormSubmission(formData = {}) {
  const eventData = {
    content_name: 'Project Initiation Form Submission',
    content_category: 'Direct Project Inquiry',
    services: formData.services || formData.service || '',
    budget: formData.budget || '',
    timeline: formData.timeline || '',
    source_url: typeof window !== 'undefined' ? window.location.href : ''
  };

  const userData = {
    email: formData.email,
    firstName: formData.name || formData.fname,
    lastName: formData.lname,
    phone: formData.phone
  };

  trackMetaEvent('Lead', eventData, userData);
}
