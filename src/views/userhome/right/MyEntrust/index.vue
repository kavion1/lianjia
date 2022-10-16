<template>
  <div>
    <h3 style="font-size:20px;margin:10px 0;text-align: center;">我的委托</h3>
    <el-table
      border
      v-loading="loading"
      :data="myhomeinfo"
      style="width: 100%;opacity: 0.7;"
      max-height="400"
    >
      <el-table-column
        fixed
        prop="gmtModified"
        label="发布日期"
        width="150"
        align="center"
        sortable
      >
      </el-table-column>
      <el-table-column prop="country" label="城市" width="80" align="center">
      </el-table-column>
      <el-table-column prop="community" label="小区" width="120" align="center">
      </el-table-column>

      <el-table-column prop="address" label="地址" width="300">
      </el-table-column>
      <el-table-column prop="money" label="价格(元)" width="80" align="center">
      </el-table-column>
      <el-table-column prop="del" label="房源状态" width="120">
        <template slot-scope="{ row, $index }">
          <el-tag :type="row.del == false ? 'warning' : 'success'">{{
            row.del == false ? "未上架" : "已上架"
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="{ row, $index }">
          <el-button
            @click.native.prevent="deleteRow($index, row)"
            :type="row.del == false ? 'success' : 'warning'"
            size="small"
          >
            {{ row.del == true ? "下架" : "上架" }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="5"
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
  name: "MyEntrust",
  data() {
    return {
      myhomeinfo: [],
      page: 1,
      total: 0,
      loading: false,
      statu: ""
    };
  },
  methods: {
    handleClick() {},
    gethomeinfo() {
      this.loading = true;
      this.$API.user.gethomeinfo(this.page, 5).then(res => {
        this.total = res.data.data.total;
        this.myhomeinfo = res.data.data.houselist;
        console.log(this.myhomeinfo);
        this.myhomeinfo.forEach(item => {
          return (
            (item.gmtModified = item.gmtModified.split(" ")[0]),
            (item.address = `${item.country}市${item.community}小区${item.cell}${item.floor}${item.hnumber}`)
          );
        });
        this.loading = false;
      });
    },
    current_change(pager = 1) {
      this.page = pager;
      this.gethomeinfo();
    },
    deleteRow(a, row) {
      this.$API.user.SoldOut({ del: 0, ids: [row.houseid] }).then(res => {
        this.gethomeinfo();
        if (row.del == true) {
          this.$message.warning("下架成功");
        } else {
          this.$message.success("上架成功");
        }
        console.log(row.del);
      });
    }
  },
  computed: {},
  created() {
    this.gethomeinfo();
  }
};
</script>

<style></style>
