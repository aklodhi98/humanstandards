---
title: How to Contribute
description: Contribution workflow, style guidelines, evidence standards, and templates for contributing to Human Standards.
---

Human Standards is an open-source project that welcomes contributions from designers, developers, researchers, and anyone passionate about human-centered design. This guide explains how to contribute effectively.

---

## Ways to Contribute

### Content Contributions

| Contribution Type | Effort | Impact |
|-------------------|--------|--------|
| **Fix typos/errors** | Low | High (accuracy matters) |
| **Add citations** | Low | Medium (strengthens evidence) |
| **Improve examples** | Medium | High (practical value) |
| **Expand existing pages** | Medium | High (depth) |
| **Write new pages** | High | High (coverage) |
| **Add research findings** | Medium | High (currency) |

### Technical Contributions

| Contribution Type | Skills Needed |
|-------------------|---------------|
| **Fix broken links** | Basic Git |
| **Improve site navigation** | Astro/Starlight |
| **Add search functionality** | JavaScript |
| **Create interactive examples** | MDX, JavaScript |
| **Build validation tools** | TypeScript |
| **Develop MCP server** | Node.js, TypeScript |

### Community Contributions

| Activity | How |
|----------|-----|
| **Report issues** | Open GitHub issue |
| **Suggest topics** | Open GitHub issue |
| **Review PRs** | Comment on pull requests |
| **Answer questions** | GitHub issues |
| **Spread awareness** | Share and cite |

---

## Contribution Workflow

### Quick Fixes (Typos, Small Edits)

1. **Edit directly on GitHub**
   - Navigate to the file
   - Click the pencil icon (Edit this file)
   - Make your change
   - Submit a pull request

2. **No issue required** for obvious fixes

### Larger Contributions

```
1. Open Issue → 2. Confirm Scope → 3. Fork → 4. Branch → 5. PR → 6. Review → 7. Merge
```

**Step-by-step:**

1. **Open an issue**
   - Describe the proposed change
   - Explain the rationale
   - Link to supporting evidence

2. **Confirm scope**
   - Maintainers may have questions
   - Others may offer suggestions
   - Scope may be refined

3. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/humanstandards
   cd humanstandards
   ```

4. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-fix-description
   ```

5. **Make your changes**
   - Follow the style guide (below)
   - Test locally with `npm run dev`
   - Ensure links work

6. **Submit a pull request**
   - Reference the issue number
   - Describe what changed and why
   - List any new dependencies

7. **Address review feedback**
   - Maintainers may request changes
   - Respond to comments
   - Push updates to your branch

---

## Content Style Guide

### Voice and Tone

| Principle | Do | Don't |
|-----------|-----|-------|
| **Direct** | "Use 44px minimum touch targets" | "It's generally recommended that..." |
| **Evidence-based** | "Research shows..." with citation | "Best practice suggests..." |
| **Inclusive** | "People who are blind" | "The blind" |
| **Precise** | "4.5:1 contrast ratio" | "High contrast" |
| **Actionable** | "Check contrast with WebAIM tool" | "Ensure adequate contrast" |

### Writing Principles

1. **Lead with the important information**
   - Put key numbers and requirements first
   - Explanations come after

2. **Use active voice**
   - ✅ "Users scan pages in an F-pattern"
   - ❌ "Pages are scanned by users in an F-pattern"

3. **Be concise**
   - Remove unnecessary words
   - One idea per sentence
   - Short paragraphs (3-4 sentences max)

4. **Avoid jargon without definition**
   - Define terms on first use
   - Link to glossary when appropriate

### Formatting Standards

**Headings:**
- Use sentence case ("Touch target sizing" not "Touch Target Sizing")
- Don't skip heading levels (h2 → h4)
- Keep headings short and descriptive

**Lists:**
- Use bullets for unordered items
- Use numbers for sequential steps
- Keep list items parallel in structure

**Tables:**
- Use tables for structured comparisons
- Include header row
- Keep cells concise

**Code blocks:**
- Specify language for syntax highlighting
- Include comments for complex code
- Show complete, working examples

### Units and Measurements

| Measurement | Standard | Example |
|-------------|----------|---------|
| **Pixels** | px (lowercase) | 16px, 44px |
| **Points** | pt (iOS) | 44pt |
| **Density-independent** | dp (Android) | 48dp |
| **Relative** | rem, em | 1rem, 0.875em |
| **Time** | ms, s | 200ms, 2s |
| **Angles** | deg | 45deg |
| **Percentages** | % | 100%, 4.5:1 |

**Number formatting:**
- Use comma for thousands: 1,000
- Use period for decimals: 4.5
- Spell out one through nine; use numerals for 10+
- Exception: always use numerals in specifications

---

## Evidence Standards

### Source Hierarchy

| Tier | Source Type | When to Use |
|------|-------------|-------------|
| **1 (Highest)** | Official standards (WCAG, ISO) | Requirements and specifications |
| **2** | Peer-reviewed research | Scientific claims |
| **3** | Industry research (NNg, Baymard) | Design recommendations |
| **4** | Platform guidelines (Apple, Google) | Platform-specific advice |
| **5** | Expert practitioners | Practical insights |
| **6 (Lowest)** | Personal experience | Examples only, flagged as such |

### Citation Format

**In-text reference:**
> Touch targets should be at least 44×44pt (Apple HIG) or 48×48dp (Material Design).

**Reference section:**
```markdown
## References

**Official Standards:**
- [WCAG 2.2 — Touch Target Size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)

**Platform Guidelines:**
- [Apple HIG — Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons)
- [Material Design — Touch Targets](https://m3.material.io/foundations/interaction/touch-targets)

**Research:**
- [Parhi, P. et al. (2006) — Target Size Study](https://doi.org/10.1145/1125451.1125587)
```

### What Requires Citation

| Content | Citation Required |
|---------|-------------------|
| Specific numbers/thresholds | ✅ Yes |
| Research findings | ✅ Yes |
| Platform requirements | ✅ Yes |
| General design principles | Recommended |
| Code examples | No (unless adapted) |
| Personal explanations | No |

### Avoiding Unsupported Claims

| Don't Write | Write Instead |
|-------------|---------------|
| "Users prefer..." | "Nielsen research found users prefer..." |
| "Studies show..." | "[Specific study] found..." |
| "Best practice is..." | "[Source] recommends..." |
| "Always/never..." | "In most cases..." or cite the rule |

---

## Page Structure Template

Every content page should follow this structure:

````markdown
---
title: Page Title
description: One-sentence description for search and previews.
---

Brief introduction explaining why this topic matters (2-3 sentences).

---

## Core Concepts

Fundamental knowledge for this topic.

### Subsection

Details with tables, examples, and explanations.

---

## Specifications

| Specification | Value | Source |
|---------------|-------|--------|
| **Key metric** | Value | Citation |

---

## Design Implications

How to apply these concepts in practice.

### Common Patterns

Examples of good implementation.

### Common Mistakes

What to avoid and why.

---

## Validation Rules

```yaml
rule_name:
  check: "What to verify"
  severity: error | warning
  wcag: "X.X.X Level"
```

---

## Decision Logic

```text
FUNCTION evaluateSomething(input):
  IF condition:
    RETURN result
  RETURN alternative
```

---

## Recent Research

### Finding Title

Description of recent research with link.

---

## References

**Foundational Work:**
- [Classic sources]

**Official Standards:**
- [WCAG, ISO, platform guidelines]

**Recent Research:**
- [2024-2025 papers and studies]

**Practical Resources:**
- [Tools, articles, guides]

---

## See Also

- [Related Page](/path/) — Brief description
- [Another Page](/path/) — Brief description
````

---

## Machine-Readable Content

### Why It Matters

Human Standards is designed for both human readers and AI agents. Machine-readable content enables:

- Automated design validation
- AI-assisted development
- MCP server integration
- Programmatic lookup

### Formats to Include

**Specification tables:**
```markdown
| Property | Value | Unit | WCAG |
|----------|-------|------|------|
| **Minimum** | 44 | px | 2.5.8 AA |
```

**YAML validation rules:**
```yaml
rules:
  - id: rule-identifier
    check: "Human-readable description"
    severity: error
    wcag: "X.X.X Level"
    implementation: "How to verify"
```

**Pseudo-code decision logic:**
```text
FUNCTION checkRequirement(element):
  value = element.property
  IF value < threshold:
    RETURN error("Specific message")
  RETURN pass
```

**JSON tokens:**
```json
{
  "touch-target": {
    "min": { "value": 44, "unit": "px" },
    "comfortable": { "value": 48, "unit": "px" }
  }
}
```

---

## Technical Setup

### Local Development

```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/humanstandards
cd humanstandards

# Install dependencies
npm install

# Start development server
npm run dev

# Build and validate internal links
npm run check

# Preview production build
npm run preview
```

### File Structure

```
humanstandards/
├── src/
│   ├── content/
│   │   └── docs/           # All documentation pages
│   │       ├── home/       # Home and meta pages
│   │       ├── perception/ # Perception topics
│   │       ├── cognition/  # Cognition topics
│   │       └── ...
│   └── styles/             # Custom CSS
├── public/                 # Static assets
└── astro.config.mjs        # Site configuration
```

### Creating New Pages

1. Create a new `.md` or `.mdx` file in the appropriate directory
2. Add frontmatter with title and description
3. Follow the page structure template
4. Add to navigation if needed (in `astro.config.mjs`)

### Testing Your Changes

| Check | Command/Method |
|-------|----------------|
| **Local preview** | `npm run dev` |
| **Build and internal links pass** | `npm run check` |
| **External links work** | Manual check |
| **Markdown valid** | Linting in editor |
| **Content accurate** | Verify against sources |

---

## Definition of Done

A contribution is ready for merge when:

### Content Quality

- [ ] Information is accurate and verifiable
- [ ] Sources are cited appropriately
- [ ] Language follows style guide
- [ ] Examples are clear and helpful

### Technical Quality

- [ ] Build and internal-link checks pass (`npm run check`)
- [ ] External links have been checked
- [ ] Images have alt text
- [ ] Code examples are syntactically correct

### Accessibility

- [ ] Headings are properly nested
- [ ] Tables have header rows
- [ ] Color is not sole information carrier
- [ ] Content is screen reader friendly

### Machine Readability

- [ ] Specification tables are present where applicable
- [ ] YAML validation rules included for measurable criteria
- [ ] Decision logic provided for complex evaluations

---

## Review Process

### What Reviewers Check

| Aspect | Criteria |
|--------|----------|
| **Accuracy** | Claims supported by citations |
| **Completeness** | Covers topic adequately |
| **Clarity** | Easy to understand |
| **Consistency** | Matches existing style |
| **Usefulness** | Provides practical value |

### Response Times

| PR Type | Expected Response |
|---------|-------------------|
| **Typo/minor fix** | 1-3 days |
| **Content addition** | 3-7 days |
| **New page** | 1-2 weeks |
| **Major restructuring** | 2-4 weeks |

### Handling Feedback

- **Be patient** — Reviewers are volunteers
- **Be responsive** — Address comments promptly
- **Be open** — Feedback improves quality
- **Ask questions** — Clarify if feedback is unclear

---

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Assume good intentions
- Focus on the content, not the person
- Welcome newcomers
- Accept constructive criticism gracefully

### Unacceptable Behavior

- Personal attacks
- Discriminatory language
- Harassment of any kind
- Spam or self-promotion

### Reporting Issues

Contact maintainers via GitHub issues or email if you experience or witness unacceptable behavior.

---

## Recognition

Contributors are recognized in:

- Git history (commits attributed)
- Pull request acknowledgment
- README contributors section (for significant contributions)

---

## Getting Help

| Need | Where |
|------|-------|
| **General questions** | GitHub Issues |
| **Bug reports** | GitHub Issues |
| **Contribution guidance** | This page or GitHub Issues |
| **Quick questions** | Issue comments |

---

## References

**Writing Style:**
- [Google Developer Documentation Style Guide](https://developers.google.com/style)
- [GOV.UK Content Design Guide](https://www.gov.uk/guidance/content-design/writing-for-gov-uk)
- [Microsoft Writing Style Guide](https://learn.microsoft.com/en-us/style-guide/welcome/)

**Open Source Best Practices:**
- [GitHub Open Source Guide](https://opensource.guide/)
- [First Timers Only](https://www.firsttimersonly.com/)

**Accessibility Writing:**
- [W3C WAI — Writing for Web Accessibility](https://www.w3.org/WAI/tips/writing/)
- [Inclusive Language Guide — APA](https://www.apa.org/about/apa/equity-diversity-inclusion/language-guidelines)

---

## See Also

- [About This Site](/home/about-this-site/) — Project overview
- [Quick Reference](/home/quick-reference/) — Key specifications
- [What Are Human Standards?](/human-overview/what-are-human-standards/) — Core philosophy
- [Examples — How to Document](/examples/how-to-document-examples/) — Example page template
