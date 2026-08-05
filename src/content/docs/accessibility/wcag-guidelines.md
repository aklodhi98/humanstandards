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

## Which version applies to you

This trips up a lot of teams, because the version you *should* build to and the version that is *legally required* of you are usually not the same.

| If you are… | Legally required | Recommended target |
|-------------|------------------|--------------------|
| US state or local government (ADA Title II) | WCAG 2.1 AA | 2.2 AA |
| US HHS-funded healthcare (Section 504) | WCAG 2.1 AA | 2.2 AA |
| US federal agency or contractor (Section 508) | WCAG 2.0 AA | 2.2 AA |
| Selling into the EU (EAA / EN 301 549 V3.2.1) | WCAG 2.1 AA | 2.2 AA |
| Everyone else | No general mandate | 2.2 AA |

:::caution[WCAG 2.2 is the right target, but it is not what most regulations cite]
No major regulation currently mandates WCAG 2.2. The DOJ's April 2024 ADA Title II rule names **WCAG 2.1 Level AA** — you will see this widely misreported as 2.2. EN 301 549 moves to 2.2 when V4.1.1 is cited in the Official Journal, expected around October 2026.

Build to 2.2 AA anyway: it is backwards compatible, it is where procurement language is heading, and the nine added criteria are genuinely worth having. Just do not tell a regulator or auditor that 2.2 is what the rule says.
:::

Full deadline tables, penalty ranges, and jurisdiction detail live in [Standards & Guidelines](/references/standards-guidelines/).

## Recent Updates

### WCAG 2.2 is now an ISO standard

On [21 October 2025 WCAG 2.2 was approved as **ISO/IEC 40500:2025**](https://www.w3.org/WAI/news/2025-10-21/wcag22-iso), matching the October 2023 version exactly. This matters mainly because it lets countries that adopt standards by ISO reference pick up WCAG 2.2 without writing their own. The December 2024 editorial update is expected to land as ISO/IEC 40500:2026 in late 2026.

WCAG 2.2 was published 5 October 2023 and editorially updated 12 December 2024. [WCAG 2.1 received an updated Recommendation on 6 May 2025](https://www.w3.org/news/2025/web-content-accessibility-guidelines-wcag-2-1-updated/) covering minor technical issues. Its nine added criteria over 2.1 include:

- **Target Size (Minimum), 2.5.8** — tap targets at least 24×24 CSS pixels
- **Dragging Movements, 2.5.7** — a non-drag alternative for any drag operation
- **Focus Not Obscured, 2.4.11** — sticky headers must not cover the focused element
- **Accessible Authentication, 3.3.8** — no cognitive function test to log in
- **Redundant Entry, 3.3.7** — don't ask for the same information twice in a process

### US deadlines both slipped a year

Two federal deadlines moved within three weeks of each other in 2026:

- **17 April 2026** — DOJ extended ADA Title II to 26 April 2027 (population ≥ 50,000) and 26 April 2028 (smaller entities and special districts)
- **7 May 2026** — HHS extended Section 504 to 11 May 2027 (15+ employees) and 10 May 2028 (fewer than 15), four days before the original date

Neither extension changed the technical requirement. Both remain WCAG 2.1 AA.

Litigation has not slowed: Seyfarth Shaw counted **3,117 federal website accessibility lawsuits in 2025**, up 27% from 2,452 in 2024, and 36% of all federal ADA Title III filings.

### The EAA is applicable, enforcement is uneven

The European Accessibility Act became applicable on 28 June 2025. In its first year enforcement varied widely by member state — France's DGCCRF issued formal notices to four major retailers in November 2025, German operators saw law-firm warning letters, and Dutch enforcement is expected in the second half of 2026. As of mid-2026 no confirmed EAA fine had been publicly verified, though authorities can also order product withdrawal and mandate audits.

### WCAG 3.0 is still years out

W3C published a [new Working Draft on 3 March 2026](https://www.w3.org/WAI/news/2026-03-03/wcag3). "Outcomes" are now **requirements** (174 of them), and the **bronze/silver/gold conformance model has been dropped** in favour of an approach still being revised. Candidate Recommendation is anticipated around Q4 2027; a final Recommendation not before 2028, and [WCAG 2 will stay current for several years after that](https://www.w3.org/WAI/standards-guidelines/wcag/wcag3-intro/).

WCAG 3's direction — task completion, severity, and cognitive factors over binary pass/fail — is already shaping how practitioners think. Read it for that. Do not set compliance targets against it.

### Automated-detectable failures are getting worse

The [2026 WebAIM Million](https://webaim.org/projects/million/) found **95.9%** of the top million home pages had detected WCAG 2 failures, up from 94.8% in 2025 — the first regression after six years of improvement. Average errors per page rose 10.1% to 56.1. Low contrast text alone now affects **83.9%** of home pages, up 4.8 points in a single year.

The six failures listed under [Common high-impact issues](#common-high-impact-issues) above account for 96% of everything detected. None of them require a redesign to fix.

## References

**Official Standards:**
- [WCAG 2.2 Specification](https://www.w3.org/TR/WCAG22/)
- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/) (filterable checklist)
- [WCAG 3.0 Introduction](https://www.w3.org/WAI/standards-guidelines/wcag/wcag3-intro/)

**Recent Updates:**
- [WCAG 2.2 Approved as ISO/IEC 40500:2025 — W3C WAI](https://www.w3.org/WAI/news/2025-10-21/wcag22-iso)
- [WCAG 3 Working Draft, March 2026 — W3C WAI](https://www.w3.org/WAI/news/2026-03-03/wcag3)
- [WCAG 2.1 Updated (May 2025) — W3C](https://www.w3.org/news/2025/web-content-accessibility-guidelines-wcag-2-1-updated/)
- [What We're Working On | WAI | W3C](https://www.w3.org/WAI/update/)

**Regulations (primary sources):**
- [ADA Title II web rule — ada.gov](https://www.ada.gov/resources/2024-03-08-web-rule/)
- [HHS OCR Section 504 deadline extension](https://www.hhs.gov/press-room/hhs-extends-mobile-and-web-accessibility-deadline.html)
- [Revised 508 Standards — US Access Board](https://www.access-board.gov/ict/)
- [European Accessibility Act — European Commission](https://ec.europa.eu/social/main.jsp?catId=1202)

**Practical Resources:**
- [WebAIM Million](https://webaim.org/projects/million/) (common failures data, updated annually)
- [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) — patterns for custom components
- [How to Meet WCAG (Quick Reference)](https://www.w3.org/WAI/WCAG22/quickref/) — filterable by level and technology

---

## See Also

- [Assistive Technologies](/accessibility/assistive-technologies/) — Screen readers, keyboard navigation
- [Testing & Audit Tools](/accessibility/testing-audit-tools/) — Automated and manual testing methods
- [Color Accessibility](/perception/vision/colour-accessibility/) — Designing for color vision deficiency
