# Stable finding identity

Finding identity is derived from the audit domain, rule, stable location, and stable subject. Severity, wording, evidence, and status are intentionally excluded so the same underlying issue keeps its ID across audits.

Each finding stores both a human-visible ID and its fingerprint. A changed location or rule creates a new identity. Merged, split, or superseded findings record their predecessors explicitly.

Sequential IDs such as `SEC-023` may be displayed as aliases, but the fingerprint-backed ID is authoritative across runs and branches.
