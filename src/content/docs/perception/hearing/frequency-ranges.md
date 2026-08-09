---
title: Frequency Ranges
description: Design speech, alerts, and media for hearing variation, transmission bandwidth, and real playback devices.
---

Frequency describes how quickly a sound waveform repeats and is measured in hertz (Hz). It is
closely related to perceived pitch, but it does not tell you whether a sound is audible, clear, safe,
or meaningful. Those outcomes also depend on level, duration, spectrum, background sound,
reproduction, and the listener’s hearing.

The familiar “20 Hz to 20 kHz” description is a broad reference for young, healthy hearing under
particular test conditions—not a safe product requirement. People vary across frequencies, hearing
can differ between ears, and output devices rarely reproduce every band at the same level. Design
important information to survive that variation rather than locating it at one “perfect” pitch.

## Frequency, level, and bandwidth are different

- **Frequency (Hz):** cycles per second; related to pitch.
- **Level (dB):** a logarithmic expression of a ratio. The reference, weighting, and measurement
  method must be stated.
- **Spectrum:** how sound energy is distributed across frequencies.
- **Bandwidth:** the frequency range a system is intended to transmit or reproduce.
- **Hearing threshold:** the level at which a person detects a frequency under test conditions.
- **Intelligibility:** how accurately speech is understood; audibility is necessary but not always
  sufficient.

[NIDCD’s sound-measurement guide](https://www.nidcd.nih.gov/health/how-sound-measured)
explains that duration, frequency, and environment all affect perceived loudness and that the
cochlea responds best in the range of human speech. Always qualify a decibel value: dB SPL, dBA,
dB HL, digital dBFS, and a relative mix level are not interchangeable.

## Use bands as a diagnostic map

Broad bands help teams discuss a spectrum, but their boundaries are conventions rather than sharp
biological divisions.

| Approximate band | Common content | Design risk on small devices or varied hearing |
|---|---|---|
| Below 100 Hz | Rumble, impact, musical fundamentals | May be attenuated or converted into distortion; poor place for sole alert information |
| 100–300 Hz | Warmth, many voice fundamentals, low musical content | Can be masked by vehicles and ventilation; excessive energy reduces headroom |
| 300 Hz–1 kHz | Major speech and musical content | Important for voice body and broad device compatibility |
| 1–4 kHz | Much consonant and intelligibility information, many alerts | Crowded by speech and notifications; can become harsh at high level |
| 4–8 kHz | Fricative detail, brightness, transients | Often affected by hearing loss and codec/device response |
| Above 8 kHz | Fine detail and “air” | Unreliable as the only carrier of meaning across listeners and devices |

These bands guide investigation, not equalization presets. Measure the actual source and playback
chain before changing it.

## Speech occupies more than one narrow range

Voice fundamentals, harmonics, formants, and consonant noise distribute information across the
spectrum. Removing low-frequency energy can make a voice thin; removing higher-frequency detail
can make consonants harder to distinguish. Background noise, reverberation, language, accent,
microphone technique, and hearing configuration also affect understanding.

[NIDCD’s population statistic](https://www.nidcd.nih.gov/health/statistics/hearing-loss-increases-with-age)
defines speech-frequency hearing loss using thresholds at 0.5, 1, 2, and 4 kHz. That is a clinical
summary measure, not a production filter. Do not conclude that audio outside those test frequencies
has no value.

### Narrowband and wideband telephony

Traditional telephony shows the difference between intelligible and natural speech. ITU-T defines
conventional narrowband telephony around **300–3400 Hz**. [ITU-T P.341](https://www.itu.int/epublications/publication/itu-t-p-341-2011-03-transmission-characteristics-for-wideband-digital-loudspeaking-and-hands-free-telephony-terminals)
describes wideband hands-free telephony extending to approximately **100–8000 Hz**, beyond that
conventional band.

Narrowband speech can support communication, but it loses low- and high-frequency information and
can increase confusion in poor conditions. For product voice:

- capture clean audio with headroom and a consistent microphone position;
- reduce noise and reverberation without creating metallic artifacts;
- preserve a useful speech bandwidth through encoding;
- control dynamics so quiet words remain audible without crushing all contrast;
- test intelligibility rather than judging only tonal quality; and
- provide accurate captions or a transcript.

## Hearing varies by frequency and person

An audiogram plots the quietest level detected at test frequencies for each ear.
[ASHA explains](https://www.asha.org/public/hearing/Configuration-of-Hearing-Loss/) that hearing
loss may be high-frequency, low-frequency, flat, unilateral, bilateral, symmetrical, or asymmetrical.
One global volume control cannot compensate for every pattern.

[NIDCD notes](https://www.nidcd.nih.gov/health/age-related-hearing-loss) that age-related hearing
loss is generally gradual and often affects both ears, while long-term noise exposure, medical
conditions, medication, and genes can also contribute. Avoid using an age cutoff or an unsupported
claim such as “everyone over 50 cannot hear 14 kHz.” Test with actual listeners and do not equate
age with ability.

### Design implications

- Do not encode categories only as high versus low pitch.
- Give alerts temporal and timbral differences as well as frequency differences.
- Avoid making a narrow high-frequency tone the sole warning.
- Preserve visual information when a frequency band is inaudible.
- Support mono output and do not put essential content in one channel.
- Respect hearing-device routing and platform accessibility settings.
- Let users choose alert style and level where the product can safely allow it.

Frequency shaping can improve clarity, but a generic “hearing loss EQ” may over-amplify some bands,
introduce distortion, or create unsafe output. Personal amplification belongs in user-controlled
device and clinical systems, not an undocumented app boost.

## The playback chain determines the result

An audio asset passes through several stages:

1. microphone or synthesis;
2. editing, equalization, dynamics, and mix;
3. sample rate, codec, bitrate, and loudness normalization;
4. operating-system mixing and volume;
5. wired, Bluetooth, cast, or hearing-device routing;
6. amplifier and transducer;
7. case, mounting, room, distance, and orientation; and
8. the listener’s ears and auditory processing.

A clean studio waveform can become masked, clipped, or spectrally unbalanced later. Test the
delivered experience, not only the source file.

### Small speakers

Small phone and laptop speakers generally have limited low-frequency output and can be affected by
device orientation, protective cases, and nearby surfaces. Do not assume a fixed cutoff such as
“all phones fail below 200 Hz.” Measure representative supported hardware.

Practical responses:

- keep essential cue identity in a broad region the device reproduces reliably;
- remove inaudible sub-bass energy that only consumes headroom, when confirmed by measurement;
- check distortion at normal and high user volume;
- test with the speaker partly occluded by a typical grip or case;
- avoid phase-dependent stereo effects that collapse badly to mono; and
- render final encoded assets through the actual app.

### Headphones, earbuds, and hearing devices

These outputs vary in fit, seal, frequency response, channel availability, processing, and latency.
Test route changes during playback and alerts. A notification should not jump to an unexpected
output, become dangerously loud, or vanish without a visual trace.

For stereo content:

- put dialogue and essential signals in both channels or a stable centre image;
- audition a mono downmix for cancellation;
- avoid instructions based only on left/right location; and
- provide balance and mono support through platform settings where available.

## Design notification sounds

### Begin with meaning

Define the event before choosing notes:

| Question | Example decision |
|---|---|
| What happened? | A file finished uploading |
| How urgent is it? | No immediate response required |
| What happens if missed? | Status remains visible in activity history |
| What other sounds compete? | Speech, music, system notifications |
| Which outputs are expected? | Phone speaker, earbuds, silent mode |
| What is the non-audio equivalent? | Visible completion status and optional haptic |

The sound then reinforces an existing status. It does not carry a secret category that must be
decoded by pitch.

### Use spectral and temporal diversity

A robust cue usually has more than one perceptual feature:

- energy across a useful, device-tested band rather than a single sine tone;
- a short rhythm that differs from adjacent cues;
- timbre consistent with the event’s character;
- enough duration to detect without becoming intrusive; and
- a clear onset that is not needlessly startling.

Do not solve masking by maximizing every band. A bright, compressed alert may cut through in one
test while creating fatigue, annoyance, and competition with speech elsewhere.

### Keep the vocabulary small

Users cannot learn dozens of arbitrary tones. Group events into a few semantic classes—success,
attention, warning, error—using platform conventions where possible. Show the specific event in
text. If two events require different actions, the visual notification should state the distinction.

## Design voice and media

### Record for intelligibility

- Use a quiet recording space and control reflections.
- Keep microphone distance and angle consistent.
- Edit noise between phrases without cutting natural word boundaries.
- Use equalization only after identifying a measured or audible problem.
- Apply dynamics with enough headroom to avoid clipping and pumping.
- Review at normal, low, and high playback settings.

### Mix foreground and background

[WCAG 2.2 Success Criterion 1.4.7](https://www.w3.org/WAI/WCAG22/Understanding/low-or-no-background-audio)
requires qualifying prerecorded speech-only content either to have no background, let users turn
it off, or maintain background at least 20 dB below foreground speech apart from brief exceptions.
Even when the criterion does not apply, it gives a strong design pattern: remove nonessential
competition and provide control.

Measure the relative level using a documented method. A fader set “20 lower” is not automatically
a 20 dB acoustic difference after compression, normalization, and playback.

### Encode and stream deliberately

Lower bitrates can smear transients or introduce artifacts, while aggressive noise suppression can
damage consonants. Test every supported delivery profile with:

- representative voices and languages;
- low-bandwidth and recovery conditions;
- final captions and synchronization;
- device speaker, headphones, and mono output; and
- background noise from the intended context.

## Worked example: an alert set for a medication app

The original app uses three pure tones: a low tone for “scheduled,” a medium tone for “taken,” and
a high tone for “missed.” Users must remember the mapping, and the high tone is the only cue for the
most consequential event.

The redesign treats audio as reinforcement:

| Event | Sound design | Persistent equivalent | Measurement |
|---|---|---|---|
| Dose due | Recognisable multi-component rhythm within device-tested response | Lock-screen and in-app notice naming medication and action | Detection and correct identification in quiet and representative noise |
| Dose recorded | Subtle platform-consistent confirmation | Visible status and timestamp with undo | Confirmation recognition without interrupting speech |
| Dose still unrecorded | Consequential repeated pattern governed by user and clinical requirements | Persistent escalation state and approved contact path | Response, false-alarm rate, and complete visual-only workflow |

The team then tests:

1. original and encoded assets on the smallest supported phone speaker;
2. spectrum and distortion at several user volume settings;
3. quiet, speech-like, and transport-noise scenes;
4. mono output and either channel alone;
5. participants with varied hearing, including hearing-device users;
6. silent mode, haptics disabled, and output-route changes; and
7. recognition of the event without memorising a pitch legend.

Actual medication alerts may be regulated or safety-critical. Frequency design must sit inside the
product’s clinical risk, alarm, escalation, and human-factors process.

## Measurement table

Record values that allow another person to reproduce the test:

| Measure | What to record | Why |
|---|---|---|
| Spectrum | Analysis window, resolution, channel, and final encoded asset | Finds narrow-band dependence and masking overlap |
| Level | Metric, reference, weighting, averaging, and playback position | Prevents ambiguous “dB” claims |
| Device response | Hardware, orientation, case, volume setting, distance | Reveals loss or distortion in the output chain |
| Intelligibility | Material, language, background scene, score method | Measures understood speech, not file quality alone |
| Detection | Event timing, false positives, misses, response time | Evaluates notification performance |
| Accessibility | Captions, mono, visual-only, haptic-off, route changes | Confirms equivalent paths |

For installed speech or alarm systems, use the applicable professional method. [IEC 60268-16:2020](https://webstore.iec.ch/en/publication/26771)
defines objective rating through the Speech Transmission Index and documents limitations. A phone
app team should not claim STI compliance from an informal listening session.

## Safe listening

Frequency response and safety cannot be separated from level and duration. [WHO’s safe-listening
guidance](https://www.who.int/news-room/questions-and-answers/item/deafness-and-hearing-loss-safe-listening)
states that higher level and longer duration increase risk, and recommends keeping personal-device
volume down, taking breaks, and using well-fitted noise-cancelling headphones rather than raising
volume against noise.

[NIOSH](https://www.cdc.gov/niosh/noise/prevent/understand.html) uses A-weighted exposure and
duration for its occupational recommendations and notes that noise exposure often first affects
audiometric frequencies around 3–6 kHz. Do not turn that observation into a consumer EQ rule or
place alerts elsewhere and call them safe. Control exposure, provide user choice, and follow the
relevant product and workplace requirements.

## Review checklist

- Are frequency, level, reference, weighting, and bandwidth described separately?
- Does essential meaning survive when one frequency region is reduced or inaudible?
- Are speech and alerts tested through final encoding and representative output devices?
- Is the smallest supported speaker measured rather than assigned a generic cutoff?
- Does stereo content downmix cleanly and retain information in either channel?
- Are alerts distinct by more than high versus low pitch?
- Is background audio removable, reducible, or sufficiently separated from speech?
- Are captions, transcripts, persistent visual status, and optional haptics available?
- Does testing include varied hearing and real assistive output routes?
- Are level and duration reviewed for safe listening rather than solved by louder playback?

## References

- [NIDCD — How is sound measured?](https://www.nidcd.nih.gov/health/how-sound-measured)
- [NIDCD — How do we hear?](https://www.nidcd.nih.gov/health/how-do-we-hear)
- [NIDCD — Age-related hearing loss](https://www.nidcd.nih.gov/health/age-related-hearing-loss)
- [NIDCD — Hearing loss increases with age](https://www.nidcd.nih.gov/health/statistics/hearing-loss-increases-with-age)
- [ASHA — Configuration of Hearing Loss](https://www.asha.org/public/hearing/Configuration-of-Hearing-Loss/)
- [ITU-T P.341 — Wideband hands-free telephony](https://www.itu.int/epublications/publication/itu-t-p-341-2011-03-transmission-characteristics-for-wideband-digital-loudspeaking-and-hands-free-telephony-terminals)
- [IEC 60268-16:2020 — Speech Transmission Index](https://webstore.iec.ch/en/publication/26771)
- [WCAG 2.2 — Low or No Background Audio](https://www.w3.org/WAI/WCAG22/Understanding/low-or-no-background-audio)
- [WHO — Safe listening](https://www.who.int/news-room/questions-and-answers/item/deafness-and-hearing-loss-safe-listening)
- [NIOSH — Understand noise exposure](https://www.cdc.gov/niosh/noise/prevent/understand.html)

---

## See also

- [Noise & Masking](/perception/hearing/noise-masking/) — Protect signals from competing sound
- [Hearing](/perception/hearing/) — Design across hearing, device, and context variation
- [Notifications & Feedback](/interaction-patterns/notifications-feedback/) — Make system status persistent and multimodal
