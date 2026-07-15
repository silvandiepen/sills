# ADR 0002: npm is the installer and distribution layer

## Decision

Every public skill is an npm package with the same name as its Agent Skill. The package installs canonical files into Claude Code and Codex discovery directories. One umbrella package installs the complete suite.

## Consequences

Temporary npx paths require copying rather than symlinking by default. A single protected npm token can publish the monorepo packages in dependency order.
