<template>
  <div>
    <div class="content_detail">
      <div
        style="height: 1px;
    margin: 0;
    padding: 0;
    background: transparent;"
      ></div>
      <ul class="xiding">
        <div style="display:flex;justify-Content:flex-start">
          <li>房屋信息</li>
          <li>房源描述</li>
          <li>费用详情</li>
          <li>位置周边</li>
          <li>附近房源</li>
          <li>推荐房源</li>
        </div>
        <li style=" margin-right: 0; float: right;">
          <div style="display:inline-block">
            <el-button
              type="warning"
              style="width: 123px; height: 42px; margin-top: 2px;"
              icon="el-icon-alarm-clock"
              >预约看房</el-button
            >
          </div>
          <div style="display:inline-block">
            <el-button
              type="success"
              style="width: 123px; height: 42px; margin-top: 5px;"
              icon="el-icon-phone-outline"
              @click="Consultation"
              >在线咨询</el-button
            >
          </div>
        </li>
      </ul>
      <div class="content_article">
        <div class="security">
          <img
            src="@/assets/anquan.png"
            style="height:28px;  vertical-align: middle;margin-right:18px"
          />
          <span>真实存在，真是在租，真实价格，假一赔十</span>
          <p
            style="display: inline-block; position: absolute;right: 0;color: blue;"
          >
            我要举报
          </p>
        </div>
        <div class="guarantee__house">
          <span>免费领取安心租房宝典，手把手教你租好房</span>
          <p
            style="color:blue;position:absolute;right:0; display:inline-block;"
          >
            微信扫码查看
          </p>
        </div>
        <!-- 房屋信息 -->
        <div class="info">
          <h3 style="font-size: 24px;font-weight: 700;">
            房屋信息
          </h3>
          <div>
            <el-row :span="24" style="margin-bottom:18px">
              <el-col :span="22">
                <el-col
                  :span="8"
                  style="color: rgba(48,48,51,.6);font-size:18px"
                  >基本信息</el-col
                >
                <el-col :span="8" class="col_size"
                  >面积：{{ houseinfo.houseArea }}m²</el-col
                >
                <el-col :span="8" class="col_size"
                  >朝向：{{ houseinfo.houserDirection }}</el-col
                >
              </el-col>
            </el-row>
            <el-row :span="24" style="margin-bottom:18px">
              <el-col :span="22">
                <el-col :span="8" class="col_size"></el-col>
                <el-col :span="8" class="col_size">维护：{{ time }}天前</el-col>
                <el-col :span="8" class="col_size">入住：随时入住</el-col>
              </el-col>
            </el-row>
            <el-row :span="24" style="margin-bottom:18px">
              <el-col :span="22">
                <el-col :span="8" class="col_size"></el-col>
                <el-col :span="8" class="col_size"
                  >楼层：{{ $attrs.floo }}</el-col
                >
                <el-col :span="8" class="col_size"
                  >电梯：{{ houseinfo.elevator }}</el-col
                >
              </el-col>
            </el-row>
            <el-row :span="24" style="margin-bottom:18px">
              <el-col :span="22">
                <el-col :span="8" class="col_size"></el-col>
                <el-col :span="8" class="col_size">车位：暂无数据</el-col>
                <el-col :span="8" class="col_size">用水：民用</el-col>
              </el-col>
            </el-row>
            <el-row :span="24" style="margin-bottom:18px">
              <el-col :span="22">
                <el-col :span="8" class="col_size"></el-col>
                <el-col :span="8" class="col_size">用电：民用</el-col>
                <el-col :span="8" class="col_size">燃气：有</el-col>
              </el-col>
            </el-row>
            <el-row :span="24" style="margin-bottom:18px">
              <el-col :span="22">
                <el-col :span="8" class="col_size"></el-col>
                <el-col :span="8" class="col_size">租期：一年内</el-col>
                <el-col :span="8" class="col_size">看房：需提前预约</el-col>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="info_line"></div>
        <div>
          <el-row :span="24" style="margin-bottom:50px">
            <el-col :span="22">
              <el-col
                :span="4"
                style="line-height: 34px;
    font-size: 18px;"
                >配套设施</el-col
              >
              <el-col
                :span="4"
                class="col_size"
                v-for="(img, index) in img1"
                :key="index"
                ><img
                  :src="img"
                  style="height:32px;width:32px;margin-left:49px ;"
                />
              </el-col>
            </el-col>
          </el-row>
          <el-row :span="24" style="margin-bottom:28px">
            <el-col :span="22">
              <el-col
                :span="4"
                style="line-height: 34px;
    font-size: 18px;border:1px solid transparent ;"
              ></el-col>
              <el-col
                :span="4"
                class="col_size"
                v-for="(img, index) in img2"
                :key="index"
                ><img
                  :src="img"
                  style="height:32px;width:32px;margin-left:49px ;"
                />
              </el-col>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img1: [
        "https://guli-eduwx.oss-cn-beijing.aliyuncs.com/2022/05/28/033f7c37a6f54aa5bce3cf3b3a306ed7fire.png",
        "https://guli-eduwx.oss-cn-beijing.aliyuncs.com/2022/05/28/301a855caa6c4b9bb918ef55a37590bcbed.png",
        "https://guli-eduwx.oss-cn-beijing.aliyuncs.com/2022/05/28/29dbf827360a4dbeb976b5d0e8f4b46dbx.png",
        "https://guli-eduwx.oss-cn-beijing.aliyuncs.com/2022/05/28/09917811fd4b4f64b2801c4014e04941hot.png",
        "https://guli-eduwx.oss-cn-beijing.aliyuncs.com/2022/05/28/9aa3125500e245b6a3654087771de31bhotwater.png"
      ],
      img2: [
        "https://guli-eduwx.oss-cn-beijing.aliyuncs.com/2022/05/28/3634187653a645939f87ca511b8a2442rubish.png",
        "https://guli-eduwx.oss-cn-beijing.aliyuncs.com/2022/05/28/585993c1175c4624bcbae315d7395ab8telephone.png",
        "https://guli-eduwx.oss-cn-beijing.aliyuncs.com/2022/05/28/fee6c09d7fe04c3faebdb0561246fb2awifi.png",
        "https://guli-eduwx.oss-cn-beijing.aliyuncs.com/2022/05/28/9a77ccb84cc7441488872062472f9079yigui.png",
        "https://guli-eduwx.oss-cn-beijing.aliyuncs.com/2022/05/28/4a3f6f1d563f4dd19575b5e526346723kt.png"
      ],
      houseinfo: this.$attrs.houseinfo
    };
  },

  computed: {
    time() {
      let day = "";
      const Data = new Date();
      const date = Data.getDate();
      const month =
        Data.getMonth() < 10
          ? `0${Data.getMonth() + 1}`
          : `${Data.getMonth() + 1}`;

      if (month === this.houseinfo.gmtModified.split(" ")[0].split("-")[1]) {
        day =
          date -
          parseInt(this.houseinfo.gmtModified.split(" ")[0].split("-")[2]);
      } else {
        day =
          (parseInt(month) -
            parseInt(this.houseinfo.gmtModified.split(" ")[0].split("-")[1])) *
            31 -
          parseInt(this.houseinfo.gmtModified.split(" ")[0].split("-")[2]) +
          date;
      }

      return day;
    }
  },
  methods: {
    Consultation() {
      this.$parent.Consultation();
    }
  }
  // beforeRouteEnter(from, to, next) {
  //   if (to.name.indexOf("conerhouse") != -1) {
  //     // this.houseinfo = this.$route.query;
  //     next(vm => vm.que);
  //   } else {
  //     next();
  //   }
  // }
};
</script>

<style scoped>
.xiding {
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  z-index: 11;
  display: flex;
  justify-content: space-between;
}
.content_detail {
  margin-top: 30px;
}
.content_detail ul {
  z-index: 1;
  height: 74px;
  background: #f5f5f5;
  border-radius: 2px;
  padding: 12px 20px;
  font-family: PingFangSC-Semibold;
  font-size: 16px;
  color: #101d37;
  box-sizing: border-box;
  margin-bottom: 10px;
  width: 100%;
}
.content_detail ul li {
  display: inline-block;
  margin-right: 40px;
  line-height: 42px;
}
.content_detail ul li:hover {
  border-bottom: 2px solid #3072f6;
}
.content_detail ul li:hover:nth-last-child(1) {
  border-bottom: none;
}
.content_article {
  width: 75.6%;
}
.content_article .security {
  border-bottom: 1px solid #e4e6f0;
  line-height: 28px;
  font-size: 13px;
  padding: 10px 0 10px 20px;

  position: relative;
}
.guarantee__house {
  position: relative;
  margin-top: 14px;
  padding-left: 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e4e6f0;
  line-height: 28px;
  font-size: 13px;
  padding: 10px 0 10px 20px;
}
.info h3 {
  width: 100%;
  padding-top: 60px;
  margin-bottom: 30px;
}
.col_size {
  font-size: 16px;
  line-height: 18px;
  border: 1px solid transparent;
}
.info_line {
  margin-top: 15px;
  margin-bottom: 32px;
  margin-left: auto;
  border-bottom: 1px solid #e4e6f0;
}
</style>
