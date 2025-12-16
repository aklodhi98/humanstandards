---
title: Testing & Audit Tools
description: Combine automated checks with manual keyboard and screen reader passes.
---

Automated tools catch about 30–50% of accessibility issues — things like missing alt text, low contrast, and invalid ARIA. The rest requires human testing: navigating with a keyboard, listening with a screen reader, and understanding whether the experience actually makes sense.

## Automated testing tools

These tools scan your pages and flag common issues:

- **axe DevTools**: Browser extension and CI integration. Industry standard with excellent rule coverage. Free and paid tiers.
- **Lighthouse**: Built into Chrome DevTools. Quick audits for accessibility, performance, and SEO in one pass.
- **WAVE**: Visual feedback directly on your page — shows where issues occur in context.
- **Pa11y**: Command-line tool for CI pipelines. Great for automated regression testing.

Run these on every page, but don't stop there.

## Manual testing essentials

### Keyboard navigation

Put down your mouse and try to complete key tasks using only your keyboard:

- Can you reach every interactive element with Tab/Shift+Tab?
- Is focus visible at all times?
- Can you activate buttons with Enter and Space?
- Can you escape modal dialogs?
- Does focus order make sense?

### Screen reader testing

Test with at least one screen reader — ideally the most common pairings:

- **VoiceOver + Safari** (Mac/iOS): Built into Apple devices. Cmd+F5 to start on Mac.
- **NVDA + Firefox/Chrome** (Windows): Free download. Most popular on desktop.
- **TalkBack + Chrome** (Android): Built into Android devices.

Listen for: Are interactive elements announced with clear names and roles? Do state changes (expanded, selected, checked) get announced? Is the reading order logical?

## Integrating into your workflow

- Run automated scans in CI — fail builds on critical issues (like missing form labels).
- Include keyboard and screen reader checks in your PR review checklist.
- Track accessibility issues alongside other bugs; prioritize by user impact.
- Schedule quarterly audits with deeper manual testing.
- Consider periodic testing with disabled users — nothing beats real feedback.

## Color and contrast tools

- **WebAIM Contrast Checker**: Quick manual checks: https://webaim.org/resources/contrastchecker/
- **Stark**: Design tool plugin for Figma, Sketch, Adobe XD
- **Polypane**: Browser with built-in accessibility simulation

## References

- axe DevTools: https://www.deque.com/axe/devtools/
- WAVE: https://wave.webaim.org/
- Pa11y: https://pa11y.org/
- WebAIM Screen Reader Survey: https://webaim.org/projects/screenreadersurvey/
