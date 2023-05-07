<template>
  <div>
    <!--中间导航 Start-->
    <div class="navMain">
      <div class="wrapBox"></div>
    </div>
    <!--中间导航 End-->
    <!--二手好房Start-->
    <div class="secondBox">
      <div class="wrapBox">
        <div class="secondTitle">
          <div class="nametit"></div>
          <p class="more clearfix">
            <a
              @click="
                () => {
                  this.$router.replace('/homedisplay');
                }
              "
              >更多房源</a
            >
          </p>
        </div>
        <ul class="secondList clearfix">
          <li v-for="val in houseinfos" :key="val.uid">
            <a href="">
              <div class="imgwrap">
                <img :src="val.images[0]" alt="" />
                <p class="tit">
                  {{ val.rendMethod }}·{{ val.community
                  }}{{ val.housePattern }} {{ val.houserDirection }}
                </p>
                <p class="tips">
                  <span>{{ val.community }}</span>
                  <span>{{ val.housePattern }}</span>
                  <span>{{ val.houseArea }}平米</span>
                </p>
                <span class="price">{{ val.money }}元/月</span>
              </div>
              <p class="lianjia "><span>i租客推荐售房源</span></p>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <!--二手好房 End-->
    <!--小区推荐 Start-->
    <div class="recommendBox">
      <div class="wrapBox">
        <div class="secondTitle recommendTitle">
          <div class="nametit"></div>
          <p class="more clearfix">
            纵览小区，恋上这座城
            <a
              @click="
                () => {
                  this.$router.replace('/homedisplay');
                }
              "
              >更多房源</a
            >
          </p>
        </div>
        <ul class="recommendList clearfix">
          <li v-for="val in houseinfos2" :key="val.uid">
            <a href="">
              <div class="recowrap">
                <img :src="val.images[0]" alt="小区推荐1" />
              </div>
              <div class="recoTit">
                <h2 class="recotitle">{{ val.community }}</h2>
                <p class="price clearfix">
                  <span class="price-detail"
                    >{{ val.money }}<label>元/月</label></span
                  >
                </p>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Bodys",
  data: () => {
    return {
      houseinfos: [],
      houseinfos2: []
    };
  },
  methods: {
    async randomS() {
      const res = await this.$API.exhibitionhome.randomhouseinfo();

      console.log(res);
      if (res.data.flag) {
        this.houseinfos = res.data.data.houselist;
      }
    },
    async randomS1() {
      const res = await this.$API.exhibitionhome.randomhouseinfo();

      console.log(res);
      if (res.data.flag) {
        this.houseinfos2 = res.data.data.houselist.slice(0, 3);
      }
    }
  },
  mounted() {
    this.randomS();
    this.randomS1();
  }
};
</script>

<style scoped>
/*mainbox Start*/
.mainbox {
  padding-top: 45px;
  padding-bottom: 50px;
}
.mainbox li {
  float: left;
  width: 25%;
  text-align: center;
}
.mainbox li a {
  display: block;
  width: 100%;
  height: 100%;
}
.main_item a img {
  width: 76px;
  height: 65px;
  margin: 0px auto 17px;
}
.main_item a .main_title {
  font-size: 18px;
  color: #394043;
}
.main_item a .main_detail {
  width: 183px;
  margin: 3px auto 5px auto;
  font-size: 12px;
  color: #b0b3b4;
  line-height: 18px;
}
/*mainBox动画 Start*/
.main_item:hover .mainpic {
  position: relative;
  animation: mainslip 1.5s infinite alternate-reverse forwards;
}
@keyframes mainslip {
  0% {
    top: -1px;
  }
  5% {
    top: -2px;
  }
  15% {
    top: -3px;
  }
  25% {
    top: -4px;
  }
  50% {
    top: -5px;
  }
  75% {
    top: -4px;
  }

  100% {
    top: -3px;
  }
}
/*mainBox动画 End*/
/*mainbox End*/
.secondTitle {
  padding: 50px 0px 0;
}
.secondTitle .nametit {
  width: 248px;
  height: 30px;
  background: url(../images/icon.png);
  background-position: -19px -94px;
}
.secondTitle .more {
  font-size: 14px;
  color: #888;
  margin: 15px 0px 43px 0;
}
.secondTitle .more a {
  float: right;
  color: #394043;
  margin-right: 20px;
}
.secondList li {
  position: relative;
  float: left;
  width: 250px;
  height: 323px;
  /*border: 1px solid #eae9e9;*/
  margin-right: 47px;
}
.secondList li:last-child {
  margin-right: 0px;
}
.secondList li a {
  display: block;
  width: 100%;
  height: 100%;
}
.secondList li a img {
  width: 250px;
  height: 192px;
}
.secondList li p {
  text-align: center;
}
.secondList li .tit {
  text-align: center;
  font-size: 16px;
  color: #394043;
  white-space: normal;
  overflow: hidden;
  text-shadow: ellipsis;
  margin: 10px 18px 0;
}
.secondList li .tips {
  text-align: center;
  color: #999;
  font-size: 12px;
  padding: 0px 18px;
  height: 45px;
  line-height: 45px;
}
.secondList li .imgwrap {
  box-shadow: 1px 2px 2px 1px #dbdada;
}
.secondList li a .lianjia {
  font-size: 12px;
  color: #999;
  text-align: left;
  margin: 15px 0px;
}
.secondList li .imgwrap .price {
  position: absolute;
  left: 0;
  top: 150px;
  display: block;
  /* width: 65px; */
  height: 30px;
  background: #394043;
  line-height: 30px;
  text-align: center;
  color: #fff;
}
/*小区推荐 Start*/
.recommendBox {
  width: 100%;
  height: 500px;
  background: #eeeef1;
}

/*小区推荐 End*/
.recommendList li {
  float: left;
  width: 350px;
  height: 284px;
  margin-right: 48px;
  background: #fff;
  box-shadow: 1px 2px 2px 1px #dbdada;
}
.recommendList li:last-child {
  margin-right: 0px;
}
.recommendList li a {
  display: block;
  width: 100%;
  height: 100%;
  /*transition: all 5s;*/
}
.recowrap img {
  transition: all 1.5s ease-in-out;
}
.recommendList li a:hover .recowrap img {
  transform: scale(1.1, 1.1);
}
.recommendList li .recowrap {
  width: 100%;
  height: 200px;
  overflow: hidden;
}
.recommendList li .recoTit {
  padding: 0px 20px;
}
.recommendList li .recowrap img {
  width: 350px;
  height: 200px;
}
.recoTit .recotitle {
  font-size: 20px;
  color: #394043;
  font-weight: bold;
  padding-top: 20px;
  margin-bottom: 10px;
}
.recoTit .price .time,
.recoTit .price .price-detail {
  font-size: 14px;
  color: #888c8e;
  font-weight: bold;
}
.recoTit .price .price-detail {
  color: #394043;
}
.secondTitle .name {
  width: 248px;
  height: 30px;
  background: url(../images/icon.png);
  background-position: -19px -94px;
}
.recommendTitle .nametit {
  background: url(../images/xiaoqu-recom.png);
  width: 187px;
  height: 28px;
  background-size: 100%;
}

/*二手好房 End*/
/*新房新起航 Start*/
.newBox {
  padding-bottom: 62px;
}
.newhouseTitle .nametit {
  background-position: -20px -56px;
}
.newList li {
  position: relative;
  overflow: hidden;
  float: left;
  width: 350px;
  height: 260px;
  margin-right: 50px;
}
.newList li a {
  display: block;
  width: 100%;
  height: 100%;
}
.newList li:last-child {
  margin-right: 0;
}
.newList li .newimg {
  transition: all 0.8s ease-in-out;
}
.newList li:hover .newimg {
  width: 360px;
  height: 270px;
}
.newList li a img {
  width: 100%;
  height: 100%;
}
.newList li .newBg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
}
.newList li .newTitle {
  position: absolute;
  left: 50%;
  top: 50%;
  bottom: 25px;
  width: 350px;
  height: 260px;
  font-size: 24px;
  color: #fff;
  margin-left: -175px;
  margin-top: -35px;
  text-align: center;
  font-weight: bold;
}

.newList li .newTitle span {
  display: block;
  color: #fff2ab;
  font-size: 18px;
  margin: 10px 0 0 8px;
}
.newTitle span label {
  font-size: 20px;
}
.newList li .newjian {
  position: absolute;
  left: 0;
  bottom: 20px;
  width: 85px;
  height: 34px;
  line-height: 34px;
  text-align: center;
  background: #fff2ab;
  font-size: 18px;
  font-weight: bold;
}

/*新房新起航 End*/
</style>
