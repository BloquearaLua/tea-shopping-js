<template>
  <div class="tabbar">
    <van-tabbar route placeholder>
      <van-tabbar-item
        v-for="tab in tabList"
        :key="tab.id"
        replace
        :to="tab.path"
        :icon="tab.icon"
        :badge="tab.badge ? cartLength : null"
      >
        首页
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
        },
        {
          id: 2,
          path: '/categories',
          icon: 'apps-o',
        },
        {
          id: 3,
          path: '/cart',
          icon: 'cart-o',
          badge: true,
        },
        {
          id: 4,
          path: '/my',
          icon: 'contact',
        },
      ]
    }
  },
  computed: {
    ...mapState({
      cartLength: state => state.cart.cartList.length
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
