<template>
  <el-dialog
    :title="title"
    :visible.sync="visiblec"
    width="25%"
    @close="close"
    :close-on-click-modal="false"
    style="overflow:hidden"
  >
    <div v-show="email_login">
      <el-form
        :model="login_Email_form"
        :rules="rulesEmail"
        ref="login_Email_form"
        status-icon
      >
        <el-form-item>
          <el-row style="margin-top:-40px;margin-bottom: 20px;">
            <el-col :span="20"
              ><i style="font-size:12px;color:#b5b5b5;line-height: 1;"
                >i租客承诺:绝对不会泄露用户信息</i
              ></el-col
            >
          </el-row>
        </el-form-item>

        <el-row style="margin:0 0 0 40px">
          <!-- 邮箱快捷登录 -->
          <el-form-item prop="email">
            <el-row>
              <el-col :span="20">
                <el-input
                  style="outline:none;border-radius: 0;"
                  v-model="login_Email_form.email"
                  placeholder="请输入邮箱"
                ></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <!-- 验证码 -->
          <el-form-item prop="verificationCode">
            <el-row>
              <el-col :span="11"
                ><el-input
                  style="outline:none"
                  v-model="login_Email_form.verificationCode"
                  placeholder="请输入验证码"
                ></el-input
              ></el-col>
              <el-col :span="3"
                ><el-button
                  type="primary"
                  @click="get_verificationCode"
                  :disabled="code_btn"
                  style="width:105px; text-align:center; margin:0 5px;font-size: 14px;text-align: center;"
                  >{{ code_btn ? time : "获取验证码" }}</el-button
                >
              </el-col>
            </el-row>
          </el-form-item>
          <!-- 免登录 -->
          <el-row style="margin:10px 0 ">
            <el-col :span="20" style="margin:0 0 0 0"
              ><el-checkbox v-model="login_Email_form.checked"
                >七天内免登录</el-checkbox
              ></el-col
            >
          </el-row>
          <!-- 登录 -->
          <el-row style="margin:10px 0">
            <el-col :span="20">
              <el-button
                type="success"
                style="text-align:center;width: 100%;"
                @click="submitForm_Email_btn('login_Email_form')"
                >登录</el-button
              >
            </el-col>
          </el-row>

          <el-row style="margin:10px 0 10px -4px">
            <el-col :span="18"
              ><button
                style="color:green;background-color: white;"
                @click.prevent="accountandphoneLogin"
              >
                账号密码登录
              </button></el-col
            >
          </el-row>
          <el-row>
            <el-col :span="20">
              <p style="font-size:12px;color:#b5b5b5;line-height: 1;">
                登录即代表同意<a style="color:#6fc293">《i租客隐私政策》</a>及
                <a style="color:#6fc293"> 《i租客用户使用协议》</a>
              </p></el-col
            >
          </el-row>
        </el-row>
      </el-form>
    </div>
    <div v-show="account_login">
      <el-form
        :rules="rules_account"
        :model="login_account_form"
        ref="login_account_form"
        status-icon
      >
        <el-form-item>
          <el-row style="margin:0 0 0 40px">
            <!-- 账号密码登录 -->
            <el-form-item style="margin:0 0 14px 0" prop="account">
              <el-row>
                <el-col :span="20"
                  ><el-input
                    type="text"
                    style="outline:none;border-radius: 0;"
                    v-model="login_account_form.account"
                    placeholder="请输入账号"
                  ></el-input
                ></el-col>
              </el-row>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password">
              <el-row>
                <el-col :span="20"
                  ><el-input
                    style="outline:none;border-right: none;"
                    v-model="login_account_form.password"
                    placeholder="请输入密码"
                    show-password
                    @change.prevent="submitForm_account_btn"
                  ></el-input
                ></el-col>
              </el-row>
            </el-form-item>
            <!-- 免登录 -->
            <el-row style="margin-top:10px">
              <el-col :span="10" style="margin:0 0 0 0"
                ><el-checkbox v-model="login_account_form.checked"
                  >七天内免登录</el-checkbox
                ></el-col
              >
              <el-col :span="10" style="float:right;"
                ><a style="color:rgb(103, 194, 58);">忘记密码</a></el-col
              >
            </el-row>
            <!-- 登录 -->
            <el-row style="margin-left:0px">
              <el-col :span="20">
                <el-button
                  type="success"
                  style="text-align:center;width: 100%;"
                  @click.prevent="submitForm_account_btn('login_account_form')"
                  >登录</el-button
                >
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18"
                ><button
                  @click="accountandphoneLogin"
                  style="color:green;background-color: white;"
                >
                  邮箱快捷登录
                </button></el-col
              >
            </el-row>
            <el-row>
              <el-col :span="20">
                <p style="font-size:12px;color:#b5b5b5;line-height: 1;">
                  登录即代表同意<a style="color:#6fc293">《i租客隐私政策》</a>及
                  <a style="color:#6fc293"> 《i租客用户使用协议》</a>
                </p></el-col
              >
            </el-row>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
    <div v-show="email_register">
      <el-form
        :model="register_email_form"
        :rules="rules_register"
        ref="register_email_form"
        status-icon
      >
        <el-form-item>
          <el-row
            style="margin-top:-40px;margin-bottom: 20px;font-size:12px;color:#b5b5b5;line-height: 1;"
          >
            <el-col :span="16"><i>i租客承诺:绝对不会泄露用户信息!</i></el-col>
            <el-col :span="8"
              >已有帐号?<a
                style="font-size:12px;color:rgb(103, 194, 58);line-height: 1;cursor: pointer;"
                @click="changeLogin"
                >点击登录</a
              ></el-col
            >
          </el-row>
        </el-form-item>

        <el-row style="margin:0 0 0 40px">
          <el-form-item prop="name">
            <el-row>
              <el-col :span="20">
                <el-input
                  style="outline:none;border-radius: 0;"
                  v-model="register_email_form.name"
                  placeholder="用户名"
                ></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <!-- 邮箱注册 -->
          <el-form-item prop="email">
            <el-row>
              <el-col :span="20">
                <el-input
                  style="outline:none;border-radius: 0;"
                  v-model="register_email_form.email"
                  placeholder="请输入邮箱"
                ></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <!-- 验证码 -->
          <el-form-item prop="verificationCode">
            <el-row>
              <el-col :span="11"
                ><el-input
                  style="outline:none"
                  v-model="register_email_form.code"
                  placeholder="请输入验证码"
                ></el-input
              ></el-col>
              <el-col :span="3"
                ><el-button
                  type="primary"
                  style="width:105px; text-align:center; margin:0 5px;font-size: 14px;"
                  @click="get_verificationCode"
                  :disabled="code_btn"
                  >{{ code_btn ? time : "获取验证码" }}</el-button
                >
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="password">
            <el-row>
              <el-col :span="20">
                <el-input
                  style="outline:none;border-radius: 0;"
                  v-model="register_email_form.password"
                  placeholder="请输入密码"
                  show-password
                ></el-input>
              </el-col>
            </el-row>
          </el-form-item>

          <el-row style="margin:10px 0 ">
            <el-col :span="20" style="margin:0 0 0 0"
              ><el-checkbox v-model="register_email_form.checked">
                <p
                  style="font-size: 12px;
                      color: rgb(181, 181, 181);
                      line-height: 1;word-wrap: break-word;"
                >
                  我已阅读并同意<a
                    style="font-size:12px;color:rgb(103, 194, 58);"
                    >《i租客隐私政策》</a
                  >及
                  <a style="font-size:12px;color:rgb(103, 194, 58);"
                    >《i租<br />客用户使用协议》</a
                  >
                </p></el-checkbox
              ></el-col
            >
          </el-row>
          <!-- 注册 -->
          <el-row style="margin:10px 0">
            <el-col :span="20">
              <el-button
                type="success"
                style="text-align:center;width: 100%;"
                @click="register_email_btn('register_email_form')"
                >注册</el-button
              >
            </el-col>
          </el-row>
        </el-row>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import { login } from "@/api/user";
import { T } from "caniuse-lite/data/browserVersions";
import {
  validateaccount,
  validatepassword,
  validatecode,
  mandatory,
  CustomRules
} from "../../utils/rules/rules";
export default {
  name: "loginDialog",

  data() {
    return {
      user_list: {
        userInfo: {
          name: ""
        }
      },
      login_Email_form: {
        email: "",
        verificationCode: "",
        checked: true
      },
      login_account_form: {
        account: "",
        password: "",
        checked: true
      },
      register_email_form: {
        name: "",
        email: "",
        code: "",
        password: "",
        checked: false
      },
      rules_account: {
        account: [mandatory("账号不能为空！"), CustomRules(validateaccount)],
        password: [mandatory("密码不能为空")]
      },

      rulesEmail: {
        email: [mandatory("邮箱不能为空！"), CustomRules(validateaccount)],
        verificationCode: [
          mandatory("验证码不能为空！"),
          CustomRules(validatecode)
        ]
      },
      rules_register: {
        name: [mandatory("用户名不能为空")],
        email: [mandatory("邮箱不能为空！"), CustomRules(validateaccount)],
        code: [mandatory("验证码不能为空！"), CustomRules(validatecode)],
        password: [mandatory("密码不能为空"), CustomRules(validatepassword)]
      },
      visiblec: false,

      email_login: false,
      email_register: false,
      account_login: false,
      passwordtype: true,
      code: "",
      code_btn: false,
      time: 120
    };
  },
  methods: {
    accountandphoneLogin() {
      if (this.email_login) {
        this.email_login = false;
        this.account_login = true;
        this.$refs["login_Email_form"].resetFields();
      } else {
        this.email_login = true;
        this.account_login = false;
        this.$refs["login_account_form"].resetFields();
      }
    },
    close() {
      this.email_login = false;
      this.account_login = false;
      this.email_register = false;
      this.visiblec = false;

      this.$refs["login_Email_form"].resetFields();
      this.$refs["login_account_form"].resetFields();
      this.$refs["register_email_form"].resetFields();
    },
    //email登录
    submitForm_Email_btn(formName) {
      const { email, verificationCode } = this.login_Email_form;
      this.login_Email_form.code = verificationCode;
      this.login_Email_form.account = email;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$API.user
            .email_login(this.login_Email_form)
            .then(result => {
              if (result.data.flag) {
                const { data } = result;
                this.user_list = data;
                sessionStorage.setItem(
                  "user_list",
                  JSON.stringify(this.user_list)
                );
                this.$bus.$emit("user_list", data);
                this.$emit("updata", data);
                this.$message.success("登陆成功");
                this.close();

                if (this.login_account_form.checked) {
                  this.$cookie.set("checked", this.login_account_form.checked, {
                    expires: 7
                  });
                  this.$cookie.set("token", data.token, {
                    expires: 7
                  });
                } else {
                  sessionStorage.setItem(
                    "checked",
                    this.login_account_form.checked
                  );
                  sessionStorage.setItem("token", result.data.token);
                }
              } else {
                return false;
              }
            })
            .catch(err => {});
        } else {
          return false;
        }
      });
    },
    // 账号密码登录
    submitForm_account_btn(formName) {
      const { account, password } = this.login_account_form;
      let login_list = {};
      login_list.account = account;
      login_list.password = password;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$API.user.login(login_list).then(result => {
            console.log(result);
            if (result.data.code == 200) {
              this.user_list = result.data;
              sessionStorage.setItem(
                "user_list",
                JSON.stringify(this.user_list)
              );
              this.$bus.$emit("user_list", result.data);
              this.$emit("updata", result.data);
              this.$message.success(result.data.message);
              this.close();

              if (this.login_account_form.checked) {
                this.$cookie.set("checked", this.login_account_form.checked, {
                  expires: 7
                });
                this.$cookie.set("token", result.data.token, {
                  expires: 7
                });
              } else {
                sessionStorage.setItem(
                  "checked",
                  this.login_account_form.checked
                );
                sessionStorage.setItem("token", result.data.token);
              }
            } else {
              this.$message.warning(result.data.message);
              return false;
            }
          });
        } else {
          return false;
        }
      });
    },
    // 邮箱注册
    register_email_btn(formName) {
      const { email, code, password, name } = this.register_email_form;
      let register = { account: email, code, password, name };
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.register_email_form.checked) {
            this.$API.user
              .register(register)
              .then(result => {
                if (result.data.code === 200) {
                  this.$message.success(result.data.message);
                  this.$refs["register_email_form"].resetFields();
                  this.changeLogin();
                } else {
                  this.$message.warning(result.data.message);
                  console.log("@", result);
                }
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            this.$message.warning("同意用户协议方可注册");
          }
        } else {
          return false;
        }
      });
    },
    changeLogin() {
      this.email_register = false;
      this.account_login = true;
    },
    async get_verificationCode() {
      const { email } =
        this.register_email_form.email != ""
          ? this.register_email_form
          : this.login_Email_form;

      if (email) {
        this.$API.user
          .getcode(email)
          .then(result => {
            this.code_btn = true;
            this.code = result.data.data;
            const timer = setInterval(() => {
              this.time--;
              if (this.time <= 0 || this.visiblec == false) {
                this.time = 120;
                clearInterval(timer);
                this.code_btn = false;
              }
            }, 1000);
          })
          .catch(err => {});
      } else {
        this.$message.warning("请输入邮箱");
      }
    },
    async login_token() {
      const res = await this.$API.user.login_token();
      this.user_list.userInfo = res.data.userInfo;

      this.$set(this.user_list, "flag", res.data.flag);
    },
    changelogin() {
      this.visiblec = true;
      this.email_login = true;
    },
    changeregister() {
      this.visiblec = !this.visiblec;
      this.email_register = !this.email_register;
    }
  },
  created() {
    if (this.$cookie.get("checked")) {
      this.login_token();
    }
  },
  computed: {
    title() {
      if (this.email_login) {
        return "邮箱快捷登录";
      }
      if (this.account_login) {
        return "账号密码登录";
      }
      if (this.email_register) {
        return "邮箱注册";
      }
    }
  },
  watch: {
    $route: {
      deep: true,
      handler() {
        console.log("route");
        if (this.$route.query.login == "login") {
          this.visiblec = true;
          this.email_login = true;
        }
      }
    }
  }
};
</script>

<style scped></style>
