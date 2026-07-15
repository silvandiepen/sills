---
title: Running an audit
description: Choose audit mode, depth, scope, roles, and runtime behaviour.
slug: /running-an-audit
section: Guide
order: 4
---


# Running an audit

## Modes

- `source`: inspect the repository only.
- `runtime`: inspect a running product only.
- `full`: combine both.
- `changed`: inspect a branch, commit, or pull-request diff and affected areas.
- `ci`: run non-interactively with machine-readable output.
- `verify`: retest an existing report.

## Depth

- `quick`: representative smoke coverage.
- `standard`: default balanced audit.
- `deep`: comprehensive coverage with broader states, roles, viewports, and platform checks.

## Authentication

Sills may use an existing authenticated browser session or test credentials supplied by the user. Reports list every tested role. Credentials, tokens, cookies, personal data, and secrets must not appear in evidence.

## Runtime safety

Sills may start documented development or test commands. It never changes the project to make it start. Temporary records are allowed only in authorised non-production environments and must be documented.
