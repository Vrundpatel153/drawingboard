/* ==========================================================================
   The Drawing Board — Main Interactive Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  // 1. FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-q');
    const answer = item.querySelector('.faq-a');

    if (question && answer) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all open FAQs
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('open');
          const otherAnswer = otherItem.querySelector('.faq-a');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        });

        // Toggle current FAQ
        if (!isOpen) {
          item.classList.add('open');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });

  // 2. Portfolio & Insights Category Filter Tabs
  const filterTabs = document.querySelectorAll('.ftab');
  const caseCards = document.querySelectorAll('.case-card, .proof-card, .article-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', function () {
      filterTabs.forEach(t => t.classList.remove('on'));
      this.classList.add('on');

      const filterCategory = this.getAttribute('data-filter') || 'all';

      caseCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category') || '';

        if (filterCategory === 'all' || cardCategory.includes(filterCategory)) {
          card.classList.remove('hide');
          card.style.display = '';
        } else {
          card.classList.add('hide');
          card.style.display = 'none';
        }
      });
    });
  });

  // 3. Mobile Navigation Drawer Toggle
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const mobileDrawer = document.querySelector('.mobile-drawer');

  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      mobileBtn.textContent = mobileDrawer.classList.contains('open') ? '[ CLOSE ]' : '[ MENU ]';
    });
  }

  // 4. Highlight Active Navigation Link based on current page URL
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navlinks a, .mobile-drawer a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPath || (currentPath === '' && href === 'index.html'))) {
      link.classList.add('active');
    }
  });
});
