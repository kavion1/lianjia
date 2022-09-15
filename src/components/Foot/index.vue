<template>
  <!--底部  Start-->

  <div class="footerBox">
    <div class="wrapBox">
      <div class="footerTit clearfix">
        <ul class="footertitList fl">
          <li><a href="" target="_blank">i租客</a></li>
          <li><a href="" target="_blank">关于i租客</a></li>
          <li><a href="" target="_blank">联系我们</a></li>
          <li><a href="" target="_blank">加入我们</a></li>
          <li><a href="" target="_blank">隐私声明</a></li>
          <li><a href="" target="_blank">网站地图</a></li>
          <li><a href="" target="_blank">友情链接</a></li>
          <li><a href="" target="_blank">经纪人登录</a></li>
        </ul>
        <div class="numper fr">官方客服 8888-88888</div>
      </div>

      <div class="linkbottom">
        <p>
          i租客科技有限公司 | 网络经营许可证 16057509号-2 | ©
          Copyright©2010-2017 i租客irendhome.com版权所有
        </p>
        <p class="bjgan">
          <a href=""
            ><img src="@/views/home/images/beian.png" />京公网安备
            11010802024019号</a
          >
        </p>
      </div>
    </div>
  </div>
  <!--底部  End-->
</template>

<script>
import cookie from "js-cookie";
export default {
  mounted() {
    if (
      location.href.split("#/")[1] === "pubhome" ||
      location.href.split("#/")[1] === "userhome/edituserinfo"
    ) {
      if (sessionStorage.getItem("token") || cookie.get("token")) {
        return;
      } else {
        console.log("this1", this);
        this.$router.push("/home");
      }
    }
  }
};
</script>

<style scoped></style>
