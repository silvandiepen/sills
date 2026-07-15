# Project discovery standard

Discovery is shared audit evidence, not disposable setup work. It must identify the repository shape, platforms, frameworks, package managers, workspaces, documentation, deployment configuration, and discovery limitations before specialists run.

Discovery failures are recorded as warnings. They must never be silently converted into complete coverage.

The discovery result is reusable by every specialist in the same audit run and should be stored under `evidence/discovery.json`.
