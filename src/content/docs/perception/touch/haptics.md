---
title: Haptics
description: Map haptic patterns to event severity; allow opt-out.
---

Haptic feedback adds a tactile dimension to digital interfaces. A subtle vibration confirms a button press, a gentle pulse signals success, a longer rumble warns of an error. Done well, haptics make interfaces feel more responsive and physical. Done poorly, they're annoying or confusing.

## Why haptics work

Touch screens lack the physical feedback of mechanical buttons — you can't feel a click. Haptics fill that gap:

- **Confirmation**: "Yes, we registered your tap"
- **Differentiation**: Different sensations for different events
- **Attention**: Alerts that work when sound is off or screens are hidden
- **Immersion**: Richer experience in games and media

## Platform conventions

Both iOS and Android have standardized haptic patterns. Use them — users already know what they mean.

**iOS (UIFeedbackGenerator):**
- `UIImpactFeedbackGenerator`: Physical impact sensations (light, medium, heavy)
- `UISelectionFeedbackGenerator`: Selection changes (picker wheels, toggles)
- `UINotificationFeedbackGenerator`: Success, warning, error

**Android (HapticFeedbackConstants):**
- `CLOCK_TICK`, `CONTEXT_CLICK`: Light feedback
- `CONFIRM`, `REJECT`: Action outcomes
- `LONG_PRESS`, `VIRTUAL_KEY`: UI interaction confirmations

## Design principles

### Match intensity to importance

- **Light tap**: Selection, navigation, minor interactions
- **Medium pulse**: Successful actions, confirmations
- **Strong vibration**: Errors, warnings, urgent alerts

### Be consistent

The same action should always produce the same haptic. Don't randomize or vary feedback arbitrarily.

### Don't overdo it

Too much haptic feedback becomes noise. Reserve it for moments where tactile confirmation genuinely helps. Not every tap needs a buzz.

### Always allow opt-out

Some users find haptics distracting, annoying, or physically uncomfortable. Respect system-level haptic settings, and consider providing app-level controls for users who want finer control.

## Accessibility considerations

- Haptics can help users who can't see visual feedback
- But some users have conditions where vibration is painful or triggering
- Never make haptics the *only* form of feedback — always pair with visual or audio

## Testing tips

- Test on real devices — simulators don't provide haptic feedback
- Test with haptics disabled to ensure the experience still works
- Ask users whether the haptic intensity feels appropriate

## References

- Apple HIG — Playing haptics: https://developer.apple.com/design/human-interface-guidelines/playing-haptics
- Android — Haptic feedback: https://developer.android.com/develop/ui/views/haptics
- Google — Haptic design principles: https://developer.android.com/develop/ui/views/haptics/haptic-principles
