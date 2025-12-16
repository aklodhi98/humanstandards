---
title: Forms
description: Compose usable, accessible forms with progressive disclosure and strong validation.
---

Forms are where intention becomes action. They're also where users are most likely to give up, make mistakes, or lose trust. A well-designed form feels effortless; a poorly designed one feels like an interrogation.

For a detailed checklist, see the [Form Design Playbook](/checklists-playbooks/form-design-playbook/).

## Structure and flow

### Keep it short

Every field is friction. Ask only what you need right now — you can always collect more later. Audit your form: if a field is optional, consider removing it entirely.

### Group related fields

Chunk fields into logical sections: personal info, payment, shipping. Use visual groupings (whitespace, fieldsets) to signal structure. One topic per step in multi-step forms.

### Order by mental model

Users expect certain sequences. Name before email. Street before city. Match the order information naturally flows.

## Labels and help

### Always use visible labels

Placeholder text is not a label. It disappears when users start typing, leaving them wondering what they're supposed to enter. Real labels stay visible.

### Provide inline help

For tricky fields — like "security code" or "date format" — add hint text below the label. Don't hide it in tooltips; keep it visible.

### Use clear, concise language

"Email" not "Electronic Mail Address". "Password" not "Authentication Credential".

## Input types and behavior

### Set the right input type

Use `type="email"`, `type="tel"`, `type="number"` — mobile keyboards adapt, validation improves, and autofill works better.

### Enable autocomplete

Set `autocomplete` attributes so browsers can fill in names, addresses, and payment info. It's faster and reduces errors.

### Format inputs helpfully

For credit cards, phone numbers, and dates — format the display as users type. But don't block their typing; normalize on submission.

## Validation and errors

### Validate at the right time

- **On blur**: Catch simple errors (invalid email format) after the user leaves a field.
- **On submit**: Catch everything else and show a summary.
- **Never on keystroke**: Premature validation is frustrating ("That's not a valid email!" when they've typed "j@").

### Show errors clearly

- Mark invalid fields visually (border color, icon)
- Provide an error summary at the top with links to each error
- Explain what went wrong *and* how to fix it
- Focus the first error after submission

### Use `aria-describedby`

Associate error messages with fields programmatically so screen readers announce them.

## Accessibility essentials

- Every field has a visible `<label>` linked via `for`/`id`
- Required fields are marked (use `aria-required="true"` or visible asterisk)
- Errors use `aria-invalid="true"` and `aria-describedby`
- Focus moves logically; return focus after errors
- Forms work without JavaScript for critical paths

## References

- WAI-ARIA APG — Forms: https://www.w3.org/WAI/ARIA/apg/patterns/forms/
- GOV.UK Design System — Form patterns: https://design-system.service.gov.uk/patterns/
- Nielsen Norman Group — Form Design: https://www.nngroup.com/articles/web-form-design/
