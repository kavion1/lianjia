import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/login.vue";
import Home from "@/views/home";
import PubHome from "@/views/PubHome/index.vue";
import UserHome from "@/views/userhome";
import EditUserinfo from "@/views/userhome/right/EditUserinfo";
import ConerHouse from "@/views/userhome/right/ConerHouse";
import ConcernPlot from "@/views/userhome/right/ConcernPlot";
import HouseRecord from "@/views/userhome/right/HouseRecord";
import MyEntrust from "@/views/userhome/right/MyEntrust";
import MySearch from "@/views/userhome/right/MySearch";
import HomeDisplay from "@/views/homedisplay";
import cookie from "js-cookie";
import map from "@/components/BaiduMap/map.vue";
import { Message } from "element-ui";

import "element-ui/lib/theme-chalk/index.css";

Vue.use(Router);

export default new Router({
  // linkActiveClass: "active",

  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    // {
    //   path: "/login",
    //   name: "login",
    //   component: Login
    // },
    {
      path: "/home",
      name: "home",
      component: Home
      // meta: { home: false }
    },
    {
      path: "/pubhome",
      name: "pubhome",
      component: PubHome,
      beforeEnter: (to, from, next) => {
        if (sessionStorage.getItem("token") || cookie.get("token")) {
          next();
        } else {
          let doms = document.getElementsByClassName(
            "el-message el-message--warning"
          )[0];

          if (doms == undefined) {
            Message.warning({ duration: 1000, message: "请先登录" });
          }
        }
      }
    },
    {
      path: "/userhome",
      name: "userhome",
      component: UserHome,
      redirect: "/userhome/edituserinfo",
      beforeEnter: (to, from, next) => {
        if (sessionStorage.getItem("token") || cookie.get("token")) {
          next();
        } else {
          let doms = document.getElementsByClassName(
            "el-message el-message--warning"
          )[0];

          if (doms == undefined) {
            Message.warning({ duration: 1000, message: "请先登录" });
          }
        }
      },
      children: [
        {
          path: "edituserinfo",
          name: "edituserinfo",
          component: EditUserinfo
        },
        {
          path: "conerhouse",
          name: "conerhouse",
          component: ConerHouse
        },
        {
          path: "concernplot",
          name: "concernplot",
          component: ConcernPlot
        },
        { path: "houserecord", name: "houserecord", component: HouseRecord },
        { path: "myentrust", name: "myentrust", component: MyEntrust },
        { path: "mysearch", name: "mysearch", component: MySearch }
      ]
    },
    {
      path: "/homedisplay",
      name: "homedisplay",
      component: HomeDisplay
    },
    {
      path: "/mapsearch",
      name: "mapSearch",
      component: map
    }
  ]
});
// router.beforeEach((to, from, next) => {});
