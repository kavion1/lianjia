<template>
  <div class="content" ref="exhibition">
    <p class="content_title" v-show="select && titleselect">
      已为您找到
      <span style="color:blueviolet">{{ total }}</span>
      套
      <span v-show="titleselect">{{ contitle }}房源</span>
    </p>
    <p class="content_title" v-show="!titleselect">
      未找到房源
    </p>
    <ul class="content__filter">
      <li class="search_selected">综合排序</li>
      <li class="search_selected" @click="updataTime">最新上架</li>
      <!-- 202, 202, 202 -->
      <li class="search_selected" @click="pricesort">
        价格<i class="el-icon-sort-down" v-show="PriceSort == 'up'"></i
        ><i class="el-icon-sort-up" v-show="PriceSort == 'down'"></i>
      </li>
      <li class="search_selected" @click="areasort">
        面积<i class="el-icon-sort-down" v-show="AreaSort == 'up'"></i
        ><i class="el-icon-sort-up" v-show="AreaSort == 'down'"></i>
      </li>
    </ul>
    <div v-show="titleselect">
      <div
        style="min-height:1000px"
        v-loading="loading"
        element-loading-text="拼命加载中"
      >
        <div
          class="content_list"
          v-for="(house, index) in homeinfos.pages"
          :key="index"
        >
          <a class="content_list_item_aside">
            <el-image
              :src="house.images[0]"
              style="width:160px;height: 122px;"
              @click="gethouseid(index)"
              lazy
            >
            </el-image>
          </a>
          <div class="content__list_item_main">
            <p class="content__list_item_title">
              <i
                ><img
                  src="@/assets/qianyue.png"
                  alt=""
                  style="height: 20px;vertical-align: top;"
              /></i>
              <span @click="gethouseid(index)" style=" cursor: pointer;"
                >{{ house.rendMethod }}·{{ house.community
                }}{{ house.housePattern }} {{ house.houserDirection }}</span
              >
              <span></span>
            </p>
            <p class="content__list_item_des">
              <span>{{ house.country }}-{{ house.community }}</span
              ><i>/</i><span>{{ house.houseArea }}㎡</span><i>/</i
              ><span>{{ house.houserDirection }}</span
              ><i>/</i><span>{{ house.housePattern }}</span>
            </p>
            <p class="content_list_item_tag">
              <i>{{ house.rendMethod }}</i>
              <i>{{ house.houserDirection }}</i>
              <i>{{ house.elevator }}</i>
              <i>{{ house.traffic }}</i>
            </p>
            <p class="content_list_item_other">
              <i class="el-icon-place"></i
              ><span>房源距离{{ house.traffic }}{{ house.distance }}</span>
            </p>
            <span class="content_list_item_price">
              <em>{{ house.money }}</em>
              元/月
            </span>
          </div>
        </div>
      </div>
      <el-pagination
        background
        layout="prev, pager, next,total"
        :total="total"
        :current-page="page"
        :page-size="limit"
        align="center"
        style="margin-left:20px"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    <div class="content_empty1" v-show="!titleselect">
      没有找到相关房源 可以尝试调整搜索条件
    </div>
  </div>
</template>

<script>
export default {
  name: "exhibition",
  data() {
    return {
      total: 0,
      PriceSort: "",
      AreaSort: "",
      limit: 5,
      select: "",
      homeinfos: {},
      page: 1,
      home: {
        area: "",
        current: 1,
        gmtModified: "",
        price: "",
        select: "",
        size: 5
      },
      titleselect: true,
      loading: false
    };
  },
  props: ["homeinfo"],
  methods: {
    pricesort() {
      if (this.AreaSort != "" || this.home.gmtModified != "") {
        this.AreaSort = "";
        this.home = this.$options.data().home;
      }
      if (this.PriceSort == "" || this.PriceSort == "down") {
        this.PriceSort = "up";

        this.home.select = this.select;
        this.home.price = this.PriceSort;
        this.gethominfo(this.home);
      } else {
        this.PriceSort = "down";
        this.home.select = this.select;
        this.home.price = this.PriceSort;
        this.gethominfo(this.home);
      }
    },
    areasort() {
      if (this.PriceSort != "" || this.home.gmtModified != "") {
        this.PriceSort = "";
        this.home = this.$options.data().home;
      }
      if (this.AreaSort == "" || this.AreaSort == "down") {
        this.AreaSort = "up";

        this.home.select = this.select;
        this.home.area = this.AreaSort;
        this.gethominfo(this.home);
      } else {
        this.AreaSort = "down";
        this.home.select = this.select;
        this.home.area = this.AreaSort;
        this.gethominfo(this.home);
      }
    },
    updataTime() {
      if (this.PriceSort != "" || this.areasort != "") {
        this.PriceSort = "";
        this.AreaSort = "";
        this.home = this.$options.data().home;
      }
      this.home.select = this.select;
      this.home.gmtModified = "up";
      this.gethominfo(this.home);
    },
    handleCurrentChange(pager = 1) {
      this.page = pager;
      this.home.current = this.page;
      this.home.select = this.select;
      this.gethominfo(this.home);
      this.$scrollTo();
    },
    gethominfo(home) {
      this.loading = true;
      if (JSON.stringify(home) == "{}") {
        home = {
          current: 1,
          size: 5,
          select: ""
        };
      }

      this.$API.exhibitionhome
        .gethomeinfo(home)
        .then(result => {
          if (result.data.code == 200) {
            this.homeinfos = result.data.data;
            this.total = result.data.data.total;
            this.loading = false;
          } else {
            this.$message.warning(result.data.message);
          }
        })
        .catch(err => {
          throw err;
        });
    },
    gethouseid(index) {
      this.$route.query.id = "";
      this.$emit("index", {
        index: true,
        houseinfo: this.homeinfos.pages[index]
      });
    }
  },
  computed: {
    contitle() {
      if (this.select) {
        return this.select;
      }
    }
  },
  watch: {
    homeinfo() {
      const { current, select, homeinfo } = this.homeinfo;
      this.select = select;
      this.page = current;
      this.homeinfos = homeinfo.data;
      this.total = homeinfo.data.total;

      if (homeinfo.code == 201) {
        this.titleselect = false;
        return true;
      } else {
        this.titleselect = true;
        return true;
      }
      return true;
    }
  },

  mounted() {
    if (JSON.stringify(this.$route.query) != "{}") {
      const { current, select, size } = this.$route.query;
      const home = { current, select, size };
      this.select = select;
      this.gethominfo(home);
    } else {
      const home = {};
      this.gethominfo(home);
    }
  }
};
</script>

<style scoped>
.content {
  width: 1150px;
  margin: 62px auto 0 auto;
}
.content_title {
  font-size: 16px;
  color: #101d37;
  margin-top: 30px;
  margin-bottom: 14px;
  font-weight: 700;
}
.content__filter {
  position: relative;
  display: inline-block;
  width: 100%;
  border-bottom: 1px solid #c7b5b5;
}
.content__filter .search_selected {
  display: inline-block;
  font-weight: 700;
  font-size: 13px;
  color: #4a4a4a;
  margin-right: 37px;
  padding-bottom: 15px;
  padding-top: 16px;
  margin-bottom: -1px;
  cursor: pointer;
}

.content__filter .search_selected:active {
  color: #00ae66;
  border-bottom-color: #00ae66;
  background: none;
}
.search_selected i {
  color: rgb(202, 202, 202);
  /* width: 10px; */
}
.content_list {
  padding: 30px 0 0 0;
  position: relative;
}
.content_list_item_aside {
  height: 122px;
  width: 160px;
  display: inline-block;
  border-radius: 5px;
  overflow: hidden;
  vertical-align: top;
}
.content__list_item_main {
  margin-left: 36px;
  display: inline-block;
  position: relative;
  width: 50%;
}
.content__list_item_title {
  display: flex;
  align-items: center;
  margin-bottom: 18px;
  display: inline-block;
  max-width: 450px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 20px;
  font-weight: 700;
  color: #101d37;
  font-family: HiraginoSansGB-W6;
  vertical-align: bottom;
}
.content__list_item_des {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 16px;
}
.content__list_item_des i {
  font-weight: 400;
  color: #ccc;
  margin-left: 8px;
  margin-right: 8px;
}
i:nth-child(1) {
  margin-left: 0;
}
.content_list_item_tag {
  height: 24px;
  margin-bottom: 16px;
}
.content_list_item_tag i {
  display: inline-block;
  font-family: HiraginoSansGB-W3;
  height: 24px;
  line-height: 24px;
  font-size: 12px;
  text-align: center;
  color: #849aae;
  background-color: rgba(132, 154, 174, 0.1);
  border-radius: 2px;
  margin-right: 6px;
  padding: 0 11px;
}
.content_list_item_other {
  margin-bottom: 16px;
  color: #9399a5;
  font-family: HiraginoSansGB-W3;
  font-size: 14px;
  margin-right: 10px;
}
.content_list_item_other i {
  margin-bottom: 16px;
  color: aqua;
  margin-right: 10px;
}
.content_list_item_price {
  position: absolute;
  right: 0;
  top: 0;
  font-family: PingFangSC-Semibold;
  color: #fa5741;
  font-size: 14px;
  line-height: 22px;
  font-weight: 700;
}
.content_list_item_price em {
  font-size: 24px;
  font-family: Tahoma;
}
.content_empty1 {
  padding: 60px;
  font-size: 18px;
  color: #888c8e;
  line-height: 30px;
  text-align: center;
  margin: 80px auto 50px;
}
</style>
