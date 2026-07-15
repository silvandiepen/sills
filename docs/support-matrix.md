# Sills support matrix

## Audit specialists

Sills currently provides the umbrella orchestrator and specialist audits for accessibility, product experience, content, architecture, security, performance, design systems, release readiness, localization, testing strategy, privacy and trust, SEO, API design, and agent readiness.

The umbrella does not run every specialist by default. It discovers the project, recommends relevant specialists, asks for an explicit selection when the request is generic, gathers shared evidence once, and coordinates only the selected audits.

## Project discovery

| Area | Current support |
|---|---|
| JavaScript package managers | npm, pnpm, Yarn, Bun |
| Workspaces | package.json workspaces and discovered package manifests |
| Frontend frameworks | Vue, Nuxt; basic identification for React, Next.js, Angular, Svelte and SvelteKit |
| Native and desktop | Capacitor and iOS; basic identification for Android, Electron, React Native and Expo |
| Services | Cloudflare Workers and Supabase |
| Infrastructure | Docker and Terraform identification |
| Backends | ecosystem identification for Rust, Go, Python, PHP, Ruby and .NET |
| Documentation | standard repository guidance and shallow Markdown inventory |
| Configuration | Vite, framework, testing, linting, workspace, native, Cloudflare and Supabase configurations |

“Basic identification” means discovery can recognize the technology but does not yet produce a complete normalized knowledge model for it.

## Evidence and reporting

Sills supports shared evidence records, deterministic finding identities, finding confidence, categorical coverage, audit trends, machine-readable risk profiles, Markdown reports, and remediation handoff plans. HTML rendering is planned through Nizel after its CLI release is published.

## Unsupported or partial areas

Sills does not claim complete runtime coverage without a usable runtime target and the required roles or sessions. Native simulators, authenticated workflows, external scanners, production access, and platform-specific tooling depend on the invoking environment and must be recorded as capabilities or limitations.

## Planned built-in support

Near-term support includes full normalized adapters and collectors for React, Next.js, Angular, SvelteKit, Firebase, Electron, React Native, Expo, Docker, Terraform, and GitHub Actions. The broader order is documented in `docs/roadmap/platform-support.md`.
