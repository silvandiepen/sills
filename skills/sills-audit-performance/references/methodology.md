# Performance Audit methodology

## Purpose

Measure whether the product loads, responds, animates, and scales efficiently without confusing lab results with real-user performance.

## Audit lenses

- Core Web Vitals and percentile interpretation
- RAIL and human-perception thresholds
- Web performance budgets and resource priorities
- Platform-specific startup, memory, energy, and rendering guidance

## Evidence hierarchy

Prefer, in order: directly reproduced behaviour; reliable runtime or build output; source and configuration evidence; maintained project documentation; and clearly labelled inference. Conflicting evidence must be reported rather than silently resolved.

## Scope design

Cover primary workflows, shared foundations, high-risk states, representative secondary surfaces, and affected dependants in changed mode. Record inaccessible environments, roles, devices, services, and production-only behaviour.

## Recommendations

Recommendations should explain the user, consumer, operator, or developer impact; identify the likely controlling layer; preserve positive patterns; and include a concrete verification method. Do not prescribe a rewrite when a smaller system-level correction is supported by the evidence.
