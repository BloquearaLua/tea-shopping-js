<template>
  <div class="tabbar">
    <ul>
      <li
        v-for="(tab,index) in tabList"
        :key="index" 
        @click="switchTab(tab.path)"
        >
        <img :src="$route.path.includes(tab.path) ? tab.selected : tab.active" :alt="tab.alt">
        <span :class="$route.path.includes(tab.path)  ? 'active' : ''">{{ tab.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import '@/assets/js/flexible';
export default {
  name: "TabBar",
  data() {
    return {
      tabList: [
        {
            title: '首页',
            alt: 'home',
            path: '/home',
            active: '/images/home.png',
            selected: '/images/home-select.png',
        },
        {
            title: '分类',
            alt: 'categories',
            path: '/categories',
            active: '/images/categories.png',
            selected: '/images/categories-select.png',
        },
        {
            title: '购物车',
            alt: 'cart',
            path: '/cart',
            active: '/images/cart.png',
            selected: '/images/cart-select.png',
        },
        {
            title: '我的',
            alt: 'my',
            path: '/my',
            active: '/images/my.png',
            selected: '/images/my-select.png',
        },
      ]
    }
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
.tabbar {
  width: 100%;
  height: 1.6rem;
  background-color: rgb(255, 255, 255);
}

.tabbar ul {
  display: flex;
  justify-content: space-around;
  align-content: center;
  width: 100%;
  height: 100%;
}

.tabbar ul li {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.tabbar ul li img {
  width: 0.83rem;
  height: 0.83rem;
}

.tabbar ul li span {
  font-size: 0.43rem;
}

.active {
  color: #b0352f;
}
</style>
