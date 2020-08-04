<template>
  <div class="reports">
    <el-card>
      <div id="main" ref="main" style="width: 600px;height:400px;"></div>
    </el-card>
  </div>
</template>

<script>
import echarts from "echarts"
import _ from 'lodash'
export default {
  data() {
    return {
      option :{
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    };
  },
  created(){
  },
  mounted() {
    this.MyChart();
  },
  methods: {
   
    //  图表
   async MyChart() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(this.$refs.main);
      // 使用刚指定的配置项和数据显示图表。
       const {data:res} = await this.$http.get("reports/type/1")
      
      if(res.meta.status !== 200){
         return this.$message.error('获取折线图数据失败！')
      }
     const statement = _.merge(res.data , this.option)
         myChart.setOption(statement);
    },
    // 获取数据表
    
  },
};
</script>

<style lang="less" scoped>
.reports {
 padding: 20px;
 background: #fff;
 
}
</style>