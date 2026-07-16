<template>
  <div class="app-shell">
    <SiteHeader :links="navigationLinks" />
    <RouterView />
    <SiteFooter :groups="footerGroups" />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";

import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import type { FooterGroup } from "./components/SiteFooter/SiteFooter.model";
import type { NavigationLink } from "./types/content";

const navigationLinks: NavigationLink[] = [
  { href: "/", label: "Home" },
  { href: "/skills/", label: "Skills" },
  { href: "/documentation/", label: "Documentation" },
  { href: "/support/", label: "Support" },
];

const footerGroups: FooterGroup[] = [
  {
    title: "Start",
    links: [
      { href: "/getting-started/", label: "Getting started" },
      { href: "/installation/", label: "Installation" },
      { href: "/running-an-audit/", label: "Running an audit" },
      { href: "/understanding-reports/", label: "Understanding reports" },
    ],
  },
  {
    title: "Reference",
    links: [
      { href: "/skills/", label: "Skills" },
      { href: "/documentation/reports/", label: "Reports" },
      { href: "/documentation/examples/", label: "Examples" },
      { href: "/documentation/integrations/", label: "Integrations" },
    ],
  },
  {
    title: "Project",
    links: [
      { href: "/support/", label: "Support" },
      { href: "/documentation/legal/privacy-policy/", label: "Privacy" },
      { href: "/documentation/legal/terms-of-service/", label: "Terms" },
      { href: "/documentation/legal/audit-disclaimer/", label: "Audit disclaimer" },
    ],
  },
];
</script>
