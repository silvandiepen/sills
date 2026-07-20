---
title: Apple review audit
description: Catch likely App Store rejection reasons before you submit, for native and hybrid apps.
slug: /skills/apple-review
section: Skills
order: 18
skill: sills-audit-apple-review
package: sills-audit-apple-review
status: available
---

# Apple review audit

Catch likely App Store rejection reasons before you submit, for native iOS and macOS apps and for Capacitor, React Native, Expo, and Electron hybrid apps.

## Install

```bash
npx sills-audit-apple-review install
```

## Use

```text
$sills-audit-apple-review Audit this project before App Store submission.
```

## What it inspects

App Store Review Guideline risk areas, privacy manifests (`PrivacyInfo.xcprivacy`) and required-reason APIs, permission purpose strings, App Tracking Transparency, entitlements, private-API and deprecated-API usage, Human Interface Guideline signals, hybrid plugin permissions, and submission metadata readiness.

## Real evidence, no submission

Bundled read-only collectors parse `Info.plist`, entitlements, privacy manifests, and Capacitor, Expo, and Electron configuration, and detect `fastlane precheck` configuration. The audit never submits, uploads, or contacts App Store Connect.

## What it gives you

A dated human-readable report, structured JSON mapped to guideline areas, coverage inventory, evidence, positive findings, limitations, prioritised pre-submission recommendations, verification instructions, and remediation handoff.

## Modes

Source, runtime, full, changed, CI, and verification modes are supported where the environment permits. Quick, standard, and deep depth profiles are available.

## Safety

The skill does not modify the product and never changes App Store Connect state. It may write only inside the selected audit directory.

## Limitations

This audit predicts rejection risk; it cannot guarantee approval. Apple review includes human judgement and running-app behaviour that source analysis cannot fully assess, and the report states which review surfaces were not covered.
