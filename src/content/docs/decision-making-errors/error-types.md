---
title: Error Types (Slips, Lapses & Mistakes)
description: Understanding the psychology of human error—slips, lapses, and mistakes require different design solutions.
---

People make errors. That's not a flaw in users—it's a feature of being human. The question isn't how to eliminate errors, but how to design systems that prevent the most harmful ones and make recovery easy when they happen.

Don Norman and James Reason identified fundamentally different types of errors, and they need different solutions. Slips and lapses are execution problems—the goal is correct but something goes wrong in carrying it out. Mistakes are planning problems—the goal itself is wrong due to misunderstanding. Fixing slips requires better interface mechanics; fixing mistakes requires better mental models.

## The three types of human error

### Slips: Right goal, wrong action

Slips are unconscious errors caused by inattention. The user intends to do the right thing but executes it wrong—their mental model is correct; their fingers (or attention) just slipped.

**Psychological mechanism**: Slips happen when skill-based behavior—automated, habitual actions—misfires. The user is on autopilot, and takes the wrong action in service of a reasonable goal.

**Common causes**:
- Similar-looking buttons or options placed close together
- Muscle memory kicking in at the wrong time
- Distraction or interruption mid-task
- Interfaces that changed since last use
- Physical proximity of different functions
- Small or closely-spaced touch targets

**Examples**:
- Hitting "Reply All" instead of "Reply"
- Typing your old password after changing it
- Clicking the wrong item in a dense list
- Closing a tab when you meant to open a new one
- Pressing the wrong keyboard shortcut
- Tapping "Delete" instead of "Edit" on adjacent buttons

**Key insight**: Slips happen when users know what to do—they just did it wrong. The error is in execution, not understanding.

### Lapses: Memory failures

Lapses are failures of memory—forgetting the overall goal, forgetting where you are in a procedure, or forgetting to do something you intended to do.

**Psychological mechanism**: Lapses occur when attention is not focused on the task, often due to interruption, fatigue, or distraction. Unlike slips, lapses involve failing to complete an intended action sequence.

**Common causes**:
- Interruptions breaking the user's train of thought
- Fatigue reducing attention and recall
- Multi-step processes without state preservation
- Long delays between related actions
- Cognitive load from parallel tasks
- Stress reducing working memory capacity

**Examples**:
- Forgetting to save a document before closing
- Losing track of where you were in a multi-step form
- Forgetting what you were searching for after a distraction
- Failing to attach a file you mentioned in an email
- Forgetting to submit after filling out a form
- Losing context after switching between applications

**Key insight**: Lapses are harder to anticipate and prevent than slips because users may not be aware of their lack of focus. Design must compensate for the unreliability of human memory.

### Mistakes: Wrong goal, correct execution

Mistakes are conscious errors based on a mismatch between the user's mental model and the actual system. The user does exactly what they intended—it's just that their intention was based on a misunderstanding.

**Psychological mechanism**: Mistakes occur when users form incorrect goals due to flawed understanding of the system state, available options, or consequences of actions.

**Two subtypes of mistakes**:

**Rule-based mistakes**: Applying the wrong rule or procedure
- Using a familiar pattern in the wrong context
- Misapplying experience from similar systems
- Following outdated procedures

**Knowledge-based mistakes**: Reasoning errors in novel situations
- Incomplete information leading to wrong conclusions
- Misinterpreting feedback or system state
- Making incorrect assumptions

**Common causes**:
- Unclear terminology or labels
- Hidden or ambiguous system state
- Misleading patterns or affordances
- Incomplete information for decision-making
- Poor feedback about action consequences
- Interfaces that look similar but behave differently

**Examples**:
- Deleting production data, thinking you're in a test environment
- Setting the wrong timezone because the UI didn't clarify the current setting
- Choosing the wrong shipping option due to confusing pricing
- Filling out a form incorrectly because field labels were ambiguous
- Configuring settings incorrectly due to unclear terminology
- Selecting the wrong file version because naming was confusing

**Key insight**: Mistakes happen when users don't know what to do, or think they know but are wrong. The error is in planning, not execution.

## Designing to prevent slips

### Visual distinction

Make different actions visually different, especially when consequences differ significantly.

**Strategies**:
- Use distinct colors, shapes, and positions for destructive vs. constructive actions
- Separate high-risk actions from routine actions
- Use iconography consistently to reinforce meaning
- Make frequently-used actions visually prominent
- Place destructive actions away from common click paths

**Example**: "Delete" should look and feel different from "Save"—different color, different position, ideally requiring a distinct gesture or confirmation.

### Physical constraints

Prevent impossible or dangerous actions through interface constraints.

**Strategies**:
- Disable buttons when actions aren't valid
- Hide options that aren't applicable to current state
- Use form validation to prevent submission of invalid data
- Require deliberate gestures for dangerous actions (long press, swipe to confirm)
- Gray out unavailable options rather than showing errors after selection

### Friction for high-risk actions

Add appropriate friction to make dangerous actions harder to trigger accidentally.

**Strategies**:
- Confirmation dialogs for irreversible actions
- Type-to-confirm for critical operations ("Type DELETE to confirm")
- Time delays before destructive actions execute
- Two-step processes (select, then confirm)
- Different interaction patterns for dangerous vs. safe actions

**Calibrate carefully**: Too much friction for low-risk actions creates frustration. Reserve significant friction for truly high-consequence operations.

### Generous undo windows

Provide recovery time for slip correction.

**Strategies**:
- "Undo" available immediately after action
- Extended undo windows for important actions (Gmail's "Undo Send" for 30 seconds)
- Multi-level undo for complex workflows
- Soft delete with trash/archive before permanent removal
- Version history for documents and data

## Designing to prevent lapses

### State preservation

Protect users from losing progress due to interruptions or memory failures.

**Strategies**:
- Auto-save continuously, not just on explicit save
- Preserve draft state across sessions
- Show current state visibly ("Draft saved at 3:42 PM")
- Resume exactly where user left off after interruption
- Recover gracefully from connection loss or crashes

### Memory externalization

Remove requirements for users to remember information.

**Strategies**:
- Show progress indicators in multi-step processes ("Step 3 of 5")
- Display selected options persistently through flows
- Keep instructions visible while needed
- Provide breadcrumbs showing path taken
- Show reminders for incomplete actions ("You haven't submitted yet")

### Interruption recovery

Help users resume after distractions.

**Strategies**:
- Clearly show current state when returning to task
- Highlight where the user left off
- Summarize previous selections or inputs
- Provide "Continue where you left off" functionality
- Send reminders for abandoned flows

### Proactive prompts

Anticipate common lapses and provide preventive reminders.

**Strategies**:
- "Did you mean to attach a file?" when email mentions "attached"
- "Save before closing?" prompts
- Confirmation before navigating away from unsaved work
- Checklists for multi-step processes
- Completion indicators showing what's done and what remains

## Designing to prevent mistakes

### Make system state visible

Users can't make correct decisions if they don't know the current state.

**Strategies**:
- Clear environment indicators ("You are editing: PRODUCTION")
- Visible mode indicators (edit mode vs. view mode)
- Show current settings and their implications
- Display context clearly (which account, which project, which version)
- Use color coding for different environments or states

**Critical for high-stakes systems**: Production vs. staging vs. development environments should be unmistakably different.

### Clear, consistent language

Terminology must match user mental models, not system architecture.

**Strategies**:
- Use words users understand, not technical jargon
- Be specific about what actions do ("Delete permanently" vs. "Move to trash")
- Maintain consistent vocabulary throughout
- Explain unfamiliar terms in context
- Test terminology with real users

### Preview consequences

Show what will happen before it happens.

**Strategies**:
- Preview changes before applying
- Show "before and after" for transformations
- Explain implications of choices ("This will affect 47 files")
- Summarize order details before purchase
- Display what will be deleted before confirmation

### Break down complex decisions

Reduce cognitive load by structuring decisions appropriately.

**Strategies**:
- Progressive disclosure of options
- Wizard-style flows for complex processes
- Group related decisions together
- Provide sensible defaults for advanced options
- Allow users to review and change before final commitment

### Contextual help

Provide guidance at decision points.

**Strategies**:
- Inline help text for confusing fields
- Tooltips explaining options
- "Learn more" links for complex concepts
- Examples of correct input
- FAQ sections for common questions

## Error recovery: When prevention fails

### The recovery hierarchy

When errors happen, provide recovery options in this priority:

**1. Immediate undo**
- One-click reversal of the last action
- Available for a reasonable time window
- Works for all reversible actions

**2. Graceful error messages**
- Explain what went wrong in plain language
- Avoid technical jargon or error codes
- Suggest specific actions to fix the problem
- Don't blame the user

**3. Alternative paths**
- Suggest related actions that might help
- Provide search or navigation to find what they need
- Offer contact support as a last resort
- Save work so they can try again later

**4. State preservation**
- Don't lose user data on error
- Allow retry without re-entering information
- Maintain context even when flow is interrupted
- Auto-recover from transient failures

### Error message design

Research shows **61% of users** rate clear instructions for recovery as essential for good UX, and **75%** feel addressing functional errors is as important as usability issues.

**Effective error messages include**:
- What happened (in user terms)
- Why it happened (if helpful)
- What to do about it (specific steps)
- Alternative options if the primary path is blocked

**Example**:
- ❌ "Error 403: Access denied"
- ✅ "You don't have permission to edit this file. Ask the owner to share editing access, or view the read-only version."

### Undo implementation patterns

The **command pattern** is a common approach where each action is encapsulated as an object with `execute` and `unexecute` methods. Actions are pushed onto a stack, allowing sequential undo operations.

**Key considerations**:
- Multi-level undo for complex workflows
- Undo across sessions for important work
- Clear indication of what will be undone
- Redo functionality for accidental undos
- Keyboard shortcuts (Ctrl+Z, Ctrl+Y) and visible UI controls

## Measuring and learning from errors

### Error metrics

Track errors to identify patterns and prioritize improvements:

**Frequency metrics**:
- Error rate per task or flow
- Error rate by user segment
- Error clustering at specific points

**Impact metrics**:
- Task abandonment after errors
- Time to recovery
- Support requests related to errors
- User satisfaction after error experiences

**Recovery metrics**:
- Successful recovery rate
- Time between error and recovery
- Undo usage patterns
- Retry vs. abandon decisions

### Error analysis

Analyze errors to understand root causes:

**For slips**: Are there interface elements that are too similar, too close, or too easy to trigger accidentally?

**For lapses**: Are there flows that require too much memory, or fail to preserve state across interruptions?

**For mistakes**: Are there points where users consistently misunderstand the system, or make decisions with incomplete information?

### Continuous improvement

- Track error patterns over time
- Prioritize fixes by severity and frequency
- Test changes with users prone to specific errors
- Build error prevention into design processes
- Review support tickets for recurring error patterns

## Recent Research

### Error Prevention Hierarchy

[Nielsen Norman Group research](https://www.nngroup.com/articles/slips/) continues to emphasize prioritizing error prevention by impact: prevent high-cost errors first, then address smaller frustrations. For slips, focus on low-level interface solutions; for mistakes, improve the system's underlying structure and feedback.

### Memory-Burden Reduction

Research from [Interaction Design Foundation](https://www.interaction-design.org/literature/topics/human-error) emphasizes removing memory burdens: "Whenever possible, remove conditions that require users to keep information in their own memory while they move from one step to another in complex, multistep procedures. Instead, strive to display the contextual information that users need to complete a task."

### AI-Assisted Error Recovery

According to [2024 UX research](https://fastercapital.com/content/Designing-for-Effective-Error-Recovery-in-UI.html), AI has the potential to revolutionize error recovery through intelligent algorithms that analyze user behavior patterns, predict potential errors, and provide proactive solutions. AI-powered assistants can offer real-time guidance through error recovery processes.

### User Satisfaction and Error Handling

[Research on error feedback UX](https://www.pencilandpaper.io/articles/ux-pattern-analysis-error-feedback) found that with the right clarity and context, error messages can actually boost trust and satisfaction. The key is using errors as opportunities to provide helpful information about why the error occurred, its impact, and what users can do to rectify the situation.

### Error Prevention Integration

[2024 UX design principles research](https://www.uxdesigninstitute.com/blog/ux-design-principles/) emphasizes building user control and freedom by incorporating undo/redo functionality, providing cancel buttons, and clearly labeling alternative actions—giving users confidence to explore without fear of irreversible consequences.

### Slip Prevention Through Design

[Temple University course materials (2025)](https://community.mis.temple.edu/mis3506sec002spring2025/files/2025/01/MIS3506-Spring-2025-Slips-Mistakes-and-Usability.pdf) emphasize that avoiding slips means providing helpful constraints and good defaults, while preventing mistakes requires removing memory burdens, supporting undo, and warning users before potentially harmful actions.

## Implementation checklist

### Error-tolerant design audit

- [ ] **Slip prevention**: Distinct visual treatment for different actions
- [ ] **Confirmation dialogs**: Present for irreversible/high-impact actions
- [ ] **Undo availability**: Immediate undo for all reversible actions
- [ ] **Auto-save**: Work preserved continuously
- [ ] **State visibility**: Current system state clearly displayed
- [ ] **Clear language**: Terminology matches user mental models
- [ ] **Preview consequences**: Users can see impact before committing
- [ ] **Error messages**: Explain what happened and how to fix it
- [ ] **Memory support**: No cross-screen memory requirements
- [ ] **Error tracking**: Metrics in place to identify patterns

## References

**Foundational Work:**
- [Norman, D. — The Design of Everyday Things](https://mitpress.mit.edu/9780262525671/the-design-of-everyday-things/)
- [Reason, J. — Human Error](https://global.oup.com/academic/product/human-error-9780521314190)

**Research & Guidelines:**
- [Preventing User Errors: Avoiding Unconscious Slips](https://www.nngroup.com/articles/slips/) — NN/g
- [Preventing User Errors: Avoiding Conscious Mistakes](https://www.nngroup.com/articles/user-mistakes/) — NN/g
- [10 Usability Heuristics for User Interface Design](https://www.nngroup.com/articles/ten-usability-heuristics/) — NN/g

**Practical Resources:**
- [What is Human Error?](https://www.interaction-design.org/literature/topics/human-error) — IxDF
- [Error Message UX, Handling & Feedback](https://www.pencilandpaper.io/articles/ux-pattern-analysis-error-feedback) — Pencil & Paper
- [User Error: Prevention and Recovery in UX](https://www.zionandzion.com/user-error-prevention-and-recovery-in-ux/) — Zion & Zion
- [How to help people avoid and recover from errors](https://balsamiq.com/learn/articles/avoid-and-recover-from-errors/) — Balsamiq
- [Measuring Errors in the User Experience](https://measuringu.com/errors-ux/) — MeasuringU

---

## See Also

- [Defensive Design](/decision-making-errors/defensive-design/) — Systematic error prevention strategies
- [Biases & Heuristics](/decision-making-errors/biases-heuristics/) — Cognitive patterns that lead to mistakes
- [Confusion](/cognition/confusion/) — When unclear interfaces cause mistakes
- [Working Memory](/cognition/working-memory/) — Memory limitations that cause lapses
- [Stress & Cognitive Impact](/emotions-motivation/stress-cognitive-impact/) — How stress increases errors
