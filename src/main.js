// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";

import API from "@/api/index";
import Cookie from "js-cookie";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import loginDialog from "@/components/loginDialog/index.vue";
import BaiduMap from "vue-baidu-map";
Vue.use(BaiduMap, {
  ak: "8HmSXSEyerh9H26ua1KwgZwcjhC11ufb"
});
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.component("loginDialog", loginDialog);
/* eslint-disable no-new */
new Vue({
  el: "#app",
  beforeCreate() {
    Vue.prototype.$API = API;
    Vue.prototype.$cookie = Cookie;
    Vue.prototype.$bus = this;
    Vue.prototype.$scrollTo = (x = 0, y = 0, type = "smooth") => {
      window.scrollTo({
        top: x,
        left: y,
        behavior: type // 滚动行为：smooth平滑滚动，instant瞬间滚动，默认值auto，等同于instant
      });
    };
  },
  router,

  components: { App },
  template: "<App/>"
});

// Vue.component(loginDialog.name, loginDialog);
