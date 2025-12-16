---
title: Error Types (Slips vs Mistakes)
description: Slips are execution errors; mistakes are decision errors — design for both.
---

People make errors. That's not a flaw in users — it's a feature of being human. The question isn't how to eliminate errors, but how to design systems that prevent the most harmful ones and make recovery easy when they happen.

Don Norman identified two fundamentally different types of errors, and they need different solutions.

## Slips: I meant to do X but did Y

Slips happen when someone intends to do the right thing but executes it wrong. Their mental model is correct; their fingers (or attention) just slipped.

**Common causes:**
- Similar-looking buttons or options
- Muscle memory kicking in at the wrong time
- Distractions mid-task
- Interfaces that changed since last use

**Examples:**
- Hitting "Reply All" instead of "Reply"
- Typing your old password after changing it
- Clicking the wrong item in a dense list
- Closing a tab when you meant to open a new one

**Design solutions:**
- Make destructive actions visually distinct and harder to trigger
- Add confirmation steps for irreversible actions
- Provide generous undo windows
- Use constraints to prevent impossible actions (disable invalid buttons)
- Add friction to high-risk operations

## Mistakes: I meant to do X, but X was wrong

Mistakes happen when someone's mental model is flawed. They do exactly what they intended — it's just that their intention was based on a misunderstanding.

**Common causes:**
- Unclear terminology or labels
- Hidden system state
- Misleading patterns or affordances
- Incomplete information

**Examples:**
- Deleting production data, thinking you're in a test environment
- Setting the wrong timezone because the UI didn't clarify
- Choosing the wrong shipping option due to confusing pricing
- Filling out a form incorrectly because fields were ambiguous

**Design solutions:**
- Make system state visible ("You are editing: PRODUCTION")
- Use clear, consistent language
- Show previews and confirmations that reveal consequences
- Break complex decisions into stages
- Provide contextual help at decision points

## The overlap

Sometimes an error is both — a slip triggers a mistake, or a small misunderstanding leads to a cascade of wrong clicks. Good design addresses both layers: reduce opportunities for slips *and* correct mental models.

## Error-tolerant design principles

1. **Prevent when possible**: Constraints, defaults, and visibility
2. **Detect when it happens**: Validation, anomaly detection, sanity checks
3. **Recover gracefully**: Undo, autosave, drafts, reversible actions
4. **Learn from patterns**: Track error rates, improve over time

## References

- Norman, D. — The Design of Everyday Things (slips vs mistakes): https://mitpress.mit.edu/9780262525671/the-design-of-everyday-things/
- Reason, J. — Human Error: https://global.oup.com/academic/product/human-error-9780521314190
- Nielsen Norman Group — Preventing User Errors: https://www.nngroup.com/articles/slips/
