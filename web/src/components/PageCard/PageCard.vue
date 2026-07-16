<template>
  <RouterLink :class="bemm()" :to="href">
    <Card :class="bemm('surface')" variant="elevated">
      <div :class="bemm('background')"></div>
      <span :class="bemm('topline')">
        <span v-if="section" :class="bemm('section')">{{ section }}</span>
        <Icon v-if="icon" :class="bemm('icon')" :name="icon" size="medium" />
      </span>
      <strong :class="bemm('title')">{{ title }}</strong>
      <span :class="bemm('description')">{{ description }}</span>
    </Card>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { Card, Icon } from "@sil/ui";
import { useBemm } from "bemm";

import type { PageCardProps } from "./PageCard.model";

defineProps<PageCardProps>();

const bemm = useBemm("page-card", { includeBaseClass: true });
</script>

<style lang="scss">
.page-card {
  display: block;
  height: 100%;
  color: inherit;
  text-decoration: none;

  &:hover {
    .page-card__background {
      transform: scale(1.025);
      background: var(
        --page-card-background-hover,
        color-mix(
          in srgb,
          var(--page-card-background, var(--color-surface)),
          var(--color-accent) 8%
        )
      );
    }
  }

  &__background {
    display: block;
    position: absolute;
    border-radius: var(--radius-s);
    inset: 0;
    transition: transform .2s var(--cubic-bezier);
    background: var(
      --page-card-background,
      color-mix(in srgb, var(--color-surface), var(--color-background) 18%)
    );
    box-shadow: none;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  &__surface.card {
    height: 100%;
    z-index: 2;
    padding: 0;
    position: relative;
    min-height: var(--card-min-height);
    background-color: transparent;
    color: inherit;
    transition: background-color 160ms ease, color 160ms ease;
  }

  &__surface {
    .card__content {
      display: grid;
      align-content: start;
      gap: var(--space-xs);
      padding: var(--space);
    }
  }

  &__section {
    color: var(--section-color, var(--color-accent-strong));
    font-size: var(--font-size-xs);
    font-weight: 700;
    letter-spacing: var(--letter-spacing-label);
    text-transform: uppercase;
  }

  &__topline {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-s);
  }

  &__icon {
    flex: 0 0 auto;
    color: var(--color-accent-strong);
    font-size: 1.5rem;
  }

  &__title {
    color: var(--color-heading);
    font-size: var(--font-size-body);
    font-weight: 750;
    line-height: 1.25;
  }

  &__description {
    display: -webkit-box;
    overflow: hidden;
    color: var(--color-muted);
    font-size: var(--font-size-s);
    line-height: 1.45;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
  }
}
</style>
