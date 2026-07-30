// ============================================================
// Paula Hernández — Portfolio (estilo app de viajes)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- Splash screen ---------------- */
  const splash = document.getElementById('splash');
  const hideSplash = () => {
    if (!splash) return;
    splash.classList.add('hidden');
    setTimeout(() => splash.remove(), 700);
  };
  // Da tiempo a que se vea la animación, incluso si la carga es instantánea
  window.setTimeout(hideSplash, 1100);

  /* ---------------- Navbar scroll shadow ---------------- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 12) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------- Reveal on scroll ---------------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------------- Scroll-spy (navbar + tab bar) ---------------- */
  const sections = ['hero', 'destinos', 'itinerario', 'contacto']
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const navLinks = document.querySelectorAll('.nav-link');
  const tabLinks = document.querySelectorAll('.tab-link');

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.dataset.nav === id);
    });
    tabLinks.forEach((link) => {
      link.classList.toggle('active', link.dataset.nav === id);
    });
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  }, { threshold: 0.4, rootMargin: '-80px 0px -40% 0px' });

  sections.forEach((section) => sectionObserver.observe(section));

  /* ---------------- Fake search form (hero) ---------------- */
  const searchForm = document.getElementById('searchForm');
  const toast = document.getElementById('toast');

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove('show'), 2600);
  };

  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('✈️ Esto es una demo — ¡pero el destino real está en la sección de proyectos!');
    });
  }

  /* ---------------- Booking / contact form ---------------- */
  const contactForm = document.getElementById('contactForm');
  const formConfirm = document.getElementById('formConfirm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      formConfirm.classList.add('show');
      showToast('Mensaje enviado (simulado) — ¡gracias por escribir!');
      contactForm.reset();
      setTimeout(() => formConfirm.classList.remove('show'), 4000);
    });
  }

});
