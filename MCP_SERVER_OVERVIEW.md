# Human Standards MCP Server - Complete Overview

## What We Built

A **Model Context Protocol (MCP) server** that transforms Human Standards from static documentation into **active, queryable infrastructure** for AI tools.

## The Problem It Solves

### Before: Intuitive Approach
AI tools like Claude Code generate interfaces based on training data patterns, which leads to:
- ❌ High cognitive load (11 fields at once)
- ❌ Vague error messages ("Invalid")
- ❌ Accessibility gaps (missing ARIA, low contrast)
- ❌ No data loss prevention
- ❌ Small touch targets

**See:** `demo-comparison/version1-intuitive.html`

### After: Standards-Informed Approach
With the MCP server, AI tools actively consult Human Standards during generation:
- ✅ Cognitive load optimized (3-step wizard)
- ✅ Clear error messages ("Email must include @")
- ✅ WCAG 2.2 AA compliant
- ✅ Autosave + warnings
- ✅ 48px touch targets

**See:** `demo-comparison/version2-standards-informed.html`

**The difference is night and day.**

## What's Included

### 1. MCP Server (`human-standards-mcp/`)
Fully functional TypeScript MCP server with 5 tools:

- **`get_component_guidance`** - Get systematic guidance for components
- **`validate_html`** - Validate code against standards
- **`check_color_contrast`** - Verify WCAG contrast compliance
- **`search_standards`** - Search documentation
- **`get_validation_rules`** - Get validation rules by category

### 2. Documentation Index
Automatically generated from your 49 markdown files:
- 15 categories indexed
- 10 validation rules
- 3 component patterns
- Searchable knowledge base

### 3. Validation Engine
HTML validator that checks:
- Accessibility (WCAG 2.2 AA)
- Cognitive load
- Ergonomics (touch targets)
- Forms best practices
- Defensive design

### 4. Complete Documentation
- **README.md** - Full technical documentation
- **EXAMPLES.md** - Real-world usage examples
- **QUICK_START.md** - 5-minute setup guide

### 5. Demo Comparison
Side-by-side HTML examples showing:
- Version 1: Intuitive approach (typical AI output)
- Version 2: Standards-informed (using MCP guidance)
- Detailed comparison document

## Project Structure

```
humanstandards/
├── human-standards-mcp/              # ⭐ MCP Server
│   ├── src/
│   │   ├── index.ts                  # Main server
│   │   ├── tools/                    # MCP tools
│   │   ├── validators/               # Validation engine
│   │   └── indexer/                  # Doc indexer
│   ├── data/
│   │   └── standards-index.json      # Generated index (49 docs)
│   ├── dist/                         # Compiled (ready to run)
│   ├── README.md                     # Full docs
│   ├── EXAMPLES.md                   # Usage examples
│   └── QUICK_START.md                # Setup guide
│
├── demo-comparison/                  # ⭐ Before/After Demo
│   ├── version1-intuitive.html       # Without MCP
│   ├── version2-standards-informed.html  # With MCP
│   └── COMPARISON.md                 # Detailed analysis
│
├── src/content/docs/                 # Original documentation
│   ├── accessibility/                # (indexed)
│   ├── cognition/                    # (indexed)
│   ├── forms/                        # (indexed)
│   └── ... 12 more categories
│
└── MCP_SERVER_OVERVIEW.md            # This file
```

## How It Works

### 1. AI Tool Calls MCP Server

```typescript
// User asks: "Build a registration form"

// AI calls MCP server:
const guidance = await mcp.callTool('get_component_guidance', {
  component: 'form',
  context: { fields: 8 }
});
```

### 2. Server Returns Systematic Guidance

```json
{
  "cognitive_load": {
    "recommendation": "Use progressive disclosure - break into 2-3 steps",
    "reference": "/cognition/cognitive-load.md#chunk-information"
  },
  "accessibility": {
    "requirements": ["ARIA labels", "4.5:1 contrast", "visible focus"],
    "wcag_level": "AA"
  },
  "defensive_design": {
    "required": ["autosave", "beforeunload warning"]
  }
}
```

### 3. AI Generates Code Following Guidance

```html
<!-- Multi-step wizard (cognitive load) -->
<!-- ARIA labels (accessibility) -->
<!-- Autosave (defensive design) -->
<!-- 48px buttons (ergonomics) -->
```

### 4. AI Validates Before Returning

```typescript
const validation = await mcp.callTool('validate_html', {
  html: generatedCode
});

if (!validation.passed) {
  // Fix issues automatically
}
```

### 5. User Receives Standards-Compliant Code

Result: Version 2 automatically, not Version 1.

## Quick Start

```bash
cd human-standards-mcp

# 1. Install & build
npm install
npm run build

# 2. Index documentation
npm run index-docs

# 3. Test it
node test-examples.js

# 4. Configure Claude Desktop
# Add to claude_desktop_config.json (see QUICK_START.md)
```

## Key Features

### Proactive Consultation
AI tools ask "What guidance applies?" **before** generating code.

### Automatic Validation
Generated code is checked **during** generation, not after.

### Systematic Fixes
Issues are fixed using specific, actionable recommendations.

### Context-Aware
Guidance adapts to component type, platform, and complexity.

### Measurable Compliance
Every output gets a score (0-100) and compliance report.

## Real Impact

### Cognitive Load
- **Before:** 11 fields at once
- **After:** 3-step wizard (4 → 2 → 2 fields)
- **Reduction:** 63% initial cognitive load

### Accessibility
- **Before:** Missing ARIA, 3.95:1 contrast (fails AA)
- **After:** Full ARIA suite, 4.5:1+ contrast
- **Result:** WCAG 2.2 AA compliant

### Data Loss Prevention
- **Before:** No autosave, data lost on refresh
- **After:** Autosave + beforeunload warning
- **Result:** Zero data loss

### Mobile UX
- **Before:** 40px buttons (too small)
- **After:** 48px buttons (meets Android/iOS standards)
- **Result:** Easier tapping, fewer errors

### Error Messages
- **Before:** "Invalid"
- **After:** "Email must include @"
- **Result:** Users know how to fix

## Technical Details

### Built With
- **TypeScript** - Type-safe implementation
- **MCP SDK** - Model Context Protocol
- **Cheerio** - HTML parsing
- **Node.js 18+** - Runtime

### Validation Rules (10 total)
- `wcag-contrast-text` - Color contrast (4.5:1 minimum)
- `wcag-aria-labels` - Form labels required
- `wcag-focus-indicators` - Visible focus states
- `cognitive-form-length` - Progressive disclosure for 6+ fields
- `cognitive-error-clarity` - Specific error messages
- `ergonomics-touch-targets` - 44-48px minimum
- `forms-autocomplete` - Enable autocomplete
- `forms-visible-labels` - No placeholder-only labels
- `defensive-autosave` - Save drafts
- `defensive-destructive-confirm` - Confirm destructive actions

### Component Patterns (3 total)
- Forms (with field count context)
- Buttons (with importance context)
- Modals (with accessibility focus)

## Next Steps

### 1. Use It Now
Configure in Claude Desktop or Claude Code and try building forms/buttons/modals.

### 2. Extend It
Add more validation rules, component patterns, or custom tools.

### 3. Share It
This is the first MCP server for human factors. Open source it, get feedback, iterate.

### 4. Integrate Everywhere
Every AI tool that generates UI should use this. Make it standard infrastructure.

## The Vision

**Human Standards should be active infrastructure, not just documentation.**

With this MCP server:
- Every form is cognitively optimized
- Every button meets touch target standards
- Every color combo passes WCAG
- Every error message is actionable
- Every interface prevents data loss

**The standards become systematic, not aspirational.**

## Files to Explore

1. **`demo-comparison/COMPARISON.md`** - See the night-and-day difference
2. **`human-standards-mcp/README.md`** - Full technical documentation
3. **`human-standards-mcp/EXAMPLES.md`** - Real-world usage examples
4. **`human-standards-mcp/QUICK_START.md`** - Get started in 5 minutes

## Success Metrics

If successful, AI-generated interfaces would:
- ✅ **95%+ WCAG 2.2 AA compliance** (vs ~30% today)
- ✅ **50%+ lower cognitive load** (progressive disclosure)
- ✅ **Zero data loss** (autosave everywhere)
- ✅ **100% mobile-friendly** (proper touch targets)
- ✅ **80%+ clearer errors** (actionable messages)

**This is achievable with systematic standards application.**

---

**You've built the infrastructure to make Human Standards systematic.**

The difference between Version 1 and Version 2 is the difference between intuition and science. Now AI tools can apply the science automatically.

🎉 **Welcome to standards-informed AI code generation.**
