# Sills Agent Readiness Standard

The standard evaluates whether agents receive enough reliable context and operational guidance to work without inventing project facts or taking unsafe actions. It is deliberately outcome-based: repositories may use different filenames and structures when they provide equivalent, discoverable information.

## Domains

1. **Instruction hierarchy** - Canonical and agent-specific instructions are discoverable, scoped, non-conflicting, and concise.
2. **Project truth** - Purpose, users, terminology, requirements, and current product behaviour have identifiable authoritative sources.
3. **Architecture and decisions** - System boundaries, data flows, integrations, trade-offs, and material decisions are documented and current.
4. **Repository navigation** - Applications, packages, entry points, generated files, tests, schemas, migrations, and ownership are understandable.
5. **Executable workflows** - Setup, development, build, test, lint, migration, preview, release, deployment, and rollback guidance matches the repository.
6. **Safety boundaries** - Secrets, production access, destructive commands, data changes, external services, and protected files have explicit rules.
7. **Context efficiency** - High-value guidance is concise, progressively disclosed, and placed where agents discover it.
8. **Continuity** - Current status, unfinished work, known issues, open decisions, and handoff information support reliable session resumption.
9. **Drift control** - Documentation, commands, paths, examples, and decisions are checked against implementation and maintained over time.
10. **Cross-agent portability** - Canonical rules remain shared while Claude-, Codex-, or tool-specific adapters are minimal and justified.

## Level assignment

Assign `unprepared`, `basic`, `usable`, `strong`, or `agent-native` only after evaluating every applicable domain. A repository cannot be `strong` or `agent-native` when essential commands are unverified, safety boundaries are missing, or authoritative sources materially contradict one another.

Do not calculate a fake percentage. State the level, confidence, coverage, strongest domains, weakest domains, and evidence that would change the assessment.
