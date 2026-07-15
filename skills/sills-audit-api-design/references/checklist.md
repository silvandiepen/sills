# API Design Audit checklist

## Core coverage

Specifications and schemas, resource and operation modelling, naming, types, validation, errors, status and error codes, pagination, filtering, sorting, search, idempotency, retries, concurrency, caching, authentication, authorization, tenancy, rate limits, versioning, deprecation, compatibility, webhooks, events, SDKs, examples, documentation, observability, SLIs, and implementation drift.

## Positive evidence to record

- Contracts are machine-readable and agree with runtime behaviour.
- Errors and retry behaviour are predictable and actionable.
- Authorization is expressed at resource and operation boundaries.
- Deprecation and compatibility are measurable and documented.

## Cross-cutting checks

- Documentation and implementation agree.
- Important behaviour is consistent across roles, states, routes, platforms, and environments.
- Failures are observable and recoverable.
- Shared primitives or contracts prevent repeated defects.
- Exceptions are intentional, documented, and testable.
- User-facing claims match actual behaviour.
