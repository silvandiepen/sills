# Platforms and tools

Use source extraction, locale-file analysis, pseudo-localization where available, browser locale and timezone emulation, screenshots, layout inspection, Unicode-aware tests, and existing translation-platform metadata. Do not rewrite translations as authoritative without qualified review.

## Tool rules

- Record tool name, version, configuration, environment, and timestamp.
- Preserve raw output under the audit directory when safe.
- Prefer repeatable scripts and machine-readable output.
- Treat tool failures and partial results as limitations.
- Do not install into or mutate the audited project.

## Limitations

Automated language checks cannot establish cultural or domain correctness. Machine translation quality must not be presented as native review. Record untested locales, scripts, devices, fonts, input methods, and legal variants.
