---
title: Metrics & Benchmarks
description: Define north-star and guardrail metrics; set baselines and targets.
---

What gets measured gets managed — but only if you're measuring the right things. Good metrics connect user behavior to real outcomes. Bad metrics create perverse incentives and waste engineering effort.

## Types of metrics

### North-star metrics

The one metric that best captures the value you deliver to users. Everything else ladders up to it.

- **Spotify**: Time spent listening
- **Airbnb**: Nights booked
- **Slack**: Messages sent in channels

Pick a north star that's meaningful, measurable, and movable by your team.

### Input metrics

Leading indicators you can influence directly. They predict changes in your north star.

- Activation rate
- Feature adoption
- Session frequency

### Guardrail metrics

Constraints that ensure you're not gaming your north star at users' expense.

- Error rates
- Page load time
- Customer support volume
- Accessibility compliance

If your guardrails decline while your north star rises, something's wrong.

## UX-specific metrics

### Task success rate

What percentage of users complete a given task? The most fundamental UX metric.

### Time on task

How long does it take? Shorter isn't always better — it depends on the task.

### Error rate

How often do users make mistakes? Count slips (wrong clicks) and mistakes (wrong decisions) separately.

### System Usability Scale (SUS)

A quick 10-question survey that produces a score from 0–100. Above 68 is average; above 80 is good.

### Net Promoter Score (NPS)

"Would you recommend this to a friend?" Simple, but be careful — it measures sentiment, not usability.

## Setting benchmarks

1. **Baseline first**: Measure where you are before making changes
2. **Industry comparison**: Look at public benchmarks (WebAIM Million, Core Web Vitals)
3. **Internal trends**: Compare against your own history
4. **Target setting**: Aim for meaningful improvement, not arbitrary numbers

## Implementation tips

- Instrument events consistently across platforms
- Track metrics in your CI/CD pipeline
- Review dashboards in weekly team rituals
- Investigate anomalies immediately — don't let them drift

## Common traps

- **Vanity metrics**: Big numbers that don't connect to outcomes (page views, downloads)
- **Goodhart's Law**: When a measure becomes a target, it ceases to be a good measure
- **Short-termism**: Optimizing for immediate conversion at the cost of retention
- **Analysis paralysis**: Tracking everything, acting on nothing

## References

- HEART framework (Google): https://research.google/pubs/pub36299/
- System Usability Scale: https://www.usability.gov/how-to-and-tools/methods/system-usability-scale.html
- Core Web Vitals: https://web.dev/vitals/
