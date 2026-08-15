# Human Standards Held-out Development Comparison 002

Status: frozen before recorded runs
Date frozen: 2026-08-15 Australia/Sydney

## Purpose

Test whether the candidate Human Standards MCP completion contract changes how
one Codex run implements and verifies keyboard selection and focus transitions
on a task that was not used in Study 001.

This is a four-artifact development comparison with one run per condition. It
is not powered for a causal claim and it does not include independent blinded
human review. Coordinator observations and automated checks must remain
separate.

## Subject

A fictional Wattle Bay Council hard-waste pickup booking flow implemented as a
dependency-free static web application. The task specification defines required
outcomes and test states without prescribing a visual or component solution.

## Frozen execution settings

- Codex CLI: 0.147.0
- Model: gpt-5.6-sol
- Reasoning effort: high
- Execution: sequential, ephemeral, workspace-write sandbox
- Common task: `starter/TASK.md`
- Common implementation prompt: `control/common-prompt.md`
- No reruns for model or implementation failures; rerun only for confirmed
  infrastructure failure before the agent begins the task.

## Conditions

| ID | Condition | Treatment |
|---|---|---|
| A | Baseline | No Human Standards MCP and no frozen Human Standards context. |
| B | Legacy directed MCP | Published `@humanstandards/mcp-server@0.3.0`, with an instruction to use it actively. |
| C | Candidate directed MCP | Local candidate `0.3.1` at Human Standards commit `c93e9d30f54baac1cb5a38603b555e33d067493a`, with the same MCP-use instruction. |
| D | Frozen candidate context | No MCP. The candidate completion contract is supplied verbatim in `FROZEN_CONTEXT.md`. |

## Frozen package and context identities

- Published package: `@humanstandards/mcp-server@0.3.0`
- Published package integrity: `sha512-n+6RMQWLKykUsoKpYyjZvGqAr5R88LPJhomoKwOie9AiB7KfccCuR/8YSP+QDzTsszWVqqN4F98N0h5YymVP9w==`
- Candidate package: `0.3.1`
- Candidate source commit: `c93e9d30f54baac1cb5a38603b555e33d067493a`
- Candidate standards-index SHA-256: `1b6b7a545b6eeb1dc6c867b745307686f0feae5af362da2afd6d25451f739c5d`
- Frozen context SHA-256: recorded in `manifest.txt` before the runs.

## Recorded evidence

- The complete files produced by each condition.
- The final Codex handoff message for each condition.
- MCP calls visible in the recorded command stream for directed conditions.
- Automated browser-state results for every condition.
- Current-run screenshots, captured at the same wide and narrow viewports.
- Coordinator observations tied to current-run screenshots.

## Outcome boundaries

- Missing or unreachable evaluator states remain missing, not passes.
- Static source inspection or an automated scan is not evidence that keyboard
  and focus behaviour was exercised.
- Automated behaviour, accessibility-relevant findings, coordinator
  observations, and any future independent scores are reported separately.
- Study 001 artifacts, prompts, rubrics, checksums, and results are not reused or
  edited.
