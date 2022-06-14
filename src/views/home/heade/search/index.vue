<template>
  <div class="search">
    <ul class="searchMenu clearfix">
      <li
        v-for="(title, index) in title"
        :key="index"
        ref="titles"
        @click="Placeholder(index)"
        :class="{ active: type === index }"
      >
        <span>{{ title }}</span>
      </li>
    </ul>
    <em class="triangle"></em>
    <div class="searchDetail">
      <div class="detailbox clearfix">
        <input
          type="text"
          class="search_text fl"
          name="search_text"
          :placeholder="placeholder"
          v-model="select"
          @keyup.enter="search"
        />
        <button type="button" class="findbtn" name="findbtn" @click="search">
          搜索
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
      title: ["找租房", "找商业", "找小区"],
      select: "",
      type: -1,
      placeholder: ""
    };
  },
  methods: {
    Placeholder(index = 0) {
      this.placeholder =
        index == 0
          ? "试试搜索租房预算"
          : index == 1
          ? "试试输入商业用途。如：办公"
          : "试试输入小区名，如汤臣一品";
      this.type = index;
    },
    search() {
      const home = { current: 1, select: this.select, size: 5 };

      this.$router.push({
        path: "/homedisplay",
        query: home
      });
    }

    // gethomeinfo(home) {
    //   this.$API.exhibitionhome
    //     .gethomeinfo(home)
    //     .then(result => {
    //       if (result.data.code) {
    //         home.homesinfo = result.data;

    //         this.$router.push({
    //           path: "/homedisplay",
    //           query: home
    //         });
    //       }
    //     })
    //     .catch(err => {
    //       throw err;
    //     });
  },
  mounted() {
    this.Placeholder();
  }
};
</script>

<style scoped>
.search {
  position: relative;
  width: 812px;
  height: 127px;
  margin: 0px auto;
}
.search ul li {
  float: left;

  color: gray;
  /* opacity: 0.4; */
  height: 43px;
}

.search ul li:hover {
  opacity: 1;
  color: rgba(255, 255, 255, 0.81);
}
.search ul li span {
  display: inline-block;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  padding: 0 20px 0 0;
}
.detailbox {
  margin-left: -10px;
}
.searchDetail {
  height: 55px;
}

.searchDetail input {
  border: none;
  outline: none;
}
.searchDetail .search_text {
  width: 626px;
  height: 55px;
  padding-left: 20px;
  line-height: 55px;
  font-size: 14px;
  border-radius: 25px;
}
.searchDetail .findbtn {
  width: 127px;
  height: 55px;
  background: #00ae66;
  color: white;
  font-size: 18px;
  cursor: pointer;
  border-radius: 25px;
  margin: 0 10px;
}
#active {
  color: white;
}
</style>
