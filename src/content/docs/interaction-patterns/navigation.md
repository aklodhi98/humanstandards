---
title: Navigation
description: Designing wayfinding systems that answer "Where am I?" and "Where can I go?"—through clear information architecture, accessible landmarks, and patterns that work for all users.
---

Navigation answers two fundamental questions: "Where am I?" and "Where can I go?" Good navigation makes these answers obvious at a glance. Poor navigation leaves users feeling lost, frustrated, or stuck. Navigation is the wayfinding system that makes or breaks someone's understanding of a digital product—it speaks to basic human needs like clarity and safety.

According to Nielsen Norman Group research, hidden navigation (like hamburger menus) provides a worse user experience than visible navigation across multiple UX metrics including task difficulty assessment, time spent on task, and task success. The choices you make about navigation patterns have measurable impact on how well users can accomplish their goals.

## Information architecture fundamentals

### The relationship between IA and navigation

Information architecture (IA) defines how content is organized and related. Navigation is how users move through that structure. Before you can create navigation, your IA needs to be defined—navigation is just the visible tip of the iceberg.

**IA research methods**:
- **Card sorting**: Discover how users naturally categorize content
- **Tree testing**: Test if users can find items in proposed structure
- **LATCH framework**: Organize by Location, Alphabet, Time, Category, or Hierarchy

**Key principle**: Group navigation items by how users think about their problems, not how your organization is structured internally.

### Keep hierarchies shallow

Aim for no more than **3 levels of hierarchy**. Deep nesting hides content and forces users through too many clicks.

**Why shallow works**:
- Reduces cognitive load
- Fewer clicks to reach content
- Easier to maintain mental model
- Better for mobile navigation

**When you need depth**:
- Provide multiple entry points (search, shortcuts, cross-links)
- Use mega menus to expose deeper content
- Consider hub pages that surface related content

### Use clear, scannable labels

Navigation labels should be specific, descriptive, and consistent with page titles.

**Label guidelines**:

| Instead of | Use |
|------------|-----|
| Solutions | Products |
| Resources | Documentation |
| Get Started | Sign Up |
| Learn More | View Pricing |

**Testing labels**:
- Can users predict what they'll find?
- Do labels match the content they link to?
- Are labels distinct from each other?
- Do they work out of context (for screen readers)?

### Make primary actions obvious

The most important destinations should be the most visible. Primary calls-to-action (CTAs) deserve visual prominence.

**Visibility hierarchy**:
1. Primary CTA (sign up, purchase) — most prominent
2. Main navigation — clearly visible
3. Secondary navigation — available but less prominent
4. Utility navigation (account, help) — accessible but subdued

## Orientation and wayfinding

### Show current location

Users need constant confirmation of where they are. Multiple cues reinforce location:

**Current page indicators**:
- Highlight active item in navigation
- Use distinct styling (color, weight, underline, background)
- Maintain indicator when scrolling
- Apply to all navigation levels

**Page identity**:
- Page title matches navigation label clicked
- URL reflects location in site structure
- Browser tab shows meaningful title

### Breadcrumb navigation

Breadcrumbs show the path from homepage to current page, essential for deep hierarchies:

**When to use breadcrumbs**:
- Sites with 3+ levels of hierarchy
- E-commerce with category structures
- Documentation and knowledge bases
- Content that can be reached via multiple paths

**Breadcrumb best practices**:
- Place at top of page, below global navigation
- Use ">" or "/" as separators (users recognize these)
- Make all items except current page clickable
- Style current page distinctly (different color or bold)
- Include home page as first item
- Keep labels concise but clear

**Accessibility**:
- Wrap in `<nav>` with `aria-label="Breadcrumb"`
- Use `<ol>` for the ordered list of links
- Mark current page with `aria-current="page"`

```html
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/products">Products</a></li>
    <li><a href="/products/software">Software</a></li>
    <li><a aria-current="page">Analytics Suite</a></li>
  </ol>
</nav>
```

### Preserve navigation history

Respect the browser's back button—it's one of the most-used navigation controls.

**History management**:
- Don't break back button functionality
- Avoid redirect loops
- For SPAs, update URL with history API
- For multi-step flows, provide explicit "Back" buttons

**Multi-step flow navigation**:
- Show progress indicator
- Allow return to previous steps
- Preserve entered data when going back
- Make it clear how to exit the flow

## Landmarks and semantic structure

### HTML5 landmark elements

Use semantic elements to define page regions. Screen readers can jump directly between landmarks, making large pages much easier to navigate.

**Core landmarks**:

| Element | Purpose | Notes |
|---------|---------|-------|
| `<header>` | Site/page header | Usually contains logo and primary nav |
| `<nav>` | Navigation menu | Can have multiple; label each |
| `<main>` | Primary content | Only one per page |
| `<aside>` | Related content | Sidebars, call-outs |
| `<footer>` | Site/page footer | Often contains secondary nav |
| `<section>` | Thematic grouping | Must have heading; label if multiple |
| `<article>` | Self-contained content | Blog posts, comments, cards |

**Labeling landmarks**:
- If multiple `<nav>` elements exist, each must have unique `aria-label`
- `<section>` and `<form>` always need labels
- Labels should describe purpose: "Primary navigation", "Related articles"

```html
<nav aria-label="Primary">
  <!-- main site navigation -->
</nav>

<nav aria-label="Table of contents">
  <!-- page-specific navigation -->
</nav>
```

### Content sectioning

Beyond landmarks, proper heading structure enables navigation:

**Heading hierarchy**:
- One `<h1>` per page (usually page title)
- Headings in logical order (h1 → h2 → h3)
- Don't skip levels
- Screen reader users navigate by heading

**Testing**: Use a screen reader to navigate by headings. Can you understand the page structure from headings alone?

## Skip links

Skip links let keyboard users bypass repetitive navigation and jump to main content. They're essential for screen reader users and helpful for all keyboard navigators.

### Why skip links matter

Without skip links, keyboard users must tab through every navigation item on every page. According to one study, a user needed to press Tab **350 times** to get past navigation to content. Skip links solve this.

**Who benefits**:
- Screen reader users
- Keyboard-only users
- Switch control users
- Users with motor impairments
- Power users who want efficiency

### Skip link implementation

**Placement**: First focusable element in `<body>`, before any navigation.

**Target**: Link to `<main>` or the main heading (`<h1>`).

```html
<body>
  <a href="#main" class="skip-link">Skip to main content</a>
  <header>
    <!-- navigation -->
  </header>
  <main id="main" tabindex="-1">
    <h1>Page Title</h1>
    <!-- content -->
  </main>
</body>
```

**Critical details**:
- Use `tabindex="-1"` on target to ensure focus moves
- Link text should describe destination: "Skip to main content"
- Link must be in tab order (don't use `tabindex="-1"` on the link itself)

### Skip link visibility

Skip links can be hidden until focused, revealing only to keyboard users:

```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px 16px;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

**Important**: Don't hide skip links with `display: none` or `visibility: hidden`—these remove them from tab order entirely.

### Current state

According to the WebAIM Million Report, only **17% of homepages** have skip links, and one in six of those are broken or inaccessible. Implementing proper skip links puts you ahead of most websites.

## Focus management

### Visible focus indicators

Every keyboard user needs to see where they are on a page. Never remove focus outlines without adding a clear replacement.

**WCAG 2.2 requirements**:
- Focus indicator must be visible
- At least **3:1 contrast** against adjacent colors (Focus Appearance Enhanced)
- Focus area should be at least as large as a 2px perimeter

**Focus indicator design**:
```css
/* Don't do this */
*:focus {
  outline: none;
}

/* Do this instead */
:focus-visible {
  outline: 3px solid #005fcc;
  outline-offset: 2px;
}
```

**Use `:focus-visible`**: This CSS pseudo-class shows focus only for keyboard navigation, not mouse clicks, giving keyboard users clear indicators without affecting mouse users.

### Logical focus order

Tab order should match visual order. Focus should move left-to-right, top-to-bottom in LTR languages.

**Common violations**:
- CSS that visually reorders content (flexbox `order`, grid placement)
- Positive `tabindex` values that jump focus around
- Modals that don't trap focus
- Dynamic content inserted above current focus

**Testing**: Tab through your page. Does focus move in the order you'd expect visually? Can you reach everything?

### Focus management for dynamic content

When content changes dynamically, focus must be managed programmatically:

**After navigation** (SPAs):
- Move focus to new page's `<h1>` or main content
- Announce page change to screen readers
- Client-side routing breaks focus by default—handle explicitly

**After modal/dialog opens**:
- Move focus into the dialog
- Trap focus within dialog (Tab cycles through dialog elements)
- Return focus to trigger element when dialog closes

**After content updates**:
- If user triggered update, move focus to new content or confirmation
- Use `aria-live` regions for automatic announcements
- Don't move focus unexpectedly

A **substantial transition** changes the person's page, step, task responsibility,
error-recovery target, or committed outcome. It needs a deliberate focus
destination that is perceivable in the viewport. A minor inline update should
normally preserve focus and use a status message instead. For selection groups,
multi-step flows, and dialogs, complete the [Keyboard Selection and Focus
Completion Contract](/code-design-tokens/aria-keyboard-patterns/#keyboard-selection-and-focus-completion-contract)
before handoff.

```javascript
// After SPA navigation
const mainContent = document.querySelector('main');
mainContent.setAttribute('tabindex', '-1');
mainContent.focus();
mainContent.removeAttribute('tabindex');
```

## Navigation patterns

### Horizontal navigation bar

The standard pattern for primary site navigation.

**Best for**:
- 5-7 main navigation items
- Sites where primary destinations should always be visible
- Desktop-first designs

**Considerations**:
- Items must fit on one line (or have clear overflow handling)
- Responsive behavior needed for mobile
- Dropdowns need keyboard accessibility

### Vertical/sidebar navigation

Common in dashboards, admin interfaces, and documentation.

**Benefits**:
- Can accommodate more items than horizontal
- Natural scanning (left-side attention bias)
- Can show hierarchy and expand/collapse
- Persistent visibility while scrolling

**Best for**:
- Content management systems
- Dashboards with many sections
- Documentation sites
- Applications with complex feature sets

### Mega menus

Large dropdown panels that show multiple categories and items.

**When to use**:
- Large catalogs with many categories
- When parent categories contain 8+ items
- When showing content previews aids discovery

**Mega menu guidelines**:
- Add images or icons to aid scanning
- Group related items with clear headings
- Include descriptions if category names aren't self-evident
- Ensure full keyboard accessibility
- Provide "view all" links for categories

**Research finding**: Well-designed mega menus improve discoverability and can increase conversion rates for large catalogs (Baymard Institute).

### Mobile navigation patterns

Mobile navigation requires different approaches due to screen constraints.

**Tab bar / Bottom navigation**:
- Persistent bar with 3-5 key destinations
- Visible at all times (doesn't hide content)
- Best for apps with clear top-level sections
- iOS and Android native pattern

**Hamburger menu**:
- Hides navigation behind icon
- Saves screen space
- Content is less discoverable (users less likely to explore)
- Use for secondary navigation or large menus

**Research findings** (NN/g 2024):
- Hidden navigation is less discoverable than visible navigation
- Users are less likely to use hidden navigation
- When they do use it, they find items later in their task
- Hamburger menus are more familiar than 10 years ago, but same UX tradeoffs apply

**Combined approaches** (recommended):
- Bottom tab bar for primary destinations
- Hamburger for comprehensive navigation
- Amazon pattern: bottom bar (Home, Orders, Cart, Profile, More) + hamburger for additional options

### Thumb zone considerations

For mobile, place primary navigation within thumb reach:

**One-handed phone use** (~67% of interactions):
- Bottom of screen is easiest to reach
- Top corners are hardest
- Primary actions should be in easy zone

**Design implication**: Consider bottom navigation for mobile apps. Hamburger menus at top-left corner are harder to reach on larger phones.

## Keyboard navigation

### Standard keyboard patterns

Users expect consistent keyboard behavior:

| Key | Expected Behavior |
|-----|-------------------|
| Tab | Move to next focusable element |
| Shift+Tab | Move to previous focusable element |
| Enter | Activate button or link |
| Space | Activate button, toggle checkbox |
| Arrow keys | Navigate within components (menus, tabs) |
| Escape | Close modal, dropdown, cancel action |
| Home/End | Jump to first/last item in list |

### Component-specific patterns

**Dropdown menus**:
- Enter/Space opens menu
- Arrow keys navigate items
- Escape closes menu, returns focus to trigger
- First letter jumps to matching item

**Tab panels**:
- Tab into tab list, then arrows between tabs
- Tab shows corresponding panel
- Panel content is next Tab stop

**See also**: [ARIA & Keyboard Patterns](/code-design-tokens/aria-keyboard-patterns/) for complete component patterns.

## Responsive navigation

### Progressive disclosure

Show primary items visibly; hide secondary items behind interaction.

**Strategies**:
- Horizontal nav → hamburger at breakpoint
- Full menu → priority+ pattern (show what fits, "More" for rest)
- Mega menu → accordion on mobile

### Mobile-specific patterns

**Overlapping menus** for deep navigation:
- Submenu replaces parent menu (slides in)
- Include "Back" link on all non-top-level panels
- Better than nested accordions for complex structures

**Accordion navigation**:
- Expand/collapse to show sub-items
- Good for moderate depth (2-3 levels)
- Keep expanded state visible

### Touch targets

All navigation elements must meet touch target requirements:

- **Minimum**: 44×44px (Apple HIG), 48×48dp (Material Design)
- **Spacing**: At least 8px between touch targets
- **Padding**: Increase tap area even if visual element is smaller

See [Targets & Spacing](/ergonomics/targets-spacing/) for detailed guidance.

## Recent Research

### Hidden Navigation UX Impact

[Nielsen Norman Group research (2024-2025)](https://www.nngroup.com/articles/hamburger-menus/) confirms that hidden navigation provides worse user experience than visible navigation across multiple UX metrics. While hamburger menus are more familiar today than 10 years ago, the fundamental tradeoffs remain: content is less discoverable and users are less likely to explore.

### Mobile Navigation Usability Study

A [2024 study published in MDPI Information](https://www.mdpi.com/2078-2489/15/11/732) investigated adding floating action buttons (FAB) and labeled bottom icons to popular apps like YouTube and IMDb. Qualitative research with 40 users found the FAB improved user experience over traditional top-corner placement, supporting the thumb-zone design principle.

### WCAG 2.2 Focus Appearance

WCAG 2.2's [Focus Appearance (Enhanced) criterion](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html) recommends focus indicators with at least 3:1 contrast against adjacent colors, addressing one of the most common accessibility failures—invisible or low-contrast focus states.

### Skip Link Prevalence

The [WebAIM Million Report](https://webaim.org/projects/million/) found only 17% of the top one million homepages have skip links, and one in six of those are broken. [2024 research on skip links](https://cerovac.com/a11y/2024/04/wcag-bypass-blocks-skip-to-content-improve-user-interaction-speed-and-even-prevent-pain/) emphasizes they remain essential for keyboard users even when landmarks are present.

### AI-Powered Information Architecture

[2025 IA trends analysis](https://slickplan.com/blog/information-architecture-trends) highlights AI capabilities for personalized navigation, including recommendation engines that adapt navigation based on user behavior, automated content categorization, and dynamic sitemap generation.

### WAI-ARIA 1.3 Updates

The [WAI-ARIA 1.3 specification](https://w3c.github.io/aria/) adds features to improve interoperability with assistive technologies, providing enhanced capabilities for creating accessible navigation patterns in modern web applications.

### Client-Side Routing Focus Management

[2025 accessibility development guides](https://medium.com/@thewcag/building-for-everyone-the-developers-guide-to-accessible-web-technologies-in-2025-f5b05c92b82b) emphasize that client-side routing breaks focus by default. After SPA navigation, developers must programmatically set focus to the new page's `<h1>` or main content to maintain accessibility.

## Implementation checklist

### Navigation audit

- [ ] **Information architecture**: Structure tested with card sorting/tree testing
- [ ] **Hierarchy depth**: No more than 3 levels without additional entry points
- [ ] **Labels**: Specific, descriptive, match page content
- [ ] **Current location**: Active state visible in navigation
- [ ] **Breadcrumbs**: Present for deep hierarchies (3+ levels)

### Accessibility requirements

- [ ] **Semantic landmarks**: `<header>`, `<nav>`, `<main>`, `<footer>` used correctly
- [ ] **Landmark labels**: Multiple same-type landmarks have unique labels
- [ ] **Skip link**: First focusable element, targets main content
- [ ] **Focus visible**: Clear focus indicator with 3:1 contrast
- [ ] **Focus order**: Matches visual order
- [ ] **Keyboard operable**: All navigation works with keyboard alone
- [ ] **Focus management**: Handled for dynamic content and SPAs

### Responsive requirements

- [ ] **Mobile pattern**: Appropriate pattern for content (tab bar, hamburger, hybrid)
- [ ] **Touch targets**: Minimum 44×44px with adequate spacing
- [ ] **Thumb zone**: Primary actions in easy reach for one-handed use
- [ ] **Consistent experience**: Navigation works across all breakpoints

## References

**Foundational Resources:**
- [WAI-ARIA Landmark Roles](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/) — W3C
- [WAI-ARIA Keyboard Interface](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/) — W3C
- [WebAIM: Skip Navigation Links](https://webaim.org/techniques/skipnav/)
- [WebAIM: Keyboard Accessibility](https://webaim.org/techniques/keyboard/)

**Research & Guidelines:**
- [Navigation Design](https://www.nngroup.com/topic/navigation/) — NN/g
- [Hamburger Menus and Hidden Navigation](https://www.nngroup.com/articles/hamburger-menus/) — NN/g
- [Mobile Navigation Patterns](https://www.nngroup.com/articles/mobile-navigation-patterns/) — NN/g
- [Breadcrumb Design Guidelines](https://www.nngroup.com/articles/breadcrumbs/) — NN/g

**Implementation:**
- [GOV.UK Design System — Navigation](https://design-system.service.gov.uk/patterns/)
- [ARIA Labels Implementation Guide 2025](https://www.allaccessible.org/blog/implementing-aria-labels-for-web-accessibility)
- [Navigation UX for SaaS](https://www.pencilandpaper.io/articles/ux-pattern-analysis-navigation) — Pencil & Paper

**2024-2025 Research:**
- [Mobile Navigation Usability Study](https://www.mdpi.com/2078-2489/15/11/732) — MDPI (2024)
- [Information Architecture Trends 2025](https://slickplan.com/blog/information-architecture-trends) — Slickplan
- [Skip to Content Importance](https://cerovac.com/a11y/2024/04/wcag-bypass-blocks-skip-to-content-improve-user-interaction-speed-and-even-prevent-pain/) — Bogdan A11y (2024)

---

## See Also

- [ARIA & Keyboard Patterns](/code-design-tokens/aria-keyboard-patterns/) — Component keyboard patterns
- [Targets & Spacing](/ergonomics/targets-spacing/) — Touch target sizing
- [Search & Discovery](/interaction-patterns/search-discovery/) — Finding content
- [Cognitive Load](/cognition/cognitive-load/) — Reducing navigation complexity
- [Assistive Technologies](/accessibility/assistive-technologies/) — Screen reader navigation
