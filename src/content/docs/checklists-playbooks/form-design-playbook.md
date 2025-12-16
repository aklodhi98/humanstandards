---
title: Form Design Playbook
description: A practical, end-to-end guide to scope, design, validate, and ship accessible, high-converting forms.
---
## Scope the form

- Define the job to be done and the minimum information needed to complete it.
- Remove non-essential fields; ask only what you need now.
- Map privacy/legal requirements; identify optional vs required.

## Structure & flow

- Group related fields; one topic per group or step.
- Order by user mental model: identity → details → confirmation.
- Prefer multi-step for long forms; show progress with clear labels.

## Field design

- Always use visible labels; avoid placeholder-as-label.
- Provide descriptions for tricky fields; keep labels concise.
- Set type/inputmode/autocomplete for each field.
- Use appropriate controls (select vs radio vs autocomplete) based on options count and discoverability.

## Defaults & helpers

- Provide safe defaults when possible.
- Use examples and format hints inline (e.g., DD/MM/YYYY).
- Show live previews for formatted inputs (e.g., credit card, phone).

## Validation

- Validate on blur and on submit; never only on submit.
- Explain what went wrong and how to fix it; focus the first error.
- Summarize errors at the top with anchored links.
- Don’t block typing with formatting; normalize on submit.

## Accessibility

- Label every control; associate help/error text via aria-describedby.
- Ensure a clear focus order and visible focus styles.
- Provide 3:1 contrast for inputs and 4.5:1 for text.
- Ensure keyboard-only completion is possible.

## Security & trust

- Indicate why sensitive data is needed; link to policy.
- Use masked fields where appropriate; allow reveal for passwords.
- Autosave drafts; warn before losing data.

## Review & confirmation

- Provide a readable review step; allow edits before final submit.
- Use optimistic UI where safe; provide undo where possible.
- Send confirmations with a receipt of submitted data and next steps.

## Metrics & iteration

- Track step drop-off, field-level abandon, time-to-complete, error rates.
- A/B test field removals, grouping, progress indicators, and copy.
- Review support tickets to prioritize fixes.

## Implementation checklist

- Labels associated; hints and errors tied via IDs.
- Input types and autocomplete tokens set.
- Keyboard and screen reader flows verified.
- Client + server validation aligned; error messages clear.
- Resilient to network issues; submissions idempotent.
