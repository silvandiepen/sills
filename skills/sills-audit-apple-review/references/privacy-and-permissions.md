# Privacy and permissions

Privacy is the highest-frequency, most source-detectable rejection area. The `apple-manifests` collector surfaces most of the raw facts; this reference explains how to judge them.

## Permission purpose strings

Every protected resource needs a purpose string in `Info.plist` (for example `NSCameraUsageDescription`, `NSLocationWhenInUseUsageDescription`, `NSContactsUsageDescription`). Reviewers reject when:

- a permission is requested in code but has no purpose string;
- the purpose string is empty, generic ("This app needs access"), or does not explain the concrete user benefit;
- the app requests a permission it never uses.

Recommend specific, honest, user-facing wording and confirm each requested permission maps to a real feature.

## App Tracking Transparency

If the app tracks users across apps and websites (advertising SDKs, cross-app identifiers), it must present the ATT prompt and declare `NSUserTrackingUsageDescription`. Flag tracking SDKs or a privacy manifest `NSPrivacyTracking` value of true without a tracking usage string. Tracking without the prompt is a Guideline 5.1.2 rejection.

## Privacy manifest and required-reason APIs

Apple requires a `PrivacyInfo.xcprivacy` privacy manifest for apps and many third-party SDKs. It must:

- declare the data types the app collects and whether they are used for tracking;
- declare, under `NSPrivacyAccessedAPITypes`, a reason for every required-reason API used (file timestamps, system boot time, disk space, `UserDefaults`, and others).

Flag a missing manifest, a manifest with no required-reason declarations when the app or its SDKs likely use those APIs, and third-party SDKs known to require their own manifest. Because required-reason API usage is hard to confirm from source alone, weight these `requires-manual-verification` and recommend verifying with Apple's API list.

## Account deletion and data controls

Apps that let users create an account must provide in-app account deletion (Guideline 5.1.1(v)). Look for a delete-account path in the UI and backend; its absence is a common rejection.

## Export compliance

`ITSAppUsesNonExemptEncryption` in `Info.plist` avoids the submission-time encryption prompt. Its absence is not a rejection but is a submission-readiness gap; note it.
