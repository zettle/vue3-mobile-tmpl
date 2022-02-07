import entranceRoute from './entrance';
import demo from './demo';

export default [
  {
    path: '/',
    redirect: '/entrance/home',
  },
  ...entranceRoute,
  ...demo,
  {
    path: '/:pathMatch(.*)', // 配置404
    // redirect: '/error/404' // 不推荐redirect，会url重定向，但我们往往希望在url保留着那个404的地址，只是界面展示not found界面
    component: (): Promise<typeof import('@/views/error/NotFound.vue')> =>
      import('@/views/error/NotFound.vue'),
  },
];
