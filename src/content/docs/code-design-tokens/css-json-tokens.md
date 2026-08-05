---
title: CSS/JSON Design Tokens
description: Define a cross-platform token taxonomy with accessibility constraints, export pipelines, and machine-readable specifications.
---

Design tokens are the single source of truth for design decisions—colors, spacing, typography, motion, and more. Define them once, export to multiple platforms, and keep design and code in sync. This page provides both human-readable guidance and machine-parseable specifications for AI agents and design systems.

---

## Why Design Tokens Matter

Design tokens are the smallest indivisible elements of a design system, representing individual design decisions as data. They function as named entities that store specific visual design attributes.

**Benefits:**
- **Consistency**: Same values everywhere, no magic numbers
- **Scalability**: Change a token, update the entire system
- **Cross-platform**: Export to CSS, iOS, Android, React Native from one source
- **Accessibility**: Encode WCAG requirements directly into tokens
- **Machine-readable**: AI agents and tools can consume structured token data

---

## W3C DTCG Format Specification (2025.10)

The [Design Tokens Community Group](https://www.w3.org/community/design-tokens/) released the first stable specification version (2025.10) in October 2025, establishing an industry-wide standard.

### Format Overview

| Property | Description |
|----------|-------------|
| File extension | `.tokens` or `.tokens.json` |
| Media type | `application/design-tokens+json` |
| Property prefix | `$` (dollar sign) |
| Required properties | `$value` |
| Optional properties | `$type`, `$description`, `$extensions` |

### Basic Token Structure

```json
{
  "color-primary": {
    "$value": "#0066cc",
    "$type": "color",
    "$description": "Primary brand color for interactive elements"
  }
}
```

### Group Structure

```json
{
  "color": {
    "$description": "Color tokens",
    "primary": {
      "$value": "#0066cc",
      "$type": "color"
    },
    "text": {
      "default": {
        "$value": "#1a1a1a",
        "$type": "color"
      }
    }
  }
}
```

### Aliases (References)

```json
{
  "color": {
    "blue-600": {
      "$value": "#0066cc",
      "$type": "color"
    },
    "primary": {
      "$value": "{color.blue-600}",
      "$type": "color"
    }
  }
}
```

---

## Token Categories (MCP-Optimized)

### Color Tokens

```json
{
  "color": {
    "$description": "Color system with accessibility metadata",
    "primitive": {
      "blue": {
        "50": { "$value": "#e6f2ff", "$type": "color" },
        "100": { "$value": "#cce5ff", "$type": "color" },
        "500": { "$value": "#0066cc", "$type": "color" },
        "600": { "$value": "#0052a3", "$type": "color" },
        "700": { "$value": "#003d7a", "$type": "color" },
        "900": { "$value": "#001f3f", "$type": "color" }
      },
      "gray": {
        "50": { "$value": "#f9fafb", "$type": "color" },
        "100": { "$value": "#f3f4f6", "$type": "color" },
        "500": { "$value": "#6b7280", "$type": "color" },
        "700": { "$value": "#374151", "$type": "color" },
        "900": { "$value": "#111827", "$type": "color" }
      },
      "white": { "$value": "#ffffff", "$type": "color" },
      "black": { "$value": "#000000", "$type": "color" }
    },
    "semantic": {
      "text": {
        "default": {
          "$value": "{color.primitive.gray.900}",
          "$type": "color",
          "$extensions": {
            "human-standards": {
              "wcagContrast": "4.5:1",
              "pairedWith": "color.semantic.background.default"
            }
          }
        },
        "muted": {
          "$value": "{color.primitive.gray.500}",
          "$type": "color",
          "$extensions": {
            "human-standards": {
              "wcagContrast": "4.5:1",
              "note": "Use only for non-essential text"
            }
          }
        },
        "inverse": {
          "$value": "{color.primitive.white}",
          "$type": "color"
        }
      },
      "background": {
        "default": {
          "$value": "{color.primitive.white}",
          "$type": "color"
        },
        "surface": {
          "$value": "{color.primitive.gray.50}",
          "$type": "color"
        },
        "inverse": {
          "$value": "{color.primitive.gray.900}",
          "$type": "color"
        }
      },
      "interactive": {
        "default": {
          "$value": "{color.primitive.blue.600}",
          "$type": "color",
          "$extensions": {
            "human-standards": {
              "wcagContrast": "4.5:1 on white",
              "usage": "Links, buttons"
            }
          }
        },
        "hover": {
          "$value": "{color.primitive.blue.700}",
          "$type": "color"
        },
        "active": {
          "$value": "{color.primitive.blue.900}",
          "$type": "color"
        }
      },
      "status": {
        "error": {
          "$value": "#dc2626",
          "$type": "color",
          "$extensions": {
            "human-standards": {
              "wcagContrast": "4.5:1 on white",
              "note": "Never rely on color alone for error indication"
            }
          }
        },
        "success": { "$value": "#16a34a", "$type": "color" },
        "warning": { "$value": "#ca8a04", "$type": "color" },
        "info": { "$value": "#0284c7", "$type": "color" }
      }
    }
  }
}
```

### Typography Tokens

```json
{
  "typography": {
    "$description": "Typography tokens with accessibility constraints",
    "fontFamily": {
      "base": {
        "$value": "Inter, system-ui, sans-serif",
        "$type": "fontFamily"
      },
      "mono": {
        "$value": "ui-monospace, 'Cascadia Code', monospace",
        "$type": "fontFamily"
      }
    },
    "fontSize": {
      "xs": {
        "$value": "0.75rem",
        "$type": "dimension",
        "$extensions": {
          "human-standards": {
            "px": 12,
            "use": "Captions, labels only",
            "wcagNote": "Below minimum for body text"
          }
        }
      },
      "sm": {
        "$value": "0.875rem",
        "$type": "dimension",
        "$extensions": { "human-standards": { "px": 14 } }
      },
      "base": {
        "$value": "1rem",
        "$type": "dimension",
        "$extensions": {
          "human-standards": {
            "px": 16,
            "use": "Body text minimum",
            "wcag": "WCAG recommends 16px+ for body"
          }
        }
      },
      "lg": {
        "$value": "1.125rem",
        "$type": "dimension",
        "$extensions": { "human-standards": { "px": 18 } }
      },
      "xl": {
        "$value": "1.25rem",
        "$type": "dimension",
        "$extensions": { "human-standards": { "px": 20 } }
      },
      "2xl": {
        "$value": "1.5rem",
        "$type": "dimension",
        "$extensions": {
          "human-standards": {
            "px": 24,
            "wcagLargeText": true,
            "contrastRequirement": "3:1 minimum"
          }
        }
      },
      "3xl": {
        "$value": "1.875rem",
        "$type": "dimension",
        "$extensions": { "human-standards": { "px": 30, "wcagLargeText": true } }
      },
      "4xl": {
        "$value": "2.25rem",
        "$type": "dimension",
        "$extensions": { "human-standards": { "px": 36, "wcagLargeText": true } }
      }
    },
    "fontWeight": {
      "normal": { "$value": 400, "$type": "fontWeight" },
      "medium": { "$value": 500, "$type": "fontWeight" },
      "semibold": { "$value": 600, "$type": "fontWeight" },
      "bold": { "$value": 700, "$type": "fontWeight" }
    },
    "lineHeight": {
      "tight": {
        "$value": 1.25,
        "$type": "number",
        "$extensions": { "human-standards": { "use": "Headings" } }
      },
      "normal": {
        "$value": 1.5,
        "$type": "number",
        "$extensions": {
          "human-standards": {
            "use": "Body text",
            "wcag": "1.4.12 Text Spacing"
          }
        }
      },
      "relaxed": {
        "$value": 1.75,
        "$type": "number",
        "$extensions": { "human-standards": { "use": "Long-form reading" } }
      }
    },
    "letterSpacing": {
      "tight": { "$value": "-0.025em", "$type": "dimension" },
      "normal": { "$value": "0", "$type": "dimension" },
      "wide": {
        "$value": "0.025em",
        "$type": "dimension",
        "$extensions": {
          "human-standards": {
            "wcag": "1.4.12 requires support for 0.12em minimum"
          }
        }
      }
    }
  }
}
```

### Spacing Tokens

```json
{
  "space": {
    "$description": "Spacing scale based on 4px base unit",
    "0": { "$value": "0", "$type": "dimension" },
    "px": { "$value": "1px", "$type": "dimension" },
    "0.5": {
      "$value": "0.125rem",
      "$type": "dimension",
      "$extensions": { "human-standards": { "px": 2 } }
    },
    "1": {
      "$value": "0.25rem",
      "$type": "dimension",
      "$extensions": { "human-standards": { "px": 4 } }
    },
    "2": {
      "$value": "0.5rem",
      "$type": "dimension",
      "$extensions": { "human-standards": { "px": 8 } }
    },
    "3": {
      "$value": "0.75rem",
      "$type": "dimension",
      "$extensions": { "human-standards": { "px": 12 } }
    },
    "4": {
      "$value": "1rem",
      "$type": "dimension",
      "$extensions": { "human-standards": { "px": 16 } }
    },
    "5": {
      "$value": "1.25rem",
      "$type": "dimension",
      "$extensions": { "human-standards": { "px": 20 } }
    },
    "6": {
      "$value": "1.5rem",
      "$type": "dimension",
      "$extensions": {
        "human-standards": {
          "px": 24,
          "wcag": "WCAG 2.5.8 touch target minimum"
        }
      }
    },
    "8": {
      "$value": "2rem",
      "$type": "dimension",
      "$extensions": { "human-standards": { "px": 32 } }
    },
    "10": {
      "$value": "2.5rem",
      "$type": "dimension",
      "$extensions": { "human-standards": { "px": 40 } }
    },
    "11": {
      "$value": "2.75rem",
      "$type": "dimension",
      "$extensions": {
        "human-standards": {
          "px": 44,
          "wcag": "WCAG 2.5.5 touch target enhanced",
          "platform": ["Apple HIG", "Material Design"]
        }
      }
    },
    "12": {
      "$value": "3rem",
      "$type": "dimension",
      "$extensions": {
        "human-standards": {
          "px": 48,
          "wcag": "WCAG 2.5.5 AAA target size"
        }
      }
    },
    "16": {
      "$value": "4rem",
      "$type": "dimension",
      "$extensions": { "human-standards": { "px": 64 } }
    },
    "20": {
      "$value": "5rem",
      "$type": "dimension",
      "$extensions": { "human-standards": { "px": 80 } }
    },
    "24": {
      "$value": "6rem",
      "$type": "dimension",
      "$extensions": { "human-standards": { "px": 96 } }
    }
  }
}
```

### Touch Target Tokens

```json
{
  "touchTarget": {
    "$description": "Interactive element sizing per WCAG 2.5.5 and 2.5.8",
    "size": {
      "minimum": {
        "$value": "1.5rem",
        "$type": "dimension",
        "$extensions": {
          "human-standards": {
            "px": 24,
            "wcag": "2.5.8 AA",
            "note": "Minimum with adequate spacing"
          }
        }
      },
      "comfortable": {
        "$value": "2.75rem",
        "$type": "dimension",
        "$extensions": {
          "human-standards": {
            "px": 44,
            "wcag": "2.5.5 AAA",
            "platform": ["Apple HIG", "Material Design"]
          }
        }
      },
      "large": {
        "$value": "3rem",
        "$type": "dimension",
        "$extensions": {
          "human-standards": {
            "px": 48,
            "wcag": "2.5.5 AAA",
            "platform": ["Material Design"]
          }
        }
      }
    },
    "spacing": {
      "minimum": {
        "$value": "0.5rem",
        "$type": "dimension",
        "$extensions": {
          "human-standards": {
            "px": 8,
            "wcag": "2.5.8 spacing offset",
            "note": "Required when target < 24×24"
          }
        }
      }
    }
  }
}
```

### Motion Tokens

```json
{
  "motion": {
    "$description": "Animation and transition tokens with vestibular safety",
    "duration": {
      "instant": {
        "$value": "0ms",
        "$type": "duration",
        "$extensions": {
          "human-standards": { "use": "State changes, no motion" }
        }
      },
      "fast": {
        "$value": "100ms",
        "$type": "duration",
        "$extensions": {
          "human-standards": {
            "use": "Micro-interactions, hovers",
            "perceptionThreshold": "Below conscious perception for some"
          }
        }
      },
      "normal": {
        "$value": "200ms",
        "$type": "duration",
        "$extensions": {
          "human-standards": {
            "use": "Standard transitions",
            "optimal": "Good balance of speed and clarity"
          }
        }
      },
      "slow": {
        "$value": "300ms",
        "$type": "duration",
        "$extensions": {
          "human-standards": { "use": "Larger element transitions" }
        }
      },
      "slower": {
        "$value": "500ms",
        "$type": "duration",
        "$extensions": {
          "human-standards": { "use": "Page transitions, loading states" }
        }
      }
    },
    "easing": {
      "linear": { "$value": "linear", "$type": "cubicBezier" },
      "easeOut": {
        "$value": "cubic-bezier(0, 0, 0.2, 1)",
        "$type": "cubicBezier",
        "$extensions": {
          "human-standards": { "use": "Elements entering the screen" }
        }
      },
      "easeIn": {
        "$value": "cubic-bezier(0.4, 0, 1, 1)",
        "$type": "cubicBezier",
        "$extensions": {
          "human-standards": { "use": "Elements leaving the screen" }
        }
      },
      "easeInOut": {
        "$value": "cubic-bezier(0.4, 0, 0.2, 1)",
        "$type": "cubicBezier",
        "$extensions": {
          "human-standards": { "use": "Elements moving on screen" }
        }
      }
    }
  }
}
```

### Focus and Border Tokens

```json
{
  "focus": {
    "$description": "Focus indicator tokens per WCAG 2.4.7 and 2.4.11",
    "ring": {
      "width": {
        "$value": "2px",
        "$type": "dimension",
        "$extensions": {
          "human-standards": {
            "wcag": "2.4.11 Focus Not Obscured",
            "note": "Visible outline thickness"
          }
        }
      },
      "offset": {
        "$value": "2px",
        "$type": "dimension",
        "$extensions": {
          "human-standards": { "note": "Gap between element and focus ring" }
        }
      },
      "color": {
        "$value": "{color.semantic.interactive.default}",
        "$type": "color",
        "$extensions": {
          "human-standards": {
            "wcag": "2.4.7 Focus Visible",
            "contrast": "3:1 minimum against adjacent colors"
          }
        }
      }
    }
  },
  "border": {
    "width": {
      "default": { "$value": "1px", "$type": "dimension" },
      "thick": { "$value": "2px", "$type": "dimension" }
    },
    "radius": {
      "none": { "$value": "0", "$type": "dimension" },
      "sm": {
        "$value": "0.125rem",
        "$type": "dimension",
        "$extensions": { "human-standards": { "px": 2 } }
      },
      "md": {
        "$value": "0.375rem",
        "$type": "dimension",
        "$extensions": { "human-standards": { "px": 6 } }
      },
      "lg": {
        "$value": "0.5rem",
        "$type": "dimension",
        "$extensions": { "human-standards": { "px": 8 } }
      },
      "xl": {
        "$value": "0.75rem",
        "$type": "dimension",
        "$extensions": { "human-standards": { "px": 12 } }
      },
      "full": { "$value": "9999px", "$type": "dimension" }
    }
  }
}
```

### Shadow Tokens

```json
{
  "shadow": {
    "$description": "Elevation and depth tokens",
    "none": { "$value": "none", "$type": "shadow" },
    "sm": {
      "$value": {
        "offsetX": "0",
        "offsetY": "1px",
        "blur": "2px",
        "spread": "0",
        "color": "rgba(0, 0, 0, 0.05)"
      },
      "$type": "shadow"
    },
    "md": {
      "$value": {
        "offsetX": "0",
        "offsetY": "4px",
        "blur": "6px",
        "spread": "-1px",
        "color": "rgba(0, 0, 0, 0.1)"
      },
      "$type": "shadow"
    },
    "lg": {
      "$value": {
        "offsetX": "0",
        "offsetY": "10px",
        "blur": "15px",
        "spread": "-3px",
        "color": "rgba(0, 0, 0, 0.1)"
      },
      "$type": "shadow"
    },
    "xl": {
      "$value": {
        "offsetX": "0",
        "offsetY": "20px",
        "blur": "25px",
        "spread": "-5px",
        "color": "rgba(0, 0, 0, 0.1)"
      },
      "$type": "shadow"
    }
  }
}
```

---

## Validation Rules (for MCP/AI)

```yaml
rules:
  # Color Contrast Validation
  - id: color-contrast-text
    severity: error
    check: "Text color has ≥4.5:1 contrast against background"
    applies_to: "color.semantic.text tokens"
    wcag: "1.4.3 AA"

  - id: color-contrast-large-text
    severity: error
    check: "Large text (≥24px or ≥18.66px bold) has ≥3:1 contrast"
    applies_to: "typography.fontSize.2xl and above"
    wcag: "1.4.3 AA"

  - id: color-contrast-ui
    severity: error
    check: "UI components have ≥3:1 contrast against background"
    applies_to: "color.semantic.interactive, border tokens"
    wcag: "1.4.11 AA"

  - id: color-contrast-focus
    severity: error
    check: "Focus indicator has ≥3:1 contrast against adjacent colors"
    applies_to: "focus.ring.color"
    wcag: "2.4.7 AA"

  # Typography Validation
  - id: font-size-minimum
    severity: warning
    check: "Body text uses font-size ≥1rem (16px)"
    applies_to: "Body text contexts"
    wcag: "Recommended for readability"

  - id: line-height-minimum
    severity: warning
    check: "Line height ≥1.5 for body text"
    applies_to: "Paragraph text"
    wcag: "1.4.12 Text Spacing"

  # Touch Target Validation
  - id: touch-target-size
    severity: error
    check: "Interactive elements ≥24×24 CSS px OR adequate spacing"
    applies_to: "touchTarget.size tokens"
    wcag: "2.5.8 AA"

  - id: touch-target-spacing
    severity: warning
    check: "Adjacent targets have ≥8px spacing if <44px"
    applies_to: "touchTarget.spacing tokens"
    wcag: "2.5.8 AA"

  # Motion Validation
  - id: motion-reduced
    severity: error
    check: "Motion respects prefers-reduced-motion media query"
    applies_to: "motion.duration tokens"
    wcag: "2.3.3 AAA"

  - id: motion-duration-limit
    severity: warning
    check: "Animations <5 seconds or user can pause/stop"
    applies_to: "All animated content"
    wcag: "2.2.2 AA"

  # Token Structure Validation
  - id: dtcg-format
    severity: error
    check: "Tokens follow W3C DTCG format ($value required)"
    applies_to: "All tokens"
    standard: "DTCG 2025.10"

  - id: semantic-naming
    severity: warning
    check: "Semantic tokens reference primitives, not raw values"
    applies_to: "color.semantic, component tokens"
    best_practice: true
```

---

## CSS Custom Properties Export

### Basic Export

```css
:root {
  /* Primitive Colors */
  --color-primitive-blue-500: #0066cc;
  --color-primitive-blue-600: #0052a3;
  --color-primitive-gray-900: #111827;
  --color-primitive-white: #ffffff;

  /* Semantic Colors */
  --color-text-default: var(--color-primitive-gray-900);
  --color-text-muted: #6b7280;
  --color-background-default: var(--color-primitive-white);
  --color-interactive-default: var(--color-primitive-blue-600);

  /* Typography */
  --font-family-base: Inter, system-ui, sans-serif;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-2xl: 1.5rem;
  --line-height-normal: 1.5;

  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-4: 1rem;
  --space-6: 1.5rem;

  /* Touch Targets */
  --touch-target-minimum: 1.5rem;
  --touch-target-comfortable: 2.75rem;

  /* Focus */
  --focus-ring-width: 2px;
  --focus-ring-offset: 2px;
  --focus-ring-color: var(--color-interactive-default);

  /* Motion */
  --duration-fast: 100ms;
  --duration-normal: 200ms;
  --easing-ease-out: cubic-bezier(0, 0, 0.2, 1);
}
```

### Theme Mode Export

```css
/* Light theme (default) */
:root,
[data-theme="light"] {
  --color-bg: var(--color-primitive-white);
  --color-text: var(--color-primitive-gray-900);
  --color-text-muted: #6b7280;
  --color-surface: #f9fafb;
  --color-border: #e5e7eb;
}

/* Dark theme */
[data-theme="dark"] {
  --color-bg: var(--color-primitive-gray-900);
  --color-text: var(--color-primitive-white);
  --color-text-muted: #9ca3af;
  --color-surface: #1f2937;
  --color-border: #374151;
}

/* System preference */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --color-bg: var(--color-primitive-gray-900);
    --color-text: var(--color-primitive-white);
    --color-text-muted: #9ca3af;
    --color-surface: #1f2937;
    --color-border: #374151;
  }
}

/* High contrast mode */
@media (prefers-contrast: more) {
  :root {
    --color-text: #000000;
    --color-bg: #ffffff;
    --color-text-muted: #000000;
    --color-border: #000000;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  :root {
    --duration-fast: 0ms;
    --duration-normal: 0ms;
    --duration-slow: 0ms;
  }
}
```

### Component Token Example

```css
/* Component-level tokens for buttons */
.btn {
  /* Reference semantic tokens */
  --btn-bg: var(--color-interactive-default);
  --btn-text: var(--color-text-inverse, #ffffff);
  --btn-border-radius: var(--border-radius-md);
  --btn-padding-x: var(--space-4);
  --btn-padding-y: var(--space-2);
  --btn-min-height: var(--touch-target-comfortable);
  --btn-font-size: var(--font-size-base);
  --btn-font-weight: var(--font-weight-medium);
  --btn-transition: var(--duration-fast) var(--easing-ease-out);

  /* Apply tokens */
  background: var(--btn-bg);
  color: var(--btn-text);
  border-radius: var(--btn-border-radius);
  padding: var(--btn-padding-y) var(--btn-padding-x);
  min-height: var(--btn-min-height);
  font-size: var(--btn-font-size);
  font-weight: var(--btn-font-weight);
  transition: background var(--btn-transition),
              box-shadow var(--btn-transition);
}

.btn:hover {
  --btn-bg: var(--color-interactive-hover);
}

.btn:focus-visible {
  outline: var(--focus-ring-width) solid var(--focus-ring-color);
  outline-offset: var(--focus-ring-offset);
}
```

---

## Decision Logic: Token Selection

### Which Color Token to Use

```
IF text is primary body content:
  USE color.semantic.text.default (4.5:1 contrast)

IF text is secondary or supplementary:
  USE color.semantic.text.muted (4.5:1 contrast)
  NOTE: Don't use for critical information

IF element is interactive (button, link):
  USE color.semantic.interactive.default
  FOR hover: color.semantic.interactive.hover
  FOR active: color.semantic.interactive.active

IF indicating an error:
  USE color.semantic.status.error
  ALSO provide icon or text indicator (never color alone)

IF indicating success:
  USE color.semantic.status.success
  ALSO provide icon or text indicator
```

### Which Size Token to Use

```
IF creating a touch/click target:
  MINIMUM: touchTarget.size.minimum (24px, WCAG 2.5.8 AA)
  PREFERRED: touchTarget.size.comfortable (44px, WCAG 2.5.5 AAA)
  IF target is smaller than 24px:
    ENSURE spacing.minimum (8px) around target

IF setting body text size:
  MINIMUM: typography.fontSize.base (16px)
  PREFERRED: typography.fontSize.lg (18px) for extended reading

IF setting heading size:
  h1: typography.fontSize.4xl (36px)
  h2: typography.fontSize.3xl (30px)
  h3: typography.fontSize.2xl (24px)
  h4: typography.fontSize.xl (20px)
```

### Which Spacing Token to Use

```
IF spacing within a component (padding):
  SMALL: space.2 (8px) for compact elements
  MEDIUM: space.4 (16px) for standard elements
  LARGE: space.6 (24px) for spacious elements

IF spacing between components (margin, gap):
  TIGHT: space.4 (16px) for related items
  NORMAL: space.6 (24px) for standard separation
  LOOSE: space.8 (32px) for section separation

IF spacing between touch targets:
  MINIMUM: space.2 (8px) when targets < 44px
```

---

## Token Taxonomy Architecture

### Three-Layer System

```
┌─────────────────────────────────────────┐
│  COMPONENT TOKENS (Specific)            │
│  button-bg, input-border, card-shadow   │
│  → Reference semantic tokens            │
├─────────────────────────────────────────┤
│  SEMANTIC TOKENS (Purpose)              │
│  color-primary, text-default, space-md  │
│  → Reference primitive tokens           │
├─────────────────────────────────────────┤
│  PRIMITIVE TOKENS (Raw)                 │
│  blue-600, gray-900, 16px               │
│  → Actual values                        │
└─────────────────────────────────────────┘
```

### Benefits of Each Layer

| Layer | Purpose | Changes | Example |
|-------|---------|---------|---------|
| Primitive | Raw design values | Rarely | `blue-600: #0052a3` |
| Semantic | Meaning and intent | Themes, modes | `color-primary: {blue-600}` |
| Component | Specific usage | Per-component | `btn-bg: {color-primary}` |

### Migration Example

To change primary color from blue to green:

```json
// Before
{ "color-primary": { "$value": "{color.primitive.blue.600}" } }

// After (one change updates entire system)
{ "color-primary": { "$value": "{color.primitive.green.600}" } }
```

---

## Style Dictionary 4 Configuration

### Basic Configuration

```javascript
// style-dictionary.config.js
import StyleDictionary from 'style-dictionary';

export default {
  source: ['tokens/**/*.tokens.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/css/',
      files: [{
        destination: 'tokens.css',
        format: 'css/variables',
        options: {
          outputReferences: true
        }
      }]
    },
    scss: {
      transformGroup: 'scss',
      buildPath: 'dist/scss/',
      files: [{
        destination: '_tokens.scss',
        format: 'scss/variables'
      }]
    },
    js: {
      transformGroup: 'js',
      buildPath: 'dist/js/',
      files: [{
        destination: 'tokens.js',
        format: 'javascript/es6'
      }]
    },
    json: {
      transformGroup: 'js',
      buildPath: 'dist/',
      files: [{
        destination: 'tokens.json',
        format: 'json/nested'
      }]
    }
  }
};
```

### Build Script

```javascript
// build-tokens.js
import StyleDictionary from 'style-dictionary';

const sd = new StyleDictionary('./style-dictionary.config.js');

// V4 requires await
await sd.buildAllPlatforms();

console.log('✅ Tokens built successfully');
```

### Custom Transform Example

```javascript
// Add accessibility metadata to output
StyleDictionary.registerTransform({
  name: 'custom/a11y-comment',
  type: 'value',
  filter: (token) => token.$extensions?.['human-standards'],
  transform: (token) => {
    const meta = token.$extensions['human-standards'];
    const comment = meta.wcag ? ` /* WCAG ${meta.wcag} */` : '';
    return token.$value + comment;
  }
});
```

---

## Implementation Checklist

### Token Definition
- [ ] Use W3C DTCG format (`$value`, `$type`, `$description`)
- [ ] Organize in three layers (primitive → semantic → component)
- [ ] Include accessibility metadata in `$extensions`
- [ ] Document WCAG requirements per token

### Color Tokens
- [ ] Define all primitive colors with sufficient range
- [ ] Create semantic tokens for text, background, interactive, status
- [ ] Pair text/background tokens with contrast ratios documented
- [ ] Include dark mode and high contrast variations

### Typography Tokens
- [ ] Set body text minimum at 16px (1rem)
- [ ] Document which sizes qualify as "large text" (24px+)
- [ ] Include line-height tokens (1.5 minimum for body)
- [ ] Define letter-spacing that supports WCAG 1.4.12

### Spacing & Touch Tokens
- [ ] Base spacing scale on consistent unit (4px or 8px)
- [ ] Include WCAG touch target sizes (24px minimum, 44px comfortable)
- [ ] Document spacing requirements between targets

### Export Pipeline
- [ ] Configure Style Dictionary 4+ for DTCG format
- [ ] Export to all required platforms (CSS, JS, iOS, Android)
- [ ] Include theme mode support (light, dark, high contrast)
- [ ] Support prefers-reduced-motion

### Validation
- [ ] Automated contrast checking in CI
- [ ] Token naming consistency linting
- [ ] DTCG format validation
- [ ] Documentation generation from token metadata

---

## Common Mistakes

| Mistake | Problem | Solution |
|---------|---------|----------|
| Hard-coded values | Inconsistency, hard to maintain | Always use tokens, never magic numbers |
| Missing semantic layer | Can't change themes, no meaning | Add semantic tokens between primitives and components |
| No contrast metadata | Accessibility issues missed | Document contrast ratios in `$extensions` |
| Ignoring reduced motion | Vestibular issues for some users | Include motion: 0 for prefers-reduced-motion |
| Raw values in semantic | Breaks abstraction | Semantic tokens should reference primitives |
| No documentation | Tokens misused | Use `$description` and `$extensions` |
| Inconsistent naming | Confusion, conflicts | Follow consistent naming convention |
| Platform-specific values | Cross-platform breaks | Use rem/unitless, transform per platform |

---

## Recent Research

### W3C DTCG Specification Stable Release

The [Design Tokens Community Group](https://www.w3.org/community/design-tokens/) released the first stable specification (2025.10) in October 2025, with contributions from Adobe, Amazon, Google, Microsoft, Meta, Figma, and many others. This standardizes token interchange format.

### Style Dictionary 4.0

[Style Dictionary 4](https://styledictionary.com/) released with first-class DTCG support, async API, better error handling, and token expansion for composite values.

### Accessible Color Systems

[Enterprise design systems research](https://www.aufaitux.com/blog/color-tokens-enterprise-design-systems-best-practices/) shows that semantic tokens (like `action-primary` instead of `blue-500`) improve accessibility compliance at scale by making it easier to audit and update contrast-compliant color pairs.

### Color Space Evolution

Current WCAG contrast formulas assume sRGB color space. As displays support wider gamuts (P3, Rec2020), [contrast tools](https://www.allaccessible.org/blog/color-contrast-accessibility-wcag-guide-2025) are evolving but not yet standardized for new color spaces.

### Regulatory Updates

In April 2024, the US Department of Justice updated Title II of the ADA, mandating WCAG 2.1 AA compliance for government websites and mobile apps. The DOJ extended both compliance deadlines by a year on 17 April 2026 — now **26 April 2027** for entities serving populations of 50,000+ and **26 April 2028** for smaller entities. See [Standards & Guidelines](/references/standards-guidelines/).

---

## References

**Official Standards:**
- [W3C Design Tokens Community Group](https://www.w3.org/community/design-tokens/)
- [DTCG Specification](https://design-tokens.github.io/community-group/format/)
- [Design Tokens Official Site](https://www.designtokens.org/)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)

**Tooling:**
- [Style Dictionary](https://styledictionary.com/)
- [Tokens Studio](https://tokens.studio/)
- [Style Dictionary Configurator](https://configurator.tokens.studio/)

**Platform Guidelines:**
- [Material Design Tokens](https://m3.material.io/foundations/design-tokens/overview)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [U.S. Web Design System Colors](https://designsystem.digital.gov/design-tokens/color/overview/)

**Research & Best Practices:**
- [Developer's Guide to Design Tokens (Penpot)](https://penpot.app/blog/the-developers-guide-to-design-tokens-and-css-variables/)
- [Token CSS](https://tokencss.com/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [InclusiveColors](https://www.inclusivecolors.com/)

---

## See Also

- [Accessible Typography](/code-design-tokens/accessible-typography/) — Font sizing and contrast tokens
- [Touch Targets & Spacing](/code-design-tokens/touch-targets-spacing/) — Interactive element sizing
- [ARIA & Keyboard Patterns](/code-design-tokens/aria-keyboard-patterns/) — Focus management tokens
- [Colour Accessibility](/perception/vision/colour-accessibility/) — Color vision deficiency guidance
- [Legibility & Contrast](/perception/vision/legibility-contrast/) — Contrast requirements research
- [WCAG Guidelines](/accessibility/wcag-guidelines/) — Full accessibility criteria
