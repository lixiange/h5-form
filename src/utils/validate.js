//校验邮箱
export const valiEmail = (value) => {
  let re = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  if (re.test(value)) {
    return { error: false };
  } else {
    return { error: true, message: "邮箱格式不正确" };
  }
};
//校验手机号
export const valiPhone = (value) => {
  let newValue = value.replace(/\s/g, "");
  let phoneCodeVerification = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
  if (!phoneCodeVerification.test(newValue)) {
    return { error: true, message: "手机号格式不正确" };
  } else {
    return { error: false };
  }
};
//校验是否为空
export const valiEmpty = (value) => {
  if (!value) {
    return { error: true, message: "请输入内容" };
  } else {
    return { error: false };
  }
};
//返回需要校验的数组
export const validateToRules = (validate) => {
  let arr = [];
  validate.map((v) => {
    if (v === "empty") {
      arr.unshift(valiEmpty);
    } else if (v === "email") {
      arr.push(valiEmail);
    } else if (v === "phone") {
      arr.push(valiPhone);
    }
  });
  return arr;
};

//placeholder是否上移，是否需要校验

//提交时校验
export const submitValidate = (data, args, errState) => {
  data.forEach((v) => {
    if (v.validate) {
      args.forEach((v1) => {
        if (v1.key === v.key) {
          let result = [];
          v1.needValidate.forEach((v2) => {
            result.push(v2(v.value));
          });
          let allright = false;
          result.forEach((v3) => {
            if (v3.error) {
              allright = true;
              errState[v.key] = { state: true, text: v3.type };
            }
          });
          if (!allright) {
            errState[v.key] = { state: false };
          }
        }
      });
    }
  });
  return errState;
};
