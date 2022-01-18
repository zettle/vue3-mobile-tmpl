declare namespace IAjax {
  // 登录接口入参
  export interface ILoginParams {
    readonly username: string;
    readonly password: string;
  }
  // 登录接口返回
  interface ILoginResp {
    username: string;
    token: string;
    uid: string;
  }

  // 获取登录人信息接口返回
  interface IGetUserInfoResp {
    username: string; // 登录账号
    realname: string; // 中文名
    province: string; // 省
  }
}
export = IAjax
