---
title: Sills
description: Evidence-based audit skills for exceptional websites and apps.
slug: /
section: Home
order: 1
---

# Audit the whole codebase, not just a checklist

Sills is a suite of report-only Agent Skills for Claude Code and Codex. It investigates sixteen specialist disciplines across source code and running products, then combines the evidence into reports another agent can use for remediation.

A Sills audit starts by discovering what the product is, who uses it, how it is structured, which workflows matter, and what documentation already says. It then gathers evidence, records coverage, separates facts from judgement, preserves positive patterns, and states what could not be tested.

## Install

```bash
npx sills-audit install
```

This installs the `$sills` shortcut, `$sills-audit`, and all specialist skills into both `.agents/skills/` and `.claude/skills/` in the current project. Use `--codex`, `--claude`, `--global`, `--force`, `--dry-run`, or `--target PATH` when you need a narrower install.

## Run

```text
$sills audit api
$sills-audit Do a full audit of this project.
```

Sills defaults to source and runtime analysis when both are available, standard depth, and a dated `audit/` directory. You can run in `source`, `runtime`, `full`, `changed`, `ci`, or `verify` mode, with `quick`, `standard`, or `deep` depth.

## The specialist skills

- [Accessibility](/skills/accessibility): WCAG, keyboard, focus, screen readers, reflow, Dynamic Type, VoiceOver, and inclusive design.
- [Product experience](/skills/experience): visual hierarchy, interaction, responsiveness, usability, lag, jank, and product coherence.
- [Content quality](/skills/content): clarity, information architecture, UX writing, terminology, onboarding, and AI-slop indicators.
- [Codebase architecture](/skills/architecture): repository structure, boundaries, components, services, state, coupling, and maintainability.
- [Security](/skills/security): authentication, authorization, data exposure, dependencies, CI/CD, supply chain, web controls, and iOS security.
- [Performance](/skills/performance): loading, responsiveness, stability, rendering, assets, caching, and resource efficiency.
- [Design system](/skills/design-system): tokens, components, states, accessibility contracts, adoption, and governance.
- [Release readiness](/skills/release-readiness): launch evidence, migrations, operations, monitoring, rollback, and ownership.
- [Localization](/skills/localization): translations, locale behaviour, formatting, RTL, text expansion, and fallback handling.
- [Testing strategy](/skills/testing-strategy): risk coverage, test architecture, reliability, speed, fixtures, and CI confidence.
- [Privacy and trust](/skills/privacy-and-trust): data practices, consent, transparency, deletion, tracking, and trustworthy controls.
- [SEO](/skills/seo): crawlability, indexability, metadata, structured data, content, and discoverability.
- [API design](/skills/api-design): contracts, consistency, errors, lifecycle, security, compatibility, and developer experience.
- [Agent readiness](/skills/agent-readiness): agent instructions, project context, decisions, workflows, safety boundaries, continuity, and documentation drift.

## What you receive

Every audit writes human-readable Markdown, structured JSON, coverage data, evidence, raw tool results, positive findings, limitations, and a handoff file for a later remediation agent. Start with `summary.md`, use `report.md` for detail, and treat `report.json` as authoritative for automation.

## Report-only by design

Audit skills do not fix code, edit content, install dependencies into the project, change configuration, deploy, publish, approve releases, or mutate product data. They may write only inside the selected dated audit directory.
