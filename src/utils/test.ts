interface ISuccessType {
  name: string;
  age: number;
}

interface IFailType {
  code: number;
  msg: string;
}

const successInfo = {
  name: 'xiaoming',
  age: 23
};
const failInfo: IFailType = {
  code: 1000,
  msg: '错误信息'
};

function ajax<T> (isOk: boolean, successInfo: T, failInfo: any): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isOk) {
        resolve(successInfo);
      } else {
        reject(failInfo);
      }
    }, 1000);
  });
}

async function login () {
  try {
    const resp = await ajax<ISuccessType>(false, successInfo, failInfo);
    console.log(resp);
  } catch (err) {
    console.log('err', (err as ISuccessType).age);
  }
}
login();
