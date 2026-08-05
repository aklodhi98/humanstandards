---
title: Accessibility Checklist
description: A pragmatic checklist to help you meet WCAG 2.2 AA and build inclusive experiences.
---

This checklist helps you build accessible products that meet WCAG 2.2 Level AA—the legal standard in most jurisdictions. It covers both technical requirements and the human impact behind each criterion.

Use this as a practical guide during design, development, and QA. The validation rules can be consumed by AI agents and automated testing tools.

---

## Quick Reference: WCAG 2.2 Success Criteria

### Level A (Minimum)

| # | Criterion | Summary |
|---|-----------|---------|
| 1.1.1 | Non-text Content | All images have text alternatives |
| 1.2.1 | Audio-only/Video-only | Provide alternatives for media |
| 1.3.1 | Info and Relationships | Structure conveyed programmatically |
| 1.3.2 | Meaningful Sequence | Reading order makes sense |
| 1.3.3 | Sensory Characteristics | Don't rely on shape/size/location alone |
| 1.4.1 | Use of Color | Color isn't the only way to convey info |
| 2.1.1 | Keyboard | All functionality via keyboard |
| 2.1.2 | No Keyboard Trap | Users can navigate away |
| 2.1.4 | Character Key Shortcuts | Can be remapped or disabled |
| 2.2.1 | Timing Adjustable | Users can extend time limits |
| 2.2.2 | Pause, Stop, Hide | Control over moving content |
| 2.3.1 | Three Flashes | No content flashes more than 3x/sec |
| 2.4.1 | Bypass Blocks | Skip navigation available |
| 2.4.2 | Page Titled | Descriptive page titles |
| 2.4.3 | Focus Order | Logical tab sequence |
| 2.4.4 | Link Purpose (In Context) | Links make sense in context |
| 2.5.1 | Pointer Gestures | Single-pointer alternatives exist |
| 2.5.2 | Pointer Cancellation | Can abort/undo pointer actions |
| 2.5.3 | Label in Name | Visible label in accessible name |
| 2.5.4 | Motion Actuation | Alternatives to device motion |
| 3.1.1 | Language of Page | Page language specified |
| 3.2.1 | On Focus | No unexpected context changes |
| 3.2.2 | On Input | No unexpected context changes |
| **3.2.6** | **Consistent Help** | Help in same location (NEW in 2.2) |
| 3.3.1 | Error Identification | Errors described in text |
| 3.3.2 | Labels or Instructions | Form fields have labels |
| **3.3.7** | **Redundant Entry** | Auto-populate repeated info (NEW in 2.2) |
| 4.1.2 | Name, Role, Value | Custom controls have proper ARIA |

### Level AA (Legal Standard)

| # | Criterion | Summary |
|---|-----------|---------|
| 1.2.4 | Captions (Live) | Live video has captions |
| 1.2.5 | Audio Description | Video has audio description |
| 1.3.4 | Orientation | Works in portrait and landscape |
| 1.3.5 | Identify Input Purpose | Autocomplete for personal data |
| 1.4.3 | Contrast (Minimum) | Text 4.5:1, large text 3:1 |
| 1.4.4 | Resize Text | Works at 200% zoom |
| 1.4.5 | Images of Text | Use real text, not images |
| 1.4.10 | Reflow | No horizontal scroll at 320px |
| 1.4.11 | Non-text Contrast | UI components 3:1 |
| 1.4.12 | Text Spacing | Works with user text spacing |
| 1.4.13 | Content on Hover/Focus | Tooltips dismissable, hoverable |
| 2.4.5 | Multiple Ways | Multiple ways to find pages |
| 2.4.6 | Headings and Labels | Descriptive headings |
| 2.4.7 | Focus Visible | Keyboard focus indicator visible |
| **2.4.11** | **Focus Not Obscured (Min)** | Focus not hidden (NEW in 2.2) |
| **2.5.7** | **Dragging Movements** | Single-click alternative (NEW in 2.2) |
| **2.5.8** | **Target Size (Minimum)** | 24×24px minimum (NEW in 2.2) |
| 3.1.2 | Language of Parts | Language changes identified |
| 3.2.3 | Consistent Navigation | Nav in same order |
| 3.2.4 | Consistent Identification | Same function = same name |
| 3.3.3 | Error Suggestion | Suggest corrections |
| 3.3.4 | Error Prevention (Legal/Financial) | Review before submit |
| **3.3.8** | **Accessible Authentication (Min)** | No cognitive test (NEW in 2.2) |

---

## Validation Rules (for MCP/AI)

```yaml
rules:
  # Perceivable
  - id: alt-text-present
    severity: error
    check: "Images have alt attribute (empty for decorative, descriptive for meaningful)"
    selector: "img"
    wcag: "1.1.1 A"

  - id: color-contrast-text
    severity: error
    check: "Text has ≥4.5:1 contrast (≥3:1 for large text ≥24px/18px bold)"
    selector: "text elements"
    wcag: "1.4.3 AA"

  - id: color-contrast-ui
    severity: error
    check: "UI components and graphics have ≥3:1 contrast"
    selector: "buttons, form controls, icons"
    wcag: "1.4.11 AA"

  - id: color-not-alone
    severity: error
    check: "Color is not the only means of conveying information"
    selector: "error states, status indicators, charts"
    wcag: "1.4.1 A"

  - id: reflow-no-horizontal-scroll
    severity: error
    check: "No horizontal scrolling at 320px width (1280px zoomed 400%)"
    selector: "page layout"
    wcag: "1.4.10 AA"

  - id: text-spacing-works
    severity: error
    check: "Content works with: line-height 1.5×, paragraph spacing 2×, letter-spacing 0.12em, word-spacing 0.16em"
    selector: "text content"
    wcag: "1.4.12 AA"

  # Operable
  - id: keyboard-accessible
    severity: error
    check: "All interactive elements are keyboard accessible"
    selector: "button, a, input, select, textarea, [onclick], [role='button']"
    wcag: "2.1.1 A"

  - id: no-keyboard-trap
    severity: error
    check: "User can navigate away from any element using keyboard"
    selector: "all focusable elements"
    wcag: "2.1.2 A"

  - id: focus-visible
    severity: error
    check: "Focus indicator visible with ≥3:1 contrast"
    selector: ":focus-visible"
    wcag: "2.4.7 AA"

  - id: focus-not-obscured
    severity: error
    check: "Focused element not entirely hidden by sticky headers/footers"
    selector: ":focus"
    wcag: "2.4.11 AA"
    note: "NEW in WCAG 2.2"

  - id: target-size-minimum
    severity: error
    check: "Touch targets ≥24×24 CSS pixels OR adequate spacing"
    selector: "button, a, input, [role='button'], [tabindex]"
    wcag: "2.5.8 AA"
    note: "NEW in WCAG 2.2"

  - id: dragging-alternative
    severity: error
    check: "Drag operations have single-pointer alternative"
    selector: "[draggable], .sortable, .slider"
    wcag: "2.5.7 AA"
    note: "NEW in WCAG 2.2"

  - id: skip-link
    severity: error
    check: "Skip to main content link available"
    selector: "body > a:first-child"
    wcag: "2.4.1 A"

  - id: focus-order-logical
    severity: error
    check: "Tab order follows visual order (no jumping around)"
    selector: "page flow"
    wcag: "2.4.3 A"

  # Understandable
  - id: page-language
    severity: error
    check: "Page has lang attribute on html element"
    selector: "html"
    wcag: "3.1.1 A"

  - id: form-labels
    severity: error
    check: "Form inputs have associated labels"
    selector: "input, select, textarea"
    wcag: "3.3.2 A"

  - id: error-identification
    severity: error
    check: "Form errors identified in text (not just color)"
    selector: "[aria-invalid='true'], .error"
    wcag: "3.3.1 A"

  - id: consistent-help
    severity: warning
    check: "Help mechanism (chat, contact, FAQ) in consistent location across pages"
    selector: "help links, support widgets"
    wcag: "3.2.6 A"
    note: "NEW in WCAG 2.2"

  - id: redundant-entry
    severity: warning
    check: "Previously entered info auto-populated or selectable"
    selector: "multi-step forms"
    wcag: "3.3.7 A"
    note: "NEW in WCAG 2.2"

  - id: accessible-authentication
    severity: error
    check: "Authentication doesn't require cognitive function test (transcription, memorization, puzzle)"
    selector: "login, signup, verification"
    wcag: "3.3.8 AA"
    note: "NEW in WCAG 2.2"
    exceptions: "Alternative method available, or uses object/personal content recognition"

  # Robust
  - id: valid-aria
    severity: error
    check: "ARIA attributes used correctly (valid roles, required states)"
    selector: "[role], [aria-*]"
    wcag: "4.1.2 A"

  - id: name-role-value
    severity: error
    check: "Custom components have accessible name, role, and state"
    selector: "[role='button'], [role='checkbox'], [role='tab'], custom elements"
    wcag: "4.1.2 A"
```

---

## Structure

### Landmarks

Use HTML5 semantic elements to define page regions. Screen readers use these for navigation.

```html
<body>
  <header role="banner">
    <!-- Site header, logo, primary nav -->
  </header>

  <nav role="navigation" aria-label="Main">
    <!-- Primary navigation -->
  </nav>

  <main role="main" id="main-content">
    <!-- Primary page content (only one per page) -->
  </main>

  <aside role="complementary">
    <!-- Related but separate content -->
  </aside>

  <footer role="contentinfo">
    <!-- Site footer, copyright, secondary links -->
  </footer>
</body>
```

**Checklist:**
- [ ] One `<main>` per page
- [ ] `<header>` for site header (becomes `banner` landmark)
- [ ] `<nav>` with `aria-label` if multiple navs exist
- [ ] `<footer>` for site footer (becomes `contentinfo` landmark)
- [ ] `<aside>` for complementary content
- [ ] No duplicate unlabeled landmarks of same type

### Headings

Headings create document outline for screen reader users. They navigate by heading level.

```html
<h1>Page Title</h1>              <!-- One per page -->
  <h2>Major Section</h2>
    <h3>Subsection</h3>
    <h3>Subsection</h3>
  <h2>Another Major Section</h2>
    <h3>Subsection</h3>
      <h4>Detail</h4>
```

**Checklist:**
- [ ] Exactly one `<h1>` per page (usually page title)
- [ ] Heading levels don't skip (h1 → h2 → h3, not h1 → h3)
- [ ] Headings are hierarchical (visual and semantic match)
- [ ] Headings describe content that follows
- [ ] Don't use headings just for visual styling

### Semantic Elements

Use correct elements for meaning, not just appearance.

| Content Type | Element | NOT |
|--------------|---------|-----|
| List of items | `<ul>`, `<ol>`, `<li>` | `<div>` with dashes |
| Data table | `<table>`, `<th>`, `<td>` | `<div>` grid |
| Quotation | `<blockquote>`, `<q>` | `<div>` with styling |
| Emphasis | `<em>`, `<strong>` | `<span>` with italic |
| Code | `<code>`, `<pre>` | `<div>` with monospace |
| Time | `<time datetime="...">` | Plain text |

---

## Keyboard

### All Functionality Via Keyboard

Every feature must work without a mouse.

```javascript
// Every click handler needs a keyboard equivalent
button.addEventListener('click', handleAction);
button.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    handleAction();
  }
});

// For custom components, ensure tabindex and ARIA
<div role="button"
     tabindex="0"
     onclick="handleClick()"
     onkeydown="handleKeydown(event)">
  Custom Button
</div>
```

**Checklist:**
- [ ] All links, buttons, and controls are focusable
- [ ] All actions work with Enter, Space, or appropriate keys
- [ ] Dropdown menus navigable with arrow keys
- [ ] Modals trap focus (Tab cycles within)
- [ ] Escape closes modals/dropdowns
- [ ] Focus returns to trigger after modal closes

### Tab Order

Focus should follow visual reading order.

```html
<!-- Avoid positive tabindex values -->
<button tabindex="1">First</button>  <!-- BAD -->
<button tabindex="2">Second</button> <!-- BAD -->

<!-- Let DOM order control tab order -->
<button>First</button>               <!-- GOOD -->
<button>Second</button>              <!-- GOOD -->

<!-- Use tabindex="-1" for programmatic focus only -->
<div id="dialog" tabindex="-1">
  <!-- Focus here via JavaScript, but not in tab order -->
</div>

<!-- Use tabindex="0" for custom focusable elements -->
<div role="button" tabindex="0">Custom Button</div>
```

### Skip Links

Let keyboard users bypass repeated content.

```html
<body>
  <a href="#main-content" class="skip-link">
    Skip to main content
  </a>

  <header>
    <!-- Logo, navigation - repeated on every page -->
  </header>

  <main id="main-content" tabindex="-1">
    <!-- Main content starts here -->
  </main>
</body>

<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px 16px;
  z-index: 100;
  text-decoration: none;
}

.skip-link:focus {
  top: 0;
}
</style>
```

---

## Forms

### Labels

Every input needs an associated label.

```html
<!-- Explicit association (preferred) -->
<label for="email">Email address</label>
<input type="email" id="email" name="email">

<!-- Implicit association (wrapping) -->
<label>
  Email address
  <input type="email" name="email">
</label>

<!-- aria-label for icon buttons -->
<button aria-label="Search">
  <svg><!-- search icon --></svg>
</button>

<!-- aria-labelledby for complex labels -->
<span id="billing">Billing</span>
<span id="address">Address</span>
<input aria-labelledby="billing address">
```

**Never rely on placeholder alone:**
```html
<!-- BAD: Placeholder disappears on focus -->
<input placeholder="Email">

<!-- GOOD: Visible label persists -->
<label for="email">Email</label>
<input type="email" id="email" placeholder="you@example.com">
```

### Error Handling

Identify errors clearly and provide suggestions.

```html
<div class="field field--error">
  <label for="email">Email address</label>
  <input type="email" id="email"
         aria-invalid="true"
         aria-describedby="email-error">
  <p id="email-error" class="error" role="alert">
    Please enter a valid email address (example: name@company.com)
  </p>
</div>
```

**Checklist:**
- [ ] Errors identified by more than color (icon, text)
- [ ] Error message near the field
- [ ] Error linked via `aria-describedby`
- [ ] Field marked with `aria-invalid="true"`
- [ ] Error summary at form top for multiple errors
- [ ] Focus moves to first error on submit

### Autocomplete

Help password managers and assistive tech with autocomplete tokens (WCAG 1.3.5).

```html
<input type="text" autocomplete="name">           <!-- Full name -->
<input type="email" autocomplete="email">         <!-- Email -->
<input type="tel" autocomplete="tel">             <!-- Phone -->
<input type="text" autocomplete="street-address"> <!-- Address -->
<input type="text" autocomplete="postal-code">    <!-- ZIP/Postal -->
<input type="password" autocomplete="current-password">
<input type="password" autocomplete="new-password">
<input type="text" autocomplete="one-time-code">  <!-- 2FA code -->
```

### Required Fields

Indicate required fields visually AND programmatically.

```html
<label for="name">
  Name
  <span class="required" aria-hidden="true">*</span>
</label>
<input type="text" id="name" required aria-required="true">

<!-- Explain the asterisk once per form -->
<p class="form-note">
  <span aria-hidden="true">*</span> Required field
</p>
```

---

## Contrast & Color

### Text Contrast

| Text Type | Minimum Ratio | Example |
|-----------|---------------|---------|
| Normal text (< 24px) | 4.5:1 | Dark gray (#595959) on white |
| Large text (≥ 24px or ≥ 18.66px bold) | 3:1 | Gray (#757575) on white |
| Incidental (disabled, decorative) | No requirement | — |

### UI Component Contrast

Interactive elements need 3:1 contrast against adjacent colors.

```css
/* Button border must contrast with background */
.btn-outline {
  border: 2px solid #767676; /* 4.5:1 on white */
  background: transparent;
}

/* Input border must be visible */
.input {
  border: 1px solid #767676; /* 4.5:1 on white */
}

/* Focus ring must contrast */
.btn:focus-visible {
  outline: 2px solid #0066cc; /* High contrast */
  outline-offset: 2px;
}
```

### Color Independence

Never use color as the only indicator.

```html
<!-- BAD: Color only -->
<span style="color: red;">Error in email field</span>

<!-- GOOD: Color + text + icon -->
<span class="error">
  <svg aria-hidden="true"><!-- error icon --></svg>
  Error: Email address is invalid
</span>

<!-- BAD: Link distinguished only by color -->
<p>Read our <span style="color: blue;">privacy policy</span>.</p>

<!-- GOOD: Link has underline or other indicator -->
<p>Read our <a href="/privacy">privacy policy</a>.</p>
```

---

## Media

### Images

```html
<!-- Informative image: Descriptive alt -->
<img src="chart.png"
     alt="Sales increased 25% from Q1 to Q2 2024">

<!-- Decorative image: Empty alt -->
<img src="decorative-border.png" alt="">

<!-- Complex image: Link to long description -->
<figure>
  <img src="complex-diagram.png"
       alt="Organization structure diagram"
       aria-describedby="diagram-desc">
  <figcaption id="diagram-desc">
    The CEO reports to the Board. Three VPs report to the CEO...
  </figcaption>
</figure>

<!-- Image as link: Alt describes destination -->
<a href="/home">
  <img src="logo.png" alt="Acme Corp - Return to homepage">
</a>
```

### Video and Audio

```html
<video controls>
  <source src="product-demo.mp4" type="video/mp4">
  <!-- Captions for deaf/hard of hearing -->
  <track kind="captions" src="captions.vtt" srclang="en" label="English">
  <!-- Audio description for blind users -->
  <track kind="descriptions" src="descriptions.vtt" srclang="en">
</video>

<!-- Transcript for audio-only content -->
<audio controls src="podcast.mp3"></audio>
<details>
  <summary>Read transcript</summary>
  <p>Host: Welcome to our podcast...</p>
</details>
```

**Checklist:**
- [ ] Pre-recorded video has captions
- [ ] Live video has captions (for AA)
- [ ] Video has audio description (for AA)
- [ ] Audio-only content has transcript
- [ ] No autoplay (or autoplay is muted with controls)
- [ ] Respects `prefers-reduced-motion`

### Motion and Animation

```css
/* Always provide reduced motion option */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## Focus

### Visible Focus Indicator

Focus must be visible and have sufficient contrast.

```css
/* Never just remove focus */
/* BAD */
*:focus { outline: none; }

/* GOOD: Custom focus that's visible */
:focus-visible {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}

/* For dark backgrounds */
.dark-section :focus-visible {
  outline-color: #ffffff;
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.3);
}
```

### Focus Not Obscured (WCAG 2.2)

Ensure focused elements aren't hidden behind sticky headers or footers.

```css
/* Ensure focus isn't hidden by sticky header */
:focus {
  scroll-margin-top: 80px; /* Height of sticky header */
  scroll-margin-bottom: 60px; /* Height of sticky footer */
}

/* Or use scroll-padding on container */
html {
  scroll-padding-top: 80px;
  scroll-padding-bottom: 60px;
}
```

### Focus Management

After dynamic updates, manage focus appropriately.

```javascript
// After opening modal
function openModal(modalEl) {
  modalEl.hidden = false;
  modalEl.querySelector('h2')?.focus(); // Focus heading or first element
}

// After closing modal
function closeModal(modalEl, triggerEl) {
  modalEl.hidden = true;
  triggerEl.focus(); // Return focus to trigger
}

// After deleting item from list
function deleteItem(itemEl) {
  const nextItem = itemEl.nextElementSibling || itemEl.previousElementSibling;
  itemEl.remove();
  nextItem?.focus(); // Focus adjacent item
}
```

---

## Components

### Dialogs (Modals)

```html
<dialog id="confirm-dialog"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-desc">
  <h2 id="dialog-title">Confirm deletion</h2>
  <p id="dialog-desc">This action cannot be undone.</p>

  <form method="dialog">
    <button value="cancel">Cancel</button>
    <button value="confirm" autofocus>Delete</button>
  </form>
</dialog>

<script>
const dialog = document.getElementById('confirm-dialog');
const trigger = document.getElementById('delete-btn');

trigger.addEventListener('click', () => dialog.showModal());

dialog.addEventListener('close', () => {
  trigger.focus(); // Return focus
});
</script>
```

**Checklist:**
- [ ] Has `role="dialog"` (or use `<dialog>`)
- [ ] Has `aria-labelledby` pointing to title
- [ ] Has `aria-describedby` for description (if applicable)
- [ ] Focus moves into dialog on open
- [ ] Focus trapped within dialog (Tab cycles)
- [ ] Escape key closes dialog
- [ ] Focus returns to trigger on close
- [ ] Background content is inert

### Live Regions

Announce dynamic content changes.

```html
<!-- Polite: Announces after current speech -->
<div role="status" aria-live="polite">
  3 items in cart
</div>

<!-- Assertive: Interrupts current speech (use sparingly) -->
<div role="alert">
  Error: Session expired. Please log in again.
</div>

<!-- For form errors -->
<p role="alert" id="error-message">
  Please fix the errors below.
</p>
```

**Decision logic:**
- Use `polite` for: status updates, search results, cart counts
- Use `assertive` for: errors, warnings, time-sensitive alerts
- Don't overuse—constant announcements are disruptive

---

## WCAG 2.2 New Criteria

### Target Size Minimum (2.5.8 AA)

Interactive elements must be at least 24×24 CSS pixels OR have adequate spacing.

```css
/* Ensure minimum target size */
button,
a,
input,
select {
  min-width: 24px;
  min-height: 24px;
}

/* Better: Use comfortable size */
.btn {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 16px;
}

/* Small targets need spacing */
.icon-button {
  min-width: 24px;
  min-height: 24px;
  margin: 8px; /* Creates spacing to adjacent targets */
}
```

### Dragging Movements (2.5.7 AA)

Provide single-pointer alternatives to drag operations.

```html
<!-- Sortable list with drag AND buttons -->
<ul class="sortable-list">
  <li draggable="true">
    <span class="drag-handle" aria-hidden="true">⋮⋮</span>
    Item 1
    <div class="move-buttons">
      <button aria-label="Move item up">↑</button>
      <button aria-label="Move item down">↓</button>
    </div>
  </li>
</ul>

<!-- Slider with drag AND input -->
<div class="slider-container">
  <input type="range" min="0" max="100" id="slider">
  <input type="number" min="0" max="100" id="slider-input"
         aria-label="Enter value directly">
</div>
```

### Accessible Authentication (3.3.8 AA)

Don't require cognitive function tests for authentication.

**Allowed:**
- Username/password with paste enabled and password manager support
- Email magic links
- Passkeys/WebAuthn
- OAuth/social login
- Biometrics (fingerprint, face)
- Object recognition ("click all traffic lights")
- Personal content recognition (select your profile photo)

**Not allowed (without alternative):**
- Transcribing distorted text (CAPTCHA)
- Remembering passwords without paste
- Solving puzzles or math problems
- Remembering and entering codes manually

```html
<!-- Allow paste in password fields -->
<input type="password"
       autocomplete="current-password"
       onpaste="return true">  <!-- Don't disable paste -->

<!-- Provide alternative to CAPTCHA -->
<div class="captcha-alternatives">
  <button type="button" onclick="audioChallenge()">
    Audio challenge
  </button>
  <a href="/contact">
    Contact support for assistance
  </a>
</div>
```

### Consistent Help (3.2.6 A)

Help mechanisms must appear in the same relative location across pages.

```html
<!-- Help always in footer or header -->
<footer>
  <nav aria-label="Help and support">
    <a href="/help">Help Center</a>
    <a href="/contact">Contact Us</a>
    <button onclick="openChat()">Live Chat</button>
  </nav>
</footer>

<!-- Or consistent floating widget -->
<button class="help-widget"
        aria-label="Get help"
        style="position: fixed; bottom: 20px; right: 20px;">
  ?
</button>
```

### Redundant Entry (3.3.7 A)

Don't make users re-enter information they've already provided.

```javascript
// Store entered data for reuse
function saveFormProgress(formData) {
  sessionStorage.setItem('checkout-data', JSON.stringify(formData));
}

// Pre-fill from previous steps
function prefillFromSession() {
  const saved = JSON.parse(sessionStorage.getItem('checkout-data'));
  if (saved?.email) {
    document.getElementById('email').value = saved.email;
  }
  if (saved?.address) {
    document.getElementById('billing-address').value = saved.address;
  }
}

// Offer to copy shipping to billing
<label>
  <input type="checkbox" onchange="copyShippingToBilling()">
  Billing address same as shipping
</label>
```

---

## Testing

### Automated Testing

Automated tools catch ~30-40% of issues. Run these on every build.

| Tool | Type | Coverage |
|------|------|----------|
| axe-core / axe DevTools | Runtime + browser | ~57 rules |
| Lighthouse | Browser audit | Accessibility score |
| WAVE | Browser extension | Visual indicators |
| Pa11y | CLI / CI integration | Batch testing |
| jest-axe | Unit tests | Component level |

```javascript
// Jest + axe example
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('form is accessible', async () => {
  const { container } = render(<ContactForm />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Manual Testing

Manual testing catches the other 60-70%.

**Keyboard testing:**
1. Tab through entire page without mouse
2. Verify all interactive elements are reachable
3. Verify focus is visible at all times
4. Verify no keyboard traps
5. Test all functionality (forms, menus, dialogs)

**Screen reader testing:**
1. Navigate by headings (H key in NVDA/JAWS)
2. Navigate by landmarks (D key)
3. Read all form labels and errors
4. Verify dynamic content announced
5. Test common screen readers:
   - NVDA + Chrome/Firefox (Windows)
   - VoiceOver + Safari (Mac/iOS)
   - TalkBack + Chrome (Android)

**Visual testing:**
- Zoom to 200% and 400%
- Enable Windows High Contrast Mode
- Test with color blindness simulators
- Test with forced-colors media query

### Testing Checklist

**Every component:**
- [ ] Passes automated axe/Lighthouse check
- [ ] Keyboard accessible (Tab, Enter, Escape)
- [ ] Focus visible and logical
- [ ] Screen reader announces correctly

**Before release:**
- [ ] Full keyboard-only navigation pass
- [ ] Screen reader smoke test (main flows)
- [ ] Zoom testing (200%, 400%)
- [ ] High contrast mode works
- [ ] Reduced motion respected

---

## Common Mistakes

| Mistake | Impact | Fix |
|---------|--------|-----|
| Missing alt text | Images invisible to screen readers | Add descriptive alt or `alt=""` for decorative |
| Low contrast | Text unreadable for low vision | Use contrast checker, aim for 4.5:1 minimum |
| No focus indicator | Keyboard users can't see where they are | Custom `:focus-visible` styles |
| Placeholder as label | Label disappears, accessibility broken | Use visible `<label>` element |
| Click-only handlers | Keyboard users can't activate | Add keyboard event handlers |
| Auto-playing media | Disorienting, can't be stopped | Require user action to play |
| Positive tabindex | Unpredictable focus order | Use DOM order instead |
| Missing form labels | Screen readers announce "edit text" only | Associate labels with inputs |
| Color-only errors | Color blind users can't see errors | Add icons and text |
| Inaccessible modals | Focus escapes, can't close | Trap focus, handle Escape |

---

## Recent Legal Requirements (2025–2026)

### United States

The DOJ's [April 2024 final rule](https://www.ada.gov/resources/2024-03-08-web-rule/) establishes **WCAG 2.1 AA** for state/local government websites and mobile apps. **Both deadlines were extended one year on 17 April 2026:**

- Population 50,000+: ~~April 24, 2026~~ → **26 April 2027**
- Smaller entities and special district governments: ~~April 26, 2027~~ → **26 April 2028**

HHS separately extended its [Section 504 deadlines](https://www.hhs.gov/press-room/hhs-extends-mobile-and-web-accessibility-deadline.html) on 7 May 2026, covering any organisation receiving HHS funding — hospitals, health plans, community health centres, digital health companies:

- 15 or more employees: **11 May 2027**
- Fewer than 15 employees: **10 May 2028**

Section 508 (federal agencies and contractors) still references **WCAG 2.0 AA**, with no announced update.

### European Union

The [European Accessibility Act](https://ec.europa.eu/social/main.jsp?catId=1202) has been applicable since 28 June 2025, requiring accessibility for:
- E-commerce websites and apps
- Banking services
- E-books and software
- Ticketing and check-in machines

### Global Trend

Most accessibility laws reference WCAG 2.1 or 2.2 Level AA:
- Section 508 (US federal)
- EN 301 549 (Europe)
- AODA (Ontario, Canada)
- DDA (Australia)

---

## References

**Official Standards:**
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [How to Meet WCAG (Quick Reference)](https://www.w3.org/WAI/WCAG22/quickref/)
- [What's New in WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)

**Checklists:**
- [WebAIM WCAG 2 Checklist](https://webaim.org/standards/wcag/checklist)
- [A11Y Project Checklist](https://www.a11yproject.com/checklist/)
- [Deque WCAG 2.2 Resources](https://dequeuniversity.com/resources/wcag-2.2/)

**Testing Tools:**
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Pa11y](https://pa11y.org/)

---

## See Also

- [WCAG Guidelines](/accessibility/wcag-guidelines/) — Full criteria reference
- [Assistive Technologies](/accessibility/assistive-technologies/) — How AT users navigate
- [Testing & Audit Tools](/accessibility/testing-audit-tools/) — Testing toolchain
- [ARIA & Keyboard Patterns](/code-design-tokens/aria-keyboard-patterns/) — Component implementations
- [Touch Targets & Spacing](/code-design-tokens/touch-targets-spacing/) — Target size requirements
- [Colour Accessibility](/perception/vision/colour-accessibility/) — Color blindness and contrast
