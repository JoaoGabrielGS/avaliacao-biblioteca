import "./assets/main.css";
import "primeicons/primeicons.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import { pt } from "yup-locale-pt";
import { setLocale } from "yup";
import ToastService from "primevue/toastservice";
import { createPinia } from "pinia";

setLocale(pt);

window.log = console.log;

const app = createApp(App);
const pinia = createPinia();

app.use(ToastService);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: ".dark",
        },
    },
});
app.use(router);
app.use(pinia);
app.mount("#app");
