# Frozen Human Standards Context

## Keyboard Selection and Focus Completion Contract

Use this contract when an interface includes single-select cards, radio groups,
appointment or time choices, a multi-step flow, substantial dynamic content
replacement, or a dialog. Retrieve it before implementation, then exercise it
in the rendered interface before handoff.

### Implementation contract

1. **Prefer native controls.** Use `<button>`, `<a>`, `<input type="radio">`,
   `<input type="checkbox">`, `<fieldset>`, and `<legend>` before creating a
   custom composite widget.
2. **Give one-of-many choices native-equivalent behaviour.** Native radios in
   one named group must expose a group label, visible option labels, arrow-key
   movement that updates selection, Space selection where applicable, and one
   understandable selected value. A visual card may wrap or label the input;
   it must not replace the input semantics.
3. **Match the complete pattern when a custom widget is necessary.** A custom
   radio group needs `radiogroup` and `radio` roles, programmatic names,
   `aria-checked`, roving `tabindex`, arrow-key movement that updates the checked
   option, Space selection, and a single active option. Partial ARIA is not an
   acceptable substitute.
4. **Keep focus visible and ordered.** Do not remove the focus indicator. Tab
   order must follow the rendered task order, and selected styling must not hide
   the focused control.
5. **Do not confuse focus, selection, and commitment.** Tabbing into or past a
   choice group must not silently select or submit. Within a radio group,
   arrow-key focus movement also changes the selected option; that expected
   selection must not silently commit or submit the choice. If selecting an
   option intentionally advances the flow, make that consequence clear before
   activation and place focus in the resulting content after the transition
   completes.
6. **Define a destination for substantial transitions.** When a page or step is
   replaced, focus the new heading, main region, error summary, or confirmation
   status as appropriate and ensure it is perceivable in the viewport. Use a
   live region instead of moving focus for minor inline updates.
7. **Restore focus after transient interfaces.** Move focus into an opened
   dialog, keep keyboard focus within a modal dialog, support Escape where
   dismissal is allowed, and return focus to the trigger or a documented
   logical fallback when it closes.

### Required pre-handoff exercise

Exercise the rendered interface without a pointer at both a supported wide
viewport and a supported narrow viewport.

| Check | Required evidence |
|------|-------------------|
| Reach and order | Tab and Shift+Tab reach every action in the expected task order; record any intentional exception. |
| Selection group | Arrow keys move through the related choices, Space selects where applicable, and the selected value changes without losing the group context. |
| Visible focus | Identify the active element and visually confirm its focus indicator in default, selected, error, and disabled-adjacent states. |
| Activation | Enter and Space activate controls according to their native or documented pattern without duplicate submission. |
| Step transition | Record the active element before and after the transition and confirm the new heading, main region, error summary, or status is perceivable. |
| Dialog lifecycle | Record initial focus, Tab containment, Escape behaviour, and the element focused after close. |

For each failed or blocked check, report the state as failed or missing. Do not
convert an unreachable state into a pass. Static source inspection, an automated
accessibility scan, or a statement that the controls are semantic does not by
itself satisfy this exercise.

### Evidence boundary

Passing this contract demonstrates only the exercised keyboard and focus
behaviour. It does not establish WCAG conformance, screen-reader usability,
visual quality, or suitability for every input method. Do not add custom ARIA
solely to satisfy the checklist, and do not move focus after every content
update.
