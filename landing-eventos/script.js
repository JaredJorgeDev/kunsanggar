(function () {
  const revealItems = document.querySelectorAll(".reveal");
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

  document.querySelectorAll(".checkout-link").forEach((link) => {
    link.addEventListener("click", () => {
      trackMetaEvent("track", "InitiateCheckout");
      trackMetaEvent("trackCustom", "InitiateCheckoutTsaLung");
    });
  });
})();
