# Privacy and Trust Audit methodology

## Purpose

Compare what the product says, what the interface asks, and what the implementation appears to collect or expose.

## Audit lenses

- Data minimization, purpose limitation, and proportionality
- Informed, specific, reversible consent and permission requests
- Transparent controls for access, export, correction, deletion, and withdrawal
- Policy, interface, implementation, and third-party consistency

## Evidence hierarchy

Prefer, in order: directly reproduced behaviour; reliable runtime or build output; source and configuration evidence; maintained project documentation; and clearly labelled inference. Conflicting evidence must be reported rather than silently resolved.

## Scope design

Cover primary workflows, shared foundations, high-risk states, representative secondary surfaces, and affected dependants in changed mode. Record inaccessible environments, roles, devices, services, and production-only behaviour.

## Recommendations

Recommendations should explain the user, consumer, operator, or developer impact; identify the likely controlling layer; preserve positive patterns; and include a concrete verification method. Do not prescribe a rewrite when a smaller system-level correction is supported by the evidence.
