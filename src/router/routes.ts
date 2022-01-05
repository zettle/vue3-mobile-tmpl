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
      },
      {
        path: 'scroll',
        component: viewPage,
        children: [
          {
            path: 'first',
            component: () => import('../views/demo/scroll/first.vue'),
            meta: { title: '滚动问题' }
          },
          {
            path: 'second',
            component: () => import('../views/demo/scroll/second.vue'),
            meta: { title: '滚动问题' }
          }
        ]
      },
      {
        path: 'storage',
        component: () => import('../views/demo/storage.vue'),
        meta: { title: 'storage测试' }
      },
      {
        path: 'pinia',
        component: () => import('../views/demo/pinia.vue'),
        meta: { title: 'pinia测试' }
      },
      {
        path: 'reg',
        component: () => import('../views/demo/reg.vue'),
        meta: { title: '正则测试' }
      }
    ]
  }
];

export default routes;
