# Methodology

Code quality is judged by reading code, not only by reading metrics. Tools point at hotspots; the audit decides whether each one is a real problem.

## Sequence

1. **Establish the project's own standard first.** Read style guides, linter and formatter config, `tsconfig` strictness, documented size and complexity limits, and accepted exceptions. Project rules override universal defaults.
2. **Detect languages and packages** in scope and choose collectors accordingly. A polyglot repository needs per-language coverage; record any language you could not analyse.
3. **Run collectors read-only** and capture their raw output as evidence.
4. **Rank hotspots** by combined signal: high complexity, high duplication, heavy inbound dependency, and recent churn if available. Audit the top hotspots deeply rather than reporting every metric.
5. **Read each hotspot** and classify it: necessary essential complexity, accidental complexity, or defect risk.
6. **Propose a concrete simplification** for accidental complexity, naming the trade-off. Do not recommend change for intentional, well-tested, well-documented code.
7. **Look for cross-cutting patterns** — the same anti-pattern repeated across the codebase is more important than any single instance.

## Judging necessity

For every complexity or duplication hotspot, answer explicitly:

- What makes this complex — branching, state, generics, indirection, or genuine domain complexity?
- Is the complexity essential to the problem, or accidental to the current implementation?
- Is it covered by tests, so a simplification is safe to attempt?
- What is the simplest change that would reduce it, and what does that change cost?

An audit that only lists high numbers is not useful. An audit that explains which numbers matter, why, and what to do is.

## Evidence discipline

- Prefer confirmed tool output plus a manual read over either alone.
- Duplication reported by a tool may be incidental (generated code, similar-but-independent logic). Confirm semantic duplication before recommending an abstraction — a premature abstraction is itself a quality problem.
- Dead-code and unused-dependency reports have false positives (dynamic imports, config-only usage, CLI entry points). Mark them `medium` confidence and require manual verification before removal.
