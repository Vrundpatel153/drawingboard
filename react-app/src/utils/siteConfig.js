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
  import.meta.env.VITE_INSTAGRAM_HANDLE || 'drawingboard.co';

export const INSTAGRAM_URL = 'https://www.instagram.com/drawingboard.co/';

export const LINKEDIN_URL =
  'https://www.linkedin.com/in/vinayak-agarwal-05497a113/';

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
  '/works': {
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
  '/about': {
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
  '/service': {
    title: `Services — ${SITE_NAME}`,
    description:
      'Brand identity, packaging design, UI/UX design, and web development — full-stack creative services for product brands and ambitious founders.',
    ogImage: `${SITE_URL}/services_preview.png`,
    keywords: 'branding services, packaging design services, UI UX services India, web development services',
  },
  '/branding': {
    title: `Brand Identity & Strategy — ${SITE_NAME}`,
    description:
      'We design brand identities that position your business clearly and scale with confidence. Strategy-led visual systems for serious founders.',
    keywords: 'brand identity design India, logo design, visual identity, brand strategy',
  },
  '/services/branding': {
    title: `Brand Identity & Strategy — ${SITE_NAME}`,
    description:
      'We design brand identities that position your business clearly and scale with confidence. Strategy-led visual systems for serious founders.',
    keywords: 'brand identity design India, logo design, visual identity, brand strategy',
  },
  '/service/branding': {
    title: `Brand Identity & Strategy — ${SITE_NAME}`,
    description:
      'We design brand identities that position your business clearly and scale with confidence. Strategy-led visual systems for serious founders.',
    keywords: 'brand identity design India, logo design, visual identity, brand strategy',
  },
  '/packaging': {
    title: `Packaging Design & Structural Engineering — ${SITE_NAME}`,
    description:
      'Strategy-first packaging design starting at ₹1,75,000. One master direction, SKU system, and production-ready handoff for consumer product brands.',
    keywords: 'packaging design India, product packaging, label design, dieline design, FMCG packaging',
  },
  '/packaging-design': {
    title: `Packaging Design & Structural Engineering — ${SITE_NAME}`,
    description:
      'Strategy-first packaging design starting at ₹1,75,000. One master direction, SKU system, and production-ready handoff for consumer product brands.',
    keywords: 'packaging design India, product packaging, label design, dieline design, FMCG packaging',
  },
  '/services/packaging-design': {
    title: `Packaging Design & Structural Engineering — ${SITE_NAME}`,
    description:
      'Strategy-first packaging design starting at ₹1,75,000. One master direction, SKU system, and production-ready handoff for consumer product brands.',
    keywords: 'packaging design India, product packaging, label design, dieline design, FMCG packaging',
  },
  '/services/packaging': {
    title: `Packaging Design & Structural Engineering — ${SITE_NAME}`,
    description:
      'Strategy-first packaging design starting at ₹1,75,000. One master direction, SKU system, and production-ready handoff for consumer product brands.',
    keywords: 'packaging design India, product packaging, label design, dieline design, FMCG packaging',
  },
  '/service/packaging-design': {
    title: `Packaging Design & Structural Engineering — ${SITE_NAME}`,
    description:
      'Strategy-first packaging design starting at ₹1,75,000. One master direction, SKU system, and production-ready handoff for consumer product brands.',
    keywords: 'packaging design India, product packaging, label design, dieline design, FMCG packaging',
  },
  '/service/packaging': {
    title: `Packaging Design & Structural Engineering — ${SITE_NAME}`,
    description:
      'Strategy-first packaging design starting at ₹1,75,000. One master direction, SKU system, and production-ready handoff for consumer product brands.',
    keywords: 'packaging design India, product packaging, label design, dieline design, FMCG packaging',
  },
  '/web-development': {
    title: `Website & App Development — ${SITE_NAME}`,
    description:
      'High-code web and app development — custom React, Next.js, Shopify, and Framer builds that are fast, scalable, and visually precise.',
    keywords: 'web development India, React development, Shopify development, Framer development',
  },
  '/development': {
    title: `Website & App Development — ${SITE_NAME}`,
    description:
      'High-code web and app development — custom React, Next.js, Shopify, and Framer builds that are fast, scalable, and visually precise.',
    keywords: 'web development India, React development, Shopify development, Framer development',
  },
  '/services/development': {
    title: `Website & App Development — ${SITE_NAME}`,
    description:
      'High-code web and app development — custom React, Next.js, Shopify, and Framer builds that are fast, scalable, and visually precise.',
    keywords: 'web development India, React development, Shopify development, Framer development',
  },
  '/service/development': {
    title: `Website & App Development — ${SITE_NAME}`,
    description:
      'High-code web and app development — custom React, Next.js, Shopify, and Framer builds that are fast, scalable, and visually precise.',
    keywords: 'web development India, React development, Shopify development, Framer development',
  },
  '/services/web-development': {
    title: `Website & App Development — ${SITE_NAME}`,
    description:
      'High-code web and app development — custom React, Next.js, Shopify, and Framer builds that are fast, scalable, and visually precise.',
    keywords: 'web development India, React development, Shopify development, Framer development',
  },
  '/service/web-development': {
    title: `Website & App Development — ${SITE_NAME}`,
    description:
      'High-code web and app development — custom React, Next.js, Shopify, and Framer builds that are fast, scalable, and visually precise.',
    keywords: 'web development India, React development, Shopify development, Framer development',
  },
  '/saas-branding': {
    title: `SaaS Branding & UI/UX Design System Studio — ${SITE_NAME}`,
    description:
      'System-grade visual identity, tokenized Figma component libraries, and conversion-engineered software surfaces for B2B SaaS and high-growth digital products.',
    keywords: 'saas branding, UI UX design systems, B2B SaaS design, product design studio India',
  },
  '/services/saas-branding': {
    title: `SaaS Branding & UI/UX Design System Studio — ${SITE_NAME}`,
    description:
      'System-grade visual identity, tokenized Figma component libraries, and conversion-engineered software surfaces for B2B SaaS and high-growth digital products.',
    keywords: 'saas branding, UI UX design systems, B2B SaaS design, product design studio India',
  },
  '/service/saas-branding': {
    title: `SaaS Branding & UI/UX Design System Studio — ${SITE_NAME}`,
    description:
      'System-grade visual identity, tokenized Figma component libraries, and conversion-engineered software surfaces for B2B SaaS and high-growth digital products.',
    keywords: 'saas branding, UI UX design systems, B2B SaaS design, product design studio India',
  },
  '/ui-ux': {
    title: `UI/UX & Digital Product Design — ${SITE_NAME}`,
    description:
      'Conversion-engineered interface design, user journey mapping, and component systems for digital products and platforms.',
    keywords: 'UI UX design, product design, Figma design system, web app interface design',
  },
  '/ui-ux-design': {
    title: `UI/UX & Digital Product Design — ${SITE_NAME}`,
    description:
      'Conversion-engineered interface design, user journey mapping, and component systems for digital products and platforms.',
    keywords: 'UI UX design, product design, Figma design system, web app interface design',
  },
  '/services/ui-ux': {
    title: `UI/UX & Digital Product Design — ${SITE_NAME}`,
    description:
      'Conversion-engineered interface design, user journey mapping, and component systems for digital products and platforms.',
    keywords: 'UI UX design, product design, Figma design system, web app interface design',
  },
  '/services/ui-ux-design': {
    title: `UI/UX & Digital Product Design — ${SITE_NAME}`,
    description:
      'Conversion-engineered interface design, user journey mapping, and component systems for digital products and platforms.',
    keywords: 'UI UX design, product design, Figma design system, web app interface design',
  },
  '/services/design': {
    title: `UI/UX & Digital Product Design — ${SITE_NAME}`,
    description:
      'Conversion-engineered interface design, user journey mapping, and component systems for digital products and platforms.',
    keywords: 'UI UX design, product design, Figma design system, web app interface design',
  },
  '/service/design': {
    title: `UI/UX & Digital Product Design — ${SITE_NAME}`,
    description:
      'Conversion-engineered interface design, user journey mapping, and component systems for digital products and platforms.',
    keywords: 'UI UX design, product design, Figma design system, web app interface design',
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
  '/blog': {
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
  '/thank-you': {
    title: `Thank You — ${SITE_NAME}`,
    description:
      'Thank you for contacting The Drawing Board Studio. We will review your project brief and get back to you shortly.',
    noindex: true,
  },
  '/privacy-policy': {
    title: `Privacy Policy — ${SITE_NAME}`,
    description:
      'Privacy Policy and data governance principles of The Drawing Board Studio.',
  },
  '/privacy': {
    title: `Privacy Policy — ${SITE_NAME}`,
    description:
      'Privacy Policy and data governance principles of The Drawing Board Studio.',
  },
  '/terms-of-service': {
    title: `Terms of Service — ${SITE_NAME}`,
    description:
      'Terms of Service and commercial client engagement agreements for The Drawing Board Studio.',
  },
  '/terms': {
    title: `Terms of Service — ${SITE_NAME}`,
    description:
      'Terms of Service and commercial client engagement agreements for The Drawing Board Studio.',
  },
  '/terms-and-conditions': {
    title: `Terms of Service — ${SITE_NAME}`,
    description:
      'Terms of Service and commercial client engagement agreements for The Drawing Board Studio.',
  },
  '/admin': {
    title: `Admin — ${SITE_NAME}`,
    description: 'Internal project management interface.',
    noindex: true,
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
    'https://www.instagram.com/drawingboard.co/',
    'https://www.linkedin.com/in/vinayak-agarwal-05497a113/',
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
