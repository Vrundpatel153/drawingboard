/**
 * useSEO.js
 * ─────────────────────────────────────────────────────────────────────────────
 * React hook that injects / updates <head> meta tags for the current page.
 * Zero external dependencies — pure DOM manipulation.
 *
 * Usage:
 *   import useSEO from '../hooks/useSEO';
 *   useSEO({ title: 'Page Title', description: '…', path: '/current-path' });
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  DEFAULT_OG_IMAGE,
  TWITTER_HANDLE,
  PAGE_META,
  ORGANIZATION_SCHEMA,
  WEBSITE_SCHEMA,
} from '../utils/siteConfig';

// ─── helpers ─────────────────────────────────────────────────────────────────

function setMeta(name, content, attribute = 'name') {
  if (!content) return;
  let el = document.querySelector(`meta[${attribute}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attribute, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel, href, extra = {}) {
  if (!href) return;
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
  Object.entries(extra).forEach(([k, v]) => el.setAttribute(k, v));
}

function upsertJsonLd(id, schema) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(schema);
}

// ─── hook ────────────────────────────────────────────────────────────────────

/**
 * @param {object} overrides
 * @param {string} [overrides.title]        - Full page <title>
 * @param {string} [overrides.description]  - Meta description
 * @param {string} [overrides.keywords]     - Meta keywords
 * @param {string} [overrides.ogImage]      - Absolute OG image URL
 * @param {string} [overrides.ogType]       - OG type (default: website)
 * @param {boolean} [overrides.noindex]     - Add noindex,nofollow
 * @param {object} [overrides.schema]       - Extra JSON-LD schema for this page
 */
export default function useSEO(overrides = {}) {
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    // 1. Resolve meta — page-specific map → override props → defaults
    const pageMeta = PAGE_META[path] || {};

    const title        = overrides.title       || pageMeta.title       || SITE_NAME;
    const description  = overrides.description || pageMeta.description || DEFAULT_DESCRIPTION;
    const keywords     = overrides.keywords    || pageMeta.keywords    || DEFAULT_KEYWORDS;
    const ogImage      = overrides.ogImage     || pageMeta.ogImage     || DEFAULT_OG_IMAGE;
    const ogType       = overrides.ogType      || 'website';
    const canonical    = `${SITE_URL}${path}`;
    const noindex      = overrides.noindex     || false;

    // 2. <title>
    document.title = title;

    // 3. Basic meta
    setMeta('description', description);
    setMeta('keywords', keywords);
    setMeta('author', 'The Drawing Board');
    setMeta('robots', noindex ? 'noindex,nofollow' : 'index,follow');
    setMeta('theme-color', '#1B1B17');

    // 4. Canonical
    setLink('canonical', canonical);

    // 5. Open Graph
    setMeta('og:title',       title,       'property');
    setMeta('og:description', description, 'property');
    setMeta('og:image',       ogImage,     'property');
    setMeta('og:url',         canonical,   'property');
    setMeta('og:type',        ogType,      'property');
    setMeta('og:site_name',   SITE_NAME,   'property');
    setMeta('og:locale',      'en_IN',     'property');

    // 6. Twitter Card
    setMeta('twitter:card',        'summary_large_image');
    setMeta('twitter:title',       title);
    setMeta('twitter:description', description);
    setMeta('twitter:image',       ogImage);
    setMeta('twitter:site',        TWITTER_HANDLE);
    setMeta('twitter:creator',     TWITTER_HANDLE);

    // 7. JSON-LD — global schemas (always present)
    upsertJsonLd('schema-org-org',     ORGANIZATION_SCHEMA);
    upsertJsonLd('schema-org-website', WEBSITE_SCHEMA);

    // 8. JSON-LD — per-page WebPage schema
    const webPageSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description,
      url: canonical,
      inLanguage: 'en',
      isPartOf: { '@id': SITE_URL },
    };
    upsertJsonLd('schema-org-webpage', webPageSchema);

    // 9. Optional page-specific schema
    if (overrides.schema) {
      upsertJsonLd('schema-org-page-custom', overrides.schema);
    }
  }, [path, overrides.title, overrides.description, overrides.ogImage, overrides.noindex]);
}
