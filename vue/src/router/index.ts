import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {path: '/', name: "MainComponent", component: () => import(("../components/MainComponent.vue")) },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;