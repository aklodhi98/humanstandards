# Study 001 Protocol: Community Clinic Appointment Flow

- Status: all 9 recorded runs and automated evaluations complete; blinded human review pending
- Protocol version: 0.6.3
- Date established: 2026-08-10
- Study type: exploratory, controlled comparative benchmark

## 1. Research question

When an AI coding agent receives the same product specification and starter
application, does a directed Human Standards MCP retrieval workflow change the
usability, accessibility, functional completeness, or robustness of the
generated interface?

The study evaluates one model-and-agent configuration on one bounded product
task. It is not human-participant research, a randomized clinical trial, or
evidence that results generalize to every model, tool, interface, or user.

## 2. Decision this study supports

The study should help decide:

1. whether Human Standards MCP access produces a credible directional benefit;
2. whether agents discover and use the MCP without special prompting;
3. whether any observed benefit comes from standards knowledge generally or
   from self-directed MCP retrieval; and
4. which MCP retrieval or product-discovery weaknesses should be improved before
   broader promotion.

Publication is not conditional on a positive result.

## 3. Study subject

The generated product is a responsive frontend for the fictional Harbour
Community Clinic. It supports booking, viewing, rescheduling, and cancelling an
appointment against a deterministic mock API.

The subject was selected because it combines a clear task with consequential
choices, time-slot discovery, personal information, asynchronous state,
recoverable failures, and cancellation. These give automated tests and blind
reviewers observable behaviour to evaluate without requiring a real healthcare
backend or real patient data.

The authoritative product requirements are in
[`../tasks/clinic-appointment/spec.md`](../tasks/clinic-appointment/spec.md).

## 4. Experimental unit and sample

The experimental unit is one fresh, autonomous model-generation session.

- 3 conditions
- 3 independent runs per condition
- 9 recorded runs total
- the final excluded protocol 0.6.3 dry-run set is `D-A02`, `D-B03`, and
  `D-C02`; all 3 are retained separately
- 1 additional excluded Condition B discovery rehearsal (`D-B02`) tests the
  material server-instruction change before any recorded inputs are refrozen
- within the final set, directed Condition B rehearsal `D-B03` also provides an
  excluded efficacy comparison after ambient discovery failed

The sample is intended to expose run-to-run variability and support a transparent
case study. It is too small for strong inferential or universal claims. Results
will be reported as individual values, medians, ranges, and proportions; no
statistical-significance claim is planned.

## 5. Conditions

### A. Baseline

The agent receives the starter repository, product specification, standard run
prompt, and ordinary coding tools. It receives no Human Standards MCP, no Human
Standards files, and no network or browser access to humanstandards.org.

### B. MCP directed

The agent receives exactly the baseline environment plus the pinned Human
Standards MCP server. The prompt directs the agent to retrieve relevant guidance
from that server before implementing, apply the retrieved guidance, and name the
consulted Human Standards material in its final response. MCP calls, queries,
empty results, returned content, and cited material are recorded.

Failure to follow the directed MCP instruction is a model outcome, not grounds
for rerunning or excluding a session.

### C. Frozen context

The agent receives the baseline environment plus a static reference packet
generated before recorded runs using the recipe in
[`../controls/study-001-context-recipe.md`](../controls/study-001-context-recipe.md).
It receives no MCP tools.

This is a diagnostic control. It helps distinguish access to relevant standards
content from the agent's ability to retrieve that content through MCP. It is not
assumed to be token-equivalent to the other conditions; input-token differences
will be reported.

## 6. Fixed Human Standards source

The MCP treatment and frozen-context recipe are pinned to:

- Human Standards commit: `55e21f80fbd71e4a69f2217e2762094412063ad4`
- MCP package version: `0.2.1`
- Standards index SHA-256:
  `78d25ae76a4ffd1ebb3fcb955c1af460962a3b570d3670a8616ab2243566b526`
- Frozen context packet SHA-256:
  `7328b149c7b34c0cc08201b14223c5d958cb96b33110512b153e7e55b0de31e6`
- Transport: local stdio
- Exposed tools: `get_heuristic`, `get_all_heuristics`, `search_standards`,
  `get_standard`

The pinned MCP is a read-only reference service. This study therefore tests the
effect of reference retrieval on agent output. It must not be described as an
automated Human Standards validation test.

Version `0.2.1` recursively indexes all 66 source documents. Search returns
ranked excerpts from the indexed content, and `get_standard` returns the actual
document or a named section. It also provides initialization instructions that
identify applicable interface tasks and the search-to-retrieval workflow. The
server fails closed when its index is absent or invalid.

## 7. Selected agent configuration

Study 001 uses Codex CLI `0.147.0`, authenticated through the existing ChatGPT
account rather than an OpenAI API key. The selected model is `gpt-5.6-sol` with
reasoning effort fixed to `medium` and the default service tier.

The complete provisional configuration and billing guardrails are in
[`../controls/study-001-agent-configuration.md`](../controls/study-001-agent-configuration.md).

The baseline, MCP, and frozen-context conditions use this identical client,
model, reasoning effort, service tier, system instructions, and ordinary tool
set. No condition may fall back to another model or authentication route.

User configuration is ignored, so configured non-study MCP servers are not
loaded. Apps, browser control, computer use, image generation, memories,
multi-agent delegation, plugins, remote plugins, tool suggestions, workspace
dependencies, and web search are disabled. Condition B receives only the
explicitly configured pinned `human_standards` MCP server; Conditions A and C
receive no inline MCP configuration.

## 8. Variables that must be frozen before recorded runs

The run manifest must record:

- model provider and exact model identifier;
- coding-agent/client name and version;
- model settings exposed by the client;
- fixed browser clock and timezone;
- complete system and user prompts;
- token, wall-clock, and turn limits;
- available tools and filesystem boundary;
- runtime, package manager, operating system, and architecture;
- starter commit and lockfile checksum;
- specification and rubric checksums;
- MCP command, commit, version, and index checksum;
- frozen-context packet checksum;
- run-order generation method and output; and
- dry-run identifiers.

Changing any frozen input after the first recorded run creates a new protocol
version and requires restarting all recorded runs.

Each generation run has a 30-minute wall-clock limit. Codex CLI exposes no
stable per-run token or turn cap, so those limits are fixed as unset and actual
usage is retained from the JSONL transcript. Subscription exhaustion stops the
study before the next run; it does not authorize a fallback model or billing
route.

## 9. Run prompts

Unless the selected client requires a mechanically different wrapper, the base
user prompt is:

> Implement the product specification in this repository. Work autonomously and
> complete the application using only the files and tools available in this
> session. Do not browse the internet or access files outside this workspace. Do
> not ask follow-up questions. Run the provided checks before finishing.

Condition B appends this treatment instruction as a separate instruction group:

> Before implementing the interface, use the available Human Standards MCP
> server to retrieve guidance relevant to this product specification. Apply the
> retrieved guidance throughout the build. In your final response, name the
> Human Standards documents or heuristics you consulted.

Conditions A and C receive only the base prompt. The specification is provided
as a file in the isolated workspace. No opaque condition code or run identifier
appears in the prompt or product files.

## 10. Isolation and contamination controls

Every run starts from the same clean starter commit in a new directory.

The browser clock is fixed to `2026-09-07T10:00:00+10:00` and the browser
timezone to `Australia/Sydney` so relative-date behaviour cannot drift between
runs or later reproduction.

- The Human Standards repository is not mounted or readable.
- The studies repository is not readable except for the copied task workspace.
- Internet browsing and arbitrary URL fetching are unavailable.
- No prior run, transcript, output, screenshot, or evaluation is readable.
- Package installation from the network is disabled.
- Ordinary coding tools are identical across conditions.
- Only Condition B can list or call the pinned MCP tools.
- Only Condition C contains the frozen reference packet.

Model-generated shell commands use a custom Codex permission profile. It grants
read access only to the minimal operating-system runtime, grants write access to
the fresh run workspace, denies other filesystem paths, and disables shell
network access. Codex web search and non-coding integration features are
separately disabled, while ignored user configuration prevents configured MCP
servers from loading. The Codex client itself retains the network access
required to reach OpenAI through the authenticated ChatGPT account.

Before recorded runs, the harness must prove that baseline sessions cannot locate
Human Standards files or tools and that MCP calls succeed only in Condition B.

## 11. Run order and identifiers

Runs use opaque identifiers `R001` through `R009`. Conditions are assigned in
three blocks containing one run of each condition. Within each block, condition
order is determined by sorting the SHA-256 values of:

```text
<protocol-freeze-commit>:<block-number>:<condition-code>
```

The generated mapping is committed before recorded runs. Review artifacts use a
second set of opaque IDs with the mapping withheld from reviewers until their
scores are locked.

## 12. Intervention and rerun policy

Recorded sessions receive no human corrections, retries, follow-up prompts, or
selective extensions.

A run may be replaced only when an infrastructure failure outside the model's
control is identified before output quality is inspected, such as a provider
outage, runner crash, corrupt starter copy, or unavailable MCP process in the MCP
condition. The failed attempt and reason remain in the evidence package.

Model-produced build failures, incomplete work, unused MCP tools, poor design,
and time-limit exhaustion are study outcomes and are not rerun.

## 13. Outcomes

Three primary outcomes are fixed in
[`../rubrics/interface-quality-v1.yml`](../rubrics/interface-quality-v1.yml):

1. critical functional scenario pass rate;
2. critical and serious automated accessibility violation count; and
3. normalized blinded human-centred quality score.

Guardrails are build success, specification adherence, and absence of invented
network dependencies or real-data collection.

Diagnostics include individual acceptance scenarios, reviewer dimensions,
tokens, elapsed time, files changed, MCP calls, query terms, non-empty retrievals,
and retrieved-document identifiers.

No numeric threshold for declaring the MCP a success is set for this exploratory
study because no comparable baseline has yet been measured. All runs and all
primary outcomes will be shown. Any positive conclusion must be directional,
conditioned on this task and setup, and accompanied by guardrail results.

## 14. Automated evaluation

The harness will evaluate a production build in a fresh browser context. It will
cover the acceptance scenarios listed in
[`../tasks/clinic-appointment/acceptance-tests/README.md`](../tasks/clinic-appointment/acceptance-tests/README.md),
run axe against defined states and viewports, and capture screenshots and logs.

The evaluator is pinned to Playwright `1.62.1`, axe-core `4.12.1`, and the
Playwright Chromium revision for browser version `151.0.7922.34`. It blocks
non-local browser requests, fixes the clock and timezone, resets the API before
each scenario, and uses accessible roles, names, labels, and rendered text to
navigate unknown generated interfaces. Semantic anchors may be corrected during
the three excluded dry runs, but are frozen before recorded runs.

Automated checks must not be modified after recorded outputs are viewed. A
material defect discovered later must be documented and applied to every output;
original and corrected results must both remain available.

## 15. Blinded review

Two reviewers independently score rendered outputs using the frozen rubric.
They receive:

- the product specification;
- an opaque review URL or artifact ID;
- scripted tasks and test data; and
- the rubric instructions.

They do not receive condition labels, transcripts, source comments, MCP logs,
automated scores, or other reviewers' scores. Scores are locked before the
condition mapping is revealed. Disagreements are reported; they are not silently
resolved into a preferred score.

## 16. Analysis

For every outcome and condition, report all run values plus median and range.
For pass/fail outcomes, also report the numerator and denominator. Report MCP
uptake separately from outcome quality.

The report must distinguish:

- MCP available from MCP actually used;
- standards knowledge from MCP delivery;
- functional correctness from interface quality;
- automated findings from reviewer judgement; and
- observed results from explanations inferred after the fact.

## 17. Publication gates

Study 001 may be adapted for the Human Standards site only when:

1. this protocol, specification, rubric, prompts, and control recipe are frozen;
2. the starter and harness are reproducible from a clean checkout;
3. isolation tests pass;
4. dry runs are complete and excluded;
5. all 9 recorded runs or documented infrastructure replacements are present;
6. automated evaluation is complete for every run;
7. two blinded reviews per evaluable output are locked;
8. analysis includes every run and primary outcome;
9. raw prompts, outputs, logs, checksums, and limitations are available; and
10. reproduction instructions have been followed successfully from a clean
    checkout.

Null, mixed, and negative findings pass the publication gate. Cherry-picking,
unreported intervention, broken isolation, or missing raw evidence do not.

## 18. Known limitations declared in advance

- One task cannot represent all interface work.
- One model/client configuration cannot represent all AI systems.
- Three runs per condition describe variability but provide limited statistical
  power.
- Automated accessibility checks cannot establish complete accessibility.
- Expert review is not a substitute for usability testing with clinic users or
  disabled users.
- Reviewers may infer conditions from output characteristics despite blinding.
- The context condition and MCP condition may consume different input tokens.
- Models may already contain related usability knowledge from training.
- The fictional clinic avoids real-world integration complexity.
