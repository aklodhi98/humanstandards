# Contributing to Human Standards

Thank you for your interest in contributing to Human Standards! This project aims to make human factors knowledge actionable for everyone building technology.

## Ways to Contribute

### 1. Improve Documentation

- **Fix errors** — Typos, broken links, outdated information
- **Clarify concepts** — Make complex topics more understandable
- **Add examples** — Real-world case studies with measurable impact
- **Expand coverage** — New topics within [our current scope](https://www.humanstandards.org/human-overview/scope-and-roadmap/)

### 2. Share Real-World Examples

We're especially interested in **before/after case studies** that demonstrate human factors principles in action. See our [How to Document Examples](https://www.humanstandards.org/examples/how-to-document-examples/) guide for the complete framework.

**Required elements:**
- Observable problem with quantitative evidence
- Clear hypothesis based on human factors principles
- Implementation details (what changed)
- Measured impact (before/after metrics with sample sizes)
- Lessons learned and trade-offs
- Connection to Human Standards documentation

### 3. Report Issues

Found a problem? [Open an issue](https://github.com/aklodhi98/humanstandards/issues) with:
- Clear description of the problem
- Expected vs. actual behavior
- Steps to reproduce (if applicable)
- Relevant links or screenshots

### 4. Suggest New Topics

Before suggesting a new topic:
1. Check our [Scope & Roadmap](https://www.humanstandards.org/human-overview/scope-and-roadmap/) to understand current coverage
2. Search [existing issues](https://github.com/aklodhi98/humanstandards/issues) to avoid duplicates
3. Open an issue explaining:
   - What topic you'd like to see
   - Why it's important
   - What evidence/sources exist

## How to Contribute

### Quick Changes

For small fixes (typos, broken links):
1. Click "Edit this page" at the bottom of any documentation page
2. Make your changes in the GitHub editor
3. Submit a pull request

### Larger Contributions

For new content or significant changes:

1. **Fork the repository**
   ```bash
   # Fork via GitHub UI, then clone your fork
   git clone https://github.com/YOUR-USERNAME/humanstandards.git
   cd humanstandards
   ```

2. **Create a branch**
   ```bash
   git checkout -b add-new-topic
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the dev server**
   ```bash
   npm run dev
   ```
   Open http://localhost:4321 to preview your changes.

5. **Make your changes**
   - Add or edit files in `src/content/docs/`
   - Follow our [content guidelines](#content-guidelines) below

6. **Test your changes**
   ```bash
   npm run check
   ```
   Ensure the build and internal-link checks complete without errors.

7. **Commit and push**
   ```bash
   git add .
   git commit -m "Add [topic]: brief description"
   git push origin add-new-topic
   ```

8. **Submit a pull request**
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Provide a clear description of your changes

## MCP Dogfood Workflow for Interface Changes

Human Standards should use its own guidance when changing a user interface. In
an MCP-compatible client, use this bounded workflow before and after editing:

1. Start with `search_standards` using the user's task or risk, not a broad
   category name.
2. Read only the relevant paths or named sections with `get_standard`.
3. Use `get_heuristic` when a heuristic review is useful; do not load all ten by
   default.
4. For layout work, call `get_spatial_rhythm` before implementation and again
   during rendered review. Resolve its relationship order through this
   project's existing tokens.
5. Record the consulted Human Standards paths, the decisions they informed,
   and any exceptions in the pull-request description.
6. Complete rendered browser and accessibility checks. The MCP is a reference
   source: it does not inspect the project, validate the result, or replace user
   research and independent review.

The trusted Codex project configuration already pins the published MCP package.
Contributors without an MCP client can follow the same paths in the public
documentation library.

## Content Guidelines

### Evidence-Based

- **Cite reputable sources** — Academic research, standards (WCAG, ISO), established organizations (NN/g, W3C)
- **Avoid opinions** — State facts and cite evidence
- **Quantify when possible** — Use numbers, percentages, metrics

### Practical

- **Provide actionable guidance** — Not just theory, but "what to do"
- **Include code examples** — Show implementation patterns (React, TypeScript, CSS)
- **Link to real examples** — Case studies from industry (see /examples/)

### Clear & Concise

- **Use plain language** — Avoid jargon or define technical terms
- **Break up text** — Use headings, lists, tables
- **Be direct** — Get to the point quickly

### Inclusive

- **Consider diverse users** — Different abilities, contexts, cultures
- **Avoid assumptions** — Not everyone uses a mouse, sees color, or speaks English natively
- **Use accessible examples** — Show how to build inclusively

## File Structure

```
src/content/docs/
├── index.mdx                    # Homepage
├── human-overview/              # Overview and roadmap
├── cognition/                   # Cognitive psychology
├── perception/                  # Sensory perception
├── emotions-motivation/         # Trust, stress, motivation
├── decision-making-errors/      # Biases, defensive design
├── ergonomics/                  # Physical ergonomics
├── accessibility/               # WCAG, assistive tech
├── interaction-patterns/        # UI patterns (forms, navigation)
├── code-design-tokens/          # Implementation guidance
├── examples/                    # Real-world case studies
├── checklists-playbooks/        # Practical guides
├── research-methods-metrics/    # Testing and measurement
├── social-cultural/             # Social and cultural context
└── references/                  # Standards, guidelines, research
```

## Frontmatter Format

Every documentation file should include frontmatter:

```yaml
---
title: Your Page Title
description: A brief description (used for SEO and previews)
---
```

## Writing Style

- **Active voice** — "Users click the button" not "The button is clicked"
- **Present tense** — "This principle states" not "This principle stated"
- **Second person** — "You should consider" not "One should consider"
- **Be specific** — "48×48px touch target" not "large enough"

## Code Examples

When including code:

- **Use TypeScript** for JavaScript examples (shows types clearly)
- **Use React** for component examples (widely adopted)
- **Include comments** for non-obvious logic
- **Show accessibility** — ARIA labels, semantic HTML, keyboard support
- **Format consistently** — Use Prettier defaults

Example:

```tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export function AccessibleButton({ label, onClick, disabled = false }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      // 48×48px minimum for WCAG 2.2 Level AA
      style={{ minWidth: '48px', minHeight: '48px' }}
    >
      {label}
    </button>
  );
}
```

## Cross-Referencing

Link to related content:

```markdown
See [Cognitive Load](https://www.humanstandards.org/cognition/cognitive-load/) for more on reducing mental effort.

See our [Progressive Disclosure example](https://www.humanstandards.org/examples/cognitive-load/progressive-disclosure-turbotax/) for implementation details.
```

## Adding Images

1. Place images in `src/assets/images/[category]/`
2. Use descriptive filenames: `touch-target-sizing-wcag.png`
3. Include alt text: `![Diagram showing 48x48px touch target](./path/to/image.png)`
4. Optimize for web (compress, use appropriate formats)

## License

By contributing, you agree that your contributions will be licensed under:
- **Original documentation and standards data:** CC0 1.0 Universal
- **Original software and code examples:** MIT License

You also confirm that you have the right to contribute the material under those terms. Third-party material must retain its original licence and attribution notices.

See [LICENSE.md](LICENSE.md) for details.

## Code of Conduct

- **Be respectful** — Treat all contributors with dignity
- **Be constructive** — Offer helpful feedback
- **Be patient** — Not everyone has the same expertise
- **Be collaborative** — We're building this together

Unacceptable behavior includes harassment, discrimination, or personal attacks. Maintainers will remove, edit, or reject contributions that violate these standards.

## Questions?

- **Stuck?** Open an [issue](https://github.com/aklodhi98/humanstandards/issues/new)
- **Found a bug?** File an [issue](https://github.com/aklodhi98/humanstandards/issues)
- **Want to chat?** Reach out via [aklodhi.com](https://aklodhi.com)

Thank you for making technology more human! 🙏
