# sills-audit-localization

<p>
  <img src="https://raw.githubusercontent.com/silvandiepen/sills/main/sills.svg" alt="Sills" width="180">
</p>

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

A dated specialist report, structured findings, coverage inventory, evidence, positive findings, limitations, prioritised recommendations, verification instructions, and remediation handoff. It never changes the audited product.

## Modes

`source`, `runtime`, `full`, `changed`, `ci`, and `verify`, with `quick`, `standard`, and `deep` depth profiles.
