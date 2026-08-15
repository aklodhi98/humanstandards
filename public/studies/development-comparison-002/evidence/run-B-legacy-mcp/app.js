(() => {
  'use strict';

  const STORAGE_KEY = 'wattleBayHardWasteBooking';
  const SESSION_ATTEMPT_KEY = 'wattleBayWindowsAttempted';
  const REFERENCE = 'WBC-HW-260818-1047';
  const STEP_ORDER = ['intro', 'details', 'pickup', 'review'];

  const state = {
    currentStep: 'intro',
    windowsState: 'idle',
    windowsAttemptedInMemory: false,
    details: {
      fullName: '',
      streetAddress: '',
      suburb: '',
      postcode: '',
      email: '',
      mobile: ''
    },
    wasteCategory: '',
    collectionWindow: ''
  };

  const elements = {
    progress: document.querySelector('#progress'),
    progressStatus: document.querySelector('#progress-status'),
    detailsForm: document.querySelector('#details-form'),
    pickupForm: document.querySelector('#pickup-form'),
    detailsSummary: document.querySelector('#details-error-summary'),
    detailsErrorList: document.querySelector('#details-error-list'),
    pickupSummary: document.querySelector('#pickup-error-summary'),
    pickupErrorList: document.querySelector('#pickup-error-list'),
    loading: document.querySelector('#availability-loading'),
    availabilityError: document.querySelector('#availability-error'),
    availabilityStatus: document.querySelector('#availability-status'),
    windowOptions: document.querySelector('#window-options'),
    pickupContinue: document.querySelector('#pickup-continue'),
    clearDialog: document.querySelector('#clear-booking-dialog')
  };

  const fields = {
    fullName: document.querySelector('#full-name'),
    streetAddress: document.querySelector('#street-address'),
    suburb: document.querySelector('#suburb'),
    postcode: document.querySelector('#postcode'),
    email: document.querySelector('#email'),
    mobile: document.querySelector('#mobile')
  };

  const fieldConfig = {
    fullName: {
      label: 'Full name',
      errorId: 'full-name-error',
      validate: value => value.trim() ? '' : 'Enter your full name.'
    },
    streetAddress: {
      label: 'Street address',
      errorId: 'street-address-error',
      validate: value => value.trim() ? '' : 'Enter your street address.'
    },
    suburb: {
      label: 'Suburb',
      errorId: 'suburb-error',
      validate: value => value.trim() ? '' : 'Enter your suburb.'
    },
    postcode: {
      label: 'Postcode',
      errorId: 'postcode-error',
      validate: value => /^\d{4}$/.test(value.trim()) ? '' : 'Enter a postcode using exactly 4 digits.'
    },
    email: {
      label: 'Email address',
      errorId: 'email-error',
      validate: value => /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+$/i.test(value.trim())
        ? ''
        : 'Enter an email address with a name and domain, such as name@example.com.'
    },
    mobile: {
      label: 'Australian mobile number',
      errorId: 'mobile-error',
      validate: value => /^(?:04\d{8}|04\d{2} \d{3} \d{3})$/.test(value.trim())
        ? ''
        : 'Enter 04xx xxx xxx or 10 digits beginning with 04.'
    }
  };

  function safelyReadBooking() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return null;
      const booking = JSON.parse(saved);
      const complete = booking
        && booking.reference === REFERENCE
        && Object.keys(state.details).every(key => typeof booking.details?.[key] === 'string' && booking.details[key])
        && typeof booking.wasteCategory === 'string'
        && typeof booking.collectionWindow === 'string';
      if (complete) return booking;
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (storageError) {
        // Storage may be disabled; the page can still run for the current view.
      }
    }
    return null;
  }

  function updateProgress(step) {
    if (step === 'confirmation') {
      elements.progress.hidden = true;
      return;
    }

    elements.progress.hidden = false;
    const activeIndex = STEP_ORDER.indexOf(step);
    elements.progressStatus.textContent = `Step ${activeIndex + 1} of ${STEP_ORDER.length}`;

    document.querySelectorAll('[data-progress-step]').forEach(item => {
      const itemIndex = STEP_ORDER.indexOf(item.dataset.progressStep);
      item.classList.toggle('is-complete', itemIndex < activeIndex);
      if (itemIndex === activeIndex) {
        item.setAttribute('aria-current', 'step');
      } else {
        item.removeAttribute('aria-current');
      }
      const number = item.querySelector('span');
      number.textContent = itemIndex < activeIndex ? '✓' : String(itemIndex + 1);
    });
  }

  function showStep(step, options = {}) {
    document.querySelectorAll('[data-step]').forEach(panel => {
      panel.hidden = panel.dataset.step !== step;
    });
    state.currentStep = step;
    updateProgress(step);

    const panel = document.querySelector(`[data-step="${step}"]`);
    const heading = panel?.querySelector('h2[tabindex="-1"]');
    if (heading && options.focus !== false) {
      requestAnimationFrame(() => {
        heading.focus({ preventScroll: true });
        heading.scrollIntoView({ behavior: 'auto', block: 'start' });
      });
    }
  }

  function syncDetailsFromForm() {
    Object.entries(fields).forEach(([key, input]) => {
      state.details[key] = input.value.trim();
    });
  }

  function syncDetailsToForm() {
    Object.entries(fields).forEach(([key, input]) => {
      input.value = state.details[key] || '';
    });
  }

  function setFieldError(key, message) {
    const input = fields[key];
    const error = document.querySelector(`#${fieldConfig[key].errorId}`);
    if (message) {
      input.setAttribute('aria-invalid', 'true');
      error.textContent = message;
      error.hidden = false;
    } else {
      input.removeAttribute('aria-invalid');
      error.textContent = '';
      error.hidden = true;
    }
  }

  function removeResolvedSummaryItem(summary, list, attribute, value) {
    list.querySelector(`[${attribute}="${value}"]`)?.remove();
    if (!list.children.length) summary.hidden = true;
  }

  function validateField(key) {
    const message = fieldConfig[key].validate(fields[key].value);
    setFieldError(key, message);
    return message;
  }

  function validateDetails() {
    const errors = [];
    Object.keys(fields).forEach(key => {
      const message = validateField(key);
      if (message) errors.push({ key, message });
    });

    elements.detailsErrorList.replaceChildren();
    errors.forEach(({ key, message }) => {
      const item = document.createElement('li');
      item.dataset.errorKey = key;
      const link = document.createElement('a');
      link.href = `#${fields[key].id}`;
      link.textContent = `${fieldConfig[key].label}: ${message}`;
      link.addEventListener('click', event => {
        event.preventDefault();
        fields[key].focus();
      });
      item.append(link);
      elements.detailsErrorList.append(item);
    });

    elements.detailsSummary.hidden = errors.length === 0;
    if (errors.length) {
      elements.detailsSummary.focus();
      elements.detailsSummary.scrollIntoView({ behavior: 'auto', block: 'center' });
    }
    return errors.length === 0;
  }

  function setGroupError(id, message) {
    const error = document.querySelector(`#${id}`);
    error.textContent = message;
    error.hidden = !message;
  }

  function validatePickup() {
    const category = elements.pickupForm.elements.wasteCategory.value;
    const collectionWindow = elements.pickupForm.elements.collectionWindow.value;
    const errors = [];

    if (!category) {
      errors.push({ target: 'waste-group', label: 'Waste category', message: 'Choose one waste category.' });
      setGroupError('waste-error', 'Choose one waste category.');
    } else {
      setGroupError('waste-error', '');
    }

    if (state.windowsState === 'loaded' && !collectionWindow) {
      errors.push({ target: 'window-group', label: 'Collection window', message: 'Choose one collection window.' });
      setGroupError('window-error', 'Choose one collection window.');
    } else {
      setGroupError('window-error', '');
    }

    elements.pickupErrorList.replaceChildren();
    errors.forEach(error => {
      const item = document.createElement('li');
      item.dataset.errorTarget = error.target;
      const link = document.createElement('a');
      link.href = `#${error.target}`;
      link.textContent = `${error.label}: ${error.message}`;
      link.addEventListener('click', event => {
        event.preventDefault();
        const firstRadio = document.querySelector(`#${error.target} input[type="radio"]`);
        firstRadio?.focus();
      });
      item.append(link);
      elements.pickupErrorList.append(item);
    });

    elements.pickupSummary.hidden = errors.length === 0;
    if (errors.length) {
      elements.pickupSummary.focus();
      elements.pickupSummary.scrollIntoView({ behavior: 'auto', block: 'center' });
    }
    return errors.length === 0 && state.windowsState === 'loaded';
  }

  function loadWindows() {
    if (state.windowsState === 'loading' || state.windowsState === 'loaded') return;

    state.windowsState = 'loading';
    elements.loading.hidden = false;
    elements.availabilityError.hidden = true;
    elements.windowOptions.hidden = true;
    elements.pickupContinue.disabled = true;
    elements.availabilityStatus.textContent = 'Loading available collection windows.';

    window.setTimeout(() => {
      let hasAttempted = false;
      try {
        hasAttempted = sessionStorage.getItem(SESSION_ATTEMPT_KEY) === 'true';
        if (!hasAttempted) sessionStorage.setItem(SESSION_ATTEMPT_KEY, 'true');
      } catch (error) {
        hasAttempted = state.windowsAttemptedInMemory;
      }
      state.windowsAttemptedInMemory = true;

      elements.loading.hidden = true;
      if (!hasAttempted) {
        state.windowsState = 'failed';
        elements.availabilityError.hidden = false;
        elements.availabilityStatus.textContent = 'Collection windows could not be loaded. Your details are safe. Use Retry to try again.';
        document.querySelector('#retry-windows').focus();
        return;
      }

      state.windowsState = 'loaded';
      elements.windowOptions.hidden = false;
      elements.pickupContinue.disabled = false;
      elements.availabilityStatus.textContent = 'Three collection windows are available.';
      document.querySelector('#window-options input[type="radio"]')?.focus();
    }, 450);
  }

  function populateReview() {
    document.querySelector('#review-name').textContent = state.details.fullName;
    document.querySelector('#review-address').textContent = `${state.details.streetAddress}, ${state.details.suburb} ${state.details.postcode}`;
    document.querySelector('#review-email').textContent = state.details.email;
    document.querySelector('#review-mobile').textContent = state.details.mobile;
    document.querySelector('#review-category').textContent = state.wasteCategory;
    document.querySelector('#review-window').textContent = state.collectionWindow;
  }

  function populateConfirmation(booking) {
    const address = `${booking.details.streetAddress}, ${booking.details.suburb} ${booking.details.postcode}`;
    document.querySelector('#confirmation-reference').textContent = booking.reference;
    document.querySelector('#confirmation-name').textContent = booking.details.fullName;
    document.querySelector('#confirmation-address').textContent = address;
    document.querySelector('#confirmation-category').textContent = booking.wasteCategory;
    document.querySelector('#confirmation-window').textContent = booking.collectionWindow;
  }

  function confirmBooking() {
    const booking = {
      version: 1,
      reference: REFERENCE,
      details: { ...state.details },
      wasteCategory: state.wasteCategory,
      collectionWindow: state.collectionWindow
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(booking));
    } catch (error) {
      window.alert('This browser could not save the booking. Check that browser storage is available, then try again.');
      return;
    }

    populateConfirmation(booking);
    showStep('confirmation');
    document.title = 'Booking confirmed | Wattle Bay Council';
  }

  function clearBooking() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      // Continue resetting the visible interface if storage is unavailable.
    }

    elements.detailsForm.reset();
    elements.pickupForm.reset();
    Object.keys(state.details).forEach(key => { state.details[key] = ''; });
    state.wasteCategory = '';
    state.collectionWindow = '';
    state.windowsState = 'idle';

    Object.keys(fields).forEach(key => setFieldError(key, ''));
    setGroupError('waste-error', '');
    setGroupError('window-error', '');
    elements.detailsSummary.hidden = true;
    elements.pickupSummary.hidden = true;
    elements.loading.hidden = true;
    elements.availabilityError.hidden = true;
    elements.windowOptions.hidden = true;
    elements.pickupContinue.disabled = true;
    elements.availabilityStatus.textContent = '';
    document.title = 'Book a hard-waste pickup | Wattle Bay Council';
    showStep('intro');
  }

  document.querySelector('#start-button').addEventListener('click', () => showStep('details'));
  document.querySelector('#details-back').addEventListener('click', () => {
    syncDetailsFromForm();
    showStep('intro');
  });

  Object.keys(fields).forEach(key => {
    fields[key].addEventListener('blur', () => {
      if (fields[key].value || fields[key].getAttribute('aria-invalid') === 'true') validateField(key);
    });
    fields[key].addEventListener('input', () => {
      if (fields[key].getAttribute('aria-invalid') === 'true' && !fieldConfig[key].validate(fields[key].value)) {
        setFieldError(key, '');
        removeResolvedSummaryItem(elements.detailsSummary, elements.detailsErrorList, 'data-error-key', key);
      }
    });
  });

  elements.detailsForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!validateDetails()) return;
    syncDetailsFromForm();
    showStep('pickup');
    if (state.windowsState === 'idle') loadWindows();
  });

  document.querySelector('#retry-windows').addEventListener('click', loadWindows);
  document.querySelector('#pickup-back').addEventListener('click', () => {
    state.wasteCategory = elements.pickupForm.elements.wasteCategory.value;
    state.collectionWindow = elements.pickupForm.elements.collectionWindow.value;
    showStep('details');
  });

  elements.pickupForm.addEventListener('change', event => {
    if (event.target.name === 'wasteCategory') {
      state.wasteCategory = event.target.value;
      setGroupError('waste-error', '');
      removeResolvedSummaryItem(elements.pickupSummary, elements.pickupErrorList, 'data-error-target', 'waste-group');
    }
    if (event.target.name === 'collectionWindow') {
      state.collectionWindow = event.target.value;
      setGroupError('window-error', '');
      removeResolvedSummaryItem(elements.pickupSummary, elements.pickupErrorList, 'data-error-target', 'window-group');
    }
  });

  elements.pickupForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!validatePickup()) return;
    state.wasteCategory = elements.pickupForm.elements.wasteCategory.value;
    state.collectionWindow = elements.pickupForm.elements.collectionWindow.value;
    populateReview();
    showStep('review');
  });

  document.querySelector('#edit-details').addEventListener('click', () => showStep('details'));
  document.querySelector('#edit-pickup').addEventListener('click', () => showStep('pickup'));
  document.querySelector('#review-back').addEventListener('click', () => showStep('pickup'));
  document.querySelector('#confirm-booking').addEventListener('click', confirmBooking);

  document.querySelector('#new-booking').addEventListener('click', () => {
    elements.clearDialog.showModal();
    requestAnimationFrame(() => document.querySelector('#keep-booking').focus());
  });
  document.querySelector('#clear-booking').addEventListener('click', () => {
    window.setTimeout(clearBooking, 0);
  });

  const savedBooking = safelyReadBooking();
  if (savedBooking) {
    Object.assign(state.details, savedBooking.details);
    state.wasteCategory = savedBooking.wasteCategory;
    state.collectionWindow = savedBooking.collectionWindow;
    syncDetailsToForm();
    populateConfirmation(savedBooking);
    showStep('confirmation', { focus: false });
    document.title = 'Booking confirmed | Wattle Bay Council';
  } else {
    showStep('intro', { focus: false });
  }
})();
