<template>
  <Section :class="bemm()" aria-label="Sills principles">
    <div :class="bemm('layout')">
      <StatCard
        v-for="metric in metrics"
        :key="metric.label"
        :class="bemm('metric')"
        :value="metric.value"
        :label="metric.label"
        :icon="metric.icon"
        :color="metric.color"
      />
    </div>
  </Section>
</template>

<script setup lang="ts">
import { StatCard } from "@sil/ui";
import { useBemm } from "bemm";
import type { Color, IconNameOrString } from "@sil/ui";

import Section from "../../../components/Section";

const bemm = useBemm("home-metrics", { includeBaseClass: true });

const metrics: Array<{ icon: IconNameOrString; value: string; label: string; color: Color }> = [
  { icon: "media/clipboard", value: "14", label: "Areas audited", color: "primary" },
  { icon: "misc/shield-check", value: "0", label: "Critical issues", color: "success" },
  { icon: "ui/triangled-exclamation-mark", value: "4", label: "Medium issues", color: "warning" },
  { icon: "ui/check-m", value: "100%", label: "Coverage", color: "info" },
];
</script>

<style lang="scss">
.home-metrics {
  --color-heading: var(--section-text);

  &__layout {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: var(--space-m);
    max-width: var(--container-width);
    margin: 0 auto;
  }

  // &__metric.stat-card {
  //   display: grid;
  //   grid-template-rows: auto auto;
  //   gap: var(--space-s);
  //   justify-items: center;
  //   min-height: 0;
  //   border: 0;
  //   background: transparent;
  //   padding: 0;
  //   box-shadow: none;
  //   overflow: visible;
  // }

  &__metric {
    // .stat-card {
    //   &__top {
    //     display: inline-grid;
    //     grid-template-columns: auto auto;
    //     gap: var(--space-s);
    //     align-items: center;
    //     justify-content: center;
    //   }

    //   &__value-wrap {
    //     max-width: none;
    //     min-width: auto;
    //     flex: 0 0 auto;
    //   }

    //   &__value {
    //     color: var(--color-heading);
    //     font-size: var(--font-size-xl);
    //     font-weight: 700;
    //     line-height: 1;
    //     letter-spacing: 0;
    //   }

    //   &__icon {
    //     width: 3.25rem;
    //     height: 3.25rem;
    //   }

    //   &__body {
    //     max-width: none;
    //     justify-items: center;
    //     gap: 0;
    //   }

    //   &__label {
    //     color: var(--color-heading);
    //     font-size: var(--font-size-body);
    //     font-weight: 600;
    //     line-height: 1.25;
    //     text-align: center;
    //   }
    // }
  }
}

@media (max-width: 640px) {
  .home-metrics {
    &__layout {
      grid-template-columns: 1fr;
    }
  }
}
</style>
