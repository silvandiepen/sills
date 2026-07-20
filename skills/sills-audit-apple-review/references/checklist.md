# Checklist

Use as a coverage aid, not a script. Skip items that do not apply and record why.

## Setup

- [ ] Classify the project as native iOS/macOS, hybrid, or mixed; locate targets, `Info.plist`, entitlements, and any privacy manifest.
- [ ] Enumerate permissions, background modes, tracking, IAP, sign-in methods, deep links, and third-party SDKs.
- [ ] Identify the intended submission target (App Store, Mac App Store, TestFlight).

## Privacy and permissions

- [ ] Run `apple-manifests`. Confirm every requested permission has a specific, honest purpose string.
- [ ] Check ATT: tracking present requires the prompt and `NSUserTrackingUsageDescription`.
- [ ] Check `PrivacyInfo.xcprivacy` presence and required-reason API declarations.
- [ ] Confirm in-app account deletion exists when accounts can be created.

## Guidelines and payments

- [ ] Assess completeness and crash risk (2.1) from source and any build.
- [ ] Check digital-goods purchases use in-app purchase (3.1.1); flag external-purchase links for digital content.
- [ ] For hybrid apps, assess minimum functionality and genuine native value (4.2).
- [ ] Check Sign in with Apple requirement (4.8) when third-party login is offered.

## Native and configuration

- [ ] Run `apple-private-api`; confirm any heuristic hit manually.
- [ ] Verify entitlements are justified and provisioned; background modes match behaviour.
- [ ] Run `apple-hybrid` for Capacitor/Expo/Electron; map plugins to permissions.

## HIG and metadata

- [ ] Record source-detectable HIG signals (safe areas, Dynamic Type, dark mode, touch targets).
- [ ] Run `apple-precheck` to detect fastlane; recommend running `fastlane precheck` before submission.
- [ ] Note the encryption-compliance flag and any placeholder metadata.

## Reporting

- [ ] Map each risk to a guideline area and weight confidence honestly.
- [ ] Record positive findings and untested runtime review surfaces.
- [ ] Ensure `report.json` and the Markdown reports agree.
