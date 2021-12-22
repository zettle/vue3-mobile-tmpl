import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import RespFail from './respFail';
import type { IResponse } from './types';
import { Toast } from 'vant';

class Request {
  instance: AxiosInstance;
  constructor (config: AxiosRequestConfig = {}) {
    this.instance = axios.create(config);

    this.instance.interceptors.request.use(this.requestInterceptor);
    this.instance.interceptors.response.use(
      this.responseInterceptor,
      this.responseInterceptorCatch
    );
  }

  // 公共的请求前拦截
  requestInterceptor (config: AxiosRequestConfig): AxiosRequestConfig {
    return config;
  }

  // 公共的请求后拦截
  responseInterceptor (response: AxiosResponse<IResponse>): any {
    const { data } = response;
    if (data.code === 0) {
      return data;
    } else {
      Toast.fail(data.message ?? '接口异常');
      return Promise.reject(new RespFail(data)); // 加个类型，外层通过这个去判断
    }
  }

  // 公共的请求拦截，网络异常 404之类
  responseInterceptorCatch (error: any): Promise<any> {
    const { response, code, message } = error || {};
    console.log('error', response, code, message);
    return Promise.reject(error);
    // return new Promise(() => { /* empty */ }); // 这样外面就不会进入resolve或reject，但感觉这样不太好
  }

  request<T> (config: AxiosRequestConfig): Promise<IResponse<T>> {
    return this.instance.request(config);
  }

  // Content-Type: application/json的请求
  post<T> (url: string, data?: any, config?: AxiosRequestConfig): Promise<IResponse<T>> {
    return this.request<T>({ ...config, url, data, method: 'POST' });
  }

  // Content-Type: application/x-www-form-urlencoded的请求
  postForm<T> (url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<IResponse<T>> {
    config = Object.assign({}, config, {
      url,
      data,
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' }
    });
    return this.request<T>(config);
  }

  get<T> (url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<IResponse<T>> {
    config = Object.assign({}, config, {
      url,
      data,
      method: 'GET'
    });
    return this.request<T>(config);
  }
}

export default Request;
