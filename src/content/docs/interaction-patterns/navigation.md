---
title: Navigation
description: Orient users with landmarks, IA, and strong focus/active states.
---

Navigation answers two fundamental questions: "Where am I?" and "Where can I go?" Good navigation makes these answers obvious at a glance. Poor navigation leaves users feeling lost, frustrated, or stuck.

## Information architecture

### Keep it shallow

Aim for no more than 3 levels of hierarchy. Deep nesting hides content and forces users through too many clicks. If you need deep structures, provide multiple entry points.

### Use clear labels

Navigation labels should be specific and descriptive. "Products" is better than "Solutions". "Pricing" is better than "Plans". Avoid jargon and marketing-speak.

### Make primary actions obvious

The most important destinations should be the most visible. Don't bury "Sign Up" or "Contact" in submenus.

## Orientation cues

### Show where they are

Highlight the current page in the navigation. Use breadcrumbs for deeper hierarchies. Keep the page title consistent with the nav label they clicked.

### Show where they came from

Preserve browser history. Make the back button work. For multi-step flows, provide a way to return to previous steps.

### Provide skip links

Let keyboard users skip repetitive navigation and jump to main content. Essential for screen reader users; helpful for everyone.

## Landmarks and structure

Use HTML5 semantic elements to define page regions:

- `<header>` — Site header and primary navigation
- `<nav>` — Navigation menus (can have multiple, use aria-label to distinguish)
- `<main>` — Primary content area
- `<aside>` — Sidebars and related content
- `<footer>` — Site footer

Screen readers can jump directly between landmarks, making large pages much easier to navigate.

## Focus and keyboard

### Visible focus styles

Never remove focus outlines without adding a clear replacement. Users navigating by keyboard need to see where they are.

### Logical focus order

Tab order should match visual order. Don't use positive `tabindex` values that jump focus around unpredictably.

### Preserve focus after actions

When content loads dynamically or dialogs close, return focus to a sensible location — usually where the user triggered the action.

## Mobile considerations

- Touch targets at least 44×44px
- Important actions reachable with one hand (bottom navigation)
- Consider hamburger menus carefully — they hide important options
- Provide a visible home link or logo tap

## Responsive patterns

- **Horizontal nav** → **Hamburger menu**: Common but hides options; use for secondary pages
- **Full menu visible**: Best for 5–7 main items that fit on all screens
- **Tab bar (mobile)**: iOS/Android pattern; keeps top destinations visible

## References

- WAI-ARIA — Landmark Roles: https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/
- GOV.UK — Navigation patterns: https://design-system.service.gov.uk/patterns/
- Nielsen Norman Group — Navigation Design: https://www.nngroup.com/articles/navigation-design/
