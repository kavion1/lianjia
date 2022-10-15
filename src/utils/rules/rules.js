const validateaccount = (rule, value, callback) => {
  console.log(rule);
  const reg = /^\w{1,18}@[a-z0-9]+(\.[a-z]{2,4})+$/i;

  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("邮箱格式格式错误！"));
  }
};
const validatepassword = (rule, value, callback) => {
  // 密码至少包含 数字和英文，长度6-20
  const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{10,20}$/;
  if (value.length > 6) {
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error("密码应包含数字和英文"));
    }
  } else {
    callback(new Error("密码至少为10位"));
  }
};
const validatecode = (rule, value, callback) => {
  const reg = /^\d{6}$/;
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("验证码错误！"));
  }
};
// 必填规则
/**
 *
 * @param {*提示语} message
 * @param {*触发时机默认失焦触发} trigger
 * @returns 返回规则
 *
 */
const mandatory = (message, trigger = "blur") => {
  return { required: true, message, trigger };
};
/**
 *
 * @param {自定义规则} validator
 * @param {*触发时机默认失焦触发} trigger
 * @returns
 */
const CustomRules = (validator, trigger = "blur") => {
  return { validator, trigger };
};

export {
  validateaccount,
  validatepassword,
  validatecode,
  mandatory,
  CustomRules
};
