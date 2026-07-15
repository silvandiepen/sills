# Platforms and tools

## Claude Code and Codex

- Treat shared project truth as canonical and keep agent-specific adapters small.
- Inspect `CLAUDE.md`, `AGENTS.md`, nested instruction files, skill directories, settings, permissions, and tool configuration when present.
- Record differences in discovery, scope, available tools, and permissions without requiring identical files.

## Monorepos

Check whether root guidance explains the whole workspace and whether nested packages add only the context needed for their subtree. Verify package-manager commands, workspace filters, application ownership, shared libraries, and release boundaries.

## Native and multi-platform products

Check whether platform-specific build, simulator, signing, entitlement, store, device, and test guidance is separated from shared product rules. Private signing credentials must never appear in reports.

## Useful passive tools

Repository search, package scripts, CI configuration, build-system help, static documentation link checks, JSON/schema validation, and safe dry-runs can support evidence. Tool output does not determine readiness without human interpretation of scope and project intent.
