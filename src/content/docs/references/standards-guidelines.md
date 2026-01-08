---
title: Standards & Guidelines
description: Key standards and platform guidelines referenced throughout this site.
---

This page provides a comprehensive reference to the standards, guidelines, and regulations that govern human-centered design, accessibility, and usability. These standards form the foundation for building interfaces that work for everyone.

---

## Standards Overview

### Accessibility Standards Matrix

| Standard | Jurisdiction | Scope | Current Version | WCAG Reference |
|----------|-------------|-------|-----------------|----------------|
| **WCAG** | International | Web content | 2.2 (Oct 2023) | — |
| **EN 301 549** | EU | All ICT | V3.2.1 (2021) | WCAG 2.1 AA |
| **Section 508** | US Federal | Federal ICT | Revised (2017) | WCAG 2.0 AA |
| **ADA** | US | Public accommodations | Title II (2024) | WCAG 2.1 AA |
| **EAA** | EU | Commercial ICT | Effective June 2025 | WCAG 2.1 AA |
| **AODA** | Ontario, CA | Organizations | 2021 | WCAG 2.0 AA |
| **CAN/ASC** | Canada | All ICT | EN 301 549:2024 | WCAG 2.1 AA |

### Human Factors Standards Matrix

| Standard | Focus | Key Parts |
|----------|-------|-----------|
| **ISO 9241** | Human-system interaction | 40+ parts on usability, accessibility, UX |
| **ISO 6385** | Work system design | Ergonomic principles |
| **ISO 11064** | Control room design | Display, layout, environment |
| **ISO 10075** | Mental workload | Cognitive demands, fatigue |
| **ISO 20282** | Ease of operation | Consumer products |

---

## Web Content Accessibility Guidelines (WCAG)

### WCAG Versions

| Version | Published | Success Criteria | Key Additions |
|---------|-----------|------------------|---------------|
| **WCAG 2.0** | Dec 2008 | 61 | Original foundation |
| **WCAG 2.1** | Jun 2018 | 78 (+17) | Mobile, cognitive, low vision |
| **WCAG 2.2** | Oct 2023 | 87 (+9) | Cognitive, motor, authentication |
| **WCAG 3.0** | In development | New structure | Broader scope, new testing |

### WCAG 2.2 New Success Criteria

| Criterion | Level | Focus |
|-----------|-------|-------|
| **2.4.11 Focus Not Obscured (Min)** | AA | Focus visible, not hidden |
| **2.4.12 Focus Not Obscured (Enhanced)** | AAA | Focus fully visible |
| **2.4.13 Focus Appearance** | AAA | Enhanced focus indicators |
| **2.5.7 Dragging Movements** | AA | Alternatives to drag-and-drop |
| **2.5.8 Target Size (Minimum)** | AA | 24×24px minimum targets |
| **3.2.6 Consistent Help** | A | Help in consistent location |
| **3.3.7 Redundant Entry** | A | Don't ask for same info twice |
| **3.3.8 Accessible Authentication (Min)** | AA | Auth without cognitive tests |
| **3.3.9 Accessible Authentication (Enhanced)** | AAA | No object recognition/personal content |

### WCAG Conformance Levels

| Level | Requirements | Typical Use |
|-------|-------------|-------------|
| **Level A** | 25 criteria | Bare minimum (not sufficient) |
| **Level AA** | +13 criteria | Legal standard, recommended baseline |
| **Level AAA** | +23 criteria | Enhanced accessibility (not required) |

**Note:** WCAG 2.2 is backwards compatible — conforming to 2.2 also means conforming to 2.1 and 2.0.

### WCAG Resources

- **Specification:** https://www.w3.org/TR/WCAG22/
- **Quick Reference (filterable):** https://www.w3.org/WAI/WCAG22/quickref/
- **Understanding Documents:** https://www.w3.org/WAI/WCAG22/Understanding/
- **Techniques:** https://www.w3.org/WAI/WCAG22/Techniques/
- [Our comprehensive WCAG guide →](/accessibility/wcag-guidelines/)

---

## European Standards

### EN 301 549

The European standard for accessibility requirements in ICT products and services.

| Version | Date | WCAG Alignment |
|---------|------|----------------|
| V1.1.2 | 2015 | WCAG 2.0 AA |
| V2.1.2 | 2018 | WCAG 2.1 AA |
| V3.1.1 | 2019 | WCAG 2.1 AA |
| V3.2.1 | 2021 | WCAG 2.1 AA (current) |
| **V4.1.1** | 2026 (planned) | **WCAG 2.2 AA** |

**Scope:** Hardware, software, websites, apps, documents, support services

**Key additions beyond WCAG:**
- Real-Time Text (RTT) requirements
- ICT with two-way voice communication
- Video communication with sign language
- Hardware accessibility (physical controls)

**Specification:** https://www.etsi.org/standards/search#page=1&search=EN%20301%20549

### European Accessibility Act (EAA)

The EU directive requiring accessibility for products and services.

**Effective:** June 28, 2025

**Scope:**
- E-commerce websites and mobile apps
- Banking services
- Transport services (ticketing, check-in)
- E-books and e-readers
- Communication services

**Penalties:** Up to €100,000 or 4% of annual revenue

**Technical Standard:** EN 301 549 (WCAG 2.1 AA)

---

## US Standards and Regulations

### Section 508

US federal accessibility requirements for ICT.

**Current Status:**
- References WCAG 2.0 Level AA (2017 refresh)
- Update to WCAG 2.2 expected by 2026
- Applies to federal agencies and contractors

**Enforcement:** US Access Board, Department of Justice

**Documentation:** VPAT (Voluntary Product Accessibility Template)

**Resources:**
- Section508.gov: https://www.section508.gov/
- Access Board: https://www.access-board.gov/

### Americans with Disabilities Act (ADA)

Civil rights law prohibiting discrimination based on disability.

**Title II (State/Local Government):**
- April 2024 DOJ rule update
- References WCAG 2.1 Level AA
- Applies to government websites and apps

**Title III (Public Accommodations):**
- Covers private businesses
- Courts reference WCAG 2.1 AA in settlements
- No explicit technical standard (yet)

**Litigation:** 4,605 federal lawsuits filed in 2024

---

## ISO 9241: Human-System Interaction

The comprehensive international standard for ergonomics of human-system interaction, comprising 40+ parts.

### Key Parts

| Part | Title | Latest Update |
|------|-------|---------------|
| **9241-11** | Usability: Definitions and concepts | 2018 |
| **9241-110** | Interaction principles | 2020 |
| **9241-112** | Information presentation | 2025 (draft) |
| **9241-115** | Interaction design | 2024 |
| **9241-125** | Recommendations for visual presentation | 2017 |
| **9241-129** | Software individualization | 2010 |
| **9241-143** | Forms | 2012 |
| **9241-151** | World Wide Web interfaces | 2008 |
| **9241-161** | Visual elements | 2016 |
| **9241-171** | Software accessibility | 2008 |
| **9241-210** | Human-centred design | 2019 |
| **9241-220** | HCD processes | 2019 |
| **9241-221** | Process assessment | 2023 |
| **9241-400** | Physical input devices — Principles | 2007 |
| **9241-920** | Tactile and haptic interactions | 2024 |

### Part 11: Usability (2018 Revision)

Defines usability as:
> "The extent to which a system, product or service can be used by specified users to achieve specified goals with effectiveness, efficiency, and satisfaction in a specified context of use."

**Key components:**
- **Effectiveness** — Accuracy and completeness of goal achievement
- **Efficiency** — Resources expended relative to results
- **Satisfaction** — Comfort and acceptability of use

**2018 updates:**
- Broadened scope from interfaces to entire system/service experience
- Added evaluation of negative consequences (health, safety, privacy)
- Enhanced definition of satisfaction (emotional and subjective aspects)
- Defines accessibility as "usability for people with the widest range of capabilities"

### Part 210: Human-Centred Design (2019 Revision)

Provides guidance on human-centered design processes throughout the product lifecycle.

**Key principles:**
1. Design is based on explicit understanding of users, tasks, and environments
2. Users are involved throughout design and development
3. Design is driven and refined by user-centered evaluation
4. Process is iterative
5. Design addresses the whole user experience
6. Design team includes multidisciplinary skills and perspectives

**2019 updates:**
- Incorporated agile and iterative design processes
- Replaced earlier ISO 13407 (1999)
- Added sustainability and accessibility considerations

### Part 110: Interaction Principles (2020)

Seven principles for interaction design:

| Principle | Description |
|-----------|-------------|
| **Suitability for the task** | Supports efficient task completion |
| **Self-descriptiveness** | Interactions and states are clear |
| **Conformity with expectations** | Consistent with user expectations |
| **Learnability** | Supports discovery and learning |
| **Controllability** | User can control interaction pace and sequence |
| **Use error robustness** | Prevents, tolerates, and recovers from errors |
| **User engagement** | Motivating and engaging experience |

### Part 115: Interaction Design (2024)

New part covering:
- Conceptual design
- User-system interaction
- User interface design
- Navigation design
- Audio user interfaces (alerts, speech recognition)
- Integration with AI-driven applications (voice assistants)

### Part 920: Tactile and Haptic Interactions (2024)

New part addressing:
- Touch interfaces
- Virtual reality haptics
- Multimodal feedback
- Tactile encodings for accessibility

**Specification access:** https://www.iso.org/series/604236

---

## Platform Design Guidelines

### Apple Human Interface Guidelines (HIG)

Design standards for Apple platforms.

| Platform | Focus |
|----------|-------|
| **iOS/iPadOS** | Touch interaction, gestures, navigation |
| **macOS** | Pointer interaction, menus, windows |
| **watchOS** | Glanceable, brief interactions |
| **tvOS** | Focus-based, remote interaction |
| **visionOS** | Spatial computing, eye/hand tracking |

**Key principles:**
- Clarity — Text is legible, icons are precise
- Deference — Content is prioritized over chrome
- Depth — Visual layers and motion aid understanding

**Accessibility requirements:**
- Dynamic Type support
- VoiceOver optimization
- Reduced Motion support
- Increased Contrast support

**URL:** https://developer.apple.com/design/human-interface-guidelines/

### Material Design 3 (Google)

Google's design system for Android and web.

**Key features:**
- **Dynamic Color** — Personalized color from user wallpaper
- **Adaptive components** — Responsive to screen size
- **Motion system** — Meaningful, focused animations
- **Typography scale** — Hierarchical type system

**Accessibility:**
- Minimum 4.5:1 contrast ratios
- 48×48dp minimum touch targets
- State indicators for interactive elements
- Focus management for keyboard users

**URL:** https://m3.material.io/

### Microsoft Fluent Design System

Microsoft's design language for Windows and web.

**Pillars:**
- **Light** — Illuminate focus and meaning
- **Depth** — Create hierarchy and relationships
- **Motion** — Connect experiences and actions
- **Material** — Ground experiences in reality
- **Scale** — Expand experiences seamlessly

**Accessibility:**
- High Contrast mode support
- Narrator optimization
- Keyboard navigation patterns
- Touch and pen support

**URL:** https://fluent2.microsoft.design/

---

## Usability Heuristics

### Nielsen's 10 Usability Heuristics

The most widely recognized usability principles, developed by Jakob Nielsen in 1994.

| # | Heuristic | Description |
|---|-----------|-------------|
| 1 | **Visibility of system status** | Keep users informed through feedback |
| 2 | **Match between system and real world** | Use familiar language and concepts |
| 3 | **User control and freedom** | Support undo, redo, and escape |
| 4 | **Consistency and standards** | Follow platform conventions |
| 5 | **Error prevention** | Prevent errors before they occur |
| 6 | **Recognition rather than recall** | Minimize memory load |
| 7 | **Flexibility and efficiency of use** | Support accelerators for experts |
| 8 | **Aesthetic and minimalist design** | Remove irrelevant information |
| 9 | **Help users recognize and recover** | Clear error messages with solutions |
| 10 | **Help and documentation** | Provide searchable, task-oriented help |

- **Original article:** https://www.nngroup.com/articles/ten-usability-heuristics/
- [Complete guide on this site →](/interaction-patterns/nielsen-heuristics/)

---

## Industry Resources

### Research and Guidance

| Organization | Focus | URL |
|--------------|-------|-----|
| **Nielsen Norman Group** | UX research, usability | https://www.nngroup.com/ |
| **W3C WAI** | Web accessibility | https://www.w3.org/WAI/ |
| **WebAIM** | Accessibility tools/training | https://webaim.org/ |
| **A11y Project** | Community accessibility | https://www.a11yproject.com/ |
| **Deque** | Accessibility tools/training | https://www.deque.com/ |
| **Baymard Institute** | E-commerce UX research | https://baymard.com/ |

### Accessibility Testing Tools

| Tool | Type | URL |
|------|------|-----|
| **axe DevTools** | Browser extension | https://www.deque.com/axe/ |
| **WAVE** | Browser extension | https://wave.webaim.org/ |
| **Lighthouse** | Chrome DevTools | Built into Chrome |
| **Pa11y** | CI/CD integration | https://pa11y.org/ |
| **NVDA** | Screen reader (Windows) | https://www.nvaccess.org/ |
| **VoiceOver** | Screen reader (macOS/iOS) | Built into Apple devices |

### Annual Reports

| Report | Publisher | Focus |
|--------|-----------|-------|
| **WebAIM Million** | WebAIM | Accessibility of top 1M sites |
| **State of Mobile UX** | Baymard | E-commerce mobile usability |
| **Accessibility Legal Landscape** | Seyfarth Shaw | ADA lawsuit trends |

---

## Recent Developments (2024-2025)

### WCAG 2.2 Adoption

WCAG 2.2 became a W3C Recommendation in October 2023. Key adoption milestones:
- ISO/IEC 40500:2025 approval (October 2025)
- EN 301 549 v4.1.1 (planned 2026) will reference WCAG 2.2 AA
- Courts increasingly citing WCAG 2.2 in litigation

### European Accessibility Act Enforcement

The EAA became legally applicable on June 28, 2025:
- E-commerce, banking, transport must comply
- Penalties up to €100,000 or 4% of revenue
- Technical standard: EN 301 549 / WCAG 2.1 AA

### US Regulatory Updates

- April 2024: DOJ published Title II final rule referencing WCAG 2.1 AA
- Section 508 update to WCAG 2.2 expected by 2026
- 4,605 ADA lawsuits filed in 2024 (steady high volume)

### ISO 9241 Evolution

Recent and upcoming parts:
- Part 115 (2024): Interaction design including AI/voice
- Part 920 (2024): Tactile and haptic interactions
- Part 112 (2025): Information presentation principles

### WCAG 3.0 Development

W3C continues developing WCAG 3.0 with:
- New testing approach (bronze/silver/gold)
- Broader scope (beyond web to all digital content)
- New success criteria structure
- Expected publication: TBD (multi-year effort)

---

## References

**WCAG:**
- [WCAG 2.2 Specification — W3C](https://www.w3.org/TR/WCAG22/)
- [WCAG 2 Overview — W3C WAI](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [WCAG 2.2 Complete Guide 2025 — AllAccessible](https://www.allaccessible.org/blog/wcag-22-complete-guide-2025)

**European:**
- [EN 301 549 — Wikipedia](https://en.wikipedia.org/wiki/EN_301_549)
- [EN 301 549 Conformance — WCAG.com](https://www.wcag.com/compliance/en-301-549/)
- [EN 301 549 — ETSI](https://www.etsi.org/standards/search#page=1&search=EN%20301%20549)

**US:**
- [Section508.gov](https://www.section508.gov/)
- [US Access Board — WCAG 2.2](https://www.access-board.gov/news/2023/11/27/w3c-wcag-2-2-now-available/)
- [VPAT 2.5 Guide — Accessibility.Works](https://www.accessibility.works/blog/vpat-25-wcag-ada-508-reporting/)

**ISO 9241:**
- [ISO 9241 — Wikipedia](https://en.wikipedia.org/wiki/ISO_9241)
- [ISO 9241-210:2019 — ISO](https://www.iso.org/standard/77520.html)
- [ISO 9241-11:2018 — ISO](https://www.iso.org/standard/63500.html)
- [What Is ISO 9241? — Alekvs](https://www.alekvs.com/what-is-iso-9241-a-complete-guide-to-hci-and-usability-standards/)
- [ISO 9241 Usability Standard — UserFocus](https://www.userfocus.co.uk/resources/iso9241/intro.html)

**Platform Guidelines:**
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Material Design 3](https://m3.material.io/)
- [Microsoft Fluent Design](https://fluent2.microsoft.design/)

---

## See Also

- [Key Principles & Laws](/human-overview/key-principles-and-laws/) — Foundational design principles
- [WCAG Guidelines](/accessibility/wcag-guidelines/) — Our detailed WCAG guide
- [Nielsen's 10 Usability Heuristics](/interaction-patterns/nielsen-heuristics/) — Complete breakdown
- [Accessibility Checklist](/checklists-playbooks/accessibility-checklist/) — Practical compliance checklist
- [Books & Further Reading](/references/books-further-reading/) — Recommended reading
