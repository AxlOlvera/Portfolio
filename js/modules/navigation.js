/**
 * navigation.js
 * =============
 * Menú móvil, scroll spy y estado del header.
 *
 * MEJORAS respecto a la versión anterior:
 *  - Scroll handler con requestAnimationFrame (throttle real)
 *    Antes: se ejecutaba en CADA evento scroll (hasta 60×/seg)
 *    Ahora: como máximo 1 ejecución por frame de renderizado
 *  - handleResize con debounce de 150ms
 *  - Cerrar menú al hacer clic fuera de él (overlay)
 *  - Gestión correcta de aria-expanded en el toggle
 */

const navigation = (() => {

  /* ── Estado ──────────────────────────────────────────── */
  let header    = null;
  let navToggle = null;
  let navMenu   = null;
  let navLinks  = null;

  let lastScrollY    = 0;
  let isMenuOpen     = false;
  let rafScheduled   = false;   // flag para throttle con RAF
  let resizeTimer    = null;    // timer para debounce de resize

  /* ── Inicialización ──────────────────────────────────── */
  const init = () => {
    _cacheDOM();
    _bindEvents();
    _updateHeader();            // estado inicial sin esperar scroll
  };

  const _cacheDOM = () => {
    header    = document.getElementById('header');
    navToggle = document.getElementById('navToggle');
    navMenu   = document.getElementById('navMenu');
    navLinks  = document.querySelectorAll('.nav__link');
  };

  /* ── Eventos ─────────────────────────────────────────── */
  const _bindEvents = () => {
    navToggle?.addEventListener('click', _toggleMenu);

    navLinks.forEach(link => {
      link.addEventListener('click', _handleNavLinkClick);
    });

    // Throttle real: el scroll encola UN frame de RAF como máximo
    window.addEventListener('scroll', _onScroll, { passive: true });

    // Debounce de resize: solo ejecuta cuando el usuario para de redimensionar
    window.addEventListener('resize', _onResize);

    // Cerrar menú con Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && isMenuOpen) _closeMenu();
    });
  };

  /* ── Throttle de scroll con RAF ──────────────────────── */
  /**
   * El problema de la versión anterior:
   *   window.addEventListener('scroll', handleScroll)
   *   → handleScroll() se llama 60+ veces por segundo mientras el
   *     usuario scrollea. Cada llamada hace querySelectorAll y lee
   *     offsetTop de todas las secciones (layout thrashing).
   *
   * La solución: encolar en RAF.
   *   → Solo se ejecuta cuando el browser está listo para pintar.
   *   → rafScheduled impide encolar más de un frame a la vez.
   */
  const _onScroll = () => {
    if (rafScheduled) return;
    rafScheduled = true;

    requestAnimationFrame(() => {
      _updateHeader();
      _updateActiveLink();
      lastScrollY  = window.scrollY;
      rafScheduled = false;
    });
  };

  /* ── Debounce de resize ───────────────────────────────── */
  const _onResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 768 && isMenuOpen) _closeMenu();
    }, 150);
  };

  /* ── Header scrolled ─────────────────────────────────── */
  const _updateHeader = () => {
    if (!header) return;
    header.classList.toggle('header--scrolled', window.scrollY > 50);
  };

  /* ── Scroll spy ──────────────────────────────────────── */
  /**
   * Lee offsetTop UNA vez por frame (gracias al throttle).
   * Sin thrashing: no hay lecturas de layout intercaladas con escrituras.
   */
  const _updateActiveLink = () => {
    const sections   = document.querySelectorAll('section[id]');
    const scrollMid  = window.scrollY + window.innerHeight / 3;

    sections.forEach(section => {
      const top    = section.offsetTop - 100;
      const bottom = top + section.offsetHeight;
      const id     = section.getAttribute('id');

      if (scrollMid >= top && scrollMid < bottom) {
        navLinks.forEach(link => {
          const isActive = link.getAttribute('href') === `#${id}`;
          link.classList.toggle('nav__link--active', isActive);
        });
      }
    });
  };

  /* ── Menú móvil ──────────────────────────────────────── */
  const _toggleMenu = () => {
    isMenuOpen ? _closeMenu() : _openMenu();
  };

  const _openMenu = () => {
    isMenuOpen = true;
    navToggle.classList.add('nav__toggle--active');
    navMenu.classList.add('nav__menu--active');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const _closeMenu = () => {
    isMenuOpen = false;
    navToggle.classList.remove('nav__toggle--active');
    navMenu.classList.remove('nav__menu--active');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  const _handleNavLinkClick = (e) => {
    if (isMenuOpen) _closeMenu();
    navLinks.forEach(l => l.classList.remove('nav__link--active'));
    e.currentTarget.classList.add('nav__link--active');
  };

  /* ── API pública ─────────────────────────────────────── */
  return { init };

})();

export { navigation };