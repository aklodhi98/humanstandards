---
title: Fine Motor Sensitivity
description: Larger targets, spacing, dwell options, and alternative inputs.
---

Not everyone has precise motor control. Tremors, arthritis, neurological conditions, fatigue, or simply cold hands can make small touch targets impossible. Designing for fine motor variation makes interfaces usable for more people in more situations.

## Who benefits

- People with Parkinson's, MS, or other conditions causing tremors
- People with arthritis or joint pain
- Anyone with temporary injuries (broken arm, bandaged fingers)
- Older adults with reduced dexterity
- People in unstable environments (moving vehicles, walking)
- Everyone using devices with gloves

## Target size matters

Bigger is better. The WCAG 2.2 target size requirements:

- **Minimum (2.5.8 Level AA)**: At least 24×24 CSS pixels, or adequate spacing from other targets
- **Enhanced (2.5.5 Level AAA)**: At least 44×44 CSS pixels

But these are minimums — for frequently-used actions, go larger. Primary buttons, navigation items, and form controls should be comfortable to hit.

## Spacing prevents errors

Adjacent targets need breathing room. If a user's finger lands between two buttons, they might hit the wrong one — or trigger both. Add at least 8px of spacing between interactive elements.

## Avoid timing and precision

Some interactions are inherently difficult:

- **Dragging**: Requires sustained contact while moving. Provide alternatives (buttons, dropdowns).
- **Pinch/zoom**: Multi-finger gestures may be impossible. Offer +/- buttons or auto-zoom options.
- **Long press**: Sustained hold without movement. Make the required duration short, or provide alternatives.
- **Timed actions**: Anything that requires quick response. Extend or remove time limits.

## Alternative input modes

Always provide alternatives:

- **Keyboard access**: Every touch action should be keyboard-accessible
- **Voice control**: Works with system voice commands when elements are properly labeled
- **Dwell-to-click**: Hovering/dwelling triggers activation — common in assistive tech
- **Switch access**: Sequential navigation with single-button activation

## Testing considerations

Test with:
- Simulated tremor tools (some accessibility testing suites include these)
- Touch accuracy tests at smaller target sizes
- Users who rely on alternative input methods

## References

- WCAG 2.2 — Target Size (2.5.8): https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum
- WCAG 2.2 — Dragging Movements (2.5.7): https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements
- Apple — Motor accessibility: https://www.apple.com/accessibility/mobility/
