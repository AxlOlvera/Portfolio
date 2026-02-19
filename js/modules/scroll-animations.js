/**
 * scroll-animations.js
 * ====================
 * Animaciones disparadas por scroll via Intersection Observer.
 * Sin cambios estructurales respecto a la versión original —
 * ya usaba el patrón correcto (observe → unobserve tras trigger).
 *
 * MEJORA MENOR: rootMargin ajustado a '-40px 0px' para que las
 * animaciones disparen un poco antes en viewports pequeños.
 */

const scrollAnimations = (() => {

  let observer = null;

  const observerOptions = {
    threshold:  0.1,
    rootMargin: '0px 0px -40px 0px',
  };

  /* ── Inicialización ──────────────────────────────────── */
  const init = (threshold = 0.1) => {
    observerOptions.threshold = threshold;
    observer = new IntersectionObserver(_handleIntersection, observerOptions);
    _observeElements();
  };

  /* ── Elementos a observar ────────────────────────────── */
  const _observeElements = () => {

    // Títulos de sección
    document.querySelectorAll('.section-title').forEach(el => {
      el.classList.add('fade-in-on-scroll');
      observer.observe(el);
    });

    // Cards de proyectos — con delay escalonado
    document.querySelectorAll('.project-card').forEach((card, i) => {
      card.classList.add('scale-in-on-scroll', `delay-${Math.min(i + 1, 5)}`);
      observer.observe(card);
    });

    // Stat cards
    document.querySelectorAll('.stat-card').forEach((card, i) => {
      card.classList.add('fade-in-on-scroll', `delay-${Math.min(i + 1, 5)}`);
      observer.observe(card);
    });

    // Categorías de habilidades
    document.querySelectorAll('.skill-category').forEach((cat, i) => {
      cat.classList.add('slide-in-left-on-scroll', `delay-${Math.min(i + 1, 5)}`);
      observer.observe(cat);
    });

    // Barras de progreso (si existen)
    document.querySelectorAll('.skill-item').forEach(item => {
      observer.observe(item);
    });

    // Párrafos del about
    document.querySelectorAll('.about__paragraph').forEach((p, i) => {
      p.classList.add('fade-in-on-scroll', `delay-${Math.min(i + 1, 5)}`);
      observer.observe(p);
    });

    // Sección contacto: info y formulario desde lados opuestos
    const contactInfo = document.querySelector('.contact__info');
    const contactForm = document.querySelector('.contact__form');

    if (contactInfo) {
      contactInfo.classList.add('slide-in-left-on-scroll');
      observer.observe(contactInfo);
    }
    if (contactForm) {
      contactForm.classList.add('slide-in-right-on-scroll');
      observer.observe(contactForm);
    }
  };

  /* ── Callback del observer ───────────────────────────── */
  const _handleIntersection = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Desconectar tras la primera animación — no vuelve a disparar
        observer.unobserve(entry.target);
      }
    });
  };

  /* ── Utilidades públicas ─────────────────────────────── */
  const animateElement = (element) => element?.classList.add('is-visible');
  const resetElement   = (element) => element?.classList.remove('is-visible');
  const destroy        = () => { observer?.disconnect(); observer = null; };

  /* ── API pública ─────────────────────────────────────── */
  return { init, animateElement, resetElement, destroy };

})();

export { scrollAnimations };