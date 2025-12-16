---
title: Notifications & Feedback
description: Right-time the right level of feedback; allow undo when safe.
---

Feedback tells users what's happening, what happened, and what they should do next. Good feedback is timely, clear, and appropriately prominent. Bad feedback is either absent (leaving users wondering) or overwhelming (notification fatigue).

## Levels of feedback

Match the importance of the message to its visual weight:

### Inline / Contextual

Small, local feedback near the trigger. Best for:
- Field validation states
- Character counts
- Toggle confirmations

### Toasts / Snackbars

Brief, dismissible messages that appear and auto-disappear. Best for:
- Action confirmations ("Message sent")
- Non-critical status updates
- Undo opportunities ("Deleted. Undo?")

### Banners / Alerts

Persistent messages at the top of a page or section. Best for:
- System status (maintenance, errors)
- Important warnings
- Success states for major actions

### Modals / Dialogs

Full interruptions requiring user response. Reserve for:
- Destructive confirmations ("Delete all data?")
- Critical errors requiring immediate action
- Required decisions before proceeding

## Timing matters

### Immediate feedback

Actions should acknowledge instantly — even if the actual work takes time. Use optimistic UI patterns:
- Show "Message sent" immediately
- Update the UI before the server responds
- If the action fails, roll back and explain

### Avoid premature feedback

Don't show "Saving..." spinners for actions under 100ms. It makes the app feel slow. Set a threshold before showing loading states.

### Batch and throttle

If multiple events fire quickly, combine them. "3 items deleted" is better than three separate notifications.

## Accessibility

### Use ARIA live regions

For dynamic content that updates without page reload, use `aria-live` to announce changes to screen readers:

- `aria-live="polite"` — Announces after current speech finishes (most feedback)
- `aria-live="assertive"` — Interrupts immediately (urgent errors only)

### Don't rely on color alone

Pair red error borders with icons, text, and `aria-invalid`. Pair green success states with checkmarks and explicit text.

### Make toasts keyboard accessible

Users should be able to dismiss notifications with keyboard or pause auto-dismiss if they need more time.

## Undo patterns

Where possible, make actions reversible:

- **Time-limited undo**: "Undo" link that lasts 5–10 seconds
- **Soft delete**: Move to trash before permanent deletion
- **Confirmation dialogs**: Only for truly irreversible actions

Gmail's "Undo Send" is the gold standard — it gives control back to users without asking for confirmation every time.

## Common mistakes

- **Silent failures**: Something went wrong but the user doesn't know
- **Notification overload**: Too many toasts, banners, and alerts competing for attention
- **Unclear next steps**: "Error occurred" without explaining what to do
- **Permanent autoplay**: Notifications that can't be paused or dismissed

## References

- WAI-ARIA — Live Regions: https://www.w3.org/WAI/ARIA/apg/patterns/alert/
- Material Design — Snackbars: https://m3.material.io/components/snackbar/overview
- Nielsen Norman Group — Visibility of System Status: https://www.nngroup.com/articles/visibility-system-status/
