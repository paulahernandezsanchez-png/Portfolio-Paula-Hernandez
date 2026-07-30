document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Iconos Lucide ---------- */
  if (window.lucide) {
    lucide.createIcons();
  } else {
    window.addEventListener('load', () => window.lucide && lucide.createIcons());
  }

  /* ---------- Splash screen ---------- */
  const splash = document.getElementById('splash');
  const hideSplash = () => {
    document.body.style.overflow = '';
    splash.classList.add('hidden');
  };

  document.body.style.overflow = 'hidden';
  window.setTimeout(hideSplash, 1400);
  window.addEventListener('load', () => window.setTimeout(hideSplash, 300));

  /* ---------- Navbar: sombra al hacer scroll ---------- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 12);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Scroll reveal (fade-in) ---------- */
  const revealEls = document.querySelectorAll('.fade-in');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------- Navegación activa (nav superior + tabbar) ---------- */
  const sections = ['inicio', 'destinos', 'itinerario', 'contacto']
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const navLinks = document.querySelectorAll('[data-nav]');

  const setActiveNav = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.dataset.nav === id);
    });
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveNav(entry.target.id);
      }
    });
  }, { threshold: 0.4, rootMargin: '-20% 0px -40% 0px' });

  sections.forEach((section) => navObserver.observe(section));

  /* ---------- Toast helper ---------- */
  const toast = document.getElementById('toast');
  let toastTimer;

  function showToast(message, icon = 'sparkles') {
    toast.innerHTML = `<i data-lucide="${icon}"></i> ${message}`;
    if (window.lucide) lucide.createIcons();
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
  }

  /* ---------- Buscador falso (hero) ---------- */
  const fakeSearch = document.getElementById('fake-search');
  fakeSearch.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Esto es solo una demo — ¡pero mis proyectos son reales! Baja para verlos.', 'plane');
    document.getElementById('destinos').scrollIntoView({ behavior: 'smooth' });
  });

  /* ---------- Botón "bajar" del hero ---------- */
  const scrollHint = document.getElementById('scroll-hint');
  scrollHint.addEventListener('click', () => {
    document.getElementById('destinos').scrollIntoView({ behavior: 'smooth' });
  });

  /* ---------- Formulario de contacto (demo) ---------- */
  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('¡Mensaje "enviado"! Esto es una demo visual.', 'send');
    contactForm.reset();
  });

});
