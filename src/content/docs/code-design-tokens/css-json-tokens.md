---
title: CSS/JSON Tokens
description: Define a cross-platform token taxonomy and export pipeline.
---

Design tokens are the single source of truth for design decisions — colors, spacing, typography, motion, and more. Define them once, export to multiple platforms, and keep design and code in sync.

## What tokens capture

### Color

```json
{
  "color": {
    "primary": { "value": "#0066cc" },
    "text": {
      "default": { "value": "#1a1a1a" },
      "muted": { "value": "#666666" }
    },
    "background": {
      "default": { "value": "#ffffff" },
      "surface": { "value": "#f5f5f5" }
    }
  }
}
```

### Typography

```json
{
  "font": {
    "family": { "base": { "value": "Inter, sans-serif" } },
    "size": {
      "sm": { "value": "0.875rem" },
      "base": { "value": "1rem" },
      "lg": { "value": "1.25rem" }
    },
    "weight": {
      "normal": { "value": "400" },
      "bold": { "value": "700" }
    }
  }
}
```

### Spacing

```json
{
  "space": {
    "1": { "value": "0.25rem" },
    "2": { "value": "0.5rem" },
    "4": { "value": "1rem" },
    "8": { "value": "2rem" }
  }
}
```

### Elevation and motion

```json
{
  "shadow": {
    "sm": { "value": "0 1px 2px rgba(0,0,0,0.1)" },
    "md": { "value": "0 4px 6px rgba(0,0,0,0.1)" }
  },
  "duration": {
    "fast": { "value": "100ms" },
    "normal": { "value": "200ms" }
  }
}
```

## CSS custom properties

Export tokens to CSS variables for web:

```css
:root {
  --color-primary: #0066cc;
  --color-text-default: #1a1a1a;
  --space-4: 1rem;
  --font-size-base: 1rem;
}
```

Use them throughout your CSS:

```css
.button {
  background: var(--color-primary);
  padding: var(--space-2) var(--space-4);
  font-size: var(--font-size-base);
}
```

## Theme modes

Define semantic tokens that reference different values per mode:

```css
:root {
  --color-bg: var(--color-white);
  --color-text: var(--color-gray-900);
}

[data-theme="dark"] {
  --color-bg: var(--color-gray-900);
  --color-text: var(--color-white);
}

@media (prefers-contrast: more) {
  :root {
    --color-text: #000000;
    --color-bg: #ffffff;
  }
}
```

## Token taxonomy

Organize tokens in layers:

1. **Primitive tokens**: Raw values (`blue-500: #0066cc`)
2. **Semantic tokens**: Purpose-based (`color-primary: {blue-500}`)
3. **Component tokens**: Specific usage (`button-bg: {color-primary}`)

This lets you change your primary color once and have it update everywhere.

## Tooling and export

Popular tools for managing tokens:

- **Style Dictionary** (Amazon): Transform tokens to any platform
- **Tokens Studio** (Figma plugin): Sync tokens between Figma and code
- **Design Tokens W3C Format**: Emerging standard for interoperability

Export to CSS, iOS (Swift), Android (XML/Compose), React Native, and more from a single source.

## References

- W3C Design Tokens Community Group — Format: https://design-tokens.github.io/community-group/format/
- Style Dictionary: https://amzn.github.io/style-dictionary/
- Material Tokens: https://m3.material.io/foundations/design-tokens/overview
