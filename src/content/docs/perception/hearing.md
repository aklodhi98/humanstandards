---
title: Hearing (section)
description: Use audio as a complement; ensure controls and alternatives.
---

Audio can make interfaces richer and more intuitive — but it's never the only channel. Some users can't hear, some are in noisy environments, and some are in quiet ones where sound would be disruptive. Designing for hearing means making audio helpful when available while ensuring nothing depends on it.

## The golden rule

**Never make audio the only way to convey information.** Every sound should have a visual (or haptic) equivalent. Every video with speech needs captions. Every podcast needs a transcript.

## Give users control

### Volume and mute

Always provide controls:
- Volume adjustment for audio content
- Mute option that persists across sessions
- Clear indication of current sound state

### No autoplay surprises

Audio that plays automatically is jarring — especially with sound effects or speech. WCAG requires that any audio playing for more than 3 seconds must be pausable, stoppable, or have independent volume control.

Best practice: don't autoplay audio at all. If you must, start muted.

## Pairing audio with alternatives

### Visual equivalents

- Sound effects should accompany visual changes (icon animations, color shifts)
- Alarms and alerts need visual indicators (banners, badge counts, flashing)
- Progress sounds should match progress bars or loading indicators

### Captions and transcripts

For any audio content with speech:

- **Captions** (synchronized text during playback) — essential for videos
- **Transcripts** (full text available separately) — essential for podcasts and long audio

Captions should be:
- Accurate (not just auto-generated without review)
- Synchronized with speech timing
- Including non-speech audio cues ([door slams], [music plays])

## Environmental awareness

Design for different listening contexts:

- **Quiet environments** (libraries, sleeping babies): Need silent mode that doesn't lose information
- **Noisy environments** (cafés, public transport): Audio may be inaudible; visual must carry the message
- **Shared spaces** (offices, open floor plans): Users may not want to disturb others
- **Headphone users**: Can handle stereo, higher frequencies, subtle sounds

## Accessibility

- Provide sign language interpretation for critical video content when possible
- Ensure visual alerts for important notifications (don't rely on sound alone)
- Test with sound completely disabled

## References

- WCAG 2.2 — Audio Control (1.4.2): https://www.w3.org/WAI/WCAG22/Understanding/audio-control
- WCAG 2.2 — Captions (1.2.2): https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded
- W3C — Making Audio and Video Accessible: https://www.w3.org/WAI/media/av/
