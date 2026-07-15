# Platform support roadmap

## Goal

Add platform-aware audit adapters without turning the specialist suite into duplicated framework-specific methodology.

## Phase 1: capability and discovery adapters

Create adapters that enrich shared discovery and capability resolution for:

- Vue, Nuxt, React, Next.js, Angular, and SvelteKit;
- Capacitor, Electron, Swift/iOS, Android, React Native, Expo, and Flutter;
- Cloudflare, Supabase, Firebase, Docker, Kubernetes, and Terraform;
- Laravel, Rails, ASP.NET, Go, Rust, and Python services.

Adapters produce normalized project facts, commands, runtime targets, and evidence hints. They do not produce final findings by themselves.

## Phase 2: framework evidence collectors

Add optional collectors for route maps, component trees, build output, configuration, deployment manifests, native entitlements, permissions, dependency boundaries, and test topology.

Collectors write to the shared evidence store so accessibility, performance, architecture, security, and other specialists can reuse the same facts.

## Phase 3: specialist rules

Only add platform-specific rules where the platform creates genuinely different risks. Keep universal methodology inside the existing specialist and store platform rules as small, versioned rule packs.

## Packaging

Use packages such as `@sills/adapter-vue` and `@sills/adapter-capacitor` only after the plugin contract is stable. Initially keep adapters inside the monorepo to avoid premature package fragmentation.

## Order

1. Vue/Nuxt, React/Next, Capacitor, Cloudflare, Supabase.
2. Angular, SvelteKit, Electron, React Native/Expo, Firebase.
3. Swift/iOS, Android, Flutter, Docker, Terraform.
4. Kubernetes and backend ecosystem adapters.

## Acceptance criteria

- adapters do not duplicate specialist reports;
- all discovered facts use a shared schema;
- unsupported platforms degrade explicitly;
- adapters can be tested with fixtures;
- adding a platform does not require editing every specialist.
