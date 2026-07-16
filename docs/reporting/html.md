# HTML reports

Sills treats `report.json` as authoritative and `report.md` as the portable human-readable source. HTML is generated only after the JSON contract validates.

## Render a report

```bash
npm run audit:render -- --directory audit/2026-07-16
```

Or provide explicit files:

```bash
node packages/audit-cli/bin/sills-audit-dev.mjs render-report \
  --report audit/2026-07-16/report.json \
  --markdown audit/2026-07-16/report.md \
  --output audit/2026-07-16/report.html \
  --title "Sills audit report"
```

The renderer invokes the published Nizel CLI through `npx`, creates a complete HTML document, and refuses to render when `report.json` is invalid or the Markdown report is missing or empty.

Use `--nizel-version` to pin the renderer in CI:

```bash
npm run audit:render -- --directory audit/2026-07-16 --nizel-version 0.1.13
```

## Guarantees

- Invalid machine-readable reports are not rendered.
- HTML does not replace or reinterpret the report contract.
- The renderer writes outside neither the selected audit directory nor the explicit output path.
- CI should pin the Nizel version for reproducible output.

## Dependency behaviour

Rendering requires npm access unless the requested Nizel version is already available through the local npm cache. Audit execution itself remains independent of HTML rendering.
