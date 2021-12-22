import type { RouteRecordRaw } from 'vue-router';
import viewPage from './viewPage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/entrance/home'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/entrance',
    component: () => import('../views/entrance/index.vue'),
    children: [
      {
        path: 'home',
        component: () => import('../views/entrance/home.vue'),
        meta: { title: '首页' }
      },
      {
        path: 'mine',
        component: () => import('../views/entrance/mine.vue'),
        meta: { title: '个人中心' }
      }
    ]
  },
  {
    path: '/demo',
    component: viewPage,
    children: [
      {
        path: 'axios',
        component: () => import('../views/demo/axios.vue'),
        meta: { title: 'axios测试页面' }
      }
    ]
  }
];

export default routes;
