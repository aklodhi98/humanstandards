# Wattle Bay hard-waste booking — handoff

## Implemented

The repository now contains a dependency-free static booking application in `index.html`, `styles.css`, and `app.js`.

The application provides:

- a four-step service explanation, resident-details, pickup-choice, and review flow;
- required full name, street address, suburb, postcode, email, and Australian mobile fields;
- specific validation for four-digit postcodes, plausible email addresses, and spaced or unspaced `04` mobile numbers;
- a deterministic first-session availability failure with a clear Retry action, followed by the three required collection windows;
- one native radio group for waste category and one for collection window;
- error summaries linked to adjacent, persistent field or group errors;
- preserved data when moving backwards or recovering from the availability error;
- explicit focus targets for step changes, validation failures, successful retry, and confirmation;
- review links for editing details or pickup choices;
- a stable `WBC-HW-4827` reference and a confirmation saved in `localStorage`;
- confirmation restoration after refresh, plus a destructive “Clear and start again” action which removes the saved booking and resets the form;
- copy which explicitly says that the demo does not send email or SMS, update a council system, take payment, or trigger staff action;
- responsive single-column recomposition below 48rem, a smaller-width adjustment below 34rem, wrapping actions, constrained content, and overflow-safe values;
- semantic landmarks, a skip link, visible focus styling, native buttons/forms/radios, labelled fieldsets, live availability status, and reduced-motion handling.

## Human Standards consulted

Human Standards was used before implementation and again during the pre-handoff review. The implementation uses native controls, focus destinations, status feedback, linked error summaries, 44px-or-larger controls, and relationship-ranked spacing based on that guidance.

### Before implementation

- `search_standards`: `multi-step council service booking form required fields inline validation error recovery review confirmation focus management`
- `search_standards`: `radio card single choice group keyboard arrow keys focus completion dynamic steps`
- `search_standards`: `responsive narrow viewport form cards spacing touch targets no horizontal overflow`
- `get_standard`: `/interaction-patterns/forms/` (initial `max_chars: 50000` request failed because the permitted maximum is 30000; repeated successfully with 30000)
- `get_standard`: `/code-design-tokens/aria-keyboard-patterns/` (initial `max_chars: 50000` request failed because the permitted maximum is 30000; repeated successfully with 30000)
- `get_standard`: `/interaction-patterns/navigation/` (initial `max_chars: 50000` request failed because the permitted maximum is 30000; repeated successfully with 30000)
- `get_standard`: `/code-design-tokens/touch-targets-spacing/`
- `get_standard`: `/code-design-tokens/spatial-rhythm-layout/`
- `get_spatial_rhythm`: `form-stack`, `comfortable`, `fluid`
- `get_standard`: `/code-design-tokens/aria-keyboard-patterns/`, section `Keyboard Selection and Focus Completion Contract`
- `get_standard`: `/code-design-tokens/aria-keyboard-patterns/`, section `Radio groups` (failed: section does not exist)
- `get_standard`: `/code-design-tokens/aria-keyboard-patterns/`, section `Native HTML first` (failed: section does not exist)

### Before handoff

- `search_standards`: `review completed multi-step booking form forced loading error retry radio cards focus transitions persistent confirmation responsive mobile`
- `get_standard`: `/interaction-patterns/forms/`, section `Validation and error handling`
- `get_standard`: `/code-design-tokens/aria-keyboard-patterns/`, section `Keyboard Selection and Focus Completion Contract`
- `get_standard`: `/checklists-playbooks/content-microcopy-templates/`
- `get_spatial_rhythm`: `form-stack`, `comfortable`, `large`
- `get_spatial_rhythm`: `form-stack`, `comfortable`, `small`
- `get_heuristic`: `H1` Visibility of system status
- `get_heuristic`: `H3` User control and freedom
- `get_heuristic`: `H5` Error prevention
- `get_heuristic`: `H9` Help users recognise, diagnose, and recover from errors

## Checks actually performed

### Passed

- `node --check app.js` — JavaScript syntax passed.
- `git diff --check` — no whitespace errors were reported.
- Searched `index.html`, `styles.css`, and `app.js` for HTTP(S) URLs, `fetch`, `XMLHttpRequest`, CSS imports, and CSS URL assets — none were found.
- Searched for removed focus outlines and positive `tabindex` values — none were found.
- Ran the application validation and deterministic-state functions in a dependency-free Node VM without changing production code. The following checks passed:
  - postcode accepts exactly four digits;
  - postcode rejects three digits and rejects letters;
  - email accepts `resident@example.com` and rejects a domain without a dot;
  - mobile accepts both `0412 345 678` and `0412345678`;
  - mobile rejects a number not beginning with `04`;
  - whitespace-only required input is rejected;
  - a complete valid resident-detail set has no validation errors;
  - a fresh-session first availability attempt reaches the error state and records its session flag;
  - Retry reaches the loaded state;
  - the required three category keys and three window keys are present;
  - a confirmed reference, category, window, and resident details restore from local storage.
- Inspected the responsive source rules for the intended wide and narrow assumptions: two-column content/aside at wide widths, one-column recomposition below 48rem, single-column fields and cards, full-width narrow actions, wrapping, `min-width: 0`, and overflow-safe review values.

### Failed, blocked, missing, or not exercised

- **Rendered wide flow: blocked.** Google Chrome 151 aborted with exit code 134 when launched headlessly with a temporary profile, remote debugging, `--no-sandbox`, disabled GPU/crash reporting, and again in one-shot `--dump-dom` mode. No Chrome DOM or screenshot was produced.
- **Rendered narrow flow: blocked.** Firefox 153 aborted with exit code 134 in headless remote-debugging mode. A separate 1440×1100 one-shot screenshot attempt printed only its headless notice and produced no image. Because no renderer launched, neither wide nor narrow horizontal overflow was measured.
- **Keyboard Selection and Focus Completion Contract: blocked, not passed.** Tab/Shift+Tab reach and order, radio Arrow/Space behaviour, Enter/Space activation, duplicate-submission prevention, active-element transitions, and visual focus in default/selected/error/disabled-adjacent states could not be exercised in a rendered browser. Native controls and focus code were inspected, but that is not reported as equivalent evidence.
- **Visual review: blocked.** Card dimensions, page-jump behaviour, relationship rhythm, optical balance, and focus-indicator contrast were not visually confirmed. The CSS keeps the selected and unselected card border at the same 2px width, but the rendered result remains unexercised.
- **Quick Look rendering fallback: blocked.** `qlmanage` was also tried as a non-browser visual fallback, but its sandbox initialisation failed before producing a thumbnail.
- **Refresh and clear through a browser: blocked.** Storage serialisation/restoration and removal were exercised at the application-function level in Node, but browser refresh and the rendered clear/reset path were not exercised.
- **Screen reader, real touch device, 200% zoom, text-spacing override, and screen magnification: not exercised.** No conformance claim is made.
- **Dialog lifecycle: not applicable.** The application has no dialog.
- **HTML validator: unavailable in a useful form.** The installed `tidy` treated HTML5 landmarks (`header`, `main`, `footer`) and ARIA attributes as unknown/proprietary, so its output was not a valid HTML5 check and is not reported as passing.

No persistent server was started, no package was installed, no external service was called, and no commit was created.
