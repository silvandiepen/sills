# Built-in knowledge collectors

Knowledge collectors turn repository structure into reusable cross-platform project knowledge. They run after raw discovery and alongside platform collectors.

## Current collectors

- Routes
- API and function entry points
- Authentication and authorization surfaces
- Data models and migrations
- Deployment and delivery configuration
- Components
- Testing topology
- Localization resources

Collectors use conservative source and configuration patterns. They produce evidence-backed facts and do not claim that every discovered file is correct, reachable, secure, or used at runtime.

## Output

Collector facts include:

- a knowledge kind;
- a human-readable name;
- structured attributes;
- evidence paths;
- confidence.

The facts are merged with platform facts before `project-knowledge.json` is built. Audit Skills consume the shared knowledge rather than independently rebuilding these inventories.

## Limitations

The first implementation inventories likely surfaces from repository paths. Later collectors may parse framework configuration, route definitions, middleware, policies, schemas, and runtime traces to produce richer relationships. Missing or ambiguous information must remain visible as limitations.
