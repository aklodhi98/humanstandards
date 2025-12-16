---
title: Assistive Technologies
description: Screen readers, magnifiers, switch and voice — test with real devices.
---

Assistive technologies (AT) are the software and hardware that help people with disabilities use computers and mobile devices. Understanding how they work helps you build experiences that actually work for everyone.

## Screen readers

Screen readers convert visual interfaces into synthesized speech or braille output. They're essential for blind users and widely used by people with low vision, reading disabilities, and cognitive differences.

**How they work:**
- Navigate using a "virtual cursor" that moves through the page's structure
- Read element names, roles, and states (e.g., "Search button", "Expanded menu")
- Provide keyboard shortcuts to jump between headings, landmarks, links, and form fields

**What you need to do:**
- Use semantic HTML — screen readers understand `<button>`, `<nav>`, and `<h2>` natively
- Provide accessible names for all interactive elements
- Keep the DOM order logical; avoid rearranging with CSS in confusing ways
- Announce dynamic changes with ARIA live regions

**Common pairings:**
- VoiceOver + Safari (Mac, iOS)
- NVDA + Firefox/Chrome (Windows)
- JAWS + Chrome/Edge (Windows)
- TalkBack + Chrome (Android)

## Screen magnifiers

Magnification tools enlarge portions of the screen for users with low vision — typically 2× to 16× or higher.

**Challenges:**
- Users see only a small portion of the screen at once
- They need to "pan" around to understand context
- Overlays, tooltips, and notifications can appear outside the visible area

**What you need to do:**
- Keep related content close together
- Ensure focus moves logically (don't make users hunt)
- Allow zooming without breaking layouts (support 200%+ zoom in browsers)

## Switch devices

Switch users navigate with one or more physical buttons instead of a keyboard or touch screen. They cycle through focusable elements sequentially.

**Challenges:**
- Navigation is slow — every extra tab stop costs time and effort
- Small or closely packed targets are hard to select
- Timing-dependent interactions may be impossible

**What you need to do:**
- Keep focus order logical and efficient
- Provide large touch/click targets with adequate spacing
- Avoid time limits or provide generous extensions
- Never require multi-finger gestures or precise movements

## Voice control

Voice control lets users speak commands to navigate and interact. Dragon NaturallySpeaking, Apple Voice Control, and Android Voice Access are common examples.

**How it works:**
- Users say what they see: "Click Submit", "Show links", "Go to address"
- Numbers can be overlaid on clickable elements to disambiguate

**What you need to do:**
- Match visible labels to accessible names — what users see should be what they say
- Avoid duplicate names on the same page ("Click Submit" which one?)
- Ensure interactive elements are properly identified

## References

- WebAIM Screen Reader Survey: https://webaim.org/projects/screenreadersurvey/
- Apple — VoiceOver Guide: https://support.apple.com/guide/voiceover/welcome/mac
- NV Access — NVDA: https://www.nvaccess.org/
- W3C — How People with Disabilities Use the Web: https://www.w3.org/WAI/people-use-web/
