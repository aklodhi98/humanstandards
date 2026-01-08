---
title: Hearing
description: Designing audio experiences that complement visual interfaces, provide accessible alternatives, and work across diverse listening contexts.
---

Audio can make interfaces richer and more intuitive—but it's never the only channel. Over **1.5 billion people** worldwide live with some form of hearing disability. Many more are in noisy environments where audio is inaudible, or quiet ones where sound would be disruptive. Designing for hearing means making audio helpful when available while ensuring nothing depends on it.

Sound in UX is shifting from standalone notifications to fully integrated design systems. As technology moves beyond screens into AR, VR, and wearable interfaces, spatial audio and 3D sound will play increasingly important roles. But the foundational principle remains: audio must complement, never replace, other channels.

## The golden rule

**Never make audio the only way to convey information.** Every sound should have a visual (or haptic) equivalent. Every video with speech needs captions. Every podcast needs a transcript.

This isn't just about accessibility compliance—it's about designing for the reality of how people use technology across diverse contexts.

## Understanding hearing diversity

### The spectrum of hearing ability

Hearing ability exists on a spectrum:

**Deaf**: Complete or near-complete hearing loss
- About **1 million people** in the U.S. are functionally deaf
- Many use sign language (about 500,000 in the U.S.)
- Visual-first communication is essential

**Hard of hearing**: Partial hearing loss
- Nearly **30 million Americans** need hearing aids
- May hear some sounds but miss others
- Benefit from amplification and captioning

**Tinnitus**: Ringing or buzzing in ears
- Affects **50 million Americans**
- Certain frequencies may be painful or masked
- Need volume control and frequency considerations

**Age-related hearing loss (presbycusis)**:
- Affects most people to some degree as they age
- Typically high frequencies lost first
- **15% of people aged 6-19** have substantial hearing issues

**Temporary or situational hearing limitations**:
- Ear infections, congestion
- Noise-induced temporary threshold shift
- Using devices in noisy environments

### Communication preferences

People with hearing disabilities have diverse communication preferences:

**Captions and transcripts**: Most commonly preferred
- Works for people who became deaf later in life
- Doesn't require learning sign language
- Universally understood by all literacy levels

**Sign language**: Used by about 0.5% of hearing-impaired population
- Primary language for culturally Deaf community
- Different sign languages exist (ASL, BSL, etc.)
- Video sign interpretation for critical content

**Real-Time Text (RTT)**: Messages appear as typed
- Eliminates delays waiting for "send"
- Crucial for emergency communication
- Live conversation support

**Design implication**: Provide multiple alternatives. Don't assume all deaf users know sign language—most don't, especially those with later-onset hearing loss.

## Giving users control

### Volume and mute

Always provide comprehensive audio controls:

**Essential controls**:
- Volume adjustment for all audio content
- Mute option that persists across sessions
- Clear indication of current sound state
- Independent volume for different sound types (effects, music, voice)

**Control placement**:
- Accessible without starting audio playback
- Visible and easy to find
- Works with keyboard and screen readers
- Remembers user preferences

### No autoplay surprises

Audio that plays automatically is jarring—especially with sound effects or speech.

**WCAG requirement (1.4.2 Audio Control)**: Any audio playing for more than 3 seconds must be pausable, stoppable, or have independent volume control.

**Best practice**: Don't autoplay audio at all. If you must:
- Start muted by default
- Show clear visual indication that audio is available
- Provide immediate, obvious controls
- Remember user's mute preference

**Why this matters**: Unexpected audio can cause embarrassment (in quiet offices), startle responses (for anxious users), or complete inaccessibility (for screen reader users whose audio is interrupted).

## Pairing audio with alternatives

### Visual equivalents for sounds

Every auditory cue needs a visual counterpart:

**Sound effects and feedback**:
- Success sounds → checkmark animation, green flash
- Error sounds → shake animation, red indicator
- Notification sounds → badge count, banner, icon change
- Progress sounds → progress bar, percentage display

**Alarms and alerts**:
- Critical alerts → visual banner, screen flash, vibration
- Timers → visual countdown, screen notification
- System alerts → persistent visual indicator

**Status and ambient sounds**:
- Loading/processing → spinner, progress bar
- Connection status → icon changes
- Mode changes → visual mode indicators

### Captions for video

**WCAG requirement (1.2.2 Captions)**: All prerecorded video with audio must have synchronized captions.

**Quality captions include**:
- Accurate transcription of all speech
- Speaker identification when relevant
- Synchronized timing with audio
- Non-speech sounds described [door slams], [music plays]
- Tone and manner cues [sarcastically], [whispering]

**Caption best practices**:
- Professional review, not auto-generated only
- 1-2 lines maximum at a time
- Sufficient display duration for reading
- High contrast, readable font
- Positioning that doesn't obscure important visuals

**Research finding**: Closed captioning significantly improves learner access, outcomes, and performance—not just for deaf users, but for all learners.

### Transcripts for audio

**WCAG requirement (1.2.1)**: All prerecorded audio-only content must have a text transcript.

**Transcripts should include**:
- Complete text of all spoken content
- Identification of speakers
- Description of significant sounds
- Time stamps for long content
- Searchable, accessible format

**Benefits beyond accessibility**:
- SEO improvement (searchable content)
- Quiet environment use
- Skimmable content
- Reference and quotation
- Translation capability

### Audio descriptions

For users who can hear but can't see visual content:

**WCAG requirement (1.2.5 Audio Descriptions)**: Prerecorded video must have audio descriptions of important visual information.

**Audio descriptions provide**:
- Narration of key visual elements
- Description of actions and scene changes
- Character identification
- On-screen text reading
- Important visual context

## Environmental awareness

Design for different listening contexts:

### Quiet environments

Libraries, sleeping babies, hospital rooms, late-night use:

- **Need**: Silent mode that doesn't lose information
- **Solution**: All sounds have visual equivalents, vibration options
- **Test**: Use interface with sound completely disabled

### Noisy environments

Cafés, public transport, factories, outdoor use:

- **Need**: Visual must carry the full message
- **Solution**: Captions, large visual indicators, redundant cues
- **Test**: Use interface in noisy environment or with earplugs

### Shared spaces

Offices, open floor plans, public spaces:

- **Need**: Users don't want to disturb others
- **Solution**: Easy mute, headphone detection, volume memory
- **Test**: Would you use this in a library?

### Headphone users

Private listening with good audio quality:

- **Can support**: Stereo, higher frequencies, subtle sounds, spatial audio
- **Opportunity**: Richer audio experience when detected
- **Consideration**: Don't make headphone features mandatory

## Sound design principles

### Functional vs. decorative audio

**Functional audio** provides information:
- Confirmation of actions
- Error alerts
- Status changes
- Navigation cues

**Decorative audio** enhances experience:
- Background music
- Ambient sounds
- Audio branding
- Mood setting

**Rule**: Functional audio needs visual equivalents. Decorative audio should be optional and easy to disable.

### Audio feedback guidelines

**Effective audio feedback is**:
- **Brief**: Short sounds for quick feedback (< 0.5 seconds for confirmations)
- **Distinct**: Different sounds for different meanings
- **Pleasant**: Not jarring, especially for frequent actions
- **Informative**: Conveys meaning, not just presence
- **Consistent**: Same sound means same thing throughout

**Avoid**:
- Sounds that are annoying with repetition
- Similar sounds for different meanings
- Sounds that compete with speech
- Frequencies that are commonly lost to hearing impairment

### Spatial audio considerations

As interfaces extend to AR, VR, and XR:

**Spatial audio can**:
- Orient users in virtual environments
- Provide navigational cues
- Reinforce actions and feedback
- Create immersive experiences

**Accessibility requirements**:
- All spatial cues need non-audio alternatives
- Mono mode for users with single-ear hearing
- Visual indicators for sound direction/source
- Alternative navigation methods

## Voice interfaces

### Voice input accessibility

Voice user interfaces (VUIs) are rapidly transforming human-computer interaction, but require careful accessibility consideration:

**For deaf and hard of hearing users**:
- Always provide non-voice input alternatives
- Visual feedback for voice input (text display)
- Text-based alternatives for all voice commands

**For all users**:
- Error recovery without voice
- Visual confirmation of recognized input
- Ability to correct without speaking

### Voice output accessibility

When systems speak to users:

- Provide visual text equivalent
- Allow playback speed control
- Offer text-to-speech alternatives
- Support screen reader compatibility

## Contact and communication

### Don't rely only on phone

Many deaf and hard of hearing users cannot use voice phone calls effectively.

**Provide multiple contact methods**:
- Email
- Live chat
- Video chat with sign interpretation when possible
- Online forms
- Text messaging / SMS
- Real-Time Text (RTT) where supported

**For customer service**:
- TTY/TDD number if available
- Video relay service (VRS) compatibility
- Response time expectations for non-phone contact
- Equal quality of service across channels

## Testing for hearing accessibility

### Manual testing

- **Disable sound completely**: Can you still use the interface fully?
- **Caption review**: Are captions accurate, timed well, and complete?
- **Transcript check**: Do transcripts include all content?
- **Control accessibility**: Can audio be controlled via keyboard?

### User testing

- Include deaf and hard of hearing users
- Test with different hearing devices
- Test caption preferences
- Gather feedback on communication options

### Automated checking

- Caption file validation
- Audio control presence
- WCAG conformance checking
- Media accessibility audits

## Recent Research (2024-2025)

### Soundability Lab Research

The [Soundability Lab at University of Michigan](https://soundability.eecs.umich.edu) designs human-centered, agentic AI for sound accessibility. Current research includes real-time audio captioning systems, editable digital media soundscapes, and adaptive hearing systems. They view sound personalization as a way to make sound more inclusive and equitable.

### 2025 Sound Design Predictions

According to [industry experts](https://cmooresound.com/2024/12/2025-sound-predictions/), in 2025 brands will shift from standalone audio logos to fully integrated UX sound design. Inclusive design practices will ensure sound supports all users through audio-based navigation for visually impaired users, confirmation sounds for actions, and cognitive-friendly sound cues.

### DOJ 2024 ADA Digital Accessibility Rule

The [Department of Justice's April 2024 final rule](https://www.ada.gov/resources/2024-03-08-web-rule/) updated ADA Title II requirements for web content and mobile apps. Public entities must follow WCAG 2.1 Level AA, with compliance deadlines of April 2026 for large entities (50,000+ population) and April 2027 for smaller entities.

### Caption Effectiveness Research

Research published in [Digital Disability & Deaf Studies Journal](https://digitalcommons.usu.edu/cgi/viewcontent.cgi?article=1122&context=ddnj) confirms that implementing closed captions significantly improves learner access, outcomes, and performance for all learners, not just those with hearing disabilities.

### Voice User Interface Research

A [2024 systematic literature review](https://www.mdpi.com/2078-2489/15/9/579) on voice user interfaces proposes a six-category classification framework for VUI research. The review emphasizes the importance of accessible voice interface design as VUIs transform human-computer interaction.

### Spatial Audio in Immersive UX

As technology moves beyond screens to AR, VR, and XR, [2025 predictions](https://www.uxmatters.com/mt/archives/2024/08/the-role-of-sound-design-in-ux-design-beyond-notifications-and-alerts.php) indicate spatial audio and 3D sound design will help orient users in virtual environments, providing navigational cues and reinforcing actions. Automotive, healthcare, and consumer electronics will see increased emphasis on sound safety and compliance.

## Implementation checklist

### Hearing accessibility audit

- [ ] **No audio-only information**: All sounds have visual equivalents
- [ ] **Video captions**: Accurate, synchronized, including non-speech sounds
- [ ] **Audio transcripts**: Complete text for audio-only content
- [ ] **Volume controls**: Easily accessible, persistent preferences
- [ ] **No autoplay**: Or starts muted with clear controls
- [ ] **Multiple contact methods**: Not phone-only
- [ ] **Audio descriptions**: For video with important visual content
- [ ] **Silent mode test**: Interface fully usable without sound

## References

**Official Standards:**
- [WCAG 2.2 — Audio Control (1.4.2)](https://www.w3.org/WAI/WCAG22/Understanding/audio-control)
- [WCAG 2.2 — Captions (1.2.2)](https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded)
- [WCAG 2.2 — Audio Description (1.2.5)](https://www.w3.org/WAI/WCAG22/Understanding/audio-description-prerecorded)
- [W3C — Making Audio and Video Accessible](https://www.w3.org/WAI/media/av/)

**Recent Research:**
- [Soundability Lab](https://soundability.eecs.umich.edu) — University of Michigan
- [The Role of Sound Design in UX](https://www.uxmatters.com/mt/archives/2024/08/the-role-of-sound-design-in-ux-design-beyond-notifications-and-alerts.php) — UXmatters (2024)
- [Voice User Interface Systematic Review](https://www.mdpi.com/2078-2489/15/9/579) (2024)
- [DOJ 2024 ADA Web Accessibility Rule](https://www.ada.gov/resources/2024-03-08-web-rule/)

**Practical Resources:**
- [8 Facts About Hearing Disabilities and Web Accessibility](https://www.boia.org/blog/8-facts-about-hearing-disabilities-and-web-accessibility)
- [Digital Accessibility for the Deaf and Hard of Hearing](https://www.audioeye.com/post/digital-accessibility-deaf-hard-of-hearing/)
- [Sound Design in UX: Audio Branding](https://medium.com/design-bootcamp/sound-design-in-ux-the-power-of-audio-branding-5b859c4ad1b3)
- [Sound Advice: Guide to Designing UX Sounds](https://www.toptal.com/designers/ux/ux-sounds-guide)

---

## See Also

- [Frequency Ranges](/perception/hearing/frequency-ranges/) — Human hearing frequency capabilities
- [Noise & Masking](/perception/hearing/noise-masking/) — Audio interference and solutions
- [WCAG Guidelines](/accessibility/wcag-guidelines/) — Full accessibility standards
- [Assistive Technologies](/accessibility/assistive-technologies/) — Hearing assistance devices
- [Notifications & Feedback](/interaction-patterns/notifications-feedback/) — Audio notification patterns
