# Platform and knowledge support roadmap

## Goal

Expand platform-aware auditing without duplicating specialist methodology. Built-in adapters recognize technologies and normalize evidence. Shared knowledge collectors convert those facts into reusable project knowledge for every selected specialist.

## Architecture

```text
repository and runtime evidence
            ↓
        discovery
            ↓
 built-in platform adapters
            ↓
 shared knowledge collectors
            ↓
 routes, components, APIs, roles, data, deployments, CI, tests
            ↓
 selected audit specialists
```

Adapters and collectors remain built into the Sills monorepo. An external plugin system is not planned until third parties need independent extensions and the contracts have remained stable across several releases.

## Implemented foundation

- JavaScript packages, scripts, source roots, and workspaces;
- Vue and Nuxt;
- React and Next.js;
- Angular and SvelteKit;
- Capacitor, iOS, Android, Electron, React Native, and Expo;
- Cloudflare Workers, Supabase, and Firebase;
- Docker, Terraform, and GitHub Actions;
- normalized platform facts;
- stable shared-knowledge nodes and typed relationships;
- explicit evidence and confidence;
- fixture-based adapter coverage.

## Knowledge collectors

### Route and endpoint collector

Normalize routes, pages, navigation entry points, server handlers, API endpoints, middleware, and route-level authorization across Vue Router, Nuxt, React Router, Next.js, Angular, SvelteKit, backend frameworks, and API specifications.

### Component and design-system collector

Normalize components, shared UI packages, stories, tokens, themes, variants, component states, and adoption evidence.

### Authentication and authorization collector

Normalize identity providers, login methods, sessions, roles, permissions, guards, middleware, policies, and protected resources across Supabase, Firebase, Auth0, Clerk, Better Auth, custom identity systems, and native platforms.

### Data and storage collector

Normalize databases, schemas, migrations, row-level policies, storage buckets, caches, queues, object stores, generated types, backup hints, and data-flow evidence.

### Deployment and environment collector

Normalize applications, environments, deployment targets, domains, routes, bindings, environment overrides, runtime versions, regions, secrets references, and rollback signals.

### CI and test collector

Normalize workflows, jobs, commands, test types, coverage artefacts, build matrices, release gates, deployment jobs, required checks, and flaky-test evidence.

### Native collector

Normalize native targets, permissions, entitlements, privacy manifests, deep links, exported activities, background modes, signing configuration, and store metadata.

### Localization collector

Normalize locale files, supported locales, fallback chains, RTL support, message extraction, formatting libraries, and translation-generation workflows.

## Remaining platform waves

### Wave 2: native depth

- Swift Package Manager and Xcode build settings;
- Android Gradle projects and manifests;
- Flutter and Dart;
- Kotlin Multiplatform;
- deeper Capacitor and React Native configuration.

### Wave 3: infrastructure and delivery

- Kubernetes;
- Helm;
- Pulumi;
- AWS CDK and CloudFormation;
- Vercel, Netlify, Fly.io, Railway, Render, and container registries;
- GitLab CI, CircleCI, Buildkite, and Azure Pipelines.

### Wave 4: backend frameworks

- Node.js, Express, Fastify, Hono and NestJS;
- Laravel and Symfony;
- Rails;
- ASP.NET;
- Django, Flask and FastAPI;
- Go HTTP frameworks;
- Rust Axum, Actix and Rocket;
- Java Spring and Kotlin Ktor.

### Wave 5: data and messaging

- PostgreSQL, MySQL, SQLite and SQL migrations;
- MongoDB and document stores;
- Redis and caches;
- Kafka, RabbitMQ, SQS and queue systems;
- Prisma, Drizzle, TypeORM, Sequelize and SQLAlchemy;
- search services and vector databases.

## Acceptance criteria

- adapters never produce final audit findings;
- all facts and knowledge nodes retain evidence and confidence;
- specialists reuse shared knowledge instead of rebuilding inventories;
- unsupported technologies degrade explicitly;
- every adapter and collector has representative fixtures;
- adding a platform does not require editing every specialist;
- the support matrix distinguishes full normalization from basic identification;
- documentation changes are required in the same pull request as support changes.
