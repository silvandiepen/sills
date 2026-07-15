---
title: GitHub Actions
description: Validate and publish Sills through GitHub Actions.
slug: /documentation/integrations/github-actions
section: Guide
order: 26
---

# GitHub Actions

CI validates skills, docs, tests, and package tarballs. The docs workflow builds the Girky site from `web/docs` and deploys the generated artifact to Cloudflare Pages for `sills.hakobs.com`.

Release uses one protected NPM_TOKEN, publishes dependencies before specialists and the umbrella package last, and never exposes the token to pull requests. The publish script skips package versions that are already present on npm.
