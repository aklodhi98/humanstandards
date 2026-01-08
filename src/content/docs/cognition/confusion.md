---
title: Confusion
description: Understanding what causes confusion in digital interfaces and how to design for clarity
---

Confusion is one of the most critical usability problems in digital interfaces. When users feel confused, they hesitate, make errors, abandon tasks, and lose trust in the system. **Confusion is the opposite of clarity** — it represents a breakdown in understanding between user intent and system response.

## What is confusion?

From a cognitive psychology perspective, confusion occurs when individuals encounter **cognitive disequilibrium** — a mismatch between what they know and the information they encounter. The brain is unable to effectively organize or interpret incoming information, leading to uncertainty, hesitation, and errors.

Confusion has been defined as "the affective experience that occurs around experiences of cognitive disequilibrium or cognitive dissonance, where individuals encounter incongruence with their current knowledge."

## The gulfs of execution and evaluation

Don Norman's seminal framework identifies two primary sources of confusion in interaction design:

### Gulf of Execution

**The difference between user intentions and what the system allows them to do.**

When users can't figure out how to perform their intended action, they experience confusion about:
- What actions are possible
- How to initiate those actions
- Which controls to use
- What will happen when they act

**Example:** A user wants to export a report but can't find an export button. They check menus, right-click, look for icons — nothing matches their mental model of "exporting." The gulf between their intention and the system's affordances creates confusion.

### Gulf of Evaluation

**The difficulty of assessing what happened after taking an action.**

When users can't interpret the system's state or feedback, they experience confusion about:
- Did my action succeed?
- What changed?
- Why did that happen?
- What should I do next?

**Example:** A user clicks "Submit" on a form. The page refreshes but shows the same form again with no message. Did it work? Did it fail? Should they submit again? The gulf between the system's state and the user's understanding creates confusion.

**Critical insight:** If something has both a large Gulf of Execution AND a large Gulf of Evaluation, it becomes virtually unbearable to users.

## Three types of confusion

Research identifies three major categories of confusion in user interfaces:

### 1. Ambiguity confusion

**Cause:** Incomplete, unclear, or misleading information

Users lack the necessary information to make sense of a situation or make informed decisions.

**Examples:**
- Button labels like "OK" or "Submit" that don't clarify what will happen
- Error messages that say "Error 422" without explaining what went wrong
- Ambiguous icons without labels (is that a share icon or a network icon?)
- Vague microcopy: "Processing..." (processing what? for how long?)

**Design solution:** Provide clear, specific, unambiguous information at every decision point.

### 2. Overload confusion

**Cause:** Too much information or too many choices at once

Users encounter contradictory information, complex layouts, or overwhelming stimuli that exceed working memory capacity (7±2 items).

**Examples:**
- Forms with 20+ fields on a single screen
- Dashboards with dozens of metrics and no visual hierarchy
- Navigation menus with 30+ options
- Onboarding flows that explain everything at once

**Design solution:** Progressive disclosure, chunking, visual hierarchy, and prioritization.

### 3. Similarity confusion

**Cause:** Elements that look too similar or behave inconsistently

Users can't distinguish between options or predict behavior based on visual cues.

**Examples:**
- Multiple blue buttons that all look primary but have different importance
- Tabs that look like buttons, or buttons that look like tabs
- Inconsistent terminology ("Delete" in one place, "Remove" elsewhere, "Discard" in another)
- Interface layouts with too little visual distinction between sections

**Design solution:** Consistent visual language, clear affordances, distinct styling for different element types.

## What causes confusion: A deeper look

### Cognitive mismatch

**The system's conceptual model doesn't match the user's mental model.**

- Users expect a "Save" button but the app auto-saves
- Users think they're editing a draft but they're editing the live version
- Users expect linear workflows but the app allows non-linear jumping

### Insufficient feedback

**The system doesn't communicate its state clearly.**

- No loading indicators (is it working or frozen?)
- No confirmation messages (did that delete?)
- No error prevention (why won't it let me submit?)
- Vague progress indicators (21% complete — of what?)

### Inconsistency

**The system behaves differently in similar contexts.**

- Keyboard shortcuts that work in one screen but not another
- Buttons positioned differently across pages
- Different error handling patterns for similar failures
- Terminology that varies ("Sign in" vs "Log in" vs "Enter")

### Complexity without structure

**Information is not organized in a way that matches human cognitive patterns.**

- No visual hierarchy or grouping
- Related items scattered across the interface
- Critical information buried in noise
- No clear entry points or paths

### Hidden affordances

**Users can't tell what's interactive or what actions are available.**

- Links that don't look like links
- Buttons that look like labels
- Drag-and-drop without visual cues
- Gesture-based controls with no hints

## Measuring confusion

### Behavioral indicators

- **High error rates** — Users make mistakes repeatedly
- **Increased task time** — Users hesitate, backtrack, retry
- **Abandonment** — Users give up before completing tasks
- **Support requests** — "How do I...?" questions spike
- **Redundant actions** — Users click the same button multiple times

### Self-reported indicators

- User testing quotes: "I don't understand what this means"
- Survey responses indicating frustration or uncertainty
- Low confidence ratings after completing tasks
- Net Promoter Score (NPS) declines

### Analytics indicators

- High bounce rates on key pages
- Low conversion rates in funnels
- Rage clicks (repeated clicking in frustration)
- Form field abandonment
- Session recordings showing hesitation and backtracking

## Designing for clarity: Eliminating confusion

### 1. Bridge the Gulf of Execution

**Make actions discoverable and predictable.**

- Use clear, action-oriented labels ("Export as PDF" not "Export")
- Show all available actions upfront (progressive disclosure for advanced options)
- Use standard UI patterns and conventions
- Provide visual affordances (buttons look clickable, links are underlined)
- Include helpful hints near complex controls

### 2. Bridge the Gulf of Evaluation

**Make system state and feedback crystal clear.**

- Confirm every significant action with clear feedback
- Show progress indicators for operations longer than 1 second
- Use specific, actionable error messages
- Highlight what changed after user actions
- Make system status visible (saving, saved, error, offline)

### 3. Reduce ambiguity

**Be specific, not vague.**

- Replace "OK" with "Delete account" or "Cancel subscription"
- Replace "Error" with "Email address is invalid"
- Replace "Loading..." with "Loading your documents..."
- Replace generic icons with labeled icons
- Use plain language, not jargon

### 4. Manage cognitive load

**Present information in digestible chunks.**

- Group related items together (proximity principle)
- Use progressive disclosure (show basics, hide advanced)
- Limit choices to 5-7 options when possible
- Create clear visual hierarchy (size, color, weight, spacing)
- Remove unnecessary elements

### 5. Maintain consistency

**Build a coherent system, not a collection of screens.**

- Use a design system with reusable components
- Standardize terminology across the product
- Keep navigation consistent across pages
- Apply interaction patterns uniformly
- Document conventions and enforce them

### 6. Provide context

**Help users understand where they are and what they're doing.**

- Show breadcrumbs for deep navigation
- Highlight the current page/section
- Include descriptive page titles
- Add helper text near complex fields
- Provide examples of valid input

### 7. Design for recoverability

**When confusion occurs, help users recover gracefully.**

- Allow undo for destructive actions
- Provide clear "back" or "cancel" options
- Save progress automatically
- Offer contextual help
- Link to support resources inline

## Real-world impact

### Case Study: Interface Consistency and Cognitive Load

Research from 2025 found that interface layouts with **too little visual similarity cause confusion during task switching**, increasing cognitive load and negatively impacting performance. Moderate similarity provides consistent visual cues that reduce confusion.

**Takeaway:** Consistency isn't boring — it's cognitively efficient.

### Case Study: Cognitive Overload and Abandonment

Studies show that **high cognitive load creates confusion and frustration**, which decreases system efficiency and increases abandonment rates. Users experiencing confusion are significantly more likely to stop using the application.

**Takeaway:** Confusion directly impacts retention and adoption.

### Case Study: Color and Visual Consistency

Appropriate use of correlated colors within interfaces **reduces visual confusion and fatigue**, maintains visual consistency, and highlights key information more effectively.

**Takeaway:** Visual design isn't cosmetic — it's functional.

## Confusion in practice: Common patterns

### Pattern 1: Modal dialog confusion

**Problem:** User clicks "Delete" → Modal appears asking "Are you sure?" with buttons "OK" and "Cancel"

**Why it's confusing:**
- Does "OK" mean "OK, delete it" or "OK, I understand"?
- Modal interrupts the user's flow without clear next steps

**Better approach:**
- Label buttons specifically: "Delete permanently" and "Keep it"
- Explain consequences: "This will delete 3 items and cannot be undone"

### Pattern 2: Form validation confusion

**Problem:** User submits form → Page refreshes → Red text appears somewhere

**Why it's confusing:**
- User doesn't know which field caused the error
- Error message is generic: "Invalid input"
- No guidance on how to fix it

**Better approach:**
- Validate inline as user types
- Show specific errors next to each field
- Provide examples of valid input
- Preserve filled fields after error

### Pattern 3: Navigation confusion

**Problem:** App has 5 different menu types (top nav, side nav, bottom nav, hamburger menu, context menu)

**Why it's confusing:**
- Users don't know where to find things
- Related actions are scattered
- No clear hierarchy

**Better approach:**
- Consolidate to 1-2 navigation patterns
- Group related actions together
- Use consistent placement across screens

## Key principles to prevent confusion

1. **Clarity over cleverness** — Don't sacrifice understandability for novelty
2. **Consistency over customization** — Standardize patterns across your product
3. **Feedback over silence** — Always tell users what happened and what's next
4. **Simplicity over completeness** — Show what's essential, hide what's not
5. **Guidance over assumption** — Don't assume users know your system

## Checklist: Confusion audit

Use this checklist to evaluate any interface:

- [ ] Can users figure out what actions are available? (Gulf of Execution)
- [ ] Can users figure out what happened after acting? (Gulf of Evaluation)
- [ ] Are labels specific and action-oriented?
- [ ] Is there clear visual hierarchy?
- [ ] Are interactive elements obviously clickable?
- [ ] Is feedback immediate and specific?
- [ ] Are error messages actionable?
- [ ] Is terminology consistent throughout?
- [ ] Are there fewer than 7 options at key decision points?
- [ ] Do similar elements look/behave similarly?
- [ ] Is the current location/state clear?
- [ ] Can users easily undo mistakes?

If you answered "no" to any of these, you likely have confusion issues to address.

## Academic foundations

Confusion research draws from multiple disciplines:

**Cognitive Psychology:**
- Working memory limitations (Miller's 7±2)
- Cognitive load theory (Sweller)
- Mental models (Johnson-Laird)

**Human-Computer Interaction:**
- Gulfs of Execution and Evaluation (Norman, Hutchins, Hollan)
- Usability heuristics (Nielsen)
- Fitts's Law and interaction design

**Information Architecture:**
- Progressive disclosure (Lidwell, Holden, Butler)
- Visual hierarchy principles
- Consistency and standards (ISO 9241)

## References

**Foundational Work:**
- Norman, D. A. (1988). *The Design of Everyday Things*. Basic Books. — Introduced Gulfs of Execution and Evaluation
- [The Two UX Gulfs: Evaluation and Execution](https://www.nngroup.com/articles/two-ux-gulfs-evaluation-execution/) — Nielsen Norman Group

**Recent Research:**
- [The influence of interface attributes and interaction elements on user performance and cognitive load](https://www.sciencedirect.com/science/article/abs/pii/S0169814125000678) — 2025 study on interface consistency and confusion
- [Psychological Foundations for Effective Human–Computer Interaction in Education](https://www.mdpi.com/2076-3417/15/6/3194) — 2025 research on cognitive load and confusion
- [A Comprehensive Exploration of Ambiguity and its effect on User Experience Design](https://www.researchgate.net/publication/380255062_A_Comprehensive_Exploration_of_Ambiguity_and_its_effect_on_User_Experience_Design) — Research on ambiguity confusion
- [Consumer Confusion on Cognitive Dissonance: A Conceptual Framework](https://journals.sagepub.com/doi/10.1177/09711023241260519) — 2024 research on confusion types
- [Understanding Difficulties and Resulting Confusion in Learning: An Integrative Review](https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2018.00049/full) — Cognitive disequilibrium and confusion

**Practical Resources:**
- [Gulf of Evaluation and Gulf of Execution | The Glossary of HCI](https://www.interaction-design.org/literature/book/the-glossary-of-human-computer-interaction/gulf-of-evaluation-and-gulf-of-execution)
- [Reducing cognitive overload in UX design](https://fullclarity.co.uk/insights/cognitive-overload-in-ux-design/)

---

## See Also

- [Cognitive Load](/cognition/cognitive-load/) — Understanding mental processing limits
- [Working Memory](/cognition/working-memory/) — Why we can only hold 7±2 items
- [Attention & Focus](/cognition/attention-focus/) — Directing user attention effectively
- [Error Types](/decision-making-errors/error-types/) — How confusion leads to mistakes
- [Interaction Patterns](/interaction-patterns/nielsen-heuristics/) — Consistent patterns that reduce confusion
