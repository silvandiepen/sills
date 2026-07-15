# Reporting standard

A Sills audit is useful only when its scope, evidence, and limitations are explicit.

## Required outputs

- `index.md`: navigation for the audit folder.
- `summary.md`: short, decision-oriented overview.
- `report.md`: complete human-readable report.
- `report.json`: machine-readable report matching `schemas/audit-report.schema.json`.
- `manifest.json`: files, tool versions, timestamps, and checksums when practical.
- `coverage.json`: inventory of tested and untested routes, roles, workflows, states, packages, and platforms.
- `handoff.md`: instructions for a later remediation agent.
- Specialist reports, finding files, evidence, and raw tool output.

## Integrity rules

- State whether evidence was observed, automatically detected, manually verified, inferred, or only documented.
- A tool failure is a limitation, not a passing result.
- Do not convert an automated pass into a compliance claim.
- Do not report source locations unless they were actually resolved.
- Keep subjective design judgement separate from measurable defects.
- Positive findings require concrete evidence.
