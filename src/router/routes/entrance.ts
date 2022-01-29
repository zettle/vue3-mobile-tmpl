import { RouteRecordRaw } from 'vue-router';

const entrance: RouteRecordRaw = {
  path: '/entrance',
  name: 'Entrance',
  component: () => import('@/views/entrance/Index.vue'),
  children: [
    {
      path: 'home',
      name: 'EntranceHome',
      component: () => import('@/views/entrance/Home.vue'),
      meta: {
        title: '首页',
      },
    },
    {
      path: 'mine',
      name: 'EntranceMine',
      component: () => import('@/views/entrance/Mine.vue'),
      meta: {
        title: '个人中心',
        roles: ['admin'],
        requireLogin: true,
      },
    },
    {
      path: 'demo',
      name: 'EntranceDemo',
      component: () => import('@/views/entrance/Demo.vue'),
      meta: {
        title: '其他',
      },
    },
  ],
};
export default entrance;
