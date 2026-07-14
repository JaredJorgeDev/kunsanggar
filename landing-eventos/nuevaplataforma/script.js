const form = document.querySelector("#registration-form");
const formMessage = document.querySelector("#form-message");
const accessSelect = document.querySelector("#access");
const sourceField = document.querySelector("#source-field");
const campaignField = document.querySelector("#campaign-field");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

const params = new URLSearchParams(window.location.search);
const campaign = params.get("utm_campaign") || params.get("campaign") || "";
const source = params.get("utm_source") || "landing";
const languageKey = "kunsangLanguage";

if (sourceField) sourceField.value = source;
if (campaignField) campaignField.value = campaign;

const translations = {
  en: {
    "Inicio": "Home",
    "Eventos": "Events",
    "Plataforma": "Platform",
    "Portal": "Portal",
    "Inversión": "Investment",
    "Planeación": "Planning",
    "Contacto": "Contact",
    "Reservar lugar": "Reserve a spot",
    "Ver programa": "View program",
    "Ver propuesta": "View proposal",
    "Ver plataforma": "View platform",
    "Ver inversión": "View investment",
    "Entrar al portal": "Enter portal",
    "Solicitar información": "Request information",
    "Kunsang Gar México · Junio": "Kunsang Gar Mexico · June",
    "Visita del Geshe y enseñanzas Bon.": "Geshe visit and Bön teachings.",
    "Eventos, práctica y comunidad con registro centralizado": "Events, practice and community with centralized registration",
    "Un encuentro íntimo de práctica, filosofía y contemplación. Registro centralizado, cupo cuidado y confirmación automática para que la experiencia empiece con orden.": "An intimate gathering for practice, philosophy and contemplation. Centralized registration, careful capacity control and automatic confirmation so the experience begins with clarity.",
    "Evento -> Registro -> Donativo -> Comunidad": "Event -> Registration -> Donation -> Community",
    "Una presencia espiritual merece una operación clara y respetuosa.": "A spiritual presence deserves clear and respectful operations.",
    "Información clara antes del primer mensaje.": "Clear information before the first message.",
    "Captación ordenada desde el sitio, WhatsApp y formularios.": "Organized intake through the website, WhatsApp and forms.",
    "Confirmaciones, donativos y seguimiento con menos carga manual.": "Confirmations, donations and follow-up with less manual work.",
    "El Geshe": "The Geshe",
    "Un maestro invitado para compartir práctica, escucha y claridad.": "A guest teacher sharing practice, listening and clarity.",
    "Un Geshe es un maestro formado durante años en estudio filosófico, disciplina contemplativa y transmisión oral. Su visita abre un espacio poco común para recibir enseñanzas de manera directa, cercana y respetuosa.": "A Geshe is a teacher trained for years in philosophical study, contemplative discipline and oral transmission. His visit opens a rare space to receive teachings in a direct, close and respectful way.",
    "La propuesta está diseñada para personas con experiencia previa y para quienes se acercan por primera vez: sin solemnidad excesiva, sin presión, con lenguaje humano y una estructura cuidada.": "The experience is designed for people with previous practice and for those approaching for the first time: without excessive solemnity, without pressure, with human language and a careful structure.",
    "Budismo Bon": "Bön Buddhism",
    "Una tradición contemplativa vinculada al cultivo de presencia, compasión y conocimiento interior.": "A contemplative tradition connected to presence, compassion and inner knowledge.",
    "El Bon es una tradición espiritual tibetana con prácticas meditativas, reflexión filosófica y métodos para observar la mente con mayor lucidez. Esta landing evita discursos herméticos: presenta el evento como una experiencia cultural y contemplativa abierta, sobria y accesible.": "Bön is a Tibetan spiritual tradition with meditative practices, philosophical reflection and methods for observing the mind with greater clarity. This page presents the event as an open, sober and accessible cultural and contemplative experience.",
    "Programa": "Program",
    "Tres encuentros de junio para escuchar, practicar y profundizar.": "Three June gatherings to listen, practice and deepen.",
    "6 y 7 Junio": "June 6 and 7",
    "20 y 21 Junio": "June 20 and 21",
    "26, 27 y 28 Junio": "June 26, 27 and 28",
    "Meditación del espacio interior": "Meditation of the Inner Space",
    "Meditación del Espacio Interior": "Meditation of the Inner Space",
    "Tsa Lung": "Tsa Lung",
    "Ritual de las 1000 Ofrendas": "Ritual of the 1000 Offerings",
    "Práctica guiada para cultivar presencia, estabilidad mental y escucha interior desde la tradición Bon.": "Guided practice to cultivate presence, mental stability and inner listening from the Bön tradition.",
    "Sesiones de respiración y movimiento sutil para trabajar energía, atención y equilibrio del cuerpo.": "Breath and subtle movement sessions to work with energy, attention and bodily balance.",
    "Encuentro ritual de práctica colectiva, ofrenda y dedicación para la comunidad de Kunsang Gar México.": "A ritual gathering of collective practice, offering and dedication for the Kunsang Gar Mexico community.",
    "Ubicación: Kunsang Gar México": "Location: Kunsang Gar Mexico",
    "Registrarme": "Register",
    "Entradas": "Tickets",
    "Accesos claros, cupo limitado y pago rastreable.": "Clear access, limited capacity and traceable payment.",
    "Conferencia": "Conference",
    "Fin de semana completo": "Full weekend",
    "Programa completo": "Full program",
    "Elegir acceso": "Choose access",
    "Registro": "Registration",
    "Reserva tu lugar sin saturar WhatsApp.": "Reserve your spot without overloading WhatsApp.",
    "Completa tus datos una sola vez. El sistema puede enviar la información a Google Sheets, activar eventos de Meta Pixel, abrir el pago y preparar mensajes de confirmación.": "Enter your information once. The system can send it to Google Sheets, trigger Meta Pixel events, open payment and prepare confirmation messages.",
    "Nombre completo": "Full name",
    "Correo": "Email",
    "Teléfono / WhatsApp": "Phone / WhatsApp",
    "Tipo de acceso": "Access type",
    "Observaciones": "Notes",
    "Continuar a confirmación": "Continue to confirmation",
    "Al enviar, aceptas recibir información operativa del evento. Sin spam.": "By submitting, you agree to receive operational information about the event. No spam.",
    "Dudas": "Questions",
    "Respuestas antes del mensaje.": "Answers before sending a message.",
    "Automatización": "Automation",
    "La campaña deja de vivir en comentarios y se convierte en un sistema medible.": "The campaign becomes a measurable system instead of living in comments.",
    "WhatsApp de apoyo": "Support WhatsApp",
    "Propuesta única": "Single proposal",
    "Plataforma Digital Kunsang Gar México": "Kunsang Gar Mexico Digital Platform",
    "Inversión total: $15,000 MXN": "Total investment: $15,000 MXN",
    "Una plataforma integral para centralizar eventos, registros, boletos, donativos, miembros, biblioteca privada y administración.": "An integral platform to centralize events, registrations, tickets, donations, members, a private library and administration.",
    "Eventos -> Comunidad -> Enseñanzas -> Donativos": "Events -> Community -> Teachings -> Donations",
    "Una sola plataforma para sostener la operación digital de Kunsang Gar México.": "One platform to support Kunsang Gar Mexico's digital operations.",
    "La etapa de junio se presenta como punto de entrada a una comunidad digital permanente.": "The June stage becomes the entry point to a permanent digital community.",
    "El portal permite mostrar membresía, biblioteca, donativos, recursos y comunicación.": "The portal shows membership, library, donations, resources and communication.",
    "La administración queda planteada para operar eventos, contenidos, usuarios y aportaciones.": "Administration is structured to manage events, content, users and contributions.",
    "Inversión total": "Total investment",
    "Incluye": "Includes",
    "Todo lo necesario para operar una comunidad digital más clara y organizada.": "Everything needed to run a clearer and more organized digital community.",
    "Sitio institucional": "Institutional website",
    "Venta de boletos": "Ticket sales",
    "Donativos": "Donations",
    "Portal de miembros": "Member portal",
    "Biblioteca privada": "Private library",
    "Videos": "Videos",
    "Audios": "Audios",
    "PDFs": "PDFs",
    "Panel administrativo": "Admin panel",
    "Base de datos": "Database",
    "Automatizaciones": "Automations",
    "Capacitación": "Training",
    "Esquema de pago": "Payment plan",
    "Primer pago recibido y saldo distribuido en tres pagos.": "First payment received and remaining balance split into three payments.",
    "Primer pago recibido": "First payment received",
    "Saldo": "Balance",
    "Pago 1": "Payment 1",
    "Pago 2": "Payment 2",
    "Pago 3": "Payment 3",
    "Pago 4": "Payment 4",
    "Recibido": "Received",
    "Mantenimiento mensual opcional": "Optional monthly maintenance",
    "Soporte para mantener viva la plataforma.": "Support to keep the platform active.",
    "Nuevos eventos": "New events",
    "Nuevos contenidos": "New content",
    "Nuevos recursos": "New resources",
    "Ajustes": "Adjustments",
    "Soporte": "Support",
    "Implementación por etapas": "Phased implementation",
    "Base preparada para crecer con la comunidad.": "A base prepared to grow with the community.",
    "La plataforma puede iniciar con registro, contenido, portal y administración, y escalar posteriormente con integraciones de pago, membresías avanzadas y automatizaciones adicionales.": "The platform can begin with registration, content, portal and administration, and later scale with payment integrations, advanced memberships and additional automations.",
    "Siguiente paso": "Next step",
    "Consolidar la operación digital de Kunsang Gar México.": "Consolidate Kunsang Gar Mexico's digital operations.",
    "La plataforma reúne eventos, comunidad, enseñanzas, donativos y administración en una experiencia digital coherente para miembros, asistentes y equipo organizador.": "The platform brings events, community, teachings, donations and administration into a coherent digital experience for members, attendees and the organizing team.",
    "Producto digital": "Digital product",
    "Propuesta de plataforma": "Platform proposal",
    "Una casa digital para el camino de Kunsang Gar México.": "A digital home for the Kunsang Gar Mexico path.",
    "Una experiencia completa, sobria y navegable para presentar al maestro, organizar programas progresivos, sostener eventos, resguardar recursos y acompañar a la comunidad en línea.": "A complete, sober, navigable experience to present the teacher, organize progressive programs, sustain events, protect resources, and accompany the community online.",
    "Ver secciones": "View sections",
    "Demo navegable": "Navigable demo",
    "Plataforma espiritual": "Spiritual platform",
    "Programas": "Programs",
    "Rutas": "Paths",
    "Idiomas": "Languages",
    "Arquitectura": "Architecture",
    "La plataforma no es una landing: es un ecosistema de enseñanza.": "The platform is not a landing page: it is a teaching ecosystem.",
    "El objetivo es ofrecer una estructura comparable en profundidad a plataformas internacionales de práctica: rutas claras, contenidos ordenados, eventos vigentes, perfil privado y una navegación que ayude tanto a personas nuevas como a estudiantes con experiencia.": "The goal is to offer a structure comparable in depth to international practice platforms: clear paths, organized content, active events, private profiles, and navigation that helps both newcomers and experienced students.",
    "Camino Bön": "Bön Path",
    "Puntos de entrada por nivel": "Entry points by level",
    "Rutas de práctica progresivas": "Progressive practice paths",
    "Contexto de linaje y tradición": "Lineage and tradition context",
    "Orientación para nuevos estudiantes": "Orientation for new students",
    "Cursos introductorios y avanzados": "Introductory and advanced courses",
    "Temarios, requisitos y lecciones": "Syllabi, requirements, and lessons",
    "Estados: activo, próximo o privado": "Statuses: active, upcoming, or private",
    "Inscripción y seguimiento": "Registration and follow-up",
    "Calendario vivo": "Live calendar",
    "Eventos online y presenciales": "Online and in-person events",
    "Prácticas abiertas": "Open practices",
    "Registro y comunicación posterior": "Registration and follow-up communication",
    "Maestro": "Teacher",
    "Página dedicada a Geshe Dangsong Namgyal": "Dedicated page for Geshe Dangsong Namgyal",
    "Biografía y trayectoria": "Biography and background",
    "Programas asociados": "Associated programs",
    "Videos y materiales destacados": "Featured videos and materials",
    "Recursos abiertos y privados": "Open and private resources",
    "Filtros por nivel, tema y formato": "Filters by level, topic, and format",
    "Material guardado por usuario": "Saved material by user",
    "Área privada": "Private area",
    "Perfil del estudiante": "Student profile",
    "Progreso y programas inscritos": "Progress and enrolled programs",
    "Historial de eventos": "Event history",
    "Donativos y preferencias": "Donations and preferences",
    "Experiencia propuesta": "Proposed experience",
    "Panel de comunidad": "Community panel",
    "Rutas de práctica": "Practice paths",
    "Programa activo": "Active program",
    "Recursos iniciales": "Initial resources",
    "Flujos privados": "Private flows",
    "Ruta inicial · fundamentos de meditación y orientación al linaje": "Initial path · meditation foundations and lineage orientation",
    "Programa destacado · Mujeres Sagradas de la Gran Perfección": "Featured program · Sacred Women of the Great Perfection",
    "Biblioteca · enseñanzas breves, audios, textos introductorios y recursos privados": "Library · short teachings, audios, introductory texts, and private resources",
    "Comunidad · grupos de práctica, avisos, sesiones periódicas y acompañamiento": "Community · practice groups, notices, periodic sessions, and guidance",
    "Beneficios": "Benefits",
    "Más claridad para Geshe, para la sangha y para el equipo organizador.": "More clarity for Geshe, for the sangha, and for the organizing team.",
    "La plataforma ayuda a que cada enseñanza tenga contexto, continuidad y seguimiento. En vez de rehacer una landing por cada curso, el equipo puede activar programas, publicar eventos, ordenar recursos y guiar a cada persona hacia el siguiente paso.": "The platform helps each teaching have context, continuity, and follow-up. Instead of rebuilding a landing page for every course, the team can activate programs, publish events, organize resources, and guide each person toward the next step.",
    "Navegación editorial con profundidad internacional.": "Editorial navigation with international depth.",
    "Contenido bilingüe demostrativo para presentar la visión a invitados internacionales.": "Demo bilingual content to present the vision to international guests.",
    "Registro, pago externo y comunicación sin saturar canales manuales.": "Registration, external payment, and communication without saturating manual channels.",
    "Base preparada para crecer hacia membresías, biblioteca privada y comunidad.": "A foundation prepared to grow toward memberships, private library, and community.",
    "Demo para presentar": "Demo for presentation",
    "Una plataforma viva para mostrar cómo puede crecer Kunsang Gar México.": "A living platform to show how Kunsang Gar Mexico can grow.",
    "La demo incluye home, programas, eventos, maestro, comunidad, biblioteca, donativos, perfil privado, login simulado, selector de idioma y flujos de inscripción para el curso activo.": "The demo includes home, programs, events, teacher, community, library, donations, private profile, simulated login, language selector, and registration flows for the active course.",
    "Una experiencia integral para comunidad, eventos, donativos, biblioteca privada y enseñanzas.": "An integrated experience for community, events, donations, private library and teachings.",
    "Panel privado": "Private panel",
    "Comunidad activa": "Active community",
    "Miembros": "Members",
    "Recursos": "Resources",
    "Módulos": "Modules",
    "Todo el ecosistema digital en una sola plataforma.": "The entire digital ecosystem in one platform.",
    "Gestión de Eventos": "Event Management",
    "Próximos eventos": "Upcoming events",
    "Registros": "Registrations",
    "Asistentes": "Attendees",
    "Control de cupos": "Capacity control",
    "Donativo único": "One-time donation",
    "Donativo recurrente": "Recurring donation",
    "Historial": "History",
    "Comunidad": "Community",
    "Avisos": "Announcements",
    "Comunicaciones": "Communications",
    "Biblioteca Privada": "Private Library",
    "Materiales": "Materials",
    "Enseñanzas": "Teachings",
    "Cursos": "Courses",
    "Clases": "Classes",
    "Grabaciones": "Recordings",
    "Administración": "Administration",
    "Usuarios": "Users",
    "Contenidos": "Content",
    "Aportaciones": "Contributions",
    "Vista general": "Overview",
    "Panel de administración": "Administration panel",
    "Registros de junio": "June registrations",
    "Cupos disponibles": "Available spots",
    "Recursos privados": "Private resources",
    "Una estructura clara para sostener eventos, comunidad y enseñanzas.": "A clear structure to sustain events, community and teachings.",
    "La experiencia reúne registro, biblioteca, donativos y administración en un flujo ordenado para la comunidad de Kunsang Gar México.": "The experience brings registration, library, donations and administration into an organized flow for the Kunsang Gar Mexico community.",
    "Portal de Comunidad": "Community Portal",
    "Acceso privado para consultar eventos, recursos, donativos, avisos y materiales de la comunidad.": "Private access to review events, resources, donations, announcements and community materials.",
    "Iniciar sesión": "Sign in",
    "Acceso privado": "Private access",
    "Usuario": "User",
    "Contraseña": "Password",
    "Bienvenido a Kunsang Gar México": "Welcome to Kunsang Gar Mexico",
    "Cerrar sesión": "Sign out",
    "Mi membresía": "My membership",
    "Activo": "Active",
    "Estado visible para validar el acceso de cada miembro.": "Visible status to validate each member's access.",
    "Biblioteca": "Library",
    "Enseñanzas grabadas": "Recorded teachings",
    "Audios de meditación": "Meditation audios",
    "PDFs de práctica": "Practice PDFs",
    "Material de estudio": "Study material",
    "Donativo mensual": "Monthly donation",
    "Historial de aportaciones": "Contribution history",
    "Material para práctica personal": "Personal practice material",
    "Guías de preparación": "Preparation guides",
    "Recomendaciones de estudio": "Study recommendations",
    "Contacto con organización": "Contact the organization",
    "Perfil": "Profile",
    "Mi perfil": "My profile",
    "Datos de miembro, preferencias de comunicación e historial de participación.": "Member data, communication preferences and participation history.",
    "Miembros registrados": "Registered members",
    "Donativos pendientes": "Pending donations",
    "Eventos activos": "Active events",
    "Contenido privado": "Private content",
    "Volver arriba": "Back to top",
    "Credenciales incorrectas.": "Incorrect credentials.",
    "Guardando registro...": "Saving registration...",
    "Registro recibido. Te llevaremos al siguiente paso de confirmación.": "Registration received. We will take you to the next confirmation step.",
    "No pudimos guardar el registro. Intenta de nuevo o usa WhatsApp de apoyo.": "We could not save the registration. Try again or use WhatsApp support.",
    "Tu nombre": "Your name",
    "correo@ejemplo.com": "email@example.com",
    "Seleccionar": "Select",
    "Dudas, requerimientos o actividad de interés": "Questions, requirements or activity of interest"
  }
};

const originalTextNodes = new WeakMap();
const originalAttributes = new WeakMap();

function getLanguage() {
  return window.localStorage.getItem(languageKey) || "es";
}

function translateValue(value, language) {
  if (language === "es") return value;
  return translations[language]?.[value] || value;
}

function translatePage(language = getLanguage()) {
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
    const translated = translateValue(trimmed, language);
    node.nodeValue = original.replace(trimmed, translated);
  }

  document.querySelectorAll("[placeholder], [aria-label], [title]").forEach((element) => {
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
}

function setLanguage(language) {
  window.localStorage.setItem(languageKey, language);
  translatePage(language);
}

function updateLanguageControls(language = getLanguage()) {
  document.querySelectorAll("[data-current-language]").forEach((element) => {
    element.textContent = language === "en" ? "🇺🇸" : "🇲🇽";
  });

  document.querySelectorAll("[data-language-option]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.languageOption === language);
  });
}

function createLanguageSwitch() {
  const nav = document.querySelector(".nav");
  if (!nav || document.querySelector(".language-switch")) return;

  const switcher = document.createElement("div");
  switcher.className = "language-switch";
  switcher.innerHTML = `
    <button class="language-current" type="button" aria-label="Cambiar idioma" aria-expanded="false">
      <span data-current-language>🇲🇽</span>
    </button>
    <div class="language-menu" aria-label="Idioma">
      <button class="language-option" type="button" data-language-option="es">🇲🇽 Español</button>
      <button class="language-option" type="button" data-language-option="en">🇺🇸 English</button>
    </div>
  `;

  const menuToggleButton = nav.querySelector(".menu-toggle");
  nav.insertBefore(switcher, menuToggleButton || null);

  const currentButton = switcher.querySelector(".language-current");
  currentButton.addEventListener("click", () => {
    const isOpen = switcher.classList.toggle("is-open");
    currentButton.setAttribute("aria-expanded", String(isOpen));
  });

  switcher.querySelectorAll("[data-language-option]").forEach((button) => {
    button.addEventListener("click", () => {
      setLanguage(button.dataset.languageOption);
      switcher.classList.remove("is-open");
      currentButton.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (event) => {
    if (!switcher.contains(event.target)) {
      switcher.classList.remove("is-open");
      currentButton.setAttribute("aria-expanded", "false");
    }
  });
}

function createLanguageModal() {
  if (window.localStorage.getItem(languageKey) || document.querySelector(".language-modal")) return;

  const modal = document.createElement("section");
  modal.className = "language-modal";
  modal.setAttribute("aria-label", "Seleccionar idioma");
  modal.innerHTML = `
    <div class="language-modal-card">
      <img src="kunsaanglogo.jpg" alt="Kunsang Gar México">
      <p class="eyebrow">Idioma / Language</p>
      <h2>Selecciona tu idioma</h2>
      <p>Choose how you want to view the platform.</p>
      <div class="language-modal-actions">
        <button type="button" data-language-choice="es">🇲🇽 Español</button>
        <button type="button" data-language-choice="en">🇺🇸 English</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  modal.querySelectorAll("[data-language-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      setLanguage(button.dataset.languageChoice);
      modal.hidden = true;
    });
  });
}

createLanguageSwitch();
createLanguageModal();
translatePage(getLanguage());

function track(eventName, payload = {}) {
  if (typeof window.fbq === "function") {
    window.fbq("track", eventName, payload);
  }
}

document.querySelectorAll("[data-track]").forEach((element) => {
  element.addEventListener("click", () => {
    track("Lead", { content_name: element.dataset.track });
  });
});

document.querySelectorAll("[data-ticket]").forEach((button) => {
  button.addEventListener("click", () => {
    if (accessSelect) accessSelect.value = button.dataset.ticket;
    track("InitiateCheckout", { content_name: button.dataset.ticket });
  });
});

document.querySelectorAll("[data-plan]").forEach((button) => {
  button.addEventListener("click", () => {
    track("Lead", {
      content_name: button.dataset.plan,
      status: "plan_interest"
    });
  });
});

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.classList.toggle("is-open", !isOpen);
    navLinks.classList.toggle("is-open", !isOpen);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.classList.remove("is-open");
      navLinks.classList.remove("is-open");
    });
  });
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

function setMessage(text, status) {
  if (!formMessage) return;
  formMessage.textContent = translateValue(text, getLanguage());
  formMessage.className = `form-message ${status ? `is-${status}` : ""}`;
}

function buildPayload() {
  const data = new FormData(form);
  data.set("fecha_registro", new Date().toISOString());
  data.set("url", window.location.href);
  return data;
}

function buildWhatsAppText(formData) {
  const name = formData.get("nombre");
  const access = formData.get("tipo_acceso");
  return [
    "Hola, ya completé mi registro para la visita del Geshe.",
    `Nombre: ${name}`,
    `Acceso: ${access}`,
    "Quedo atento/a a instrucciones de pago y confirmación."
  ].join("\n");
}

async function submitToEndpoint(endpoint, formData) {
  if (!endpoint || endpoint === "PEGA_AQUI_URL_APPS_SCRIPT") {
    return { skipped: true };
  }

  const response = await fetch(endpoint, {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    throw new Error("No se pudo guardar el registro.");
  }

  return response;
}

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector("button[type='submit']");
    const endpoint = form.dataset.endpoint;
    const paymentUrl = form.dataset.paymentUrl;
    const formData = buildPayload();

    submitButton.disabled = true;
    setMessage("Guardando registro...", "");

    try {
      await submitToEndpoint(endpoint, formData);
      track("Lead", {
        content_name: formData.get("tipo_acceso"),
        status: "registration_submitted"
      });

      setMessage("Registro recibido. Te llevaremos al siguiente paso de confirmación.", "success");

      const whatsappUrl = `https://wa.me/520000000000?text=${encodeURIComponent(buildWhatsAppText(formData))}`;
      const nextStep = paymentUrl && paymentUrl !== "PEGA_AQUI_LINK_DE_PAGO" ? paymentUrl : whatsappUrl;

      window.setTimeout(() => {
        window.open(nextStep, "_blank", "noopener,noreferrer");
      }, 700);
    } catch (error) {
      setMessage("No pudimos guardar el registro. Intenta de nuevo o usa WhatsApp de apoyo.", "error");
    } finally {
      submitButton.disabled = false;
    }
  });
}

const portalLoginForm = document.querySelector("#portal-login-form");
const portalGate = document.querySelector(".portal-gate");
const portalDashboard = document.querySelector("#portal-dashboard");
const portalMessage = document.querySelector("#portal-message");
const portalLogout = document.querySelector("#portal-logout");
const portalUser = document.querySelector("#portal-user");
const portalPassword = document.querySelector("#portal-pass");
const loginFocusButton = document.querySelector("[data-login-focus]");
const portalSessionKey = "kunsangPortalSession";

function showPortalDashboard() {
  if (!portalGate || !portalDashboard) return;
  portalGate.hidden = true;
  portalDashboard.hidden = false;
}

function showPortalLogin() {
  if (!portalGate || !portalDashboard) return;
  portalGate.hidden = false;
  portalDashboard.hidden = true;
  if (portalLoginForm) portalLoginForm.reset();
  if (portalMessage) portalMessage.textContent = "";
}

if (window.localStorage.getItem(portalSessionKey) === "active") {
  showPortalDashboard();
}

if (loginFocusButton && portalUser) {
  loginFocusButton.addEventListener("click", () => {
    portalUser.focus();
  });
}

if (portalLoginForm) {
  portalLoginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const user = portalUser ? portalUser.value.trim() : "";
    const password = portalPassword ? portalPassword.value : "";

    if (user === "jared" && password === "jared") {
      window.localStorage.setItem(portalSessionKey, "active");
      showPortalDashboard();
      track("Lead", { content_name: "portal_login" });
      return;
    }

    if (portalMessage) {
      portalMessage.textContent = translateValue("Credenciales incorrectas.", getLanguage());
      portalMessage.className = "form-message is-error";
    }
  });
}

if (portalLogout) {
  portalLogout.addEventListener("click", () => {
    window.localStorage.removeItem(portalSessionKey);
    showPortalLogin();
  });
}
