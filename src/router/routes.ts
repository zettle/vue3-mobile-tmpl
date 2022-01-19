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
    meta: {
      title: '登录',
      unRequireLogin: true
    }
  },
  {
    path: '/entrance',
    name: 'Entrance',
    component: () => import('../views/entrance/index.vue'),
    children: [
      {
        path: 'home',
        name: 'EntranceHome',
        component: () => import('../views/entrance/home.vue'),
        meta: {
          title: '首页'
        }
      },
      {
        path: 'mine',
        name: 'EntranceMine',
        component: () => import('../views/entrance/mine.vue'),
        meta: {
          title: '个人中心',
          roles: ['admin', 'customer'],
          requireLogin: true
        }
      },
      {
        path: 'demo',
        name: 'EntranceDemo',
        component: () => import('../views/entrance/demo.vue'),
        meta: {
          title: '其他'
        }
      }
    ]
  },
  {
    path: '/demo',
    name: 'Demo',
    component: viewPage,
    children: [
      {
        path: 'axios',
        name: 'DemoAxios',
        component: () => import('../views/demo/axios.vue'),
        meta: { title: 'axios测试页面' }
      },
      {
        path: 'scroll',
        name: 'DemoScroll',
        component: viewPage,
        children: [
          {
            path: 'first',
            name: 'DemoFirst',

            component: () => import('../views/demo/scroll/first.vue'),
            meta: { title: '滚动问题' }
          },
          {
            path: 'second',
            name: 'DemoSecond',
            component: () => import('../views/demo/scroll/second.vue'),
            meta: { title: '滚动问题' }
          }
        ]
      },
      {
        path: 'storage',
        name: 'DemoStorage',
        component: () => import('../views/demo/storage.vue'),
        meta: { title: 'storage测试' }
      },
      {
        path: 'pinia',
        name: 'DemoPinia',
        component: () => import('../views/demo/pinia.vue'),
        meta: { title: 'pinia测试' }
      },
      {
        path: 'reg',
        name: 'DemoReg',
        component: () => import('../views/demo/reg.vue'),
        meta: { title: '正则测试' }
      },
      {
        path: 'indexbar',
        name: 'DemoIndexbar',
        component: () => import('../views/demo/indexbar.vue'),
        meta: { title: '索引' }
      }
    ]
  }
];

export default routes;
