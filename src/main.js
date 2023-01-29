import Vue from "vue";
import FunTab from 'ly-tab';
// import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';

import App from "./App.vue";
import router from "./router";
import store from "./store";
import '@/assets/css/common.css';
import '@/assets/css/iconfont.css';

Vue.config.productionTip = false;
Vue.use(FunTab);

// 全局引入mint-ui
// Vue.use(MintUI)

import { Lazyload } from 'mint-ui';
Vue.use(Lazyload);

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
