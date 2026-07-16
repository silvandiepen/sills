<template>
  <button
    :class="bemm()"
    type="button"
    :aria-label="`Switch to ${nextMode} mode`"
    @click="toggleMode"
  >
    <Icon :name="mode === 'dark' ? 'weather/sun-light-mode' : 'weather/moon-dark-mode'" size="small" />
  </button>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { Icon } from "@sil/ui";
import { useBemm } from "bemm";

import type { ColorMode } from "./ColorModeSwitch.model";

const bemm = useBemm("color-mode-switch", { includeBaseClass: true });
const storageKey = "sills-color-mode";
const mode = ref<ColorMode>("light");

const readPreferredMode = (): ColorMode => {
  const stored = window.localStorage.getItem(storageKey);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const applyMode = (nextMode: ColorMode): void => {
  mode.value = nextMode;
  document.documentElement.dataset.colorMode = nextMode;
  window.localStorage.setItem(storageKey, nextMode);
};

const nextMode = computed(() => mode.value === "dark" ? "light" : "dark");

const toggleMode = (): void => {
  applyMode(nextMode.value);
};

onMounted(() => {
  applyMode(readPreferredMode());
});
</script>
