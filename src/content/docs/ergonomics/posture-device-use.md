---
title: Posture & Device Use
description: Design tasks that remain usable across seated, standing, handheld, mounted, and on-the-move contexts.
---

Posture is not a pose a designer can prescribe through a screen. It emerges from the person, task,
device, furniture, environment, and time spent interacting. A user may start a task seated at a
desk, continue on a phone in a queue, and finish on a tablet mounted to a cart. Good interface
design reduces the need for sustained, awkward, or forceful positions across that sequence.

The goal is not to make everyone sit in one “correct” posture. It is to make the task adaptable,
interruptible, and operable from more than one posture or input method.

## Neutral posture is a reference, not a destination

[OSHA’s computer-workstation guidance](https://www.osha.gov/etools/computer-workstations/positions)
describes neutral body positioning as comfortable alignment in which joints are naturally aligned.
Its examples include upright, declined, and reclined sitting as well as standing. OSHA also warns
that remaining in the same position for a prolonged period is not healthy, even when the position
is otherwise good.

[NIOSH identifies](https://www.cdc.gov/niosh/ergonomics/ergo-programs/risk-factors.html)
force, repetition, awkward posture, and static posture as physical risk factors. Their interaction
is more useful to a product team than a posture label:

| Exposure | Interface contribution | Design response |
|---|---|---|
| Awkward posture | Critical control is visible only when the neck, wrist, or torso moves toward an end range | Reflow, reposition, or provide an equivalent control |
| Static posture | Task requires uninterrupted viewing or holding | Save progress, create natural stopping points, and support device placement |
| Repetition | High-frequency action requires the same small movement | Add shortcuts, batching, defaults, or automation with review |
| Force | User must grip, press, or hold while acting | Remove sustained holds and support lighter alternative input |
| Duration | A short interaction expands into a long session | Expose progress, remaining effort, and resumable state |

These are design risks, not medical diagnoses. For safety-critical work or a concern about injury,
involve a qualified ergonomist and the people who perform the work.

## Map the real contexts of use

“Mobile” does not mean “walking,” and “desktop” does not mean “well adjusted.” Describe each
credible context in observable terms.

| Context | Likely constraint | Interface implication |
|---|---|---|
| Adjusted desk | Long duration and repetitive input | Efficient keyboard path, stable layout, task breaks, low reaching frequency |
| Laptop used alone | Screen and keyboard cannot be positioned independently | Shorter sessions or support for external display/input |
| Handheld phone | Device support, one-hand reach, finger occlusion | Reachable primary actions, forgiving targets, easy interruption |
| Tablet on a stand | Fixed orientation and viewing angle | Orientation support, no assumption that touch is available |
| Vehicle passenger or public transport | Vibration, interruptions, divided attention | Larger targets, persistent state, no time-critical precision |
| Field or clinical use | Gloves, glare, contamination controls, standing | High contrast, low precision, hardware-aware workflows |
| Bed or sofa | Unsupported arms and unusual viewing angle | Avoid sustained holds and orientation locks |

Do not design interaction while driving or performing another safety-critical task. Where a product
can be used in vehicles or around machinery, define explicit lockouts, voice-only modes, or safe
stopping conditions with domain specialists.

### Observe transitions

People change posture and grip during a task. Those transitions reveal problems that a static
screenshot misses:

- Does a modal disappear when the device rotates?
- Does the keyboard cover the primary action?
- Does switching from touch to hardware keyboard remove visible focus?
- Does backgrounding the app discard partially entered information?
- Does a two-column tablet layout become an overly dense single column?
- Can the user hand the task to another device without starting again?

Design for transition costs as deliberately as for the starting state.

## Desktop and laptop use

OSHA’s [computer workstation overview](https://www.osha.gov/etools/computer-workstations/)
emphasizes fit and adjustability rather than one arrangement that suits everyone. Its quick checks
include a supported lower back, relaxed shoulders, aligned wrists and forearms, adequate input
space, and supported feet.

Interface teams cannot choose a user’s furniture, but they influence exposure:

### Reduce input travel and repetition

- Keep the active object and its controls close in the visual and keyboard sequence.
- Provide keyboard shortcuts for repeated operations, but retain discoverable controls.
- Support bulk selection and batch actions where they do not increase error severity.
- Preserve focus after an action so the user does not repeatedly traverse the page.
- Avoid placing a frequent command at alternating extremes of a wide display.

### Support a comfortable viewing arrangement

[OSHA’s monitor guidance](https://www.osha.gov/etools/computer-workstations/components/monitors)
recommends placing the display in front of the user and notes that monitor position must account
for viewing needs such as bifocals. Software should not defeat that setup:

- reflow at browser zoom and enlarged text instead of forcing horizontal scanning;
- allow content width and panel density to adapt to large displays;
- avoid tiny status changes that pull the user toward the screen;
- keep focus and selected state visually clear; and
- let the user resize panes rather than fixing an information-dense workspace.

### Treat long laptop use as a coupled-device problem

A laptop’s display and keyboard are physically coupled: raising the display also raises the input
surface. OSHA’s [evaluation checklist](https://www.osha.gov/etools/computer-workstations/checklists/evaluation)
recommends desktop ergonomic principles and separate input devices when a laptop is primary.
Product guidance can support that by working fully with external keyboards, pointers, monitors,
zoom, and display scaling. Do not assume a touchpad gesture is the only path.

## Handheld and tablet use

### Do not assume one grip

People cradle a phone in one hand, type with two thumbs, hold it in one hand and point with the
other, prop it against a surface, or mount it. Hand choice and grip can change mid-task.

Design consequences:

- make primary actions reachable from the flow of content, not only a top corner;
- keep destructive actions separated from high-frequency actions;
- avoid gesture-only controls at the edges of the screen;
- allow equivalent keyboard, pointer, switch, or voice operation; and
- restore the exact task state after interruption.

### Support orientation and mounting

[WCAG 2.2 Success Criterion 1.3.4](https://www.w3.org/WAI/WCAG22/Understanding/orientation.html)
requires web content not to restrict its view and operation to one display orientation unless a
specific orientation is essential. This supports people who mount a device in a fixed position as
well as people who simply prefer another orientation.

Test orientation as a state change, not only as two screenshots. Preserve scroll position, focus,
entered data, open disclosure state, media state, and the availability of every action.

### Design for interruption

Handheld use is frequently fragmented. Interruption-resilient design also lowers physical demand:

- save drafts locally or remotely as appropriate;
- show what has been saved and what remains unsaved;
- divide long work into meaningful, resumable steps;
- avoid expiring input without warning and extension;
- allow review before committing consequential changes; and
- return users to the last meaningful point, not just the top of the screen.

## Visual environment and movement

Posture often compensates for a visual or input problem. A user leans toward low-contrast text,
tilts a glossy screen away from glare, or braces an arm to hit a small target. Treat those as system
failures rather than instructing the user to “sit properly.”

### Lighting and glare

- Meet contrast requirements in every theme.
- Support text enlargement and system appearance settings.
- Avoid information encoded only in faint borders or colour differences.
- Test in bright ambient light and low light on representative hardware.
- Keep critical controls visible when a software keyboard or magnifier is present.

Dark mode can reduce emitted light in some conditions, but it is not an ergonomic cure and can be
uncomfortable for some users. Preserve user choice.

### Motion and instability

Movement reduces pointing precision and reading stability. It also changes attention. In a credible
unstable context:

- enlarge and separate targets beyond the bare minimum;
- avoid short timeouts and precision gestures;
- use clear confirmation and reversible actions;
- persist notifications until they can be reviewed safely; and
- let users postpone non-urgent work.

Test instability safely. Do not ask a participant to walk while reading a demanding interface near
traffic, stairs, obstacles, or machinery.

## Design for posture variation

### Make controls adaptable

Adaptability is more robust than finding one ideal position:

- responsive action bars that remain near the current task;
- user-resizable panes and text;
- compact and comfortable density choices that preserve target requirements;
- movable tool palettes where spatial work demands them;
- support for external keyboards, pointers, switches, and voice control; and
- layouts that remain complete in split view and magnification.

Avoid automatic movement that surprises the user. If a toolbar relocates across breakpoints, keep
its order, label, and behaviour consistent.

### Remove sustained interaction

Avoid requiring the user to hold a button, maintain contact, or keep a device oriented for the
whole task. A sustained gesture combines precision, force, and duration. Prefer a mode that can be
entered and exited with discrete actions, with an obvious status and safe cancellation.

### Provide natural variation

Break reminders are not a substitute for reducing workload, but the interface can create natural
variation:

- show progress through long tasks;
- group work into sections with safe save points;
- offer “finish later” without punishment;
- alternate intensive input with review where the workflow allows; and
- avoid gamification that pressures users to continue through discomfort.

[NIOSH notes](https://www.cdc.gov/niosh/office-environment/about/index.html) that short breaks
can reduce discomfort in computer work. The timing and language of reminders should fit the task,
workplace policy, and user preference.

## Worked example: a 25-minute review workflow

A claims reviewer spends long sessions comparing evidence and entering a decision. The original
interface has a fixed left evidence panel, a decision form on the far right, drag-only document
ordering, and a session timeout that loses unsaved notes.

The redesign starts with a task-and-posture table:

| Observed demand | Change | Verification measure |
|---|---|---|
| Repeated pointer travel across a wide monitor | Add keyboard navigation and place actions beside the active claim | Pointer travel, shortcut completion, and focus order |
| Forward leaning to read scanned text | Add zoom, fit-width, contrast controls, and resizable panes | Task completion at 200% browser zoom and document zoom |
| Static viewing for the whole case | Divide review into evidence, decision, and confirmation checkpoints | Uninterrupted task duration and user-controlled pauses |
| Dragging to order documents | Add discrete **Move earlier/later** controls | Completion with clicks/taps and keyboard only |
| Notes lost on timeout | Autosave a draft, warn before expiry, and restore state | Recovery test after backgrounding and session renewal |
| Tablet mount locked in landscape | Make every step reflow in either orientation | State retention and action parity after rotation |

The acceptance criterion becomes:

> A reviewer can complete and resume a case using keyboard-only, pointer-only, or touch input at
> supported viewport sizes and 200% browser zoom, without sustained gestures or loss of entered
> data after an ordinary interruption.

That requirement connects interface behaviour to physical exposure without claiming that software
alone can prevent discomfort or injury.

## Testing protocol

### Prepare a context matrix

Select representative combinations from the actual product scope:

| Dimension | Conditions to include |
|---|---|
| Posture | Supported sitting, standing, handheld, mounted |
| Session | Brief lookup, realistic work block, interrupted/resumed |
| View | Small viewport, large viewport, zoom, enlarged text, split view |
| Input | Touch, pointer, keyboard, and supported assistive input |
| Orientation | Portrait, landscape, and rotation during a task |
| Environment | Typical lighting and a safely simulated challenging condition |

### Observe behaviour

Record more than task completion:

- reach, grip, hand, or posture changes;
- repeated movements and long pointer travel;
- zooming, leaning, bracing, or device repositioning;
- wrong activations and recovery;
- time before a natural pause is available;
- state lost during rotation, resize, backgrounding, or input change; and
- reported effort or discomfort before and after a realistic session.

Do not use a discomfort questionnaire to diagnose injury. Escalate persistent concerns through the
appropriate occupational health or ergonomics process.

### Verify the implementation

- Complete all actions by keyboard alone.
- Complete pointer tasks without dragging where WCAG requires an alternative.
- Rotate and resize during data entry without losing state.
- Test at 200% browser zoom and with text enlarged using platform settings.
- Connect an external keyboard and pointer to touch devices.
- Check visible focus when hardware input begins.
- Background, suspend, and restore the task.
- Confirm timeouts warn, extend, and preserve user work where applicable.

## Review checklist

- Have the actual use contexts and transitions been documented?
- Does the task avoid sustained awkward posture, grip, force, and repetitive precision where
  design can reduce them?
- Can users vary posture, hand, orientation, and input method?
- Are long tasks resumable with clear save status?
- Do zoom, reflow, text enlargement, and pane resizing work without lost actions?
- Are frequent controls near the active content and stable in order?
- Is every orientation complete unless one is genuinely essential?
- Are motion and field tests conducted safely?
- Have observed grip shifts, posture changes, errors, duration, and recovery been recorded?

## References

- [OSHA — Computer Workstations eTool](https://www.osha.gov/etools/computer-workstations/)
- [OSHA — Good Working Positions](https://www.osha.gov/etools/computer-workstations/positions)
- [OSHA — Monitor placement](https://www.osha.gov/etools/computer-workstations/components/monitors)
- [OSHA — Workstation evaluation checklist](https://www.osha.gov/etools/computer-workstations/checklists/evaluation)
- [NIOSH — Ergonomics and work-related musculoskeletal disorders](https://www.cdc.gov/niosh/ergonomics/about/index.html)
- [NIOSH — Identify ergonomic risk factors](https://www.cdc.gov/niosh/ergonomics/ergo-programs/risk-factors.html)
- [NIOSH — Office environments and safety](https://www.cdc.gov/niosh/office-environment/about/index.html)
- [WCAG 2.2 — Orientation](https://www.w3.org/WAI/WCAG22/Understanding/orientation.html)
- [ISO 9241-400:2007 — Physical input devices](https://www.iso.org/standard/38896.html)

---

## See also

- [Anthropometrics](/ergonomics/anthropometrics/) — Define populations and physical design ranges
- [Targets & Spacing](/ergonomics/targets-spacing/) — Reduce pointing effort and errors
- [Fine Motor Sensitivity](/perception/touch/fine-motor-sensitivity/) — Support alternative input and forgiving interaction
