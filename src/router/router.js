// 导出路由文件
export const routes = [
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
    children: [
      // 商品管理
      {
        path: "/categories",
        name: "Categories",
        // 懒加载
        component: () => import("../views/commodity/Categories.vue"),
      },
      {
        path: "/goods",
        name: "Goods",
        component: () => import("../views/commodity/Goods.vue"),
        children: [
         
        ],
      },
       // 添加商品
       {
        path: "/compile",
        name: "Compile",
        component: () => import("../views/commodity/amend/Compile.vue"),
      },
      {
        path: "/params",
        name: "Params",
        component: () => import("../views/commodity/Params.vue"),
      },
      // 权限管理
      {
        path: "/rights",
        name: "Rights",
        component: () => import("../views/jurisdiction/Rights.vue"),
      },
      {
        path: "/roles",
        name: "Roles",
        component: () => import("../views/jurisdiction/Roles.vue"),
      },
      // 订单管理
      {
        path: "/orders",
        name: "Orders",
        component: () => import("../views/orderForm/Orders.vue"),
      },
      // 数据报表
      {
        path: "/reports",
        name: "Reports",
        component: () => import("../views/statistics/Reports.vue"),
      },
      // 用户数据
      {
        path: "/users",
        name: "Users",
        component: () => import("../views/users/Users.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login/Login.vue"),
  },
  // 默认页面
  {
    path: "*",
    redirect: {
      name: "Login",
    },
  },
];
