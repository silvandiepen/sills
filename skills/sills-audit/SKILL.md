---
name: sills-audit
description: Run a complete, evidence-based, report-only audit of a project by coordinating the full Sills specialist suite across accessibility, product experience, content, architecture, security, performance, design systems, release readiness, localization, testing strategy, privacy and trust, SEO, and API design. Use for full audits, release decisions, changed-code reviews, CI, verification, web-first runtime analysis, and supported iOS projects.
license: MIT
metadata:
  author: Sil van Diepen
  version: "0.2.0"
---

# Sills Full Audit

Coordinate all applicable Sills specialist audits and produce one coherent product report.

## Non-negotiable contract

- This is report-only. Never modify the audited project outside the selected audit directory.
- Do not install dependencies into the project, change lockfiles, run migrations, invent environment variables, seed production data, deploy, publish, or approve releases.
- Use isolated tools, temporary caches, existing project tools, or reduced coverage.
- Reuse evidence and sessions across specialists.
- Never equate automated passes with compliance, security, readiness, rankings, performance, or defect-free status.
- Read project documentation before applying general guidance.
- Include evidence-backed positive findings.

## Specialists

Locate the sibling installed skills and apply all that are relevant:

- `$sills-audit-accessibility`
- `$sills-audit-experience`
- `$sills-audit-content`
- `$sills-audit-architecture`
- `$sills-audit-security`
- `$sills-audit-performance`
- `$sills-audit-design-system`
- `$sills-audit-release-readiness`
- `$sills-audit-localization`
- `$sills-audit-testing-strategy`
- `$sills-audit-privacy-and-trust`
- `$sills-audit-seo`
- `$sills-audit-api-design`

Do not duplicate complete specialist methodologies inside this skill. Read each applicable `SKILL.md` and only the references relevant to the discovered scope.

## Default request

```text
$sills-audit Do a full audit of this project.
```

Default to `full` mode and `standard` depth when source and runtime are available. Use `audit/YYYY-MM-DD/`, web-first runtime coverage, supported iOS analysis when present, Chromium plus relevant WebKit checks, and existing sessions or supplied test credentials only.

## Workflow

1. **Read intent and constraints.** Read repository instructions, requirements, decisions, product, design, content, architecture, security, privacy, operations, release, localization, testing, API, SEO, and prior-audit documentation.
2. **Discover the project.** Inventory applications, packages, platforms, routes, roles, workflows, states, components, services, integrations, APIs, data flows, trust boundaries, CI/CD, deployments, and public surfaces.
3. **Establish scope and coverage.** Prioritise primary journeys, shared foundations, high-risk operations, release-critical surfaces, and affected dependants in changed mode.
4. **Prepare the audit directory.** Use the bundled script or equivalent structure. Append `-02`, `-03`, and so on for repeated dates.
5. **Start runtime safely.** Use documented commands and existing dependencies without changing the project.
6. **Gather shared evidence.** Reuse screenshots, traces, logs, requests, accessibility snapshots, measurements, source mappings, tool versions, and timestamps across specialists.
7. **Run applicable specialists.** Skip only genuinely irrelevant audits and explain why.
8. **Deduplicate and correlate.** Preserve specialist IDs and connect shared roots across product, implementation, delivery, and operations.
9. **Decide blockers and priority.** Consider task blockage, user impact, affected roles, frequency, recoverability, security, privacy, data, financial, operational, release, and systemic risk.
10. **Write coherent reports.** Human and machine-readable outputs must agree.
11. **Prepare remediation handoff.** Treat `report.json` as authoritative, preserve evidence and positive patterns, and verify each resolved finding.
12. **Validate integrity.** Confirm no changes outside the audit directory, complete coverage labels, valid IDs, redaction, and explicit limitations.

## Required specialist reports

- `reports/accessibility.md`
- `reports/experience.md`
- `reports/content.md`
- `reports/architecture.md`
- `reports/security.md`
- `reports/performance.md`
- `reports/design-system.md`
- `reports/release-readiness.md`
- `reports/localization.md`
- `reports/testing-strategy.md`
- `reports/privacy-and-trust.md`
- `reports/seo.md`
- `reports/api-design.md`

## Modes

- `source`: repository only.
- `runtime`: running product only.
- `full`: source plus runtime.
- `changed`: changed files and affected runtime areas.
- `ci`: non-interactive machine-readable execution.
- `verify`: retest an existing audit without changing the product.

Depth: `quick`, `standard`, or `deep`.

## Safety

Temporary records may be created only in authorised local, test, staging, or preview environments. Production defaults to observation. Security testing is passive. The suite never deploys, publishes, submits, approves, attacks, or modifies the product.
