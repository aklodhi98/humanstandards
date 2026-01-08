---
title: Multi-user Scenarios
description: Design collaboration with roles, presence, and conflict resolution.
---

When multiple people use the same system — whether collaborating in real-time, sharing access, or working asynchronously — new challenges emerge. Who can do what? Who's working on what right now? What happens when two people edit the same thing?

Multi-user collaborative interfaces must account for a broader range of requirements than single-user interfaces: role differentiation, presence awareness, conflict resolution, and communication channels between users.

---

## Collaboration Specifications

### Collaboration Patterns

| Pattern | Description | Examples | Key Challenge |
|---------|-------------|----------|---------------|
| **Real-time co-editing** | Multiple users editing simultaneously | Google Docs, Figma | Conflict resolution |
| **Asynchronous collaboration** | Users contribute at different times | GitHub, Notion | Context and handoffs |
| **Review/approval workflows** | Sequential with gates | Document approval, code review | Status visibility |
| **Shared access** | Multiple users, usually not simultaneous | Family accounts, team dashboards | Permission clarity |
| **Multiplayer experiences** | Coordinated real-time interaction | Collaborative games, virtual meetings | Synchronization |

### Role Hierarchy Standards

| Role | Create | Edit | Comment | View | Manage Users | Delete | Transfer |
|------|--------|------|---------|------|--------------|--------|----------|
| **Owner** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Admin** | ✓ | ✓ | ✓ | ✓ | ✓ | | |
| **Editor** | ✓ | ✓ | ✓ | ✓ | | | |
| **Commenter** | | | ✓ | ✓ | | | |
| **Viewer** | | | | ✓ | | | |

### Presence Indicator States

| State | Indicator | Example |
|-------|-----------|---------|
| **Active now** | Green dot, live cursor | Currently editing |
| **Idle** | Yellow dot | Window unfocused 5+ min |
| **Away** | Gray dot | No activity 15+ min |
| **Offline** | No indicator or hollow dot | Disconnected |
| **Do Not Disturb** | Red dot | Explicitly set by user |

---

## Validation Rules

```yaml
multi_user_validation:
  rules:
    - id: roles-clearly-defined
      severity: error
      check: "Each role has documented capabilities"
      includes:
        - what_role_can_do
        - what_role_cannot_do
        - how_to_request_elevated_access

    - id: permission-denial-explained
      severity: error
      check: "Disabled actions explain why they're unavailable"
      bad: "Grayed-out delete button with no explanation"
      good: "'Delete' — Only workspace owners can delete. Request access"

    - id: presence-visible
      severity: warning
      check: "Real-time collaborators visible when in same space"
      includes:
        - avatar_or_cursor
        - current_location_indicator
        - activity_state

    - id: collision-prevention
      severity: error
      check: "Simultaneous edit conflicts handled gracefully"
      options:
        - automatic_merge
        - soft_lock_with_notification
        - explicit_conflict_resolution_ui

    - id: work-never-lost
      severity: error
      check: "No user's work is silently discarded"
      rationale: "Losing work destroys trust"

    - id: audit-trail-available
      severity: warning
      check: "Changes tracked with author attribution"
      includes:
        - version_history
        - activity_feed
        - change_notifications

    - id: handoff-context
      severity: warning
      check: "Async handoffs include sufficient context"
      includes:
        - status_indicator
        - assigned_next_actor
        - notes_explaining_changes

    - id: ownership-clear
      severity: error
      check: "Every item has clear ownership"
      rationale: "Orphaned items create confusion"
```

---

## Roles and Permissions

### Define Clear Roles

Match roles to your users' actual needs. Too few roles force workarounds; too many roles cause confusion.

**Common role patterns:**

| Role | Description | Use Case |
|------|-------------|----------|
| **Owner** | Full control, can delete and transfer ownership | Original creator, account holder |
| **Admin** | Manage settings and users, but not delete workspace | Team leads, IT administrators |
| **Editor** | Create and modify content | Team members, contributors |
| **Commenter** | Add comments but not edit content | Stakeholders, reviewers |
| **Viewer** | Read-only access | External partners, guests |

### Custom Role Considerations

Some products need granular permissions beyond standard roles:

```
┌─────────────────────────────────────────────┐
│  Custom Role: Content Manager               │
├─────────────────────────────────────────────┤
│  ✓ Create blog posts                        │
│  ✓ Edit blog posts                          │
│  ✓ Publish to staging                       │
│  ✗ Publish to production                    │
│  ✓ Manage media library                     │
│  ✗ Manage user accounts                     │
│  ✗ Access billing settings                  │
└─────────────────────────────────────────────┘
```

### Make Permissions Visible

Users should always understand:
- What they can and can't do
- Why an action is unavailable
- How to request elevated access

**Don't just disable buttons — explain why:**

| Bad | Better |
|-----|--------|
| [Delete] (grayed out) | [Delete] → "Only owners can delete this workspace" |
| [Publish] (invisible) | [Publish] → "Editors can't publish. Request access from @admin" |
| Error: "Permission denied" | "You need Editor access to make changes. Request access" |

### Permission Request Flow

```
User clicks disabled action
        │
        ▼
┌─────────────────────────────┐
│ "You need Editor access to  │
│  edit this document."       │
│                             │
│  [Request Access]  [Cancel] │
└─────────────────────────────┘
        │
        ▼ (if Request Access)
┌─────────────────────────────┐
│ Request sent to:            │
│  @Sarah (Owner)             │
│                             │
│ Add a message: [___________]│
│                             │
│        [Send Request]       │
└─────────────────────────────┘
        │
        ▼
Owner receives notification
        │
        ▼
┌─────────────────────────────┐
│ @John requested Editor      │
│ access to "Q4 Report"       │
│                             │
│ "Need to add budget data"   │
│                             │
│  [Approve] [Deny] [Discuss] │
└─────────────────────────────┘
```

---

## Presence Awareness

### Show Who's Here

When multiple users can be in the same space:
- **Display avatars or cursors** for active users
- **Indicate what others are viewing** or editing
- **Distinguish between states** — online now vs. was here recently

### Presence UI Patterns

| Pattern | Best For | Example |
|---------|----------|---------|
| **Avatar stack** | Documents, files | 3 avatars + "+2 more" |
| **Live cursors** | Canvas tools, whiteboards | Labeled cursor with name |
| **Sidebar list** | Team spaces | List of online members |
| **Inline indicators** | Specific locations | "Sarah is editing this section" |

### Cursor and Selection Design

For real-time co-editing with cursors:

```
┌──────────────────────────────────────────────────┐
│                                                  │
│  The quick brown fox jumps over the lazy dog.   │
│           ▲                                      │
│    ┌──────┴──────┐                              │
│    │ Sarah Chen  │ (blue cursor)                │
│    └─────────────┘                              │
│                                                  │
│  Lorem ipsum dolor sit amet, consectetur...     │
│                    █████████████████            │
│                    ▲                            │
│             ┌──────┴──────┐                     │
│             │ John Smith  │ (purple selection)  │
│             └─────────────┘                     │
└──────────────────────────────────────────────────┘
```

**Cursor color assignment:**
- Consistent color per user session
- High contrast against background
- Distinct from selection highlight
- Accessible to colorblind users (use patterns/labels)

---

## Conflict Resolution

### Operational Transformation (OT)

OT has been the core technique for real-time co-editing since the late 1980s. It transforms operations to maintain consistency when concurrent edits occur.

**How it works:**
1. User A types "Hello" at position 0
2. User B types "World" at position 0 (simultaneously)
3. OT transforms B's operation: insert at position 5 (after "Hello")
4. Both users see "HelloWorld"

### CRDTs (Conflict-free Replicated Data Types)

Alternative to OT, where operations are designed to be naturally commutative — they can be applied in any order and produce the same result.

| Approach | Pros | Cons |
|----------|------|------|
| **OT** | Well-established, widely used | Complex implementation, puzzles |
| **CRDT** | Mathematically sound, works offline | Memory overhead, less common |

### Conflict Resolution Strategies

| Strategy | When to Use | User Experience |
|----------|-------------|-----------------|
| **Auto-merge** | Non-overlapping changes | Seamless, no intervention |
| **Last-write-wins** | Low-stakes content | Simple, but may lose work |
| **Soft locks** | Sequential editing preferred | "Sarah is editing this section" |
| **Hard locks** | Data integrity critical | "Locked by Sarah — request access" |
| **Fork and merge** | Complex conflicts | Git-style branching |
| **Manual resolution** | Overlapping changes | Show both versions, user chooses |

### Conflict Resolution UI

When auto-merge isn't possible:

```
┌────────────────────────────────────────────────┐
│  Conflict detected in "Budget Summary"         │
├────────────────────────────────────────────────┤
│                                                │
│  Your version:              Sarah's version:   │
│  ┌──────────────────┐      ┌──────────────────┐│
│  │ Total: $45,000   │      │ Total: $52,000   ││
│  │ Updated 2:15 PM  │      │ Updated 2:14 PM  ││
│  └──────────────────┘      └──────────────────┘│
│                                                │
│  [Keep yours] [Keep Sarah's] [Keep both] [Edit]│
│                                                │
└────────────────────────────────────────────────┘
```

### Soft Locking Pattern

For edit-in-place scenarios where hard locks are too restrictive:

```
User opens section for editing
        │
        ▼
┌─────────────────────────────────────┐
│  Section: Executive Summary         │
│  🔒 Being edited by @Sarah          │
│                                     │
│  [View only] [Request edit] [Notify │
│                              when   │
│                              done]  │
└─────────────────────────────────────┘
```

### The Golden Rule

> **Never silently discard anyone's work.**

If there's any possibility of data loss, warn the user and offer recovery options.

---

## Decision Logic for Conflict Handling

```pseudo
FUNCTION handleConcurrentEdit(editA, editB):
  // Check if edits overlap
  IF NOT overlaps(editA.range, editB.range):
    // Non-overlapping edits: auto-merge
    RETURN autoMerge(editA, editB)

  // Check if one is clearly newer
  IF editA.timestamp - editB.timestamp > STALE_THRESHOLD:
    // Significant time difference: warn about overwrite
    RETURN promptOverwrite(editA, editB)

  // Simultaneous overlapping edits
  IF content.criticality == "high":
    // Critical content: require manual resolution
    RETURN showConflictResolutionUI(editA, editB)

  ELSE IF editA.user.role > editB.user.role:
    // Role-based precedence (optional)
    RETURN applyWithNotification(editA, notify=editB.user)

  ELSE:
    // Default: show both, let users resolve
    RETURN showConflictResolutionUI(editA, editB)
```

---

## Audit Trails

### Track Who Did What

For shared workspaces, transparency builds trust and enables accountability.

| Component | Purpose | Retention |
|-----------|---------|-----------|
| **Version history** | Full document snapshots | Indefinite or configurable |
| **Activity feed** | Recent changes stream | Rolling window (30-90 days) |
| **Change notifications** | Alert relevant users | Real-time + digest options |
| **Diff view** | Compare versions | On-demand |

### Activity Feed Design

```
┌─────────────────────────────────────────────────┐
│  Activity in "Q4 Planning"                      │
├─────────────────────────────────────────────────┤
│  Today                                          │
│  ┌──────────────────────────────────────────┐  │
│  │ 🖊 Sarah edited "Budget Summary"          │  │
│  │   2:45 PM · View changes                  │  │
│  └──────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────┐  │
│  │ 💬 John commented on "Timeline"           │  │
│  │   1:30 PM · "Should we push Q4 launch?"   │  │
│  └──────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────┐  │
│  │ 👤 Alex was added as Editor               │  │
│  │   11:00 AM · Added by Sarah               │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  Yesterday                                      │
│  ┌──────────────────────────────────────────┐  │
│  │ 📄 Document created                        │  │
│  │   3:15 PM · By Sarah                       │  │
│  └──────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

---

## Communication Within the System

### In-Context Collaboration

| Feature | Description | Best Practice |
|---------|-------------|---------------|
| **Comments** | Anchored to specific content | Thread replies, resolve action |
| **@mentions** | Notify specific users | Autocomplete, role mentions |
| **Reactions** | Quick acknowledgment | Limited set, not distracting |
| **Threads** | Group related discussion | Collapse when resolved |

### Comment Anchoring

Comments should attach to specific content, not float freely:

```
┌─────────────────────────────────────────────────┐
│  "Our Q4 revenue target is $2.5M"               │
│                              │                  │
│                    ┌─────────▼──────────┐       │
│                    │ 💬 2 comments       │       │
│                    │                     │       │
│                    │ @John: Is this      │       │
│                    │ conservative enough?│       │
│                    │                     │       │
│                    │ @Sarah: Based on Q3 │       │
│                    │ actuals, yes.       │       │
│                    │                     │       │
│                    │ [Reply] [Resolve]   │       │
│                    └─────────────────────┘       │
└─────────────────────────────────────────────────┘
```

### Notifications

Balance awareness against interruption:

| Event | Notification | Timing |
|-------|--------------|--------|
| **Direct mention** | Push + email | Immediate |
| **Assigned task** | Push + email | Immediate |
| **Comment on your content** | Push | Immediate |
| **Others' edits** | Badge count | Batched hourly |
| **Workspace activity** | Digest | Daily/weekly |

**User controls:**
- Per-workspace notification levels
- Quiet hours
- Channel preferences (push, email, in-app)

---

## Handoffs and Async Work

### Status Indicators

Clear workflow states prevent confusion about what needs action:

| Status | Meaning | Who Acts Next |
|--------|---------|---------------|
| **Draft** | Work in progress | Author |
| **Ready for Review** | Author is done | Reviewer |
| **Changes Requested** | Reviewer needs updates | Author |
| **Approved** | Ready to proceed | Publisher/Next stage |
| **Published/Complete** | Final state | No one |

### Assignment Clarity

```
┌─────────────────────────────────────────────────┐
│  Document: Q4 Marketing Plan                    │
│  Status: Ready for Review                       │
├─────────────────────────────────────────────────┤
│  Current step: Legal review                     │
│  Assigned to: @Legal Team                       │
│  Due: January 15, 2025                          │
│                                                 │
│  Previous: @Marketing (completed Jan 10)        │
│  Next: @Executive (after Legal approves)        │
│                                                 │
│  [View history] [Reassign] [Add note]           │
└─────────────────────────────────────────────────┘
```

### Handoff Notes

Allow users to explain context when passing work:

```
┌─────────────────────────────────────────────────┐
│  Hand off to @Legal Team                        │
├─────────────────────────────────────────────────┤
│  Add a note for the next reviewer:              │
│  ┌───────────────────────────────────────────┐ │
│  │ Please pay special attention to the       │ │
│  │ influencer agreement terms in Section 3.  │ │
│  │ We updated the payment structure.         │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│  [Send handoff]                                 │
└─────────────────────────────────────────────────┘
```

---

## Edge Cases

### Users with the Same Name

| Solution | Implementation |
|----------|----------------|
| **Show username/handle** | "@john_smith" vs "@john_doe" |
| **Add discriminator** | "John Smith (Marketing)" |
| **Use avatars prominently** | Visual differentiation |
| **Show email domain** | "john@corp.com" vs "john@agency.com" |

### Users Who Leave

```pseudo
FUNCTION handleUserDeparture(user, workspace):
  // Transfer ownership of user's content
  FOR each item IN user.owned_items:
    IF item.shared:
      item.owner = workspace.default_owner OR admin
      notifyNewOwner(item)
    ELSE:
      item.status = "orphaned"
      promptAdminForDisposition(item)

  // Handle in-progress items
  FOR each item IN user.assigned_items:
    item.assigned_to = null
    notifyStakeholders("Unassigned: " + item)

  // Preserve history
  user.status = "departed"
  user.display_name = user.name + " (Former)"
  // Don't delete: preserve audit trail
```

### Permission Changes During Active Session

```
User editing with Editor permissions
        │
        ▼ (Admin removes Editor permission)
┌─────────────────────────────────────────────┐
│  Your permissions have changed              │
│                                             │
│  You now have Viewer access to this         │
│  document. Your unsaved changes:            │
│                                             │
│  [Save to personal copy] [Discard] [View    │
│                                    diff]    │
└─────────────────────────────────────────────┘
```

### Preventing Accidental Oversharing

**Before sharing:**
```
┌─────────────────────────────────────────────────┐
│  Share "Confidential: Salary Data"              │
├─────────────────────────────────────────────────┤
│  ⚠️ This document contains sensitive content    │
│                                                 │
│  Current access: 2 people (you, @HR Director)   │
│                                                 │
│  You're about to add:                           │
│  • @all-company (347 people)                    │
│                                                 │
│  Are you sure? This will share salary data      │
│  with the entire company.                       │
│                                                 │
│  [Cancel] [Share anyway]                        │
└─────────────────────────────────────────────────┘
```

---

## Recent Research (2024-2025)

### CSCW 2024

The 27th ACM SIGCHI Conference on Computer-Supported Cooperative Work & Social Computing (CSCW 2024) was held in San José, Costa Rica — the first time CSCW was held in Latin America. The conference continues to explore technical, social, material, and theoretical challenges of designing technology to support collaborative work.

### OT vs CRDT Debate Continues

Research shows that despite broad claims of CRDT superiority, OT remains the choice for building the vast majority of today's co-editors. CRDT is rarely found in working production systems, though it offers theoretical advantages for offline-first applications.

### AI-Enhanced Collaboration

Tools like Figma have introduced AI into collaborative features (FigJam AI) for organizing ideas and generating design elements. The trend toward AI-assisted collaboration is accelerating, with AI helping to summarize discussions, suggest next steps, and identify conflicts before they occur.

### Inclusive Collaboration Design

2024 research emphasizes creating products for diverse user groups in collaborative contexts. Involving users with different cultural backgrounds, ages, and accessibility needs in multi-user design is becoming a priority.

---

## References

**CSCW Research:**
- [CSCW 2024 Conference](https://cscw.acm.org/2024/)
- [Computer-supported Cooperative Work — Wikipedia](https://en.wikipedia.org/wiki/Computer-supported_cooperative_work)
- [CSCW Journal — Springer](https://link.springer.com/journal/10606)

**Collaboration Tools:**
- [Google Docs API — Building Collaborative Experiences](https://developers.google.com/docs/api)
- [Figma — Multiplayer Design](https://www.figma.com/blog/design-systems-at-figma/)
- [Best Tools for Real-Time Design Collaboration — UXPin](https://www.uxpin.com/studio/blog/best-tools-for-real-time-design-collaboration/)

**Conflict Resolution:**
- [Operational Transformation Research — ResearchGate](https://www.researchgate.net/publication/220879550_Operational_transformation_for_orthogonal_conflict_resolution_in_real-time_collaborative_2D_editing_systems)
- [OT Algorithm Performance — Springer](https://link.springer.com/article/10.1007/s10606-005-9008-6)

**Design Guidance:**
- [A Complete Guide to Collaborative UX Design — UXtweak](https://blog.uxtweak.com/collaborative-ux-design/)
- [ISO 9241-110 — Interaction Principles](https://www.iso.org/standard/75258.html)
- [Task- and Role-Oriented Multi-User Design — PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11945408/)

---

## See Also

- [Social Norms & Privacy](/social-cultural/social-norms-privacy/) — Privacy in shared spaces
- [Notifications & Feedback](/interaction-patterns/notifications-feedback/) — Alert design
- [Defensive Design](/decision-making-errors/defensive-design/) — Preventing errors in collaborative contexts
- [Trust & Perception](/emotions-motivation/trust-perception/) — Building trust in multi-user systems
