import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {path: '/', component: () => import(("../components/MainComponent.vue")) },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;