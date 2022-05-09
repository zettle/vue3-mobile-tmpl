import type { IResponse } from './types';
/**
 * http异常类 假如code=0是成功，code!=0的是异常
 * 接口返回code!=0的处理，封装个类，万一页面需要对code!=0的情况处理的时候，这里就有用了
 * 页面都是通过 await 去调用ajax，所以code!=0的时候，就会进入reject，页面要拿到接口返回就需要用try..catch..
 * 那么就在catch里面判断下err类型是否为RespFail
 */
export default class RespFailClass<T> {
  public resp: IResponse<T>;
  constructor(resp: IResponse<T>) {
    this.resp = resp;
  }
}
