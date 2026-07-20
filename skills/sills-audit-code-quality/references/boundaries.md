# Boundary with the architecture audit

Code quality and architecture overlap. To keep findings clean and non-duplicated, use this split.

## This audit owns (code-level health)

- Complexity of individual functions, methods, and files.
- Copy-paste and semantic duplication.
- Dead code, unused exports, unused and missing dependencies.
- Weak typing, unsafe casts, magic values, primitive obsession.
- Naming and convention drift, over-abstraction, language-idiom violations.

## The architecture audit owns (structural design)

- Module, package, and service boundaries and responsibilities.
- Coupling direction, layering, and dependency-inversion violations at the system level.
- State management and data-flow shape across the application.
- Component and service composition and integration.

## Shared cases

Some findings sit on the line:

- **Circular dependencies** are detected here (a concrete code signal), but when a cycle reflects a missing architectural boundary, record it as `CQ-####` with the tool evidence and add a one-line cross-reference noting the architecture audit should judge the boundary. Do not write the same finding twice.
- **God objects and oversized modules** are architectural; report the size signal here and defer the responsibility judgement to `$sills-audit-architecture`.
- **Duplication that spans packages** may indicate a missing shared module (architecture) rather than a local extraction (code quality). Note both and let the architecture audit decide the structural change.

When both audits run in one orchestrated pass, the umbrella deduplicates. When only this audit runs, still keep to this lane and flag structural questions as cross-references rather than resolving them.
