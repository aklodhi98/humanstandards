# TODO

Backlog from the August 2026 content review. Each item is self-contained — file paths,
current state, and what "done" looks like — so it can be picked up cold.

---

## 1. Case studies cite primary evidence

**Priority: high. Status: completed 9 August 2026.**

The five previously unsourced examples now cite first-party product documentation, vendor
design-system guidance, support material, or product announcements inline. Unsupported
outcome figures were removed instead of being assigned unrelated citations; each page now
states its evidence boundary and gives a concrete measurement plan.

| Page | Unique primary-source links |
|------|----------------------------|
| `src/content/docs/examples/accessibility/accessibility-bbc-keyboard.mdx` | 9 |
| `src/content/docs/examples/cognitive-load/smart-defaults-ios-camera.mdx` | 7 |
| `src/content/docs/examples/defensive-design/defensive-design-gmail-undo.mdx` | 3 |
| `src/content/docs/examples/defensive-design/error-prevention-grammarly.mdx` | 6 |
| `src/content/docs/examples/feedback/feedback-stripe-dashboard.mdx` | 7 |

**Completed:** each case study cites primary evidence for its specific product claims. Claims
that the primary material does not support are labelled as design analysis or removed.

`src/content/docs/examples/how-to-document-examples.md` now requires inline primary sources,
explicit evidence boundaries, and prohibits unattributed outcome data. Summary pages no
longer repeat the removed figures as facts.

---

## 2. Five pages are far below the site's depth baseline

**Priority: medium. Status: completed 9 August 2026.**

The five pages now match the structure and depth of their stronger siblings:

| Page | Words | Unique external links |
|------|-------|-----------------------|
| `src/content/docs/ergonomics/anthropometrics.md` | 2,045 | 7 |
| `src/content/docs/ergonomics/posture-device-use.md` | 2,354 | 9 |
| `src/content/docs/perception/touch/fine-motor-sensitivity.md` | 2,255 | 10 |
| `src/content/docs/perception/hearing/noise-masking.md` | 2,153 | 13 |
| `src/content/docs/perception/hearing/frequency-ranges.md` | 2,336 | 10 |

**Completed:** each page now includes practical requirements, a worked example, a reproducible
measurement or testing table, a review checklist, and inline citations. The ergonomics and touch
pages are anchored in ISO 7250-1, ISO/TR 7250-2:2024, ISO 9241-400, ISO 9241-920:2024, and WCAG
2.2. The hearing pages use NIDCD, WHO, NIOSH, ITU-T, ISO 9921, IEC 60268-16, and WCAG guidance.
Generic environmental sound-level claims and unsupported age/hand-size cut-offs were replaced by
explicit measurement methods and evidence boundaries.

---

## 3. `references/academic-research.md` has aged

**Priority: medium.** File: `src/content/docs/references/academic-research.md`

Specific stale items:

- **Journal impact factors labelled "(2024)"** (line ~20). The 2025 JCR was released in
  mid-2026 — refresh the table and relabel.
- **CHI 2025 papers listed as "TBD"** and a "Best Paper 2024" callout. CHI 2025 (Yokohama)
  has concluded; CHI 2026 should be listed.
- **CSCW submission deadlines from May/August 2025** presented as upcoming.
- **"Recent Research Trends"** section still describes 2024–2025 framing.

**Done when:** the tables reflect the current cycle, and anything inherently perishable
(submission dates, "upcoming" conferences) is either removed or replaced with a link to the
canonical source that maintains it — e.g. https://sigchi.org/conferences/upcoming/ — rather
than a snapshot that will rot again.

---

## 4. Dependencies are two majors behind

**Priority: medium — but do it in its own PR.** Breaking changes; keep it out of content diffs.

| Package | Installed | Latest (Aug 2026) |
|---------|-----------|-------------------|
| `astro` | 5.16.5 | 7.1.6 |
| `@astrojs/starlight` | 0.37.1 | 0.41.7 |
| `sharp` | 0.34.5 | 0.35.3 |

`npm audit` reports 16 findings (11 high, 1 moderate, 4 low), all with fixes available —
they resolve via the major upgrades above rather than independently.

**Watch out for:** `astro.config.mjs` uses the Starlight `social` array format and a
`components.Footer` override (`src/components/overrides/Footer.astro`). Both are areas
Starlight has changed across minor versions — verify the footer credit and the GitHub
social icon still render after upgrading.

**Done when:** `npm run build` is clean, `npm audit` is clean, and the site is spot-checked
in a browser — sidebar, footer override, Pagefind search, and the `lastUpdated` stamps.

---

## 5. Remaining weak citations

**Priority: low, ongoing.**

The August 2026 pass replaced the worst offenders with primary sources, but marketing and
SEO blogs are still cited in places for factual claims. Search for these hosts and judge
case by case:

```
allaccessible.org  elementor.com  clay.global  broworks.net
testguild.com  accessibility.works  alekvs.com
```

**Rule of thumb:** for anything legal, regulatory, or statistical, cite the primary source —
`w3.org`, `ada.gov`, `hhs.gov`, `access-board.gov`, `etsi.org`, `iso.org`, `webaim.org`, or
Seyfarth's `adatitleiii.com` for US filing counts. A secondary explainer is fine as an
*additional* "further reading" link, never as the sole support for a number or a deadline.

---

## Maintenance notes

Two guards were added in August 2026 to slow future rot — keep them working:

- **`lastUpdated: true`** in `astro.config.mjs` stamps every page from git history. Do not
  reintroduce hand-maintained dates in headings; 43 of them had gone stale.
- **`site`** is set in `astro.config.mjs`. Without it the sitemap is silently skipped on
  every build — the warning is easy to miss in build output.

### Dates worth re-checking

Regulatory deadlines on `references/standards-guidelines.md` moved twice in 2026 already.
Re-verify against primary sources before each of these:

| What | When to check |
|------|---------------|
| EN 301 549 V4.1.1 cited in the EU Official Journal | expected ~Oct 2026 |
| ISO/IEC 40500:2026 (WCAG 2.2 Dec 2024 edition) | expected late 2026 |
| WebAIM Million (annual, published from February data) | Feb–Mar each year |
| Seyfarth ADA Title III filing counts for 2026 | ~Mar 2027 |
| ADA Title II deadline, population 50,000+ | 26 Apr 2027 |
| HHS Section 504 deadline, 15+ employees | 11 May 2027 |
| WCAG 3.0 Candidate Recommendation | anticipated ~Q4 2027 |
