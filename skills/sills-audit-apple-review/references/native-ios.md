# Native iOS and macOS

For native Swift and Objective-C targets, review the project configuration and source that reviewers and automated checks care about.

## Entitlements and capabilities

- Every entitlement in `*.entitlements` must be justified and provisioned. Unused or mismatched entitlements (push, associated domains, HealthKit, background) cause rejection or signing failure.
- Capabilities declared in the target must correspond to real features.

## Private and deprecated APIs

- Private-API usage is a hard rejection (Guideline 2.5.1). The `apple-private-api` collector runs heuristic pattern matching; every hit is `requires-manual-verification`. Confirm the actual symbol before reporting it as real, and never assert private-API usage from a heuristic alone.
- Deprecated APIs and removed frameworks can break on current OS versions; flag known-removed symbols and recommend the supported replacement.
- Watch for reflection into underscored selectors and dynamic string-based symbol lookup, which are common ways private APIs slip in.

## Background modes

`UIBackgroundModes` must match genuine background behaviour (audio playback, location, VoIP, processing). Declared modes without corresponding behaviour are rejected under Guideline 2.5.4.

## URL schemes and universal links

Declared `CFBundleURLTypes` and associated domains should not expose unvetted actions via deep links. Confirm handlers validate input.

## Build and metadata readiness (source-visible)

- App icon and launch assets present and complete.
- Deployment target and device family consistent with claimed support.
- Version and build numbers set; no obvious placeholder bundle identifiers.

Native runtime behaviour (crashes, actual permission prompts, IAP flows) needs a running build; when none is available, record these as untested review surfaces rather than passing them.
