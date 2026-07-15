# Testing Strategy Audit methodology

## Purpose

Determine whether the test system protects important behaviour or merely produces passing numbers.

## Audit lenses

- Risk-based coverage over raw test counts
- Appropriate boundaries among unit, integration, contract, and end-to-end tests
- Determinism, isolation, diagnostics, and maintainability
- Fast feedback with deliberate slower confidence layers

## Evidence hierarchy

Prefer, in order: directly reproduced behaviour; reliable runtime or build output; source and configuration evidence; maintained project documentation; and clearly labelled inference. Conflicting evidence must be reported rather than silently resolved.

## Scope design

Cover primary workflows, shared foundations, high-risk states, representative secondary surfaces, and affected dependants in changed mode. Record inaccessible environments, roles, devices, services, and production-only behaviour.

## Recommendations

Recommendations should explain the user, consumer, operator, or developer impact; identify the likely controlling layer; preserve positive patterns; and include a concrete verification method. Do not prescribe a rewrite when a smaller system-level correction is supported by the evidence.
