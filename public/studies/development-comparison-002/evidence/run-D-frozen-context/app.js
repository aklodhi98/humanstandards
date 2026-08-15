(() => {
  "use strict";

  const STORAGE_KEY = "wattleBayConfirmedBooking";
  const ATTEMPT_KEY = "wattleBayWindowsAttempted";
  const REFERENCE = "WB-HA-0822";
  const COLLECTION_WINDOWS = [
    "Tuesday 18 August, 7:00 am–12:00 pm",
    "Thursday 20 August, 12:00 pm–5:00 pm",
    "Saturday 22 August, 7:00 am–12:00 pm"
  ];

  const state = {
    step: "details",
    details: {
      fullName: "",
      streetAddress: "",
      suburb: "",
      postcode: "",
      email: "",
      mobile: ""
    },
    category: "",
    window: "",
    availability: "idle",
    confirmed: null
  };

  const steps = {
    details: document.querySelector("#details-step"),
    pickup: document.querySelector("#pickup-step"),
    review: document.querySelector("#review-step"),
    confirmed: document.querySelector("#confirmation-step")
  };

  const headings = {
    details: document.querySelector("#details-heading"),
    pickup: document.querySelector("#pickup-heading"),
    review: document.querySelector("#review-heading"),
    confirmed: document.querySelector("#confirmation-status")
  };

  const detailsForm = document.querySelector("#details-form");
  const pickupForm = document.querySelector("#pickup-form");
  const windowLoading = document.querySelector("#window-loading");
  const windowLoadError = document.querySelector("#window-load-error");
  const windowGroup = document.querySelector("#window-group");
  const reviewButton = document.querySelector("#continue-to-review");
  const newBookingDialog = document.querySelector("#new-booking-dialog");
  const newBookingTrigger = document.querySelector("#start-new-booking");
  let loadTimer = null;
  let dialogTrigger = null;

  const fieldRules = {
    fullName: {
      id: "full-name",
      empty: "Enter your full name",
      validate: value => value.trim().length >= 2,
      invalid: "Enter your full name"
    },
    streetAddress: {
      id: "street-address",
      empty: "Enter your street address",
      validate: value => value.trim().length >= 4,
      invalid: "Enter a complete street address"
    },
    suburb: {
      id: "suburb",
      empty: "Enter your suburb",
      validate: value => value.trim().length >= 2,
      invalid: "Enter your suburb"
    },
    postcode: {
      id: "postcode",
      empty: "Enter your postcode",
      validate: value => /^\d{4}$/.test(value.trim()),
      invalid: "Postcode must be exactly 4 digits"
    },
    email: {
      id: "email",
      empty: "Enter your email address",
      validate: value => /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(value.trim()),
      invalid: "Enter an email address in the format name@example.com"
    },
    mobile: {
      id: "mobile",
      empty: "Enter your Australian mobile number",
      validate: value => /^04\d{8}$/.test(value.replace(/\s/g, "")),
      invalid: "Enter 10 digits beginning with 04, with or without spaces"
    }
  };

  function safeGet(storage, key) {
    try { return storage.getItem(key); } catch (_error) { return null; }
  }

  function safeSet(storage, key, value) {
    try { storage.setItem(key, value); return true; } catch (_error) { return false; }
  }

  function safeRemove(storage, key) {
    try { storage.removeItem(key); } catch (_error) { /* Storage can be unavailable. */ }
  }

  function showStep(nextStep, focusTarget = headings[nextStep]) {
    state.step = nextStep;
    Object.entries(steps).forEach(([name, element]) => {
      element.hidden = name !== nextStep;
    });

    const order = ["details", "pickup", "review", "confirmed"];
    const currentIndex = order.indexOf(nextStep);
    document.querySelectorAll("[data-progress]").forEach((item, index) => {
      item.classList.toggle("is-current", index === currentIndex);
      item.classList.toggle("is-complete", index < currentIndex);
      if (index === currentIndex) item.setAttribute("aria-current", "step");
      else item.removeAttribute("aria-current");
    });

    document.title = `${focusTarget === headings.confirmed ? "Booking confirmed" : focusTarget.textContent.trim()} | Wattle Bay Council`;
    requestAnimationFrame(() => {
      focusTarget.focus({ preventScroll: true });
      focusTarget.scrollIntoView({ block: "start", behavior: "auto" });
    });
  }

  function readDetails() {
    Object.keys(fieldRules).forEach(name => {
      state.details[name] = detailsForm.elements[name].value.trim();
    });
  }

  function restoreDetails() {
    Object.entries(state.details).forEach(([name, value]) => {
      detailsForm.elements[name].value = value;
    });
  }

  function validateDetails() {
    readDetails();
    const errors = [];

    Object.entries(fieldRules).forEach(([name, rule]) => {
      const input = document.querySelector(`#${rule.id}`);
      const value = state.details[name];
      let message = "";
      if (!value) message = rule.empty;
      else if (!rule.validate(value)) message = rule.invalid;

      input.toggleAttribute("aria-invalid", Boolean(message));
      const hint = document.querySelector(`#${rule.id}-hint`);
      const describedBy = [hint?.id, message ? `${rule.id}-error` : ""].filter(Boolean).join(" ");
      if (describedBy) input.setAttribute("aria-describedby", describedBy);
      else input.removeAttribute("aria-describedby");
      document.querySelector(`#${rule.id}-error`).textContent = message;
      if (message) errors.push({ id: rule.id, message });
    });

    renderErrorSummary(document.querySelector("#details-error-summary"), errors);
    return errors;
  }

  function renderErrorSummary(summary, errors) {
    const list = summary.querySelector("ul");
    list.replaceChildren();
    errors.forEach(error => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = `#${error.id}`;
      link.textContent = error.message;
      link.addEventListener("click", event => {
        event.preventDefault();
        const target = document.querySelector(`#${error.id}`);
        const focusTarget = target.matches("fieldset") ? target.querySelector("legend") : target;
        focusTarget.focus();
      });
      item.append(link);
      list.append(item);
    });
    summary.hidden = errors.length === 0;
  }

  function startAvailabilityLoad(isRetry = false) {
    if (loadTimer) window.clearTimeout(loadTimer);
    state.availability = "loading";
    windowLoading.hidden = false;
    windowLoadError.hidden = true;
    windowGroup.hidden = true;
    reviewButton.disabled = true;

    loadTimer = window.setTimeout(() => {
      loadTimer = null;
      const attempted = safeGet(sessionStorage, ATTEMPT_KEY) === "yes";
      if (!attempted && !isRetry) {
        safeSet(sessionStorage, ATTEMPT_KEY, "yes");
        state.availability = "error";
        windowLoading.hidden = true;
        windowLoadError.hidden = false;
        if (state.step === "pickup") {
          windowLoadError.focus({ preventScroll: true });
          windowLoadError.scrollIntoView({ block: "center" });
        }
      } else {
        safeSet(sessionStorage, ATTEMPT_KEY, "yes");
        state.availability = "loaded";
        windowLoading.hidden = true;
        windowLoadError.hidden = true;
        windowGroup.hidden = false;
        reviewButton.disabled = false;
        if (isRetry && state.step === "pickup") {
          const legend = windowGroup.querySelector("legend");
          legend.focus({ preventScroll: true });
          legend.scrollIntoView({ block: "center" });
        }
      }
    }, isRetry ? 450 : 650);
  }

  function restoreChoices() {
    if (state.category) {
      const category = pickupForm.querySelector(`input[name="category"][value="${CSS.escape(state.category)}"]`);
      if (category) category.checked = true;
    }
    if (state.window) {
      const windowOption = pickupForm.querySelector(`input[name="window"][value="${CSS.escape(state.window)}"]`);
      if (windowOption) windowOption.checked = true;
    }
  }

  function validatePickup() {
    const selectedCategory = pickupForm.querySelector('input[name="category"]:checked');
    const selectedWindow = pickupForm.querySelector('input[name="window"]:checked');
    state.category = selectedCategory?.value || "";
    state.window = selectedWindow?.value || "";
    const errors = [];

    setGroupError("category", !state.category, "Choose one waste category");
    if (!state.category) errors.push({ id: "category-group", message: "Choose one waste category" });

    if (state.availability === "loaded") {
      setGroupError("window", !state.window, "Choose one collection window");
      if (!state.window) errors.push({ id: "window-group", message: "Choose one collection window" });
    }

    renderErrorSummary(document.querySelector("#pickup-error-summary"), errors);
    return errors;
  }

  function setGroupError(groupName, hasError, message) {
    const fieldset = document.querySelector(`#${groupName}-group`);
    const error = document.querySelector(`#${groupName}-error`);
    error.textContent = hasError ? message : "";
    fieldset.querySelectorAll(".choice-card").forEach(card => card.classList.toggle("is-error", hasError));
    fieldset.toggleAttribute("aria-invalid", hasError);
    if (hasError) fieldset.setAttribute("aria-describedby", `${groupName}-error`);
    else fieldset.removeAttribute("aria-describedby");
  }

  function populateReview() {
    document.querySelector("#review-category").textContent = state.category;
    document.querySelector("#review-window").textContent = state.window;
    document.querySelector("#review-name").textContent = state.details.fullName;
    document.querySelector("#review-address").textContent = formatAddress(state.details);
    document.querySelector("#review-email").textContent = state.details.email;
    document.querySelector("#review-mobile").textContent = state.details.mobile;
  }

  function formatAddress(details) {
    return `${details.streetAddress}, ${details.suburb} ${details.postcode}`;
  }

  function confirmBooking() {
    const booking = {
      reference: REFERENCE,
      details: { ...state.details },
      category: state.category,
      window: state.window
    };
    safeSet(localStorage, STORAGE_KEY, JSON.stringify(booking));
    state.confirmed = booking;
    populateConfirmation(booking);
    showStep("confirmed");
  }

  function populateConfirmation(booking) {
    document.querySelector("#confirmation-reference").textContent = booking.reference;
    document.querySelector("#confirmation-category").textContent = booking.category;
    document.querySelector("#confirmation-window").textContent = booking.window;
    document.querySelector("#confirmation-address").textContent = formatAddress(booking.details);
    document.querySelector("#confirmation-name").textContent = booking.details.fullName;
  }

  function loadConfirmedBooking() {
    const raw = safeGet(localStorage, STORAGE_KEY);
    if (!raw) return false;
    try {
      const booking = JSON.parse(raw);
      const valid = booking && booking.reference === REFERENCE && booking.details &&
        Object.keys(state.details).every(key => typeof booking.details[key] === "string") &&
        ["Furniture", "Whitegoods", "Garden waste"].includes(booking.category) &&
        COLLECTION_WINDOWS.includes(booking.window);
      if (!valid) throw new Error("Invalid saved booking");
      state.confirmed = booking;
      state.details = { ...booking.details };
      state.category = booking.category;
      state.window = booking.window;
      populateConfirmation(booking);
      showStep("confirmed");
      return true;
    } catch (_error) {
      safeRemove(localStorage, STORAGE_KEY);
      return false;
    }
  }

  function clearBooking() {
    safeRemove(localStorage, STORAGE_KEY);
    state.details = { fullName: "", streetAddress: "", suburb: "", postcode: "", email: "", mobile: "" };
    state.category = "";
    state.window = "";
    state.confirmed = null;
    state.availability = "idle";
    detailsForm.reset();
    pickupForm.reset();
    detailsForm.querySelectorAll('[aria-invalid="true"]').forEach(input => input.removeAttribute("aria-invalid"));
    detailsForm.querySelectorAll(".field-error").forEach(error => { error.textContent = ""; });
    document.querySelector("#details-error-summary").hidden = true;
    document.querySelector("#pickup-error-summary").hidden = true;
    setGroupError("category", false, "");
    setGroupError("window", false, "");
    windowGroup.hidden = true;
    windowLoadError.hidden = true;
    windowLoading.hidden = true;
    reviewButton.disabled = true;
    showStep("details");
  }

  detailsForm.addEventListener("submit", event => {
    event.preventDefault();
    const errors = validateDetails();
    if (errors.length) {
      const summary = document.querySelector("#details-error-summary");
      summary.focus();
      summary.scrollIntoView({ block: "start" });
      return;
    }
    showStep("pickup");
    restoreChoices();
    if (state.availability === "idle") startAvailabilityLoad();
  });

  Object.values(fieldRules).forEach(rule => {
    const input = document.querySelector(`#${rule.id}`);
    input.addEventListener("input", () => {
      if (!input.hasAttribute("aria-invalid")) return;
      validateDetails();
    });
  });

  pickupForm.addEventListener("change", event => {
    if (event.target.matches('input[type="radio"]')) {
      state[event.target.name] = event.target.value;
      setGroupError(event.target.name, false, "");
      if (!document.querySelector("#pickup-error-summary").hidden) validatePickup();
    }
  });

  pickupForm.addEventListener("submit", event => {
    event.preventDefault();
    if (state.availability !== "loaded") return;
    const errors = validatePickup();
    if (errors.length) {
      const summary = document.querySelector("#pickup-error-summary");
      summary.focus();
      summary.scrollIntoView({ block: "start" });
      return;
    }
    populateReview();
    showStep("review");
  });

  document.querySelector("#retry-windows").addEventListener("click", () => startAvailabilityLoad(true));
  document.querySelector("#back-to-details").addEventListener("click", () => {
    readDetails();
    showStep("details");
  });
  document.querySelector("#back-to-pickup").addEventListener("click", () => showStep("pickup"));
  document.querySelector("#edit-details").addEventListener("click", () => showStep("details"));
  document.querySelector("#edit-pickup").addEventListener("click", () => showStep("pickup"));
  document.querySelector("#confirm-booking").addEventListener("click", confirmBooking);

  newBookingTrigger.addEventListener("click", () => {
    dialogTrigger = newBookingTrigger;
    newBookingDialog.showModal();
    requestAnimationFrame(() => document.querySelector("#cancel-new-booking").focus());
  });

  newBookingDialog.addEventListener("close", () => {
    if (newBookingDialog.returnValue === "clear") clearBooking();
    else if (dialogTrigger && !dialogTrigger.closest("[hidden]")) dialogTrigger.focus();
    dialogTrigger = null;
  });

  newBookingDialog.addEventListener("click", event => {
    if (event.target === newBookingDialog) newBookingDialog.close("cancel");
  });

  restoreDetails();
  if (!loadConfirmedBooking()) showStep("details");
})();
