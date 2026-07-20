# Sills report contract

This contract is mandatory for every Code quality audit report. It keeps specialist reports comparable while allowing domain-specific conclusions.

## Status conclusion

Every report starts with one evidence-based conclusion containing:

- `level`: `strong`, `acceptable`, `needs-attention`, `high-risk`, `critical`, or `insufficient-evidence`.
- `label`: a direct professional phrase suited to the audit, such as **Clean and maintainable**, **Acceptable with hotspots**, **Needs attention**, **High complexity risk**, **Critical maintainability issues**, or **Insufficient evidence**.
- `summary`: one short paragraph explaining what the status means.
- `rationale`: the most important evidence, hotspots, and coverage limits behind the conclusion.
- `dimensions`: the audit-specific status fields listed below, each using the same universal level scale.
- `shipDecision`: optional; include it only when this specialist has enough evidence to make a release judgement, which is rare for code quality alone.

Do not use a numeric overall score. Do not produce a stronger conclusion than the evidence and coverage support. Use `insufficient-evidence` when missing tools, languages, or packages would make another label misleading.

## Suggested dimensions

- Complexity
- Duplication
- Dead code and dependencies
- Language idioms and conventions
- Type safety and maintainability

Dimensions may be added or marked not assessed when the product requires it, but do not silently omit a material part of the audit.

## Tasks

Every report contains a prioritised Tasks section. Each task must:

- have a stable ID such as `TASK-001`;
- use priority `now`, `next`, or `later`;
- state whether it blocks the conclusion or ship decision;
- link to one or more source finding IDs, unless it is explicitly a coverage or manual-review task;
- describe one concrete simplification or clean-up action rather than restating a metric;
- include acceptance criteria and verification steps;
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

A section may say "None identified" or "Not applicable", but it should remain present so reports are easy to scan and compare.

## Evidence and tool honesty

Every complexity, duplication, and dependency finding must reference either collector evidence or a manual source location. Record the tool name, version, and command for automated evidence, and preserve raw output under the audit directory. A clean or empty tool run is a coverage fact, not proof of quality; say so. When a tool was unavailable, record the affected language or package as a limitation.

## Live and deployed web surfaces

Code quality is primarily a source concern, but when runtime coverage is relevant (for example confirming a dead-code claim against real usage):

1. Search repository documentation, deployment configuration, environment examples, preview metadata, and prior audits for local, preview, staging, or production URLs.
2. When no usable URL was supplied or documented and runtime evidence is material, ask once: **Are there live, staging, preview, or local URLs you want included in this audit, and which environment and role does each represent?**
3. Do not ask when the request is explicitly source-only or the project has no web surface. This is the normal case for a code-quality audit.
4. In CI mode, do not prompt. Use explicit inputs or documented URLs and record missing runtime targets as a limitation.
5. A missing answer must not block source analysis. Continue with the strongest available mode and lower the conclusion only when runtime evidence would have been material.

## Machine-readable agreement

`report.json`, `summary.md`, `report.md`, and the specialist report must agree on conclusion, dimensions, ship decision, tasks, blockers, finding states, and limitations. Treat `report.json` as authoritative for automation.
