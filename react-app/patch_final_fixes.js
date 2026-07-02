import fs from 'fs';

// 1. Update index.css
let css = fs.readFileSync('./src/index.css', 'utf-8');

// Add the responsive hidden rules back and the logo fix
const appendCss = `
/* ==========================================
   FRAMER RESPONSIVE BREAKPOINT HIDDEN RULES (RESTORED)
   ========================================== */

/* Hidden on Desktop (min-width: 1200px) */
@media (min-width: 1200px) {
  .hidden-zcrc1,
  .hidden-5otppn {
    display: none !important;
  }
}

/* Hidden on Tablet (810px to 1199.98px) */
@media (min-width: 810px) and (max-width: 1199.98px) {
  .hidden-1rwyfdt,
  .hidden-i41gn8 {
    display: none !important;
  }
}

/* Hidden on Mobile (max-width: 809.98px) */
@media (max-width: 809.98px) {
  .hidden-1xqv3hd,
  .hidden-9ohcpn {
    display: none !important;
  }
}

/* ==========================================
   GLOBAL FIXES
   ========================================== */
/* Fix the "The Drawing Board" logo being cut off by SVG viewBox */
.framer-1paje31,
.framer-1paje31 foreignObject {
  overflow: visible !important;
}
.framer-1paje31 foreignObject {
  width: 150% !important; /* Allow the text to span wider than the viewBox */
}
`;

fs.writeFileSync('./src/index.css', css + appendCss, 'utf-8');

// 2. Update Services.jsx
let jsx = fs.readFileSync('./src/pages/Services.jsx', 'utf-8');

const styleInsertPoint = jsx.indexOf('/* ═══ RESPONSIVE STICKY CARD POSITIONING ═══ */');

const unhideCss = `        /* ═══ UNHIDE CARDS ON MOBILE/TABLET ═══ */
        /* Framer wraps the desktop cards in hidden classes, but we need them visible on all breakpoints */
        .framer-1udromg .hidden-1xqv3hd,
        .framer-1udromg .hidden-1rwyfdt,
        .framer-1udromg .hidden-9ohcpn,
        .framer-1udromg .hidden-i41gn8 {
          display: contents !important;
        }
        
        .framer-1fc14sw-container > div > div {
           box-sizing: border-box !important;
        }

        `;

jsx = jsx.substring(0, styleInsertPoint) + unhideCss + jsx.substring(styleInsertPoint);

fs.writeFileSync('./src/pages/Services.jsx', jsx, 'utf-8');

console.log('Successfully patched index.css and Services.jsx');
