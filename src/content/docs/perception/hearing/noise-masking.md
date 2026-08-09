---
title: Noise & Masking
description: Protect speech, alerts, and media from competing sound while always providing a non-audio path.
---

An audible signal succeeds only if a listener can detect it, distinguish it from competing sounds,
understand what it means, and act in time. Increasing volume addresses only part of that chain. The
signal can still be masked by nearby frequencies, confused with another alert, distorted by the
speaker, missed by a person with hearing loss, or suppressed because the device is silent.

Design for noise and masking by controlling the soundscape, measuring the delivered signal, and
providing persistent visual or tactile equivalents. Audio should add information and urgency; it
should not become a single point of failure.

## What masking means

Masking occurs when one sound raises the threshold at which another sound can be heard. The result
depends on frequency content, level, timing, and the listener—not just a single decibel reading.

### Simultaneous masking

Sounds that occur together compete within the auditory system. Competition is usually greater when
their energy occupies nearby frequency regions. A broadband fan, crowd, road rumble, or music track
can cover part of speech or a notification even when its overall level seems moderate.

### Temporal masking

A strong sound can reduce perception of a quieter sound immediately before or after it. A short
notification placed against a loud transition, door slam, musical accent, or another alert may be
missed even if a sound-level meter shows an adequate average.

### Informational masking

Competing speech is especially disruptive because it is meaningful and changes over time. Two
voices with similar location, level, and timbre are harder to separate than a voice and a steady
mechanical sound. Product tests that use only pink noise can therefore overestimate intelligibility
in offices, homes, or public spaces containing conversation.

### Device and hearing effects

The audio file is not what reaches the listener. The operating system may mix it with other apps;
the output may be a small speaker, one earbud, hearing device, Bluetooth system, or remote display;
and the listener’s thresholds may differ between ears and across frequencies.

[NIDCD explains](https://www.nidcd.nih.gov/health/how-sound-measured) that perceived loudness is
affected by duration, frequency, and environment, and that the decibel scale is logarithmic.
[ASHA’s hearing-loss guidance](https://www.asha.org/public/hearing/Configuration-of-Hearing-Loss/)
shows why “make it louder” is not a complete solution: hearing loss can have different frequency
configurations rather than one uniform attenuation.

## Signal-to-noise ratio

Signal-to-noise ratio (SNR) is the difference between the level of the wanted signal and competing
sound, measured using a defined method and time window. A positive SNR means the signal level is
higher; it does not by itself prove the signal is intelligible or recognisable.

For recorded speech, [WCAG 2.2 Success Criterion 1.4.7](https://www.w3.org/WAI/WCAG22/Understanding/low-or-no-background-audio)
provides a useful Level AAA benchmark: prerecorded audio-only content that is primarily speech must
have no background sound, allow it to be turned off, or keep background sound at least 20 dB below
the foreground speech, apart from brief exceptions. That criterion has a defined scope; do not
apply its 20 dB number as a universal alarm or live-conversation standard.

For safety, public address, or professional communication, use the domain’s assessment method.
[ISO 9921:2003](https://www.iso.org/standard/33589.html) covers assessment of speech communication
for alerts, danger signals, information messages, and general communication. [IEC 60268-16:2020](https://webstore.iec.ch/en/publication/26771)
defines the Speech Transmission Index (STI), test signals, measurement, and prediction methods.
These methods account for more than a media file’s peak level.

## Measure the context before designing the cue

Lists such as “coffee shops are 70 dB” are too crude for a product requirement. Sound levels vary
with location, time, crowd, equipment, measurement distance, frequency weighting, and averaging.
Measure or obtain representative recordings from the actual contexts in scope.

Document:

- output path and listening position;
- background sources and whether they are steady, intermittent, or speech-like;
- sound level, frequency weighting, and time weighting;
- frequency spectrum or octave-band data where masking matters;
- whether the product can control, pause, or duck competing audio;
- users’ ability to change volume, output, captions, and haptics; and
- the consequence and required response time if a cue is missed.

[NIOSH’s noise guidance](https://www.cdc.gov/niosh/noise/prevent/understand.html) distinguishes a
sound level at a point in time, an eight-hour time-weighted average, and a cumulative noise dose.
The metric must match the question. An occupational exposure measurement is not automatically the
right measure for a 300-millisecond notification, and a peak measurement does not establish speech
intelligibility.

## Establish an information hierarchy

Inventory every sound before composing new ones:

| Class | Example | Required behaviour |
|---|---|---|
| Safety-critical | Evacuation or collision warning | Governed by relevant safety standards; redundant and tested in context |
| Consequential | Payment failure, medical workflow exception | Distinct cue plus persistent visual state and recovery path |
| Status | Upload complete, message sent | Subtle optional cue plus visible confirmation |
| Ambient or expressive | Music, atmosphere, decorative response | Must never mask speech or required alerts; user-controllable |

Do not use a louder sound merely to make a low-priority event feel important. A crowded alert
vocabulary teaches users to ignore all of it.

### Create separable sounds

For each audible cue:

- use a recognisable temporal pattern, not pitch alone;
- separate events by rhythm, duration, timbre, and context;
- avoid relying on a very narrow or very high-frequency component;
- keep the onset clear without creating a startling transient;
- reserve the most salient pattern for the most important class; and
- use the platform’s established sound where it already conveys the intended meaning.

Frequency separation can help, but “choose a frequency outside the noise” is rarely sufficient.
Real environments and speech are broadband, and a frequency that escapes one background may be
poorly reproduced by a phone speaker or inaudible to a listener with high-frequency hearing loss.

### Control competing audio

When the product owns both foreground and background tracks:

- remove nonessential background audio during instructions;
- let users turn the background off;
- duck it smoothly before speech or a consequential cue;
- avoid two spoken streams at once;
- limit reverberation and effects on speech; and
- restore the background smoothly after the message.

When another app owns the audio, follow platform audio-session conventions. Apple’s
[playing-audio guidance](https://developer.apple.com/design/human-interface-guidelines/playing-audio)
describes how audio categories affect mixing, interruption, silent mode, and background playback.
Do not seize audio focus for decorative feedback or unexpectedly stop content the user chose.

### Do not normalize toward unsafe listening

Raising level to overpower the environment can increase hearing risk. [WHO’s safe-listening
guidance](https://www.who.int/news-room/questions-and-answers/item/deafness-and-hearing-loss-safe-listening)
emphasizes that risk depends on sound level, duration, and frequency of exposure and recommends
reducing level, using well-fitted noise-cancelling headphones in noisy conditions, and taking
listening breaks.

If users routinely maximize volume to understand the product, improve recording, noise reduction,
mixing, captions, and output options. Do not describe occupational limits as safe consumer playback
targets: [NIOSH defines](https://www.cdc.gov/niosh/noise/prevent/understand.html) its 85 dBA
eight-hour recommended exposure limit for workplace noise.

## Redundancy is a requirement

Audio may be unavailable because the user is Deaf or hard of hearing, the device is muted, the
speaker is covered, the output changed, the room is noisy, or playing sound would be socially
inappropriate.

### Alerts and feedback

Pair a sound with a visual state that remains long enough to find and understand:

- notification banner with clear action and status;
- inline error beside the affected field;
- badge or activity log for events that can be reviewed later;
- progress state that changes visibly on completion; and
- optional haptic pattern that respects system settings.

Apple’s [accessibility guidance](https://developer.apple.com/design/human-interface-guidelines/accessibility/)
recommends augmenting audio cues with visual cues and, where appropriate, haptics. Haptics are not
a complete replacement: they can be disabled, unavailable, or difficult to distinguish.

### Speech and media

[WCAG 2.2 Success Criterion 1.2.2](https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded)
requires captions for prerecorded audio in synchronized media at Level A. Captions include relevant
non-speech information and speaker identification, not dialogue alone. Live synchronized media is
covered by [Success Criterion 1.2.4](https://www.w3.org/WAI/WCAG22/Understanding/captions-live).

Also provide a transcript when it helps searching, scanning, translation, or review. Make player
controls keyboard accessible and give users independent control of captions and volume. Do not
autoplay audio that interferes with screen-reader speech; WCAG’s
[Audio Control criterion](https://www.w3.org/WAI/WCAG22/Understanding/audio-control) addresses
audio that plays automatically for more than three seconds.

### Instructions

Never say only “continue after the beep” or distinguish actions only as “the high tone” and “the
low tone.” [WCAG 2.2 Success Criterion 1.3.3](https://www.w3.org/WAI/WCAG22/Understanding/sensory-characteristics)
requires instructions not to rely solely on sensory characteristics including sound. Name the
action and show the state.

## Worked example: a transit disruption alert

A journey app initially plays the same short chime for a platform change, a promotional message,
and a completed download. The platform-change banner disappears after three seconds. In a moving
train, users miss the chime or cannot tell what it means.

The team defines the outcome:

> A rider can detect, identify, review, and acknowledge a platform change with audio disabled,
> while using the device speaker or headphones, and in representative transit noise.

The design and measures become:

| Failure mode | Design response | Verification |
|---|---|---|
| Cue is masked | Use a short, platform-appropriate consequential cue; pause app-owned speech first | Detection rate across recorded and live representative conditions |
| Cue is confused with low-priority events | Remove promotional sound and give platform changes a unique rhythm and status | Identification without looking, with no misleading associations |
| Banner disappears | Persist the change in the journey timeline until reviewed | Successful review after a delayed response |
| Audio is unavailable | Show lock-screen notification, in-app banner, changed platform label, and optional haptic | Complete the task with device muted and haptics off |
| Message is not actionable | State old platform, new platform, effective time, and next action | Comprehension and correct-route selection |
| Repeated alerts encourage unsafe volume | Keep user volume control; improve message and redundancy rather than forcing level | Playback behaviour and safe-listening review |

Safety decisions for an actual transport service also require the operator’s standards, public
address design, and operational risk process. An app cue cannot replace an official warning system.

## Test masking and intelligibility

### Create representative test scenes

Use several backgrounds rather than one generic noise track:

- steady mechanical or ventilation noise;
- competing speech;
- intermittent transients;
- app-owned music or effects;
- another notification near the cue; and
- quiet conditions, where an overly harsh cue may become unacceptable.

Calibrate playback and document the output device, position, level method, and room. A laptop
playing a phone recording at an arbitrary volume is not a repeatable test.

### Measure the right outcome

| Signal type | Primary measures |
|---|---|
| Notification | Detection, correct identification, response time, false alarms |
| Spoken instruction | Word or sentence intelligibility, task comprehension, action accuracy |
| Media | Caption accuracy, foreground/background level, listening effort, user control |
| Safety message | Domain-required intelligibility and coverage method, response accuracy |

Measure with the actual encoded asset and output chain. Compression, automatic gain control,
speaker protection, Bluetooth codecs, and mono downmix can all change the result.

### Include hearing variation

Recruit participants with relevant hearing experience and test the accessibility modes they use.
Filtered simulations can expose a cue that depends entirely on one frequency region, but simulation
is not evidence that people with hearing loss can understand the experience.

Check:

- device muted, low volume, and changed output route;
- one channel only and mono downmix;
- captions at enlarged text sizes;
- hearing aids or supported hearing devices where appropriate;
- visual-only and haptic-off completion; and
- notification history after an interruption.

## Review checklist

- Is each sound’s purpose and priority documented?
- Were real or representative contexts measured rather than assigned generic dB labels?
- Does the signal remain distinguishable in steady, speech-like, and intermittent noise?
- Can app-owned background audio be reduced or disabled?
- Is speech assessed with an appropriate intelligibility method?
- Does every meaningful sound have a visual or text equivalent?
- Are captions complete, accurate, synchronized, and user-controllable?
- Can the task be completed with sound and haptics disabled?
- Does the product avoid pushing users toward unsafe listening levels?
- Were the final asset, encoding, device, output route, and mono behaviour tested?

## References

- [ISO 9921:2003 — Assessment of speech communication](https://www.iso.org/standard/33589.html)
- [IEC 60268-16:2020 — Speech Transmission Index](https://webstore.iec.ch/en/publication/26771)
- [WCAG 2.2 — Low or No Background Audio](https://www.w3.org/WAI/WCAG22/Understanding/low-or-no-background-audio)
- [WCAG 2.2 — Captions (Prerecorded)](https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded)
- [WCAG 2.2 — Audio Control](https://www.w3.org/WAI/WCAG22/Understanding/audio-control)
- [NIDCD — How is sound measured?](https://www.nidcd.nih.gov/health/how-sound-measured)
- [NIOSH — Understand noise exposure](https://www.cdc.gov/niosh/noise/prevent/understand.html)
- [WHO — Safe listening](https://www.who.int/news-room/questions-and-answers/item/deafness-and-hearing-loss-safe-listening)
- [Apple Human Interface Guidelines — Playing audio](https://developer.apple.com/design/human-interface-guidelines/playing-audio)

---

## See also

- [Frequency Ranges](/perception/hearing/frequency-ranges/) — Design spectra that survive devices and hearing variation
- [Hearing](/perception/hearing/) — Apply the broader hearing-accessibility model
- [Haptics](/perception/touch/haptics/) — Add optional tactile feedback without replacing visual status
