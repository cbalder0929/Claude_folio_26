/* shared-ui.js — Light mode + language toggle shared between index and detail pages */

const translations = {
  en: {
    // Nav
    backLabel:            'Back',
    navAbout:             'About',
    navProjects:          'Projects',
    navGallery:           'Gallery',
    navContact:           'Contact',
    lightMode:            'Light Mode',
    // Hero
    heroEyebrow:          'Visual Intelligence Studio',
    heroTitle1:           'Crafting digital',
    heroTitleEm:          'clarity',
    heroTitle2:           'through code',
    heroSubtitle:         'Full-stack engineer and UI architect specialising in immersive, data-driven interfaces that communicate with precision.',
    ctaProjects:          'View Projects',
    ctaContact:           'Get in Touch',
    scroll:               'Scroll',
    // About
    aboutLabel:           'Background',
    aboutTitle:           'Who is Charles?',
    aboutP1:              'I am a Chicago native currently studying Computer Programming at Columbia College Chicago. My passion for technology comes from enjoying the process of building software and solving problems through code. Throughout my studies, I have developed skills in programming, web development, and technology solutions while continuing to explore new areas of software development.',
    aboutP2:              'Alongside my education, I work as a bilingual Sales Consultant at Xfinity, where I help customers find solutions that fit their needs. I also do freelance work assisting small businesses in becoming more technologically and financially literate by helping them adopt software tools, improve their digital workflows, and better understand their business data.',
    aboutP3:              'I enjoy using both my technical and communication skills to help people and businesses grow while continuing to expand my own knowledge in the technology field.',
    stat1:                'Years of experience',
    stat2:                'Products shipped',
    stat3:                'Industries served',
    stat4:                'Iterations committed',
    // Work section
    workLabel:            'Selected Work',
    workTitle:            'Projects &amp; Case Studies',
    showMore:             'Show More Projects',
    showLess:             'Show Less',
    // Project card titles
    card001Title:         'GalloShowdown',
    card002Title:         'Agendi',
    card003Title:         ‘Chess Learning’,
    card004Title:         ‘Craft World’,
    card005Title:         ‘Wordle’,
    card006Title:         ‘FinBot.AI’,
    card007Title:         ‘FinScrape’,
    card008Title:         ‘Bank Parser’,
    card009Title:         ‘Additive Synthesizer’,
    card010Title:         ‘CODE102 Portfolio’,
    card011Title:         ‘Roulette’,
    card012Title:         ‘Odds Of You’,
    card013Title:         ‘Image Analyzer’,
    card014Title:         ‘Doodle.AI’,
    // Project card descriptions
    card001Desc:          ‘A C# and WPF rooster-fighting game where you raise a single gallo from a gift on your 10th birthday into a tournament champion. Six breeds, breeding, training, a shop, and Street Fighter–style 1v1 battles.’,
    card002Desc:          "A Canvas dashboard I built because I was tired of clicking through every class just to see my grades. One page, one list, sorted by what’s due — plus live GPA, professor comments, and deadline alerts.",
    card003Desc:          ‘A desktop app built in C# and WPF using .NET 9 that teaches chess piece movement. Click any piece to view legal moves and captures with color-coded highlights, creating an interactive learning experience.’,
    card004Desc:          'A Minecraft-style crafting and building game with a procedurally explorable forest world and a full item-crafting system.',
    card005Desc:          'A browser-based Wordle clone built in Programming 2 with plain HTML, CSS, and JavaScript. 500-word dictionary, color-coded hints, win/loss tracking, and a share grid — no frameworks, no backend.',
    card006Desc:          'A web app that reads your bank statements and categorizes every transaction automatically. React + FastAPI, with a three-tier pipeline (rules → cache → Claude) so the AI only gets called for merchants it has never seen.',
    card007Desc:          'A hybrid rule-based and local-LLM rebuild of FinBot. FastAPI backend parses statements from Discover, Amex, and Bank of America, categorizes transactions with deterministic rules first, and falls back to a local Ollama model — no paid API required.',
    card008Desc:          'My pride and joy. A Python tool I started when I was prepping taxes by hand and knew there had to be a faster way. Drop in a bank statement PDF, get back a clean, downloadable CSV — runs entirely on your machine.',
    card009Desc:          'A Python program that builds real audio from scratch by stacking sine waves. Type in MIDI notes, pick a timbre (sine, triangle, square, sawtooth), get back a .wav you can download — usable from the browser or the CLI.',
    card010Desc:          'Brief description of the project, its goals, and key outcomes. Add your details here.',
    card011Desc:          'Brief description of the project, its goals, and key outcomes. Add your details here.',
    card012Desc:          'Odds of You is an interactive scrolling website that explores the incredible odds of being born and the opportunities many people have. Through ocean-themed visuals, animations, and powerful statistics, the site encourages users to stop making excuses and become the shark.',
    card013Desc:          'AI Image Analyzer lets users upload an image and see what an AI model thinks it contains. Using a machine learning model trained on millions of images, it predicts the subject and displays a confidence score for its answer.',
    card014Desc:          'Doodle.AI is an interactive drawing app that lets users sketch on a canvas while an AI model guesses what they\'re drawing in real time. Built with ml5.js and DoodleNet, it turns simple doodles into a fun machine learning experience.',
    // View project button
    viewProject:          'View Project',
    // Gallery
    galleryLabel:         'My Lens',
    galleryTitle:         'Gallery',
    gallery1Title:        'Chicago Skyline',
    gallery1Desc:         'The city from the lakefront — Willis Tower cuts through the clouds on a moody afternoon.',
    gallery2Title:        'Cermak–Chinatown L',
    gallery2Desc:         'The Red Line platform stretches south as the Chicago skyline rises to the north.',
    gallery3Title:        'Chicago Street Art',
    gallery3Desc:         'A massive mural of a decorative creature surrounded by tropical foliage, painted across an entire building face.',
    gallery5Title:        'Sunny Afternoon',
    gallery5Desc:         'A brindle pup soaking up the sun by the woodpile on a quiet summer afternoon.',
    gallery6Title:        'Willis Tower Views',
    gallery6Desc:         'Peace sign from the upper floors — the kind of city view that never gets old.',
    gallery7Title:        'The Water Tower',
    gallery7Desc:         'One of the few structures to survive the Great Chicago Fire, still standing watch on the Magnificent Mile.',
    gallery8Title:        'Street Level',
    gallery8Desc:         'Willis Tower looms over the intersection while a vibrant mural adds color to the corner.',
    gallery12Title:       'Michigan Avenue',
    gallery12Desc:        'A yellow convertible heads down Michigan Ave on a green-light afternoon in the city.',
    gallery15Title:       'Portrait',
    gallery15Desc:        'A quiet afternoon between the stacks — glasses on, good vibes only.',
    // Footer
    footerContactKicker:  'Contact',
    footerConnect:        "Let’s connect",
    footerLabelPhone:     'Phone',
    footerLabelEmail:     'Email',
    footerLabelLinkedIn:  'LinkedIn',
    footerLabelGitHub:    'GitHub',
    footerValues:         'Values: Innovation, Resilience, Clarity, etc.',
    footerNavTitle:       'Navigation',
    footerAbout:          'About',
    footerCopy:           '© 2026 — Visual Intelligence Studio',
    footerCraft:          'Crafted with precision',
    // Detail page labels
    projectOverviewLabel: 'Project Overview',
    challengesLabel:      'Challenges',
    techStackLabel:       'Tech Stack',
    prevProjectLabel:     'Previous Project',
    nextProjectLabel:     'Next Project',
  },
  es: {
    // Nav
    backLabel:            'Volver',
    navAbout:             'Acerca',
    navProjects:          'Proyectos',
    navGallery:           'Galería',
    navContact:           'Contacto',
    lightMode:            'Modo Claro',
    // Hero
    heroEyebrow:          'Estudio de Inteligencia Visual',
    heroTitle1:           'Creando claridad',
    heroTitleEm:          'digital',
    heroTitle2:           'a través del código',
    heroSubtitle:         'Ingeniero full-stack y arquitecto de UI especializado en interfaces inmersivas y basadas en datos que comunican con precisión.',
    ctaProjects:          'Ver Proyectos',
    ctaContact:           'Contáctame',
    scroll:               'Desplazar',
    // About
    aboutLabel:           'Trayectoria',
    aboutTitle:           '¿Quién es Charles?',
    aboutP1:              'Soy nativo de Chicago y actualmente estudio Programación de Computadoras en Columbia College Chicago. Mi pasión por la tecnología surge del placer de construir software y resolver problemas a través del código. Durante mis estudios he desarrollado habilidades en programación, desarrollo web y soluciones tecnológicas, mientras continúo explorando nuevas áreas del desarrollo de software.',
    aboutP2:              'Junto a mi educación, trabajo como Consultor de Ventas bilingüe en Xfinity, donde ayudo a los clientes a encontrar soluciones que se adapten a sus necesidades. También hago trabajo freelance ayudando a pequeñas empresas a ser más competentes tecnológica y financieramente, apoyándolas en la adopción de herramientas de software, la mejora de sus flujos de trabajo digitales y la comprensión de sus datos de negocio.',
    aboutP3:              'Disfruto usar mis habilidades técnicas y de comunicación para ayudar a personas y empresas a crecer, mientras continúo expandiendo mi propio conocimiento en el campo tecnológico.',
    stat1:                'Años de experiencia',
    stat2:                'Productos lanzados',
    stat3:                'Industrias atendidas',
    stat4:                'Iteraciones realizadas',
    // Work section
    workLabel:            'Trabajo Selecto',
    workTitle:            'Proyectos y Casos de Estudio',
    showMore:             'Ver Más Proyectos',
    showLess:             'Ver Menos',
    // Project card titles (proper nouns stay the same)
    card001Title:         'GalloShowdown',
    card002Title:         'Agendi',
    card003Title:         'Chess Learning',
    card004Title:         'Craft World',
    card005Title:         'Wordle',
    card006Title:         'FinBot.AI',
    card007Title:         'FinScrape',
    card008Title:         'Bank Parser',
    card009Title:         'Sintetizador Aditivo',
    card010Title:         'Portafolio CODE102',
    card011Title:         'Ruleta',
    card012Title:         'Odds Of You',
    card013Title:         'Analizador de Imágenes',
    card014Title:         'Doodle.AI',
    // Project card descriptions
    card001Desc:          'Un juego de peleas de gallos en C# y WPF donde crías un gallo desde un regalo en tu cumpleaños número 10 hasta convertirlo en campeón de torneo. Seis razas, cría, entrenamiento, tienda y batallas 1v1 estilo Street Fighter.',
    card002Desc:          'Un panel de Canvas que construí porque me cansé de hacer clic en cada clase para ver mis calificaciones. Una página, una lista, ordenada por fecha de entrega — más GPA en vivo, comentarios de profesores y alertas de plazos.',
    card003Desc:          'Una aplicación de escritorio en C# y WPF con .NET 9 que enseña el movimiento de las piezas de ajedrez. Haz clic en cualquier pieza para ver los movimientos legales y capturas con resaltados de colores, creando una experiencia de aprendizaje interactiva.',
    card004Desc:          'Un juego de construcción y crafteo estilo Minecraft con un mundo de bosque explorable y un sistema completo de crafteo de objetos.',
    card005Desc:          'Un clon de Wordle basado en el navegador, construído en Programación 2 con HTML, CSS y JavaScript puro. Diccionario de 500 palabras, pistas con colores, seguimiento de victorias y cuadrícula para compartir — sin frameworks ni backend.',
    card006Desc:          'Una app web que lee tus estados de cuenta bancarios y categoriza cada transacción automáticamente. React + FastAPI, con un pipeline de tres niveles (reglas → caché → Claude) para que la IA solo se llame con comerciantes nuevos.',
    card007Desc:          'Una reconstrucción híbrida de FinBot con reglas y un LLM local. El backend en FastAPI analiza estados de cuenta de Discover, Amex y Bank of America, categoriza las transacciones primero con reglas deterministas y recurre a un modelo local de Ollama — sin necesidad de una API paga.',
    card008Desc:          'Mi orgullo y alegría. Una herramienta en Python que empecé cuando preparaba impuestos a mano. Arrastra un PDF de estado de cuenta y obtén un CSV limpio y descargable — funciona completamente en tu máquina.',
    card009Desc:          'Un programa en Python que genera audio real desde cero apilando ondas sinusoidales. Escribe notas MIDI, elige un timbre y obtén un .wav descargable — usable desde el navegador o la CLI.',
    card010Desc:          'Descripción breve del proyecto, sus objetivos y resultados clave. Añade tus detalles aquí.',
    card011Desc:          'Descripción breve del proyecto, sus objetivos y resultados clave. Añade tus detalles aquí.',
    card012Desc:          'Odds of You es un sitio web interactivo de desplazamiento que explora las increíbles probabilidades de nacer y las oportunidades que muchas personas tienen. A través de visuales temáticos del océano, animaciones y estadísticas poderosas, el sitio anima a los usuarios a dejar de poner excusas y convertirse en el tiburón.',
    card013Desc:          'El Analizador de Imágenes con IA permite a los usuarios subir una imagen y ver qué cree el modelo que contiene. Usando un modelo de aprendizaje automático entrenado con millones de imágenes, predice el sujeto y muestra una puntuación de confianza para su respuesta.',
    card014Desc:          'Doodle.AI es una aplicación de dibujo interactiva que permite a los usuarios esbozar en un lienzo mientras un modelo de IA adivina lo que están dibujando en tiempo real. Construida con ml5.js y DoodleNet, convierte simples garabatos en una divertida experiencia de aprendizaje automático.',
    // View project button
    viewProject:          'Ver Proyecto',
    // Gallery
    galleryLabel:         'Mi Lente',
    galleryTitle:         'Galería',
    gallery1Title:        'Horizonte de Chicago',
    gallery1Desc:         'La ciudad desde el lago — la Torre Willis corta las nubes en una tarde gris.',
    gallery2Title:        'Estación Cermak–Chinatown',
    gallery2Desc:         'El andén de la Línea Roja se extiende hacia el sur con el horizonte de Chicago al fondo.',
    gallery3Title:        'Arte Urbano en Chicago',
    gallery3Desc:         'Un mural gigante de una criatura decorativa entre follaje tropical que cubre toda una fachada.',
    gallery5Title:        'Tarde Soleada',
    gallery5Desc:         'Un perrito descansando al sol junto a la leña en una tranquila tarde de verano.',
    gallery6Title:        'Vistas de la Torre Willis',
    gallery6Desc:         'Señal de paz desde los pisos altos — el tipo de vista de ciudad que nunca cansa.',
    gallery7Title:        'La Torre de Agua',
    gallery7Desc:         'Una de las pocas estructuras que sobrevivió el Gran Incendio de Chicago, aún de guardia en la Magnificent Mile.',
    gallery8Title:        'A Nivel de Calle',
    gallery8Desc:         'La Torre Willis se eleva sobre la intersección mientras un mural vibrante añade color a la esquina.',
    gallery12Title:       'Avenida Michigan',
    gallery12Desc:        'Un convertible amarillo avanza por Michigan Ave en una tarde verde en la ciudad.',
    gallery15Title:       'Retrato',
    gallery15Desc:        'Una tarde tranquila entre los estantes — lentes puestos, buena vibra.',
    // Footer
    footerContactKicker:  'Contacto',
    footerConnect:        'Conectémonos',
    footerLabelPhone:     'Teléfono',
    footerLabelEmail:     'Correo',
    footerLabelLinkedIn:  'LinkedIn',
    footerLabelGitHub:    'GitHub',
    footerValues:         'Valores: Innovación, Resiliencia, Claridad, etc.',
    footerNavTitle:       'Navegación',
    footerAbout:          'Acerca',
    footerCopy:           '© 2026 — Estudio de Inteligencia Visual',
    footerCraft:          'Creado con precisión',
    // Detail page labels
    projectOverviewLabel: 'Descripción del Proyecto',
    challengesLabel:      'Desafíos',
    techStackLabel:       'Tecnologías',
    prevProjectLabel:     'Proyecto Anterior',
    nextProjectLabel:     'Siguiente Proyecto',
  }
};

let currentLang = localStorage.getItem('portfolio.lang') || 'en';

function applyLanguage(lang) {
  const t = translations[lang];
  if (!t) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      el.innerHTML = t[key];
    }
  });

  // Fix light mode button label — the loop above resets it to the default
  // translation key value, so we correct it based on current theme state.
  const lightModeBtn = document.getElementById('lightModeBtn');
  if (lightModeBtn) {
    const lightLabel = lightModeBtn.querySelector('[data-i18n="lightMode"]');
    if (lightLabel) {
      const isLight = document.body.classList.contains('light-mode');
      lightLabel.textContent = isLight
        ? (lang === 'en' ? 'Dark Mode' : 'Modo Oscuro')
        : (lang === 'en' ? 'Light Mode' : 'Modo Claro');
    }
  }
}

(function () {
  // ---- Light mode ----
  const storedLight = localStorage.getItem('portfolio.lightMode');
  let isLightMode = storedLight === 'true';

  if (isLightMode) {
    document.body.classList.add('light-mode');
  }

  const lightModeBtn = document.getElementById('lightModeBtn');
  if (lightModeBtn) {
    if (isLightMode) {
      lightModeBtn.classList.add('active');
      const icon  = lightModeBtn.querySelector('.ctrl-icon');
      const label = lightModeBtn.querySelector('[data-i18n="lightMode"]');
      if (icon)  icon.textContent  = '🌙'; // 🌙
      if (label) label.textContent = currentLang === 'en' ? 'Dark Mode' : 'Modo Oscuro';
    }

    lightModeBtn.addEventListener('click', () => {
      isLightMode = !isLightMode;
      document.body.classList.toggle('light-mode', isLightMode);
      lightModeBtn.classList.toggle('active', isLightMode);
      localStorage.setItem('portfolio.lightMode', isLightMode);

      const icon  = lightModeBtn.querySelector('.ctrl-icon');
      const label = lightModeBtn.querySelector('[data-i18n="lightMode"]');
      if (isLightMode) {
        if (icon)  icon.textContent  = '🌙'; // 🌙
        if (label) label.textContent = currentLang === 'en' ? 'Dark Mode' : 'Modo Oscuro';
      } else {
        if (icon)  icon.textContent  = '☀'; // ☀
        if (label) label.textContent = currentLang === 'en' ? 'Light Mode' : 'Modo Claro';
      }
    });
  }

  // ---- Language toggle ----
  const langBtn   = document.getElementById('langBtn');
  const langLabel = document.getElementById('langLabel');

  if (langBtn) {
    if (currentLang === 'es') {
      langBtn.classList.add('active');
      if (langLabel) langLabel.textContent = 'English';
    }
    applyLanguage(currentLang);

    langBtn.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'es' : 'en';
      localStorage.setItem('portfolio.lang', currentLang);
      applyLanguage(currentLang);
      if (langLabel) langLabel.textContent = currentLang === 'en' ? 'Español' : 'English';
      langBtn.classList.toggle('active', currentLang === 'es');
    });
  }
})();
