(function () {
  'use strict';

  /* ---------- Icons ---------- */
  if (window.lucide) {
    lucide.createIcons();
  }

  /* ---------- Splash loader ---------- */
  var splash = document.getElementById('splash');
  var MIN_SPLASH_MS = 900;
  var start = Date.now();

  function hideSplash() {
    var elapsed = Date.now() - start;
    var wait = Math.max(MIN_SPLASH_MS - elapsed, 0);
    setTimeout(function () {
      if (splash) {
        splash.classList.add('hide');
        setTimeout(function () { splash.remove(); }, 600);
      }
    }, wait);
  }

  if (document.readyState === 'complete') {
    hideSplash();
  } else {
    window.addEventListener('load', hideSplash);
    setTimeout(hideSplash, 2500); // fallback de seguridad
  }

  /* ---------- Toast ---------- */
  var toastEl = document.getElementById('toast');
  var toastTimer = null;

  function showToast(message, icon) {
    if (!toastEl) return;
    toastEl.innerHTML = (icon ? '<i data-lucide="' + icon + '"></i>' : '') + '<span>' + message + '</span>';
    if (window.lucide) lucide.createIcons();
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove('show');
    }, 3200);
  }

  /* ---------- Navbar scroll state ---------- */
  var navbar = document.getElementById('navbar');
  function onScrollNavbar() {
    if (!navbar) return;
    if (window.scrollY > 24) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  onScrollNavbar();
  window.addEventListener('scroll', onScrollNavbar, { passive: true });

  /* ---------- Active nav link (top + bottom) sync via scroll spy ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('[data-nav]'));

  function setActiveNav(id) {
    navLinks.forEach(function (link) {
      var match = link.getAttribute('href') === '#' + id;
      link.classList.toggle('active', match);
    });
  }

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setActiveNav(entry.target.id);
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

    sections.forEach(function (section) { spy.observe(section); });
  }

  /* ---------- Fade-in on scroll ---------- */
  var fadeEls = Array.prototype.slice.call(document.querySelectorAll('.fade-in'));
  if ('IntersectionObserver' in window && fadeEls.length) {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    fadeEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    fadeEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---------- Fake search form (hero) ---------- */
  var searchForm = document.getElementById('searchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      showToast('Esto es una búsqueda de ejemplo — funcionalidad real próximamente ✈️', 'search');
    });
  }

  /* ---------- Fake contact form ---------- */
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }
      showToast('¡Mensaje enviado! (demo) Gracias por escribir 🧳', 'check-circle-2');
      contactForm.reset();
    });
  }

  /* ---------- Smooth scroll offset handled by CSS scroll-padding-top ---------- */

})();
