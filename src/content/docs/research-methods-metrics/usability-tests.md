---
title: Usability Tests
description: Plan small, fast studies to de-risk decisions and measure task success.
---

Usability testing puts your design in front of real people and watches what happens. It's the most direct way to find out whether your interface actually works — before you ship it to everyone.

## Why it matters

Designers and developers are too close to their own work. We know where every button is, what every icon means, and how every flow is supposed to work. Users don't. Usability testing reveals the gap between intention and reality.

No amount of design review, heuristic evaluation, or internal QA catches what real users catch. They click on things that aren't clickable, miss things that seem obvious, and interpret labels in ways you never anticipated.

---

## Usability Test Specifications

### Test Type Matrix

| Type | Participants | Moderator | Duration | Best For |
|------|-------------|-----------|----------|----------|
| **Moderated Remote** | 5-8 | Yes (video call) | 45-60 min | Exploratory research, complex flows |
| **Unmoderated Remote** | 15-30+ | No | 15-30 min | Quick validation, specific questions |
| **In-Person Lab** | 5-8 | Yes | 60-90 min | High-fidelity prototypes, accessibility |
| **Guerrilla/Hallway** | 3-5 | Yes (informal) | 5-15 min | Early concepts, quick feedback |
| **A/B Testing** | 1000+ | No | Varies | Statistical comparison of variants |

### Sample Size Guidelines

| Study Goal | Minimum | Recommended | Maximum ROI | Notes |
|------------|---------|-------------|-------------|-------|
| **Problem discovery** | 5 | 5-8 | 85% of issues found at 5 | Nielsen/Landauer formula |
| **Multiple segments** | 3-5 per segment | 5 per segment | Per-segment problem discovery | Effectively separate studies |
| **Quantitative metrics** | 20 | 40 | Tight confidence intervals | 95% confidence level |
| **Card sorting** | 15 | 30-50 | Statistical clustering | Per user group |
| **Eye-tracking heatmaps** | 20 | 39 | Stable heatmaps | Fixed viewport required |

### Timing Benchmarks

| Test Phase | Duration | Notes |
|------------|----------|-------|
| **Planning** | 3-5 days | Tasks, script, recruitment criteria |
| **Recruitment** | 3-10 days | Longer for specialized audiences |
| **Pilot test** | 1 session | Always pilot before full study |
| **Individual session** | 45-90 min | Including intro and debrief |
| **Analysis per session** | 1-2 hours | Manual; less with AI tools |
| **Report synthesis** | 1-3 days | Findings, priorities, recommendations |

---

## Validation Rules

```yaml
usability_test_validation:
  rules:
    - id: sample-size-qualitative
      severity: warning
      check: "Qualitative studies have 5-8 participants"
      rationale: "85% of usability problems found with 5 users"

    - id: sample-size-quantitative
      severity: error
      check: "Quantitative studies have minimum 20 participants"
      rationale: "Statistical significance requires larger samples"

    - id: task-scenario-format
      severity: error
      check: "Tasks use scenario format, not step-by-step instructions"
      bad: "Click Add to Cart, then go to checkout"
      good: "You want to buy this shirt as a gift. Complete the purchase."

    - id: pilot-test-required
      severity: warning
      check: "At least one pilot session before main study"
      rationale: "Catches script issues, technical problems"

    - id: no-leading-questions
      severity: error
      check: "Questions don't lead or suggest answers"
      bad: "Did you see the big blue button?"
      good: "How would you proceed from here?"

    - id: real-user-recruitment
      severity: error
      check: "Participants match target user profile"
      rationale: "Convenience samples miss critical issues"

    - id: neutral-facilitation
      severity: error
      check: "Moderator doesn't help, guide, or react to participant actions"
      rationale: "Intervention invalidates natural behavior"

    - id: unmoderated-instructions-clear
      severity: error
      applies_to: "unmoderated"
      check: "All instructions are self-contained and unambiguous"
      rationale: "No moderator to clarify confusion"

    - id: accessibility-testing-included
      severity: warning
      check: "Study includes participants using assistive technologies"
      rationale: "Screen reader users reveal keyboard and ARIA issues"
```

---

## Test Types Deep Dive

### Qualitative (Formative) Testing

Run with 5-8 participants. You're looking for *why* people struggle, not precise measurements. Use think-aloud protocol to hear their reasoning. Best during design iteration.

**When to use:**
- Early-stage design exploration
- Understanding mental models
- Identifying usability problems
- Informing design decisions

**Output:** Prioritized list of usability issues with severity ratings

### Quantitative (Summative) Testing

Run with 20+ participants (40 recommended for tight confidence intervals). You're measuring success rates, time-on-task, and error counts. Best for benchmarking or comparing designs.

**When to use:**
- Comparing design variants
- Establishing baselines
- Validating improvements
- Competitive benchmarking

**Output:** Statistical metrics with confidence intervals

For most teams, qualitative testing gives the best return on investment.

---

## Remote vs. In-Person

### Remote Moderated

Very much like an in-person study, except facilitator and participant aren't in the same physical location. Uses video conferencing with screen sharing.

**Advantages:**
- Access to broader demographics
- No travel time or costs
- Participants in natural environment
- Easier to schedule

**Challenges:**
- Can't see full body language
- Technical issues (connectivity, audio)
- Less rapport building
- Harder to test physical products

### Remote Unmoderated

Participants complete tasks and answer questions at their own pace, on their own time. No moderator present.

**Advantages:**
- Lower cost (no moderator time)
- Faster results (often within 24-48 hours)
- Larger sample sizes feasible
- No observer effect (Hawthorne Effect)
- Global reach

**Challenges:**
- No follow-up questions
- Can't clarify confusion
- Instructions must be bulletproof
- Less insight into reasoning
- Potential for distraction

**Best for:** High-fidelity prototypes in final design stages, specific questions, quantitative validation.

### In-Person Lab

Traditional approach with participant and moderator in same room, often with observation room for stakeholders.

**Advantages:**
- Full body language observation
- Better rapport and trust
- Immediate follow-up possible
- Test physical products
- Control over environment

**Challenges:**
- Geographic limitations
- Higher cost
- Scheduling complexity
- May feel artificial

---

## Think-Aloud Protocol

The most common technique for understanding user reasoning during usability tests.

### Concurrent Think-Aloud (CTA)

Participants verbalize thoughts while performing tasks.

**Advantages:**
- Real-time insight into reasoning
- Captures immediate reactions
- Most complete verbalization

**Disadvantages:**
- May alter behavior and performance
- Can slow task completion
- Feels unnatural to some participants
- Negative effect on complex tasks

### Retrospective Think-Aloud (RTA)

Participants review video recording of their session and explain their reasoning afterward.

**Advantages:**
- No interference with task performance
- More accurate time measurements
- Better for complex tasks
- More cognitive/interpretive comments

**Disadvantages:**
- Requires twice the session time
- Memory decay affects accuracy
- Participants act as observers, not performers

### Co-Discovery Method

Two participants work together, naturally conversing as they complete tasks.

**Advantages:**
- More natural conversation
- Less awkwardness than solo think-aloud
- Reveals different perspectives
- Good for collaborative features

**Disadvantages:**
- Dominant personalities can skew results
- May not represent solo use
- Harder to analyze

---

## How to Run a Test

### 1. Define Your Questions

What do you want to learn? Specific questions yield actionable findings.

**Good research questions:**
- "Can users find the checkout button?"
- "Do users understand what happens when they click 'Save Draft'?"
- "Where do users expect to find account settings?"

**Vague research questions:**
- "Is the design good?"
- "Do users like it?"
- "Is it intuitive?"

### 2. Write Realistic Tasks

Give participants scenarios, not instructions.

**Good task (scenario-based):**
> "You want to buy this shirt as a gift for a friend. Their birthday is next week, so you need it delivered within 5 days. Complete the purchase."

**Bad task (step-by-step):**
> "Click Add to Cart, then go to checkout, then enter shipping information."

**Task writing tips:**
- Include realistic motivation
- Don't use UI terminology
- Make success/failure measurable
- Include enough context
- Don't reveal the answer

### 3. Recruit the Right People

Test with users who match your actual audience. 5-8 participants typically reveal ~85% of usability problems.

**Recruitment criteria:**
- Demographics matching target audience
- Relevant experience level
- Mix of tech proficiency
- Exclude employees and close friends
- Include assistive technology users

**Over-recruit by 20-30%** — remote studies have higher no-show rates.

### 4. Run the Session

**Introduction (5 minutes):**
- Explain the process
- Emphasize: "We're testing the design, not you"
- Get consent for recording
- Ask them to think aloud

**Tasks (30-45 minutes):**
- Present one task at a time
- Stay neutral — don't help, guide, or react
- Note what they do, say, and where they struggle
- Ask clarifying questions (not leading)

**Debrief (5-10 minutes):**
- Overall impressions
- Comparison to expectations
- What was easy/difficult
- Suggestions for improvement

### 5. Synthesize and Act

Look for patterns across participants. Prioritize issues by severity (how bad?) and frequency (how common?).

**Severity rating scale:**
| Rating | Description | Impact |
|--------|-------------|--------|
| 4 - Critical | User cannot complete task | Must fix before launch |
| 3 - Serious | Major difficulty or frustration | Should fix before launch |
| 2 - Minor | Causes hesitation or confusion | Fix if time permits |
| 1 - Cosmetic | Noticed but doesn't affect success | Low priority |

**Prioritization matrix:**

```
                  High Frequency
                       │
         Fix First     │    Monitor
         (Critical)    │    (Annoying)
                       │
    High ─────────────┼─────────────── Low
    Severity           │               Severity
                       │
         Fix Soon      │    Backlog
         (Painful)     │    (Minor)
                       │
                  Low Frequency
```

---

## Decision Logic for Test Type Selection

```pseudo
FUNCTION selectTestType(constraints, goals):
  // Determine moderation approach
  IF goals.require_follow_up OR goals.exploratory:
    moderation = "moderated"
  ELSE IF goals.quantitative AND constraints.budget_limited:
    moderation = "unmoderated"
  ELSE IF prototype.complexity == "high" OR prototype.requires_explanation:
    moderation = "moderated"
  ELSE:
    moderation = "unmoderated"

  // Determine location
  IF constraints.geographic_diversity_needed:
    location = "remote"
  ELSE IF testing.physical_product OR testing.accessibility_focus:
    location = "in-person"
  ELSE IF constraints.budget_limited OR constraints.time_limited:
    location = "remote"
  ELSE:
    location = "remote"  // Default to remote

  // Determine sample size
  IF goals.quantitative:
    IF goals.statistical_significance == "high":
      sample_size = 40
    ELSE:
      sample_size = 20
  ELSE:  // Qualitative
    IF user_segments.count > 1:
      sample_size = 5 * user_segments.count
    ELSE:
      sample_size = 5-8

  // Determine think-aloud approach
  IF tasks.complexity == "high":
    think_aloud = "retrospective"
  ELSE IF goals.understand_reasoning:
    think_aloud = "concurrent"
  ELSE IF goals.measure_performance:
    think_aloud = "retrospective"

  RETURN TestPlan(moderation, location, sample_size, think_aloud)
```

---

## AI-Powered Analysis

According to the 2024 State of User Research report, **56% of UX researchers** now use AI to support their work — a **36% increase from 2023**.

### Current AI Capabilities

| Capability | Maturity | Time Savings | Tools |
|------------|----------|--------------|-------|
| **Transcription** | High | 80-90% | Looppanel, Dovetail, CoNote |
| **Keyword tagging** | High | 60-70% | Dovetail, Condens |
| **Theme generation** | Medium | 40-50% | Maze, Dovetail |
| **Sentiment analysis** | Medium | 50-60% | Maze, UXtweak |
| **Summary generation** | Medium | 30-40% | Looppanel, BuildBetter |
| **Video clip creation** | High | 70-80% | Looppanel, CoNote |
| **Pattern detection** | Low-Medium | 20-30% | Dovetail |
| **Insight generation** | Low | Limited | Various |

### AI Limitations (per NNg 2024 Research)

Current AI tools:
- **Cannot** watch usability tests or process video effectively
- **Cannot** factor researcher context into analysis
- **Struggle** with visual cues and body language
- **Struggle** with mixed-method research data
- May produce vague or biased recommendations
- Sometimes mis-cite sources

**Recommendation:** Treat AI as an accelerant, not a replacement. Rely on human synthesis for nuanced, actionable insights.

### AI-Assisted Workflow

```
┌─────────────────┐
│   Test Session  │
│   (Recording)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  AI Transcribe  │◄── 80-90% time savings
│  + Timestamp    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   AI Tagging    │◄── Surface themes
│   + Clustering  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Human Review   │◄── Verify, contextualize
│  + Synthesis    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Final Report   │
│  + Recommendations
└─────────────────┘
```

---

## Common Mistakes

### Planning mistakes
- **Testing too late** — No time to act on findings
- **Vague research questions** — Can't measure success
- **Wrong participants** — Convenience samples miss issues
- **No pilot test** — Script problems discovered too late

### Facilitation mistakes
- **Leading questions** — "Did you see the big blue button?"
- **Helping participants** — Jumping in when they struggle
- **Reacting to errors** — Sighing, nodding, or facial expressions
- **Too many tasks** — Session fatigue affects results

### Analysis mistakes
- **Focusing on preferences** — "I like blue" vs. behavioral data
- **Ignoring severity** — Treating all issues equally
- **Cherry-picking** — Selecting quotes that confirm assumptions
- **No prioritization** — Long list without action guidance

---

## Usability Testing Platforms (2025)

### Moderated Remote Testing

| Platform | Key Features | Price Range |
|----------|--------------|-------------|
| **Lookback** | Real-time collaboration, notes, highlights | $99-299/mo |
| **UserTesting** | Participant panel, video analysis | Enterprise |
| **Zoom/Meet** | Simple setup, familiar to participants | Free-$20/mo |
| **dscout** | Mobile diary studies, video capture | Enterprise |

### Unmoderated Remote Testing

| Platform | Key Features | Price Range |
|----------|--------------|-------------|
| **Maze** | Rapid testing, 300 responses in 48h, AI analysis | $99-300/mo |
| **UserTesting** | Panel access, video recordings | Enterprise |
| **Lyssna** | Click tests, preference tests, prototype testing | $75-175/mo |
| **UXtweak** | Task analysis, session recordings | $50-150/mo |

### Analysis and Repository

| Platform | Key Features | Price Range |
|----------|--------------|-------------|
| **Dovetail** | Centralized insights, AI tagging, pattern detection | $29-79/user/mo |
| **Looppanel** | Auto-transcription, video clips, AI analysis | $30-80/mo |
| **CoNote** | Interview analysis, themes, deliverables | $0-195/mo |
| **Condens** | Auto-tagging, collaborative synthesis | $10-25/user/mo |

---

## Session Script Template

```markdown
## Introduction (5 min)

"Thanks for joining us today. My name is [name] and I'll be walking
you through this session.

Before we begin, I want to emphasize: we're testing the design, not you.
There are no wrong answers. If something is confusing, that's valuable
feedback for us.

I'm going to ask you to share your screen and think aloud as you work —
tell me what you're looking at, what you're thinking, what you expect
to happen.

Do I have your permission to record this session? The recording is only
for our team to review. [Get consent]

Do you have any questions before we start?"

## Warm-up Questions (3 min)

- "Can you tell me a bit about your role?"
- "Have you used [product category] before?"
- "Walk me through a typical day when you might need [task area]"

## Tasks (30-45 min)

[Present one task at a time. Don't read step-by-step instructions.]

"Imagine this scenario: [context]. Starting from this screen,
please [goal]. Remember to think aloud."

[After each task:]
- "How did that go?"
- "Was that what you expected?"
- "On a scale of 1-5, how difficult was that?"

## Debrief (5 min)

- "Overall, how would you describe this experience?"
- "What stood out as easy or difficult?"
- "Is there anything you expected to find but didn't?"
- "Any final thoughts or suggestions?"

"Thank you so much for your time today. Your feedback is incredibly
valuable."
```

---

## Metrics to Capture

### Task-Level Metrics

| Metric | What It Measures | How to Calculate |
|--------|------------------|------------------|
| **Success rate** | Task completion | (Successes / Attempts) × 100 |
| **Time on task** | Efficiency | Start to completion (seconds) |
| **Error count** | Error frequency | Mistakes per task |
| **Lostness** | Navigation efficiency | (Unique pages / Optimal) - 1 |
| **Assists** | Independence | Moderator interventions |

### Study-Level Metrics

| Metric | What It Measures | Industry Benchmark |
|--------|------------------|-------------------|
| **SUS (System Usability Scale)** | Overall usability | 68 = average |
| **SEQ (Single Ease Question)** | Task difficulty | 5.5/7 = acceptable |
| **Net Promoter Score** | Likelihood to recommend | 0 = neutral |
| **SUPR-Q** | Website UX quality | Percentile ranks |

### Calculating Confidence Intervals

For quantitative metrics with 40 participants at 95% confidence:
- **Task success rate 80%**: 95% CI = 65% to 90%
- **Mean time on task 45s**: 95% CI depends on variance

At 90% confidence level (acceptable for UX research):
- Margin of error 15% requires 28 users
- Margin of error 20% requires 15 users

---

## Recent Research

### AI Accelerating Research Workflows

Nielsen Norman Group's 2024 research on AI in UX found that current AI tools excel at transcription and tagging but cannot yet process video effectively or factor researcher context into analysis. Recommendations lean toward using AI as an accelerant while relying on human synthesis for nuanced insights.

### Industry Practice vs. Recommendations

Nielsen surveyed 217 UX practitioners and found the average usability study uses **11 participants** — more than twice the recommended 5 for qualitative testing. This suggests either conservative risk management or conflation of qualitative and quantitative goals.

### Remote Testing Normalization

Post-pandemic, remote moderated testing has become the default approach. Video conferencing tools have matured, and AI-powered analysis tools have streamlined transcription and synthesis. The 2024 State of User Research report shows 56% of researchers using AI tools.

### Think-Aloud Protocol Refinements

Research continues to show trade-offs between concurrent and retrospective think-aloud. Van Den Haak et al. found concurrent think-aloud negatively affects task performance on complex tasks, while retrospective yields more cognitive/interpretive comments but suffers from memory decay.

---

## References

**Foundational Work:**
- [Rocket Surgery Made Easy — Steve Krug](https://www.sensible.com/rocket-surgery-made-easy/) — Practical guide to guerrilla usability testing
- [Don't Make Me Think — Steve Krug](https://www.sensible.com/dmmt.html) — Classic usability principles

**Sample Size Research:**
- [How Many Test Users in a Usability Study? — NNg](https://www.nngroup.com/articles/how-many-test-users/) — The 5-user guideline explained
- [Sample Sizes for Quantitative Studies — NNg](https://www.nngroup.com/articles/summary-quant-sample-sizes/) — 40 users for quantitative
- [Sample Size Reality — MeasuringU](https://measuringu.com/sample-size-reality/) — Statistical validation

**Remote Testing:**
- [Remote Usability Tests: Moderated and Unmoderated — NNg](https://www.nngroup.com/articles/remote-usability-tests/) — Comprehensive comparison
- [Remote Usability Testing Study Guide — NNg](https://www.nngroup.com/articles/remote-usability-testing-study-guide/)
- [Moderated vs. Unmoderated — Maze](https://maze.co/guides/usability-testing/moderated-vs-unmoderated/)

**AI Tools:**
- [Top 12 AI Tools for Usability Testing — UXArmy](https://uxarmy.com/blog/top-ai-tools-for-usability-testing/)
- [25 Best AI Tools for UX Research — UXtweak](https://blog.uxtweak.com/ai-tools-for-ux-research/)
- [AI Usability Testing — Looppanel](https://www.looppanel.com/blog/ai-usability-testing)

**Think-Aloud Protocol:**
- [Think Aloud Protocol — Wikipedia](https://en.wikipedia.org/wiki/Think_aloud_protocol)
- [Retrospective Think Aloud — Wikipedia](https://en.wikipedia.org/wiki/Retrospective_think_aloud)

**Official Resources:**
- [Running a Usability Test — Usability.gov](https://www.usability.gov/how-to-and-tools/methods/running-usability-tests.html)

---

## See Also

- [Cognitive Walkthroughs](/research-methods-metrics/cognitive-walkthroughs/) — Expert evaluation without users
- [Metrics & Benchmarks](/research-methods-metrics/metrics-benchmarks/) — UX measurement standards
- [Accessibility Testing Tools](/accessibility/testing-audit-tools/) — Automated and manual testing
- [Form Design Playbook](/checklists-playbooks/form-design-playbook/) — Usability patterns for forms
