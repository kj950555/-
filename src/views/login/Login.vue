<template>
  <div class="login">
    <div class="interface">
      <div class="login_screen">
        <div class="title">E-commerce management system</div>
        <div class="title">欢迎来到小小电商后台管理系统</div>
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="formLabelAlign"
        >
          <div class="import clearfix">
            <i class=" "
              ><img
                class="img-scale"
                src="../../assets/icon/dengluyonghu.png"
                alt=""
            /></i>
            <el-input v-model="formLabelAlign.username"></el-input>
          </div>
          <div class="import  ">
            <i class=" "
              ><img class="img-scale" src="../../assets/icon/mima.png" alt=""
            /></i>
            <el-input
              v-model="formLabelAlign.password"
              show-password
            ></el-input>
          </div>
          <div class="bnt">
            <el-button @click="Longin" type="primary" round>登录</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "right",
      formLabelAlign: {
        username: "",
        password: "",
      },
      name: "Home",
    };
  },
  created() {},
  methods: {
    Longin() {
      this.axios({
        method: "post",
        url: "/login",
        data: {
          username: this.formLabelAlign.username,
          password: this.formLabelAlign.password,
        },
      })
        .then((result) => {
          
          if (result.data.meta.status == 200) {
            localStorage.setItem("token", result.data.data.token);
            this.$router.push({ name: this.name });
          }
        })
        .catch((err) => {
          
        });
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  background-image: linear-gradient(
    to bottom,
    #8fcbf8,
    #cddcf8,
    #5e94d7,
    #8fcbf8
  );
  position: fixed;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  .interface {
    width: 300px;
    height: 380px;
    background-color: #f9f9f9;
    border-radius: 10px;
    overflow: hidden;
    position: absolute;
    top: 150px;
    right: 180px;
    box-shadow: 1px 5px 20px #000;
    .login_screen {
      width: 240px;
      margin: 20px auto;
      .title {
        color: #3587ed;
        font-size: 16px;
        text-align: center;
        margin-top: 20px;
        font-family: 800;
      }
      .import {
        margin-top: 30px;
        position: relative;
        i {
          width: 20px;
          height: 20px;
          margin: 10px 10px;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 99;
        }
      }
      .bnt {
        margin-top: 40px;
      }
    }
  }
  /deep/ .el-input__inner {
    width: 240px;
    margin: 0;
    padding: 0;
    text-indent: 40px;
  }
}
/deep/ .el-button.is-round {
  width: 100%;
}
</style>
