<template>
  <section :style="sectionStyle" :class="[bemm(), color ? bemm('', color) : '']">
    <slot />
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useBemm } from "bemm";

import type { SectionProps } from "./Section.model";

const props = withDefaults(defineProps<SectionProps>(), {
  color: "background",
});

const bemm = useBemm("section", { includeBaseClass: true });

const sectionStyle = computed<Record<string, string>>(() => ({
  "--section-color": `var(--color-${props.color})`,
  "--section-text": `var(--color-${props.color}-text, var(--color-${props.color}-contrast, var(--color-foreground)))`,
}));
</script>

<style lang="scss">
.section {
  background-color: var(--section-color);
  color: var(--section-text);
}
</style>
