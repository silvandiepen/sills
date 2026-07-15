---
title: Status conclusions and tasks
description: Understand the shared Sills health scale, ship decisions, status dimensions, and remediation task format.
slug: /documentation/reports/status-and-tasks
section: Reports
order: 1
---

# Status conclusions and tasks

Every Sills report starts with a glanceable conclusion and follows the same section order. The status is evidence-based and never replaces the detailed findings or coverage limitations.

## Universal health levels

- **Strong:** the audited scope is working well and no material issues were found.
- **Acceptable:** usable or healthy overall, with limited non-blocking concerns.
- **Needs attention:** material issues should be addressed, but the audited scope is not in immediate failure.
- **High risk:** serious or systemic weaknesses make continued use or release risky.
- **Critical issues:** essential workflows, controls, or foundations are broken or unsafe.
- **Insufficient evidence:** missing environments, roles, URLs, telemetry, or other evidence prevents a responsible conclusion.

Specialists pair the universal level with a direct label appropriate to the domain. Full and release-readiness audits also provide a ship decision.

## Status by dimension

A single status can hide important differences. Each specialist therefore reports several domain-specific dimensions using the same health scale.

## Tasks

Tasks translate findings into a deduplicated implementation queue. Each task has a stable ID, priority, blocking state, source finding IDs, concrete action, acceptance criteria, and verification steps. `report.json` is authoritative.

## Live URLs

When runtime web coverage is relevant, Sills first searches project documentation for local, preview, staging, and production URLs. If none are available, the agent asks once which URLs and environments should be included. Source analysis continues when no URL is provided, and the missing runtime evidence is recorded as a limitation.
