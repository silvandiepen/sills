# Platforms and tools

The bundled collectors (`scripts/collect.mjs`) parse manifests and configuration read-only and never contact Apple. Record what each proves and what it cannot, and preserve raw output under the audit directory.

## Bundled collectors

| Collector | Reads | Surfaces | Notes |
|---|---|---|---|
| `apple-manifests` | `Info.plist`, `*.entitlements`, `PrivacyInfo.xcprivacy` | purpose strings, ATT usage string, required-reason declarations, encryption flag, background modes, URL schemes, entitlements | Minimal XML plist parsing; confirm against the real file for edge cases. |
| `apple-hybrid` | `capacitor.config.*`, Expo `app.json`/`app.config.*`, electron-builder config | declared plugins, permissions, bundle id, capabilities | TS/JS config is not statically evaluated; review manually. |
| `apple-private-api` | native `.m`, `.mm`, `.swift`, `.h` source | heuristic private/deprecated-API pattern matches | Every hit is `requires-manual-verification`; never assert from a heuristic. |
| `apple-precheck` | `fastlane/Fastfile` presence, `fastlane` on PATH | whether metadata precheck is configured | Detection only. Never runs a submission or network call. |

Collectors never modify the project. Missing files or tools produce a `limitation`, not a failure.

## Tools to use manually or recommend

- **[`fastlane precheck`](https://docs.fastlane.tools/actions/precheck/)** — checks App Store metadata against common rejection reasons (mentions of other platforms, placeholder text, and more). It requires App Store Connect credentials and network access, so run it in your own environment before submission; this audit only reports whether it is configured. Community tooling such as `appstore-precheck` extends it with additional rejection-vector scans.
- **Apple's required-reason API list** and **privacy-manifest documentation** at developer.apple.com — the source of truth for `PrivacyInfo.xcprivacy` declarations.
- **`swiftlint` / `swift-format`** — native idioms and style (advisory; overlaps `$sills-audit-code-quality`).
- **App Store Connect API (read-only)** — to compare intended metadata against what is configured, when credentials are available and the user explicitly authorises a read-only check.

## What tools do not prove

- No tool can guarantee approval; Apple review includes human judgement.
- A clean manifest parse does not confirm the running app requests permissions correctly or presents the ATT prompt.
- Heuristic private-API scanning has false positives and false negatives. Confirm before reporting, and never claim completeness.
