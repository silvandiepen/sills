# Duplication

Duplication increases the cost and risk of change: a fix in one copy silently misses the others. But not all duplication is bad, and not all abstraction is good.

## What to look at

- **Copy-paste blocks**: `jscpd` detects token-level clones across 150+ languages and reports a duplication percentage plus each clone pair.
- **Structural duplication**: near-identical functions, components, or configuration that differ only in constants.
- **Semantic duplication**: two implementations of the same rule that a tool cannot see because the tokens differ.

## Judging duplication

Before recommending an abstraction, confirm the duplication is **semantic**, not incidental:

- Generated code, snapshots, and vendored files are expected duplicates — exclude them.
- Two blocks that look alike today but change for different reasons should stay separate. Coupling them behind one abstraction is a worse problem than the duplication.
- A shared abstraction is justified when the copies must change together for the same reason.

## Recommendations

- For confirmed semantic duplication, name the shared concept and recommend the smallest extraction that removes the repetition: a function, a component, a constant, a config table, or a shared type.
- Report the overall duplication ratio as context, and highlight the specific high-value clone pairs rather than every match.
- Warn explicitly against premature or speculative abstraction; over-abstraction is itself tracked by this audit (see `references/language-idioms.md`).
