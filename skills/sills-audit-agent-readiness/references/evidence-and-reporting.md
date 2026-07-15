# Evidence and reporting

## Evidence classes

- **Observed:** file contents, repository structure, configuration, source, or generated output inspected directly.
- **Executed:** result of a safe command or validation workflow run during the audit.
- **Documented:** a claim made by project documentation but not independently verified.
- **Contradicted:** documentation conflicts with another authoritative source or implementation evidence.
- **Inferred:** a conclusion supported by patterns but not directly confirmed.
- **Manual review:** requires an owner, unavailable system, private environment, or destructive workflow.

## Report sections

1. Executive assessment and readiness level.
2. Scope, supported agents, environments, and limitations.
3. Instruction hierarchy and authority map.
4. Documentation inventory and contradiction summary.
5. Repository navigation and context-efficiency findings.
6. Verified and unverified workflow matrix.
7. Safety and permission boundaries.
8. Decision quality and session continuity.
9. Positive patterns worth preserving.
10. Prioritised findings and recommended documentation plan.

## Finding categories

Use categories such as `instructions`, `project-truth`, `architecture-context`, `decisions`, `repository-map`, `workflow`, `safety`, `context-efficiency`, `continuity`, `drift`, and `cross-agent`.

A missing `decisions.md` is not automatically a defect. Report the missing capability only when important decisions are not captured elsewhere. Recommendations may name a suitable file and outline its sections, but the audit must not create it.
