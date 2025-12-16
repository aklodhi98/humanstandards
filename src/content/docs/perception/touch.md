---
title: Touch (section)
description: Design for imprecision, occlusion, and varied grips.
---

Touch interfaces feel immediate and direct — but they come with constraints. Fingers are imprecise, they hide what they're touching, and the way people hold devices varies enormously. Designing for touch means designing for this reality.

## The finger problem

Unlike a mouse cursor (a precise single pixel), a finger touches the screen with a contact area of ~7–10mm. Users can't see exactly where they're tapping, and the finger obscures the target during the tap.

This means:
- **Make targets big enough**: At least 44×44 CSS pixels (Apple) or 48×48 dp (Android)
- **Add spacing between targets**: Prevent accidental taps on adjacent items
- **Provide visual feedback**: Show what was touched, since users can't see it during the tap

## Occlusion and feedback

When a finger touches the screen, it covers the target. Design around this:

- Show selection states that extend beyond the touch point
- Place tooltips and previews above the finger, not below
- Use haptic feedback to confirm actions when visual feedback is hidden
- Consider "fat finger" scenarios in dense interfaces

## Grip and posture

People hold devices in different ways, and each grip affects what's easy to reach:

- **One-handed thumb**: Common for phones — limits reach to lower screen areas
- **Cradled with index finger**: More reach, but less stability
- **Two-handed**: Full reach, common on tablets and larger phones

Design so that primary actions are reachable in the most common grip. See [Anthropometrics](/ergonomics/anthropometrics/) for reach zone details.

## Gesture considerations

Touch gestures (swipe, pinch, drag) feel natural but create challenges:

- **Discoverability**: Users can't see gestures — they have to learn them
- **Accessibility**: Some users can't perform complex gestures (pinch, multi-finger swipes)
- **Conflict**: Gestures can conflict with OS-level navigation

Always provide tap alternatives for gesture shortcuts. Don't make gestures the *only* way to do something important.

## References

- Apple HIG — Touch interactions: https://developer.apple.com/design/human-interface-guidelines/touch-interactions
- Material Design — Touch targets: https://m3.material.io/foundations/accessible-design/accessibility-basics
- Steven Hoober — How Do Users Really Hold Mobile Devices?: https://www.uxmatters.com/mt/archives/2013/02/how-do-users-really-hold-mobile-devices.php
