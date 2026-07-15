---
title: "Example: accessibility specialist report"
description: A synthetic specialist report showing accessibility evidence, automated limits, and manual checks.
slug: /documentation/examples/specialist-accessibility-audit
section: Examples
order: 3
---

# Example: accessibility specialist report

This synthetic example shows a specialist accessibility report that can sit inside a larger audit folder.

## Specialist scope

- **Observed evidence:** keyboard navigation, visible focus, form labels, error announcements, and responsive layout on key routes.
- **Automated results:** accessibility scanner completed against public routes and authenticated dashboard routes.
- **Inference:** repeated form markup suggests the same issue may appear in other settings panels that were not opened.
- **Manual review required:** screen reader behavior needs confirmation with the target assistive technologies and browsers.

## Finding

### `A11Y-FORM-002` - Error messages are visible but not announced

- **Category:** accessibility
- **Kind:** defect
- **Severity:** major
- **Release blocker:** no
- **Confidence:** high
- **Status:** open

**Observed evidence:** Submitting an empty profile form renders inline error text under required fields. Focus remains on the submit button and no live region announces the errors.

**Automated result:** The scanner reported missing `aria-describedby` relationships for two inputs.

**User impact:** Screen reader users may not know which fields failed validation after submitting the form.

**Recommendation:** Associate each input with its error text, move focus to the first invalid field after submit, and add a concise error summary for multi-field failures.

**Verification:** Submit the form with empty required fields. Confirm the first invalid field receives focus, its accessible description includes the error, and the visible error remains available for sighted users.

## Limitation

Automated scanner results support the finding, but they do not prove assistive technology behavior. Manual screen reader testing remains required before closing the accessibility review.
