/**
 * metaEvents.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Comprehensive Meta (Facebook) Tracking Architecture:
 * 1. Meta Browser Pixel (fbq) tracking
 * 2. Meta Conversions API (Graph API) server-side event pipeline
 * 3. Event Deduplication via shared eventID matching
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const META_PIXEL_ID = '1036567462623519';
export const META_ACCESS_TOKEN =
  'EAALE1ZCZAR41gBSIqXzpCwMKT1wZBDPTe4utZAKfRKJ1jqSEZAZBZBTl3QE8UgZAQG6HCjStsYJzKbDEZC24QoZCOOI8V46l2qGqIq0nyJvLCCc7VflLba16v1LRJNf1V1VjBi4q0Hz1oSBDSfHTuZBsepId8Q48tukApVBeZAzkESwKOuDWZAKZCZCip0uBeZA8aj4ghAZDZD';

/**
 * Read cookie value by name
 */
function getCookie(name) {
  if (typeof document === 'undefined') return null;
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : null;
}

/**
 * SHA-256 hash helper using Web Crypto API for Meta User Data normalization
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
 * Generate a unique event ID for Meta Deduplication (Browser Pixel + Conversions API)
 */
export function generateEventId(prefix = 'tdb') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Send event via Meta Conversions API (CAPI)
 */
async function sendConversionsApiEvent({
  eventName,
  eventId,
  eventSourceUrl,
  customData = {},
  userData = {}
}) {
  try {
    const fbp = getCookie('_fbp') || undefined;
    const fbc = getCookie('_fbc') || undefined;

    // Normalize and hash personal identifiers if present
    const hashedEmail = userData.email ? await sha256(userData.email) : undefined;
    const hashedPhone = userData.phone ? await sha256(userData.phone.replace(/[^0-9]/g, '')) : undefined;
    const hashedFn = userData.firstName ? await sha256(userData.firstName) : undefined;
    const hashedLn = userData.lastName ? await sha256(userData.lastName) : undefined;

    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId,
          event_source_url: eventSourceUrl || (typeof window !== 'undefined' ? window.location.href : ''),
          action_source: 'website',
          user_data: {
            client_user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
            fbp: fbp,
            fbc: fbc,
            ...(hashedEmail && { em: [hashedEmail] }),
            ...(hashedPhone && { ph: [hashedPhone] }),
            ...(hashedFn && { fn: [hashedFn] }),
            ...(hashedLn && { ln: [hashedLn] }),
          },
          custom_data: {
            currency: 'INR',
            value: 175000,
            ...customData
          }
        }
      ],
      access_token: META_ACCESS_TOKEN
    };

    const endpoint = `https://graph.facebook.com/v19.0/${META_PIXEL_ID}/events`;

    // Use keepalive: true so request reliably delivers even during rapid navigation
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      keepalive: true,
      mode: 'cors'
    }).catch((err) => {
      // Non-blocking catch
      console.warn('Meta CAPI dispatch notice:', err?.message);
    });
  } catch (e) {
    console.warn('Meta CAPI execution notice:', e);
  }
}

/**
 * Universal Meta Event Tracker
 * Dispatches to both Meta Browser Pixel and Meta Conversions API (CAPI) with shared eventID.
 */
export async function trackMetaEvent(eventName, customData = {}, userData = {}) {
  const eventId = generateEventId(eventName.toLowerCase());
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  // 1. Meta Browser Pixel dispatch (with deduplication eventID)
  if (typeof window !== 'undefined' && window.fbq) {
    try {
      window.fbq('track', eventName, customData, { eventID: eventId });
    } catch (err) {
      console.warn('Meta Pixel browser track notice:', err);
    }
  }

  // 2. Meta Conversions API dispatch (server-to-server)
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
