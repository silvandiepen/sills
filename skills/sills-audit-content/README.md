# sills-audit-content

<p>
  <img src="https://raw.githubusercontent.com/silvandiepen/sills/main/sills.svg" alt="Sills" width="180">
</p>

Determine whether the product is clear, coherent, credible, understandable, and written for its users.

## Install

```bash
npx sills-audit-content install
```

The installer supports `--codex`, `--claude`, `--global`, `--force`, `--dry-run`, and `--target PATH`.

## Use

```text
$sills-audit-content Audit this project.
```

## What it inspects

Product purpose, audience, navigation, information architecture, terminology, UX writing, grammar, onboarding, states, localisation, marketing claims, documentation coherence, and AI-generated filler.

## What it gives you

- A dated human-readable audit report.
- Structured JSON for automation and remediation agents.
- Explicit tested and untested coverage.
- Evidence, raw tool output, and manual-review queues.
- Prioritised findings with severity, confidence, impact, recommendations, and verification steps.
- Concrete positive findings worth preserving.
- A remediation handoff another agent can follow.

## Modes

`source`, `runtime`, `full`, `changed`, `ci`, and `verify`, with `quick`, `standard`, and `deep` depth profiles where the environment permits.

## Report-only safety

The skill never changes the audited product. It may create files only inside the selected audit directory. It does not install dependencies into the project or mutate real data.

## Limitations

The report states all unavailable roles, routes, workflows, states, platforms, and tools. Automated passes are not proof of complete quality, compliance, or security.
