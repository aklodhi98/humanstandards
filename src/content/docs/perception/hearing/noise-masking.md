---
title: Noise & Masking
description: Increase signal-to-noise; ensure redundancy.
---

In the real world, sounds compete. Background noise, overlapping audio, and similar frequencies can mask the sounds you want users to hear. Designing for noisy environments means making your audio stand out — or ensuring users don't miss the message when they can't hear it.

## How masking works

Masking occurs when one sound makes another harder to hear. It's not just about volume — frequencies matter:

- **Simultaneous masking**: Two sounds playing at the same time; one drowns out the other
- **Temporal masking**: A loud sound briefly masks quieter sounds before and after it
- **Frequency masking**: Similar frequencies compete; one dominates

Louder sounds mask quieter ones. Lower frequencies tend to mask higher frequencies more than the reverse.

## Environmental noise challenges

Your users aren't in soundproof rooms:

- **Public transport**: Engine noise, announcements, crowds (~70–85 dB)
- **Coffee shops**: Conversation, music, espresso machines (~65–75 dB)
- **Open offices**: Typing, conversations, HVAC (~50–60 dB)
- **Home with family**: TV, kids, appliances (highly variable)

If your notification is 50 dB and the environment is 70 dB, it's effectively inaudible.

## Design strategies

### Make sounds distinct

Choose timbres and attack patterns that cut through noise:

- **Sharp attack**: Quick onset sounds (clicks, chimes) are easier to notice than gradual fades
- **Distinct timbre**: Sounds with unique frequency profiles stand out better
- **Avoid common frequencies**: Coffee machine hiss is ~2–6 kHz; choose alerts outside that range

### Use frequency separation

If you have multiple audio elements:

- Keep notification sounds away from background music frequencies
- Use distinct pitch ranges for different alert types
- Avoid playing sounds that will mask each other

### Increase signal-to-noise ratio

- Compress dynamic range so quiet parts are louder
- Briefly duck (reduce) background audio when playing alerts
- Allow users to boost alert volume independently

### Always provide visual redundancy

No amount of audio design beats visual backup:

- Visual indicators for every notification sound
- Captions for any spoken content
- Badge counts and banners that persist until acknowledged

## Testing for noise

- Test your sounds in noisy environments (coffee shop, train)
- Play audio at 50% device volume
- Test with background music or video playing
- Verify the message gets through visually when audio fails

## References

- Moore, B.C.J. — An Introduction to the Psychology of Hearing: https://brill.com/display/title/33794
- Occupational noise exposure (OSHA): https://www.osha.gov/noise
- Apple HIG — Sound: https://developer.apple.com/design/human-interface-guidelines/playing-audio
