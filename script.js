document.addEventListener('DOMContentLoaded', function () {
  // Set current year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  navToggle && navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  // Theme toggle with localStorage
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  if (saved) document.body.setAttribute('data-theme', saved);
  function updateThemeIcon() {
    themeToggle.textContent = document.body.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';
  }
  updateThemeIcon();
  themeToggle && themeToggle.addEventListener('click', () => {
    const current = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', current);
    localStorage.setItem('theme', current);
    updateThemeIcon();
  });

  // Project filtering
  const filters = Array.from(document.querySelectorAll('.filter'));
  const cards = Array.from(document.querySelectorAll('.project-card'));
  filters.forEach(btn => btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    cards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }));

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // close mobile nav
          nav && nav.classList.remove('open');
        }
      }
    });
  });

  // Contact form: open mail client (simple) — replace with backend for production
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const form = new FormData(contactForm);
      const name = form.get('name') || '';
      const email = form.get('email') || '';
      const message = form.get('message') || '';
      const subject = encodeURIComponent('Portfolio inquiry from ' + name);
      const body = encodeURIComponent(`Name: ${name}%0AEmail: ${email}%0A%0A${message}`);
      window.location.href = `mailto:you@example.com?subject=${subject}&body=${body}`;
    });
  }

});
