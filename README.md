# Sills

<p>
  <img src="./sills.svg" alt="Sills" width="180">
</p>

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
| `sills-audit-performance` | `sills-audit-performance` | Loading, runtime, responsiveness, stability, and resource-efficiency audit |
| `sills-audit-design-system` | `sills-audit-design-system` | Tokens, components, states, adoption, governance, and visual-system audit |
| `sills-audit-release-readiness` | `sills-audit-release-readiness` | Cross-functional launch risk, operations, rollback, and evidence audit |
| `sills-audit-localization` | `sills-audit-localization` | Internationalization, translation, locale, RTL, formatting, and content-fit audit |
| `sills-audit-testing-strategy` | `sills-audit-testing-strategy` | Risk coverage, test architecture, reliability, speed, and maintainability audit |
| `sills-audit-privacy-and-trust` | `sills-audit-privacy-and-trust` | Data practice, consent, transparency, user control, and trustworthy-product audit |
| `sills-audit-seo` | `sills-audit-seo` | Crawlability, indexability, metadata, structured data, content, and discoverability audit |
| `sills-audit-api-design` | `sills-audit-api-design` | Contract, consistency, lifecycle, error, security, and developer-experience audit |
| `sills-audit-agent-readiness` | `sills-audit-agent-readiness` | AI-agent instructions, project context, decisions, workflows, safety, and documentation-drift audit |

## Install

```bash
npx sills-audit install
```

This installs the complete suite into both `.agents/skills/` and `.claude/skills/` in the current project. Use `--codex`, `--claude`, or `--global` to narrow the destination.

```bash
npx sills-audit install --codex
npx sills-audit install --claude --global
npx sills-audit-agent-readiness install
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

The repository provides fourteen specialist audit skills, the umbrella orchestrator, installer, report schemas, audit scaffolding, fixtures, evaluation manifests, website documentation, CI, Cloudflare deployment, and npm release automation. Audit quality still depends on the capabilities available to the invoking agent and environment; every report must state its coverage and limitations.

## License

MIT

## Consistent reports

Every audit uses the same report order, starts with a professional status conclusion, includes audit-specific dimension statuses, and produces a traceable Tasks section. Runtime-capable audits ask for live, staging, preview, or local URLs when none are supplied or documented.
