# Localization Audit checklist

## Core coverage

Locale inventory, source and runtime strings, extraction, keys, fallback chains, plural and gender rules, interpolation, date/time/number/currency formatting, time zones, collation, search, addresses, names, phone numbers, input methods, Unicode, fonts, text expansion, truncation, RTL and bidirectional behaviour, media, legal content, and translation workflow.

## Positive evidence to record

- Messages include context and avoid unsafe concatenation.
- Formatting uses locale-aware primitives consistently.
- RTL and text expansion are designed rather than patched.
- Translation completeness and review are visible in the delivery process.

## Cross-cutting checks

- Documentation and implementation agree.
- Important behaviour is consistent across roles, states, routes, platforms, and environments.
- Failures are observable and recoverable.
- Shared primitives or contracts prevent repeated defects.
- Exceptions are intentional, documented, and testable.
- User-facing claims match actual behaviour.
