import fs from 'fs';
import path from 'path';

function escapeString(str) {
  return str.replace(/`/g, '\\`').replace(/\${/g, '\\${');
}

function extractMain(html) {
  const mainStart = html.indexOf('<div id="main"');
  if (mainStart === -1) {
    throw new Error('Could not find <div id="main"');
  }
  
  let depth = 0;
  let pos = mainStart;
  
  while (pos < html.length) {
    const nextOpen = html.indexOf('<div', pos);
    const nextClose = html.indexOf('</div>', pos);
    
    if (nextOpen === -1 && nextClose === -1) {
      break;
    }
    
    if (nextOpen !== -1 && (nextClose === -1 || nextOpen < nextClose)) {
      depth++;
      pos = nextOpen + 4;
    } else {
      depth--;
      if (depth === 0) {
        return html.substring(mainStart, nextClose + 6);
      }
      pos = nextClose + 6;
    }
  }
  
  const bodyClose = html.indexOf('</body>');
  if (bodyClose !== -1) {
    return html.substring(mainStart, bodyClose);
  }
  return html.substring(mainStart);
}

function stripWhatsApp(html) {
  const waStart = html.indexOf('<div class="framer-rsw4x4-container"');
  if (waStart === -1) return html;
  
  const firstClose = html.indexOf('</div>', waStart);
  if (firstClose === -1) return html;
  
  const secondClose = html.indexOf('</div>', firstClose + 6);
  if (secondClose === -1) return html;
  
  return html.substring(0, waStart) + html.substring(secondClose + 6);
}

function compileStaticPage(htmlPath, outPath, componentName) {
  if (!fs.existsSync(htmlPath)) {
    throw new Error(`File not found: ${htmlPath}`);
  }
  const html = fs.readFileSync(htmlPath, 'utf-8');
  
  let title = componentName;
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  if (titleMatch) {
    title = titleMatch[1].trim();
  }
  
  const styles = [];
  const styleRegex = /<style([^>]*)>([\s\S]*?)<\/style>/gi;
  let match;
  while ((match = styleRegex.exec(html)) !== null) {
    // Replace initial opacity 0 with opacity 1 in styles as well
    const cleanedCss = match[2].replace(/\bopacity\s*:\s*0\b/g, 'opacity: 1');
    styles.push(cleanedCss);
  }
  
  let mainHtml = extractMain(html);
  
  // Strip WhatsApp container from main HTML
  mainHtml = stripWhatsApp(mainHtml);
  
  // Replace initial opacity 0 with opacity 1 to force visual rendering
  mainHtml = mainHtml.replace(/\bopacity\s*:\s*0\b/g, 'opacity: 1');
  
  // Remove CSS blur filters from inline styles (which Framer uses for entrance animations)
  mainHtml = mainHtml.replace(/filter\s*:\s*blur\([^)]+\);?/g, 'filter: none;');
  
  // Clean relative navigation links to local routes
  mainHtml = mainHtml.replace(/href="\.\/about"/g, 'href="/studio"');
  mainHtml = mainHtml.replace(/href="\.\/blog"/g, 'href="/insights"');
  mainHtml = mainHtml.replace(/href="\.\/work"/g, 'href="/work"');
  mainHtml = mainHtml.replace(/href="\.\/service"/g, 'href="/service"');
  mainHtml = mainHtml.replace(/href="\.\/"/g, 'href="/"');
  mainHtml = mainHtml.replace(/href="\.\/contact"/g, 'href="/contact"');
  
  // Clean dynamic project and service detail URLs
  mainHtml = mainHtml.replace(/href="\.\/work\/([^"]+)"/g, 'href="/work/$1"');
  mainHtml = mainHtml.replace(/href="\.\/service\/([^"]+)"/g, 'href="/service/$1"');
  mainHtml = mainHtml.replace(/href="\.\/blog\/([^"]+)"/g, 'href="/blog/$1"');
  mainHtml = mainHtml.replace(/href="\.\/legal\/([^"]+)"/g, 'href="/legal/$1"');
  
  const escapedHtml = escapeString(mainHtml);
  const styleArrayString = styles.map(css => `  \`${escapeString(css)}\``).join(',\n');
  
  const componentCode = `import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const htmlContent = \`${escapedHtml}\`;

const styles = [
${styleArrayString}
];

export default function ${componentName}() {
  const navigate = useNavigate();

  useEffect(() => {
    // Set Page Title
    document.title = "${title}";

    // Inject styles
    const styleElements = [];
    styles.forEach((css, index) => {
      const el = document.createElement('style');
      el.id = \`page-style-${componentName.toLowerCase()}-\${index}\`;
      el.textContent = css;
      document.head.appendChild(el);
      styleElements.push(el);
    });

    // Run clone-hover initialization
    try {
      const bindHover = (el) => {
        el.addEventListener('mouseenter', () => { el.classList.add('hover'); });
        el.addEventListener('mouseleave', () => { el.classList.remove('hover'); });
      };
      document.querySelectorAll('[class*=" framer-v-"],[class^="framer-v-"]').forEach(bindHover);
    } catch (e) {
      console.error("Hover error:", e);
    }

    // Run clone-marquee initialization
    try {
      const uls = document.querySelectorAll('ul[style*="flex-direction: row"]');
      uls.forEach((ul) => {
        let real = Array.from(ul.querySelectorAll('li[aria-hidden="false"]'));
        if (!real.length) {
          const all = ul.querySelectorAll('li');
          real = Array.from(all).slice(0, Math.ceil(all.length / 3));
        }
        if (!real.length) return;
        const w = real.reduce((s, li) => s + li.offsetWidth, 0);
        if (!w) return;
        const id = 'cloneMarquee' + Math.random().toString(36).slice(2);
        const s = document.createElement('style');
        s.textContent = \`@keyframes \${id}{from{transform:translateX(0)}to{transform:translateX(-\${w}px)}}\`;
        document.head.appendChild(s);
        styleElements.push(s);
        ul.style.willChange = 'transform';
        ul.style.transform = '';
        ul.style.animation = \`\${id} \${w / 80}s linear infinite\`;
      });
    } catch (e) {
      console.error("Marquee error:", e);
    }

    // Intercept clicks to avoid page reloads
    const handleLinkClick = (e) => {
      const anchor = e.target.closest('a');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (!href) return;
        
        // Let external and special protocols flow naturally
        if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http') || href.startsWith('#')) {
          return;
        }
        
        e.preventDefault();
        let target = href;
        if (target.startsWith('.')) {
          target = target.substring(1);
        }
        if (!target.startsWith('/')) {
          target = '/' + target;
        }
        if (target === '/index.html') {
          target = '/';
        }
        
        // Map routes correctly
        if (target === '/about') {
          target = '/studio';
        } else if (target === '/blog') {
          target = '/insights';
        } else if (target === '/service') {
          target = '/service';
        } else if (target === '/work') {
          target = '/work';
        }
        
        navigate(target);
      }
    };

    document.addEventListener('click', handleLinkClick);

    return () => {
      styleElements.forEach(el => el.remove());
      document.removeEventListener('click', handleLinkClick);
    };
  }, [navigate]);

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
}
`;

  fs.writeFileSync(outPath, componentCode, 'utf-8');
  console.log(`Successfully compiled ${htmlPath} into ${outPath}`);
}

try {
  compileStaticPage('./framer_home.html', './src/pages/Home.jsx', 'Home');
  compileStaticPage('./framer_studio.html', './src/pages/Studio.jsx', 'Studio');
  compileStaticPage('./framer_work.html', './src/pages/Work.jsx', 'Work');
  compileStaticPage('./framer_insights.html', './src/pages/Insights.jsx', 'Insights');
  compileStaticPage('./framer_service.html', './src/pages/Services.jsx', 'Services');
  compileStaticPage('./framer_contact.html', './src/pages/Contact.jsx', 'Contact');
} catch (err) {
  console.error('Compilation failed:', err.message);
}
