# Public contract lifecycle

Every machine-readable Sills contract is registered in `contracts/manifest.json`.

A registered contract must declare:

- its JSON Schema;
- a concise end-user description;
- the component that generates it;
- the component that validates it;
- a minimal example object.

`npm run validate:contracts` checks that every schema is registered, every manifest entry points to a real schema, every schema has basic metadata, and every contract declares its generation, validation, and example paths.

The standard `npm run validate` command includes contract validation so new schemas cannot silently land as documentation-only architecture.

## Adding or changing a contract

1. Add or update the JSON Schema.
2. Register it in `contracts/manifest.json`.
3. Provide a representative inline example.
4. Identify the actual generation path.
5. Identify the actual validator.
6. Add focused tests for domain rules beyond structural validation.
7. Update end-user documentation when the output or guarantees change.

A schema is not considered a supported public contract until all of these steps are complete.
