# Shared execution model

The umbrella orchestrator runs discovery and common collectors before specialist Audit Skills.

## Execution order

1. Discover the repository and available capabilities.
2. Resolve the selected audits.
3. Run built-in platform collectors.
4. Run built-in knowledge collectors.
5. Write `project-knowledge.json` and the shared evidence index.
6. Resolve specialist dependencies on knowledge kinds and capabilities.
7. Run independent specialists in parallel.
8. Merge specialist-added facts and evidence into the shared stores.
9. Correlate findings and render reports.

## Specialist rules

Every specialist must read shared project knowledge before doing domain-specific discovery. It may extend the model, but it must not silently rebuild an existing inventory.

Recollection is justified only when:

- the collector had insufficient parsing depth;
- runtime evidence is required;
- the evidence is stale;
- the selected scope is narrower or broader;
- a collector failed or reported a limitation.

The reason must be recorded in the manifest or specialist report.

## Parallel execution

Specialists can run together only after required collectors complete. For example, security, API design, privacy, and architecture can share routes, API endpoints, auth, and data knowledge. Accessibility, experience, content, SEO, and performance can share routes, pages, components, navigation, and runtime evidence.

## Guarantees

- Shared evidence keeps stable IDs.
- Shared knowledge keeps stable node IDs.
- Missing knowledge is not treated as proof of absence.
- Specialists may add knowledge, but machine-readable outputs must remain valid.
- Human and machine-readable reports must reference the same facts and limitations.
