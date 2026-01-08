---
title: Key Principles & Laws
description: Foundational principles, laws, and patterns from human factors research that inform interface design across all domains.
---

This page provides a high-level overview of the key principles covered across Human Standards. Each principle links to detailed documentation with implementation guidance, code examples, and MCP validation rules.

## Core Design Laws

### Fitts's Law
**Target acquisition time increases with distance and decreases with size.**

**Implications:**
- Make frequently-used controls large and easy to reach
- Place related controls close together
- Use screen edges and corners (infinite width/height)
- Touch targets: minimum 44×44pt (iOS), 48×48dp (Android)

**See:** [Targets & Spacing](/ergonomics/targets-spacing/) • [Examples: Accessibility - BBC](/examples/accessibility-bbc-keyboard/)

**References:**
- Fitts (1954) — The information capacity of the human motor system: https://doi.org/10.1037/h0055392

---

### Hick's Law
**Decision time increases logarithmically with the number of choices.**

**Implications:**
- Reduce options to essential choices (5-7 maximum)
- Group related choices into categories
- Use progressive disclosure for advanced options
- Provide smart defaults to eliminate decisions

**See:** [Cognitive Load](/cognition/cognitive-load/) • [Examples: Smart Defaults - iOS Camera](/examples/smart-defaults-ios-camera/)

**References:**
- Hick (1952) — On the rate of gain of information: https://doi.org/10.1113/jphysiol.1952.sp004764

---

### Miller's Law (Revised)
**Working memory holds 3-4 chunks of novel information.**

Modern research has revised Miller's original "7±2" down to **3-4 chunks** for novel information. Information decays within 15-30 seconds without rehearsal.

**Implications:**
- Chunk related information into meaningful groups
- Show context persistently (don't make users remember across screens)
- Use recognition over recall (dropdown vs. text input)
- Externalize memory through auto-save, undo, history

**See:** [Working Memory](/cognition/working-memory/) • [Examples: Progressive Disclosure - TurboTax](/examples/progressive-disclosure-turbotax/)

**References:**
- Cowan (2001) — The magical number 4: https://doi.org/10.1016/S1364-6613(00)01591-6
- Baddeley (2012) — Working Memory: Theories, Models, and Controversies: https://doi.org/10.1146/annurev-psych-120710-100422

---

### Jakob's Law
**Users prefer interfaces that work like ones they already know.**

Users spend most of their time on *other* websites/apps. Your interface should leverage established conventions, not reinvent interaction patterns.

**Implications:**
- Follow platform conventions (iOS HIG, Material Design)
- Use standard UI patterns (hamburger menu, tab navigation)
- Place common elements in expected locations (logo top-left, search top-right)
- Only deviate from convention when there's measurable benefit

**See:** [Consistency Patterns](/interaction-patterns/navigation/) • [Platform Standards](/references/standards-guidelines/)

**References:**
- NN/g — Jakob's Law: https://www.nngroup.com/articles/jakobs-law/

---

### Signal Detection Theory
**Balance sensitivity vs. specificity when detecting user intent.**

Every detection system has trade-offs between **hits** (correct positives) and **false alarms** (incorrect positives). Tune thresholds based on consequences.

**Implications:**
- Spam filters: Prefer false negatives (missed spam) over false positives (lost email)
- Fraud detection: Prefer false positives (flag legitimate) over false negatives (miss fraud)
- Autocorrect: Provide clear undo for false corrections
- Search: Show near-matches, let users refine

**See:** [Error Types](/decision-making-errors/error-types/) • [Defensive Design](/decision-making-errors/defensive-design/)

**References:**
- Green & Swets (1966) — Signal Detection Theory and Psychophysics: https://doi.org/10.1002/bs.3830110107

---

## Cognitive Principles

### Cognitive Load Theory
**Mental effort has three types: intrinsic, extraneous, and germane.**

- **Intrinsic load**: Inherent complexity of the task (can't eliminate)
- **Extraneous load**: Unnecessary complexity from poor design (reduce this!)
- **Germane load**: Effort that helps learning (optimize this)

**Key Patterns:**
- Progressive disclosure (hide complexity until needed)
- Chunking (break into digestible pieces)
- Consistency (same patterns = less learning)
- Visual clarity (whitespace, hierarchy, grouping)

**See:** [Cognitive Load](/cognition/cognitive-load/) • [Examples: Progressive Disclosure - TurboTax](/examples/progressive-disclosure-turbotax/)

**References:**
- Sweller (1988) — Cognitive load during problem solving: https://doi.org/10.1016/0959-4752(88)90004-4

---

### Recognition Over Recall
**Recognizing is easier than remembering from scratch.**

**Implications:**
- Use dropdowns instead of text fields for known options
- Show recently used items prominently
- Provide autocomplete and suggestions
- Display persistent context (current filters, selected items)

**See:** [Working Memory](/cognition/working-memory/) • [Forms Best Practices](/interaction-patterns/forms/)

---

### Attention & Focus
**Humans can only focus on one thing at a time (selective attention).**

**Implications:**
- One primary action per screen
- Minimize distractions during critical flows
- Use visual hierarchy to guide attention
- Avoid auto-playing videos, animations, popups

**See:** [Attention & Focus](/cognition/attention-focus/) • [Notifications & Feedback](/interaction-patterns/notifications-feedback/)

---

## Perception Principles

### Gestalt Principles
**The brain organizes visual elements into groups based on proximity, similarity, closure, and continuity.**

**Key Patterns:**
- **Proximity**: Group related items by placing them close together
- **Similarity**: Use consistent styling for similar elements
- **Closure**: Users fill in gaps (incomplete shapes feel complete)
- **Common Fate**: Elements moving together are perceived as a group

**See:** [Visual Design Patterns](/perception/vision/)

---

### Color & Contrast
**Color vision varies widely; contrast is critical for legibility.**

**Implications:**
- Don't rely on color alone (use text + icons + patterns)
- WCAG AA: 4.5:1 contrast for normal text, 3:1 for large text
- WCAG AAA: 7:1 contrast for enhanced accessibility
- Test for colorblindness (8% of males, 0.5% of females)

**See:** [Color & Accessibility](/perception/vision/colour-accessibility/) • [WCAG Guidelines](/accessibility/wcag-guidelines/)

**References:**
- WCAG 2.2 — Use of Color 1.4.1; Contrast SCs: https://www.w3.org/TR/WCAG22/

---

### Legibility & Readability
**Text must be perceivable and comprehensible.**

**Implications:**
- Minimum 16px font size for body text
- Line height: 1.5× font size for body text
- Line length: 45-75 characters for optimal reading
- Avoid all caps for long text (harder to read)
- Use sufficient whitespace for breathing room

**See:** [Legibility & Contrast](/perception/vision/legibility-contrast/)

---

## Decision-Making & Error Prevention

### Defensive Design
**Assume users will make mistakes; design for error prevention and recovery.**

**Key Patterns:**
- **Undo culture**: Allow reversal of actions (Gmail Undo Send)
- **Autosave**: Don't lose user work (Google Docs)
- **Confirmation dialogs**: For destructive/irreversible actions
- **Specific error messages**: "Password must include 1 number" not "Invalid"
- **Preview before commit**: Show consequences before action

**See:** [Defensive Design](/decision-making-errors/defensive-design/) • [Examples: Gmail Undo Send](/examples/defensive-design-gmail-undo/)

---

### Cognitive Biases
**Humans use mental shortcuts (heuristics) that lead to predictable errors.**

**Common Biases:**
- **Anchoring**: First number sets expectations
- **Status quo bias**: Prefer keeping things as-is
- **Scarcity effect**: "Only 2 left!" creates urgency
- **Framing effect**: Wording changes decisions ("90% fat-free" vs. "10% fat")
- **Confirmation bias**: Seek information that confirms existing beliefs

**Mitigations:**
- Transparent defaults with easy opt-out
- Clear comparisons (side-by-side)
- Cooling-off periods for high-stakes decisions
- Neutral framing of choices

**See:** [Biases & Heuristics](/decision-making-errors/biases-heuristics/) • [Error Types](/decision-making-errors/error-types/)

**References:**
- Kahneman — Thinking, Fast and Slow: https://www.penguinrandomhouse.com/books/21410/thinking-fast-and-slow-by-daniel-kahneman/
- Thaler & Sunstein — Nudge: https://www.penguinrandomhouse.com/books/144533/nudge-the-final-edition-by-richard-h-thaler-and-cass-r-sunstein/

---

## Accessibility Principles (WCAG POUR)

### Perceivable
**Users must be able to perceive content through at least one sense.**

- Text alternatives for images (`alt` text)
- Captions for video, transcripts for audio
- Don't rely on color alone
- Sufficient contrast (4.5:1 minimum)
- Text resizable to 200% without breaking

**See:** [WCAG Guidelines](/accessibility/wcag-guidelines/) • [Accessibility Testing](/accessibility/testing-audit-tools/)

---

### Operable
**Users must be able to operate the interface.**

- Keyboard accessible (no mouse-only interactions)
- Visible focus indicators (3:1 contrast)
- Skip links to bypass repetitive navigation
- No flashing content (>3 times/second = seizure risk)
- Touch targets ≥44×44px (WCAG 2.2)

**See:** [WCAG Guidelines](/accessibility/wcag-guidelines/) • [Examples: BBC Keyboard Navigation](/examples/accessibility-bbc-keyboard/)

---

### Understandable
**Users must understand content and how to use the interface.**

- Clear, simple language
- Consistent navigation across pages
- Clear error messages with solutions
- Form fields with visible labels

**See:** [WCAG Guidelines](/accessibility/wcag-guidelines/) • [Forms](/interaction-patterns/forms/)

---

### Robust
**Content must work across different technologies and assistive devices.**

- Valid, semantic HTML
- Proper ARIA roles, names, states
- Test with screen readers (NVDA, JAWS, VoiceOver)

**See:** [WCAG Guidelines](/accessibility/wcag-guidelines/) • [Assistive Technologies](/accessibility/assistive-technologies/)

---

## Feedback & System Status

### Visibility of System Status
**Keep users informed about what's happening through timely feedback.**

**Feedback Timing:**
- **<0.1s**: Instant (button press, typing)
- **0.1-1s**: Fast operations (loading indicator + success toast)
- **1-3s**: Medium operations (progress indicator)
- **3-10s**: Slow operations (progress bar with %)
- **>10s**: Background task + notification when complete

**Patterns:**
- Toast notifications (non-blocking)
- Skeleton loaders (show content shape while loading)
- Progress bars (show completion %)
- Status badges (color + icon + text)
- Optimistic UI (show result immediately, rollback if fails)

**See:** [Notifications & Feedback](/interaction-patterns/notifications-feedback/) • [Examples: Stripe Dashboard](/examples/feedback-stripe-dashboard/)

---

### Error Recovery
**When errors occur, provide clear paths to recovery.**

**Implications:**
- Specific error messages ("Email must include @")
- Suggest solutions ("Try another card")
- Inline validation (catch errors early, on blur)
- Preserve user input (don't clear form on error)
- Undo/redo for exploration without fear

**See:** [Defensive Design](/decision-making-errors/defensive-design/) • [Examples: Grammarly Error Prevention](/examples/error-prevention-grammarly/)

---

## Mobile & Touch Ergonomics

### Touch Target Size
**Minimum 44×44pt (iOS) or 48×48dp (Android) for reliable touch interaction.**

**Implications:**
- Spacing: 8-12px between adjacent targets
- Thumb zones: Bottom 1/3 of screen most comfortable
- Avoid placing destructive actions near primary actions
- Consider one-handed use patterns

**See:** [Targets & Spacing](/ergonomics/targets-spacing/) • [Posture & Device Use](/ergonomics/posture-device-use/)

---

### Responsive Design
**Adapt layout to device capabilities and user preferences.**

**Implications:**
- Mobile-first approach (constraints force simplicity)
- Responsive typography (min 16px, scale up on large screens)
- Touch vs. mouse interaction patterns
- Respect user preferences (dark mode, reduced motion)

**See:** [Anthropometrics](/ergonomics/anthropometrics/)

---

## Interaction Patterns

### Forms & Input
**Make data entry as easy and error-free as possible.**

**Best Practices:**
- One column layout (faster completion)
- Top-aligned labels (easier to scan)
- Validate on blur (immediate feedback without interruption)
- Show password requirements before user types
- Use appropriate input types (email, tel, date)

**See:** [Forms](/interaction-patterns/forms/) • [Examples: Grammarly Real-Time Validation](/examples/error-prevention-grammarly/)

---

### Navigation
**Help users understand where they are and how to get where they're going.**

**Best Practices:**
- Clear information architecture (logical grouping)
- Persistent navigation (don't hide on scroll unless needed)
- Breadcrumbs for hierarchical navigation
- Search for large sites (>50 pages)
- Active state indicators (current page highlighted)

**See:** [Navigation](/interaction-patterns/navigation/)

---

### Search & Discovery
**Enable users to find what they're looking for.**

**Best Practices:**
- Autocomplete with suggestions
- Filters for refinement (faceted search)
- Clear results count ("23 results for...")
- Near-match tolerance (spell correction)
- Recent searches for convenience

**See:** [Search & Discovery](/interaction-patterns/search-discovery/)

---

## Real-World Examples

Learn from production systems demonstrating these principles:

- **[Progressive Disclosure - TurboTax](/examples/progressive-disclosure-turbotax/)**: 30% faster completion, 45% fewer help requests
- **[Defensive Design - Gmail Undo Send](/examples/defensive-design-gmail-undo/)**: 73% usage rate, 38% anxiety reduction
- **[Error Prevention - Grammarly](/examples/error-prevention-grammarly/)**: 86% error reduction, 75% faster proofreading
- **[Smart Defaults - iOS Camera](/examples/smart-defaults-ios-camera/)**: 93% faster to first photo, 5× more photos taken
- **[Accessibility - BBC Keyboard Navigation](/examples/accessibility-bbc-keyboard/)**: 98% keyboard task completion, 96% fewer screen reader errors
- **[System Feedback - Stripe Dashboard](/examples/feedback-stripe-dashboard/)**: 89% fewer support tickets, 51% faster task completion

[See all examples →](/examples/)

---

## Testing & Validation

### Usability Testing
**Observe real users attempting real tasks.**

**Methods:**
- Task-based testing (can users complete core flows?)
- Think-aloud protocol (understand mental models)
- A/B testing (measure impact of changes)
- Analytics review (where do users struggle?)

**See:** [Usability Tests](/research-methods-metrics/usability-tests/) • [Cognitive Walkthroughs](/research-methods-metrics/cognitive-walkthroughs/)

---

### Accessibility Audits
**Test with assistive technologies, not just automated tools.**

**Key Tools:**
- Screen readers (NVDA, JAWS, VoiceOver)
- Keyboard-only navigation
- Color contrast checkers
- Automated scanners (axe, WAVE) — catch obvious issues only

**See:** [Testing & Audit Tools](/accessibility/testing-audit-tools/) • [WCAG Guidelines](/accessibility/wcag-guidelines/)

---

### Performance Metrics
**Measure what matters for your users.**

**Common Metrics:**
- Task completion rate (% who succeed)
- Time on task (how long it takes)
- Error rate (frequency of mistakes)
- User satisfaction (CSAT, NPS, SUS scores)
- Accessibility compliance (WCAG conformance level)

**See:** [Metrics & Benchmarks](/research-methods-metrics/metrics-benchmarks/)

---

## Further Reading

### Standards & Guidelines
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) — Web accessibility standard
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/) — iOS/macOS design
- [Material Design 3](https://m3.material.io/) — Android design system
- [Nielsen Norman Group](https://www.nngroup.com/) — UX research and guidelines

**See:** [Standards & Guidelines](/references/standards-guidelines/)

### Books
- Don Norman — *The Design of Everyday Things*
- Steve Krug — *Don't Make Me Think*
- Daniel Kahneman — *Thinking, Fast and Slow*
- Susan Weinschenk — *100 Things Every Designer Needs to Know About People*

**See:** [Books & Further Reading](/references/books-further-reading/) • [Academic Research](/references/academic-research/)

---

## Using Human Standards MCP

Each principle on this page is encoded in the Human Standards MCP server, allowing AI tools to query for guidance during code generation:

```typescript
// Example: Get guidance for a complex form
const guidance = await mcp.callTool('get_component_guidance', {
  component: 'form',
  context: {
    fields: 12,
    complexity: 'complex'
  }
});

// Returns recommendations for:
// - Progressive disclosure (cognitive load)
// - Validation timing (error prevention)
// - Touch target sizes (ergonomics)
// - Keyboard accessibility (WCAG)
// - Autosave (defensive design)
```

The MCP server ensures that AI-generated code follows these principles automatically, not as an afterthought.

**Learn more:** [About Human Standards](/human-overview/what-are-human-standards/) • [MCP Server Documentation](/human-standards-mcp/)

---

**This overview provides a foundation. Each principle links to detailed documentation with implementation guidance, code examples, and validation rules.**
