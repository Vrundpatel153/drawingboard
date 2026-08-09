/**
 * useAnalytics.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Handles GA4 + GTM initialization and SPA route-change page-view tracking.
 * Only loads scripts when the corresponding env vars are present.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { GA_MEASUREMENT_ID, GTM_CONTAINER_ID } from '../utils/siteConfig';

let ga4Initialized  = false;
let gtmInitialized  = false;

function initGA4(id) {
  if (ga4Initialized || !id) return;
  ga4Initialized = true;

  // Load gtag.js asynchronously
  const script = document.createElement('script');
  script.async = true;
  script.src   = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', id, { send_page_view: false }); // We'll send manually on route change
}

function initGTM(id) {
  if (gtmInitialized || !id) return;
  gtmInitialized = true;

  // GTM snippet — noscript fallback added to body below
  (function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    const f = d.getElementsByTagName(s)[0];
    const j = d.createElement(s);
    const dl = l !== 'dataLayer' ? '&l=' + l : '';
    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, 'script', 'dataLayer', id);

  // noscript iframe
  const ns = document.createElement('noscript');
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${id}`;
  iframe.height = '0';
  iframe.width = '0';
  iframe.style.cssText = 'display:none;visibility:hidden';
  ns.appendChild(iframe);
  document.body.insertBefore(ns, document.body.firstChild);
}

export default function useAnalytics() {
  const location = useLocation();
  const initialized = useRef(false);

  // Initialize on first render
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    if (GA_MEASUREMENT_ID)  initGA4(GA_MEASUREMENT_ID);
    if (GTM_CONTAINER_ID)   initGTM(GTM_CONTAINER_ID);
  }, []);

  // Send page_view on every route change
  useEffect(() => {
    if (GA_MEASUREMENT_ID && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path:     location.pathname,
        page_location: window.location.href,
        page_title:    document.title,
      });
    }
    if (GTM_CONTAINER_ID && window.dataLayer) {
      window.dataLayer.push({
        event:     'page_view',
        page_path: location.pathname,
      });
    }
    // Meta (Facebook) Pixel SPA PageView
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [location]);
}
