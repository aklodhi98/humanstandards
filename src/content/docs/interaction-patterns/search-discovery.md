---
title: Search & Discovery
description: Designing effective search experiences with autocomplete, faceted navigation, and robust zero-results handling.
---

Search is often the primary way users find what they need. When search works well, users accomplish their goals quickly. When it fails, they leave frustrated—or worse, assume the content they're looking for doesn't exist. In 2025, search isn't just a filter—it's a discovery engine, a conversion booster, and a personalization tool.

Understanding how people actually search—their imperfect queries, their scanning behaviors, their frustration thresholds—helps you design search experiences that serve real human behavior rather than ideal scenarios.

## How users actually search

### Search behavior patterns

Users don't search the way designers expect:

**Query characteristics**:
- Queries are often short (1-3 words)
- **Over 30% of searches include typos**
- Users don't know the "right" terminology
- Queries are vague and exploratory
- Users try multiple variations when results disappoint

**Scanning behavior**:
- Users scan results quickly, not thoroughly
- First few results receive most attention
- Relevance judgment happens in milliseconds
- Users often click the first reasonable-looking result

**Search refinement**:
- Users refine searches when results don't match expectations
- High refinement rates indicate search quality problems
- Some users give up rather than refine
- Refinement patterns reveal user intent

### Mental models of search

Users bring expectations from major search engines:

**What users expect**:
- Typo tolerance (Google handles misspellings)
- Synonyms and related terms
- Instant suggestions as they type
- Relevance-ranked results
- Ability to filter/narrow results

**What disappoints users**:
- Exact-match-only search
- No results for minor typos
- Generic results for specific queries
- No way to narrow large result sets
- Slow search performance

## Autocomplete and suggestions

### Why autocomplete matters

Autocomplete isn't a luxury—it's expected. **65% of users are more likely to use search that offers autocomplete** (Google research).

**Benefits of autocomplete**:
- Reduces typing effort
- Corrects spelling before submission
- Guides users toward findable content
- Reveals system capabilities
- Surfaces popular queries

### Optimal suggestion count

**5-8 suggestions** is the ideal range:
- Enough to be helpful
- Not overwhelming to scan
- Fits typical viewport without scrolling
- Accommodates variety without decision paralysis

**Avoid**:
- Too few suggestions (misses opportunity to help)
- Too many suggestions (overwhelming, requires scrolling)
- Inline scroll areas in autocomplete (causes interaction problems)

### When to show suggestions

Timing matters for autocomplete effectiveness:

**The problem**: Some users always look at the keyboard while typing. If you display suggestions only after they finish typing, they may never notice the feature.

**Best practice**: Show suggestions after **1-2 characters**, but design the interface so users who look up mid-typing will discover the feature.

**Visual prominence**: Make it obvious that autocomplete exists. Consider showing a prompt like "Start typing to see suggestions" before the first character.

### Keyboard navigation

**A good autocomplete always supports keyboard navigation**:
- **Up/Down arrows**: Navigate through suggestions
- **Enter**: Submit selected suggestion
- **Escape**: Close suggestions without selecting
- **Tab**: Can accept top suggestion (optional)

**Visual requirements**:
- Selected suggestion must be clearly highlighted
- Highlight must follow keyboard focus
- Screen readers must announce selected suggestion (ARIA)

### Enhanced autocomplete patterns

Go beyond simple keyword suggestions:

**Tap-ahead suggestions (chips)**:
- Display refinement chips below suggestions
- Allow users to build queries incrementally
- Similar to Google's search suggestions
- Reduces cognitive load

**Category suggestions**:
- Show relevant categories alongside keywords
- Help users narrow scope quickly
- Example: "shoes" suggests "Women's Shoes," "Running Shoes"

**Product/content suggestions**:
- Show actual items with thumbnails
- Include availability, pricing, ratings
- Reduces steps to conversion
- Best for e-commerce

**Query completion vs. query prediction**:
- Completion: Finish what user started typing
- Prediction: Suggest what user might mean
- Both are valuable; don't conflate them

### Avoiding autocomplete pitfalls

**Don't scroll**: At IKEA, all query suggestions are visible without scrolling. Scrollbars in autocomplete cause interaction problems—let the dropdown expand naturally.

**Don't hide behind typing**: Users who type while looking at keyboard may miss suggestions. Provide secondary discovery mechanisms.

**Don't show irrelevant suggestions**: Suggestions should be contextually relevant, not just alphabetically matched.

**Don't forget mobile**: Touch interactions differ from keyboard. Suggestions need larger tap targets on mobile.

## Search results design

### Result presentation

**Essential result elements**:
- **Title**: Clear, scannable headline
- **Snippet/description**: Context showing why result matches
- **Match highlighting**: Bolded query terms in results
- **Metadata**: Category, date, rating, price as relevant
- **Thumbnail**: Visual preview where appropriate

**Relevance signals**:
- Order results by relevance, not alphabetically
- Explain ranking when possible
- Show match quality indicators
- Surface related content

### Match highlighting

**Highlight query terms in results**:
- Helps users confirm relevance quickly
- Shows where matches occur in content
- Guides eye to relevant portions
- Reduces need to read full snippets

**Implementation**:
- Bold or color-highlight matched terms
- Show snippet context around matches
- Handle partial matches appropriately
- Consider stemming (search → searched, searching)

### Result counts and pagination

**Show result counts**:
- "127 results for 'wireless headphones'"
- Helps users gauge scope
- Informs whether to refine or browse

**Pagination approaches**:
- Traditional pagination: Clear, accessible, works everywhere
- Load more: Good for browsing, less cognitive load
- Infinite scroll: Use cautiously—accessibility concerns, footer issues

### Sorting options

Common sort options users expect:
- **Relevance**: Default for keyword searches
- **Date**: Newest/oldest first
- **Price**: Low-to-high, high-to-low
- **Rating/popularity**: Best-rated, most popular
- **Alphabetical**: For directory-style browsing

**Best practice**: Remember user's sort preference per session. Don't reset to default after every action.

## Faceted navigation and filters

### Why facets matter

Facets let users narrow large result sets without knowing exact query terms.

**User benefits**:
- Navigate without memorizing terminology
- Discover what's available
- Progressively narrow scope
- Understand product/content landscape

### Facet design best practices

**Show counts**:
- Display number of results per facet value
- Example: "Running (47)" not just "Running"
- Helps users predict result impact
- Hide or disable facets with zero results

**Order thoughtfully**:
- Most common values first (by count)
- Or logical order (size: S, M, L, XL)
- Or alphabetical for long lists
- Consider user expectations per facet type

**Multi-select vs. single-select**:
- Multi-select: User wants any of these (OR)
- Single-select: User wants exactly this (filter)
- Be clear about behavior
- Consider both within same interface

**Progressive disclosure**:
- Show most-used facets by default
- Collapse or truncate less common ones
- "Show more" for long facet lists
- Don't overwhelm with all options at once

### Applied filters visibility

**Show active filters clearly**:
- List all applied filters
- Make each filter removable individually
- Provide "Clear all" option
- Update result count as filters change

**Prevent dead ends**:
- Hide or disable combinations that yield zero results
- Warn before applying filter that narrows too much
- Offer to relax filters when results are few

### Mobile filter considerations

**Drawer pattern**:
- Filters in slide-out drawer
- Keeps search results visible
- Apply/clear buttons at bottom
- Works well for many filters

**Chips pattern**:
- Horizontal scrolling filter chips
- Quick access to common filters
- Good for few, simple filters
- Combines with drawer for complex filtering

## Zero-results handling

### The problem with dead ends

"No results" shouldn't mean no options, yet **50% of sites offer few paths forward** from zero-result pages.

**User impact**:
- Users often encounter zero results when content exists but doesn't match their query
- Dead-end pages cause frustration and abandonment
- Users may assume content doesn't exist when it does
- Lost sales and engagement

### Five strategies for zero-results pages

**1. Explain clearly and politely**:
- "We couldn't find anything matching 'wireles headphnes'"
- Don't blame the user
- Explain why (no matches vs. typo)
- Suggest corrective actions

**2. Offer spelling corrections**:
- "Did you mean 'wireless headphones'?"
- Maintain bank of common misspellings
- Auto-correct obvious typos
- Show original query for transparency

**3. Relax filters automatically**:
- "No exact matches. Here are related results..."
- Search individual keywords when phrase fails
- Broaden category scope
- Show partial matches with explanation

**4. Suggest alternatives**:
- Related categories: "Try browsing 'Audio' or 'Electronics'"
- Popular searches: "Others searched for..."
- Similar products/content
- Different search terms

**5. Personalized recommendations**:
- Based on browsing history
- Based on similar users
- "You might also like..."
- Keep users engaged even when search fails

### Zero-results page elements

**Essential elements**:
- Clear message that no results were found
- The original query displayed
- Visible search box for retry
- Spelling suggestions if applicable
- Alternative paths forward

**Optional enhancements**:
- Friendly/empathetic tone
- Help text for better searching
- Contact support option
- Popular or featured content
- Humor (when appropriate for brand)

### Humanized messaging

**Don't make users feel stupid**:
- ❌ "Your search returned 0 results"
- ✅ "We couldn't find anything for 'xyz' – let's try something else"

**Show you care**:
- Empathetic language reduces frustration
- Acknowledge the situation
- Offer concrete help
- Disney uses humor to ease dead-end disappointment

## Search accessibility

### ARIA patterns for search

**Combobox pattern** (for autocomplete):
```html
<div role="combobox" aria-expanded="true" aria-haspopup="listbox">
  <input type="text" aria-autocomplete="list" aria-controls="suggestions">
</div>
<ul id="suggestions" role="listbox">
  <li role="option" aria-selected="false">Suggestion 1</li>
  <li role="option" aria-selected="true">Suggestion 2</li>
</ul>
```

**Key requirements**:
- `role="combobox"` on container
- `aria-expanded` indicates dropdown state
- `aria-autocomplete` signals suggestion behavior
- `role="listbox"` and `role="option"` for suggestions
- `aria-selected` for current selection
- Live region announcements for dynamic updates

### Keyboard navigation requirements

**Full keyboard operability**:
- Focus visible on all interactive elements
- Tab order logical and complete
- Arrow keys work in suggestion lists
- Enter/Escape have predictable behaviors
- No keyboard traps

### Screen reader considerations

**Announce dynamically**:
- Number of suggestions available
- Currently selected suggestion
- Search results count
- Filter application results

**Example announcements**:
- "5 suggestions available"
- "Wireless headphones, 1 of 5"
- "127 results found"
- "Filtered to Electronics: 34 results"

## Voice search integration

### The rise of voice search

Voice search is becoming standard: **by 2024, over 50% of online searches were predicted to be voice-based**.

**Design considerations**:
- Natural language query handling
- Longer, conversational queries
- Intent recognition over keyword matching
- Error tolerance for speech recognition mistakes

### Supporting voice queries

**Microphone input**:
- Visible microphone icon in search box
- Clear activation state
- Real-time transcription display
- Easy cancellation

**Query processing**:
- Handle natural language ("show me red shoes under fifty dollars")
- Extract intent and parameters
- Confirm interpretation with user
- Graceful fallback to text results

## Search analytics and improvement

### Key metrics to track

**Query metrics**:
- **Search volume**: How often users search
- **Unique queries**: Variety of search terms
- **Query length**: Average words per query
- **Null result rate**: Searches with zero results

**Behavior metrics**:
- **Refinement rate**: Users who retry/modify queries
- **Click-through rate**: Clicks on results
- **Time to first click**: Speed of finding relevant result
- **Search exit rate**: Users who leave after searching

**Conversion metrics**:
- Searches leading to desired actions
- Revenue/value per search
- Search vs. browse conversion comparison

### Using analytics for improvement

**High refinement rate**:
- Indicates poor initial results
- Suggests need for better matching/ranking
- May indicate autocomplete gaps

**High null result rate**:
- Content gaps or vocabulary mismatch
- Need better synonyms/typo handling
- Consider content additions

**Popular queries**:
- Ensure top queries have excellent results
- Prioritize content/product additions
- Use for autocomplete suggestions

## Recent Research

### Search UX Evolution

According to [Design Monks' 2025 guide](https://www.designmonks.co/blog/search-ux-best-practices), search boxes have evolved from simple filters to product discovery engines and personalization goldmines. The 2023-2025 period saw generative AI integration where intent matters more than exact input—search now guesses what users want before they finish typing.

### Autocomplete Best Practices

[Baymard Institute research](https://baymard.com/blog/autocomplete-design) found that only 19% of sites implement all 9 essential autocomplete UX design patterns correctly. Key findings include avoiding inline scroll areas, showing 5-8 suggestions, and supporting full keyboard navigation.

### AI-Enhanced Search

[Gartner reports](https://blueniaga.com/essential-search-ux-best-practices-to-implement-in-2025/) that by 2025, 75% of organizations will use AI-based solutions to enhance customer experiences, including search. Reinforcement learning helps adapt search to changing trends and user behaviors.

### Zero-Results Page Impact

[Baymard's research on no-results pages](https://baymard.com/blog/no-results-page) found that 50% of sites offer few paths forward from zero-result pages, creating unnecessary dead ends. Their 5 proven strategies include offering alternatives, relaxing filters, and providing personalized recommendations.

### Error Tolerance Requirements

Research indicates that **over 30% of searches include typos**, demonstrating the critical need for error-tolerant search systems. Sites without typo handling lose users who could otherwise find what they need.

### Voice Search Growth

Multiple studies confirm that voice search exceeded 50% of online searches by 2024, making voice input support increasingly essential for comprehensive search UX.

### Search Box Conversion

[Medium research on search box anatomy](https://medium.com/design-bootcamp/the-anatomy-of-a-perfect-search-box-ux-patterns-that-convert-in-2025-6d78cacada52) emphasizes that search is a high-intent interaction—users who search are actively looking to accomplish something. Optimizing search directly impacts conversion rates.

## Implementation checklist

### Search feature audit

- [ ] **Autocomplete**: 5-8 suggestions, keyboard navigable, screen reader accessible
- [ ] **Typo tolerance**: Common misspellings handled, "did you mean" suggestions
- [ ] **Match highlighting**: Query terms highlighted in results
- [ ] **Result counts**: Shows total matches, updates with filters
- [ ] **Facets/filters**: Available for large result sets, shows counts per value
- [ ] **Zero results**: Helpful message, alternatives offered, search box visible
- [ ] **Mobile optimization**: Touch-friendly, appropriate keyboard, voice input
- [ ] **Performance**: Fast initial results, suggestions appear quickly
- [ ] **Analytics**: Tracking queries, refinements, null rates, conversions

## References

**Foundational Work:**
- Baymard Institute — E-commerce search UX research
- Nielsen Norman Group — Search usability studies
- ARIA Authoring Practices — Combobox pattern

**Recent Research:**
- [Master Search UX in 2025](https://www.designmonks.co/blog/search-ux-best-practices) — Design Monks
- [9 UX Best Practices for Autocomplete Suggestions](https://baymard.com/blog/autocomplete-design) — Baymard Institute
- [5 Proven UX Strategies For "No Results" Pages](https://baymard.com/blog/no-results-page) — Baymard Institute
- [The Anatomy of a Perfect Search Box](https://medium.com/design-bootcamp/the-anatomy-of-a-perfect-search-box-ux-patterns-that-convert-in-2025-6d78cacada52) — Medium (2025)

**Practical Resources:**
- [Search UX Best Practices](https://www.pencilandpaper.io/articles/search-ux) — Pencil & Paper
- [Five Simple Steps For Better Autocomplete UX](https://smart-interface-design-patterns.com/articles/autocomplete-ux/) — Smart Interface Design Patterns
- [Search Results Page Design: UI/UX Best Practices](https://www.halo-lab.com/blog/search-results-page-design) — Halo Lab
- [Search bar UI: Best practices](https://blog.logrocket.com/ux-design/design-search-bar-intuitive-autocomplete/) — LogRocket
- [Empty State UX Examples](https://www.pencilandpaper.io/articles/empty-states) — Pencil & Paper
- [3 Guidelines for Search Engine "No Results" Pages](https://www.nngroup.com/articles/search-no-results-serp/) — NN/g

**Standards:**
- [ARIA Combobox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) — W3C

---

## See Also

- [Navigation](/interaction-patterns/navigation/) — Complementary discovery pattern
- [Forms](/interaction-patterns/forms/) — Search input as form element
- [Cognitive Load](/cognition/cognitive-load/) — Reducing search effort
- [Confusion](/cognition/confusion/) — Preventing search frustration
- [Accessibility Checklist](/checklists-playbooks/accessibility-checklist/) — Search accessibility requirements
