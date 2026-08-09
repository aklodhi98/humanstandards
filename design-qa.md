# Design QA — acidic olive direction

Final result: passed

## Source of truth

- Selected acidic-olive direction: `/Users/ak/.codex/generated_images/019fe670-8e8f-7fd1-b44f-78b0d641a967/exec-871a7105-ad00-4587-ae0d-9b8f41c7ccc0.png`
- Figma selection card: `https://www.figma.com/design/uTGkyqRstcr4Un4xPyoqLA?node-id=8-13`
- Figma verification: `/Users/ak/.codex/visualizations/2026/08/09/019fe670-8e8f-7fd1-b44f-78b0d641a967/humanstandards-design-audit/figma-selected-acidic-olive.png`

## Captured implementation

- Viewport: 1280 × 720 CSS px, DPR 1
- Browser capture output: 1265 × 712 px
- State: homepage, light theme, menus closed, search closed
- Hero evidence: `/Users/ak/.codex/visualizations/2026/08/09/019fe670-8e8f-7fd1-b44f-78b0d641a967/humanstandards-design-audit/homepage-implementation-final-hero-clean.jpg`
- Library evidence: `/Users/ak/.codex/visualizations/2026/08/09/019fe670-8e8f-7fd1-b44f-78b0d641a967/humanstandards-design-audit/homepage-implementation-final-library.png`
- Hero comparison: `/Users/ak/.codex/visualizations/2026/08/09/019fe670-8e8f-7fd1-b44f-78b0d641a967/humanstandards-design-audit/qa-final-hero-source-left-implementation-right.jpg`
- Library comparison: `/Users/ak/.codex/visualizations/2026/08/09/019fe670-8e8f-7fd1-b44f-78b0d641a967/humanstandards-design-audit/qa-final-library-source-left-implementation-right.jpg`

The 1483 × 1061 source was normalized to the implementation capture width before comparison. Hero and library sections were also compared as focused crops so the selected direction and implementation could be judged at the same visible scale.

## Comparison history

1. Initial pass: hero sat too low, the contour field was too far right and faint, desktop cards had excessive side padding, and two card titles wrapped unnecessarily.
2. First correction: strengthened and repositioned the contour asset, reduced hero height, tightened the standards heading, and reduced card padding.
3. Second correction: aligned the hero to the source rhythm, moved the library start to 520 px, matched the 5.2vw content inset, and made the sticky header opaque so content never ghosts through it.
4. Final comparison: hierarchy, spacing, contour placement, library density, and acidic-olive identity are consistent with the selected direction. Minor type-rendering differences reflect the production font stack and are acceptable.

## Browser annotation follow-up — card top padding

- Source visual truth: Browser Comment 1 marker screenshot attached to the `Implementation` standards card at 1381 × 955 CSS px.
- Target selector: `.hs-library-card:nth-of-type(4)` in `HomeStandardsGrid.astro`.
- Updated implementation: `/Users/ak/.codex/visualizations/2026/08/09/019fe670-8e8f-7fd1-b44f-78b0d641a967/humanstandards-design-audit/annotation-card-top-padding-full.png`
- Focused comparison evidence: `/Users/ak/.codex/visualizations/2026/08/09/019fe670-8e8f-7fd1-b44f-78b0d641a967/humanstandards-design-audit/qa-annotation-card-padding-before-after.jpg`
- Verification viewport: 1381 × 955 CSS px at DPR 1.3; browser capture output 1370 × 947 px.
- State: homepage, light theme, menus closed, search closed, page at scroll position 0.
- Finding: the annotated desktop card row had no explicit top inset, leaving the icons visually tight to the cards' top edge. This was a P3 spacing refinement rather than a functional or accessibility defect.
- Fix: desktop cards now use a 12 px top inset (`padding: 0.75rem 1.25rem 0`). All five cards were updated consistently; no nearby layout, content, assets, or interactions changed.
- Post-fix evidence: the selected card measures 12 px from its box top to the icon container. Tablet cards retain 32 px top padding and mobile cards retain 28 px; neither alternate layout has horizontal overflow.
- Required fidelity surfaces: typography, colors, imagery, icons, and copy are unchanged; only the requested spacing rhythm changed.
- Browser console: no warnings or errors after reload and responsive checks.
- Residual findings: none at P0, P1, or P2. Focused region evidence was sufficient because the annotation affected a single repeated component and the full-view capture confirms the surrounding composition stayed stable.

## Accessibility and interaction checks

- Primary acidic olive `#687319` against white: 5.18:1.
- Primary acidic olive `#687319` against ivory `#F7F3EA`: 4.68:1.
- Dark-mode olive `#8F9E35` against `#171914`: 6.00:1.
- Dark-mode accent text `#BDC967` against `#171914`: 9.88:1.
- Skip link resolves to the real `#_top` heading target.
- Header, primary navigation, main, and footer landmarks are present.
- Standards dropdown opens; search dialog opens and closes; light/dark theme selection works.
- Primary CTA reaches `/human-overview/getting-started/` and renders `Getting Started with Human Standards`.
- No horizontal overflow at 1280 px.
- Reduced-motion rules are present; responsive card and header breakpoints are defined at 68rem, 50rem, 38rem, and 34rem.
- Browser interactions completed without runtime exceptions. The preview surface does not expose a persistent console log API; the dev server remained error-free throughout the interaction pass.

## Build verification

- `npm run check` passed.
- Astro built 67 pages.
- Pagefind indexed 66 pages and 12,440 words.
- Link checker validated 12,574 internal links and 106 machine-readable references with no broken targets or fragments.
- The only build warning is Astro/Vite's existing unused remote-pattern helper import warning.
