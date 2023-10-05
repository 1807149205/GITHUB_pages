import { createRouter, createWebHistory } from 'vue-router';
import MainComponentVue from '../components/MainComponent.vue';


const routes = [
  {path: '/', name: "MainComponent", component: MainComponentVue },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;