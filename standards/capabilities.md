# Audit capability graph

Every specialist declares required and optional capabilities before execution. The umbrella compares these declarations with the current environment and produces an execution plan.

An unavailable required capability must result in an explicit `skip`, `manual-review`, or reduced-coverage decision. It must not silently lower audit quality.

Capabilities include source access, runtime access, browsers, native simulators, authenticated sessions, user roles, and external tools. The resolved graph belongs in `manifest.json` and is shared with every specialist.
