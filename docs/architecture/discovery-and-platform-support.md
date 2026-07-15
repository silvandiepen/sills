# Discovery and built-in platform support

## Purpose

Sills discovers a project once, turns repository signals into normalized facts, and reuses those facts across selected audit specialists. Discovery is evidence collection, not a final audit conclusion.

## Discovery pipeline

1. Inventory repository files, packages, workspaces, documentation, native projects, configuration, ecosystems, and warnings.
2. Run built-in platform adapters against that shared inventory.
3. Emit normalized `platformFacts` with technology, kind, value, evidence paths, and confidence.
4. Build shared project knowledge from those facts.
5. Let specialists consume the shared knowledge and add specialist-only evidence when necessary.

An adapter failure is isolated and reported as a warning. It must not abort the entire audit or silently disappear.

## Currently supported built-in adapters

| Adapter | Detects | Shared evidence hints |
|---|---|---|
| JavaScript | packages, scripts, workspaces, source roots | commands, package boundaries, workspace topology |
| Vue | Vue applications and Vite configuration | routers, views, components, application roots |
| Nuxt | Nuxt applications and configuration | pages, server routes, middleware, plugins |
| Capacitor | Capacitor configuration and native targets | permissions, deep links, WebView navigation, privacy manifests, entitlements |
| iOS | Xcode projects and workspaces | native targets and iOS-specific review surfaces |
| Cloudflare | Workers dependencies and Wrangler configuration | bindings, routes, compatibility dates, environments, secret references |
| Supabase | client dependencies and local configuration | migrations, row-level security, edge functions, storage policies, generated types |

## Normalized platform fact

```json
{
  "technology": "capacitor",
  "kind": "platform",
  "value": {
    "configFiles": ["capacitor.config.ts"],
    "iosProjects": ["ios/App/App.xcodeproj"],
    "androidProjects": []
  },
  "evidence": [
    "capacitor.config.ts",
    "ios/App/App.xcodeproj"
  ],
  "confidence": "certain"
}
```

## Guarantees

- Every fact names its supporting evidence.
- Confidence is separate from importance or severity.
- Missing or unreadable inputs become explicit warnings.
- Specialists should reuse facts instead of rediscovering the same project structure.
- Platform detection never claims that a platform-specific audit has been completed.

## Deliberate limits

Built-in adapters do not execute arbitrary project code, install dependencies, create production data, or infer secrets. Runtime facts require an authorised runtime session and must record their environment and limitations separately.

## Planned support

The next built-in groups are React and Next.js, Angular and SvelteKit, Firebase, Electron, React Native and Expo, Docker, Terraform, and GitHub Actions. Further support is tracked in `docs/roadmap/platform-support.md`.
