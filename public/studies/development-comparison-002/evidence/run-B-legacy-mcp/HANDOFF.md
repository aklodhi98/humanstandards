# Wattle Bay Council hard-waste booking — handoff

## Implemented

- A dependency-free static application in `index.html`, `styles.css`, and `app.js` with no build step, external assets, network requests, telemetry, or service calls.
- A four-step booking flow: service explanation, resident details, pickup choices, review, then a distinct confirmation state.
- Resident fields for full name, street address, suburb, postcode, email and Australian mobile number, all required and using appropriate input types, autocomplete tokens and input modes.
- Custom validation for exactly four postcode digits, a plausible email local part/domain, and either `04xx xxx xxx` or ten digits beginning with `04`.
- Persistent per-field error text, `aria-invalid`, linked hints/errors, and a focused error summary with links to relevant controls.
- Native radio groups for exactly one waste category and one collection window. Checked styling uses a constant border footprint so selection does not change card geometry.
- Deterministic collection-window loading. The first attempt in a fresh browser session is tracked with `sessionStorage` and fails; Retry loads the three required windows while form values remain in memory.
- Back and edit paths that retain resident fields and both choices. Dynamic step changes move focus to the new step heading.
- A review page containing every resident field plus the waste category and collection window.
- A stable reference (`WBC-HW-260818-1047`) and an explicit confirmation that describes only browser-local behaviour.
- Confirmed booking persistence in `localStorage`, including reference and choices, with restoration during application initialisation after refresh.
- A native modal confirmation before “Start a new booking” clears the saved booking. The safe action receives initial focus; confirming clears storage and resets the flow.
- Keyboard-native buttons, forms, radio groups and dialog behaviour; a skip link; a global visible focus treatment; live loading status; and reduced-motion handling.
- Responsive source rules for wide three-column choice cards, narrow single-column forms/cards, stacked narrow actions, wrapping long values and explicit horizontal-overflow guards.
- A relationship-ordered spacing scale (`attached < associated < grouped < separated < sectional`) used for labels/controls/messages, fields, actions and page sections.

## Checks actually performed

### Passed source and logic checks

- `node --check app.js` passed after implementation and again after the final edits.
- `git diff --check` passed after implementation and again after the final edits.
- Because all deliverables are new/untracked, each of `index.html`, `styles.css`, `app.js`, and `HANDOFF.md` was also checked with `git diff --no-index --check /dev/null <file>`; each returned the expected “files differ” status with no whitespace-error output.
- Python standard-library HTML parsing passed for unique IDs and explicit `label[for]` targets.
- Confirmed in parsed/source structure that all eight required data/choice groups have required controls.
- Confirmed exactly three `wasteCategory` controls, exactly three `collectionWindow` controls, and the exact three required collection-window strings.
- Confirmed every referenced script and stylesheet is local and no external resource URL is present.
- Confirmed `app.js` contains no `fetch`, `XMLHttpRequest`, or `WebSocket` call.
- Confirmed the source contains `localStorage` read/write for confirmed bookings and `sessionStorage` read/write for first availability attempt state.
- Confirmed the responsive breakpoint, `overflow-x` guard, `:focus-visible` treatment, and constant-footprint checked-card selector are present in CSS.
- Extracted and executed the actual validation functions from `app.js` in Node. Passed cases:
  - postcode accepts `2450`;
  - postcode rejects three digits and rejects letters;
  - email accepts `casey.lee+home@example.com.au`;
  - email rejects a missing domain suffix and rejects a missing local part;
  - mobile accepts `0412 345 678`;
  - mobile accepts `0498765432`;
  - mobile rejects a non-`04` number and partially spaced input;
  - all six resident validators reject empty input.
- Confirmed all 42 literal JavaScript ID lookups resolve to an element in `index.html`.
- Final HTML parse confirmed unique IDs, valid explicit label targets, and accessible names on both forms via `aria-labelledby`.
- Source-level wide assumption review: choice grids and introductory cards use multi-column layouts; all grid tracks use `minmax(0, …)` and long output values wrap.
- Source-level narrow assumption review: at `46rem` grids collapse to one column and upcoming progress items are hidden; at `32rem` actions stack; the page shell uses bounded fluid width and inputs use `width: 100%`.

### Failed, blocked, missing or unreachable checks

- Rendered browser testing was attempted and is **blocked in this execution environment**. Installed Google Chrome 151 aborted before loading the page:
  - remote-debugging/headless launch exited before a target became available;
  - `--headless --no-sandbox --dump-dom` exited with status 134;
  - a second headless launch with crash reporting disabled and stderr logging also exited with status 134.
- Installed Firefox was also attempted with a temporary profile, headless mode, a `1440×1000` window and screenshot output; it exited with status 134 before producing a screenshot.
- Because neither installed browser rendered a page, the following are **not reported as passing**:
  - end-to-end pointer-free keyboard traversal at a wide viewport;
  - end-to-end pointer-free keyboard traversal at a narrow viewport;
  - computed focus order and visible focus appearance in a browser;
  - the first-load failure, Retry success and value preservation observed in a rendered DOM;
  - card bounding-box comparison before and after radio selection;
  - computed horizontal-overflow measurements at wide and narrow widths;
  - browser refresh restoration of the confirmed booking;
  - native dialog focus trapping, Escape handling and focus restoration;
  - screen-reader announcements;
  - actual touch-device, 200% zoom, text-spacing override, high-contrast, or assistive-technology checks;
  - screenshots or visual-regression checks.
- No server was started, in accordance with the instruction not to start a persistent server. No package or browser driver was installed.

## Human Standards consultation record

The configured read-only Human Standards MCP was used before implementation and again before handoff.

### Before implementation

`search_standards` queries:

1. `multi-step government service form required field validation review confirmation`
2. `recoverable loading error retry preserve entered form data`
3. `radio card single choice keyboard focus states`
4. `focus management step change perceivable new content`
5. `responsive mobile forms touch targets no horizontal overflow`

`get_standard` paths and full relevant sections read:

- `/interaction-patterns/forms/` — document retrieval; `Validation and error handling`; `Multi-step forms`; `Accessibility requirements`; `Mobile form design`.
- `/checklists-playbooks/form-design-playbook/` — document/section-map retrieval; `Phase 8: Review and Confirmation`; `Error Summary`; `Autosave and Data Loss Prevention`.
- `/code-design-tokens/aria-keyboard-patterns/` — document/section-map retrieval; `The First Rule of ARIA`; `Focus Management`.
- `/interaction-patterns/navigation/` — document/section-map retrieval; `Focus management for dynamic content`.
- `/interaction-patterns/notifications-feedback/` — document/section-map retrieval; `Error feedback design`; `Success feedback`.
- `/code-design-tokens/touch-targets-spacing/` — document/section-map retrieval; `Specifications`; `Responsive Touch Targets`.

Five early `get_standard` metadata calls used an invalid `max_chars: 1000` for the form playbook, ARIA/keyboard, navigation, notifications/feedback, and touch-target paths. The MCP rejected them because the minimum is 2000; each was repeated successfully with `max_chars: 2000`, and the relevant sections were then retrieved without truncation.

`get_spatial_rhythm`:

- `pattern: form-stack`, `viewport: fluid`, `density: comfortable` before implementation.

Guidance applied from this pass: native controls and semantic groups; visible labels; linked help and error text; submit/blur validation; specific error recovery; focused summaries; one purpose per step; explicit progress; preserved back-navigation data; heading focus after dynamic navigation; persistent loading/error/success feedback; 44px-or-larger primary targets; and relationship-ordered spacing.

### Before handoff

`search_standards` queries:

1. `review implemented multi-step service form accessibility error recovery confirmation clear saved booking`
2. `responsive form audit focus keyboard radio groups error summaries narrow viewport`

`get_standard` paths and full relevant sections read:

- `/checklists-playbooks/accessibility-checklist/` — section-map retrieval; `Keyboard`; `Forms`; `Error Handling`; `Focus Management`; `Dialogs (Modals)`.
- `/checklists-playbooks/form-design-playbook/` — `Phase 9: Implementation Checklist`.
- `/decision-making-errors/defensive-design/` — section-map retrieval; `Show state and consequences`; `Recovery: Make failures survivable`.

`get_heuristic`:

- `H1` Visibility of system status.
- `H3` User control and freedom.
- `H5` Error prevention.
- `H9` Help users recognise, diagnose and recover from errors.

`get_spatial_rhythm`:

- `pattern: form-stack`, `viewport: small`, `density: comfortable`.
- `pattern: form-stack`, `viewport: large`, `density: comfortable`.

Guidance applied from this pass: both forms received explicit accessible names; format-constrained fields received `pattern` attributes; the destructive reset explains its exact consequence and requires confirmation; loading, failure and success states remain explicit; back/edit controls preserve user control; and the CSS spacing tokens preserve the prescribed relational order for both viewport assumptions. Because browser rendering was blocked, the final spatial-rhythm review was source-level only, not a rendered validation.
