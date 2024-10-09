import { createRouter, createWebHistory } from 'vue-router';
import ClassifierPage from '../components/ClassifierPage.vue';
import AboutPage from '../components/AboutPage.vue';

const routes = [
    { path: '/', component: ClassifierPage },
    { path: '/about', component: AboutPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;