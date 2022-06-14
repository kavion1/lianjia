<template>
  <div class="edituserinfo">
    <!-- 个人信息title -->
    <el-row style="margin-bottom:10px">
      <el-col
        :span="24"
        style="text-align:center;font-weight:bold;font-size:20px"
        >个人信息</el-col
      >
    </el-row>
    <!-- 头像 -->
    <el-row style="margin:20px 0">
      <el-col :span="24" >
        <el-col
          :span="4"
          style="text-align:right;margin-top:40px;margin-right: 20px;"
          >用户头像</el-col
        >
        <el-col :span="8">
          <el-upload
            class="upload-demo"
            action="/api/izukeoss/upload"
            :on-success="handerSuccess"
            style="border-radius:50%"
          >
          <div style="min-height:100px">
           <img v-if="userinfo.avatar" :src="userinfo.avatar" class="avatar" style="display:inline-block"></img>
         
            </div>
           <div class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          
          </el-upload>
            </el-col>
         
      </el-col>
    </el-row>
    <hr>
    <el-row :span="24" style="margin-bottom:20px"> 
    <el-col :span="24">
          <el-col
          :span="2"
          style="line-height:32px;text-align:right;margin-right:10px"
        >
          <p>用户名:</p>
        </el-col>
        <el-col :span="8">
          <el-input
            v-model="userinfo.name"
            placeholder="请输入用户名"
            v-if="edit"
            size="small"

          ></el-input>
          <span v-else style="line-height:32px;text-align:right">{{
            userinfo.name
          }}</span>
        </el-col>
    </el-col>

      </el-row>
      <el-row :span="24" style="margin-bottom:20px">    
        <el-col
          :span="2"
          style="line-height:32px;text-align:right;margin-right:10px"
        >
          <p>手机号:</p>
        </el-col>
        <el-col :span="8">
          <el-input
            v-model="userinfo.phonenumber"
            placeholder="请输入手机号"
            v-if="edit"
            size="small"
          ></el-input>
          <span v-else style="line-height:32px;text-align:left">{{
            userinfo.phonenumber
          }}</span>
        </el-col>
    
      </el-row>
      <el-row :span="24" style="margin-bottom:20px">
     

        <el-col
          :span="2"
          style="line-height:32px;text-align:right;margin-right:10px"
          >邮箱:</el-col
        >
        <el-col :span="8">
          <el-input
            v-model="userinfo.account"
            placeholder="请输入邮箱"
            size="small"
            v-if="edit"
          ></el-input>
          <span v-else style="line-height:32px;text-align:left">{{
            userinfo.account
          }}</span>
        </el-col>
   
     </el-row>
   <!-- 按钮 -->
  <el-row :span="24">
      <el-col :span="24">
        <div style="float:right;margin-top:10px">
          <el-button type="warning" icon="el-icon-edit" @click="edit_btn"
            >修改</el-button
          >
          <el-button type="success" icon="el-icon-check" @click="check_btn"
            >保存</el-button
          >
        </div>
      </el-col>
</el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userinfo: {},
      edit: false,
  }},
  methods: {
    edit_btn() {
      this.edit = true;
    },
    check_btn() {
      this.userinfo.name ? (this.edit = false) : (this.edit = true);
      !this.userinfo.name ? this.$message.warning("用户名不能为空") : "";
      const {account,avatar,id,name}=this.userinfo
      const changeuserinfo= {
      "account":account ,
      "avatar": avatar,
      "id": id,
      "name": name,
} 
  this.$API.user.changeuserinfo(changeuserinfo).then(res=>{
    this.login_token()
  })
    },
    login_token() {
      this.$API.user
        .login_token()
        .then(result => {
          if (result.data.code == 200){
            this.userinfo = result.data.userInfo;
            this.$API.exhibitionhome.getuserhomeinfo(1,1).then((result) => {
      console.log(result.data.data.houselist[0].phonnumber,this)
      this.$set(this.userinfo,'phonenumber',result.data.data.houselist[0].phonnumber)
    }).catch(() => {
      
    });
          } 

        })
        .catch(err => {
          throw err;
        });
    },
    handerSuccess(res){
     this.userinfo.avatar=res.data.url.url
    }
  },
  created() {
    this.login_token();
    
  }
};
</script>

<style scoped>
.el-descriptions__body {
  background: rgb(244, 238, 238);
}

.avatar {
    width: 100px;
    height: 100px;
    display: block;
    border-radius: 50%;
  }
</style>
