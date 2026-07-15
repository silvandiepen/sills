# Platforms and tools

Prefer existing telemetry and project tooling. For web, use Playwright, browser traces, Lighthouse where useful, Chrome DevTools Protocol, bundle analyzers, and raw network data in isolation. For iOS, use existing Instruments, MetricKit, signposts, XCTest metrics, and simulator/device evidence when available.

## Tool rules

- Record tool name, version, configuration, environment, and timestamp.
- Preserve raw output under the audit directory when safe.
- Prefer repeatable scripts and machine-readable output.
- Treat tool failures and partial results as limitations.
- Do not install into or mutate the audited project.

## Limitations

Lab measurements vary by hardware and configuration. Field data may be missing, sampled, stale, or aggregated. Never invent percentile claims, diagnose production users from one local run, or claim that a Lighthouse score proves a fast experience.
