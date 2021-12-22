import Http from './http';
export * from './types';
export { default as respFail } from './respFail';

// 渠道的api
export const channelRequest = new Http({
  baseURL: 'https://www.fastmock.site/mock/f83b431b61387f5dd15d9f9c9498d311/channel_api/'
});

// 模拟一个根本不存在的接口
export const unExitRequest = new Http({
  baseURL: 'https://localhost:9090/channel_api/'
});
