import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: '/home',
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/categories",
    name: "Categories",
    component: () => import("../views/Categories.vue"),
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
  },
  {
    path: "/my",
    name: "My",
    component: () => import("../views/My.vue"),
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("../views/Search.vue"),
    children: [
      {
        path: '/',
        name: 'SearchIndex',
        component: () => import("../views/Search/SearchIndex.vue")
      },
      {
        path: 'list',
        name: 'SearchList',
        component: () => import("../views/Search/SearchList.vue")
      }
    ]
  },
  {
    path: "/details",
    name: "Details",
    component: () => import("../views/Details.vue"),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login/Login.vue"),
  },
  {
    path: "/userLogin",
    name: "UserLogin",
    component: () => import("../views/Login/UserLogin.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Login/Register.vue"),
  },
  {
    path: "/recovery",
    name: "Recovery",
    component: () => import("../views/Recovery/Recovery.vue"),
    children: [
      {
        path: "/",
        name: "RecoveryIndex",
        component: () => import("../views/Recovery/RecoveryIndex.vue")
      },
      {
        path: "btn",
        name: "RecoveryBtn",
        component: () => import("../views/Recovery/RecoveryBtn.vue"),
      },
    ]
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
