import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { ui } from "@sil/ui/vite";

export default defineConfig({
  plugins: [
    vue(),
    ui(),
  ],
  publicDir: "static",
  build: {
    outDir: "public",
    emptyOutDir: true,
  },
});
