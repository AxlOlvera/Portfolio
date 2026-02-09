/**
 * Scroll Animations Module
 * Handles scroll-triggered animations using Intersection Observer
 */

const scrollAnimations = (() => {
  // Configuration
  let observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  let observer = null;
  
  /**
   * Initialize scroll animations
   */
  const init = (threshold = 0.1) => {
    // Update threshold if provided
    observerOptions.threshold = threshold;
    
    // Create observer
    observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Observe elements
    observeElements();
  };
  
  /**
   * Observe all elements that should animate on scroll
   */
  const observeElements = () => {
    // Section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
      title.classList.add('fade-in-on-scroll');
      observer.observe(title);
    });
    
    // Project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
      card.classList.add('scale-in-on-scroll');
      card.classList.add(`delay-${Math.min(index + 1, 5)}`);
      observer.observe(card);
    });
    
    // Stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
      card.classList.add('fade-in-on-scroll');
      card.classList.add(`delay-${Math.min(index + 1, 5)}`);
      observer.observe(card);
    });
    
    // Skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
      category.classList.add('slide-in-left-on-scroll');
      category.classList.add(`delay-${Math.min(index + 1, 5)}`);
      observer.observe(category);
    });
    
    // Skill items (for progress bar animation)
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
      observer.observe(item);
    });
    
    // About paragraphs
    const aboutParagraphs = document.querySelectorAll('.about__paragraph');
    aboutParagraphs.forEach((paragraph, index) => {
      paragraph.classList.add('fade-in-on-scroll');
      paragraph.classList.add(`delay-${Math.min(index + 1, 5)}`);
      observer.observe(paragraph);
    });
    
    // Contact elements
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
  
  /**
   * Handle intersection of observed elements
   */
  const handleIntersection = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add visible class to trigger animation
        entry.target.classList.add('is-visible');
        
        // Unobserve after animation (performance optimization)
        // Comment this out if you want animations to trigger every time
        observer.unobserve(entry.target);
      }
    });
  };
  
  /**
   * Manually trigger animation for specific element
   */
  const animateElement = (element) => {
    if (element) {
      element.classList.add('is-visible');
    }
  };
  
  /**
   * Reset animation for specific element
   */
  const resetElement = (element) => {
    if (element) {
      element.classList.remove('is-visible');
    }
  };
  
  /**
   * Cleanup - disconnect observer
   */
  const destroy = () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  };
  
  // Public API
  return {
    init,
    animateElement,
    resetElement,
    destroy
  };
})();

export { scrollAnimations };
