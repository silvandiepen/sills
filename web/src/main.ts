import { createApp } from "vue";

import App from "./App.vue";
import { router } from "./router";
import "./style/app.scss";

const storedMode = window.localStorage.getItem("sills-color-mode");
const preferredMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
document.documentElement.dataset.colorMode = storedMode === "light" || storedMode === "dark" ? storedMode : preferredMode;

createApp(App).use(router).mount("#app");
