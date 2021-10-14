import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

class Http {
  private readonly instance = axios.create();

  constructor (baseURL = '/channel_api/') {
    this.instance.defaults.baseURL = baseURL;
    this.requestInterce();
    this.responseInterce();
  }

  /**
   * 请求前的拦截器
   */
  private requestInterce (): void {
    this.instance.interceptors.request.use((config: AxiosRequestConfig) => {
      return config;
    });
  }

  /**
   * 请求后的拦截器
   */
  private responseInterce () {
    this.instance.interceptors.response.use((response: AxiosResponse) => {
      return response.data;
    });
  }
}

export default new Http();
