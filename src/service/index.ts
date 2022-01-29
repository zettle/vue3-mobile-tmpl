import request from './request';
import type { IResponse } from './request/types';
export { default as cancelContainer } from './request/cancelContainer';
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
export function fetchLogin(
  params: ILoginParams
): Promise<IResponse<ILoginResp>> {
  return request.post('login', params);
}

/******************
 * 获取轮播图
 *****************/
export interface IBannerResp {
  banners: string[];
}
export function fetchBanner(): Promise<IResponse<IBannerResp>> {
  return request.get('banner');
}

/******************
 * 获取新闻列表
 *****************/
export interface INewItemResp {
  title: string;
  desc: string;
  author: string;
  createTime: string;
}
type INewListResp = INewItemResp[];
export function fetchNewsList(): Promise<IResponse<INewListResp>> {
  return request.get('news/list');
}

/******************
 * 获取新闻详情
 *****************/
interface INewDetailResp {
  title: string;
  desc: string;
  author: string;
  createTime: string;
  content: string;
}

export function fetchNewsDetail(
  id: string
): Promise<IResponse<INewDetailResp>> {
  return request.post('news/detail', { id });
}
