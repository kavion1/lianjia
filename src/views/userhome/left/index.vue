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

        <router-link :to="{ name: 'myentrust' }">
          <li :class="$route.name == 'myentrust' ? 'hover' : ''">
            我的委托
          </li></router-link
        >

        <li v-show='Type'>
          <!-- v-show="
            JSON.parse(sessionStorage.getItem('user_list')).userInfo.type == 1
          " -->
          <a href="http://106.52.182.240:8043"> 后台管理</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userinfo: {},
      Type: false
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
    if(  JSON.parse(sessionStorage.user_list).userInfo.type==1){
      this.Type=true
    }else{
      this.Type=false
    }
   
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
