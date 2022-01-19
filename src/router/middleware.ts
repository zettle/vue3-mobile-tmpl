import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

/***********
 * 设置title
 ***********/
export function setDocTitle (title?: string): void {
  const tit = title ?? process.env.VUE_APP_PRONAME;
  document.title = tit;
}

/***********
 * 登录页面的要求登录状态才可以访问
 ***********/
export function requireLogin (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
  console.log(to, from, next);
}
