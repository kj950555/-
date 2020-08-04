<template>
  <div class="goods">
    <template>
      <div class=" clearfix">
      <div class="search fl">
        <el-input
          placeholder="请输入内容"
          v-model="query.query"
          class="input-with-select"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="Search"
          ></el-button>
        </el-input>
      </div>
      <div class="fr cladd">
        <el-button type="success" @click="Compile" round>添加商品</el-button>
      </div>
      </div>
      <el-table :data="tableData" stripe border width="1100">
        <el-table-column prop="goods_id" label="商品ID" width="60">
        </el-table-column>
        <el-table-column prop="goods_name" label="商品名字" width="300">
        </el-table-column>
        <el-table-column prop="goods_price" label="价格(元)" width="60">
        </el-table-column>
        <el-table-column prop="Radd_time" label="添加时间" width="170">
          <template slot-scope="scope">
            {{ scope.row.add_time | mmsgFormat }}
          </template>
        </el-table-column>
        <el-table-column prop="upd_time" label="更新时间" width="170">
          <template slot-scope="scope">
            {{ scope.row.upd_time | mmsgFormat }}
          </template>
        </el-table-column>
        <el-table-column prop="goods_number" label="数量" width="60">
        </el-table-column>
        <el-table-column prop="goods_weight" label="重量" width="60">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="DialogVisible(scope.$index, scope.row)"
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
    </template>
    <!-- 分页 -->
    <el-pagination
      @size-change="PagingDevice"
      @current-change="Pagination"
      background
      :current-page="query.pagenum"
      :page-size="query.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="1000"
    >
    </el-pagination>

    <el-dialog title="编辑商品" :visible.sync="centerDialogVisible">
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="commodity"
      >
        <span>商品ID：{{ commodity.id }}</span>
        <el-divider></el-divider>
        <el-form-item label="商品名称">
          <el-input v-model="commodity.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="价格(元)">
          <el-input v-model="commodity.goods_price"></el-input>
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model="commodity.goods_number"></el-input>
        </el-form-item>
        <el-form-item label="重量">
          <el-input v-model="commodity.goods_weight"></el-input>
        </el-form-item>
        <el-form-item label="介绍">
          <el-input v-model="commodity.goods_introduce"></el-input>
        </el-form-item>
        <el-form-item label="上传图片">
          <el-upload
            class="avatar-uploader"
            action="http://timemeetyou.com:8889/api/private/v1/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="分类">
          <el-input></el-input>
        </el-form-item>
        <el-button type="primary" @click="Putin" round>提交</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import LoginVue from "../login/Login.vue";
export default {
  data() {
    return {
      centerDialogVisible: false,
      query: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      tableData: [],
      compile: "Compile",
      labelPosition: "right",
      goodsID: 0,
      commodity: {
        goods_name: "",
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0,
        goods_introduce: "",
        pics: [],
        attrs: [
          {
            cat_deleted: false,
            cat_id: 513,
            cat_level: 0,
            cat_name: "个护健康",
            cat_pid: 0,
          },
        ],
      },
      imageUrl: "",
      
    };
  },
  created() {
    this.Categories();
  },

  methods: {
    Compile() {
      this.$router.push({ name: this.compile });
    },
    Categories() {
      // 
      this.axios({
        method: "get",
        url: "/goods",
        params: this.query,
      })
        .then((result) => {
          //   
          if (result.data.meta.status == 200) {
            // 
            this.tableData = result.data.data.goods;
            // 
          }
        })
        .catch((err) => {
          
        });
    },
    // 编辑数据
    DialogVisible(index, row) {
      this.centerDialogVisible = true;
      this.goodsID = row.goods_id;
      
    },
    // 删除
    handleDelete(index, row) {
      this.removeById(row.goods_id);
    },
    // 设置页面多少条数据
    PagingDevice(index) {
      this.query.pagesize = index;
      this.Categories();
    },
    // 页面跳转上一页下一页
    Pagination(index) {
      this.query.pagenum = index;
      this.Categories();
    },
    // 搜索数据
    Search() {
      this.Categories();
    },
    // 删除数据
    async removeById(id) {
      let determineTheData = await this.$confirm(
        "此操作将永久删除该文件, 是否继续?",
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
        const { data: res } = await this.$http.delete(`goods/${id}`);
        // 判断是否成功，成功刷新页面
        if (res.meta.status == 200) {
          this.Categories();
        }
        this.$message.success(res.meta.msg);
      }
    },
    delete(id) {
      this.axios({
        method: "delete",
        url: `attributes/${id}`,
      })
        .then((result) => {
          
        })
        .catch((err) => {
          
        });
    },
    // 图片上传
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    Putin() {
      this.commodity.pics.push({ pics: this.imageUrl });
      this.axios({
        method: "put",
        url: `goods/${this.goodsID}/`,
        data: this.commodity,
      })
        .then((result) => {
          
        })
        .catch((err) => {
          
        });
      
    },
  },
};
</script>

<style lang="less" scoped>
.goods {
  margin: 10px;
  .search {
    width: 500px;
    margin-bottom: 15px;
  }
  .redact {
    position: fixed;
    width: 500px;
    height: 550px;
    top: 60px;
    left: 50%;
    margin-left: -250px;
    z-index: 999;
    background-color: #fff;
    border-radius: 15px;
    .close {
      width: 20px;
      height: 20px;
      text-align: center;
      border: 1px solid #868686;
      border-radius: 50%;
      margin: 10px;
      line-height: 20px;
    }
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
