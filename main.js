/* Gary Ramah — Project Hub JS */

// === THEME TOGGLE ===
(function () {
  const root = document.documentElement;
  const toggle = document.querySelector('[data-theme-toggle]');
  let theme = root.getAttribute('data-theme') || 'dark';

  function setTheme(t) {
    theme = t;
    root.setAttribute('data-theme', theme);
    if (toggle) {
      toggle.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode');
      toggle.innerHTML = theme === 'dark'
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    }
  }

  setTheme(theme);
  if (toggle) {
    toggle.addEventListener('click', () => setTheme(theme === 'dark' ? 'light' : 'dark'));
  }
})();

// === HEADER SCROLL EFFECT ===
(function () {
  const header = document.getElementById('header');
  if (!header) return;
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastY = y;
  }, { passive: true });
})();

// === PROJECT FILTER ===
(function () {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.project-card');
  if (!tabs.length || !cards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const filter = tab.getAttribute('data-filter');

      // Update tab states
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Filter cards with smooth animation
      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeIn 0.25s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
})();

// === SCROLL REVEAL ===
(function () {
  if (!window.IntersectionObserver) return;

  const style = document.createElement('style');
  style.textContent = `
    .reveal { opacity: 0; transform: translateY(16px); transition: opacity 0.5s ease, transform 0.5s ease; }
    .reveal.visible { opacity: 1; transform: translateY(0); }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    @media (prefers-reduced-motion: reduce) {
      .reveal { opacity: 1; transform: none; transition: none; }
    }
  `;
  document.head.appendChild(style);

  const elements = document.querySelectorAll('.project-card, .writing-card, .domain-card, .section-header');
  elements.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i % 6) * 40 + 'ms';
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
})();

// === SMOOTH ANCHOR LINKS ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
