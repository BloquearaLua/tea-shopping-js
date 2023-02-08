<template>
  <div class="cart">
    <header>
      <van-nav-bar
        fixed
        placeholder
        title="购物车"
        :right-text="isEdit ? '完成' : '编辑'"
        @click-left="handleJump('/search')"
        @click-right="isEdit = !isEdit"
      >
        <template #left>
          <van-icon name="search" size="18" />
        </template>
      </van-nav-bar>
    </header>

    <section v-if="cartList.length" ref="wrapper">
      <ul>
        <li v-for="item in cartList" :key="item.id" @click.self="handleGoDetail(item.goods_id)">
          <div class="check">
            <van-checkbox @click="checkOne(item.id)" v-model="item.checked"></van-checkbox>
          </div>
          <img :src="item.goods_imgUrl" alt="">
          <div class="goods">
            <div class="goods-title">
              <span>{{ item.goods_name }}</span>
              <van-icon name="delete-o" @click="handleDeleteItem(item.id)" />
            </div>
            <div class="goods-price">￥{{ item.goods_price }}</div>
            <van-stepper @change="handleStepperChange($event, item)" v-model="item.goods_num" integar></van-stepper>
          </div>
        </li>
      </ul>
    </section>
    <section v-else>
      <van-empty
        description="购物车还没有物品，快去逛逛 ~"
        image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
      >
        <van-button round color="#6091E8" class="bottom-button" @click="handleJump('/home')">
          去首页
        </van-button>
      </van-empty>
    </section>
    <Footer :isEdit="isEdit" placeHolder></Footer>
    <TabBar/>
  </div>
</template>

<script>
import BetterScroll from 'better-scroll';
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
import TabBar from '@/components/common/TabBar.vue';
import Footer from './Footer.vue';
import request from '@/common/api/request';

export default {
  name: "Cart",
  data() {
    return {
      isEdit: false,
    }
  },
  computed: {
    ...mapGetters(['isCheckedAll', 'total']),
    ...mapState({
      cartList: state => state.cart.cartList,
      checkedList: state => state.cart.checkedList,
    }),
  },
  created() {
    this.getCartList();
  },
  methods: {
    ...mapMutations(['handleCartList', 'checkOne']),
    ...mapActions(['handleDeleteItem']),
    handleJump(url) {
      this.$router.push(url);
    },
    handleGoDetail(id) {
      this.$router.push({
        path: '/details',
        query: {
          id
        }
      })
    },
    async getCartList() {
      let cartRes = await request.$axios({
        url: '/api/cart/list',
        methods: 'POST',
        headers: {
          token: true,
        }
      })
      cartRes.forEach(item => {
        item['checked'] = true
      });
      console.log("cart", cartRes);
      this.handleCartList(cartRes);
      this.$nextTick(() => {
        this.scroll = new BetterScroll(this.$refs.wrapper, {
          click: true,
          movable: true,
          zoom: true,
        }) 
        console.log('cartScroll', this.scroll);
      });
    },
    async handleStepperChange(value, item) {
      await request.$axios({
        url: '/api/cart/update',
        methods: 'POST',
        data: {
          id: item.id,
          num: value,
        }
      });
    },
  },
  components: {
    TabBar,
    Footer
  },
};
</script>

<style scoped lang="scss">
.cart {
  width: 100vw;
  height: 100vh;
  background-color: #f5f6f5;

  .bottom-button {
    width: 160px;
    height: 40px;
  }

  section {
    height: calc(100vh - 146px);
    // flex: 1;
    overflow: hidden;
    background-color: #f5f6f5;

    ul {
      display: flex;
      flex-direction: column;
      padding: 0 0.2rem;

      li {
        display: flex;
        align-items: center;
        padding: 0.25rem 0.5rem;
        margin: 0.21rem 0;
        background-color: #fff;
        border-radius: 10px;
        z-index: 0;

        .check {
          padding-right: 0.37rem;
        }

        img {
          width: 1.97rem;
          height: 1.97rem;
        }

        .goods {
          display: flex;
          width: 100%;
          flex-direction: column;
          padding-left: 0.4rem;
          font-size: 0.32rem;

          &-title {
            display: flex;
            justify-content: space-between;

            span {
              font-size: 0.48rem;
            }

            i {
              font-size: 0.59rem;
            }
          }

          &-price {
            padding: 0.08rem 0;
            color: #b0352f;
          }

          ::v-deep .van-stepper{
            text-align: right;
          }
        }
      }
    }
  }
}
</style>