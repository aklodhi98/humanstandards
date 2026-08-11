---
title: Touch Targets & Spacing
description: Specifications for interactive element sizing—minimum dimensions, spacing requirements, and density modes that meet WCAG and platform standards.
---

Touch targets need to be big enough to hit reliably. Fingers are imprecise, conditions vary (cold hands, moving vehicles, motor impairments), and accidental taps frustrate users. Fitts' Law tells us that target acquisition time decreases as target size increases—and error rates follow the same pattern. Research shows error rates around **12%** when target width drops to 5mm.

This page provides exact specifications that AI agents and designers can apply directly. All values are WCAG 2.2 compliant.

## Specifications

### Target Size Requirements

| Standard | Size | Level | Unit | Legal Status |
|----------|------|-------|------|--------------|
| WCAG 2.5.8 | 24×24 | AA | CSS px | Required (ADA, Section 508, EAA) |
| WCAG 2.5.5 | 44×44 | AAA | CSS px | Recommended |
| Apple HIG | 44×44 | — | pt | Platform guideline |
| Material Design 3 | 48×48 | — | dp | Platform guideline |

**Cross-platform safe baseline**: 44×44 CSS pixels

**Note**: These are minimum dimensions. Larger is better for accessibility.

### Target Spacing Requirements

| Scenario | Minimum Gap | Recommended | Notes |
|----------|-------------|-------------|-------|
| Adjacent targets (both ≥24px) | 0px | 8px | WCAG 2.5.8 allows touching |
| Adjacent targets (any <24px) | Satisfy the 24px spacing geometry | Product-specific | Spacing exception can compensate for size |
| General interactive elements | Product-specific | 8-12px | Design guidance to reduce mis-taps, not a universal WCAG gap |
| Motor impairment accommodations | 12px | 16px+ | Spacious mode |
| Destructive adjacent to safe | 16px+ | 24px+ | Prevent catastrophic errors |

### WCAG 2.5.8 Spacing Formula

If a target is below 24×24 CSS px, imagine a 24px-diameter circle centred on
the target's bounding box. That circle must not intersect another target or the
equivalent circle around another undersized target. For equal square targets in
a row, a useful simplification is:

```
Minimum edge-to-edge gap = 24px - target dimension
```

For two equal 20×20px targets: `24 - 20 = 4px` minimum edge-to-edge gap. This
does not mean 4px of extra spacing on each side. Mixed sizes and non-linear
arrangements should be checked against the circle geometry in the normative
[WCAG 2.5.8 definition](https://www.w3.org/WAI/WCAG22/#target-size-minimum).

### Platform-Specific Conversions

| Platform | Unit | Base | 44px equivalent | 48px equivalent |
|----------|------|------|-----------------|-----------------|
| iOS | pt | 1pt = 1px @1x | 44pt | 48pt |
| Android | dp | 1dp ≈ 1px @160dpi | 44dp | 48dp |
| Web | CSS px | Reference pixel | 44px | 48px |
| Web (rem) | rem | 16px base | 2.75rem | 3rem |

## Validation Rules

```yaml
rules:
  - id: target-size-minimum-aa
    severity: error
    check: "Interactive elements ≥ 24×24 CSS px OR have adequate spacing"
    selector: "button, a, input, select, textarea, [role='button'], [role='link'], [tabindex]"
    wcag: "2.5.8 AA"

  - id: target-size-enhanced-aaa
    severity: warning
    check: "Interactive elements ≥ 44×44 CSS px"
    selector: "button, a, input, select, textarea, [role='button'], [role='link']"
    wcag: "2.5.5 AAA"

  - id: target-spacing-minimum
    severity: warning
    check: "Adjacent interactive elements have ≥ 8px gap"
    selector: "button + button, a + a, .btn-group > *"

  - id: target-destructive-spacing
    severity: error
    check: "Destructive actions not adjacent to common actions OR have ≥ 16px gap"
    selector: "[data-destructive], .btn-danger, .btn-delete"

  - id: target-inline-exception
    severity: info
    check: "Inline links in text exempt from size requirements"
    selector: "p a, li a, td a"
    wcag: "2.5.8 exception"

  - id: touch-target-hit-area
    severity: warning
    check: "Visual element smaller than 24px has padding to extend hit area"
    selector: ".icon-button, [class*='icon']"
```

## Token Definitions

### CSS Custom Properties

```css
:root {
  /* === TARGET SIZES === */

  /* Minimum (WCAG 2.5.8 AA) */
  --target-size-min: 1.5rem;        /* 24px */

  /* Comfortable (WCAG 2.5.5 AAA / Apple HIG) */
  --target-size-comfortable: 2.75rem; /* 44px */

  /* Recommended (Material Design 3) */
  --target-size-recommended: 3rem;   /* 48px */

  /* Large (motor impairment friendly) */
  --target-size-large: 3.5rem;       /* 56px */

  /* Extra large */
  --target-size-xl: 4rem;            /* 64px */

  /* === SPACING BETWEEN TARGETS === */

  /* Minimum separation */
  --target-gap-min: 0.5rem;          /* 8px */

  /* Comfortable separation */
  --target-gap-comfortable: 0.75rem; /* 12px */

  /* Spacious separation */
  --target-gap-spacious: 1rem;       /* 16px */

  /* Destructive action separation */
  --target-gap-destructive: 1.5rem;  /* 24px */

  /* === TOUCH-SAFE ICON SIZES === */

  /* Icon visual size (small) */
  --icon-size-sm: 1rem;              /* 16px */

  /* Icon visual size (medium) */
  --icon-size-md: 1.5rem;            /* 24px */

  /* Icon visual size (large) */
  --icon-size-lg: 2rem;              /* 32px */

  /* Padding to extend hit area for small icons */
  --icon-touch-padding: 0.75rem;     /* 12px - creates 40px hit area for 16px icon */
}
```

### JSON Token Format

```json
{
  "touchTargets": {
    "size": {
      "min": {
        "value": "1.5rem",
        "px": 24,
        "wcag": "2.5.8",
        "level": "AA",
        "description": "Minimum interactive target size"
      },
      "comfortable": {
        "value": "2.75rem",
        "px": 44,
        "wcag": "2.5.5",
        "level": "AAA",
        "platform": ["Apple HIG"],
        "description": "Recommended touch target size"
      },
      "recommended": {
        "value": "3rem",
        "px": 48,
        "platform": ["Material Design 3"],
        "description": "Material Design recommended size"
      },
      "large": {
        "value": "3.5rem",
        "px": 56,
        "description": "Motor impairment friendly"
      },
      "xl": {
        "value": "4rem",
        "px": 64,
        "description": "Extra large for critical actions"
      }
    },
    "gap": {
      "min": {
        "value": "0.5rem",
        "px": 8,
        "description": "Minimum separation between targets"
      },
      "comfortable": {
        "value": "0.75rem",
        "px": 12,
        "description": "Comfortable separation"
      },
      "spacious": {
        "value": "1rem",
        "px": 16,
        "description": "Spacious mode separation"
      },
      "destructive": {
        "value": "1.5rem",
        "px": 24,
        "description": "Separation before destructive actions"
      }
    },
    "exceptions": {
      "inline": {
        "applies": "Links within text blocks",
        "wcag": "2.5.8 exception",
        "minSize": "none"
      },
      "essential": {
        "applies": "When size change would alter meaning",
        "wcag": "2.5.8 exception",
        "minSize": "none"
      },
      "userControlled": {
        "applies": "User agent controlled elements",
        "wcag": "2.5.8 exception",
        "minSize": "none"
      }
    }
  }
}
```

## Decision Logic

### Target Size Selection

```
INPUT: component_type, context, platform

IF component_type = "primary-button":
  min-height >= 44px
  min-width >= 44px (or content width if wider)
  RECOMMEND: 48px height for touch-primary contexts

IF component_type = "icon-button":
  IF icon-visual-size < 24px:
    ADD padding to reach 44px hit area
    EXAMPLE: 16px icon + 14px padding each side = 44px
  ELSE:
    min-size >= 44px including icon

IF component_type = "text-link":
  IF inline (within paragraph/list):
    EXEMPT from size requirements (WCAG 2.5.8 exception)
  ELSE (standalone link):
    min-height >= 24px
    RECOMMEND: 44px touch area via padding

IF component_type = "form-input":
  min-height >= 44px
  full-width or min-width >= 44px

IF component_type = "checkbox" OR "radio":
  hit-area >= 44×44px
  visual-indicator can be smaller
  label should extend hit area

IF platform = "iOS":
  USE 44pt minimum
IF platform = "Android":
  USE 48dp minimum
IF platform = "web":
  USE 44px minimum (2.75rem)
```

### Spacing Selection

```
INPUT: target_size, adjacent_target_size, action_type, density_mode

IF action_type = "destructive":
  gap >= 16px (--target-gap-spacious)
  RECOMMEND: 24px (--target-gap-destructive)
  NEVER place adjacent to "submit" or "confirm"

IF target_size < 24px OR adjacent_target_size < 24px:
  gap >= (24px - smaller_target_size)
  COMBINED space must create 24px clearance

IF density_mode = "compact":
  gap >= 4px
  WARN: May not meet WCAG 2.5.8 if targets < 24px

IF density_mode = "comfortable":
  gap >= 8px

IF density_mode = "spacious":
  gap >= 16px

DEFAULT:
  gap >= 8px (--target-gap-min)
```

### Hit Area Extension

```
INPUT: visual_size, required_hit_area

IF visual_size < required_hit_area:
  padding_needed = (required_hit_area - visual_size) / 2

  OPTION 1: Add padding
    padding: {padding_needed}px

  OPTION 2: Use pseudo-element
    ::before or ::after with absolute positioning
    extends hit area without affecting layout

  OPTION 3: Transparent border
    border: {padding_needed}px solid transparent

EXAMPLE:
  visual_size = 24px
  required_hit_area = 44px
  padding_needed = (44 - 24) / 2 = 10px

  .icon-button {
    width: 24px;
    height: 24px;
    padding: 10px;
    /* Total hit area: 44×44px */
  }
```

## Code Patterns

### Basic Touch Target

```html
<button
  type="button"
  style="
    min-width: 44px;
    min-height: 44px;
    padding: 12px 16px;
  ">
  Action
</button>
```

### Icon Button with Extended Hit Area

```css
.icon-button {
  /* Visual container */
  display: inline-flex;
  align-items: center;
  justify-content: center;

  /* Visual size */
  width: 24px;
  height: 24px;

  /* Extend to 44px hit area */
  padding: 10px;

  /* Or use min-width/height */
  min-width: 44px;
  min-height: 44px;

  /* Remove default button styles */
  background: transparent;
  border: none;
  cursor: pointer;
}

.icon-button svg {
  width: 24px;
  height: 24px;
}
```

### Hit Area via Pseudo-Element

```css
.small-link {
  position: relative;
  /* Visual styles... */
}

.small-link::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 44px;
  height: 44px;
  /* Invisible but tappable */
}
```

### Button Group with Proper Spacing

```css
.button-group {
  display: flex;
  gap: var(--target-gap-comfortable); /* 12px */
}

.button-group--destructive-last > :last-child {
  margin-left: var(--target-gap-destructive); /* 24px */
}
```

### Checkbox with Extended Hit Area

```html
<label class="checkbox-label">
  <input type="checkbox" class="checkbox-input" />
  <span class="checkbox-visual"></span>
  <span class="checkbox-text">Option label</span>
</label>
```

```css
.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding: 8px;
  cursor: pointer;
}

.checkbox-input {
  /* Visually hidden but still accessible */
  position: absolute;
  opacity: 0;
  width: 44px;
  height: 44px;
  margin: 0;
  cursor: pointer;
}

.checkbox-visual {
  width: 20px;
  height: 20px;
  border: 2px solid currentColor;
  border-radius: 4px;
  /* Visual checkbox indicator */
}

.checkbox-input:checked + .checkbox-visual {
  background: currentColor;
}
```

### Density Mode System

```css
/* Base (comfortable) */
:root {
  --target-size: 2.75rem;    /* 44px */
  --target-gap: 0.5rem;      /* 8px */
}

/* Compact mode */
[data-density="compact"] {
  --target-size: 2rem;       /* 32px */
  --target-gap: 0.25rem;     /* 4px */
}

/* Spacious mode (accessibility) */
[data-density="spacious"] {
  --target-size: 3.5rem;     /* 56px */
  --target-gap: 1rem;        /* 16px */
}

/* Apply to components */
.btn {
  min-height: var(--target-size);
  min-width: var(--target-size);
}

.btn-group > * + * {
  margin-left: var(--target-gap);
}
```

### Responsive Touch Targets

```css
/* Desktop: can be slightly smaller */
.btn {
  min-height: 36px;
  min-width: 36px;
}

/* Touch devices: enforce minimum */
@media (pointer: coarse) {
  .btn {
    min-height: 44px;
    min-width: 44px;
  }
}

/* Large touch targets for motor impairment preferences */
@media (prefers-reduced-motion: reduce) {
  .btn {
    min-height: 48px;
  }
}
```

## WCAG 2.5.8 Exceptions

The following are exempt from the 24×24px minimum:

### 1. Inline Targets

```html
<!-- EXEMPT: Link within text -->
<p>Read the <a href="/terms">terms and conditions</a> before continuing.</p>

<!-- NOT EXEMPT: Standalone link -->
<a href="/terms" class="standalone-link">Terms and Conditions</a>
```

### 2. User Agent Controlled

```html
<!-- EXEMPT: Browser default controls -->
<input type="date" />
<select>...</select>
```

### 3. Essential Presentation

```html
<!-- EXEMPT: Map pins where position is meaningful -->
<div class="map-marker" style="width: 16px; height: 16px;">📍</div>
```

### 4. Spacing Compensation

```html
<!-- COMPLIANT: Small target but adequate spacing -->
<div style="display: flex; gap: 20px;">
  <button style="width: 20px; height: 20px;">×</button>
  <!-- 20px gap creates 24px clearance diameter -->
</div>
```

## Fitts' Law Considerations

### Formula

```
Movement Time = a + b × log₂(2D/W)
```

Where:
- D = distance to target
- W = width of target
- a, b = empirically derived constants

### Design Implications

| Principle | Application |
|-----------|-------------|
| **Bigger is faster** | Increase target size to reduce selection time |
| **Closer is faster** | Group related actions together |
| **Edges are infinite** | Targets at screen edges are easier to hit |
| **Corners are best** | Corner targets have two infinite edges |

### Touch-Specific Adjustments

FFitts Law (Finger-Fitts) accounts for:
- Finger occlusion (can't see target during tap)
- Variable contact area (finger angle, pressure)
- Absolute precision limits of touch input

**Research finding**: Error rates ~12% at 5mm target width. Error rates level off around 10mm (40px).

## Implementation Checklist

### Target Size Audit

- [ ] **All interactive elements ≥24×24px** (WCAG 2.5.8 AA)
- [ ] **Primary actions ≥44×44px** (WCAG 2.5.5 AAA recommended)
- [ ] **Icon buttons have extended hit area** (padding or pseudo-element)
- [ ] **Checkboxes/radios: label extends hit area**
- [ ] **Form inputs min-height ≥44px**

### Spacing Audit

- [ ] **Undersized targets satisfy the WCAG 24px spacing geometry**
- [ ] **Product-recommended gaps reduce mis-taps without flattening spatial hierarchy**
- [ ] **Destructive actions separated by ≥16px**
- [ ] **Small targets (<24px) have compensating spacing**
- [ ] **Button groups use consistent spacing tokens**

### Platform Compliance

- [ ] **iOS: ≥44pt targets**
- [ ] **Android: ≥48dp targets**
- [ ] **Web: ≥44px targets (2.75rem)**

### Testing

- [ ] **Tested on actual touch devices**
- [ ] **Tested with non-dominant hand/thumb**
- [ ] **Tested at 200% zoom**
- [ ] **Tested with screen magnification**
- [ ] **User tested with motor impairment participants**

### Density Modes (if applicable)

- [ ] **Compact mode still meets 24×24px minimum**
- [ ] **Spacious mode available for accessibility**
- [ ] **User preference is respected/saved**

## Recent Research

### WCAG 2.5.8 Legal Status

With the [European Accessibility Act (EAA) in force since June 28, 2025](https://www.allaccessible.org/blog/wcag-258-target-size-minimum-implementation-guide), WCAG 2.5.8 Target Size (Minimum) is now legally required in the EU alongside existing ADA and Section 508 requirements in the US.

### FFitts Law for Touch Input

[Research on FFitts Law](https://www3.cs.stonybrook.edu/~xiaojun/pdf/FFitts.pdf) demonstrates that traditional Fitts' Law is insufficient for modeling small-target acquisition with finger touch. The dual-distribution hypothesis better explains touch accuracy, accounting for both relative precision (speed-accuracy tradeoff) and absolute precision limits of finger touch.

### Touch Error Rate Research

[2024 ACM research](https://dl.acm.org/doi/10.1145/3723178.3723211) analyzed touch errors across 412 participants, extending Fitts' Law to 3D spatial pointers (human fingers). The study determined optimal object width relative to finger width that minimizes errors.

### Tappy Plugin for Design Validation

A [November 2024 preprint](https://www.smashingmagazine.com/2022/02/fitts-law-touch-era/) introduced tools for predicting tap success rates during UI design, addressing how users sometimes fail to tap elements and emphasizing the importance of configuring elements for accurate selection.

### Mobile Grip Research

[Touch design research](https://www.smashingmagazine.com/2022/02/fitts-law-touch-era/) found that people hold phones in many ways and shift constantly—designers cannot predict grip with accuracy. This reinforces the need for generous target sizes that work across all holding positions.

## References

**Official Standards:**
- [WCAG 2.2 — Target Size Minimum (2.5.8)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)
- [WCAG 2.2 — Target Size Enhanced (2.5.5)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html)
- [Apple HIG — Buttons Size and Layout](https://developer.apple.com/design/human-interface-guidelines/buttons)
- [Material Design 3 — Accessibility Basics](https://m3.material.io/foundations/accessible-design/accessibility-basics)

**Implementation Guides:**
- [WCAG 2.5.8 Implementation Guide](https://www.allaccessible.org/blog/wcag-258-target-size-minimum-implementation-guide) — AllAccessible
- [Understanding SC 2.5.8](https://www.digitala11y.com/understanding-sc-2-5-8-target-size-minimum/) — DigitalA11Y
- [Target Size and 2.5.5](https://adrianroselli.com/2019/06/target-size-and-2-5-5.html) — Adrian Roselli

**Research:**
- [Fitts' Law In The Touch Era](https://www.smashingmagazine.com/2022/02/fitts-law-touch-era/) — Smashing Magazine
- [FFitts Law: Modeling Finger Touch](https://www3.cs.stonybrook.edu/~xiaojun/pdf/FFitts.pdf) — Stony Brook University
- [Fitts's Law Applications in UX](https://www.nngroup.com/articles/fitts-law/) — NN/g

---

## See Also

- [Spatial Rhythm, Grouping & Layout](/code-design-tokens/spatial-rhythm-layout/) — Relationship-first layout guidance
- [Targets & Spacing](/ergonomics/targets-spacing/) — Ergonomic foundations
- [Touch](/perception/touch/) — Touch perception and interaction
- [Accessible Typography](/code-design-tokens/accessible-typography/) — Text sizing tokens
- [CSS/JSON Tokens](/code-design-tokens/css-json-tokens/) — Token format standards
- [Defensive Design](/decision-making-errors/defensive-design/) — Preventing destructive mis-taps
