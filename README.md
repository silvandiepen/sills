# Sills

Sills is an open-source suite of report-only Agent Skills for auditing websites, web applications, supported native applications, and software repositories.

The suite is built for Claude Code and OpenAI Codex using the shared Agent Skills format. It discovers the product before judging it, gathers source and runtime evidence, records what was and was not tested, and writes dated reports that another agent can use for remediation.

## Skills

| Skill | npm package | Purpose |
|---|---|---|
| `sills-audit` | `sills-audit` | Full-project audit and orchestration |
| `sills-audit-accessibility` | `sills-audit-accessibility` | Accessibility and inclusive-design audit |
| `sills-audit-experience` | `sills-audit-experience` | Visual, usability, interaction, responsiveness, and perceived-performance audit |
| `sills-audit-content` | `sills-audit-content` | Product clarity, information architecture, UX writing, and content-coherence audit |
| `sills-audit-architecture` | `sills-audit-architecture` | Repository and application architecture audit |
| `sills-audit-security` | `sills-audit-security` | Application, repository, dependency, CI/CD, and supply-chain security audit |

## Install

```bash
npx sills-audit install
```

This installs the complete suite into both `.agents/skills/` and `.claude/skills/` in the current project. Use `--codex`, `--claude`, or `--global` to narrow the destination.

```bash
npx sills-audit install --codex
npx sills-audit install --claude --global
npx sills-audit-accessibility install
```

## Run

In Codex:

```text
$sills-audit Do a full audit of this project.
```

In Claude Code, mention the installed skill by name or invoke it explicitly according to the client.

The default output is a dated folder:

```text
audit/2026-07-15/
├── index.md
├── summary.md
├── report.md
├── report.json
├── manifest.json
├── handoff.md
├── coverage.json
├── reports/
├── findings/
├── evidence/
└── raw/
```

Audit skills never modify the audited project outside the selected audit directory.

## Development

```bash
npm install
npm test
npm run validate
npm run pack:check
```

Public website content for Girky lives in [`web/docs`](web/docs).

## Status

The repository currently provides the version-one skill suite, installer, report schemas, audit scaffolding, fixtures, evaluation manifests, website documentation, CI, and npm release automation. Audit quality still depends on the capabilities available to the invoking agent and environment; every report must state its coverage and limitations.

## License

MIT
