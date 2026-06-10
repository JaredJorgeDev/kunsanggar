(function () {
  const WHATSAPP_NUMBER = "527752156500";
  const revealItems = document.querySelectorAll(".reveal");
  const form = document.getElementById("lead-form");
  const status = document.getElementById("form-status");
  const checkoutForm = document.getElementById("checkout-form");
  const checkoutStatus = document.getElementById("checkout-status");
  const checkoutEventInput = document.getElementById("checkout-evento");
  const stickyCta = document.querySelector(".mobile-sticky-cta");
  let hasTrackedViewContent = false;
  let lastConversionTrackedAt = 0;

  const trackMetaEvent = (eventType, eventName) => {
    if (typeof window.fbq === "function") {
      window.fbq(eventType, eventName);
      console.log("[Meta Pixel]", eventName);
    }
  };

  const normalizeTrackingText = (value) =>
    String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const trackWhatsAppConversion = () => {
    const now = Date.now();
    if (now - lastConversionTrackedAt < 2000) return;

    lastConversionTrackedAt = now;

    if (typeof window.fbq === "function") {
      window.fbq("trackCustom", "LeadTsaLung");
      console.log("[Meta Pixel] LeadTsaLung");
      window.fbq("trackCustom", "WhatsAppClickTsaLung");
      console.log("[Meta Pixel] WhatsAppClickTsaLung");
    }
  };

  window.addEventListener("load", () => {
    if (hasTrackedViewContent) return;

    hasTrackedViewContent = true;
    trackMetaEvent("track", "ViewContent");
    trackMetaEvent("trackCustom", "ViewContentTsaLung");
  });

  const handleConversionClick = (event) => {
    const trigger = event.target.closest("a, button, [role='button']");
    if (!trigger) return;

    const triggerHref = trigger.getAttribute("href") || "";
    const triggerData = Object.values(trigger.dataset || {}).join(" ");
    const visibleText = normalizeTrackingText(trigger.textContent);
    const ariaLabel = normalizeTrackingText(trigger.getAttribute("aria-label"));
    const title = normalizeTrackingText(trigger.getAttribute("title"));
    const classAndId = normalizeTrackingText(`${trigger.id || ""} ${String(trigger.className || "")}`);
    const dataAttributes = normalizeTrackingText(triggerData);
    const textToCheck = `${visibleText} ${ariaLabel} ${title} ${dataAttributes}`;
    const isWhatsAppHref = /(?:wa\.me|whatsapp|api\.whatsapp\.com)/i.test(triggerHref);
    const hasConversionText = /\b(reservar|inscribirme|quiero asistir|apartar|whatsapp|whats|informacion|informes)\b/i.test(textToCheck);
    const hasConversionClassOrId = /\b(whatsapp|reserva|lead|cta)\b/i.test(classAndId);

    if (hasConversionText || isWhatsAppHref || hasConversionClassOrId) {
      trackWhatsAppConversion();
    }
  };

  document.addEventListener("click", handleConversionClick, true);

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  if (stickyCta) {
    const updateStickyCta = () => {
      stickyCta.classList.toggle("is-visible", window.scrollY > 620);
    };

    updateStickyCta();
    window.addEventListener("scroll", updateStickyCta, { passive: true });
  }

  document.querySelectorAll("details").forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;

      document.querySelectorAll("details").forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });

  if (checkoutForm && checkoutStatus && checkoutEventInput) {
    const checkoutEvents = {
      tsa_lung: {
        name: "TSA Lung | 20 y 21 junio 2026",
        ticket: "tsa_lung"
      },
      mil_ofrendas: {
        name: "Mil Ofrendas a Nampar Gyalwa | 26, 27 y 28 junio 2026",
        ticket: "mil_ofrendas"
      }
    };

    checkoutForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const submitter = event.submitter;
      const checkoutEvent = submitter?.dataset.checkoutEvent;
      const selectedEvent = checkoutEvents[checkoutEvent];

      checkoutStatus.classList.remove("is-success", "is-error");

      if (!selectedEvent) {
        checkoutStatus.textContent = "Selecciona el evento que quieres comprar.";
        checkoutStatus.classList.add("is-error");
        return;
      }

      checkoutEventInput.value = checkoutEvent;

      if (!checkoutForm.reportValidity()) return;

      const formData = new FormData(checkoutForm);
      const payload = {
        nombre: formData.get("nombre")?.toString().trim(),
        email: formData.get("correo")?.toString().trim(),
        telefono: formData.get("telefono")?.toString().trim(),
        evento: checkoutEvent,
        tipo_ticket: formData.get("tipoBoleto")?.toString(),
        cantidad: Number(formData.get("cantidad") || 1)
      };

      trackMetaEvent("track", "InitiateCheckout");
      trackMetaEvent("trackCustom", "InitiateCheckoutTsaLung");

      checkoutStatus.textContent = "Conectando con Mercado Pago...";
      submitter.disabled = true;

      try {
        const response = await fetch("/api/create-preference", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (!response.ok || !result.init_point) {
          throw new Error(result.error || "No fue posible iniciar el pago.");
        }

        sessionStorage.setItem("kunsangCheckout", JSON.stringify({
          ...payload,
          eventoNombre: selectedEvent.name,
          preferenceId: result.preference_id || "",
          externalReference: result.external_reference || "",
          total: result.total_amount || null
        }));

        window.location.href = result.init_point;
      } catch (error) {
        checkoutStatus.textContent = error.message || "No fue posible iniciar el pago. Intenta nuevamente.";
        checkoutStatus.classList.add("is-error");
        submitter.disabled = false;
      }
    });
  }

  if (!form || !status) return;

  const fields = {
    nombre: document.getElementById("nombre"),
    whatsapp: document.getElementById("whatsapp"),
    email: document.getElementById("email"),
    origen: document.getElementById("origen")
  };

  const setFieldState = (field, isValid) => {
    field.closest(".field").classList.toggle("is-invalid", !isValid);
  };

  const validators = {
    nombre: (value) => value.trim().length >= 2,
    whatsapp: (value) => value.replace(/\D/g, "").length >= 10,
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
    origen: (value) => value.trim().length > 0
  };

  Object.entries(fields).forEach(([name, field]) => {
    field.addEventListener("input", () => {
      setFieldState(field, validators[name](field.value));
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    status.classList.remove("is-success", "is-error");

    const invalidField = Object.entries(fields).find(([name, field]) => {
      const isValid = validators[name](field.value);
      setFieldState(field, isValid);
      return !isValid;
    });

    if (invalidField) {
      status.textContent = "Revisa los campos marcados para poder contactarte correctamente.";
      status.classList.add("is-error");
      invalidField[1].focus();
      return;
    }

    const lead = {
      nombre: fields.nombre.value.trim(),
      whatsapp: fields.whatsapp.value.trim(),
      email: fields.email.value.trim(),
      origen: fields.origen.value,
      evento: "TSA Lung",
      fecha: document.getElementById("event-date")?.textContent.trim() || "20 y 21 de junio",
      createdAt: new Date().toISOString()
    };

    localStorage.setItem("tsaLungLead", JSON.stringify(lead));

    const message = [
      "Hola Kunsang Gar México. Quiero recibir información para completar mi registro.",
      "",
      `Nombre: ${lead.nombre}`,
      `WhatsApp: ${lead.whatsapp}`,
      `Correo: ${lead.email}`,
      `Me enteré por: ${lead.origen}`,
      `Evento de interés: ${lead.evento}`
    ].join("\n");

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    trackWhatsAppConversion();

    status.textContent = "Abriendo WhatsApp con tus datos de registro.";
    status.classList.add("is-success");
    form.reset();
    Object.values(fields).forEach((field) => setFieldState(field, true));
    window.open(whatsappUrl, "_blank", "noopener");
  });
})();
