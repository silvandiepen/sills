# API Design Audit methodology

## Purpose

Evaluate whether an API is predictable for consumers, faithful to its contract, and safe to evolve.

## Audit lenses

- Consumer-centred, consistent contracts and terminology
- Explicit failure, retry, idempotency, concurrency, and pagination semantics
- Secure authorization and tenant boundaries
- Backward-compatible lifecycle, deprecation, observability, and documentation

## Evidence hierarchy

Prefer, in order: directly reproduced behaviour; reliable runtime or build output; source and configuration evidence; maintained project documentation; and clearly labelled inference. Conflicting evidence must be reported rather than silently resolved.

## Scope design

Cover primary workflows, shared foundations, high-risk states, representative secondary surfaces, and affected dependants in changed mode. Record inaccessible environments, roles, devices, services, and production-only behaviour.

## Recommendations

Recommendations should explain the user, consumer, operator, or developer impact; identify the likely controlling layer; preserve positive patterns; and include a concrete verification method. Do not prescribe a rewrite when a smaller system-level correction is supported by the evidence.
