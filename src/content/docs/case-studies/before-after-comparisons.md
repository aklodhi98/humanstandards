---
title: Before/After Comparisons
description: Show the problem, hypothesis, change, and impact.
---

Before/after comparisons show the impact of design changes with concrete evidence. They're how you prove that human factors work actually worked — and how you learn what didn't.

## Anatomy of a good comparison

### 1. Problem framing

Start with what was wrong:
- What were users struggling with? (observable behavior, not assumptions)
- What metrics showed the problem? (drop-off rate, error count, support tickets)
- Who was most affected?

### 2. Hypothesis

State what you believed would help and why:
- "We believe [change] will [improve metric] because [reasoning]"
- Be specific enough to be proven wrong

### 3. The intervention

Document exactly what changed:
- Screenshots or wireframes of before and after
- Technical implementation details
- What stayed the same (control conditions)

### 4. Measurement approach

How did you know if it worked?
- A/B test, before/after comparison, or staged rollout
- Sample size and duration
- Primary and secondary metrics tracked

### 5. Results

Present the data honestly:
- Did the primary metric improve?
- Were there unexpected effects (positive or negative)?
- Statistical significance and confidence intervals

### 6. Trade-offs and follow-ups

Every change has consequences:
- What got worse? What new problems emerged?
- What would you do differently?
- What questions remain unanswered?

## Example format

### Checkout button visibility

**Before:** Checkout button was below the fold on mobile, resulting in 12% of users abandoning after adding items to cart.

**Hypothesis:** Moving checkout button to a sticky footer will reduce cart abandonment because users won't have to scroll to find it.

**Change:** Added persistent bottom bar with cart total and checkout button on mobile devices.

**Results:** Cart abandonment decreased from 12% to 7%. Mobile conversion rate increased 8%. No significant change on desktop (control).

**Trade-offs:** Footer reduced visible content area. Some users reported it felt "pushy." Accessibility audit required additional work for screen readers.

## Tips for credible comparisons

- **Show the actual designs**: Screenshots and recordings beat descriptions
- **Include the failures**: Negative results teach as much as positive ones
- **Acknowledge confounds**: What else might have caused the change?
- **Size matters**: Small sample sizes mean uncertain conclusions
- **Time matters**: Short tests miss seasonal effects and novelty bias

## References

- Kohavi, R. et al. — Trustworthy Online Controlled Experiments: https://www.cambridge.org/core/books/trustworthy-online-controlled-experiments/D97B26382EB0EB2DC2019A7A7B518F59
- Nielsen Norman Group — Before & After case studies: https://www.nngroup.com/articles/redesign-competitive-testing/
