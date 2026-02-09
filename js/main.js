/**
 * Main Application Entry Point
 * Coordinates all modules and initializes the portfolio
 */

import { navigation } from './modules/navigation.js';
import { scrollAnimations } from './modules/scroll-animations.js';
import { formHandler } from './modules/form-handler.js';
import { smoothScroll } from './modules/smooth-scroll.js';

/**
 * Application Configuration
 */
const APP_CONFIG = {
  animationThreshold: 0.1,
  animationDelay: 100,
  formValidation: true
};

/**
 * Initialize Application
 */
const initApp = () => {
  // Initialize navigation
  navigation.init();
  
  // Initialize scroll animations
  scrollAnimations.init(APP_CONFIG.animationThreshold);
  
  // Initialize smooth scrolling
  smoothScroll.init();
  
  // Initialize form handler
  if (APP_CONFIG.formValidation) {
    formHandler.init();
  }
  
  // Log initialization
  console.log('Portfolio initialized successfully');
};

/**
 * Run on DOM Content Loaded
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

/**
 * Handle page visibility changes
 */
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    console.log('Page hidden');
  } else {
    console.log('Page visible');
  }
});

/**
 * Export for potential external use
 */
export { APP_CONFIG };
