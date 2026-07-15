# Sills report contract

This contract is mandatory for every Product experience audit report. It keeps specialist reports comparable while allowing domain-specific conclusions.

## Status conclusion

Every report starts with one evidence-based conclusion containing:

- `level`: `strong`, `acceptable`, `needs-attention`, `high-risk`, `critical`, or `insufficient-evidence`.
- `label`: a direct professional phrase suited to the audit, such as **Ready to ship**, **Ready with conditions**, **Needs attention**, **High risk**, **Critical issues**, or **Insufficient evidence**.
- `summary`: one short paragraph explaining what the status means.
- `rationale`: the most important evidence, blockers, and coverage limits behind the conclusion.
- `dimensions`: the audit-specific status fields listed below, each using the same universal level scale.
- `shipDecision`: optional; include it only when this specialist has enough evidence to make a release judgement.

Do not use a numeric overall score. Do not produce a stronger conclusion than the evidence and coverage support. Use `insufficient-evidence` when missing runtime, roles, environments, or data would make another label misleading.

## Suggested dimensions

- Visual hierarchy
- Interaction quality
- Usability
- Responsiveness
- Perceived performance

Dimensions may be added or marked not assessed when the product requires it, but do not silently omit a material part of the audit.

## Tasks

Every report contains a prioritised Tasks section. Each task must:

- have a stable ID such as `TASK-001`;
- use priority `now`, `next`, or `later`;
- state whether it blocks the conclusion or ship decision;
- link to one or more source finding IDs, unless it is explicitly a coverage or manual-review task;
- describe one concrete action rather than restating a problem;
- include acceptance criteria and verification steps;
- include dependencies, owner, and effort only when they are known rather than guessed;
- deduplicate findings that share one root remediation.

When no remediation tasks are justified, state that no tasks were identified in the audited scope. Never invent busywork to fill the section.

## Standard Markdown layout

Use this section order without arbitrary reordering:

1. `## Status conclusion`
2. `## Executive summary`
3. `## Status by dimension`
4. `## Scope and coverage`
5. `## Tasks`
6. `## Release blockers`
7. `## Findings`
8. `## Positive findings`
9. `## Cross-cutting patterns`
10. `## Manual-review queue`
11. `## Limitations and untested areas`
12. `## Evidence index`

A section may say “None identified” or “Not applicable”, but it should remain present so reports are easy to scan and compare.

## Live and deployed web surfaces

When a website or web application may exist and runtime coverage is relevant:

1. Search repository documentation, deployment configuration, environment examples, preview metadata, and prior audits for local, preview, staging, or production URLs.
2. When no usable URL was supplied or documented, ask once: **Are there live, staging, preview, or local URLs you want included in this audit, and which environment and role does each represent?**
3. Do not ask when the request is explicitly source-only or the project has no web surface.
4. In CI mode, do not prompt. Use explicit inputs or documented URLs and record missing runtime targets as a limitation.
5. Do not assume a URL is production. Record the environment, role, authentication, and safe-action boundary for each target.
6. A missing answer must not block source analysis. Continue with the strongest available mode and lower the conclusion when runtime evidence is material.

## Machine-readable agreement

`report.json`, `summary.md`, `report.md`, and specialist reports must agree on conclusion, dimensions, ship decision, tasks, blockers, finding states, and limitations. Treat `report.json` as authoritative for automation.
