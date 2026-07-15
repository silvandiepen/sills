# ADR 0001: Audit skills are report-only

## Decision

All Sills audit skills may write only inside the selected audit output directory. They never alter product code, content, configuration, dependencies, lockfiles, generated files, repository structure, or real data.

## Consequences

Remediation remains a separate workflow. Reports must contain actionable recommendations and verification instructions so another agent can fix findings safely.
