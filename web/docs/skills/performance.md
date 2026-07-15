---
title: Performance audit
description: Loading, runtime, responsiveness, stability, and resource-efficiency audit.
slug: /skills/performance
section: Skills
order: 8
skill: sills-audit-performance
package: sills-audit-performance
status: available
---

# Performance audit

Measure whether the product loads, responds, animates, and scales efficiently without confusing lab results with real-user performance.

## Install

```bash
npx sills-audit-performance install
```

## Use

```text
$sills-audit-performance Audit this project.
```

## What it inspects

Core Web Vitals, startup and route transitions, request waterfalls, caching, bundle and asset weight, main-thread work, long tasks, rendering, layout shifts, scroll and animation smoothness, memory growth, battery-sensitive work, background activity, and performance budgets.

## What it gives you

A dated human-readable specialist report, structured findings, coverage inventory, evidence, positive findings, limitations, prioritised recommendations, verification instructions, and remediation handoff.

## How it works

1. Locate field telemetry, existing budgets, profiler output, bundle reports, and documented targets before measuring.
2. Build a journey matrix covering cold load, warm load, navigation, primary interactions, data-heavy views, and long-lived sessions.
3. Capture repeatable runtime measurements under recorded device, network, cache, viewport, browser, and build conditions.
4. Separate field evidence, controlled lab measurements, code-level risk, and perceived interaction observations.
5. Trace regressions to assets, network, JavaScript, rendering, data access, third parties, or architecture.
6. Report variance and measurement limitations; do not treat a single fast machine run as representative.

## Modes

Source, runtime, full, changed, CI, and verification modes are supported where the environment permits. Quick, standard, and deep depth profiles are available.

## Safety

The skill is report-only. It may write only inside the selected audit directory and never changes product code, configuration, dependencies, data, deployments, releases, or external services.

## Limitations

Lab measurements vary by hardware and configuration. Field data may be missing, sampled, stale, or aggregated. Never invent percentile claims, diagnose production users from one local run, or claim that a Lighthouse score proves a fast experience.
