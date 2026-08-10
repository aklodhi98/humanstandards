---
title: MCP Server
description: AI-assisted design validation using the Human Standards MCP server
---

The Human Standards MCP (Model Context Protocol) server gives compatible AI tools read-only access to usability heuristics and the indexed Human Standards guidance. Think of it as a reference book that AI can consult while building interfaces.

## What It Does

The MCP server exposes four read-only tools:

| Tool | Purpose |
|------|---------|
| `get_heuristic` | Deep dive on a specific Nielsen usability heuristic (H1-H10) |
| `get_all_heuristics` | Summary of all 10 heuristics for context |
| `search_standards` | Search full document content and return ranked excerpts |
| `get_standard` | Read an indexed document or one named section |

## Philosophy

**The MCP is the reference book. The AI is the practitioner.**

When building an interface, the AI decides which principles are relevant based on context, then looks them up:

- Building a form? Look up H1 (feedback), H5 (error prevention), H9 (error recovery)
- Designing navigation? Look up H4 (consistency), H6 (recognition over recall)
- Adding a delete button? Look up H3 (user control), H5 (error prevention)

## Installation

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/aklodhi98/humanstandards.git
cd humanstandards/human-standards-mcp

# Install dependencies and build
npm install
npm run build

# Index the documentation (creates searchable index)
npm run index-docs
```

## Configuration

### Claude Desktop

Add to your Claude Desktop config:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

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

### Claude Code (CLI)

**Option 1: Edit `~/.claude.json` directly**

```json
{
  "projects": {
    "/path/to/your/project": {
      "mcpServers": {
        "human-standards": {
          "command": "node",
          "args": ["/path/to/humanstandards/human-standards-mcp/dist/index.js"]
        }
      }
    }
  }
}
```

**Option 2: Use the `/mcp` command**

1. Start Claude Code in your project directory
2. Type `/mcp` to open the MCP configuration menu
3. Add a new server with:
   - Name: `human-standards`
   - Command: `node`
   - Args: `/path/to/humanstandards/human-standards-mcp/dist/index.js`

After configuration, restart Claude Code and type `/mcp` to verify the server is connected.

## Available Tools

### `get_heuristic`

Get detailed information about a specific Nielsen usability heuristic.

```typescript
// Input
{ "id": "H1" }

// Output
{
  "id": "H1",
  "name": "Visibility of system status",
  "principle": "The design should always keep users informed...",
  "description": "Users should never have to wonder what is happening...",
  "questions": [
    "Does the user know what state the system is in?",
    "Is feedback provided immediately after user actions?"
  ],
  "examples": [
    "Loading spinners and progress bars",
    "Form submission confirmation messages"
  ],
  "violations": [
    "Silent failures with no error message",
    "Actions that complete without confirmation"
  ],
  "related_docs": [
    { "path": "/interaction-patterns/notifications-feedback/", "url": "..." }
  ]
}
```

### `get_all_heuristics`

Get a summary of all 10 Nielsen usability heuristics.

```typescript
// Input
{}

// Output
{
  "heuristics": [
    { "id": "H1", "name": "Visibility of system status", "principle": "..." },
    { "id": "H2", "name": "Match between system and the real world", "principle": "..." },
    // ... H3-H10
  ],
  "source": "https://www.nngroup.com/articles/ten-usability-heuristics/"
}
```

### `search_standards`

Search every indexed Human Standards document. Results include matched terms and
an excerpt from the actual guidance, so the tool remains useful when the website
cannot be opened.

```typescript
// Input
{ "query": "forms error recovery", "limit": 3 }

// Output
{
  "query": "forms error recovery",
  "result_count": 3,
  "results": [
    {
      "title": "Forms",
      "description": "Designing forms that balance usability, accessibility, and conversion...",
      "path": "/interaction-patterns/forms/",
      "matched_terms": ["form", "error", "recovery"],
      "snippet": "Relevant guidance excerpt...",
      "relevance": 58,
      "url": "https://humanstandards.org/interaction-patterns/forms/"
    }
  ]
}
```

### `get_standard`

Use a path returned by `search_standards` to read the actual guidance. Long
documents list their section headings and can be requested one section at a time.

```typescript
// Input
{
  "path": "/interaction-patterns/forms/",
  "section": "Validation timing"
}
```

The response includes document content, available sections, key points,
references, and an explicit `truncated` flag.

## Usage Examples

### Building a Registration Form

```
User: "Build a registration form"

AI thinks: "Forms involve feedback (H1), error prevention (H5),
           and error recovery (H9). Let me check these."

AI: *calls get_heuristic('H5')* - Error prevention
AI: *calls get_heuristic('H9')* - Error recovery
AI: *calls search_standards('forms error recovery')* - Ranked excerpts
AI: *calls get_standard('/interaction-patterns/forms/', 'Validation timing')*

AI now knows:
- Use confirmation for important actions
- Validate before submission
- Show specific, actionable error messages
- Preserve user input after errors

AI: *generates form with these principles applied*
```

### Designing Navigation

```
User: "Add navigation to the app"

AI thinks: "Navigation involves consistency (H4) and
           recognition over recall (H6)."

AI: *calls get_heuristic('H4')* - Consistency and standards
AI: *calls get_heuristic('H6')* - Recognition rather than recall
AI: *calls search_standards('navigation')* - Navigation patterns

AI now knows:
- Follow platform conventions
- Keep terminology consistent
- Make options visible, don't require memorization
- Show current location clearly
```

## The 10 Heuristics

| ID | Name | When to Use |
|----|------|-------------|
| H1 | Visibility of system status | Loading states, feedback, progress |
| H2 | Match between system and real world | Terminology, icons, mental models |
| H3 | User control and freedom | Undo, cancel, escape routes |
| H4 | Consistency and standards | Patterns, conventions, terminology |
| H5 | Error prevention | Validation, confirmations, constraints |
| H6 | Recognition rather than recall | Visible options, context, history |
| H7 | Flexibility and efficiency | Shortcuts, customization, power users |
| H8 | Aesthetic and minimalist design | Focus, hierarchy, remove noise |
| H9 | Help users recover from errors | Clear messages, solutions, recovery |
| H10 | Help and documentation | Contextual help, searchable docs |

## Updating the Index

When documentation changes, rebuild the search index:

```bash
cd human-standards-mcp
npm run index-docs
npm run build
```

## Testing

Test the server standalone using MCP Inspector:

```bash
npm start
# In another terminal:
npx @modelcontextprotocol/inspector node dist/index.js
```

## Source Code

The MCP server source code is available in the [human-standards-mcp](https://github.com/aklodhi98/humanstandards/tree/main/human-standards-mcp) directory of the repository.

---

**See also:** [Nielsen's Heuristics](/interaction-patterns/nielsen-heuristics/) | [Getting Started](/human-overview/getting-started/)
