<template>
  <div class="home">
    <!-- 顶部导航 -->
    <div class="head clearfix">
      <div class="fl name">
        <i class="el-icon-share"></i><span>商城管理系统</span>
      </div>
      <div class="fr abandon clearfix ">
        <div class="fl custodian">管理人</div>
        <div class="fl clearfix">
          <i class="icon fl">
            <img class="img-scale" src="../assets/icon/quit.png" alt="" />
          </i>
          <span class="fl">退出</span>
        </div>
      </div>
    </div>
    <!-- 侧边导航 -->
    <div class="clearfix message">
      <div class="backdrop"></div>
      <div class=" sidebar fl">
        <div class="personal">
          <div class="portrait">
            <el-avatar shape="square" :size="50" src=""></el-avatar>
          </div>
          <div class="compellation">管理人</div>
          <div class="post">超级管理员</div>
        </div>

        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="transparent"
          text-color="#fff"
          active-text-color="#ffd04b"
          @open="handleOpen"
          :unique-opened="true"
        >
          <el-submenu
            :index="String(index)"
            v-for="(iten, index) in menus"
            :key="index"
          >
            <template slot="title">
              <i :class="icon[iten.id]"></i>
              <span>{{ iten.authName }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                :index="String(imen.id)"
                v-for="imen in iten.children"
                :key="imen.id"
                @click="Particular(imen)"
                >{{ imen.authName }}</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>

      <!-- 右边数据 -->
      <div class="content fl">
        <div class="crumbs">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="(iten, index) in crumbs" :key="index">{{
              iten.name
            }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!-- 二级路由 -->
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //  菜单列表
      menus: [],
      //  面包碎导航
      crumbs: [],
      on_off: false,
      icon: {
        "101": "el-icon-s-goods",
        "102": "el-icon-s-claim",
        "103": "el-icon-s-help",
        "125": "el-icon-user-solid",
        "145": "el-icon-s-data",
      },
      // 激活数字
      numberActivate: 0,
    };
  },
  created() {
    this.Menus();
  },
  methods: {
    Menus() {
      // 获取菜单
      //  
      this.axios({
        method: "get",
        url: "/rights/tree",
      })
        .then((result) => {
          // 
          if (result.data.meta.status == 200) {
            this.menus = result.data.data;
            // 
          }
        })
        .catch((err) => {
          
        });
    },
    getSetArr(arr) {
      return [...new Set(arr)];
    },
    // 点击获取详细情况
    Particular(imen) {
     
      if (imen.id === this.numberActivate) {
        return;
      }
      this.crumbs.push({ name: imen.authName });
      this.getSetArr(this.crumbs);
      this.numberActivate = imen.id;
      // 把字符第一个字母转成大写

      let Path = imen.path.charAt(0).toUpperCase() + imen.path.slice(1);
      this.$router.push({ name: Path });
    },
    handleOpen(key) {
      this.crumbs = [];
      this.crumbs.push({ name: this.menus[Number(key)].authName });
    },
    Bread(time) {
      // 
    },
  },
};
</script>
<style lang="less" scoped>
.home {
  height: 100%;
  .head {
    width: 100%;
    height: 52px;
    background-color: #63adfd;
    color: #fff;
    background-image: linear-gradient(to right, #63adfd, #9d71f9);
    .name {
      font-size: 18px;
      line-height: 52px;
      margin-left: 30px;
    }
    .abandon {
      margin-right: 20px;
      line-height: 52px;
      font-size: 12px;
      .icon {
        width: 20px;
        height: 20px;
        display: block;
        margin-top: 16px;
      }
      .custodian {
        margin-right: 20px;
      }
    }
  }
  .message {
    width: 100%;
    position: relative;
    .backdrop {
      position: fixed;
      width: 200px;
      top: 0;
      left: 0;
      bottom: 0;
      background-color: #3e495f;
      z-index: -1;
    }
    .sidebar {
      width: 200px;
      height: 100%;
      background-color: #3e495f;
      z-index: 2;
      .personal {
        width: 100%;
        height: 150px;
        text-align: center;
        color: #c9d3ea;
        .portrait {
          width: 50px;
          height: 50px;
          margin: 20px auto 16px;
        }
        .compellation {
          font-size: 14px;
          margin-bottom: 10px;
        }
        .post {
          font-size: 16px;
        }
      }
    }
    .content {
      width: calc(100% - 200px);
      background-color: #eaedf1;
    }
  }

  .crumbs {
    height: 60px;
  }
}
// 头部

/deep/ .el-breadcrumb {
  font-size: 14px;
  line-height: 60px;
}
</style>
