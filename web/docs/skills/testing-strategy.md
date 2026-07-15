---
title: Testing strategy audit
description: Risk coverage, test architecture, reliability, speed, and maintainability audit.
slug: /skills/testing-strategy
section: Skills
order: 12
skill: sills-audit-testing-strategy
package: sills-audit-testing-strategy
status: available
---

# Testing strategy audit

Determine whether the test system protects important behaviour or merely produces passing numbers.

## Install

```bash
npx sills-audit-testing-strategy install
```

## Use

```text
$sills-audit-testing-strategy Audit this project.
```

## What it inspects

Risk model, test layers, critical-path coverage, state and role matrices, contracts, migrations, fixtures, data builders, mocks, snapshots, visual regression, accessibility, performance, security, mobile, browser coverage, flakiness, determinism, isolation, speed, parallelism, ownership, failure diagnostics, quarantines, retries, coverage metrics, and CI gates.

## What it gives you

A dated human-readable specialist report, structured findings, coverage inventory, evidence, positive findings, limitations, prioritised recommendations, verification instructions, and remediation handoff.

## How it works

1. Map product and technical risks before counting tests.
2. Inventory test frameworks, suites, environments, fixtures, mocks, coverage, CI jobs, retries, quarantines, and historical failures.
3. Trace primary workflows and failure modes to concrete tests and assertions.
4. Identify tests that pass without meaningful behaviour, over-mock implementation details, or duplicate confidence at high cost.
5. Measure or inspect suite duration, flakiness, failure clarity, local reproducibility, and ownership.
6. Recommend a target confidence model and migration order without rewriting tests.

## Modes

Source, runtime, full, changed, CI, and verification modes are supported where the environment permits. Quick, standard, and deep depth profiles are available.

## Safety

The skill is report-only. It may write only inside the selected audit directory and never changes product code, configuration, dependencies, data, deployments, releases, or external services.

## Limitations

Coverage percentage alone does not measure confidence. A passing suite cannot prove correctness, and an isolated failure may be environmental. Report unavailable history, services, credentials, devices, browsers, and production verification.
