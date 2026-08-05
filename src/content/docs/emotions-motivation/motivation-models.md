---
title: Motivation Models
description: Evidence-based frameworks for understanding and designing for human motivation, from the Fogg Behavior Model to Self-Determination Theory and ethical persuasive design.
---

Why do people do what they do? And more importantly, how can we design experiences that encourage action without manipulation? Understanding motivation helps you build products that genuinely serve users—not exploit them.

Motivation is complex. It involves conscious desires and unconscious habits, immediate impulses and long-term goals, intrinsic satisfaction and extrinsic rewards. Effective interface design respects this complexity and supports users in achieving outcomes they genuinely value.

## The Fogg Behavior Model

BJ Fogg's model is beautifully simple: **behavior happens when motivation, ability, and a prompt come together at the same moment.** Miss any one of these, and nothing happens.

### The three elements

**Motivation** is why someone wants to act. It's driven by:
- Seeking pleasure and avoiding pain
- Hoping for positive outcomes and fearing negative ones
- Gaining social acceptance and avoiding rejection

**Ability** is whether they *can* act. Factors that affect ability:
- **Time**: Do they have enough time to complete this?
- **Money**: Can they afford it?
- **Physical effort**: Is it physically demanding?
- **Mental effort**: Does it require significant cognitive load?
- **Social deviance**: How far does it deviate from their routine or social norms?
- **Non-routine**: Is it unfamiliar or outside their normal behavior?

**Prompt** is the trigger—the notification, button, or reminder that says "do this now." A prompt must be:
- **Noticeable**: Users must see or hear it
- **Well-timed**: Appears when motivation and ability align
- **Clear**: Users understand what action to take

### Types of prompts

The Fogg Behavior Model identifies three types of prompts:

**Spark** (for low motivation, high ability):
- Increases motivation when the task is easy
- Example: "Only 2 minutes to complete your profile!"
- Risk: Can feel manipulative if it creates false urgency

**Facilitator** (for high motivation, low ability):
- Reduces friction when motivation is already present
- Example: "Continue with Google" for sign-up
- Best practice: Genuine simplification, not removal of safeguards

**Signal** (for high motivation, high ability):
- Simple reminder when users are ready and willing
- Example: "You have 3 unread messages"
- Most ethical: Just informing, not manipulating

### Key insight

If motivation is low, make the action easier. If the action is hard, boost motivation. And always prompt at the right time.

**Design implication**: Don't try to solve all problems with prompts. If users aren't converting, the issue might be low ability (too complex) or low motivation (unclear value), not a missing notification.

## Self-Determination Theory

For motivation that lasts, look to intrinsic drivers. Self-Determination Theory (SDT), developed by psychologists Edward Deci and Richard Ryan, identifies three fundamental psychological needs that, when satisfied, promote intrinsic motivation, psychological well-being, and sustained engagement.

### The three psychological needs

**Autonomy**: People want to feel in control of their actions and decisions.

**Design applications**:
- Provide meaningful choices, not just the illusion of options
- Allow users to customize their experience
- Explain *why* something is recommended, not just what
- Let users opt out of features like notifications or gamification
- Support different paths to the same goal

**Research finding**: Digital tools designed to support autonomy enable self-paced, self-directed learning experiences and facilitate sustained behavior change by helping users internalize target behaviors rather than just comply.

**Competence**: People want to feel capable and effective.

**Design applications**:
- Provide clear, immediate feedback on actions
- Create achievable challenges with visible progress
- Celebrate milestones and accomplishments authentically
- Offer scaffolding—support that gradually reduces as skill increases
- Show progress toward goals visually

**Research finding**: Digital tools supporting competence needs play a pivotal role in facilitating self-regulation. Studies show that clear feedback and visible progress significantly improve learning engagement and task completion.

**Relatedness**: People want connection and belonging.

**Design applications**:
- Support social features without forcing them
- Enable collaboration and shared goals
- Create spaces for community without requiring participation
- Show how users contribute to something larger
- Foster genuine human connection, not artificial engagement metrics

**Research finding**: Digital tools designed to promote social connections through peer networks can enhance emotion regulation by supporting users' need for relatedness, particularly in educational and health contexts.

### Intrinsic vs. extrinsic motivation

**Intrinsic motivation**: Doing something because it's inherently interesting or enjoyable
- More sustainable long-term
- Leads to deeper engagement
- Supports learning and creativity
- Resistant to external pressures

**Extrinsic motivation**: Doing something to gain rewards or avoid punishment
- Effective for short-term compliance
- Can undermine intrinsic motivation if overused
- Works for tasks that aren't inherently interesting
- Requires continued external reinforcement

**Critical finding**: Extrinsic rewards (badges, points, prizes) can actually **undermine intrinsic motivation** over time through the "overjustification effect." People who were once motivated by interest alone can start doing the activity only for the reward.

**Design implication**: Use extrinsic motivators (like badges or points) sparingly and thoughtfully. Focus on supporting autonomy, competence, and relatedness to create genuine, lasting engagement.

## Gamification: Promises and pitfalls

Gamification—applying game design elements to non-game contexts—can enhance engagement when done well. But it often relies on extrinsic motivators that create short-term spikes while undermining long-term intrinsic motivation.

### Effective gamification (White Hat)

**White Hat gamification** aims to enhance user experiences by aligning with core motives, emphasizing user empowerment and cultivating a sense of meaning, accomplishment, or connectedness.

**Effective elements**:
- **Progress visualization**: Clear feedback on advancement
- **Meaningful challenges**: Tasks that match skill level (flow state)
- **Mastery**: Opportunities to develop competence
- **Social connection**: Collaboration and shared goals
- **Autonomy support**: Player choice and agency

**Example**: Duolingo's streak feature works because it supports competence (showing progress), autonomy (users choose when to practice), and relatedness (friendly owl character provides social-emotional connection).

### Problematic gamification (Black Hat)

**Black Hat gamification** uses manipulative techniques to create engagement through anxiety, fear of missing out (FOMO), or social pressure.

**Problematic elements**:
- **Artificial scarcity**: "Only 2 spots left!" when this isn't true
- **Loss aversion manipulation**: "You'll lose your streak!" as primary motivator
- **Social pressure**: Forced sharing or public comparison
- **Endless optimization**: Systems designed to be addictive, not valuable
- **Pay-to-win mechanics**: Requiring money to remove frustration

**Research finding**: Over-reliance on incentive systems may reduce students' intrinsic motivation to engage in activities for their own sake, and engagement tends to decline over time as the novelty of gamification diminishes.

### Design guidelines for ethical gamification

- Blend intrinsic and extrinsic motivators, favoring intrinsic
- Support autonomy (let users opt out or customize)
- Provide genuine value, not just engagement metrics
- Avoid manipulative scarcity or social pressure
- Design for long-term well-being, not short-term addiction
- Test whether users still engage when rewards are removed

## Habit formation and behavior loops

Habits are behaviors that become automatic through repetition in consistent contexts. Understanding habit formation helps designers create products that support positive routines without exploitation.

### The habit loop

Habits consist of three components:

**Cue** (trigger):
- Environmental prompt or internal feeling
- Initiates the routine
- Example: Phone notification, specific time of day, emotional state

**Routine** (behavior):
- The action enacted in response to the cue
- Can be physical, mental, or emotional
- Example: Opening an app, checking messages, scrolling feed

**Reward**:
- The outcome that reinforces the behavior
- Can be immediate (dopamine hit) or delayed (accomplishment)
- Strengthens the cue-routine association

**Key finding**: Habit formation takes an average of **two months** (range: 4 days to nearly a year), not the commonly cited 21 days. Recent research analyzing 2,600+ participants found significant individual variability in how long habits take to form.

### Neuroscience of habits

As behaviors repeat in consistent contexts, brain activity gradually shifts from conscious processing (prefrontal cortex) to the basal ganglia, a region associated with automatic behaviors. This represents the transition from conscious to unconscious processing.

**Making habits is facilitated by**:
- Repetition in stable contexts
- Clear, consistent cues
- Immediate reinforcement (rewards)
- Disengagement of goal-directed processes (automation)
- Starting small (low friction)

**Breaking habits requires**:
- Disrupting the cue (changing context)
- Replacing the routine (not just stopping)
- Finding alternative rewards
- Re-engaging conscious processing

### Digital behavior change interventions

A 2024 systematic review identified the most applied behavior change techniques in digital products:
1. **Self-monitoring of behavior**: Tracking progress
2. **Goal setting**: Clear, achievable targets
3. **Prompts and cues**: Well-timed reminders

**Design strategies** fall into two categories:

**Target-mediated**:
- Generalization: Techniques that work across contexts
- Personalization: Adapting to individual users

**Technology-mediated**:
- Explicitness: Clear, visible interventions
- Implicitness: Subtle environmental cues

## Ethical persuasive design

Persuasive technology focuses on designing systems that influence attitudes and behaviors through informed persuasion—not coercion or deception. The line between ethical persuasion and manipulation is critical but often blurred.

### Ethical principles

**Transparency**: Users should understand how and why they're being influenced
- Clearly explain recommendations
- Don't hide persuasive intent
- Make algorithms and processes visible

**Autonomy**: Users should maintain control and choice
- Provide opt-outs for all persuasive features
- Support users' own goals, not just business metrics
- Allow customization of persuasive elements

**Beneficence**: Design should genuinely help users
- Prioritize user well-being over engagement metrics
- Test whether features serve users or exploit them
- Design for long-term value, not short-term addiction

**Non-maleficence**: Do no harm
- Avoid manipulative dark patterns
- Don't exploit cognitive biases for profit
- Consider vulnerable populations

### Dark patterns: Regulatory shift

Dark patterns are deceptive design practices that trick users into actions they didn't intend. Recent regulatory developments have made these explicitly illegal in many jurisdictions.

**Major enforcement actions (2024)**:
- **FTC fined Amazon** for designing a complex and misleading Prime cancellation process
- **EU Digital Services Act (DSA)** expressly banned dark patterns for the first time
- **ICPEN and GPEN study** found 75.7% of 642 companies used at least one dark pattern, with 66.8% using two or more

**Commonly banned dark patterns**:
- **Forced continuity**: Making cancellation harder than sign-up
- **Confirm shaming**: Guilt-tripping users who decline ("No, I don't want to save money")
- **Hidden costs**: Revealing fees only at checkout
- **Bait and switch**: Advertising one thing, delivering another
- **Disguised ads**: Ads designed to look like content
- **Trick questions**: Confusing wording in consent flows
- **Sneak into basket**: Adding items without user action

**2025 ethical design guidelines**:
- Canceling should be as simple as signing up
- Clear opt-ins, transparent data policies
- Easy ways for users to manage preferences
- Develop and enforce ethical design guidelines across teams
- Provide alternatives for achieving business goals ethically

### Testing for ethical design

Ask these questions about any persuasive feature:

- [ ] **Transparency**: Would users feel deceived if they knew how this works?
- [ ] **Autonomy**: Can users easily opt out or customize this?
- [ ] **Beneficence**: Does this genuinely help users achieve their goals?
- [ ] **Time scale**: Does this benefit users long-term, or just boost short-term metrics?
- [ ] **Vulnerable users**: Could this exploit people in vulnerable states?
- [ ] **Honest marketing**: Does the experience match what we promised?

If you answer "no" or "maybe" to any of these, reconsider the design.

## Practical implementation guidelines

### When designing for motivation

**For low motivation, high ability tasks**:
- Use **Sparks**: Highlight benefits, create interest
- Show social proof (others doing it)
- Emphasize ease and speed
- **Caution**: Avoid false urgency or manipulative scarcity

**For high motivation, low ability tasks**:
- Use **Facilitators**: Reduce friction, simplify steps
- Remove unnecessary fields or decisions
- Provide clear next actions
- Offer help at points of difficulty
- **Focus**: Genuine simplification, not removal of safeguards

**For high motivation, high ability tasks**:
- Use **Signals**: Simple reminders
- Provide timely, unobtrusive prompts
- Get out of the user's way
- **Minimal**: Don't over-design what's already working

### When designing for sustained engagement

**Support autonomy**:
- Provide 11 design suggestions from recent research
- Allow customization and control
- Explain recommendations transparently
- Let users set their own goals

**Support competence**:
- Provide 22 design suggestions from recent research
- Offer clear, immediate feedback
- Show progress visually
- Create achievable challenges
- Celebrate genuine accomplishments

**Support relatedness**:
- Provide 17 design suggestions from recent research
- Enable social connection without forcing it
- Create spaces for community
- Show contribution to shared goals

### When implementing gamification

**Start with user goals**:
- What are users trying to accomplish?
- How can game elements support (not replace) intrinsic motivation?
- Are you designing for engagement or genuine value?

**Design with SDT principles**:
- Autonomy: Can users customize or opt out?
- Competence: Do challenges match skill levels?
- Relatedness: Does it foster genuine connection?

**Test sustainability**:
- Do users still engage when extrinsic rewards are removed?
- Does engagement increase or decline over time?
- Are users learning and growing, or just collecting points?

## Recent Research

### Fogg Behavior Model Applications

Research demonstrates continued application of the Fogg Behavior Model across diverse domains. Over **1,200 academic publications** reference the model, with recent studies showing:

- A 2025 [standardized scale development for energy-saving behaviors](https://www.sciencedirect.com/science/article/abs/pii/S0378778825007558) applied FBM to assess motivation and ability variables among building occupants
- A 2025 cybersecurity study found participants trained using FBM were **2.65x more likely** to adopt recommended security practices
- Early childhood apps research applied FBM to code 132 apps for persuasive features across motivation, ability, and prompt components

### Self-Determination Theory in Digital Contexts

Recent SDT research emphasizes digital tools' potential to support psychological needs:

**Education**: [Digital learning environments study](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2025.1545980/full) (2025) found that students perceive digital tools as effective in supporting autonomy and competence, enabling self-paced, self-directed learning experiences.

**Online communities**: [Research published in Scientific Reports](https://www.nature.com/articles/s41598-024-74878-4) (2024) found cognitive presence, social presence, and teaching presence significantly associated with autonomy, competence, and perceived learning.

**Behavior change technology**: A comprehensive review identified **50 design suggestions** across SDT needs: 11 for autonomy, 22 for competence, and 17 for relatedness. However, [research published in Interacting with Computers](https://academic.oup.com/iwc/advance-article/doi/10.1093/iwc/iwae040/7760010) found that behavior change technologies tend to utilize SDT more for making technology engaging rather than helping users internalize target behaviors.

**eHealth for older adults**: A 2024 [JMIR Aging study](https://aging.jmir.org/2024/1/e56923) found older adults adopt eHealth systems to build autonomy, competence, and relatedness, with navigability, interactivity, and customizability spurring feelings of self-determination.

### Gamification and Intrinsic Motivation

Recent research highlights both benefits and risks of gamification:

**Effectiveness**: White Hat gamification that supports autonomy and competence can facilitate transitions from extrinsic to intrinsic motivation through design elements aligned with Self-Determination Theory.

**Risks**: Over-reliance on incentive systems may reduce intrinsic motivation to engage for its own sake, and engagement tends to decline over time as novelty diminishes.

**2025 perspective**: [Gamification in product design](https://arounda.agency/blog/gamification-in-product-design-in-2024-ui-ux) emerges as a transformative strategy when it emphasizes user empowerment and cultivates meaning, accomplishment, or connectedness—but requires careful ethical consideration.

### Habit Formation Timelines

A comprehensive 2025 [systematic review analyzing 2,600+ participants](https://journalwjarr.com/sites/default/files/fulltext_pdf/WJARR-2025-1333.pdf) across 20 studies debunked the 21-day myth, finding:
- Habit formation starts around **two months on average**
- Significant variability ranging from **4 days to nearly a year**
- Small, incremental changes most effective for sustainable behavioral change

**Leadership application**: A global technology firm's 2024 habit-based leadership program showed after 12 months:
- 27% higher team engagement scores
- 34% improvement in strategic decision quality
- 41% better talent retention
- 23% higher innovation metrics

### Digital Behavior Change Interventions

A 2024 [systematic review published in JMIR](https://www.jmir.org/2024/1/e54375/) identified:
- Most applied techniques: self-monitoring, goal setting, prompts/cues
- 32 design strategies categorized into target-mediated (generalization, personalization) and technology-mediated (explicitness, implicitness) interactions

### Ethical Design and Dark Patterns

**Regulatory enforcement (2024)**: [FTC enforcement actions](https://medium.com/design-bootcamp/dark-patterns-in-2025-predictions-and-practices-for-ethical-design-cbd1a5db8d80) and EU Digital Services Act implementation mark a significant shift, with 75.7% of companies found using at least one dark pattern.

**Research findings**: A March 2025 [systematic literature review on computational persuasion technology](https://www.sciencedirect.com/science/article/pii/S2451958824002100) found that autonomy, manipulation, and responsibility are under-explored ethical concerns, and 60% of surveyed CPT studies only developed at a conceptual level without large-scale testing.

**CHI 2024**: [Beyond Dark Patterns: A Concept-Based Framework](https://dl.acm.org/doi/10.1145/3613904.3642781) presents a concept-based framework for ethical software design.

## Impact of motivation-informed design

Well-designed motivation systems enhance user experience by:
- **Supporting genuine goals** users have set for themselves
- **Reducing friction** for valued behaviors (2.65x adoption in cybersecurity study)
- **Creating sustainable habits** that persist beyond extrinsic rewards
- **Fostering autonomy, competence, and relatedness** leading to intrinsic motivation
- **Building long-term trust** through transparency and ethical practices

Poorly designed motivation systems harm users by:
- **Exploiting cognitive biases** for short-term engagement (75.7% of sites use dark patterns)
- **Undermining intrinsic motivation** through over-reliance on extrinsic rewards
- **Creating addictive behaviors** optimized for metrics, not well-being
- **Violating autonomy** through deceptive or coercive design
- **Causing regulatory penalties** as enforcement increases (2024 FTC actions)

## References

**Foundational Work:**
- Fogg, BJ — Fogg Behavior Model: https://behaviormodel.org/
- Fogg Behavior Model — Stanford Behavior Design Lab: https://behaviordesign.stanford.edu/resources/fogg-behavior-model
- Ryan & Deci (2000) — Self-Determination Theory: https://doi.org/10.1037/0003-066X.55.1.68
- Deci, E. L., & Ryan, R. M. (2008) — Self-Determination Theory: A Macrotheory of Human Motivation

**Recent Research:**
- [Standardized scale development for FBM in energy-saving behavior](https://www.sciencedirect.com/science/article/abs/pii/S0378778825007558) (2025)
- [Self-determination theory in e-learning](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2025.1545980/full) — Frontiers in Psychology (2025)
- [Self-determination and perceived learning in online communities](https://www.nature.com/articles/s41598-024-74878-4) — Scientific Reports (2024)
- [Designing for Sustained Motivation: SDT in Behaviour Change Technologies](https://academic.oup.com/iwc/advance-article/doi/10.1093/iwc/iwae040/7760010) — Interacting with Computers (2024)
- [Habit formation systematic review](https://journalwjarr.com/sites/default/files/fulltext_pdf/WJARR-2025-1333.pdf) (2025)
- [Digital Behavior Change Intervention Designs for Habit Formation](https://www.jmir.org/2024/1/e54375/) — JMIR (2024)
- [Computational persuasion technologies and ethical implications](https://www.sciencedirect.com/science/article/pii/S2451958824002100) (March 2025)
- [Beyond Dark Patterns: A Concept-Based Framework for Ethical Software Design](https://dl.acm.org/doi/10.1145/3613904.3642781) — CHI 2024

**Practical Resources:**
- [Gamification in Product Design in 2025](https://arounda.agency/blog/gamification-in-product-design-in-2024-ui-ux)
- [Dark Patterns in 2025: Predictions and Practices for Ethical Design](https://medium.com/design-bootcamp/dark-patterns-in-2025-predictions-and-practices-for-ethical-design-cbd1a5db8d80)
- [The Ethical Use of Persuasive Technology](https://behaviordesign.stanford.edu/ethical-use-persuasive-technology) — Stanford Behavior Design Lab
- Eyal, N. — Hooked: How to Build Habit-Forming Products: https://www.nirandfar.com/hooked/

**Conferences:**
- Persuasive Technology 2024 — Wollongong, Australia (April 10-12, 2024)
- Persuasive Technology 2025 — Limassol, Cyprus (May 5-7, 2025)

---

## See Also

- [Cognitive Load](/cognition/cognitive-load/) — How motivation relates to mental effort
- [Attention & Focus](/cognition/attention-focus/) — Directing attention through motivation
- [Confusion](/cognition/confusion/) — When poorly designed prompts create confusion
- [Error Types](/decision-making-errors/error-types/) — How motivation affects error rates
- [Biases & Heuristics](/decision-making-errors/biases-heuristics/) — Cognitive biases in motivation and decision-making
