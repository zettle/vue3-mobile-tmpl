import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import { IResponse } from './types';

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
      return Promise.resolve<IResponse>(data);
    } else {
      return Promise.reject<IResponse>(data);
    }
    return response.data;
  }

  // 公共的请求拦截，网络异常 404之类
  responseInterceptorCatch (error: any): Promise<any> {
    const { response, code, message } = error || {};
    console.log('error', response, code, message);
    // return Promise.reject(error);
    return new Promise(() => { /* empty */ }); // 这样外面就不会进入resolve或reject
  }

  request<T> (config: AxiosRequestConfig): Promise<IResponse<T>> {
    return this.instance.request(config);
  }

  post<T> (url: string, data?: any): Promise<IResponse<T>> {
    return this.request<T>({
      url,
      data,
      method: 'POST'
    });
  }

  get<T> (url: string, data?: any): Promise<IResponse<T>> {
    return this.request<T>({
      url,
      data,
      method: 'GET'
    });
  }
}

export default Request;
