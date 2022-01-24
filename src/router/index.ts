import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import { nprogress, setDocTitle } from '@/utils';
import { IMeta } from './types';
import useUserInfoStore from '@/stores/userInfo';
import { cancelContainer } from '@/service';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior (to, from, savedPosition) { // 滚动行为
    return { top: savedPosition?.top ?? 0 };
  }
});

// 拦截1：一些简单的
router.beforeEach((to) => {
  nprogress.start(); // 设置进度条
  setDocTitle((to.meta as IMeta).title); // 设置标题
  cancelContainer.clear();
});
// 拦截2：需要登录访问的页面，校验下登录
router.beforeEach((to) => {
  const { requireLogin } = to.meta as IMeta;
  const userInfoStore = useUserInfoStore();
  if (requireLogin && !userInfoStore.token) {
    return { name: 'Login' }; // 这是一种replace
  }
});
// 拦截3：需要权限访问的页面，校验下是否与对应权限
router.beforeEach((to) => {
  const { roles: userRoles } = useUserInfoStore();
  const { roles: routeRoles } = to.meta as IMeta;
  if (routeRoles) {
    const isPower = userRoles.some(userRole => routeRoles.includes(userRole));
    if (!isPower) {
      return { name: 'Error403' };
    }
  }
});

router.afterEach(() => {
  nprogress.done();
});

export default router;
