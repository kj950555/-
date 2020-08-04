<template>
  <div class="orders">
    <div class=" clearfix">
      <div class="search fl">
        <el-input placeholder="请输入内容" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      
    </div>
    <el-table :data="orders" style="width: 100%">
      <el-table-column label="订单id" width="120" prop="create_time">
      </el-table-column>
      <el-table-column label="订单" width="180" prop="order_number">
      </el-table-column>
      <el-table-column label="标签" width="80" prop="order_fapiao_title">
      </el-table-column>
      <el-table-column label="是否发货" width="100" prop="is_send">
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

    <el-pagination
      @size-change="PagingDevice"
      @current-change="Pagination"
      background
      :current-page="TheOrderParameter.pagenum"
      :page-size="TheOrderParameter.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="1000"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: [],
      //   请求参数
      TheOrderParameter: {
        query: "",
        pagenum: 1,
        pagesize: 10,
        user_id: "",
        pay_status: "",
        is_send: "",
        order_fapiao_title: "",
        order_fapiao_company: "",
        order_fapiao_content: "",
        consignee_addr: "",
      },
    };
  },
  created() {
    this.OrderData();
  },
  methods: {
    OrderData() {
      this.axios({
        method: "get",
        url: `/orders`,
        params: this.TheOrderParameter,
      })
        .then((res) => {
          
          if (res.data.meta.status == 200) {
            this.orders = res.data.data.goods;
            
          }
        })
        .catch((err) => {
          
        });
    },
    // 编辑
    handleEdit(index, row) {},
    //  删除
    handleDelete(index, row) {},
    // 页面
    PagingDevice(index) {
      
      this.TheOrderParameter.pagesize = index
      this.OrderData();
    },
    Pagination(index) {
      
      this.TheOrderParameter.pagenum = index
      this.OrderData();
    },
  },
};
</script>

<style lang="less" scoped>
.orders {
  padding: 20px;
  .search {
    width: 500px;
    margin-bottom: 20px;
  }
  .cladd {
    margin-bottom: 20px;
  }
}
</style>
