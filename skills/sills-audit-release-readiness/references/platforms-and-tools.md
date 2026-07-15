# Platforms and tools

Prefer existing CI results, release artifacts, deployment manifests, feature-flag configuration, migration plans, runbooks, monitoring definitions, store metadata, and prior audit reports. Do not deploy, approve, merge, or submit a release.

## Tool rules

- Record tool name, version, configuration, environment, and timestamp.
- Preserve raw output under the audit directory when safe.
- Prefer repeatable scripts and machine-readable output.
- Treat tool failures and partial results as limitations.
- Do not install into or mutate the audited project.

## Limitations

The audit cannot guarantee production behaviour or replace accountable release ownership. Missing access to production, stores, dashboards, or third-party systems must be reported as missing evidence, not assumed success.
