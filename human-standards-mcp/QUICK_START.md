# Quick Start Guide

## What You Have

A fully functional MCP server that makes Human Standards documentation **queryable and actionable** for AI tools.

## Installation (5 minutes)

```bash
cd human-standards-mcp

# 1. Install dependencies
npm install

# 2. Build the server
npm run build

# 3. Index the documentation
npm run index-docs
```

**✅ You're done!** The server is ready to use.

## Testing It

### Option 1: See Example Calls

```bash
node test-examples.js
```

This shows what AI tools would ask the server.

### Option 2: Use MCP Inspector

```bash
npx @modelcontextprotocol/inspector node dist/index.js
```

Then interact with the tools via the web UI.

### Option 3: Configure Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "human-standards": {
      "command": "node",
      "args": ["/absolute/path/to/humanstandards/human-standards-mcp/dist/index.js"]
    }
  }
}
```

Restart Claude Desktop and you'll see "human-standards" in the MCP section.

## What It Does

### 5 Tools Available

1. **`get_component_guidance`** - "How should I build this?"
   - Input: component type + context
   - Output: Systematic guidance (cognitive load, accessibility, ergonomics)

2. **`validate_html`** - "Does this code meet standards?"
   - Input: HTML code
   - Output: Issues, score, compliance report

3. **`check_color_contrast`** - "Is this color combo OK?"
   - Input: foreground + background colors
   - Output: Contrast ratio, WCAG compliance

4. **`search_standards`** - "Find guidance on X"
   - Input: search query
   - Output: Relevant documents ranked by relevance

5. **`get_validation_rules`** - "What rules apply to accessibility?"
   - Input: optional category filter
   - Output: List of validation rules with references

## Real-World Usage

### Before MCP Server

```
AI: *generates 11-field form with vague errors*
```

### After MCP Server

```
AI: *calls get_component_guidance('form', { fields: 11 })*
Server: "Use 3-step wizard, WCAG AA, autosave..."
AI: *generates compliant form*
AI: *calls validate_html(form)*
Server: "✓ Score: 95/100, WCAG AA compliant"
AI: *returns to user*
```

**Result:** Version 2 instead of Version 1 (see `../demo-comparison/`)

## Indexed Content

The server has indexed **49 documents** across 15 categories:

- Accessibility (3 docs)
- Cognition (3 docs)
- Perception (3 docs)
- Decision-Making & Errors (3 docs)
- Ergonomics (3 docs)
- Interaction Patterns (4 docs)
- Forms, WCAG, Defensive Design, etc.

Plus **10 validation rules** and **3 component patterns**.

## Next Steps

1. **Use with Claude Desktop**: Configure it and try asking for forms/buttons/modals
2. **Integrate with Claude Code**: Add to your MCP config
3. **Extend the server**: Add more rules in `src/indexer/index-docs.ts`
4. **Deploy**: Run as a service for your team

## Files Overview

```
human-standards-mcp/
├── README.md           # Full documentation
├── EXAMPLES.md         # Usage examples
├── QUICK_START.md      # This file
├── src/
│   ├── index.ts        # Main MCP server
│   ├── tools/          # Tool implementations
│   ├── validators/     # HTML validator
│   └── indexer/        # Doc indexer
├── data/
│   └── standards-index.json  # Generated index (49 docs)
└── dist/               # Compiled JS (ready to run)
```

## The Impact

Every AI-generated interface can now automatically:

✅ Meet WCAG 2.2 AA (contrast, ARIA, keyboard nav)
✅ Optimize cognitive load (progressive disclosure)
✅ Prevent data loss (autosave, confirmations)
✅ Work on mobile (48px touch targets)
✅ Provide clear errors ("Email must include @")

**The standards become systematic, not aspirational.**

## Questions?

See [README.md](README.md) for full documentation.
See [EXAMPLES.md](EXAMPLES.md) for detailed use cases.

---

**You've built the first MCP server for systematic human factors validation!** 🎉
