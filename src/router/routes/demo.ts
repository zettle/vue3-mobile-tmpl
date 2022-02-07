import { RouteRecordRaw } from 'vue-router';

const demo: RouteRecordRaw[] = [
  {
    path: '/demo/upload',
    component: () => import('@/views/demo/upload.vue'),
  },
  {
    path: '/demo/pinia',
    component: () => import('@/views/demo/pinia.vue'),
  }
];

export default demo;
