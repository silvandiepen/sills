# Release Readiness Audit checklist

## Core coverage

Release scope, acceptance criteria, unresolved blockers, CI status, test evidence, migrations, feature flags, configuration, secrets, observability, alerting, support readiness, runbooks, rollback, backups, data integrity, compatibility, app-store requirements, deployment ownership, communication, and post-release verification.

## Positive evidence to record

- Release criteria are explicit and traceable.
- Rollback and migration recovery are tested.
- Monitoring covers user impact rather than infrastructure only.
- Known risks have owners, deadlines, and acceptance rationale.

## Cross-cutting checks

- Documentation and implementation agree.
- Important behaviour is consistent across roles, states, routes, platforms, and environments.
- Failures are observable and recoverable.
- Shared primitives or contracts prevent repeated defects.
- Exceptions are intentional, documented, and testable.
- User-facing claims match actual behaviour.
