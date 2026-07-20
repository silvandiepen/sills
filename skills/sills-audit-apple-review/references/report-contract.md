# Sills report contract

This contract is mandatory for every Apple review audit report. It keeps specialist reports comparable while allowing domain-specific conclusions.

## Status conclusion

Every report starts with one evidence-based conclusion containing:

- `level`: `strong`, `acceptable`, `needs-attention`, `high-risk`, `critical`, or `insufficient-evidence`.
- `label`: a direct professional phrase suited to the audit, such as **Submission-ready**, **Ready with conditions**, **Needs attention before submission**, **High rejection risk**, **Critical blockers**, or **Insufficient evidence**.
- `summary`: one short paragraph explaining what the status means for a submission decision.
- `rationale`: the most important likely-rejection risks, blockers, and coverage limits behind the conclusion.
- `dimensions`: the audit-specific status fields listed below, each using the same universal level scale.
- `shipDecision`: optional; a submission-readiness judgement is appropriate for this audit when evidence supports one, but never state it as a guarantee of approval.

Do not use a numeric approval score or predict an approval probability. Do not produce a stronger conclusion than the evidence supports. Use `insufficient-evidence` when the source, build, or metadata needed to assess a review area is missing.

## Suggested dimensions

- App Store guideline compliance
- Privacy and permissions
- Data collection and tracking
- HIG and platform conventions
- Submission and metadata readiness

Dimensions may be added or marked not assessed when the product requires it, but do not silently omit a material review area.

## Tasks

Every report contains a prioritised Tasks section. Each task must:

- have a stable ID such as `TASK-001`;
- use priority `now`, `next`, or `later`;
- state whether it blocks the conclusion or ship decision;
- link to one or more source finding IDs, unless it is explicitly a coverage or manual-review task;
- describe one concrete pre-submission action rather than restating a risk;
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

## Guideline citations and honesty

- Cite an App Store Review Guideline section only when it applies, and record why. Do not invent guideline numbers.
- Many review outcomes depend on the running app or on human judgement. Mark such risks `requires-manual-verification` and say what could not be assessed from source.
- A clean automated result is not proof of approval. State this in the conclusion when coverage is source-only.

## Live and deployed web surfaces

Apple review focuses on the app binary and its configuration, but a companion web surface (marketing site, web dashboard, or a hybrid app's hosted content) is sometimes in scope:

1. Search repository documentation, deployment configuration, environment examples, preview metadata, and prior audits for local, preview, staging, or production URLs.
2. When no usable URL was supplied or documented and a web surface is materially in scope, ask once: **Are there live, staging, preview, or local URLs you want included in this audit, and which environment and role does each represent?**
3. Do not ask when the request is explicitly source-only or the app has no relevant web surface.
4. In CI mode, do not prompt. Use explicit inputs or documented URLs and record missing runtime targets as a limitation.
5. Do not assume a URL is production. Record the environment, role, authentication, and safe-action boundary for each target.
6. A missing answer must not block source analysis. Continue with the strongest available mode and record untested runtime review surfaces as a limitation.

## Machine-readable agreement

`report.json`, `summary.md`, `report.md`, and the specialist report must agree on conclusion, dimensions, ship decision, tasks, blockers, finding states, and limitations. Treat `report.json` as authoritative for automation.
