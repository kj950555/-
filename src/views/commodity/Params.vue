script<template>
  <div class="params">
    <div class="search">
      <el-cascader
        expand-trigger="hover"
        :options="classify"
        :props="cateProps"
        v-model="content"
        @change="handleChange"
      ></el-cascader>
    </div>
    <div class="table">
      <el-button
        size="medium"
        type="success"
        :disabled="on_off"
        @click="Display"
        >添加</el-button
      >
      <el-table :data="property" style="width: 100%">
        <el-table-column label="id" width="180" prop="attr_id">
        </el-table-column>
        <el-table-column label="名称" width="220" prop="attr_name">
        </el-table-column>
        <el-table-column label="标签" width="300" prop="attr_vals">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="属性名称" :visible.sync="dialogTableVisible">
      <el-form>
        <el-form-item label="活动名称">
          <el-input autocomplete="off" v-model="name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="AddAttribute">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 分类列表
      classify: [],
      content: [],
      cateProps: {
        label: "cat_name",
        value: "cat_id",
        children: "children",
      },
      property: [],
      on_off: true,
      dialogTableVisible: false,
      name: "",
      ctaID: 0,
    };
  },
  created() {
    this.Parameter();
  },
  methods: {
    // 获取分类参数
    Parameter() {
      this.axios({
        method: "get",
        url: "/categories",
        data: this.query,
      })
        .then((result) => {
          // 
          if (result.data.meta.status == 200) {
            this.classify = result.data.data;
            // 
          }
        })
        .catch((err) => {
          
        });
    },
    //  获取动态属性
    PostlabeltTag(id) {
      this.axios({
        method: "get",
        url: `categories/${id}/attributes`,
        params: {
          sel: "many",
        },
      })
        .then((result) => {
          
          if (result.data.meta.status == 200) {
            this.property = result.data.data;
            
          }
        })
        .catch((err) => {
          
        });
    },
    //  动态参数
    AdditiveAttribute(id, name) {
      this.axios({
        method: "post",
        url: `categories/${id}/attributes`,
        data: {
          attr_name: name,
          attr_sel: "many",
        },
      })
        .then((result) => {
          // 
          this.PostlabeltTag(this.content[2]);
        })
        .catch((err) => {
          
        });
    },
    //  删除参数
    DeleteTheParameter(id, attrid) {
      this.axios({
        method: "delete",
        url: `categories/${id}/attributes/${attrid}`,
      })
        .then((result) => {
          
            this.PostlabeltTag(id);
        })
        .catch((err) => {
          
        });
    },
    // 选中分类
    handleChange() {
      if (this.content.length !== 3) {
        this.on_off = true;
        this.content = [];
        this.$message.error("请选择三级分类，你没有选择三级分类");
        return;
      }
      this.on_off = false;
      this.PostlabeltTag(this.content[2]);
    },
    // 编辑
    handleEdit(index, row) {
      this.dialogTableVisible = true;
    },
    // 删除
   async handleDelete(index, row) {
       let determineTheData = await this.$confirm(
        "此操作将永久删除分类, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (determineTheData !== "confirm") {
        this.$message.info("已经取消删除！");
      } else {
        // 删除请求
        this.ctaID = this.content[2];
        this.DeleteTheParameter(this.ctaID, row.attr_id);
         this.$message.success("删除成功");
      }
    },
    Display() {
      this.ctaID = this.content[2];
      this.dialogTableVisible = true;
    },
    // 添加
    AddAttribute() {
      this.AdditiveAttribute(this.ctaID, this.name);
      this.dialogTableVisible = false;
    },
  }
};
</script>

<style lang="less" scoped>
.params {
  width: 100%;
  height: 600px;
  background-color: #eaedf1;
}
.search {
  margin-left: 20px;
}
.table {
  margin: 20px;
}
</style>
