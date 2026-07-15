# Shared evidence store

An audit run has one evidence index. Specialists reference evidence IDs instead of copying screenshots, logs, traces, source excerpts, and measurements into separate private collections.

Evidence records are append-only during a run, content-addressable where practical, redacted before persistence, and reusable across specialists. `report.json` contains references; evidence payloads live below `evidence/` or `raw/`.

The store must distinguish observation from interpretation. A finding may cite many evidence records, and one evidence record may support many findings.
