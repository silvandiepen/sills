---
name: sills-audit-agent-readiness
description: Audit whether a software repository is properly prepared for Claude Code, Codex, and other AI coding agents to understand, navigate, modify, test, and release safely. Use to review AGENTS.md, CLAUDE.md, README and project documentation, architecture and decision records, repository maps, executable workflows, context efficiency, instruction conflicts, stale documentation, safety boundaries, and continuity between agent sessions.
license: MIT
metadata:
  author: Sil van Diepen
  version: "0.1.0"
---

# Agent Readiness Audit

Determine whether an AI coding agent can work in the repository accurately, efficiently, and safely without relying on guesswork.

## Non-negotiable contract

- Do not modify application code, documentation, configuration, dependencies, lockfiles, generated files, data, or repository structure.
- Create files only inside the selected dated audit directory.
- Suggestions, document outlines, and verification steps are allowed; writing or fixing project documentation is not.
- Never invent project facts, commands, file paths, decisions, standards, tool support, or successful workflow results.
- Distinguish observed evidence, executed checks, documentation claims, inference, contradictions, and manual-review requirements.
- Include concrete positive findings. Do not manufacture praise.
- Do not impose a fixed document set when the repository provides the same information through another clear and maintained structure.
- A complete-looking documentation tree is not proof that agents can safely operate the repository.

## Supported modes

- `source`: inspect repository instructions, documentation, structure, configuration, and workflows.
- `runtime`: verify documented non-destructive setup, build, test, lint, preview, or development workflows when safe.
- `full`: combine source inspection with workflow verification.
- `changed`: inspect changes to agent instructions, documentation, commands, architecture, and affected project context.
- `ci`: run non-interactively and produce machine-readable findings.
- `verify`: retest findings from an earlier agent-readiness report without changing the project.

Depth is independent: `quick`, `standard`, or `deep`. Default to `full` and `standard` when safe workflow verification is available; otherwise use `source` and state the limitation.

## Before auditing

1. Read repository-level and nested `AGENTS.md`, `CLAUDE.md`, README files, contributor guidance, security policy, and any agent-specific instruction files.
2. Inventory requirements, architecture, system, feature, API, data-model, integration, operational, test, release, roadmap, status, decision, ADR, and glossary documentation.
3. Determine supported agents, IDEs, package managers, languages, frameworks, services, deployment targets, and repository topology.
4. Identify which files are authoritative, generated, historical, superseded, local-only, or scoped to a subtree.
5. Locate prior audits, current work status, open decisions, known issues, handoff notes, and unfinished migrations.
6. Establish which documented commands can be verified safely without changing the project or external systems.

## Output

Default to `audit/YYYY-MM-DD/`; use `-02`, `-03`, and so on for repeated runs on the same date.

Write the shared Sills files plus:

- `reports/agent-readiness.md`
- a documentation inventory and authority map
- an instruction-scope and contradiction inventory
- a verified-command matrix
- individual finding files when useful
- evidence and raw outputs for executed checks

Use finding IDs `AGENT-0001`, `AGENT-0002`, and so on.

Each finding must include category, kind, title, severity when applicable, release-blocker status, confidence, origin, scope, user or agent impact, evidence or manual-review reason, expected and observed results, recommendation, and verification instructions.

## Audit procedure

1. **Map instruction discovery and precedence.** Determine which agent instructions load, where they apply, whether nested scopes are clear, and whether Claude, Codex, and generic Agent Skills receive equivalent project truth.
2. **Build the repository knowledge map.** Record applications, packages, entry points, maintained versus generated files, ownership boundaries, tests, schemas, migrations, services, and deployment surfaces.
3. **Identify authoritative product and system truth.** Check whether purpose, users, requirements, terminology, architecture, data flows, integrations, and operational goals are documented clearly enough to prevent invention.
4. **Audit decisions and change history.** Check whether material decisions include context, alternatives, consequences, status, supersession, and alignment with the implementation.
5. **Verify executable workflows.** Compare documented setup, environment, development, build, lint, test, migration, preview, deployment, rollback, and release commands with actual configuration. Execute only safe, non-destructive checks.
6. **Audit safety and permission boundaries.** Check production restrictions, secret handling, generated files, destructive commands, migrations, external services, test accounts, data handling, and allowed write scopes.
7. **Assess context efficiency.** Look for concise high-level guidance, progressive disclosure, scoped detail, duplicated context, enormous instruction files, irrelevant boilerplate, and information hidden where agents will not discover it.
8. **Assess continuity between sessions.** Check current status, completed and unfinished work, known issues, roadmap, open decisions, ownership, and whether a new agent can resume without reconstructing recent history.
9. **Detect drift and contradiction.** Compare documentation with scripts, configuration, source structure, CI, deployment, package-manager usage, and other documentation. Flag stale paths, commands, names, versions, or conflicting instructions.
10. **Assess cross-agent portability.** Distinguish canonical project rules from Claude- or Codex-specific adapters and check that one agent is not receiving materially different safety or architecture guidance without a reason.
11. **Assign an evidence-based readiness level.** Use the Sills Agent Readiness Standard only when coverage is sufficient; do not replace findings with a score.
12. **Record positive patterns, limitations, and untested areas.** Preserve structures that already help agents work correctly.
13. **Write the specialist report and remediation handoff.** Recommend exact missing documents or sections when needed, but do not create them.
14. **Validate integrity.** Confirm no file outside the audit directory changed and that every claim is supported or labelled as inference or manual review.

## Sills Agent Readiness levels

- `unprepared`: agents must infer basic project purpose, structure, or safe workflows.
- `basic`: some useful guidance exists, but important context, commands, or boundaries are missing or unreliable.
- `usable`: an agent can complete routine work with manageable gaps and explicit manual confirmation.
- `strong`: authoritative context, scoped instructions, verified workflows, decisions, and safety boundaries are clear and maintained.
- `agent-native`: the repository provides concise, discoverable, tested, cross-agent context with strong continuity and low documentation drift.

A level is a summary assessment, not a compliance claim. Report domain-level strengths and gaps, coverage, and confidence alongside it.

## Severity and confidence

- Severity: `critical`, `major`, `moderate`, `minor`, `observation`.
- Confidence: `confirmed`, `high`, `medium`, `low`, `requires-manual-verification`.
- `releaseBlocker` is a separate boolean.

## References

Read only the references relevant to the repository and scope:

- `references/agent-readiness-standard.md`
- `references/checklist.md`
- `references/methodology.md`
- `references/evidence-and-reporting.md`
- `references/platforms-and-tools.md`

<!-- sills:shared-report-contract:start -->
## Shared report and runtime-intake contract

Before writing any Agent readiness audit output, read `references/report-contract.md` and use the bundled report template.

- Begin with a professional status conclusion using the universal Sills health level and an audit-specific label.
- Report the relevant status dimensions rather than hiding materially different strengths and weaknesses behind one label.
- Include a ship decision only when this specialist has enough evidence to justify one.
- Include a prioritised Tasks section with traceable actions, acceptance criteria, and verification.
- Keep the standard section order so every Sills report is immediately comparable.
- When runtime web coverage is relevant and no usable URL is supplied or documented, ask once for live, staging, preview, or local URLs and their environment and role. Continue source analysis if none are provided.
- In CI mode, never prompt; record absent runtime targets as a limitation.

Recommended status dimensions: Instructions; Project knowledge; Decisions; Workflows; Safety and continuity.
<!-- sills:shared-report-contract:end -->
