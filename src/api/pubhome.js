import requests from "./request";
export const submitHomeInfo = data =>
  requests({
    url: "/izuke/houselist/applyHouse",
    method: "post",
    data
  });
