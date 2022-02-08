import { createRouter, createWebHistory } from 'vue-router';
// import routes from './routes';
import { nprogress, setDocTitle } from '@/utils';
import { IMeta } from './types';
import { cancelContainer } from '@/service';
import routes from '~pages';

console.log('routes', routes);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...routes,
    {
      path: '/:pathMatch(.*)', // 配置404
      // redirect: '/error/404' // 不推荐redirect，会url重定向，但我们往往希望在url保留着那个404的地址，只是界面展示not found界面
      component: () => import('@/views/error/NotFound.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // 滚动行为
    return { top: savedPosition?.top ?? 0 };
  },
});

// 拦截1：一些简单的
router.beforeEach((to) => {
  nprogress.start(); // 设置进度条
  setDocTitle((to.meta as IMeta).title); // 设置标题
  cancelContainer.clear();
});
// 拦截2：需要登录访问的页面，校验下登录
// router.beforeEach((to) => {
//   const { requireLogin } = to.meta as IMeta;
//   const userInfoStore = useUserInfoStore();
//   if (requireLogin && !userInfoStore.token) {
//     return { name: 'Login' }; // 这是一种replace
//   }
// });
// 拦截3：需要权限访问的页面，校验下是否与对应权限
// router.beforeEach((to) => {
//   const { roles: userRoles } = useUserInfoStore();
//   const { roles: routeRoles } = to.meta as IMeta;
//   if (routeRoles) {
//     const isPower = userRoles.some(userRole => routeRoles.includes(userRole));
//     if (!isPower) {
//       return { name: 'Error403' };
//     }
//   }
// });

router.afterEach(() => {
  nprogress.done();
});

export default router;
