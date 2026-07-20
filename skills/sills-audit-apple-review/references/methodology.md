# Methodology

Predict rejection risk from the evidence available, and be honest about what only Apple or a running build can decide.

## Sequence

1. **Classify the project**: native iOS, native macOS, hybrid (Capacitor, React Native, Expo, Electron), or a mix. Locate the app target(s), `Info.plist`, entitlements, and `PrivacyInfo.xcprivacy`.
2. **Enumerate capabilities**: permissions, background modes, tracking, in-app purchase, sign-in methods, deep links, and third-party SDKs.
3. **Run the relevant collectors** read-only and capture evidence and limitations.
4. **Rank risks by rejection probability**: completeness and crashes, privacy and permissions, tracking, payments, minimum functionality, and metadata are the highest-frequency areas.
5. **Map each risk to a guideline** and record whether it is source-confirmed or needs the running app.
6. **Weight confidence honestly** — do not present source-only signals as confirmed review outcomes.
7. **Recommend a specific pre-submission fix** for each risk, and list the untested review surfaces.

## Confidence weighting

- **Source-confirmed** (for example a missing purpose string for a permission used in code): `high`.
- **Config-declared but behaviour unverified** (a plugin implies a permission, but the flow is not seen): `medium`, `requires-manual-verification`.
- **Heuristic** (private-API pattern match, likely-tracking SDK): `requires-manual-verification`; confirm before treating as real.
- **Runtime-only** (ATT prompt timing, crash on launch, IAP restore): untested from source; record as a coverage gap, not a pass.

## Positive findings

Record where the app clearly meets expectations: complete purpose strings, a present and populated privacy manifest, account deletion available, genuine native value in a hybrid app. Positive findings make the report trustworthy and reduce reviewer surprise.

## Boundaries with other audits

Accessibility depth belongs to `$sills-audit-accessibility`; native code idioms belong to `$sills-audit-code-quality`; broader launch readiness belongs to `$sills-audit-release-readiness`. Cross-reference rather than duplicate.
