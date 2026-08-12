// ============================================================
// Paula Hernández — Portfolio (estilo app de viajes)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- Lucide icons ---------------- */
  if (window.lucide) lucide.createIcons();

  /* ---------------- Splash screen ---------------- */
  const splash = document.getElementById('splash');
  if (splash) {
    const hideSplash = () => {
      splash.classList.add('hidden');
      setTimeout(() => splash.remove(), 700);
    };
    window.setTimeout(hideSplash, 1100);
  }

  /* ---------------- Navbar scroll shadow ---------------- */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------------- Reveal on scroll ---------------- */
  const revealEls = document.querySelectorAll('.fade-in');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------------- Scroll-spy (navbar + bottom nav) ---------------- */
  const sectionIds = ['inicio', 'destinos', 'itinerario', 'equipaje', 'contacto'];
  const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
  const navEls = document.querySelectorAll('[data-nav]');

  if (sections.length) {
    const setActive = (id) => {
      navEls.forEach((link) => {
        const isMatch = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('active', isMatch);
      });
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { threshold: 0.4, rootMargin: '-80px 0px -40% 0px' });

    sections.forEach((section) => sectionObserver.observe(section));
  }

  /* ---------------- Toast helper ---------------- */
  const toast = document.getElementById('toast');
  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove('show'), 2800);
  };

  /* ---------------- Fake search form (hero) ---------------- */
  const searchForm = document.getElementById('searchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('✈️ Esto es una demo — ¡el destino real está en la sección de proyectos!');
    });
  }

  /* ---------------- Booking / contact form ---------------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Mensaje enviado (simulado) — ¡gracias por escribir!');
      contactForm.reset();
    });
  }

});
