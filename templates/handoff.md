# Remediation handoff

Read `report.json` as the source of truth and `report.md` for context.

## Rules for the remediation agent

1. Work only on findings with `status: open` unless the user narrows scope.
2. Resolve release blockers first, then critical, major, moderate, and minor findings.
3. Read related findings before changing shared components or services.
4. Preserve positive patterns named in the audit.
5. Do not assume a recommendation is the only valid implementation.
6. Verify each resolved finding using its `verification` steps.
7. Update finding status and attach new evidence; never delete the original evidence.
8. Run relevant regression checks after every group of fixes.

## Audit limitations

{{limitations}}
