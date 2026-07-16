<template>
  <Section :class="bemm()" color="blue">
    <div :class="bemm('layout')">
      <div :class="bemm('intro')">
        <p :class="bemm('eyebrow')">Step 02</p>
        <h2 :class="bemm('title')">Full audit or focused specialists</h2>
        <p :class="bemm('text')">
          Choose a full product audit or dive deep into specialist areas with focused modules.
        </p>
      </div>

      <div :class="bemm('cards')">
        <PageCard
          v-for="skill in skills"
          :key="skill.slug"
          :title="skill.meta.title"
          :description="skill.meta.description"
          :href="skill.slug"
          :section="skill.meta.section"
          :icon="iconForPage(skill)"
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
  skills: ContentPage[];
}>();

const bemm = useBemm("home-skills", { includeBaseClass: true });
</script>

<style lang="scss">
.home-skills {
  --page-card-background: color-mix(in srgb, var(--section-color), var(--color-background) 84%);
  --page-card-background-hover: color-mix(in srgb, var(--section-color), var(--color-background) 88%);
  --color-heading: color-mix(in srgb, var(--section-color), var(--color-foreground) 5%);
  --color-muted: color-mix(in srgb, var(--section-color), var(--color-foreground) 80%);
  --color-accent-strong: color-mix(in srgb, var(--section-color), var(--color-foreground) 80%);

  gap: var(--space-2xl);
  padding: var(--spacing) max(var(--page-gutter), calc((100vw - var(--container-width)) / 2 + var(--page-gutter)));

  &__layout {
    display: flex;
    flex-direction: column;
    gap: var(--spacing);
    align-items: start;
  }

  &__intro {
    display: grid;
    gap: var(--space-s);
  }

  &__eyebrow {
    margin: 0;
    color: inherit;
    font-size: var(--font-size-xs);
    font-weight: 700;
    letter-spacing: var(--letter-spacing-label);
    text-transform: uppercase;
  }

  &__title {
    max-width: 20ch;
    margin: 0;
    color: inherit;
    font-size: var(--font-size-2xl);
    font-weight: 750;
    line-height: 1.04;
    letter-spacing: 0;
  }

  &__text {
    max-width: var(--copy-width);
    margin: 0;
    color: color-mix(in srgb, var(--section-text), transparent 24%);
    font-size: var(--font-size-l);
    line-height: 1.55;
  }

  &__cards {
    display: grid;
    grid-template-columns: repeat(4, minmax(10.5rem, 1fr));
    gap: var(--space-l);
  }
}

@media (max-width: 980px) {
  .home-skills {
    &__cards {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
}

@media (max-width: 640px) {
  .home-skills {
    &__cards {
      grid-template-columns: 1fr;
    }
  }
}
</style>
