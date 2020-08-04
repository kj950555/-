<template>
  <div>
    <el-steps :active="initiate - 0" :space="200" align-center>
      <el-step title="商品名称"> </el-step>
      <el-step title="基本信息"></el-step>
      <el-step title="上传"></el-step>
      <el-step title="介绍"></el-step>
    </el-steps>

    <div class="formd">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-tabs
          @tab-click="tabClicked"
          v-model="initiate"
          style="height: 600px;"
          tab-position="left"
          :before-leave="verify"
        >
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="ruleForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="价格" type="number" prop="goods_price">
              <el-input-number v-model="ruleForm.goods_price"></el-input-number>
            </el-form-item>
            <el-form-item label="数量" type="number" prop="goods_number">
              <el-input-number
                v-model="ruleForm.goods_number"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="重量" type="number" prop="goods_weight">
              <el-input-number
                v-model="ruleForm.goods_weight"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="分类" prop="goods_cat">
              <el-cascader
                v-model="ruleForm.goods_cat"
                expand-trigger="hover"
                :options="classify"
                :props="cateProps"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="参数" name="1">
            <el-form-item label="商品关键字" prop="attrs">
              <el-checkbox-group v-model="ruleForm.attrs">
                <el-checkbox
                  :label="item.attr_name"
                  name="attrs"
                  v-for="(item, index) in labeltTag"
                  :key="index"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="上传" name="2">
            <el-upload
              class="upload-demo"
              :action="imageUrl"
              :headers="headerObj"
              :on-success="handleAvatarSuccess"
              :before-remove="beforeRemove"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="信息" name="4">
            <el-form-item label="介绍" prop="desc" size="small ">
              <el-input
                type="textarea"
                v-model="ruleForm.goods_introduce"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >添加商品</el-button
              >
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      initiate: "0",
      // 图片地址
      imageUrl: "http://timemeetyou.com:8889/api/private/v1/upload",

      fileList: [],
      // 图片上传请求头
      headerObj: {
        Authorization: localStorage.getItem("token"),
      },
      // 商品分类
      classify: [],
      cateProps: {
        label: "cat_name",
        value: "cat_id",
        children: "children",
      },
      // 动态属性
      labeltTag: [],
      // 提交参数
      ruleForm: {
        goods_name: "",
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        // 商品所属的分类数组
        goods_cat: [],
        // 图片的数组
        pics: [],
        // 商品的详情描述
        goods_introduce: "",
        attrs: [],
      },
      // 验证表单
      rules: {
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
        goods_cat: [
          { required: true, message: "请选择分类", trigger: "change" },
        ],
        goods_price: [{ required: true, message: "价格不能为空" }],

        goods_number: [{ required: true, message: "数量不能为空" }],

        goods_weight: [{ required: true, message: "重量不能为空" }],
      },
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
            
          }
        })
        .catch((err) => {
          
        });
    },
    //  添加商品信息
    AddTheGoods() {
      this.axios({
        method: "post",
        url: "/goods",
        data: this.ruleForm,
      })
        .then((result) => {
          // 

          this.$message.success("添加成功");
          this.$router.push({ name: "Goods" });
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
            this.labeltTag = result.data.data;
            
          }
        })
        .catch((err) => {
          
        });
    },
    //  提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.AddTheGoods();
        } else {
          this.$message.error("请认真把信息填好");
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //监听图片上传是否成功
    handleAvatarSuccess(res, file) {
      
      
      if (res.meta.status == 200) {
        let picIfo = { pic: res.data.tmp_path };
        this.ruleForm.pics.push(picIfo);
      } else {
        this.$message.error("图片提交失败，请重新上传");
      }
    },
    // 移除图片
    beforeRemove(file, fileList) {
      // 
      // 获取要删除的临时路径
      let filePath = file.response.data.tmp_path;
      //  获取删除坐标
      let index = this.ruleForm.pics.findIndex((x) => x.pic === filePath);
      // 删除图片数组
      this.ruleForm.pics.splice(index, 1);

      // 
    },

    verify(access, leave) {
      
      
      if (this.ruleForm.goods_cat.length !== 3 && leave == "0") {
        this.$message.error("请认真把信息填完");
        return false;
      }
      if (access == "4") {
        
      }
    },
    // 设置关卡
    tabClicked() {
      if (this.initiate == "1") {
        
        this.PostlabeltTag(this.ruleForm.goods_cat[2]);
      } else if (this.initiate == "2") {
        
      } else if (this.initiate == "3") {
        
      }
    },
    handleChange() {
      
      if (this.ruleForm.goods_cat.length !== 3) {
        this.ruleForm.goods_cat = [];
        this.$message.error("请选择三级分类，你没有选择三级分类");
      }
    },
  },
};
</script>

<style lang="less" scoped></style>
