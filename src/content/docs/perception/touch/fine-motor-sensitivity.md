---
title: Fine Motor Sensitivity
description: Make pointing and touch forgiving through larger targets, alternatives to precision gestures, and input flexibility.
---

Fine motor control is the ability to make small, coordinated movements. Interfaces place demands
on it whenever a person aims at a target, keeps a pointer steady, presses and holds, drags along a
path, performs a multipoint gesture, or completes an action within a short time.

Those demands exclude more people than a diagnosis list suggests. Tremor, spasticity, arthritis,
pain, weakness, limb difference, neurological conditions, and age-related changes can affect
movement. So can a temporary injury, medication, fatigue, cold hands, gloves, a cracked screen,
an unfamiliar input device, or vibration on public transport.

Designing for fine motor variation means reducing **precision, force, duration, repetition, and
coordination demands**, then offering another way when a demanding gesture is useful but not
essential.

## Model the interaction demand

Do not infer capability from appearance or a named condition. Examine what the interface requires:

| Demand | Example | Why it can fail |
|---|---|---|
| Precision | Tapping a small icon beside another icon | The activation point lands outside the target or on its neighbour |
| Steadiness | Holding a pointer over a menu while moving into a submenu | Small involuntary movement closes or changes the menu |
| Sustained contact | Long-pressing or dragging | Contact must be maintained while other movement is controlled |
| Multipoint coordination | Pinching, rotating, or using two-finger controls | Several contacts must be placed and moved together |
| Path accuracy | Drawing a specific shape or swiping through a narrow channel | Direction and trajectory determine success |
| Timing | Double-tapping quickly or acting before a timeout | The action window may be shorter than the user can manage |
| Repetition | Activating the same small control many times | Fatigue amplifies other motor limits |
| Force | Pressing firmly or maintaining a grip | Strength and pressure sensing vary by person and device |

This task-level model produces concrete requirements. “Accessible to people with tremor” is hard
to verify; “every reorder action has discrete Move up and Move down controls” is testable.

## Standards baseline

### Target size and spacing

[WCAG 2.2 Success Criterion 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)
requires pointer targets to be at least 24 by 24 CSS pixels at Level AA, subject to defined
exceptions. Its spacing exception allows some undersized targets when 24 CSS-pixel circles centred
on their bounding boxes do not intersect another target or equivalent circle.

[Success Criterion 2.5.5](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced)
sets a 44 by 44 CSS-pixel Level AAA target, again with defined exceptions. Use the larger target as
a practical starting point for frequent, consequential, or mobile actions. Conformance at 24 CSS
pixels does not guarantee comfortable use.

Measure the **interactive boundary**, not the icon artwork. A 20-pixel icon can sit inside a much
larger button. Ensure that expanded hit areas do not overlap and that focus indicators still match
the operable control.

### Dragging movements

[WCAG 2.2 Success Criterion 2.5.7](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements)
requires functionality that uses dragging to be achievable with a single pointer without dragging,
unless dragging is essential or controlled by the unmodified user agent. Keyboard support alone
does not necessarily satisfy this criterion; the alternative must also work using a pointer without
the drag.

Examples:

| Drag operation | Single-pointer alternative |
|---|---|
| Reorder cards | Move earlier/later buttons or a position menu |
| Set a range | Tappable track plus numeric fields and step buttons |
| Pan a map | Directional controls and search-by-place |
| Resize an object | Width and height fields or preset sizes |
| Move an item between lists | Select item, choose destination, confirm |

### Multipoint and path-based gestures

[Success Criterion 2.5.1](https://www.w3.org/WAI/WCAG22/Understanding/pointer-gestures)
requires a single-pointer alternative without a path-based gesture unless the gesture is essential.
A pinch-to-zoom image can also have plus, minus, and reset buttons. A swipe carousel can also have
labelled previous and next buttons. A signature, freehand drawing, or other task in which the path
itself conveys information may be essential, but surrounding controls still need accessible paths.

### Cancellation and accidental activation

[Success Criterion 2.5.2](https://www.w3.org/WAI/WCAG22/Understanding/pointer-cancellation)
reduces mistakes by avoiding completion on the pointer’s down-event, providing a way to abort or
undo, using the up-event with reversal, or limiting down-event activation to essential cases.

For consequential actions:

- activate on release rather than initial contact where practical;
- let the user move away before release to cancel;
- provide undo for reversible changes;
- confirm irreversible or high-impact changes; and
- do not place destructive and frequent actions next to one another.

### Concurrent input

[WCAG 2.2 Success Criterion 2.5.6](https://www.w3.org/WAI/WCAG22/Understanding/concurrent-input-mechanisms)
says web content should not restrict input modalities available on a platform unless essential,
required for security, or needed to respect user settings. Do not disable touch because a keyboard
is connected, or hide keyboard focus because the experience began with touch.

## Design forgiving components

### Buttons and icon controls

- Put the accessible name on the actual interactive element.
- Expand padding instead of scaling tiny artwork until hierarchy is lost.
- Separate adjacent targets, especially opposing or destructive actions.
- Show a visible state change on focus, press, selection, and completion.
- Do not require the pointer to remain perfectly still between press and release.
- Keep controls in stable locations during repeated use.

An icon-only button may satisfy target size and still be hard to identify by voice. Prefer visible
text for important actions. When an icon is appropriate, give it a concise accessible name that
matches the words a user is likely to say.

### Menus and disclosures

Avoid hover corridors that collapse when the pointer strays by a pixel. Use click/tap to open,
retain the menu until dismissal or selection, support Escape, and allow generous movement between
the trigger and content. Keep focus inside modal interfaces only when the component pattern calls
for it, and restore focus to a logical control on close.

### Sliders and spatial controls

Sliders can be difficult because the value is tied to pointer position and often changed by drag.
Provide:

- a large thumb and track;
- click/tap-on-track operation where appropriate;
- step buttons for small changes;
- a text or numeric field for exact values;
- arrow-key support with a visible focus indicator; and
- a programmatic name, current value, minimum, and maximum.

Do not make a colour wheel, waveform, map, or canvas the only way to specify an exact value. Pair
the spatial control with named presets, fields, search, or lists.

### Gestures and long press

Gestures are useful accelerators but poor hidden requirements. For each gesture, ask:

1. Can a new user discover it?
2. Can it be completed with one pointer and no specific path?
3. Can it be cancelled before activation?
4. Is the same function available through a labelled control?
5. Does it conflict with browser, operating-system, or assistive-technology gestures?

Long press combines timing and steadiness. Use it as an optional shortcut, not the only route to
essential functionality. If the platform exposes touch-accommodation settings, do not override or
fight them with custom recognisers.

### Time limits and repeated input

Motor accessibility often fails through time rather than geometry. Give users enough time to
understand, position, activate, and correct. For time limits under product control:

- remove them when they are not essential;
- warn before expiry;
- let the user extend with a simple action;
- preserve entered data when a session must be renewed; and
- avoid requiring a rapid series such as double-tap when one activation can work.

Reduce repetition with sensible defaults, saved preferences, batch operations, and undo. Do not
replace repetition with a complex gesture that increases coordination demand.

## Support alternative input

### Keyboard

Every interactive element needs a logical focus order, visible focus, semantic role, accessible
name, and expected key behaviour. Native controls provide much of this. Keyboard support also
benefits switch, voice, and other systems that build on accessibility semantics.

### Voice control

Voice-control users may speak a visible label or use numbered overlays. To support them:

- make the accessible name contain the visible label;
- avoid several identical “More” or “Edit” controls without contextual names;
- expose custom controls through platform semantics; and
- ensure an action can be completed without a gesture that voice control cannot reproduce.

### Switch access and scanning

Switch users move through operable elements sequentially or in groups. Excess controls and poor
ordering create physical and cognitive cost. Group related items, keep the order predictable, skip
decorative elements, and avoid focus traps.

[Android’s accessibility guidance](https://developer.android.com/design/ui/mobile/guides/foundations/accessibility)
describes Voice Access and Switch Access for people who have difficulty interacting directly with
a touchscreen. [Apple’s mobility guidance](https://support.apple.com/guide/iphone/overview-accessibility-features-mobility-iph76d37ce7d/ios)
documents Switch Control, Touch Accommodations, Voice Control, AssistiveTouch, and related input
options. Test with the real platform features rather than a simulated checklist alone.

### Dwell and eye-gaze input

Dwell input activates after a pointer remains in place. Avoid controls that trigger merely because
the pointer passes over them, moving targets, auto-opening regions that obscure the destination,
and tight clusters that are hard to dwell on independently. Provide an easy way to cancel or undo
an accidental activation.

## Worked example: reorderable priority cards

A planning board originally lets users drag cards between five columns. The drop zones appear only
during dragging, card menus use small ellipsis icons, and moving the pointer outside a narrow column
cancels the operation.

The redesign keeps drag-and-drop as an accelerator and adds a complete discrete path:

1. Each card has a clearly named **Move** button with a generous target.
2. Activating it opens a persistent dialog listing destination column and position.
3. The dialog can be used by touch, pointer, keyboard, voice, or switch scanning.
4. The move is announced in status text and an **Undo** action is available.
5. Adjacent cards include **Move earlier** and **Move later** actions when ordering is the only
   change needed.

| Requirement | Verification |
|---|---|
| No drag is required | Complete every move using pointer clicks/taps only |
| No path gesture is required | Complete on a touchscreen using discrete controls |
| Target size is sufficient | Inspect rendered bounds at supported zoom and responsive states |
| Names work with voice | Activate each card’s Move action by its spoken visible label |
| Scanning order is efficient | Traverse cards and dialog using the platform switch feature |
| Mistakes are recoverable | Cancel before commit and undo after commit |
| State is perceivable | Verify visible status and screen-reader announcement |

The alternative is not a lesser “accessibility mode.” It is useful on a shaky train, with a trackpad,
or whenever an exact destination is easier to choose by name.

## Measurement and testing

### Component inspection

For each interactive target, capture:

- rendered width and height at each supported responsive state;
- distance or effective separation from adjacent targets;
- accessible role, name, value, and state;
- pointer-down, pointer-move, pointer-up, cancel, and undo behaviour;
- keyboard sequence and visible focus; and
- alternatives for drag, multipoint, path, long-press, or force input.

Automated accessibility checks can find some semantic and size issues, but they cannot decide
whether a gesture is essential or whether the alternative produces an equivalent result.

### Task testing

Include people with relevant lived experience and the assistive inputs the product supports. Test
representative high-frequency and consequential tasks, not only isolated buttons.

Useful measures:

| Measure | What it reveals |
|---|---|
| First-attempt activation | Basic target and recognition success |
| Wrong-target activation | Crowding and cancellation problems |
| Retries and corrections | Precision and feedback demand |
| Completion by each input | Gaps hidden by a touch-only test |
| Time and action count | Cost of keyboard, voice, and switch alternatives |
| Undo and recovery success | Whether errors remain safe |
| Fatigue or effort over repetition | Problems not visible in a single attempt |

Do not use an artificially shaky mouse as proof that people with tremor can use the product.
Simulation can reveal fragile controls, but it does not reproduce lived experience or assistive
technology.

### Acceptance checklist

- Frequent and consequential controls use generous targets and spacing.
- Interactive bounds, not artwork alone, meet the chosen size requirement.
- Dragging has an equivalent single-pointer, non-dragging path where required.
- Multipoint and path gestures have discrete alternatives where required.
- Actions can be cancelled before activation or undone afterward.
- No essential function relies only on long press, rapid repetition, force, or hover steadiness.
- Visible labels and accessible names support voice operation.
- Keyboard, touch, pointer, and supported assistive inputs can be mixed.
- Switch and dwell traversal avoids decorative stops, traps, and moving targets.
- Testing records errors, retries, recovery, effort, and completion—not only preference.

## References

- [WCAG 2.2 — Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)
- [WCAG 2.2 — Target Size (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced)
- [WCAG 2.2 — Dragging Movements](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements)
- [WCAG 2.2 — Pointer Gestures](https://www.w3.org/WAI/WCAG22/Understanding/pointer-gestures)
- [WCAG 2.2 — Pointer Cancellation](https://www.w3.org/WAI/WCAG22/Understanding/pointer-cancellation)
- [WCAG 2.2 — Concurrent Input Mechanisms](https://www.w3.org/WAI/WCAG22/Understanding/concurrent-input-mechanisms)
- [ISO 9241-400:2007 — Physical input devices](https://www.iso.org/standard/38896.html)
- [ISO 9241-920:2024 — Tactile and haptic interactions](https://www.iso.org/standard/80751.html)
- [Apple Support — Mobility accessibility features on iPhone](https://support.apple.com/guide/iphone/overview-accessibility-features-mobility-iph76d37ce7d/ios)
- [Android Developers — Accessibility foundations](https://developer.android.com/design/ui/mobile/guides/foundations/accessibility)

---

## See also

- [Anthropometrics](/ergonomics/anthropometrics/) — Define reach, contact, and accommodation ranges
- [Targets & Spacing](/ergonomics/targets-spacing/) — Apply target-acquisition guidance
- [Haptics](/perception/touch/haptics/) — Use optional tactile feedback without making it the only cue
