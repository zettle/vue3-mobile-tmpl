import { RouteRecordRaw } from 'vue-router';
import viewPage from '../viewPage.vue';

const demo: RouteRecordRaw[] = [
  {
    path: '/demo/upload',
    component: () => import('@/views/demo/upload.vue'),
  },
  {
    path: '/demo/pinia',
    component: () => import('@/views/demo/pinia.vue'),
  },
  {
    path: '/demo/axios',
    component: () => import('@/views/demo/axios.vue'),
  },
  {
    path: '/demo/reg',
    component: () => import('@/views/demo/reg.vue'),
  },
  {
    path: '/demo/scroll',
    component: viewPage,
    children: [
      {
        path: 'first',
        name: 'DemoFirst',

        component: () => import('@/views/demo/scroll/first.vue'),
        meta: { title: '滚动问题' },
      },
      {
        path: 'second',
        name: 'DemoSecond',
        component: () => import('@/views/demo/scroll/second.vue'),
        meta: { title: '滚动问题' },
      },
    ],
  },
];

export default demo;
