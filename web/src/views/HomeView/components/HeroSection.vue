<template>
  <Section :class="bemm()" :color="'light'">
    <div :class="bemm('layout')">
      <div :class="bemm('copy')">
        <Badge :class="bemm('badge')" variant="outline">Audit smarter, act faster</Badge>
        <h1 :class="bemm('title')">
          Audit the
          <span :class="bemm('mark')">whole</span>
          codebase, not just a checklist
        </h1>
        <p :class="bemm('text')">
          Sills helps agents uncover risks, track what matters, and ship with confidence.
          From discovery to full audit reports, every finding stays evidence-led.
        </p>
        <ButtonGroup :class="bemm('actions')">
          <Button variant="primary" size="large" to="/getting-started/"
            >Get started</Button
          >
          <Button variant="outline" size="large" to="/skills/">Book a demo</Button>
        </ButtonGroup>
      </div>

      <div :class="bemm('visual')">
        <video
          :class="bemm('visual-video')"
          src="/assets/visual.mp4"
          autoplay
          muted
          playsinline
          preload="metadata"
          aria-hidden="true"
          @mouseenter="playVisualVideo"
        />
      </div>
    </div>
  </Section>
</template>

<script setup lang="ts">
import { Badge, Button, ButtonGroup } from "@sil/ui";
import { useBemm } from "bemm";

import Section from "../../../components/Section";

const bemm = useBemm("home-hero", { includeBaseClass: true });

const playVisualVideo = (event: MouseEvent) => {
  const video = event.currentTarget as HTMLVideoElement;

  video.currentTime = 0;
  void video.play();
};
</script>

<style lang="scss">
.home-hero {
  position: relative;
  padding: calc(var(--spacing) * 2) var(--spacing);
  --color-heading: var(--section-text);
  --color-muted: color-mix(in srgb, var(--section-text), transparent 38%);

  --hero-color: var(--color-yellow);
  background-color: var(--hero-color);

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
    position: relative;
    z-index: 15;
  }

  &__badge.home-hero__badge {
    width: fit-content;
    color: var(--section-text);
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
    color: var(--color-green);

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
        --button-border: 1px solid
          color-mix(in srgb, var(--color-accent), transparent 28%);
        --button-color-text: var(--color-accent-strong);
        --button-color-text-hover: var(--color-accent-strong);

        &:hover {
          --button-background: color-mix(in srgb, var(--color-accent), transparent 88%);
        }
      }
    }
  }

  &__visual {
    display: grid;
    align-items: center;
    justify-items: end;
    position: absolute;
    bottom: 0;
    right: 0;
    transform-origin: 10% 50%;
    height: 100%;
    aspect-ratio: 1/1;


    &::before {
      content: "";
      position: absolute;
      inset: 0;
      display: block;
      width: calc(var(--spacing) * 2);
      height: 100%;
      background-image: linear-gradient(to right, var(--hero-color), transparent);
    }
  }

  &__visual-video {
    width: 100%;
    aspect-ratio: 1;
    border-radius: var(--radius-s);
    object-fit: cover;
  }
}

@media (max-width: 980px) {
  .home-hero {
    &__layout {
      grid-template-columns: 1fr;
    }

    &__visual-video {
      justify-self: center;
    }
  }
}

@media (max-width: 640px) {
  .home-hero {
    min-height: auto;

    &__visual {
      justify-items: center;
    }
  }
}
</style>
