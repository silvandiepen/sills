# Platforms and tools

The bundled collectors (`scripts/collect.mjs`) wrap these tools read-only. Use whichever fit the detected languages, record the tool name and version, preserve raw output under the audit directory, and treat every result as one evidence source. A clean run is never proof of quality.

## Bundled collectors

| Collector | Wraps | Measures | Notes |
|---|---|---|---|
| `metrics` | [`scc`](https://github.com/boyter/scc) | lines of code, complexity estimate, DRYness, COCOMO | Very fast, ~universal language coverage. Complexity is an estimate, not per-function cyclomatic. |
| `complexity` | [`lizard`](https://github.com/terryyin/lizard) | per-function cyclomatic complexity, parameters, length | 15+ languages. Reports functions above its threshold as warnings. |
| `duplication` | [`jscpd`](https://github.com/kucherenko/jscpd) | token-level copy-paste clones, duplication percentage | 150+ languages via Prism grammars. |
| `dependencies` | [`madge`](https://github.com/pahen/madge), [`depcheck`](https://github.com/depcheck/depcheck) | circular imports, unused and missing dependencies | JS/TS. Expect false positives; verify before removal. |

Collectors never install these tools. When a tool is absent, the collector returns `toolAvailable: false` with a limitation and an install hint, and the audit continues with manual analysis.

## Additional tools to use manually when present

- **Cognitive complexity (JS/TS):** ESLint `complexity` rule and [`eslint-plugin-sonarjs`](https://github.com/SonarSource/eslint-plugin-sonarjs). Run with the project config, never with `--fix`.
- **Dead code / unused exports (JS/TS):** [`knip`](https://github.com/webpro-nl/knip), [`ts-prune`](https://github.com/nadeesha/ts-prune).
- **Type safety (TS):** [`type-coverage`](https://github.com/plantain-00/type-coverage).
- **Python:** [`radon`](https://github.com/rubik/radon) (complexity), [`vulture`](https://github.com/jendrikseipp/vulture) (dead code), `ruff`.
- **Go:** `gocyclo`, `staticcheck`.
- **Rust:** `clippy`.
- **Multi-language duplication:** PMD `CPD`. Heavier setups: SonarQube.

## What tools do not prove

- A low complexity score does not mean the code is correct, tested, or readable.
- Zero reported duplication does not mean there is no semantic duplication.
- An "unused" dependency may be used dynamically, by config, or by a build step.
- Passing the project linter is a floor, not a ceiling. Record clean runs as coverage facts, not endorsements.
