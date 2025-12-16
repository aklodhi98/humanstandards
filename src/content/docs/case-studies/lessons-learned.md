---
title: Lessons Learned
description: Patterns that worked, anti-patterns to avoid, and checklists to reuse.
---

The most valuable lessons come from seeing what actually happened — what worked, what failed, and why. This page collects recurring patterns from human factors work, organized so you can learn from others' experiences.

## Common anti-patterns

### "We tested it internally"

Internal testing misses real user context. Employees know too much, are too forgiving, and don't represent your actual user base. Always test with external users.

### "Users will read the instructions"

They won't. If your design requires reading help text, onboarding modals, or documentation to work, it's already failing. Design for zero reading.

### "We'll fix it in V2"

Shipping known usability problems creates technical debt, user frustration, and support burden. Problems that are "small" to you may be blockers for users.

### "This is how competitors do it"

Competitors may be wrong. They may have different users, different contexts, or just haven't done proper research either. Validate for your own situation.

### "Power users will figure it out"

Even experts prefer simple, clear interfaces. Complexity isn't a badge of sophistication — it's usually a design failure.

## Patterns that work

### Start with the hardest cases

If your design works for users with disabilities, slow connections, or stressful contexts, it'll work for everyone. Edge cases reveal fundamental problems.

### Make the default path the right path

Don't rely on users making optimal choices. Make the default setting the safe one. Make the happy path obvious and frictionless.

### Test early, test small

Five users testing a paper prototype reveals more than 500 users testing a finished product. Problems found early cost a fraction to fix.

### Measure what users do, not what they say

Survey responses and stated preferences don't predict behavior well. Observe actual usage; track real metrics.

### Document decisions and context

When you learn something, write it down. Include *why* decisions were made, not just what was decided. Future you (and your team) will thank you.

## Reusable checklist

Before shipping any significant change:

- [ ] Tested with at least 5 representative users
- [ ] Keyboard-accessible and screen reader tested
- [ ] Works on slow connections (throttle to 3G)
- [ ] Error states designed and implemented
- [ ] Metrics instrumented to measure success
- [ ] Documented why decisions were made

## References

- Nielsen Norman Group — Usability lessons: https://www.nngroup.com/articles/
- GOV.UK Design System — Design principles: https://www.gov.uk/guidance/government-design-principles
- Rocket Surgery Made Easy — Testing guide: https://www.sensible.com/rocket-surgery-made-easy/
