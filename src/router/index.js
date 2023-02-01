import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";

const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;
// push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// replace
VueRouter.prototype.replace = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}

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
  {
    path: "/path",
    name: "Path",
    component: () => import("../views/Path/Path.vue"),
    children: [
      {
        path: "/",
        name: "PathList",
        component: () => import("../views/Path/PathList.vue")
      },
      {
        path: "details",
        name: "PathDetails",
        component: () => import("../views/Path/PathDetails.vue")
      },
    ]
  },
  {
    path: "/order",
    name: "Order",
    component: () => import("../views/Order.vue"),
    // meta: {
    //   keepAlive: true,
    // }
  },
  {
    path: "/pay",
    name: "Pay",
    component: () => import("../views/Pay.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const nextRoute = ['Path', 'PathList', 'Cart', 'PathDetails', 'Order', 'Pay'];
  const userInfo = JSON.parse(localStorage.getItem('teaUserInfo'));
  if (nextRoute.indexOf(to.name) > -1) {
    if (!userInfo) {
      router.push('/login');
    }
  }
  // console.log(to, from, next);
  next();
})

export default router;
