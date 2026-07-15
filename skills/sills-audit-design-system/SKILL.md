---
name: sills-audit-design-system
description: Audit a product and repository for design-system quality, consistency, adoption, accessibility, and governance. Use for design tokens, component libraries, duplicate UI patterns, state coverage, theming, responsive primitives, iconography, typography, documentation, versioning, migration, and gaps between documented design decisions and the running product.
license: MIT
metadata:
  author: Sil van Diepen
  version: "0.1.0"
---

# Design System Audit

Determine whether the product has one coherent visual and interaction system or a collection of parallel, drifting implementations.

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


- Specialist report: `reports/design-system.md`
- Finding IDs: `DSYS-0001`, `DSYS-0002`, and so on.

## Audit procedure

1. Read brand, design, token, component, and contribution documentation before judging implementation.
2. Inventory token sources, component libraries, wrappers, copied UI, CSS conventions, and design references.
3. Map representative runtime screens back to primitives and components.
4. Identify drift, competing abstractions, missing states, undocumented exceptions, and inaccessible foundations.
5. Distinguish deliberate product-specific variation from accidental inconsistency.
6. Report high-leverage system fixes separately from local screen defects.
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
