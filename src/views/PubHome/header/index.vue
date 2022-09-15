<template>
  <div class="header">
    <div class="Wrap">
      <a class="logo" @click="Tohome"></a>
      <div class="title"><p>发布出租房源</p></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    Tohome() {
      this.$router.push({
        path: "/home"
      });
    }
  },
  mounted() {
    console.log("111");
    if (sessionStorage.getItem("token") || cookie.get("token")) {
      return;
    } else {
      console.log("this1", this);
      this.$router.push("/home");
    }
  }
};
</script>

<style scoped>
.header {
  background: #f5f5f6;
}
.Wrap {
  width: 1150px;
  margin: 0 auto;
  padding: 30px 0 25px;
  line-height: 32px;
  font-size: 16px;
  display: flex;
}
.logo {
  margin-left: -120px;
  display: inline-block;
  width: 200px;
  height: 100px;
  margin-right: 10px;
  background: url(~@/assets/logo.png) no-repeat;
  background-size: 100%, 100%;

  display: table-cell;
  white-space: nowrap;
}
.title {
  text-align: center;
  font-size: 40px;
  display: table-cell;
  white-space: nowrap;
  line-height: 80px;
  font-weight: bold;
  margin-left: -150px;

  flex-grow: 1;
}
</style>
