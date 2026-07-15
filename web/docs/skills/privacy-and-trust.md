---
title: Privacy and trust audit
description: Data practice, consent, transparency, user control, and trustworthy-product audit.
slug: /skills/privacy-and-trust
section: Skills
order: 13
skill: sills-audit-privacy-and-trust
package: sills-audit-privacy-and-trust
status: available
---

# Privacy and trust audit

Compare what the product says, what the interface asks, and what the implementation appears to collect or expose.

## Install

```bash
npx sills-audit-privacy-and-trust install
```

## Use

```text
$sills-audit-privacy-and-trust Audit this project.
```

## What it inspects

Data inventory and flows, purpose limitation, minimization, consent, withdrawal, permissions, analytics, ads, identifiers, cookies, SDKs, retention, deletion, export, account closure, backups, logs, support access, third parties, cross-border context, minors, sensitive categories, AI use and disclosure, automated decisions, dark patterns, policy accuracy, and user-facing controls.

## What it gives you

A dated human-readable specialist report, structured findings, coverage inventory, evidence, positive findings, limitations, prioritised recommendations, verification instructions, and remediation handoff.

## How it works

1. Read privacy notices, consent language, data maps, product requirements, SDK inventories, and retention documentation.
2. Inventory collected, inferred, transmitted, stored, logged, displayed, exported, and deleted data by role and workflow.
3. Compare stated purposes and user controls with source, runtime requests, permissions, and third-party integrations.
4. Inspect high-stakes, children, health, financial, location, communication, biometric, and AI-related contexts carefully.
5. Identify manipulative choice architecture, hidden defaults, misleading reassurance, or asymmetrical cancellation and deletion.
6. Map findings to relevant technical or regulatory frameworks only as context; do not provide legal conclusions.

## Modes

Source, runtime, full, changed, CI, and verification modes are supported where the environment permits. Quick, standard, and deep depth profiles are available.

## Safety

The skill is report-only. It may write only inside the selected audit directory and never changes product code, configuration, dependencies, data, deployments, releases, or external services.

## Limitations

This is not legal advice, regulatory certification, or proof of privacy compliance. Data may flow through unavailable infrastructure or processors. Report jurisdiction, production, contractual, retention, backup, and human-process gaps explicitly.
