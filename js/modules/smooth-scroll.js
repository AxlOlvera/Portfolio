/**
 * Smooth Scroll Module
 * Handles smooth scrolling for anchor links
 */

const smoothScroll = (() => {
  // Configuration
  const SCROLL_OFFSET = 80; // Offset for fixed header
  const SCROLL_DURATION = 800; // Duration in milliseconds
  
  /**
   * Initialize smooth scroll
   */
  const init = () => {
    bindEvents();
  };
  
  /**
   * Bind event listeners
   */
  const bindEvents = () => {
    // Get all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
      link.addEventListener('click', handleAnchorClick);
    });
  };
  
  /**
   * Handle anchor link click
   */
  const handleAnchorClick = (e) => {
    const href = e.currentTarget.getAttribute('href');
    
    // Ignore empty or invalid anchors
    if (!href || href === '#') {
      return;
    }
    
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      e.preventDefault();
      scrollToElement(targetElement);
    }
  };
  
  /**
   * Scroll to specific element with smooth animation
   */
  const scrollToElement = (element) => {
    const targetPosition = element.offsetTop - SCROLL_OFFSET;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    /**
     * Animation loop
     */
    const animation = (currentTime) => {
      if (startTime === null) {
        startTime = currentTime;
      }
      
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / SCROLL_DURATION, 1);
      
      // Easing function (ease-in-out)
      const ease = easeInOutCubic(progress);
      
      window.scrollTo(0, startPosition + (distance * ease));
      
      if (timeElapsed < SCROLL_DURATION) {
        requestAnimationFrame(animation);
      }
    };
    
    requestAnimationFrame(animation);
  };
  
  /**
   * Easing function: ease-in-out cubic
   */
  const easeInOutCubic = (t) => {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };
  
  /**
   * Alternative: Native smooth scroll (simpler but less customizable)
   */
  const scrollToElementNative = (element) => {
    const targetPosition = element.offsetTop - SCROLL_OFFSET;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  };
  
  // Public API
  return {
    init,
    scrollToElement,
    scrollToElementNative
  };
})();

export { smoothScroll };
