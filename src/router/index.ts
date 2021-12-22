import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
// import viewPage from './viewPage.vue';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// router.afterEach((to: any) => {
//   console.log('afterEach', to);
// });

export default router;
