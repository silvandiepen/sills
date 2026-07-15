# Platforms and tools

Use repository search, test and CI configuration, coverage reports, historical failure data when available, test timings, mutation or contract results if already present, and selective safe execution. Do not add or change tests during the audit.

## Tool rules

- Record tool name, version, configuration, environment, and timestamp.
- Preserve raw output under the audit directory when safe.
- Prefer repeatable scripts and machine-readable output.
- Treat tool failures and partial results as limitations.
- Do not install into or mutate the audited project.

## Limitations

Coverage percentage alone does not measure confidence. A passing suite cannot prove correctness, and an isolated failure may be environmental. Report unavailable history, services, credentials, devices, browsers, and production verification.
