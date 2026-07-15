---
name: sills-audit-architecture
description: Audit a repository or application architecture for clarity, maintainability, component and module boundaries, service integration, state management, coupling, duplication, dependency direction, testability, documentation alignment, and generated-code incoherence. Use for full-repository architecture reviews, changed-code audits, monorepo reviews, and source-only maintainability reports.
license: MIT
metadata:
  author: Sil van Diepen
  version: "0.1.0"
---

# Codebase Architecture Audit

Perform a comprehensive, evidence-based, report-only audit.

## Non-negotiable contract

- Do not modify application code, content, configuration, dependencies, lockfiles, generated files, data, or repository structure.
- Create files only inside the selected dated audit directory.
- Suggestions and verification steps are allowed; fixes are not.
- Never invent evidence, selectors, source locations, standards, measurements, screenshots, traces, or runtime behaviour.
- Distinguish direct observation, automated detection, manual verification, documentation, inference, and untested areas.
- Include concrete positive findings. Do not manufacture praise.
- Read project documentation and repository instructions before applying general practice.
- A clean automated result is not proof of quality, compliance, security, or absence of defects.

## Supported modes

- `source`: repository inspection only.
- `runtime`: running product inspection only.
- `full`: combine source and runtime evidence.
- `changed`: focus on a branch, commit, or pull-request diff and affected areas.
- `ci`: non-interactive execution with machine-readable output.
- `verify`: retest findings from an earlier report without changing the product.

Depth is independent: `quick`, `standard`, or `deep`. Default to `full` and `standard` when possible.

## Before auditing

1. Read `AGENTS.md`, `CLAUDE.md`, README files, product requirements, architecture records, design guidance, content guidance, security guidance, and framework configuration that apply.
2. Determine project type, framework, package manager, applications, packages, platforms, roles, environment, and whether a safe runtime can be started.
3. Locate prior audit reports and project-specific conventions.
4. Build a coverage inventory before selecting representative routes, screens, workflows, components, services, and states.
5. Use existing authenticated sessions or dedicated test credentials only when supplied. Never store credentials, cookies, tokens, secrets, or personal data in reports.
6. For local, test, staging, or preview environments, temporary test data may be created only when authorised and non-destructive. Production defaults to observation only.

## Output

Default to `audit/YYYY-MM-DD/`; use `-02`, `-03`, and so on for repeated runs on the same date. Ask only when a project convention or explicit user preference conflicts with the default.

Write:

- `summary.md`
- `report.md`
- `report.json`
- `coverage.json`
- `manifest.json`
- `handoff.md`
- `reports/architecture.md`
- individual finding files when useful
- evidence and raw tool output

Use finding IDs `ARC-0001`, `ARC-0002`, and so on.

Each finding must include category, kind, title, severity when applicable, release-blocker status, confidence, origin, scope, impact, evidence or manual-review reason, reproduction, expected and observed results, recommendation, and verification instructions.

## Audit procedure

1. **Discover** the complete relevant surface.
2. **Prioritise** primary journeys, shared primitives, high-risk operations, and representative states.
3. **Collect evidence** before drawing conclusions.
4. **Analyse** using the applicable references in this skill.
5. **Correlate source and runtime** when both are available.
6. **Record positive findings** with evidence.
7. **Record limitations** and untested areas explicitly.
8. **Write structured and human-readable reports** that agree with each other.
9. **Prepare remediation handoff** so another agent can act on open findings.
10. **Validate** report structure and verify that no files outside the audit directory changed.

## Severity and confidence

Use the shared Sills definitions:

- Severity: `critical`, `major`, `moderate`, `minor`, `observation`.
- Confidence: `confirmed`, `high`, `medium`, `low`, `requires-manual-verification`.
- `releaseBlocker` is a separate boolean.

Do not produce a single artificial overall score. Prefer finding counts, release blockers, coverage, tested and untested areas, and category assessments such as `strong`, `acceptable`, `needs work`, or `critical`.

## References

Read only the reference files relevant to the current project and scope. Do not load all reference material automatically.
