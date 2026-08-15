(() => {
  'use strict';

  const STORAGE_KEY = 'wattleBayHardWasteBooking';
  const ATTEMPT_KEY = 'wattleBayAvailabilityAttempted';
  const REFERENCE = 'WBC-HW-4827';
  const app = document.getElementById('app');

  const categories = {
    furniture: { title: 'Furniture', detail: 'For example, a sofa, table or mattress' },
    whitegoods: { title: 'Whitegoods', detail: 'For example, a fridge, washer or dryer' },
    garden: { title: 'Garden waste', detail: 'Bundled branches and other bulky green waste' }
  };

  const windows = {
    tue: { date: 'Tuesday 18 August', time: '7:00 am–12:00 pm' },
    thu: { date: 'Thursday 20 August', time: '12:00 pm–5:00 pm' },
    sat: { date: 'Saturday 22 August', time: '7:00 am–12:00 pm' }
  };

  const state = {
    step: 1,
    details: { fullName: '', street: '', suburb: '', postcode: '', email: '', mobile: '' },
    category: '',
    window: '',
    availability: 'idle',
    detailErrors: {},
    choiceErrors: {},
    confirmed: readBooking()
  };

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  }

  function readBooking() {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!stored || stored.reference !== REFERENCE || !stored.details || !categories[stored.category] || !windows[stored.window]) return null;
      return stored;
    } catch (_) {
      return null;
    }
  }

  function progress(step, label) {
    return `<div class="progress" aria-label="Booking progress: step ${step} of 4, ${label}">
      <div class="progress-meta"><span>Step ${step} of 4</span><span>${label}</span></div>
      <div class="progress-track" aria-hidden="true"><div class="progress-value" style="width:${step * 25}%"></div></div>
    </div>`;
  }

  function shell(main, aside = '') {
    return `<div class="app-grid"><div class="main-column">${main}</div>${aside ? `<aside class="side-panel">${aside}</aside>` : ''}</div>`;
  }

  function focusTarget(id) {
    requestAnimationFrame(() => {
      const target = document.getElementById(id);
      if (target) {
        target.focus({ preventScroll: true });
        target.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    });
  }

  function render(options = {}) {
    if (state.confirmed) {
      renderConfirmation(options.focus !== false);
      return;
    }
    if (state.step === 1) renderIntro(options.focus !== false);
    if (state.step === 2) renderDetails(options.focus !== false);
    if (state.step === 3) renderPickup(options.focus !== false);
    if (state.step === 4) renderReview(options.focus !== false);
  }

  function renderIntro(shouldFocus) {
    document.title = 'Book a hard-waste pickup | Wattle Bay Council';
    app.innerHTML = shell(`
      ${progress(1, 'About the service')}
      <p class="eyebrow">Hard-waste collection</p>
      <h1 id="step-heading" tabindex="-1">Book a hard-waste pickup</h1>
      <p class="lede">Arrange one kerbside collection for a bulky household item category at a time that suits you.</p>
      <div class="content-stack">
        <section class="info-panel" aria-labelledby="how-title">
          <h2 id="how-title">How it works</h2>
          <ol class="service-list" style="margin-top:1.25rem">
            <li><span class="list-number">1</span><div><strong>Tell us where to collect</strong><p>Enter your contact details and a fictional Wattle Bay address.</p></div></li>
            <li><span class="list-number">2</span><div><strong>Choose your pickup</strong><p>Select one waste category and one available collection window.</p></div></li>
            <li><span class="list-number">3</span><div><strong>Review and confirm</strong><p>Check the booking before saving it in this browser.</p></div></li>
          </ol>
        </section>
      </div>
      <div class="actions"><button class="btn btn-arrow" id="start-button" type="button">Start booking</button></div>
    `, `<h2>Before you start</h2><ul><li>Your full name and contact details</li><li>The street address for collection</li><li>The type of hard waste you need collected</li><li>About 3 minutes to complete the booking</li></ul>`);
    document.getElementById('start-button').addEventListener('click', () => goToStep(2));
    if (shouldFocus) focusTarget('step-heading');
  }

  function renderDetails(shouldFocus) {
    document.title = 'Your details | Hard-waste pickup';
    const errors = state.detailErrors;
    const fields = [
      ['fullName', 'Full name', 'text', 'name', 'For example, Jordan Lee'],
      ['street', 'Street address', 'text', 'street-address', 'For example, 14 Paperbark Lane'],
      ['suburb', 'Suburb', 'text', 'address-level2', 'For example, Banksia Point'],
      ['postcode', 'Postcode', 'text', 'postal-code', 'Exactly 4 digits'],
      ['email', 'Email address', 'email', 'email', 'For example, jordan.lee@example.com'],
      ['mobile', 'Mobile number', 'tel', 'tel', 'Use 04xx xxx xxx or 10 digits beginning with 04']
    ];
    const summary = Object.keys(errors).length ? errorSummary(errors) : '';
    const fieldHtml = fields.map(([id, label, type, autocomplete, hint]) => field(id, label, type, autocomplete, hint, errors[id])).join('');
    app.innerHTML = shell(`
      ${progress(2, 'Your details')}
      <p class="eyebrow">Resident details</p>
      <h1 id="step-heading" tabindex="-1">Where should we collect?</h1>
      <p class="lede">Enter the details for the person making this booking. All fields are required.</p>
      <div class="content-stack">
        <section class="form-panel" aria-labelledby="details-form-title">
          <h2 id="details-form-title" class="sr-only">Resident details form</h2>
          <form id="details-form" novalidate>
            ${summary}
            <p class="required-note"><span class="required-mark" aria-hidden="true">*</span> Required</p>
            <div class="field-grid">${fieldHtml}</div>
            <div class="actions"><button class="btn btn-arrow" type="submit">Continue</button><button class="btn btn-secondary" id="back-intro" type="button">Back</button></div>
          </form>
        </section>
      </div>
    `, `<h2>Your privacy in this demo</h2><ul><li>Details stay in this browser while you complete the form.</li><li>Only a confirmed booking is saved after refresh.</li><li>No data is sent to Wattle Bay Council or any other service.</li></ul>`);
    const form = document.getElementById('details-form');
    form.addEventListener('input', onDetailInput);
    form.addEventListener('submit', submitDetails);
    document.getElementById('back-intro').addEventListener('click', () => { captureDetails(); goToStep(1); });
    if (shouldFocus) focusTarget(Object.keys(errors).length ? 'error-summary' : 'step-heading');
  }

  function field(id, label, type, autocomplete, hint, error) {
    const isShort = id === 'postcode';
    const inputMode = id === 'postcode' ? 'numeric' : id === 'mobile' ? 'tel' : '';
    const describedBy = `${id}-hint${error ? ` ${id}-error` : ''}`;
    return `<div class="field${isShort ? ' short-field' : ''}">
      <label for="${id}">${label} <span class="required-mark" aria-hidden="true">*</span></label>
      <input id="${id}" name="${id}" type="${type}" value="${escapeHtml(state.details[id])}" autocomplete="${autocomplete}" ${inputMode ? `inputmode="${inputMode}"` : ''} required aria-required="true" aria-invalid="${error ? 'true' : 'false'}" aria-describedby="${describedBy}">
      <p class="hint" id="${id}-hint">${hint}</p>
      ${error ? `<p class="field-error" id="${id}-error">${escapeHtml(error)}</p>` : ''}
    </div>`;
  }

  function errorSummary(errors) {
    const labels = { fullName: 'Full name', street: 'Street address', suburb: 'Suburb', postcode: 'Postcode', email: 'Email address', mobile: 'Mobile number' };
    return `<div class="error-summary" id="error-summary" tabindex="-1" role="alert"><h3>Check your details</h3><ul>${Object.entries(errors).map(([id, message]) => `<li><a href="#${id}">${labels[id]}: ${escapeHtml(message)}</a></li>`).join('')}</ul></div>`;
  }

  function captureDetails() {
    ['fullName', 'street', 'suburb', 'postcode', 'email', 'mobile'].forEach(id => {
      const input = document.getElementById(id);
      if (input) state.details[id] = input.value;
    });
  }

  function validateField(id, value) {
    const clean = value.trim();
    if (!clean) return 'Enter this required information.';
    if (id === 'postcode' && !/^\d{4}$/.test(clean)) return 'Enter a postcode using exactly 4 digits.';
    if (id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(clean)) return 'Enter a plausible email address, such as name@example.com.';
    if (id === 'mobile' && !/^04\d{2}(?: ?\d{3}){2}$/.test(clean)) return 'Enter 10 digits beginning with 04, with or without spaces.';
    return '';
  }

  function validateDetails() {
    const errors = {};
    Object.entries(state.details).forEach(([id, value]) => {
      const error = validateField(id, value);
      if (error) errors[id] = error;
    });
    return errors;
  }

  function onDetailInput(event) {
    if (!event.target.matches('input')) return;
    state.details[event.target.id] = event.target.value;
    if (state.detailErrors[event.target.id] && !validateField(event.target.id, event.target.value)) {
      delete state.detailErrors[event.target.id];
      renderDetails(false);
      const input = document.getElementById(event.target.id);
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    }
  }

  function submitDetails(event) {
    event.preventDefault();
    captureDetails();
    state.detailErrors = validateDetails();
    if (Object.keys(state.detailErrors).length) {
      renderDetails(true);
      return;
    }
    goToStep(3);
  }

  function renderPickup(shouldFocus) {
    document.title = 'Choose your pickup | Hard-waste pickup';
    app.innerHTML = shell(`
      ${progress(3, 'Choose your pickup')}
      <p class="eyebrow">Pickup options</p>
      <h1 id="step-heading" tabindex="-1">Choose what and when</h1>
      <p class="lede">Select one waste category, then choose one available collection window.</p>
      <div class="content-stack">
        <section class="form-panel" aria-labelledby="pickup-form-title">
          <h2 id="pickup-form-title" class="sr-only">Pickup choices</h2>
          <form id="pickup-form" novalidate>
            ${Object.keys(state.choiceErrors).length ? choiceErrorSummary() : ''}
            <fieldset id="category-group" ${state.choiceErrors.category ? 'aria-describedby="category-error"' : ''}>
              <legend>Waste category <span class="required-mark" aria-hidden="true">*</span></legend>
              <p class="group-help">Choose the category that best describes this pickup.</p>
              <div class="choice-grid">${Object.entries(categories).map(([id, item]) => choiceCard('category', id, item.title, item.detail, state.category === id)).join('')}</div>
              ${state.choiceErrors.category ? '<p class="group-error" id="category-error">Select one waste category.</p>' : ''}
            </fieldset>
            <fieldset id="window-group" ${state.choiceErrors.window ? 'aria-describedby="window-error"' : ''}>
              <legend id="window-heading" tabindex="-1">Collection window <span class="required-mark" aria-hidden="true">*</span></legend>
              <p class="group-help">Availability is checked locally for this demonstration.</p>
              <div id="availability-region" aria-live="polite">${availabilityMarkup()}</div>
              ${state.choiceErrors.window ? '<p class="group-error" id="window-error">Select one collection window.</p>' : ''}
            </fieldset>
            <div class="actions"><button class="btn btn-arrow" type="submit">Review booking</button><button class="btn btn-secondary" id="back-details" type="button">Back</button></div>
          </form>
        </section>
      </div>
    `, `<h2>Putting items out</h2><ul><li>Keep items grouped by the selected category.</li><li>Place items inside your property boundary until collection day.</li><li>This demo does not notify staff or arrange a real pickup.</li></ul>`);
    bindPickupEvents();
    if (shouldFocus) focusTarget(Object.keys(state.choiceErrors).length ? 'choice-error-summary' : 'step-heading');
    if (state.availability === 'idle') beginAvailabilityLoad();
  }

  function choiceCard(name, id, title, detail, checked) {
    return `<label class="choice-card"><input type="radio" name="${name}" value="${id}" ${checked ? 'checked' : ''}><span class="choice-content"><span><span class="choice-title">${title}</span><span class="choice-detail">${detail}</span></span></span></label>`;
  }

  function availabilityMarkup() {
    if (state.availability === 'loading') return `<div class="loading-status" role="status"><h3>Loading collection windows…</h3><p>Please wait a moment.</p></div>`;
    if (state.availability === 'error') return `<div class="load-error" role="alert"><h3>Collection windows couldn’t be loaded</h3><p>Your details are safe. Try again to view the available times.</p><button class="btn btn-secondary" id="retry-availability" type="button">Retry</button></div>`;
    if (state.availability === 'loaded') return `<div class="loaded-status" role="status"><strong>3 collection windows available</strong></div><div class="choice-grid windows" style="margin-top:1rem">${Object.entries(windows).map(([id, item]) => choiceCard('window', id, item.date, item.time, state.window === id)).join('')}</div>`;
    return '';
  }

  function beginAvailabilityLoad(isRetry = false) {
    state.availability = 'loading';
    updateAvailability();
    window.setTimeout(() => {
      if (isRetry || sessionStorage.getItem(ATTEMPT_KEY) === 'yes') {
        state.availability = 'loaded';
      } else {
        sessionStorage.setItem(ATTEMPT_KEY, 'yes');
        state.availability = 'error';
      }
      updateAvailability();
      if (isRetry && state.availability === 'loaded') focusTarget('window-heading');
    }, 450);
  }

  function updateAvailability() {
    const region = document.getElementById('availability-region');
    if (!region) return;
    region.innerHTML = availabilityMarkup();
    bindAvailabilityEvents();
    document.querySelectorAll('input[name="window"]').forEach(input => input.addEventListener('change', onChoiceChange));
  }

  function bindAvailabilityEvents() {
    const retry = document.getElementById('retry-availability');
    if (retry) retry.addEventListener('click', () => beginAvailabilityLoad(true));
  }

  function bindPickupEvents() {
    document.getElementById('pickup-form').addEventListener('submit', submitPickup);
    document.getElementById('back-details').addEventListener('click', () => goToStep(2));
    document.querySelectorAll('input[type="radio"]').forEach(input => input.addEventListener('change', onChoiceChange));
    bindAvailabilityEvents();
  }

  function onChoiceChange(event) {
    state[event.target.name] = event.target.value;
    if (state.choiceErrors[event.target.name]) {
      delete state.choiceErrors[event.target.name];
      const value = event.target.value;
      renderPickup(false);
      document.querySelector(`input[name="${event.target.name}"][value="${value}"]`).focus();
    }
  }

  function choiceErrorSummary() {
    const items = [];
    if (state.choiceErrors.category) items.push('<li><a href="#category-group">Waste category: select one category.</a></li>');
    if (state.choiceErrors.window) items.push('<li><a href="#window-group">Collection window: select one window.</a></li>');
    return `<div class="error-summary" id="choice-error-summary" tabindex="-1" role="alert"><h3>Choose your pickup options</h3><ul>${items.join('')}</ul></div>`;
  }

  function submitPickup(event) {
    event.preventDefault();
    state.choiceErrors = {};
    if (!state.category) state.choiceErrors.category = true;
    if (!state.window) state.choiceErrors.window = true;
    if (state.availability !== 'loaded') state.choiceErrors.window = true;
    if (Object.keys(state.choiceErrors).length) {
      renderPickup(true);
      return;
    }
    goToStep(4);
  }

  function renderReview(shouldFocus) {
    document.title = 'Review your booking | Hard-waste pickup';
    app.innerHTML = shell(`
      ${progress(4, 'Review and confirm')}
      <p class="eyebrow">Final check</p>
      <h1 id="step-heading" tabindex="-1">Review your booking</h1>
      <p class="lede">Check everything below. You can go back to make changes without losing your information.</p>
      <div class="content-stack review-stack">
        ${detailsReview(true)}
        ${pickupReview(true)}
      </div>
      <div class="actions"><button class="btn" id="confirm-booking" type="button">Confirm booking</button><button class="btn btn-secondary" id="back-pickup" type="button">Back</button></div>
    `, `<h2>What happens next</h2><ul><li>Confirming saves this fictional booking in your browser.</li><li>The reference and choices remain available after refresh.</li><li>No email, text message or council request is created.</li></ul>`);
    document.getElementById('confirm-booking').addEventListener('click', confirmBooking);
    document.getElementById('back-pickup').addEventListener('click', () => goToStep(3));
    document.getElementById('edit-details').addEventListener('click', event => { event.preventDefault(); goToStep(2); });
    document.getElementById('edit-pickup').addEventListener('click', event => { event.preventDefault(); goToStep(3); });
    if (shouldFocus) focusTarget('step-heading');
  }

  function detailsReview(editable) {
    const d = state.confirmed ? state.confirmed.details : state.details;
    return `<section class="review-section" aria-labelledby="review-details-title"><div class="review-heading"><h2 id="review-details-title">Your details</h2>${editable ? '<a class="edit-link" id="edit-details" href="#">Edit details</a>' : ''}</div><dl class="detail-list">
      <dt>Full name</dt><dd>${escapeHtml(d.fullName)}</dd><dt>Address</dt><dd>${escapeHtml(d.street)}, ${escapeHtml(d.suburb)} ${escapeHtml(d.postcode)}</dd><dt>Email</dt><dd>${escapeHtml(d.email)}</dd><dt>Mobile</dt><dd>${escapeHtml(d.mobile)}</dd>
    </dl></section>`;
  }

  function pickupReview(editable) {
    const source = state.confirmed || state;
    const category = categories[source.category];
    const collection = windows[source.window];
    return `<section class="review-section" aria-labelledby="review-pickup-title"><div class="review-heading"><h2 id="review-pickup-title">Pickup choices</h2>${editable ? '<a class="edit-link" id="edit-pickup" href="#">Change pickup</a>' : ''}</div><dl class="detail-list">
      <dt>Waste category</dt><dd>${escapeHtml(category.title)}</dd><dt>Collection date</dt><dd>${escapeHtml(collection.date)}</dd><dt>Time window</dt><dd>${escapeHtml(collection.time)}</dd>
    </dl></section>`;
  }

  function confirmBooking() {
    const booking = { reference: REFERENCE, details: { ...state.details }, category: state.category, window: state.window };
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(booking)); } catch (_) { /* Confirmation still works for this page load. */ }
    state.confirmed = booking;
    render({ focus: true });
  }

  function renderConfirmation(shouldFocus) {
    document.title = `Booking confirmed — ${state.confirmed.reference} | Wattle Bay Council`;
    app.innerHTML = `<div class="confirmation-card">
      <div class="confirmation-hero" id="confirmation-status" tabindex="-1" role="status">
        <div class="success-mark" aria-hidden="true">✓</div>
        <p class="eyebrow">Booking confirmed</p>
        <h1>Your pickup is saved</h1>
        <p class="lede">This fictional booking is stored in this browser so you can return to these details after a refresh.</p>
        <div class="reference"><span>Booking reference</span><strong>${escapeHtml(state.confirmed.reference)}</strong></div>
      </div>
      <div class="confirmation-body">
        <div class="review-stack">${detailsReview(false)}${pickupReview(false)}</div>
        <p class="confirmation-note"><strong>Keep the reference for this demonstration.</strong> No email, SMS, council-system update, payment or staff action has been created.</p>
        <section class="new-booking" aria-labelledby="new-booking-title"><h2 id="new-booking-title">Need to begin again?</h2><p>Starting a new booking deliberately clears this saved confirmation and its details from this browser.</p><button class="btn btn-danger" id="new-booking" type="button">Clear and start again</button></section>
      </div>
    </div>`;
    document.getElementById('new-booking').addEventListener('click', startNewBooking);
    if (shouldFocus) focusTarget('confirmation-status');
  }

  function startNewBooking() {
    localStorage.removeItem(STORAGE_KEY);
    state.confirmed = null;
    state.step = 1;
    state.details = { fullName: '', street: '', suburb: '', postcode: '', email: '', mobile: '' };
    state.category = '';
    state.window = '';
    state.availability = 'idle';
    state.detailErrors = {};
    state.choiceErrors = {};
    render({ focus: true });
  }

  function goToStep(step) {
    state.step = step;
    state.detailErrors = {};
    state.choiceErrors = {};
    render({ focus: true });
  }

  render({ focus: false });
})();
