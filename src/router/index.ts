import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
// import viewPage from './viewPage.vue';

const routes: Array<RouteRecordRaw> = [
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
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
