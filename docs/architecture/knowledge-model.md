# Shared project knowledge model

## Goal

Sills should collect common project knowledge once and let every selected specialist reuse it. The knowledge model sits between raw discovery and specialist judgement.

```text
repository and runtime evidence
            ↓
        discovery
            ↓
 normalized platform facts
            ↓
 shared project knowledge
            ↓
 selected audit specialists
```

## Knowledge domains

The model can represent:

- applications and packages;
- routes, pages, navigation and API endpoints;
- components and design-system surfaces;
- native targets, permissions and entitlements;
- authentication, roles and authorization boundaries;
- data stores, migrations, policies and storage;
- deployments, environments, bindings and infrastructure;
- CI workflows, commands and test topology;
- localization resources and supported locales;
- external integrations and trust boundaries.

## Node contract

Every knowledge node has a stable ID, type, name, technology, attributes, evidence references, and confidence. Nodes are factual observations, not findings.

## Relationship contract

Relationships connect nodes with typed edges such as `contains`, `depends-on`, `routes-to`, `deploys-to`, `authenticates-with`, `reads-from`, `writes-to`, and `tested-by`.

## Specialist use

Specialists query relevant domains rather than rebuilding inventories. For example, accessibility, content, performance, and SEO can reuse the same route and page nodes. Security, privacy, architecture, and API design can reuse the same service, endpoint, role, and data-store nodes.

## Limits

The knowledge model must preserve uncertainty. A node with incomplete evidence remains `likely` or `possible`; it is never upgraded to `certain` because another specialist assumes it is true.
