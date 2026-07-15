---
title: CI integration
description: Run Sills validation and prepare audit workflows in continuous integration.
slug: /ci-integration
section: Guide
order: 7
---


# CI integration

The repository ships CI for validating skill metadata, package consistency, website content, tests, and npm package contents.

Product repositories may invoke Sills in `ci` or `changed` mode. CI reports should remain machine-readable, list unavailable runtime capabilities, and never receive production credentials or publishing secrets from untrusted pull requests.
