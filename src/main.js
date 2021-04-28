import { createApp } from "vue";
import App from "./App.vue";

import router from "@/router";
import store from "@/store";
import { firestorePlugin } from 'vuefire'

const app = createApp(App);

app.use(router);
app.use(store);
app.use(firestorePlugin)
app.mount("#app");
