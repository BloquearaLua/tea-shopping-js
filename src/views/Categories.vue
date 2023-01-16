<template>
  <div class="categories">
    <Header/>
    <section>
      <div class="cate-l" ref="left">
        <ul class="l-item">
          <li
            v-for="category,index in categoriesList"
            :key="category.id"
            :class="{active: currentIndex === index}"
            @click="handleScroll(index)"
            >
            {{ category.name }}
          </li>
        </ul>
      </div>
      <div class="cate-r" ref="right">
        <ul class="shop-list">
          <li v-for="category in categoriesList" :key="category.id" class="shop-list-li">
            <h2>{{ category.name }}</h2>
            <ul class="r-content">
              <li v-for="item in category.children" :key="item.id">
                <img :src="item.imgUrl" alt="">
                <span>{{ item.name }}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </section>
    <TabBar/>
  </div>
</template>

<script>
import BetterScroll from 'better-scroll';
import request from '@/common/api/request';
import TabBar from '@/components/common/TabBar.vue';
import Header from '@/components/home/Header.vue';
export default {
  name: "Categories",
  data(){
    return {
     categoriesList: [],
     rightScroll: '',
     allHeight: [],
     scrollY: '',
    }
  },
  computed: {
    currentIndex() {
      return this.allHeight.findIndex(
        (item, index) => 
          this.scrollY > item && this.scrollY < this.allHeight[index+1])
    }
  },
  methods: {
    async getCategoriesList() {
      const res = await request.$axios({ url: "/api/goods/list" });
      console.log(res);
      this.categoriesList = res;

      this.$nextTick(() => {
        // 左侧滑动
        new BetterScroll(this.$refs.left, {
          click: true
        });
        // 右侧滑动
        this.rightScroll = new BetterScroll(this.$refs.right, {
          click: true,
          probeType: 3,
        });
        // 统计右侧所有板块高度值
        let height = 0;
        this.allHeight.push(height);
        let uls = this.$refs.right.getElementsByClassName('shop-list-li');
        Array.from(uls).forEach(item => {
          height += item.clientHeight;
          this.allHeight.push(height);
        })
        // 得到右侧滚动值
        this.rightScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(pos.y);
        })
      })
    },
    handleScroll(index) {
      this.rightScroll.scrollTo(0, -this.allHeight[index], 300);
    }
  },
  created() {
    this.getCategoriesList();
  },
  components: {
    TabBar,
    Header,
  },
};
</script>

<style lang="scss" scoped>
.categories {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  
  section {
    display: flex;
    flex: 1;
    overflow: hidden;

    .cate-l {
      width: 2.48rem;
      background-color: #fff;
      overflow: hidden;
      border-right: solid 1px #ccc;

      .l-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        
        li {
          width: 100%;
          line-height: 1.6rem;
          text-align: center;
          font-size: 0.37rem;
        }

        .active {
          color: #b0352f;
          border-left: solid 1px #b0352f;
        }
      }
    }

    .cate-r {
      flex: 1;
      overflow: hidden;

      .shop-list {
        text-align: center;
        h2 {
          padding: 0.53rem 0;
          font-size: 0.64rem;
          font-weight: 500;
        }

        .r-content {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;

          li {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 33.3%;
            padding: 0.26rem 0;

            
            img {
              width: 1.41rem;
              height: 1.41rem;
            }

            span {
              font-size: 0.43rem;
            }
          }
        }
      }
    }
  }
}

::v-deep .tabbar {
  border-top: solid 1px #ccc;
}
</style>
