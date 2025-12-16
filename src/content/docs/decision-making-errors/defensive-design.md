---
title: Defensive Design (Error Prevention & Recovery)
description: "Build guardrails: validate early, allow undo, and recover state after failure."
---
## Tactics

- Inline validation; idempotent actions; retry with backoff.
- Undo/rollback; autosave and drafts; clear error messages.

## References

- Nielsen, J. — Error Prevention & Recognition rather than Recall (Heuristics).
- Microsoft Resiliency Patterns; Google SRE — Idempotency and retries.
