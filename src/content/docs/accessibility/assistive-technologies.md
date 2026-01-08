---
title: Assistive Technologies
description: Understanding screen readers, magnifiers, switch devices, voice control, and eye tracking—and designing interfaces that work with them.
---

Assistive technologies (AT) are the software and hardware that help people with disabilities use computers and mobile devices. Around **90% of screen reader usage** is split across just three tools: NVDA, JAWS, and VoiceOver. But assistive technology extends far beyond screen readers—magnifiers, switch devices, voice control, eye tracking, and alternative input devices all have specific requirements.

Understanding how these technologies work—not just their existence—helps you build experiences that actually function for everyone. Testing with real AT is essential because automated testing catches only a fraction of issues.

## Screen readers

Screen readers convert visual interfaces into synthesized speech or braille output. They're essential for blind users and widely used by people with low vision, reading disabilities, and cognitive differences.

### How screen readers work

Screen readers don't "see" your interface—they traverse an **accessibility tree** built from the DOM. They announce:

- **Name**: What is this element? ("Search button", "Email field")
- **Role**: What type of element? (button, link, heading, checkbox)
- **State**: What's its current status? (expanded, checked, disabled)
- **Value**: What data does it contain? (text input contents, slider position)

**Navigation patterns**:
- Virtual cursor moves through the page structure element by element
- Keyboard shortcuts jump between headings (H), landmarks (D), links (K), form fields (F)
- Reading modes: browse mode (read content) vs. focus mode (interact with forms)
- Tab key moves only between focusable/interactive elements

**What screen reader users experience**:
- Linear, sequential access to content
- No visual layout—structure comes from semantics only
- Announcements interrupt each other—can't "glance" at multiple things
- Must build a mental model of page structure while navigating

### Screen reader market share (2024)

[WebAIM's Screen Reader Survey #10](https://webaim.org/projects/screenreadersurvey10/) surveyed 1,539 users in late 2023/early 2024:

**Primary desktop/laptop screen reader**:
| Screen Reader | Usage |
|---------------|-------|
| JAWS | 40.5% |
| NVDA | 37.7% |
| VoiceOver | 9.7% |
| Other | 12.1% |

**Commonly used** (any usage, not just primary):
- NVDA: 65.6%
- JAWS: 60.5%
- VoiceOver: 44%

**Key insight**: **71.6% of users use more than one screen reader**. 43% use three or more. Don't test with just one.

**Operating system**:
- Windows: ~86%
- Mac: ~10%
- Linux: ~3%

**Mobile screen readers** (91.3% use mobile):
- VoiceOver (iOS): 70.6%
- TalkBack (Android): ~28%

### Common screen reader + browser pairings

Test with the combinations your users actually use:

| Combination | Usage |
|-------------|-------|
| JAWS + Chrome | ~25% |
| NVDA + Chrome | ~21% |
| JAWS + Edge | Common |
| NVDA + Firefox | Common |
| VoiceOver + Safari | Standard for Mac/iOS |
| TalkBack + Chrome | Standard for Android |

### What you need to do

**Use semantic HTML**:
- Screen readers understand `<button>`, `<nav>`, `<h2>`, `<main>` natively
- Divs and spans convey no meaning without ARIA
- Semantic elements provide free, correct behavior

**Provide accessible names**:
- Every interactive element needs a name
- Visible labels preferred; `aria-label` when needed
- Icon buttons need text alternatives

**Maintain logical DOM order**:
- Screen readers follow source order, not visual order
- CSS reordering creates mismatches
- Flexbox `order` and grid placement can confuse

**Announce dynamic changes**:
- Use ARIA live regions for updates
- `aria-live="polite"` for non-urgent updates
- `aria-live="assertive"` sparingly, for critical alerts

**Support navigation patterns**:
- Proper heading hierarchy (h1 → h2 → h3)
- Landmark regions (`<nav>`, `<main>`, `<aside>`)
- Skip links to bypass repetitive content

## Screen magnifiers

Magnification tools enlarge portions of the screen for users with low vision—typically **2× to 16×** or higher. Built-in options include Windows Magnifier, macOS Zoom, and iOS/Android zoom features. Third-party tools like ZoomText offer additional features.

### How magnification works

**Full-screen magnification**: Entire screen enlarged, user pans to navigate
**Lens/window magnification**: Magnified area follows cursor
**Split-screen**: Part magnified, part normal size

**What users experience**:
- See only a small portion of the screen at any time
- Must pan constantly to understand context
- Easy to lose cursor or focus
- Notifications and tooltips may appear outside visible area

### Challenges for magnification users

**Limited viewport**:
- At 4× zoom, users see only 1/16th of the screen
- At 8× zoom, only 1/64th is visible
- Context and relationships are easily lost

**Focus and cursor tracking**:
- When focus moves, the magnified area should follow
- Unexpected focus jumps disorient users
- Cursor can "get lost" at screen edges

**Content appearing off-screen**:
- Tooltips, dropdowns, and notifications may render outside the viewport
- Modal dialogs may partially appear
- Error messages at distant screen locations are missed

### What you need to do

**Keep related content close together**:
- Form labels adjacent to fields
- Error messages near the input they reference
- Related actions grouped visually

**Ensure focus moves logically**:
- Focus should follow a predictable path
- Avoid focus jumps across the screen
- Keep focus visible and trackable

**Support browser zoom**:
- Test at 200%, 400%, 500% zoom
- Layouts should reflow, not require horizontal scrolling
- Text should enlarge with zoom (use relative units)
- WCAG requires support up to 400% zoom

**Position overlays near triggers**:
- Dropdowns open near the activating element
- Tooltips appear close to their targets
- Notifications appear near current focus when possible

## Switch devices

Switch users navigate with one or more physical buttons instead of a keyboard, mouse, or touchscreen. They cycle through focusable elements sequentially, selecting when the desired element is highlighted.

### How switch access works

**Scanning patterns**:
- **Row-column scanning**: Highlight rows, select row, then highlight items within
- **Linear scanning**: Step through every focusable element in order
- **Group scanning**: Navigate by groups, then within groups

**Input methods**:
- Physical button presses
- Sip-and-puff devices (inhale/exhale through tube)
- Proximity sensors
- Eye blinks (with eye tracking)
- Head movements

**What switch users experience**:
- Navigation is **slow**—every extra tab stop costs time and effort
- May take many switch activations to reach a target
- Timing-dependent interactions can be impossible
- Fatigue accumulates with extended use

### What you need to do

**Optimize focus order**:
- Logical, efficient tab sequence
- Skip redundant or decorative elements
- Group related controls sensibly

**Reduce required interactions**:
- Fewer steps to complete tasks
- Shortcuts to common destinations
- Don't require repeated selections

**Provide large, spaced targets**:
- Minimum 44×44px targets (larger preferred)
- Adequate spacing between focusable elements
- Clear visual focus indicators

**Eliminate time dependencies**:
- No time limits, or generous/extendable limits
- No interactions requiring quick repeated presses
- Allow switch users to work at their own pace

**Never require complex gestures**:
- No multi-finger gestures without alternatives
- No precise pointer movements
- No drag-and-drop without keyboard alternative

## Voice control

Voice control lets users speak commands to navigate and interact. Users say what they see or use numbered overlays to select elements.

### Voice control tools

**Built-in**:
- Apple Voice Control (iOS, macOS)
- Windows Voice Access
- Android Voice Access

**Third-party**:
- Dragon NaturallySpeaking (professional dictation)
- Talon (hands-free coding)

### How voice control works

**Direct commands**: "Click Submit", "Open menu", "Go back"
**Numbered navigation**: Numbers appear on clickable elements; user says the number
**Grid navigation**: Screen divided into numbered grid sections for precision
**Dictation**: Speaking text into input fields

**What voice users experience**:
- Must be able to identify elements by their visible labels
- Ambiguous or duplicate names cause confusion
- Hidden accessible names don't match what's visible
- Background noise can interfere

### What you need to do

**Match visible labels to accessible names**:
- What users see must be what they say
- If button shows "Submit Order", accessible name should include "Submit Order"
- WCAG 2.5.3: Label in Name

**Avoid duplicate names on the same page**:
- Multiple "Learn More" links are ambiguous
- "Click Submit"—which one?
- Use unique, descriptive labels

**Ensure interactive elements are properly identified**:
- Clickable elements need proper roles
- Custom controls need appropriate ARIA
- All functionality reachable by voice

**Support dictation in text fields**:
- Standard input fields work with dictation
- Custom text handling may break voice input
- Test dictation in forms

## Eye tracking

Eye tracking technology allows users to control devices using eye movements. It's particularly valuable for users with severe motor impairments who cannot use other input methods.

### 2024 eye tracking developments

[Apple announced native eye tracking](https://www.apple.com/newsroom/2024/05/apple-announces-new-accessibility-features-including-eye-tracking/) for iPhone and iPad in 2024:
- Uses front camera and on-device machine learning
- Navigate through app elements using gaze
- Dwell Control activates elements by looking at them
- No additional hardware required

**Google Project Gameface**: Open-source head and face tracking
- Control cursor with head movement
- Gestures (mouth open, eyebrow raise) trigger actions
- Works on Windows, available for developer integration

### How eye tracking works

**Gaze navigation**: User looks at an element to select it
**Dwell selection**: Looking at an element for a set time activates it
**Gaze + switch**: Eye tracking for pointing, switch for clicking
**Head tracking**: Head movement controls cursor position

### What you need to do

**Large, well-spaced targets**:
- Eye tracking is less precise than other input methods
- Larger targets are easier to dwell on
- Spacing prevents accidental activation of adjacent elements

**Support dwell activation**:
- Elements should be activatable via hover/dwell
- Avoid hover-only content that disappears
- Don't require precise clicking

**Avoid rapid movements**:
- Quick gaze changes are tiring
- Group related actions together
- Minimize required eye travel across the screen

## Atypical speech recognition

Traditional voice recognition struggles with atypical speech patterns. 2024 saw significant advances:

**Apple Listen for Atypical Speech**:
- On-device machine learning recognizes individual speech patterns
- Designed for users with cerebral palsy, ALS, stroke
- Adapts to progressive conditions as speech changes

**Vocal Shortcuts** (Apple):
- Custom utterances trigger shortcuts
- Any sound can be mapped to actions
- Bypasses standard voice command vocabulary

### What you need to do

- Support custom voice commands when possible
- Don't assume specific speech patterns
- Provide non-voice alternatives for all functionality

## Testing with assistive technologies

### Essential testing combinations

**Desktop minimum**:
- NVDA + Chrome or Firefox (Windows)
- JAWS + Chrome (Windows) if resources allow
- VoiceOver + Safari (Mac)

**Mobile minimum**:
- VoiceOver + Safari (iOS)
- TalkBack + Chrome (Android)

**Additional testing**:
- Screen magnification at 200%, 400%
- Keyboard-only navigation
- Voice control (at least one platform)

### What to test

**Screen reader testing**:
- [ ] All content is announced in logical order
- [ ] Interactive elements have clear names and roles
- [ ] State changes are announced
- [ ] Focus management works correctly
- [ ] Forms are usable and errors are announced

**Magnification testing**:
- [ ] Page works at 400% zoom
- [ ] No horizontal scrolling required
- [ ] Focus remains visible when magnified
- [ ] Related content stays together

**Switch/keyboard testing**:
- [ ] All functionality reachable by keyboard
- [ ] Focus order is logical
- [ ] Focus indicator is visible
- [ ] No keyboard traps
- [ ] No time limits block completion

**Voice control testing**:
- [ ] Visible labels match accessible names
- [ ] No ambiguous or duplicate names
- [ ] All interactive elements are activatable by voice

## Recent Research (2024-2025)

### WebAIM Screen Reader Survey #10

The [2024 WebAIM survey](https://webaim.org/projects/screenreadersurvey10/) of 1,539 screen reader users found JAWS and NVDA usage nearly equal (40.5% vs 37.7% primary), with 71.6% of users using multiple screen readers. Mobile usage is at 91.3%, dominated by VoiceOver at 70.6%.

### Screen Reader Comparison 2025

According to [2025 screen reader analysis](https://accessibility-test.org/blog/development/screen-readers/nvda-vs-jaws-vs-voiceover-2025-screen-reader-comparison/), JAWS remains dominant in professional/enterprise environments with AI-powered assistance features, while NVDA's free availability has "democratized access to assistive technology" worldwide.

### Apple 2024 Accessibility Features

[Apple's May 2024 announcement](https://www.apple.com/newsroom/2024/05/apple-announces-new-accessibility-features-including-eye-tracking/) introduced native Eye Tracking, Music Haptics, Vocal Shortcuts, and Listen for Atypical Speech—making iOS devices more accessible without additional hardware.

### Alternative Input Market Growth

According to [accessibility technology research](https://medium.com/@hiren6997/the-future-is-hands-free-voice-touchless-gesture-navigation-revolution-b136f27d10d5), gesture recognition technology is growing at ~17% annually, and voice assistants at ~27% annually through 2030, indicating increasing adoption of alternative input methods.

### Cloud-Based AT Testing

[Assistiv Labs](https://assistivlabs.com/) provides cloud-based access to real assistive technologies for testing, addressing the challenge of accessing diverse AT combinations without owning all devices.

## Implementation checklist

### Assistive technology compatibility audit

- [ ] **Semantic HTML**: Proper use of buttons, headings, landmarks, lists
- [ ] **Accessible names**: All interactive elements have clear names
- [ ] **Focus management**: Logical order, visible indicators, no traps
- [ ] **Keyboard access**: All functionality keyboard-operable
- [ ] **Screen reader testing**: Tested with NVDA, VoiceOver minimum
- [ ] **Zoom support**: Works at 400% without horizontal scroll
- [ ] **Voice control**: Visible labels match accessible names
- [ ] **Dynamic content**: Live regions announce updates appropriately
- [ ] **Time limits**: Adjustable or removable

## References

**Surveys & Research:**
- [WebAIM Screen Reader User Survey #10](https://webaim.org/projects/screenreadersurvey10/) (2024)
- [Key Findings from WebAIM 2024 Survey](https://medium.com/design-domination/key-findings-from-the-webaim-2024-screen-reader-user-survey-bb15864d3bc8)
- [NVDA vs JAWS vs VoiceOver 2025 Comparison](https://accessibility-test.org/blog/development/screen-readers/nvda-vs-jaws-vs-voiceover-2025-screen-reader-comparison/)

**Screen Reader Documentation:**
- [Apple VoiceOver Guide](https://support.apple.com/guide/voiceover/welcome/mac)
- [NV Access — NVDA](https://www.nvaccess.org/)
- [Freedom Scientific — JAWS](https://www.freedomscientific.com/products/software/jaws/)
- [Google TalkBack](https://support.google.com/accessibility/android/answer/6283677)

**Alternative Input:**
- [Apple 2024 Accessibility Features](https://www.apple.com/newsroom/2024/05/apple-announces-new-accessibility-features-including-eye-tracking/)
- [Alternative Input Devices Overview](https://accesstive.com/glossary/alternative-input-devices/)
- [iOS Voice Control Guide](https://ixd.prattsi.org/2025/02/assistive-technology-ios-voice-control/)

**Testing Resources:**
- [Assistiv Labs — Cloud AT Testing](https://assistivlabs.com/)
- [W3C — How People with Disabilities Use the Web](https://www.w3.org/WAI/people-use-web/)

---

## See Also

- [WCAG Guidelines](/accessibility/wcag-guidelines/) — Full accessibility standards
- [Testing & Audit Tools](/accessibility/testing-audit-tools/) — Automated and manual testing
- [ARIA & Keyboard Patterns](/code-design-tokens/aria-keyboard-patterns/) — Implementation details
- [Touch](/perception/touch/) — Touch accessibility considerations
- [Hearing](/perception/hearing/) — Audio accessibility
