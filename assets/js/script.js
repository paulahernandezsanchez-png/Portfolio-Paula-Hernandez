// ===========================================================
// Paula Hernández — Portfolio con estética de app de viajes
// ===========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Iconos Lucide ---------- */
  if (window.lucide) lucide.createIcons();

  /* ---------- Splash / loader ---------- */
  const splash = document.getElementById('splash');
  const hideSplash = () => splash && splash.classList.add('hidden');
  // Mínimo de tiempo visible para que se note el efecto "app abriendo"
  const splashTimer = setTimeout(hideSplash, 1400);
  window.addEventListener('load', () => {
    // Si la carga tarda más que el timer, igualmente lo ocultamos al terminar
    clearTimeout(splashTimer);
    setTimeout(hideSplash, 500);
  });

  /* ---------- Reloj falso en la status bar ---------- */
  const statusTime = document.getElementById('statusTime');
  const updateClock = () => {
    if (!statusTime) return;
    const now = new Date();
    let h = now.getHours();
    const m = now.getMinutes().toString().padStart(2, '0');
    statusTime.textContent = `${h.toString().padStart(2, '0')}:${m}`;
  };
  updateClock();
  setInterval(updateClock, 30000);

  /* ---------- Navbar: sombra al hacer scroll ---------- */
  const navbar = document.getElementById('navbar');
  const onScrollNav = () => {
    if (window.scrollY > 12) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };
  onScrollNav();
  window.addEventListener('scroll', onScrollNav, { passive: true });

  /* ---------- Scroll spy: resalta el enlace activo ---------- */
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const sections = navLinks
    .map(link => document.getElementById(link.dataset.target))
    .filter(Boolean);

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.target === id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

  sections.forEach(section => spyObserver.observe(section));

  /* ---------- Fade-in al hacer scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 6, 5) * 60}ms`;
    revealObserver.observe(el);
  });

  /* ---------- Toast helper ---------- */
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toastText');
  let toastTimer;
  const showToast = (message) => {
    if (!toast) return;
    toastText.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
  };

  /* ---------- Buscador falso del hero ---------- */
  const fakeSearch = document.getElementById('fakeSearch');
  if (fakeSearch) {
    fakeSearch.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('✈ Explorando destinos… (demo, sin backend real)');
      document.getElementById('destinos')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ---------- Formulario de contacto (demo) ---------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('✔ Mensaje "enviado" — formulario de demostración');
      contactForm.reset();
    });
  }

});
