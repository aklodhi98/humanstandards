---
title: Accessible Typography
description: Tokenize type scales and ensure readable sizes and contrast across contexts.
---

Typography is the foundation of readable interfaces. Get it wrong, and nothing else matters — users can't read your content. Get it right, and the interface disappears, letting users focus on what they came to do.

## Size matters

### Minimum body text size

Body text should be at least 16px (1rem). This isn't arbitrary — it's roughly the size of text in a printed book held at normal reading distance.

- **16px minimum** for body text
- **12-14px** only for secondary text (captions, timestamps)
- **Never** use sizes below 12px for any readable text

### Responsive scaling

Use `clamp()` to set minimum, preferred, and maximum sizes:

```css
font-size: clamp(1rem, 0.9rem + 0.5vw, 1.25rem);
```

This prevents text from becoming too small on mobile or too large on wide monitors.

## Type scale tokens

Use a consistent ratio (1.25, 1.333, 1.5) to generate harmonious sizes:

```css
:root {
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
}
```

## Line height and spacing

For body text, use 1.4 to 1.6 line-height. Tighter for headings, looser for long-form reading.

```css
:root {
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
}
```

## Contrast requirements

### WCAG contrast ratios

- **Normal text** (<24px): **4.5:1** minimum
- **Large text** (≥24px or ≥18.5px bold): **3:1** minimum
- **UI components**: **3:1** minimum

Test every text color + background combination — including hover, focus, and selected states.

## Font choice

Choose fonts designed for screen reading:
- High x-height (tall lowercase letters)
- Open counters (space inside letters like 'e', 'a')
- Distinct letterforms (distinguish 'I', 'l', '1')

System font stacks load instantly and are optimized per platform:

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
             Roboto, "Helvetica Neue", Arial, sans-serif;
```

## User preferences

Use relative units (rem, em) so text scales with user's system settings. Never override user font size preferences.

## References

- WCAG 2.2 — Contrast (Minimum) 1.4.3: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum
- Type Scale calculator: https://type-scale.com/
- Material Design — Typography: https://m3.material.io/styles/typography/overview
