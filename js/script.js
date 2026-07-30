document.addEventListener('DOMContentLoaded', () => {

  /* ---------- ICONS ---------- */
  if (window.lucide) {
    lucide.createIcons();
  } else {
    window.addEventListener('load', () => window.lucide && lucide.createIcons());
  }

  /* ---------- SPLASH SCREEN ---------- */
  const splash = document.getElementById('splash');
  const hideSplash = () => {
    splash.classList.add('hidden');
    document.body.style.overflow = '';
  };
  document.body.style.overflow = 'hidden';
  window.addEventListener('load', () => {
    setTimeout(hideSplash, 1100);
  });
  // Fallback in case 'load' fires late or assets are slow
  setTimeout(hideSplash, 3000);

  /* ---------- FOOTER YEAR ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- NAVBAR SCROLL STATE ---------- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- FADE-IN ON SCROLL ---------- */
  const fadeEls = document.querySelectorAll('.fade-in');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  fadeEls.forEach((el) => fadeObserver.observe(el));

  /* ---------- ACTIVE SECTION TRACKING (nav + bottom nav) ---------- */
  const sections = ['hero', 'destinos', 'itinerario', 'contacto']
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const navLinks = document.querySelectorAll('.nav-link');
  const bottomLinks = document.querySelectorAll('.bottom-nav-link');

  const setActive = (id) => {
    navLinks.forEach((l) => l.classList.toggle('active', l.dataset.section === id));
    bottomLinks.forEach((l) => l.classList.toggle('active', l.dataset.section === id));
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  }, { threshold: 0.4, rootMargin: '-80px 0px -40% 0px' });

  sections.forEach((sec) => sectionObserver.observe(sec));

  /* ---------- CTA NAV BUTTON SCROLLS TO CONTACT ---------- */
  const ctaBtn = document.getElementById('cta-nav-btn');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
      document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ---------- FAKE SEARCH BUTTON MICRO-INTERACTION ---------- */
  const searchBtn = document.querySelector('.search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      document.getElementById('destinos')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ---------- CARD FAVORITE TOGGLE ---------- */
  document.querySelectorAll('.card-fav').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      btn.classList.toggle('active');
      const icon = btn.querySelector('i');
      if (icon) {
        icon.style.fill = btn.classList.contains('active') ? '#FF7A59' : 'none';
        icon.style.color = btn.classList.contains('active') ? '#FF7A59' : '';
      }
    });
  });

  /* ---------- FAKE BOOKING FORM SUBMIT ---------- */
  const form = document.getElementById('booking-form');
  const formNote = document.getElementById('form-note');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.book-btn span');
      if (btn) btn.textContent = '¡Mensaje enviado!';
      if (formNote) {
        formNote.innerHTML = '<i data-lucide="check-circle"></i> Demo: en la versión final este formulario enviará tu mensaje de verdad.';
        if (window.lucide) lucide.createIcons();
      }
      setTimeout(() => {
        if (btn) btn.textContent = 'Enviar mensaje';
      }, 2500);
    });
  }
});
