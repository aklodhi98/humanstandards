---
title: Anthropometrics (Reach, Size Ranges)
description: Turn variation in body dimensions, reach, grip, and device use into testable interface requirements.
---

Anthropometrics is the measurement of human body dimensions. For interface design, its value is
not a single description of an “average person.” It is a disciplined way to decide **who must be
accommodated, which body dimension constrains a task, and how the design will be tested**.

A control can pass a visual review and still be physically difficult to use. The user may have a
shorter functional reach, a larger contact area, limited joint movement, reduced grip strength, or
a device that changes how the hand is supported. These factors also interact: increasing phone
size can move a control farther away while increasing the force needed to stabilize the device.

## Start with a population, not an average

[ISO 7250-1:2017](https://www.iso.org/standard/65246.html) defines body measurements and
anatomical landmarks so that measurements can be compared and used in design. It does not supply
one universal human template. Population data belong in a separate layer:
[ISO/TR 7250-2:2024](https://www.iso.org/standard/84822.html) provides statistical summaries
from national populations, while [ISO 7250-3:2015](https://www.iso.org/standard/64237.html)
provides regional and worldwide design ranges for product standards.

That separation matters. Anthropometric distributions vary with population definition, age,
sex, sampling method, measurement posture, and whether a measurement is structural or functional.
A value copied from an unspecified chart is not a sound requirement.

Before choosing a dimension or percentile, write down:

- **Population:** who is expected to use the product, and who might otherwise be excluded?
- **Task:** tap, type, grip, carry, reach, view, or sustain a posture?
- **Context:** seated, standing, walking, gloved, one-handed, mounted, or using assistive input?
- **Constraint:** is the design limited by minimum clearance, maximum reach, contact size, force,
  or duration?
- **Consequence:** does failure cause mild delay, data loss, financial loss, or a safety hazard?

### Percentiles are design decisions

A percentile describes a position in a measured distribution; it is not a quality score. A fifth
percentile value is greater than or equal to roughly five percent of that sample and lower than the
rest. A ninety-fifth percentile value is near the other end of the sample.

Use the end of the range that matches the constraint:

| Design problem | Dimension to examine | Typical accommodation logic |
|---|---|---|
| A control must be reachable | Functional reach | Design for people with shorter reach, or make placement adjustable |
| A hand or finger needs clearance | Breadth or thickness | Provide space for people with larger dimensions |
| A label must remain visible under a finger | Contact area and approach angle | Keep critical feedback outside the occluded region |
| A device must be held for a long task | Grip span, strength, mass, duration | Reduce sustained force and provide support or alternative input |
| A workstation must fit many people | Eye, elbow, knee, and seated dimensions | Provide independent adjustment rather than one fixed geometry |

Do not combine “fifth percentile reach” and “ninety-fifth percentile finger breadth” into an
imaginary person. Body dimensions are correlated in complex ways, and one person is unlikely to
sit at every chosen extreme. Use multivariate data where the physical product truly depends on
several dimensions, then verify with representative people.

### Structural and functional measurements differ

Structural measurements describe the body in a defined posture: for example, hand breadth or
seated eye height. Functional measurements describe what happens during a task: reach while
holding a device, thumb movement with a particular grip, or the contact patch produced during a
tap.

Digital interfaces often depend more on functional measurements. A thumb’s anatomical length
does not directly predict whether a top-corner button is usable. Grip, wrist angle, device width,
case friction, hand support, motion, and the need to see the screen all change usable reach.

## Translate measurements into interface decisions

### Reach and placement

Treat reach as a graded cost, not a fixed coloured map that applies to every device. A control near
the thumb’s resting position may be easy for one grip and difficult after the phone rotates or the
user changes hands.

For frequent or time-critical actions:

- place the action near the current point of attention and input;
- avoid making the far edge or top corner the only route to completion;
- provide an equivalent action in a reachable menu, keyboard command, or voice-accessible
  control;
- allow large-screen layouts to move primary actions closer to the active hand; and
- preserve a stable location once the user has learned it.

Reachability features are helpful but should not repair a fundamentally unreachable flow. They
can also be unavailable on mounted devices, in split-screen modes, or to someone using a different
input device.

### Finger contact and target size

The finger obscures the interface and creates a contact area rather than a precise cursor point.
The visible icon can remain visually compact while its interactive bounds are larger. On the web,
[WCAG 2.2 Success Criterion 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)
sets a Level AA minimum of 24 by 24 CSS pixels, with defined exceptions including spacing.
[Success Criterion 2.5.5](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced)
sets an enhanced target of 44 by 44 CSS pixels.

Those values are conformance thresholds, not anthropometric guarantees. Increase target size and
separation when errors are costly, the device is moving, gloves are expected, or the interaction
is repeated. Test the actual rendered size: CSS pixels, platform points, device-independent pixels,
and millimetres are not interchangeable without knowing the display and scaling conditions.

### Grip, force, and duration

A task that is easy for one tap may become fatiguing when repeated or sustained. Review:

- how much of the device must be supported by one hand;
- whether the wrist stays near the end of its range;
- whether controls require repeated pinching or forceful pressing;
- whether a gesture combines holding, force, and precise movement; and
- whether the user can put the device down and continue with a keyboard, stand, or external
  controller.

[ISO 9241-400:2007](https://www.iso.org/standard/38896.html) describes ergonomic principles
and relevant properties for physical input devices, including touch-sensitive screens, styli,
voice-controlled devices, and gesture-controlled devices. Its scope reinforces an important design
rule: assess the input device together with the software, task, and use environment.

### Device and viewport diversity

Diagonal screen size alone says little about physical usability. Two devices with similar diagonals
can differ in aspect ratio, mass, case, hinge, pixel density, scaling, and how they are held. Browser
zoom, text enlargement, split screen, display magnification, and foldable postures further change
the usable viewport.

Use responsive breakpoints when the content or task needs them, not as proxies for a named device.
At every supported size:

- keep primary actions visible without a precision gesture;
- reflow rather than shrink controls to preserve density;
- avoid fixing essential controls to a far corner on wide screens;
- support portrait and landscape unless orientation is essential; and
- retain keyboard and pointer paths when a touch-first layout is shown.

## Worked example: a mobile task composer

Consider a field-service app used to record an inspection. The original screen fixes **Save** in
the top-right corner, uses a narrow drag handle to reorder findings, and places **Delete** beside
**Save**. The team’s requirement is not “make it thumb friendly.” It is:

> A user must be able to create, reorder, and save a finding with either hand, without relying on
> dragging or a far-corner control, across supported phone viewports and input modes.

Turn that requirement into design changes and measures:

| Risk observed | Design response | Measurement |
|---|---|---|
| Save is outside comfortable reach for some grips | Add a full-width action near the end of the form; retain the top action as an equivalent | Task completion and reach-related grip shifts by hand and viewport |
| Reordering requires precise sustained movement | Add **Move up** and **Move down** actions to each item | Completion without drag, keyboard, or path gesture |
| Delete is adjacent to Save | Move delete into the item menu and provide undo | Wrong-action rate and recovery success |
| Compact icons hide small hit areas | Keep icon size but expand interactive bounds and spacing | Rendered target bounds and adjacent-target separation |
| Long form encourages one-handed support | Autosave drafts and allow continuation on another input device | Time in sustained grip and successful resume rate |

This example does not require a universal thumb-reach radius. It defines multiple ways to complete
the task and then measures the actual population, devices, and contexts in scope.

## Build an anthropometric test plan

### 1. Define the design range

Record the intended user population and exclusions. If population data are unavailable, state the
gap instead of presenting a borrowed percentile as fact. Include people whose functional reach or
dexterity differs from the product team’s, and include relevant temporary and situational limits.

### 2. Select representative conditions

Create a compact test matrix rather than attempting every combination:

| Variable | Minimum useful coverage |
|---|---|
| Viewport | Smallest supported, largest supported, text enlarged, split view if supported |
| Hand use | Preferred hand, non-preferred hand, two-handed |
| Support | Unsupported handheld, supported or mounted |
| Input | Touch, pointer, keyboard, and supported assistive input |
| Environment | Stable and any credible motion, glare, glove, or cold-hand condition |
| Task duration | Single attempt and a realistic repeated-use session |

Do not ask participants to perform unsafe “walking tests.” Simulate relevant instability in a
controlled setting, or observe a real context only with an appropriate safety protocol.

### 3. Measure outcomes, not just preference

Useful measures include:

- first-attempt success and wrong-target activation;
- completion time and retries;
- grip changes, hand changes, or use of a second hand;
- range-of-motion or force concerns identified by an ergonomics specialist;
- discomfort before and after a realistic task period;
- completion through touch, keyboard, voice, or switch paths; and
- qualitative explanation of where the design demanded extra effort.

Preference still matters, but a high satisfaction score can conceal a control that some participants
could not operate at all. Report excluded and incomplete attempts explicitly.

Segment results by the variables that could explain a physical mismatch, such as device, hand used,
input method, and relevant functional range. Do not publish a subgroup comparison from a sample too
small to support it; retain the individual observations and treat them as design evidence to
investigate. Averages can hide a severe failure at one end of the intended range, so report the
distribution, worst credible cases, and any task that could not be completed.

### 4. Preserve evidence in requirements

For each decision, store the population source, measurement definition, assumed clothing or
equipment, percentile or range, task posture, and validation result. A traceable requirement looks
like this:

> Primary actions remain operable at the smallest supported viewport with 200% text, using touch
> with either hand and using keyboard-only input. No completion path requires a multipoint or
> dragging gesture.

That can be tested. “Designed for the average hand” cannot.

## Review checklist

- Is the target population explicit?
- Does each body measurement correspond to the task being designed?
- Are percentile direction and clearance/reach logic correct?
- Have correlated dimensions and functional posture been considered?
- Can users change grip, hand, orientation, or input method without losing progress?
- Are frequent and consequential actions available away from reach extremes?
- Are rendered target size and spacing verified on real devices?
- Does testing include people near the intended design range and people with limited dexterity?
- Are errors, retries, grip shifts, discomfort, and alternative-input completion recorded?

## References

- [ISO 7250-1:2017 — Body measurement definitions and landmarks](https://www.iso.org/standard/65246.html)
- [ISO/TR 7250-2:2024 — Statistical summaries from national populations](https://www.iso.org/standard/84822.html)
- [ISO 7250-3:2015 — Worldwide and regional design ranges](https://www.iso.org/standard/64237.html)
- [ISO 9241-400:2007 — Principles and requirements for physical input devices](https://www.iso.org/standard/38896.html)
- [WCAG 2.2 — Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)
- [WCAG 2.2 — Target Size (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced)
- [OSHA — Computer workstation evaluation checklist](https://www.osha.gov/etools/computer-workstations/checklists/evaluation)

---

## See also

- [Targets & Spacing](/ergonomics/targets-spacing/) — Apply target-size and placement guidance
- [Posture & Device Use](/ergonomics/posture-device-use/) — Evaluate physical context over time
- [Fine Motor Sensitivity](/perception/touch/fine-motor-sensitivity/) — Provide forgiving and alternative interactions
