# Sills support matrix

Sills describes support by depth. A platform is not called fully supported merely because its package name was found.

## Support levels

| Level | Meaning |
|---|---|
| Detected | Sills recognizes dependencies, manifests, configuration, or project structure. |
| Normalized | Discovery produces structured platform facts with evidence and confidence. |
| Collected | Dedicated collectors build reusable inventories such as routes, APIs, auth, data, deployment, components, tests, or localization. |
| Runtime-capable | The invoking environment can gather browser, native, service, or deployment evidence for the platform. |
| Specialist-aware | Audit Skills include platform-specific interpretation where universal rules are insufficient. |

## Built-in platform support

| Platform | Detected | Normalized | Collected | Runtime-capable | Specialist-aware |
|---|:---:|:---:|:---:|:---:|:---:|
| JavaScript packages and workspaces | Yes | Yes | Partial | Environment-dependent | Yes |
| Vue | Yes | Yes | Planned | Browser-dependent | Yes |
| Nuxt | Yes | Yes | Planned | Browser/server-dependent | Yes |
| React | Yes | Yes | Planned | Browser-dependent | Yes |
| Next.js | Yes | Yes | Planned | Browser/server-dependent | Yes |
| Angular | Yes | Yes | Planned | Browser-dependent | Yes |
| SvelteKit | Yes | Yes | Planned | Browser/server-dependent | Yes |
| Capacitor | Yes | Yes | Partial | Simulator/device-dependent | Yes |
| iOS | Yes | Yes | Planned | macOS/simulator-dependent | Partial |
| Android | Yes | Yes | Planned | SDK/emulator-dependent | Partial |
| Electron | Yes | Yes | Planned | Desktop runtime-dependent | Partial |
| React Native | Yes | Yes | Planned | Simulator/device-dependent | Partial |
| Expo | Yes | Yes | Planned | Expo/runtime-dependent | Partial |
| Cloudflare Workers | Yes | Yes | Planned | Wrangler/target-dependent | Yes |
| Supabase | Yes | Yes | Planned | Credentials/environment-dependent | Yes |
| Firebase | Yes | Yes | Planned | Credentials/environment-dependent | Partial |
| Docker | Yes | Yes | Planned | Docker-dependent | Partial |
| Terraform | Yes | Yes | Planned | CLI/provider-dependent | Partial |
| GitHub Actions | Yes | Yes | Planned | GitHub access-dependent | Yes |

`Partial` means useful coverage exists but the complete collector or specialist model is not yet implemented.

## Ecosystem identification

Sills also identifies Rust, Go, Python, PHP, Ruby, and .NET repositories. These ecosystems do not yet have complete normalized and collected knowledge support.

## Audit Skills

The suite provides the umbrella orchestrator and specialist Audit Skills for accessibility, product experience, content, architecture, security, performance, design systems, release readiness, localization, testing strategy, privacy and trust, SEO, API design, and agent readiness.

The umbrella discovers once, recommends relevant specialists, asks for explicit selection when the request is generic, gathers shared evidence and knowledge once, and coordinates only selected audits.

## Evidence, findings, and reporting

Sills supports shared evidence records, deterministic finding identities, confidence separate from severity, categorical coverage, audit trends, machine-readable risk profiles, Markdown reports, and remediation handoffs. HTML report generation is provided through the Nizel rendering pipeline when the Nizel CLI is available.

## Environment-dependent coverage

Sills does not claim complete runtime coverage without usable targets, roles, sessions, simulators, credentials, and tools. Missing capabilities must result in reduced coverage, manual review, or explicit skips rather than invented results.
