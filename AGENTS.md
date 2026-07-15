# Repository instructions

This repository contains report-only Agent Skills.

## Non-negotiable rules

- Audit skills never modify an audited project outside its selected audit output directory.
- Every finding must distinguish observed evidence, automated results, inference, and manual-review requirements.
- Do not claim compliance, security, completeness, or absence of defects from automated results.
- Keep canonical skill instructions in `skills/*/SKILL.md`; do not maintain separate Claude and Codex copies.
- Public website content belongs in `web/docs` and must remain useful without reading repository internals.
- Use conventional commits.
- Keep npm packages installable independently.
- Run `npm test`, `npm run validate`, and `npm run pack:check` before release.

## Architecture

- `skills/`: public Agent Skills and npm packages.
- `packages/`: shared repository tooling.
- `schemas/`: machine-readable audit contracts.
- `standards/`: shared audit methodology and report conventions.
- `web/docs/`: Girky website source.
- `fixtures/` and `evals/`: skill evaluation inputs.
