import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
// import viewPage from './viewPage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/entrance/home'
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/entrance',
    component: () => import('../views/entrance/index.vue'),
    children: [
      {
        path: 'home',
        component: () => import('../views/entrance/home.vue')
      },
      {
        path: 'mine',
        component: () => import('../views/entrance/mine.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
