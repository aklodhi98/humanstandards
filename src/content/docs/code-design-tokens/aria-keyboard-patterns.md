---
title: ARIA & Keyboard Patterns
description: Roving tabindex, focus traps, roles/names/states, and common keybinds.
---

Custom components need to behave like their native counterparts. ARIA attributes tell assistive technologies what a component *is* and what state it's *in*. Keyboard patterns let users interact without a mouse. Together, they make custom UI accessible.

## The first rule of ARIA

Use native HTML elements when possible. A `<button>` is automatically accessible. A `<div onclick>` needs extensive work to match it. ARIA is for filling gaps, not replacing good HTML.

## Roles, names, and states

Every interactive element needs three things:

### Role

What kind of thing is this?

```html
<div role="button">Click me</div>
<div role="tab">Settings</div>
<div role="dialog" aria-modal="true">...</div>
```

### Accessible name

What is this specific thing called? Screen readers announce this.

```html
<button aria-label="Close">×</button>
<input aria-labelledby="email-label">
<nav aria-label="Primary navigation">...</nav>
```

### State

What's happening with this thing right now?

```html
<button aria-expanded="true">Menu</button>
<div aria-selected="true">Item 1</div>
<input aria-invalid="true" aria-describedby="error-msg">
```

## Common keyboard patterns

### Menus

- **Arrow keys**: Move focus between menu items
- **Home/End**: Jump to first/last item
- **Escape**: Close menu, return focus to trigger
- **Enter/Space**: Activate current item
- **Type-ahead**: Typing letters jumps to matching items

### Dialogs (modals)

- **Focus trap**: Tab cycles within dialog only
- **Initial focus**: First focusable element, or heading
- **Escape**: Close dialog (if dismissible)
- **Return focus**: When closed, focus returns to trigger element

### Tabs

- **Arrow keys**: Move between tabs (not Tab key)
- **Home/End**: Jump to first/last tab
- **Tab**: Moves into tab panel, then out of component

### Trees

- **Arrow up/down**: Move between visible nodes
- **Arrow right**: Expand node or move to first child
- **Arrow left**: Collapse node or move to parent
- **Enter**: Activate node

## Focus management

### Roving tabindex

Only one item in a composite widget should be in the tab order at a time:

```html
<div role="tablist">
  <button role="tab" tabindex="0">Tab 1</button>
  <button role="tab" tabindex="-1">Tab 2</button>
  <button role="tab" tabindex="-1">Tab 3</button>
</div>
```

When focus moves (via arrow keys), update `tabindex` values.

### Focus trap

In dialogs, keep Tab key cycling within the dialog. When the last element is focused, Tab should return to the first. Shift+Tab should do the reverse.

### Focus restoration

When a component closes (menu, dialog, popover), return focus to the element that triggered it.

## Live regions

Announce dynamic content changes:

```html
<div aria-live="polite">3 items in cart</div>
<div role="alert">Error: Invalid email</div>
```

- `aria-live="polite"`: Announce after current speech finishes
- `aria-live="assertive"` or `role="alert"`: Interrupt immediately

## Common mistakes

- Adding `role="button"` but forgetting keyboard support (Enter/Space)
- Missing accessible names on icon buttons
- Focus escaping from modals
- Using live regions for everything (causes noise)
- Not returning focus when dialogs close

## References

- WAI-ARIA Authoring Practices Guide (APG): https://www.w3.org/WAI/ARIA/apg/
- APG: Menu button pattern: https://www.w3.org/WAI/ARIA/apg/patterns/menubutton/
- APG: Dialog (Modal) pattern: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- MDN ARIA roles: https://developer.mozilla.org/docs/Web/Accessibility/ARIA/Roles
