<template>
  <div :class="[bemm(), 'nizel-content']" data-nizel-content v-html="html" />
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import { useBemm } from "bemm";
import { markdownToHtml } from "nizel/browser";

import type { MarkdownContentProps } from "./MarkdownContent.model";

const props = defineProps<MarkdownContentProps>();
const bemm = useBemm("markdown-content", { includeBaseClass: true });
const renderedHtml = ref("");

const html = computed(() => renderedHtml.value);

const normalizeHref = (href: string): string => {
  if (/^(https?:|mailto:|#)/.test(href)) return href;
  const [path, hash = ""] = href.split("#");
  const suffix = hash ? `#${hash}` : "";
  if (!path) return suffix;
  if (path.endsWith("/")) return `${path}${suffix}`;
  if (path.includes(".")) return `${path}${suffix}`;
  return `${path.replace(/\/?$/, "/")}${suffix}`;
};

watchEffect(async (onCleanup) => {
  let cancelled = false;
  onCleanup(() => {
    cancelled = true;
  });

  const nextHtml = await markdownToHtml(props.markdown, {
    preset: "docs",
    safe: true,
    elements: {
      a: (node) => ({
        attr: {
          href: node.type === "link" ? normalizeHref(node.href) : undefined,
          target: node.type === "link" && /^(https?:)/.test(node.href) ? "_blank" : undefined,
          rel: node.type === "link" && /^(https?:)/.test(node.href) ? "noreferrer" : undefined,
        },
      }),
    },
  });

  if (!cancelled) renderedHtml.value = nextHtml;
});
</script>

<style lang="scss">
.markdown-content,
.nizel-content {
  display: grid;
  gap: var(--space-m);
  color: var(--color-text);
  font-size: var(--font-size-body);
  line-height: 1.7;
}

.nizel-content h1,
.nizel-content h2,
.nizel-content h3,
.nizel-content h4 {
  margin: 0;
  color: var(--color-heading);
  font-weight: 600;
  line-height: 1.14;
}

.nizel-content h1 {
  max-width: 11ch;
  font-size: var(--font-size-hero);
  letter-spacing: 0;
}

.nizel-content h2 {
  padding-top: var(--space-l);
  font-size: var(--font-size-xl);
}

.nizel-content h3 {
  font-size: var(--font-size-l);
}

.nizel-content p,
.nizel-content ul,
.nizel-content ol,
.nizel-content blockquote {
  max-width: 68ch;
  margin: 0;
}

.nizel-content a {
  color: var(--color-accent);
  text-decoration-color: color-mix(in srgb, var(--color-accent), transparent 62%);
  text-underline-offset: 0.18em;
}

.nizel-content ul,
.nizel-content ol {
  display: grid;
  gap: var(--space-2xs);
  padding-left: var(--space-l);
}

.nizel-content blockquote {
  border-left: 0.3rem solid var(--color-accent);
  padding-left: var(--space-m);
  color: var(--color-muted);
}

.nizel-content pre {
  max-width: 100%;
  margin: 0;
  overflow: auto;
  border-radius: var(--radius-s);
  background: var(--color-code);
  color: var(--color-code-text);
}

.nizel-content pre code {
  display: block;
  padding: var(--space-m);
  font-family: var(--font-mono);
  font-size: var(--font-size-s);
  line-height: 1.7;
}

.nizel-content :not(pre) > code,
.nizel-code {
  border-radius: var(--radius-xs);
  background: var(--color-inline-code);
  padding: 0.12em 0.36em;
  font-family: var(--font-mono);
  font-size: 0.9em;
}

.nizel-content table {
  width: 100%;
  max-width: 100%;
  border-collapse: collapse;
  font-size: var(--font-size-s);
}

.nizel-content th,
.nizel-content td {
  border-bottom: 1px solid var(--color-border);
  padding: var(--space-xs) var(--space-s);
  text-align: left;
  vertical-align: top;
}
</style>
