<template>
  <div class="loginbox">
    <div class="login_register clearfix">
      <div v-if="!user_list.flag">
        <span class="logon_icon"></span>
        <span>
          <a class="login" @click="login">登录</a>
          <a class="register" @click="register">注册</a></span
        >
      </div>
      <div v-show="user_list.flag" class="login_check">
        <span>欢迎</span>
        <span>
          <img
            :src="avatar"
            width="20px"
            height="20px"
            style="border-radius:50%;vertical-align: middle;"
          />
          <a class="login">{{ user_name }}</a>
          <a class="register" @click="logo_out">退出登录</a></span
        >
      </div>
      <loginDialog ref="login"></loginDialog>
    </div>
  </div>
</template>

<script>
// import LoginDialog from "@/components/loginDialog";
export default {
  data() {
    return {
      user_list: {
        userInfo: {
          name: ""
        }
      },
      avatar: ""
    };
  },
  methods: {
    login() {
      this.$refs.login.changelogin();
      this.$bus.$emit("login", { email_login: true, visiblec: true });
    },

    register() {
      this.$refs.login.changeregister();
    },

    logo_out() {
      this.user_list.flag = false;
      this.$cookie.remove("token");
      this.$cookie.remove("checked");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("checked");
      this.$bus.$emit("logo_out", this.user_list.flag);
    },
    async login_token() {
      const res = await this.$API.user.login_token();
      this.user_list.userInfo = res.data.userInfo;
      this.avatar = res.data.userInfo.avatar;
      this.$set(this.user_list, "flag", res.data.flag);
    }
  },
  computed: {
    user_name() {
      return this.user_list ? this.user_list.userInfo.name : "";
    }
  },
  mounted() {
    if (this.$cookie.get("checked") || sessionStorage.checked == "false") {
      this.login_token();
    }
    this.$bus.$on("user_list", res => {
      this.user_list = res;
      this.avatar = res.userInfo.avatar;
    });
  },
  beforeUpdate() {
    this.$bus.$on("user_list", res => {
      this.userInfo = res.userInfo;
      this.avatar = res.userInfo.avatar;
      console.log(res.userInfo);
    });
  },
  beforeDestroy() {
    this.$bus.$off("user_list");
  }
};
</script>

<style scoped>
.loginbox {
  position: absolute;
  right: 0px;
  top: 0px;
  height: 30px;
}
.login_register a,
.login_register span {
  color: #fff;
  font-size: 12px;
}
.loginbox .logon_icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  background: url(../../images/icon.png);
  background-position: -204px -20px;
  vertical-align: top;
}
.login_register .login {
  padding: 0 6px 0 3px;
}
a {
  cursor: pointer;
}
</style>
