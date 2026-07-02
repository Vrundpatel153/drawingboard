import fs from 'fs';

let content = fs.readFileSync('./src/pages/Services.jsx', 'utf-8');

// 1. Fix the JS scroll handler
// Find the handleScroll function and replace the mobile logic.
const scrollLogicStart = content.indexOf('    // ─── Card stacking scroll animation ───');
const scrollLogicEnd = content.indexOf('    window.addEventListener(\'scroll\', handleScroll, { passive: true });');

const newScrollLogic = `    // ─── Card stacking scroll animation ───
    let ticking = false;
    const handleScroll = () => {
      playVisibleVideos();

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const cards = document.querySelectorAll('.framer-1fc14sw-container');
          if (!cards.length) {
            ticking = false;
            return;
          }

          let stickyTop = 120;
          if (window.innerWidth < 810) stickyTop = 80;
          else if (window.innerWidth < 1200) stickyTop = 100;

          for (let i = 0; i < cards.length - 1; i++) {
            const current = cards[i];
            const next = cards[i + 1];
            // The inner responsive card component is .framer-9rUKy on Desktop, 
            // but it's the direct child. It's safer to just query the first child div.
            const innerCard = current.firstElementChild;
            if (!innerCard) continue;

            const nextRect = next.getBoundingClientRect();
            const cardH = current.offsetHeight || 456;
            const dist = nextRect.top - stickyTop;

            let p = 0;
            if (dist <= 0) p = 1;
            else if (dist < cardH) p = 1 - dist / cardH;

            if (p > 0) {
              const scale = 1 - 0.05 * p;
              const brightness = 1 - 0.35 * p;
              const ty = -15 * p;
              innerCard.style.transition = 'transform 0.05s ease-out, filter 0.05s ease-out';
              innerCard.style.transformOrigin = 'center top';
              innerCard.style.transform = \`scale(\${scale}) translateY(\${ty}px)\`;
              innerCard.style.filter = \`brightness(\${brightness})\`;
            } else {
              innerCard.style.transform = '';
              innerCard.style.filter = '';
            }
          }

          // Reset last card
          const lastCard = cards[cards.length - 1];
          if (lastCard) {
            const inner = lastCard.firstElementChild;
            if (inner) {
              inner.style.transform = '';
              inner.style.filter = '';
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
\n`;

content = content.substring(0, scrollLogicStart) + newScrollLogic + content.substring(scrollLogicEnd);

// 2. Fix the CSS styles block
const styleBlockStart = content.indexOf('        /* ═══════════════════════════════════════════════════');
const styleBlockEnd = content.indexOf('        /* ═══ SERVICE CARD HOVER EFFECT ═══ */');

const newStyleBlock = `        /* ═══════════════════════════════════════════════════
           CARD STACKING SCROLL EFFECT — CRITICAL OVERRIDES
           The key problem: Framer root containers have 
           overflow:clip which breaks position:sticky.
           We must force overflow:visible on ALL ancestors.
         ═══════════════════════════════════════════════════ */

        /* Root page containers */
        .framer-deISe,
        .framer-i41gn8,
        .framer-9ohcpn,
        .framer-C1TEG,
        .framer-C1TEG.framer-5otppn,
        .framer-aElyh,
        .framer-bwODG,
        .framer-g3QMx,
        .framer-zcrc1 {
          overflow: visible !important;
          height: auto !important;
          min-height: auto !important;
        }

        /* Section wrapper containing the cards */
        .framer-6w0hu9 {
          overflow: visible !important;
          height: auto !important;
        }

        /* Inner section content wrapper - CRITICAL: must have 100% width so it doesn't collapse to 1px on mobile! */
        .framer-1tpyum7 {
          overflow: visible !important;
          height: auto !important;
          width: 100% !important;
        }

        /* The card list — CRITICAL: needs overflow:visible for sticky to work */
        .framer-1udromg {
          overflow: visible !important;
          position: relative !important;
          gap: 0 !important;
          width: 100% !important;
          max-width: 1280px !important;
          box-sizing: border-box !important;
        }

        /* ═══ RESPONSIVE STICKY CARD POSITIONING ═══ */
        .framer-1fc14sw-container {
          position: sticky !important;
          will-change: transform !important;
          box-sizing: border-box !important;
          opacity: 1 !important;
          transform: none !important;
          width: 100% !important;
          height: auto !important;
        }
        
        .framer-1fc14sw-container > div {
           width: 100% !important;
           height: auto !important;
           min-height: 400px;
        }

        /* Desktop */
        @media (min-width: 1200px) {
          .framer-1fc14sw-container {
            top: 120px !important;
            margin-bottom: 80px !important; 
            height: 456px !important;
          }
          .framer-1fc14sw-container > div {
            height: 100% !important;
            min-height: unset;
          }
        }
        
        /* Tablet */
        @media (min-width: 810px) and (max-width: 1199.98px) {
          .framer-1fc14sw-container {
            top: 100px !important;
            margin-bottom: 60px !important;
          }
        }
        
        /* Mobile */
        @media (max-width: 809.98px) {
          .framer-1fc14sw-container {
            top: 80px !important;
            margin-bottom: 40px !important;
          }
        }

        /* Staggered z-index so later cards overlap earlier ones */
        .framer-1udromg > *:nth-child(1) { z-index: 1 !important; }
        .framer-1udromg > *:nth-child(2) { z-index: 2 !important; }
        .framer-1udromg > *:nth-child(3) { z-index: 3 !important; }
        .framer-1udromg > *:nth-child(4) { z-index: 4 !important; }
        .framer-1udromg > *:nth-child(5) { z-index: 5 !important; }

`;

content = content.substring(0, styleBlockStart) + newStyleBlock + content.substring(styleBlockEnd);

fs.writeFileSync('./src/pages/Services.jsx', content, 'utf-8');
console.log('Successfully patched Services.jsx!');
