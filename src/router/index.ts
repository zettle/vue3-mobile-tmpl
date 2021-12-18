import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
// import viewPage from './viewPage.vue';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
