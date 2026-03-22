/* Miles Cocktail Lounge — App Logic */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* --- Initialize Lucide Icons --- */
  if (window.lucide) {
    lucide.createIcons();
  }

  /* --- Navigation Scroll Effect --- */
  const nav = document.getElementById('nav');
  let lastScroll = 0;
  
  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
    lastScroll = scrollY;
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* --- Mobile Navigation --- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  function closeMenu() {
    if (navToggle && navLinks) {
      navToggle.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  function openMenu() {
    if (navToggle && navLinks) {
      navToggle.setAttribute('aria-expanded', 'true');
      navLinks.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.contains('is-open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('is-open') && !navLinks.contains(e.target) && !navToggle.contains(e.target)) {
        closeMenu();
      }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('is-open')) {
        closeMenu();
      }
    });
  }

  /* --- Smooth Scroll for Anchor Links --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* --- Google Maps embed (replaces Leaflet) --- */
  /* Map is now an iframe in the HTML, no JS needed */

  /* --- GSAP Scroll Animations (fallback for browsers without CSS scroll-timeline) --- */
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    /* Only use GSAP if CSS animation-timeline is NOT supported */
    if (!CSS.supports('animation-timeline', 'scroll()')) {
      document.querySelectorAll('.reveal-el').forEach(el => {
        gsap.from(el, {
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          }
        });
      });
    }

    /* Hero parallax (always) */
    const heroBgImg = document.querySelector('.hero__bg-img');
    if (heroBgImg) {
      gsap.to(heroBgImg, {
        y: '15%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
    }
  }

  /* --- Ambiance Strip: duplicate for infinite scroll --- */
  const strip = document.querySelector('.ambiance__strip');
  if (strip) {
    const children = Array.from(strip.children);
    children.forEach(child => {
      const clone = child.cloneNode(true);
      strip.appendChild(clone);
    });
  }

  /* --- Contact Form Handler (Netlify Forms) --- */
  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      /* Basic validation */
      const nameField = form.querySelector('#name');
      const emailField = form.querySelector('#email');
      let valid = true;

      if (!nameField.value.trim()) {
        nameField.style.borderColor = '#D16370';
        valid = false;
      } else {
        nameField.style.borderColor = '';
      }

      if (!emailField.value.trim() || !emailField.value.includes('@')) {
        emailField.style.borderColor = '#D16370';
        valid = false;
      } else {
        emailField.style.borderColor = '';
      }

      if (valid) {
        /* Send to Netlify Forms */
        const formData = new FormData(form);
        fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData).toString()
        })
        .then(() => {
          form.style.display = 'none';
          formSuccess.hidden = false;
        })
        .catch(() => {
          /* Fallback: open email client */
          window.location.href = 'mailto:events@inconfidencebymiles.com';
        });
      }
    });
  }

  /* --- Active Navigation Highlight --- */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');
  
  const observerOptions = {
    rootMargin: '-20% 0px -75% 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.style.color = '';
          if (a.getAttribute('href') === `#${id}`) {
            a.style.color = '#C9A84C';
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
});

// Disable right-click on images
document.addEventListener('contextmenu', function(e) {
  if (e.target.tagName === 'IMG') e.preventDefault();
});
