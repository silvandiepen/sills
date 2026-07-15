# Methodology

## Inspection order

1. Repository instructions and nested scopes.
2. Root README, contribution, security, environment, and package-manager configuration.
3. Product, architecture, decision, API, data, integration, testing, operational, and release documents.
4. Actual applications, packages, scripts, CI, deployment configuration, and generated artifacts.
5. Recent status, roadmap, known issues, prior audits, and handoff material.

## Authority mapping

For each important topic, record the source that appears authoritative, competing sources, last meaningful change when available, implementation evidence, and confidence. Missing documentation and contradictory documentation are different findings.

## Workflow verification

- Prefer dry-run, help, list, validation, build, lint, and test operations that do not alter external systems.
- Do not run migrations, deploys, releases, production connections, data deletion, notifications, payments, or irreversible commands.
- Record command, working directory, tool and version, prerequisites, result, duration when useful, and any files changed.
- A command documented but not executable in the available environment remains unverified, not failed.

## Drift testing

Sample claims that are easy to verify: paths, scripts, package names, ports, environment variables, service names, framework versions, generated directories, test locations, and deployment targets. Use repeated contradictions to identify systemic documentation drift.

## Context efficiency

Judge whether the right information reaches the agent at the right scope. More documentation is not automatically better. Prefer a concise root contract, scoped nested guidance, and deeper references loaded when needed.
