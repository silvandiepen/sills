---
title: Security audit
description: Perform a passive, non-destructive application and supply-chain security review.
slug: /skills/security
section: Skills
order: 7
skill: sills-audit-security
package: sills-audit-security
status: available
---

# Security audit

Perform a passive, non-destructive application and supply-chain security review.

## Install

```bash
npx sills-audit-security install
```

## Use

```text
$sills-audit-security Audit this project.
```

## What it inspects

Threat boundaries, auth, sessions, authorization, input handling, APIs, secrets, headers, dependencies, GitHub Actions, npm publishing, business logic, and iOS security.

## What it gives you

A dated human-readable report, structured JSON, coverage inventory, evidence, positive findings, limitations, prioritised recommendations, verification instructions, and remediation handoff.

## Modes

Source, runtime, full, changed, CI, and verification modes are supported where the environment permits. Quick, standard, and deep depth profiles are available.

## Safety

The skill does not modify the product. It may write only inside the selected audit directory. Runtime actions are non-destructive and production defaults to observation.

## Limitations

The report states which routes, roles, workflows, states, platforms, and tools were not tested. Automated passes are not proof of complete quality or compliance.
