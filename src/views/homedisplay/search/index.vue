<template>
  <div class="search_area">
    <div class="search_nav">
      <router-link to="/home">
        <img
          src="@/assets/logo.png"
          alt=""
          style="width:88px;height:40px;background-size:100% 100%"
        />
      </router-link>
      <ul>
        <li class="lis" @click="research" style="   cursor: pointer;">
          首页
        </li>
        <li class="lis"><a @click="entiretyhome">整租</a></li>
        <li class="lis"><a @click="shareFlat">合租</a></li>
        <router-link to="/pubhome"><li class="lis">发布房源</li></router-link>
        <router-link to=""><li class="lis">违法群租举报</li></router-link>
      </ul>
    </div>
    <div class="search_input m">
      <div class="search_wrap">
        <input
          type="text"
          placeholder="请输入区域或价格进行找房"
          class="search_inputs"
          v-model.trim="select"
          @keyup.enter="search"
        />
        <span
          ><el-button
            icon="el-icon-search"
            style="border:none"
            @click="search"
          ></el-button
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      select: "",
      type: ""
    };
  },
  methods: {
    research() {
      this.$emit("change", false);
      this.gethomeinfo({ current: 1, select: "", size: 5 });
    },
    search() {
      this.$emit("change", false);
      if (!this.type) {
        const home = { current: 1, select: this.select, size: 5 };
        this.gethomeinfo(home);
      } else {
        const home = {
          current: 1,
          select: `${this.select},${this.type}`,
          size: 5
        };
        this.gethomeinfo(home);
      }
    },
    gethomeinfo(home) {
      this.$API.exhibitionhome
        .gethomeinfo(home)
        .then(result => {
          if (result.data.code) {
            home.homeinfo = result.data;

            this.$emit("homeinfo", home);
          }
        })
        .catch(err => {
          throw err;
        });
    },
    entiretyhome() {
      this.$emit("change", false);
      this.type = "整租";
      if (!this.select) {
        const home = { current: 1, select: "整租", size: 5 };

        this.gethomeinfo(home);
      } else {
        const home = { current: 1, select: `${this.select},整租`, size: 5 };

        this.gethomeinfo(home);
      }
    },
    shareFlat() {
      this.$emit("change", false);
      this.type = "合租";
      if (!this.select) {
        const home = { current: 1, select: "合租", size: 5 };

        this.gethomeinfo(home);
      } else {
        const home = { current: 1, select: `${this.select},合租`, size: 5 };

        this.gethomeinfo(home);
      }
    }
  },
  mounted() {
    if (JSON.stringify(this.$route.query) != "{}")
      this.select = this.$route.query.select;
  }
};
</script>

<style scoped>
.search__area .search_input .search__wrap {
  box-shadow: 0 1px 1px 1px rgb(0 0 0 / 10%);
}
.search_area {
  width: 100%;
  min-width: 1150px;
  height: 155px;
  padding: 25px 0;
  background: #f5f5f6;
  box-sizing: border-box;
}
.search_nav {
  width: 1150px;
  margin: 0 auto 27px;
  height: 30px;
}
.logo {
  width: 88px;
  height: 30px;
  background: url("~@/assets/logo.png") no-repeat;

  background-size: 100% 100%;
}
ul {
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 25px;
  margin-left: 70px;
}
.lis {
  display: inline-block;
  /* white-space: nowrap; */
  line-height: 25px;
  font-size: 16px;
  margin-right: 40px;

  font-weight: 700;
  color: #101d37;
}
.search_input {
  width: 1150px;
  margin: 25px auto 24px auto;
}
.search_wrap {
  display: inline-block;
  width: 710px;
  line-height: 46px;
  font-size: 14px;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: gray 0px 0px 5px;
}
.search_inputs {
  width: 90%;
  padding: 16px 23px 17px;
  box-sizing: border-box;
  border-width: 0;
  font-size: 13px;
  height: 44px;
}
.search_wrap span {
  width: 10%;
}
</style>
