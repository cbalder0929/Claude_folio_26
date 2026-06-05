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
const BG_SPEED   = 0.25;
const DROP_SPEED = 0.55;

let ticking         = false;

function applyParallaxSection(section, bgLayer, dropletLayer, scrollY, viewportHeight) {
  if (!section) return;

  const sectionTop = section.offsetTop;
  const relativeScroll = scrollY - sectionTop;

  if (scrollY > sectionTop - viewportHeight && scrollY < sectionTop + section.offsetHeight) {
    if (bgLayer) {
      bgLayer.style.transform = `translate3d(0,${relativeScroll * BG_SPEED}px,0)`;
    }
    if (dropletLayer) {
      dropletLayer.style.transform = `translate3d(0,${relativeScroll * DROP_SPEED}px,0)`;
    }
  }
}

/**
 * Core parallax render call — runs inside rAF loop.
 * Uses transform: translate3d() to force GPU compositing and
 * keep rendering on the compositor thread (no layout reflows).
 */
function renderParallax() {
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;

  // Hero — only compute if hero is in view
  if (scrollY < viewportHeight * 2) {
    applyParallaxSection(document.body, heroBg, heroDroplets, scrollY, viewportHeight);
  }

  // Projects section — parallax relative to its own top edge
  applyParallaxSection(projectsSection, projectsBg, projectsDroplets, scrollY, viewportHeight);

  // Gallery section — only compute when in view
  applyParallaxSection(gallerySection, galleryBg, galleryDroplets, scrollY, viewportHeight);

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
window.addEventListener('resize', renderParallax, { passive: true });

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


/* ============================================================
   GALLERY CAROUSEL
   ============================================================ */
(function () {
  const track   = document.getElementById('galleryTrack');
  const prevBtn = document.querySelector('[data-gallery-prev]');
  const nextBtn = document.querySelector('[data-gallery-next]');

  if (!track || !prevBtn || !nextBtn) return;

  function getStepSize() {
    const firstItem = track.querySelector('.gallery-item');
    if (!firstItem) return track.clientWidth;
    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap) || 0;
    return (firstItem.getBoundingClientRect().width + gap) * 3;
  }

  function updateButtons() {
    const maxScroll = track.scrollWidth - track.clientWidth;
    prevBtn.disabled = track.scrollLeft <= 1;
    nextBtn.disabled = track.scrollLeft >= maxScroll - 1 || maxScroll <= 0;
  }

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -getStepSize(), behavior: 'smooth' });
  });
  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: getStepSize(), behavior: 'smooth' });
  });
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

