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
    aboutP1:              "I'm a Computer Programming student at Columbia College Chicago with experience in sales, business operations, and software development.",
    aboutP2:              "I've worked in tax preparation, where I handled client communication, Excel systems, QuickBooks, and business filings, and I currently work in sales where I focus on communication, problem-solving, and closing.",
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
    card003Title:         'NextMove',
    card004Title:         'Craft World',
    card005Title:         'Wordle',
    card006Title:         'FinBot.AI',
    card007Title:         'FinBotV2',
    card008Title:         'Bank Parser',
    card009Title:         'Additive Synthesizer',
    card010Title:         'CODE102 Portfolio',
    card011Title:         'Roulette',
    card012Title:         'Odds Of You',
    card013Title:         'Image Analyzer',
    card014Title:         'Doodle.AI',
    // Project card descriptions
    card001Desc:          'A C# and WPF rooster-fighting game where you raise a single gallo from a gift on your 10th birthday into a tournament champion. Six breeds, breeding, training, a shop, and Street Fighter–style 1v1 battles.',
    card002Desc:          "A Canvas dashboard I built because I was tired of clicking through every class just to see my grades. One page, one list, sorted by what’s due — plus live GPA, professor comments, and deadline alerts.",
    card003Desc:          'Chess Game is a two-player PvP chess application built with C# and XAML, featuring a functional chessboard, piece movement logic, and turn-based gameplay.',
    card004Desc:          'Accessible, HIPAA-aligned patient vitals interface with configurable alert thresholds and integration with HL7 FHIR data streams.',
    card005Desc:          'A browser-based Wordle clone built in Programming 2 with plain HTML, CSS, and JavaScript. 500-word dictionary, color-coded hints, win/loss tracking, and a share grid — no frameworks, no backend.',
    card006Desc:          'A web app that reads your bank statements and categorizes every transaction automatically. React + FastAPI, with a three-tier pipeline (rules → cache → Claude) so the AI only gets called for merchants it has never seen.',
    card007Desc:          'Brief description of the project, its goals, and key outcomes. Add your details here.',
    card008Desc:          'My pride and joy. A Python tool I started when I was prepping taxes by hand and knew there had to be a faster way. Drop in a bank statement PDF, get back a clean, downloadable CSV — runs entirely on your machine.',
    card009Desc:          'A Python program that builds real audio from scratch by stacking sine waves. Type in MIDI notes, pick a timbre (sine, triangle, square, sawtooth), get back a .wav you can download — usable from the browser or the CLI.',
    card010Desc:          'Brief description of the project, its goals, and key outcomes. Add your details here.',
    card011Desc:          'Brief description of the project, its goals, and key outcomes. Add your details here.',
    card012Desc:          'Brief description of the project, its goals, and key outcomes. Add your details here.',
    card013Desc:          'Brief description of the project, its goals, and key outcomes. Add your details here.',
    card014Desc:          'Brief description of the project, its goals, and key outcomes. Add your details here.',
    // View project button
    viewProject:          'View Project',
    // Gallery
    galleryLabel:         'My Lens',
    galleryTitle:         'Gallery',
    gallery1Title:        'Design System Components',
    gallery1Desc:         'Comprehensive UI component library',
    gallery2Title:        'Dashboard Interface',
    gallery2Desc:         'Real-time analytics visualization',
    gallery3Title:        'Mobile Experience',
    gallery3Desc:         'Responsive interface design',
    gallery4Title:        'Data Visualization',
    gallery4Desc:         'Interactive chart systems',
    gallery5Title:        'Brand Guidelines',
    gallery5Desc:         'Cohesive visual language',
    gallery6Title:        'Typography Specimens',
    gallery6Desc:         'Typeface showcase &amp; pairing',
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
    aboutP1:              'Soy estudiante de Programación de Computadoras en Columbia College Chicago con experiencia en ventas, operaciones comerciales y desarrollo de software.',
    aboutP2:              'He trabajado en preparación de impuestos, manejando comunicación con clientes, sistemas de Excel, QuickBooks y trámites empresariales. Actualmente trabajo en ventas, enfocándome en comunicación, resolución de problemas y cierre de negocios.',
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
    card003Title:         'NextMove',
    card004Title:         'Craft World',
    card005Title:         'Wordle',
    card006Title:         'FinBot.AI',
    card007Title:         'FinBotV2',
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
    card003Desc:          'Ajedrez es una aplicación de ajedrez PvP de dos jugadores construida con C# y XAML, con un tablero funcional, lógica de movimiento de piezas y juego por turnos.',
    card004Desc:          'Interfaz de signos vitales de pacientes accesible y alineada con HIPAA, con umbrales de alerta configurables e integración con flujos de datos HL7 FHIR.',
    card005Desc:          'Un clon de Wordle basado en el navegador, construído en Programación 2 con HTML, CSS y JavaScript puro. Diccionario de 500 palabras, pistas con colores, seguimiento de victorias y cuadrícula para compartir — sin frameworks ni backend.',
    card006Desc:          'Una app web que lee tus estados de cuenta bancarios y categoriza cada transacción automáticamente. React + FastAPI, con un pipeline de tres niveles (reglas → caché → Claude) para que la IA solo se llame con comerciantes nuevos.',
    card007Desc:          'Descripción breve del proyecto, sus objetivos y resultados clave. Añade tus detalles aquí.',
    card008Desc:          'Mi orgullo y alegría. Una herramienta en Python que empecé cuando preparaba impuestos a mano. Arrastra un PDF de estado de cuenta y obtén un CSV limpio y descargable — funciona completamente en tu máquina.',
    card009Desc:          'Un programa en Python que genera audio real desde cero apilando ondas sinusoidales. Escribe notas MIDI, elige un timbre y obtén un .wav descargable — usable desde el navegador o la CLI.',
    card010Desc:          'Descripción breve del proyecto, sus objetivos y resultados clave. Añade tus detalles aquí.',
    card011Desc:          'Descripción breve del proyecto, sus objetivos y resultados clave. Añade tus detalles aquí.',
    card012Desc:          'Descripción breve del proyecto, sus objetivos y resultados clave. Añade tus detalles aquí.',
    card013Desc:          'Descripción breve del proyecto, sus objetivos y resultados clave. Añade tus detalles aquí.',
    card014Desc:          'Descripción breve del proyecto, sus objetivos y resultados clave. Añade tus detalles aquí.',
    // View project button
    viewProject:          'Ver Proyecto',
    // Gallery
    galleryLabel:         'Mi Lente',
    galleryTitle:         'Galería',
    gallery1Title:        'Componentes del Sistema de Diseño',
    gallery1Desc:         'Biblioteca de componentes UI completa',
    gallery2Title:        'Interfaz de Panel',
    gallery2Desc:         'Visualización de analíticas en tiempo real',
    gallery3Title:        'Experiencia Móvil',
    gallery3Desc:         'Diseño de interfaz responsiva',
    gallery4Title:        'Visualización de Datos',
    gallery4Desc:         'Sistemas de gráficos interactivos',
    gallery5Title:        'Guía de Marca',
    gallery5Desc:         'Lenguaje visual coherente',
    gallery6Title:        'Muestras Tipográficas',
    gallery6Desc:         'Exhibición y combinación de tipografías',
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
