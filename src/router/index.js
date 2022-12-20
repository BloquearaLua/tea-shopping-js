import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/categories",
    name: "Categories",
    component: () =>
      import("../views/Categories.vue"),
  },
  {
    path: "/cart",
    name: "Cart",
    component: () =>
      import("../views/Cart.vue"),
  },
  {
    path: "/my",
    name: "My",
    component: () =>
      import("../views/My.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
