interface ISuccessType {
  name: string;
  age: number;
}

interface IFailType {
  msg: string;
}

const successInfo = {
  name: 'xiaoming',
  age: 23
};
const failInfo: IFailType = {
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
  const resp = await ajax<ISuccessType>(true, successInfo, failInfo);
  console.log(resp);
}
login();
