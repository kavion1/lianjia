<template>
  <div>
    <search @homeinfo="homesinfo" @change="change"></search>
    <Exhibition
      :homeinfo="homeinfo"
      v-if="!houseinfo"
      style="min-height:1000px"
      @index="gethouseinfo"
    ></Exhibition>
    <houseinfo v-if="houseinfo" :houseinfos="houseinfos"></houseinfo>
  </div>
</template>

<script>
import search from "./search";
import Exhibition from "./Exhibition";
import houseinfo from "./houseinfo";
export default {
  data() {
    return {
      homeinfo: {},
      houseinfo: false,
      houseinfos: {}
    };
  },
  methods: {
    homesinfo(data) {
      this.homeinfo = data;
    },
    gethouseinfo({ index, houseinfo }) {
      this.houseinfo = index;
      this.houseinfos = houseinfo;
    },
    change(change) {
      this.houseinfo = change;
    }
  },

  mounted() {
    console.log(typeof this.$route.query.id);
    if (typeof this.$route.query.id == "object") {
      this.houseinfo = true;
      console.log("go");
    }
  },
  components: { search, Exhibition, houseinfo }
};
</script>

<style></style>
