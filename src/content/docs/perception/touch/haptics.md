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

## Recent Research (2024-2025)

### Wearable Haptic Interfaces

Recent developments in virtual and augmented reality have highlighted the growing need for haptic feedback interfaces in wearable formats. [Research on wearable haptic feedback interfaces](https://advanced.onlinelibrary.wiley.com/doi/10.1002/adfm.202417906) (2024) shows these interfaces enhance immersive experiences across social media, gaming, biomedical instrumentation, and robotics by utilizing sophisticated actuators to stimulate somatosensory receptors beneath the skin.

### Transparent Touchscreen Haptics

A 2025 study presents a [transparent haptic interface](https://advanced.onlinelibrary.wiley.com/doi/10.1002/advs.202511874) with a 3D architecture that dynamically reconfigures high-resolution tactile elements through a densely integrated actuator array. Each actuator is precisely inflated through fluid pressure to deliver tactile feedback that surpasses both the tactile perception and two-point discrimination thresholds of human fingertips.

### Mobile Devices as Haptic Interfaces

Research from the [2024 CHI Conference explores using mobile devices](https://dl.acm.org/doi/10.1145/3613904.3642176) to provide haptic feedback for mixed reality, facilitating accessibility and mobility of future haptic technology.

### Full-Body Motion Tracking Systems

A 2024 study introduced a cost-effective [motion tracking system that integrates full-body motion analysis](https://www.nature.com/articles/s41467-025-63644-3) with real-time, bidirectional haptic feedback, demonstrating applications in immersive experiences.

### Market Growth

The Haptic Interface Market was estimated at USD 2.1 billion in 2022 and is expected to reach USD 16.00 billion by 2032, indicating an average annual growth rate of 32.00% during the forecast period from 2024 to 2032.

### Emerging Technologies

Emerging actuation methods include polymeric actuation using smart polymers that change shape when exposed to stimuli, fluidic actuation utilizing pressurized air or liquid for dynamic tactile sensations in soft robotics, and thermal actuation for enhancing immersion in virtual environments.

## References

**Platform Guidelines:**
- Apple HIG — Playing haptics: https://developer.apple.com/design/human-interface-guidelines/playing-haptics
- Android — Haptic feedback: https://developer.android.com/develop/ui/views/haptics
- Google — Haptic design principles: https://developer.android.com/develop/ui/views/haptics/haptic-principles

**Recent Research:**
- [Wearable Haptic Feedback Interfaces for Augmenting Human Touch](https://advanced.onlinelibrary.wiley.com/doi/10.1002/adfm.202417906) (2024)
- [Fully Transparent Haptic Interface for High-Resolution Tactile Feedback on Touchscreens](https://advanced.onlinelibrary.wiley.com/doi/10.1002/advs.202511874) (2025)
- [Exploring Mobile Devices as Haptic Interfaces for Mixed Reality](https://dl.acm.org/doi/10.1145/3613904.3642176) — CHI 2024
- [Wearable Full-Body Motion Tracking and Haptic Feedback](https://www.nature.com/articles/s41467-025-63644-3) (2025)

---

## See Also

- [Touch & Fine Motor Sensitivity](/perception/touch/fine-motor-sensitivity/) — Understanding tactile perception
- [Ergonomics](/ergonomics/) — Physical considerations for haptic devices
