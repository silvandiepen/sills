---
title: "Example: web product audit"
description: A synthetic full-product web audit showing summary, findings, coverage, and handoff style.
slug: /documentation/examples/web-product-audit
section: Examples
order: 1
---

# Example: web product audit

This synthetic example shows how a Sills full audit can summarize a web product review. It is intentionally abbreviated.

## `summary.md`

- **Audit:** `example-web-product-2026-07-15`
- **Mode:** `full`
- **Depth:** `standard`
- **Release blockers:** `1`
- **Open findings:** `4`

## Decision

Do not ship the reviewed checkout flow until the keyboard trap in the payment step is fixed and verified. The remaining findings can be sequenced after the blocker if the release owner accepts the documented risk.

## Coverage

- **Observed evidence:** home page, pricing page, signup flow, checkout flow, account settings, and error states were opened in a browser.
- **Automated results:** accessibility scan completed on five routes. Unit tests completed for checkout price calculation.
- **Inference:** the same modal component appears to be shared by checkout and account settings based on matching DOM structure and class names.
- **Manual review required:** payment provider sandbox behavior, production analytics events, and legal copy approval were not verified.

## Highest-priority finding

### `WEB-A11Y-001` - Payment modal traps keyboard focus

- **Category:** accessibility
- **Kind:** defect
- **Severity:** critical
- **Release blocker:** yes
- **Confidence:** high
- **Status:** open

**Observed evidence:** While focused inside the payment modal, pressing `Shift+Tab` from the first input moved focus to the browser chrome instead of the modal close button.

**Automated result:** The accessibility scan reported one focus-order violation on `/checkout`.

**User impact:** Keyboard and switch-device users may be unable to complete payment or dismiss the modal without reloading the page.

**Recommendation:** Constrain focus within the modal while it is open, return focus to the triggering button after close, and verify the shared modal implementation across checkout and account settings.

**Verification:** Navigate through checkout with only the keyboard. Confirm focus remains inside the modal, `Escape` closes the modal, and focus returns to the payment button.

## Handoff note

Start with `WEB-A11Y-001`. Preserve the screenshots and scan output in the audit folder, then add new verification evidence after the fix. Do not delete the original failing evidence.

## `report.json` excerpt

```json
{
  "audit_id": "example-web-product-2026-07-15",
  "mode": "full",
  "findings": [
    {
      "id": "WEB-A11Y-001",
      "title": "Payment modal traps keyboard focus",
      "severity": "critical",
      "confidence": "high",
      "release_blocker": true,
      "evidence": [
        {
          "type": "observed",
          "summary": "Keyboard focus left the payment modal when tabbing backward from the first input."
        },
        {
          "type": "automated",
          "summary": "Accessibility scan reported one focus-order violation on /checkout."
        }
      ],
      "manual_review_required": [
        "Verify the payment provider sandbox flow with target assistive technologies."
      ]
    }
  ]
}
```
