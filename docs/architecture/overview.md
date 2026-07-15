# Architecture overview

Each public package under `skills/` is both a self-contained Agent Skill and an npm package. `sills-audit` depends on every specialist and installs the complete suite. Specialist packages remain independently installable.

The shared installer is zero-dependency and copies only Agent Skill assets. Repository tooling validates metadata, package consistency, documentation, and package tarballs. The audit CLI provides project discovery, dated audit scaffolding, and report validation without modifying product files.
