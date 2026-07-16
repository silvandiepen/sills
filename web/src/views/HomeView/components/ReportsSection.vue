<template>
  <Section :class="bemm()" color="dark">
    <div :class="bemm('layout')">
      <div :class="bemm('intro')">
        <p :class="bemm('eyebrow')">Step 03</p>
        <h2 :class="bemm('title')">Reports designed for the next action</h2>
        <p :class="bemm('text')">
          Clear, actionable reports that help teams prioritize, fix, and improve.
        </p>
      </div>
      <div :class="bemm('grid')" aria-label="Report strengths">
        <Card v-for="feature in reportFeatures" :key="feature.title" :class="bemm('tile')" variant="ghost">
          <Icon :class="bemm('icon')" :name="feature.icon" size="large" />
          <div :class="bemm('copy')">
            <h3 :class="bemm('tile-title')">{{ feature.title }}</h3>
            <p :class="bemm('tile-text')">{{ feature.text }}</p>
          </div>
        </Card>
      </div>
    </div>
  </Section>
</template>

<script setup lang="ts">
import { Card, Icon } from "@sil/ui";
import { useBemm } from "bemm";

import Section from "../../../components/Section";

const bemm = useBemm("home-reports", { includeBaseClass: true });

const reportFeatures = [
  { icon: "ui/target", title: "Actionable findings", text: "What matters, why it matters, and what to do." },
  { icon: "ui/list-dots", title: "Prioritized by impact", text: "Focus on work that brings the most value." },
  { icon: "misc/graph-up-round", title: "Visual and clear", text: "Easy to share and stakeholder-ready." },
  { icon: "ui/chart-line", title: "Track progress", text: "See what's fixed and what's next." },
];
</script>

<style lang="scss">
.home-reports {
  display: grid;
  gap: var(--space-2xl);
  padding: var(--spacing) max(var(--page-gutter), calc((100vw - var(--container-width)) / 2 + var(--page-gutter)));

  &__layout {
    display: flex;
    flex-direction: column;
    gap: var(--space-2xl);
    align-items: start;
  }

  &__intro {
    display: grid;
    align-content: start;
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
    max-width: 13ch;
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

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-m);
  }

  &__tile.card {
    border: 0;
    border-radius: var(--radius-s);
    background: color-mix(in srgb, var(--section-color), var(--color-background) 9%);
    box-shadow: none;
    color: var(--section-text);
    transition: background-color 160ms ease;

    &:hover {
      background: color-mix(in srgb, var(--section-color), var(--color-background) 13%);
    }
  }

  &__tile {
    .card__content {
      display: grid;
      grid-template-columns: 3rem minmax(0, 1fr);
      gap: var(--space-m);
      align-items: start;
    }
  }

  &__icon {
    font-size: 1.65rem;
  }

  &__tile-title,
  &__tile-text {
    margin: 0;
  }

  &__tile-title {
    font-size: var(--font-size-body);
    font-weight: 750;
  }

  &__tile-text {
    color: color-mix(in srgb, var(--section-text), transparent 24%);
    line-height: 1.45;
  }
}

@media (max-width: 980px) {
  .home-reports {
    &__layout {
      grid-template-columns: 1fr;
    }
  }
}

@media (max-width: 640px) {
  .home-reports {
    &__grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>
