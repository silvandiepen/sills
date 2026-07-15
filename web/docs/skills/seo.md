---
title: SEO audit
description: Crawlability, indexability, metadata, structured data, content, and discoverability audit.
slug: /skills/seo
section: Skills
order: 14
skill: sills-audit-seo
package: sills-audit-seo
status: available
---

# SEO audit

Determine whether search engines can discover, understand, select, and present the intended public content.

## Install

```bash
npx sills-audit-seo install
```

## Use

```text
$sills-audit-seo Audit this project.
```

## What it inspects

Public route inventory, status codes, redirects, robots directives, sitemaps, canonicals, titles, descriptions, headings, links, rendered content, JavaScript requirements, pagination, faceting, duplicate URLs, structured data, hreflang, social metadata, images, media, Core Web Vitals context, content quality, information architecture, migrations, and monitoring.

## What it gives you

A dated human-readable specialist report, structured findings, coverage inventory, evidence, positive findings, limitations, prioritised recommendations, verification instructions, and remediation handoff.

## How it works

1. Identify which surfaces are intentionally public, private, indexable, canonical, regional, or temporary.
2. Crawl or inventory representative routes and compare source, server response, rendered DOM, and declared signals.
3. Inspect status codes, redirects, canonicals, robots rules, sitemaps, links, metadata, structured data, and international alternates.
4. Find duplicate, orphaned, thin, contradictory, inaccessible, or JavaScript-dependent content.
5. Review migrations and URL stability when routes or domains changed.
6. Separate technical defects from content opportunities and avoid promising rankings.

## Modes

Source, runtime, full, changed, CI, and verification modes are supported where the environment permits. Quick, standard, and deep depth profiles are available.

## Safety

The skill is report-only. It may write only inside the selected audit directory and never changes product code, configuration, dependencies, data, deployments, releases, or external services.

## Limitations

An audit cannot guarantee indexing, ranking, traffic, or rich results. Search systems change and may ignore valid signals. State the crawl scope, user agent, locale, authentication, rendering, field-data, and external-tool limitations.
