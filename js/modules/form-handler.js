/**
 * Form Handler Module
 * Handles contact form validation and submission
 */

const formHandler = (() => {
  // DOM Elements
  let form = null;
  let nameInput = null;
  let emailInput = null;
  let messageInput = null;
  let submitButton = null;
  
  // Validation patterns
  const VALIDATION_PATTERNS = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    name: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/
  };
  
  /**
   * Initialize form handler
   */
  const init = () => {
    cacheDOM();
    bindEvents();
  };
  
  /**
   * Cache DOM elements
   */
  const cacheDOM = () => {
    form = document.getElementById('contactForm');
    nameInput = document.getElementById('name');
    emailInput = document.getElementById('email');
    messageInput = document.getElementById('message');
    submitButton = form?.querySelector('button[type="submit"]');
  };
  
  /**
   * Bind event listeners
   */
  const bindEvents = () => {
    if (!form) return;
    
    form.addEventListener('submit', handleSubmit);
    
    // Real-time validation
    nameInput?.addEventListener('blur', () => validateField(nameInput, 'name'));
    emailInput?.addEventListener('blur', () => validateField(emailInput, 'email'));
    messageInput?.addEventListener('blur', () => validateField(messageInput, 'message'));
    
    // Clear error on input
    [nameInput, emailInput, messageInput].forEach(input => {
      input?.addEventListener('input', () => clearError(input));
    });
  };
  
  /**
   * Handle form submission
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const isNameValid = validateField(nameInput, 'name');
    const isEmailValid = validateField(emailInput, 'email');
    const isMessageValid = validateField(messageInput, 'message');
    
    if (!isNameValid || !isEmailValid || !isMessageValid) {
      showNotification('Por favor, corrige los errores en el formulario', 'error');
      return;
    }
    
    // Get form data
    const formData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      message: messageInput.value.trim()
    };
    
    // Simulate form submission
    submitForm(formData);
  };
  
  /**
   * Validate individual field
   */
  const validateField = (input, fieldType) => {
    if (!input) return false;
    
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    switch (fieldType) {
      case 'name':
        if (value === '') {
          isValid = false;
          errorMessage = 'El nombre es requerido';
        } else if (!VALIDATION_PATTERNS.name.test(value)) {
          isValid = false;
          errorMessage = 'El nombre debe contener solo letras (2-50 caracteres)';
        }
        break;
        
      case 'email':
        if (value === '') {
          isValid = false;
          errorMessage = 'El email es requerido';
        } else if (!VALIDATION_PATTERNS.email.test(value)) {
          isValid = false;
          errorMessage = 'Por favor, ingresa un email válido';
        }
        break;
        
      case 'message':
        if (value === '') {
          isValid = false;
          errorMessage = 'El mensaje es requerido';
        } else if (value.length < 10) {
          isValid = false;
          errorMessage = 'El mensaje debe tener al menos 10 caracteres';
        }
        break;
    }
    
    if (!isValid) {
      showError(input, errorMessage);
    } else {
      clearError(input);
    }
    
    return isValid;
  };
  
  /**
   * Show error message for field
   */
  const showError = (input, message) => {
    const formGroup = input.closest('.form-group');
    
    // Remove existing error
    clearError(input);
    
    // Add error class
    input.classList.add('form-group__input--error');
    
    // Create error message element
    const errorElement = document.createElement('span');
    errorElement.className = 'form-group__error';
    errorElement.textContent = message;
    errorElement.style.color = 'var(--color-highlight)';
    errorElement.style.fontSize = 'var(--font-size-xs)';
    errorElement.style.marginTop = 'var(--space-xs)';
    errorElement.style.display = 'block';
    
    formGroup.appendChild(errorElement);
  };
  
  /**
   * Clear error for field
   */
  const clearError = (input) => {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.form-group__error');
    
    input.classList.remove('form-group__input--error');
    
    if (errorElement) {
      errorElement.remove();
    }
  };
  
  /**
   * Submit form data (simulated)
   */
  const submitForm = (formData) => {
    // Disable submit button
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Enviando...';
    }
    
    // Simulate API call
    setTimeout(() => {
      // Log form data (in production, this would be an API call)
      console.log('Form submitted:', formData);
      
      // Show success message
      showNotification('¡Mensaje enviado con éxito! Te contactaré pronto.', 'success');
      
      // Reset form
      form.reset();
      
      // Re-enable submit button
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Enviar mensaje';
      }
    }, 1500);
  };
  
  /**
   * Show notification message
   */
  const showNotification = (message, type = 'info') => {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Style notification
    Object.assign(notification.style, {
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      padding: '1rem 1.5rem',
      borderRadius: 'var(--border-radius-md)',
      backgroundColor: type === 'success' ? '#10b981' : '#ef4444',
      color: 'white',
      fontWeight: '500',
      boxShadow: 'var(--shadow-xl)',
      zIndex: '9999',
      animation: 'fadeInUp 0.3s ease-out'
    });
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
      notification.style.animation = 'fadeOut 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  };
  
  // Public API
  return {
    init
  };
})();

export { formHandler };
