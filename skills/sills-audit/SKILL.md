---
name: sills-audit
description: Run a complete, evidence-based, report-only audit of a project by coordinating the Sills accessibility, product-experience, content-quality, codebase-architecture, and security audit skills. Use when asked for a full audit, complete project review, release-readiness quality investigation, or a single dated report that another agent can use for remediation. Supports web-first source and runtime auditing, changed-code mode, CI mode, verification mode, and supported iOS analysis.
license: MIT
metadata:
  author: Sil van Diepen
  version: "0.1.0"
---

# Sills Full Audit

Coordinate all applicable Sills specialist audits and produce one coherent product report.

## Non-negotiable contract

- This is report-only. Never modify the audited project outside the selected audit directory.
- Do not install dependencies into the project, change lockfiles, run migrations, invent environment variables, or seed production data.
- Use isolated tools, temporary caches, existing project tools, or reduced coverage.
- Reuse evidence and sessions across specialists.
- Never equate automated passes with compliance, security, or defect-free status.
- Read project documentation before general guidance.
- Include evidence-backed positive findings.

## Specialists

Locate the sibling installed skills and apply all that are relevant:

- `$sills-audit-accessibility`
- `$sills-audit-experience`
- `$sills-audit-content`
- `$sills-audit-architecture`
- `$sills-audit-security`

Do not duplicate their complete methodologies inside this skill. Read each specialist `SKILL.md` and only the references relevant to the discovered scope.

## Default request

For a request such as:

```text
$sills-audit Do a full audit of this project.
```

Default to:

- mode: `full` when source and runtime are available, otherwise the strongest available mode;
- depth: `standard`;
- output: `audit/YYYY-MM-DD/`;
- platforms: web first, plus supported iOS source or simulator analysis when present;
- specialists: all applicable specialists;
- browser: Chromium, with WebKit for important cross-browser or iOS-adjacent behaviour;
- authenticated roles: existing session or supplied test credentials only.

## Workflow

### 1. Read intent and constraints

Read repository instructions, product documentation, requirements, decisions, design-system guidance, content guidance, security documentation, architecture records, and prior audits. Record contradictions and missing context.

### 2. Discover the project

Inventory:

- applications, packages, frameworks, package managers, and platforms;
- routes, screens, navigation, sitemaps, manifests, and router definitions;
- roles, permissions, authentication paths, and supplied test accounts;
- primary user journeys and complete processes;
- loading, empty, success, error, disabled, permission, offline, and destructive states;
- shared components, design primitives, services, integrations, APIs, and trust boundaries;
- CI/CD, release, dependency, and deployment configuration;
- previous reports and known limitations.

### 3. Establish scope and coverage

Write `coverage.json` before deep testing. Prioritise primary journeys, high-risk operations, shared primitives, representative secondary pages, and affected areas in `changed` mode. Record excluded and inaccessible areas.

### 4. Prepare the audit directory

Use the bundled `scripts/create-audit-run.mjs` or create the equivalent structure manually. On repeated dates, append `-02`, `-03`, and so on.

### 5. Start runtime safely

Detect documented commands and package manager. Use existing dependencies and environments. Starting an existing development or test command is allowed when safe. Do not alter the project to make it start. Report exact missing prerequisites when startup fails.

### 6. Gather shared evidence

Capture browser and platform details, viewports, routes, screenshots, traces, console errors, page errors, failed requests, performance measurements, accessibility snapshots, source mappings, tool versions, and timestamps. Redact secrets and personal data.

### 7. Run specialist audits

Apply every relevant specialist. Specialists write their own report under `reports/` and findings using their prefixes. The full audit may narrow or skip a specialist only when genuinely inapplicable; explain why.

### 8. Deduplicate and correlate

Group findings that share a component, service, route, workflow, or root cause. Preserve specialist IDs and add relationships rather than deleting useful detail. Highlight cross-cutting causes such as unclear copy creating accessibility failures, architecture causing inconsistent UI, or performance causing interaction failures.

### 9. Decide release blockers and priority

Use evidence, user impact, task blockage, affected roles, frequency, recoverability, data or financial risk, security exposure, compliance context, systemic reach, and workarounds. Do not produce a fake overall percentage.

### 10. Write the complete report

Required files:

- `index.md`
- `summary.md`
- `report.md`
- `report.json`
- `manifest.json`
- `coverage.json`
- `handoff.md`
- `reports/accessibility.md`
- `reports/experience.md`
- `reports/content.md`
- `reports/architecture.md`
- `reports/security.md`
- finding files, evidence, and raw outputs as needed

The human and machine-readable reports must agree.

### 11. Prepare remediation handoff

`handoff.md` must tell a later agent to treat `report.json` as authoritative, resolve only open findings, work in priority order, preserve positive patterns, inspect related findings, verify each result, retain original evidence, and update statuses.

### 12. Validate integrity

Before finishing:

- confirm no files outside the audit directory changed;
- confirm all findings have evidence or manual-review status;
- confirm tested and untested areas are listed;
- confirm tool failures are limitations;
- confirm no credentials or personal data are present;
- confirm finding IDs and cross-references are valid;
- confirm report JSON matches the Sills schema when available.

## Modes

- `source`: repository only.
- `runtime`: running product only.
- `full`: source plus runtime.
- `changed`: changed files and affected runtime areas, distinguishing introduced and pre-existing issues.
- `ci`: non-interactive, machine-readable execution.
- `verify`: retest an existing audit without changing the project.

Depth: `quick`, `standard`, or `deep`.

## Safety

Temporary records may be created only in authorised local, test, staging, or preview environments. Do not send real emails, payments, notifications, invitations, or third-party actions unless explicitly authorised. Production defaults to observation. Security testing is passive and non-destructive.
