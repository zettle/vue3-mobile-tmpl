import axios, { AxiosRequestConfig, Canceler } from 'axios';

/**
 * 存axios关闭函数的容器
 */
class CancelContainer {
  // 容器，不能用weakMap不支持遍历
  private cancelMap = new Map<string, Canceler>();

  getKeyName (config: AxiosRequestConfig) {
    return `${ config.url }_${ config.params.linkmonid }` ?? '';
  }

  add (config: AxiosRequestConfig) {
    return new axios.CancelToken((cancelFn) => {
      this.cancelMap.set(this.getKeyName(config), cancelFn);
    });
  }

  get (config: AxiosRequestConfig) {
    console.log(this.cancelMap.get(this.getKeyName(config)));
  }

  // 移除cancelFn，在接口成功/失败后移除
  remove (config: AxiosRequestConfig) {
    const keyName = this.getKeyName(config);
    this.cancelMap.has(keyName) && this.cancelMap.delete(keyName);
  }

  clear () {
    this.cancelMap.forEach(canceler => {
      canceler();
    });
  }
}
export default new CancelContainer();
