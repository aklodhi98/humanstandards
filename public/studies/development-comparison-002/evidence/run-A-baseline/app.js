(function () {
  "use strict";

  const STORAGE_KEY = "wattleBayConfirmedBooking";
  const ATTEMPT_KEY = "wattleBayWindowsAttempted";
  const BOOKING_REFERENCE = "WB-260822-0417";

  const categories = [
    { value: "furniture", label: "Furniture", description: "Chairs, tables, sofas and other bulky household furniture." },
    { value: "whitegoods", label: "Whitegoods", description: "Fridges, washing machines and other large household appliances." },
    { value: "garden", label: "Garden waste", description: "Bundled branches, prunings and other bulky green waste." }
  ];

  const windows = [
    { value: "tue-am", day: "Tuesday 18 August", time: "7:00 am–12:00 pm" },
    { value: "thu-pm", day: "Thursday 20 August", time: "12:00 pm–5:00 pm" },
    { value: "sat-am", day: "Saturday 22 August", time: "7:00 am–12:00 pm" }
  ];

  const state = {
    step: "intro",
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
    windowStatus: "idle",
    showNewBookingConfirm: false
  };

  const main = document.getElementById("main-content");
  const progressRegion = document.getElementById("progress-region");
  const brandLink = document.getElementById("brand-link");
  let loadTimer = null;
  let attemptedInMemory = false;

  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const categoryFor = (value) => categories.find((item) => item.value === value);
  const windowFor = (value) => windows.find((item) => item.value === value);

  function readConfirmedBooking() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return null;
      const booking = JSON.parse(stored);
      if (!booking || booking.reference !== BOOKING_REFERENCE || !booking.details) return null;
      return booking;
    } catch (error) {
      return null;
    }
  }

  function progressStep() {
    return { details: 1, options: 2, review: 3 }[state.step] ?? 0;
  }

  function renderProgress() {
    if (state.step === "intro" || state.step === "confirmation") {
      progressRegion.hidden = true;
      progressRegion.innerHTML = "";
      return;
    }

    const current = progressStep();
    const labels = ["Your details", "Pickup choices", "Review", "Confirmation"];
    progressRegion.hidden = false;
    progressRegion.innerHTML = `
      <div class="progress-inner">
        <p class="progress-label">Booking progress</p>
        <ol class="progress-list" aria-label="Booking progress">
          ${labels.map((label, index) => {
            const number = index + 1;
            const status = number < current ? "is-complete" : number === current ? "is-current" : "";
            const currentText = number === current ? ' aria-current="step"' : "";
            return `<li class="${status}"${currentText}><span class="step-number" aria-hidden="true"><span>${number}</span></span><span>${label}</span></li>`;
          }).join("")}
        </ol>
      </div>`;
  }

  function setStep(step, options = {}) {
    state.step = step;
    if (loadTimer) {
      clearTimeout(loadTimer);
      loadTimer = null;
    }
    render();
    if (step === "options" && state.windowStatus === "idle") {
      loadWindows();
    }
    if (options.focus !== false) {
      requestAnimationFrame(() => {
        const heading = document.getElementById("page-heading");
        if (heading) heading.focus({ preventScroll: true });
        window.scrollTo({ top: 0, behavior: "auto" });
      });
    }
  }

  function render() {
    renderProgress();
    if (state.step === "intro") renderIntro();
    if (state.step === "details") renderDetails();
    if (state.step === "options") renderOptions();
    if (state.step === "review") renderReview();
    if (state.step === "confirmation") renderConfirmation();
  }

  function renderIntro() {
    document.title = "Book a hard-waste pickup | Wattle Bay Council";
    main.innerHTML = `
      <section class="page-panel">
        <div class="page-body intro-grid">
          <div>
            <p class="eyebrow">One-off residential collection</p>
            <h1 id="page-heading" tabindex="-1">Book a hard-waste pickup</h1>
            <p class="lead">Choose a collection window for one load of bulky household waste from your Wattle Bay address.</p>
            <p class="intro-note">This demonstration takes about 3 minutes. You can review everything before confirming.</p>
            <div class="notice">
              <span class="notice-mark" aria-hidden="true">i</span>
              <p>Place items just inside your property boundary no earlier than the evening before your collection window.</p>
            </div>
            <button class="button" type="button" id="start-booking">Start booking <span aria-hidden="true">→</span></button>
          </div>
          <aside class="info-card" aria-labelledby="need-heading">
            <h2 id="need-heading">What you’ll need</h2>
            <ul>
              <li>Your Wattle Bay street address</li>
              <li>An email address and Australian mobile number</li>
              <li>The type of waste you want collected</li>
              <li>A preferred collection window</li>
            </ul>
          </aside>
        </div>
      </section>`;
    document.getElementById("start-booking").addEventListener("click", () => setStep("details"));
  }

  function fieldMarkup({ id, label, type = "text", autocomplete, inputmode, hint, fieldClass = "", maxlength }) {
    const value = escapeHtml(state.details[id]);
    const describedBy = [hint ? `${id}-hint` : "", `${id}-error`].filter(Boolean).join(" ");
    return `
      <div class="field ${fieldClass}">
        <label for="${id}">${label}</label>
        ${hint ? `<span class="field-hint" id="${id}-hint">${hint}</span>` : ""}
        <input id="${id}" name="${id}" type="${type}" value="${value}" autocomplete="${autocomplete}"${inputmode ? ` inputmode="${inputmode}"` : ""}${maxlength ? ` maxlength="${maxlength}"` : ""} aria-describedby="${describedBy}" aria-invalid="false" required>
        <p class="field-error" id="${id}-error" hidden></p>
      </div>`;
  }

  function renderDetails() {
    document.title = "Your details | Hard-waste pickup";
    main.innerHTML = `
      <section class="page-panel">
        <div class="page-body">
          <div class="form-heading">
            <p class="eyebrow">Step 1 of 4</p>
            <h1 id="page-heading" tabindex="-1">Your details</h1>
            <p>Tell us who the booking is for and where the items will be collected.</p>
          </div>
          <div id="error-summary" class="error-summary" tabindex="-1" role="alert" hidden></div>
          <p class="required-note">All fields are required.</p>
          <form id="details-form" novalidate>
            <div class="form-grid">
              ${fieldMarkup({ id: "fullName", label: "Full name", autocomplete: "name", fieldClass: "field-wide" })}
              ${fieldMarkup({ id: "streetAddress", label: "Street address", autocomplete: "street-address", hint: "For example, 12 Banksia Street", fieldClass: "field-wide" })}
              ${fieldMarkup({ id: "suburb", label: "Suburb", autocomplete: "address-level2" })}
              ${fieldMarkup({ id: "postcode", label: "Postcode", autocomplete: "postal-code", inputmode: "numeric", hint: "4 digits", maxlength: 4 })}
              ${fieldMarkup({ id: "email", label: "Email address", type: "email", autocomplete: "email", inputmode: "email" })}
              ${fieldMarkup({ id: "mobile", label: "Mobile number", type: "tel", autocomplete: "tel", inputmode: "tel", hint: "Australian mobile, for example 0412 345 678", maxlength: 12 })}
            </div>
            <div class="button-row">
              <button class="button" type="submit">Continue to pickup choices <span aria-hidden="true">→</span></button>
              <button class="text-button" type="button" id="back-intro">Back</button>
            </div>
          </form>
        </div>
      </section>`;

    const form = document.getElementById("details-form");
    Object.keys(state.details).forEach((id) => {
      document.getElementById(id).addEventListener("input", (event) => {
        state.details[id] = event.target.value;
      });
    });
    form.addEventListener("submit", handleDetailsSubmit);
    document.getElementById("back-intro").addEventListener("click", () => setStep("intro"));
  }

  function detailErrors() {
    const details = state.details;
    const errors = {};
    if (!details.fullName.trim()) errors.fullName = "Enter your full name.";
    if (!details.streetAddress.trim()) errors.streetAddress = "Enter your street address.";
    if (!details.suburb.trim()) errors.suburb = "Enter your suburb.";
    if (!details.postcode.trim()) errors.postcode = "Enter your postcode.";
    else if (!/^\d{4}$/.test(details.postcode.trim())) errors.postcode = "Postcode must be exactly 4 digits.";
    if (!details.email.trim()) errors.email = "Enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(details.email.trim())) errors.email = "Enter an email address in the format name@example.com.";
    const mobileDigits = details.mobile.replace(/\s/g, "");
    if (!details.mobile.trim()) errors.mobile = "Enter your mobile number.";
    else if (!/^04\d{8}$/.test(mobileDigits)) errors.mobile = "Enter 10 digits beginning with 04, with or without spaces.";
    return errors;
  }

  function handleDetailsSubmit(event) {
    event.preventDefault();
    const errors = detailErrors();
    const summary = document.getElementById("error-summary");
    const labels = {
      fullName: "Full name",
      streetAddress: "Street address",
      suburb: "Suburb",
      postcode: "Postcode",
      email: "Email address",
      mobile: "Mobile number"
    };

    Object.keys(state.details).forEach((id) => {
      const input = document.getElementById(id);
      const error = document.getElementById(`${id}-error`);
      const message = errors[id] || "";
      input.setAttribute("aria-invalid", message ? "true" : "false");
      error.textContent = message;
      error.hidden = !message;
    });

    if (Object.keys(errors).length) {
      summary.hidden = false;
      summary.innerHTML = `
        <h2>Check the details below</h2>
        <ul>${Object.entries(errors).map(([id, message]) => `<li><a href="#${id}">${labels[id]}: ${escapeHtml(message)}</a></li>`).join("")}</ul>`;
      summary.focus();
      return;
    }

    summary.hidden = true;
    setStep("options");
  }

  function categoryChoices() {
    return categories.map((item) => `
      <div class="choice">
        <input type="radio" name="category" id="category-${item.value}" value="${item.value}"${state.category === item.value ? " checked" : ""}>
        <label for="category-${item.value}">
          <span class="choice-title">${item.label}</span>
          <span class="choice-description">${item.description}</span>
        </label>
      </div>`).join("");
  }

  function windowsMarkup() {
    if (state.windowStatus === "loading") {
      return `
        <div class="loading-panel" role="status" aria-live="polite">
          <strong>Loading available collection windows…</strong>
          <span class="loading-line" aria-hidden="true"></span>
          <span class="loading-line short" aria-hidden="true"></span>
        </div>`;
    }
    if (state.windowStatus === "error") {
      return `
        <div class="load-error" id="window-load-error" role="alert" tabindex="-1">
          <h3>We couldn’t load collection windows</h3>
          <p>Your details and waste category are still here. Try loading the windows again.</p>
          <button class="button" type="button" id="retry-windows">Retry</button>
        </div>`;
    }
    if (state.windowStatus === "ready") {
      return `
        <fieldset id="window-group" aria-describedby="window-help window-error">
          <legend><span class="field-label">Choose one collection window</span></legend>
          <p class="fieldset-help" id="window-help">Items may be collected at any time within the selected window.</p>
          <p class="group-error" id="window-error" hidden>Choose a collection window.</p>
          <div class="choice-grid">
            ${windows.map((item) => `
              <div class="choice">
                <input type="radio" name="window" id="window-${item.value}" value="${item.value}"${state.window === item.value ? " checked" : ""}>
                <label for="window-${item.value}">
                  <span class="choice-title">${item.day}</span>
                  <span class="choice-description">${item.time}</span>
                </label>
              </div>`).join("")}
          </div>
        </fieldset>`;
    }
    return "";
  }

  function renderOptions() {
    document.title = "Pickup choices | Hard-waste pickup";
    main.innerHTML = `
      <section class="page-panel">
        <div class="page-body">
          <div class="options-heading">
            <p class="eyebrow">Step 2 of 4</p>
            <h1 id="page-heading" tabindex="-1">Choose your pickup</h1>
            <p>Select the type of waste and one available collection window.</p>
          </div>
          <form id="options-form" novalidate>
            <fieldset class="option-section" id="category-group" aria-describedby="category-help category-error">
              <legend><span class="field-label">Choose one waste category</span></legend>
              <p class="fieldset-help" id="category-help">Pick the category that best describes your load.</p>
              <p class="group-error" id="category-error" hidden>Choose a waste category.</p>
              <div class="choice-grid">${categoryChoices()}</div>
            </fieldset>
            <div class="option-section" id="windows-region">
              ${windowsMarkup()}
            </div>
            <div class="button-row">
              <button class="button" type="submit" id="continue-review"${state.windowStatus !== "ready" ? " disabled" : ""}>Review booking <span aria-hidden="true">→</span></button>
              <button class="text-button" type="button" id="back-details">Back to your details</button>
            </div>
          </form>
        </div>
      </section>`;

    document.querySelectorAll('input[name="category"]').forEach((input) => {
      input.addEventListener("change", (event) => { state.category = event.target.value; });
    });
    document.querySelectorAll('input[name="window"]').forEach((input) => {
      input.addEventListener("change", (event) => { state.window = event.target.value; });
    });
    const retry = document.getElementById("retry-windows");
    if (retry) retry.addEventListener("click", loadWindows);
    document.getElementById("options-form").addEventListener("submit", handleOptionsSubmit);
    document.getElementById("back-details").addEventListener("click", () => setStep("details"));
  }

  function loadWindows() {
    if (loadTimer) clearTimeout(loadTimer);
    state.windowStatus = "loading";
    renderOptions();
    loadTimer = setTimeout(() => {
      let hasAttempted = attemptedInMemory;
      try { hasAttempted = hasAttempted || sessionStorage.getItem(ATTEMPT_KEY) === "yes"; } catch (error) { /* Use the in-memory fallback. */ }
      if (!hasAttempted) {
        attemptedInMemory = true;
        try { sessionStorage.setItem(ATTEMPT_KEY, "yes"); } catch (error) { /* Continue with in-memory state. */ }
        state.windowStatus = "error";
        renderOptions();
        requestAnimationFrame(() => document.getElementById("window-load-error")?.focus());
      } else {
        state.windowStatus = "ready";
        renderOptions();
        requestAnimationFrame(() => document.getElementById("window-group")?.scrollIntoView({ block: "nearest" }));
      }
      loadTimer = null;
    }, 500);
  }

  function handleOptionsSubmit(event) {
    event.preventDefault();
    if (state.windowStatus !== "ready") return;
    const categoryError = document.getElementById("category-error");
    const windowError = document.getElementById("window-error");
    categoryError.hidden = Boolean(state.category);
    windowError.hidden = Boolean(state.window);
    document.getElementById("category-group").setAttribute("aria-invalid", state.category ? "false" : "true");
    document.getElementById("window-group").setAttribute("aria-invalid", state.window ? "false" : "true");

    if (!state.category) {
      document.getElementById("category-group").scrollIntoView({ block: "center" });
      document.getElementById("category-furniture").focus();
      return;
    }
    if (!state.window) {
      document.getElementById("window-group").scrollIntoView({ block: "center" });
      document.getElementById("window-tue-am").focus();
      return;
    }
    setStep("review");
  }

  function renderReview() {
    document.title = "Review booking | Hard-waste pickup";
    const category = categoryFor(state.category);
    const windowChoice = windowFor(state.window);
    main.innerHTML = `
      <section class="page-panel">
        <div class="page-body">
          <div class="review-heading">
            <p class="eyebrow">Step 3 of 4</p>
            <h1 id="page-heading" tabindex="-1">Review your booking</h1>
            <p>Check the details below. You can go back to make corrections before confirming.</p>
          </div>
          <div class="review-stack">
            <section class="review-card" aria-labelledby="resident-review-heading">
              <div class="review-card-head">
                <h2 id="resident-review-heading">Resident details</h2>
                <button class="text-button" type="button" id="edit-details">Edit</button>
              </div>
              <dl class="review-list">
                <dt>Full name</dt><dd>${escapeHtml(state.details.fullName)}</dd>
                <dt>Collection address</dt><dd>${escapeHtml(state.details.streetAddress)}, ${escapeHtml(state.details.suburb)} ${escapeHtml(state.details.postcode)}</dd>
                <dt>Email</dt><dd>${escapeHtml(state.details.email)}</dd>
                <dt>Mobile</dt><dd>${escapeHtml(state.details.mobile)}</dd>
              </dl>
            </section>
            <section class="review-card" aria-labelledby="pickup-review-heading">
              <div class="review-card-head">
                <h2 id="pickup-review-heading">Pickup choices</h2>
                <button class="text-button" type="button" id="edit-pickup">Edit</button>
              </div>
              <dl class="review-list">
                <dt>Waste category</dt><dd>${escapeHtml(category.label)}</dd>
                <dt>Collection window</dt><dd>${escapeHtml(windowChoice.day)}, ${escapeHtml(windowChoice.time)}</dd>
              </dl>
            </section>
          </div>
          <div class="notice">
            <span class="notice-mark" aria-hidden="true">i</span>
            <p>Confirming saves this fictional booking in this browser only. It does not send your details anywhere.</p>
          </div>
          <div class="button-row">
            <button class="button" type="button" id="confirm-booking">Confirm booking <span aria-hidden="true">✓</span></button>
            <button class="text-button" type="button" id="back-options">Back to pickup choices</button>
          </div>
        </div>
      </section>`;
    document.getElementById("edit-details").addEventListener("click", () => setStep("details"));
    document.getElementById("edit-pickup").addEventListener("click", () => setStep("options"));
    document.getElementById("back-options").addEventListener("click", () => setStep("options"));
    document.getElementById("confirm-booking").addEventListener("click", confirmBooking);
  }

  function confirmBooking() {
    const booking = {
      reference: BOOKING_REFERENCE,
      details: { ...state.details },
      category: state.category,
      window: state.window
    };
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(booking)); } catch (error) { /* Confirmation remains visible for this page load. */ }
    state.showNewBookingConfirm = false;
    setStep("confirmation");
  }

  function renderConfirmation() {
    document.title = `Booking ${BOOKING_REFERENCE} confirmed | Wattle Bay Council`;
    const booking = readConfirmedBooking() || {
      reference: BOOKING_REFERENCE,
      details: state.details,
      category: state.category,
      window: state.window
    };
    const category = categoryFor(booking.category);
    const windowChoice = windowFor(booking.window);
    const isComplete = category && windowChoice && booking.details;
    if (!isComplete) {
      localStorage.removeItem(STORAGE_KEY);
      setStep("intro");
      return;
    }

    main.innerHTML = `
      <section class="page-panel">
        <div class="confirmation-banner">
          <div class="confirmation-heading">
            <span class="status-icon" aria-hidden="true">✓</span>
            <div>
              <p class="eyebrow">Booking confirmed</p>
              <h1 id="page-heading" tabindex="-1">Your pickup is booked</h1>
              <p>This confirmation is saved in this browser and will remain here after a refresh.</p>
            </div>
          </div>
        </div>
        <div class="page-body">
          <div class="reference-box">
            <span>Booking reference</span>
            <strong>${escapeHtml(booking.reference)}</strong>
          </div>
          <section class="review-card" aria-labelledby="confirmed-details-heading">
            <div class="review-card-head">
              <h2 id="confirmed-details-heading">Confirmed pickup</h2>
            </div>
            <dl class="review-list">
              <dt>Resident</dt><dd>${escapeHtml(booking.details.fullName)}</dd>
              <dt>Collection address</dt><dd>${escapeHtml(booking.details.streetAddress)}, ${escapeHtml(booking.details.suburb)} ${escapeHtml(booking.details.postcode)}</dd>
              <dt>Waste category</dt><dd>${escapeHtml(category.label)}</dd>
              <dt>Collection window</dt><dd>${escapeHtml(windowChoice.day)}, ${escapeHtml(windowChoice.time)}</dd>
            </dl>
          </section>
          <p class="static-note">This static demonstration stores the confirmed booking only on this device. No email or SMS is sent, and no council system is updated.</p>
          <div class="confirm-new">
            ${state.showNewBookingConfirm ? `
              <p><strong>Clear this saved booking and start again?</strong></p>
              <p>This will remove reference ${escapeHtml(booking.reference)} from this browser.</p>
              <div class="button-row">
                <button class="button button-danger" type="button" id="clear-booking">Clear and start new booking</button>
                <button class="button button-secondary" type="button" id="cancel-new-booking">Keep this booking</button>
              </div>` : `
              <h2>Need another booking?</h2>
              <p>Starting again will first ask you to confirm that this saved booking can be cleared.</p>
              <button class="button button-secondary" type="button" id="start-new-booking">Start a new booking</button>`}
          </div>
        </div>
      </section>`;

    const startNew = document.getElementById("start-new-booking");
    if (startNew) startNew.addEventListener("click", () => {
      state.showNewBookingConfirm = true;
      renderConfirmation();
      requestAnimationFrame(() => document.getElementById("clear-booking")?.focus());
    });
    const cancel = document.getElementById("cancel-new-booking");
    if (cancel) cancel.addEventListener("click", () => {
      state.showNewBookingConfirm = false;
      renderConfirmation();
      requestAnimationFrame(() => document.getElementById("start-new-booking")?.focus());
    });
    const clear = document.getElementById("clear-booking");
    if (clear) clear.addEventListener("click", clearBooking);
  }

  function clearBooking() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (error) { /* Continue by resetting the in-memory view. */ }
    state.details = { fullName: "", streetAddress: "", suburb: "", postcode: "", email: "", mobile: "" };
    state.category = "";
    state.window = "";
    state.windowStatus = "idle";
    state.showNewBookingConfirm = false;
    setStep("intro");
  }

  brandLink.addEventListener("click", (event) => {
    event.preventDefault();
    if (state.step === "confirmation") {
      document.getElementById("page-heading")?.focus();
      window.scrollTo({ top: 0, behavior: "auto" });
    } else {
      setStep("intro");
    }
  });

  const confirmed = readConfirmedBooking();
  if (confirmed) {
    state.details = { ...state.details, ...confirmed.details };
    state.category = confirmed.category;
    state.window = confirmed.window;
    state.windowStatus = "ready";
    state.step = "confirmation";
  }
  render();
})();
