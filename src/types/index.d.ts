declare namespace IAjax {
  // 登录接口入参
  export interface ILoginParams {
    readonly username: string;
    readonly password: string;
  }
  // 登录接口返回
  interface ILoginResp {
    username: string;
    age: number;
  }
}
export = IAjax
