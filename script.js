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
  if (heroBg) {
    heroBg.style.transform = `translateY(${scrollY * BG_SPEED}px)`;
  }

  // Hero — droplet layer: faster upward drift
  if (heroDroplets) {
    heroDroplets.style.transform = `translateY(${scrollY * DROP_SPEED}px)`;
  }

  // Projects section — parallax relative to its own top edge
  // so the image looks centred when the section is in view
  if (projectsSection && projectsBg && projectsDroplets) {
    const projTop            = projectsSection.offsetTop;
    const projRelativeScroll = scrollY - projTop;
    projectsBg.style.transform       = `translateY(${projRelativeScroll * BG_SPEED}px)`;
    projectsDroplets.style.transform = `translateY(${projRelativeScroll * DROP_SPEED}px)`;
  }

  // Gallery section — same absolute-scrollY formula as hero so the
  // rain animation is continuous across both sections
  if (gallerySection && galleryBg && galleryDroplets) {
    galleryBg.style.transform       = `translateY(${scrollY * BG_SPEED}px)`;
    galleryDroplets.style.transform = `translateY(${scrollY * DROP_SPEED}px)`;
  }

  // Navbar glass effect on scroll
  if (navbar) {
    if (scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
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
window.addEventListener('resize', renderParallax);

// Initial render (no scroll yet)
renderParallax();


/* ============================================================
   PROJECT CAROUSEL
   ============================================================ */
(function () {
  const track = document.getElementById('projectsGrid');
  const prevBtn = document.querySelector('[data-carousel-prev]');
  const nextBtn = document.querySelector('[data-carousel-next]');

  if (!track || !prevBtn || !nextBtn) return;

  function getStepSize() {
    const firstCard = track.querySelector('.project-card');
    if (!firstCard) return track.clientWidth;

    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap) || 0;
    return firstCard.getBoundingClientRect().width + gap;
  }

  function updateButtons() {
    const maxScroll = track.scrollWidth - track.clientWidth;
    const atStart = track.scrollLeft <= 1;
    const atEnd = track.scrollLeft >= maxScroll - 1;

    prevBtn.disabled = atStart;
    nextBtn.disabled = atEnd || maxScroll <= 0;
  }

  function moveCarousel(direction) {
    track.scrollBy({
      left: getStepSize() * direction,
      behavior: 'smooth'
    });
  }

  prevBtn.addEventListener('click', () => moveCarousel(-1));
  nextBtn.addEventListener('click', () => moveCarousel(1));
  track.addEventListener('scroll', updateButtons, { passive: true });
  window.addEventListener('resize', updateButtons);

  updateButtons();
})();


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

