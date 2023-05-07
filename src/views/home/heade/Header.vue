<template>
  <!--头部开始 Start-->
  <div class="headerBox">
    <div class="wrapBox">
      <div class="headerWrap">
        <div class="navBox clearfix">
          <div class="navLogo fl">
            <a class="logo" href=""></a>
          </div>
          <div class="navList fr">
            <Login ref="login"></Login>

            <ul class="nav_wrap clearfix">
              <router-link to="/homedisplay">
                <li><a href="">房源</a></li></router-link
              >
              <li>
                <router-link to="/pubhome">发布房源</router-link>
              </li>
              <router-link :to="{ name: 'userhome' }">
                <li><a href="">业主</a></li></router-link
              >
            </ul>
          </div>
        </div>
        <div class="searchBox">
          <div class="mainLogo"></div>
          <div class="message">
            <div class="swiper-container mess_scroll">
              <div class="swiper-wrapper scroll-wrapper">
                <div class="swiper-slide">
                  找商业地 找租房 找学区 找小区 就上<b style="font-weight:bold"
                    >i</b
                  >租客
                </div>
              </div>
            </div>
          </div>
          <!--搜索 start-->
          <search></search>
          <!--搜索end-->
        </div>
      </div>
    </div>
  </div>
  <!--头部开始 End-->
</template>

<script>
import Login from "./login";
import search from "./search";
export default {
  name: "Header",

  components: {
    Login,
    search
  },

  computed: {}
};
</script>

<style lang="css" scoped>
/*首页头部 Start*/
.headerBox {
  width: 100%;
  height: 640px;
  background: url(~@/assets/2.jpg) no-repeat;
  background-size: 100%, 100%;
  padding-top: 30px;
  overflow: hidden;

  background-attachment: fixed;
}

.headerWrap {
  width: 100%;
  height: 100%;
  position: relative;
}
.logo {
  display: inline-block;
  width: 200px;
  height: 100px;
  margin-right: 10px;
  background: url(~@/assets/logo2.png) no-repeat;
  background-size: 100%, 100%;
}
/*  */
.navList {
  position: relative;
}

.nav_wrap {
  padding-top: 26px;
}
.nav_wrap li {
  float: left;
  position: relative;
}
.nav_wrap li a {
  font-size: 16px;
  color: rgb(255, 255, 255);
  margin-left: 20px;
  font-weight: bold;
  font-family: "Hiragino Sans GB", "Microsoft Yahei UI", "Microsoft Yahei",
    "微软雅黑", "Segoe UI", Tahoma, "宋体b8b\4f53", SimSun, sans-serif;
}
.nav_wrap li a:hover {
  font-size: 16px;
  color: rgb(197, 189, 189);
}
.nav_wrap .li_lvju {
  margin-left: 20px;
}
.nav_wrap li .lvju {
  position: absolute;
  top: -4px;
  width: 19px;
  height: 22px;
}
.mainLogo {
  width: 540px;
  height: 80px;
  margin: 120px auto 0px;
  background: url(../images/bigLogo1.png);
  background-size: 100%, 100%;
}
.message {
  text-align: center;
  margin: 10px auto 20px;
}
.message .mess_scroll {
  font-size: 20px;
  height: 35px;
  line-height: 35px;
  color: #eeeeeef5;

  font-family: "楷体";
}
.mess_scroll {
  overflow: hidden;
}
.ilogo {
  font-family: "Blackadder ITC";
}
/*首页头部 End*/
</style>
