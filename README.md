# Human Standards

Practical human factors and accessibility guidance for product teams. An open-source, community-driven resource for building technology that truly serves people.

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

## What is Human Standards?

Human Standards is a comprehensive guide covering the human side of product design:

- **Cognition** — Attention, cognitive load, working memory
- **Perception** — Vision, hearing, touch
- **Emotions & Motivation** — Trust, stress, motivation models
- **Decision-Making** — Biases, errors, defensive design
- **Ergonomics** — Posture, touch targets, anthropometrics
- **Accessibility** — WCAG guidelines, assistive technologies
- **Interaction Patterns** — Forms, navigation, notifications
- **Research Methods** — Usability testing, cognitive walkthroughs

## Quick Start

```bash
# Clone the repository
git clone https://github.com/aklodhi98/humanstandards.git
cd humanstandards

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) to view the site.

## Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start local dev server at `localhost:4321`   |
| `npm run build`   | Build production site to `./dist/`           |
| `npm run preview` | Preview build locally before deploying       |

## Contributing

We welcome contributions from everyone! Here's how you can help:

### Adding or Improving Content

1. **Fork** the repository
2. **Create a branch** for your changes: `git checkout -b add-new-topic`
3. **Add or edit** Markdown files in `src/content/docs/`
4. **Submit a Pull Request** with a clear description

### Content Guidelines

- **Be evidence-based** — Cite standards (WCAG, ISO) and reputable sources
- **Be practical** — Include actionable guidance, not just theory
- **Be concise** — Use clear, direct language
- **Be inclusive** — Consider diverse users and contexts

### File Structure

```
src/content/docs/
├── index.mdx              # Homepage
├── cognition/             # Cognitive psychology topics
├── perception/            # Sensory perception
├── accessibility/         # WCAG and assistive tech
├── interaction-patterns/  # UI patterns
└── ...                    # Other topic areas
```

### Frontmatter Format

Each content file uses this frontmatter structure:

```yaml
---
title: Your Page Title
description: A brief description for SEO and previews.
---
```

## Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please be respectful and constructive in all interactions.

## License

- **Original documentation and standards data:** [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) — use, adapt, and redistribute for any purpose, including commercially; no permission or attribution required
- **Software and code examples:** [MIT License](LICENSE.md) — use, modify, distribute, sublicense, and sell
- **Third-party material:** remains under its original terms; see [THIRD_PARTY_LICENSES.md](THIRD_PARTY_LICENSES.md)

See [LICENSE.md](LICENSE.md) for full details.

## Acknowledgments

Human Standards builds upon and is inspired by excellent prior work in the UX and accessibility communities.

### Third-Party Content

- **[Luxor Claude Marketplace](https://github.com/manutej/luxor-claude-marketplace)** by Manu Tej + Claude Code - Real-world UX examples and patterns adapted with permission under MIT license. See [THIRD_PARTY_LICENSES.md](THIRD_PARTY_LICENSES.md).

### Standards and Guidelines

- **[WCAG 2.2](https://www.w3.org/WAI/WCAG22/quickref/)** - W3C Web Content Accessibility Guidelines
- **[Nielsen's Usability Heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/)** - Nielsen Norman Group foundational principles
- **[iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)** - Apple Inc. design standards
- **[Material Design](https://m3.material.io/)** - Google LLC design system

### Technology

Built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build).

### Research Community

Thank you to researchers in cognitive psychology, human factors engineering, and HCI whose evidence-based work makes this resource possible. Full citations in [academic research references](/references/academic-research.md).

Thank you to all who advance human-centered design. 🙏

---

**Questions?** Open an issue or start a discussion. We'd love to hear from you!
