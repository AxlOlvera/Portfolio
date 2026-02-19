/**
 * form-handler.js
 * ===============
 * Módulo de validación de formulario.
 *
 * RESPONSABILIDAD ÚNICA: validar campos individuales y mostrar
 * errores inline. El envío real y la lógica anti-spam viven en
 * portfolio.js para evitar doble registro de listeners en #contactForm.
 *
 * API pública:
 *   formHandler.init()            — registra validación en blur/input
 *   formHandler.validateAll()     — valida todos los campos, devuelve bool
 *   formHandler.validateField(input, type) — valida un campo, devuelve bool
 *   formHandler.clearAll()        — limpia todos los errores
 */

const formHandler = (() => {

  /* ── Selectores ──────────────────────────────────────── */
  let nameInput    = null;
  let emailInput   = null;
  let messageInput = null;

  /* ── Patrones de validación ──────────────────────────── */
  const PATTERNS = {
    // Acepta letras latinas, tildes y ñ — sin HTML ni URLs
    name:  /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'\-]{2,60}$/,
    // RFC 5322 simplificado, más estricto que type="email"
    email: /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/,
  };

  /* ── Mensajes de error ───────────────────────────────── */
  // Centralizar mensajes facilita el soporte bilingüe futuro
  const MESSAGES = {
    name: {
      empty:   'El nombre es requerido.',
      invalid: 'Solo letras, entre 2 y 60 caracteres.',
    },
    email: {
      empty:   'El email es requerido.',
      invalid: 'Ingresa un email válido.',
      long:    'El email no puede superar 100 caracteres.',
    },
    message: {
      empty:   'El mensaje es requerido.',
      short:   'El mensaje debe tener al menos 10 caracteres.',
      long:    'El mensaje no puede superar 2000 caracteres.',
      links:   'El mensaje contiene demasiados enlaces.',
    },
  };

  /* ── Inicialización ──────────────────────────────────── */
  const init = () => {
    nameInput    = document.getElementById('name');
    emailInput   = document.getElementById('email');
    messageInput = document.getElementById('message');

    if (!nameInput || !emailInput || !messageInput) return;

    _bindBlurValidation();
    _bindCharCounter();
  };

  /**
   * Registra validación en blur (cuando el usuario sale del campo).
   * No valida mientras escribe — evita mensajes agresivos.
   */
  const _bindBlurValidation = () => {
    nameInput.addEventListener('blur',    () => validateField(nameInput,    'name'));
    emailInput.addEventListener('blur',   () => validateField(emailInput,   'email'));
    messageInput.addEventListener('blur', () => validateField(messageInput, 'message'));

    // Limpia error apenas el usuario empieza a corregir
    [nameInput, emailInput, messageInput].forEach(input => {
      input.addEventListener('input', () => _clearError(input));
    });
  };

  /**
   * Contador de caracteres para el textarea.
   * Mejora UX y disuade mensajes de spam masivos.
   */
  const _bindCharCounter = () => {
    const counter = document.getElementById('charCounter');
    if (!counter || !messageInput) return;

    messageInput.addEventListener('input', () => {
      const len = messageInput.value.length;
      counter.textContent = `${len} / 2000`;
      // Advertencia visual en el 90% de la capacidad
      counter.style.color = len > 1800 ? 'var(--color-gold)' : '';
      counter.style.fontWeight = len > 1800 ? '600' : '';
    });
  };

  /* ── Validación pública ───────────────────────────────── */

  /**
   * Valida un campo individual y actualiza su estado visual.
   * @param   {HTMLInputElement|HTMLTextAreaElement} input
   * @param   {'name'|'email'|'message'} type
   * @returns {boolean}
   */
  const validateField = (input, type) => {
    if (!input) return false;
    const value = input.value.trim();
    const error = _getError(value, type);

    _clearError(input);

    if (error) {
      _showError(input, error);
      return false;
    }

    input.classList.add('field--valid');
    return true;
  };

  /**
   * Valida los tres campos a la vez. Útil en el submit handler.
   * @returns {boolean} true si todos pasan
   */
  const validateAll = () => {
    // Evalúa los tres aunque falle el primero (UX: muestra todos los errores)
    const n = validateField(nameInput,    'name');
    const e = validateField(emailInput,   'email');
    const m = validateField(messageInput, 'message');
    return n && e && m;
  };

  /**
   * Limpia todos los errores y estados visuales del formulario.
   */
  const clearAll = () => {
    [nameInput, emailInput, messageInput].forEach(input => {
      if (input) _clearError(input);
    });
  };

  /* ── Lógica de validación interna ────────────────────── */

  const _getError = (value, type) => {
    switch (type) {

      case 'name':
        if (!value)                       return MESSAGES.name.empty;
        if (!PATTERNS.name.test(value))   return MESSAGES.name.invalid;
        // Rechaza inyección HTML
        if (/<[^>]*>/.test(value))        return MESSAGES.name.invalid;
        return null;

      case 'email':
        if (!value)                       return MESSAGES.email.empty;
        if (!PATTERNS.email.test(value))  return MESSAGES.email.invalid;
        if (value.length > 100)           return MESSAGES.email.long;
        return null;

      case 'message':
        if (!value)                       return MESSAGES.message.empty;
        if (value.length < 10)            return MESSAGES.message.short;
        if (value.length > 2000)          return MESSAGES.message.long;
        // Más de 3 URLs = spam típico
        if ((value.match(/https?:\/\//g) || []).length > 3)
                                          return MESSAGES.message.links;
        return null;

      default:
        return null;
    }
  };

  /* ── UI de errores ───────────────────────────────────── */

  const _showError = (input, message) => {
    const group = input.closest('.form-group');
    if (!group) return;

    // Eliminar error anterior (idempotente)
    group.querySelector('.field-error')?.remove();

    input.classList.remove('field--valid');
    input.classList.add('field--invalid');

    const errorEl = document.createElement('span');
    errorEl.className   = 'field-error';
    errorEl.textContent = message;
    errorEl.setAttribute('role', 'alert');
    group.appendChild(errorEl);
  };

  const _clearError = (input) => {
    const group = input.closest('.form-group');
    group?.querySelector('.field-error')?.remove();
    input.classList.remove('field--invalid', 'field--valid');
  };

  /* ── API pública ─────────────────────────────────────── */
  return {
    init,
    validateField,
    validateAll,
    clearAll,
  };

})();

export { formHandler };