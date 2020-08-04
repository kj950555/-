// 过滤器文件
// 全局注册时间转换过滤器
import Vue from "vue";
Vue.filter("mmsgFormat", function(time) {
    let date = new Date(time * 1000);
    let year = date.getFullYear();
    let month = date.getMonth() + 1 <10 ? '0' +(date.getMonth() + 1) :date.getMonth() + 1;
    let day = date.getDate() < 10 ? '0'+ date.getDate() :date.getDate();
    let currentTime = `${year}-${month}-${day}`;
    return currentTime;
  });