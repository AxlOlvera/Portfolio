/**
 * portfolio.js
 * ============
 * Funcionalidades adicionales del portafolio.
 * Este archivo es independiente de main.js y sus módulos ES6,
 * se carga como <script> regular para no interferir con los imports.
 *
 * Módulos incluidos:
 *  1. Sistema de traducción ES / EN (sin recarga de página)
 *  2. Formulario de contacto integrado con EmailJS
 */

/* ============================================================
   1. SISTEMA DE TRADUCCIÓN ES / EN
   ============================================================ */

/**
 * Objeto de traducciones.
 * Cada clave coincide con el atributo [data-i18n] del HTML.
 * Para agregar textos nuevos: inclúyelos en ambos idiomas.
 */
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
    'hero.role':         'Full Stack Developer & Líder de Equipo',
    'hero.description':  'Especializado en Java, Spring Boot, JavaScript y React, con experiencia en liderazgo operativo para construir soluciones escalables y centradas en el usuario.',
    'hero.cta.projects': 'Ver proyectos',
    'hero.cta.contact':  'Contactar',

    // About
    'about.title':      'Sobre mí',
    'about.paragraph':  'Con más de 6 años de experiencia en entornos bilingües de alto volumen (inglés C1), transicioné de supervisar equipos de 25 personas y gestionar KPIs al desarrollo de aplicaciones web full stack. Aplico una mentalidad de gestión de proyectos —enfocada en metodologías Scrum, documentación clara, resolución estructurada de problemas y colaboración eficiente en equipo— en cada proyecto al que contribuyo.',
    'about.card1.title': 'Trabajo en equipo',
    'about.card1.desc':  'Experiencia liderando equipos de hasta 25 personas y colaborando bajo metodología Scrum.',
    'about.card2.title': 'Resolución de problemas',
    'about.card2.desc':  'Enfoque en análisis estructurado, documentación clara y mejora continua.',
    'about.card3.title': 'Desarrollo Full Stack',
    'about.card3.desc':  'Experiencia en desarrollo web con Java, JavaScript, MySQL y Bootstrap.',

    // Projects
    'projects.title':         'Proyectos destacados',
    'projects.featured':      'Destacado',
    'projects.scrum.label':   'Gestión de proyecto:',
    'projects.ixel.desc':     'Solución e-commerce full stack desarrollada para una tienda artesanal real. Contribuí al desarrollo frontend con JavaScript, HTML, CSS y Bootstrap, y apoyé la integración backend con Java y MySQL.',
    'projects.ixel.scrum':    'Desarrollado bajo metodología Scrum, con participación en sprint planning, organización de tareas y documentación técnica para entrega al cliente.',
    'projects.hackaton.desc': 'Aplicación web tipo e-commerce desarrollada en hackatón, con carrito de compras, validaciones en JavaScript y uso de Local Storage.',
    'projects.agenda.desc':   'Aplicación en Java ejecutable en consola para gestión de contactos, implementando estructuras de datos y lógica orientada a objetos.',

    // Skills
    'skills.title':    'Habilidades técnicas',
    'skills.frontend': 'Frontend',
    'skills.backend':  'Backend',
    'skills.tools':    'Herramientas',

    // Contact
    'contact.title':        'Contacto',
    'contact.subtitle':     '¿Trabajamos juntos?',
    'contact.text':         'Estoy disponible para nuevos proyectos y colaboraciones. Si tienes una idea en mente o simplemente quieres saludar, no dudes en contactarme.',
    'contact.form.name':    'Nombre',
    'contact.form.email':   'Email',
    'contact.form.message': 'Mensaje',
    'contact.form.send':    'Enviar mensaje',
    'contact.form.success': '¡Mensaje enviado con éxito! Te responderé pronto.',
    'contact.form.error':   'Hubo un error al enviar. Por favor intenta de nuevo.',

    // Footer
    'footer.designed': 'Diseñado y desarrollado por',
    'footer.rights':   'Todos los derechos reservados',
  },

  en: {
    // Navbar
    'nav.inicio':      'Home',
    'nav.sobre':       'About me',
    'nav.proyectos':   'Projects',
    'nav.habilidades': 'Skills',
    'nav.contacto':    'Contact',

    // Hero
    'hero.greeting':     "Hi, I'm",
    'hero.role':         'Full Stack Developer & Experienced Team Leader',
    'hero.description':  'Specializing in Java, Spring Boot, JavaScript and React while leveraging a background in operational leadership to build scalable, user-centric solutions.',
    'hero.cta.projects': 'View projects',
    'hero.cta.contact':  'Contact me',

    // About
    'about.title':      'About me',
    'about.paragraph':  'With over 6 years of experience in high-volume bilingual environments (C1 English), I transitioned from supervising teams of 25 people and managing KPIs to building full-stack web applications. I bring a Project Management mindset—focused on Scrum methodologies, clean documentation, structured problem-solving, and efficient team collaboration—to every project I contribute to.',
    'about.card1.title': 'Teamwork',
    'about.card1.desc':  'Experience leading teams of up to 25 people and collaborating under Scrum methodology.',
    'about.card2.title': 'Problem solving',
    'about.card2.desc':  'Focus on structured analysis, clear documentation, and continuous improvement.',
    'about.card3.title': 'Full Stack Development',
    'about.card3.desc':  'Experience in web development with Java, JavaScript, MySQL and Bootstrap.',

    // Projects
    'projects.title':         'Featured projects',
    'projects.featured':      'Featured',
    'projects.scrum.label':   'Project management:',
    'projects.ixel.desc':     'A full-stack e-commerce solution developed for a real artisan shop. Contributed to frontend development using JavaScript, HTML, CSS and Bootstrap, and supported backend integration with Java and MySQL.',
    'projects.ixel.scrum':    'Developed under Scrum methodology, participating in sprint planning, task organization, and technical documentation for final client delivery.',
    'projects.hackaton.desc': 'E-commerce web application built during a hackathon, featuring a shopping cart, JavaScript validations, and Local Storage persistence.',
    'projects.agenda.desc':   'Console-based Java application for contact management, implementing data structures and object-oriented logic.',

    // Skills
    'skills.title':    'Technical skills',
    'skills.frontend': 'Frontend',
    'skills.backend':  'Backend',
    'skills.tools':    'Tools',

    // Contact
    'contact.title':        'Contact',
    'contact.subtitle':     "Let's work together?",
    'contact.text':         "I'm available for new projects and collaborations. If you have an idea in mind or just want to say hello, feel free to reach out.",
    'contact.form.name':    'Name',
    'contact.form.email':   'Email',
    'contact.form.message': 'Message',
    'contact.form.send':    'Send message',
    'contact.form.success': 'Message sent successfully! I will get back to you soon.',
    'contact.form.error':   'There was an error sending. Please try again.',

    // Footer
    'footer.designed': 'Designed and developed by',
    'footer.rights':   'All rights reserved',
  }
};

/** Estado del idioma activo. Por defecto: español. */
let currentLang = 'es';

/**
 * Aplica las traducciones del objeto al DOM.
 * Busca cada elemento con [data-i18n] y actualiza su textContent.
 * @param {string} lang - 'es' o 'en'
 */
function applyTranslations(lang) {
  const t = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      el.textContent = t[key];
    }
  });
  // Actualiza lang del <html> para SEO y accesibilidad
  document.documentElement.lang = lang;
}

/**
 * Inicializa el botón de cambio de idioma.
 * Alterna entre ES y EN al hacer clic, sin recargar la página.
 */
function setupLangToggle() {
  const btn       = document.getElementById('langToggle');
  const langLabel = document.getElementById('langLabel');
  if (!btn || !langLabel) return;

  btn.addEventListener('click', () => {
    currentLang = (currentLang === 'es') ? 'en' : 'es';

    // El botón muestra el idioma al que se puede cambiar
    langLabel.textContent = (currentLang === 'es') ? 'EN' : 'ES';

    applyTranslations(currentLang);

    // Mantener el texto del botón de envío sincronizado
    syncSubmitButton();
  });
}

/** Sincroniza el texto del botón de envío con el idioma activo. */
function syncSubmitButton() {
  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn && !submitBtn.disabled) {
    submitBtn.textContent = translations[currentLang]['contact.form.send'];
  }
}


/* ============================================================
   2. FORMULARIO DE CONTACTO CON EMAILJS
   ============================================================
   INSTRUCCIONES PARA ACTIVAR:
   ──────────────────────────────────────────────────────────
   1. Crea una cuenta en https://www.emailjs.com (plan gratuito
      permite 200 correos/mes).
   2. Crea un Servicio de correo (Gmail, Outlook, etc.).
   3. Crea una Plantilla de email con estas variables:
        {{name}}    → nombre del remitente
        {{email}}   → email del remitente
        {{message}} → mensaje
   4. Ve a Account → API Keys y copia tu Public Key.
   5. Reemplaza los placeholders de abajo:
        'YOUR_PUBLIC_KEY'   → tu clave pública
        'YOUR_SERVICE_ID'   → ID de tu servicio (ej. service_abc123)
        'YOUR_TEMPLATE_ID'  → ID de tu plantilla (ej. template_xyz789)
   ──────────────────────────────────────────────────────────
   SEGURIDAD: No subas claves reales a repositorios públicos.
   Si usas Vite/Webpack, guárdalas en un archivo .env:
     VITE_EMAILJS_PUBLIC_KEY=tu_clave
     VITE_EMAILJS_SERVICE_ID=tu_servicio
     VITE_EMAILJS_TEMPLATE_ID=tu_plantilla
   ============================================================ */

// ✅ Inicializa EmailJS
if (typeof emailjs !== 'undefined') {
  emailjs.init('J6SHj0NkxslunIEDz');
} else {
  console.warn('[portfolio.js] EmailJS no encontrado. Verifica que el CDN esté cargado antes de este script.');
}

/**
 * Configura el formulario de contacto:
 * - Validación de campos (nombre, email, mensaje)
 * - Envío via EmailJS
 * - Feedback visual de éxito o error sin recargar la página
 */
function setupContactForm() {
  const form      = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const successEl = document.getElementById('formSuccess');
  const errorEl   = document.getElementById('formError');

  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const message = form.message.value.trim();

    // Ocultar mensajes de feedback previos
    hideFeedback(successEl);
    hideFeedback(errorEl);

    // ── Validación de campos ───────────────────────────────
    if (!name || !email || !message) {
      showFeedback(errorEl,
        currentLang === 'es'
          ? 'Por favor completa todos los campos.'
          : 'Please fill in all fields.'
      );
      return;
    }

    if (message.length < 10) {
      showFeedback(errorEl,
        currentLang === 'es'
          ? 'El mensaje debe tener al menos 10 caracteres.'
          : 'Message must be at least 10 characters.'
      );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFeedback(errorEl,
        currentLang === 'es'
          ? 'Por favor ingresa un email válido.'
          : 'Please enter a valid email address.'
      );
      return;
    }
    // ─────────────────────────────────────────────────────

    // Activar estado de carga en el botón
    setSubmitLoading(submitBtn, true);

    // Parámetros — los nombres deben coincidir con tu plantilla de EmailJS
    const templateParams = { name, email, message };

    // Fallback si EmailJS no está disponible (desarrollo sin red)
    if (typeof emailjs === 'undefined') {
      console.warn('[portfolio.js] EmailJS no disponible — simulando envío.');
      setTimeout(() => {
        showFeedback(successEl, translations[currentLang]['contact.form.success']);
        form.reset();
        setSubmitLoading(submitBtn, false);
      }, 1200);
      return;
    }

    emailjs
      .send(
        'service_nnrx67n',   
        'template_mtps84q',  
        templateParams
      )
      .then(() => {
        showFeedback(successEl, translations[currentLang]['contact.form.success']);
        form.reset();
      })
      .catch(err => {
        console.error('[portfolio.js] EmailJS error:', err);
        showFeedback(errorEl, translations[currentLang]['contact.form.error']);
      })
      .finally(() => {
        setSubmitLoading(submitBtn, false);
      });
  });
}

/**
 * Activa/desactiva el estado de carga del botón de envío.
 * @param {HTMLButtonElement} btn
 * @param {boolean} loading
 */
function setSubmitLoading(btn, loading) {
  if (!btn) return;
  btn.disabled    = loading;
  btn.textContent = loading
    ? (currentLang === 'es' ? 'Enviando…' : 'Sending…')
    : translations[currentLang]['contact.form.send'];
}

/**
 * Muestra un elemento de feedback con el mensaje dado.
 * Se oculta automáticamente después de 7 segundos.
 * @param {HTMLElement} el - Elemento .form-feedback
 * @param {string} message - Texto a mostrar
 */
function showFeedback(el, message) {
  if (!el) return;
  el.textContent = message;
  el.classList.add('visible');
  clearTimeout(el._hideTimeout);
  el._hideTimeout = setTimeout(() => hideFeedback(el), 7000);
}

/**
 * Oculta un elemento de feedback.
 * @param {HTMLElement} el
 */
function hideFeedback(el) {
  if (!el) return;
  el.classList.remove('visible');
}


/* ============================================================
   INICIALIZACIÓN
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  setupLangToggle();
  setupContactForm();
});