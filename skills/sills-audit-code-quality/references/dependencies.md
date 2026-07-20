# Dependencies and dead code

Unused code and dependencies inflate build size, slow tooling, widen the attack surface, and mislead readers about what the system does. Circular dependencies make code hard to test, reason about, and tree-shake.

## What to look at

- **Circular dependencies**: import cycles between modules. `madge --circular` and `dependency-cruiser` detect them for JS/TS. A cycle is a strong signal of a missing boundary or a leaked responsibility.
- **Unused dependencies**: declared in `package.json` but never imported. `depcheck` and `knip` report these.
- **Missing dependencies**: imported but not declared — a latent break for a fresh install. `depcheck` reports these too.
- **Dead code**: unused exports, files, and symbols. `knip` and `ts-prune` cover TS/JS.
- **Version drift**: multiple major versions of the same library across a monorepo.

## False positives are common

Treat every automated removal candidate as `medium` confidence and require manual verification:

- Dependencies used only by config, CLI, build scripts, or type-only imports look "unused" to some tools.
- Dynamic imports, string-based requires, and framework auto-loading hide real usage.
- Entry points and public package exports are not dead code even when nothing internal imports them.

## Recommendations

- For circular dependencies, recommend breaking the cycle at the weakest edge — often by extracting a shared type or moving a function — and cross-reference the architecture audit when the cycle reflects a structural boundary problem.
- For unused dependencies and dead code, recommend removal only after listing how you would confirm the item is truly unused, and note the size or security benefit.
- Report clean results honestly: "no circular dependencies were detected in the scanned extensions" is a coverage statement, not a guarantee.
