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
| **ADA Title II** | US state/local govt | Web + mobile apps | DOJ final rule (2024) | WCAG 2.1 AA |
| **Section 504** | US HHS-funded | Web + mobile apps | HHS final rule (2024) | WCAG 2.1 AA |
| **EAA** | EU | Commercial ICT | Applicable June 2025 | WCAG 2.1 AA |
| **AODA** | Ontario, CA | Organizations | 2021 | WCAG 2.0 AA |
| **CAN/ASC** | Canada | All ICT | EN 301 549:2024 | WCAG 2.1 AA |

:::caution[Two US deadlines moved in 2026]
Both major US digital accessibility deadlines were extended by one year during 2026. DOJ extended ADA Title II on **17 April 2026**; HHS extended Section 504 on **7 May 2026**, four days before it would have taken effect. The WCAG 2.1 AA technical requirement did not change in either case — only the dates. See [US Standards and Regulations](#us-standards-and-regulations) below.
:::

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
| V3.2.1 | 2021 | WCAG 2.1 AA (**still the harmonised standard**) |
| V4.1.0 | June 2026 | WCAG 2.2 AA (final draft) |
| **V4.1.1** | Expected late 2026 | **WCAG 2.2 AA** |

**Status as of August 2026:** V3.2.1 remains the version cited in the Official Journal of the EU, so WCAG 2.1 AA is still the operative legal requirement. ETSI published the final draft [V4.1.0 in June 2026](https://www.etsi.org/deliver/etsi_en/301500_301599/301549/04.01.00_30/en_301549v040100va.pdf); V4.1.1 is expected to be cited in the Official Journal around October 2026, at which point conformance creates a presumption of conformity with the EAA. Plan for WCAG 2.2 AA now, but note that 2.1 AA is what is currently enforceable.

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

**Technical Standard:** EN 301 549 V3.2.1 (WCAG 2.1 AA)

**Penalties:** Set by each member state, not by the directive. Reported maximums range from roughly €60,000 (Ireland) to about €900,000 (Sweden). France sets €50,000 for a first offence, rising to €250,000 for repeat violations; Germany sets up to €100,000.

**Enforcement in practice (first year):** All 27 member states have transposed the directive, but enforcement has been uneven. France moved first — in November 2025 the DGCCRF issued formal enforcement notices to four major retailers (Auchan, Carrefour, E.Leclerc, Picard) after inspections found systematic e-commerce accessibility failures. German e-commerce operators began receiving law-firm warning letters shortly after transposition. Active Dutch enforcement is expected in the second half of 2026. As of mid-2026 no confirmed EAA fine had been publicly verified — but authorities can also order product withdrawal, mandate audits, and publish non-compliance, which several have signalled they will use before reaching for fines.

---

## US Standards and Regulations

### Section 508

US federal accessibility requirements for ICT.

**Current Status:**
- Still references **WCAG 2.0 Level AA**, unchanged since the 2017 refresh
- **No rulemaking to adopt WCAG 2.1 or 2.2 has been announced by the US Access Board.** Commentary predicting a 2.2 update by 2026 did not materialise — treat any such claim with suspicion and check [access-board.gov/ict](https://www.access-board.gov/ict/) directly
- Applies to federal agencies and contractors

This leaves US federal procurement one full WCAG generation behind state and local government, which the DOJ moved to WCAG 2.1 AA. In practice most federal agencies and vendors target 2.1 AA or 2.2 AA anyway, because VPATs are increasingly requested against the newer versions.

**Enforcement:** US Access Board, Department of Justice

**Documentation:** VPAT (Voluntary Product Accessibility Template)

**Resources:**
- Section508.gov: https://www.section508.gov/
- Access Board: https://www.access-board.gov/

### Americans with Disabilities Act (ADA)

Civil rights law prohibiting discrimination based on disability.

**Title II (State/Local Government):**
- April 2024 DOJ final rule
- References **WCAG 2.1 Level AA** (not 2.2 — a common misreading)
- Applies to government websites, mobile apps, and content provided by private contractors on a public entity's behalf

**Compliance deadlines — extended one year in April 2026:**

| Entity size | Original deadline | Current deadline |
|-------------|-------------------|------------------|
| Population ≥ 50,000 | 24 April 2026 | **26 April 2027** |
| Population < 50,000, and special district governments | 24 April 2027 | **26 April 2028** |

The DOJ announced the extension on 17 April 2026, a week before the first deadline would have hit. The technical standard and the scope of covered content were not changed.

**Title III (Public Accommodations):**
- Covers private businesses
- Courts reference WCAG 2.1 AA in settlements
- No explicit technical standard (yet)

**Litigation:** Seyfarth Shaw counted **3,117 federal website accessibility lawsuits in 2025**, up 27% from 2,452 in 2024 — 36% of all 8,667 federal ADA Title III filings that year, against 28% in 2024. Filings concentrate heavily: New York (1,021), Florida (961, roughly double its 470 in 2024), and Illinois (585). California recorded just 4, reflecting state court rulings that online-only businesses fall outside ADA coverage. Including state courts, combined annual filings exceed 5,000, and roughly 46% of federal cases involve repeat defendants.

### Section 504 of the Rehabilitation Act (HHS)

Often missed alongside Title II: HHS's 2024 final rule extends digital accessibility duties to **any organisation receiving HHS federal financial assistance** — hospitals, health systems, health plans, community health centres, clinical research institutions, and digital health companies.

**Requirement:** WCAG 2.1 Level AA across websites, mobile apps, patient portals, and kiosks.

| Recipient size | Original deadline | Current deadline |
|----------------|-------------------|------------------|
| 15 or more employees | 11 May 2026 | **11 May 2027** |
| Fewer than 15 employees | 10 May 2027 | **10 May 2028** |

HHS's Office for Civil Rights published an interim final rule on **7 May 2026** — four days before the original deadline — extending both dates by a year, citing the number of community health centres and hospitals that would not have made it.

**Resource:** [HHS OCR announcement](https://www.hhs.gov/press-room/hhs-extends-mobile-and-web-accessibility-deadline.html)

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

## Recent Developments (2025–2026)

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

- **April 2024:** DOJ published the Title II final rule referencing WCAG 2.1 AA
- **17 April 2026:** DOJ extended both Title II deadlines by a year (now April 2027 / April 2028)
- **7 May 2026:** HHS extended both Section 504 deadlines by a year (now May 2027 / May 2028)
- **Section 508 remains on WCAG 2.0 AA** with no announced rulemaking
- **3,117 federal website accessibility lawsuits in 2025**, up 27% year over year (Seyfarth Shaw)

The pattern worth noting: the technical bar has not moved, but the enforcement calendar slipped a full year on both federal tracks within three weeks of each other. Teams that paced remediation to the original dates now have breathing room; teams that had not started are in the same position they were, one year later.

### ISO 9241 Evolution

Recent and upcoming parts:
- Part 115 (2024): Interaction design including AI/voice
- Part 920 (2024): Tactile and haptic interactions
- Part 112 (2025): Information presentation principles

### WCAG 3.0 Development

W3C published a new [WCAG 3 Working Draft on 3 March 2026](https://www.w3.org/WAI/news/2026-03-03/wcag3). What changed:

- **Terminology:** "outcomes" are now **requirements** (the draft describes 174 of them), and "Foundational Requirements" became **Core Requirements**
- **Conformance:** the earlier **bronze/silver/gold** scoring model is no longer part of the draft. The working group is revising the model toward something more flexible for organisations rather than a single pass/fail score
- **Maturity labels:** individual guidelines and requirements now carry a maturity level — Placeholder, Exploratory, Developing, Refining, or Mature — so readers can see which parts are stable
- **Scope:** broader than web content alone

**Timeline:** a Candidate Recommendation is anticipated around Q4 2027, with a final Recommendation not before 2028. W3C has stated WCAG 2 will remain current for at least several years after WCAG 3 is finalised.

:::note[Do not build a compliance programme against WCAG 3 yet]
Requirement counts, names, and the conformance model can all still change. **WCAG 2.2 AA is the standard to design and test against today.** Read WCAG 3 to see where thinking is heading — particularly its emphasis on task completion and severity over binary criteria — not to set targets.
:::

### The Web Is Getting Less Accessible, Not More

The [2026 WebAIM Million](https://webaim.org/projects/million/) (February 2026 data) reversed six consecutive years of gradual improvement:

| Measure | 2025 | 2026 |
|---------|------|------|
| Home pages with detected WCAG 2 failures | 94.8% | **95.9%** |
| Average detected errors per page | 51 | **56.1** (+10.1%) |

The six most common failures, unchanged in rank for years, still account for **96% of all detected errors**:

| Failure | 2025 | 2026 | Change |
|---------|------|------|--------|
| Low contrast text | 79.1% | **83.9%** | ↑ 4.8 |
| Missing alternative text | 55.5% | 53.1% | ↓ 2.4 |
| Missing form input labels | 48.2% | **51.0%** | ↑ 2.8 |
| Empty links | 45.4% | 46.3% | ↑ 0.9 |
| Empty buttons | 29.6% | 30.6% | ↑ 1.0 |
| Missing document language | 15.8% | 13.5% | ↓ 2.3 |

These are all detectable by automated tooling in seconds and fixable without redesign. See [Testing & Audit Tools](/accessibility/testing-audit-tools/).

### AI Transparency Enters the Picture

The EU AI Act's **Article 50 transparency obligations became applicable on 2 August 2026**, and they are interface requirements as much as legal ones:

- People must be clearly informed when they are interacting with an AI system (chatbots, virtual assistants) unless it is obvious from context
- Synthetic audio, image, video, and text — including deepfakes — must be marked in a machine-readable, detectable format
- Deployers must disclose deepfakes depicting real people, places, or events

These apply to *any* AI system in those situations, not only high-risk ones. Separately, obligations for standalone high-risk systems (Annex III) were deferred from August 2026 to **2 December 2027**, and product-embedded high-risk systems (Annex I) to **2 August 2028**.

For designers this lands squarely in disclosure and labelling patterns — see [Trust & Perception](/emotions-motivation/trust-perception/) and [Notifications & Feedback](/interaction-patterns/notifications-feedback/).

---

## References

**WCAG:**
- [WCAG 2.2 Specification — W3C](https://www.w3.org/TR/WCAG22/)
- [WCAG 2 Overview — W3C WAI](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [WCAG 3 Introduction — W3C WAI](https://www.w3.org/WAI/standards-guidelines/wcag/wcag3-intro/) — status, maturity levels, timeline
- [WCAG 3 Working Draft, March 2026 — W3C WAI](https://www.w3.org/WAI/news/2026-03-03/wcag3)

**European:**
- [EN 301 549 V4.1.0 final draft (June 2026) — ETSI](https://www.etsi.org/deliver/etsi_en/301500_301599/301549/04.01.00_30/en_301549v040100va.pdf) — the actual PDF
- [EN 301 549 — ETSI standards search](https://www.etsi.org/standards/search#page=1&search=EN%20301%20549)
- [European Accessibility Act — European Commission](https://ec.europa.eu/social/main.jsp?catId=1202)
- [EU AI Act Article 50 transparency rules](https://artificialintelligenceact.eu/transparency-rules-article-50/)

**US:**
- [Section508.gov](https://www.section508.gov/)
- [US Access Board — Revised 508 Standards](https://www.access-board.gov/ict/) — authoritative on which WCAG version actually applies
- [ADA Title II web rule — ada.gov](https://www.ada.gov/resources/2024-03-08-web-rule/)
- [HHS OCR Section 504 deadline extension](https://www.hhs.gov/press-room/hhs-extends-mobile-and-web-accessibility-deadline.html)
- [Seyfarth Shaw ADA Title III litigation tracking](https://www.adatitleiii.com/) — the standard source for US filing counts

**Data and trends:**
- [The WebAIM Million](https://webaim.org/projects/million/) — annual accessibility analysis of the top 1M home pages

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
