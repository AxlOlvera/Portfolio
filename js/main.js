/**
 * main.js
 * =======
 * Entry point del portafolio. Coordina los módulos ES6.
 *
 * ARQUITECTURA DE DOS CAPAS (importante entender):
 * ─────────────────────────────────────────────────
 * Este archivo (type="module") coordina los módulos que pueden
 * usar import/export: navigation, scroll, smooth scroll y
 * form-handler (validación visual solamente).
 *
 * portfolio.js (script regular, sin type="module") maneja:
 *  - Traducciones ES/EN
 *  - EmailJS (necesita la global `emailjs` del CDN)
 *  - Todo el sistema anti-spam (honeypot, Turnstile, rate limit)
 *  - El submit handler real del formulario
 *
 * Por qué esta separación:
 *   Los ES6 modules tienen su propio scope — no pueden acceder
 *   a variables globales de CDNs como `emailjs` o `turnstile`
 *   sin importarlos explícitamente (lo cual no es posible para
 *   scripts CDN sin wrapper). portfolio.js se carga como script
 *   regular y SÍ tiene acceso a esas globales.
 *
 * CAMBIOS vs versión anterior:
 *  - Eliminado: visibilitychange con console.log (ruido en producción)
 *  - Eliminado: console.log de inicialización (ruido en producción)
 *  - formHandler.init() ahora solo registra validación blur/input
 *    El submit real lo maneja portfolio.js (un solo listener)
 */

import { navigation }       from './modules/navigation.js';
import { scrollAnimations } from './modules/scroll-animations.js';
import { formHandler }      from './modules/form-handler.js';
import { smoothScroll }     from './modules/smooth-scroll.js';

/* ── Configuración ───────────────────────────────────────── */
const APP_CONFIG = {
  animationThreshold: 0.1,
};

/* ── Inicialización ──────────────────────────────────────── */
const initApp = () => {
  navigation.init();
  scrollAnimations.init(APP_CONFIG.animationThreshold);
  smoothScroll.init();
  formHandler.init();   // solo validación blur/input — el submit lo maneja portfolio.js
};

/* ── Arranque seguro ─────────────────────────────────────── */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  // DOM ya disponible (script cargado con defer o al final del body)
  initApp();
}

/*
  BRIDGE: Exponer formHandler.validateAll como variable global.
  ─────────────────────────────────────────────────────────────
  portfolio.js es un script regular y NO puede importar módulos ES6.
  Necesita llamar a formHandler.validateAll() para validar los campos
  antes del envío, pero no puede acceder al módulo directamente.

  Solución: main.js (que SÍ tiene acceso) expone la función en window.
  portfolio.js la usa via window._formHandlerValidateAll().

  El prefijo _ es convención para "uso interno, no API pública".
*/
window._formHandlerValidateAll = () => formHandler.validateAll();

export { APP_CONFIG };