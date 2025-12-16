---
title: Touch Targets & Spacing
description: Tokens for target size, spacing, and density modes.
---

Touch targets need to be big enough to hit reliably. Fingers are imprecise, conditions vary (cold hands, moving vehicles, motor impairments), and accidental taps frustrate users. Define minimum sizes as tokens and use them consistently.

## Target size guidelines

Different platforms have slightly different recommendations:

| Platform | Minimum | Recommended |
|----------|---------|-------------|
| Apple HIG | 44×44 pt | 44×44 pt or larger |
| Material Design | 48×48 dp | 48×48 dp |
| WCAG 2.2 (AA) | 24×24 CSS px | 44×44 CSS px |

For cross-platform consistency, **44×44 CSS pixels is a safe baseline**.

## Defining as tokens

```css
:root {
  /* Touch targets */
  --target-min: 2.75rem;     /* 44px - absolute minimum */
  --target-comfortable: 3rem; /* 48px - recommended */
  --target-large: 3.5rem;    /* 56px - easier for motor impairments */

  /* Spacing between targets */
  --target-gap-min: 0.5rem;  /* 8px - minimum separation */
  --target-gap-comfortable: 0.75rem; /* 12px - recommended */
}
```

## Hit area vs visual size

The tappable area can (and often should) be larger than the visible element. A small icon can have a large touch target:

```css
.icon-button {
  /* Visual size */
  width: 24px;
  height: 24px;

  /* Touch target (padding extends hit area) */
  padding: 12px;
  margin: -12px; /* Compensate visually if needed */
}
```

Or use `::before`/`::after` to extend the hit area without affecting layout.

## Spacing between targets

Adjacent touch targets need separation to prevent mis-taps. At minimum:

- **8px** between targets (WCAG allows closer if targets meet minimum size)
- **12px** for comfortable use
- **16px+** for users with motor impairments

```css
.button-group > * + * {
  margin-left: var(--target-gap-comfortable);
}
```

## Density modes

Some interfaces need to show more information in less space. Offer density modes:

```css
[data-density="compact"] {
  --target-min: 2rem;        /* 32px */
  --target-gap-min: 0.25rem; /* 4px */
}

[data-density="comfortable"] {
  --target-min: 2.75rem;     /* 44px */
  --target-gap-min: 0.5rem;  /* 8px */
}

[data-density="spacious"] {
  --target-min: 3.5rem;      /* 56px */
  --target-gap-min: 1rem;    /* 16px */
}
```

Let users choose — expert users may prefer compact, those with motor impairments need spacious.

## Common mistakes

- Making icons touch-sized (24px) without extending the hit area
- Placing destructive actions right next to common actions
- Different target sizes in the same interface (inconsistency)
- Forgetting that hover states don't exist on touch devices

## Testing

- Test on actual touch devices, not just browser DevTools
- Try tapping targets with your non-dominant thumb
- Test with screen magnification enabled
- Ask users with motor impairments to test critical flows

## References

- Apple HIG — Touch targets: https://developer.apple.com/design/human-interface-guidelines/buttons#Size-and-layout
- Material Design — Minimum touch target size: https://m3.material.io/foundations/accessible-design/accessibility-basics
- WCAG 2.2 — Target Size (Minimum) 2.5.8: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum
