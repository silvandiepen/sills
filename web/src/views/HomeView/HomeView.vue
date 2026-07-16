<template>
  <main :class="bemm()">
    <HeroSection />
    <MetricsSection />
    <DiscoverySection />
    <SkillsSection :skills="skills" />
    <ReportsSection />
    <DocsSection :featured-docs="featuredDocs" />
  </main>
</template>

<script setup lang="ts">
import { useBemm } from "bemm";

import DiscoverySection from "./components/DiscoverySection.vue";
import DocsSection from "./components/DocsSection.vue";
import HeroSection from "./components/HeroSection.vue";
import MetricsSection from "./components/MetricsSection.vue";
import ReportsSection from "./components/ReportsSection.vue";
import SkillsSection from "./components/SkillsSection.vue";
import type { HomeViewProps } from "./HomeView.model";

defineProps<HomeViewProps>();

const bemm = useBemm("home-view", { includeBaseClass: true });
</script>

<style lang="scss">
.home-view {
  display: grid;
}
</style>
