# Evidence and reporting

## Required specialist output

Write `reports/performance.md` and findings prefixed `PERF-`.

Each issue finding must identify:

- what was directly observed;
- which automated or static result supports it;
- what is inferred rather than proven;
- the affected scope and user or operational impact;
- severity, confidence, and release-blocker status;
- evidence paths and reproducible steps;
- a recommendation and verification procedure;
- related findings or likely shared root causes.

Positive findings require the same evidence discipline. Limitations must state the missing access, tool, role, environment, dataset, device, or expertise and how that constrains the conclusion.

Never copy secrets, tokens, cookies, personal data, private payloads, or confidential logs into the report.
