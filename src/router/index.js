// 导入vue
import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'
// 导入路由路径文件
import {routes} from './router'
// 注册路由组件
Vue.use(VueRouter)


export default new VueRouter({
  routes
})
