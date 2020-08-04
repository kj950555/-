<template>
  <div class="orders">
    <el-table :data="RighteList" style="width: 100%">
      <el-table-column type="index" width="200"> </el-table-column>
      <el-table-column prop="authName" label="权限名称" width="200">
      </el-table-column>
      <el-table-column prop="path" label="路径" width="200"> </el-table-column>
      <el-table-column label="等级" width="200">
        <template slot-scope="scope">
          <el-tag  :type="grade[scope.row.level].type"
           :color="grade[scope.row.level].colour"
          >{{ grade[scope.row.level].rank }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      RighteList: [],

      grade: [
        { rank: "一级", colour: "#FEF0F0", type: "danger" },
        { rank: "二级", colour: "#FDF6EC", type: "warning" },
        { rank: "三级", colour: "#F0F9EB", type: "success" },
      ],
    };
  },
  created() {
    this.AccessData();
  },
  methods: {
    AccessData() {
      this.axios({
        method: "get",
        url: `rights/list`,
      })
        .then((res) => {
          
          if (res.data.meta.status == 200) {
            this.RighteList = res.data.data;
            
          }
        })
        .catch((err) => {
          
        });
    },
  },
};
</script>

<style lang="less" scoped>
.orders {
  padding: 20px;
  border-radius: 10px;
  overflow: hidden;
  .branch {
    width: 100%;
    height: 60px;
  }
  .tag {
    margin-right: 60px;
  }
}
/deep/ .el-tree-node__content {
  height: 60px;
  line-height: 60px;
}
</style>
