<template>
  <div class="home container">
    <div class="headers">
      <div class="headers-main">
        <Header></Header>
        <van-tabs
          @change="handleChange"
          title-active-color="#6091E8"
          color="#6091E8"
        >
          <van-tab
            v-for="(tab,index) in tabsList"
            :key="index"
            :title="tab.label"
          >
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <section ref="wrapper">
      <div>
        <div v-for="item in newData" :key="item.id">
          <Swiper 
            v-if="item.type === 'swiperList'"
            :swiperList="item.data"
            />
          <Icons
            v-if="item.type === 'iconsList'"
            :iconsList="item.data"
            />
          <Recommend
            v-if="item.type === 'recommendList'"
            :recommendList="item.data"
            />
          <Like
            v-if="item.type === 'likeList'"
            :likeList="item.data"
            />
          <Ad
            v-if="item.type === 'adList'"
            :adList="item.data"
            />
        </div>
      </div>
    </section>
    <TabBar />
  </div>
  
</template>

<script>
import BetterScroll from 'better-scroll';

import request from '@/common/api/request';
import TabBar from '@/components/common/TabBar.vue';
import Header from '@/components/home/Header.vue';
import Swiper from '@/components/home/Swiper.vue';
import Icons from '@/components/home/Icons.vue';
import Recommend from '@/components/home/Recommend.vue';
import Like from '@/components/home/Like.vue';
import Ad from '@/components/home/Ad.vue';
export default {
  name: "Home",
  data() {
    return  {
      selectedId: 0,
      tabsList:[],
      newData:[],
      options: {
        activeColor:'#b0352f'
      }
    }
  },
  methods: {
    handleChange(tabIndex, title) {
      console.log("handleChange", name, title);
      this.addData(tabIndex-1);
    },
    handleTabChange(tabIndex) {
      this.addData(tabIndex);
      // console.log("tabIndex", tabIndex);
    },
    async getData() {
      const res = await request.$axios({ url: '/api/home/index_list/0/data/1' });
      this.tabsList = Object.freeze(res.topBar);
      this.newData = Object.freeze(res.data);

      this.$nextTick(() => {
        new BetterScroll(this.$refs.wrapper, {
          click: true,
          movable: true,
          zoom: true,
        }) 
      })
    },
    async addData(index) {
      let res = await request.$axios({ url: `/api/home/index_list/${index}/data/1` });
      // console.log("addData", res);

      if (res.constructor != Array) {
        this.newData = Object.freeze(res.data);
      } else {
        this.newData = Object.freeze(res);
      }

      this.$nextTick(() => {
        new BetterScroll(this.$refs.wrapper, {
          movable: true,
          zoom: true,
        }) 
      })
    }
  },
  created() {
    this.getData();
  },
  mounted(){
    
  },
  components: {
    TabBar,
    Header,
    Swiper,
    Icons,
    Recommend,
    Like,
    Ad,
  },
};
</script>

<style scoped lang="scss">

.home {
  .headers {
    width: 100vw;
    height: 100px;

    &-main {
      position: fixed;
      top: 0;
      left: 0;
    }
  }

  section {
    flex: 1;
    overflow: hidden;
  }
}

::v-deep .ly-tabs{
	box-shadow: none;
	border-bottom: none;
}
</style>