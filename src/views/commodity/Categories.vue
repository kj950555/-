<template>
  <div class="params">
    <div class="custom-tree-container">
      <div class="block">
        <div class=" clearfix">
          <div class="fl">
            <p>商品分类</p>
          </div>
          <div class="fr cladd">
            <el-button type="success" @click="AddSubtotal" round
              >添加分类</el-button
            >
          </div>
        </div>
        <el-tree :data="classify" node-key="cat_id">
          <div class="branch clearfix" slot-scope="{ node, data }">
            <div class="fl">
              <span>{{ data.cat_name }}</span>
            </div>

            <div class="fr btn">
              <!-- 删除 -->
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="() => append(data)"
                size="mini"
                circle
              ></el-button>
              <!-- 添加 -->
              <el-button
                type="success"
                icon="el-icon-plus"
                @click="() => addition(data)"
                size="mini"
                circle
              ></el-button>
            </div>
            <div class="fr tag">
              <el-tag
                :type="grade[data.cat_level].type"
                :color="grade[data.cat_level].colour"
                >{{ grade[data.cat_level].rank }}</el-tag
              >
            </div>
          </div>
        </el-tree>
      </div>
    </div>
    <!-- 添加分类 -->
    <el-dialog title="添加分类" :visible.sync="dialogTableVisible">
      <el-form
        :model="subject"
        ref="subject"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- 面包碎 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="(inem, index) in crumb" :key="index">{{
            inem.cat_name
          }}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form-item
          label="输入分类名"
          prop="cat_name"
          :rules="[
            { required: true, message: '你输入的分类名为空', trigger: 'blur' },
            {
              min: 2,
              max: 15,
              message: '长度在 2 到 15 个字',
              trigger: 'blur',
            },
          ]"
        >
          <el-input
            type="cat_name"
            v-model.number="subject.cat_name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('subject')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入vuex
import { createNamespacedHelpers } from "vuex";
const { mapMutations, mapState } = createNamespacedHelpers("menuModule");
export default {
  data() {
    return {
      classify: [],
      query: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      grade: [
        { rank: "一级", colour: "#FEF0F0", type: "danger" },
        { rank: "二级", colour: "#FDF6EC", type: "warning" },
        { rank: "三级", colour: "#F0F9EB", type: "success" },
      ],
      // 面包碎
      crumb: [],
      compile: "Compile",
      labelPosition: "right",
      // 分支

      defaultProps: {
        children: "children",
        label: "label",
      },
      dialogTableVisible: false,
      subject: {
        cat_pid: 0,
        cat_name: "",
        cat_level: 0,
      },
      // 提示
    };
  },
  created() {
    this.Parameter();
  },
  methods: {
    // 解构
    ...mapMutations(["getParameter"]),
    // 获取所有分类数据
    Parameter() {
      this.axios({
        method: "get",
        url: "/categories",
        data: this.query,
      })
        .then((result) => {
          
          if (result.data.meta.status == 200) {
            this.classify = result.data.data;
             this.getParameter({valu:result.data.data })
            
          }
        })
        .catch((err) => {
          
        });
    },
    // 添加数据分类
    Add() {
      this.axios({
        method: "post",
        url: "/categories",
        data: this.subject,
      })
        .then((res) => {
          if (res.data.meta.status == 201) {
            this.Parameter();
          }
        })
        .catch((err) => {
          
        });
    },
    // 删除分类
    Delete(id) {
      this.axios({
        method: "delete",
        url: `/categories/${id}`,
      })
        .then((res) => {
          if (res.data.meta.status == 200) {
            this.Parameter();
          }
        })
        .catch((err) => {
          
        });
    },
    //  删除
    async append(data) {
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
        this.Delete(data.cat_id);
        this.$message.success("删除成功");
      }

      
    },
    // 添加功能
    addition(data) {
      if(data.cat_level == 2 ){
        return this.$message.info("这是最后了！无法创建");
      };
      this.crumb = [];
      this.subject.cat_pid = data.cat_id;

      this.subject.cat_level = data.cat_level+1;
      this.dialogTableVisible = true;
      this.crumb.push({ cat_name: data.cat_name });
    },
    // 编辑
    remove(data) {
      
    },
    // 一级添加分类
    AddSubtotal() {
      this.crumb = [];
      this.dialogTableVisible = true;
      this.crumb.push({ cat_name: "一级分类" });
    },
    // 确定按钮
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.Add();
          this.dialogTableVisible = false;
          this.$message.success("创建成功");
          return;
        } else {
          
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.params{
  background-color: #fff;
  margin: 0px 10px;
  border-radius: 10px;
}
.branch {
  width: 100%;
  height: 60px;
  .btn {
    margin-right: 30px;
  }
}
.cladd {
  margin-right: 30px;
  margin-top: 20px;
}
.tag {
  margin-right: 50px;
}
/deep/ .el-tree-node__content {
  height: 60px;
  line-height: 60px;
}
</style>
