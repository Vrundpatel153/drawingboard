/**
 * Shared Framer page utilities for all pages.
 * Handles: arrow icon injection, mobile menu, hover bindings, marquee, link interception, opacity fixes.
 */

// ─── Arrow SVG for CTA button icon circles ───
const ARROW_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: rgb(29, 3, 86); display: block;"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>`;


/**
 * Inject arrow icons into empty Framer button icon containers.
 */
export function injectArrowIcons() {
  // Primary/Accent + Primary/Black buttons have .framer-r7kiwh (Icon circle)
  // Inside them is .framer-1f53e8y-container which is empty
  const iconContainers = document.querySelectorAll(
    '.framer-1f53e8y-container, .framer-1hwa1qa-container'
  );
  iconContainers.forEach((container) => {
    // Only inject if the container is effectively empty
    const inner = container.querySelector('div[style*="display:contents"], div[style*="display: contents"]');
    if (inner && inner.innerHTML.trim() === '') {
      inner.innerHTML = ARROW_SVG;
      inner.style.display = 'flex';
      inner.style.alignItems = 'center';
      inner.style.justifyContent = 'center';
    } else if (container.innerHTML.trim() === '' || container.textContent.trim() === '') {
      container.innerHTML = ARROW_SVG;
      container.style.display = 'flex';
      container.style.alignItems = 'center';
      container.style.justifyContent = 'center';
    }
  });
}

/**
 * Fix the mobile hamburger menu SVG (which uses a missing <use> reference)
 * and add toggle functionality.
 */
export function initMobileMenu(navigate) {
  // Fix broken hamburger SVG references
  const hamburgerSvgs = document.querySelectorAll('.framer-1ixsc3w');
  hamburgerSvgs.forEach((svg) => {
    const useEl = svg.querySelector('use');
    if (useEl && !document.getElementById(useEl.getAttribute('href')?.replace('#', ''))) {
      // Replace the broken <use> with actual hamburger lines
      svg.innerHTML = `
        <line x1="4" y1="7" x2="20" y2="7" stroke="rgb(29, 3, 86)" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="4" y1="12" x2="20" y2="12" stroke="rgb(29, 3, 86)" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="4" y1="17" x2="20" y2="17" stroke="rgb(29, 3, 86)" stroke-width="1.5" stroke-linecap="round"/>
      `;
    }
  });

  // Add click handler for the hamburger toggle
  const menuToggle = document.querySelector('.framer-1xj56n7[data-highlight="true"]');
  if (menuToggle) {
    // Create the mobile menu overlay if it doesn't exist
    let overlay = document.getElementById('mobile-menu-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'mobile-menu-overlay';
      overlay.innerHTML = `
        <div class="mobile-menu-content">
          <div class="mobile-menu-header">
            <span class="mobile-menu-logo" style="font-family: 'Podjog Black', sans-serif; font-weight: 900; font-size: 22px; color: rgb(29, 3, 86); letter-spacing: -0.07px;">The Drawing Board</span>
            <button class="mobile-menu-close" aria-label="Close menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgb(29, 3, 86)" stroke-width="1.5" stroke-linecap="round">
                <line x1="6" y1="6" x2="18" y2="18"/>
                <line x1="18" y1="6" x2="6" y2="18"/>
              </svg>
            </button>
          </div>
          <nav class="mobile-menu-nav">
            <a href="/" class="mobile-menu-link">Home</a>
            <a href="/studio" class="mobile-menu-link">Studio</a>
            <a href="/work" class="mobile-menu-link">Works</a>
            <a href="/service" class="mobile-menu-link">Services</a>
            <a href="/insights" class="mobile-menu-link">Insights</a>
          </nav>
          <a href="/contact" class="mobile-menu-cta">
            <span>Contact</span>
            <span class="mobile-menu-cta-icon">${ARROW_SVG}</span>
          </a>
        </div>
      `;
      document.body.appendChild(overlay);

      // Close button handler
      overlay.querySelector('.mobile-menu-close').addEventListener('click', () => {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      });

      // Link click handlers (use React Router navigation)
      overlay.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const href = link.getAttribute('href');
          overlay.classList.remove('open');
          document.body.style.overflow = '';
          if (navigate) {
            navigate(href);
          }
        });
      });
    }

    // Toggle menu open
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const overlay = document.getElementById('mobile-menu-overlay');
      if (overlay) {
        overlay.classList.toggle('open');
        document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
      }
    });
  }
}

/**
 * Bind hover classes for Framer interactive elements.
 */
export function bindHoverClasses() {
  try {
    const bindHover = (el) => {
      el.addEventListener('mouseenter', () => el.classList.add('hover'));
      el.addEventListener('mouseleave', () => el.classList.remove('hover'));
    };
    document.querySelectorAll('[class*=" framer-v-"],[class^="framer-v-"]').forEach(bindHover);
  } catch (e) {
    console.error("Hover error:", e);
  }
}

/**
 * Initialize clone-marquee ticker animations.
 */
export function initMarquee(styleElements) {
  try {
    const uls = document.querySelectorAll('ul[style*="flex-direction:row"], ul[style*="flex-direction: row"]');
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
      s.textContent = `@keyframes ${id}{from{transform:translateX(0)}to{transform:translateX(-${w}px)}}`;
      document.head.appendChild(s);
      styleElements.push(s);
      ul.style.willChange = 'transform';
      ul.style.transform = '';
      ul.style.animation = `${id} ${w / 80}s linear infinite`;
    });
  } catch (e) {
    console.error("Marquee error:", e);
  }
}

/**
 * Fix number counters that are stuck at "0" on the home page.
 * Framer SSR exports counters at 0 — we set them to final values.
 */
export function fixNumberCounters() {
  // Map of counter label text to the value that should show
  const counterMap = {
    'Brands Launched Across Industries': 25,
    'Years of Combined Creative Experience': 10,
    'Client Satisfaction on Average': 5.9,
    'Projects Delivered with Precision': 152,
  };

  // Find all counter containers
  const counterSections = document.querySelectorAll('[data-framer-name="Number counter"]');
  counterSections.forEach((counter) => {
    // Find the nearest label to match
    const parentCard = counter.closest('[data-framer-name="Number"], [data-framer-name="Cover"]');
    if (!parentCard) return;

    const label = parentCard.querySelector('h6.framer-text, [data-styles-preset="ximXKqIVu"]');
    if (!label) return;

    const labelText = label.textContent.trim();
    const targetValue = counterMap[labelText];
    if (targetValue) {
      const valueDiv = counter.querySelector('div[style*="font-size"]');
      const text = valueDiv ? valueDiv.textContent.trim() : null;
      if (valueDiv && (text === '0' || text === '0.0' || text === '')) {
        // Animate value from 0 to targetValue
        let startTimestamp = null;
        const duration = 2000; // 2 seconds
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          // Ease-out progress calculation
          let progress = Math.min((timestamp - startTimestamp) / duration, 1);
          const easeOutProgress = 1 - Math.pow(1 - progress, 3);
          
          const currentVal = easeOutProgress * targetValue;
          
          if (targetValue % 1 !== 0) {
            valueDiv.textContent = currentVal.toFixed(1);
          } else {
            valueDiv.textContent = Math.floor(currentVal);
          }
          
          if (progress < 1) {
            window.requestAnimationFrame(step);
          } else {
            valueDiv.textContent = targetValue;
          }
        };
        window.requestAnimationFrame(step);
      }
    }
  });
}

/**
 * Create the link click handler that intercepts Framer links and routes them through React Router.
 */
export function createLinkClickHandler(navigate) {
  return (e) => {
    const anchor = e.target.closest('a');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href) return;

    // Let external and special protocols flow naturally
    if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http') || href.startsWith('#')) {
      return;
    }

    e.preventDefault();
    let target = href;

    // Normalize path
    if (target.startsWith('.')) {
      target = target.substring(1);
    }
    if (!target.startsWith('/')) {
      target = '/' + target;
    }
    if (target === '/index.html') {
      target = '/';
    }

    // Map Framer routes to React routes
    if (target === '/about') {
      target = '/studio';
    } else if (target === '/blog') {
      target = '/insights';
    } else if (target === '/works') {
      target = '/work';
    } else if (target.startsWith('/blog/')) {
      // Blog detail pages stay as blog detail routes
      // e.g. /blog/some-post -> /blog/some-post
      // These are handled by the BlogDetail route
    }

    // Scroll to top on navigation
    window.scrollTo(0, 0);
    navigate(target);
  };
}

/**
 * Fix opacity and transform for Framer animation-stuck elements.
 * Also applies the CSS text replacement.
 */
export function fixAnimationStates(css) {
  // Replace opacity: 0 with opacity: 1 in CSS text
  return css.replace(/\bopacity\s*:\s*0\b/g, 'opacity: 1');
}

/**
 * Clean up mobile menu overlay on unmount.
 */
export function cleanupMobileMenu() {
  const overlay = document.getElementById('mobile-menu-overlay');
  if (overlay) {
    overlay.remove();
  }
  document.body.style.overflow = '';
}

/**
 * Clean up empty details, credits, and sections globally from Framer pages.
 */
export function cleanPageDOM(container) {
  if (!container) return;

  // 1. Hide empty details/credits items
  const items = container.querySelectorAll('[data-framer-name="Item"]');
  items.forEach((item) => {
    const text = item.textContent.trim().replace(/\s+/g, ' ');
    // Hide if key or val is empty. 
    // Typical empty keys are just ":" or empty
    // Typical empty values under "Services" are just "/" or empty
    // Typical empty values under "Credits" are just ":" with nothing after
    if (
      text === ':' ||
      text === 'Services : /' ||
      text.endsWith(':') ||
      text.endsWith(': /') ||
      text.endsWith('Services :')
    ) {
      item.style.display = 'none';
      item.setAttribute('data-hidden-by-cleaner', 'true');
    }
  });

  // 2. Hide entire Details or Credits column if all its child items are hidden
  const textContainers = container.querySelectorAll('[data-framer-component-type="RichTextContainer"]');
  textContainers.forEach((tc) => {
    const txt = tc.textContent.trim();
    if (txt === 'Credits' || txt === 'Details') {
      let parent = tc.parentElement;
      while (parent && parent !== container) {
        const itemsInParent = parent.querySelectorAll('[data-framer-name="Item"]');
        if (itemsInParent.length > 0) {
          const allHidden = Array.from(itemsInParent).every(
            (item) => item.style.display === 'none'
          );
          if (allHidden) {
            // Hide the wrapper parent containing the title + items
            parent.style.display = 'none';
          }
          break;
        }
        parent = parent.parentElement;
      }
    }
  });

  // 3. Hide entire empty sections (Challenge, Solution, Outcome, Testimonial)
  const sections = container.querySelectorAll('section, [data-framer-name="The Challenge"], [data-framer-name="Our Solution"], [data-framer-name="The Outcome"], [data-framer-name="Testimonial"]');
  sections.forEach((section) => {
    const name = section.getAttribute('data-framer-name');
    if (!name) return;

    if (['The Challenge', 'Our Solution', 'The Outcome', 'Testimonial'].includes(name)) {
      const contentDiv = section.querySelector('[data-framer-name="Content"]');
      if (contentDiv) {
        const txt = contentDiv.textContent.trim();
        const hasImgs = contentDiv.querySelectorAll('img').length > 0;
        if (txt === '' && !hasImgs) {
          section.style.display = 'none';
        }
      } else {
        const text = section.textContent.trim();
        if (text === name || text === '') {
          section.style.display = 'none';
        }
      }
    }
  });
}

