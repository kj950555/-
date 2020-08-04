<template>
  <div class="users">
    <div class=" clearfix">
      <div class="search fl">
        <el-input
          placeholder="请输入用户id"
          v-model="UsersID"
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
        <el-button type="success" @click="dialogTableVisible = true" round
          >添加用户</el-button
        >
      </div>
    </div>
    <el-table :data="orders" style="width: 100%">
      <el-table-column label="id" width="80" prop="id"> </el-table-column>
      <el-table-column label="权限等级" width="100" prop="role_name">
      </el-table-column>
      <el-table-column label="用户名" width="80" prop="username">
      </el-table-column>
      <el-table-column label="用户邮箱" width="100" prop="email">
      </el-table-column>
      <el-table-column label="用户手机" width="100" prop="mobile">
      </el-table-column>
      <el-table-column label="创建时间" width="200px">
        <template slot-scope="scope">
          {{scope.row.create_time | mmsgFormat}}
        </template>
      </el-table-column>
      <el-table-column label="是否开启权限" width="200px">
        <template slot-scope="scope">
          <el-switch
            style="display: block"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="关闭"
            inactive-text="开启"
            @change="OpeNtoClose(scope.row)"
          >
          </el-switch>
        </template>
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

    <el-dialog title="属性名称" :visible.sync="dialogTableVisible">
      <el-form :rules="rules" ref="ruleForm" :model="codedLock">
        <el-form-item label="用户名" prop="username">
          <el-input autocomplete="off" v-model="codedLock.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="codedLock.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="codedLock.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input autocomplete="off" v-model="codedLock.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input autocomplete="off" v-model="codedLock.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="AddUsers('ruleForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <el-dialog title="属性名称" :visible.sync="compileVisible">
      <el-form :rules="rules" ref="compileForm" :model="redactData">
        <el-form-item label="邮箱" prop="email">
          <el-input autocomplete="off" v-model="redactData.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input autocomplete="off" v-model="redactData.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="compileVisible = false">取 消</el-button>
        <el-button type="primary" @click="CompileUsers('compileForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    // 用户名验证
    let RegularUser = (rule, value, callback) => {
      if (!this.regular.username.test(value)) {
        callback(
          new Error(
            "你输入的用户名格式不对，请输入6到16位（字母，数字，下划线，减号）"
          )
        );
      } else {
        this.BegAddUsers.username = value;
        callback();
      }
    };
    // 密码验证
    let ImportPass = (rule, value, callback) => {
      
      if (!this.regular.password.test(value)) {
        callback(
          new Error(
            "你输入的密码格式不对，请重新输入,字母+数字，字母+特殊字符，数字+特殊字符"
          )
        );
      } else {
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.codedLock.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        this.BegAddUsers.password = value;
        callback();
      }
    };
    let validateEmail = (rule, value, callback) => {
      if (!this.regular.email.test(value)) {
        callback(new Error("你输入的邮箱格式不正确"));
      } else {
        this.BegAddUsers.email = value;
        callback();
      }
    };
    let validateMobile = (rule, value, callback) => {
      if (!this.regular.mobile.test(value)) {
        callback(new Error("你输入的手机号不正确不正确"));
      } else {
        this.BegAddUsers.mobile = value;
        callback();
      }
    };
    return {
      // 编辑用户显示和隐藏
      compileVisible: false,
      // 添加用户隐藏与显示
      dialogTableVisible: false,
      UsersID: null,
      orders: [],
      //   请求参数
      TheOrderParameter: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      // 添加用户请求参数
      BegAddUsers: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      // 表单验证
      codedLock: {
        username: "",
        pass: "",
        checkPass: "",
        email: "",
        mobile: "",
      },
      // 正则验证
      regular: {
        username: /^[a-zA-Z0-9_-]{6,16}$/,
        password: /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/,
        mobile: /^[1][3,4,5,7,8][0-9]{9}$/,
        email: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
      },
      // 编辑请求数据
      redactData: {
        email: "",
        mobile: "",
      },
      // 验证表单
      rules: {
        username: [
          {
            validator: RegularUser,
            trigger: "blur",
          },
        ],
        pass: [{ validator: ImportPass, trigger: "blur" }],
        checkPass: [{ validator: validatePass, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
        mobile: [{ validator: validateMobile, trigger: "blur" }],
      },
    };
  },
  created() {
    this.OrderData();
  },
  methods: {
    OrderData() {
      this.axios({
        method: "get" ,
        url: `/users`,
        params:this.TheOrderParameter,
      })
        .then((res) => {
          
          if (res.data.meta.status == 200) {
            this.orders = res.data.data.users;
            
          }
        })
        .catch((err) => {
          
        });
    },
    // 添加用户请求
    PostAddUsers() {
      this.axios({
        method: "POST",
        url: `/users`,
        data: this.BegAddUsers,
      })
        .then((res) => {
          
          if (res.data.meta.status == 201) {
            this.$message.success(res.data.meta.msg);
            this.OrderData();
          } else {
            this.$message.error(res.data.meta.msg);
          }
        })
        .catch((err) => {
          
        });
    },
    // 删除用户请求
    async DeleteUsers(id) {
      let determineTheData = await this.$confirm(
        "此操作将永久删除改用户, 是否继续?",
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
        const { data: res } = await this.$http.delete(`users/${id}`);
        
        if (res.meta.status == 200) {
          this.OrderData();
        }
        this.$message.success(res.meta.msg);
      }
    },
    // 更新用户信息请求
    async EditTheRequest() {
      const { data: res } = await this.$http.put(`users/${this.UsersID}`, {
            email: this.redactData.email,
            mobile: this.redactData.mobile
          
      });
      
      if (res.meta.status == 200) {
        this.OrderData();
        this.$message.success(res.meta.msg);
      } else {
        this.$message.error(res.meta.msg);
      }
    },
    // 编辑
    handleEdit(index, row) {
      
      this.UsersID = row.id;
      this.compileVisible = true;
    },
    CompileUsers(compileForm) {
      let EditorialJudgment = this.$refs[compileForm].validate((valid) => {
        if (valid) {
          this.compileVisible = false;
          this.EditTheRequest();
          this.$refs[compileForm].resetFields();
          this.UsersID = null;
        } else {
          this.$message.error("所有信息不能为空");
          return false;
        }
      });
    },
    // 搜索
    async Search() {
       const { data: res } = await this.$http.get(`users/${this.UsersID}`);
       
        if (res.meta.status == 200) {
          this.orders = []
            this.orders.push(res.data);
            
          }else{
             this.$message.error("没有查询到你搜索的ID");
          }
    },
    //  删除
    handleDelete(index, row) {
      this.DeleteUsers(row.id);
    },
    // 添加用户
    AddUsers(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogTableVisible = false;
          this.PostAddUsers();
          this.$refs[formName].resetFields();
        } else {
          this.$message.error("所有信息不能为空");
          return false;
        }
      });
    },
    // 页面
    PagingDevice(index) {
      
      this.TheOrderParameter.pagesize = index;
      this.OrderData();
    },
    Pagination(index) {
      
      this.TheOrderParameter.pagenum = index;
      this.OrderData();
    },
    async OpeNtoClose(row) {
      // 
      const { data: res } = await this.$http.put(
        `users/${row.id}/state/${row.mg_state}`
      );
      if (res.meta.status !== 200) {
        row.mg_state = !row.mg_state;
        return this.$message.error("用户开启权限失败");
      }
      this.$message.success(res.data.mg_state ? "开启成功" : "关闭成功");
    },
  },
};
</script>

<style lang="less" scoped>
.users {
  padding: 20px;
}
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
