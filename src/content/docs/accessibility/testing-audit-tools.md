---
title: Testing & Audit Tools
description: Combining automated testing, manual evaluation, and user testing for comprehensive accessibility coverage.
---

Automated tools catch about **30–50% of accessibility issues**—things like missing alt text, low contrast, and invalid ARIA. Recent machine learning enhancements have pushed automated detection to approximately **57%**, with projections suggesting **70% by late 2025**. But the rest requires human testing: navigating with a keyboard, listening with a screen reader, and understanding whether the experience actually makes sense.

No single tool or approach is sufficient. The W3C recommends a **hybrid approach** combining automated testing with manual evaluation. This gives you the speed of automated checks with the thoroughness of human judgment.

## The testing pyramid

### What automated tools catch

Automated testing excels at detecting:

- **Missing alternative text** on images
- **Insufficient color contrast** ratios
- **Invalid ARIA** attributes and roles
- **Missing form labels** and associations
- **Duplicate IDs** and structural issues
- **Empty links and buttons**
- **Missing language declarations**
- **Invalid heading hierarchy** (skipped levels)

### What only humans can evaluate

Manual testing is essential for:

- **Keyboard navigation** flow and logic
- **Screen reader experience** quality
- **Dynamic content** announcements
- **Focus management** after interactions
- **Reading order** versus visual order
- **Meaningful alternative text** (not just present, but useful)
- **Understandable content** and instructions
- **Error recovery** experience
- **Context and purpose** of interactive elements

### What only users can tell you

Testing with people with disabilities reveals:

- Real-world usability beyond conformance
- Unexpected interaction patterns
- Assistive technology compatibility issues
- Cognitive and comprehension challenges
- Fatigue and efficiency problems
- Workarounds users actually employ

## Automated testing tools

### axe DevTools

**Best for**: Deep accessibility analysis, CI/CD integration, developer workflows

[Axe DevTools](https://www.deque.com/axe/devtools/) is the industry standard with **85+ automated checks**. The underlying axe-core library powers many other tools including Lighthouse.

**Strengths**:
- Most comprehensive rule coverage
- Excellent CI/CD integration
- Clear issue explanations
- Guided manual testing (paid tier)
- High accuracy with low false positives

**Limitations**:
- Fix suggestions and dashboards require paid tier
- Still only catches automated-detectable issues

**How to use**:
- Browser extension for interactive testing
- CLI for build pipeline integration
- API for custom integrations

### Lighthouse

**Best for**: Quick audits, general web quality checks, development workflow

[Lighthouse](https://developer.chrome.com/docs/lighthouse/) is built into Chrome DevTools. Runs accessibility, performance, SEO, and best practices audits in one pass.

**Strengths**:
- No installation required (built into Chrome)
- Quick overview of site quality
- Good starting point for beginners
- Performance and SEO combined with accessibility

**Limitations**:
- Uses axe-core but runs a **subset of tests** (not the full 85+)
- Too limited for comprehensive accessibility analysis
- Think of it as a quick scan, not a deep audit

**How to use**:
- Chrome DevTools → Lighthouse tab
- CLI for automated builds
- PageSpeed Insights online

### WAVE

**Best for**: Visual feedback, content creator education, quick checks

[WAVE](https://wave.webaim.org/) provides visual icons directly on your page showing where issues occur.

**Strengths**:
- Excellent visual feedback
- Free with no login required
- Good for educating content teams
- Shows issues in context

**Limitations**:
- Overlay icons can be confusing with complex layouts
- Struggles with absolutely positioned elements
- Invisible elements are hard to locate
- Less suited for CI/CD integration

**How to use**:
- Browser extension (Firefox, Chrome)
- Online at wave.webaim.org
- API available for automation

### Pa11y

**Best for**: CI pipelines, automated regression testing, command-line workflows

[Pa11y](https://pa11y.org/) is a command-line tool designed for automation.

**Strengths**:
- Simple CLI interface
- Easy CI/CD integration
- Multiple runners (Puppeteer, Playwright)
- Dashboard option for tracking over time

**Limitations**:
- Less visual than browser tools
- Requires technical setup
- Same detection limits as all automated tools

### Comparison summary

| Tool | Best For | Checks | Free |
|------|----------|--------|------|
| axe DevTools | Deep analysis, CI/CD | 85+ | Core free |
| Lighthouse | Quick audits | Subset | Yes |
| WAVE | Visual education | Good | Yes |
| Pa11y | CI pipelines | axe/HTML_CS | Yes |

**Best practice**: Use **2-3 tools** together. Different tools catch different issues. Run both Lighthouse (quick scan) and axe DevTools (deep scan) for better coverage.

## Manual testing essentials

Automated tools are necessary but not sufficient. After automated testing, manual evaluation uncovers severe accessibility barriers that automation misses.

### Keyboard navigation testing

Put down your mouse and complete key tasks using only the keyboard. This **5-minute test** can reveal severe barriers.

**What to test**:

| Key | Expected Behavior | Check |
|-----|-------------------|-------|
| Tab | Move to next interactive element | Focus moves logically |
| Shift+Tab | Move to previous element | Can navigate backwards |
| Enter | Activate buttons and links | All controls work |
| Space | Activate buttons, toggle checkboxes | Controls respond correctly |
| Arrow keys | Navigate within components (menus, tabs) | Complex controls work |
| Escape | Close modals and popups | Can exit overlays |

**Common failures**:
- Focus not visible on some elements
- Focus order doesn't match visual layout
- Can't reach elements without a mouse
- Trapped in a component with no escape
- Modals don't trap focus appropriately
- Focus lost after dynamic updates

### Screen reader testing

Test with at least one screen reader—ideally the most common pairings from the [WebAIM survey](/accessibility/assistive-technologies/):

**Essential combinations**:
- **VoiceOver + Safari** (Mac/iOS): Cmd+F5 to start on Mac
- **NVDA + Firefox or Chrome** (Windows): Free download
- **TalkBack + Chrome** (Android): Built into Android

**What to listen for**:
- Interactive elements announced with clear names and roles
- State changes announced (expanded, selected, checked, disabled)
- Reading order is logical
- Dynamic content updates announced appropriately
- Form errors are announced and associated with fields
- Headings and landmarks help navigation

**Testing approach**:
1. Navigate through the page using heading shortcuts (H key)
2. Navigate through form fields (F key)
3. Tab through interactive elements
4. Complete key user tasks by listening only

### Zoom and magnification testing

Test with browser zoom and operating system magnification:

**Browser zoom**:
- Increase to **200%**, **400%**
- Check for horizontal scrolling (shouldn't be required)
- Verify content reflows appropriately
- Confirm nothing is cut off or overlapping

**System magnification**:
- Use Windows Magnifier, macOS Zoom
- Verify focus remains visible when magnified
- Check that tooltips and popups appear near their triggers

## WCAG conformance evaluation

### WCAG-EM methodology

The [Website Accessibility Conformance Evaluation Methodology (WCAG-EM)](https://www.w3.org/WAI/test-evaluate/conformance/wcag-em/) provides a structured approach:

**Step 1: Define scope**
- What pages/states are included?
- Which WCAG version and level (typically 2.2 AA)?
- What is the evaluation goal?

**Step 2: Explore the target website**
- Identify key pages and functionality
- Note technologies used
- Find representative samples

**Step 3: Select representative sample**
- Include home page and key entry points
- Cover all templates and page types
- Include critical user flows

**Step 4: Audit the selected sample**
- Evaluate each page against all success criteria
- Document issues with location and impact
- Rate severity of failures

**Step 5: Report findings**
- Summarize overall conformance level
- Detail failures by success criterion
- Provide remediation guidance

### Audit report structure

Organize findings by WCAG's four principles:

**POUR framework**:
- **Perceivable**: Can users perceive all content?
- **Operable**: Can users operate all controls?
- **Understandable**: Can users understand content and interface?
- **Robust**: Does it work with assistive technologies?

**For each issue, document**:
- Success criterion violated
- Location (page, component)
- Description of failure
- Impact on users
- Recommended fix
- Severity/priority

## Color and contrast tools

### Contrast checkers

- **[WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)**: Quick manual checks
- **[Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/)**: Desktop application with color picker
- **Browser DevTools**: Built-in contrast checking in Chrome, Firefox

### Design tool plugins

- **[Stark](https://www.getstark.co/)**: Figma, Sketch, Adobe XD plugin
- **[Use Contrast](https://usecontrast.com/)**: macOS menu bar app
- **[Polypane](https://polypane.app/)**: Browser with accessibility simulation

### Color blindness simulation

- **Chrome DevTools**: Rendering → Emulate vision deficiencies
- **Firefox DevTools**: Accessibility → Simulate
- **Stark**: Includes vision simulation
- **Polypane**: Multiple simulations side-by-side

## Integrating testing into workflow

### Development workflow

**During development**:
- Linting with eslint-plugin-jsx-a11y or similar
- Automated checks on save/build
- axe browser extension for quick checks

**Pull request checks**:
- Automated accessibility scans in CI
- Keyboard navigation verification
- Screen reader spot checks for changed components
- Require accessibility checklist completion

**Build pipeline**:
```
# Example: Fail build on critical issues
npm run test:a11y -- --tags wcag2a,wcag2aa --exit-on-error
```

### Issue tracking

- Track accessibility bugs alongside other issues
- Prioritize by user impact, not just conformance level
- Include WCAG criterion reference
- Document steps to reproduce with AT

### Testing cadence

| Frequency | Testing Type |
|-----------|--------------|
| Every commit | Automated linting |
| Every PR | Automated scans + keyboard check |
| Weekly | Manual spot checks |
| Quarterly | Comprehensive manual audit |
| Annually | External audit with user testing |

## User testing with people with disabilities

### Why user testing matters

Conformance testing tells you if you meet standards. User testing tells you if people can actually use your product.

**What you learn from users**:
- Real-world usability versus theoretical compliance
- Workarounds and pain points
- Preferences and expectations
- Compatibility with their specific AT setup

### Recruiting participants

- Partner with disability organizations
- Use specialized recruiting services
- Include people with diverse disabilities
- Pay participants fairly for their time

### Conducting sessions

- Let participants use their own devices and AT
- Give tasks, not instructions
- Observe without interrupting
- Ask about their typical experience
- Note workarounds and frustrations

## Recent Research (2024-2025)

### Automated Testing Coverage Improvements

According to [2024 accessibility testing research](https://www.audioeye.com/post/comprehensive-guide-to-wcag-testing/), recent machine learning enhancements to axe have increased automated test coverage to detect approximately **57% of accessibility issues by volume**, with projections suggesting nearly **70% by end of 2025**.

### Tool Comparison Research

[2024 tool comparisons](https://accessibility-test.org/blog/compare/eaa-compliance-tool-axe-vs-wave-vs-lighthouse-comparison/) confirm that while Lighthouse uses axe-core, it runs only a subset of the 70+ tests available in full axe DevTools. For comprehensive accessibility analysis, dedicated tools like axe DevTools are recommended over general-purpose tools like Lighthouse.

### EAA Compliance Deadline

Business owners across Europe face a **June 2025 deadline** for the European Accessibility Act. Organizations selling products or services in EU markets must meet strict accessibility standards, with [penalties reaching up to €500,000](https://testguild.com/accessibility-testing-tools-automation/) in some countries.

### Hybrid Testing Approach

The [W3C and industry research](https://www.prometsource.com/blog/web-accessibility-audit) continues to emphasize that a combination of automated tests and human expertise—the hybrid approach—is essential. Automated scanning alone cannot achieve full WCAG conformance.

### Testing Tools Evolution

[2025 accessibility testing guides](https://wallyax.com/blog/best-accessibility-testing-tools-wcag-ada-compliance) emphasize that the best tool is one you'll actually use. Integration into existing workflows is critical—automated testing in CI/CD, with manual testing checkpoints at key stages.

## Implementation checklist

### Testing infrastructure

- [ ] **Automated scanning**: axe or equivalent in CI pipeline
- [ ] **Keyboard testing**: Part of PR review process
- [ ] **Screen reader testing**: Minimum VoiceOver + NVDA
- [ ] **Color/contrast checks**: Tools available to designers
- [ ] **Issue tracking**: Accessibility bugs prioritized appropriately
- [ ] **Audit schedule**: Quarterly manual, annual comprehensive

### Per-release checks

- [ ] Automated scans pass
- [ ] Keyboard navigation verified for new/changed features
- [ ] Screen reader spot check completed
- [ ] Color contrast verified for new UI
- [ ] No new WCAG failures introduced

## References

**Automated Tools:**
- [axe DevTools](https://www.deque.com/axe/devtools/) — Deque
- [WAVE](https://wave.webaim.org/) — WebAIM
- [Pa11y](https://pa11y.org/)
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/)

**Testing Methodology:**
- [WCAG-EM Overview](https://www.w3.org/WAI/test-evaluate/conformance/wcag-em/) — W3C
- [WebAIM's WCAG 2 Checklist](https://webaim.org/standards/wcag/checklist)
- [Web Accessibility Evaluation Tools List](https://www.w3.org/WAI/test-evaluate/tools/list/) — W3C

**Recent Research:**
- [Comprehensive Guide to WCAG Testing 2024](https://www.audioeye.com/post/comprehensive-guide-to-wcag-testing/) — AudioEye
- [Top Accessibility Testing Tools 2025](https://testguild.com/accessibility-testing-tools-automation/) — TestGuild
- [axe vs WAVE vs Lighthouse Comparison](https://accessibility-test.org/blog/compare/eaa-compliance-tool-axe-vs-wave-vs-lighthouse-comparison/)

**Checklists:**
- [WCAG Checklist](https://www.digitala11y.com/wcag-checklist/) — DigitalA11Y
- [Accessible.org WCAG Checklist](https://accessible.org/wcag/)

---

## See Also

- [WCAG Guidelines](/accessibility/wcag-guidelines/) — Standards to test against
- [Assistive Technologies](/accessibility/assistive-technologies/) — AT to test with
- [ARIA & Keyboard Patterns](/code-design-tokens/aria-keyboard-patterns/) — Implementation to verify
- [Accessibility Checklist](/checklists-playbooks/accessibility-checklist/) — Quick reference
