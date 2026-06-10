/**
 * PROJECT DETAIL PAGE SCRIPT
 * Handles dynamic project loading, carousel functionality, and navigation
 */

// ============================================================
// PROJECT DATA
// ============================================================
const projectsData = {
  '001': {
    title: 'GalloShowdown',
    number: '001',
    overview: 'A C# and WPF rooster-fighting game about a kid, a prize rooster, and a shot at the tournament.',
    description: "GalloShowdown is a desktop game I built in C# and WPF on .NET 8. You play a young boy whose grandfather gifts him a rooster on his 10th birthday — and from there you train, feed, breed, and battle. Six breeds, each with their own stat profile (the Black is a tank, the Guero is a glass cannon), a Housing screen to manage your stable, and a Street Fighter–style 1v1 battle loop with light and heavy attacks. I leveraged AI hard on this one — Copilot, Codex, and Claude CLI handled most of the build and debug cycles, and ChatGPT generated the artwork. I originally got the idea because I thought it had never been done before; turned out it had, I tried the existing version, it wasn't great, and that gave me the confidence to build my own take. Next step is rebuilding it in Unity and shipping it as a mobile multiplayer game.",
    techStack: ['C#', '.NET 8', 'WPF', 'XAML', 'Claude CLI', 'Codex CLI'],
mediaItems: [
  {
    type: 'video',
    src: 'imgs/GalloShowdownVid - Trim.mp4',
    label: 'Gallo Showdown Demo'
  },
  {
    type: 'video',
    src: 'imgs/GalloShowdownVid.mp4',
    label: 'Real-time Metrics'
  },
  {
    type: 'placeholder',
    label: 'Custom Reports'
  }
],
    challenges: [
      { title: 'Performance at Scale', description: 'Optimizing queries across 2M+ daily active users and billion-row datasets while maintaining sub-200ms latency.' },
      { title: 'Real-time Updates', description: 'Implementing WebSocket connections for live data streaming without overwhelming client resources.' },
      { title: 'Complex Visualizations', description: 'Rendering D3.js visualizations with thousands of data points without frame rate drops.' }
    ],
    nextProject: '002'
  },
  '002': {
    title: 'Agendi',
    number: '002',
    overview: 'A Canvas dashboard I built because clicking through every class just to find my grade was wasting my time.',
    description: 'Agendi is a web app I built when I was first learning what ChatGPT could actually do with code. HTML, CSS, and JavaScript on the front, with a small Node server that uses your Canvas API token to pull your schoolwork into one page: current grades, most recent grades, due dates, teacher comments, GPA, all of it. Built specifically for canvas.colum.edu (Columbia College Chicago). It also runs a scheduler that quietly checks deadlines every 15 minutes and fires alerts at 24 hours out, 3 hours out, and overdue — so I stop missing assignments because I forgot to refresh Canvas. Next steps are user profiles, hardening it for safe public use, and then marketing, user testing, and actually growing it.',
    mediaItems: [
      { type: 'video',  src: 'imgs/AgendiRecording.mp4', label: 'Component Library' },
      { type: 'image', src: 'imgs/AgendiSS.webp', label: 'Storybook UI' },
      { type: 'placeholder', label: 'Token System' }
    ],
    challenges: [
      { title: 'Team Alignment', description: 'Managing 120+ components across three teams with different design languages and requirements.' },
      { title: 'Token Pipeline', description: 'Creating an automated system for syncing design tokens between Figma and code.' },
      { title: 'Scalability', description: 'Ensuring the system scales as new components are added without performance degradation.' }
    ],
    techStack: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'PostgreSQL', 'Canvas API'],
    nextProject: '003'
  },
  '003': {
    title: 'Chess Learning',
    number: '003',
    overview: 'A Windows desktop app that teaches chess piece movement through color-coded move and capture highlights on a live 8×8 board.',
    description: 'Chess Learning is a Windows desktop application built in C# using WPF and .NET 9 to help users learn how chess pieces move. The application displays a standard 8×8 chessboard with all pieces in their starting positions. When a user clicks on a piece, the program highlights every legal move it can make — green squares for valid moves and red squares for capture opportunities. A status bar shows the current player\'s turn and the selected piece, making it easy to follow the game and understand movement rules.\n\nThe project follows the MVVM design pattern, separating the user interface from the game logic. The chess engine is built around an abstract Piece class, with individual classes for pawns, rooks, bishops, knights, queens, and kings. Each piece contains its own movement logic, while a Board class manages piece locations and move validation. The ViewModel handles user interactions, turn tracking, and board highlighting.\n\nThis project was built to strengthen my understanding of object-oriented programming, WPF development, and MVVM architecture. Rather than targeting every advanced chess rule, I focused on building a clean, organized codebase that demonstrates inheritance, polymorphism, data binding, and separation of concerns in a real-world .NET desktop application.',
    mediaItems: [
      { type: 'placeholder', label: 'Chessboard Starting Position' },
      { type: 'placeholder', label: 'Move Highlights' },
      { type: 'placeholder', label: 'Capture Indicators' }
    ],
    challenges: [
      { title: 'Per-Piece Move Logic', description: 'Building an abstract Piece class with six concrete subclasses, each owning its own movement rules while sharing a common validation interface.' },
      { title: 'Two-Color Highlight System', description: 'Designing green-for-move and red-for-capture square highlighting that updates instantly on every click without polluting the ViewModel.' },
      { title: 'MVVM Data Binding', description: 'Keeping the WPF board UI fully in sync with Board and ViewModel state through data binding, avoiding code-behind and maintaining clean separation of concerns.' }
    ],
    techStack: ['C#', 'WPF', '.NET 9', 'XAML', 'MVVM'],
    nextProject: '004'
  },
  '004': {
    title: 'Pulse Health Dashboard',
    number: '004',
    overview: 'Accessible HIPAA-aligned patient vitals interface with configurable alert thresholds.',
    description: 'Pulse is a healthcare dashboard providing real-time patient monitoring for clinical settings. Fully HIPAA compliant, it integrates with HL7 FHIR data streams and includes customizable alert thresholds for different patient conditions.',
    mediaItems: [
      { type: 'placeholder', label: 'Craft World Demo' },
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
    title: 'Wordle',
    number: '005',
    overview: 'A Wordle clone I built in Programming 2 — pure HTML, CSS, and JavaScript, no frameworks, no backend.',
    description: "A browser-based clone of Wordle I built in my Programming 2 class. The goal was simple: stand up a real JavaScript project I could actually deploy and play. You get six guesses to land a random 5-letter word from a ~500-word dictionary, with the usual blue/yellow/gray hints and an on-screen keyboard that colors itself as you go. When the game ends you can copy a spoiler-free emoji grid to share, same as the original. Everything runs from a single `index.html` — no frameworks, no server, no dependencies beyond a Google Font. Next steps would be user profiles, leaderboards, a bigger word list, and additional game modes.",
    mediaItems: [
      { type: 'video', src: 'imgs/wordlevid.mp4', label: 'Wordle Demo' },
      { type: 'image', src: 'imgs/wordleW.webp', label: 'Wordle Screenshot' },
      { type: 'placeholder', label: 'Placeholder' }
    ],
    challenges: [
      { title: 'Conversion Rate Optimization', description: 'Reducing friction in the checkout process while maintaining security and compliance.' },
      { title: 'Performance at Scale', description: 'Serving millions of products with sub-500ms page load times.' },
      { title: 'Inventory Integration', description: 'Real-time sync between frontend and Shopify inventory system.' }
    ],
    techStack: ['HTML', 'CSS', 'JavaScript'],
    nextProject: '006'
  },
  '006': {
    title: 'FinBot.AI',
    number: '006',
    overview: 'Drop in a bank statement, get back a categorized breakdown of where your money went.',
    description: "FinBot.AI is a web app — React on the front, FastAPI on the back — that reads your bank or credit card statements and sorts every transaction into Food, Dining, Transport, Shopping, and so on. You drag in a PDF or CSV, a robot mascot animates while the backend works, and you get back summary cards, category tabs, and a flag on any unusually large charge. The interesting piece is the three-tier categorization pipeline: about 150 popular merchants are hardcoded for instant matches, anything Claude has categorized before is cached locally forever, and only genuinely new merchants get sent to the Claude API. After a couple of uses, almost everything is handled by tiers 1 and 2 — so the AI cost stays near zero. This was V1, and the honest takeaway was the dependency on the Claude API: once I ran out of calls, scalability hit a wall, and the categorization occasionally confused debits and credits. Those limits are exactly why V2 (running locally on Ollama) exists.",
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
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Python', 'FastAPI', 'pdfplumber', 'pandas', 'Claude API'],
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
    title: 'Bank Parser',
    number: '008',
    overview: 'My pride and joy — turn a bank statement PDF into a clean CSV in seconds, entirely on your own machine.',
    description: 'Bank Parser is the Python tool I started when I was working as a tax prep assistant, manually categorizing transactions and knowing there had to be a faster way. So I dove head first into Python and built it. Drag a PDF onto a local web page (FastAPI + a vanilla JS frontend), the parser uses pdfplumber to read every line, pulls out date / description / amount, and gives you back a preview table and a downloadable CSV. You can also upload multiple statements at once and combine them into one file. No accounts, no cloud, nothing leaves your computer. I leveraged AI to get the prototype standing, then came back to refactor, fix the messy formatting quirks every bank has, and add features. Next steps: more debugging, smarter features, potentially deploying it as an app, real user testing, automating more of the workflow, and tightening security.',
    mediaItems: [
      { type: 'image', src: 'imgs/PtVLogo.png', label: 'Bank Parser Logo' },
      { type: 'placeholder', label: 'Placeholder' }
    ],
    challenges: [
      { title: 'Challenge 1', description: 'Description of first challenge and how it was solved.' }
    ],
    techStack: ['Python', 'FastAPI', 'pdfplumber', 'pandas', 'HTML', 'CSS', 'JavaScript'],
    nextProject: '009'
  },
  '009': {
    title: 'Additive Synthesizer',
    number: '009',
    overview: "Turn a list of MIDI notes into a real `.wav` file — built from scratch, no DAW required.",
    description: "I built this one to actually understand how computers make sound, instead of just clicking knobs in a DAW. You give it a list of MIDI notes (0–127, negatives are rests), a tempo in BPM, and an optional timbre — sine, triangle, square, or sawtooth — and it generates a real `.wav` file by stacking sine waves at integer multiples of each note's frequency. That's the \"additive\" in additive synthesis. All the math runs locally in Python via NumPy; there's a Flask web UI with an on-screen piano and presets (Twinkle Twinkle, Ode to Joy, C Major scale) and a CLI version that plays through your speakers directly. No paid APIs, no AI models, no external services — just math turning into sound.",
    mediaItems: [
      { type: 'placeholder', label: 'Project Image 1' }
    ],
    challenges: [],
    techStack: ['Python', 'NumPy', 'Flask', 'soundfile', 'sounddevice', 'HTML', 'JavaScript'],
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
    title: 'Odds Of You',
    number: '012',
    overview: 'A single-page scrollytelling experience that uses an ocean descent as a metaphor for appreciating the odds you\'ve already beaten — and becoming the shark.',
    description: '"Odds of You" is a single-page, scrollytelling web experience created by Charles M. Balderas that uses the metaphor of an ocean descent to frame a motivational narrative around statistics. As the user scrolls, they "dive" from the sunlit surface into progressively darker waters, encountering real-world data at each depth: only 15% of people are born in first-world countries, just 7% have access to higher education, and roughly 27% of college graduates land a job in their field of study. Each statistic is paired with a reflective message urging the reader to appreciate their privileges and take ownership of their success. The visual descent—complete with caustic light shafts, fish schools, marine snow particles, and a depth gauge counting feet—transforms dry numbers into an emotionally resonant journey.</p><p>Technically, the project is built entirely with vanilla HTML, CSS, and JavaScript (no frameworks), leveraging scroll-linked animations, intersection observers, CSS custom properties, and spring-physics-based motion to create a polished, cinematic feel. A continuous depth-grade overlay darkens and cools the color palette as the user scrolls, while mouse-driven parallax on ambient layers adds subtle interactivity. The site is accessibility-conscious, with a prefers-reduced-motion path that disables looping animations while preserving content readability. Typography uses Cormorant Garamond for elegant editorial headlines and JetBrains Mono for the data-driven numerical elements, reinforcing the blend of story and statistics.</p><p>The narrative culminates in the "abyss" section, where a shark emerges as the central metaphor: it survives not through aggression but through relentless forward motion, reading the current, and committing fully. This serves as the project\'s thesis — that in a world of long odds and fierce competition, success belongs to those who adapt and never stop moving.',
    mediaItems: [
      { type: 'placeholder', label: 'Project Image 1' }
    ],
    challenges: [
      { title: 'Scroll-Linked Animation', description: 'Coordinating intersection observers, scroll progress values, and spring-physics motion to produce a cinematic descent without using any animation frameworks.' },
      { title: 'Depth-Grade Visuals', description: 'Building a continuous overlay that darkens and cools the color palette as the user scrolls, while layering caustic light shafts, marine snow particles, and fish schools at the right depth cues.' },
      { title: 'Accessibility', description: 'Implementing a prefers-reduced-motion path that disables looping animations without breaking the narrative or hiding any content.' }
    ],
    techStack: ['HTML', 'CSS', 'JavaScript', 'Intersection Observer API', 'CSS Custom Properties', 'Cormorant Garamond', 'JetBrains Mono'],
    nextProject: '013'
  },
  '013': {
    title: 'Image Analyzer',
    number: '013',
    overview: 'A web application that uses artificial intelligence and machine learning to identify objects, animals, people, and other subjects within an uploaded image — all processed locally in the browser.',
    description: 'The AI Image Analyzer is a web application that uses artificial intelligence and machine learning to identify objects, animals, people, and other subjects within an image. Users can either drag and drop an image or select one from their device, and the application will analyze the picture and provide its best prediction of what it sees. Along with the prediction, the application also displays a confidence score, which indicates how certain the AI model is about its answer.</p><p>At the heart of this project is a pre-trained machine learning model called MobileNet. MobileNet has been trained on millions of images and thousands of different categories, allowing it to recognize a wide variety of objects. Instead of manually programming the application to identify every possible item, the model has learned patterns, shapes, colors, and features from a massive dataset. This allows it to make educated predictions when presented with new images.</p><p>One of the most interesting aspects of this project is that the image analysis happens directly in the user\'s web browser. The uploaded image is not sent to a server for processing. Instead, JavaScript and TensorFlow.js load the machine learning model into the browser, where the image is analyzed locally. This approach helps improve privacy, reduces server costs, and demonstrates the power of modern web technologies.</p><p>The application also includes a user-friendly interface designed to make the experience simple and interactive. A drag-and-drop upload area allows users to quickly submit images, while a progress bar provides feedback as the AI model loads. Once the image has been processed, the results are displayed in a clear and easy-to-read format so users can immediately see the AI\'s prediction and confidence level.</p><p>Developing this project provided hands-on experience with machine learning concepts, JavaScript programming, asynchronous operations, and working with external libraries. It demonstrates how artificial intelligence can be integrated into everyday web applications without requiring expensive hardware or advanced server infrastructure.</p><p>This project highlights the growing role of artificial intelligence in modern technology and shows how machine learning models can be used to solve real-world problems. While the AI is not perfect and may occasionally misidentify an image, it offers an engaging way to explore how computer vision systems interpret and classify visual information.',
    mediaItems: [
      { type: 'placeholder', label: 'Project Image 1' }
    ],
    challenges: [
      { title: 'Client-Side ML', description: 'Loading and running a full machine learning model inside the browser using TensorFlow.js, without any server-side processing.' },
      { title: 'Async Model Loading', description: 'Managing asynchronous operations to load MobileNet and process images while keeping the UI responsive with a live progress indicator.' },
      { title: 'User Experience', description: 'Designing a drag-and-drop interface that feels immediate and clear, surfacing the AI\'s prediction and confidence score in a readable format.' }
    ],
    techStack: ['HTML', 'CSS', 'JavaScript', 'TensorFlow.js', 'MobileNet'],
    nextProject: '014'
  },
  '014': {
    title: 'Doodle.AI',
    number: '014',
    overview: 'An interactive drawing app where users sketch on a canvas and an AI model guesses what they\'re drawing in real time using ml5.js and DoodleNet.',
    description: 'Doodle.AI is an interactive web application that combines creativity with artificial intelligence. Users can draw directly on a browser-based canvas and watch as an AI model analyzes their sketch in real time, making predictions about what it thinks the drawing represents. As the doodle becomes more detailed, the predictions update live along with confidence scores, giving users instant feedback and a fun way to see how machine learning interprets their artwork.</p><p>The project was built using p5.js for the drawing canvas and user interactions, while ml5.js and DoodleNet handle the image recognition. DoodleNet is a pre-trained neural network that has learned to recognize hundreds of common doodles from a large dataset. Every time the user adds a new line to the canvas, the model reevaluates the drawing and generates updated predictions. This creates an engaging experience where users can experiment with different sketches and see how the AI\'s guesses evolve over time.</p><p>To make the application easy and enjoyable to use, I designed a clean interface with tools for changing colors, adjusting brush sizes, and clearing the canvas. The canvas is fully responsive and adapts to different screen sizes, making it accessible on both desktop and mobile devices. The real-time prediction panel keeps users engaged by displaying the AI\'s top guesses and confidence levels as they draw.</p><p>This project was a great way to explore machine learning in a practical and interactive setting. By using ml5.js, which is built on top of TensorFlow.js, I was able to integrate AI directly into the browser without needing a backend server. Doodle.AI demonstrates how modern web technologies and machine learning can work together to create applications that are both educational and entertaining, while giving users a hands-on look at how artificial intelligence recognizes patterns and images.',
    mediaItems: [
      { type: 'placeholder', label: 'Project Image 1' }
    ],
    challenges: [
      { title: 'Real-Time Inference', description: 'Running DoodleNet inference on every canvas update without blocking the UI, keeping predictions feeling instant as the user draws.' },
      { title: 'Canvas & ML Integration', description: 'Bridging p5.js\'s drawing surface with ml5.js so the model always receives a clean snapshot of the current sketch for accurate classification.' },
      { title: 'Responsive Canvas', description: 'Scaling the drawing canvas and tool controls to work cleanly across desktop and mobile screen sizes without distorting the sketch or prediction output.' }
    ],
    techStack: ['HTML', 'CSS', 'JavaScript', 'p5.js', 'ml5.js', 'DoodleNet', 'TensorFlow.js'],
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

  // Re-apply current language so any data-i18n elements stay translated
  if (typeof applyLanguage === 'function') {
    applyLanguage(currentLang);
  }
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
          <video controls muted playsinline webkit-playsinline loop preload="none">
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

  // Auto-play the first slide's video if present
  const firstVideo = carouselTrack.querySelector('.carousel-slide:first-child video');
  if (firstVideo) firstVideo.play().catch(() => {});

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

  // Pause all videos, then play only the active slide's video
  carouselTrack.querySelectorAll('video').forEach(v => v.pause());
  const activeSlide = carouselTrack.querySelector(`.carousel-slide[data-index="${index}"]`);
  if (activeSlide) {
    const video = activeSlide.querySelector('video');
    if (video) video.play().catch(() => {});
  }
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
