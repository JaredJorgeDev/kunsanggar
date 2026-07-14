(function () {
  const paymentUrl = "https://buy.stripe.com/6oUdR93H804FaNO6eFg7e0t";
  const registrationUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdOD_ifV4J5vuE4DYC9gXBxWS2f3c-aOQyDzdpgb1dcMVLpkw/viewform";
  const savedKey = "kunsangDemoSaved";
  const languageKey = "kunsangDemoLanguage";
  const originalTextNodes = new WeakMap();
  const originalAttributes = new WeakMap();

  const translations = {
    en: {
      "Ir al contenido": "Skip to content",
      "Kunsang Gar México": "Kunsang Gar Mexico",
      "Nosotros": "About",
      "Camino Bön": "Bön Path",
      "Programas": "Programs",
      "Eventos": "Events",
      "Comunidad": "Community",
      "Recursos": "Resources",
      "Donativos": "Donations",
      "Buscar": "Search",
      "Buscar programas, eventos o recursos": "Search programs, events, or resources",
      "Iniciar sesión": "Sign in",
      "Comenzar": "Start",
      "KunsangGar.mx": "KunsangGar.mx",
      "Programas en línea": "Online programs",
      "Encontrar comunidad": "Find community",
      "Apoyar misión": "Support mission",
      "Comunidad de práctica Yungdrung Bön": "Yungdrung Bön practice community",
      "Enseñanzas auténticas para estudiar, practicar y profundizar.": "Authentic teachings to study, practice, and deepen.",
      "Una plataforma digital para reunir programas graduales, eventos en vivo, biblioteca privada, comunidad y acompañamiento de Kunsang Gar México.": "A digital platform bringing together gradual programs, live events, a private library, community, and guidance from Kunsang Gar Mexico.",
      "Programas, sesiones en vivo, recursos privados y comunidad en una experiencia ordenada.": "Programs, live sessions, private resources, and community in an organized experience.",
      "Registro abierto": "Registration open",
      "25 y 26 de julio de 2026 · Zoom · Inglés con traducción al español": "July 25 and 26, 2026 · Zoom · English with Spanish translation",
      "Accesos rápidos": "Quick access",
      "Plataforma integral": "Integral platform",
      "Una forma clara de entrar al camino, sostener la práctica y mantenerse conectado.": "A clear way to enter the path, sustain practice, and stay connected.",
      "Estudia": "Study",
      "Practica": "Practice",
      "Participa": "Participate",
      "Programas organizados por nivel, tema y requisitos.": "Programs organized by level, topic, and requirements.",
      "Sesiones en vivo, recordatorios y recursos para continuidad.": "Live sessions, reminders, and resources for continuity.",
      "Comunidad nacional, eventos, donativos y área privada.": "National community, events, donations, and private area.",
      "Elige tu camino": "Choose your path",
      "Rutas principales": "Main paths",
      "De fundamentos a prácticas profundas, con continuidad y contexto.": "From foundations to profound practices, with continuity and context.",
      "Aprender a practicar": "Learn to practice",
      "Una ruta inicial para comprender postura, respiración, presencia y continuidad.": "An initial path to understand posture, breathing, presence, and continuity.",
      "Comenzar ruta": "Begin path",
      "Estudiar el linaje": "Study the lineage",
      "Contexto, filosofía, historia viva y prácticas esenciales presentadas de forma gradual.": "Context, philosophy, living history, and essential practices presented gradually.",
      "Explorar Bön": "Explore Bön",
      "Profundizar": "Go deeper",
      "Dzogchen, transmisión oral, rituales y enseñanzas con requisitos específicos.": "Dzogchen, oral transmission, rituals, and teachings with specific requirements.",
      "Ver avanzado": "View advanced path",
      "Demo de plataforma": "Platform demo",
      "Un camino vivo de estudio, práctica y transformación interior.": "A living path of study, practice, and inner transformation.",
      "Kunsang Gar México acerca las enseñanzas auténticas de la tradición Yungdrung Bön a personas que desean conocer, practicar y profundizar en este linaje ancestral.": "Kunsang Gar Mexico brings the authentic teachings of the Yungdrung Bön tradition closer to people who wish to learn, practice, and deepen within this ancestral lineage.",
      "Explorar el camino": "Explore the path",
      "Ver próximos eventos": "View upcoming events",
      "Plataforma de práctica": "Practice platform",
      "Programas, sesiones en vivo, recursos privados y comunidad en una experiencia ordenada.": "Programs, live sessions, private resources, and community in an organized experience.",
      "Punto de entrada": "Entry point",
      "Encuentra el punto de entrada adecuado para ti.": "Find the right entry point for you.",
      "Quiero comenzar": "I want to begin",
      "Ya tengo experiencia": "I have experience",
      "Busco profundizar": "I want to go deeper",
      "Recomendación": "Recommendation",
      "Empieza con fundamentos de meditación": "Begin with meditation foundations",
      "Te recomendamos iniciar con postura, respiración, atención y una introducción clara al contexto Bön.": "We recommend starting with posture, breathing, attention, and a clear introduction to the Bön context.",
      "Ver ruta inicial": "View initial path",
      "Profundiza en linaje, práctica y estudio": "Deepen in lineage, practice, and study",
      "Puedes entrar a Introducción al Yungdrung Bön y sostener una práctica semanal con la comunidad.": "You can enter Introduction to Yungdrung Bön and sustain a weekly practice with the community.",
      "Explorar programas": "Explore programs",
      "Ruta avanzada con acompañamiento": "Advanced path with guidance",
      "Para estudiantes con base previa: Tsa Lung, Dzogchen, rituales y enseñanzas con requisitos específicos.": "For students with previous foundations: Tsa Lung, Dzogchen, rituals, and teachings with specific requirements.",
      "Ver camino avanzado": "View advanced path",
      "Rutas de aprendizaje": "Learning paths",
      "Programas progresivos para sostener una práctica real.": "Progressive programs to support real practice.",
      "Inicial": "Beginner",
      "Inicial / intermedio": "Beginner / intermediate",
      "Avanzado": "Advanced",
      "Fundamentos de meditación": "Meditation Foundations",
      "Introducción al Yungdrung Bön": "Introduction to Yungdrung Bön",
      "Camino avanzado": "Advanced Path",
      "Para personas nuevas que necesitan postura, atención, respiración y orientación básica.": "For new students who need posture, attention, breathing, and basic orientation.",
      "Filosofía, linaje, contexto histórico y prácticas esenciales para entrar con claridad.": "Philosophy, lineage, historical context, and essential practices for entering with clarity.",
      "Tsa Lung, Dzogchen, rituales y enseñanzas profundas con requisitos y acompañamiento.": "Tsa Lung, Dzogchen, rituals, and profound teachings with requirements and guidance.",
      "Duración: 4 semanas": "Duration: 4 weeks",
      "Duración: 6 módulos": "Duration: 6 modules",
      "Duración: variable": "Duration: variable",
      "Modalidad: online": "Format: online",
      "Modalidad: híbrida": "Format: hybrid",
      "Modalidad: online y presencial": "Format: online and in person",
      "Próximo paso: sesión introductoria": "Next step: introductory session",
      "Próximo paso: lectura guiada": "Next step: guided reading",
      "Próximo paso: entrevista de orientación": "Next step: orientation interview",
      "Explorar ruta": "Explore path",
      "Programa destacado": "Featured program",
      "Mujeres Sagradas de la Gran Perfección": "Sacred Women of the Great Perfection",
      "Enseñanzas, prácticas mudras y transmisión oral lung del texto raíz Bonpo Dzogchen Esencia del Corazón de la Khandro.": "Teachings, mudra practices, and oral transmission lung from the Bonpo Dzogchen root text Essence of the Heart of the Khandro.",
      "Geshe Dangsong Namgyal": "Geshe Dangsong Namgyal",
      "25 y 26 de julio de 2026": "July 25 and 26, 2026",
      "Inglés con traducción al español": "English with Spanish translation",
      "Ver programa": "View program",
      "Inscribirme": "Register",
      "Pagar en Stripe": "Pay with Stripe",
      "Completar registro": "Complete registration",
      "Ruta relacionada": "Related path",
      "Este programa pertenece al camino avanzado y requiere asistir con respeto por el formato de transmisión oral.": "This program belongs to the advanced path and requires respectful attendance due to the oral transmission format.",
      "Maestro principal": "Main teacher",
      "Maestro": "Teacher",
      "Maestro:": "Teacher:",
      "Maestro de la tradición Yungdrung Bön dedicado a transmitir estudio, práctica contemplativa y enseñanzas profundas con un lenguaje accesible para comunidades internacionales.": "A teacher of the Yungdrung Bön tradition dedicated to transmitting study, contemplative practice, and profound teachings in accessible language for international communities.",
      "Formación monástica y estudio filosófico.": "Monastic training and philosophical study.",
      "Enseñanza en contextos presenciales y digitales.": "Teaching in in-person and digital contexts.",
      "Énfasis en práctica, escucha y continuidad.": "Emphasis on practice, listening, and continuity.",
      "Conocer al maestro": "Meet the teacher",
      "Próximos eventos": "Upcoming events",
      "Encuentros para aprender, practicar y reunirse.": "Gatherings to learn, practice, and meet.",
      "Ver evento": "View event",
      "Experiencia digital": "Digital experience",
      "Funciones pensadas para una comunidad de práctica.": "Features designed for a practice community.",
      "Cursos por niveles": "Courses by level",
      "Rutas organizadas por experiencia y requisitos.": "Paths organized by experience and requirements.",
      "Sesiones en vivo": "Live sessions",
      "Calendario, recordatorios y enlaces de acceso.": "Calendar, reminders, and access links.",
      "Biblioteca privada": "Private library",
      "Videos, audios, PDFs y textos de apoyo.": "Videos, audios, PDFs, and support texts.",
      "Historial y progreso": "History and progress",
      "Participación, guardados, constancias y seguimiento.": "Participation, saved items, certificates, and tracking.",
      "Una comunidad nacional con práctica en línea.": "A national community with online practice.",
      "Grupos de práctica, actividades abiertas, sesiones periódicas y acompañamiento para sostener continuidad.": "Practice groups, open activities, recurring sessions, and guidance to sustain continuity.",
      "Datos demostrativos": "Demo data",
      "Miembros": "Members",
      "Cursos": "Courses",
      "Actividades mensuales": "Monthly activities",
      "Biblioteca para estudiar y practicar con orden.": "A library for organized study and practice.",
      "Enseñanzas breves": "Short teachings",
      "Meditaciones guiadas": "Guided meditations",
      "Textos y preguntas frecuentes": "Texts and frequently asked questions",
      "Donativos": "Donations",
      "Sostener las enseñanzas también es parte de la práctica.": "Sustaining the teachings is also part of practice.",
      "La plataforma contempla donativo único, donativo mensual, apoyo a eventos y becas para estudiantes.": "The platform includes one-time donations, monthly donations, event support, and student scholarships.",
      "Realizar donativo": "Make a donation",
      "Newsletter": "Newsletter",
      "Recibe noticias, enseñanzas y próximos eventos.": "Receive news, teachings, and upcoming events.",
      "Nombre": "Name",
      "Correo": "Email",
      "Tu nombre": "Your name",
      "correo@ejemplo.com": "email@example.com",
      "Suscribirme": "Subscribe",
      "Área privada": "Private area",
      "Aviso de privacidad": "Privacy notice",
      "Inscripción": "Registration",
      "Inscripción demostrativa": "Demo registration",
      "Esta demo muestra el flujo. Para Mujeres Sagradas usa los enlaces reales.": "This demo shows the flow. For Sacred Women, use the real links.",
      "Volver arriba": "Back to top",
      "Guardar": "Save",
      "Guardado": "Saved",
      "Todos": "All",
      "Todos los niveles": "All levels",
      "Todas las modalidades": "All formats",
      "Todos los temas": "All topics",
      "Todos los maestros": "All teachers",
      "Todos los estados": "All statuses",
      "Online": "Online",
      "Híbrido": "Hybrid",
      "Presencial": "In person",
      "Activo": "Active",
      "Próximamente": "Coming soon",
      "Privado": "Private",
      "Abierto": "Open",
      "Video": "Video",
      "Audio": "Audio",
      "PDF": "PDF",
      "Enseñanza": "Teaching",
      "Práctica": "Practice",
      "Meditación": "Meditation",
      "Linaje": "Lineage",
      "Dzogchen": "Dzogchen",
      "Ritual": "Ritual",
      "Modalidad": "Format",
      "Nivel": "Level",
      "Precio": "Price",
      "Donativo": "Donation",
      "Demo de experiencia privada": "Private experience demo",
      "Selecciona tu idioma": "Select your language",
      "Elige cómo quieres ver la demo de plataforma.": "Choose how you want to view the platform demo.",
      "Español": "Spanish",
      "English": "English"
    }
  };

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  const loadJson = async (path) => {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`No fue posible cargar ${path}`);
    return response.json();
  };

  const getLanguage = () => localStorage.getItem(languageKey) || "es";

  const translateValue = (value, language) => {
    if (language === "es") return value;
    return translations[language]?.[value] || value;
  };

  const updateLanguageControls = (language = getLanguage()) => {
    $$("[data-current-language]").forEach((element) => {
      element.textContent = language === "en" ? "🇺🇸 EN" : "🇲🇽 ES";
    });
    $$("[data-language-option]").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.languageOption === language);
    });
  };

  const translatePage = (language = getLanguage()) => {
    document.documentElement.lang = language;

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if (node.parentElement?.closest("script, style, noscript")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (!originalTextNodes.has(node)) originalTextNodes.set(node, node.nodeValue);
      const original = originalTextNodes.get(node);
      const trimmed = original.trim();
      node.nodeValue = original.replace(trimmed, translateValue(trimmed, language));
    }

    $$("[placeholder], [aria-label], [title]").forEach((element) => {
      if (!originalAttributes.has(element)) {
        originalAttributes.set(element, {
          placeholder: element.getAttribute("placeholder"),
          ariaLabel: element.getAttribute("aria-label"),
          title: element.getAttribute("title")
        });
      }
      const original = originalAttributes.get(element);
      if (original.placeholder) element.setAttribute("placeholder", translateValue(original.placeholder, language));
      if (original.ariaLabel) element.setAttribute("aria-label", translateValue(original.ariaLabel, language));
      if (original.title) element.setAttribute("title", translateValue(original.title, language));
    });

    updateLanguageControls(language);
  };

  const setLanguage = (language) => {
    localStorage.setItem(languageKey, language);
    translatePage(language);
  };

  const createLanguageSwitch = () => {
    if ($(".language-switch")) return;
    const target = $(".nav-actions") || $(".nav") || document.body;
    const switcher = document.createElement("div");
    switcher.className = "language-switch";
    switcher.innerHTML = `
      <button class="language-current" type="button" aria-label="Cambiar idioma" aria-expanded="false">
        <span data-current-language>🇲🇽 ES</span>
      </button>
      <div class="language-menu" aria-label="Idioma">
        <button class="language-option" type="button" data-language-option="es">🇲🇽 Español</button>
        <button class="language-option" type="button" data-language-option="en">🇺🇸 English</button>
      </div>
    `;
    target.prepend(switcher);

    const currentButton = $(".language-current", switcher);
    currentButton.addEventListener("click", () => {
      const isOpen = switcher.classList.toggle("is-open");
      currentButton.setAttribute("aria-expanded", String(isOpen));
    });

    $$("[data-language-option]", switcher).forEach((button) => {
      button.addEventListener("click", () => {
        setLanguage(button.dataset.languageOption);
        switcher.classList.remove("is-open");
        currentButton.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", (event) => {
      if (switcher.contains(event.target)) return;
      switcher.classList.remove("is-open");
      currentButton.setAttribute("aria-expanded", "false");
    });
  };

  const createLanguageModal = () => {
    const requestedLanguage = new URLSearchParams(window.location.search).get("lang");
    if (["es", "en"].includes(requestedLanguage)) {
      setLanguage(requestedLanguage);
      return;
    }
    if (localStorage.getItem(languageKey) || $(".language-modal")) return;
    const modal = document.createElement("section");
    modal.className = "language-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", "Seleccionar idioma");
    modal.innerHTML = `
      <div class="language-modal-card">
        <img src="../kunsaanglogo.jpg" alt="Kunsang Gar México">
        <span class="eyebrow">Idioma / Language</span>
        <h2>Selecciona tu idioma</h2>
        <p>Elige cómo quieres ver la demo de plataforma.</p>
        <div class="language-modal-actions">
          <button type="button" data-language-choice="es">🇲🇽 Español</button>
          <button type="button" data-language-choice="en">🇺🇸 English</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    document.body.classList.add("modal-open");

    $$("[data-language-choice]", modal).forEach((button) => {
      button.addEventListener("click", () => {
        setLanguage(button.dataset.languageChoice);
        modal.remove();
        document.body.classList.remove("modal-open");
      });
    });
  };

  const getSaved = () => JSON.parse(localStorage.getItem(savedKey) || "[]");
  const setSaved = (items) => localStorage.setItem(savedKey, JSON.stringify(items));

  const templateMeta = (items) =>
    `<div class="meta-row">${items.filter(Boolean).map((item) => `<span class="pill">${item}</span>`).join("")}</div>`;

  const programCard = (program) => `
    <article class="program-card reveal" data-nivel="${program.nivel}" data-modalidad="${program.modalidad}" data-tema="${program.tema}" data-maestro="${program.maestro}" data-estado="${program.estado}">
      <div class="card-media"><img src="${program.imagen}" alt="Logo de Kunsang Gar México" loading="lazy"></div>
      <span class="label">${program.categoria}</span>
      <h3>${program.titulo}</h3>
      <p>${program.descripcion}</p>
      ${templateMeta([program.nivel, program.modalidad, program.duracion, program.estado])}
      <div class="progress" aria-label="Progreso ${program.progreso}%"><span style="width:${program.progreso}%"></span></div>
      <div class="button-row">
        <a class="btn small secondary" href="programa.html">${program.cta}</a>
        <button class="btn small secondary save-toggle" type="button" data-save="${program.id}">Guardar</button>
      </div>
    </article>
  `;

  const eventCard = (event) => `
    <article class="event-card reveal" data-modalidad="${event.modalidad}" data-tipo="${event.tipo}" data-estado="${event.estado}">
      <span class="label">${event.tipo}</span>
      <h3>${event.titulo}</h3>
      <p>${event.descripcion}</p>
      ${templateMeta([event.fecha, event.modalidad, event.nivel, event.precio])}
      <p><strong>Maestro:</strong> ${event.maestro}</p>
      <div class="button-row">
        <a class="btn small secondary" href="evento.html">Ver evento</a>
        <button class="btn small open-modal" type="button" data-program="${event.titulo}">Inscribirme</button>
      </div>
    </article>
  `;

  const resourceCard = (resource) => `
    <article class="resource-card reveal ${resource.estado === "Privado" ? "locked" : ""}" data-tipo="${resource.tipo}" data-tema="${resource.tema}" data-nivel="${resource.nivel}" data-estado="${resource.estado}">
      <span class="label">${resource.tipo}</span>
      <h3>${resource.titulo}</h3>
      <p>${resource.descripcion}</p>
      ${templateMeta([resource.nivel, resource.tema, resource.duracion, resource.estado])}
      <button class="btn small secondary save-toggle" type="button" data-save="${resource.id}">Guardar</button>
    </article>
  `;

  const populateSelect = (select, values) => {
    if (!select) return;
    const label = select.dataset.label || "Todos";
    select.innerHTML = `<option value="">${label}</option>${[...new Set(values)].sort().map((value) => `<option value="${value}">${value}</option>`).join("")}`;
  };

  const applyFilters = (container, filters) => {
    const cards = $$("[data-nivel], [data-modalidad], [data-tipo]", container);
    cards.forEach((card) => {
      const visible = filters.every(({ key, value }) => !value || card.dataset[key] === value);
      card.hidden = !visible;
    });
  };

  const initPrograms = async () => {
    const grid = $("[data-programs-grid]");
    if (!grid) return;
    const programs = await loadJson("data/programas.json");
    grid.innerHTML = programs.map(programCard).join("");
    populateSelect($("[data-filter='nivel']"), programs.map((item) => item.nivel));
    populateSelect($("[data-filter='modalidad']"), programs.map((item) => item.modalidad));
    populateSelect($("[data-filter='tema']"), programs.map((item) => item.tema));
    populateSelect($("[data-filter='maestro']"), programs.map((item) => item.maestro));
    populateSelect($("[data-filter='estado']"), programs.map((item) => item.estado));
    initSaveButtons();
    initReveal();
    translatePage(getLanguage());
    $$(".program-filter").forEach((filter) => filter.addEventListener("change", () => {
      applyFilters(grid, $$(".program-filter").map((item) => ({ key: item.dataset.filter, value: item.value })));
    }));
  };

  const initEvents = async () => {
    const grid = $("[data-events-grid]");
    if (!grid) return;
    const events = await loadJson("data/eventos.json");
    grid.innerHTML = events.map(eventCard).join("");
    initReveal();
    translatePage(getLanguage());
  };

  const initResources = async () => {
    const grid = $("[data-resources-grid]");
    if (!grid) return;
    const resources = await loadJson("data/recursos.json");
    grid.innerHTML = resources.map(resourceCard).join("");
    populateSelect($("[data-library-filter='tipo']"), resources.map((item) => item.tipo));
    populateSelect($("[data-library-filter='tema']"), resources.map((item) => item.tema));
    populateSelect($("[data-library-filter='nivel']"), resources.map((item) => item.nivel));
    populateSelect($("[data-library-filter='estado']"), resources.map((item) => item.estado));
    initSaveButtons();
    initReveal();
    translatePage(getLanguage());
    $$(".library-filter").forEach((filter) => filter.addEventListener("change", () => {
      applyFilters(grid, $$(".library-filter").map((item) => ({ key: item.dataset.libraryFilter, value: item.value })));
    }));
  };

  const initPathSelector = () => {
    const panel = $("[data-recommendation]");
    if (!panel) return;
    const recommendations = {
      comenzar: {
        title: "Empieza con fundamentos de meditación",
        text: "Te recomendamos iniciar con postura, respiración, atención y una introducción clara al contexto Bön.",
        cta: "Ver ruta inicial"
      },
      experiencia: {
        title: "Profundiza en linaje, práctica y estudio",
        text: "Puedes entrar a Introducción al Yungdrung Bön y sostener una práctica semanal con la comunidad.",
        cta: "Explorar programas"
      },
      profundizar: {
        title: "Ruta avanzada con acompañamiento",
        text: "Para estudiantes con base previa: Tsa Lung, Dzogchen, rituales y enseñanzas con requisitos específicos.",
        cta: "Ver camino avanzado"
      }
    };
    const update = (key) => {
      const item = recommendations[key];
      panel.innerHTML = `<span class="label">Recomendación</span><h3>${item.title}</h3><p>${item.text}</p><a class="btn small secondary" href="programas.html">${item.cta}</a>`;
      $$(".path-option").forEach((button) => button.classList.toggle("is-active", button.dataset.path === key));
      translatePage(getLanguage());
    };
    $$(".path-option").forEach((button) => button.addEventListener("click", () => update(button.dataset.path)));
    update("comenzar");
  };

  const initNavigation = () => {
    const header = $(".site-header");
    const toggle = $(".menu-toggle");
    if (toggle && header) {
      toggle.addEventListener("click", () => {
        const open = header.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(open));
      });
    }
    $$(".nav-item > button").forEach((button) => {
      button.addEventListener("click", () => {
        const item = button.closest(".nav-item");
        const open = item.classList.toggle("is-open");
        button.setAttribute("aria-expanded", String(open));
      });
    });
    document.addEventListener("click", (event) => {
      if (event.target.closest(".nav-item")) return;
      $$(".nav-item").forEach((item) => item.classList.remove("is-open"));
    });
  };

  const initSearch = () => {
    const toggle = $(".search-toggle");
    const bar = $(".search-bar");
    if (!toggle || !bar) return;
    toggle.addEventListener("click", () => {
      const open = bar.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      if (open) $("input", bar)?.focus();
    });
  };

  const initModal = () => {
    const modal = $(".modal");
    if (!modal) return;
    const title = $("[data-modal-title]", modal);
    document.addEventListener("click", (event) => {
      const trigger = event.target.closest(".open-modal");
      if (!trigger) return;
      if (title) title.textContent = trigger.dataset.program || "Inscripción";
      modal.classList.add("is-open");
      document.body.classList.add("modal-open");
    });
    $$(".modal-close", modal).forEach((button) => button.addEventListener("click", () => {
      modal.classList.remove("is-open");
      document.body.classList.remove("modal-open");
    }));
    modal.addEventListener("click", (event) => {
      if (event.target !== modal) return;
      modal.classList.remove("is-open");
      document.body.classList.remove("modal-open");
    });
  };

  const initSaveButtons = () => {
    const saved = getSaved();
    $$(".save-toggle").forEach((button) => {
      const id = button.dataset.save;
      const active = saved.includes(id);
      button.textContent = translateValue(active ? "Guardado" : "Guardar", getLanguage());
      button.classList.toggle("dark", active);
      button.addEventListener("click", () => {
        const current = getSaved();
        const exists = current.includes(id);
        const next = exists ? current.filter((item) => item !== id) : [...current, id];
        setSaved(next);
        button.textContent = translateValue(exists ? "Guardar" : "Guardado", getLanguage());
        button.classList.toggle("dark", !exists);
      });
    });
  };

  const initLogin = () => {
    const form = $("#login-form");
    const message = $("#login-message");
    if (!form || !message) return;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      message.textContent = "Sesión demostrativa iniciada. Redirigiendo al perfil...";
      setTimeout(() => window.location.href = "perfil.html", 650);
    });
    $$(".tab").forEach((tab) => tab.addEventListener("click", () => {
      $$(".tab").forEach((item) => item.classList.remove("is-active"));
      tab.classList.add("is-active");
      message.textContent = tab.dataset.mode === "registro"
        ? "Modo registro demostrativo: no se creará una cuenta real."
        : tab.dataset.mode === "recuperar"
          ? "Modo recuperación demostrativo: no se enviará correo real."
          : "";
    }));
  };

  const initAccordions = () => {
    $$("details").forEach((detail) => {
      detail.addEventListener("toggle", () => {
        if (!detail.open) return;
        $$("details").forEach((other) => {
          if (other !== detail) other.open = false;
        });
      });
    });
  };

  const initReveal = () => {
    const items = $$(".reveal:not(.is-visible)");
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    items.forEach((item) => observer.observe(item));
  };

  const initBackTop = () => {
    const button = $(".back-top");
    if (!button) return;
    const update = () => button.classList.toggle("is-visible", window.scrollY > 520);
    button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    update();
    window.addEventListener("scroll", update, { passive: true });
  };

  const initPaymentLinks = () => {
    $$("[data-stripe]").forEach((link) => {
      link.href = paymentUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    });
    $$("[data-registration]").forEach((link) => {
      link.href = registrationUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    createLanguageSwitch();
    createLanguageModal();
    initNavigation();
    initSearch();
    initPathSelector();
    initPrograms();
    initEvents();
    initResources();
    initModal();
    initSaveButtons();
    initLogin();
    initAccordions();
    initReveal();
    initBackTop();
    initPaymentLinks();
    translatePage(getLanguage());
  });
})();
