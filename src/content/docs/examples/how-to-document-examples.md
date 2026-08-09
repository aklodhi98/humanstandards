---
title: How to Document Examples
description: Framework for creating compelling before/after case studies with measurable impact and transferable lessons.
---

Good examples prove that human factors principles work in practice. This guide shows how to document your work so others can learn from it and apply the lessons to their own projects.

## What Makes a Good Example?

The best examples combine:
- **Concrete problem** (observable user struggle, not assumptions)
- **Specific intervention** (what you actually changed)
- **Measured impact** (quantitative results, not "users loved it")
- **Transferable lessons** (what's applicable beyond your specific context)

## Structure: Before/After Comparison

Use this five-part framework to document your work:

### 1. Problem Framing

Start with what was wrong and how you knew:

**Observable Behavior:**
- What were users struggling with?
- Where did they get stuck, confused, or give up?
- What patterns emerged from support tickets, analytics, or user testing?

**Quantitative Evidence:**
- Drop-off rates at specific steps
- Error counts or retry attempts
- Support ticket volume
- Task completion rates
- Time on task

**Affected Users:**
- Who was most impacted?
- Were certain segments struggling more?
- Was this universal or contextual?

**Example:**
> "12% of mobile users abandoned checkout after adding items to cart. Heat maps showed users scrolling past the fold looking for the checkout button. Support tickets mentioned 'couldn't find checkout' 47 times in one month."

---

### 2. Hypothesis

State what you believed would help and why:

**Format:** "We believe [change] will [improve metric] because [reasoning based on human factors principles]"

Be specific enough to be proven wrong.

**Good Hypothesis:**
> "We believe moving the checkout button to a sticky footer will reduce mobile cart abandonment from 12% to <8% because users won't have to scroll to find it (Fitts's Law: reduce distance to target)."

**Bad Hypothesis:**
> "We'll make checkout better and users will be happier."

---

### 3. The Intervention

Document exactly what changed:

**Visual Evidence:**
- Screenshots or mockups of before and after
- Videos or recordings showing the interaction
- Wireframes for complex flows

**Implementation Details:**
- What specific code/design changed?
- What stayed the same (control conditions)?
- When was it deployed?
- How was it rolled out (A/B test, gradual rollout, instant switch)?

**Example:**
> "Added persistent bottom bar (60px height) with cart total and 'Checkout' button on mobile screens <768px wide. Button meets WCAG 2.2 touch target requirements (48×48px). Desktop experience unchanged. Deployed as A/B test to 50% of mobile traffic on March 15, 2024."

---

### 4. Measurement Approach

How did you know if it worked?

**Test Design:**
- A/B test (random assignment to old vs. new)
- Before/after comparison (time-based)
- Staged rollout (gradual percentage)

**Metrics Tracked:**
- Primary metric (the main goal)
- Secondary metrics (related impacts)
- Guardrail metrics (ensure nothing broke)

**Sample & Duration:**
- Sample size (users/sessions)
- Test duration (days/weeks)
- Statistical significance threshold

**Example:**
> "A/B test: 50% mobile traffic to new design (n=47,293 sessions), 50% to original (n=46,871 sessions). Ran for 14 days. Primary metric: cart abandonment rate. Secondary: conversion rate, average order value. Guardrail: page load time."

---

### 5. Results

Present the data honestly:

**Primary Metric:**
- Did it improve as hypothesized?
- By how much? (absolute and relative change)
- Statistical significance? (p-value, confidence interval)

**Secondary Effects:**
- Unexpected improvements?
- Unexpected regressions?
- Neutral changes?

**Example:**
> **Primary:** Cart abandonment decreased from 12.3% to 7.1% (42% relative reduction, p<0.001, 95% CI: 4.8-5.6pp)
>
> **Secondary:**
> - Mobile conversion rate increased 8.2% (2.5% → 2.7%, p=0.003)
> - Average order value unchanged (p=0.42)
> - Page load time increased 18ms (acceptable, <100ms threshold)

---

### 6. Trade-offs and Lessons

Every change has consequences:

**What Got Worse?**
- Did any metric decline?
- Were there user complaints?
- Technical debt or maintenance burden?

**What Would You Do Differently?**
- What surprised you?
- What assumptions were wrong?
- What would you test next?

**Transferable Lessons:**
- What's applicable beyond your specific context?
- What human factors principles were validated?
- What guidance would you give others?

**Example:**
> **Trade-offs:**
> - Footer reduced visible content area by 60px (acceptable for task focus)
> - Some users reported it felt "pushy" (3% of survey responses, not reflected in metrics)
> - Accessibility audit required additional work for screen reader announcement
>
> **Lessons:**
> - Fitts's Law applies to checkout: reducing target distance improved conversion
> - Mobile-first constraints often improve desktop too (tested in follow-up)
> - "Pushy" perception didn't correlate with behavior (feeling vs. action mismatch)

---

## Full Example Template

### [Title: Specific change, not "UX improvements"]

**Before:** [Problem with metrics]

**Hypothesis:** [Specific prediction with reasoning]

**Change:** [What you actually did, with screenshots]

**Measurement:** [How you tested it]

**Results:** [Primary and secondary metrics]

**Trade-offs:** [What got worse or was harder]

**Lessons:** [What's transferable]

**Human Standards Connection:** [Links to principles, examples, documentation]

---

## Example: Checkout Button Visibility

**Before:** Checkout button was below the fold on mobile (visible to only 23% of users without scrolling), resulting in 12% cart abandonment rate and support tickets mentioning "couldn't find checkout."

**Hypothesis:** Moving checkout button to a sticky footer will reduce mobile cart abandonment to <8% because users won't need to scroll to find it (Fitts's Law: reduce target distance).

**Change:** Added persistent 60px bottom bar with cart total and "Checkout" button on mobile (<768px). Button meets WCAG 2.2 touch target size (48×48px). Desktop unchanged. A/B test to 50% mobile traffic.

**Measurement:** 14-day A/B test, n=94,164 mobile sessions. Primary: cart abandonment. Secondary: conversion rate, AOV. Guardrail: page load time.

**Results:**
- Cart abandonment: 12.3% → 7.1% (42% reduction, p<0.001)
- Conversion: +8.2% (2.5% → 2.7%, p=0.003)
- AOV: No change (p=0.42)
- Load time: +18ms (acceptable)

**Trade-offs:**
- Footer reduces content area (acceptable)
- 3% said it felt "pushy" (no metric impact)
- Screen reader implementation took extra QA

**Lessons:**
- Fitts's Law validated: reducing target distance drives conversion
- Perceived "pushiness" didn't correlate with behavior
- Mobile constraints often improve desktop (tested next)

**Human Standards Connection:** [Fitts's Law](/human-overview/key-principles-and-laws/#fittss-law) • [Ergonomics: Touch Targets](/ergonomics/targets-spacing/) • [WCAG Touch Targets](/accessibility/wcag-guidelines/#operable)

---

## Tips for Credible Examples

### Show, Don't Tell
- **Screenshots/videos** > descriptions
- **Actual data** > "users loved it"
- **Specific numbers** > "significant improvement"

### Include Failures
- Negative results teach as much as positive ones
- Sharing what didn't work helps others avoid the same mistakes
- Shows intellectual honesty

### Acknowledge Confounds
- What else might have caused the change?
- Seasonality, marketing campaigns, external events?
- A/B tests control for this; before/after comparisons don't

### Size Matters
- Small samples → uncertain conclusions
- State sample size and statistical significance
- "n=47" is very different from "n=47,000"

### Time Matters
- Short tests miss seasonal effects
- Short tests amplify novelty bias
- 2 weeks minimum for most changes

---

## Industry Examples Referenced on This Site

We document examples from leading companies:

- **[TurboTax - Progressive Disclosure](/examples/cognitive-load/progressive-disclosure-turbotax/)**: 30% faster, 45% fewer help requests
- **[Gmail - Undo Send](/examples/defensive-design/defensive-design-gmail-undo/)**: 73% usage rate, 38% anxiety reduction
- **[Grammarly - Error Prevention](/examples/defensive-design/error-prevention-grammarly/)**: 86% error reduction
- **[iOS Camera - Smart Defaults](/examples/cognitive-load/smart-defaults-ios-camera/)**: 93% faster to first photo
- **[BBC - Keyboard Navigation](/examples/accessibility/accessibility-bbc-keyboard/)**: 98% task completion
- **[Stripe - System Feedback](/examples/feedback/feedback-stripe-dashboard/)**: 89% fewer support tickets

Each includes the framework above: problem, hypothesis, implementation, metrics, lessons, and code examples.

---

## Contributing Your Examples

Have a great example? We'd love to include it!

### Required Information
- ✅ Company/product name (with permission if not public)
- ✅ Specific problem with evidence
- ✅ Clear hypothesis based on human factors principles
- ✅ Implementation details (what changed)
- ✅ Quantitative metrics (before/after data)
- ✅ Lessons and trade-offs
- ✅ Connection to Human Standards documentation

### Submission Process
1. Fork the repository
2. Create a new file in `src/content/docs/examples/`
3. Use this guide and existing examples as templates
4. Include code examples if relevant
5. Link to related Human Standards principles
6. Submit pull request

### Quality Bar
Examples should:
- Be real (not hypothetical scenarios)
- Include actual metrics (not estimated)
- Show measurable impact (not just "better")
- Connect to human factors principles
- Provide transferable lessons

---

## References

- Kohavi, R. et al. — Trustworthy Online Controlled Experiments: https://www.cambridge.org/core/books/trustworthy-online-controlled-experiments/D97B26382EB0EB2DC2019A7A7B518F59
- Nielsen Norman Group — Before & After case studies: https://www.nngroup.com/articles/redesign-competitive-testing/
- GOV.UK Service Manual — Case studies: https://www.gov.uk/service-manual/case-studies
- 18F (US Digital Service) — Case studies: https://18f.gsa.gov/work/

---

## See Also

- [Real-World Examples](/examples/) — Browse all documented examples
- [Key Principles & Laws](/human-overview/key-principles-and-laws/) — Foundational principles to reference
- [Research Methods](/research-methods-metrics/usability-tests/) — How to test and measure
- [Contributing Guide](https://github.com/aklodhi98/humanstandards/blob/main/CONTRIBUTING.md) — General contribution guidelines
