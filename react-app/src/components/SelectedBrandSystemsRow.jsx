import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ArrowIcon from './ArrowIcon';

const BRAND_SYSTEMS = [
  {
    slug: 'after8%C2%AE---reimagining-intimacy-for-a-new-generation.',
    tag: 'Personal Wellness',
    name: 'AFTER8®',
    image: 'https://framerusercontent.com/images/GI9hs6gABp4QhAbVBk1Ej9TVE0.png',
    challenge: 'Enter a sensitive and visually crowded category without feeling clinical, crude or generic.',
    direction: 'A confident after-hours identity balancing discretion, modernity and clear product recognition.',
    systems: [
      'Positioning direction',
      'Visual identity',
      'Packaging architecture',
      'Variant logic',
      'Digital launch direction'
    ],
    demo: 'How one central brand idea can remain recognisable across identity, product packaging and digital communication.'
  },
  {
    slug: 'ajumma-kitchen-modern-asian-bistro',
    tag: 'Modern Asian Bistro & Packaging',
    name: 'AJUMMA',
    image: 'https://framerusercontent.com/images/lDJGRw6ojn1T4R3Kty0DiGRtA.jpg',
    challenge: 'Establish an energetic, authentic Korean & Pan-Asian street dining brand that scales across takeout, retail sauces, and urban flagship locations.',
    direction: 'Playful mascot typography, vibrant packaging dielines, bold sauce label architecture, and dynamic street-stall aesthetic.',
    systems: [
      'Logomark & character badge',
      'Takeaway carton & bowl packaging',
      'Custom retail sauce bottle labels',
      'Menu board system & signage',
      'Digital ordering & merch rollout'
    ],
    demo: 'How high-velocity cultural packaging and character-led branding create magnetic retail demand and franchisable hospitality presence.'
  },
  {
    slug: 'yaad-sacred-memories-sensory-rituals',
    tag: 'Sensory Rituals & Packaging',
    name: 'YAAD',
    image: '/images/yaad/yaad_cover.png',
    challenge: 'Elevate traditional incense, soaps, and candles from low-margin commodities into an emotional, nostalgic luxury ritual.',
    direction: 'Incense-stand geometry typography, timestamped memory storytelling, architectural dielines, and monochromatic packaging suites.',
    systems: [
      'Incense-stand logo geometry',
      'Incense stick box dielines',
      'Architectural candle packaging',
      'Monochromatic cone SKU matrix',
      'Artisanal Ayurvedic soap cartons',
      'Bombay dusk & diffuser suites'
    ],
    demo: 'How nostalgic place-memory storytelling and architectural dielines transform cultural commodities into coveted luxury staples.'
  },
  {
    slug: 'lumen-fine-jewellery',
    tag: 'Fine Jewellery',
    name: 'LUMIEN',
    image: 'https://framerusercontent.com/images/Gj0gd8TaOnBqjox9iFb1KV8EbY.jpeg',
    challenge: 'Build a modern jewellery brand that feels aspirational and refined without relying on predictable luxury codes.',
    direction: 'Restraint, proportion and tactile detail used to create a distinctive identity and gifting experience.',
    systems: [
      'Brand story',
      'Identity',
      'Packaging',
      'Retail details',
      'Digital art direction'
    ],
    demo: 'How a restrained visual system can communicate value through consistency, tactility and thoughtful detail.'
  },
  {
    slug: 'soul-brew-branding-packaging-design',
    tag: 'Specialty Coffee & F&B',
    name: 'SOUL BREW',
    image: '/images/soul-brew/o1.png',
    challenge: 'Build a distinctive brand identity, custom roast packaging architecture, and brand narrative for an artisanal specialty coffee brand.',
    direction: 'Artisanal logotype, custom roast color-coding, sustainable pouch packaging, and tactile coffee collateral.',
    systems: [
      'Brand positioning & strategy',
      'Visual identity & logotype',
      'Roast packaging dielines',
      'Color-coded SKU system',
      'Digital storefront direction'
    ],
    demo: 'How strategy-led packaging architecture and brand storytelling create category leadership in consumer F&B.'
  },
  {
    slug: 'pronto-italian-restaurant-identity',
    tag: 'Fast-Casual Hospitality',
    name: 'PRONTO!',
    image: '/images/pronto/pronto_01.png',
    challenge: 'Modernise an authentic Italian pasta bar identity for high-volume urban rollout without losing culinary heritage.',
    direction: 'Bold typographic lockups, Italian racing-red palette, custom delivery packaging, and kinetic kitchen menus.',
    systems: [
      'Logomark & secondary badges',
      'Takeaway box & bag dielines',
      'Menu boards & queue graphics',
      'Digital ordering UI kit',
      'Staff uniform guidelines'
    ],
    demo: 'How high-contrast, energetic branding transforms casual dining operations into an scalable franchise model.'
  },
  {
    slug: 'matcha-club-brand-identity',
    tag: 'Organic Japanese Tea',
    name: 'MATCHA CLUB',
    image: '/images/matcha-club/matcha-club_02.png',
    challenge: 'Introduce ceremonial-grade Japanese Uji matcha to western wellness consumers with supreme shelf presence.',
    direction: 'Minimalist tin packaging architecture, washi paper label textures, and clean Scandinavian-Japanese typography.',
    systems: [
      'Ceremonial tin dielines',
      'Grade hierarchy & seals',
      'Custom refill pouch design',
      'Shopify e-commerce experience',
      'Wholesale retail display caddy'
    ],
    demo: 'How packaging materiality and subtle visual restraint command premium shelf pricing in wellness categories.'
  },
  {
    slug: 'murami-character-driven-brand-identity',
    tag: 'Character & Hospitality',
    name: 'MURAMI',
    image: '/images/murami/murami_01.png',
    challenge: 'Create an unmistakable character-led mascot universe in a fast-paced dining scene without losing culinary authority or scalability.',
    direction: 'High-energy modular mascot illustration system, Japanese streetwear art direction, custom takeout packaging, and interior neon specs.',
    systems: [
      'Modular character mascot',
      'Takeout packaging dielines',
      'Streetwear apparel & hoodies',
      'In-store signage & murals',
      'Digital launch kit'
    ],
    demo: 'How an iconic mascot system serves as a living brand ambassador, driving organic social shareability across physical and digital touchpoints.'
  },
  {
    slug: 'flint-business-automation-brand-identity',
    tag: 'Enterprise Automation & SaaS',
    name: 'FLINT',
    image: '/images/flint/flint_01.png',
    challenge: 'Position a next-generation workflow automation platform to compete directly with legacy enterprise monoliths.',
    direction: 'High-precision geometric typography, technical schematic aesthetic, custom dark-mode design system, and telemetry motion graphics.',
    systems: [
      'Enterprise logomark system',
      'Dark-mode token library',
      'Marketing web architecture',
      'Interactive product UI kit',
      'Corporate collateral suite'
    ],
    demo: 'How systematic typography and developer-grade visual precision establish enterprise trust and command premium ACV valuations.'
  },
  {
    slug: 'bondwith---brand-identity-and-guidelines',
    tag: 'Relationship Tech & Lifestyle',
    name: 'BONDWITH',
    image: '/images/bondwith/bondwith_page_01.jpg',
    challenge: 'Translate deep emotional human connections into a vibrant, modern social lifestyle brand without feeling sentimental or dated.',
    direction: 'Dynamic interlocking letterforms, warm sunset color palettes, expressive iconography, and cohesive mobile app interface.',
    systems: [
      'Interlocking brand mark',
      'Mobile design guidelines',
      'Editorial photography rules',
      'Social motion templates',
      'Event activation branding'
    ],
    demo: 'How fluid, interconnected graphic elements evoke emotional intimacy while maintaining crisp digital app ergonomics.'
  },
  {
    slug: 'alder---outdoor-essentials-built-for-slower-movement',
    tag: 'Apparel & Outdoor Goods',
    name: 'ALDER',
    image: 'https://framerusercontent.com/images/a2BEbNtjms8UtyG15PrY1sOF8oI.png',
    challenge: 'Position an outdoor lifestyle apparel label for conscious everyday movement without performative mountaineering clichés.',
    direction: 'Earthy neutral palettes, archival utilitarian typography, organic cotton wash tags, and recycled hangtag systems.',
    systems: [
      'Visual identity & monogram',
      'Fabric care label architecture',
      'DTC e-commerce storefront',
      'Sustainable polymailer dielines',
      'Seasonal lookbook guidelines'
    ],
    demo: 'How subtle material cues and understated typography establish enduring outdoor lifestyle brand equity.'
  },
  {
    slug: 'rest-religion',
    tag: 'Restorative Sleep & Skincare',
    name: 'REST RELIGION',
    image: '/images/rest-religion/rest-religion_01.jpg',
    challenge: 'Differentiate an organic psychodermatology and sleep ritual line in an oversaturated generic skincare market.',
    direction: 'Deep twilight color architecture, tactile debossed secondary cartons, calming editorial serif typography, and apothecary amber bottles.',
    systems: [
      'Apothecary label architecture',
      'Custom carton dielines',
      'Embossed foil finishing',
      'Educational ritual guide',
      'E-commerce storefront'
    ],
    demo: 'How sensory packaging textures and thoughtful typography transform daily skincare into an elevated bedtime ritual.'
  },
  {
    slug: 'toodaloo-superfood-snack-packaging',
    tag: 'Adaptogenic Superfood & Snacks',
    name: 'TOODALOO',
    image: '/images/toodaloo/toodaloo_01.jpg',
    challenge: 'Launch an adaptogenic functional trail mix line with vivid shelf impact that communicates gut and brain health benefits instantly.',
    direction: 'Psychedelic organic illustrations, vibrant chromatic spectrum, custom barrier-sealed pouch dielines, and playful flavor storytelling.',
    systems: [
      'Custom pouch dielines',
      'Flavor character vignettes',
      'Retail display shipper',
      'Nutritional badge system',
      'Amazon brand store'
    ],
    demo: 'How high-vibrancy illustration and bold color-coding capture impulse retail buyers and create undeniable shelf pop.'
  },
  {
    slug: 'reel-paper-eco-packaging',
    tag: 'Sustainable FMCG Paper Goods',
    name: 'REEL',
    image: '/images/reel/reel_01.jpg',
    challenge: 'Elevate tree-free bamboo household paper products into a chic, design-forward DTC subscription brand.',
    direction: 'Modern geometric patterns, monochrome Kraft packaging tape, minimalist typography, and eco-certified packaging specs.',
    systems: [
      'Individual roll wrapper patterns',
      'Shipping box dielines',
      'Subscription box experience',
      'Impact metrics iconography',
      'DTC web interface'
    ],
    demo: 'How everyday utilitarian commodities can be transformed into desirable lifestyle staples through thoughtful sustainable packaging.'
  },
  {
    slug: 'good-protein-branding-packaging-design',
    tag: 'Plant Nutrition & FMCG',
    name: 'GOOD PROTEIN',
    image: 'https://framerusercontent.com/images/8w3w4wCUrCCf6rHwTvx89XZMg.webp',
    challenge: 'Redesign an all-in-one superfood shake powder brand to dominate modern retail and DTC subscription channels.',
    direction: 'Friendly bold typography, creamy pastel flavor coding, matte foil pouch dielines, and playful macronutrient benefit icons.',
    systems: [
      'Pouch packaging architecture',
      'Flavor color token matrix',
      'Scoop & shaker bottle collateral',
      'Subscription onboarding flow',
      'Retail POP counter display'
    ],
    demo: 'How appetite-appeal packaging design converts high-ticket functional health powders into daily ritual habits.'
  },
  {
    slug: 'yala-greek-ice-cream-packaging',
    tag: 'Artisanal Dairy & Gelato',
    name: 'YALA GREEK',
    image: '/images/yala/yala_01.jpg',
    challenge: 'Bring traditional Greek olive oil and mountain yogurt gelato into contemporary European gourmet retail.',
    direction: 'Aegean cobalt blue and sunlit terracotta palette, classical stone-carved typographic touches, and biodegradable pint tub packaging.',
    systems: [
      'Pint tub dielines & lids',
      'Ingredient provenance seal',
      'Parlour signage & menu blades',
      'Insulated delivery tote bags',
      'Digital parlour ordering'
    ],
    demo: 'How Mediterranean heritage storytelling and tactile packaging elevate frozen desserts into a gourmet luxury experience.'
  },
  {
    slug: 'blank-body',
    tag: 'Fragrance & Body Care',
    name: 'BLANK BODY',
    image: '/images/blank-body/blank-body_01.jpg',
    challenge: 'Differentiate an unscented-base, custom-scented body oil brand for dermatologically sensitive modern consumers.',
    direction: 'Monochromatic clinical-meets-luxury packaging, screen-printed frosted amber glass, embossed carton dielines, and clean typography.',
    systems: [
      'Frosted bottle screenprint specs',
      'Debossed rigid gift boxes',
      'Scent profiling questionnaire UI',
      'Bath linen & tactile merch',
      'Omnichannel retail displays'
    ],
    demo: 'How minimalist packaging architecture communicates skin-first purity while retaining ultra-premium vanity presence.'
  }
];

export default function SelectedBrandSystemsRow() {
  const containerRef = useRef(null);
  const isInteractingRef = useRef(false);
  const resumeTimerRef = useRef(null);
  const hasDraggedRef = useRef(false);

  // Duplicate items for continuous seamless loop
  const duplicatedProjects = [...BRAND_SYSTEMS, ...BRAND_SYSTEMS];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let animId;
    let lastTime = performance.now();
    const baseSpeed = 0.55; // Pixels per frame at 60fps (calm, slow, effortless speed)

    const tick = (now) => {
      const delta = Math.min((now - lastTime) / 16.667, 2.5); // Normalize to 60fps frame delta
      lastTime = now;

      if (!isInteractingRef.current && el) {
        el.scrollLeft += baseSpeed * delta;
        // Halfway point is exact duplicate threshold
        const halfWidth = el.scrollWidth / 2;
        if (el.scrollLeft >= halfWidth) {
          el.scrollLeft -= halfWidth;
        }
      }
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    // Interaction handlers
    const pauseScroll = () => {
      isInteractingRef.current = true;
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };

    const resumeScrollWithDelay = (delay = 1400) => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = setTimeout(() => {
        isInteractingRef.current = false;
        lastTime = performance.now();
      }, delay);
    };

    // Wheel handling (horizontal / trackpad scrolling)
    const handleWheel = () => {
      pauseScroll();
      resumeScrollWithDelay(1600);
    };

    el.addEventListener('mouseenter', pauseScroll);
    el.addEventListener('mouseleave', () => resumeScrollWithDelay(800));
    el.addEventListener('touchstart', pauseScroll, { passive: true });
    el.addEventListener('touchend', () => resumeScrollWithDelay(1400), { passive: true });
    el.addEventListener('wheel', handleWheel, { passive: true });

    // Drag-to-scroll mouse support
    let isMouseDown = false;
    let startX = 0;
    let scrollStart = 0;

    const handleMouseDown = (e) => {
      // Primary button only
      if (e.button !== 0) return;
      isMouseDown = true;
      hasDraggedRef.current = false;
      pauseScroll();
      startX = e.pageX;
      scrollStart = el.scrollLeft;
      el.style.cursor = 'grabbing';
      el.style.userSelect = 'none';
    };

    const handleMouseMove = (e) => {
      if (!isMouseDown) return;
      const currentX = e.pageX;
      const walk = (currentX - startX) * 1.35;
      if (Math.abs(currentX - startX) > 6) {
        hasDraggedRef.current = true;
      }
      el.scrollLeft = scrollStart - walk;

      // Handle wrapping while dragging left or right
      const halfWidth = el.scrollWidth / 2;
      if (el.scrollLeft >= halfWidth) {
        el.scrollLeft -= halfWidth;
        scrollStart -= halfWidth;
      } else if (el.scrollLeft <= 0) {
        el.scrollLeft += halfWidth;
        scrollStart += halfWidth;
      }
    };

    const handleMouseUp = () => {
      if (isMouseDown) {
        isMouseDown = false;
        el.style.cursor = 'grab';
        el.style.removeProperty('user-select');
        resumeScrollWithDelay(1500);
        // Clear dragged state after slight delay so click handler knows if it was a drag
        setTimeout(() => {
          hasDraggedRef.current = false;
        }, 80);
      }
    };

    el.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animId);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      el.removeEventListener('mouseenter', pauseScroll);
      el.removeEventListener('mouseleave', resumeScrollWithDelay);
      el.removeEventListener('touchstart', pauseScroll);
      el.removeEventListener('touchend', resumeScrollWithDelay);
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleClickCapture = (e) => {
    // If the user was dragging the row, intercept the click so they don't accidentally navigate
    if (hasDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div
      className="case-slider-container infinite-brand-systems-wrapper"
      style={{
        position: 'relative',
        width: '100%',
        marginTop: '28px'
      }}
    >
      <style>{`
        .infinite-ticker-row {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .infinite-ticker-row::-webkit-scrollbar {
          display: none;
        }
        .case-card-interactive {
          transition: transform 0.25s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .case-card-interactive:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
          border-color: var(--pine) !important;
        }
        .case-card-interactive:hover .case-hover-arrow {
          transform: translateX(4px);
        }
        .case-card-interactive .case-img-inner {
          transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .case-card-interactive:hover .case-img-inner {
          transform: scale(1.04);
        }
      `}</style>

      <div
        ref={containerRef}
        className="case-grid infinite-ticker-row"
        onClickCapture={handleClickCapture}
        style={{
          display: 'flex',
          gap: '24px',
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollBehavior: 'auto',
          WebkitOverflowScrolling: 'touch',
          padding: '8px 4px 28px 4px',
          cursor: 'grab'
        }}
      >
        {duplicatedProjects.map((item, idx) => (
          <Link
            key={`${item.slug}-${idx}`}
            to={`/work/${item.slug}`}
            className="case-card case-card-interactive"
            style={{
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              flexDirection: 'column',
              flex: '0 0 clamp(310px, 28vw, 390px)',
              maxWidth: '390px',
              minWidth: '310px',
              border: '1px solid var(--ink)',
              background: 'var(--card)',
              overflow: 'hidden',
              borderRadius: '0px'
            }}
          >
            <div
              className="img case-img-container"
              style={{
                background: 'var(--card)',
                width: '100%',
                aspectRatio: '16 / 9',
                overflow: 'hidden',
                position: 'relative',
                display: 'block',
                borderBottom: '1px solid var(--paper-line)',
                padding: 0,
                margin: 0
              }}
            >
              <img
                src={item.image}
                alt={`${item.name} Brand System`}
                loading="lazy"
                className="case-img-inner"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  padding: 0,
                  margin: 0
                }}
              />
            </div>
            <div className="case-body" style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div
                className="tag mono"
                style={{
                  fontSize: '10.5px',
                  color: 'var(--ink-soft)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: '8px'
                }}
              >
                {item.tag}
              </div>
              <h4 style={{ fontSize: '20px', fontWeight: 600, letterSpacing: '-0.02em', margin: '0 0 10px 0' }}>
                {item.name}
              </h4>
              <p style={{ fontSize: '13px', lineHeight: 1.5, color: 'var(--ink-soft)', margin: '0 0 8px 0' }}>
                <strong style={{ color: 'var(--ink)' }}>Challenge:</strong> {item.challenge}
              </p>
              <p style={{ fontSize: '13px', lineHeight: 1.5, color: 'var(--ink-soft)', margin: '0 0 16px 0' }}>
                <strong style={{ color: 'var(--ink)' }}>Direction:</strong> {item.direction}
              </p>
              <ul className="sys-list" style={{ margin: '0 0 16px 0', paddingLeft: '18px', fontSize: '12.5px', color: 'var(--ink)' }}>
                {item.systems.map((sys, sIdx) => (
                  <li key={sIdx} style={{ marginBottom: '4px' }}>{sys}</li>
                ))}
              </ul>
              <div
                className="demo"
                style={{
                  background: 'var(--paper-line)',
                  padding: '12px 14px',
                  borderRadius: '3px',
                  fontSize: '12px',
                  lineHeight: 1.5,
                  color: 'var(--ink-soft)',
                  marginTop: 'auto'
                }}
              >
                <b style={{ display: 'block', color: 'var(--ink)', marginBottom: '4px', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.05em' }}>
                  What This Project Demonstrates
                </b>
                {item.demo}
              </div>
              <div
                style={{
                  marginTop: '16px',
                  color: 'var(--pine)',
                  fontWeight: 600,
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>View Case Study</span>
                <span className="case-hover-arrow" style={{ display: 'inline-flex', transition: 'transform 0.2s ease' }}>
                  <ArrowIcon size={14} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
