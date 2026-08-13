# Human Standards

Human factors research translated into practical design standards, implementation guidance, and read-only context for AI agents.

[Explore the live library](https://www.humanstandards.org/) · [Connect the MCP server](https://www.humanstandards.org/human-overview/mcp-server/) · [Read Study 001](https://www.humanstandards.org/studies/study-001-case-study/)

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

> **Is Human Standards useful to you?** [Star the project on GitHub](https://github.com/aklodhi98/humanstandards) to save it for later and help other practitioners discover it. You can also watch the repository for future releases or join the public [Discussions](https://github.com/aklodhi98/humanstandards/discussions).

> **Study 001 is published as an exploratory coordinator-reviewed pilot.** Directed MCP access improved the automated results but did not reliably remove obvious usability and accessibility problems. The planned independent review was not completed, and the missing human outcome is reported explicitly. [Read the case study and evidence](https://www.humanstandards.org/studies/study-001-case-study/).

## Why Human Standards exists

Product teams have access to extensive research on cognition, ergonomics, accessibility, usability, and human-computer interaction. Turning that evidence into a concrete design decision is still difficult—and AI-assisted product work makes the gap more visible.

Human Standards is an open-source reference library designed to make that knowledge easier to inspect and apply. People can browse the guidance directly. Compatible AI tools can retrieve the same material through a local, read-only MCP server.

The project does not claim to replace user research, accessibility testing, professional judgment, or the standards and studies it cites.

## What is included

- **Human factors guidance** — Cognition, perception, emotion, decision-making, ergonomics, accessibility, and social context
- **Design and implementation guidance** — Interaction patterns, playbooks, code examples, and design-token constraints
- **Research methods** — Usability testing, cognitive walkthroughs, metrics, and evaluation guidance
- **Evidence and references** — Links to the standards, publications, and source material behind the guidance
- **Machine-readable access** — Five read-only MCP tools for search, retrieval, heuristics, and relationship-first spatial-rhythm guidance
- **Open evaluation** — Study protocols and evidence intended for independent review and reproducible analysis

## Current status

Human Standards is actively developed and should be treated as a working reference library, not a finished or universally validated standard.

- The documentation library is available at [humanstandards.org](https://www.humanstandards.org/).
- The MCP server runs locally from the published npm package, uses bundled guidance, and does not write to projects or external services.
- Study 001 is published as an exploratory pilot. Its protocol deviation, automated evidence, coordinator observations, condition mapping and missing independent-review outcome are public.
- Gaps, corrections, competing evidence, and well-scoped contributions are welcome.

## Use the documentation library

Start with [Getting Started](https://www.humanstandards.org/human-overview/getting-started/) or browse the library by topic. Every page is designed to connect principles with practical decisions, implementation guidance, and primary or established sources where available.

To run the site locally:

```bash
git clone https://github.com/aklodhi98/humanstandards.git
cd humanstandards
npm ci
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) to view the local site.

## Use the MCP server

The MCP server exposes the library to compatible AI tools through five read-only tools:

- `search_standards`
- `get_standard`
- `get_heuristic`
- `get_all_heuristics`
- `get_spatial_rhythm`

The MCP client runs the npm package; it is not an application dependency and
does not become part of the project being built:

```bash
npx --yes @humanstandards/mcp-server
```

Configure a compatible MCP client to run that command:

```json
{
  "mcpServers": {
    "human-standards": {
      "command": "npx",
      "args": ["--yes", "@humanstandards/mcp-server"]
    }
  }
}
```

The server communicates over standard input/output, reads no project files,
opens no network port, and uses the Human Standards snapshot bundled with its
package release. See the [MCP setup guide](https://www.humanstandards.org/human-overview/mcp-server/) for Codex, Claude Desktop, Claude Code, source-build, and verification instructions.

## Project commands

| Command | Action |
| :-- | :-- |
| `npm ci` | Install the documentation-site dependencies from the lockfile |
| `npm run dev` | Start the local site at `localhost:4321` |
| `npm run build` | Build the production site to `./dist/` |
| `npm run check` | Build the site and validate internal links |
| `npm run preview` | Preview the production build locally |
| `npm run build --prefix human-standards-mcp` | Compile the MCP server |
| `npm test --prefix human-standards-mcp` | Run the MCP server tests after it has been built |

## Contributing

Useful contributions include:

- correcting inaccurate, ambiguous, or outdated guidance;
- adding stronger primary or established sources;
- improving examples and implementation details;
- identifying missing contexts, limitations, or accessibility considerations;
- reporting defects in the website, standards index, or MCP server.

Read [CONTRIBUTING.md](CONTRIBUTING.md) for the contribution workflow, evidence expectations, content structure, and local checks. Questions and early ideas can start in [GitHub Discussions](https://github.com/aklodhi98/humanstandards/discussions); concrete defects belong in [Issues](https://github.com/aklodhi98/humanstandards/issues).

## Licensing and attribution

- **Original documentation and standards data:** [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/)
- **Software and code examples:** [MIT License](LICENSE.md)
- **Third-party material:** retained under its original terms and documented in [THIRD_PARTY_LICENSES.md](THIRD_PARTY_LICENSES.md)

Human Standards builds on work across human factors, cognitive psychology, HCI, UX, and accessibility. Source citations are included throughout the library, with broader starting points in the [academic research references](https://www.humanstandards.org/references/academic-research/) and [standards and guidelines](https://www.humanstandards.org/references/standards-guidelines/).

Built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build). Maintained by [AK Lodhi](https://aklodhi.com).
