# sills-audit-security

<p>
  <img src="https://raw.githubusercontent.com/silvandiepen/sills/main/sills.svg" alt="Sills" width="180">
</p>

Perform a passive, non-destructive security review across application, repository, dependencies, CI/CD, supply chain, web, API, and supported iOS surfaces.

## Install

```bash
npx sills-audit-security install
```

The installer supports `--codex`, `--claude`, `--global`, `--force`, `--dry-run`, and `--target PATH`.

## Use

```text
$sills-audit-security Audit this project.
```

## What it inspects

Threat boundaries, authentication, sessions, authorization, tenant isolation, input handling, secrets, data exposure, headers, dependencies, GitHub Actions, npm publishing, business logic, and iOS platform security.

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
