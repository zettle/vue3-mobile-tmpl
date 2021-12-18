import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/entrance/home'
  },
  {
    path: '/piniaDemo',
    name: 'PiniaDemo',
    component: () => import('../views/pinia-demo.vue')
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

export default routes;
