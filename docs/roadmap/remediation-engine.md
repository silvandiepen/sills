# Remediation engine plan

> **Architecture decided:** see [ADR 0003](../decisions/0003-remediation-architecture.md) — one `sills-remediate` engine + thin domain profiles (`sills-fix-*`). This document records the original workflow and safety-level design; the ADR is authoritative on structure and resolved parameters.

## Principle

Keep Sills audits report-only. Remediation is a separate consumer of `report.json`, evidence, tasks, and verification instructions.

## Proposed package

Start with `sills-remediate` in the monorepo. Split it into a separate package only after the contract settles.

## Workflow

1. Load and validate an audit report.
2. Select tasks explicitly or by safe policy.
3. Re-read cited evidence and current source.
4. Produce a proposed change plan.
5. Apply changes on a dedicated branch or worktree.
6. Run task acceptance checks.
7. Invoke Sills `verify` mode against the original finding IDs.
8. Open a draft pull request containing changes, verification results, and unresolved limitations.

## Safety levels

- `explain`: generate remediation guidance only.
- `patch`: create local changes but never commit or push.
- `branch`: commit to a dedicated branch.
- `pr`: open a draft pull request after checks pass.

Default to `explain`. Destructive, production, migration, secret, infrastructure, billing, and legal changes remain excluded unless a later policy explicitly supports them.

## Data contract

Each remediation task needs stable finding IDs, evidence IDs, affected locations, one concrete action, acceptance criteria, verification steps, risk classification, and allowed automation level.

## MVP

Support deterministic low-risk changes first: documentation drift, missing metadata, configuration hygiene, dead links, simple accessibility labels, and test additions. Do not begin with authentication, data migrations, dependency upgrades, or broad architectural refactors.
