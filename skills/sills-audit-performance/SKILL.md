---
name: sills-audit-performance
description: Audit a website, web application, supported native application, or repository for measurable and perceived performance problems using source inspection, runtime traces, field data when available, and reproducible evidence. Use for Core Web Vitals, loading, responsiveness, animation and scroll jank, bundle and asset cost, caching, network waterfalls, memory, battery, startup, and performance-regression reviews.
license: MIT
metadata:
  author: Sil van Diepen
  version: "0.2.0"
---

# Performance Audit

Measure whether the product loads, responds, animates, and scales efficiently without confusing lab results with real-user performance.

## Non-negotiable contract

- Do not modify application code, content, configuration, dependencies, lockfiles, generated files, data, or repository structure.
- Create files only inside the selected dated audit directory.
- Suggestions and verification steps are allowed; fixes are not.
- Never invent evidence, selectors, source locations, standards, measurements, screenshots, traces, runtime behaviour, field data, or user research.
- Distinguish direct observation, automated detection, documentation, inference, and manual-review requirements.
- Include concrete positive findings. Do not manufacture praise.
- Read project documentation and repository instructions before applying general practice.
- A clean automated result is not proof of quality, compliance, security, readiness, or absence of defects.


## Supported modes

- `source`: repository inspection only.
- `runtime`: running product inspection only.
- `full`: combine source and runtime evidence.
- `changed`: focus on a branch, commit, or pull-request diff and affected areas.
- `ci`: non-interactive execution with machine-readable output.
- `verify`: retest findings from an earlier report without changing the product.

Depth is independent: `quick`, `standard`, or `deep`. Default to `full` and `standard` when possible.


## Before auditing

1. Read repository instructions, product documentation, requirements, decisions, prior audits, and domain-specific guidance.
2. Determine the project type, platforms, environments, roles, intended users, runtime availability, and safe test boundaries.
3. Build a coverage inventory before selecting representative workflows, states, modules, services, or routes.
4. Prefer existing tools and evidence. Run additional tooling only in isolation and never alter the audited project.
5. Redact secrets and personal data from reports and evidence.

## Output

Default to `audit/YYYY-MM-DD/`; use `-02`, `-03`, and so on for repeated runs on the same date.

Write the shared Sills files plus the specialist report under `reports/`. Every finding must include category, kind, title, severity when applicable, release-blocker status, confidence, origin, scope, impact, evidence or manual-review reason, reproduction when relevant, expected and observed results, recommendation, and verification instructions.

Use the specialist finding prefix documented below. Human-readable and structured reports must agree.


- Specialist report: `reports/performance.md`
- Finding IDs: `PERF-0001`, `PERF-0002`, and so on.

## Audit procedure

1. Locate field telemetry, existing budgets, profiler output, bundle reports, and documented targets before measuring.
2. Build a journey matrix covering cold load, warm load, navigation, primary interactions, data-heavy views, and long-lived sessions.
3. Capture repeatable runtime measurements under recorded device, network, cache, viewport, browser, and build conditions.
4. Separate field evidence, controlled lab measurements, code-level risk, and perceived interaction observations.
5. Trace regressions to assets, network, JavaScript, rendering, data access, third parties, or architecture.
6. Report variance and measurement limitations; do not treat a single fast machine run as representative.
7. Record evidence-backed positive findings, limitations, and untested areas.
8. Write the specialist report, structured findings, and remediation handoff.
9. Validate that no file outside the audit directory changed.

## Severity and confidence

- Severity: `critical`, `major`, `moderate`, `minor`, `observation`.
- Confidence: `confirmed`, `high`, `medium`, `low`, `requires-manual-verification`.
- `releaseBlocker` is a separate boolean.

Do not produce a single artificial overall score. Prefer finding counts, blockers, coverage, measured values where meaningful, and category assessments such as `strong`, `acceptable`, `needs work`, or `critical`.

## References

Read only the references relevant to the discovered scope:

- `references/methodology.md`
- `references/checklist.md`
- `references/evidence-and-reporting.md`
- `references/platforms-and-tools.md`

<!-- sills:shared-report-contract:start -->
## Shared report and runtime-intake contract

Before writing any Performance audit output, read `references/report-contract.md` and use the bundled report template.

- Begin with a professional status conclusion using the universal Sills health level and an audit-specific label.
- Report the relevant status dimensions rather than hiding materially different strengths and weaknesses behind one label.
- Include a ship decision only when this specialist has enough evidence to justify one.
- Include a prioritised Tasks section with traceable actions, acceptance criteria, and verification.
- Keep the standard section order so every Sills report is immediately comparable.
- When runtime web coverage is relevant and no usable URL is supplied or documented, ask once for live, staging, preview, or local URLs and their environment and role. Continue source analysis if none are provided.
- In CI mode, never prompt; record absent runtime targets as a limitation.

Recommended status dimensions: Loading; Responsiveness; Visual stability; Runtime efficiency; Resource efficiency.
<!-- sills:shared-report-contract:end -->
