---
name: sills-audit-testing-strategy
description: Audit a repository and delivery process for testing-strategy quality, risk coverage, reliability, maintainability, and feedback speed. Use for unit, integration, component, end-to-end, contract, visual, accessibility, performance, security, mobile, migration, and production-verification tests; flaky suites; slow CI; weak fixtures; excessive mocking; missing high-risk scenarios; and misleading coverage metrics.
license: MIT
metadata:
  author: Sil van Diepen
  version: "0.2.0"
---

# Testing Strategy Audit

Determine whether the test system protects important behaviour or merely produces passing numbers.

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


- Specialist report: `reports/testing-strategy.md`
- Finding IDs: `TEST-0001`, `TEST-0002`, and so on.

## Audit procedure

1. Map product and technical risks before counting tests.
2. Inventory test frameworks, suites, environments, fixtures, mocks, coverage, CI jobs, retries, quarantines, and historical failures.
3. Trace primary workflows and failure modes to concrete tests and assertions.
4. Identify tests that pass without meaningful behaviour, over-mock implementation details, or duplicate confidence at high cost.
5. Measure or inspect suite duration, flakiness, failure clarity, local reproducibility, and ownership.
6. Recommend a target confidence model and migration order without rewriting tests.
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

Before writing any Testing strategy audit output, read `references/report-contract.md` and use the bundled report template.

- Begin with a professional status conclusion using the universal Sills health level and an audit-specific label.
- Report the relevant status dimensions rather than hiding materially different strengths and weaknesses behind one label.
- Include a ship decision only when this specialist has enough evidence to justify one.
- Include a prioritised Tasks section with traceable actions, acceptance criteria, and verification.
- Keep the standard section order so every Sills report is immediately comparable.
- When runtime web coverage is relevant and no usable URL is supplied or documented, ask once for live, staging, preview, or local URLs and their environment and role. Continue source analysis if none are provided.
- In CI mode, never prompt; record absent runtime targets as a limitation.

Recommended status dimensions: Risk coverage; Test architecture; Reliability; Feedback speed; Maintainability.
<!-- sills:shared-report-contract:end -->
