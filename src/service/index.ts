import request from './request';
import type { IResponse } from './request/types';

/******************
 * 登录
 *****************/
export interface ILoginParams {
  username: string;
  password: string;
}
export interface ILoginResp {
  username: string;
  token: string;
  uid: string;
  roles: string[]; // 权限，这里应该改为枚举更加合适
}
export function fetchLogin (params: ILoginParams): Promise<IResponse<ILoginResp>> {
  return request.post('login', params);
}

/******************
 * 获取轮播图
 *****************/
export interface IBannerResp {
  banners: string[];
}
export function fetchBanner (): Promise<IResponse<IBannerResp>> {
  return request.get('banner');
}
