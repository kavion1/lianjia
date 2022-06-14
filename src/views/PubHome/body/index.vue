<template>
  <div class="form">
    <el-steps
      simple
      :active="active"
      finish-status="success"
      process-status="warning"
      style="margin-bottom:30px"
    >
      <el-step title="填写房屋信息" icon="el-icon-edit"></el-step>
      <el-step
        :title="active == '1' ? '平台审核中' : '平台审核'"
        icon="el-icon-upload"
      ></el-step>
      <el-step title="房源成功发布" icon="el-icon-picture"></el-step>
    </el-steps>
    <el-form :model="form" label-width="120px">
      <el-form-item label="小区所在城市">
        <el-row>
          <el-col :span="18">
            <el-input v-model="form.country" placeholder="例如武汉"></el-input
          ></el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="小区名称">
        <el-row>
          <el-col :span="18">
            <el-input
              v-model="form.community"
              placeholder="请输入小区名:例如汤臣一品"
            ></el-input
          ></el-col>
        </el-row>
      </el-form-item>
      <!-- <el-form :inline="true"> -->
      <el-form-item label="房屋地址">
        <el-row>
          <el-row :span="19" style="display:flex;justify-content:start;">
            <el-col :span="6">
              <el-input
                v-model="form.floor"
                placeholder="楼栋号"
                style="width: 210px;"
              ></el-input
            ></el-col>
            <el-col :span="6">
              <el-input
                v-model="form.cell"
                placeholder="单元号"
                style="width: 210px;"
              ></el-input
            ></el-col>
            <el-col :span="6">
              <el-input
                v-model="form.hnumber"
                placeholder="门牌号"
                style="width: 220px;"
              ></el-input></el-col
          ></el-row>
        </el-row>
      </el-form-item>
      <el-form-item label="其他信息">
        <el-row>
          <el-row :span="19" style="display:flex;justify-content:start;">
            <el-col :span="6" style="display:flex;justify-content:start;">
              <el-input
                v-model="form.houseArea"
                placeholder="房屋面积,例如70㎡"
                style="width: 200px;font-size:12px"
              ></el-input
              ><el-col :span="3" style="font-size:10px">㎡</el-col></el-col
            >
            <el-col :span="6">
              <el-input
                v-model="form.houserDirection"
                placeholder="朝向"
                style="width: 200px;"
              ></el-input
            ></el-col>
            <el-col :span="6">
              <el-input
                v-model="form.housePattern"
                placeholder="房屋格局，如两室一厅"
                style="width:220px;font-size:12px"
              ></el-input></el-col
          ></el-row>
        </el-row>
      </el-form-item>

      <el-form-item label="出租方式" style="float: left;margin-right: 76px;">
        <el-row :span="8" style="display:flex;justify-content:start;">
          <el-col :span="24">
            <el-select
              v-model="form.rendMethod"
              placeholder="请选择"
              style="width: 110%;"
            >
              <el-option label="整租" value="整租"></el-option>
              <el-option label="合租" value="合租"></el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="是否有电梯" style="display:inline-block">
        <el-row :span="8">
          <el-col :span="24">
            <el-select
              v-model="form.elevator"
              placeholder="请选择"
              style="width: 110%;"
            >
              <el-option label="是" value="有电梯"></el-option>
              <el-option label="否" value="无电梯"></el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="最近的出行工具">
        <el-row>
          <el-col :span="10"
            ><el-input
              v-model="form.traffic"
              placeholder="例如公交、地铁"
            ></el-input
          ></el-col>
          <el-col :span="2" style="margin-left:10px"
            ><el-input
              v-model="form.distance"
              placeholder="例如200m"
            ></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="房屋图片">
        <el-upload
          class="upload-demo"
          action="/api/izukeoss/upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture-card"
          :on-success="handerSuccess"
        >
          <el-button size="big" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-upload>
      </el-form-item>
      <el-form-item label="期望售价">
        <el-row style="display:flex;justify-content:start">
          <el-col :span="17">
            <el-input
              v-model="form.money"
              placeholder="请输入您期望出租的价格"
            ></el-input>
          </el-col>
          <el-col :span="6" style="margin-left:10px"
            ><span>元 / 月</span></el-col
          >
        </el-row>
      </el-form-item>
      <!-- </el-form> -->
      <el-form-item label="称呼">
        <el-row>
          <el-col :span="18">
            <el-input
              v-model="form.name"
              placeholder="我们该如何称呼您"
            ></el-input
          ></el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-row>
          <el-col :span="18">
            <el-input
              v-model="form.phonnumber"
              placeholder="填写您的联系方式，以便我们可以及时联系您"
            ></el-input
          ></el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-col :span="18">
            <el-button type="primary" style="width:200px;" @click="submit"
              >提交</el-button
            ></el-col
          >
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  data() {
    return {
      form: {
        country: "",
        community: "",
        floor: "",
        cell: "",
        houserDirection: "",
        houseArea: "",
        housePattern: "",
        rendMethod: "",
        elevator: "",
        traffic: "",
        distance: "",
        hnumber: "",
        money: "",
        name: "",
        phonnumber: "",
        images: []
      },
      fileList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      active: 0
    };
  },
  methods: {
    // file返回已删除的信息，filelist返回存在的信息
    handleRemove(file, fileList) {
      let img = [];

      this.fileList.forEach((item, index, arr) => {
        if (item.url == file.url) {
          arr.splice(index, 1);
        } else {
          img.push(item.url);
        }
      });
      this.form.images = img;
      console.log("form", this.form);
    },
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      console.log(this.form.images);
    },
    handerSuccess(file) {
      if (file.code == 200) {
        this.fileList.push(file.data.url);
        this.form.images.push(file.data.url.url);
      }
      console.log(this.form.images);
      console.log(file);
    },
    submit() {
      this.$API.pubhome
        .submitHomeInfo(this.form)
        .then(result => {
          if ((result.data.code = 200)) {
            this.$message.success(
              "提交成功,请耐心等待平台审核，审核通过后将以邮件的方式发送到您的邮箱！"
            );

            Object.assign(this.$data, this.$options.data());

            this.active = 1;
            this.$scrollTo();
          } else {
            this.$message.warning("提交失败");
          }
        })
        .catch(err => {});
      // this.active = 1;
    }
  },

  mounted() {}
};
</script>

<style scoped>
.form {
  width: 1000px;
  margin: 0 auto;
  margin-top: 55px;
}
.el-input >>> .el-input__inner {
  border: none;
  border-radius: 0;
  border-bottom: 1px solid rgb(200, 193, 193);
}
</style>
