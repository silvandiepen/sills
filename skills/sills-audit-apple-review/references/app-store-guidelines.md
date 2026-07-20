# App Store Review Guidelines: common rejection vectors

Map risks to the guideline areas Apple reviewers actually use. Cite a section only when it applies. The guidelines change; treat these as the durable high-frequency categories and verify current wording at developer.apple.com when a case is close.

## Safety (Guideline 1)

- User-generated content without moderation, reporting, and blocking (1.2).
- Objectionable, harmful, or unsafe content and features.

## Performance and completeness (Guideline 2)

- **2.1 Completeness**: crashes, obvious bugs, placeholder content, broken links, non-functional features, demo/test accounts required but not provided in review notes. This is one of the most common rejection reasons.
- **2.3 Accurate metadata**: screenshots, description, and preview must match actual behaviour.
- **2.5 Software requirements**: private APIs (2.5.1), undocumented features, background modes without genuine background behaviour (2.5.4), unnecessary or mismatched entitlements.

## Business and payments (Guideline 3)

- Digital goods and subscriptions must use in-app purchase (3.1.1). Linking to external purchase for digital content is a frequent rejection.
- Missing restore-purchase, unclear subscription terms, or a paywall that blocks all functionality with no context.

## Design (Guideline 4)

- **4.0 minimum functionality**: a thin wrapper around a website or a repackaged web view with no app-like value (4.2). Hybrid apps must add native value beyond the site.
- **4.1 copycats**, **4.3 spam / duplicate apps**.
- **4.8 sign in with Apple**: required when the app offers third-party or social login as the only or primary option.

## Legal and privacy (Guideline 5)

- **5.1.1 Data collection and storage**: permission purpose strings must be present, specific, and honest. Requesting access without a clear reason is a rejection.
- **5.1.1(v) account deletion**: apps that support account creation must offer in-app account deletion.
- **5.1.2 Data use and sharing / tracking**: tracking requires the App Tracking Transparency prompt and `NSUserTrackingUsageDescription`.
- **5.1 privacy manifests and required-reason APIs**: apps and many SDKs must declare a `PrivacyInfo.xcprivacy` and a reason for every required-reason API.

## How to use this

For each risk, record the guideline area, the concrete observation, whether it is source-confirmed or needs the running app, and a specific pre-submission fix. Do not claim an app will be rejected; state that a risk exists and why a reviewer is likely to raise it.
