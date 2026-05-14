/**
 * PROJECT DETAIL PAGE SCRIPT
 * Handles dynamic project loading, carousel functionality, and navigation
 */

// ============================================================
// PROJECT DATA
// ============================================================
const projectsData = {
  '001': {
    title: 'Lens Analytics Platform',
    number: '001',
    overview: 'Real-time event telemetry dashboard for a SaaS product with 2M+ daily active users.',
    description: 'Lens is a comprehensive analytics platform designed to handle massive data ingestion and real-time query performance. Built for a SaaS company processing millions of events daily, the platform maintains sub-200ms latency on complex aggregations across billions of data points.',
    mediaItems: [
      { type: 'placeholder', label: 'Dashboard Overview' },
      { type: 'placeholder', label: 'Real-time Metrics' },
      { type: 'placeholder', label: 'Custom Reports' }
    ],
    challenges: [
      { title: 'Performance at Scale', description: 'Optimizing queries across 2M+ daily active users and billion-row datasets while maintaining sub-200ms latency.' },
      { title: 'Real-time Updates', description: 'Implementing WebSocket connections for live data streaming without overwhelming client resources.' },
      { title: 'Complex Visualizations', description: 'Rendering D3.js visualizations with thousands of data points without frame rate drops.' }
    ],
    techStack: ['React', 'WebSocket', 'ClickHouse', 'D3.js', 'Node.js', 'TypeScript'],
    nextProject: '002'
  },
  '002': {
    title: 'Meridian Design System',
    number: '002',
    overview: 'Enterprise-grade component library spanning 120+ primitives and a living Storybook environment.',
    description: 'Meridian is a comprehensive design system built to serve three product teams across a large enterprise. It includes 120+ carefully crafted components, a token pipeline for consistent theming, and integrated Figma-to-code workflows.',
    mediaItems: [
      { type: 'placeholder', label: 'Component Library' },
      { type: 'placeholder', label: 'Storybook UI' },
      { type: 'placeholder', label: 'Token System' }
    ],
    challenges: [
      { title: 'Team Alignment', description: 'Managing 120+ components across three teams with different design languages and requirements.' },
      { title: 'Token Pipeline', description: 'Creating an automated system for syncing design tokens between Figma and code.' },
      { title: 'Scalability', description: 'Ensuring the system scales as new components are added without performance degradation.' }
    ],
    techStack: ['TypeScript', 'Storybook', 'Figma Tokens', 'React', 'CSS-in-JS'],
    nextProject: '003'
  },
  '003': {
    title: 'Orbit CMS Interface',
    number: '003',
    overview: 'Headless CMS front-end with inline editing and multi-locale support.',
    description: 'Orbit provides a modern interface for managing content across a global company with support for multiple languages and regions. Features include inline WYSIWYG editing, structured text rendering, and a custom GraphQL layer for efficient content delivery.',
    mediaItems: [
      { type: 'placeholder', label: 'Editor Interface' },
      { type: 'placeholder', label: 'Multi-locale Support' },
      { type: 'placeholder', label: 'Admin Dashboard' }
    ],
    challenges: [
      { title: 'Complex Data Models', description: 'Handling deeply nested structured text and custom content types with GraphQL.' },
      { title: 'Localization at Scale', description: 'Managing content translations and regional variations without duplicating efforts.' },
      { title: 'Editor UX', description: 'Creating an intuitive inline editing experience for non-technical content editors.' }
    ],
    techStack: ['Next.js', 'DatoCMS', 'GraphQL', 'React', 'TypeScript'],
    nextProject: '004'
  },
  '004': {
    title: 'Pulse Health Dashboard',
    number: '004',
    overview: 'Accessible HIPAA-aligned patient vitals interface with configurable alert thresholds.',
    description: 'Pulse is a healthcare dashboard providing real-time patient monitoring for clinical settings. Fully HIPAA compliant, it integrates with HL7 FHIR data streams and includes customizable alert thresholds for different patient conditions.',
    mediaItems: [
      { type: 'placeholder', label: 'Patient Dashboard' },
      { type: 'placeholder', label: 'Vitals Monitoring' },
      { type: 'placeholder', label: 'Alert Configuration' }
    ],
    challenges: [
      { title: 'HIPAA Compliance', description: 'Implementing security measures and audit trails for protected health information.' },
      { title: 'Real-time Monitoring', description: 'Processing continuous data streams from medical devices with minimal latency.' },
      { title: 'Accessibility', description: 'Ensuring WCAG 2.1 AA compliance for critical healthcare interfaces.' }
    ],
    techStack: ['Vue 3', 'FHIR API', 'Chart.js', 'Node.js', 'PostgreSQL'],
    nextProject: '005'
  },
  '005': {
    title: 'Vanta E-Commerce Engine',
    number: '005',
    overview: 'Conversion-optimized storefront achieving 34% checkout completion uplift.',
    description: 'Vanta is a high-performance e-commerce platform built with Next.js 14 and React Server Components. Through progressive disclosure patterns and optimized checkout flows, it achieved a 34% increase in checkout completion rates.',
    mediaItems: [
      { type: 'placeholder', label: 'Product Catalog' },
      { type: 'placeholder', label: 'Checkout Flow' },
      { type: 'placeholder', label: 'Customer Dashboard' }
    ],
    challenges: [
      { title: 'Conversion Rate Optimization', description: 'Reducing friction in the checkout process while maintaining security and compliance.' },
      { title: 'Performance at Scale', description: 'Serving millions of products with sub-500ms page load times.' },
      { title: 'Inventory Integration', description: 'Real-time sync between frontend and Shopify inventory system.' }
    ],
    techStack: ['Next.js 14', 'Shopify', 'Tailwind CSS', 'React Server Components', 'TypeScript'],
    nextProject: '006'
  },
  '006': {
    title: 'Spectrum AI Workbench',
    number: '006',
    overview: 'Prompt engineering interface and model evaluation harness for series-B AI startup.',
    description: 'Spectrum provides a collaborative environment for prompt engineering teams to develop, test, and evaluate LLM outputs. Features include side-by-side diff views, custom model adapters, and prompt versioning systems.',
    mediaItems: [
      { type: 'placeholder', label: 'Prompt Editor' },
      { type: 'placeholder', label: 'Model Comparison' },
      { type: 'placeholder', label: 'Results Analysis' }
    ],
    challenges: [
      { title: 'Complex Data Workflows', description: 'Managing intricate prompt chains and model evaluation pipelines.' },
      { title: 'Collaboration Features', description: 'Enabling team collaboration on prompt development without version conflicts.' },
      { title: 'LLM Integration', description: 'Building adapters for multiple LLM providers with consistent interfaces.' }
    ],
    techStack: ['React', 'Python', 'LangChain', 'FastAPI', 'TypeScript'],
    nextProject: '007'
  },
  '007': {
    title: 'Project Title',
    number: '007',
    overview: 'Brief overview of the project.',
    description: 'Add your detailed project description here. Explain the context, goals, and key outcomes of the project.',
    mediaItems: [
      { type: 'placeholder', label: 'Project Image 1' },
      { type: 'placeholder', label: 'Project Image 2' },
      { type: 'placeholder', label: 'Project Image 3' }
    ],
    challenges: [
      { title: 'Challenge 1', description: 'Description of first challenge and how it was solved.' },
      { title: 'Challenge 2', description: 'Description of second challenge and how it was solved.' }
    ],
    techStack: ['Stack', 'Tools', 'Technologies'],
    nextProject: '008'
  },
  '008': {
    title: 'Project Title',
    number: '008',
    overview: 'Brief overview of the project.',
    description: 'Add your detailed project description here. Explain the context, goals, and key outcomes of the project.',
    mediaItems: [
      { type: 'placeholder', label: 'Project Image 1' },
      { type: 'placeholder', label: 'Project Image 2' }
    ],
    challenges: [
      { title: 'Challenge 1', description: 'Description of first challenge and how it was solved.' }
    ],
    techStack: ['Stack', 'Tools'],
    nextProject: '009'
  },
  '009': {
    title: 'Project Title',
    number: '009',
    overview: 'Brief overview of the project.',
    description: 'Add your detailed project description here. Explain the context, goals, and key outcomes of the project.',
    mediaItems: [
      { type: 'placeholder', label: 'Project Image 1' }
    ],
    challenges: [],
    techStack: ['Stack', 'Tools'],
    nextProject: '010'
  },
  '010': {
    title: 'Project Title',
    number: '010',
    overview: 'Brief overview of the project.',
    description: 'Add your detailed project description here. Explain the context, goals, and key outcomes of the project.',
    mediaItems: [
      { type: 'placeholder', label: 'Project Image 1' }
    ],
    challenges: [],
    techStack: ['Stack', 'Tools'],
    nextProject: '011'
  },
  '011': {
    title: 'Project Title',
    number: '011',
    overview: 'Brief overview of the project.',
    description: 'Add your detailed project description here. Explain the context, goals, and key outcomes of the project.',
    mediaItems: [
      { type: 'placeholder', label: 'Project Image 1' }
    ],
    challenges: [],
    techStack: ['Stack', 'Tools'],
    nextProject: '012'
  },
  '012': {
    title: 'Project Title',
    number: '012',
    overview: 'Brief overview of the project.',
    description: 'Add your detailed project description here. Explain the context, goals, and key outcomes of the project.',
    mediaItems: [
      { type: 'placeholder', label: 'Project Image 1' }
    ],
    challenges: [],
    techStack: ['Stack', 'Tools'],
    nextProject: '013'
  },
  '013': {
    title: 'Project Title',
    number: '013',
    overview: 'Brief overview of the project.',
    description: 'Add your detailed project description here. Explain the context, goals, and key outcomes of the project.',
    mediaItems: [
      { type: 'placeholder', label: 'Project Image 1' }
    ],
    challenges: [],
    techStack: ['Stack', 'Tools'],
    nextProject: '014'
  },
  '014': {
    title: 'Project Title',
    number: '014',
    overview: 'Brief overview of the project.',
    description: 'Add your detailed project description here. Explain the context, goals, and key outcomes of the project.',
    mediaItems: [
      { type: 'placeholder', label: 'Project Image 1' }
    ],
    challenges: [],
    techStack: ['Stack', 'Tools'],
    nextProject: null
  }
};

// ============================================================
// STATE & DOM ELEMENTS
// ============================================================
let currentProjectId = null;
let currentSlideIndex = 0;
let carouselTrack = null;
let touchStartX = 0;
let touchEndX = 0;

// ============================================================
// INITIALIZATION
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  // Get project ID from URL query params
  const params = new URLSearchParams(window.location.search);
  currentProjectId = params.get('id') || '001';

  // Validate project ID
  if (!projectsData[currentProjectId]) {
    currentProjectId = '001';
  }

  carouselTrack = document.getElementById('carouselTrack');

  // Load project
  loadProject(currentProjectId);

  // Setup carousel
  setupCarousel();

  // Setup navbar scroll effect
  setupNavbarScroll();
});

// ============================================================
// LOAD PROJECT DATA
// ============================================================
function loadProject(projectId) {
  const project = projectsData[projectId];
  if (!project) return;

  // Update header
  document.getElementById('projectNumber').textContent = project.number;
  document.getElementById('projectTitle').textContent = project.title;
  document.getElementById('projectOverview').textContent = project.overview;

  // Update description
  document.getElementById('projectDescription').innerHTML =
    `<p>${project.description}</p>`;

  // Update challenges
  const challengesSection = document.getElementById('challengesSection');
  const challengesContent = document.getElementById('projectChallenges');

  if (challengesSection) {
    if (project.challenges && project.challenges.length > 0) {
      challengesSection.style.display = 'block';
      challengesContent.innerHTML = project.challenges
        .map(
          challenge => `
          <div class="challenge-item">
            <h3>${challenge.title}</h3>
            <p>${challenge.description}</p>
          </div>
        `
        )
        .join('');
    } else {
      challengesSection.style.display = 'none';
    }
  }

  // Update tech stack
  const techStackDiv = document.getElementById('projectTechStack');
  techStackDiv.innerHTML = project.techStack
    .map(tech => `<span class="tech-stack-tag">${tech}</span>`)
    .join('');

  // Setup carousel media
  setupCarouselMedia(project.mediaItems);

  // Setup navigation buttons
  setupProjectNavigation(projectId, project.nextProject);

  // Scroll to top
  window.scrollTo(0, 0);
}

// ============================================================
// CAROUSEL SETUP
// ============================================================
function setupCarouselMedia(mediaItems) {
  currentSlideIndex = 0;

  // Create carousel slides
  carouselTrack.innerHTML = mediaItems
    .map((media, index) => {
      if (media.type === 'image') {
        return `
        <div class="carousel-slide" data-index="${index}">
          <img src="${media.src}" alt="${media.label}" loading="lazy" />
        </div>
      `;
      } else if (media.type === 'video') {
        return `
        <div class="carousel-slide" data-index="${index}">
          <video controls>
            <source src="${media.src}" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      `;
      } else {
        // Placeholder
        return `
        <div class="carousel-slide" data-index="${index}">
          <div class="carousel-slide-placeholder">${media.label}</div>
        </div>
      `;
      }
    })
    .join('');

  // Create indicators
  const indicatorsContainer = document.getElementById('carouselIndicators');
  indicatorsContainer.innerHTML = mediaItems
    .map((_, index) => `<div class="carousel-indicator ${index === 0 ? 'active' : ''}" data-index="${index}"></div>`)
    .join('');

  // Add indicator click handlers
  document.querySelectorAll('.carousel-indicator').forEach(indicator => {
    indicator.addEventListener('click', e => {
      goToSlide(parseInt(e.target.dataset.index));
    });
  });

  // Update carousel position
  updateCarouselPosition();

  // Show/hide arrows based on item count
  const hasMultipleItems = mediaItems.length > 1;
  document.getElementById('carouselPrev').style.display = hasMultipleItems ? 'flex' : 'none';
  document.getElementById('carouselNext').style.display = hasMultipleItems ? 'flex' : 'none';
}

function setupCarousel() {
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const wrapper = document.querySelector('.carousel-wrapper');

  // Arrow navigation
  prevBtn.addEventListener('click', () => previousSlide());
  nextBtn.addEventListener('click', () => nextSlide());

  // Swipe support for mobile
  wrapper.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, false);

  wrapper.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, false);

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') previousSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });
}

function handleSwipe() {
  const diff = touchStartX - touchEndX;
  const threshold = 50;

  if (Math.abs(diff) > threshold) {
    if (diff > 0) {
      nextSlide();
    } else {
      previousSlide();
    }
  }
}

function nextSlide() {
  const slides = carouselTrack.querySelectorAll('.carousel-slide');
  if (currentSlideIndex < slides.length - 1) {
    goToSlide(currentSlideIndex + 1);
  } else {
    goToSlide(0); // Loop to beginning
  }
}

function previousSlide() {
  const slides = carouselTrack.querySelectorAll('.carousel-slide');
  if (currentSlideIndex > 0) {
    goToSlide(currentSlideIndex - 1);
  } else {
    goToSlide(slides.length - 1); // Loop to end
  }
}

function goToSlide(index) {
  currentSlideIndex = index;
  updateCarouselPosition();
  updateIndicators();
}

function updateCarouselPosition() {
  const offset = -currentSlideIndex * 100;
  carouselTrack.style.transform = `translateX(${offset}%)`;
}

function updateIndicators() {
  document.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentSlideIndex);
  });
}

// ============================================================
// PROJECT NAVIGATION (PREV/NEXT PROJECTS)
// ============================================================
function setupProjectNavigation(currentId, nextProjectId) {
  // Find previous project
  const projectIds = Object.keys(projectsData).sort();
  const currentIndex = projectIds.indexOf(currentId);
  const prevProjectId = currentIndex > 0 ? projectIds[currentIndex - 1] : null;

  const prevBtn = document.getElementById('prevProjectBtn');
  const nextBtn = document.getElementById('nextProjectBtn');

  if (prevProjectId) {
    const prevProject = projectsData[prevProjectId];
    prevBtn.href = `project-detail.html?id=${prevProjectId}`;
    document.getElementById('prevProjectTitle').textContent = prevProject.title;
    prevBtn.style.display = 'flex';
  } else {
    prevBtn.style.display = 'none';
  }

  if (nextProjectId && projectsData[nextProjectId]) {
    const nextProject = projectsData[nextProjectId];
    nextBtn.href = `project-detail.html?id=${nextProjectId}`;
    document.getElementById('nextProjectTitle').textContent = nextProject.title;
    nextBtn.style.display = 'flex';
  } else {
    nextBtn.style.display = 'none';
  }
}

// ============================================================
// NAVBAR SCROLL EFFECT
// ============================================================
function setupNavbarScroll() {
  const navbar = document.getElementById('navbar');
  let lastScrollTop = 0;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;

    if (scrollTop > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScrollTop = scrollTop;
  });
}
