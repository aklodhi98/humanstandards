---
title: ARIA & Keyboard Patterns
description: Roving tabindex, focus traps, roles/names/states, and common keybinds for accessible custom widgets.
---

Custom components need to behave like their native counterparts. ARIA attributes tell assistive technologies what a component *is* and what state it's *in*. Keyboard patterns let users interact without a mouse. Together, they make custom UI accessible.

This page provides both human-readable guidance and machine-parseable specifications for AI agents and design systems.

---

## The First Rule of ARIA

Use native HTML elements when possible. A `<button>` is automatically accessible. A `<div onclick>` needs extensive work to match it. ARIA is for filling gaps, not replacing good HTML.

**"No ARIA is better than bad ARIA."** — W3C WAI

Native elements provide keyboard support, focus management, and screen reader announcements for free. When you must build custom widgets, follow the patterns in this guide exactly.

---

## Specifications (MCP-Optimized)

### Role Requirements

| Role | Required Attributes | Keyboard Support | Container Relationship |
|------|---------------------|------------------|------------------------|
| `button` | accessible name | Enter, Space | None |
| `link` | accessible name, href equivalent | Enter | None |
| `checkbox` | `aria-checked` | Space | None |
| `radio` | `aria-checked` | Arrow keys, Space | `radiogroup` |
| `tab` | `aria-selected` | Arrow keys | `tablist` |
| `tabpanel` | `aria-labelledby` | Tab (into) | linked to `tab` |
| `menuitem` | accessible name | Enter, Space, Arrows | `menu` or `menubar` |
| `option` | `aria-selected` | Arrow keys, Enter | `listbox` |
| `treeitem` | `aria-expanded` (if parent) | Arrow keys | `tree` → `group` |
| `dialog` | `aria-labelledby`, `aria-modal` | Tab (trapped), Escape | None |
| `alertdialog` | `aria-labelledby`, `aria-describedby` | Tab (trapped), Escape | None |
| `slider` | `aria-valuenow`, `aria-valuemin`, `aria-valuemax` | Arrow keys, Home, End | None |
| `combobox` | `aria-expanded`, `aria-controls` | Arrow keys, Enter, Escape | controls `listbox` |

### Accessible Name Requirements

| Element Type | Primary Method | Fallback Methods | WCAG |
|--------------|----------------|------------------|------|
| Button with text | Text content | `aria-label`, `aria-labelledby` | 4.1.2 |
| Icon button | `aria-label` | `aria-labelledby`, visually hidden text | 4.1.2 |
| Input field | Associated `<label>` | `aria-label`, `aria-labelledby` | 1.3.1, 4.1.2 |
| Landmark region | `aria-label` or `aria-labelledby` | — | 1.3.1 |
| Dialog | `aria-labelledby` (to heading) | `aria-label` | 4.1.2 |
| Image | `alt` attribute | `aria-label`, `aria-labelledby` | 1.1.1 |

### Focus Indicator Requirements

| Requirement | Specification | WCAG |
|-------------|---------------|------|
| Minimum contrast | 3:1 against adjacent colors | 2.4.7, 2.4.11 |
| Minimum area | 1px solid outline OR equivalent | 2.4.11 |
| Enhanced area | 2px solid outline, offset for visibility | 2.4.12 |
| Never hidden | `outline: none` requires custom replacement | 2.4.7 |
| Visibility | Focus indicator must not be obscured | 2.4.11 |

---

## Validation Rules (for MCP/AI)

```yaml
rules:
  # Role and Name Validation
  - id: aria-role-valid
    severity: error
    check: "role attribute value is a valid WAI-ARIA role"
    selector: "[role]"
    wcag: "4.1.2 AA"

  - id: aria-name-required
    severity: error
    check: "Interactive elements have accessible name (text content, aria-label, or aria-labelledby)"
    selector: "button, a[href], input, select, textarea, [role='button'], [role='link'], [role='checkbox'], [role='tab'], [role='menuitem']"
    wcag: "4.1.2 AA"

  - id: aria-button-name
    severity: error
    check: "Buttons have accessible name (text content, aria-label, aria-labelledby, or title)"
    selector: "button, [role='button']"
    wcag: "4.1.2 AA"

  - id: aria-icon-button-label
    severity: error
    check: "Icon-only buttons have aria-label or visually hidden text"
    selector: "button:not(:has(visible-text)), [role='button']:not(:has(visible-text))"
    wcag: "4.1.2 AA"

  # State Validation
  - id: aria-checkbox-state
    severity: error
    check: "checkbox role has aria-checked attribute"
    selector: "[role='checkbox']"
    wcag: "4.1.2 AA"

  - id: aria-expanded-state
    severity: error
    check: "Expandable controls have aria-expanded (true/false)"
    selector: "[aria-haspopup], [aria-controls]:has(+ [hidden]), button:controls-disclosure"
    wcag: "4.1.2 AA"

  - id: aria-selected-state
    severity: error
    check: "Selectable items (tabs, options) have aria-selected"
    selector: "[role='tab'], [role='option']"
    wcag: "4.1.2 AA"

  - id: aria-current-navigation
    severity: warning
    check: "Current page in navigation uses aria-current='page'"
    selector: "nav a[href]:current-page"
    wcag: "1.3.1 AA"

  # Keyboard Validation
  - id: keyboard-focusable
    severity: error
    check: "Interactive elements are keyboard focusable (tabindex >= -1 for custom, or native)"
    selector: "[role='button'], [role='link'], [role='checkbox'], [role='tab'], [role='menuitem'], [onclick], [onkeydown]"
    wcag: "2.1.1 AA"

  - id: keyboard-operable
    severity: error
    check: "Custom interactive elements respond to Enter/Space (buttons) or appropriate keys"
    selector: "[role='button']:not(button), [role='link']:not(a)"
    wcag: "2.1.1 AA"

  - id: focus-visible
    severity: error
    check: "Keyboard focus indicator is visible"
    selector: ":focus-visible"
    wcag: "2.4.7 AA"
    note: "WCAG 2.4.13 AAA specifies indicator area and a ≥3:1 change of contrast"

  - id: focus-not-obscured
    severity: error
    check: "Focused element not entirely hidden by other content"
    selector: ":focus"
    wcag: "2.4.11 AA"

  # Dialog Validation
  - id: dialog-label
    severity: error
    check: "Dialog has aria-labelledby pointing to heading or aria-label"
    selector: "[role='dialog'], [role='alertdialog'], dialog"
    wcag: "4.1.2 AA"

  - id: dialog-focus-trap
    severity: error
    check: "Modal dialog traps focus (Tab cycles within, no escape to background)"
    selector: "[role='dialog'][aria-modal='true'], dialog[open]"
    wcag: "2.4.3 AA"

  - id: dialog-escape
    severity: warning
    check: "Dismissible dialog closes on Escape key"
    selector: "[role='dialog'], dialog"
    wcag: "2.1.1 AA"

  - id: dialog-focus-return
    severity: error
    check: "Focus returns to trigger element when dialog closes"
    selector: "[role='dialog'], dialog"
    wcag: "2.4.3 AA"

  # Live Region Validation
  - id: live-region-appropriate
    severity: warning
    check: "aria-live='assertive' and role='alert' used sparingly (interrupts user)"
    selector: "[aria-live='assertive'], [role='alert']"
    wcag: "4.1.3 AA"

  - id: status-message
    severity: warning
    check: "Status messages use aria-live='polite' or role='status'"
    selector: ".status-message, .toast:not(.error)"
    wcag: "4.1.3 AA"
```

---

## Roles, Names, and States

Every interactive element needs three things:

### Role

What kind of thing is this? Roles tell assistive technology how to treat an element.

```html
<!-- Basic roles -->
<div role="button">Click me</div>
<div role="tab">Settings</div>
<div role="dialog" aria-modal="true">...</div>

<!-- Container roles -->
<div role="tablist">
  <button role="tab">Tab 1</button>
</div>
<ul role="menu">
  <li role="menuitem">Option 1</li>
</ul>
```

**Role categories:**
- **Widget roles**: button, checkbox, link, menuitem, option, radio, slider, tab, treeitem
- **Composite roles**: combobox, grid, listbox, menu, menubar, radiogroup, tablist, tree
- **Document structure**: article, cell, columnheader, definition, figure, group, heading, img, list, listitem, row, rowgroup, table
- **Landmark roles**: banner, complementary, contentinfo, form, main, navigation, region, search

### Accessible Name

What is this specific thing called? Screen readers announce this.

```html
<!-- Text content provides name -->
<button>Save Document</button>

<!-- aria-label for icon buttons -->
<button aria-label="Close">
  <svg><!-- X icon --></svg>
</button>

<!-- aria-labelledby references another element -->
<h2 id="dialog-title">Confirm Delete</h2>
<div role="dialog" aria-labelledby="dialog-title">...</div>

<!-- Multiple sources via aria-labelledby -->
<span id="action">Delete</span>
<span id="item">user.jpg</span>
<button aria-labelledby="action item"><!-- "Delete user.jpg" --></button>
```

**Name computation priority (simplified):**
1. `aria-labelledby` (highest)
2. `aria-label`
3. Native label (`<label>`, `alt`, text content)
4. `title` (lowest—avoid as sole source)

### State

What's happening with this thing right now?

```html
<!-- Expanded/collapsed -->
<button aria-expanded="true" aria-controls="menu1">Menu</button>

<!-- Selected -->
<div role="tab" aria-selected="true">Active Tab</div>

<!-- Checked (checkbox, radio, switch) -->
<div role="checkbox" aria-checked="true">Agree to terms</div>
<div role="checkbox" aria-checked="mixed">Select all (partial)</div>

<!-- Invalid input -->
<input aria-invalid="true" aria-describedby="error-msg">
<span id="error-msg">Email format is invalid</span>

<!-- Disabled vs aria-disabled -->
<button disabled>Can't click (removed from tab order)</button>
<button aria-disabled="true">Can't activate (still focusable)</button>

<!-- Busy/loading -->
<div role="status" aria-busy="true">Loading...</div>

<!-- Current item in navigation -->
<a href="/about" aria-current="page">About</a>
```

---

## Common Keyboard Patterns

### Decision Logic: Which Pattern to Use

```
IF component is a menu or menubar:
  USE menu keyboard pattern (arrow navigation, type-ahead)

IF component is tabs:
  USE tab keyboard pattern (arrows between tabs, Tab into panel)

IF component is a tree:
  USE tree keyboard pattern (arrows + expand/collapse)

IF component is a listbox or combobox dropdown:
  USE listbox keyboard pattern (arrows, type-ahead, Enter to select)

IF component is a dialog:
  USE dialog keyboard pattern (focus trap, Escape to close)

IF component is a single toggle (checkbox, switch):
  USE Space to toggle

IF component is a button:
  USE Enter and Space to activate

IF component is a slider:
  USE Arrow keys for increment, Home/End for min/max
```

### Menu Pattern

**Applies to:** `menu`, `menubar`, dropdown menus, context menus

| Key | Action |
|-----|--------|
| `Arrow Down` | Move to next item (or first if on last) |
| `Arrow Up` | Move to previous item (or last if on first) |
| `Arrow Right` | Open submenu (if present), or move to next menubar item |
| `Arrow Left` | Close submenu, or move to previous menubar item |
| `Home` | Move to first item |
| `End` | Move to last item |
| `Enter` / `Space` | Activate current item |
| `Escape` | Close menu, return focus to trigger |
| `A-Z` (type-ahead) | Move to next item starting with that letter |

```html
<button aria-haspopup="menu" aria-expanded="false" aria-controls="file-menu">
  File
</button>
<ul id="file-menu" role="menu" hidden>
  <li role="menuitem" tabindex="-1">New</li>
  <li role="menuitem" tabindex="-1">Open</li>
  <li role="separator"></li>
  <li role="menuitem" tabindex="-1">Save</li>
</ul>
```

### Dialog (Modal) Pattern

**Applies to:** `dialog`, `alertdialog`, modal windows, popovers

| Key | Action |
|-----|--------|
| `Tab` | Move to next focusable element (cycles within dialog) |
| `Shift+Tab` | Move to previous focusable element (cycles within dialog) |
| `Escape` | Close dialog (if dismissible) |
| `Enter` | Activate default button (if defined) |

**Focus management requirements:**

```javascript
// Opening a dialog
function openDialog(dialogEl, triggerEl) {
  // 1. Store trigger for focus return
  dialogEl.dataset.trigger = triggerEl.id;

  // 2. Show dialog
  dialogEl.hidden = false;
  dialogEl.setAttribute('aria-modal', 'true');

  // 3. Make background inert
  document.querySelector('main').inert = true;

  // 4. Move focus into dialog
  const focusTarget = dialogEl.querySelector(
    '[autofocus], h1, h2, [tabindex="-1"]'
  ) || dialogEl.querySelector('button, [href], input');
  focusTarget?.focus();

  // 5. Set up focus trap
  trapFocus(dialogEl);
}

// Closing a dialog
function closeDialog(dialogEl) {
  // 1. Hide dialog
  dialogEl.hidden = true;
  dialogEl.removeAttribute('aria-modal');

  // 2. Remove inert from background
  document.querySelector('main').inert = false;

  // 3. Return focus to trigger
  const triggerId = dialogEl.dataset.trigger;
  document.getElementById(triggerId)?.focus();
}
```

**Using native `<dialog>` element (recommended):**

```html
<dialog id="confirm-dialog" aria-labelledby="dialog-heading">
  <h2 id="dialog-heading">Confirm Action</h2>
  <p>Are you sure you want to proceed?</p>
  <form method="dialog">
    <button value="cancel">Cancel</button>
    <button value="confirm" autofocus>Confirm</button>
  </form>
</dialog>

<script>
const dialog = document.getElementById('confirm-dialog');
const trigger = document.getElementById('open-btn');

trigger.addEventListener('click', () => {
  dialog.showModal(); // Automatically traps focus, handles Escape
});

dialog.addEventListener('close', () => {
  trigger.focus(); // Return focus to trigger
});
</script>
```

### Tab Pattern

**Applies to:** `tablist`, `tab`, `tabpanel`

| Key | Action |
|-----|--------|
| `Arrow Left/Up` | Move to previous tab |
| `Arrow Right/Down` | Move to next tab |
| `Home` | Move to first tab |
| `End` | Move to last tab |
| `Tab` | Move focus from tabs into active tabpanel |
| `Shift+Tab` | Move focus from tabpanel back to active tab |

**Automatic vs manual activation:**
- **Automatic**: Tab content shows immediately when arrow key moves focus
- **Manual**: User must press Enter/Space to show tab content after focusing

```html
<div role="tablist" aria-label="Account settings">
  <button role="tab" aria-selected="true" aria-controls="panel-1"
          id="tab-1" tabindex="0">
    Profile
  </button>
  <button role="tab" aria-selected="false" aria-controls="panel-2"
          id="tab-2" tabindex="-1">
    Security
  </button>
  <button role="tab" aria-selected="false" aria-controls="panel-3"
          id="tab-3" tabindex="-1">
    Notifications
  </button>
</div>

<div role="tabpanel" id="panel-1" aria-labelledby="tab-1" tabindex="0">
  <!-- Profile content -->
</div>
<div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>
  <!-- Security content -->
</div>
<div role="tabpanel" id="panel-3" aria-labelledby="tab-3" hidden>
  <!-- Notifications content -->
</div>
```

### Tree Pattern

**Applies to:** `tree`, `treeitem`, file browsers, nested navigation

| Key | Action |
|-----|--------|
| `Arrow Down` | Move to next visible node |
| `Arrow Up` | Move to previous visible node |
| `Arrow Right` | Expand collapsed node, or move to first child |
| `Arrow Left` | Collapse expanded node, or move to parent |
| `Home` | Move to first node |
| `End` | Move to last visible node |
| `Enter` | Activate node (open file, navigate) |
| `Space` | Toggle selection (if selectable) |
| `*` | Expand all siblings |
| `A-Z` | Move to next node starting with letter |

```html
<ul role="tree" aria-label="File browser">
  <li role="treeitem" aria-expanded="true" tabindex="0">
    Documents
    <ul role="group">
      <li role="treeitem" tabindex="-1">Resume.pdf</li>
      <li role="treeitem" aria-expanded="false" tabindex="-1">
        Projects
        <ul role="group">
          <li role="treeitem" tabindex="-1">Project-A.doc</li>
        </ul>
      </li>
    </ul>
  </li>
</ul>
```

### Listbox Pattern

**Applies to:** `listbox`, `option`, custom dropdowns, autocomplete

| Key | Action |
|-----|--------|
| `Arrow Down` | Move to next option |
| `Arrow Up` | Move to previous option |
| `Home` | Move to first option |
| `End` | Move to last option |
| `Enter` | Select current option |
| `Escape` | Close listbox (in combobox), clear selection |
| `A-Z` | Type-ahead to matching option |

```html
<label id="color-label">Choose a color</label>
<div role="listbox" aria-labelledby="color-label" tabindex="0">
  <div role="option" aria-selected="true" id="opt-1">Red</div>
  <div role="option" aria-selected="false" id="opt-2">Green</div>
  <div role="option" aria-selected="false" id="opt-3">Blue</div>
</div>
```

---

## Focus Management

### Roving Tabindex

Only one item in a composite widget should be in the tab order at a time. Arrow keys move focus between items.

```html
<!-- Only the focused item has tabindex="0" -->
<div role="tablist">
  <button role="tab" tabindex="0">Tab 1</button>  <!-- Focused -->
  <button role="tab" tabindex="-1">Tab 2</button>
  <button role="tab" tabindex="-1">Tab 3</button>
</div>
```

```javascript
function rovingTabindex(container, items, direction) {
  const currentIndex = items.findIndex(item => item.tabIndex === 0);
  let newIndex;

  if (direction === 'next') {
    newIndex = (currentIndex + 1) % items.length;
  } else {
    newIndex = (currentIndex - 1 + items.length) % items.length;
  }

  // Update tabindex
  items[currentIndex].tabIndex = -1;
  items[newIndex].tabIndex = 0;
  items[newIndex].focus();
}
```

### Focus Trap

In dialogs, keep Tab cycling within the dialog. The `inert` attribute (now baseline available in all browsers since April 2023) is the modern solution.

```javascript
function trapFocus(container) {
  const focusable = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusable[0];
  const lastFocusable = focusable[focusable.length - 1];

  container.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey && document.activeElement === firstFocusable) {
      e.preventDefault();
      lastFocusable.focus();
    } else if (!e.shiftKey && document.activeElement === lastFocusable) {
      e.preventDefault();
      firstFocusable.focus();
    }
  });
}
```

**Modern approach using `inert`:**

```javascript
function openModal(dialogEl) {
  // Make everything except dialog inert
  document.querySelectorAll('body > *:not(dialog)').forEach(el => {
    el.inert = true;
  });
  dialogEl.showModal();
}

function closeModal(dialogEl) {
  document.querySelectorAll('[inert]').forEach(el => {
    el.inert = false;
  });
  dialogEl.close();
}
```

### Focus Restoration

When a component closes, return focus to the element that triggered it.

```javascript
class Dialog {
  #triggerElement = null;

  open(triggerEl) {
    this.#triggerElement = triggerEl;
    this.element.showModal();
  }

  close() {
    this.element.close();
    this.#triggerElement?.focus();
    this.#triggerElement = null;
  }
}
```

### Focus Placement Decision Logic

```
WHEN opening a dialog:
  IF dialog has a form with an input that needs immediate attention:
    FOCUS the first input field
  ELSE IF dialog is a simple confirmation with brief message:
    FOCUS the primary action button (e.g., "Confirm")
    SET aria-describedby to reference message text
  ELSE IF dialog has complex content or unexpected information:
    FOCUS the dialog heading (with tabindex="-1")
    OR FOCUS the dialog element itself (with tabindex="-1")
  ELSE IF dialog has a close button and is purely informational:
    FOCUS the close button

WHEN dialog trigger is removed from DOM:
  FOCUS the nearest logical location (parent container, main content start)
  OR FOCUS document.body as fallback

WHEN dialog was not user-initiated (e.g., timeout warning):
  ENSURE user understands context (aria-describedby for explanation)
  FOCUS the primary action
```

---

## Live Regions

Announce dynamic content changes to screen readers without moving focus.

### Live Region Types

| Attribute/Role | Behavior | Use Case |
|----------------|----------|----------|
| `aria-live="polite"` | Announce after current speech | Status updates, non-urgent info |
| `aria-live="assertive"` | Interrupt immediately | Time-sensitive alerts |
| `role="status"` | Implies `aria-live="polite"` | Progress, results count |
| `role="alert"` | Implies `aria-live="assertive"` | Errors, warnings |
| `role="log"` | Polite, new content appended | Chat messages, activity feeds |
| `role="timer"` | Not typically announced | Countdown displays |
| `role="marquee"` | Not typically announced | Stock tickers |

### Implementation

```html
<!-- Status message (polite) -->
<div role="status" aria-live="polite" aria-atomic="true">
  <!-- Content updated via JavaScript -->
</div>

<!-- Error alert (assertive) -->
<div role="alert">
  Error: Please enter a valid email address.
</div>

<!-- Search results count -->
<div role="status">
  <span id="results-count">25 results found</span>
</div>
```

**Key attributes:**
- `aria-atomic="true"`: Announce entire region content, not just changes
- `aria-relevant`: What types of changes to announce (`additions`, `removals`, `text`, `all`)

### Decision Logic: Polite vs Assertive

```
IF update is an error that blocks user progress:
  USE role="alert" (assertive)

IF update is a form validation error:
  USE aria-describedby on input + aria-invalid="true"
  OPTIONALLY add role="alert" for immediate feedback

IF update is a success message after action:
  USE role="status" (polite)

IF update is background information (loading, counts):
  USE role="status" (polite)

IF update is time-sensitive (session timeout):
  USE role="alert" (assertive)

DEFAULT to polite; assertive should be rare
```

---

## Code Patterns

### Accessible Button

```html
<!-- Native button (preferred) -->
<button type="button" onclick="handleClick()">
  Save Changes
</button>

<!-- Icon button with label -->
<button type="button" aria-label="Close dialog" onclick="closeDialog()">
  <svg aria-hidden="true"><!-- X icon --></svg>
</button>

<!-- Custom button (when native isn't possible) -->
<div role="button"
     tabindex="0"
     onclick="handleClick()"
     onkeydown="handleKeyDown(event)">
  Save Changes
</div>

<script>
function handleKeyDown(event) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    handleClick();
  }
}
</script>
```

### Accessible Disclosure (Expand/Collapse)

```html
<button aria-expanded="false" aria-controls="details-panel">
  Show Details
</button>
<div id="details-panel" hidden>
  <p>Additional details here...</p>
</div>

<script>
const btn = document.querySelector('[aria-expanded]');
const panel = document.getElementById('details-panel');

btn.addEventListener('click', () => {
  const expanded = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', !expanded);
  panel.hidden = expanded;
});
</script>
```

### Accessible Combobox (Autocomplete)

```html
<label for="city-input">City</label>
<div class="combobox-container">
  <input type="text"
         id="city-input"
         role="combobox"
         aria-expanded="false"
         aria-autocomplete="list"
         aria-controls="city-listbox"
         aria-activedescendant="">
  <ul id="city-listbox" role="listbox" hidden>
    <li role="option" id="opt-nyc">New York</li>
    <li role="option" id="opt-la">Los Angeles</li>
    <li role="option" id="opt-chi">Chicago</li>
  </ul>
</div>
```

### Skip Link

```html
<a href="#main-content" class="skip-link">
  Skip to main content
</a>

<!-- Later in document -->
<main id="main-content" tabindex="-1">
  <!-- Main content -->
</main>

<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  padding: 8px;
  background: #000;
  color: #fff;
  z-index: 100;
}
.skip-link:focus {
  top: 0;
}
</style>
```

---

## WAI-ARIA 1.3 Updates (2024)

The [WAI-ARIA 1.3 Working Draft](https://www.w3.org/news/2024/first-public-working-draft-accessible-rich-internet-applications-wai-aria-1-3/) (January 2024) introduces several new features:

### New Roles

| Role | Purpose | Example Use |
|------|---------|-------------|
| `suggestion` | Editorial suggestions | Track changes, comments |
| `comment` | User comments | Document annotations |
| `mark` | Highlighted text | Search result highlighting |
| `code` | Code snippets | Inline code (like `<code>`) |
| `time` | Time values | Dates, durations |
| `image` | Images (replaces `img`) | Consistent with other roles |

### New Attributes

| Attribute | Purpose | Benefit |
|-----------|---------|---------|
| `aria-description` | Additional description | More context beyond label |
| `aria-braillelabel` | Braille-specific label | Optimized for braille displays |
| `aria-brailleroledescription` | Braille role description | Contextual info for braille |

### Updated Features

- `aria-details` now supports multiple IDrefs
- Clarified `aria-haspopup` behavior
- Enhanced accessibility tree definitions

**Note:** Browser and assistive technology support is gradual. Test before relying on 1.3 features.

---

## Implementation Checklist

### For Every Interactive Element

- [ ] Has appropriate role (native element or ARIA)
- [ ] Has accessible name (visible text, `aria-label`, or `aria-labelledby`)
- [ ] Is keyboard focusable (`tabindex` if custom)
- [ ] Responds to appropriate keys (Enter/Space for buttons)
- [ ] Has visible focus indicator (3:1 contrast minimum)
- [ ] Has appropriate states (`aria-expanded`, `aria-selected`, etc.)

### For Composite Widgets (Menus, Tabs, Trees)

- [ ] Uses roving tabindex (only one `tabindex="0"`)
- [ ] Arrow keys navigate between items
- [ ] Home/End jump to first/last
- [ ] Escape closes (for menus, dialogs)
- [ ] Type-ahead works (for menus, listboxes)

### For Dialogs

- [ ] Has `role="dialog"` (or uses `<dialog>`)
- [ ] Has `aria-modal="true"` (or uses `showModal()`)
- [ ] Has `aria-labelledby` pointing to heading
- [ ] Focus moves into dialog on open
- [ ] Focus is trapped within dialog
- [ ] Escape closes dialog
- [ ] Focus returns to trigger on close
- [ ] Background content is inert

### For Live Regions

- [ ] Uses appropriate politeness (`polite` default, `assertive` rare)
- [ ] Region exists in DOM before content changes
- [ ] `aria-atomic` set correctly for context
- [ ] Not overused (causes screen reader noise)

---

## Common Mistakes

| Mistake | Problem | Solution |
|---------|---------|----------|
| `role="button"` without keyboard | Custom buttons not operable | Add `tabindex="0"` + Enter/Space handler |
| Missing accessible name | Screen readers announce "button" only | Add `aria-label` or visible text |
| Focus escapes modal | Users can Tab to hidden content | Use `inert` on background or focus trap |
| `aria-live="assertive"` overuse | Constant interruptions | Default to `polite`; assertive for errors only |
| No focus return | Users lost after dialog closes | Store and restore trigger element |
| `outline: none` without replacement | Focus invisible to keyboard users | Custom `:focus-visible` styles |
| Disabled via CSS only | Focusable but inactive (confusing) | Use `disabled` attribute or `aria-disabled` |
| Duplicate IDs | `aria-labelledby` references wrong element | Ensure unique IDs |
| Missing expanded state | No indication dropdown is open | Add `aria-expanded` to trigger |
| Tab key in tablist | Breaks expected pattern | Arrow keys for tabs; Tab exits to panel |

---

## Testing with Screen Readers

### WebAIM Survey Findings (2024)

The [WebAIM Screen Reader Survey #10](https://webaim.org/projects/screenreadersurvey10/) (2024) found:
- **JAWS**: 41% of respondents
- **NVDA**: 38% of respondents
- **VoiceOver**: Primary for macOS/iOS
- **Preferred browser**: Chrome (52%), Edge (19%), Firefox (16%)

### Testing Checklist

For each widget, verify:
1. **Role announced**: "button", "tab", "menu", etc.
2. **Name announced**: The label text
3. **State announced**: "expanded", "selected", "checked"
4. **Keyboard works**: All patterns function correctly
5. **Focus mode active**: For complex widgets, screen reader uses Focus mode (not Browse mode)

### Screen Reader Commands

| Screen Reader | Enter Focus Mode | Exit Focus Mode |
|---------------|------------------|-----------------|
| JAWS | Enter on widget | Escape or Num Pad + |
| NVDA | NVDA + Space | Escape or NVDA + Space |
| VoiceOver | VO + Shift + Down | VO + Shift + Up |

---

## Recent Research

### Navigation Patterns Study

The [WebAIM Screen Reader Survey #10](https://webaim.org/projects/screenreadersurvey10/) revealed navigation preferences:
- **Headings**: Most common method for finding information
- **Landmarks/regions**: Usage increased to 31.8% in 2024 (reversing decline)
- **Skip links**: Still important for long pages

**Design implication:** Ensure proper heading hierarchy and landmark regions, not just ARIA widgets.

### Persona Research: Wide Variation in User Behavior

[Research published in PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11872227/) found wide variations in screen reader user approaches:
- Some users navigate linearly, skipping uninteresting sections
- Others use headings primarily
- Younger users may use regions more frequently
- Users give up after a few minutes on difficult sites

**Design implication:** Support multiple navigation strategies; don't assume one "correct" approach.

### Desktop vs Mobile

From the WebAIM survey:
- 58% prefer mobile apps over websites (up from 51.8% in 2021)
- Physical keyboards provide more control than touchscreens
- Keyboard commands (accelerators) let users bypass sequential navigation

**Design implication:** Mobile apps need extra attention to accessibility; web apps should support keyboard power users.

### Inert Attribute Support

The [`inert` attribute](https://web.dev/articles/inert) reached baseline browser support in April 2023 (over 90% support):
- Native `<dialog>` with `showModal()` automatically makes background inert
- Can be applied to any element to remove from tab order and accessibility tree
- Simpler than JavaScript focus traps for many use cases

---

## References

**Official Standards:**
- [WAI-ARIA 1.2 Specification](https://www.w3.org/TR/wai-aria-1.2/)
- [WAI-ARIA 1.3 Working Draft](https://w3c.github.io/aria/)
- [ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)

**APG Design Patterns:**
- [Menu Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menubutton/)
- [Dialog (Modal) Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)
- [Tree View Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/)
- [Developing a Keyboard Interface](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/)

**Practical Resources:**
- [MDN ARIA Roles Reference](https://developer.mozilla.org/docs/Web/Accessibility/ARIA/Roles)
- [WebAIM Keyboard Accessibility](https://webaim.org/techniques/keyboard/)
- [The Inert Attribute (web.dev)](https://web.dev/articles/inert)
- [Modal Dialog Accessibility (TPGi)](https://www.tpgi.com/the-current-state-of-modal-dialog-accessibility/)

**Research:**
- [WebAIM Screen Reader Survey #10 (2024)](https://webaim.org/projects/screenreadersurvey10/)
- [WAI-ARIA 1.3 FPWD Announcement](https://www.w3.org/news/2024/first-public-working-draft-accessible-rich-internet-applications-wai-aria-1-3/)
- [ARIA 1.3 New Features (Orange)](https://a11y-guidelines.orange.com/en/articles/aria-1-3-new-accessibility-features/)

---

## See Also

- [Accessible Typography](/code-design-tokens/accessible-typography/) — Font sizing and contrast for readability
- [Touch Targets & Spacing](/code-design-tokens/touch-targets-spacing/) — Minimum sizes for interactive elements
- [CSS/JSON Design Tokens](/code-design-tokens/css-json-tokens/) — Token definitions for design systems
- [Testing & Audit Tools](/accessibility/testing-audit-tools/) — How to test ARIA implementation
- [WCAG Guidelines](/accessibility/wcag-guidelines/) — Full accessibility criteria
- [Navigation Patterns](/interaction-patterns/navigation/) — Landmark regions and skip links
- [Notifications & Feedback](/interaction-patterns/notifications-feedback/) — Live region usage patterns
