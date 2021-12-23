import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
// import viewPage from './viewPage.vue';
// : Awaitable<ScrollPosition | false | void>
// declare type ScrollPosition = ScrollPositionCoordinates | ScrollPositionElement;
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { top: savedPosition?.top ?? 0 };
  }
});

export default router;
