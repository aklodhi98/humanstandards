---
title: Colour & Accessibility
description: Using color accessibly.
---

## Principles

- Don’t rely on color alone; pair with text/icons/patterns.
- Ensure contrast for text, icons, and focus indicators.
- Provide a color-blind safe palette; test deuteranopia/protanopia/tritanopia.

## Patterns

- Status: success/neutral/warning/danger with icons and text.
- Charts: varied hues plus different stroke/dash/marker shapes.
- Links: underline by default; avoid color-only differentiation.

## Implementation

- Define tokens with LCH/OKLCH for perceptual uniformity.
- Provide dark/light pairs; document min/target contrast per token.

## References

- WCAG 2.2 — Use of Color 1.4.1; Contrast SCs: https://www.w3.org/TR/WCAG22/
- Colour Vision Deficiency (Sim Daltonism, Color Oracle): https://colororacle.org/
- Highcharts/Observable examples for colorblind-safe palettes.
