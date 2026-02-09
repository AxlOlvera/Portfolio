/**
 * Navigation Module
 * Handles mobile menu toggle and scroll behavior
 */

const navigation = (() => {
  // DOM Elements
  let header = null;
  let navToggle = null;
  let navMenu = null;
  let navLinks = null;
  
  // State
  let lastScrollPosition = 0;
  let isMenuOpen = false;
  
  /**
   * Initialize navigation
   */
  const init = () => {
    cacheDOM();
    bindEvents();
    updateHeaderOnScroll();
  };
  
  /**
   * Cache DOM elements
   */
  const cacheDOM = () => {
    header = document.getElementById('header');
    navToggle = document.getElementById('navToggle');
    navMenu = document.getElementById('navMenu');
    navLinks = document.querySelectorAll('.nav__link');
  };
  
  /**
   * Bind event listeners
   */
  const bindEvents = () => {
    if (navToggle) {
      navToggle.addEventListener('click', toggleMenu);
    }
    
    if (navLinks.length > 0) {
      navLinks.forEach(link => {
        link.addEventListener('click', handleNavLinkClick);
      });
    }
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
  };
  
  /**
   * Toggle mobile menu
   */
  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
    
    navToggle.classList.toggle('nav__toggle--active');
    navMenu.classList.toggle('nav__menu--active');
    
    // Prevent body scroll when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };
  
  /**
   * Handle navigation link clicks
   */
  const handleNavLinkClick = (e) => {
    // Close mobile menu if open
    if (isMenuOpen) {
      toggleMenu();
    }
    
    // Update active state
    navLinks.forEach(link => link.classList.remove('nav__link--active'));
    e.target.classList.add('nav__link--active');
  };
  
  /**
   * Handle scroll events
   */
  const handleScroll = () => {
    const currentScrollPosition = window.pageYOffset;
    
    updateHeaderOnScroll();
    updateActiveNavLink(currentScrollPosition);
    
    lastScrollPosition = currentScrollPosition;
  };
  
  /**
   * Update header styling based on scroll position
   */
  const updateHeaderOnScroll = () => {
    if (window.pageYOffset > 50) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  };
  
  /**
   * Update active navigation link based on scroll position
   */
  const updateActiveNavLink = (scrollPosition) => {
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        navLinks.forEach(link => {
          link.classList.remove('nav__link--active');
          
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('nav__link--active');
          }
        });
      }
    });
  };
  
  /**
   * Handle window resize
   */
  const handleResize = () => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768 && isMenuOpen) {
      toggleMenu();
    }
  };
  
  // Public API
  return {
    init
  };
})();

export { navigation };
