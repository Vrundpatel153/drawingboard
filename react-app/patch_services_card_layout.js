import fs from 'fs';

let content = fs.readFileSync('./src/pages/Services.jsx', 'utf-8');

const styleBlockStart = content.indexOf('        /* ═══════════════════════════════════════════════════');
const styleBlockEnd = content.indexOf('        /* Staggered z-index so later cards overlap earlier ones */');

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
        .framer-deISe .framer-6w0hu9,
        .framer-6w0hu9 {
          overflow: visible !important;
          height: auto !important;
        }

        /* Inner section content wrapper - CRITICAL: must have 100% width so it doesn't collapse to 1px on mobile! */
        .framer-deISe .framer-1tpyum7,
        .framer-1tpyum7 {
          overflow: visible !important;
          height: auto !important;
          width: 100% !important;
        }

        /* The card list — CRITICAL: needs overflow:visible for sticky to work */
        .framer-deISe .framer-1udromg,
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
          /* Force Tablet Layout */
          .framer-1fc14sw-container .framer-9rUKy {
            flex-direction: column !important;
            height: auto !important;
            gap: 20px !important;
          }
          .framer-1fc14sw-container .framer-9rUKy > div {
            width: 100% !important;
            height: auto !important;
            min-height: 250px !important;
            flex: none !important;
          }
        }
        
        /* Mobile */
        @media (max-width: 809.98px) {
          .framer-1fc14sw-container {
            top: 80px !important;
            margin-bottom: 40px !important;
          }
          /* Force Mobile Layout */
          .framer-1fc14sw-container .framer-9rUKy {
            flex-direction: column !important;
            height: auto !important;
            gap: 20px !important;
          }
          .framer-1fc14sw-container .framer-9rUKy > div {
            width: 100% !important;
            height: auto !important;
            min-height: 250px !important;
            flex: none !important;
          }
          .framer-1fc14sw-container .framer-mak5gt {
            padding: 24px !important;
          }
        }

`;

content = content.substring(0, styleBlockStart) + newStyleBlock + content.substring(styleBlockEnd);

fs.writeFileSync('./src/pages/Services.jsx', content, 'utf-8');
console.log('Successfully patched Services.jsx for mobile card column layout!');
