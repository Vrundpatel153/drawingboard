import fs from 'fs';
import path from 'path';

const distDir = path.resolve('./dist');
const publicDir = path.resolve('./public');
const projectsDataPath = path.resolve('./src/data/projectsData.json');

const DOMAIN = 'https://drawingsboards.com';

const FAQ_BRANDING = [
  {
    q: 'What makes The Drawing Board different from traditional agencies?',
    a: 'Traditional legacy agencies operate with account managers, bloated overheads, and opaque 8–14 week timelines. The Drawing Board is a senior design engineering studio where you work directly with founder Vrund Patel. We cap active client sprints at 2–3 per cycle, ensuring every brand receives senior-level architectural thinking, custom mathematical marks, and rapid turnaround without junior dilution.'
  },
  {
    q: 'How long does a brand identity project take?',
    a: 'Our core Brand-to-Shelf sprint takes 4 to 6 weeks from initial discovery audit to final production-ready vector delivery. Full Brand-to-Market engagements (including custom web development) typically span 6 to 8 weeks.'
  },
  {
    q: 'What are your deliverables for a brand identity sprint?',
    a: 'You receive complete intellectual property ownership and full source files: mathematical logomark systems (primary, secondary, favicon, monochrome), comprehensive typography hierarchy and color token palettes, responsive brand guidelines PDF, tactile production guidelines (paper stocks, foils, debossing specs), social launch asset templates, and vector production assets.'
  },
  {
    q: 'Do you handle packaging and digital implementation too?',
    a: 'Yes. We are a unified studio combining identity design, structural packaging engineering (print-ready dielines, FSC-certified materials, embossing), and custom high-speed digital web platforms (React, Shopify, Framer) so your brand maintains flawless coherence from shelf to screen.'
  },
  {
    q: 'What is your pricing structure?',
    a: 'We publish transparent, fixed-scope sprint pricing: Brand-to-Shelf System is ₹4,75,000 / $4,960 (4–6 weeks); Brand-to-Market System (Identity + Packaging + Web) is ₹6,50,000 / $6,780 (6–8 weeks); and Enterprise / SaaS platforms range from ₹6,00,000 to ₹8,50,000 / $6,200 to $8,900. No hidden hourly fees or unexpected retainer creep.'
  },
  {
    q: 'How many clients do you take on at once?',
    a: 'To guarantee dedicated creative direction and rigorous quality control, we limit our studio intake to a maximum of 2 to 3 active client engagements per sprint cycle.'
  }
];

const FAQ_PACKAGING = [
  {
    q: 'What packaging types do you design?',
    a: 'We design complete structural packaging systems across FMCG food & beverage, specialty coffee, luxury wellness & skincare, ceramic and artisanal goods, wine & spirits, and retail apparel. This includes rigid boxes, flexible pouches, glass bottles, tin canisters, unboxing sleeves, and custom mailers.'
  },
  {
    q: 'Do you provide print-ready dielines?',
    a: 'Yes. Every packaging deliverable includes 100% production-ready vector dielines built to manufacturer tolerances, complete with CMYK color profiles, Pantone spot color callouts, finish specs (foil stamping, spot UV, blind embossing), and material recommendations.'
  },
  {
    q: 'Can you coordinate directly with our manufacturer?',
    a: 'Yes. We frequently liaise directly with packaging vendors and printing houses across India, UAE, Europe, and the US to review prepress proofs, verify registration accuracy, and ensure physical output matches the digital architectural model.'
  },
  {
    q: 'Do you offer sustainable and eco-friendly packaging options?',
    a: 'Sustainability is integrated into our engineering. We specify FSC-certified paperboards, soy-based inks, water-based coatings, biodegradable compostable films, and mono-material recyclable structures.'
  }
];

const FAQ_WEB = [
  {
    q: 'What tech stack do you use for web development?',
    a: 'We build ultra-fast, modern digital platforms using React, Next.js, Vite, Shopify Liquid / Storefront API, and Framer, tailored to your commercial objective and team workflow.'
  },
  {
    q: 'Is the website optimized for mobile, SEO, and AI search engines?',
    a: 'Yes. Every digital experience features sub-second load times, responsive mobile-first typography, full JSON-LD structured schemas, pre-rendered static HTML for Googlebot and AI crawlers, and llms.txt integration for discovery in ChatGPT, Claude, and Perplexity.'
  }
];

function buildFaqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(f => ({
      '@type': 'Question',
      'name': f.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': f.a
      }
    }))
  };
}

function buildProjectSchema(p) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    'name': p.title,
    'headline': p.title,
    'description': p.description,
    'creator': {
      '@type': 'Organization',
      'name': 'The Drawing Board',
      'url': DOMAIN
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'The Drawing Board',
      'url': DOMAIN,
      'logo': `${DOMAIN}/favicon.svg`
    },
    'image': p.coverImage ? (p.coverImage.startsWith('http') ? p.coverImage : `${DOMAIN}${p.coverImage}`) : `${DOMAIN}/home_preview.png`,
    'url': `${DOMAIN}/work/${p.slug}`,
    'genre': p.tag || 'Brand Identity & Packaging Design'
  };
}

function buildBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, idx) => ({
      '@type': 'ListItem',
      'position': idx + 1,
      'name': item.name,
      'item': `${DOMAIN}${item.path}`
    }))
  };
}

function generateSemanticContent(route, metadata, projects) {
  const arrowSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>`;

  if (route === '/' || route === '/branding') {
    const faqHtml = FAQ_BRANDING.map(f => `
      <details style="border-bottom: 1px solid #e2ded5; padding: 1.25rem 0;">
        <summary style="font-weight: 600; font-size: 1.15rem; cursor: pointer; list-style: none;">${f.q}</summary>
        <p style="margin-top: 0.75rem; color: #5a5953; line-height: 1.6;">${f.a}</p>
      </details>
    `).join('');

    return `
      <header style="padding: 1.5rem 2rem; border-bottom: 1px solid #e2ded5; display: flex; justify-content: space-between; align-items: center;">
        <a href="/" style="font-weight: 700; text-decoration: none; color: #1b1b17; font-size: 1.1rem;">THE DRAWING BOARD</a>
        <nav style="display: flex; gap: 1.5rem; font-size: 0.95rem;">
          <a href="/branding" style="color: #1b1b17; text-decoration: none; font-weight: 600;">Branding</a>
          <a href="/packaging" style="color: #1b1b17; text-decoration: none;">Packaging</a>
          <a href="/web-development" style="color: #1b1b17; text-decoration: none;">Web Dev</a>
          <a href="/work" style="color: #1b1b17; text-decoration: none;">Work</a>
          <a href="/about" style="color: #1b1b17; text-decoration: none;">Studio</a>
          <a href="/contact" style="color: #1b1b17; text-decoration: none;">Contact</a>
        </nav>
      </header>

      <main style="max-width: 1200px; margin: 0 auto; padding: 4rem 2rem;">
        <section style="margin-bottom: 4rem;">
          <div class="bp-avail" style="display: inline-flex; align-items: center; gap: 7px; padding: 6px 12px; font-family: monospace; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 600; color: #1b1b17; border: 1px solid #1b1b17; background: #ffffff; border-radius: 2px; margin-bottom: 1.5rem;">
            <span class="bp-dot" style="width: 7px; height: 7px; border-radius: 50%; background: #C85A32; display: inline-block;"></span>
            <span>AVAILABLE FROM OCT 2026</span>
          </div>

          <h1 style="font-size: 3.25rem; font-weight: 700; line-height: 1.15; letter-spacing: -0.03em; color: #1b1b17; margin-bottom: 1.5rem;">
            Build the brand people choose before they compare.
          </h1>

          <p style="font-size: 1.35rem; color: #5a5953; max-width: 820px; line-height: 1.5; margin-bottom: 2.5rem;">
            We engineer distinctive brand identities, tactile packaging systems, and digital product experiences designed to earn attention, communicate value, and scale market share.
          </p>

          <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
            <a href="https://cal.com/dandelion-nrvrze" target="_blank" rel="noopener" style="display: inline-flex; align-items: center; gap: 0.5rem; background: #1b1b17; color: #ffffff; padding: 0.85rem 1.75rem; text-decoration: none; font-weight: 600; border-radius: 2px;">
              Book a call ${arrowSvg}
            </a>
            <a href="/work" style="display: inline-flex; align-items: center; gap: 0.5rem; border: 1px solid #1b1b17; color: #1b1b17; padding: 0.85rem 1.75rem; text-decoration: none; font-weight: 600; border-radius: 2px;">
              View Selected Works ${arrowSvg}
            </a>
          </div>
        </section>

        <section style="margin-bottom: 5rem; padding: 3rem 0; border-top: 1px solid #e2ded5; border-bottom: 1px solid #e2ded5;">
          <h2 style="font-size: 2rem; font-weight: 700; margin-bottom: 2rem;">Frequently Asked Questions</h2>
          <div style="display: flex; flex-direction: column;">
            ${faqHtml}
          </div>
        </section>

        <section style="margin-bottom: 5rem;">
          <h2 style="font-size: 2rem; font-weight: 700; margin-bottom: 2rem;">Selected Brand Systems</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 2rem;">
            ${projects.slice(0, 8).map(p => `
              <article style="border: 1px solid #e2ded5; padding: 1.5rem; border-radius: 2px;">
                <span style="font-family: monospace; font-size: 11px; color: #8a8880; text-transform: uppercase;">${p.tag}</span>
                <h3 style="font-size: 1.25rem; font-weight: 700; margin: 0.5rem 0;">
                  <a href="/work/${p.slug}" style="color: #1b1b17; text-decoration: none;">${p.title}</a>
                </h3>
                <p style="color: #5a5953; font-size: 0.95rem; line-height: 1.5; margin-bottom: 1rem;">${p.description}</p>
                <a href="/work/${p.slug}" style="display: inline-flex; align-items: center; gap: 0.4rem; font-weight: 600; font-size: 0.9rem; color: #1b1b17; text-decoration: none;">
                  View Case Study ${arrowSvg}
                </a>
              </article>
            `).join('')}
          </div>
        </section>
      </main>
    `;
  }

  if (route === '/packaging') {
    const faqHtml = FAQ_PACKAGING.map(f => `
      <details style="border-bottom: 1px solid #e2ded5; padding: 1.25rem 0;">
        <summary style="font-weight: 600; font-size: 1.15rem; cursor: pointer; list-style: none;">${f.q}</summary>
        <p style="margin-top: 0.75rem; color: #5a5953; line-height: 1.6;">${f.a}</p>
      </details>
    `).join('');

    return `
      <header style="padding: 1.5rem 2rem; border-bottom: 1px solid #e2ded5; display: flex; justify-content: space-between; align-items: center;">
        <a href="/" style="font-weight: 700; text-decoration: none; color: #1b1b17;">THE DRAWING BOARD</a>
        <nav style="display: flex; gap: 1.5rem; font-size: 0.95rem;">
          <a href="/branding" style="color: #1b1b17; text-decoration: none;">Branding</a>
          <a href="/packaging" style="color: #1b1b17; text-decoration: none; font-weight: 600;">Packaging</a>
          <a href="/web-development" style="color: #1b1b17; text-decoration: none;">Web Dev</a>
          <a href="/work" style="color: #1b1b17; text-decoration: none;">Work</a>
        </nav>
      </header>
      <main style="max-width: 1200px; margin: 0 auto; padding: 4rem 2rem;">
        <h1 style="font-size: 3rem; font-weight: 700; margin-bottom: 1.5rem;">Packaging that commands the shelf.</h1>
        <p style="font-size: 1.3rem; color: #5a5953; max-width: 800px; line-height: 1.5; margin-bottom: 2.5rem;">
          Tactile structural engineering, FSC-certified sustainable substrates, and precision print finishes crafted to win the physical retail moment.
        </p>
        <div style="margin-bottom: 4rem;">
          <a href="https://cal.com/dandelion-nrvrze" target="_blank" rel="noopener" style="display: inline-flex; align-items: center; gap: 0.5rem; background: #1b1b17; color: #ffffff; padding: 0.85rem 1.75rem; text-decoration: none; font-weight: 600; border-radius: 2px;">
            Book a call ${arrowSvg}
          </a>
        </div>
        <section style="margin-bottom: 4rem;">
          <h2 style="font-size: 2rem; font-weight: 700; margin-bottom: 2rem;">Packaging FAQs</h2>
          ${faqHtml}
        </section>
      </main>
    `;
  }

  if (route.startsWith('/work/')) {
    const slug = route.replace('/work/', '');
    const project = projects.find(p => p.slug === slug);
    if (project) {
      return `
        <header style="padding: 1.5rem 2rem; border-bottom: 1px solid #e2ded5; display: flex; justify-content: space-between; align-items: center;">
          <a href="/" style="font-weight: 700; text-decoration: none; color: #1b1b17;">THE DRAWING BOARD</a>
          <nav style="display: flex; gap: 1.5rem; font-size: 0.95rem;">
            <a href="/work" style="color: #1b1b17; text-decoration: none; font-weight: 600;">Work</a>
            <a href="/branding" style="color: #1b1b17; text-decoration: none;">Branding</a>
            <a href="/packaging" style="color: #1b1b17; text-decoration: none;">Packaging</a>
            <a href="/contact" style="color: #1b1b17; text-decoration: none;">Contact</a>
          </nav>
        </header>
        <main style="max-width: 1200px; margin: 0 auto; padding: 4rem 2rem;">
          <nav style="font-family: monospace; font-size: 12px; color: #8a8880; margin-bottom: 1.5rem;">
            <a href="/" style="color: inherit; text-decoration: none;">HOME</a> / <a href="/work" style="color: inherit; text-decoration: none;">WORK</a> / <span style="color: #1b1b17;">${project.tag}</span>
          </nav>
          <h1 style="font-size: 3rem; font-weight: 700; line-height: 1.2; margin-bottom: 1.5rem; color: #1b1b17;">${project.title}</h1>
          <p style="font-size: 1.25rem; color: #5a5953; max-width: 850px; line-height: 1.6; margin-bottom: 3rem;">${project.description}</p>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; padding: 2rem 0; border-top: 1px solid #e2ded5; border-bottom: 1px solid #e2ded5; margin-bottom: 3rem;">
            <div>
              <div style="font-family: monospace; font-size: 11px; color: #8a8880;">SECTOR</div>
              <div style="font-weight: 600; margin-top: 0.25rem;">${project.tag}</div>
            </div>
            <div>
              <div style="font-family: monospace; font-size: 11px; color: #8a8880;">DELIVERABLES</div>
              <div style="font-weight: 600; margin-top: 0.25rem;">Brand Identity, Systems & Production</div>
            </div>
            <div>
              <div style="font-family: monospace; font-size: 11px; color: #8a8880;">STUDIO LEAD</div>
              <div style="font-weight: 600; margin-top: 0.25rem;">Vrund Patel</div>
            </div>
          </div>

          <section style="display: flex; flex-direction: column; gap: 2rem; margin-bottom: 4rem;">
            ${(project.images || []).slice(0, 8).map((img, i) => `
              <div style="background: #f5f4ef; border-radius: 2px; overflow: hidden; border: 1px solid #e2ded5;">
                <img src="${img}" alt="${project.title} - Asset ${i + 1}" style="width: 100%; height: auto; display: block;" loading="lazy" />
              </div>
            `).join('')}
          </section>

          <section style="text-align: center; padding: 4rem 2rem; background: #faf9f5; border: 1px solid #e2ded5; border-radius: 2px; margin-bottom: 4rem;">
            <h2 style="font-size: 2rem; font-weight: 700; margin-bottom: 1rem;">Ready to engineer your brand system?</h2>
            <p style="color: #5a5953; margin-bottom: 2rem;">Let's build the brand people choose before they compare.</p>
            <a href="https://cal.com/dandelion-nrvrze" target="_blank" rel="noopener" style="display: inline-flex; align-items: center; gap: 0.5rem; background: #1b1b17; color: #ffffff; padding: 0.85rem 1.75rem; text-decoration: none; font-weight: 600; border-radius: 2px;">
              Book a call ${arrowSvg}
            </a>
          </section>
        </main>
      `;
    }
  }

  // Generic fallback for other routes
  return `
    <header style="padding: 1.5rem 2rem; border-bottom: 1px solid #e2ded5; display: flex; justify-content: space-between; align-items: center;">
      <a href="/" style="font-weight: 700; text-decoration: none; color: #1b1b17;">THE DRAWING BOARD</a>
      <nav style="display: flex; gap: 1.5rem; font-size: 0.95rem;">
        <a href="/branding" style="color: #1b1b17; text-decoration: none;">Branding</a>
        <a href="/packaging" style="color: #1b1b17; text-decoration: none;">Packaging</a>
        <a href="/work" style="color: #1b1b17; text-decoration: none;">Work</a>
        <a href="/contact" style="color: #1b1b17; text-decoration: none;">Contact</a>
      </nav>
    </header>
    <main style="max-width: 1200px; margin: 0 auto; padding: 4rem 2rem;">
      <h1 style="font-size: 2.75rem; font-weight: 700; margin-bottom: 1.5rem;">${metadata.title}</h1>
      <p style="font-size: 1.25rem; color: #5a5953; line-height: 1.6; max-width: 800px; margin-bottom: 2.5rem;">${metadata.description}</p>
      <a href="https://cal.com/dandelion-nrvrze" target="_blank" rel="noopener" style="display: inline-flex; align-items: center; gap: 0.5rem; background: #1b1b17; color: #ffffff; padding: 0.85rem 1.75rem; text-decoration: none; font-weight: 600; border-radius: 2px;">
        Book a call ${arrowSvg}
      </a>
    </main>
  `;
}

async function run() {
  if (!fs.existsSync(distDir)) {
    console.error('Dist directory does not exist! Run build first.');
    process.exit(1);
  }

  // 1. Copy index.html to 404.html
  fs.copyFileSync(path.join(distDir, 'index.html'), path.join(distDir, '404.html'));
  console.log('✓ Successfully created 404.html from index.html');

  // 2. Ensure llms.txt and llms-full.txt are in dist
  if (fs.existsSync(path.join(publicDir, 'llms.txt'))) {
    fs.copyFileSync(path.join(publicDir, 'llms.txt'), path.join(distDir, 'llms.txt'));
    console.log('✓ Copied llms.txt to dist');
  }
  if (fs.existsSync(path.join(publicDir, 'llms-full.txt'))) {
    fs.copyFileSync(path.join(publicDir, 'llms-full.txt'), path.join(distDir, 'llms-full.txt'));
    console.log('✓ Copied llms-full.txt to dist');
  }

  // 3. Create .nojekyll and _redirects
  fs.writeFileSync(path.join(distDir, '.nojekyll'), '');
  fs.writeFileSync(path.join(distDir, '_redirects'), '/*    /index.html   200\n');

  // 4. Configure vercel.json with cleanUrls and filesystem handling
  const vercelJson = {
    cleanUrls: true,
    routes: [
      {
        src: "/assets/(.*)",
        headers: { "cache-control": "public, max-age=31536000, immutable" },
        continue: true
      },
      {
        src: "/(.*)",
        headers: {
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "SAMEORIGIN",
          "Referrer-Policy": "strict-origin-when-cross-origin",
          "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
          "X-DNS-Prefetch-Control": "on"
        },
        continue: true
      },
      { handle: "filesystem" },
      { src: "/(.*)", dest: "/index.html" }
    ]
  };
  fs.writeFileSync(path.join(distDir, 'vercel.json'), JSON.stringify(vercelJson, null, 2));
  console.log('✓ Successfully created optimized vercel.json with cleanUrls & filesystem handling');

  // 5. Load project data
  let projects = [];
  if (fs.existsSync(projectsDataPath)) {
    try {
      projects = JSON.parse(fs.readFileSync(projectsDataPath, 'utf8'));
    } catch (err) {
      console.warn('Could not read projectsData.json:', err.message);
    }
  }

  // 6. Base index.html template
  const baseHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

  // 7. Route dictionary with specific SEO & Schemas
  const routeConfigs = [
    {
      route: '/',
      title: 'The Drawing Board — Strategy-First Design Studio | Brand, Web & Packaging',
      description: 'The Drawing Board is an independent design engineering studio crafting high-converting brand identities, structural packaging systems, and digital product experiences.',
      schemas: [buildFaqSchema(FAQ_BRANDING)]
    },
    {
      route: '/branding',
      title: 'Brand Identity Design Studio | The Drawing Board',
      description: 'Strategic brand identity design, mathematical logomark systems, comprehensive typography hierarchies, and complete visual guidelines for ambitious brands.',
      schemas: [buildFaqSchema(FAQ_BRANDING)]
    },
    {
      route: '/packaging',
      title: 'Packaging Design & Structural Engineering | The Drawing Board',
      description: 'Tactile packaging design, sustainable dieline engineering, and luxury print finishes for modern consumer brands and FMCG products.',
      schemas: [buildFaqSchema(FAQ_PACKAGING)]
    },
    {
      route: '/web-development',
      title: 'Web Development & Digital Experience Engineering | The Drawing Board',
      description: 'High-performance editorial websites, custom React/Shopify platforms, and conversion-optimized digital experiences.',
      schemas: [buildFaqSchema(FAQ_WEB)]
    },
    {
      route: '/development',
      title: 'Web Development & Digital Experience Engineering | The Drawing Board',
      description: 'High-performance editorial websites, custom React/Shopify platforms, and conversion-optimized digital experiences.',
      schemas: [buildFaqSchema(FAQ_WEB)]
    },
    {
      route: '/work',
      title: 'Selected Works & Brand Architecture Archive | The Drawing Board',
      description: 'Explore 35+ verified case studies across brand identity, luxury packaging systems, and digital engineering platforms.',
      schemas: []
    },
    {
      route: '/about',
      title: 'Studio & Design Engineering Philosophy | The Drawing Board',
      description: 'Why senior boutique studios outperform bloated agencies. Discover our Architectural Brand Engine methodology and founder-led model.',
      schemas: []
    },
    {
      route: '/studio',
      title: 'Studio & Design Engineering Philosophy | The Drawing Board',
      description: 'Why senior boutique studios outperform bloated agencies. Discover our Architectural Brand Engine methodology and founder-led model.',
      schemas: []
    },
    {
      route: '/contact',
      title: 'Initiate a Project Sprint | The Drawing Board',
      description: 'Book a 15-minute discovery call or submit your project brief directly to founder Vrund Patel.',
      schemas: []
    },
    {
      route: '/services',
      title: 'Design & Engineering Services | The Drawing Board',
      description: 'Full-spectrum studio capabilities: Brand-to-Shelf, Brand-to-Market, structural packaging engineering, and web development.',
      schemas: []
    },
    {
      route: '/privacy-policy',
      title: 'Privacy Policy | The Drawing Board',
      description: 'Privacy Policy and data governance principles of The Drawing Board.',
      schemas: []
    },
    {
      route: '/terms-of-service',
      title: 'Terms of Service | The Drawing Board',
      description: 'Terms of Service and commercial client engagement agreements for The Drawing Board.',
      schemas: []
    }
  ];

  // Add all project routes
  for (const p of projects) {
    routeConfigs.push({
      route: `/work/${p.slug}`,
      title: `${p.title} | The Drawing Board Case Study`,
      description: p.description || `Case study and strategic breakdown for ${p.title} by The Drawing Board.`,
      schemas: [
        buildProjectSchema(p),
        buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Work', path: '/work' },
          { name: p.title, path: `/work/${p.slug}` }
        ])
      ]
    });
  }

  console.log(`\n🚀 Generating static HTML pages for ${routeConfigs.length} routes...`);

  let count = 0;
  for (const cfg of routeConfigs) {
    const routeUrl = `${DOMAIN}${cfg.route === '/' ? '' : cfg.route}`;
    let pageHtml = baseHtml;

    // 1. Replace title
    pageHtml = pageHtml.replace(/<title>.*?<\/title>/i, `<title>${cfg.title}</title>`);

    // 2. Replace description
    pageHtml = pageHtml.replace(
      /<meta\s+name=["']description["']\s+content=["'].*?["']\s*\/?>/i,
      `<meta name="description" content="${cfg.description.replace(/"/g, '&quot;')}" />`
    );

    // 3. Replace canonical URL
    pageHtml = pageHtml.replace(
      /<link\s+rel=["']canonical["']\s+href=["'].*?["']\s*\/?>/i,
      `<link rel="canonical" href="${routeUrl}" />`
    );

    // 4. Update OpenGraph meta tags
    pageHtml = pageHtml.replace(
      /<meta\s+property=["']og:title["']\s+content=["'].*?["']\s*\/?>/i,
      `<meta property="og:title" content="${cfg.title.replace(/"/g, '&quot;')}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property=["']og:description["']\s+content=["'].*?["']\s*\/?>/i,
      `<meta property="og:description" content="${cfg.description.replace(/"/g, '&quot;')}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property=["']og:url["']\s+content=["'].*?["']\s*\/?>/i,
      `<meta property="og:url" content="${routeUrl}" />`
    );

    // 5. Inject Schemas into head before </head>
    if (cfg.schemas && cfg.schemas.length > 0) {
      const schemasJson = cfg.schemas.map(s => `\n    <script type="application/ld+json">\n    ${JSON.stringify(s, null, 2)}\n    </script>`).join('');
      pageHtml = pageHtml.replace('</head>', `${schemasJson}\n  </head>`);
    }

    // 6. Inject semantic pre-rendered HTML into <div id="root">
    const semanticContent = generateSemanticContent(cfg.route, cfg, projects);
    pageHtml = pageHtml.replace(
      /<div id="root">[\s\S]*?<\/div>/,
      `<div id="root">${semanticContent}</div>`
    );

    // 7. Write to output files
    if (cfg.route === '/') {
      fs.writeFileSync(path.join(distDir, 'index.html'), pageHtml, 'utf8');
    } else {
      const cleanRoute = cfg.route.replace(/^\//, '');
      const routeDir = path.join(distDir, cleanRoute);
      fs.mkdirSync(routeDir, { recursive: true });
      fs.writeFileSync(path.join(routeDir, 'index.html'), pageHtml, 'utf8');
      fs.writeFileSync(path.join(distDir, `${cleanRoute}.html`), pageHtml, 'utf8');
    }

    count++;
  }

  console.log(`🎉 Static HTML Generation complete! Pre-rendered ${count} pages with full SEO, AEO schemas, and rich crawlable content.`);
  console.log('✨ Works flawlessly on Vercel, Netlify, and all CI/CD pipelines without headless browser dependencies!\n');
}

run().catch((err) => {
  console.error('Fatal postbuild error:', err);
  process.exit(1);
});
