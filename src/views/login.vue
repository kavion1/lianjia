<template>
  <div class="all">
    <div class="box">
      <div class="sbox">
        <div class="title">房屋租赁管理系统</div>
        <div class="form">
          <el-form :model="loginUser" label-width="80px" :rules="rules">
            <el-form-item>
              <el-steps :active="1">
                <el-step title="步骤 1" icon="el-icon-edit"></el-step>
                <el-step title="步骤 2" icon="el-icon-upload"></el-step>
                <el-step title="步骤 3" icon="el-icon-picture"></el-step>
              </el-steps>
            </el-form-item>
            <el-form-item label="账号" prop="account">
              <el-input
                v-model="loginUser.account"
                placeholder="请输入账号"
                style="width:300px;"
                type="text"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" icon="el-icon-view">
              <el-input
                v-model="loginUser.password"
                placeholder="请输入密码"
                style="width:300px;"
                :type="passwordtype ? 'password' : ''"
              ></el-input>
              <span v-if="passwordtype" @click="eye">
                <svg
                  t="1652262253789"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="1922"
                  width="14"
                  height="14"
                >
                  <path
                    d="M93.866667 322.773333a8.533333 8.533333 0 0 1 6.613333 3.114667c5.589333 6.848 10.261333 12.373333 14.058667 16.64 97.664 109.056 239.552 177.706667 397.482666 177.706667 162.752 0 308.48-72.917333 406.314667-187.84 1.493333-1.792 3.242667-3.882667 5.184-6.272a8.533333 8.533333 0 0 1 15.146667 5.376v9.813333l0.021333 8.32v51.754667a8.533333 8.533333 0 0 1-2.517333 6.037333 599.893333 599.893333 0 0 1-99.584 81.002667l82.474666 98.261333a8.533333 8.533333 0 0 1-1.066666 12.010667l-35.946667 30.165333a8.533333 8.533333 0 0 1-12.010667-1.045333l-89.813333-107.050667a593.045333 593.045333 0 0 1-145.450667 50.837333l44.074667 121.024a8.533333 8.533333 0 0 1-5.098667 10.944l-44.096 16.042667a8.533333 8.533333 0 0 1-10.944-5.098667l-48.448-133.098666a604.586667 604.586667 0 0 1-130.88-1.557334L390.4 714.517333a8.533333 8.533333 0 0 1-10.944 5.12l-44.096-16.064a8.533333 8.533333 0 0 1-5.12-10.944l45.184-124.096a593.066667 593.066667 0 0 1-131.584-47.744l-89.813333 107.029334a8.533333 8.533333 0 0 1-12.032 1.066666L106.026667 598.677333a8.533333 8.533333 0 0 1-1.066667-12.010666l82.474667-98.261334a599.872 599.872 0 0 1-80.981334-62.976c-4.352-4.032-10.56-10.026667-18.602666-18.005333A8.533333 8.533333 0 0 1 85.333333 401.386667v-70.101334c0-4.693333 3.84-8.533333 8.533334-8.533333z"
                    fill="#333333"
                    p-id="1923"
                  ></path>
                </svg>
              </span>
              <span v-else @click="eye">
                <svg
                  t="1652262324478"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2077"
                  width="16"
                  height="16"
                >
                  <path
                    d="M508 512m-112 0a112 112 0 1 0 224 0 112 112 0 1 0-224 0Z"
                    p-id="2078"
                  ></path>
                  <path
                    d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3-7.7 16.2-7.7 35.2 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM508 688c-97.2 0-176-78.8-176-176s78.8-176 176-176 176 78.8 176 176-78.8 176-176 176z"
                    p-id="2079"
                  ></path>
                </svg>
              </span>
            </el-form-item>
            <el-form-item class="checkb">
              <el-checkbox label="" v-model="checked">记住密码</el-checkbox>
              <el-checkbox label="" class="checkb2" @click="atlogin(this)"
                >自动登录</el-checkbox
              >
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="width:300px" @click="denglu()"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Base64 from "crypto-js/enc-base64";
export default {
  data() {
    return {
      passwordtype: true,
      checked: false,
      loginUser: {
        account: "",
        password: ""
      },
      rules: {
        account: [
          {
            required: true,
            message: "账号不能为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    doLogin() {},
    eye() {
      this.passwordtype = !this.passwordtype;
    },
    denglu() {
      // console.log(Base64.stringify(this.loginUser.account));
      if (this.checked) {
        const user = JSON.stringify(this.loginUser);
        console.log(user);
        localStorage.setItem("user", user);
      }
      if (!this.checked) {
        localStorage.removeItem("user");
      }
    }
  },
  watch: {
    loginUser: {
      deep: true,
      handler(newValue, oldValue) {
        if (this.checked) {
          if (this.checked) {
            const user = JSON.stringify(this.loginUser);
            console.log(user);
            localStorage.setItem("user", user);
          }
          if (!this.checked) {
            localStorage.removeItem("user");
          }
        }
      }
    }
  },
  mounted() {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      const { account, password } = user;
      this.loginUser.account = account;
      this.loginUser.password = password;
      this.checked = true;
    }
  }
};
</script>
<style scoped>
.all {
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat;
  background-size: 100%, 100%;
  position: relative;
}
.box {
  width: 500px;
  height: 300px;
  background: skyblue;
  opacity: 0.7;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -150px 0 0 -250px;
  border-radius: 2%;
}
.sbox {
  width: 470px;
  height: 280px;
  margin: 10px 15px;
}
.title {
  padding: 30px 0 30px 0;
  text-align: center;
  font-size: 20px;
}
.form {
  margin: 0 auto;
}
.checkb {
  margin: -20px 0 0 0;
}
.checkb2 {
  margin-left: 104px;
}
</style>
