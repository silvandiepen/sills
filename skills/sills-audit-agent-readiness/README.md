# sills-audit-agent-readiness

<p>
  <img src="https://raw.githubusercontent.com/silvandiepen/sills/main/sills.svg" alt="Sills" width="180">
</p>

Audit whether a repository is understandable, efficient, and safe for Claude Code, Codex, and other coding agents.

## Install

```bash
npx sills-audit-agent-readiness install
```

## Use

```text
$sills-audit-agent-readiness Audit this repository for agent readiness.
```

## What it inspects

Agent instruction files, project truth, architecture and decisions, repository maps, documented commands, environment guidance, testing and release workflows, safety boundaries, context efficiency, stale or contradictory documentation, cross-agent portability, and continuity between sessions.

## What it gives you

A dated report, structured findings, documentation and contradiction inventories, a repository knowledge map, an evidence-based Sills Agent Readiness level, positive findings, limitations, and a prioritised remediation handoff.

## Report-only safety

The skill never creates or rewrites project documentation during the audit. It writes only inside the selected audit directory.
