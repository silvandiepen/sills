# Contributing

## Adding or changing a skill

1. Keep `SKILL.md` concise and procedural.
2. Put detailed standards, platform notes, and examples in `references/`.
3. Keep the npm package name and skill frontmatter name identical.
4. Add or update the corresponding page under `web/docs/skills/`.
5. Add activation and seeded-defect evaluation cases.
6. Preserve report-only behaviour.
7. Run all validation commands.

## Findings integrity

A valid issue finding includes a stable ID, category, severity, confidence, scope, impact, evidence or an explicit manual-review status, recommendation, and verification instructions. Never fabricate selectors, line numbers, measurements, standards, screenshots, traces, or runtime behaviour.

## Pull requests

Use conventional commit messages and explain what changed, why, and how it was validated.
