/**
 * portfolio.js
 * ============
 * Script regular (sin type="module") — necesario para acceder
 * a las globales de CDN: emailjs, turnstile.
 *
 * CONTENIDO:
 *  1. Configuración centralizada
 *  2. Sistema de traducción ES / EN
 *  3. Ofuscación de email (anti-scraping)
 *  4. Anti-spam: Honeypot + Turnstile + Rate Limiting
 *  5. Submit handler único del formulario (con EmailJS)
 *
 * IMPORTANTE — ÚNICO SUBMIT HANDLER:
 *  form-handler.js (módulo ES6) ahora SOLO registra validación
 *  en blur/input. Este archivo registra el submit. De esta forma
 *  no hay double binding ni race conditions entre módulos.
 *
 * ───────────────────────────────────────────────────────────── *
 */

/* ============================================================
   1. CONFIGURACIÓN CENTRALIZADA
   ============================================================ */
const CONFIG = {

  emailjs: {
    publicKey:  'J6SHj0NkxslunIEDz',   
    serviceId:  'service_nnrx67n',      
    templateId: 'template_wlo5qsr',      
  },

  // Email dividido para dificultar scraping.
  // El DOM nunca contiene el email completo en texto plano.
  email: {
    user:   'Axl.sanchezolvera',
    domain: 'gmail.com',
  },

  turnstile: {
    sitekey: '0x4AAAAAACfsmM879eUbhavu',
  },

  rateLimit: {
    maxAttempts: 3,       // intentos antes de bloquear
    windowMs:    60_000,  // ventana: 60 segundos
    cooldownMs:  300_000, // bloqueo tras exceder: 5 minutos
  },
};


/* ============================================================
   2. SISTEMA DE TRADUCCIÓN ES / EN
   ============================================================ */

const translations = {
  es: {
    // Navbar
    'nav.inicio':      'Inicio',
    'nav.sobre':       'Sobre mí',
    'nav.proyectos':   'Proyectos',
    'nav.habilidades': 'Habilidades',
    'nav.contacto':    'Contacto',

    // Hero
    'hero.greeting':     'Hola, soy',
    'hero.role':         'Full Stack Developer · Tech Lead & Gestión de Proyectos',
    'hero.description':  'Especializado en Java, Spring Boot, JavaScript y React, con experiencia en liderazgo operativo para construir soluciones escalables y centradas en el usuario.',
    'hero.cta.projects': 'Ver proyectos',
    'hero.cta.contact':  'Contactar',

    // About
    'about.title':      'Sobre mí',
    'about.paragraph':  'Con más de 6 años de experiencia en entornos bilingües de alto volumen (inglés C1), transicioné de supervisar equipos de 25 personas y gestionar KPIs al desarrollo de aplicaciones web full stack. Aplico una mentalidad de gestión de proyectos —enfocada en metodologías Scrum, documentación clara, resolución estructurada de problemas y colaboración eficiente en equipo— en cada proyecto al que contribuyo.',
    'about.card1.title': 'KPI >95% conversión',
    'about.card1.desc':  'Mantuve métricas de alto rendimiento gestionando equipos de hasta 25 personas, con análisis de datos en tiempo real via Excel.',
    'about.card2.title': 'Tech Lead & PM',
    'about.card2.desc':  'Coordiné equipos de desarrollo bajo Scrum: organización de tareas, gestión de repositorios Git y entrega de producto real a cliente.',
    'about.card3.title': 'Proyectos en producción',
    'about.card3.desc':  '3 proyectos desplegados en Vercel y AWS. Stack completo: Java · Spring Boot · React · MySQL · Firebase · MariaDB.',

    // Projects
    'projects.title':         'Proyectos destacados',
    'projects.featured':      'Destacado',
    'projects.scrum.label':   'Gestión de proyecto:',
    'projects.ixel.desc':     'Producto e-commerce full stack entregado a cliente real (tienda artesanal). Actué como Tech Lead y PM del equipo: organicé tareas, gestioné ramas y conflictos en Git/GitHub, y mantuve al equipo trabajando en tiempo y forma bajo metodología Scrum.',
    'projects.ixel.tech':     'Contribuí en todas las capas del producto: modelado de base de datos y queries SQL, lógica de negocio en Java, APIs REST, frontend con React y Bootstrap (accesibilidad, SEO, responsivo). Despliegue en AWS EC2 + MariaDB en servidor con Linux.',
    'projects.nasa.desc':     'Dashboard interactivo que consume la API de la NASA (NeoWs) para visualizar asteroides detectados: peligrosidad, diámetro, velocidad y distancia mínima de impacto. Gráficas dinámicas, UI responsiva. En producción vía Vercel.',
    'projects.roadmap.desc':   'Plataforma modular tipo Scrum con tablero de progreso, asignación de tareas, filtros y métricas de avance. Firebase Auth + Firestore, Cloudflare Turnstile en formulario. En producción vía Vercel.',
    'projects.hackaton.desc':  'Dos hackatones de desarrollo acelerado. Frontend: e-commerce con carrito funcional, flujo completo de usuario invitado, SEO y control de versiones Git/GitHub. Backend: agenda de contactos en Java aplicando POO — encapsulamiento, herencia, polimorfismo y manejo de excepciones.',

    // Skills
    'skills.title':    'Habilidades técnicas',
    'skills.frontend': 'Frontend',
    'skills.backend':  'Backend',
    'skills.devops':   'DevOps & Cloud',
    'skills.tools':    'Herramientas',

    // Contact
    'contact.title':       'Contacto',
    'contact.subtitle':    '¿Trabajamos juntos?',
    'contact.text':        'Estoy disponible para nuevos proyectos y colaboraciones. Si tienes una idea en mente o simplemente quieres saludar, no dudes en contactarme.',
    'contact.form.name':   'Nombre',
    'contact.form.email':  'Email',
    'contact.form.message':'Mensaje',
    'contact.form.send':   'Enviar mensaje',
    'contact.form.success':'¡Mensaje enviado! Te responderé pronto.',
    'contact.form.error':  'Error al enviar. Por favor intenta de nuevo.',
    'contact.form.sending':'Enviando…',

    // Footer
    'footer.designed': 'Diseñado y desarrollado por',
    'footer.rights':   'Todos los derechos reservados',
  },

  en: {
    // Navbar
    'nav.inicio':      'Home',
    'nav.sobre':       'About',
    'nav.proyectos':   'Projects',
    'nav.habilidades': 'Skills',
    'nav.contacto':    'Contact',

    // Hero
    'hero.greeting':     "Hi, I'm",
    'hero.role':         'Full Stack Developer · Tech Lead & Project Management',
    'hero.description':  'Specialized in Java, Spring Boot, JavaScript and React, with operational leadership experience building scalable, user-centered solutions.',
    'hero.cta.projects': 'View projects',
    'hero.cta.contact':  'Contact me',

    // About
    'about.title':      'About me',
    'about.paragraph':  'With 6+ years of experience in high-volume bilingual environments (English C1), I transitioned from supervising teams of 25 and managing KPIs to full stack web development. I apply a project management mindset—focused on Scrum methodologies, clear documentation, structured problem-solving, and efficient team collaboration—to every project I contribute to.',
    'about.card1.title': 'KPI >95% Conversion',
    'about.card1.desc':  'Maintained high-performance KPIs managing teams of up to 25 people, with real-time data analysis via Excel.',
    'about.card2.title': 'Tech Lead & PM',
    'about.card2.desc':  'Led development teams under Scrum: task organization, Git repository management and delivery of a real product to a client.',
    'about.card3.title': 'Projects in Production',
    'about.card3.desc':  '3 projects deployed on Vercel and AWS. Full stack: Java · Spring Boot · React · MySQL · Firebase · MariaDB.',

    // Projects
    'projects.title':         'Featured Projects',
    'projects.featured':      'Featured',
    'projects.scrum.label':   'Project management:',
    'projects.ixel.desc':     'Full stack e-commerce product delivered to a real client (artisan shop). Acted as Tech Lead and PM: organized tasks, managed Git branches and conflicts, and kept the team on track under Scrum.',
    'projects.ixel.tech':     'Contributed across all layers: database modeling and SQL queries, Java business logic, REST APIs, frontend with React and Bootstrap (accessibility, SEO, responsive). Deployed on AWS EC2 + MariaDB on Linux server.',
    'projects.nasa.desc':     'Interactive dashboard consuming NASA NeoWs API to visualize detected asteroids: hazard level, diameter, velocity, and minimum impact distance. Dynamic charts, responsive UI. Live on Vercel.',
    'projects.roadmap.desc':   'Scrum-style modular platform with progress board, task assignment, filters, and metrics. Firebase Auth + Firestore, Cloudflare Turnstile on contact form. Live on Vercel.',
    'projects.hackaton.desc':  'Two accelerated development hackathons. Frontend: e-commerce with functional cart, full guest checkout flow, SEO and Git/GitHub version control. Backend: Java contact manager applying OOP — encapsulation, inheritance, polymorphism and exception handling.',

    // Skills
    'skills.title':    'Technical Skills',
    'skills.frontend': 'Frontend',
    'skills.backend':  'Backend',
    'skills.devops':   'DevOps & Cloud',
    'skills.tools':    'Tools',

    // Contact
    'contact.title':       'Contact',
    'contact.subtitle':    "Let's work together?",
    'contact.text':        "I'm available for new projects and collaborations. If you have an idea in mind or just want to say hi, feel free to reach out.",
    'contact.form.name':   'Name',
    'contact.form.email':  'Email',
    'contact.form.message':'Message',
    'contact.form.send':   'Send message',
    'contact.form.success':'Message sent! I\'ll get back to you soon.',
    'contact.form.error':  'Error sending. Please try again.',
    'contact.form.sending':'Sending…',

    // Footer
    'footer.designed': 'Designed and developed by',
    'footer.rights':   'All rights reserved',
  },
};

let currentLang = 'es';

/**
 * Aplica las traducciones al DOM actualizando todos los
 * elementos con atributo [data-i18n].
 */
function applyTranslations(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key  = el.getAttribute('data-i18n');
    const text = translations[lang]?.[key];
    if (!text) return;
    // Only set textContent on leaf nodes (no element children).
    // Elements with child elements (e.g. <p> containing <span> + <br>)
    // must NOT be overwritten — their children each carry their own data-i18n.
    const hasElementChildren = [...el.children].length > 0;
    if (!hasElementChildren) {
      el.textContent = text;
    }
  });
  document.documentElement.lang = lang;
}

/**
 * Configura el botón de toggle ES/EN.
 */
function setupLangToggle() {
  const btn       = document.getElementById('langToggle');
  const langLabel = document.getElementById('langLabel');
  if (!btn || !langLabel) return;

  btn.addEventListener('click', () => {
    currentLang       = currentLang === 'es' ? 'en' : 'es';
    langLabel.textContent = currentLang === 'es' ? 'EN' : 'ES';
    applyTranslations(currentLang);
    _syncSubmitButton();
  });
}

/** Mantiene el texto del botón submit sincronizado con el idioma activo. */
function _syncSubmitButton() {
  const btn = document.getElementById('submitBtn');
  if (btn && !btn.disabled) {
    btn.textContent = translations[currentLang]['contact.form.send'];
  }
}


/* ============================================================
   3. OFUSCACIÓN DE EMAIL
   ============================================================
   El email se construye en JS en runtime. El HTML nunca
   contiene el email completo — los scrapers que leen el
   HTML estático o el DOM serializado no lo encuentran.
*/
function buildEmailLink() {
  const { user, domain } = CONFIG.email;
  const address = `${user}@${domain}`;

  // Link de email en la sección de métodos de contacto
  const link    = document.getElementById('emailLink');
  const display = document.getElementById('emailDisplay');

  if (link && display) {
    link.href          = `mailto:${address}`;
    display.textContent = address;
  }
}


/* ============================================================
   4. SISTEMA ANTI-SPAM
   ============================================================ */

/* ── 4a. Turnstile ────────────────────────────────────────── */
let _turnstileToken = null;
let _turnstileReady = false;

// Estas funciones deben ser globales (el widget las llama por nombre)
function onTurnstileSuccess(token) {
  _turnstileToken = token;
  _turnstileReady = true;
}

function onTurnstileError() {
  _turnstileToken = null;
  _turnstileReady = false;
  _showFeedback('error', 'Error de verificación. Por favor recarga la página.');
}

function onTurnstileExpired() {
  _turnstileToken = null;
  _turnstileReady = false;
  // Turnstile se regenera automáticamente — el usuario no hace nada
}

/* ── 4b. Rate Limiter ─────────────────────────────────────── */
/**
 * Rate limiting client-side via localStorage.
 *
 * LIMITACIÓN CONOCIDA: un atacante puede borrar localStorage.
 * Lo que esta capa SÍ hace bien:
 *   - Previene envíos accidentales múltiples
 *   - Disuade bots simples que no manipulan localStorage
 *   - Protección real complementaria a la del servicio de email
 *     (EmailJS y Formspree tienen rate limiting en servidor)
 */
const RateLimiter = (() => {
  const KEY = 'ao_contact_attempts';

  const _getState = () => {
    try {
      const raw = localStorage.getItem(KEY);
      return raw
        ? JSON.parse(raw)
        : { attempts: [], blocked: false, blockedUntil: 0 };
    } catch {
      return { attempts: [], blocked: false, blockedUntil: 0 };
    }
  };

  const _saveState = (state) => {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* sin localStorage */ }
  };

  const isBlocked = () => {
    const state = _getState();
    const now   = Date.now();

    // En periodo de cooldown activo
    if (state.blocked && now < state.blockedUntil) {
      return { blocked: true, remaining: Math.ceil((state.blockedUntil - now) / 1000) };
    }

    // Cooldown expirado — limpiar
    if (state.blocked && now >= state.blockedUntil) {
      _saveState({ attempts: [], blocked: false, blockedUntil: 0 });
      return { blocked: false };
    }

    // Filtrar intentos dentro de la ventana activa
    const windowStart    = now - CONFIG.rateLimit.windowMs;
    const recentAttempts = (state.attempts || []).filter(t => t > windowStart);

    if (recentAttempts.length >= CONFIG.rateLimit.maxAttempts) {
      _saveState({
        attempts:    recentAttempts,
        blocked:     true,
        blockedUntil: now + CONFIG.rateLimit.cooldownMs,
      });
      return {
        blocked:   true,
        remaining: Math.ceil(CONFIG.rateLimit.cooldownMs / 1000),
      };
    }

    return { blocked: false };
  };

  const registerAttempt = () => {
    const state       = _getState();
    const now         = Date.now();
    const windowStart = now - CONFIG.rateLimit.windowMs;
    state.attempts    = [...(state.attempts || []).filter(t => t > windowStart), now];
    _saveState(state);
  };

  /** Muestra un countdown visible en la UI mientras dura el bloqueo. */
  const startCountdown = (seconds) => {
    const msg     = document.getElementById('rateLimitMsg');
    const counter = document.getElementById('rateLimitCountdown');
    if (!msg || !counter) return;

    let remaining = seconds;
    msg.classList.add('visible');
    counter.textContent = remaining;

    const interval = setInterval(() => {
      remaining--;
      counter.textContent = remaining;
      if (remaining <= 0) {
        clearInterval(interval);
        msg.classList.remove('visible');
      }
    }, 1000);
  };

  return { isBlocked, registerAttempt, startCountdown };
})();


/* ============================================================
   5. FORMULARIO DE CONTACTO — SUBMIT HANDLER ÚNICO
   ============================================================
   Este es el único listener de 'submit' en #contactForm.
   form-handler.js solo registra blur/input (validación visual).
   Tener dos listeners de submit causaba doble envío y bugs.
*/

function setupContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  // Inicializar EmailJS UNA SOLA VEZ al cargar la página
  if (typeof emailjs !== 'undefined') {
    emailjs.init(CONFIG.emailjs.publicKey);
  } else {
    console.warn('[portfolio.js] EmailJS CDN no encontrado. Verifica el orden de scripts en index.html.');
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const honeypot   = form.querySelector('#hp_website');
    const nameInput  = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const msgInput   = document.getElementById('message');

    /* ── Capa 1: Honeypot ───────────────────────────────── */
    // Si tiene valor, es un bot. Simular éxito sin enviar.
    if (honeypot?.value) {
      console.warn('[Security] Honeypot activado');
      _setSubmitLoading(true);
      await new Promise(r => setTimeout(r, 1500));
      _showFeedback('success', translations[currentLang]['contact.form.success']);
      form.reset();
      _setSubmitLoading(false);
      return;
    }

    /* ── Capa 2: Rate Limit ─────────────────────────────── */
    const limitStatus = RateLimiter.isBlocked();
    if (limitStatus.blocked) {
      RateLimiter.startCountdown(limitStatus.remaining);
      return;
    }

    /* ── Capa 3: Validación de campos ───────────────────── */
    // Llamamos a formHandler.validateAll() del módulo ES6.
    // Si formHandler no está disponible (race condition de carga),
    // hacemos validación básica de respaldo.
    let fieldsValid = false;

    if (window._formHandlerValidateAll) {
      // Bridge: main.js expone formHandler.validateAll como global
      fieldsValid = window._formHandlerValidateAll();
    } else {
      // Fallback: validación básica
      const name    = nameInput?.value.trim();
      const email   = emailInput?.value.trim();
      const message = msgInput?.value.trim();
      fieldsValid   = !!(name && email && message && message.length >= 10);
      if (!fieldsValid) {
        _showFeedback('error', 'Por favor completa todos los campos correctamente.');
        return;
      }
    }

    if (!fieldsValid) {
      form.querySelector('.field--invalid')?.focus();
      return;
    }

    /* ── Capa 4: Turnstile ──────────────────────────────── */
    if (!_turnstileReady || !_turnstileToken) {
      _showFeedback('error',
        currentLang === 'es'
          ? 'Por favor completa la verificación de seguridad.'
          : 'Please complete the security verification.'
      );
      return;
    }

    /* ── Envío ──────────────────────────────────────────── */
    _setSubmitLoading(true);
    RateLimiter.registerAttempt();

    const templateParams = {
      name:    nameInput.value.trim(),
      email:   emailInput.value.trim(),
      message: msgInput.value.trim(),
    };

    try {
      if (typeof emailjs !== 'undefined') {
        await emailjs.send(
          CONFIG.emailjs.serviceId,
          CONFIG.emailjs.templateId,
          templateParams
        );
      } else {
        // Modo desarrollo sin CDN
        console.log('[Dev] Envío simulado:', templateParams);
        await new Promise(r => setTimeout(r, 1000));
      }

      _showFeedback('success', translations[currentLang]['contact.form.success']);
      form.reset();

      // Actualizar contador de chars tras reset
      const counter = document.getElementById('charCounter');
      if (counter) counter.textContent = '0 / 2000';

      // Resetear Turnstile para el siguiente envío
      if (typeof turnstile !== 'undefined') turnstile.reset();
      _turnstileToken = null;
      _turnstileReady = false;

    } catch (err) {
      console.error('[portfolio.js] EmailJS error:', err);
      _showFeedback('error', translations[currentLang]['contact.form.error']);
    } finally {
      _setSubmitLoading(false);
    }
  });
}


/* ── Helpers de UI ───────────────────────────────────────── */

function _setSubmitLoading(loading) {
  const btn = document.getElementById('submitBtn');
  if (!btn) return;
  btn.disabled    = loading;
  btn.textContent = loading
    ? translations[currentLang]['contact.form.sending']
    : translations[currentLang]['contact.form.send'];
}

function _showFeedback(type, message) {
  const successEl = document.getElementById('formSuccess');
  const errorEl   = document.getElementById('formError');

  [successEl, errorEl].forEach(el => {
    if (el) { el.textContent = ''; el.classList.remove('visible'); }
  });

  const target = type === 'success' ? successEl : errorEl;
  if (!target) return;

  target.textContent = message;
  target.classList.add('visible');

  clearTimeout(target._hideTimeout);
  target._hideTimeout = setTimeout(() => {
    target.classList.remove('visible');
  }, 7000);
}


/* ============================================================
   INICIALIZACIÓN
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  applyTranslations(currentLang);  // Estado inicial en español
  setupLangToggle();
  buildEmailLink();
  setupContactForm();
});