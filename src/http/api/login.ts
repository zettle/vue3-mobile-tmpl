import { channelRequest, IResponse } from '../request';

// 登录接口参数
export interface ILoginParams {
  readonly username: string;
  readonly password: string;
}

// 登录接口响应
export interface ILoginResp {
  username: string;
  age: number;
}

// 登录接口
export function fetchLogin (params: ILoginParams): Promise<IResponse<ILoginResp>> {
  return channelRequest.post<ILoginResp>('login', params);
}
