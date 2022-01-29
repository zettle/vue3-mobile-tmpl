import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import RespFailClass from './RespFailClass';
import type { IResponse } from './types';
import { Toast } from 'vant';
import useUserInfo from '@/stores/userInfo';
import generUrlKey from './generUrlKey';
import cancelContainer from './cancelContainer';
class Request {
  instance: AxiosInstance;
  constructor(config: AxiosRequestConfig = {}) {
    this.instance = axios.create(config);

    // 请求前的拦截器，要注意靠后的拦截器是先执行
    this.instance.interceptors.request.use(this.reqIntpToken);
    this.instance.interceptors.request.use(this.reqIntpUrlKey);
    // 请求后的拦截器，要注意靠前的拦截器是先执行
    this.instance.interceptors.response.use(this.respIntp, this.respIntpCatch);
  }

  // 公共的请求前拦截1-往header.token赋值
  reqIntpToken(config: AxiosRequestConfig): AxiosRequestConfig {
    const userInfoStore = useUserInfo();
    if (config.headers && userInfoStore.token) {
      config.headers.token = userInfoStore.token;
    }
    return config;
  }

  /**
   * 公共的请求前拦截2
   * 1. 给url query加唯一值 linkmonid 作为全链路监控的id
   * 2. 用上面的linkmonid作为key，生成取消axios的数组
   */
  reqIntpUrlKey(config: AxiosRequestConfig): AxiosRequestConfig {
    if (!config.params) {
      config.params = {};
    }
    config.params.linkmonid = generUrlKey();
    config.cancelToken = cancelContainer.add(config);
    return config;
  }

  // 请求后的拦截器1 成功：删除关闭函数
  // resIntpCancel (response: AxiosResponse<IResponse>) {
  //   cancelContainer.remove(response.config); // 移除取消函数
  //   return response;
  // }

  // 请求后的拦截器1 异常：删除关闭函数
  // resIntpCatchCancel (error: any): any {
  //   console.log('axios.isCancel(error)', error);
  //   if (axios.isCancel(error)) {
  //     console.log('用户取消了');
  //     return Promise.reject(new Error('取消了请求'));
  //   } else {
  //     cancelContainer.remove(error.config);
  //     return Promise.reject(error); // 这一定要返回reject，不然会进入下一个拦截器的resolve
  //   }
  // }

  // 公共的请求后拦截
  respIntp(response: AxiosResponse<IResponse>): any {
    const { data } = response;
    if (data.code === 0) {
      return data;
    } else {
      Toast.fail(data.msg ?? '接口异常');
      return Promise.reject(new RespFailClass(data)); // 加个类型，外层通过这个去判断
    }
  }

  /**
   * 公共的请求拦截，网络异常 404之类
   * 1. 判断是不是取消的，不是的话将 cacelContainer容器 里面的取消掉
   * 2.
   */
  respIntpCatch(error: any): Promise<any> {
    const status = error.response?.status ?? '';
    const response = error.response || {};

    if (!axios.isCancel(error)) {
      cancelContainer.remove(error.response?.config);
    }
    status && Toast.fail(`http状态: ${response.status}`);
    return Promise.reject(error);
    // return new Promise(() => { /* empty */ }); // 这样外面就不会进入resolve或reject，但感觉这样不太好
  }

  request<T>(config: AxiosRequestConfig): Promise<IResponse<T>> {
    return this.instance.request(config);
  }

  // Content-Type: application/json的请求
  post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<IResponse<T>> {
    return this.request<T>({ ...config, url, data, method: 'POST' });
  }

  // Content-Type: application/x-www-form-urlencoded的请求
  postForm<T>(
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {}
  ): Promise<IResponse<T>> {
    config = Object.assign({}, config, {
      url,
      data,
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
    });
    return this.request<T>(config);
  }

  get<T>(
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {}
  ): Promise<IResponse<T>> {
    config = Object.assign({}, config, {
      url,
      data,
      method: 'GET',
    });
    return this.request<T>(config);
  }
}

export default new Request({ baseURL: '/channel_api' });
