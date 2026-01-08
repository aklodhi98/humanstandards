---
title: Content & Microcopy Templates
description: Ready-to-use patterns for buttons, errors, empty states, and more.
---

Microcopy is the small text that guides users through interfaces—button labels, error messages, tooltips, and confirmation dialogs. Good microcopy reduces friction, builds trust, and helps users accomplish their goals. Bad microcopy creates confusion, anxiety, and abandonment.

This playbook provides both human-readable guidance and machine-parseable templates for AI agents generating UI text.

---

## Quick Reference: Microcopy Specifications

### Sentence Length Guidelines

| Context | Target Length | Comprehension |
|---------|---------------|---------------|
| Error messages | 8-14 words | 90-100% |
| Button labels | 1-3 words | Action-clear |
| Tooltips | 1-2 sentences | Scannable |
| Empty state headline | 3-7 words | Immediate understanding |
| Empty state description | 1-2 sentences | Context + next step |
| Confirmation title | 3-5 words | Clear action |
| Confirmation body | 1-2 sentences | Consequences + alternatives |

### Voice Attributes

| Attribute | Description | Example |
|-----------|-------------|---------|
| Clear | Meaning is immediately obvious | "Save changes" not "Persist modifications" |
| Concise | No unnecessary words | "Email sent" not "Your email has been sent successfully" |
| Helpful | Guides toward solutions | "Check your email for a reset link" |
| Human | Natural, conversational | "Something went wrong" not "Error 500: Internal Server Error" |
| Confident | Avoids hedging language | "This will delete your account" not "This may delete your account" |

---

## Validation Rules (for MCP/AI)

```yaml
rules:
  # General Microcopy
  - id: microcopy-plain-language
    severity: warning
    check: "Text uses plain language (no jargon, technical terms, or acronyms without explanation)"
    context: "All UI text"
    reference: "Plain language improves comprehension by 25%+"

  - id: microcopy-sentence-length
    severity: warning
    check: "Sentences ≤14 words for maximum comprehension"
    context: "Error messages, instructions"
    research: "14 words or less = 90% comprehension"

  - id: microcopy-active-voice
    severity: warning
    check: "Uses active voice (subject-verb-object)"
    context: "Instructions, descriptions"
    example: "'We saved your changes' not 'Your changes have been saved'"

  # Buttons
  - id: button-action-verb
    severity: error
    check: "Button label starts with action verb"
    selector: "button, [role='button'], input[type='submit']"
    example: "Save, Create, Delete, Send, Download"

  - id: button-specific
    severity: warning
    check: "Button describes specific action, not generic 'Submit' or 'OK'"
    selector: "button[type='submit']"
    example: "'Create account' not 'Submit'"

  - id: button-length
    severity: warning
    check: "Button label 1-4 words"
    selector: "button"
    best_practice: "Short labels scan faster"

  # Error Messages
  - id: error-specific
    severity: error
    check: "Error message identifies specific problem (not 'Invalid input' or 'Error')"
    selector: ".error, [role='alert'], [aria-invalid='true'] + .error-message"
    wcag: "3.3.1 A"

  - id: error-solution
    severity: warning
    check: "Error message suggests how to fix the problem"
    selector: ".error-message"
    wcag: "3.3.3 AA"

  - id: error-no-blame
    severity: warning
    check: "Error message doesn't blame user ('You entered wrong' → 'Please enter')"
    selector: ".error-message"
    best_practice: "Reduces user frustration"

  # Empty States
  - id: empty-state-guidance
    severity: error
    check: "Empty state explains why empty AND what to do next"
    selector: ".empty-state, [data-empty]"
    example: "'No projects yet. Create your first project to get started.'"

  - id: empty-state-cta
    severity: warning
    check: "Empty state has clear call-to-action button"
    selector: ".empty-state button, .empty-state a"
    best_practice: "Direct path to resolution"

  # Confirmation Dialogs
  - id: confirmation-consequence
    severity: error
    check: "Destructive action confirmation explains consequences"
    selector: "[role='alertdialog'], .confirm-dialog"
    example: "'This will permanently delete all 23 files. This cannot be undone.'"

  - id: confirmation-button-specific
    severity: error
    check: "Confirmation buttons describe action, not just 'OK'/'Cancel'"
    selector: "[role='alertdialog'] button"
    example: "'Delete files' / 'Keep files' not 'OK' / 'Cancel'"

  # Accessibility
  - id: microcopy-no-placeholder-only
    severity: error
    check: "Placeholder text is not the only label for form fields"
    selector: "input[placeholder]:not([aria-label]):not([aria-labelledby])"
    wcag: "3.3.2 A"

  - id: link-descriptive
    severity: error
    check: "Link text describes destination (not 'click here' or 'read more')"
    selector: "a"
    wcag: "2.4.4 A"
```

---

## Voice and Tone

### Voice vs. Tone

**Voice** is consistent—your brand's personality. **Tone** adapts to context.

| Voice Attribute | Always | Never |
|----------------|--------|-------|
| Helpful | Guide users toward solutions | Leave users without next steps |
| Clear | Use plain language | Use jargon or technical terms |
| Respectful | Acknowledge user's time | Blame or condescend |
| Confident | Be direct and certain | Hedge with "maybe" or "possibly" |
| Human | Sound like a person | Sound like a robot or legal document |

### Tone by Context

| Context | Tone | Example |
|---------|------|---------|
| Success | Positive, brief | "Payment sent!" |
| Error | Calm, helpful | "That card was declined. Try another card or payment method." |
| Warning | Clear, serious | "This will delete all your data. This cannot be undone." |
| Onboarding | Warm, encouraging | "Great choice! Let's set up your account." |
| Loading | Reassuring, informative | "Saving your changes..." |
| Empty state | Helpful, optimistic | "No messages yet. Start a conversation!" |

### Voice Checklist

- [ ] Would you say this to a person face-to-face?
- [ ] Is every word necessary?
- [ ] Is the most important information first?
- [ ] Is it immediately clear what to do next?
- [ ] Does it avoid blaming the user?
- [ ] Is it free of jargon and technical terms?

---

## Buttons

### Primary Actions

Use verbs that describe what happens when clicked.

| Instead of | Use | Why |
|------------|-----|-----|
| Submit | Create account | Specific action |
| OK | Save changes | Describes result |
| Yes | Delete file | Confirms what happens |
| Send | Send message | Complete description |
| Done | Finish setup | Clear completion |

### Templates by Action Type

**Create:**
```
Create [thing]
Add [thing]
New [thing]
Start [thing]
```

**Save/Update:**
```
Save changes
Update profile
Apply settings
Confirm changes
```

**Navigate:**
```
Continue
Next step
Go to [destination]
View [thing]
```

**Delete/Remove:**
```
Delete [thing]
Remove [thing]
Cancel [subscription/thing]
```

**Download/Export:**
```
Download [thing]
Export to [format]
Save to device
Get [thing]
```

### Secondary Actions

```
Cancel
Go back
Not now
Skip for now
Maybe later
Learn more
View details
```

### Destructive Actions

Always be specific about what will be destroyed.

```
// Templates
Delete [thing]
Remove [thing] permanently
Cancel [subscription]

// Examples
Delete this project
Remove all files
Cancel subscription
```

### Button Pairs

Match button pairs to make the choice clear:

| Action | Primary | Secondary |
|--------|---------|-----------|
| Save form | Save changes | Discard changes |
| Delete item | Delete | Keep |
| Submit form | Create account | Cancel |
| Confirm action | Yes, delete | No, go back |
| Upgrade | Upgrade now | Stay on free plan |
| Exit flow | Leave page | Continue editing |

---

## Error Messages

### Anatomy of a Good Error Message

```
[Icon] + [What happened] + [Why (if helpful)] + [How to fix]
```

**Example:**
```
⚠️ That email is already registered.
Try signing in, or use a different email address.
[Sign in] [Use different email]
```

### Templates by Error Type

**Form Validation:**
```
// Required field
[Field name] is required.
Please enter your [field name].

// Format error
Please enter a valid [email address/phone number/etc.].
[Field name] should be in the format [example].

// Length error
[Field name] must be at least [X] characters.
[Field name] can't exceed [X] characters.

// Match error
Passwords don't match. Please try again.
```

**Authentication:**
```
// Wrong credentials
That email and password combination doesn't match our records.
[Reset password] [Try again]

// Account locked
Too many attempts. Try again in [X] minutes.
[Reset password] [Contact support]

// Session expired
Your session has expired. Please sign in again.
[Sign in]
```

**Network/System:**
```
// Connection error
Can't connect right now. Check your internet connection and try again.
[Try again]

// Server error
Something went wrong on our end. We're looking into it.
[Try again] [Contact support]

// Timeout
This is taking longer than expected. Try again or contact support.
[Try again] [Contact support]
```

**Permission:**
```
// Access denied
You don't have permission to [action]. Contact your admin for access.
[Request access]

// Feature locked
This feature requires a [plan name] plan.
[View plans] [Learn more]
```

### Error Message Don'ts

| Don't | Do |
|-------|-----|
| "Error" | "Email address is invalid" |
| "Invalid input" | "Phone number must be 10 digits" |
| "Something went wrong" (alone) | "Something went wrong. Try refreshing the page." |
| "You entered an invalid email" | "Please enter a valid email address" |
| "Error 500" | "We're having technical difficulties. Try again in a few minutes." |
| "Oops!" (alone) | Use sparingly, always with explanation |

### Inline vs. Summary Errors

**Inline errors** appear next to the field:
```html
<label for="email">Email</label>
<input type="email" id="email" aria-invalid="true" aria-describedby="email-error">
<p id="email-error" class="error">Please enter a valid email address</p>
```

**Summary errors** appear at form top for multiple issues:
```html
<div role="alert" class="error-summary">
  <h2>Please fix 2 errors:</h2>
  <ul>
    <li><a href="#email">Email address is invalid</a></li>
    <li><a href="#phone">Phone number is required</a></li>
  </ul>
</div>
```

---

## Empty States

### Types of Empty States

| Type | When | Tone |
|------|------|------|
| First-time | User hasn't created anything yet | Welcoming, instructive |
| Cleared | User completed/deleted all items | Celebratory or neutral |
| No results | Search/filter found nothing | Helpful, suggestive |
| Error | Data couldn't load | Apologetic, solution-focused |

### Templates

**First-time empty:**
```
[Headline]: No [things] yet
[Description]: [Things] help you [benefit]. Create your first one to get started.
[CTA]: Create [thing]
[Secondary]: Or browse templates

// Example
No projects yet
Projects help you organize your work. Create your first one to get started.
[Create project] or [Browse templates]
```

**Cleared empty:**
```
[Headline]: All done! / All caught up!
[Description]: You've [completed/cleared] all your [things].
[CTA]: Add new [thing]

// Example
All caught up!
You've completed all your tasks for today.
[Add new task]
```

**No search results:**
```
[Headline]: No results for "[query]"
[Description]: Try adjusting your search or filters.
[Suggestions]:
- Check your spelling
- Try more general terms
- Remove some filters
[CTA]: Clear search

// Example
No results for "prodct design"
Did you mean "product design"?
Or try: [Clear filters] [Browse all]
```

**Error empty:**
```
[Headline]: Couldn't load [things]
[Description]: This might be a temporary problem.
[CTA]: Try again
[Secondary]: Contact support if this continues

// Example
Couldn't load your messages
This might be a temporary problem. Check your connection and try again.
[Try again] [Get help]
```

### Empty State Guidelines

| Do | Don't |
|----|-------|
| Explain why it's empty | Show only "No data" |
| Provide clear next action | Leave users stranded |
| Use friendly illustration | Show broken/sad imagery |
| Match the product's tone | Be overly cute or clever |
| Offer alternatives | Assume one path fits all |

---

## Loading and Progress

### Loading States

**Immediate (0-300ms):**
- No indicator needed
- Show instant feedback (button state change)

**Short (300ms-3s):**
- Spinner or skeleton
- Brief context: "Loading..."

**Medium (3-10s):**
- Progress indicator
- Specific action: "Uploading file..."

**Long (10s+):**
- Progress bar with percentage
- Time estimate if possible
- Option to background the task

### Templates

```
// Generic loading
Loading...
Just a moment...

// Specific action
Saving your changes...
Uploading [filename]...
Processing payment...
Generating report...

// With progress
Uploading... 45% complete
Importing 234 of 500 contacts...
About 2 minutes remaining

// Backgroundable
We're generating your report. We'll email you when it's ready.
[Keep working] [View progress]
```

### Progress Messages

| Stage | Message |
|-------|---------|
| Starting | "Starting upload..." |
| In progress | "Uploading file... 45%" |
| Processing | "Processing your data..." |
| Finalizing | "Almost done..." |
| Complete | "Upload complete!" |
| Error | "Upload failed. Try again?" |

---

## Confirmation Dialogs

### When to Use Confirmation

| Use confirmation for | Skip confirmation for |
|---------------------|----------------------|
| Irreversible actions | Easily undoable actions |
| Destructive actions | Creating new items |
| High-stakes changes | Saving changes |
| Actions affecting others | Personal preference changes |
| Bulk operations | Single item operations (with undo) |

### Confirmation Dialog Anatomy

```
[Title]: [Action] [thing]?
[Body]: [Consequence of action]. [Alternative if applicable].
[Secondary button]: [Keep/Cancel/Go back]
[Primary button]: [Specific action verb]
```

### Templates

**Delete single item:**
```
Delete "Project Alpha"?

This project and all its files will be permanently deleted.
This can't be undone.

[Cancel] [Delete project]
```

**Delete multiple items:**
```
Delete 5 files?

These files will be permanently deleted.
This can't be undone.

[Cancel] [Delete 5 files]
```

**Cancel subscription:**
```
Cancel your subscription?

Your subscription will end on March 15, 2025.
You won't be charged again, but you'll lose access to:
• Premium features
• Priority support
• Extra storage

[Keep subscription] [Cancel subscription]
```

**Discard unsaved changes:**
```
Discard unsaved changes?

You have unsaved changes that will be lost.

[Keep editing] [Discard changes]
```

**Leave page with form data:**
```
Leave without saving?

Your changes haven't been saved and will be lost.

[Stay on page] [Leave page]
```

### Confirmation Button Guidelines

| Avoid | Use Instead |
|-------|-------------|
| OK / Cancel | [Specific action] / [Alternative] |
| Yes / No | Delete file / Keep file |
| Submit | Save changes |
| Confirm | [What you're confirming] |

**Match the action's severity:**
- Destructive: Red primary button
- Neutral: Standard primary button
- Recoverable: Can use less emphasis

---

## Notifications

### Notification Types

| Type | When | Duration | Style |
|------|------|----------|-------|
| Success | Action completed | 3-5 seconds, auto-dismiss | Green, checkmark |
| Error | Action failed | Until dismissed | Red, warning icon |
| Warning | Attention needed | Until acknowledged | Yellow/orange |
| Info | FYI updates | 5-10 seconds | Blue, info icon |

### Templates

**Success:**
```
✓ Changes saved
✓ Message sent
✓ File uploaded successfully
✓ Account created! Check your email to verify.
```

**Error:**
```
✕ Couldn't save changes. Try again.
✕ Message failed to send. [Retry]
✕ Upload failed. File too large (max 10MB).
```

**Warning:**
```
⚠ Your session will expire in 5 minutes
⚠ Storage almost full (90% used)
⚠ This action affects 50 team members
```

**Info:**
```
ℹ New features available. [Learn more]
ℹ Scheduled maintenance tonight 10pm-12am
ℹ 3 items need your attention
```

### Notification Best Practices

| Do | Don't |
|----|-------|
| Include action when relevant (Undo, View, Retry) | Show notification without context |
| Auto-dismiss success messages | Make users dismiss every message |
| Stack notifications (max 3-4 visible) | Cover content with notifications |
| Respect do-not-disturb settings | Interrupt focus mode |
| Batch low-priority notifications | Spam with individual updates |

### Toast Notifications

```html
<div role="status" aria-live="polite" class="toast toast-success">
  <span class="toast-icon">✓</span>
  <span class="toast-message">Changes saved</span>
  <button class="toast-action">Undo</button>
  <button class="toast-dismiss" aria-label="Dismiss">×</button>
</div>
```

---

## Tooltips and Help Text

### When to Use Tooltips

| Use tooltips for | Don't use tooltips for |
|------------------|----------------------|
| Icon-only buttons | Essential information |
| Abbreviations/acronyms | Form field labels |
| Additional context | Instructions users need |
| Truncated text (show full) | Mobile interfaces |

### Tooltip Templates

```
// Icon button tooltip
[Action verb] + [object]
"Edit profile"
"Download file"
"Copy to clipboard"

// Feature explanation
[What it does] in 1-2 sentences.
"Notifications appear here when someone mentions you or replies to your posts."

// Abbreviation
[Acronym]: [Full term]
"API: Application Programming Interface"
```

### Help Text Templates

```
// Format hint (below field)
Format: MM/DD/YYYY
Example: john@example.com

// Requirement explanation
Must be at least 8 characters with one number.

// Context
We'll use this to personalize your experience.

// Privacy reassurance
We'll never share your email with third parties.
```

### Placeholder Text

**Use sparingly.** Placeholder text disappears on focus, causing usability issues.

| Good use | Bad use |
|----------|---------|
| Format example: "MM/DD/YYYY" | Label replacement: "Enter email" |
| Search hint: "Search messages..." | Required field: "Email (required)" |
| Optional context: "@username" | Instructions: "Type your name" |

```html
<!-- Good: Label + placeholder as example -->
<label for="phone">Phone number</label>
<input type="tel" id="phone" placeholder="(555) 123-4567">

<!-- Bad: Placeholder as only label -->
<input type="email" placeholder="Email address">
```

---

## Accessibility Considerations

### Screen Reader Announcements

```html
<!-- Success message announced -->
<div role="status" aria-live="polite">
  Changes saved successfully.
</div>

<!-- Error message announced immediately -->
<div role="alert">
  Please fix the errors below.
</div>

<!-- Progress update -->
<div role="status" aria-live="polite" aria-atomic="true">
  Uploading: 45% complete
</div>
```

### Descriptive Link Text

| Don't | Do |
|-------|-----|
| Click here | View pricing |
| Read more | Read the full article |
| Learn more | Learn about accessibility |
| Here | Documentation |

### Alt Text for Icons

```html
<!-- Decorative icon (hidden from screen readers) -->
<span aria-hidden="true">✓</span> Saved

<!-- Meaningful icon (needs alt text) -->
<button>
  <svg role="img" aria-label="Delete">...</svg>
</button>

<!-- Icon button -->
<button aria-label="Close dialog">
  <svg aria-hidden="true">...</svg>
</button>
```

---

## Decision Logic for AI

### Which Message Type to Use

```
IF action completed successfully:
  USE success toast (auto-dismiss 3-5s)
  INCLUDE undo if reversible

IF action failed:
  USE error message (persist until dismissed)
  INCLUDE specific problem + how to fix
  INCLUDE retry option

IF action has serious consequences:
  USE confirmation dialog BEFORE action
  INCLUDE specific consequences
  USE specific button labels (not OK/Cancel)

IF user needs information:
  IF essential: Use visible help text
  IF supplementary: Use tooltip
  IF context-dependent: Use inline hint
```

### Error Message Generation

```
INPUT: error_type, field_name, constraint

IF error_type == "required":
  RETURN "{field_name} is required."

IF error_type == "format":
  RETURN "Please enter a valid {field_name}."

IF error_type == "min_length":
  RETURN "{field_name} must be at least {constraint} characters."

IF error_type == "max_length":
  RETURN "{field_name} can't exceed {constraint} characters."

IF error_type == "match":
  RETURN "{field_name}s don't match. Please try again."

IF error_type == "unique":
  RETURN "That {field_name} is already taken. Try another."

IF error_type == "server":
  RETURN "Something went wrong. Please try again."
```

### Button Label Generation

```
INPUT: action_type, object_name, is_destructive

IF action_type == "create":
  RETURN "Create {object_name}"

IF action_type == "save":
  RETURN "Save changes"

IF action_type == "delete":
  IF is_destructive:
    RETURN "Delete {object_name}"
  ELSE:
    RETURN "Remove {object_name}"

IF action_type == "navigate":
  RETURN "Go to {object_name}" OR "View {object_name}"

IF action_type == "submit":
  RETURN verb based on form purpose (Create account, Send message, etc.)
```

---

## Implementation Checklist

### Before Writing

- [ ] Understand the user's context and emotional state
- [ ] Know what action the user is trying to complete
- [ ] Identify potential points of confusion or anxiety
- [ ] Check existing patterns for consistency

### While Writing

- [ ] Use active voice
- [ ] Put the most important information first
- [ ] Keep sentences under 14 words when possible
- [ ] Use specific verbs for buttons
- [ ] Avoid jargon and technical terms
- [ ] Include next steps for errors

### After Writing

- [ ] Read it aloud—does it sound natural?
- [ ] Is every word necessary?
- [ ] Would this make sense without visual context?
- [ ] Is it accessible (no "click here", descriptive links)?
- [ ] Is it consistent with other text in the product?

---

## References

**Style Guides:**
- [Mailchimp Content Style Guide](https://styleguide.mailchimp.com/)
- [Microsoft Writing Style Guide](https://docs.microsoft.com/en-us/style-guide/)
- [GOV.UK Content Design Guide](https://www.gov.uk/guidance/content-design)
- [IBM Carbon Design System Content](https://carbondesignsystem.com/guidelines/content/overview/)
- [Intuit Content Design](https://contentdesign.intuit.com/)

**Research & Best Practices:**
- [Smashing Magazine: How to Improve Your Microcopy](https://www.smashingmagazine.com/2024/06/how-improve-microcopy-ux-writing-tips-non-ux-writers/)
- [NN/g: Confirmation Dialogs](https://www.nngroup.com/articles/confirmation-dialog/)
- [UX Writing Hub: Error Message Examples](https://uxwritinghub.com/error-message-examples/)

**Books:**
- *Microcopy: The Complete Guide* — Kinneret Yifrah
- *Strategic Writing for UX* — Torrey Podmajersky
- *Writing Is Designing* — Michael J. Metts, Andy Welfle

---

## See Also

- [Form Design Playbook](/checklists-playbooks/form-design-playbook/) — Error handling and validation
- [Onboarding Playbook](/checklists-playbooks/onboarding-playbook/) — Empty states and first-time experience
- [Notifications & Feedback](/interaction-patterns/notifications-feedback/) — Toast and alert patterns
- [Defensive Design](/decision-making-errors/defensive-design/) — Confirmation and undo patterns
- [Cognitive Load](/cognition/cognitive-load/) — Why clear writing matters
- [Trust & Perception](/emotions-motivation/trust-perception/) — Building confidence through words
