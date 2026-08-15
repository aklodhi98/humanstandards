# Wattle Bay Council hard-waste booking handoff

## Implemented

- A complete dependency-free static application in `index.html`, `styles.css`, and `app.js`.
- Five clear states: service introduction, resident details, pickup choices, review, and confirmation.
- Required resident fields with persistent inline errors and a focused error summary.
- Exact validation for a four-digit postcode, a plausible email address, and Australian mobile numbers beginning with `04` in spaced or unspaced form.
- A deterministic first-load failure for collection windows once per browser session, followed by a working Retry state. Entered details and selections are retained.
- Native grouped radio controls for exactly one waste category and exactly one collection window. Selected cards use a fixed border width so selection does not resize them.
- Review cards showing all resident details and both pickup choices, with correction routes that preserve state.
- A stable `WB-260822-0417` confirmation reference. The confirmed booking is stored in `localStorage` and restored on refresh.
- A two-stage “Start a new booking” action that asks for deliberate confirmation before removing the stored booking.
- Focus movement to each new step heading, focused load and validation errors, a skip link, strong `:focus-visible` styling, semantic forms/fieldsets, and conventional button/radio keyboard behaviour.
- Responsive single-column layouts at 760 px and 430 px breakpoints, constrained fluid widths, wrapping text, and narrow-screen full-width actions.
- Confirmation and footer copy accurately state that this static demonstration does not send email or SMS or update a council system.

## Checks actually performed

### Passing

- `node --check app.js` completed with no JavaScript syntax errors.
- `git diff --check` completed with no whitespace errors.
- Source search across the three application files found no `fetch`, `XMLHttpRequest`, HTTP(S) URL, CSS `@import`/`url()`, iframe, image, analytics, or telemetry reference.
- A dependency-free test script executed the real `app.js` against the locally available LinkeDOM runtime. The temporary script was removed after the run. It checked:
  - empty submission exposes all six required-field errors;
  - the error summary receives focus;
  - invalid postcode, email, and mobile values produce field-specific format messages;
  - a fresh session’s first window load fails and focuses the recoverable error;
  - Back preserves entered resident details;
  - Retry exposes exactly three collection windows;
  - review corrections preserve both selected radio values;
  - corrected resident information appears in review;
  - confirmation survives a fresh app boot using the same local storage;
  - starting a new booking does not clear storage before explicit confirmation;
  - explicit clear removes storage and returns to the introduction.
- The same DOM flow was run with `window.innerWidth` assumptions of 1280 px and 360 px. At 360 px it traversed introduction → details → loaded options → review → confirmation → restored confirmation, and verified exactly one selection in each radio group. This runtime does not calculate CSS layout, so these are state/behaviour checks, not rendered overflow checks.
- Responsive source inspection confirmed breakpoint rules at 760 px and 430 px, single-column grid overrides, constrained main widths, `min-width: 0`, `overflow-wrap`, and border-box sizing.

### Failed, blocked, missing, or unreachable

- Direct installed Google Chrome and Firefox headless launches both terminated with exit code 134 before loading the page.
- The locally bundled Playwright Chromium launch also failed before page creation because the managed macOS sandbox denied `MachPortRendezvousServer` registration (`Permission denied (1100)`). This was the same underlying browser-process restriction.
- Playwright WebKit and Firefox executables were not present. They were not downloaded because the task prohibits installing packages or external dependencies.
- Consequently, no rendered screenshots, computed 1280 px/360 px overflow measurements, visual focus-ring inspection, or true browser keyboard run could be completed. These states are not reported as visually passing.
- `tidy -errors -quiet index.html` and `xmllint --html --noout index.html` were run. Both legacy parsers reported standard HTML5 elements such as `header`, `main`, `section`, and `footer` as unknown; `tidy` also warned about standard ARIA/HTML5 attributes. No malformed nesting specific to the document was identified, but these tools cannot provide a clean HTML5 validation result in this environment.
- No persistent server was started, no network request was made, no package was installed, and no commit was created.
