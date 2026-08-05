---
title: Accessible Typography
description: Specifications for readable type systems—font sizes, line heights, contrast ratios, and fluid scaling that meet WCAG requirements and work for all users.
---

Typography is the foundation of readable interfaces. Get it wrong, and nothing else matters—users can't read your content. Research shows accessible typography can reduce cognitive strain by up to **35%** for users with visual impairments and reduce reading fatigue by **25%** for all users.

This page provides exact specifications that AI agents and designers can apply directly. All values are WCAG 2.2 compliant unless noted otherwise.

## Specifications

### Font Size Thresholds

| Context | Minimum | Recommended | Maximum | Unit |
|---------|---------|-------------|---------|------|
| Body text | 16px | 18px | 24px | rem preferred |
| Secondary text (captions) | 12px | 14px | 16px | rem preferred |
| Small print (legal) | 12px | 12px | 14px | rem preferred |
| Large text (headings) | 24px | — | — | rem preferred |
| Large text (bold) | 18.5px | — | — | rem preferred |

**Critical rule**: Never use font sizes below 12px for any readable text.

### Line Height Specifications

| Content Type | Minimum | Recommended | WCAG Reference |
|--------------|---------|-------------|----------------|
| Body text (paragraphs) | 1.5 (150%) | 1.6 | 1.4.12 |
| Headings | 1.1 | 1.2-1.3 | — |
| UI labels | 1.2 | 1.4 | — |
| Long-form reading | 1.5 | 1.75 | 1.4.12 |

### Spacing Requirements (WCAG 1.4.12)

Users must be able to override these values without loss of content:

| Property | Minimum Override | CSS Property |
|----------|------------------|--------------|
| Line height | 1.5× font size | `line-height` |
| Paragraph spacing | 2× font size | `margin-bottom` |
| Letter spacing | 0.12× font size | `letter-spacing` |
| Word spacing | 0.16× font size | `word-spacing` |

### Contrast Ratios

| Text Type | WCAG AA | WCAG AAA | Notes |
|-----------|---------|----------|-------|
| Normal text (<24px) | 4.5:1 | 7:1 | Most body text |
| Large text (≥24px) | 3:1 | 4.5:1 | Headlines |
| Large bold text (≥18.5px bold) | 3:1 | 4.5:1 | Bold subheadings |
| UI components | 3:1 | — | Buttons, inputs, icons |
| Placeholder text | 4.5:1 | 7:1 | Often fails—check this |
| Disabled text | No requirement | — | But 3:1 recommended |

### Line Length (Characters per Line)

| Context | Minimum | Optimal | Maximum |
|---------|---------|---------|---------|
| Body text | 45 | 65-75 | 90 |
| Mobile | 35 | 45-60 | 75 |
| Dyslexic readers | 35 | 50-60 | 70 |

**Research finding**: Shorter lines improve reading speed by **27%** for dyslexic readers.

## Validation Rules

```yaml
rules:
  - id: typography-body-size
    severity: error
    check: "Body text font-size >= 16px (1rem)"
    selector: "p, li, td, dd, .body-text"

  - id: typography-minimum-size
    severity: error
    check: "All readable text >= 12px"
    selector: "*:not(sup):not(sub)"

  - id: typography-line-height
    severity: warning
    check: "Body text line-height >= 1.5"
    selector: "p, li, .body-text"

  - id: typography-contrast-normal
    severity: error
    check: "Normal text contrast ratio >= 4.5:1"
    wcag: "1.4.3 AA"

  - id: typography-contrast-large
    severity: error
    check: "Large text (>=24px or >=18.5px bold) contrast >= 3:1"
    wcag: "1.4.3 AA"

  - id: typography-line-length
    severity: warning
    check: "Line length <= 80 characters"
    selector: "p, li"

  - id: typography-text-resize
    severity: error
    check: "Text resizable to 200% without loss of content"
    wcag: "1.4.4 AA"

  - id: typography-relative-units
    severity: warning
    check: "Font sizes use relative units (rem, em)"
    selector: "[style*='font-size']"
```

## Type Scale Tokens

### Standard Scale (1.25 ratio - Major Third)

```css
:root {
  /* Font sizes */
  --font-size-xs: 0.75rem;     /* 12px - minimum readable */
  --font-size-sm: 0.875rem;    /* 14px - secondary text */
  --font-size-base: 1rem;      /* 16px - body text */
  --font-size-lg: 1.125rem;    /* 18px - emphasized body */
  --font-size-xl: 1.25rem;     /* 20px - small headings */
  --font-size-2xl: 1.5rem;     /* 24px - h4, large text threshold */
  --font-size-3xl: 1.875rem;   /* 30px - h3 */
  --font-size-4xl: 2.25rem;    /* 36px - h2 */
  --font-size-5xl: 3rem;       /* 48px - h1 */

  /* Line heights */
  --line-height-tight: 1.25;    /* headings */
  --line-height-snug: 1.375;    /* subheadings */
  --line-height-normal: 1.5;    /* body minimum */
  --line-height-relaxed: 1.625; /* body recommended */
  --line-height-loose: 1.75;    /* long-form reading */

  /* Letter spacing */
  --letter-spacing-tight: -0.025em;  /* large headings */
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.025em;    /* all caps, small text */
  --letter-spacing-wider: 0.05em;    /* uppercase labels */

  /* Paragraph spacing */
  --paragraph-spacing: 1.5em;  /* 1.5× font size */

  /* Line length */
  --measure-narrow: 45ch;
  --measure-base: 65ch;
  --measure-wide: 80ch;
}
```

### JSON Token Format

```json
{
  "typography": {
    "fontSize": {
      "xs": { "value": "0.75rem", "px": 12, "minReadable": true },
      "sm": { "value": "0.875rem", "px": 14, "use": "secondary" },
      "base": { "value": "1rem", "px": 16, "use": "body" },
      "lg": { "value": "1.125rem", "px": 18, "use": "emphasized" },
      "xl": { "value": "1.25rem", "px": 20, "use": "small-heading" },
      "2xl": { "value": "1.5rem", "px": 24, "use": "heading", "wcagLargeText": true },
      "3xl": { "value": "1.875rem", "px": 30, "use": "heading" },
      "4xl": { "value": "2.25rem", "px": 36, "use": "heading" },
      "5xl": { "value": "3rem", "px": 48, "use": "display" }
    },
    "lineHeight": {
      "tight": { "value": 1.25, "use": "headings" },
      "snug": { "value": 1.375, "use": "subheadings" },
      "normal": { "value": 1.5, "use": "body-minimum", "wcagMinimum": true },
      "relaxed": { "value": 1.625, "use": "body-recommended" },
      "loose": { "value": 1.75, "use": "long-form" }
    },
    "measure": {
      "narrow": { "value": "45ch", "characters": 45 },
      "base": { "value": "65ch", "characters": 65, "optimal": true },
      "wide": { "value": "80ch", "characters": 80, "maximum": true }
    },
    "contrast": {
      "normalText": { "minimum": 4.5, "wcag": "AA" },
      "largeText": { "minimum": 3.0, "wcag": "AA" },
      "normalTextAAA": { "minimum": 7.0, "wcag": "AAA" },
      "largeTextAAA": { "minimum": 4.5, "wcag": "AAA" }
    }
  }
}
```

## Fluid Typography

### Clamp Formula

```
font-size: clamp(MIN, PREFERRED, MAX)
```

Where PREFERRED typically combines viewport and relative units:

```css
/* Accessible fluid typography pattern */
font-size: clamp(1rem, 0.5rem + 1vw, 1.5rem);
```

**Critical**: Always include a `rem` component in the preferred value. Using `vw` alone breaks zoom accessibility.

### Fluid Type Scale

```css
:root {
  /* Fluid scale: scales between 320px and 1200px viewport */
  --fluid-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --fluid-sm: clamp(0.875rem, 0.8rem + 0.35vw, 1rem);
  --fluid-base: clamp(1rem, 0.9rem + 0.5vw, 1.25rem);
  --fluid-lg: clamp(1.125rem, 1rem + 0.6vw, 1.5rem);
  --fluid-xl: clamp(1.25rem, 1rem + 1vw, 2rem);
  --fluid-2xl: clamp(1.5rem, 1.1rem + 1.5vw, 2.5rem);
  --fluid-3xl: clamp(1.875rem, 1.2rem + 2.5vw, 3.5rem);
  --fluid-4xl: clamp(2.25rem, 1.5rem + 3vw, 4.5rem);
  --fluid-5xl: clamp(3rem, 2rem + 4vw, 6rem);
}
```

### Fluid Line Height

Line height should also be fluid—tighter at larger sizes:

```css
:root {
  --fluid-leading-heading: clamp(1.1, 1.05 + 0.15vw, 1.3);
  --fluid-leading-body: clamp(1.5, 1.4 + 0.1vw, 1.75);
}

h1 { line-height: var(--fluid-leading-heading); }
p { line-height: var(--fluid-leading-body); }
```

## Font Selection

### Accessibility Requirements

Fonts must have:

| Feature | Requirement | Why |
|---------|-------------|-----|
| Character distinction | `I`, `l`, `1` visually distinct | Prevents misreading |
| High x-height | ≥70% of cap height | Improves small-size readability |
| Open counters | Clear space in `e`, `a`, `o` | Aids character recognition |
| Consistent stroke width | Uniform or near-uniform | Reduces visual complexity |
| Complete character set | Latin Extended + common symbols | Supports internationalization |

### Recommended System Font Stack

```css
/* Modern system font stack - instant loading, optimized per platform */
font-family:
  -apple-system,           /* Safari Mac/iOS */
  BlinkMacSystemFont,      /* Chrome Mac */
  "Segoe UI",              /* Windows */
  Roboto,                  /* Android, Chrome OS */
  "Helvetica Neue",        /* Older Mac */
  Arial,                   /* Fallback */
  "Noto Sans",             /* Linux, CJK support */
  sans-serif,              /* Generic fallback */
  "Apple Color Emoji",     /* Mac emoji */
  "Segoe UI Emoji",        /* Windows emoji */
  "Noto Color Emoji";      /* Linux/Android emoji */
```

### Monospace Stack (Code)

```css
font-family:
  ui-monospace,
  "Cascadia Code",
  "Source Code Pro",
  Menlo,
  Consolas,
  "DejaVu Sans Mono",
  monospace;
```

### Accessibility-Tested Web Fonts

| Font | Type | x-height | Character Clarity | Notes |
|------|------|----------|-------------------|-------|
| Inter | Sans | High | Excellent | Free, variable |
| Source Sans 3 | Sans | High | Excellent | Adobe, free |
| Atkinson Hyperlegible | Sans | Very High | Designed for low vision | Free |
| Lexend | Sans | High | Good | Designed for reading |
| IBM Plex Sans | Sans | High | Excellent | Free, variable |
| Literata | Serif | High | Good | Google Docs default |

### Dyslexia Considerations

Research shows **font choice is less important than size and spacing** for dyslexic readers:

**What actually helps:**
- Font size ≥16px (larger preferred)
- Generous line spacing (1.5-2.0)
- Shorter line lengths (50-60 characters)
- Left-aligned text (not justified)
- Sans-serif fonts (simpler letter shapes)
- Adequate letter and word spacing

**Specialized fonts (OpenDyslexic, Dyslexie):**
- Research shows no significant improvement over Arial/Verdana
- Some users report personal preference
- Offer as an option, not default

## Decision Logic

### Font Size Selection

```
IF context = "body-text":
  font-size >= 16px (1rem)
  line-height >= 1.5

IF context = "secondary-text" (captions, timestamps):
  font-size >= 14px (0.875rem)
  font-size < body-text-size

IF context = "heading":
  IF level = 1: font-size >= 32px (2rem)
  IF level = 2: font-size >= 24px (1.5rem)
  IF level = 3: font-size >= 20px (1.25rem)
  IF level = 4: font-size >= 18px (1.125rem)
  line-height = 1.2-1.3

IF context = "legal-small-print":
  font-size >= 12px (0.75rem)
  WARN: Consider 14px for better accessibility

IF user-has-zoom-preference:
  USE relative units (rem) only
  ALLOW 200% zoom without overflow
```

### Contrast Selection

```
IF font-size < 24px AND font-weight < 700:
  contrast-ratio >= 4.5:1 (WCAG AA)

IF font-size >= 24px OR (font-size >= 18.5px AND font-weight >= 700):
  contrast-ratio >= 3:1 (WCAG AA)

IF target = "AAA":
  normal-text: contrast-ratio >= 7:1
  large-text: contrast-ratio >= 4.5:1

IF element = "placeholder":
  contrast-ratio >= 4.5:1
  NOTE: Many placeholders fail this—verify

IF element = "disabled":
  No WCAG requirement
  RECOMMEND: contrast-ratio >= 3:1 for visual clarity
```

### Line Length Calculation

```
IF container-width / font-size > 80:
  SET max-width on text container
  RECOMMEND: max-width = 65ch

IF mobile-viewport:
  max-width = min(100%, 75ch)
  CHECK: text doesn't require horizontal scroll
```

## Code Patterns

### Accessible Paragraph

```html
<p style="
  font-size: 1rem;
  line-height: 1.6;
  max-width: 65ch;
  letter-spacing: normal;
">
  Body text content here.
</p>
```

### Accessible Heading Hierarchy

```html
<h1 style="font-size: 2.5rem; line-height: 1.2; letter-spacing: -0.025em;">
  Page Title
</h1>
<h2 style="font-size: 1.75rem; line-height: 1.25;">Section Heading</h2>
<h3 style="font-size: 1.25rem; line-height: 1.3;">Subsection</h3>
```

### Responsive Typography Container

```css
.prose {
  font-size: clamp(1rem, 0.9rem + 0.5vw, 1.25rem);
  line-height: 1.6;
  max-width: 65ch;
  margin-inline: auto;
  padding-inline: 1rem;
}

.prose h1 {
  font-size: clamp(2rem, 1.5rem + 2vw, 3.5rem);
  line-height: 1.2;
  margin-block: 1em 0.5em;
}

.prose h2 {
  font-size: clamp(1.5rem, 1.25rem + 1vw, 2.25rem);
  line-height: 1.25;
  margin-block: 1.5em 0.5em;
}

.prose p {
  margin-block: 1em;
}

/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  .prose { font-size: 1rem; } /* No fluid scaling */
}
```

### Text Spacing Override Test

```css
/* Apply to test WCAG 1.4.12 compliance */
.text-spacing-test * {
  line-height: 1.5 !important;
  letter-spacing: 0.12em !important;
  word-spacing: 0.16em !important;
}

.text-spacing-test p {
  margin-bottom: 2em !important;
}
```

## Implementation Checklist

### Typography Audit

- [ ] **Body text size**: ≥16px (1rem)
- [ ] **Minimum size**: No text below 12px
- [ ] **Line height**: Body text ≥1.5
- [ ] **Contrast normal**: All normal text ≥4.5:1
- [ ] **Contrast large**: Large text ≥3:1
- [ ] **Line length**: ≤80 characters (65ch recommended)
- [ ] **Relative units**: rem/em used for font-size
- [ ] **200% zoom**: No overflow or overlap at 200%
- [ ] **Text spacing**: No content loss when spacing overridden (1.4.12)
- [ ] **System fonts or tested web fonts**: Fonts verified for accessibility

### Validation Workflow

```
1. Check all font-size values >= 12px minimum
2. Check body text >= 16px
3. Run contrast checker on all text/background combinations
4. Test at 200% browser zoom
5. Apply text spacing override styles, verify no content loss
6. Verify line length on widest viewport
7. Test with screen reader for content access
```

## Recent Research

### Typography and Cognitive Load

According to [2024 accessibility research](https://www.uxpin.com/studio/blog/ultimate-guide-to-typography-accessibility-testing/), accessible typography can reduce cognitive strain by up to **35%** for users with visual impairments. [Smashing Magazine (2024)](https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/) reports good spacing can reduce reading fatigue by **25%**.

### Line Spacing Impact

[University research](https://www.digitala11y.com/choosing-accessible-fonts-enhancing-readability-and-inclusivity/) shows increasing line spacing from 100% to 120% improves reading accuracy by up to **20%** and reduces eye strain by **30%** during prolonged reading.

### Dyslexia Font Research

[Studies comparing OpenDyslexic with standard fonts](https://www.edutopia.org/article/do-dyslexia-fonts-actually-work/) found no significant improvement in reading speed or accuracy. Research indicates that font size and spacing matter more than specialized typefaces for dyslexic readers. Shorter line lengths can improve reading speed by **27%** for this population.

### Fluid Typography Adoption

[CSS clamp() is now supported by 91.4% of browsers](https://moderncss.dev/generating-font-size-css-rules-and-creating-a-fluid-type-scale/), making fluid typography a standard practice. However, [accessibility testing](https://blog.logrocket.com/fluid-vs-responsive-typography-css-clamp/) emphasizes that viewport-only units break zoom—always combine `vw` with `rem`.

### WCAG 1.4.12 Compliance

[Section508.gov guidance](https://www.section508.gov/develop/fonts-typography/) confirms WCAG 1.4.12 requires no loss of content when users override text spacing to 1.5× line height, 2× paragraph spacing, 0.12× letter spacing, and 0.16× word spacing.

## References

**Official Standards:**
- [WCAG 2.2 — Contrast Minimum (1.4.3)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum)
- [WCAG 2.2 — Resize Text (1.4.4)](https://www.w3.org/WAI/WCAG22/Understanding/resize-text)
- [WCAG 2.2 — Text Spacing (1.4.12)](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing)
- [Section508.gov — Fonts and Typography](https://www.section508.gov/develop/fonts-typography/)

**Type Scale Tools:**
- [Type Scale Calculator](https://type-scale.com/)
- [Utopia Fluid Type Scale](https://utopia.fyi/type/calculator/)
- [Fluid Type Scale Calculator](https://www.fluid-type-scale.com/)

**Research & Guidelines:**
- [WebAIM — Typefaces and Fonts](https://webaim.org/techniques/fonts/)
- [The A11Y Collective — WCAG Minimum Font Size](https://www.a11y-collective.com/blog/wcag-minimum-font-size/)
- [Modern Fluid Typography Using CSS Clamp](https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/) — Smashing Magazine
- [Choosing Accessible Fonts](https://www.digitala11y.com/choosing-accessible-fonts-enhancing-readability-and-inclusivity/) — DigitalA11Y

**Font Resources:**
- [Google Fonts](https://fonts.google.com/)
- [Atkinson Hyperlegible](https://brailleinstitute.org/freefont) — Braille Institute
- [Inter](https://rsms.me/inter/) — Rasmus Andersson
- [Lexend](https://www.lexend.com/) — Designed for reading

---

## See Also

- [Legibility & Contrast](/perception/vision/legibility-contrast/) — Visual perception fundamentals
- [Colour & Accessibility](/perception/vision/colour-accessibility/) — Color contrast requirements
- [CSS/JSON Tokens](/code-design-tokens/css-json-tokens/) — Design token formats
- [Cognitive Load](/cognition/cognitive-load/) — Reducing reading effort
- [WCAG Guidelines](/accessibility/wcag-guidelines/) — Full accessibility standards
