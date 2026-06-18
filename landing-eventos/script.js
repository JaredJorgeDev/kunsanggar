(function () {
  const revealItems = document.querySelectorAll(".reveal");
  const checkoutForm = document.getElementById("checkout-form");
  const checkoutStatus = document.getElementById("checkout-status");
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
    const visibleText = normalizeTrackingText(trigger.textContent);
    const ariaLabel = normalizeTrackingText(trigger.getAttribute("aria-label"));
    const title = normalizeTrackingText(trigger.getAttribute("title"));
    const classAndId = normalizeTrackingText(`${trigger.id || ""} ${String(trigger.className || "")}`);
    const textToCheck = `${visibleText} ${ariaLabel} ${title}`;
    const isWhatsAppHref = /(?:wa\.me|whatsapp|api\.whatsapp\.com)/i.test(triggerHref);
    const hasWhatsAppText = /\b(whatsapp|whats)\b/i.test(textToCheck);
    const hasWhatsAppClassOrId = /\bwhatsapp\b/i.test(classAndId);

    if (isWhatsAppHref || hasWhatsAppText || hasWhatsAppClassOrId) {
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

  if (checkoutForm && checkoutStatus) {
    const checkoutEvents = {
      tsa_lung: "TSA Lung | 20 y 21 junio 2026",
      mil_ofrendas: "Mil Ofrendas a Nampar Gyalwa | 26, 27 y 28 junio 2026"
    };

    checkoutForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const submitter = event.submitter;
      const checkoutEvent = submitter?.dataset.checkoutEvent;
      const eventName = checkoutEvents[checkoutEvent];

      checkoutStatus.classList.remove("is-success", "is-error");

      if (!eventName) {
        checkoutStatus.textContent = "Selecciona el evento que quieres comprar.";
        checkoutStatus.classList.add("is-error");
        return;
      }

      if (!checkoutForm.reportValidity()) return;

      const formData = new FormData(checkoutForm);
      const payload = {
        nombre: formData.get("nombre")?.toString().trim(),
        email: formData.get("email")?.toString().trim(),
        telefono: formData.get("telefono")?.toString().trim(),
        evento: checkoutEvent,
        tipo_ticket: formData.get("tipo_ticket")?.toString(),
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
          eventoNombre: eventName,
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
})();
