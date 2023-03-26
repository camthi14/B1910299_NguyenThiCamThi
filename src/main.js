import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Vue3Toastify from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import "./assets/main.css";
import router from "./router";

createApp(App).use(Vue3Toastify).use(router).mount("#app");
