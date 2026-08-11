---
title: Spatial Rhythm, Grouping & Layout
description: Design spacing as a hierarchy of relationships—using repetition, contrast, responsive rhythm, and optical judgment instead of a universal pixel unit.
---

Spacing is not a bag of interchangeable empty pixels. It tells people what belongs together, where one task ends, where another begins, and what deserves attention.

> **A spacing scale supplies the vocabulary. Spatial rhythm determines how that vocabulary is composed.**

A product may use a 4px, 5px, 8px, fluid, or mixed primitive scale. None of those choices determines whether the interface has good rhythm. Rhythm comes from applying the scale according to content, proximity, repetition, hierarchy, typography, density, and viewport.

This standard separates two decisions:

1. **Relationship grammar** — which elements should feel closer or farther apart.
2. **Token resolution** — which project-specific values express those relationships in a particular interface.

The relationship grammar is reusable. The resolved values belong to the product and context.

## Evidence boundary

This page combines accessibility requirements with design guidance. They are not interchangeable:

- WCAG 2.2 defines requirements for pointer-target size and spacing, and for layouts to survive user-applied text spacing.
- W3C cognitive accessibility guidance recommends white space for clearer chunks and less overwhelming presentation, but identifies this as supplemental guidance rather than a WCAG conformance requirement.
- The relationship ranks, composition patterns, density guidance, and optical adjustments below are design guidance. They are not universal accessibility thresholds.

## The relationship order

Use five ordered relationships. The ranks describe **relative separation**, not ratios, multiples, or pixel values.

```text
attached < associated < grouped < separated < sectional
```

| Rank | Relationship | Intent | Typical examples |
|------|--------------|--------|------------------|
| 1 | **Attached** | Elements form one immediate reading or interaction unit | Icon + label; value + unit; media + caption |
| 2 | **Associated** | Distinct elements directly explain or operate on one another | Label + input; input + error; title + description |
| 3 | **Grouped** | Peer items belong to one collection, task, or repeated pattern | Field + field; list item + list item; toolbar controls |
| 4 | **Separated** | Groups remain related within a region but perform different roles | Fields + actions; filters + results; card content + footer |
| 5 | **Sectional** | Major regions need the strongest pause in the page rhythm | Page section + page section; article + related resources |

Resolve these ranks using the product's existing tokens. A compact enterprise table and a spacious editorial page may map them differently while preserving the same order.

### Preserve meaning before measurement

A mechanically consistent layout can still be semantically wrong. For example:

- Equal space above and below a heading makes it unclear which content the heading introduces.
- Equal gaps between a label, input, help text, and the next field flatten two relationships into one.
- Card padding that equals the gap between cards weakens the card boundary.
- A uniform vertical Stack applied to every child produces consistency without hierarchy.

When two values conflict, preserve the intended relationship before preserving mathematical symmetry.

## How rhythm works

### Repetition creates predictability

Repeated peers should use the same spatial pattern. A list, settings category, card collection, or form becomes easier to scan when each instance repeats its internal rhythm.

Compare repeated instances for:

- internal padding;
- label-to-content gaps;
- sibling gaps;
- alignment;
- the position of actions or metadata; and
- responsive behaviour.

An unexplained change is more disruptive than a value that happens not to sit on a preferred mathematical grid.

### Variation creates hierarchy

If every gap is equal, the page has a beat but no phrasing. Deliberate variation creates pauses, transitions, and emphasis.

Use stronger separation when:

- the user moves to a different subtask;
- controls affect a different region;
- the content changes topic or responsibility;
- a repeated sequence ends; or
- a high-priority element needs room to be perceived.

Do not add large space merely to make an interface feel premium. Empty space without a relational purpose can fragment a task and push important content out of view.

### Typography participates in the rhythm

Line height, paragraph spacing, heading margins, list rhythm, captions, and measure form one system.

In editorial flow:

- keep a heading closer to the content it introduces than to the content it concludes;
- keep captions attached to their media;
- use larger pauses between sections than between paragraphs;
- balance page gutters with line length; and
- treat a baseline grid as an alignment aid rather than an inflexible production rule.

[Figma's typography guidance](https://www.figma.com/best-practices/typography-systems-in-figma/) describes 8-point grids and 4-point baselines as one useful way to establish vertical rhythm, while warning against enforcing them rigidly across real devices and rendered code.

## Responsive rhythm

Responsive spacing is not “desktop values minus one token.” Preserve the relationship grammar while recomposing the layout.

### Small viewports

- Protect attached and associated relationships first.
- Recompose columns before compressing every gap.
- Reduce large sectional pauses only when they consume space without improving orientation.
- After controls stack, keep each control closer to its own label or description than to the next item.

### Large viewports

- Allow stronger sectional pauses and wider gutters where they improve hierarchy.
- Do not stretch attached pairs simply because space is available.
- Prevent arbitrary voids between columns with unequal content.
- Review whether a task still feels continuous when more content appears above the fold.

### Fluid spacing

Some spatial roles can interpolate between small- and large-screen values using `clamp()` or an equivalent project system. Fluid spacing works best when the endpoints are deliberate and the relationship order remains stable throughout the range.

Utopia's fluid space approach is a useful implementation reference: it defines project-specific small- and large-screen palettes, then lets the browser interpolate between them. It is an option, not a requirement.

## Density modes

Density changes token resolution, not semantic relationships.

| Mode | Guidance |
|------|----------|
| **Compact** | Use a tighter subset of the product scale, preserve visible region boundaries, and never compress target or text requirements away. |
| **Comfortable** | Use the product's default mapping with clear contrast between internal, grouped, and sectional relationships. |
| **Spacious** | Use more generous tokens without stretching attached pairs or fragmenting a continuous task. |

Avoid a global multiplier that scales every gap equally. Dense data regions, navigation, body content, and page sections may need different adjustments.

## Optical adjustment

Mathematical equality and visual equality are not always the same. Icons contain internal whitespace; typefaces have different metrics; rounded and irregular shapes carry different visual weight.

Optical adjustment is appropriate when it restores balance or relational meaning. Prefer a supported neighbouring token. When a raw value is necessary, record:

- the affected pair;
- the reason;
- the viewport or density mode;
- why a supported token did not work; and
- how the rendered result was reviewed.

Do not treat every off-scale measurement as a failure. Do treat unexplained exceptions and repeated-component drift as review findings.

## Let context own external spacing

External spacing belongs to the relationship between siblings. Parents should normally control it with `gap`, a Stack, a Cluster, or another composition primitive. Components should control their internal padding.

```css
.field-stack {
  display: grid;
  gap: var(--space-field-to-field);
}

.field {
  display: grid;
  gap: var(--space-label-to-control);
}

.section-stack {
  display: grid;
  gap: var(--space-section-to-section);
}
```

The semantic aliases resolve to the product's primitive scale:

```css
:root {
  --space-label-to-control: var(--project-space-associated);
  --space-field-to-field: var(--project-space-grouped);
  --space-section-to-section: var(--project-space-sectional);
}
```

This avoids leftover child margins, accidental `gap` + margin doubling, and components that carry the wrong external spacing into a new context.

## Composition patterns

### Form stack

```text
label → control          associated
control → help/error     associated
field → field            grouped
field group → actions    separated
```

Do not use one universal gap between every direct child of a form. The user should be able to assign help and error text to the correct field by position alone.

### Settings section

```text
setting label → description    associated
setting copy → control         associated
setting row → setting row      grouped
category → category            sectional
```

When rows stack on small screens, the control must remain visually inside its setting rather than drifting toward the next row.

### Card collection

```text
title → description        associated
card content → actions     separated
card → card                grouped
collection → next section  sectional
```

Keep repeated card padding and internal patterns consistent. The gap between cards should not be confused with the padding inside a card.

### Editorial flow

```text
heading → introduced content   associated
paragraph → paragraph          grouped
media → caption                attached
section → section              sectional
```

Coordinate type and space as one reading rhythm rather than styling every element in isolation.

### Dashboard

```text
metric label → value        attached
panel title → content       associated
controls → affected region  associated
region → region             separated
```

Use compact repeated rhythms inside dense regions and stronger pauses between responsibilities. A dashboard should not be uniformly dense or uniformly spacious.

## Common AI-generated failures

| Failure | Why it happens | Review response |
|---------|----------------|-----------------|
| Universal gap everywhere | The agent treats a primitive scale as layout semantics | Label each relationship before choosing tokens |
| Evenly padded “card soup” | Every region is generated from the same card recipe | Distinguish collections, subsections, and page regions |
| Label drift | The field is implemented as unrelated siblings | Wrap the field and let its parent own the associated gap |
| Double spacing | Parent `gap` combines with child margins | Reset child flow margins inside the composition primitive |
| Desktop rhythm copied to mobile | Values change without recomposing relationships | Stack regions and recheck nearest-neighbour meaning |
| Mathematically perfect, optically wrong | Bounding boxes are mistaken for visual weight | Review icons, type metrics, and irregular shapes visually |
| Arbitrary one-off values | The agent fixes symptoms without a semantic model | Resolve to a named relationship or document the exception |

## Human review checklist

- [ ] Can each label, message, control, and caption be assigned to the correct content by position alone?
- [ ] Are gaps within a group smaller than gaps between groups?
- [ ] Do repeated peers use the same rhythm?
- [ ] Are deliberate changes of rhythm communicating a real transition or priority?
- [ ] Is each heading closer to the content it introduces?
- [ ] Do page regions remain distinguishable without relying only on borders or colour?
- [ ] Does the relationship order survive small, medium, and large viewports?
- [ ] Does compact mode preserve targets, readability, and regional boundaries?
- [ ] Are optical exceptions documented and reviewed in the rendered interface?
- [ ] Has the interface been checked with realistic content, text resizing, and translated strings?

## Machine-readable guidance for MCP

The Human Standards MCP server exposes `get_spatial_rhythm`. Call it before generating a layout and again during rendered review.

```json
{
  "pattern": "form-stack",
  "density": "comfortable",
  "viewport": "small"
}
```

The tool returns:

- the ordered relationship grammar;
- the selected composition pattern;
- density and viewport guidance;
- product-token resolution instructions;
- manual review questions;
- evidence boundaries; and
- canonical references.

The MCP does **not** return a universal pixel scale. If the product already has spacing tokens, the agent must map the relationship ranks to those tokens. If no scale exists, any proposed values are a project hypothesis that must be tested with realistic content and rendered review.

### Agent workflow

1. Identify the composition pattern and semantic relationships.
2. Retrieve the relevant spatial-rhythm contract.
3. Resolve relationship ranks using the product's tokens, density, type, platform, and viewport.
4. Implement external spacing in parent composition primitives.
5. Render realistic content at representative widths.
6. Compare computed spacing across repeated components.
7. Review grouping, hierarchy, responsive rhythm, and optical balance visually.
8. Correct the implementation before calling it complete.

## References

### Spatial systems and rhythm

- [Figma — Design systems 102: How to build your design system](https://static.figma.com/uploads/b45ca996363483a82c3ab9ef6e3bcf072ade549c)
- [Figma — Everything you need to know about layout grids](https://www.figma.com/best-practices/everything-you-need-to-know-about-layout-grids/)
- [Figma — Kick-start your typography system](https://www.figma.com/best-practices/typography-systems-in-figma/)
- [Atlassian Design System — Spacing](https://atlassian.design/foundations/grid-beta/applying-grid)
- [Fluent 2 — Layout](https://fluent2.microsoft.design/layout)
- [Carbon Design System — Spacing](https://carbondesignsystem.com/elements/spacing/overview/)
- [Apple Human Interface Guidelines — Layout](https://developer.apple.com/design/human-interface-guidelines/layout)
- [U.S. Web Design System — Typography](https://designsystem.digital.gov/components/typography/)

### Design context for AI

- [Figma — Design context in AI workflows](https://www.figma.com/resource-library/design-context-ai/)
- [Figma — Best practices to help Figma AI understand your design system](https://help.figma.com/hc/en-us/articles/38978644498199-AI-workflows-collection-Best-practices-to-help-Figma-AI-understand-your-design-system)

### Accessibility and implementation

- [W3C WAI — Use White Spacing](https://www.w3.org/WAI/WCAG2/supplemental/patterns/o3p10-whitespace/)
- [W3C WAI — Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)
- [W3C WAI — Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing)
- [Every Layout — The Stack](https://every-layout.dev/layouts/stack/)
- [Utopia — Designing with a fluid space palette](https://utopia.fyi/blog/designing-with-a-fluid-space-palette/)
- [Design Tokens Format Module 2025.10](https://www.designtokens.org/TR/2025.10/format/)

## See also

- [CSS/JSON Design Tokens](/code-design-tokens/css-json-tokens/) — Primitive, semantic, and component-token architecture
- [Touch Targets & Spacing](/code-design-tokens/touch-targets-spacing/) — Pointer-target requirements and motor-access guidance
- [Accessible Typography](/code-design-tokens/accessible-typography/) — Type, text-spacing resilience, and readable measure
- [Targets & Spacing](/ergonomics/targets-spacing/) — Ergonomic foundations for interactive target size and clearance
