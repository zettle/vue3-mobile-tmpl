import { RouteRecordRaw } from 'vue-router';

// const error: RouteRecordRaw = {
//   path: '/error',
//   name: 'Error',
//   component: viewPage,
//   children: [
//     {
//       path: '404',
//       name: 'Error404',
//       component: () => import('@/views/error/404.vue'),
//       meta: { title: 'Not found' }
//     },
//     {
//       path: '403',
//       name: 'Error403',
//       component: () => import('@/views/error/403.vue'),
//       meta: { title: '权限不符合' }
//     }
//   ]
// };
const error: RouteRecordRaw[] = [
  {
    path: '/error/404',
    name: 'Error404',
    component: () => import('@/views/error/404.vue'),
    meta: { title: 'Not found' }
  },
  {
    path: '/error/403',
    name: 'Error403',
    component: () => import('@/views/error/403.vue'),
    meta: { title: '权限不符合' }
  }
];

export default error;
