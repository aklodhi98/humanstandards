---
title: Frequency Ranges
description: Design audio within speech-intelligible bands and device limits.
---

Human hearing spans roughly 20 Hz to 20 kHz, but not all frequencies are equally important — or equally reproducible by device speakers. Designing audio that works across devices means understanding these ranges and their limitations.

## Human hearing range

**20 Hz – 20 kHz** is the textbook range, but real-world hearing varies:

- **Low frequencies (bass)**: 20–250 Hz. Felt as much as heard. Phone speakers can't reproduce these well.
- **Mid frequencies**: 250 Hz–4 kHz. Where most speech lives. Critical for intelligibility.
- **High frequencies (treble)**: 4–20 kHz. Detail, clarity, "air." Decreases with age.

Hearing loss typically starts with high frequencies. By age 50, many people can't hear above 12–14 kHz.

## Speech intelligibility

Speech fundamentally lives in the **300–3400 Hz** range — which is why old telephone systems worked with such limited bandwidth. Within this:

- **Fundamental frequencies**: 85–255 Hz (lower for adult males, higher for children)
- **Key consonants**: 2–4 kHz. The "s", "f", "th" sounds that distinguish words
- **Vowels**: Lower frequencies, easier to hear

If your audio needs to communicate speech, prioritize this mid-range.

## Device limitations

Different devices reproduce different frequencies:

- **Phone speakers**: Tiny drivers struggle below 200 Hz. Heavy bass just distorts.
- **Laptop speakers**: Slightly better, but still limited bass.
- **Earbuds/headphones**: Full range, but small drivers may struggle at extremes.
- **Desktop speakers**: Can reproduce full range if quality is decent.

Design your audio to work on the worst-case device your users will have.

## Practical guidelines

### For notification sounds
- Keep them in the 500–4000 Hz range for maximum device compatibility
- Avoid frequencies that blend into background noise
- Test on phone speakers at low volume

### For voice content
- Ensure 300–3400 Hz is clear and uncompressed
- Use noise reduction to cut background hum (usually <200 Hz)
- Compress dynamic range so quiet speech is audible

### For music and rich audio
- Accept that it won't sound the same everywhere
- Provide headphone recommendations for immersive experiences
- Test on multiple devices during production

## Hearing accessibility

- **Mono mixing**: Some users have hearing loss in one ear
- **Frequency shifting**: Assistive tech can shift sounds to audible ranges
- **Visual alternatives**: Never rely on frequency differences alone (like high vs. low pitch alerts)

## References

- ITU-T G.712 — Telephony frequency bands: https://www.itu.int/rec/T-REC-G.712/en
- ASHA — Understanding Hearing Loss: https://www.asha.org/public/hearing/
- Moore, B.C.J. — An Introduction to the Psychology of Hearing: https://brill.com/display/title/33794
