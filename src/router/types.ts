import { RouteMeta } from 'vue-router';

export interface IMeta extends RouteMeta {
  title?: string; // 标题
  requireLogin?: boolean; // true表示不需要登录也可以方位，为空就表示需要登录
  roles?: string[]; // 权限控制
}
