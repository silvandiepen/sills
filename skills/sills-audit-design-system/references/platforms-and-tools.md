# Platforms and tools

Use source search, dependency and import analysis, rendered-state screenshots, computed styles, token validation, Storybook or equivalent catalogues, visual-regression evidence, and project design documentation. Do not require a specific design tool integration.

## Tool rules

- Record tool name, version, configuration, environment, and timestamp.
- Preserve raw output under the audit directory when safe.
- Prefer repeatable scripts and machine-readable output.
- Treat tool failures and partial results as limitations.
- Do not install into or mutate the audited project.

## Limitations

Visual similarity alone does not prove shared implementation, and shared implementation does not prove a good user experience. Do not enforce one design-system methodology universally or label intentional product variation as drift without evidence.
