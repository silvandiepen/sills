# sills-audit-apple-review

<p>
  <img src="https://raw.githubusercontent.com/silvandiepen/sills/main/sills.svg" alt="Sills" width="180">
</p>

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

Bundled read-only collectors parse `Info.plist`, entitlements, privacy manifests, and Capacitor/Expo/Electron configuration, and detect `fastlane precheck` configuration. The audit never submits, uploads, or contacts App Store Connect.

## What it gives you

A dated specialist report, structured findings mapped to guideline areas, coverage inventory, evidence, positive findings, limitations, prioritised pre-submission recommendations, verification instructions, and remediation handoff. It never changes the audited product.

## Honesty

This audit predicts rejection risk; it cannot guarantee approval. Apple review includes human judgement and running-app behaviour that source analysis cannot fully assess, and the report says so.

## Modes

`source`, `runtime`, `full`, `changed`, `ci`, and `verify`, with `quick`, `standard`, and `deep` depth profiles.
