---
title: "Example: changed-code audit"
description: A synthetic changed-code audit showing how Sills reports risks introduced by a pull request.
slug: /documentation/examples/changed-code-audit
section: Examples
order: 2
---

# Example: changed-code audit

This synthetic example shows how Sills can report on a narrow change set instead of a full product review.

## `summary.md`

- **Audit:** `example-pr-184-checkout-discounts`
- **Mode:** `changed`
- **Depth:** `focused`
- **Release blockers:** `0`
- **Open findings:** `2`

## Scope

- **Observed evidence:** changed files in the discount calculation package, checkout UI, and related tests.
- **Automated results:** package tests passed. Package tarball check completed.
- **Inference:** the new discount branch probably affects invoice previews because checkout and invoices import the same calculation helper.
- **Manual review required:** production coupon configuration and tax rules were not available in the repository.

## Finding

### `PR184-BILLING-001` - Invoice preview does not cover stacked discounts

- **Category:** billing
- **Kind:** test gap
- **Severity:** moderate
- **Release blocker:** no
- **Confidence:** medium
- **Status:** open

**Observed evidence:** The changed tests cover one percentage discount and one fixed discount. No test covers both discounts applied to the same invoice preview.

**Automated result:** Existing tests passed, but the test matrix does not exercise the stacked-discount path.

**Inference:** A mismatch between checkout totals and invoice preview totals is possible if the invoice path applies the helper with a different option set.

**Recommendation:** Add a focused test for stacked discounts in invoice preview and checkout total calculation. If the product intentionally disallows stacking, encode that as validation before totals are rendered.

**Verification:** Run the billing package tests and inspect the generated invoice preview fixture for a stacked-discount case.

## Handoff note

This audit does not ask the remediation agent to redesign discount policy. It asks the agent to either cover the existing behavior or make the product rule explicit in code and tests.
