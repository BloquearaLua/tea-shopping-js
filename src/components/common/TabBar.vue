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
            active: 'http://img13.360buyimg.com/uba/jfs/t1/29316/38/1115/3203/5c0f3d61E35d0c7da/9e557f2cb5c9dab6.jpg',
            selected: 'http://img20.360buyimg.com/uba/jfs/t1/9996/36/8646/4833/5c0f3d61E7c1b7e0f/c98ad61124172e93.jpg',
        },
        {
            title: '分类',
            alt: 'categories',
            path: '/categories',
            active: 'http://img12.360buyimg.com/uba/jfs/t1/25443/23/1062/4600/5c0f3d61E2e9f1360/c9b3421fe18614e2.jpg',
            selected: 'http://img20.360buyimg.com/uba/jfs/t1/19241/12/1048/8309/5c0f3d61E17ed5a56/c3af0964cade47f8.jpg',
        },
        {
            title: '购物车',
            alt: 'cart',
            path: '/cart',
            active: 'http://img11.360buyimg.com/uba/jfs/t1/14848/18/1066/3723/5c0f41bdE9f2a38fe/e6ed6768717297fb.jpg',
            selected: 'http://img30.360buyimg.com/uba/jfs/t1/17538/16/1070/6214/5c0f41bdE4bc9a1db/74cf978e5015454b.jpg',
        },
        {
            title: '我的',
            alt: 'my',
            path: '/my',
            active: 'http://img20.360buyimg.com/uba/jfs/t1/20004/20/1045/3620/5c0f3d61Eaaec1670/9e59db63983b7b9f.jpg',
            selected: 'http://img14.360buyimg.com/uba/jfs/t1/23967/14/1072/6714/5c0f3d61E0ad8991e/8f741953f6e38f15.jpg',
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
