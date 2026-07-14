(function () {
  const paymentUrl = "https://buy.stripe.com/6oUdR93H804FaNO6eFg7e0t";
  const registrationUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdOD_ifV4J5vuE4DYC9gXBxWS2f3c-aOQyDzdpgb1dcMVLpkw/viewform";
  const savedKey = "kunsangDemoSaved";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  const loadJson = async (path) => {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`No fue posible cargar ${path}`);
    return response.json();
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
      button.textContent = active ? "Guardado" : "Guardar";
      button.classList.toggle("dark", active);
      button.addEventListener("click", () => {
        const current = getSaved();
        const exists = current.includes(id);
        const next = exists ? current.filter((item) => item !== id) : [...current, id];
        setSaved(next);
        button.textContent = exists ? "Guardar" : "Guardado";
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
  });
})();
