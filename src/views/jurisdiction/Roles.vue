<template>
  <div class="orders">
    <el-table :data="TheRolelist" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
         <el-row :class="['bdbottom', i1 === 0 ? 'bdtop' : '', 'vcenter']" v-for="(item1, i1) in scope.row.children" :key="item1.id">
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag v-model="deleteTag" closable @close="removeRightById(scope.row, item1.id)">{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二级和三级权限 -->
              <el-col :span="19">
                <!-- 通过 for 循环 嵌套渲染二级权限 -->
                <el-row :class="[i2 === 0 ? '' : 'bdtop', 'vcenter']" v-for="(item2, i2) in item1.children" :key="item2.id">
                  <el-col :span="6">
                    <el-tag type="success" closable @close="removeRightById(scope.row, item2.id)">{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag type="warning" v-for="item3 in item2.children" :key="item3.id" closable @close="removeRightById(scope.row, item3.id)">{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
        </template>
      </el-table-column>
      <el-table-column label="id" prop="id"></el-table-column>
      <el-table-column label="角色名" prop="roleDesc"></el-table-column>
      <el-table-column label="描述" prop="roleDesc"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      TheRolelist: [],
      deleteTag:false
    };
  },
  created() {
    this.AcquireRole();
  },
  methods: {
    AcquireRole() {
      this.axios({
        method: "get",
        url: `/roles`,
      })
        .then((res) => {
          
          if (res.data.meta.status == 200) {
            this.TheRolelist = res.data.data;
            
          }
        })
        .catch((err) => {
          
        });
    },
   removeRightById( row, id ) {


      // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      
      
      
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
  .el-tag {
  margin: 7px;
}

.bdtop {
  border-top: 1px solid #eee;
}

.bdbottom {
  border-bottom: 1px solid #eee;
}

.vcenter {
  display: flex;
  align-items: center;
}
}
</style>
