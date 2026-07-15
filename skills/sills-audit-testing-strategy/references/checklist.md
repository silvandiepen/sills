# Testing Strategy Audit checklist

## Core coverage

Risk model, test layers, critical-path coverage, state and role matrices, contracts, migrations, fixtures, data builders, mocks, snapshots, visual regression, accessibility, performance, security, mobile, browser coverage, flakiness, determinism, isolation, speed, parallelism, ownership, failure diagnostics, quarantines, retries, coverage metrics, and CI gates.

## Positive evidence to record

- Critical behaviour is protected at stable boundaries.
- Failures explain user or contract impact clearly.
- Fixtures are realistic, deterministic, and reusable.
- CI balances fast feedback with deeper scheduled or pre-release checks.

## Cross-cutting checks

- Documentation and implementation agree.
- Important behaviour is consistent across roles, states, routes, platforms, and environments.
- Failures are observable and recoverable.
- Shared primitives or contracts prevent repeated defects.
- Exceptions are intentional, documented, and testable.
- User-facing claims match actual behaviour.
