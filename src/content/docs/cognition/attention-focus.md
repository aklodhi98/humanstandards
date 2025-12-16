---
title: Attention & Focus
description: Guide attention with hierarchy, reduce interruptions, and preserve flow.
---

Human attention is limited, selective, and easily disrupted. Your interface competes for attention with other apps, the environment, and users' own thoughts. Design that respects this scarcity helps users accomplish their goals without fighting for their focus.

## How attention works

### Selective attention

We can only attend to a few things at once. When too many elements compete for attention, important things get missed and cognitive load increases.

### Change blindness

People often fail to notice changes, even significant ones, especially during eye movements or attention shifts. Don't assume users will see something just because it changed.

### Banner blindness

Users have learned to ignore anything that looks like an ad. Important information styled like promotional content gets filtered out.

## Directing attention

### Visual hierarchy

Guide users through your interface with clear visual priority:

- **Size**: Larger elements attract more attention
- **Contrast**: High contrast draws the eye
- **Color**: Saturated colors stand out from neutrals
- **Position**: Top-left dominates in LTR cultures; center for key actions
- **Motion**: Movement captures attention (use sparingly)

Make sure only one element "wins" at a time. Competing focal points create confusion.

### Whitespace

Empty space creates breathing room and directs focus to content. Crowded interfaces force users to work harder to find what matters.

### Progressive disclosure

Don't show everything at once. Start with essentials, reveal details on demand. This focuses attention on the current step.

## Protecting flow

### Minimize interruptions

Interruptions are costly. Research shows it takes ~23 minutes to fully refocus after a distraction. Protect user flow:

- Batch non-urgent notifications
- Provide do-not-disturb modes
- Let users control notification frequency
- Don't interrupt for low-priority information

### Preserve context

When users navigate away and return, maintain their place:

- Remember scroll position
- Save form state
- Keep selection and focus
- Show "where you left off"

### Keyboard focus management

For keyboard users, focus position is their place in the interface:

- Never move focus unexpectedly
- Return focus to trigger element after dialogs close
- Make focus visible at all times
- Keep focus within modal dialogs (focus trap)

## Attention anti-patterns

- **Autoplay videos**: Force attention and disturb users
- **Popups and modals**: Interrupt flow for non-critical messages
- **Notification spam**: Train users to ignore everything
- **Competing animations**: Create chaos, not clarity
- **Hidden important info**: Burying essentials in visual noise

## References

- NN/g — Banner Blindness Revisited: https://www.nngroup.com/articles/banner-blindness-old-and-new-findings/
- WAI-ARIA — Focus Management: https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/
- Gloria Mark — The Cost of Interrupted Work: https://www.ics.uci.edu/~gmark/chi08-mark.pdf
