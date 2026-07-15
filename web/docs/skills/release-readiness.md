---
title: Release readiness audit
description: Cross-functional launch risk, operations, rollback, and evidence audit.
slug: /skills/release-readiness
section: Skills
order: 10
skill: sills-audit-release-readiness
package: sills-audit-release-readiness
status: available
---

# Release readiness audit

Turn scattered launch checks into an evidence-based ship, hold, or conditional-release recommendation.

## Install

```bash
npx sills-audit-release-readiness install
```

## Use

```text
$sills-audit-release-readiness Audit this project.
```

## What it inspects

Release scope, acceptance criteria, unresolved blockers, CI status, test evidence, migrations, feature flags, configuration, secrets, observability, alerting, support readiness, runbooks, rollback, backups, data integrity, compatibility, app-store requirements, deployment ownership, communication, and post-release verification.

## What it gives you

A dated human-readable specialist report, structured findings, coverage inventory, evidence, positive findings, limitations, prioritised recommendations, verification instructions, and remediation handoff.

## How it works

1. Identify the exact release candidate, environment, commit, artifacts, owners, dates, and acceptance criteria.
2. Collect evidence from specialist reports, CI, tests, deployment configuration, migrations, runbooks, dashboards, and known issues.
3. Separate blockers, accepted risks, missing evidence, and post-release follow-up.
4. Walk failure scenarios: partial deploy, migration failure, dependency outage, rollback, stale client, and configuration mismatch.
5. Check that monitoring detects user-visible failure and that a named owner can act.
6. Issue a clear recommendation: ready, conditionally ready, or not ready, with the evidence required to change the decision.

## Modes

Source, runtime, full, changed, CI, and verification modes are supported where the environment permits. Quick, standard, and deep depth profiles are available.

## Safety

The skill is report-only. It may write only inside the selected audit directory and never changes product code, configuration, dependencies, data, deployments, releases, or external services.

## Limitations

The audit cannot guarantee production behaviour or replace accountable release ownership. Missing access to production, stores, dashboards, or third-party systems must be reported as missing evidence, not assumed success.
