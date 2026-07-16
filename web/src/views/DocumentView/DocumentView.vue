<template>
  <main :class="bemm()">
    <aside v-if="sidebarPages.length" :class="bemm('sidebar')" aria-label="Related pages">
      <p>{{ sidebarTitle }}</p>
      <RouterLink
        v-for="relatedPage in sidebarPages"
        :key="relatedPage.slug"
        :class="bemm('sidebar-link')"
        :to="relatedPage.slug"
      >
        <Icon :name="iconForPage(relatedPage)" size="small" />
        {{ relatedPage.meta.title }}
      </RouterLink>
    </aside>

    <article :class="bemm('content')">
      <MarkdownContent :markdown="page.markdown" />

      <section v-if="childPages.length" :class="bemm('archive')">
        <div :class="bemm('archive-intro')">
          <p class="eyebrow">{{ page.meta.archiveTitle ?? "In this section" }}</p>
        </div>
        <div :class="bemm('cards')">
          <PageCard
            v-for="childPage in childPages"
            :key="childPage.slug"
            :title="childPage.meta.title"
            :description="childPage.meta.description"
            :href="childPage.slug"
            :section="childPage.meta.section"
            :icon="iconForPage(childPage)"
          />
        </div>
      </section>
    </article>
  </main>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { Icon } from "@sil/ui";
import { useBemm } from "bemm";

import MarkdownContent from "../../components/MarkdownContent";
import PageCard from "../../components/PageCard";
import { childrenOf, iconForPage } from "../../services/content";
import type { DocumentViewProps } from "./DocumentView.model";

const props = defineProps<DocumentViewProps>();
const bemm = useBemm("document-view", { includeBaseClass: true });

const childPages = computed(() => childrenOf(props.page.slug));
const sidebarPages = computed(() => props.relatedPages);
const sidebarTitle = computed(() => childPages.value.length ? "In this section" : "Related pages");
</script>

<style lang="scss">
.document-view {
  display: grid;
  grid-template-columns: minmax(var(--sidebar-width), 0.28fr) minmax(0, 1fr);
  gap: var(--space-2xl);
  max-width: var(--container-width);
  margin: 0 auto;
  padding: var(--space-3xl) var(--page-gutter);

  &__sidebar {
    position: sticky;
    top: var(--sticky-offset);
    display: grid;
    align-content: start;
    gap: var(--space-2xs);
    max-height: calc(100vh - var(--sticky-offset));
    overflow: auto;

    p {
      margin: 0;
      padding: 0 var(--space-xs) var(--space-xs);
      color: var(--color-accent-strong);
      font-size: var(--font-size-xs);
      font-weight: 700;
      letter-spacing: var(--letter-spacing-label);
      text-transform: uppercase;
    }
  }

  &__sidebar-link {
    display: grid;
    grid-template-columns: 1.15rem minmax(0, 1fr);
    align-items: center;
    gap: var(--space-xs);
    border-radius: var(--radius-xs);
    padding: var(--space-xs);
    color: var(--color-muted);
    text-decoration: none;

    &:hover,
    &.router-link-active,
    &.router-link-exact-active {
      background: color-mix(in srgb, var(--color-accent), transparent 90%);
      color: var(--color-accent-strong);
      font-weight: 700;
    }
  }

  &__content {
    min-width: 0;
  }

  &__archive {
    display: grid;
    gap: var(--space-m);
    padding-top: var(--space-2xl);
  }

  &__archive-intro {
    display: grid;
    gap: var(--space-xs);
  }

  &__cards {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-m);
  }
}

@media (max-width: 860px) {
  .document-view {
    grid-template-columns: 1fr;

    &__sidebar {
      position: static;
      display: flex;
      max-height: none;
      overflow-x: auto;
    }

    &__sidebar p {
      display: none;
    }
  }
}

@media (max-width: 640px) {
  .document-view__cards {
    grid-template-columns: 1fr;
  }
}
</style>
