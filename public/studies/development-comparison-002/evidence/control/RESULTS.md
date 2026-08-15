# Human Standards held-out development comparison 002 — results

Date: 2026-08-15 (Australia/Sydney)

## Decision

The candidate MCP is materially better at **finding and delivering the new
completion contract**, and candidate artifact C **passed the complete rendered
keyboard and focus exercise** at wide and narrow viewports. This one-run
comparison still does **not** show a clear end-user quality improvement over
either the baseline or published MCP because those control artifacts were not
given the same Chrome fallback keyboard run and all four passed the comparable
rendered state checks.

Treat `0.3.1` as a verified source release candidate for this exercised task,
not as a proven prevention or detection mechanism across tasks. Its keyboard
release gate is now passed. A source push is reasonable; npm publication and
broader product claims remain separate gates.

## What was tested

Four isolated, sequential Codex CLI runs implemented the same previously unused
fictional Wattle Bay Council task:

| ID | Treatment |
|---|---|
| A | No Human Standards MCP or frozen Human Standards context. |
| B | Published `@humanstandards/mcp-server@0.3.0`, explicitly directed. |
| C | Local `0.3.1` candidate at `c93e9d30f54baac1cb5a38603b555e33d067493a`, explicitly directed. |
| D | No MCP; the candidate completion contract supplied verbatim as frozen context. |

The protocol, task, prompts, package identities, checksums, and outcome
boundaries were frozen before the recorded runs. There was one run per
condition, no independent blinded human scoring, and no use of Study 001
artifacts.

## Main result

### Retrieval and guidance delivery

- **Candidate C found the intended contract directly.** Its standards search
  ranked the ARIA and keyboard document first with the new contract in the
  result snippet. The run retrieved `Keyboard Selection and Focus Completion
  Contract` before implementation and again before handoff.
- **Legacy B found broadly relevant guidance but not the new contract.** It made
  five broad searches before implementation, retrieved multiple full documents
  and sections, and repeated another broad review pass before handoff.
- **Frozen-context D used the contract most literally.** It read the exact
  70-line context before and after implementation, chose native controls plus a
  reset dialog, and caught two edge cases before attempting browser validation.
- **Baseline A still produced a strong accessible-looking artifact.** The task
  prompt itself was explicit enough that absence of Human Standards did not
  prevent good native-control, focus-target, retry, review, and persistence
  choices in this single run.

This supports the narrow claim that the candidate improves relevant guidance
discovery and reduces retrieval sprawl. It does not support the broader claim
that the MCP alone improved the finished interface.

### Independent rendered checks

The coordinator exercised each artifact in the Codex in-app browser. The run
agents' own source checks are not counted as rendered evidence here.

| Check | A baseline | B 0.3.0 | C 0.3.1 | D frozen contract |
|---|---:|---:|---:|---:|
| Six empty required fields expose persistent errors | Pass | Pass | Pass | Pass |
| Error or transition focus lands at a perceivable target | Pass | Pass | Pass | Pass |
| First window load fails recoverably; Retry reveals 3 exact windows | Pass | Pass | Pass | Pass |
| Resident details survive the failure and correction path | Pass | Pass | Pass | Pass |
| Native radio groups select one category and one window | Pass by pointer/API | Pass by pointer/API | Pass by pointer/API | Pass by pointer/API |
| Card width and height remain stable after selection | Pass | Pass | Pass | Pass |
| Review contains resident details and both choices | Pass | Pass | Pass | Pass |
| Confirmation persists after refresh with the same reference | Pass | Pass | Pass | Pass |
| 390 x 844 layout has no horizontal page overflow | Pass | Pass | Pass | Pass |
| Complete pointer-free keyboard path | Missing | Missing | **Pass in Chrome** | Missing |

The in-app browser did not deliver `Enter`, `Space`, `Tab`, or `ArrowDown`
reliably even to native controls. A Chrome fallback then exercised C from start
to confirmation at `1440 x 1000` and `390 x 844` without a pointer. Tab and
Shift+Tab followed the task order; Enter and Space activated native controls;
ArrowDown and ArrowUp moved and selected within both radio groups; validation,
step, retry, review, and confirmation focus destinations were perceivable;
visible focus was confirmed in screenshots; the reference occurred once and
persisted after refresh; and the narrow document's client and scroll widths
both measured `375`. C therefore passes the contract's rendered keyboard exercise
for the tested browser and task.

A, B, and D were not repeated through the Chrome fallback, so their keyboard
rows remain missing rather than failed. This closes C's release gate but does
not create a fair keyboard comparison against the controls.

The frozen-context build's native reset dialog was additionally exercised:
initial focus landed on the safe `Keep this booking` action, cancelling returned
focus to `Start a new booking`, and the persisted booking was not cleared. The
destructive confirmation was intentionally not activated.

Detailed machine-readable observations are in `browser-results.json` and
`keyboard-results.json`.

## Visual coordinator observations

- All four artifacts communicate the council task, recovery state, review, and
  browser-only confirmation clearly.
- Candidate C is the leanest and visually coherent. Its validation detail is
  weaker than B and D: each field says `Enter this required information`
  rather than a field-specific instruction.
- D is the strongest safety treatment because the saved-booking reset has a
  clear consequence, safe initial focus, cancellation path, and verified focus
  return.
- B is the most editorially elaborate and code-heavy; it is polished but the
  breadth did not produce a clear task-outcome advantage.
- A demonstrates the comparison's ceiling problem: a strong prompt and a
  capable model can independently produce most of the desired behaviours.

The original full-page narrow captures for A, B, and C collapsed during image
capture. This was not a product failure. Fresh viewport captures measured
`clientWidth = 375`, `scrollWidth = 375`, and `main width = 355` for each and
rendered normally. Files named `07-narrow-viewport-recheck.png` and A's
`*-viewport.png` replacements are the authoritative captures.

## Efficiency and implementation footprint

Token figures are the CLI run totals reported by Codex and include cached
input. They are descriptive only; one sample per condition is too small for a
stable efficiency estimate.

| Condition | Input tokens | Cached input | Output tokens | Reasoning tokens | App source lines |
|---|---:|---:|---:|---:|---:|
| A | 2,112,560 | 2,027,776 | 38,054 | 6,866 | 1,623 |
| B | 2,509,976 | 2,363,136 | 39,458 | 9,221 | 1,791 |
| C | 2,184,249 | 2,075,392 | 24,918 | 5,837 | 788 |
| D | 1,425,773 | 1,351,424 | 38,390 | 10,289 | 1,150 |

Relative to published MCP B, candidate C used 13.0% fewer input tokens, 36.8%
fewer output tokens, and produced 56.0% fewer application source lines. That is
a useful signal of lower retrieval and implementation sprawl, but not proof of
quality or repeatability.

## What the candidate prevented or detected

### Supported by this comparison

- It prevented the new contract from remaining buried in a broad standards
  corpus: search surfaced it directly and the agent retrieved it twice.
- It made the evidence boundary explicit. Candidate C stated that static/native
  semantics did not satisfy the rendered keyboard contract and reported the
  initially blocked exercise as missing. The coordinator then closed that gap
  with a Chrome fallback instead of converting source inspection into a pass.
- It focused implementation attention on native groups, transition targets,
  visible focus, stable selected-card geometry, and pre-handoff exercise.
- Candidate C passed the resulting rendered keyboard and focus contract in
  Chrome at both tested viewports.

### Not established

- It did not demonstrate that the contract prevented a defect that would have
  occurred without it; the controls were not given the same Chrome keyboard
  fallback and their comparable rendered state checks also passed.
- It did not detect a defect unique to the baseline or legacy artifact.
- It did not produce a uniquely superior end-user flow; all four passed the
  rendered pointer/state checks.
- Evidence honesty was not unique to C. The frozen common prompt explicitly
  required every run to record blocked or missing checks, and A, B, and D did so.
- Nothing here establishes WCAG conformance, screen-reader usability,
  production readiness, or causality.

## Release recommendation

1. Push the two already committed Human Standards changes on local `main`
   (`1f2562b`, `c93e9d3`) to `origin/main` when the source-release gate is
   approved. The candidate keyboard gate for this task is passed.
2. Keep npm publication of `@humanstandards/mcp-server@0.3.1`, directory metadata,
   client configuration, deployment, and live verification as separate gates.
3. For a fair comparative keyboard claim, repeat the same Chrome keyboard run
   for A, B, and D rather than treating their missing evidence as failures.
4. For a stronger product claim, repeat this comparison across several held-out
   tasks and add independent blinded human review.

No product commit, push, npm publication, deployment, client-config change, or
Codex restart was needed or performed for this comparison. At completion the
Human Standards repository is clean, remains on `main` at `c93e9d3`, and is two
commits ahead of `origin/main`.

## Evidence index

- `protocol.md` — frozen comparison design and boundaries.
- `manifest.txt` — frozen file checksums.
- `FROZEN_CONTEXT.md` — exact completion contract supplied to D.
- `browser-results.json` — independent rendered observations.
- `keyboard-results.json` — C's wide and narrow Chrome keyboard exercise.
- `../run-A-baseline/HANDOFF.md` through
  `../run-D-frozen-context/HANDOFF.md` — agent-declared implementation and
  checks, kept separate from coordinator observations.
- `../screenshots/` — current-run wide, narrow, validation, failure, selection,
  review, confirmation, persistence, and D dialog evidence.

The runs used Codex CLI non-interactive mode with `--ephemeral`, consistent with
OpenAI's documented non-persistence behaviour for ephemeral runs:
<https://learn.chatgpt.com/docs/non-interactive-mode>.
