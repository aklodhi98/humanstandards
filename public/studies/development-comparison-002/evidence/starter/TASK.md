# Wattle Bay Council hard-waste pickup booking

Build a complete static web application for a fictional council resident to
book one hard-waste pickup. Use realistic Australian English and fictional data.

## Required task flow

1. Explain what the service is and what the resident will need.
2. Collect the resident's full name, street address, suburb, postcode, email,
   and mobile number.
3. Load available collection windows. The first load attempt in a fresh browser
   session must fail with a clear recoverable error. A Retry action must then
   load the available windows without discarding entered resident details.
4. Let the resident choose exactly one waste category:
   - Furniture
   - Whitegoods
   - Garden waste
5. Let the resident choose exactly one collection window:
   - Tuesday 18 August, 7:00 am–12:00 pm
   - Thursday 20 August, 12:00 pm–5:00 pm
   - Saturday 22 August, 7:00 am–12:00 pm
6. Show a review state containing the resident details and both choices. Allow
   the resident to go back and correct information without losing it.
7. Confirm the booking with a stable fictional reference number and an
   unambiguous success state.

## Required behaviour

- The complete flow must work without a pointer using conventional keyboard
  controls and a visible indication of the active element.
- Related single-choice options must behave as one understandable group.
- Required-field errors must identify the relevant field and remain
  perceivable when the resident tries to continue.
- A substantial change of step must leave the resident at a sensible,
  perceivable place in the new content.
- Selecting an option must not change neighbouring card dimensions or cause the
  page to jump unexpectedly.
- The confirmed booking, including its reference and choices, must still be
  present after a browser refresh.
- Confirmation copy must describe only behaviour this static application
  actually performs. It must not promise an email, SMS, council-system update,
  payment, or staff action that is not implemented.
- Provide a clear way to start a new booking and deliberately clear the saved
  booking.
- Work at both wide and narrow viewport widths without horizontal page overflow.

## Data and validation

- All fields are required.
- Postcode must be exactly four digits.
- Email must have a plausible local part and domain.
- Australian mobile number must accept `04xx xxx xxx` or ten digits beginning
  with `04`.
- Use only local deterministic state. Do not call an API or external service.

## Technical constraints

- Deliver `index.html`, `styles.css`, and `app.js` that run from a basic static
  file server.
- Use no frameworks, dependencies, external fonts, icon services, image
  services, analytics, telemetry, or network requests.
- Do not include real people, real addresses, or personal data.
