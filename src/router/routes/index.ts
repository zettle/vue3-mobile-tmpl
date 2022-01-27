import entranceRoute from './entrance';

export default [
  {
    path: '/',
    redirect: '/entrance/home',
  },
  entranceRoute,
  {
    path: '/:pathMatch(.*)', // 配置404
    // redirect: '/error/404' // 不推荐redirect，会url重定向，但我们往往希望在url保留着那个404的地址，只是界面展示not found界面
    component: () => import('@/views/error/NotFound.vue'),
  },
];
