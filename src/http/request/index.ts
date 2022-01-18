import Http from './http';
export * from './types';
export { default as respFail } from './respFail';

// 渠道的api
export const channelRequest = new Http({
  baseURL: '/channel_api/'
});

// 模拟一个根本不存在的接口
export const unExitRequest = new Http({
  baseURL: 'https://localhost:9090/channel_api/'
});
