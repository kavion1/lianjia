import requests from "./request";
export const exhibition = () =>
  requests({
    url: "/izuke/houselist/getHouseInfo",
    method: "get"
  });
export const gethomeinfo = data =>
  requests({
    url: "/izuke/houselist/pageHouseConditionString",
    method: "post",
    data
  });

export const getuserhomeinfo = (current, size) =>
  requests({
    url: `/izuke/houselist/getUserHouseInfo/${current}/${size}`,
    method: "get"
  });

// 根据id获取房源
export const gethouseinfo = id =>
  requests({
    url: `/backizuke/houselist/getAllHouseInfo/${id}`,
    method: "get"
  });

// 关注房源
export const attentionhouse = houseid =>
  requests({
    method: "post",
    url: `/izuke/userattention/addHouse/${houseid}`
  });
// 取消关注
export const unattentionhouse = houseid =>
  requests({
    method: "delete",
    url: `/izuke/userattention/delHouse/${houseid}`
  });

//随机四条房源信息

export const randomhouseinfo = () => {
  return requests({
    method: "get",
    url: "/izuke/houselist/select4Data"
  });
};
