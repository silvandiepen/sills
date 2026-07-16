<template>
  <Section :class="bemm()" color="yellow">
    <div :class="bemm('layout')">
      <div :class="bemm('intro')">
        <p :class="bemm('eyebrow')">Step 04</p>
        <h2 :class="bemm('title')">Use the docs when you need specifics</h2>
        <p :class="bemm('text')">Deep-dive documentation for each audit area. Use it when you need detail.</p>
      </div>

      <div :class="bemm('cards')">
        <PageCard
          v-for="page in featuredDocs"
          :key="page.slug"
          :title="page.meta.title"
          :description="page.meta.description"
          :href="page.slug"
          :section="page.meta.section"
          :icon="iconForPage(page)"
        />
      </div>
    </div>
  </Section>
</template>

<script setup lang="ts">
import { useBemm } from "bemm";

import PageCard from "../../../components/PageCard";
import Section from "../../../components/Section";
import { iconForPage } from "../../../services/content";
import type { ContentPage } from "../../../types/content";

defineProps<{
  featuredDocs: ContentPage[];
}>();

const bemm = useBemm("home-docs", { includeBaseClass: true });
</script>

<style lang="scss">
.home-docs {
  --page-card-background: color-mix(in srgb, var(--section-color), var(--palette-cream) 78%);
  --page-card-background-hover: color-mix(in srgb, var(--section-color), var(--palette-cream) 84%);
  --color-heading: var(--palette-ink);
  --color-muted: color-mix(in srgb, var(--palette-ink), var(--section-color) 34%);
  --color-accent-strong: color-mix(in srgb, var(--palette-green), var(--palette-ink) 48%);

  display: grid;
  gap: var(--space-2xl);
  padding: var(--spacing) max(var(--page-gutter), calc((100vw - var(--container-width)) / 2 + var(--page-gutter)));

  &__layout {
    display: grid;
    grid-template-columns: minmax(14rem, 0.52fr) minmax(0, 1.48fr);
    gap: var(--space-2xl);
    align-items: start;
  }

  &__intro {
    display: grid;
    gap: var(--space-s);
  }

  &__eyebrow {
    margin: 0;
    color: color-mix(in srgb, var(--color-heading), transparent 18%);
    font-size: var(--font-size-xs);
    font-weight: 700;
    letter-spacing: var(--letter-spacing-label);
    text-transform: uppercase;
  }

  &__title {
    max-width: 13ch;
    margin: 0;
    color: var(--color-heading);
    font-size: var(--font-size-2xl);
    font-weight: 750;
    line-height: 1.04;
    letter-spacing: 0;
  }

  &__text {
    max-width: var(--copy-width);
    margin: 0;
    color: var(--color-muted);
    font-size: var(--font-size-l);
    line-height: 1.55;
  }

  &__cards {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-l);
  }
}

@media (max-width: 980px) {
  .home-docs {
    &__layout,
    &__cards {
      grid-template-columns: 1fr;
    }
  }
}
</style>
