<template>
  <Section :class="bemm()">
    <div :class="bemm('layout')">
      <div :class="bemm('copy')">
        <Badge :class="bemm('badge')" variant="outline">Audit smarter, act faster</Badge>
        <h1 :class="bemm('title')">
          Audit the
          <span :class="bemm('mark')">whole</span>
          product, not just a checklist
        </h1>
        <p :class="bemm('text')">
          Sills helps agents uncover risks, track what matters, and ship with confidence.
          From discovery to full audit reports, every finding stays evidence-led.
        </p>
        <ButtonGroup :class="bemm('actions')">
          <Button variant="primary" size="large" to="/getting-started/">Get started</Button>
          <Button variant="outline" size="large" to="/skills/">Book a demo</Button>
        </ButtonGroup>
      </div>

      <Card :class="bemm('audit-card')" variant="elevated" no-padding aria-label="Audit overview">
        <div :class="bemm('audit-card-top')">
          <strong :class="bemm('audit-card-title')">Audit overview</strong>
          <span :class="bemm('audit-card-range')">Last 7 days</span>
        </div>
        <div :class="bemm('chart')" aria-hidden="true">
          <span
            v-for="point in chartPoints"
            :key="point.x"
            :class="bemm('chart-point')"
            :style="{ '--point-x': `${point.x}%`, '--point-y': `${point.y}%` }"
          />
        </div>
        <div :class="bemm('audit-card-stats')">
          <span v-for="stat in auditStats" :key="stat.label" :class="bemm('audit-stat')">
            <small :class="bemm('audit-stat-label')">{{ stat.label }}</small>
            <strong :class="bemm('audit-stat-value')">{{ stat.value }}</strong>
          </span>
        </div>
      </Card>
    </div>
  </Section>
</template>

<script setup lang="ts">
import { Badge, Button, ButtonGroup, Card } from "@sil/ui";
import { useBemm } from "bemm";

import Section from "../../../components/Section";

const bemm = useBemm("home-hero", { includeBaseClass: true });

const chartPoints = [
  { x: 4, y: 62 },
  { x: 16, y: 38 },
  { x: 28, y: 50 },
  { x: 40, y: 58 },
  { x: 52, y: 38 },
  { x: 64, y: 38 },
  { x: 76, y: 38 },
  { x: 88, y: 56 },
  { x: 98, y: 30 },
];

const auditStats = [
  { label: "Issues", value: "14" },
  { label: "Resolved", value: "10" },
  { label: "In progress", value: "4" },
];
</script>

<style lang="scss">
.home-hero {
  padding: var(--space-3xl) var(--page-gutter) var(--space-xl);
  --color-heading: var(--section-text);
  --color-muted: color-mix(in srgb, var(--section-text), transparent 38%);

  &__layout {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(var(--hero-aside-min-width), 0.9fr);
    gap: var(--space-2xl);
    align-items: center;
    max-width: var(--container-width);
    margin: 0 auto;
  }

  &__copy {
    display: grid;
    gap: var(--space-m);
  }

  &__badge.home-hero__badge {
    width: fit-content;
  }

  &__title {
    max-width: 13ch;
    margin: 0;
    font-size: var(--font-size-hero);
    font-weight: 750;
    line-height: 1.04;
    letter-spacing: 0;
  }

  &__mark {
    position: relative;
    display: inline-block;
    color: var(--color-accent-strong);

    &::after {
      position: absolute;
      right: -0.08em;
      bottom: 0.06em;
      left: -0.04em;
      height: 0.12em;
      border-radius: 999px;
      background: var(--palette-yellow);
      content: "";
      z-index: -1;
    }
  }

  &__text {
    max-width: var(--copy-width);
    margin: 0;
    color: var(--color-muted);
    font-size: var(--font-size-l);
    line-height: 1.55;
  }

  &__actions.home-hero__actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-s);
    padding-top: var(--space-s);

    .button {
      --button-border: none;

      min-height: var(--control-height);
      border-radius: 999px;
      background: transparent;
      padding: 0 var(--space-m);
      font-weight: 700;
      text-decoration: none;

      &--primary {
        --button-background: var(--color-accent);
        --button-color-text: var(--palette-ink);
      }

      &--outline {
        --button-background: color-mix(in srgb, var(--color-accent), transparent 92%);
        --button-border: 1px solid color-mix(in srgb, var(--color-accent), transparent 28%);
        --button-color-text: var(--color-accent-strong);
        --button-color-text-hover: var(--color-accent-strong);

        &:hover {
          --button-background: color-mix(in srgb, var(--color-accent), transparent 88%);
        }
      }
    }
  }

  &__audit-card.card {
    display: grid;
    gap: var(--space-l);
    background: var(--color-code);
    padding: var(--space-l);
    // color: var(--color-code-text);
    box-shadow: 0 1.5rem 3rem color-mix(in srgb, var(--palette-ink), transparent 82%);
  }

  &__audit-card-top,
  &__audit-card-stats {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-l);
  }

  &__audit-card-top {
    // color: var(--color-code-text);
  }

  &__audit-card-range,
  &__audit-stat-label {
    // color: color-mix(in srgb, var(--color-code-text), transparent 42%);
    font-size: var(--font-size-xs);
  }

  &__chart {
    position: relative;
    min-height: 8rem;
    border-bottom: 1px solid color-mix(in srgb, var(--color-code-text), transparent 84%);
    background:
      linear-gradient(to bottom, transparent 0 32%, color-mix(in srgb, var(--color-code-text), transparent 92%) 32% 33%, transparent 33% 66%, color-mix(in srgb, var(--color-code-text), transparent 92%) 66% 67%, transparent 67%),
      linear-gradient(160deg, color-mix(in srgb, var(--palette-green), transparent 88%), transparent 58%);

    &::before {
      position: absolute;
      inset: 18% 3% 24%;
      border-bottom: 3px solid color-mix(in srgb, var(--palette-green), var(--palette-cream) 28%);
      clip-path: polygon(0 65%, 10% 38%, 20% 52%, 31% 64%, 44% 40%, 57% 40%, 70% 40%, 84% 62%, 100% 30%, 100% 36%, 84% 68%, 70% 46%, 57% 46%, 44% 46%, 31% 70%, 20% 58%, 10% 44%, 0 71%);
      content: "";
    }
  }

  &__chart-point {
    position: absolute;
    left: var(--point-x);
    top: var(--point-y);
    width: 0.55rem;
    height: 0.55rem;
    border: 2px solid var(--color-code);
    border-radius: 999px;
    background: var(--palette-green);
  }

  &__audit-stat {
    display: grid;
    gap: var(--space-2xs);
  }

  &__audit-stat-value {
    margin: 0;
    color: var(--color-code-text);
    font-size: var(--font-size-l);
    line-height: 1;
  }
}

@media (max-width: 980px) {
  .home-hero {
    &__layout {
      grid-template-columns: 1fr;
    }
  }
}

@media (max-width: 640px) {
  .home-hero {
    min-height: auto;
  }
}
</style>
