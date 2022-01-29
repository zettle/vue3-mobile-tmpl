const regConst = {
  idcard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, // 身份证号码
  phone: /^[1][3,4,5,7,8,9][0-9]{9}$/, // 手机号
};

// 校验，柯里化
function isPassReg(regName: keyof typeof regConst) {
  return function (value: string) {
    return regConst[regName].test(value);
  };
}

export const isPassIdCardReg = isPassReg('idcard'); // 校验身份证
export const isPassPhoneReg = isPassReg('phone'); // 校验手机号
