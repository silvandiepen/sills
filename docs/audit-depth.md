# Audit depth

Sills separates **mode** from **depth**.

- Mode controls where evidence comes from: source, runtime, full, changed, CI, or verification.
- Depth controls how broadly and thoroughly collectors and Audit Skills examine that evidence.

A user selecting an audit interactively should choose both the relevant Audit Skills and one of the three depth levels. CI runs must configure both values and never prompt.

## Quick

Best for pull requests, changed-code checks, CI feedback, and initial risk scans.

Quick audits use targeted collectors and inspect changed or highest-risk surfaces. Runtime work is omitted or limited to a small smoke sample when a safe target is already available. Evidence is deliberately compact.

Quick does not mean low quality. It means intentionally narrow coverage. Reports must not present quick findings as broad project assurance.

## Standard

The recommended default for normal project reviews.

Standard audits build representative project knowledge across the relevant applications, routes, components, APIs, services, roles, states, tests, and deployment surfaces. They inspect primary journeys and representative edge states and cross-check source and runtime evidence when possible.

Standard balances useful confidence with reasonable execution cost.

## Deep

Best for release decisions, architecture reviews, major migrations, and high-risk systems.

Deep audits broadly inspect all discoverable relevant packages and applications, exercise substantially more routes, roles, states, environments, and edge cases, retain richer evidence, and correlate findings across Audit Skills. Ambiguous or dynamic areas receive more resolution effort, and unresolved high-risk areas must enter a manual-review queue.

Deep is still bounded by available capabilities. Missing runtime targets, credentials, simulators, roles, or external tools must lower achieved coverage rather than be silently ignored.

## What depth controls

The selected depth applies consistently to:

- project discovery and knowledge collectors;
- source-file and configuration coverage;
- runtime route and journey sampling;
- role, state, viewport, environment, and locale sampling;
- evidence volume and retained raw output;
- specialist analysis breadth;
- cross-specialist correlation;
- manual-review expectations;
- report detail.

## Relative effort

Sills should describe relative effort before execution, but should not guarantee a clock-time estimate. Actual work depends on repository size, application count, route count, selected Audit Skills, runtime availability, authenticated roles, environments, and dynamic behaviour.

A typical recommendation is:

| Situation | Recommended depth |
|---|---|
| Pull request or changed-code check | Quick |
| Routine project audit | Standard |
| Pre-release, architecture, migration, or high-risk review | Deep |

## Recorded contract

The chosen depth is written to the audit execution plan in `manifest.json`. It includes:

- `level`: quick, standard, or deep;
- expected source coverage;
- expected runtime coverage;
- evidence density;
- the reason for the selection;
- whether the user explicitly selected it;
- an optional relative-effort description.

Every report must state both the requested depth and the achieved coverage. When capabilities prevent the requested depth from being achieved, the report must explain the reduction and its effect on confidence.
