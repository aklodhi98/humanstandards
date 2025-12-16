---
title: Multi-user Scenarios
description: Design collaboration with roles, presence, and conflict resolution.
---

When multiple people use the same system — whether collaborating in real-time, sharing access, or working asynchronously — new challenges emerge. Who can do what? Who's working on what right now? What happens when two people edit the same thing?

## Roles and permissions

### Define clear roles

Common role patterns:

- **Owner**: Full control, can delete and transfer ownership
- **Admin**: Can manage settings and users, but not delete the workspace
- **Editor**: Can modify content
- **Commenter**: Can add comments but not edit content
- **Viewer**: Read-only access

Match roles to your users' actual needs. Too few roles force workarounds; too many roles cause confusion.

### Make permissions visible

Users should always understand:
- What they can and can't do
- Why an action is unavailable
- How to request elevated access

Don't just disable buttons — explain why they're disabled.

### Audit trails

For shared workspaces, track who did what and when. This builds trust and enables accountability:

- Version history with author attribution
- Activity feeds showing recent changes
- Change notifications to relevant users

## Presence awareness

### Show who's here

When multiple users can be in the same space:
- Display avatars or cursors for active users
- Indicate what others are viewing or editing
- Distinguish between "online now" and "was here recently"

### Prevent collisions

If two people can't edit the same thing simultaneously:
- Lock sections being edited
- Show who holds the lock
- Provide a way to request access or notify the editor

### Handle conflicts gracefully

When simultaneous edits occur:
- Merge automatically when safe (e.g., edits to different paragraphs)
- Prompt users to resolve conflicts when changes overlap
- Never silently discard anyone's work

Google Docs handles this well — it merges what it can and highlights conflicts for resolution.

## Communication within the system

### In-context collaboration

- **Comments**: Anchored to specific content, not just the page
- **@mentions**: Notify specific users when their input is needed
- **Threads**: Keep related discussions grouped

### Notifications

Balance awareness against interruption:
- Notify on direct mentions and assignments
- Batch updates about others' edits
- Let users configure notification levels per workspace

## Handoffs and async work

Not all collaboration is real-time. Design for handoffs:

- **Status indicators**: Draft, In Review, Approved, Published
- **Assignment**: Clear ownership of who should act next
- **Due dates and reminders**: Without turning into a project management tool
- **Notes and context**: Allow users to explain what they did and why

## Edge cases to consider

- What happens when users have the same name?
- How do you handle users who leave the organization?
- What if someone's permissions change while they're editing?
- How do you prevent accidental sharing with the wrong people?

## References

- Google — Building collaborative experiences: https://developers.google.com/docs/api
- Figma — Multiplayer design: https://www.figma.com/blog/design-systems-at-figma/
- ISO 9241-110 — Interaction principles for collaborative systems: https://www.iso.org/standard/75258.html
