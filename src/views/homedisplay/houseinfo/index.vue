<template>
  <div>
    <div></div>
    <div class="content_houseinfo">
      <div class="content_houseinfo_title">
        {{ houseinfo.rendMethod }}{{ houseinfo.community }}
        {{ houseinfo.housePattern }} {{ houseinfo.houserDirection }}
      </div>
      <div class="content_houseinfo_subtitle clearfix">
        <p class="time ">房源维护时间:{{ houseinfo.gmtModified }}</p>
        <span class="phone clearfix">i租客投诉电话:8808808880</span>
      </div>

      <div class="content_cor ">
        <!-- swiper部分 -->
        <div class="content_cor_swiper">
          <div class="swiper-container width">
            <div class="swiper-wrapper">
              <div
                class="swiper-slide"
                v-for="(img, index) in houseinfo.images"
                :key="index"
              >
                <img :src="img" style="width: 100%;height:100%;" />
              </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>

            <!-- 如果需要导航按钮 -->
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
          </div>
        </div>
        <div class="content_right ">
          <div class="content_right_title">
            <span
              style="font-size: 30px;font-weight: 700;margin-right: 4px;line-height: 42px;"
              >{{ houseinfo.money }}</span
            >
            元/月(季付价)
            <div class="operate_box"><span class="weixinlogo"></span>微信</div>
            <div
              class="operate_box"
              v-show="!houseinfo.attention"
              @click="attention"
            >
              <span class="guanzhulogo"></span>关注
            </div>
            <div
              class="operate_box"
              v-show="houseinfo.attention"
              @click="attention"
            >
              <span class="guanzhulogo2"></span>关注
            </div>

            <p class="content_tags">
              <img src="@/assets/good-tag-detail.png" alt="" />
              <i>官方核验</i>
              <i>近{{ houseinfo.traffic }}</i>
              <i>精装</i>
              <i>随时看房</i>
            </p>
            <ul>
              <li>
                租赁方式:<span>{{ houseinfo.rendMethod }}</span>
              </li>
              <li>
                房屋类型:<span
                  >{{ houseinfo.housePattern }} {{ houseinfo.houseArea }}㎡
                  精装修</span
                >
              </li>
              <li>
                朝向楼层:<span
                  >{{ houseinfo.houserDirection }} {{ floo }}/{{
                    houseinfo.hnumber[0]
                  }}层</span
                >
              </li>
              <li>
                电 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;梯:<span>{{
                  houseinfo.elevator
                }}</span>
              </li>
            </ul>
            <div class="content_reserved">
              <el-button
                style="background:rgb(255, 150, 30);"
                class="content_btn "
                icon="el-icon-alarm-clock"
              >
                预约看房
              </el-button>
              <el-button
                style="background:#7de76c;margin-right: 0;"
                class="content_btn"
                icon="el-icon-phone-outline"
              >
                电话咨询
              </el-button>
            </div>
          </div>
        </div>
      </div>
      <contentDetail :houseinfo="houseinfo" :floo="floo"></contentDetail>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
//引用swiper样式
import "swiper/css/swiper.css";
import contentDetail from "./contentDetail";

export default {
  data() {
    return {
      houseid: this.$attrs.houseinfos.houseid
        ? this.$attrs.houseinfos.houseid
        : "",
      houseinfo: this.$attrs.houseinfos ? this.$attrs.houseinfos : {},
      guanzhu: true
    };
  },

  created() {
    //组件挂载完毕后初始化Swiper
    if (this.$route.query.id) {
      this.houseinfo = this.$route.query.id;
      this.houseid = this.$route.query.id.houseid;
    }

    this.gethouseinfo();
    this.$scrollTo();
  },
  mounted() {
    this.getSwiper();
  },
  methods: {
    getSwiper() {
      let mySwiper = new Swiper(".swiper-container", {
        //direction: 'vertical', 垂直切换选项
        loop: true, // 开启循环模式选项

        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination",
          clickable: true //点分页时可以切换
        },

        // 如果需要前进后退按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      });
    },
    attention() {
      if (this.$cookie.get("token") || sessionStorage.getItem("token")) {
        this.houseinfo.attention = !this.houseinfo.attention;
        if (this.houseinfo.attention == false) {
          this.$API.exhibitionhome.unattentionhouse(this.houseid).then(res => {
            if (res.data.code == 200) {
              this.$message.success("取消成功");
            }
          });
        } else {
          this.$API.exhibitionhome.attentionhouse(this.houseid).then(res => {
            if (res.data.code == 200) {
              if (this.houseinfo.attention) {
                this.$message.success("关注成功");
              }
            }
          });
        }
      } else {
        const doms = document.getElementsByClassName(
          "el-message el-message--warning"
        )[0];

        if (doms == undefined) {
          this.$message.warning("请先登录");
        }
      }
    },
    gethouseinfo() {
      this.$API.exhibitionhome.gethouseinfo(this.houseid).then(res => {
        console.log(res);

        this.houseinfo = res.data.data.houseInfo;
      });
    }
  },
  components: { contentDetail },
  computed: {
    floo() {
      return parseInt(this.houseinfo.hnumber[0]) < 5 ? "低楼层" : "高楼层";
    }
  }
};
</script>

<style scoped>
.content_houseinfo {
  width: 75.7%;
  min-height: 1000px;
  margin: 0 auto;
  min-height: 500px;
}
.content_houseinfo_title {
  display: flex;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 5px;
  font-size: 28px;
  font-weight: 700;
  line-height: 40px;
}
.content_houseinfo_subtitle {
  margin: 0 0 30px 0;
  font-size: 14px;
  line-height: 20px;
}
.content_houseinfo_subtitle .phone {
  float: right;
  color: #fa5741;
}
.content_houseinfo_subtitle .time {
  float: left;
}
.content_cor {
  /* width: 100%; */
  height: 390px;
}
.content_cor_swiper {
  height: 100%;
  width: 48.3%;
  display: inline-block;
  margin: 0 25px 0 0;
}
.swiper-container {
  margin-left: 0;
  width: 100%;
  height: 100%;
}
.swiper-container .width {
  height: 100%;
}
.content_right {
  float: right;
  width: 43.7%;
  /* border: 1px solid #e4e6f0; */
  height: 96.9%;
  padding: 10px 14px 0 30px;
  /* background: blue; */
}
.content_right_title {
  width: 100%;
  font-size: 16px;
  margin-bottom: 10px;
  color: #fa5741;
}
.operate_box {
  float: right;
  margin-right: 0;
  font-size: 13px;
  color: #101d37;
  cursor: pointer;
  line-height: 30px;
  margin-top: 10px;
  margin-left: 20px;
}
.weixinlogo {
  background: url("~@/assets/wechat.png") no-repeat;
  background-size: 100% 100%;
  width: 14px;
  height: 13px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 3px;
}
.guanzhulogo {
  background: url("~@/assets/guanzhu.png") no-repeat;
  background-size: 100% 100%;
  width: 14px;
  height: 13px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 3px;
  cursor: pointer;
}
.guanzhulogo2 {
  background: url("~@/assets/guanzhu2.png") no-repeat;
  background-size: 100% 100%;
  width: 16px;
  height: 15px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 3px;
  cursor: pointer;
}
.content_tags {
  border-bottom: 1px solid #e4e6f0;
  padding-bottom: 10px;
  font-size: 0;
}
.content_tags img {
  height: 23px;
  width: 63px;
  vertical-align: top;
}
.content_tags i {
  background-color: rgba(132, 154, 174, 0.1);
  border-radius: 2px;
  display: inline-block;
  width: 62px;
  height: 23px;
  line-height: 23px;
  text-align: center;
  font-size: 12px;
  color: #849aae;
  margin-right: 5px;
  margin-bottom: 5px;
}
.content_right_title ul {
  border-bottom: 1px solid #e4e6f0;
  padding-top: 15px;
  padding-bottom: 5px;

  max-height: 170px;
  overflow: visible;
  overflow: initial;
  width: 100%;
}
.content_right_title ul li {
  position: relative;
  overflow: visible;
  overflow: initial;
  font-size: 18px;
  line-height: 20px;
  margin-bottom: 10px;
  color: #9399a5;
  /* border-bottom: 1px solid #e4e6f0; */
}
.content_right_title ul li span {
  position: relative;
  overflow: visible;
  overflow: initial;
  font-size: 14px;
  line-height: 14px;
  margin-bottom: 10px;
  color: #101d37;
  margin-left: 20px;
}
.content_reserved {
  width: 100%;
  border-radius: 2px;
  font-size: 0;
  padding: 20px 10px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  margin-left: -13px;
  border: 1px solid #e4e6f0;
  margin-top: 20px;
}
.content_btn {
  width: 50%;
  margin-right: 20px;
  border-radius: 2px;
  color: #fff;

  font-size: 17px;
  height: 60px;
  /* line-height: 46px; */
  margin-top: 0;
  text-align: center;
  width: 80%;
}
</style>
