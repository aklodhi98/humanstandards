---
title: Working Memory
description: Practical limits mean UIs must chunk information and externalize memory.
---

Working memory is your mental scratch pad — the space where you hold and manipulate information right now. It's limited, fragile, and easily overwhelmed. Interfaces that ignore these limits force users to work harder than they should.

## The limits

### Capacity

Miller's famous "7 ± 2" items has been revised down by modern research. **3-4 chunks** is a more realistic estimate for novel information. And those chunks need to be meaningful groupings, not random items.

### Duration

Information in working memory decays quickly — within 15-30 seconds without rehearsal. If users have to remember something from page to page, they'll forget.

### Vulnerability

Working memory is disrupted by:
- **Interruptions**: Notifications, popups, context switches
- **Stress**: Anxiety shrinks effective capacity
- **Multitasking**: Dividing attention reduces available capacity
- **Similarity**: Similar-looking or similar-sounding items interfere with each other

## Design for limited memory

### Recognition over recall

Don't make users remember things — show them options they can recognize:

- Dropdown menus instead of text fields
- Recently used items in prominent positions
- Autocomplete for common inputs
- Visual history ("You were looking at...")

### Persistent context

Keep important information visible:

- Cart item count visible in header
- Current step in multi-step processes
- Selected filters visible on results page
- "Editing: filename.doc" in the title bar

### Chunk information

Group related items together. Phone numbers as XXX-XXX-XXXX, not XXXXXXXXXX. Card numbers in groups of four. Long lists broken into categories.

### Reduce demands

- Pre-fill fields you already know
- Provide sensible defaults
- Auto-save drafts and progress
- Let users compare options side-by-side instead of remembering

### One thing at a time

Don't ask users to hold information from one screen to use on another. If they need to compare plans, show plans side-by-side. If they need to reference instructions, keep them visible.

## Externalize memory

Move the burden from the user's head to the interface:

- **Undo stacks**: Let users explore without remembering original state
- **Draft saving**: Don't lose work if users leave
- **Breadcrumbs**: Show how they got here
- **Activity history**: What did I do last time?
- **Notes and annotations**: Let users attach their own memory

## When users are stressed

Under stress, working memory capacity drops further. For high-stakes interactions (financial, medical, emergency):

- Simplify drastically
- Provide more defaults
- Allow more time
- Show explicit confirmations
- Offer recovery paths

## References

- Cowan (2001) — The magical number 4: https://doi.org/10.1016/S1364-6613(00)01591-6
- NN/g — Short-Term Memory and Web Usability: https://www.nngroup.com/articles/short-term-memory-and-web-usability/
- Baddeley (2012) — Working Memory: Theories, Models, and Controversies: https://doi.org/10.1146/annurev-psych-120710-100422
