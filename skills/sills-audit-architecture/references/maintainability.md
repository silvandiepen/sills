# Maintainability

Review oversized functions, cognitive complexity, unclear ownership, weak types, unsafe casts, magic values, convention drift, missing critical tests, brittle tests, excessive snapshots, unused dependencies, version drift, stale comments, and documentation contradictions. Prefer project evidence over arbitrary universal thresholds.

For deep, tool-backed complexity, duplication, dead-code, and circular-dependency analysis, defer to `$sills-audit-code-quality`, which owns code-level health metrics. Keep the architecture audit focused on structural boundaries, coupling direction, and responsibility, and cross-reference rather than duplicate code-level findings.
