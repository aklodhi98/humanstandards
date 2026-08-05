---
title: Metrics & Benchmarks
description: Define north-star and guardrail metrics; set baselines and targets.
---

What gets measured gets managed — but only if you're measuring the right things. Good metrics connect user behavior to real outcomes. Bad metrics create perverse incentives and waste engineering effort.

This page provides industry benchmarks, measurement frameworks, and validation rules for UX metrics that both humans and AI systems can use to assess interface quality.

---

## Metric Specifications

### Industry Benchmarks Summary

| Metric | Average | Good | Excellent | Source |
|--------|---------|------|-----------|--------|
| **Task Success Rate** | 78% | 80-90% | >90% | MeasuringU |
| **SUS Score** | 68 | 70-80 | >80 | Usability.gov |
| **SEQ Score** | 5.5/7 | 6.0/7 | 6.5+/7 | MeasuringU |
| **NPS (SaaS)** | +36 | +40-50 | +50+ | CustomerGauge |
| **NPS (B2B)** | +38 | +40-60 | +60+ | Retently |
| **NPS (eCommerce)** | +55 | +55-70 | +70+ | CustomerGauge |
| **LCP** | — | ≤2.5s | ≤1.5s | Google |
| **INP** | — | ≤200ms | ≤100ms | Google |
| **CLS** | — | ≤0.1 | ≤0.05 | Google |

### UX Metric Categories

| Category | Measures | Examples |
|----------|----------|----------|
| **Behavioral** | What users do | Task success, time on task, error rate |
| **Attitudinal** | How users feel | SUS, NPS, SEQ, CSAT |
| **Performance** | System quality | LCP, INP, CLS, Time to Interactive |
| **Business** | Outcomes | Conversion, retention, revenue per user |

---

## Validation Rules

```yaml
ux_metrics_validation:
  rules:
    - id: task-success-threshold
      severity: warning
      check: "Task success rate >= 78% for critical tasks"
      threshold: 78
      action: "Investigate usability issues if below threshold"

    - id: sus-score-minimum
      severity: warning
      check: "SUS score >= 68 (industry average)"
      threshold: 68
      action: "Below average indicates usability problems"

    - id: seq-score-minimum
      severity: warning
      check: "SEQ score >= 5.5/7 for all tasks"
      threshold: 5.5
      action: "Low SEQ indicates task difficulty"

    - id: lcp-good
      severity: error
      check: "LCP <= 2.5 seconds at 75th percentile"
      threshold_ms: 2500
      action: "Optimize loading performance"

    - id: inp-good
      severity: error
      check: "INP <= 200ms at 75th percentile"
      threshold_ms: 200
      action: "Optimize interaction responsiveness"

    - id: cls-good
      severity: error
      check: "CLS <= 0.1 at 75th percentile"
      threshold: 0.1
      action: "Fix layout shifts"

    - id: baseline-before-changes
      severity: error
      check: "Baseline measurement exists before design changes"
      rationale: "Cannot measure improvement without baseline"

    - id: sample-size-sufficient
      severity: warning
      check: "Quantitative metrics have n >= 20 responses"
      rationale: "Statistical significance requires adequate sample"

    - id: guardrail-monitoring
      severity: warning
      check: "Guardrail metrics monitored alongside north star"
      rationale: "Prevent gaming at users' expense"
```

---

## Types of Metrics

### North-Star Metrics

The one metric that best captures the value you deliver to users. Everything else ladders up to it.

| Company | North Star | Why It Works |
|---------|------------|--------------|
| **Spotify** | Time spent listening | Reflects value delivered |
| **Airbnb** | Nights booked | Captures marketplace success |
| **Slack** | Messages sent in channels | Indicates team engagement |
| **Duolingo** | Daily active learners | Learning progress |
| **Notion** | Weekly active editors | Collaboration value |

**Criteria for a good north star:**
- Meaningful — Reflects real user value
- Measurable — Quantifiable and trackable
- Movable — Your team can influence it
- Leading — Predicts business outcomes

### Input Metrics (Leading Indicators)

Leading indicators you can influence directly. They predict changes in your north star.

| Metric | Predicts | Example Target |
|--------|----------|----------------|
| **Activation rate** | Retention | 40% in first week |
| **Feature adoption** | Engagement | 30% try new feature |
| **Session frequency** | Lifetime value | 3+ sessions/week |
| **Onboarding completion** | Activation | 70% complete flow |
| **Time to first value** | Conversion | <5 minutes |

### Guardrail Metrics

Constraints that ensure you're not gaming your north star at users' expense.

| Guardrail | Protects Against | Alert Threshold |
|-----------|------------------|-----------------|
| **Error rates** | Broken experiences | >1% increase |
| **Page load time** | Performance degradation | >500ms increase |
| **Support volume** | Confusion, frustration | >10% increase |
| **Accessibility compliance** | Exclusion | Any regression |
| **Bounce rate** | Poor content match | >5% increase |
| **Unsubscribe rate** | Over-communication | >0.5% per send |

**Rule:** If your guardrails decline while your north star rises, something's wrong.

---

## HEART Framework (Google)

Google's UX research team (Kerry Rodden, Hilary Hutchinson, Xin Fu) created the HEART framework to measure user satisfaction and product success at scale.

### The Five HEART Metrics

| Dimension | Definition | Example Signals | Example Metrics |
|-----------|------------|-----------------|-----------------|
| **Happiness** | User attitudes, satisfaction | Survey responses | NPS, SUS, CSAT |
| **Engagement** | Level of involvement | Session depth | Sessions/week, features used |
| **Adoption** | New users gained | Sign-ups, upgrades | % new users, feature adoption |
| **Retention** | Users returning | Return visits | Churn rate, DAU/MAU ratio |
| **Task Success** | Efficiency, effectiveness | Task completion | Success rate, time on task |

### Goals-Signals-Metrics Process

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│    GOALS    │ → │   SIGNALS   │ → │   METRICS   │
│ What success│    │ Indicators  │    │ How to      │
│ looks like  │    │ of progress │    │ measure     │
└─────────────┘    └─────────────┘    └─────────────┘

Example:
Goal: Users find what they need quickly
Signal: Low search refinement rate
Metric: % searches with 0-1 refinements
```

### When to Use Each HEART Dimension

| Scenario | Primary Dimensions |
|----------|-------------------|
| **New feature launch** | Adoption, Task Success |
| **Retention problem** | Retention, Engagement |
| **Conversion optimization** | Task Success, Happiness |
| **Growth initiative** | Adoption, Retention |
| **Quality assessment** | Happiness, Task Success |

---

## UX-Specific Metrics

### Task Success Rate

The most fundamental UX metric: what percentage of users complete a given task?

**Industry benchmark:** 78% average (MeasuringU analysis of 1,100+ tasks)

| Performance | Task Success Rate |
|-------------|------------------|
| **Excellent** | >90% |
| **Good** | 80-90% |
| **Acceptable** | 70-80% |
| **Poor** | <70% |

**Calculation:**
```
Task Success Rate = (Successful Completions / Attempts) × 100
```

**Types of success:**
- **Binary** — Completed or not
- **Levels** — Complete, partial, failed
- **Assisted** — Track moderator interventions

### Time on Task

How long does it take? Context determines whether shorter is better.

| Task Type | Shorter is Better | Longer May Be Good |
|-----------|-------------------|-------------------|
| Checkout | ✓ | |
| Error recovery | ✓ | |
| Content consumption | | ✓ |
| Learning features | | ✓ |
| Data entry | ✓ | |

**Calculation:**
```
Time on Task = Task End Time - Task Start Time
Report: Mean, Median, 90th percentile
```

### Error Rate

How often do users make mistakes? Distinguish between types.

| Error Type | Definition | Example |
|------------|------------|---------|
| **Slip** | Wrong action, right intention | Clicking wrong button |
| **Mistake** | Right action, wrong understanding | Misinterpreting a label |
| **Failure** | Cannot complete | Giving up |

**Calculation:**
```
Error Rate = (Tasks with Errors / Total Tasks) × 100
```

### Lostness

Measures navigation efficiency — how directly users find what they need.

**Calculation:**
```
Lostness = sqrt((N/S - 1)² + (R/N - 1)²)

Where:
N = Number of different pages visited
S = Minimum number of pages needed
R = Total pages visited (including revisits)

Score interpretation:
0.0 = Perfect navigation
0.4 = Some confusion
0.5+ = Lost
```

---

## Survey-Based Metrics

### System Usability Scale (SUS)

A 10-item questionnaire producing a score from 0-100. Quick, reliable, and widely benchmarked.

**Scoring interpretation:**

| Score | Grade | Percentile | Adjective |
|-------|-------|------------|-----------|
| 90+ | A+ | Top 10% | Best imaginable |
| 80-89 | A | Top 20% | Excellent |
| 68-79 | B | Average | Good |
| 50-67 | C | Below average | OK |
| <50 | F | Bottom 25% | Poor |

**Key benchmark:** 68 is the average SUS score across all products.

### Single Ease Question (SEQ)

One question asked immediately after a task: "How easy or difficult was this task?"

- **Scale:** 1 (Very Difficult) to 7 (Very Easy)
- **Average:** 5.5/7
- **Threshold:** Below 5.0 indicates difficulty

**Benefits:**
- Minimal burden on participants
- Task-specific (unlike SUS)
- Correlates with task success

### Net Promoter Score (NPS)

"How likely are you to recommend this to a friend?" (0-10 scale)

**Calculation:**
```
NPS = % Promoters (9-10) - % Detractors (0-6)
Range: -100 to +100
```

**Industry benchmarks (2024):**

| Industry | Average NPS | Good | Excellent |
|----------|-------------|------|-----------|
| **SaaS** | +36 | +40 | +50+ |
| **B2B Software** | +41 | +45 | +55+ |
| **eCommerce** | +55-62 | +60 | +70+ |
| **B2B Overall** | +38 | +45 | +60+ |
| **B2C Overall** | +49 | +55 | +70+ |

**Caution:** NPS measures sentiment, not usability. A product can have high NPS but poor task success.

### SUPR-Q (Website Quality)

An 8-item questionnaire measuring four factors of website experience:

| Factor | What It Measures |
|--------|------------------|
| **Usability** | Ease of use |
| **Trust** | Credibility, security |
| **Appearance** | Visual design quality |
| **Loyalty** | Intent to return/recommend |

**Advantage:** Provides percentile ranks against database of 100+ websites.

### UMUX-Lite

A short, 2-item usability survey:

1. "[Product]'s capabilities meet my requirements"
2. "[Product] is easy to use"

**Scale:** 7-point Likert
**Conversion:** Can be converted to SUS-equivalent score

---

## Core Web Vitals (Performance)

Google's metrics for user experience quality, used in search ranking since 2021.

### Current Metrics

| Metric | Measures | Good | Needs Improvement | Poor |
|--------|----------|------|-------------------|------|
| **LCP** | Loading | ≤2.5s | 2.5-4.0s | >4.0s |
| **INP** | Interactivity | ≤200ms | 200-500ms | >500ms |
| **CLS** | Visual stability | ≤0.1 | 0.1-0.25 | >0.25 |

**Note:** INP (Interaction to Next Paint) replaced FID (First Input Delay) in March 2024.

### Largest Contentful Paint (LCP)

Measures loading performance — when the largest content element becomes visible.

**Common causes of poor LCP:**
- Slow server response (TTFB)
- Render-blocking JavaScript/CSS
- Large unoptimized images
- Client-side rendering delays

### Interaction to Next Paint (INP)

Measures responsiveness — latency of all interactions throughout the page lifecycle.

**Common causes of poor INP:**
- Long JavaScript tasks blocking main thread
- Large DOM size
- Excessive event handlers
- Third-party scripts

### Cumulative Layout Shift (CLS)

Measures visual stability — unexpected movement of visible elements.

**Common causes of poor CLS:**
- Images without dimensions
- Ads/embeds without reserved space
- Dynamically injected content
- Web fonts causing FOIT/FOUT

### Passing Core Web Vitals

To pass assessment, **75% of page visits** must meet "Good" thresholds.

```
Passing = (Pages with "Good" Score / Total Pages) >= 0.75
```

---

## Setting Benchmarks

### 1. Baseline First

Measure where you are before making changes. Without a baseline, you can't prove improvement.

```pseudo
FUNCTION establishBaseline(metric):
  measurements = collectData(metric, days=14-30)

  baseline = {
    mean: average(measurements),
    median: median(measurements),
    p75: percentile(measurements, 75),
    p95: percentile(measurements, 95),
    sample_size: count(measurements),
    date_range: [start, end]
  }

  RETURN baseline
```

### 2. Industry Comparison

Compare against public benchmarks:

| Source | Benchmarks Available |
|--------|---------------------|
| **MeasuringU** | SUS, task success, time on task |
| **Google CrUX** | Core Web Vitals by industry |
| **WebAIM Million** | Accessibility errors |
| **CustomerGauge** | NPS by industry |

### 3. Internal Trends

Compare against your own history:

```
Improvement = ((New Score - Baseline) / Baseline) × 100
```

Track:
- Week-over-week changes
- Release-over-release changes
- Seasonal variations

### 4. Target Setting

Set meaningful targets, not arbitrary numbers.

**Good targets:**
- "Improve task success from 72% to 80%"
- "Reduce LCP from 3.2s to 2.5s"
- "Achieve SUS score of 75 (from 65)"

**Bad targets:**
- "Get 100% task success" (unrealistic)
- "Be the best in industry" (vague)
- "Improve all metrics" (unfocused)

---

## Decision Logic for Metric Selection

```pseudo
FUNCTION selectMetrics(product_stage, goals):
  metrics = []

  // Always include task success for usability
  metrics.push("task_success_rate")

  // Select attitudinal metric
  IF goals.includes("overall_usability"):
    metrics.push("SUS")
  IF goals.includes("task_specific_feedback"):
    metrics.push("SEQ")
  IF goals.includes("loyalty_measurement"):
    metrics.push("NPS")

  // Select behavioral metrics based on stage
  IF product_stage == "new_feature":
    metrics.push("adoption_rate")
    metrics.push("feature_usage_frequency")
  IF product_stage == "retention_focus":
    metrics.push("DAU_MAU_ratio")
    metrics.push("churn_rate")
  IF product_stage == "growth":
    metrics.push("activation_rate")
    metrics.push("time_to_first_value")

  // Always include performance guardrails
  metrics.push("LCP", "INP", "CLS")

  // Always include error guardrails
  metrics.push("error_rate")

  RETURN metrics
```

---

## Implementation Tips

### Instrumentation

- **Consistent events** across platforms (web, mobile, API)
- **Standardized naming** conventions
- **User identity** resolution for cross-session tracking
- **Timestamp precision** for time-based metrics

### Tracking Pipeline

```
User Action → Event Collection → Processing → Storage → Dashboard
     │              │                │            │          │
     │         (Real-time)       (Batch)     (Analytics)   (BI)
     │                                                      │
     └──────────────────── Alert if threshold breached ─────┘
```

### Team Rituals

| Cadence | Activity | Metrics Focus |
|---------|----------|---------------|
| **Daily** | Monitor dashboards | Anomalies, errors |
| **Weekly** | Team review | Trends, progress |
| **Sprint** | Retrospective | Feature impact |
| **Monthly** | Stakeholder report | Business outcomes |
| **Quarterly** | Benchmarking study | Industry comparison |

### Investigation Protocol

When metrics change unexpectedly:

1. **Verify data** — Is the change real or a tracking bug?
2. **Identify scope** — Which segments affected?
3. **Correlate events** — What changed (deploy, external)?
4. **Root cause** — Why did behavior change?
5. **Action** — Fix, revert, or accept?

---

## Common Traps

### Vanity Metrics

Big numbers that don't connect to outcomes.

| Vanity Metric | Better Alternative |
|---------------|-------------------|
| Page views | Engaged sessions |
| Downloads | Activated users |
| Sign-ups | 7-day retained users |
| Time on site | Task completion |

### Goodhart's Law

> "When a measure becomes a target, it ceases to be a good measure."

**Example:** Targeting "sessions per user" leads to artificial engagement features that annoy users and hurt long-term retention.

**Prevention:** Use guardrail metrics alongside targets.

### Short-Termism

Optimizing for immediate conversion at the cost of retention.

**Example:** Dark patterns increase sign-ups but increase churn and damage trust.

**Prevention:** Track 90-day retention alongside conversion.

### Analysis Paralysis

Tracking everything, acting on nothing.

**Prevention:** Limit to 3-5 key metrics per initiative. More data ≠ better decisions.

---

## Recent Research

### NPS Decline Trend

CustomerGauge 2024-2025 data shows median NPS remaining at 42, but 10 of 11 industries saw NPS decline. Only Manufacturing improved. Wholesale, Retail & eCommerce, and Digital Marketplaces took double-digit hits.

### INP Replacing FID

Google replaced First Input Delay (FID) with Interaction to Next Paint (INP) as a Core Web Vital in March 2024. INP measures all interactions throughout the page lifecycle, not just the first one.

### AI in Metrics Analysis

Tools like Mixpanel, Amplitude, and Heap are incorporating AI for anomaly detection, funnel optimization suggestions, and natural language querying of analytics data. However, human interpretation remains essential for understanding causation.

### Accessibility Metrics Maturation

The WebAIM Million study continues annual tracking, showing 95.9% of home pages have detectable WCAG 2 failures in 2024. Accessibility compliance is increasingly treated as a guardrail metric alongside performance.

---

## References

**Frameworks:**
- [HEART Framework — Google Research](https://research.google/pubs/pub36299/) — Original HEART paper
- [Google's HEART Framework — IxDF](https://www.interaction-design.org/literature/article/google-s-heart-framework-for-measuring-ux)
- [How Google Uses HEART — Appcues](https://www.appcues.com/blog/google-improves-user-experience-with-heart-framework)

**Survey Metrics:**
- [System Usability Scale — Usability.gov](https://www.usability.gov/how-to-and-tools/methods/system-usability-scale.html)
- [What is a Good Net Promoter Score — Retently](https://www.retently.com/blog/good-net-promoter-score/)
- [SUPR-Q — MeasuringU](https://measuringu.com/product/suprq/)

**Performance:**
- [Core Web Vitals — web.dev](https://web.dev/vitals/)
- [Core Web Vitals Thresholds — web.dev](https://web.dev/articles/defining-core-web-vitals-thresholds)
- [Core Web Vitals 2025 — EnFuse Solutions](https://www.enfuse-solutions.com/core-web-vitals-2025-new-benchmarks-and-how-to-pass-every-test/)

**Benchmarking:**
- [47 UX Metrics Articles from 2024 — MeasuringU](https://measuringu.com/ux-2024/)
- [Task Success Rate — NNg](https://www.nngroup.com/articles/success-rate-the-simplest-usability-metric/)
- [UX Benchmarking — NNg](https://www.nngroup.com/articles/benchmarking-ux/)
- [NPS Benchmarks by Industry — CustomerGauge](https://customergauge.com/benchmarks)

**Practical Guides:**
- [6 UX Metrics for 2025 — Survicate](https://survicate.com/blog/ux-metrics/)
- [UX Metrics Complete Guide — Evo Design](https://evodesign.studio/blog/ux-metrics-2025-complete-guide/)
- [Usability Testing Metrics — UXtweak](https://www.uxtweak.com/usability-testing/metrics/)

---

## See Also

- [Usability Tests](/research-methods-metrics/usability-tests/) — Collecting behavioral metrics
- [Cognitive Walkthroughs](/research-methods-metrics/cognitive-walkthroughs/) — Expert evaluation methods
- [Accessibility Checklist](/checklists-playbooks/accessibility-checklist/) — Compliance metrics
- [Key Principles and Laws](/human-overview/key-principles-and-laws/) — Design principles affecting metrics
