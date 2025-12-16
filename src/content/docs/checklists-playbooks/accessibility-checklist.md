---
title: Accessibility Checklist
description: A pragmatic checklist to help you meet WCAG 2.2 AA and build inclusive experiences.
---
## Structure

- Landmarks: header, nav, main, complementary, contentinfo.
- Headings: one h1 per page; hierarchical order.
- Lists, tables, and quotes use semantic elements.

## Keyboard

- All functionality available with keyboard only.
- Logical tab order; no keyboard traps.
- Skip link to main content; visible on focus.

## Forms

- Labels connected to inputs; errors announced via aria-live.
- Group related inputs (fieldset/legend); required indicated in text.
- Autocomplete, inputmode, type attributes set.

## Contrast & color

- Text contrast ≥ 4.5:1 (normal), 3:1 (large).
- Non-text UI components have 3:1 contrast.
- Don’t use color alone; provide patterns/icons/labels.

## Media

- Images have meaningful alt or empty alt if decorative.
- Video: captions; audio: transcripts; provide controls.
- Avoid autoplay; respect reduced motion and reduced data.

## Focus

- Visible focus indicator with 3:1 contrast.
- Restore focus after dynamic updates/modals.
- Don’t hijack scroll; use focus management.

## Components

- Dialogs have role=dialog/aria-modal; trap focus.
- Menus, tabs, comboboxes follow ARIA patterns.
- Announce status updates with aria-live polite/assertive.

## Testing

- Keyboard-only pass; screen reader smoke test.
- Automated checks: axe, Lighthouse; manual heuristics.
- Test on high-contrast and zoom (200%, 400%).
