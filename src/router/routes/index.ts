import type { RouteRecordRaw } from 'vue-router';
import demoRoute from './demo';
import errorRoute from './error';
import entranceRoute from './entrance';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/entrance/home'
  },
  entranceRoute,
  demoRoute,
  ...errorRoute,
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login.vue'),
    meta: {
      title: '登录',
      unRequireLogin: true
    }
  },
  {
    path: '/:pathMatch(.*)', // 配置404
    // redirect: '/error/404' // 不推荐redirect，会url重定向，但我们往往希望在url保留着那个404的地址，只是界面展示not found界面
    component: () => import('@/views/error/404.vue')
  }
];

export default routes;
