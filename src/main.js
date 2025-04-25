import { createApp } from 'vue'
import App from './App.vue'
import router from "@/assets/router";
import "./styles.css";
import "./styles/tailwind.css";

const app = createApp(App);
app.use(router);
app.mount('#app');