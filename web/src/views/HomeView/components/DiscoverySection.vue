<template>
  <Section :class="bemm()" color="green-dark">
    <div :class="bemm('layout')">
      <div :class="bemm('intro')">
        <p :class="bemm('eyebrow')">Step 01</p>
        <h2 :class="bemm('title')">Discovery before judgement</h2>
        <p :class="bemm('text')">
          We start by understanding the product, goals, users, risks, and constraints. No
          assumptions. Just clarity before judgement.
        </p>
      </div>

      <div :class="bemm('visual')" aria-hidden="true">
        <div :class="bemm('magnifier')" />
        <div :class="bemm('paper-stack')">
          <div :class="bemm('paper', 'front')">
            <span v-for="row in 4" :key="row" :class="bemm('paper-row')" />
          </div>
          <div :class="bemm('paper', 'back')" />
          <div :class="bemm('paper', 'chart')" />
        </div>
      </div>
    </div>

    <div :class="bemm('process')">
      <div v-for="step in process" :key="step.title" :class="bemm('process-item')">
        <span :class="bemm('process-icon-wrap')">
          <Icon :class="bemm('process-icon')" :name="step.icon" size="large" />
        </span>
        <h3 :class="bemm('process-title')">{{ step.title }}</h3>
        <p :class="bemm('process-text')">{{ step.text }}</p>
      </div>
    </div>
  </Section>
</template>

<script setup lang="ts">
import { Icon } from "@sil/ui";
import { useBemm } from "bemm";

import Section from "../../../components/Section";

const bemm = useBemm("home-discovery", { includeBaseClass: true });

const process = [
  {
    icon: "ui/search-m",
    title: "1. Understand",
    text: "Learn about product, stack, team, and context.",
  },
  {
    icon: "ui/list-dots",
    title: "2. Scope",
    text: "Define areas to audit based on risk and impact.",
  },
  {
    icon: "ui/checklist-multi",
    title: "3. Plan",
    text: "Align on objectives, timeline, and success criteria.",
  },
  {
    icon: "ui/flag-golf",
    title: "4. Kickoff",
    text: "Run the audit and preserve evidence.",
  },
];
</script>

<style lang="scss">
.home-discovery {
  display: grid;
  gap: var(--space-2xl);
  padding: var(--spacing)
    max(
      var(--page-gutter),
      calc((100vw - var(--container-width)) / 2 + var(--page-gutter))
    );

  &__layout {
    display: grid;
    grid-template-columns: minmax(0, 0.72fr) minmax(18rem, 1fr);
    gap: var(--space-2xl);
    align-items: center;
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

  &__visual {
    position: relative;
    min-height: 18rem;
  }

  &__magnifier {
    position: absolute;
    left: 40%;
    top: 25%;
    width: 6em;
    height: 6em;
    border: 0.5em solid var(--palette-cream);
    border-radius: 999px;
    z-index: 10;
    background-image: linear-gradient(to left bottom, transparent, color-mix(in srgb, white, transparent 50%), transparent);
    backdrop-filter: blur(5px);
    filter: drop-shadow(.25em .5em  0px color-mix(in srgb, black, transparent 80%)) drop-shadow(.25em .5em 1.5em color-mix(in srgb, black, transparent 20%));

    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      margin: 35%;
      width: 75%;
      height: 0.5em;
      border-radius: 999px;
      background: var(--palette-cream);
      content: "";
      transform: rotate(48deg);
      transform-origin: left center;
    }
  }

  &__paper-stack {
    position: absolute;
    right: 8%;
    top: 8%;
    width: 15rem;
    height: 15rem;
  }

  &__paper {
    position: absolute;
    border-radius: var(--radius-s);
    background: var(--palette-cream);
    box-shadow: 0 1rem 2rem color-mix(in srgb, var(--palette-ink), transparent 78%);

    &--front {
      inset: 1rem 3rem 3rem 0;
      z-index: 3;
      display: grid;
      gap: var(--space-s);
      padding: var(--space-l);
      transform: rotate(7deg);
    }

    &--back {
      inset: 4.5rem 0 0 4rem;
      z-index: 1;
      opacity: 0.76;
      transform: rotate(-3deg);
    }

    &--chart {
      right: -2rem;
      bottom: 2rem;
      z-index: 2;
      width: 7rem;
      height: 6rem;
      background: linear-gradient(to top, var(--palette-green) 0 32%, transparent 32%) 23%
          70% / 0.9rem 4.5rem no-repeat,
        linear-gradient(to top, var(--palette-green) 0 60%, transparent 60%) 52% 70% /
          0.9rem 4.5rem no-repeat,
        linear-gradient(to top, var(--palette-green) 0 86%, transparent 86%) 81% 70% /
          0.9rem 4.5rem no-repeat,
        var(--palette-cream);
    }
  }

  &__paper-row {
    display: block;
    height: 0.65rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--palette-ink), transparent 84%);
  }

  &__process {
    --minus-margin: calc((var(--spacing) * -1) + var(--space));
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: var(--space-l);
    margin: 0 var(--minus-margin) 0 var(--minus-margin);
    border-radius: var(--border-radius-xl);
    background-color: color-mix(in srgb, var(--section-text), transparent 95%);
    padding: var(--spacing);
  }

  &__process-item {
    display: grid;
    align-content: start;
    gap: var(--space-s);
  }

  &__process-icon-wrap {
    display: inline-grid;
    width: var(--spacing);
    height: var(--spacing);
    place-items: center;
    border-radius: 999px;
    background: var(--section-color);
    font-size: 2em;
  }

  &__process-icon {
    color: currentColor;
  }

  &__process-title {
    margin: 0;
    color: inherit;
    font-size: var(--font-size-l);
    font-weight: 750;
  }

  &__process-text {
    margin: 0;
    color: color-mix(in srgb, var(--section-text), transparent 24%);
    line-height: 1.55;
  }
}

@media (max-width: 980px) {
  .home-discovery {
    &__layout {
      grid-template-columns: 1fr;
    }

    &__process {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
}

@media (max-width: 640px) {
  .home-discovery {
    &__process {
      grid-template-columns: 1fr;
    }
  }
}
</style>
