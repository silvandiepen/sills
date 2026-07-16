<template>
  <footer :class="bemm()">
    <div :class="bemm('inner')">
      <div :class="bemm('brand')">
        <RouterLink :class="bemm('logo')" to="/" aria-label="Sills home">
          <span :class="bemm('logo-svg')" v-html="logoSvg" />
        </RouterLink>
        <p>Report-only Agent Skills for audits that separate evidence, automated results, inference, and manual review.</p>
      </div>

      <nav :class="bemm('nav')" aria-label="Footer navigation">
        <section v-for="group in groups" :key="group.title" :class="bemm('group')">
          <h2 :class="bemm('heading')">{{ group.title }}</h2>
          <RouterLink v-for="link in group.links" :key="link.href" :to="link.href">
            <Icon :name="iconForHref(link.href)" size="small" />
            {{ link.label }}
          </RouterLink>
        </section>
      </nav>
    </div>

    <div :class="bemm('meta')">
      <span>&copy; 2026 Sills.</span>
      <a href="https://github.com/silvandiepen/sills">GitHub</a>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { Icon } from "@sil/ui";
import { useBemm } from "bemm";

import logoSvg from "../../assets/logo.svg?raw";
import type { SiteFooterProps } from "./SiteFooter.model";

defineProps<SiteFooterProps>();

const bemm = useBemm("site-footer", { includeBaseClass: true });

const footerIcons: Record<string, string> = {
  "/getting-started/": "ui/flag-golf",
  "/skills/": "ui/folder-star",
  "/documentation/": "ui/book-pages",
  "/documentation/examples/": "ui/file-code",
  "/understanding-reports/": "misc/graph-up-round",
  "/support/": "ui/talk-star",
};

const iconForHref = (href: string): string => footerIcons[href] ?? "arrows/arrow-right";
</script>

<style lang="scss">
.site-footer {
  border-top: 1px solid var(--color-border);
  background: var(--color-surface-muted);
}

.site-footer__inner,
.site-footer__meta {
  max-width: var(--container-width);
  margin: 0 auto;
  padding-inline: var(--page-gutter);
}

.site-footer__inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.6fr);
  gap: var(--space-2xl);
  padding-block: var(--space-2xl);
}

.site-footer__brand {
  display: grid;
  align-content: start;
  gap: var(--space-m);
}

.site-footer__logo {
  display: inline-flex;
  width: var(--logo-width);
  color: var(--color-heading);
}

.site-footer__logo-svg,
.site-footer__logo-svg svg {
  display: block;
  width: 100%;
  height: auto;
}

.site-footer__brand p {
  max-width: var(--copy-width);
  margin: 0;
  color: var(--color-muted);
}

.site-footer__nav {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: start;
  gap: var(--space-l);
}

.site-footer__group {
  display: grid;
  align-content: start;
  gap: var(--space-xs);
}

.site-footer__heading.site-footer__heading {
  margin: 0;
  color: var(--color-heading);
  font-size: var(--font-size-s);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: var(--letter-spacing-label);
  text-transform: uppercase;
}

.site-footer__group a,
.site-footer__meta a {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  color: var(--color-muted);
  text-decoration: none;
}

.site-footer__group a:hover,
.site-footer__meta a:hover {
  color: var(--color-heading);
}

.site-footer__meta {
  display: flex;
  gap: var(--space-m);
  padding-block: var(--space-m);
  color: var(--color-muted);
  font-size: var(--font-size-s);
}

@media (max-width: 760px) {
  .site-footer__inner,
  .site-footer__nav {
    grid-template-columns: 1fr;
  }
}
</style>
