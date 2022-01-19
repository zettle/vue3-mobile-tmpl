import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { IMeta } from './types';
import useUserInfoStore from '@/stores/userInfo';
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
export function validLogin (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): boolean {
  console.log('要去的页面', to.name);
  const { requireLogin } = to.meta as IMeta;
  const userInfoStore = useUserInfoStore();
  console.log('是否已经登录', requireLogin && !userInfoStore.token);
  if (requireLogin && !userInfoStore.token) { // 是需要登录才能访问的页面，但是没有登录token
    console.log('去登录页面');
    next({ name: 'Login' });
    return false;
  }

  return true;
}
