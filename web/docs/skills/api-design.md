---
title: API design audit
description: Contract, consistency, lifecycle, error, security, and developer-experience audit.
slug: /skills/api-design
section: Skills
order: 15
skill: sills-audit-api-design
package: sills-audit-api-design
status: available
---

# API design audit

Evaluate whether an API is predictable for consumers, faithful to its contract, and safe to evolve.

## Install

```bash
npx sills-audit-api-design install
```

## Use

```text
$sills-audit-api-design Audit this project.
```

## What it inspects

Specifications and schemas, resource and operation modelling, naming, types, validation, errors, status and error codes, pagination, filtering, sorting, search, idempotency, retries, concurrency, caching, authentication, authorization, tenancy, rate limits, versioning, deprecation, compatibility, webhooks, events, SDKs, examples, documentation, observability, SLIs, and implementation drift.

## What it gives you

A dated human-readable specialist report, structured findings, coverage inventory, evidence, positive findings, limitations, prioritised recommendations, verification instructions, and remediation handoff.

## How it works

1. Identify API types, intended consumers, ownership, contracts, generated artifacts, implementations, gateways, and versions.
2. Inventory operations, schemas, events, webhooks, permissions, errors, pagination, rate limits, and lifecycle signals.
3. Compare specification, implementation, tests, examples, SDKs, documentation, and runtime responses where safely available.
4. Walk common and failure journeys including retries, duplicate requests, partial success, stale versions, permission changes, and concurrent updates.
5. Identify inconsistent vocabulary, leaky internals, ambiguous optionality, undocumented behaviour, and breaking-change risk.
6. Report consumer impact and compatibility strategy; do not redesign the whole domain without evidence.

## Modes

Source, runtime, full, changed, CI, and verification modes are supported where the environment permits. Quick, standard, and deep depth profiles are available.

## Safety

The skill is report-only. It may write only inside the selected audit directory and never changes product code, configuration, dependencies, data, deployments, releases, or external services.

## Limitations

Source and specifications may not represent deployed behaviour, and passive samples do not prove every contract. Record unavailable environments, consumers, versions, gateways, rate limits, third parties, events, and production telemetry.
