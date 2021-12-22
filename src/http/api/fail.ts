import { channelRequest, unExitRequest, IResponse } from '../request';

export interface IFailType {
  type: number;
}

// 非0接口
export function fetchFail (): Promise<IResponse<IFailType>> {
  return channelRequest.post<IFailType>('fail');
}

export function fetchUnfind (): Promise<IResponse<string>> {
  return unExitRequest.post<string>('fail');
}
