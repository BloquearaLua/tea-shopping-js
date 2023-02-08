<template>
  <div class="tabbar">
    <van-tabbar route placeholder>
      <van-tabbar-item
        v-for="tab in tabList"
        :key="tab.id"
        replace
        :to="tab.path"
        :icon="tab.icon"
        :badge="tab.badge ? cartCount : null"
      >
        {{ tab.name }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import '@/assets/js/flexible';
import { mapState } from 'vuex';
export default {
  name: "TabBar",
  props: ['toolbar'],
  data() {
    return {
      tabList: [
        {
          id: 1,
          path: '/home',
          icon: 'home-o',
          name: '首页'
        },
        {
          id: 2,
          path: '/categories',
          icon: 'apps-o',
          name: '分类'
        },
        {
          id: 3,
          path: '/cart',
          icon: 'cart-o',
          name: '购物车',
          badge: true,
        },
        {
          id: 4,
          path: '/my',
          icon: 'contact',
          name: '我的'
        },
      ]
    }
  },
  computed: {
    ...mapState({
      cartCount: state => state.cart.cartCount
    })
  },
  methods: {
    switchTab(clickTab) {
      if (clickTab === this.$route.path) return;
      this.$router.replace(clickTab);
    }
  },
};
</script>

<style scoped>
/* .tabbar {
  width: 100%;
  height: 1.6rem;
  background-color: rgb(255, 255, 255);
} */
</style>
