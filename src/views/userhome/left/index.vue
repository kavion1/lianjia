<template>
  <div>
    <div class="float-left">
      <div class="avatar">
        <img :src="userinfo.avatar" alt="" style="width:80px;height:80px" />
      </div>
      <div class="user-name">欢迎你,{{ userinfo.name }}</div>
      <ul>
        <router-link :to="{ name: 'edituserinfo', query: userinfo }"
          ><li :class="$route.name == 'edituserinfo' ? 'hover' : ''">
            编辑资料
          </li></router-link
        >

        <router-link :to="{ name: 'conerhouse' }">
          <li :class="$route.name == 'conerhouse' ? 'hover' : ''">
            关注的房源
          </li></router-link
        >
        <router-link :to="{ name: 'concernplot' }"
          ><li :class="$route.name == 'concernplot' ? 'hover' : ''">
            关注的小区
          </li></router-link
        >
        <router-link :to="{ name: 'houserecord' }">
          <li :class="$route.name == 'houserecord' ? 'hover' : ''">
            看房记录
          </li></router-link
        >
        <router-link :to="{ name: 'myentrust' }">
          <li :class="$route.name == 'myentrust' ? 'hover' : ''">
            我的委托
          </li></router-link
        >
        <router-link :to="{ name: 'mysearch' }"
          ><li :class="$route.name == 'mysearch' ? 'hover' : ''">
            我的搜索
          </li></router-link
        >
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userinfo: {}
    };
  },
  methods: {
    login_token() {
      this.$API.user
        .login_token()
        .then(result => {
          if (result.data.code == 200) this.userinfo = result.data.userInfo;
        })
        .catch(err => {
          throw err;
        });
    }
  },
  created() {
    this.login_token();
  }
};
</script>

<style scoped>
.float-left {
  width: 150px;

  border: 1px solid #e6e5e5;
  padding: 35px 0 9px;
  background: #ffffff57;
  box-shadow: 0 1px 2px rgb(0 0 0 / 15%);
  display: inline-block;
}
.avatar {
  width: 80px;
  height: 80px;
  margin: 0 auto;
  /* background: url("~@/assets/avatar-defalut.png") no-repeat; */
  /* background-size: 100% 100%; */
}
.user-name {
  text-align: center;
  padding: 15px 0;
}
.float-left ul li {
  width: 100%px;
  height: 40px;
  position: relative;
  text-align: center;
  line-height: 40px;
  color: black;
}
.float-left ul li.hover {
  background: #4fac6a;
  color: #e6e5e5;
  line-height: 40px;
}
</style>
