<template>
  <div>
    <el-table
      :data="attentionhouse"
      style="width: 150%;opacity: 0.6;"
      v-loading="loading"
      v-show="attentionhouse.length > 0"
    >
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="" label="房源名称" width="180">
        <template slot-scope="{ row }">
          <p>
            {{
              `${row.country}市${row.community}小区${row.cell}${row.floor}${row.hnumber}`
            }}
          </p>
        </template>
      </el-table-column>
      <el-table-column label="房源图片" width="180">
        <template slot-scope="{ row }">
          <img :src="row.images[0]" alt="" style="width:100px;height:100px" />
        </template>
      </el-table-column>
      <el-table-column prop="money" label="价格(元/月)" width="100">
      </el-table-column>
      <el-table-column prop="del" label="状态" width="100">
        <template slot-scope="{ row }">
          <el-tag :type="row.del == true ? 'primary' : 'warning'">{{
            row.del == true ? "在租" : "已租"
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="{ row, $index }">
          <el-button
            size="small"
            @click="cancelattention($index, row)"
            type="danger"
            >取消关注</el-button
          >
          <el-button size="small" @click="tohouseinfo(row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-empty
      v-loading="loading"
      description="您还没有关注过房源哟！"
      v-show="attentionhouse.length == 0"
    ></el-empty>
    <el-pagination
      :page-size="3"
      layout="prev, pager, next"
      :current-page="page"
      @current-change="current_change"
      :total="total"
      style="opacity:0.5;margin-top: 1rem;"
      align="right"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      attentionhouse: [],
      page: 1,
      total: 0,
      loading: false
    };
  },
  methods: {
    getattention() {
      this.loading = true;
      this.$API.user.userattention(this.page, 3).then(res => {
        if (res.data.code == 200) {
          this.loading = false;
          this.attentionhouse = res.data.data.houselist;
          this.total = res.data.data.total;
        } else {
          Object.assign(this.$data, this.$options.data());
          this.loading = false;
        }
      });
    },
    current_change(pager = 1) {
      this.page = pager;
      this.getattention();
    },
    cancelattention($index, row) {
      console.log(row.houseid);
      this.$API.exhibitionhome.unattentionhouse(row.houseid).then(res => {
        if (res.data.code == 200) {
          this.$message.success("取消成功");
          this.getattention();
        }
      });
    },
    tohouseinfo(row) {
      this.$router.push({
        path: "/homedisplay",
        query: { id: row }
      });
    }
  },
  created() {
    this.getattention();
  }
};
</script>

<style></style>
