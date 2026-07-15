# Platforms and tools

Use OpenAPI, AsyncAPI, GraphQL schemas, protobuf or RPC definitions, route and handler inspection, contract tests, generated clients, examples, gateway configuration, passive runtime requests, logs and telemetry when authorised. Never perform destructive or high-volume API testing.

## Tool rules

- Record tool name, version, configuration, environment, and timestamp.
- Preserve raw output under the audit directory when safe.
- Prefer repeatable scripts and machine-readable output.
- Treat tool failures and partial results as limitations.
- Do not install into or mutate the audited project.

## Limitations

Source and specifications may not represent deployed behaviour, and passive samples do not prove every contract. Record unavailable environments, consumers, versions, gateways, rate limits, third parties, events, and production telemetry.
