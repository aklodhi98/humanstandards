# Human Standards MCP Server

**Systematic human factors validation for AI-generated interfaces**

This MCP (Model Context Protocol) server provides AI tools like Claude Code with real-time access to Human Standards documentation and validation tools. It transforms human factors principles from documentation into active, queryable infrastructure.

## What It Does

Instead of AI tools relying on trained intuition, they can:

✅ **Consult standards at generation time** - "What guidance applies to this form?"
✅ **Validate code against standards** - "Does this HTML meet WCAG 2.2 AA?"
✅ **Check specific requirements** - "Is this contrast ratio sufficient?"
✅ **Search documentation** - "Find guidance on cognitive load"

## The Difference

### Before (Intuitive Approach)
```
User: "Build a registration form"
AI: *generates form based on training data*
Result: 11 fields, vague errors, no autosave, accessibility gaps
```

### After (Standards-Informed)
```
User: "Build a registration form"
AI: *calls get_component_guidance('form', { fields: 8 })*
MCP: "Use 3-step wizard, autosave, WCAG AA, 48px touch targets..."
AI: *generates compliant form*
AI: *calls validate_html(code)*
MCP: "✓ WCAG AA compliant, ✓ cognitive load optimized"
Result: Progressive disclosure, clear errors, autosave, fully accessible
```

See [demo-comparison](../demo-comparison/) for the night-and-day difference.

## Available Tools

### 1. `get_component_guidance`

Get systematic guidance for UI components.

**Input:**
```json
{
  "component": "form",
  "context": {
    "fields": 8,
    "platform": "web"
  }
}
```

**Output:**
```json
{
  "cognitive_load": {
    "assessment": "High cognitive load for 8 fields",
    "recommendation": "Use progressive disclosure - break into 2-3 steps",
    "reference": "/cognition/cognitive-load.md#chunk-information",
    "implementation": ["Multi-step wizard", "3-4 fields per step", "Progress indicator"]
  },
  "accessibility": {
    "requirements": [
      "Every input has visible label",
      "Required fields marked with aria-required",
      "Errors use aria-invalid and aria-describedby"
    ],
    "wcag_level": "AA",
    "reference": "/accessibility/wcag-guidelines.md"
  },
  "forms": {
    "validation_timing": "on blur",
    "error_messages": "specific and actionable",
    "autocomplete": true,
    "reference": "/interaction-patterns/forms.md"
  },
  "defensive_design": {
    "required": ["autosave", "clear error messages", "beforeunload warning"],
    "reference": "/decision-making-errors/defensive-design.md"
  }
}
```

### 2. `validate_html`

Validate HTML against Human Standards.

**Input:**
```json
{
  "html": "<form>...</form>",
  "component_type": "form"
}
```

**Output:**
```json
{
  "passed": false,
  "score": 65,
  "issues": [
    {
      "severity": "error",
      "rule": "wcag-aria-labels",
      "category": "accessibility",
      "message": "Form input missing label",
      "element": "input#email",
      "recommendation": "Add a visible <label> element linked via for/id",
      "reference": "/accessibility/wcag-guidelines.md#understandable"
    },
    {
      "severity": "warning",
      "rule": "cognitive-form-length",
      "category": "cognitive-load",
      "message": "Form has 8 fields without progressive disclosure",
      "recommendation": "Break long forms into 2-3 steps",
      "reference": "/cognition/cognitive-load.md#chunk-information"
    }
  ],
  "compliance": {
    "wcag_aa": false,
    "cognitive_load": "high",
    "mobile_friendly": false
  }
}
```

### 3. `check_color_contrast`

Verify color combinations meet WCAG standards.

**Input:**
```json
{
  "foreground": "#666666",
  "background": "#FFFFFF",
  "font_size": 16,
  "is_bold": false
}
```

**Output:**
```json
{
  "ratio": 3.95,
  "passes_aa": false,
  "passes_aaa": false,
  "level": "normal",
  "recommendation": "Contrast ratio 3.95:1 is too low. Needs at least 4.5:1 (AA) or 7:1 (AAA)."
}
```

### 4. `search_standards`

Search documentation for specific topics.

**Input:**
```json
{
  "query": "error messages"
}
```

**Output:**
```json
[
  {
    "title": "Forms",
    "path": "/interaction-patterns/forms.md",
    "description": "Compose usable, accessible forms",
    "relevance": 15
  },
  {
    "title": "Defensive Design",
    "path": "/decision-making-errors/defensive-design.md",
    "description": "Error prevention and recovery",
    "relevance": 12
  }
]
```

### 5. `get_validation_rules`

Get all validation rules or filter by category.

**Input:**
```json
{
  "category": "accessibility"
}
```

**Output:**
```json
[
  {
    "id": "wcag-contrast-text",
    "category": "accessibility",
    "severity": "error",
    "description": "Text must have sufficient contrast ratio",
    "check": "Color contrast ratio must be at least 4.5:1 for normal text",
    "reference": "/accessibility/wcag-guidelines.md#perceivable"
  }
]
```

## Installation

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

```bash
cd human-standards-mcp
npm install
npm run build
```

### Index the Documentation

```bash
npm run index-docs
```

This creates `data/standards-index.json` from the Human Standards markdown files.

## Usage

### With Claude Desktop

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "human-standards": {
      "command": "node",
      "args": ["/path/to/humanstandards/human-standards-mcp/dist/index.js"]
    }
  }
}
```

### With Claude Code (CLI)

Add to `.claude/config.json`:

```json
{
  "mcp": {
    "servers": {
      "human-standards": {
        "command": "node",
        "args": ["/path/to/humanstandards/human-standards-mcp/dist/index.js"]
      }
    }
  }
}
```

### Standalone Testing

```bash
# Start the server
npm start

# In another terminal, test with MCP Inspector
npx @modelcontextprotocol/inspector node dist/index.js
```

## How AI Tools Use It

### Before Generating Code

```typescript
// AI tool internally:
const guidance = await mcp.callTool('get_component_guidance', {
  component: 'form',
  context: { fields: 8 }
});

// Use guidance to inform code generation
// - Break into 3 steps (cognitive load)
// - Add ARIA labels (accessibility)
// - Implement autosave (defensive design)
// - Use 48px buttons (ergonomics)
```

### After Generating Code

```typescript
// Validate the generated code
const validation = await mcp.callTool('validate_html', {
  html: generatedCode,
  component_type: 'form'
});

if (!validation.passed) {
  // Fix issues before returning to user
  for (const issue of validation.issues) {
    if (issue.severity === 'error') {
      // Apply fix based on issue.recommendation
    }
  }
}
```

### During Generation

```typescript
// Check specific requirements
const contrast = await mcp.callTool('check_color_contrast', {
  foreground: '#666666',
  background: '#FFFFFF'
});

if (!contrast.passes_aa) {
  // Adjust colors to meet WCAG AA
}
```

## Validation Rules

The server includes built-in rules for:

### Accessibility (WCAG 2.2 AA)
- Color contrast ratios
- ARIA labels and attributes
- Keyboard navigation
- Focus indicators
- Semantic HTML

### Cognitive Load
- Form field count (recommend progressive disclosure for 6+)
- Error message clarity
- Visual hierarchy

### Ergonomics
- Touch target sizes (44-48px minimum)
- Spacing between interactive elements

### Forms
- Visible labels (not placeholders)
- Autocomplete attributes
- Validation timing (on blur, not keystroke)
- Error message specificity

### Defensive Design
- Autosave for long forms
- Confirmation for destructive actions
- Data loss prevention

## Development

### Project Structure

```
human-standards-mcp/
├── src/
│   ├── index.ts              # Main MCP server
│   ├── types/                # TypeScript types
│   ├── tools/
│   │   ├── get-guidance.ts   # Component guidance tool
│   │   └── check-contrast.ts # Color contrast tool
│   ├── validators/
│   │   └── html-validator.ts # HTML validation engine
│   └── indexer/
│       └── index-docs.ts     # Documentation indexer
├── data/
│   └── standards-index.json  # Generated index
├── dist/                     # Compiled JavaScript
└── package.json
```

### Adding New Rules

Edit `src/indexer/index-docs.ts` in the `generateValidationRules()` function:

```typescript
{
  id: 'your-rule-id',
  category: 'accessibility',
  severity: 'error',
  description: 'What this checks',
  check: 'How to verify',
  reference: '/path/to/doc.md#section'
}
```

Then rebuild the index:

```bash
npm run index-docs
npm run build
```

### Adding New Tools

1. Create tool implementation in `src/tools/`
2. Add tool definition to `src/index.ts` in the `tools` array
3. Add handler in the `CallToolRequestSchema` switch statement

## Testing

Test with sample HTML:

```bash
node dist/index.js
```

Then use the MCP Inspector or call tools via Claude Desktop/Code.

## Impact

With this MCP server, every AI-generated interface can automatically:

✅ **Meet WCAG 2.2 AA** (4.5:1 contrast, ARIA labels, keyboard nav)
✅ **Optimize cognitive load** (progressive disclosure, chunking)
✅ **Prevent data loss** (autosave, confirmations)
✅ **Work on mobile** (48px touch targets)
✅ **Provide clear errors** ("Email must include @" not "Invalid")

**The standards become systematic, not aspirational.**

## License

Same as Human Standards:
- **Content** (documentation): CC BY-NC-SA 4.0
- **Code** (MCP server): MIT License

## Contributing

Issues and PRs welcome! See the main [Human Standards repository](https://github.com/aklodhi98/humanstandards).

---

Built with [Model Context Protocol](https://modelcontextprotocol.io/) and [Human Standards](https://humanstandards.dev/).
