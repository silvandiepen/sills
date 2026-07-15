# Performance Audit checklist

## Core coverage

Core Web Vitals, startup and route transitions, request waterfalls, caching, bundle and asset weight, main-thread work, long tasks, rendering, layout shifts, scroll and animation smoothness, memory growth, battery-sensitive work, background activity, and performance budgets.

## Positive evidence to record

- Meaningful performance budgets are enforced in CI.
- Field telemetry is segmented and actionable.
- Primary interactions remain responsive under realistic load.
- Assets, caching, and rendering are intentionally designed.

## Cross-cutting checks

- Documentation and implementation agree.
- Important behaviour is consistent across roles, states, routes, platforms, and environments.
- Failures are observable and recoverable.
- Shared primitives or contracts prevent repeated defects.
- Exceptions are intentional, documented, and testable.
- User-facing claims match actual behaviour.
