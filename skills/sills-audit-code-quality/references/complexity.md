# Complexity

Assess both machine complexity and human complexity, and always tie a number to a decision.

## What to look at

- **Cyclomatic complexity**: independent paths through a function. High counts mean many branches to test and reason about. `lizard` reports this across languages; ESLint's `complexity` rule covers JS/TS.
- **Cognitive complexity**: how hard code is to follow (nesting, breaks in flow, mixed concerns). `eslint-plugin-sonarjs` measures this for JS/TS. It often matters more than cyclomatic complexity for maintainability.
- **Function and file length**: long units concentrate responsibility and resist testing. Length is a signal, not a verdict — a long, flat, well-named function can be clearer than several tangled small ones.
- **Parameter counts and deep nesting**: high arity and deep nesting are reliable smells.
- **Boolean and control-flow density**: many flags, early returns, and special cases suggest a missing model.

## Thresholds

Prefer the project's documented limits. When none exist, use conventional defaults as a starting point and state them: cyclomatic complexity above ~15 per function warrants a look, above ~30 is usually a real problem; nesting beyond ~4 levels is a smell. Never present a threshold as an absolute rule.

## From metric to recommendation

For each flagged unit, decide whether the complexity is:

- **Essential** — inherent to the domain (a real state machine, a parser, a protocol). Leave it, and note that tests and documentation matter more than splitting it.
- **Accidental** — caused by the implementation (duplicated branches, flag arguments, missing polymorphism, inlined concerns). Recommend a specific reduction: extract a well-named function, replace a flag with two functions, table-drive a switch, introduce a small type, or invert a guard.

Report the highest-value hotspots with a concrete before/after direction, not a full list of every function above a number.
