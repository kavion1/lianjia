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
  const reg = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]/;
  if (value.length > 6) {
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error("密码应包含数字,大写，小写或特殊字符中的任意三项。"));
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

const validatePassWordRepeat = (rule, value, callback, password1) => {
  if (password1 === value) {
    callback();
  } else {
    callback(new Error("两次密码不一致,请检查。"));
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

const Pubrules = rule => {
  let objrules = {};

  for (let i in rule) {
    objrules[rule[i]] = [mandatory("此项必填", "change")];
  }

  console.log(objrules);
  return objrules;
};
export {
  validateaccount,
  validatepassword,
  validatecode,
  mandatory,
  CustomRules,
  Pubrules,
  validatePassWordRepeat
};
