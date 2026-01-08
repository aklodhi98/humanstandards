---
title: Quick Reference
description: Evidence-based thresholds, defaults, and specifications for human-centered design — the numbers you need daily.
---

This page consolidates the key numbers, thresholds, and specifications from across Human Standards. Use it for quick lookup during design and development.

---

## Typography

### Font Sizes

| Context | Minimum | Recommended | Maximum |
|---------|---------|-------------|---------|
| **Body text** | 16px | 18–20px | 24px |
| **Small text** | 12px | 14px | 16px |
| **Captions** | 11px | 12–14px | 16px |
| **Large text (WCAG)** | 18px (24px bold) | — | — |

### Line Length

| Context | Minimum | Optimal | Maximum |
|---------|---------|---------|---------|
| **Body text** | 45 characters | 65 characters | 75 characters |
| **Narrow columns** | 35 characters | 45 characters | 55 characters |
| **Wide screens** | — | — | 90 characters |

### Line Height

| Text Type | Minimum | Recommended |
|-----------|---------|-------------|
| **Body text** | 1.4 | 1.5–1.8 |
| **Headings** | 1.1 | 1.2–1.3 |
| **Captions/small** | 1.3 | 1.4–1.5 |

### Letter Spacing

| Text Type | Adjustment |
|-----------|------------|
| **Body text** | 0 (default) |
| **All caps** | +0.05em to +0.1em |
| **Small text** | +0.01em to +0.02em |

**Validation rule:**
```yaml
typography:
  body_font_size:
    minimum: 16
    unit: px
    wcag: "1.4.4 AA"
  line_length:
    minimum: 45
    maximum: 75
    unit: characters
  line_height:
    minimum: 1.4
    wcag: "1.4.12 AA"
```

---

## Contrast Ratios

### WCAG Requirements

| Content Type | AA Level | AAA Level |
|--------------|----------|-----------|
| **Normal text** (<18px, <14px bold) | 4.5:1 | 7:1 |
| **Large text** (≥18px, ≥14px bold) | 3:1 | 4.5:1 |
| **UI components** | 3:1 | — |
| **Graphical objects** | 3:1 | — |
| **Focus indicators** | 3:1 | — |

### Common Contrast Pairs

| Foreground | Background | Ratio | Passes |
|------------|------------|-------|--------|
| #000000 | #FFFFFF | 21:1 | AAA |
| #333333 | #FFFFFF | 12.6:1 | AAA |
| #595959 | #FFFFFF | 7:1 | AAA |
| #767676 | #FFFFFF | 4.5:1 | AA |
| #949494 | #FFFFFF | 3:1 | Large only |

### Focus Indicator Contrast

| Requirement | Value |
|-------------|-------|
| **Minimum area** | 1px solid outline OR equivalent |
| **Contrast with adjacent** | 3:1 minimum |
| **Contrast with background** | 3:1 minimum |
| **WCAG 2.2 enhanced** | 2px outline with 3:1 contrast |

**Validation rule:**
```yaml
contrast:
  normal_text:
    minimum: 4.5
    wcag: "1.4.3 AA"
  large_text:
    minimum: 3.0
    wcag: "1.4.3 AA"
  ui_components:
    minimum: 3.0
    wcag: "1.4.11 AA"
  focus_visible:
    minimum: 3.0
    wcag: "2.4.13 AAA"
```

---

## Touch Targets

### Platform Requirements

| Platform | Minimum Size | Recommended | Spacing |
|----------|--------------|-------------|---------|
| **iOS** | 44×44pt | 44×44pt | 8pt |
| **Android** | 48×48dp | 48×48dp | 8dp |
| **Web (WCAG)** | 24×24px | 44×44px | — |
| **Web (best practice)** | 44×44px | 48×48px | 8px |

### Context-Specific Targets

| Context | Minimum Size |
|---------|--------------|
| **Primary actions** | 48×48px |
| **Secondary actions** | 44×44px |
| **Dense UI (expert users)** | 32×32px |
| **Inline links** | 44px tall, width varies |

### Spacing Between Targets

| Spacing Type | Minimum | Recommended |
|--------------|---------|-------------|
| **Adjacent buttons** | 8px | 12px |
| **Touch-only targets** | 8px | 16px |
| **Dense interfaces** | 4px | 8px |

**Validation rule:**
```yaml
touch_targets:
  minimum_size:
    ios: "44×44pt"
    android: "48×48dp"
    web: "44×44px"
    wcag: "2.5.8 AA (24×24px)"
  spacing:
    minimum: 8
    unit: px
```

---

## Response Times

### Perceived Performance Thresholds

| Threshold | User Perception | Example |
|-----------|-----------------|---------|
| **0–100ms** | Instant | Button press feedback |
| **100–300ms** | Fast | Menu open, simple action |
| **300ms–1s** | Noticeable delay | Page transition, search |
| **1–10s** | Waiting | Complex operation, needs progress |
| **>10s** | Abandonment risk | Must show detailed progress |

### Animation Durations

| Animation Type | Duration | Easing |
|----------------|----------|--------|
| **Micro-interactions** | 100–200ms | ease-out |
| **State changes** | 150–250ms | ease-in-out |
| **Entrances** | 200–300ms | ease-out |
| **Exits** | 150–200ms | ease-in |
| **Page transitions** | 300–500ms | ease-in-out |
| **Complex animations** | 400–700ms | custom |

### Timeout Recommendations

| Context | Minimum | Recommendation |
|---------|---------|----------------|
| **Session timeout** | 20 minutes | Extendable with warning |
| **Inactivity warning** | 2 minutes before | With option to extend |
| **Form auto-save** | 30 seconds | After last change |
| **Toast notifications** | 4 seconds | Or user dismissal |

**Validation rule:**
```yaml
timing:
  instant_feedback:
    maximum: 100
    unit: ms
  noticeable_delay:
    threshold: 1000
    unit: ms
    requires: progress_indicator
  session_timeout:
    minimum: 1200
    unit: seconds
    wcag: "2.2.1 AA"
```

---

## Working Memory

### Capacity Limits

| Measure | Traditional | Current Research |
|---------|-------------|------------------|
| **Chunk capacity** | 7±2 items | 3–4 items |
| **Duration (unrehearsed)** | 15–30 seconds | 15–30 seconds |
| **Visual items** | 3–4 items | 3–4 items |
| **Verbal items** | 4–7 items | 4–5 items |

### Design Implications

| Guideline | Value | Rationale |
|-----------|-------|-----------|
| **Menu items** | ≤7 items | Scannable without overwhelming |
| **Steps in process** | ≤5 steps | Trackable progress |
| **Options in dropdown** | ≤10 visible | Manageable selection |
| **Form fields per screen** | ≤7 fields | Reduced cognitive load |
| **Tabs in navigation** | ≤6 tabs | Easy mental mapping |

**Validation rule:**
```yaml
cognitive_load:
  menu_items:
    maximum: 7
    recommendation: 5
  wizard_steps:
    maximum: 5
    recommendation: 3-4
  form_fields_per_view:
    maximum: 7
    recommendation: 5
```

---

## Hearing and Audio

### Frequency Ranges

| Range | Frequencies | Content |
|-------|-------------|---------|
| **Sub-bass** | 20–60 Hz | Rumble, impact |
| **Bass** | 60–250 Hz | Voice fundamentals |
| **Midrange** | 250 Hz–4 kHz | Speech clarity |
| **High-mid** | 4–8 kHz | Presence, detail |
| **High** | 8–20 kHz | Air, brilliance |

### Speech Intelligibility

| Parameter | Value |
|-----------|-------|
| **Critical speech band** | 300–3400 Hz |
| **Extended speech band** | 125–8000 Hz |
| **Optimal speech level** | 60–70 dB |
| **Speech-to-noise ratio** | ≥15 dB for clarity |

### Safe Listening Levels

| Duration | Maximum Level |
|----------|---------------|
| **8 hours** | 85 dB |
| **4 hours** | 88 dB |
| **2 hours** | 91 dB |
| **1 hour** | 94 dB |
| **15 minutes** | 100 dB |

**Validation rule:**
```yaml
audio:
  safe_continuous_level:
    maximum: 85
    unit: dB
    duration: 8_hours
  speech_frequency_range:
    minimum: 300
    maximum: 3400
    unit: Hz
```

---

## Motion and Animation

### Reduced Motion Preferences

| Approach | Implementation |
|----------|----------------|
| **Disable non-essential** | Remove decorative animations |
| **Reduce, don't remove** | Shorter durations, simpler easing |
| **Provide alternatives** | Fade instead of slide |
| **Preserve function** | Keep loading indicators |

### Vestibular Trigger Thresholds

| Motion Type | Threshold |
|-------------|-----------|
| **Parallax scrolling** | >1/3 viewport movement |
| **Auto-playing video** | Large-scale motion |
| **Zoom transitions** | >400% scale change |
| **Rotation** | Any significant rotation |
| **Bouncing/oscillation** | Repetitive motion |

**CSS implementation:**
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Color and Vision

### Color Blindness Prevalence

| Type | Affected Population | Confusion Pairs |
|------|---------------------|-----------------|
| **Deuteranomaly** | 5% of males | Green/red |
| **Protanomaly** | 1% of males | Red/green, dark reds |
| **Tritanomaly** | 0.01% | Blue/yellow |
| **Achromatopsia** | 0.003% | All colors |

### Safe Color Combinations

| Do Use | Avoid |
|--------|-------|
| Blue + Orange | Red + Green |
| Blue + Yellow | Green + Brown |
| Purple + Yellow | Green + Blue (tritanopia) |
| High contrast pairs | Low saturation pairs |

### Color Independence Rule

Never rely on color alone to convey:
- Error states (add icon + text)
- Success states (add icon + text)
- Required fields (add asterisk + text)
- Links (add underline)
- Data series (add patterns)

**Validation rule:**
```yaml
color:
  never_alone_for:
    - error_states
    - success_states
    - required_fields
    - link_identification
    - data_differentiation
  wcag: "1.4.1 A"
```

---

## Keyboard Navigation

### Focus Order

| Rule | Implementation |
|------|----------------|
| **Logical sequence** | Match visual order |
| **No focus traps** | Escape always works |
| **Skip links** | Provide for main content |
| **Visible focus** | Clear indication |

### Standard Keyboard Shortcuts

| Key | Expected Action |
|-----|-----------------|
| **Tab** | Move to next focusable |
| **Shift+Tab** | Move to previous focusable |
| **Enter** | Activate button/link |
| **Space** | Activate button, toggle checkbox |
| **Escape** | Close modal, cancel |
| **Arrow keys** | Navigate within component |

### Modal Behavior

| Requirement | Implementation |
|-------------|----------------|
| **Focus trap** | Keep focus within modal |
| **Initial focus** | First focusable or close button |
| **Return focus** | To trigger element on close |
| **Escape to close** | Always |

---

## Forms

### Field Requirements

| Element | Requirement |
|---------|-------------|
| **Labels** | Always visible, associated |
| **Error messages** | Specific, actionable |
| **Required indicators** | Asterisk + text explanation |
| **Input modes** | Match expected data type |

### Input Type Selection

| Data Type | Input Type | Input Mode |
|-----------|------------|------------|
| **Email** | `email` | `email` |
| **Phone** | `tel` | `tel` |
| **Number** | `text` | `numeric` |
| **URL** | `url` | `url` |
| **Search** | `search` | `search` |
| **Password** | `password` | — |

### Validation Timing

| When | Approach |
|------|----------|
| **On submit** | Validate all, show summary |
| **On blur** | Validate field, show inline error |
| **On input** | Show success, not error |
| **Real-time** | Format hints only |

---

## Accessibility Quick Checks

### WCAG Level A Essentials

| Criterion | Quick Check |
|-----------|-------------|
| **1.1.1 Non-text** | All images have alt text |
| **1.3.1 Info/relationships** | Headings, lists, tables marked up |
| **1.4.1 Use of color** | Color not sole indicator |
| **2.1.1 Keyboard** | All functions keyboard accessible |
| **2.4.1 Bypass blocks** | Skip link provided |
| **3.1.1 Language** | Page language declared |
| **4.1.1 Parsing** | Valid HTML |
| **4.1.2 Name, Role, Value** | Custom controls have ARIA |

### WCAG Level AA Essentials

| Criterion | Quick Check |
|-----------|-------------|
| **1.4.3 Contrast** | 4.5:1 for text |
| **1.4.4 Resize text** | 200% zoom works |
| **1.4.10 Reflow** | 400% zoom, no horizontal scroll |
| **2.4.6 Headings/labels** | Descriptive text |
| **2.4.7 Focus visible** | Clear focus indicator |
| **3.3.1 Error identification** | Errors clearly indicated |
| **3.3.2 Labels/instructions** | Labels present |

---

## Design Tokens (CSS)

### Spacing Scale

```css
:root {
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
}
```

### Typography Scale

```css
:root {
  --text-xs: 0.75rem;   /* 12px */
  --text-sm: 0.875rem;  /* 14px */
  --text-base: 1rem;    /* 16px */
  --text-lg: 1.125rem;  /* 18px */
  --text-xl: 1.25rem;   /* 20px */
  --text-2xl: 1.5rem;   /* 24px */
  --text-3xl: 1.875rem; /* 30px */
}
```

### Touch Target Tokens

```css
:root {
  --touch-target-min: 44px;
  --touch-target-comfortable: 48px;
  --touch-spacing-min: 8px;
  --touch-spacing-comfortable: 12px;
}
```

### Timing Tokens

```css
:root {
  --duration-instant: 100ms;
  --duration-fast: 200ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## Decision Logic

### Touch Target Evaluation

```pseudo
FUNCTION evaluateTouchTarget(element):
  width = element.computedWidth
  height = element.computedHeight

  IF width < 44 OR height < 44:
    RETURN error("Touch target too small: {width}×{height}px")

  nearbyTargets = findTargetsWithin(element, 8px)
  IF nearbyTargets.length > 0:
    RETURN warning("Targets within 8px: risk of mis-tap")

  RETURN pass
```

### Contrast Evaluation

```pseudo
FUNCTION evaluateContrast(foreground, background, textSize):
  ratio = calculateContrastRatio(foreground, background)
  isLargeText = textSize >= 18 OR (textSize >= 14 AND isBold)

  IF isLargeText:
    IF ratio < 3.0: RETURN error("Large text below 3:1")
    IF ratio < 4.5: RETURN warning("Large text below AAA")
  ELSE:
    IF ratio < 4.5: RETURN error("Text below 4.5:1")
    IF ratio < 7.0: RETURN warning("Text below AAA")

  RETURN pass
```

### Cognitive Load Evaluation

```pseudo
FUNCTION evaluateCognitiveLoad(component):
  IF component.type == "menu":
    IF component.items.length > 7:
      RETURN warning("Menu has {count} items; consider grouping")

  IF component.type == "wizard":
    IF component.steps.length > 5:
      RETURN warning("Wizard has {count} steps; consider combining")

  IF component.type == "form":
    visibleFields = countVisibleFields(component)
    IF visibleFields > 7:
      RETURN warning("Form shows {count} fields; consider progressive disclosure")

  RETURN pass
```

---

## References

**Typography:**
- [WCAG 1.4.4 — Resize Text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text)
- [WCAG 1.4.12 — Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing)

**Contrast:**
- [WCAG 1.4.3 — Contrast Minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

**Touch Targets:**
- [Apple HIG — Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons)
- [Material Design — Touch Targets](https://m3.material.io/foundations/interaction/touch-targets)
- [WCAG 2.5.8 — Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)

**Response Times:**
- [Nielsen — Response Times: The 3 Important Limits](https://www.nngroup.com/articles/response-times-3-important-limits/)

**Working Memory:**
- [Cowan (2001) — The Magical Number 4](https://doi.org/10.1017/S0140525X01003922)

**Accessibility:**
- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- [WebAIM — Keyboard Accessibility](https://webaim.org/techniques/keyboard/)

---

## See Also

- [CSS/JSON Tokens](/code-design-tokens/css-json-tokens/) — Full token specifications
- [Touch Targets & Spacing](/code-design-tokens/touch-targets-spacing/) — Detailed target guidance
- [Accessible Typography](/code-design-tokens/accessible-typography/) — Typography deep dive
- [WCAG Guidelines](/accessibility/wcag-guidelines/) — Full WCAG reference
- [Cognitive Load](/cognition/cognitive-load/) — Memory and attention details
