---
title: WCAG Guidelines
description: Prioritize WCAG 2.2 AA; plan exceptions and test regularly.
---

The Web Content Accessibility Guidelines (WCAG) are the international standard for digital accessibility. Most regulations (ADA, Section 508, EN 301 549) reference WCAG, so meeting these guidelines often means meeting legal requirements too.

## Understanding the structure

WCAG is organized around four principles — often remembered as **POUR**:

### Perceivable

Users must be able to perceive the content through at least one sense.

- Provide text alternatives for images (`alt` text)
- Caption videos and provide transcripts for audio
- Don't rely on color alone to convey meaning
- Ensure sufficient contrast (4.5:1 for normal text, 3:1 for large text)
- Allow text to be resized up to 200% without breaking layouts

### Operable

Users must be able to operate the interface.

- Make everything keyboard accessible — no mouse-only interactions
- Provide visible focus indicators
- Give users enough time to read and act
- Don't use content that flashes more than 3 times per second
- Help users navigate with clear headings, skip links, and landmarks

### Understandable

Users must be able to understand the content and interface.

- Use clear, simple language appropriate to your audience
- Make navigation consistent across pages
- Identify input errors clearly and suggest corrections
- Label form fields clearly

### Robust

Content must work reliably across different technologies.

- Use valid, semantic HTML
- Ensure custom components expose proper names, roles, and states
- Test with actual assistive technologies, not just automated tools

## Conformance levels

- **Level A**: Minimum accessibility — must fix these issues
- **Level AA**: Standard target for most websites and apps
- **Level AAA**: Enhanced accessibility — aspirational for most, required for some audiences

Most organizations aim for **WCAG 2.2 AA** as the baseline.

## Common high-impact issues

The majority of accessibility failures come from a short list of problems:

- Missing or poor alt text
- Low color contrast
- Missing form labels
- Empty links and buttons
- Missing document language
- Poor heading structure

Fix these first, and you'll address most of your issues.

## References

- WCAG 2.2 Specification: https://www.w3.org/TR/WCAG22/
- WCAG Quick Reference (filterable checklist): https://www.w3.org/WAI/WCAG22/quickref/
- WebAIM Million (common failures data): https://webaim.org/projects/million/
