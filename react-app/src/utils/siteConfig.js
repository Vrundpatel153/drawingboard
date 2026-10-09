/**
 * siteConfig.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Central production configuration.
 * All values read from VITE_ environment variables (inlined at build time).
 * Provide sensible defaults so the site works even without .env set.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const SITE_URL =
  import.meta.env.VITE_SITE_URL?.replace(/\/$/, '') ||
  'https://drawingsboards.com';

export const SITE_NAME =
  import.meta.env.VITE_SITE_NAME || 'The Drawing Board';

export const COMPANY_NAME =
  import.meta.env.VITE_COMPANY_NAME || 'The Drawing Board Studio';

export const DEFAULT_DESCRIPTION =
  import.meta.env.VITE_DEFAULT_DESCRIPTION ||
  'The Drawing Board — a strategy-first design studio crafting brand identities, packaging systems, and digital products for ambitious founders.';

export const DEFAULT_KEYWORDS =
  import.meta.env.VITE_DEFAULT_KEYWORDS ||
  'brand identity design, packaging design, web design, UI UX design, branding agency India';

export const AUTHOR =
  import.meta.env.VITE_AUTHOR || 'The Drawing Board';

export const DEFAULT_OG_IMAGE =
  import.meta.env.VITE_DEFAULT_OG_IMAGE ||
  `${SITE_URL}/home_preview.png`;

export const GA_MEASUREMENT_ID =
  import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-3FHFNH8BZ7';

export const GTM_CONTAINER_ID =
  import.meta.env.VITE_GTM_CONTAINER_ID || 'GTM-WJ3GNS9C';

export const GOOGLE_SITE_VERIFICATION =
  import.meta.env.VITE_GOOGLE_SITE_VERIFICATION || 'google94656f273b2c25c5';

export const TWITTER_HANDLE =
  import.meta.env.VITE_TWITTER_HANDLE || '@thedrawingboard';

export const INSTAGRAM_HANDLE =
  import.meta.env.VITE_INSTAGRAM_HANDLE || 'thedrawingboard.studio';

export const CONTACT_EMAIL = 'dandelionpa7@gmail.com';

export const MAILTO_URL = `mailto:${CONTACT_EMAIL}?subject=Project%20Inquiry%20%7C%20The%20Drawing%20Board&body=Hi%20The%20Drawing%20Board%20Team%2C%0A%0AI%20would%20like%20to%20discuss%20a%20new%20project.`;

export const GOOGLE_FORM_DISCUSS_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLScSzoze0gREm8KQFadpx0-CkqOq75iDVCEqi0grxcnr_qH0Qw/viewform?usp=header';

export const DISCUSS_URL = GOOGLE_FORM_DISCUSS_URL;

export const CAL_COM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLScSzoze0gREm8KQFadpx0-CkqOq75iDVCEqi0grxcnr_qH0Qw/viewform?usp=header';

export const WHATSAPP_NUMBER = '919428859768';

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20The%20Drawing%20Board%2C%20I%20am%20interested%20in%20discussing%20a%20project!`;


/**
 * Per-page SEO data.
 * Keys are the exact route paths.
 */
export const PAGE_META = {
  '/': {
    title: `${SITE_NAME} — Strategy-First Design Studio`,
    description:
      'The Drawing Board is a strategy-first design studio crafting brand identities, packaging systems, and digital products for ambitious founders across India and globally.',
    ogImage: `${SITE_URL}/home_preview.png`,
    keywords: 'brand identity, packaging design, web design, design studio India, branding agency',
  },
  '/work': {
    title: `Work & Case Studies — ${SITE_NAME}`,
    description:
      'Explore our portfolio of branding, packaging design, and digital product projects — real work for real brands, across food, wellness, fashion, and tech.',
    ogImage: `${SITE_URL}/work_preview.png`,
    keywords: 'design portfolio, brand case studies, packaging design work, logo design India',
  },
  '/studio': {
    title: `Studio & About — ${SITE_NAME}`,
    description:
      'Learn about The Drawing Board — who we are, how we work, and the founders and brands we partner with to build intentional brands.',
    ogImage: `${SITE_URL}/studio_preview.png`,
    keywords: 'about drawing board studio, design studio team, branding studio about',
  },
  '/services': {
    title: `Services — ${SITE_NAME}`,
    description:
      'Brand identity, packaging design, UI/UX design, and web development — full-stack creative services for product brands and ambitious founders.',
    ogImage: `${SITE_URL}/services_preview.png`,
    keywords: 'branding services, packaging design services, UI UX services India, web development services',
  },
  '/services/branding': {
    title: `Brand Identity & Strategy — ${SITE_NAME}`,
    description:
      'We design brand identities that position your business clearly and scale with confidence. Strategy-led visual systems for serious founders.',
    keywords: 'brand identity design India, logo design, visual identity, brand strategy',
  },
  '/services/packaging-design': {
    title: `Packaging Design — ${SITE_NAME}`,
    description:
      'Strategy-first packaging design starting at ₹1,75,000. One master direction, SKU system, and production-ready handoff for consumer product brands.',
    keywords: 'packaging design India, product packaging, label design, dieline design, FMCG packaging',
  },
  '/services/development': {
    title: `Website & App Development — ${SITE_NAME}`,
    description:
      'High-code web and app development — custom React, Next.js, Shopify, and Framer builds that are fast, scalable, and visually precise.',
    keywords: 'web development India, React development, Shopify development, Framer development',
  },
  '/brand-readiness': {
    title: `Brand Readiness Check & Instant Quote — ${SITE_NAME}`,
    description:
      'Eight questions about where your brand is today and where it is going. Check your brand readiness score and get an instant strategic quote from The Drawing Board.',
    keywords: 'brand readiness, get quote branding, brand audit, packaging quote, design studio quote',
  },
  '/get-quote': {
    title: `Get a Quote — ${SITE_NAME}`,
    description:
      'Answer eight questions to get an instant scope recommendation and project quote from The Drawing Board.',
    keywords: 'get quote branding, brand readiness, packaging design quote',
  },
  '/quote': {
    title: `Get an Instant Quote & Brand Audit — ${SITE_NAME}`,
    description:
      'Answer eight questions to receive an instant scope recommendation and project quote from The Drawing Board.',
    keywords: 'get quote branding, brand readiness, packaging design quote, brand audit',
  },
  '/insights': {
    title: `Insights & Articles — ${SITE_NAME}`,
    description:
      'Practical articles on branding, packaging strategy, and design thinking — written for founders building real brands.',
    ogImage: `${SITE_URL}/insights_preview.png`,
    keywords: 'branding insights, packaging strategy, design thinking, founder resources',
  },
  '/contact': {
    title: `Contact — ${SITE_NAME}`,
    description:
      'Get in touch with The Drawing Board. Discuss your project via our inquiry form or get an instant quote.',
    keywords: 'contact drawing board, book design call, hire branding studio India',
  },
};

/**
 * JSON-LD Structured Data schemas
 */
export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: COMPANY_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  description: DEFAULT_DESCRIPTION,
  sameAs: [
    // Add social profile URLs here after deployment
    // 'https://instagram.com/thedrawingboard.studio',
    // 'https://linkedin.com/company/thedrawingboard',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Support',
    availableLanguage: ['English', 'Hindi'],
  },
};

export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/work?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};
