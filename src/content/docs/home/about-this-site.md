---
title: About This Site
description: What Human Standards covers, who it's for, and how to use it effectively — whether you're a human reader or an AI agent.
---

Human Standards is a practical, evidence-based guide to designing technology that fits human capabilities and limitations. This documentation serves both human readers seeking actionable guidance and AI agents needing structured, machine-readable specifications.

---

## Purpose

### The Problem

Technology is often built by people who understand their systems deeply but overlook the humans who use them. The result:

- Interfaces that work for experts but confuse newcomers
- Features that assume perfect attention, memory, and motor control
- Designs that exclude people with disabilities
- Error-prone systems that blame users for predictable mistakes

Human Factors research has generated decades of evidence about human capabilities and limitations. But this knowledge is scattered across academic papers, expensive consultancies, and tribal knowledge within organizations.

### Our Solution

Human Standards makes this knowledge:

| Property | Traditional HF/E | Human Standards |
|----------|-----------------|-----------------|
| **Accessible** | Academic papers, expensive training | Free, searchable documentation |
| **Actionable** | Principles and theories | Specific implementation guidance |
| **Machine-readable** | Prose descriptions | YAML validation rules, JSON tokens |
| **Current** | Published research (months/years lag) | Continuously updated |
| **Integrated** | Separate from development | MCP server for AI-assisted design |

---

## Who This Is For

### Human Readers

| Role | Primary Use |
|------|------------|
| **Designers** | Apply research-backed patterns, avoid common pitfalls |
| **Engineers** | Implement accessible, ergonomic interfaces |
| **Product Managers** | Make informed decisions about UX trade-offs |
| **QA/Testers** | Validate against human factors criteria |
| **Content Strategists** | Write clear, accessible microcopy |
| **Researchers** | Find consolidated references and methods |

### AI Agents and LLMs

This documentation is structured for machine consumption:

| Format | Purpose |
|--------|---------|
| **Specification Tables** | Precise values for code generation |
| **YAML Validation Rules** | Automated design checking |
| **Pseudo-code Decision Logic** | Programmatic guidance application |
| **JSON Design Tokens** | Direct integration with design systems |
| **Structured References** | Verifiable source linking |

**Example — Machine-readable validation rule:**

```yaml
rules:
  - id: touch-target-minimum
    severity: error
    check: "Interactive elements are at least 44×44px"
    wcag: "2.5.5 AA"
    platforms:
      ios: "44×44pt"
      android: "48×48dp"
      web: "44×44px"
```

---

## How to Use This Site

### For Quick Answers

**[Quick Reference](/home/quick-reference/)** — Key numbers, thresholds, and specifications at a glance:
- Touch target sizes
- Contrast ratios
- Response time limits
- Memory constraints

### For Deep Understanding

**Topic Guides** — Comprehensive coverage of human factors domains:

| Category | Topics |
|----------|--------|
| **Perception** | Vision, hearing, touch — how humans sense interfaces |
| **Cognition** | Attention, memory, cognitive load — mental processing |
| **Decision-Making** | Biases, errors, defensive design — behavior patterns |
| **Ergonomics** | Targets, spacing, posture — physical interaction |
| **Accessibility** | WCAG, assistive tech, inclusive design — universal access |

### For Implementation

**[Checklists & Playbooks](/checklists-playbooks/form-design-playbook/)** — Ship with confidence:
- [Accessibility Checklist](/checklists-playbooks/accessibility-checklist/)
- [Form Design Playbook](/checklists-playbooks/form-design-playbook/)
- [Onboarding Playbook](/checklists-playbooks/onboarding-playbook/)
- [Content & Microcopy Templates](/checklists-playbooks/content-microcopy-templates/)

**[Code & Design Tokens](/code-design-tokens/css-json-tokens/)** — Copy-paste implementation:
- [CSS/JSON Tokens](/code-design-tokens/css-json-tokens/)
- [ARIA & Keyboard Patterns](/code-design-tokens/aria-keyboard-patterns/)
- [Touch Targets & Spacing](/code-design-tokens/touch-targets-spacing/)
- [Accessible Typography](/code-design-tokens/accessible-typography/)

### For AI Integration

**MCP Server** — Real-time human factors guidance in your development workflow:

```bash
# Install the Human Standards MCP server
npm install -g human-standards-mcp

# Configure in your AI assistant
{
  "mcpServers": {
    "human-standards": {
      "command": "human-standards-mcp",
      "args": ["serve"]
    }
  }
}
```

**Available MCP Tools:**
- `validate_design` — Check designs against human factors criteria
- `get_specification` — Retrieve specific values and thresholds
- `suggest_improvements` — Get recommendations for design issues
- `check_accessibility` — WCAG compliance validation

---

## Content Structure

### Page Anatomy

Each topic page follows a consistent structure:

| Section | Purpose |
|---------|---------|
| **Introduction** | Why this topic matters |
| **Core Concepts** | Foundational knowledge |
| **Specifications** | Concrete values and thresholds |
| **Design Implications** | How to apply the concepts |
| **Common Mistakes** | Pitfalls to avoid |
| **Validation Rules** | YAML for automated checking |
| **Decision Logic** | Pseudo-code for programmatic use |
| **Recent Research** | 2024-2025 findings |
| **References** | Categorized sources |
| **See Also** | Related pages |

### Information Density Levels

| Level | Format | Use Case |
|-------|--------|----------|
| **Glanceable** | Tables, bullet points | Quick lookup |
| **Scannable** | Headings, summaries | Finding relevant sections |
| **Readable** | Prose explanations | Deep understanding |
| **Extractable** | YAML, JSON, code | Machine processing |

---

## Scope

### What's Covered

**Current focus — Digital interfaces:**

| Domain | Coverage |
|--------|----------|
| **Web Applications** | Full guidance, code patterns, validation |
| **Mobile Apps** | Touch targets, gestures, responsive design |
| **Desktop Software** | Keyboard shortcuts, window management |
| **Digital Accessibility** | WCAG 2.2 compliance, ARIA patterns |
| **Cognitive Principles** | For screens and digital interaction |
| **Input Ergonomics** | Keyboard, mouse, touch, stylus |

### What's Coming

**On the roadmap:**

| Domain | Planned Coverage |
|--------|-----------------|
| **Voice Interfaces** | Conversational design, speech recognition |
| **VR/AR** | Spatial computing, immersive UX |
| **AI Systems** | Human-AI interaction, explainability |
| **IoT/Ambient** | Smart environments, multimodal |
| **Wearables** | Body-worn devices, health tech |

See [Scope & Roadmap](/human-overview/scope-and-roadmap/) for expansion plans.

### What's Not Covered

- Physical product design (furniture, tools, vehicles)
- Architectural ergonomics (buildings, spaces)
- Industrial safety systems
- Medical device regulation (though accessibility applies)

---

## Key Terms

| Term | Definition |
|------|------------|
| **Human Factors (HF/E)** | Scientific discipline focused on optimizing fit between humans, tasks, and systems |
| **Ergonomics** | Largely synonymous with Human Factors; emphasizes physical aspects |
| **Accessibility (a11y)** | Ensuring people with disabilities can perceive, understand, navigate, and interact |
| **Usability** | Effectiveness, efficiency, and satisfaction in achieving goals |
| **Inclusive Design** | Designing for the full range of human diversity |
| **Universal Design** | Design usable by all people without adaptation |
| **Dark Patterns** | Deceptive design practices that trick users |

---

## Design Philosophy

### Principles We Follow

1. **Evidence over opinion** — Cite research, not preferences
2. **Specificity over generality** — Concrete values, not vague guidance
3. **Inclusion by default** — Accessible design benefits everyone
4. **Transparency** — No dark patterns, no manipulation
5. **Practicality** — Implementable guidance, not theoretical ideals

### Ethics Stance

We explicitly reject:

| Pattern | Why |
|---------|-----|
| **Confirmshaming** | Manipulates through guilt |
| **Hidden costs** | Deceives about true price |
| **Roach motels** | Easy to enter, hard to exit |
| **Misdirection** | Exploits attention limitations |
| **Forced continuity** | Exploits inertia |
| **Friend spam** | Abuses trust relationships |

Human Standards promotes building trust through honest, transparent design.

---

## Technology Stack

This documentation is built with:

| Component | Technology |
|-----------|------------|
| **Framework** | [Astro](https://astro.build/) with Starlight |
| **Styling** | Custom CSS with design tokens |
| **Hosting** | Static site (deployable anywhere) |
| **Search** | Built-in Starlight search |
| **Version Control** | Git (GitHub) |

**Why Astro/Starlight:**
- Fast static generation
- Markdown/MDX content
- Built-in accessibility features
- Easy contribution workflow
- No JavaScript required for reading

---

## Versioning and Updates

### Content Updates

- Major standards changes (WCAG versions, platform guidelines) are noted in affected pages
- Research findings are added as they're published
- Community contributions are reviewed and merged regularly

### Changelog

Notable updates are tracked in the repository:
- New pages and major expansions
- Standards version updates
- Corrections and clarifications

### Staying Current

**Subscribe to updates:**
- Watch the GitHub repository
- Check the [Recent Research](#) sections in topic pages
- Follow referenced sources (W3C WAI, Nielsen Norman Group)

---

## Contributing

We welcome contributions from the community:

| Contribution Type | How |
|-------------------|-----|
| **Fix errors** | Submit a PR with correction |
| **Add research** | Include citation and link |
| **Suggest topics** | Open an issue |
| **Improve examples** | Follow the example template |
| **Translate** | Contact maintainers |

See [How to Contribute](/home/how-to-contribute/) for detailed guidelines.

### Quality Standards

Contributions should:
- Cite authoritative sources
- Provide specific, measurable guidance where possible
- Follow the existing page structure
- Include machine-readable formats (tables, YAML) where appropriate
- Avoid marketing language or product promotion

---

## License

### Original Documentation and Standards Data

Original Human Standards documentation and standards data are dedicated to the public domain under **[CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/)**:

- Use, copy, adapt, and redistribute the material for any purpose
- Commercial use is permitted
- Permission and attribution are not required, although attribution is appreciated

### Software and Code Examples

Software, tooling, and code examples are licensed under the **[MIT License](https://github.com/aklodhi98/humanstandards/blob/main/LICENSE.md)**:

- Use, modify, distribute, sublicense, and sell the software
- Keep the MIT copyright and permission notice with substantial copies

### Third-Party Content

Some examples and patterns are adapted from:
- W3C WAI (W3C Document License)
- GOV.UK Design System (Open Government Licence)
- Platform guidelines (respective licenses)

These licenses apply only to material Human Standards has the right to license. See [Third-Party Licenses](https://github.com/aklodhi98/humanstandards/blob/main/THIRD_PARTY_LICENSES.md) for retained third-party terms and attribution.

---

## Contact and Support

### Getting Help

| Need | Action |
|------|--------|
| **Bug report** | [Open an issue](https://github.com/aklodhi98/humanstandards/issues/new) |
| **Feature request** | [Open an issue](https://github.com/aklodhi98/humanstandards/issues/new) |
| **Question** | [Ask in an issue](https://github.com/aklodhi98/humanstandards/issues/new) |
| **Contribution** | [Submit a PR](https://github.com/aklodhi98/humanstandards/pulls) |

### Maintainers

Human Standards is maintained by contributors passionate about human-centered design. See the repository for current maintainers.

---

## References

**Foundational:**
- [ISO 9241-210 — Human-Centred Design](https://www.iso.org/standard/77520.html)
- [IEA Definition of Ergonomics](https://iea.cc/what-is-ergonomics/)
- [HFES — Human Factors & Ergonomics Society](https://www.hfes.org/)

**Accessibility:**
- [W3C WAI — Accessibility Fundamentals](https://www.w3.org/WAI/fundamentals/)
- [WCAG 2.2 Specification](https://www.w3.org/TR/WCAG22/)

**Design Systems:**
- [GOV.UK Design System](https://design-system.service.gov.uk/)
- [Inclusive Design Principles](https://inclusivedesignprinciples.org/)

**AI Integration:**
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Anthropic Claude Documentation](https://docs.anthropic.com/)

---

## See Also

- [What Are Human Standards?](/human-overview/what-are-human-standards/) — Core definition and philosophy
- [Getting Started](/human-overview/getting-started/) — Where to begin
- [Quick Reference](/home/quick-reference/) — Key numbers at a glance
- [How to Contribute](/home/how-to-contribute/) — Contribution guidelines
- [Scope & Roadmap](/human-overview/scope-and-roadmap/) — Future expansion plans
