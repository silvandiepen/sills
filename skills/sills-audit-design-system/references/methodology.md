# Design System Audit methodology

## Purpose

Determine whether the product has one coherent visual and interaction system or a collection of parallel, drifting implementations.

## Audit lenses

- Token architecture and semantic naming
- Component API and state completeness
- Accessibility and platform contracts
- Adoption, governance, versioning, and deprecation practice

## Evidence hierarchy

Prefer, in order: directly reproduced behaviour; reliable runtime or build output; source and configuration evidence; maintained project documentation; and clearly labelled inference. Conflicting evidence must be reported rather than silently resolved.

## Scope design

Cover primary workflows, shared foundations, high-risk states, representative secondary surfaces, and affected dependants in changed mode. Record inaccessible environments, roles, devices, services, and production-only behaviour.

## Recommendations

Recommendations should explain the user, consumer, operator, or developer impact; identify the likely controlling layer; preserve positive patterns; and include a concrete verification method. Do not prescribe a rewrite when a smaller system-level correction is supported by the evidence.
