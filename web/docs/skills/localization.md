---
title: Localization audit
description: Internationalization, translation, locale, RTL, formatting, and content-fit audit.
slug: /skills/localization
section: Skills
order: 11
skill: sills-audit-localization
package: sills-audit-localization
status: available
---

# Localization audit

Verify that supported locales are structurally supported, linguistically coherent, and usable in real layouts and workflows.

## Install

```bash
npx sills-audit-localization install
```

## Use

```text
$sills-audit-localization Audit this project.
```

## What it inspects

Locale inventory, source and runtime strings, extraction, keys, fallback chains, plural and gender rules, interpolation, date/time/number/currency formatting, time zones, collation, search, addresses, names, phone numbers, input methods, Unicode, fonts, text expansion, truncation, RTL and bidirectional behaviour, media, legal content, and translation workflow.

## What it gives you

A dated human-readable specialist report, structured findings, coverage inventory, evidence, positive findings, limitations, prioritised recommendations, verification instructions, and remediation handoff.

## How it works

1. Determine supported, partially supported, default, and fallback locales from documentation and code.
2. Inventory user-visible strings and identify hard-coded, concatenated, dynamically generated, or unextractable text.
3. Exercise representative workflows in long-text, RTL, non-Latin, multi-byte, and locale-specific formatting conditions.
4. Compare terminology and meaning across navigation, actions, errors, notifications, marketing, and documentation.
5. Inspect locale negotiation, persistence, URLs, SEO alternates, server/client agreement, and fallback behaviour.
6. Queue native-speaker or domain-expert review where linguistic quality cannot be verified by the available evidence.

## Modes

Source, runtime, full, changed, CI, and verification modes are supported where the environment permits. Quick, standard, and deep depth profiles are available.

## Safety

The skill is report-only. It may write only inside the selected audit directory and never changes product code, configuration, dependencies, data, deployments, releases, or external services.

## Limitations

Automated language checks cannot establish cultural or domain correctness. Machine translation quality must not be presented as native review. Record untested locales, scripts, devices, fonts, input methods, and legal variants.
