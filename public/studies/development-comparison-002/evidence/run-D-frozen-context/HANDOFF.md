# Handoff: Wattle Bay hard-waste booking

## Implemented

- A dependency-free, static four-step booking flow in `index.html`, `styles.css`, and `app.js`.
- Service explanation and preparation guidance, followed by required resident fields for full name, street address, suburb, postcode, email, and Australian mobile.
- Custom validation with a focusable error summary, field-specific messages and links back to each invalid field. Postcodes require exactly four digits; email requires a local part and dotted domain; mobile accepts ten digits beginning with `04`, with or without spaces.
- A deterministic collection-window loader. The first attempt in a fresh `sessionStorage` session enters a loading state and then a recoverable error state. Retry loads the three local windows while resident details remain in memory and in the form.
- Native, same-name radio groups inside `fieldset`/`legend` structures for the three waste categories and three collection windows. The cards keep a constant border and minimum size between unselected, selected, focused, and error states.
- Review cards containing all resident details and both selections, with Back, Edit pickup, and Edit details routes that preserve entered state.
- An unambiguous confirmation with stable reference `WB-HA-0822`. The complete confirmation is stored in `localStorage`, restored on refresh, and described accurately as browser-only storage with no email, SMS, council update, payment, or external transmission.
- A Start a new booking action that opens a native modal confirmation dialog. Only the explicit destructive action clears the persisted booking and resets the flow.
- Responsive layouts at 820 px and 600 px breakpoints, a 320 px minimum document width, wrapping controls/content, system fonts, no external assets, and no network-capable application code.
- Step-transition focus management for headings, error summaries, the availability error, the newly loaded window legend, and the confirmation status. The modal starts on its safe action and restores its trigger on cancellation.

## Frozen Human Standards context applied

`../control/FROZEN_CONTEXT.md` was read in full before implementation and re-read in full immediately before writing this handoff.

The exact sections used were:

- `Keyboard Selection and Focus Completion Contract`
- `Implementation contract`
  - item 1, native controls
  - item 2, native one-of-many radio behaviour
  - item 3, custom-widget completeness (reviewed; no custom composite widget was used)
  - item 4, visible and ordered focus
  - item 5, separation of focus, selection, and commitment
  - item 6, destinations for substantial transitions
  - item 7, dialog focus lifecycle
- `Required pre-handoff exercise`, including all six rows in its evidence table
- `Evidence boundary`

The implementation uses native controls and native radio behaviour rather than custom ARIA radio widgets. Focus is moved for substantial step/error/confirmation changes and the modal lifecycle, but not for ordinary radio selection or field correction.

## Checks actually performed and passed

- `node --check app.js` — passed after implementation and again after the final JavaScript changes.
- `git diff --check` returned clean after implementation and after the final JavaScript changes, but the deliverables are untracked, so this result was not relied on as evidence for them.
- Dedicated `git diff --no-index --check /dev/null <file>` output checks for `index.html`, `styles.css`, `app.js`, and `HANDOFF.md` — all produced no whitespace-error output.
- Deterministic validator probes run directly in Node:
  - postcode `2444` accepted; `244` and `2A44` rejected
  - email `resident@example.test` accepted; `resident@` and `@example.test` rejected
  - mobile `0491 570 006` and `0491570006` accepted; `0391570006` and `049157006` rejected
- Source-structure audit run directly in Node — passed all of the following assertions:
  - all IDs are unique
  - each of the six resident inputs has an explicit label
  - all six resident inputs are required
  - there are exactly three `category` radios in one named group
  - there are exactly three `window` radios in one named group
  - both radio groups use `fieldset` and `legend`
  - the global and selected-card focus-visible rules are present
  - the narrow responsive breakpoint is present
  - application JavaScript has no `fetch`, `XMLHttpRequest`, `WebSocket`, or `EventSource` path
  - first-load failure is tied to session state
  - confirmation restoration is tied to local persistence
  - destructive reset uses the modal dialog
- Shell source audits:
  - no duplicate IDs were found
  - six required text/contact inputs, three category radios, and three window radios were found
  - no HTTP(S) references, CSS imports, URL assets, or network API calls were found
  - the three required category labels, three exact collection-window values, and stable reference were found
- Final workspace inspection found only the requested deliverables plus this handoff as new files; no package, build output, test harness, or commit was created.

These are deterministic source/runtime checks only. They are not reported as rendered interaction evidence.

## Failed, blocked, missing, or unreachable checks

### Rendered browser exercise — blocked

The required pointer-free rendered exercise was attempted with fresh temporary browser profiles and a dependency-free Chrome DevTools keyboard harness. Chrome aborted before exposing a page target, so no harness assertion or screenshot ran. The temporary harness was deleted.

Additional browser launch paths were attempted:

- Google Chrome 151 headless with a temporary profile: exited `134` before rendering. A second attempt with `--no-sandbox`, `--single-process`, `--no-zygote`, and crash-reporter disabling also exited `134`.
- Firefox 153 headless with a temporary profile: printed its headless-mode notice and exited `134` before producing a screenshot. A retry with the Firefox content, RDD, GMP, and GPU sandbox environment switches disabled also exited `134`.
- SafariDriver 26.5.2 on a temporary local port: could not start; the environment reported `nice(5) failed: operation not permitted`, and the local WebDriver endpoint was unreachable.

Consequently, at both the intended wide viewport (1280 × 900) and narrow viewport (390 × 844), every rendered Human Standards exercise row remains **blocked/unexercised**:

- Reach and order: blocked; Tab and Shift+Tab order was not observed in a rendered browser.
- Selection group: blocked; arrow-key movement and Space selection were not observed in a rendered browser.
- Visible focus: blocked; default, selected, error, and disabled-adjacent focus indicators were not visually confirmed.
- Activation: blocked; Enter and Space activation and duplicate-submission behaviour were not observed in a rendered browser.
- Step transition: blocked; before/after active elements and viewport perception were not recorded from a rendered browser.
- Dialog lifecycle: blocked; initial focus, containment, Escape, and restored focus were not observed in a rendered browser.
- Wide and narrow horizontal overflow: blocked; responsive CSS was inspected, but actual rendered scroll widths were not measured.
- Confirmation persistence after an actual browser refresh: blocked; the localStorage save/restore path was source-audited but not exercised in a browser.
- Complete wide and narrow core flows: blocked and therefore not reported as passing.

No screen-reader exercise, automated accessibility scan, pointer/touch exercise, cross-browser visual comparison, or visual-quality approval was performed.

### Other failed or unavailable diagnostics

- `/usr/bin/tidy -errors -quiet index.html` exited `2`. This installed Tidy build did not recognise standard HTML5 landmarks such as `header`, `main`, `nav`, `section`, and `dialog`, and also misread UTF-8 arrow characters. Its output was not treated as a useful HTML5 validation result.
- A final `pgrep` cleanup diagnostic could not inspect processes because the sandbox reported `sysmond service not found` / `Cannot get process list`. Each attempted browser command had already exited, and the SafariDriver shell command explicitly killed and waited for its temporary process. No static file server was started.

## Run notes

Serve the repository with any basic static file server and open `index.html`. No install or build step is required. A genuinely fresh browser session is needed to observe the deliberate first collection-window failure; Retry then reveals the choices.
