# Integration Plan: Luxor Content into Human Standards

## Legal Status

✅ **Luxor is MIT Licensed** - We can legally integrate content with proper attribution.

**MIT License Requirements:**
1. Include original copyright notice
2. Include full MIT license text
3. Attribute original authors

## Recommended Integration Approach

### Strategy: Selective Integration with Attribution

**Principle:** Don't copy-paste everything. Selectively integrate valuable patterns that enhance Human Standards, with clear attribution.

---

## What to Integrate

### 1. UX Principles Examples (High Value)

**From Luxor:** 15 detailed real-world examples with metrics
- Progressive Disclosure - TurboTax
- Contextual Help - Slack
- Undo Culture - Gmail
- Smart Defaults - iOS Camera
- Feedback - Stripe
- Constraints - Airbnb
- Recognition - Spotify
- Consistency - Apple HIG
- Error Prevention - Grammarly
- Minimalism - Dropbox
- Accessibility - BBC
- Affordances - Material Design
- User Control - YouTube
- Mental Models - Figma
- Gamification - Duolingo

**How to Integrate:**
- Create `/src/content/docs/examples/` directory
- Adapt each example to Human Standards context
- Add references to our existing docs
- Include MCP validation context

**Attribution:**
```markdown
---
title: Progressive Disclosure - TurboTax
description: How TurboTax reduces cognitive load through progressive disclosure
source: Adapted from Luxor UX Principles skill by Manu Tej + Claude Code
source_url: https://github.com/manutej/luxor-claude-marketplace
license: MIT
---

<!-- Example content here -->

---

**Source Attribution:**
This example is adapted from the [Luxor UX Principles skill](https://github.com/manutej/luxor-claude-marketplace/tree/main/ux-principles) by Manu Tej + Claude Code, licensed under MIT.

**How This Relates to Human Standards:**
- Cognitive Load: [/cognition/cognitive-load.md](/cognition/cognitive-load/)
- Forms: [/interaction-patterns/forms.md](/interaction-patterns/forms/)
- Progressive Disclosure Pattern: Component pattern in MCP server
```

### 2. Performance Benchmark Philosophy (Medium Value)

**From Luxor:** "Performance-First Development" philosophy
- Define targets BEFORE implementation
- Measure EVERYTHING that matters
- Use statistical analysis, not single runs
- Test at realistic scale
- Validate against targets automatically

**How to Integrate:**
- Adapt to "Human Factors First" philosophy
- Apply same rigor to UX metrics
- Create our own benchmarks document

**Attribution:**
```markdown
---
title: Human Factors First Philosophy
description: Performance-first philosophy adapted for human factors
inspired_by: Luxor Performance Benchmark Specialist
---

## Human Factors First

> Inspired by the "Performance-First Development" philosophy from the
> [Luxor Performance Benchmark Specialist skill](https://github.com/manutej/luxor-claude-marketplace/tree/main/performance-benchmark-specialist)
> by Manu Tej + Claude Code (MIT License).

Performance engineers define targets before coding. UX should work the same way.

[Our adaptation here...]
```

### 3. Nielsen's 10 Usability Heuristics (Low Value - Already Public Domain)

**From Luxor:** Detailed explanations of Nielsen's heuristics

**How to Integrate:**
- **Don't copy Luxor's explanations** (Nielsen's work is already widely documented)
- Instead: Link to Nielsen Norman Group as primary source
- Add our own spin: How each heuristic relates to AI code generation
- Reference from our MCP server validation rules

**Attribution:**
```markdown
## Usability Heuristics

Human Standards validation rules are based on established usability principles:

- **Nielsen's 10 Usability Heuristics** - [Nielsen Norman Group](https://www.nngroup.com/articles/ten-usability-heuristics/)
- **WCAG 2.2 Guidelines** - [W3C](https://www.w3.org/WAI/WCAG22/quickref/)
- **iOS Human Interface Guidelines** - [Apple](https://developer.apple.com/design/human-interface-guidelines/)
- **Material Design** - [Google](https://m3.material.io/)

For practical examples of these principles, see also the [Luxor UX Principles skill](https://github.com/manutej/luxor-claude-marketplace/tree/main/ux-principles) by Manu Tej + Claude Code.
```

### 4. "When to Use" Format (High Value)

**From Luxor:** Clear structure for use cases and anti-use-cases

**How to Integrate:**
- Use the same structure (not the same content)
- Write our own use cases specific to Human Standards
- This is about presentation format, not content copying

**Attribution:**
```markdown
<!-- Not needed - this is just a documentation pattern, not copyrightable content -->
<!-- But we can acknowledge inspiration in comments -->
<!-- Structure inspired by Luxor skills documentation -->
```

---

## What NOT to Integrate

### 1. WCAG Guidelines Explanations
- **Why:** WCAG is W3C standard, should reference official source
- **Instead:** Link to W3C, provide our own application guidance

### 2. Performance Benchmarking Code
- **Why:** Shell-specific, not relevant to our use case
- **Instead:** Create our own human factors benchmarks

### 3. Generic UX Theory
- **Why:** Available from many sources (Nielsen, books, courses)
- **Instead:** Focus on application to AI code generation

---

## Implementation Plan

### Phase 1: Attribution Setup
**Create:** `/THIRD_PARTY_LICENSES.md`

```markdown
# Third-Party Licenses

## Luxor Claude Marketplace Skills

Portions of Human Standards documentation are adapted from the Luxor Claude Marketplace project:
- **Project:** Luxor Claude Marketplace
- **Authors:** Manu Tej + Claude Code
- **Source:** https://github.com/manutej/luxor-claude-marketplace
- **License:** MIT
- **Files Used:**
  - `ux-principles/EXAMPLES.md` - Real-world UX examples
  - `performance-benchmark-specialist/SKILL.md` - Performance-first philosophy

### MIT License Text

```
MIT License

Copyright (c) 2025 Manu Tej

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Human Standards Original Content

All other content in this repository is original work licensed under:
- **Documentation:** CC BY-NC-SA 4.0
- **Code:** MIT

See [LICENSE.md](LICENSE.md) for details.
```

### Phase 2: Integrate Examples (Week 1)

**Create directory:** `/src/content/docs/examples/`

**For each of 15 examples:**
1. Create markdown file with frontmatter attribution
2. Adapt content to Human Standards context
3. Add cross-references to our docs
4. Link to MCP validation rules
5. Add footer attribution

**Template:**
```markdown
---
title: [Example Name] - [Company]
description: [One-line description]
source: Adapted from Luxor UX Principles skill
source_url: https://github.com/manutej/luxor-claude-marketplace
license: MIT
original_authors: Manu Tej + Claude Code
adapted_by: Adnan Khan
adapted_date: 2026-01-08
categories: [cognitive-load, forms, etc.]
---

## Overview
[Adapted example content]

## Human Standards Connection

**Related Documentation:**
- [Link to our cognition docs]
- [Link to our forms docs]

**MCP Validation Rules:**
- `cognitive-form-length` - Checks field count
- `forms-validation-timing` - Validates on blur
- `defensive-autosave` - Requires autosave

**How to Apply This Pattern:**
```typescript
// MCP query example
const guidance = await mcp.callTool('get_component_guidance', {
  component: 'form',
  context: { fields: 8 }
});
// Returns progressive disclosure recommendation
```

---

**Attribution:**
This example is adapted from the [Luxor UX Principles skill](https://github.com/manutej/luxor-claude-marketplace/tree/main/ux-principles) by Manu Tej + Claude Code, licensed under MIT. See [THIRD_PARTY_LICENSES.md](/THIRD_PARTY_LICENSES.md) for full license text.
```

### Phase 3: Philosophy Page (Week 1)

**Create:** `/src/content/docs/philosophy.mdx`

**Content:**
- Adapt "Performance-First" to "Human Factors First"
- Same principles, different domain
- Clear attribution to Luxor's inspiration

### Phase 4: Update README (Week 1)

Add acknowledgments section:

```markdown
## Acknowledgments

Human Standards builds upon and is inspired by excellent prior work:

### Third-Party Content
- **Luxor Claude Marketplace** by Manu Tej + Claude Code - Real-world UX examples adapted with permission under MIT license. See [THIRD_PARTY_LICENSES.md](THIRD_PARTY_LICENSES.md).

### Standards and Guidelines
- **WCAG 2.2** - W3C Web Content Accessibility Guidelines
- **Nielsen's Usability Heuristics** - Nielsen Norman Group
- **iOS Human Interface Guidelines** - Apple Inc.
- **Material Design** - Google LLC

### Research Sources
- Cognitive psychology research (see [/references/academic-research.md](/references/academic-research.md))
- Human factors engineering principles
- Accessibility research and advocacy

Thank you to all who advance human-centered design. 🙏
```

---

## Attribution Guidelines

### When to Attribute

**Always attribute when:**
- ✅ Copying substantial portions of text (>1 paragraph)
- ✅ Adapting examples with specific details (companies, metrics)
- ✅ Using unique organizational structure
- ✅ Borrowing specific phrasing or terminology

**No attribution needed for:**
- ❌ Common knowledge (e.g., "cognitive load is mental effort")
- ❌ Public domain standards (WCAG, Nielsen's heuristics concepts)
- ❌ General documentation patterns (headers, lists)
- ❌ Our own original analysis and application

### How to Attribute

**In frontmatter:**
```yaml
---
source: Adapted from Luxor UX Principles skill
source_url: https://github.com/manutej/luxor-claude-marketplace
license: MIT
original_authors: Manu Tej + Claude Code
---
```

**In footer:**
```markdown
---

**Source Attribution:**
This content is adapted from [source] by [authors], licensed under [license].
See [THIRD_PARTY_LICENSES.md] for full license text.
```

**In comments (for structure inspiration):**
```html
<!-- Documentation structure inspired by Luxor Claude Marketplace skills -->
```

---

## Ethical Best Practices

### 1. Transform, Don't Transcribe
- ✅ Adapt examples to our MCP context
- ✅ Add our own analysis and connections
- ✅ Integrate with our validation rules
- ❌ Don't copy-paste without adding value

### 2. Give Credit Generously
- ✅ More attribution is better than less
- ✅ Link back to original project
- ✅ Acknowledge inspiration even when not required
- ✅ Promote the original work

### 3. Contribute Back (Optional but Nice)
- Consider contributing improvements back to Luxor
- Share our adaptations with Luxor maintainers
- Cross-promote projects
- Foster open-source collaboration

### 4. Be Transparent
- Make attribution visible to users
- Don't hide sources in obscure files
- Include license info in docs themselves
- Update THIRD_PARTY_LICENSES.md as we integrate

---

## License Compatibility

**Luxor License:** MIT (permissive)
**Human Standards License:** CC BY-NC-SA 4.0 (content) + MIT (code)

**Compatibility Analysis:**
- ✅ MIT → MIT (code): Compatible
- ✅ MIT → CC BY-NC-SA (docs): Compatible (MIT more permissive)
- ⚠️ Must keep MIT attribution in integrated content
- ✅ Can apply CC BY-NC-SA to our adaptations

**Result:** Fully compatible. Integrated content remains MIT-attributed within our CC BY-NC-SA docs.

---

## Files to Create

### Immediate (This Week)
1. `/THIRD_PARTY_LICENSES.md` - License attributions
2. `/src/content/docs/examples/` - Directory for examples
3. `/src/content/docs/examples/progressive-disclosure-turbotax.mdx` - First example
4. `/src/content/docs/philosophy.mdx` - Human Factors First philosophy
5. Update `/README.md` - Add acknowledgments section

### Next Week
6. Complete all 15 example adaptations
7. Create benchmarks document
8. Update MCP validation to reference benchmarks
9. Add "When to Use" page

---

## Success Criteria

**Legal Compliance:**
- ✅ All MIT license requirements met
- ✅ Copyright notices included
- ✅ License text accessible
- ✅ Authors attributed

**Ethical Standards:**
- ✅ Generous attribution
- ✅ Visible acknowledgment
- ✅ Transformation adds value
- ✅ Original work promoted

**User Value:**
- ✅ Examples enhanced with MCP context
- ✅ Clear connections to our docs
- ✅ Actionable for AI code generation
- ✅ Better than original for our use case

---

## Next Steps

1. **Review this plan** - Does this approach feel right?
2. **Create THIRD_PARTY_LICENSES.md** - Legal compliance first
3. **Start with 1 example** - Test the attribution template
4. **Get feedback** - Share with community if possible
5. **Scale up** - Complete remaining examples
6. **Consider reaching out to Manu Tej** - Let them know we're integrating their excellent work

---

**Recommendation:** Yes, integrate Luxor content, but do it thoughtfully with:
1. ✅ Full legal compliance (MIT requirements)
2. ✅ Generous ethical attribution
3. ✅ Value-add transformation (not copy-paste)
4. ✅ Transparent acknowledgment

This makes Human Standards better while respecting and promoting Luxor's excellent work. 🤝
