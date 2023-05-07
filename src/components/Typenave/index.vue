<template>
  <div class="banner">
    <div class="container">
      <ul class="channelList">
        <router-link to="/home"> <li>首页</li></router-link>

        <router-link to="/homedisplay">
          <li>
            <a :class="$route.name == 'homedisplay' ? 'selected' : ''">房源</a>
          </li></router-link
        >

        <router-link to="/pubhome">
          <li>
            <a :class="$route.name == 'pubhome' ? 'selected' : ''">发布房源</a>
          </li></router-link
        >

        <router-link to="/userhome"
          ><li>
            <a :class="$route.path.search('userhome') != -1 ? 'selected' : ''"
              >业主</a
            >
          </li></router-link
        >
      </ul>
      <div class="banner_right">
        <div v-show="!user_list.flag">
          <span class="logon_icon"></span>
          <span>
            <a class="login" @click="login">登录/</a>
            <a class="register" @click="register">注册</a></span
          >
        </div>

        <div v-show="user_list.flag" class="login_check">
          <span>欢迎</span>
          <span>
            <img
              @click="TOuserinfo"
              :src="avatar"
              width="20px"
              height="20px"
              style="border-radius:50%;vertical-align: middle;"
            />
            <a class="login" @click="TOuserinfo">{{ user_name }}</a>
            <a class="register" @click="logo_out">退出登录</a></span
          >
        </div>
      </div>
    </div>
    <loginDialog ref="login" @updata="updata"></loginDialog>
  </div>
</template>

<script>
import cookies from "@/api/setCooki";
export default {
  data() {
    return {
      user_list: { flag: false },
      user_name: "",
      avatar: ""
    };
  },

  methods: {
    login() {
      console.log(this);
      this.$refs.login.changelogin();
    },
    register() {
      this.$refs.login.changeregister();
    },
    logo_out() {
      this.user_list.flag = false;
      this.ALLremove("cookie");
      this.ALLremove("sessionStorage");
      if (
        this.$route.name == "pubhome" ||
        this.$route.path.indexOf("userhome") != -1
      ) {
        this.$router.replace("/home");
      }
    },
    removecookie() {
      const arr = document.cookie.split(";");
      let name;
      arr.map((item, index) => {
        name = arr[index].split("=")[0].trim();
        this.$cookie.remove(name);
      });
    },
    removeSessionAndlocal(module) {
      module = module == "sessionStorage" ? sessionStorage : localStorage;
      const obj = module;
      for (let i in obj) {
        module.removeItem(i);
      }
    },
    ALLremove(Module) {
      if (Module == "cookie") {
        this.removecookie();
      } else if (Module == "sessionStorage" || Module == "localStorage") {
        this.removeSessionAndlocal(Module);
      }
    },
    login_token() {
      if (sessionStorage.getItem("user_list") != null) {
        const data = JSON.parse(sessionStorage.getItem("user_list"));
        console.log(data);
        this.user_name = data.userInfo.name;
        this.$set(this.user_list, "flag", data.flag);
        this.avatar = data.userInfo.avatar;
      } else {
        this.$API.user
          .login_token()
          .then(result => {
            console.log("logintoken", result.data);
            this.user_name = result.data.userInfo.name;
            this.$set(this.user_list, "flag", result.data.flag);
            this.avatar = result.data.userInfo.avatar;
            sessionStorage.setItem("user_list", JSON.stringify(result.data));
          })
          .catch(err => {
            throw err;
          });
      }
    },
    updata(res) {
      this.$set(this.user_list, "flag", res.flag);
      this.user_name = res.userInfo.name;
      this.avatar = res.userInfo.avatar;
      console.log("uodata");
    },
    TOuserinfo() {
      this.$router.replace("/userhome");
    }
  },
  watch: {
    $route: {
      handler() {
        deep: true;
        if (this.$route.name != "home") {
          this.$bus.$on("user_list", res => {
            this.$set(this.user_list, "flag", res.flag);
            this.user_name = res.userInfo.name;
            this.avatar = res.userInfo.avatar;
          });
        }
      }
    },
    user_list() {
      console.log("username");
    }
  },
  created() {
    if (this.$cookie.get("checked") || sessionStorage.checked == "false") {
      this.login_token();
    }
    this.$bus.$on("logo_out", res =>
      this.$set(this.user_list, "flag", res.flag)
    );
  },
  beforeUpdate() {
    this.$bus.$on("user_list", res => {
      this.$set(this.user_list, "flag", res.flag);
      this.user_name = res.userInfo.name;
      this.avatar = res.userInfo.avatar;
    });
  },

  beforeDestroy() {
    this.$bus.$off("user_list");
    this.$bus.$off("logo_out");
  }
};
</script>

<style scoped>
.banner {
  background-color: #394043;
  line-height: 38px;
  font-size: 12px;
  width: 100%;
}
.container {
  width: 75.7%;
  margin: 0 auto;
}
.channelList {
  width: 469.5px;
  display: table-cell;
  white-space: nowrap;

  color: #a9abab;
}
.channelList li {
  display: inline-block;
  margin-right: 21.5px;
}
.selected {
  color: #ffffff;
}
.banner_right {
  display: table-cell;
  white-space: nowrap;
  width: 1000px;
  text-align: right;
  color: #fff;
}
.logon_icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  background: url(../../assets/icon.png);
  background-position: -204px -20px;
  vertical-align: middle;
  margin-top: -2px;
  margin-right: 3px;
}
ul li {
  font-size: 12px;
  color: #a9abab;
}

.login_check span,
.login_check span img,
.login_check span a {
  margin-right: 10px;
}
</style>
