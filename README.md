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
git clone https://github.com/Cumulative-Design/humanstandards.git
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

This project is open source. Content is provided for educational purposes with citations to original sources where applicable.

## Acknowledgments

Built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build).

---

**Questions?** Open an issue or start a discussion. We'd love to hear from you!
