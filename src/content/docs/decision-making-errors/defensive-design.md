---
title: Defensive Design (Error Prevention & Recovery)
description: "Build guardrails: validate early, allow undo, and recover state after failure."
---

Defensive design assumes things will go wrong — network failures, user mistakes, unexpected input, edge cases nobody predicted. Instead of hoping for the best, build systems that catch problems early, fail gracefully, and recover quickly.

## Prevention: stop errors before they happen

### Validate early and inline

Don't wait until form submission to reveal problems. Validate as users type or when they leave a field:

- Check email format on blur
- Show password strength as they type
- Confirm username availability before submission
- Format inputs automatically (phone numbers, credit cards)

But be careful — don't be so aggressive that you validate incomplete input ("That's not a valid email!" when they've typed "j").

### Constrain impossible actions

If a button shouldn't be clicked, disable it. If a field only accepts numbers, reject letters. Make invalid states impossible rather than just warning about them.

### Use sensible defaults

Pre-fill fields with the most likely values. Default to safer options. Reduce the number of decisions users need to make.

### Show state and consequences

Before users act, show them what will happen:

- "This will delete 47 files"
- "You are editing: PRODUCTION DATABASE"
- Preview before send

## Recovery: make failures survivable

### Provide undo generously

Gmail's "Undo send" is a masterclass in defensive design. Where possible, make actions reversible:

- Soft delete before hard delete
- Draft states before final submission
- Undo windows after destructive actions

### Autosave everything

Don't let users lose work. Save drafts continuously, preserve form state across sessions, and warn before closing with unsaved changes.

### Design error messages that help

Bad: "Error 500"
Good: "We couldn't save your changes. Your work is safe — try again in a moment."

Explain what happened, what it means, and what to do next.

## Technical resilience

### Idempotent actions

Design actions that can be safely retried. If a user clicks "Submit" twice, or the network retries a request, the same result should happen — not a duplicate order.

### Retry with backoff

When services fail, retry after a delay. Use exponential backoff to avoid hammering a struggling system. Show users progress: "Reconnecting..."

### Graceful degradation

When part of the system fails, the rest should keep working. If recommendations can't load, show the page without them. If an image fails, show alt text.

## Error handling checklist

- Every user action has a success and failure state
- Failures explain what happened and what to do
- Destructive actions require confirmation
- Important data is auto-saved
- Actions can be retried safely
- Users can recover from mistakes with undo

## References

- Nielsen, J. — Error Prevention Heuristic: https://www.nngroup.com/articles/ten-usability-heuristics/
- Microsoft — Cloud Design Patterns (Retry, Circuit Breaker): https://learn.microsoft.com/en-us/azure/architecture/patterns/
- Google SRE — Handling Overload: https://sre.google/sre-book/handling-overload/
