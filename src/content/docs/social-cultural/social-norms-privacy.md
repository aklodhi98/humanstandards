---
title: Social Norms & Privacy
description: Respect norms and minimize data; make consent informed and revocable.
---

Privacy isn't just a legal checkbox — it's a fundamental aspect of user trust. How you collect, store, and share data shapes how users feel about your product. Respect their expectations, be transparent, and give them control.

Research shows that **48% of users distrust websites with deceptive UX patterns**, and **49% of consumers believe websites don't provide enough information about how their data is used**. The stakes are high: both user trust and regulatory penalties.

---

## Privacy Specifications

### Privacy Principles (GDPR Article 5)

| Principle | Requirement | Implementation |
|-----------|-------------|----------------|
| **Lawfulness, fairness, transparency** | Legal basis for processing; clear communication | Privacy policy, consent flows |
| **Purpose limitation** | Process only for stated purposes | Explicit purpose declaration |
| **Data minimization** | Collect only what's necessary | Field-by-field justification |
| **Accuracy** | Keep data current and correct | Update mechanisms, validation |
| **Storage limitation** | Delete when no longer needed | Retention policies, auto-purge |
| **Integrity & confidentiality** | Protect against unauthorized access | Encryption, access controls |
| **Accountability** | Demonstrate compliance | Audit logs, documentation |

### Consent Requirements (GDPR)

| Requirement | Good Practice | Bad Practice |
|-------------|---------------|--------------|
| **Freely given** | Equal-weight Accept/Reject buttons | Reject buried in submenu |
| **Specific** | Per-purpose consent | Blanket "agree to all" |
| **Informed** | Plain language explanation | Legal jargon |
| **Unambiguous** | Active opt-in required | Pre-checked boxes |
| **Withdrawable** | One-click revocation | Multi-step cancellation |

### Dark Pattern Categories to Avoid

| Pattern | Description | Violation |
|---------|-------------|-----------|
| **Pre-checked boxes** | Default opt-in to marketing | GDPR Art. 7 |
| **Hidden opt-outs** | Reject option hard to find | GDPR Art. 7 |
| **Confirm-shaming** | "No, I don't want to save money" | DSA/DMA |
| **Forced continuity** | Auto-renewal hidden in T&C | CCPA |
| **Privacy Zuckering** | Confusing privacy settings | GDPR Art. 25 |
| **Misdirection** | Visual design emphasizes Accept | GDPR Art. 7 |

---

## Validation Rules

```yaml
privacy_validation:
  rules:
    - id: consent-freely-given
      severity: error
      check: "Accept and Reject buttons have equal visual weight"
      bad: "Accept: large blue button; Reject: gray text link"
      good: "Accept: blue button; Reject: blue outlined button (same size)"

    - id: no-prechecked-boxes
      severity: error
      check: "Marketing/tracking consent checkboxes default to unchecked"
      legal: "GDPR Article 7, CCPA"

    - id: consent-specific
      severity: error
      check: "Each data use purpose has separate consent toggle"
      bad: "By continuing, you agree to all data uses"
      good: "Toggle: Analytics, Toggle: Marketing, Toggle: Personalization"

    - id: plain-language
      severity: warning
      check: "Privacy explanations readable at grade 8 level or below"
      bad: "Pursuant to applicable regulations, data may be processed..."
      good: "We use your location to show nearby stores"

    - id: withdrawal-accessible
      severity: error
      check: "Consent withdrawal requires no more steps than granting"
      bad: "Opt-in: 1 click; Opt-out: email support"
      good: "Same toggle to enable/disable"

    - id: data-minimization
      severity: warning
      check: "Each collected field has documented necessity"
      question: "Would the product still work without this field?"

    - id: purpose-limitation
      severity: error
      check: "Data not used for undisclosed purposes"
      bad: "Collected for orders; used for ad targeting"

    - id: retention-policy
      severity: warning
      check: "Data retention period defined and enforced"
      pattern: "Auto-delete after [defined period]"

    - id: sharing-scope-clear
      severity: error
      check: "User knows exactly who will see their content before sharing"
      bad: "'Share' button with no audience indication"
      good: "'Share with 3 workspace members' or 'Post publicly'"

    - id: default-to-private
      severity: warning
      check: "New content defaults to private or limited visibility"
      rationale: "Most users never change defaults"
```

---

## Contextual Integrity Framework

Helen Nissenbaum's theory of contextual integrity provides the conceptual foundation for understanding privacy expectations. Privacy violations occur when information flows don't match contextual norms.

### The Five Parameters of Information Flows

| Parameter | Definition | Example |
|-----------|------------|---------|
| **Data subject** | Person the data is about | Patient, customer, employee |
| **Sender** | Who transmits the data | Doctor, website, app |
| **Recipient** | Who receives the data | Insurance, advertiser, employer |
| **Information type** | Category of data | Health, location, purchase history |
| **Transmission principle** | Conditions of flow | With consent, as required by law, freely |

### Violation Detection

A practice violates contextual integrity when flows fail to match expected parameter values:

```pseudo
FUNCTION detectPrivacyViolation(flow):
  expected = getUserExpectations(flow.context)

  violations = []

  IF flow.recipient NOT IN expected.recipients:
    violations.push("Unexpected recipient: " + flow.recipient)

  IF flow.information_type NOT IN expected.types:
    violations.push("Unexpected data type: " + flow.information_type)

  IF flow.transmission_principle NOT IN expected.principles:
    violations.push("Unexpected condition: " + flow.transmission_principle)

  RETURN violations
```

### Context-Specific Examples

| Context | Expected Flow | Violation |
|---------|---------------|-----------|
| **Medical** | Doctor → Insurance (for billing) | Doctor → Advertiser |
| **E-commerce** | Purchase history → Recommendations | Purchase history → Political ads |
| **Fitness app** | Activity → Personal dashboard | Activity → Employer |
| **Social media** | Photo → Tagged friends | Photo → Facial recognition training |

---

## Data Minimization

### Collect Only What You Need

Every data point you collect is:
- A responsibility to protect
- A potential liability if breached
- A decision users must make about trusting you

**Question for each field:** Would the product still work without this information?

### Field-by-Field Justification

| Field | Required? | Justification |
|-------|-----------|---------------|
| **Email** | Yes | Account recovery, essential notifications |
| **Phone** | Maybe | 2FA (offer alternatives), critical alerts |
| **Birth date** | Rarely | Age verification (collect year only if needed) |
| **Gender** | Usually no | Personalization (offer "prefer not to say") |
| **Full address** | Only if shipping | Physical delivery |
| **Location (precise)** | Usually no | Approximate location often sufficient |

### Progressive Collection

Collect data only when needed, not upfront:

```
┌─────────────────┐
│  Sign Up        │  ← Email only
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  First Purchase │  ← Shipping address
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Saved Cards    │  ← Payment info (optional)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Enable Alerts  │  ← Phone number (optional)
└─────────────────┘
```

### Minimize Retention

Data you don't keep can't be breached.

| Data Type | Retention Guideline | Auto-Action |
|-----------|--------------------|----|
| **Session logs** | 30 days | Delete |
| **Payment records** | Legal requirement (varies) | Archive, restrict access |
| **Support tickets** | 2 years | Anonymize |
| **Abandoned carts** | 30 days | Delete |
| **Inactive accounts** | 2 years | Prompt, then delete |
| **Analytics events** | 26 months (GA default) | Anonymize |

### Least Privilege Access

Limit access to personal data within your organization:

| Role | Access Level |
|------|-------------|
| **Customer support** | Name, email, order history |
| **Marketing** | Anonymized segments only |
| **Engineering** | Production: anonymized; Debug: time-limited access |
| **Finance** | Billing records, no PII except necessary |
| **Executive** | Aggregated metrics only |

---

## Informed Consent

### Make Consent Meaningful

Dark patterns in consent are both unethical and increasingly illegal. In 2024, average FTC penalties for dark pattern violations reached **$14.8 million**.

**Requirements:**
- **Don't pre-check boxes** for marketing or data sharing
- **Don't hide opt-outs** in walls of legal text
- **Don't make rejection harder** than acceptance
- **Do use plain language** to explain what and why

### Cookie Consent Best Practices

| Element | Good | Bad |
|---------|------|-----|
| **Accept button** | "Accept all" | "Yes! Give me the best experience!" |
| **Reject button** | "Reject all" (equally visible) | Small "Manage preferences" link |
| **Granular options** | Per-category toggles | One toggle for everything |
| **Pre-selection** | All off by default | "Legitimate interest" pre-enabled |
| **Language** | "Marketing cookies" | "Functional enhancement modules" |

### Purpose-Specific Explanations

Vague: "We use your data to improve our services"

Specific and honest:
- "We use your location to show nearby stores" (necessary for feature)
- "We share your email with shipping partners for tracking updates" (clear recipient)
- "We analyze usage patterns to fix bugs (no personal data leaves your device)" (reassuring limitation)

### Withdrawal Must Be Easy

**The GDPR standard:** Withdrawal of consent must be as easy as granting it.

| Consent Action | Steps to Grant | Steps to Withdraw |
|----------------|----------------|-------------------|
| **Marketing emails** | 1 click (checkbox) | 1 click (unsubscribe link) |
| **Location sharing** | 1 tap (enable) | 1 tap (disable) |
| **Account deletion** | N/A | 3 clicks max, no waiting period |
| **Data export** | N/A | Self-service in settings |

---

## Sharing Scope

### Default to Private

When users create content or profiles:
- **Default visibility:** Private or limited
- **Pre-publish preview:** Show who will see
- **Expansion warning:** Alert before increasing visibility

### Explain the Audience Precisely

Vague "Share" buttons create anxiety. Be specific:

| Vague | Specific |
|-------|----------|
| "Share" | "Share with 3 people in this workspace" |
| "Post" | "Post publicly (anyone on the internet)" |
| "Share profile" | "Visible to your 847 connections" |
| "Share location" | "Share with Sarah for 1 hour" |

### Visibility Indicators

Show current sharing state clearly:

```
┌────────────────────────────────────────┐
│  Document: Q4 Report                   │
│  🔒 Private — Only you can see this    │
│  [Share] [Make public]                 │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│  Post: Product announcement            │
│  🌐 Public — Anyone can see this       │
│  Shared with: Everyone on the internet │
│  [Edit visibility]                     │
└────────────────────────────────────────┘
```

### Contextual Integrity in Sharing

Preserve the context in which data was shared:

| Source Context | Inappropriate Cross-Context Use |
|----------------|--------------------------------|
| Medical records | Search engine indexing |
| Photos with close friends | Recommendations to strangers |
| Work documents | Personal social media |
| Private messages | Training data for AI |

---

## Social Features

### Activity Visibility

Before showing real-time activity indicators, ask whether users want that visibility:

| Feature | Default | User Control |
|---------|---------|--------------|
| **"Typing..." indicator** | Off | Enable per conversation |
| **Read receipts** | Off | Enable globally |
| **"Online now" status** | Off | Enable with schedule |
| **Last active time** | Off | Enable globally |
| **"Viewing this page"** | Off | Enable per page |

### Social Proof Considerations

Showing social signals creates pressure. Evaluate carefully:

| Feature | Benefit | Privacy Cost | Recommendation |
|---------|---------|--------------|----------------|
| **View counts** | Social proof | Embarrasses low-view content | Aggregate only |
| **Who viewed your profile** | Curiosity | Creates surveillance | Opt-in only |
| **Like counts** | Validation | Creates pressure | Option to hide |
| **"X is reading this"** | Urgency | Forces response | Don't implement |

### The Power of Defaults

**83% of users never change privacy defaults.** Your defaults are your true values.

| Default | Message to Users |
|---------|------------------|
| **Maximum sharing, opt-out** | "We share unless you stop us" |
| **Minimum sharing, opt-in** | "We protect you unless you choose otherwise" |
| **Transparent trade-offs** | "Share more for these benefits, or keep private" |

---

## Decision Logic for Privacy-Respecting Design

```pseudo
FUNCTION evaluatePrivacyDesign(feature):
  issues = []

  // Data collection check
  FOR each field IN feature.collected_data:
    IF NOT hasDocumentedNecessity(field):
      issues.push({
        severity: "warning",
        issue: "Unnecessary data collection: " + field
      })

  // Consent flow check
  IF feature.requires_consent:
    IF feature.consent.accept_weight > feature.consent.reject_weight:
      issues.push({
        severity: "error",
        issue: "Asymmetric consent buttons (dark pattern)"
      })

    IF feature.consent.prechecked_boxes > 0:
      issues.push({
        severity: "error",
        issue: "Pre-checked consent boxes violate GDPR"
      })

  // Sharing scope check
  IF feature.involves_sharing:
    IF feature.default_visibility == "public":
      issues.push({
        severity: "warning",
        issue: "Default to public violates privacy by design"
      })

    IF NOT feature.shows_audience_before_share:
      issues.push({
        severity: "error",
        issue: "User cannot see who will receive shared content"
      })

  // Withdrawal check
  IF feature.has_consent_mechanism:
    IF feature.withdrawal_steps > feature.grant_steps:
      issues.push({
        severity: "error",
        issue: "Withdrawal harder than granting (GDPR violation)"
      })

  RETURN issues
```

---

## Legal Compliance

Regulations vary by jurisdiction but share common themes.

### Major Privacy Regulations

| Regulation | Jurisdiction | Key Requirements | Effective |
|------------|--------------|------------------|-----------|
| **GDPR** | EU/EEA | Consent, right to deletion, data portability | 2018 |
| **CCPA/CPRA** | California | Right to know, right to delete, opt-out of sale | 2020/2023 |
| **LGPD** | Brazil | Similar to GDPR, local enforcement | 2020 |
| **DSA** | EU | Dark pattern prohibition, transparency | 2024 |
| **DMA** | EU | Gatekeepers can't use dark patterns | 2024 |
| **MODPA** | Maryland (US) | Strict data minimization | Oct 2025 |

### Notable Enforcement

| Company | Fine | Violation |
|---------|------|-----------|
| **Amazon** | €746M | Cookie consent manipulation |
| **WhatsApp** | €225M | Privacy policy transparency |
| **Google** | €150M | Confusing cookie rejection |
| **Honda** | Under investigation | Dark patterns in consent (CCPA) |

### Design for Strictest Requirements

Building for GDPR compliance generally satisfies other regulations:

```pseudo
FUNCTION checkCompliance(feature):
  // GDPR is typically the strictest
  IF meetsGDPRRequirements(feature):
    RETURN "Likely compliant globally"

  // Check jurisdiction-specific requirements
  violations = []

  IF targetsCalifornia AND NOT meetsCCPA(feature):
    violations.push("CCPA")

  IF targetsEU AND NOT meetsGDPR(feature):
    violations.push("GDPR")

  IF targetsBrazil AND NOT meetsLGPD(feature):
    violations.push("LGPD")

  RETURN violations
```

---

## Recent Research

### Dark Pattern Prevalence

A 2024 study found that **97% of EU apps still deploy dark patterns** despite GDPR enforcement. The Norwegian Consumer Council found that **90% of popular websites and apps use dark patterns** that conflict with GDPR principles.

### AI and Data Minimization Tension

The EU AI Act (adopted March 2024) addresses the tension between AI's data hunger and privacy principles. Recital 69 states: "The right to privacy and to protection of personal data must be guaranteed throughout the entire lifecycle of the AI system. In this regard, the principles of data minimisation and data protection by design and by default... are applicable when personal data is processed."

### User Trust Research

The ICO found that **65% of users prefer websites that simplify data rights management**. A University of Cambridge study found that **48% of users distrust websites with deceptive UX patterns**. IAB's January 2024 report shows **49% of consumers believe websites don't provide enough information about data use**.

### Maryland's Stricter Approach

The Maryland Online Data Privacy Act (MODPA, effective October 2025) takes a stricter approach than other US laws: data collection must be "reasonably necessary and proportionate" to provide a specific product or service requested by the consumer. It also prohibits targeted advertising to minors entirely.

---

## References

**Legal Frameworks:**
- [GDPR Full Text](https://gdpr.eu/)
- [Article 5 GDPR — Processing Principles](https://gdpr-info.eu/art-5-gdpr/)
- [Article 25 GDPR — Data Protection by Design](https://gdpr-info.eu/art-25-gdpr/)
- [NIST Privacy Framework](https://www.nist.gov/privacy-framework)

**Dark Patterns:**
- [EDPB Guidelines on Dark Patterns](https://www.edpb.europa.eu/news/news/2022/edpb-adopts-guidelines-art-60-gdpr-guidelines-dark-patterns-social-media-platform_en)
- [How Dark Patterns Impact GDPR Compliance — FairPatterns](https://www.fairpatterns.com/post/how-dark-patterns-impact-gdpr-compliance)
- [Dark Patterns and Consent — Usercentrics](https://usercentrics.com/knowledge-hub/dark-patterns-and-how-they-affect-consent/)
- [Are Dark Patterns Illegal in 2026? — Ketch](https://www.ketch.com/blog/posts/dark-patterns-are-they-illegal)

**Contextual Integrity:**
- [Privacy as Contextual Integrity — Helen Nissenbaum](https://digitalcommons.law.uw.edu/wlr/vol79/iss1/10/)
- [Contextual Integrity — Wikipedia](https://en.wikipedia.org/wiki/Contextual_integrity)
- [CI Roadmap for Qualitative Research (2024)](https://pearl.umd.edu/wp-content/uploads/2024/04/Kumar_etal-2024-CSCW-CI.pdf)

**Implementation:**
- [Privacy by Design GDPR Guide — SecurePrivacy](https://secureprivacy.ai/blog/privacy-by-design-gdpr-2025)
- [Data Minimization — EPIC](https://epic.org/issues/consumer-privacy/data-minimization/)
- [Data Minimization Global Trends — IAPP](https://iapp.org/news/a/data-minimization-an-increasingly-global-concept)

**Advocacy:**
- [Electronic Frontier Foundation — Privacy](https://www.eff.org/issues/privacy)
- [Privacy in Context — Nissenbaum (Book)](https://www.sup.org/books/title/?id=8862)

---

## See Also

- [Trust & Perception](/emotions-motivation/trust-perception/) — Building user trust
- [Defensive Design](/decision-making-errors/defensive-design/) — Preventing privacy mistakes
- [Form Design Playbook](/checklists-playbooks/form-design-playbook/) — Data collection best practices
- [Content & Microcopy Templates](/checklists-playbooks/content-microcopy-templates/) — Privacy-respecting language
