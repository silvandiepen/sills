# Hybrid apps: Capacitor, React Native, Expo, Electron

Hybrid apps still ship a native binary and face the same review. Two areas need extra attention: the wrapper's added value, and how the JavaScript layer maps to native permissions.

## Minimum functionality (Guideline 4.2)

A hybrid app that only loads a website in a web view, with no native capability or app-like value, is rejected as a repackaged site. Look for genuine native integration (push, camera, offline, biometrics, share, deep integration) and flag thin wrappers. Recommend concrete native value, not cosmetic changes.

## Permission mapping

The `apple-hybrid` collector reads `capacitor.config.*`, Expo `app.json` / `app.config.*`, and electron-builder config. For each:

- **Capacitor**: every native plugin (Camera, Geolocation, Contacts, Push) implies an iOS permission and a purpose string in `Info.plist`. Confirm declared plugins have matching, honest purpose strings, and flag plugins included but unused.
- **Expo**: `expo.ios.infoPlist` carries purpose strings; `expo.plugins` and `expo.ios.entitlements` carry capabilities. Expo config plugins generate native config at build time, so verify the generated `Info.plist` where possible, not only the source config.
- **React Native**: check the native `Info.plist` and linked native modules; JS dependencies alone do not reveal the full permission set.
- **Electron (Mac App Store)**: sandbox entitlements, hardened runtime, and notarization requirements apply. Over-broad entitlements and missing sandboxing are common Mac App Store rejections.

## TypeScript and dynamic config

When config is a `.ts`/`.js` module, the collector cannot statically evaluate it. Review declared plugins and permissions manually and record that the config was not statically resolved.

## Third-party SDKs

Advertising, analytics, and attribution SDKs frequently trigger tracking and privacy-manifest requirements. Enumerate SDKs from the manifest and native dependencies and cross-check them against `references/privacy-and-permissions.md`.
