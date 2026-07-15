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

## Task execution

Use the Tasks section and report.json as the implementation queue. Resolve tasks in priority order, inspect every linked finding, preserve original evidence, meet acceptance criteria, run verification, and update task and finding status without deleting the original audit record.
