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

## Recent Updates (2024-2025)

### WCAG 2.2 Becomes the Standard

WCAG 2.2 was published on October 5, 2023, with an update on December 12, 2024. [WCAG 2.1 received an updated W3C Recommendation on May 6, 2025](https://www.w3.org/news/2025/web-content-accessibility-guidelines-wcag-2-1-updated/), addressing minor technical issues.

**WCAG 2.2 is now the baseline compliance standard for 2025**, adding 9 new success criteria including:
- **Focus Appearance (Enhanced)** — Better visibility for keyboard focus
- **Dragging Movements** — Alternatives to drag-and-drop operations
- **Target Size (Minimum)** — Tap/click targets of at least 24×24 CSS pixels

### ISO Standardization

WCAG 2.2 became an approved ISO standard as **ISO/IEC 40500:2025**, exactly matching the October 2023 version. The December 2024 version is expected to become ISO/IEC 40500:2026 by late 2026.

### Legal and Regulatory Landscape

In April 2024, the DOJ final rule established explicit requirements for state and local government web content and mobile applications, naming **WCAG 2.2 Level AA as the standard**. Over 4,500 digital accessibility lawsuits were filed in the U.S. in 2024, primarily under the ADA.

As of June 28, 2025, all businesses must be fully compliant with the **European Accessibility Act's requirements**, with enforcement and penalties now active. EN 301 549 currently uses WCAG 2.1, but the next version is expected to use WCAG 2.2.

### WCAG 3.0 Development

The Accessibility Guidelines Working Group is progressing WCAG 3.0 through 2025, with plans to complete the proposed guidelines and conformance model for public review. However, [WCAG 3 is not expected to be a completed W3C standard for several years](https://www.w3.org/WAI/standards-guidelines/wcag/wcag3-intro/), and will not supersede WCAG 2 for at least several years after finalization.

WCAG 3's philosophy—focusing on outcomes, tasks, and usability rather than rigid pass/fail criteria—is already influencing how accessibility professionals think, with more emphasis on task completion, severity assessment, and cognitive considerations.

### Industry Adoption

Industry experts expect 2026 to see WCAG 2.1 feel old and WCAG 2.2 become the default expectation in procurement language, RFPs, and accessibility evaluation. Organizations should treat **WCAG 2.2 Level AA as the operative compliance standard** while monitoring WCAG 3.0 development for future-proofing.

## References

**Official Standards:**
- [WCAG 2.2 Specification](https://www.w3.org/TR/WCAG22/)
- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/) (filterable checklist)
- [WCAG 3.0 Introduction](https://www.w3.org/WAI/standards-guidelines/wcag/wcag3-intro/)

**Recent Updates:**
- [Web Content Accessibility Guidelines (WCAG) 2.1 Updated (May 2025)](https://www.w3.org/news/2025/web-content-accessibility-guidelines-wcag-2-1-updated/)
- [What We're Working On | WAI | W3C](https://www.w3.org/WAI/update/)
- [2025 WCAG & ADA Website Compliance Requirements](https://www.accessibility.works/blog/wcag-ada-website-compliance-standards-requirements/)
- [Web Accessibility Best Practices 2025 Guide](https://www.broworks.net/blog/web-accessibility-best-practices-2025-guide)

**Practical Resources:**
- [WebAIM Million](https://webaim.org/projects/million/) (common failures data)
- [2026 Predictions: The Next Big Shifts in Web Accessibility](https://webaim.org/blog/2026-predictions/)

---

## See Also

- [Assistive Technologies](/accessibility/assistive-technologies/) — Screen readers, keyboard navigation
- [Testing & Audit Tools](/accessibility/testing-audit-tools/) — Automated and manual testing methods
- [Color Accessibility](/perception/vision/colour-accessibility/) — Designing for color vision deficiency
