# Language idioms and anti-patterns

"Best practice" is only meaningful relative to a language and a project. Judge code against the idioms of its own ecosystem and the project's own conventions, not a generic checklist.

## General anti-patterns (most languages)

- Weak or defeated typing: escape hatches used to silence the type system rather than model the problem.
- Magic values: unexplained literals that should be named constants or enums.
- Flag arguments and boolean parameters that select behaviour, where two functions would be clearer.
- Over-abstraction: indirection, generics, or configuration with a single caller; frameworks built for one use.
- Primitive obsession: passing bare strings and numbers where a small type would prevent errors.
- Convention drift: mixed naming, formatting, and structure within one codebase, especially signs of generated or pasted code that was never reconciled.
- Error handling that swallows failures, or that leaks implementation detail.

## Per-language signals

- **TypeScript / JavaScript**: `any`, non-null `!`, unchecked casts, low `type-coverage`, missing `strict`, misuse of `Promise` (unawaited, unhandled rejection), deep prop drilling, and God components. Prefer `eslint` with the project config and `eslint-plugin-sonarjs`.
- **Python**: mutable default arguments, broad `except`, missing type hints where the project uses them, `radon`-flagged complexity. Respect the project's `ruff`/`flake8` config.
- **Go**: ignored errors, `interface{}` overuse, oversized packages, `gocyclo` hotspots.
- **Rust**: `unwrap`/`expect` in library code, `clippy` lints, unnecessary `clone`.
- **Swift / Objective-C**: force unwraps, massive view controllers, retain cycles; respect `swiftlint` config when present.

## Discipline

- Run the project's own linter with its own config as evidence; never run it with `--fix`.
- Distinguish a violation of the project's stated standard (higher confidence) from a violation of a general preference (lower confidence, framed as advice).
- Anti-patterns repeated across many files are a cross-cutting finding and usually more valuable than any single instance.
