# Human Standards MCP Server

**A reference guide for human-centered design principles, accessible to AI agents via MCP**

This MCP (Model Context Protocol) server provides AI tools like Claude with real-time access to Human Standards documentation and Nielsen's 10 Usability Heuristics. It acts as a "reference book" that AI can consult while designing and building interfaces.

## What It Does

The MCP server exposes five read-only tools:

1. **`get_heuristic`** - Deep dive on a specific Nielsen usability heuristic (H1-H10)
2. **`get_all_heuristics`** - Summary of all 10 heuristics for context
3. **`search_standards`** - Search the full Human Standards library with ranked excerpts
4. **`get_standard`** - Read an indexed document or one named section
5. **`get_spatial_rhythm`** - Retrieve relationship-first spacing guidance for a composition and context

## Philosophy

The MCP is the **reference book**. The AI is the **practitioner**.

When building an interface, the AI decides which principles are relevant based on context, then looks them up. For example:

- Building a form? Look up H1 (feedback), H5 (error prevention), H9 (error recovery)
- Designing navigation? Look up H4 (consistency), H6 (recognition over recall)
- Adding a delete button? Look up H3 (user control), H5 (error prevention)
- Laying out a form or dashboard? Retrieve its spatial rhythm before resolving product-specific tokens

## Available Tools

### 1. `get_heuristic`

Get detailed information about a specific Nielsen usability heuristic.

**Input:**
```json
{
  "id": "H1"
}
```

**Output:**
```json
{
  "id": "H1",
  "name": "Visibility of system status",
  "principle": "The design should always keep users informed about what is going on...",
  "description": "Users should never have to wonder what is happening...",
  "questions": [
    "Does the user know what state the system is in?",
    "Is feedback provided immediately after user actions?",
    "Are loading states and progress clearly communicated?"
  ],
  "examples": [
    "Loading spinners and progress bars",
    "Form submission confirmation messages",
    "Highlighted current navigation item"
  ],
  "violations": [
    "Silent failures with no error message",
    "Actions that complete without confirmation"
  ],
  "related_docs": [
    { "path": "/interaction-patterns/notifications-feedback/", "url": "https://humanstandards.org/interaction-patterns/notifications-feedback/" }
  ],
  "source": "https://www.nngroup.com/articles/ten-usability-heuristics/"
}
```

### 2. `get_all_heuristics`

Get a summary of all 10 Nielsen usability heuristics.

**Input:**
```json
{}
```

**Output:**
```json
{
  "heuristics": [
    { "id": "H1", "name": "Visibility of system status", "principle": "..." },
    { "id": "H2", "name": "Match between system and the real world", "principle": "..." },
    ...
  ],
  "source": "https://www.nngroup.com/articles/ten-usability-heuristics/"
}
```

### 3. `search_standards`

Search the complete indexed document content. Results include the matched terms
and an excerpt from the actual guidance, not only a website link.

**Input:**
```json
{
  "query": "forms error recovery",
  "limit": 3
}
```

**Output:**
```json
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

### 4. `get_standard`

Read the guidance found by `search_standards`. Long documents list their section
headings and can be requested one section at a time.

```json
{
  "path": "/interaction-patterns/forms/",
  "section": "Validation timing"
}
```

The response includes the document content, available sections, key points,
references, and an explicit `truncated` flag.

### 5. `get_spatial_rhythm`

Retrieve the ordered spacing relationships and composition guidance for a whole
interface or a form, settings section, card collection, editorial flow, or
dashboard.

```json
{
  "pattern": "form-stack",
  "density": "comfortable",
  "viewport": "small"
}
```

The response preserves the relationship order `attached < associated < grouped
< separated < sectional`, includes manual review questions, and tells the agent
to resolve those roles with the product's own spacing tokens. It deliberately
does not prescribe a universal pixel unit.

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

This creates `data/standards-index.json` from every Human Standards Markdown and
MDX file, including nested folders. The generated index contains the guidance
required for isolated clients to retrieve documents without browsing the web.

**Important:** Run `npm run index-docs` whenever the documentation changes (new pages added, content updated) to keep the search index current.

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

Claude Code stores MCP server configurations in `~/.claude.json`. Add the Human Standards MCP server:

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

**Option 2: Use the `/mcp` command in Claude Code**

1. Start Claude Code in your project directory
2. Type `/mcp` to open the MCP configuration menu
3. Add a new server with:
   - Name: `human-standards`
   - Command: `node`
   - Args: `/path/to/humanstandards/human-standards-mcp/dist/index.js`

**After configuration:**

1. Restart Claude Code
2. Type `/mcp` to verify the server is connected
3. You should see "human-standards" with 5 tools available

### Standalone Testing

```bash
# Start the server
npm start

# In another terminal, test with MCP Inspector
npx @modelcontextprotocol/inspector node dist/index.js
```

## How AI Tools Use It

### Example: Building a Registration Form

```
User: "Build a registration form"

AI thinks: "Forms involve feedback (H1), error prevention (H5),
           and error recovery (H9). Let me check these."

AI: *calls get_heuristic('H5')* - Error prevention
AI: *calls get_heuristic('H9')* - Error recovery
AI: *calls search_standards('forms error recovery')* - Ranked guidance excerpts
AI: *calls get_standard('/interaction-patterns/forms/', 'Validation timing')*
AI: *calls get_spatial_rhythm({ pattern: 'form-stack' })*

AI now knows:
- Use confirmation for important actions
- Validate before submission
- Show specific, actionable error messages
- Preserve user input after errors
- Keep labels, controls, messages, fields, and actions in a clear relationship hierarchy

AI: *generates form with these principles applied*
```

### Example: Designing Navigation

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

## Development

### Project Structure

```
human-standards-mcp/
├── src/
│   ├── index.ts              # Main MCP server + heuristics data
│   ├── spatial-rhythm.ts     # Spatial-rhythm contract validation and selection
│   ├── types/                # TypeScript types
│   ├── tools/
│   │   ├── get-guidance.ts   # Search and excerpt implementation
│   │   └── get-standard.ts   # Document and section retrieval
│   └── indexer/
│       └── index-docs.ts     # Documentation indexer
├── data/
│   ├── spatial-rhythm.json   # Machine-readable relationship-first spacing contract
│   └── standards-index.json  # Generated search index
├── dist/                     # Compiled JavaScript
└── package.json
```

### Updating the Search Index

When documentation changes:

```bash
npm run index-docs
npm run build
```

The indexer:
- Recursively scans every `.md` and `.mdx` file in `src/content/docs/`
- Extracts title, description, headings, full content, and key points
- Extracts reference URLs
- Outputs to `data/standards-index.json`

### Adding Content to the Index

No category allow-list is required. Add a frontmatter-bearing Markdown or MDX
file anywhere under `src/content/docs/`, then rebuild and commit the generated
index. The test suite asserts complete coverage and representative retrievals.

## License

- **MCP server software:** MIT License
- **Bundled Human Standards data:** CC0 1.0 Universal
- **Third-party material:** remains under its original terms

See [LICENSE.md](LICENSE.md) for details.

## Contributing

Issues and PRs welcome! See the main [Human Standards repository](https://github.com/aklodhi98/humanstandards).

---

Built with [Model Context Protocol](https://modelcontextprotocol.io/) and [Human Standards](https://humanstandards.org).
