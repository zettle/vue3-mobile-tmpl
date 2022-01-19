import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import { nprogress } from '@/utils';
import { IMeta } from './types';
import { setDocTitle, requireLogin } from './middleware';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior (to, from, savedPosition) { // 滚动行为
    return { top: savedPosition?.top ?? 0 };
  }
});

// 做路由拦截，比如判断是否登录之类
router.beforeEach((to, from, next) => {
  nprogress.start(); // 设置进度条
  setDocTitle((to.meta as IMeta).title); // 设置标题
  requireLogin(to, from, next); // 判断需要登录的页面是否需要登录

  next();
});

router.afterEach(() => {
  nprogress.done();
});

export default router;
