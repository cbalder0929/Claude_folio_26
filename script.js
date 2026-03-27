/**
 * PARALLAX SYSTEM
 * Uses requestAnimationFrame for silky-smooth performance.
 * The two hero layers (bg & droplets) move at different speeds,
 * creating the illusion that glass droplets slide independently
 * from the background scene behind them.
 *
 * Adjust speeds via CSS custom properties or the constants below.
 */

const heroBg          = document.getElementById('heroBg');
const heroDroplets    = document.getElementById('heroDroplets');
const projectsBg      = document.getElementById('projectsBg');
const projectsDroplets= document.getElementById('projectsDroplets');
const galleryBg       = document.getElementById('galleryBg');
const galleryDroplets = document.getElementById('galleryDroplets');
const projectsSection = document.getElementById('projects');
const gallerySection  = document.getElementById('gallery');
const navbar          = document.getElementById('navbar');

// Parallax speed coefficients
// bg moves UP slowly as you scroll; droplets move UP faster.
// This creates the impression that the "wet glass pane" in front
// slides upward relative to the still scene outside.
const BG_SPEED   = 0.25;   // fraction of scroll offset applied to bg
const DROP_SPEED = 0.55;   // fraction of scroll offset applied to droplets

let currentScrollY  = 0;
let targetScrollY   = 0;
let rafId           = null;
let ticking         = false;

/**
 * Core parallax render call — runs inside rAF loop.
 * Uses transform: translateY() only — never top/left — to
 * keep rendering on the compositor thread (no layout reflows).
 */
function renderParallax() {
  const scrollY = window.scrollY;

  // Hero — background layer: slow upward drift
  heroBg.style.transform = `translateY(${scrollY * BG_SPEED}px)`;

  // Hero — droplet layer: faster upward drift
  heroDroplets.style.transform = `translateY(${scrollY * DROP_SPEED}px)`;

  // Projects section — parallax relative to its own top edge
  // so the image looks centred when the section is in view
  const projTop            = projectsSection.offsetTop;
  const projRelativeScroll = scrollY - projTop;
  projectsBg.style.transform       = `translateY(${projRelativeScroll * BG_SPEED}px)`;
  projectsDroplets.style.transform = `translateY(${projRelativeScroll * DROP_SPEED}px)`;

  // Gallery section — parallax relative to its own top edge
  const galleryTop            = gallerySection.offsetTop;
  const galleryRelativeScroll = scrollY - galleryTop;
  galleryBg.style.transform       = `translateY(${galleryRelativeScroll * BG_SPEED}px)`;
  galleryDroplets.style.transform = `translateY(${galleryRelativeScroll * DROP_SPEED}px)`;

  // Navbar glass effect on scroll
  if (scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  ticking = false;
}

/**
 * Scroll listener using the "requestAnimationFrame once per frame"
 * pattern — guarantees we never paint more often than the display
 * refresh rate, even on fast scroll events.
 */
function onScroll() {
  if (!ticking) {
    requestAnimationFrame(renderParallax);
    ticking = true;
  }
}

window.addEventListener('scroll', onScroll, { passive: true });

// Initial render (no scroll yet)
renderParallax();


/**
 * SHOW MORE — Projects grid expansion
 * 1. Expand the grid (CSS class .expanded reveals hidden cards)
 * 2. Fade out + remove the frosted overlay
 * 3. Hide the button itself
 */
const showMoreBtn  = document.getElementById('showMoreBtn');
const showLessBtn  = document.getElementById('showLessBtn');
const projectsGrid = document.getElementById('projectsGrid');
const fadeOverlay  = document.getElementById('fadeOverlay');

showMoreBtn.addEventListener('click', function () {
  // Reveal hidden cards
  projectsGrid.classList.add('expanded');

  // Fade and remove the frosted overlay
  fadeOverlay.classList.add('hidden');
  setTimeout(() => { fadeOverlay.style.display = 'none'; }, 600);

  // Swap buttons
  showMoreBtn.style.display = 'none';
  showLessBtn.style.display = '';
});

showLessBtn.addEventListener('click', function () {
  // Collapse the grid
  projectsGrid.classList.remove('expanded');

  // Restore the frosted overlay
  fadeOverlay.style.display = '';
  // Re-trigger the transition by removing 'hidden' after a brief tick
  requestAnimationFrame(() => { fadeOverlay.classList.remove('hidden'); });

  // Swap buttons
  showLessBtn.style.display = 'none';
  showMoreBtn.style.display = '';

  // Scroll back up to the projects section top
  document.getElementById('projects').scrollIntoView({ behavior: 'smooth', block: 'start' });
});


/**
 * SMOOTH ANCHOR SCROLL
 * Intercepts hash links for a controlled scroll experience.
 */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* ============================================================
   LIGHT MODE TOGGLE
   ============================================================ */
const lightModeBtn = document.getElementById('lightModeBtn');
let isLightMode    = false;

lightModeBtn.addEventListener('click', () => {
  isLightMode = !isLightMode;
  document.body.classList.toggle('light-mode', isLightMode);
  lightModeBtn.classList.toggle('active', isLightMode);

  // Swap icon and label
  const icon  = lightModeBtn.querySelector('.ctrl-icon');
  const label = lightModeBtn.querySelector('[data-i18n="lightMode"]');
  if (isLightMode) {
    icon.textContent  = '🌙';
    label.textContent = currentLang === 'en' ? 'Dark Mode' : 'Modo Oscuro';
  } else {
    icon.textContent  = '☀';
    label.textContent = currentLang === 'en' ? 'Light Mode' : 'Modo Claro';
  }
});


/* ============================================================
   LANGUAGE TOGGLE — English ↔ Español
   ============================================================ */
const translations = {
  en: {
    navAbout:      'About',
    navProjects:   'Projects',
    navGallery:    'Gallery',
    navContact:    'Contact',
    mobileNavHome: 'Home',
    lightMode:     'Light Mode',
    heroEyebrow:   'Visual Intelligence Studio',
    heroTitle1:    'Crafting digital',
    heroTitleEm:   'clarity',
    heroTitle2:    'through code',
    heroSubtitle:  'Full-stack engineer and UI architect specialising in immersive, data-driven interfaces that communicate with precision.',
    ctaProjects:   'View Projects',
    ctaContact:    'Get in Touch',
    scroll:        'Scroll',
    aboutLabel:    'Background',
    aboutTitle:    'Precision at<br />every layer',
    aboutP1:       'I build interfaces where engineering rigour and visual craft reinforce each other. From pixel-level typography decisions to distributed system architecture, I treat both as inseparable disciplines.',
    aboutP2:       'My work spans interactive data platforms, real-time dashboards, and high-fidelity design systems — always prioritising clarity, performance, and the subtle details that separate good from memorable.',
    stat1:         'Years of experience',
    stat2:         'Products shipped',
    stat3:         'Industries served',
    stat4:         'Iterations committed',
    workLabel:     'Selected Work',
    workTitle:     'Projects &amp; Case Studies',
    showMore:      'Show More Projects',
    showLess:      'Show Less',
    galleryLabel:  'Visual Work',
    galleryTitle:  'Gallery &amp; Showcase',
    footerValues:  'Values: Innovation, Resilience, Clarity, etc.',
    footerNavTitle:'Navigation',
    footerAbout:   'About',
    footerCopy:    '© 2026 — Visual Intelligence Studio',
    footerCraft:   'Crafted with precision',
  },
  es: {
    navAbout:      'Acerca',
    navProjects:   'Proyectos',
    navGallery:    'Galería',
    navContact:    'Contacto',
    mobileNavHome: 'Inicio',
    lightMode:     'Modo Claro',
    heroEyebrow:   'Estudio de Inteligencia Visual',
    heroTitle1:    'Creando claridad',
    heroTitleEm:   'digital',
    heroTitle2:    'a través del código',
    heroSubtitle:  'Ingeniero full-stack y arquitecto de UI especializado en interfaces inmersivas y basadas en datos que comunican con precisión.',
    ctaProjects:   'Ver Proyectos',
    ctaContact:    'Contáctame',
    scroll:        'Desplazar',
    aboutLabel:    'Trayectoria',
    aboutTitle:    'Precisión en<br />cada capa',
    aboutP1:       'Construyo interfaces donde el rigor de ingeniería y el arte visual se refuerzan mutuamente. Desde decisiones tipográficas a nivel de píxel hasta arquitectura de sistemas distribuidos, los trato como disciplinas inseparables.',
    aboutP2:       'Mi trabajo abarca plataformas de datos interactivos, paneles en tiempo real y sistemas de diseño de alta fidelidad — siempre priorizando claridad, rendimiento y los detalles sutiles que separan lo bueno de lo memorable.',
    stat1:         'Años de experiencia',
    stat2:         'Productos lanzados',
    stat3:         'Industrias atendidas',
    stat4:         'Iteraciones realizadas',
    workLabel:     'Trabajo Selecto',
    workTitle:     'Proyectos y Casos de Estudio',
    showMore:      'Ver Más Proyectos',
    showLess:      'Ver Menos',
    galleryLabel:  'Trabajo Visual',
    galleryTitle:  'Galería y Vitrina',
    footerValues:  'Valores: Innovación, Resiliencia, Claridad, etc.',
    footerNavTitle:'Navegación',
    footerAbout:   'Acerca',
    footerCopy:    '© 2026 — Estudio de Inteligencia Visual',
    footerCraft:   'Creado con precisión',
  }
};

let currentLang = 'en';
const langBtn   = document.getElementById('langBtn');
const langLabel = document.getElementById('langLabel');

function applyLanguage(lang) {
  const t = translations[lang];

  // Update all [data-i18n] elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      // Use innerHTML so <br /> in titles renders correctly
      el.innerHTML = t[key];
    }
  });

  // Update light mode button label to match active state
  const lightLabel = lightModeBtn.querySelector('[data-i18n="lightMode"]');
  if (lightLabel) {
    lightLabel.textContent = isLightMode
      ? (lang === 'en' ? 'Dark Mode'  : 'Modo Oscuro')
      : (lang === 'en' ? 'Light Mode' : 'Modo Claro');
  }
}

langBtn.addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'es' : 'en';
  applyLanguage(currentLang);
  langLabel.textContent = currentLang === 'en' ? 'Español' : 'English';
  langBtn.classList.toggle('active', currentLang === 'es');
});


/* ============================================================
   MOBILE BOTTOM NAV — Active Section Tracking
   Uses IntersectionObserver to highlight the nav item
   corresponding to the section currently in view.
   ============================================================ */
(function () {
  const mobileNav = document.getElementById('mobileNav');
  if (!mobileNav) return;

  const navItems = mobileNav.querySelectorAll('.mobile-nav-item');
  const sectionIds = Array.from(navItems).map(item => item.getAttribute('data-section'));

  // Smooth-scroll for bottom nav links (reuse same pattern as desktop)
  navItems.forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Set the active class on the correct nav item
  function setActive(sectionId) {
    navItems.forEach(item => {
      if (item.getAttribute('data-section') === sectionId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  // Observe each section — when it enters the viewport, mark it active
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',   // Fires when section is near the upper-third
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  }, observerOptions);

  sectionIds.forEach(id => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });
})();
