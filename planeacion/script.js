const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = Array.from(document.querySelectorAll(".nav-links a"));
const revealItems = document.querySelectorAll(".reveal");
const calendarBoard = document.querySelector("#calendar-board");

const calendarItems = [
  {
    date: "03 Jun",
    format: "Campaña Meta Ads",
    event: "Tsa Lung",
    objective: "Activar descubrimiento con $100 MXN diarios",
    audience: "Meditación, yoga, respiración consciente, budismo y bienestar",
    title: "TSA LUNG - Descubrimiento"
  },
  {
    date: "04 Jun",
    format: "Landing page",
    event: "Tsa Lung",
    objective: "Entregar versión 1 con estructura, evento, formulario y diseño base",
    audience: "Cliente Kunsang Gar",
    title: "Landing TSA Lung V1"
  },
  {
    date: "11 Jun",
    format: "Landing page",
    event: "Tsa Lung",
    objective: "Entregar versión 2 con correcciones, ajustes visuales y contenido",
    audience: "Cliente Kunsang Gar",
    title: "Landing TSA Lung V2"
  },
  {
    date: "17 Jun",
    format: "Campaña Meta Ads",
    event: "Tsa Lung",
    objective: "Activar conversión con $100 MXN diarios",
    audience: "Visitantes de landing, interacciones y reproducciones de video",
    title: "TSA LUNG - Conversión"
  },
  {
    date: "17 Jun",
    format: "Campaña Meta Ads",
    event: "Ritual 1000 Ofrendas",
    objective: "Activar registros con $100 MXN diarios",
    audience: "Budismo, meditación, prácticas contemplativas y comunidad espiritual",
    title: "Ritual de las 1000 Ofrendas"
  },
  {
    date: "18 Jun",
    format: "Landing page",
    event: "Tsa Lung",
    objective: "Publicar versión final e integrar campañas",
    audience: "Públicos 1, 2 y 3",
    title: "Landing TSA Lung final"
  },
  {
    date: "20 Jun",
    format: "Cobertura",
    event: "Tsa Lung",
    objective: "Recolectar fotografía, video corto e historias",
    audience: "Material interno y futuras publicaciones",
    title: "Cobertura TSA Lung"
  },
  {
    date: "23 Jun",
    format: "Landing page",
    event: "Ritual 1000 Ofrendas",
    objective: "Entregar versión 1 con información del retiro, formulario y diseño base",
    audience: "Cliente Kunsang Gar",
    title: "Landing Ritual V1"
  },
  {
    date: "24 Jun",
    format: "Campaña Meta Ads",
    event: "Ambos eventos",
    objective: "Activar remarketing con $100 MXN diarios",
    audience: "Visitantes web, interacciones Meta y reproducciones de video",
    title: "Remarketing General"
  },
  {
    date: "26 Jun",
    format: "Cobertura",
    event: "Ritual 1000 Ofrendas",
    objective: "Recolectar fotografía, video, historias y material para futuras campañas",
    audience: "Material interno y futuras publicaciones",
    title: "Cobertura Ritual"
  },
  {
    date: "30 Jun",
    format: "Landing page",
    event: "Ritual 1000 Ofrendas",
    objective: "Entregar versión 2 con correcciones, ajustes visuales y formulario más claro",
    audience: "Cliente Kunsang Gar",
    title: "Landing Ritual V2"
  },
  {
    date: "07 Jul",
    format: "Landing page",
    event: "Ritual 1000 Ofrendas",
    objective: "Publicar versión final con correcciones finales",
    audience: "Cliente Kunsang Gar",
    title: "Landing Ritual final"
  },
  {
    date: "10 Jul",
    format: "Reporte",
    event: "Ambos eventos",
    objective: "Entregar inversión ejecutada, alcance, clics, registros y recomendaciones",
    audience: "Cliente Kunsang Gar",
    title: "Reporte final"
  }
];

function renderCalendar() {
  if (!calendarBoard) return;

  calendarBoard.innerHTML = calendarItems.map((item) => `
    <article class="calendar-item">
      <div class="calendar-date">
        <strong>${item.date.split(" ")[0]}</strong>
        <span>${item.date.split(" ")[1]}</span>
      </div>
      <h3>${item.title}</h3>
      <div class="calendar-meta">
        <span><strong>Formato:</strong> ${item.format}</span>
        <span><strong>Evento:</strong> ${item.event}</span>
        <span><strong>Objetivo:</strong> ${item.objective}</span>
        <span><strong>Público:</strong> ${item.audience}</span>
      </div>
    </article>
  `).join("");
}

function updateActiveNav() {
  const current = navItems
    .map((link) => {
      const section = document.querySelector(link.getAttribute("href"));
      if (!section) return null;
      return { link, top: section.getBoundingClientRect().top };
    })
    .filter(Boolean)
    .reverse()
    .find((item) => item.top <= 120);

  navItems.forEach((link) => link.classList.toggle("is-active", current?.link === link));
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navItems.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
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

revealItems.forEach((item) => revealObserver.observe(item));

renderCalendar();
updateActiveNav();
window.addEventListener("scroll", updateActiveNav, { passive: true });
