<template>
  <header :class="bemm()">
    <div :class="bemm('inner')">
      <RouterLink :class="bemm('logo')" to="/" aria-label="Sills home">
        <span :class="bemm('logo-svg')" v-html="logoSvg" />
      </RouterLink>

      <nav :class="bemm('nav')" aria-label="Main navigation">
        <RouterLink
          v-for="link in links"
          :key="link.href"
          :class="bemm('link')"
          :to="link.href"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <div :class="bemm('actions')">
        <ColorModeSwitch />
        <Button :class="bemm('action')" type="button" variant="primary" to="/getting-started/">
          Get started
        </Button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { Button } from "@sil/ui";
import { useBemm } from "bemm";

import ColorModeSwitch from "../ColorModeSwitch";
import logoSvg from "../../assets/logo.svg?raw";
import type { SiteHeaderProps } from "./SiteHeader.model";

defineProps<SiteHeaderProps>();

const bemm = useBemm("site-header", { includeBaseClass: true });
</script>

<style lang="scss">
.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(--color-header);
  color: var(--color-heading);
}

.site-header__inner {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: var(--space-m);
  max-width: var(--container-width);
  margin: 0 auto;
  padding: var(--space-s) var(--page-gutter);
}

.site-header__logo {
  display: inline-flex;
  width: var(--logo-width);
  color: currentColor;
}

.site-header__logo-svg,
.site-header__logo-svg svg {
  display: block;
  width: 100%;
  height: auto;
}

.site-header__nav {
  display: flex;
  justify-content: center;
  gap: var(--space-xs);
}

.site-header__actions {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
}

.site-header__link,
.site-header__action {
  display: inline-flex;
  min-height: var(--control-height);
  align-items: center;
  border-radius: 999px;
  padding: 0 var(--space-s);
  color: var(--color-muted);
  font-size: var(--font-size-body);
  font-weight: 600;
  text-decoration: none;
}

.site-header__link.router-link-active {
  background: color-mix(in srgb, var(--color-accent), transparent 88%);
  color: var(--color-accent-strong);
}

.site-header__action.site-header__action {
  background: var(--color-heading);
  color: var(--color-background);
}

@media (max-width: 760px) {
  .site-header__inner {
    grid-template-columns: 1fr auto;
  }

  .site-header__nav {
    grid-column: 1 / -1;
    justify-content: flex-start;
    overflow-x: auto;
  }

  .site-header__action {
    display: none;
  }
}
</style>
