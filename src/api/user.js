import requests from "./request";
export const login = ({ account, password }) =>
  requests({
    url: `/izuke/user/login/${account}/${password}`,
    method: "post"
  });
export const login_token = () =>
  requests({
    url: "/izuke/user/getUserInfo",
    method: "post"
  });
export const getcode = account =>
  requests({
    url: `/izuke/sendCode/${account}`,
    method: "get"
  });
export const email_login = ({ account, code }) =>
  requests({
    url: `/izuke/user/loginByCode/${account}/${code}`,
    method: "POST"
  });
export const register = data =>
  requests({
    url: `/izuke/user/register`,
    method: "post",
    data
  });

// 修改用户信息
export const changeuserinfo = data =>
  requests({
    url: "/izuke/user/getUserInfo2",
    method: "post",
    data
  });
// 获取用户发布的房源
export const gethomeinfo = (current, size) =>
  requests({
    url: `/izuke/houselist/getUserHouseInfo/${current}/${size}`,
    method: "get"
  });
// 用户下架房源
export const SoldOut = houseid =>
  requests({
    url: `/izuke/houselist/delHouse`,
    data: houseid,
    method: "post"
  });
// 获取用户关注的房源
export const userattention = (current, size) =>
  requests({
    url: `/izuke/userattention/getHouse/${current}/${size}`,
    method: "get"
  });

export const getResetCode = data => {
  return requests({
    url: "/izuke/resetSendCode",
    data,
    method: "post"
  });
};

export const resetPassword = data =>
  requests({
    url: "/izuke/user/resetPassword",
    data,
    method: "post"
  });
