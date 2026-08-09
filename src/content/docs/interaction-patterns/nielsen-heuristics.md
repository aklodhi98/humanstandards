---
title: Nielsen's 10 Usability Heuristics
description: The most recognized set of usability principles for interaction design, developed by Jakob Nielsen in 1994 and still fundamental today.
---

Jakob Nielsen's 10 Usability Heuristics are broad rules of thumb for interaction design. First published in 1994, they remain the most widely recognized and applied usability principles in the industry.

These heuristics are called "heuristics" because they are general principles, not specific usability guidelines. They provide a framework for evaluating and improving interface usability.

## The 10 Heuristics

### Heuristic 1: Visibility of System Status
**The design should always keep users informed about what is going on, through appropriate feedback within a reasonable amount of time.**

**Why it matters:**
Users need to know what the system is doing at all times. Without feedback, users feel uncertain, lose trust, and make mistakes.

**Implementation:**
- Loading indicators for operations >1 second
- Progress bars for long operations (show %)
- Status messages for completed actions ("Saved", "Sent")
- Breadcrumbs showing current location
- Highlighting current page in navigation
- Real-time validation feedback on forms
- "Last saved 2 minutes ago" timestamps

**Timing Guidelines:**
- **<0.1s**: Feels instant, no feedback needed
- **0.1-1s**: Show loading state (spinner)
- **1-10s**: Show progress indicator with percentage
- **>10s**: Show detailed progress + estimated time remaining

**See:** [Notifications & Feedback](/interaction-patterns/notifications-feedback/) • [Examples: Stripe Dashboard](/examples/feedback/feedback-stripe-dashboard/)

---

### Heuristic 2: Match Between System and the Real World
**The design should speak the users' language. Use words, phrases, and concepts familiar to the user, rather than internal jargon. Follow real-world conventions.**

**Why it matters:**
Users bring mental models from the real world. Interfaces that match these models are easier to learn and use.

**Implementation:**
- Use familiar metaphors (folders, trash can, shopping cart)
- Display dates in user's locale format (MM/DD/YYYY vs DD/MM/YYYY)
- Use domain language, not technical jargon ("delete" not "DROP")
- Order options logically (chronological, alphabetical, frequency)
- Icons that represent real-world objects
- Natural information hierarchy (most important → least important)

**Bad Examples:**
- "Flush cache" instead of "Clear temporary data"
- "SSH into server" instead of "Connect to server"
- Technical error codes instead of plain language explanations

**Good Examples:**
- Email "trash" instead of "deleted items table"
- "Save draft" instead of "persist to session storage"
- "Undo send" instead of "revoke transmission"

**See:** [Working Memory](/cognition/working-memory/) • [Forms](/interaction-patterns/forms/)

---

### Heuristic 3: User Control and Freedom
**Users often perform actions by mistake. Provide a clearly marked "emergency exit" to leave unwanted actions without having to go through an extended process.**

**Why it matters:**
People make mistakes. Systems that don't allow recovery create anxiety and frustration.

**Implementation:**
- **Undo/Redo**: Essential for creative tools, text editors
- **Cancel buttons**: In dialogs and multi-step processes
- **Back button**: Always works predictably
- **Close/Exit**: Clear way to dismiss modals, popups
- **Escape key**: Universally closes dialogs
- **Clear all**: Reset forms or filters easily
- **Delete draft**: Abandon in-progress work

**Examples:**
- Gmail's "Undo Send" (5-30 second window)
- Browser back button (consistent behavior)
- Google Docs auto-save + version history
- Shopping cart "Remove item" buttons
- Search filters with "Clear all" option

**See:** [Defensive Design](/decision-making-errors/defensive-design/) • [Examples: Gmail Undo Send](/examples/defensive-design/defensive-design-gmail-undo/)

---

### Heuristic 4: Consistency and Standards
**Users should not have to wonder whether different words, situations, or actions mean the same thing. Follow platform and industry conventions.**

**Why it matters:**
Inconsistency forces users to learn multiple ways to do the same thing, increasing cognitive load.

**Types of Consistency:**

**Internal Consistency** (within your product):
- Same terminology everywhere ("Delete" not "Remove" in one place and "Delete" in another)
- Same visual style for similar elements
- Same placement for common controls
- Same keyboard shortcuts throughout

**External Consistency** (platform conventions):
- iOS: Swipe-to-delete pattern
- Android: Bottom sheets for actions
- Web: Underlined links
- Desktop: Ctrl+S to save (Cmd+S on Mac)

**Implementation:**
- Design system with reusable components
- Style guide for terminology
- Follow platform Human Interface Guidelines
- Use standard UI patterns (don't reinvent the wheel)

**See:** [Navigation](/interaction-patterns/navigation/) • Jakob's Law in [Key Principles](/human-overview/key-principles-and-laws/)

---

### Heuristic 5: Error Prevention
**Good error messages are important, but the best designs prevent problems from occurring in the first place.**

**Why it matters:**
Every error disrupts flow, wastes time, and damages trust. Prevention is better than cure.

**Types of Errors:**

**Slips** (correct goal, wrong execution):
- Clicking wrong button (similar buttons too close)
- Typos (no spell check)
- Accidental delete (no confirmation)

**Mistakes** (wrong goal):
- Misunderstanding what an action does
- Wrong assumptions about how system works

**Prevention Strategies:**

**Constraint-based:**
- Disable invalid options (greyed out)
- Limit input formats (date pickers, dropdowns)
- Prevent invalid states (can't submit incomplete form)

**Confirmation:**
- Ask before destructive actions ("Delete 47 items?")
- Show preview before commit ("You're about to...")
- Two-step verification for critical operations

**Helpful Defaults:**
- Pre-fill known information
- Suggest common choices
- Auto-detect format (phone numbers, credit cards)

**Real-time Validation:**
- Inline validation on blur
- Password strength meters
- Format hints ("MM/DD/YYYY")

**See:** [Defensive Design](/decision-making-errors/defensive-design/) • [Examples: Grammarly Error Prevention](/examples/defensive-design/error-prevention-grammarly/)

---

### Heuristic 6: Recognition Rather Than Recall
**Minimize the user's memory load by making elements, actions, and options visible. Users should not have to remember information from one part of the interface to another.**

**Why it matters:**
Working memory is limited (3-4 items). Interfaces that require memorization are harder to use and more error-prone.

**Implementation:**

**Make Options Visible:**
- Dropdown menus instead of remembering commands
- Toolbar with icons instead of keyboard shortcuts only
- Auto-complete for search and forms
- Recently used items prominently displayed

**Persistent Context:**
- Shopping cart visible in header
- Current step in multi-step process
- Selected filters shown on results page
- "Editing: filename.doc" in title bar

**Just-in-Time Information:**
- Tooltips on hover
- Inline help next to fields
- Password requirements visible while typing
- Format examples ("example@email.com")

**Visual Cues:**
- Icons + text labels (not just icons)
- Current page highlighted in navigation
- Disabled states clearly different from enabled
- Visited links different color

**See:** [Working Memory](/cognition/working-memory/) • [Examples: Smart Defaults - iOS Camera](/examples/cognitive-load/smart-defaults-ios-camera/)

---

### Heuristic 7: Flexibility and Efficiency of Use
**Shortcuts—hidden from novice users—may speed up the interaction for expert users so that the design can cater to both inexperienced and experienced users.**

**Why it matters:**
Users grow from novice to expert. Designs should accommodate both without forcing everyone through the same slow process.

**Implementation:**

**Keyboard Shortcuts:**
- Ctrl+C/V/Z (copy/paste/undo)
- / to focus search
- ? to show shortcuts
- Arrow keys for navigation

**Power User Features:**
- Command palette (Cmd+K)
- Batch operations (select multiple → act on all)
- Advanced filters (hidden by default)
- Customizable layouts

**Personalization:**
- Remember user preferences
- Recently used items
- Saved searches/filters
- Custom shortcuts

**Progressive Disclosure:**
- Simple interface by default
- "Show advanced options" for experts
- Macros and automation for repetitive tasks
- API access for developers

**Examples:**
- Gmail keyboard shortcuts (j/k navigation)
- Excel formulas for power users, UI for beginners
- VS Code command palette (Cmd+Shift+P)
- Photoshop layers (novices use one, experts use hundreds)

**See:** [Cognitive Load](/cognition/cognitive-load/) • [Examples: Progressive Disclosure - TurboTax](/examples/cognitive-load/progressive-disclosure-turbotax/)

---

### Heuristic 8: Aesthetic and Minimalist Design
**Interfaces should not contain information that is irrelevant or rarely needed. Every extra unit of information competes with the relevant units and diminishes their relative visibility.**

**Why it matters:**
Visual clutter increases cognitive load, slows task completion, and hides important information.

**Implementation:**

**Prioritize Content:**
- Primary action is obvious (large, high contrast)
- Secondary actions less prominent
- Tertiary actions hidden in menus
- Remove decorative elements that don't serve a purpose

**Use Whitespace:**
- Breathing room around elements
- Clear separation between sections
- Don't cram everything together
- Generous padding and margins

**Visual Hierarchy:**
- Size indicates importance
- Color draws attention to key actions
- Typography creates structure (headings, body, captions)
- Contrast separates foreground from background

**Progressive Disclosure:**
- Show only what's needed for current task
- Hide advanced options until requested
- Expand details on demand
- Remove rarely-used features

**Examples:**
- Google search (just search box, everything else minimal)
- iPhone Camera (huge capture button, settings hidden)
- Stripe Dashboard (data-dense but well-organized)
- Apple product pages (lots of whitespace, clear focus)

**See:** [Cognitive Load](/cognition/cognitive-load/) • [Attention & Focus](/cognition/attention-focus/)

---

### Heuristic 9: Help Users Recognize, Diagnose, and Recover from Errors
**Error messages should be expressed in plain language (no error codes), precisely indicate the problem, and constructively suggest a solution.**

**Why it matters:**
Errors are inevitable. Good error messages help users recover quickly; bad ones create frustration and abandonment.

**Error Message Anatomy:**

**1. What went wrong** (specific, not generic)
- ❌ Bad: "Error occurred"
- ❌ Bad: "Invalid input"
- ✅ Good: "Email address must include @"

**2. Why it happened** (if helpful)
- ❌ Bad: "Error 403"
- ✅ Good: "Your payment was declined by your bank"

**3. How to fix it** (actionable solution)
- ❌ Bad: "Contact administrator"
- ✅ Good: "Try another payment method or contact your bank"

**4. Visual design**
- Red color + icon (⚠️ or ✗)
- Positioned near the problem (inline validation)
- High contrast, easy to notice
- aria-live announcements for screen readers

**Examples:**

**Form Validation:**
- ❌ "Password invalid"
- ✅ "Password must be at least 8 characters with 1 number and 1 uppercase letter"

**Payment Errors:**
- ❌ "Transaction failed"
- ✅ "Your card was declined. Please try another card or contact your bank for more information."

**File Upload:**
- ❌ "Upload failed"
- ✅ "File size exceeds 10MB limit. Please compress the file or upload a smaller version."

**See:** [Defensive Design](/decision-making-errors/defensive-design/) • [Examples: Grammarly Error Prevention](/examples/defensive-design/error-prevention-grammarly/)

---

### Heuristic 10: Help and Documentation
**It's best if the system doesn't need any additional explanation. However, it may be necessary to provide documentation to help users understand how to complete their tasks.**

**Why it matters:**
Even well-designed systems have complexity. Good help resources enable users to succeed independently.

**Types of Help:**

**In-Context Help:**
- Tooltips on hover/focus
- Inline help text below fields
- "?" icons with expandable explanations
- Examples and placeholders
- Format hints ("MM/DD/YYYY")

**Progressive Help:**
- Onboarding tours for new users
- Contextual tips on first use
- Empty states with guidance
- Wizard-style setup

**Self-Service Documentation:**
- Searchable help center
- Video tutorials
- FAQs for common questions
- Troubleshooting guides
- Keyboard shortcut reference

**Proactive Help:**
- Error prevention (before mistakes happen)
- Suggestions based on behavior
- "Did you know?" tips
- Related articles

**Best Practices:**
- Make help easy to find (not buried in menus)
- Keep documentation up-to-date
- Use plain language, not jargon
- Include screenshots and examples
- Provide search, don't make users browse
- Test help with real users

**Examples:**
- Slack's searchable help within the app
- Figma's tooltips and keyboard shortcut overlays
- Stripe's extensive documentation with code examples
- Notion's template gallery and tutorials

**See:** [Forms](/interaction-patterns/forms/) • [Navigation](/interaction-patterns/navigation/)

---

## Using the Heuristics

### Heuristic Evaluation Method

Nielsen's heuristics are often used for **heuristic evaluation**, a discount usability method where evaluators inspect an interface and judge compliance against these principles.

**Process:**
1. **Multiple evaluators** (3-5 ideal) independently review interface
2. **Rate violations** by severity (cosmetic → catastrophic)
3. **Compile findings** and prioritize fixes
4. **Focus on violations** that break multiple heuristics (highest impact)

**Severity Ratings:**
- **0**: Not a usability problem
- **1**: Cosmetic (fix if time permits)
- **2**: Minor (low priority)
- **3**: Major (important to fix)
- **4**: Catastrophic (must fix before release)

### Combining Heuristics

Many design problems violate multiple heuristics simultaneously:

**Example: Generic error message "Error occurred"**
- Violates #9 (no diagnosis or recovery)
- Violates #2 (doesn't match user's language)
- Violates #1 (doesn't explain system status)

**Example: Auto-playing video with sound**
- Violates #3 (no user control)
- Violates #5 (doesn't prevent unwanted action)
- Violates #8 (distracting, not minimalist)

### Limitations

These heuristics are **guidelines, not rules:**
- They sometimes conflict (flexibility vs. simplicity)
- Context matters (banking app vs. game)
- They don't replace user testing
- They're about usability, not business goals

Always validate with **real users performing real tasks**.

---

## Real-World Examples

See how leading products apply these heuristics:

- **[Stripe Dashboard](/examples/feedback/feedback-stripe-dashboard/)**: #1 (visibility of system status) with real-time feedback
- **[Gmail Undo Send](/examples/defensive-design/defensive-design-gmail-undo/)**: #3 (user control) and #5 (error prevention)
- **[Grammarly](/examples/defensive-design/error-prevention-grammarly/)**: #5 (error prevention) and #9 (error recovery)
- **[iOS Camera](/examples/cognitive-load/smart-defaults-ios-camera/)**: #6 (recognition over recall) and #8 (minimalist design)
- **[BBC Keyboard Navigation](/examples/accessibility/accessibility-bbc-keyboard/)**: #7 (flexibility) for power users
- **[TurboTax](/examples/cognitive-load/progressive-disclosure-turbotax/)**: #6 (recognition) and #8 (minimalist)

---

## References

- Jakob Nielsen (1994) — 10 Usability Heuristics for User Interface Design: https://www.nngroup.com/articles/ten-usability-heuristics/
- Nielsen Norman Group — Heuristic Evaluation: https://www.nngroup.com/articles/how-to-conduct-a-heuristic-evaluation/
- Nielsen & Molich (1990) — Heuristic evaluation of user interfaces: https://doi.org/10.1145/97243.97281

---

## Related Pages

- [Key Principles & Laws](/human-overview/key-principles-and-laws/) — Broader human factors principles
- [Defensive Design](/decision-making-errors/defensive-design/) — Error prevention and recovery
- [Cognitive Load](/cognition/cognitive-load/) — Reducing mental effort
- [WCAG Guidelines](/accessibility/wcag-guidelines/) — Accessibility standards
- [Usability Testing](/research-methods-metrics/usability-tests/) — Validation methods
