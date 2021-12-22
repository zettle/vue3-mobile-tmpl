import { IResponse } from './types';
/**
 * http异常类 - 针对接口返回不规范的来
 */
export default class RespFail<T> {
  public resp: IResponse<T>;
  constructor (resp: IResponse<T>) {
    this.resp = resp;
  }
}
