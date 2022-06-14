import axios from "axios";

import Cookies from "js-cookie";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
const requests = axios.create({
  baseURL: "/api",
  timeout: 20000
});
//请求拦截器
requests.interceptors.request.use(
  config => {
    if (Cookies.get("checked")) {
      if (Cookies.get("token")) {
        config.headers.token = Cookies.get("token");
      }
    }
    if (sessionStorage.getItem("checked") == "false") {
      if (sessionStorage.getItem("token")) {
        config.headers.token = sessionStorage.getItem("token");
      }
    }
    NProgress.start();
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
//响应拦截器
requests.interceptors.response.use(
  response => {
    NProgress.done();
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);
export default requests;
