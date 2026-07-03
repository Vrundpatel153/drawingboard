const fs = require('fs');

const framerHtml = fs.readFileSync('new_framer_home.html', 'utf8');
const oldHomeCode = fs.readFileSync('src/pages/Home.jsx', 'utf8');

// Extract current nav Desktop
const navDesktopMatch = oldHomeCode.match(/<nav[^>]*data-framer-name="Desktop"[^>]*>([\s\S]*?)<\/nav>/i);
const navDesktop = navDesktopMatch ? navDesktopMatch[0] : null;

// Extract current nav Phone
const navPhoneMatch = oldHomeCode.match(/<nav[^>]*data-framer-name="Phone"[^>]*>([\s\S]*?)<\/nav>/i);
const navPhone = navPhoneMatch ? navPhoneMatch[0] : null;

// Extract current footer
const footerMatch = oldHomeCode.match(/<footer[^>]*>([\s\S]*?)<\/footer>/i) || oldHomeCode.match(/<div[^>]*data-framer-name="Footer"[^>]*>([\s\S]*?)<\/div>/i);
const footer = footerMatch ? footerMatch[0] : null;

if (!navDesktop || !navPhone || !footer) {
    console.error('Failed to extract current navbar or footer from Home.jsx!');
    process.exit(1);
}

// 1. Extract <div id="main"> from new_framer_home.html
const mainStart = framerHtml.indexOf('<div id="main"');
if (mainStart === -1) {
    console.error('Failed to find <div id="main" in new_framer_home.html');
    process.exit(1);
}
const bodyEnd = framerHtml.indexOf('</body>');
if (bodyEnd === -1) {
    console.error('Failed to find </body> in new_framer_home.html');
    process.exit(1);
}
let mainHtml = framerHtml.substring(mainStart, bodyEnd);
// Remove trailing scripts
mainHtml = mainHtml.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
mainHtml = mainHtml.trim();

// Fix all inline opacity:0 or opacity: 0 to opacity: 1
mainHtml = mainHtml.replace(/opacity:\s*0\b/g, 'opacity: 1');

// 2. Replace target desktop nav
const desktopNavRegex = /<nav[^>]*data-framer-name="Desktop"[^>]*>[\s\S]*?<\/nav>/i;
if (mainHtml.match(desktopNavRegex)) {
  console.log('Replacing desktop nav in target HTML...');
  mainHtml = mainHtml.replace(desktopNavRegex, navDesktop);
} else {
  console.warn('Warning: Desktop nav selector not found in target HTML!');
}

// 3. Replace target phone nav
const phoneNavRegex = /<nav[^>]*data-framer-name="Phone"[^>]*>[\s\S]*?<\/nav>/i;
if (mainHtml.match(phoneNavRegex)) {
  console.log('Replacing phone nav in target HTML...');
  mainHtml = mainHtml.replace(phoneNavRegex, navPhone);
} else {
  console.warn('Warning: Phone nav selector not found in target HTML!');
}

// 4. Replace target footer
const footerRegex = /<footer[^>]*>[\s\S]*?<\/footer>/i;
const footerDivRegex = /<div[^>]*data-framer-name="Footer"[^>]*>[\s\S]*?<\/div>/i;
if (mainHtml.match(footerRegex)) {
  console.log('Replacing footer (<footer/>) in target HTML...');
  mainHtml = mainHtml.replace(footerRegex, footer);
} else if (mainHtml.match(footerDivRegex)) {
  console.log('Replacing footer (<div data-framer-name="Footer"/>) in target HTML...');
  mainHtml = mainHtml.replace(footerDivRegex, footer);
} else {
  console.warn('Warning: Footer selector not found in target HTML!');
}

// 5. Extract all <style> tags from new_framer_home.html
const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
const styles = [];
let match;
while ((match = styleRegex.exec(framerHtml)) !== null) {
    if (match[1].trim()) {
        styles.push(match[1]);
    }
}

// 6. Escape for template literals
function escapeTemplateLiteral(str) {
    return str.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

const escapedHtml = escapeTemplateLiteral(mainHtml);
const escapedStyles = styles.map(s => escapeTemplateLiteral(s));

// 7. Write Home.jsx
const newHomeCode = `import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  injectArrowIcons,
  initMobileMenu,
  bindHoverClasses,
  initMarquee,
  fixNumberCounters,
  createLinkClickHandler,
  fixAnimationStates,
  cleanupMobileMenu
} from '../utils/framerPageUtils';

const htmlContent = \`${escapedHtml}\`;

const styles = [
  ${escapedStyles.map(s => `\`${s}\``).join(',\n  ')}
];

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // Set Page Title
    document.title = "The Drawing board | strategy-first Branding Specialists";

    // Inject styles (with opacity fix)
    const styleElements = [];
    styles.forEach((css, index) => {
      const el = document.createElement('style');
      el.id = \`page-style-home-\${index}\`;
      el.textContent = fixAnimationStates(css);
      document.head.appendChild(el);
      styleElements.push(el);
    });

    // Initialize all Framer fixes
    bindHoverClasses();
    initMarquee(styleElements);
    injectArrowIcons();
    fixNumberCounters();
    initMobileMenu(navigate);

    // Intercept clicks for SPA navigation
    const handleLinkClick = createLinkClickHandler(navigate);
    document.addEventListener('click', handleLinkClick);

    return () => {
      styleElements.forEach(el => el.remove());
      document.removeEventListener('click', handleLinkClick);
      cleanupMobileMenu();
    };
  }, [navigate]);

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
}
`;

fs.writeFileSync('src/pages/Home.jsx', newHomeCode);
console.log('Successfully generated src/pages/Home.jsx with inline opacities fixed!');
