<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
.img-scale {
  width: 100%;
  display: block;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.clearfix::after {
  display: block;
  content: "";
  clear: both;
}
.font-color {
  color: #fff;
}
p{
  margin: 0;
  padding: 0;
}
.img-scale {
  width: 100%;
  display: block;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.clearfix::after {
  display: block;
  content: "";
  clear: both;
}
</style>
