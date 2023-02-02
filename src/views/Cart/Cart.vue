<template>
  <div class="cart">
    <!-- <header>
      <span>购物车</span>
      <span
        @click="isEdit = !isEdit" 
        v-text="isEdit ? '完成' : '编辑'"
        >
      </span>
    </header>
    <div class="toolbar-header"></div> -->
    <van-nav-bar 
      title="购物车"
      :right-text="isEdit ? '完成' : '编辑'"
      @click-left="handleLeftClick"
      @click-right="isEdit = !isEdit"
    >
      <template #left>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <section v-if="cartList.length" ref="wrapper">
      <!-- <div class="cart-title">
        <van-checkbox @click="handleCheckAll" :value="isCheckedAll"></van-checkbox>
        <span>商品</span>
      </div> -->
      <ul>
        <li v-for="item in cartList" :key="item.id">
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
      暂无记录，请先去
      <router-link to="/home">
        首页
      </router-link>逛逛
    </section>
    <div class="toolbar"></div>
    <!-- <footer v-if="cartList.length">
      <div class="radio">
        <van-checkbox @click="handleCheckAll" :value="isCheckedAll"></van-checkbox>
      </div>
      <div class="total" >
        <div>共有 
          <span class="total-active">{{ total.num }}</span>
          件商品
        </div>
        <div v-if="!isEdit">
          <span>总计：</span>
          <span class="total-active">￥{{ total.price }} + 0 茶币</span>
        </div>
      </div>

      <div class="order" @click="handleCount" v-if="!isEdit">去结算</div>
      <div class="order" @click="handleDeleteItem" v-else>删除</div>
    </footer> -->
    <Footer :isEdit="isEdit"></Footer>
    <TabBar/>
  </div>
</template>

<script>
import BetterScroll from 'better-scroll';
import { Toast } from 'vant';
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
    ...mapMutations(['handleCartList', 'checkOne', 'initOrder']),
    ...mapActions(['handleCheckAll', 'handleDeleteItem']),
    handleLeftClick() {
      this.$router.push('/search');
    },
    async getCartList() {
      let cartRes = await request.$axios({
        url: '/api/selectCart',
        methods: 'POST',
        headers: {
          token: true,
        }
      })
      cartRes.forEach(item => {
        item['checked'] = true
      });
      this.handleCartList(cartRes);
      this.$nextTick(() => {
        new BetterScroll(this.$refs.wrapper, {
          click: true,
          movable: true,
          zoom: true,
        }) 
      })
    },
    async handleStepperChange(value, item) {
      const data = await request.$axios({
        url: '/api/cart/updateNum',
        methods: 'POST',
        data: {
          id: item.id,
          num: value,
        }
      });
    },
    async handleCount() {
      console.log("this.checkedList", this.checkedList);
      if (this.checkedList.length) {
        const data = await request.$axios({
          url: '/api/order/add',
          methods: 'POST',
          headers: {
            token: true,
          },
          data: {
            goodsGroup: this.cartList.filter(item => this.checkedList.indexOf(item.id) > -1)
          }
        })

        console.log("order", data);
        if (data[0].order_status === 1) {
          this.initOrder(data);
          this.$router.push({
            name: 'Order',
            query: {
              selectedIds: JSON.stringify(this.checkedList)
            }
          });
        }
        
      } else {
        Toast('请至少选择一件商品');
      }
      
    }
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
}
.toolbar-header {
  width: 100vw;
  height: 1.2rem;
}

header {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  justify-content: space-between;
  align-items: center;
  height: 1.2rem;
  width: 100vw;
  background: linear-gradient(to right, #D18686, #B23833);
  color: #fff;
  z-index: 10;

  i {
    padding: 0 0.4rem;
    font-size: 0.59rem;
  }

  span {
    padding: 0 0.4rem;
    font-size: 0.48rem;
  }
}

section {
  background-color: #f5f6f5;
  
  .cart-title {
    display: flex;
    padding: 0.53rem;

    span {
      padding: 0 0.4rem;
      font-weight: 500;
      font-size: 0.48rem;
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    padding: 0 0.2rem;

    li {
      display: flex;
      // justify-content: space-between;
      align-items: center;
      padding: 0.25rem 0.5rem;
      margin: 0.21rem 0;
      background-color: #fff;
      border-radius: 10px;

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

footer {
  position: absolute;
  bottom: 50px;
  display: flex;
  justify-content: space-between;
  height: 1rem;
  width: 100vw;
  align-items: center;
  background-color: #fff;
  .radio {
    padding: 0 0.4rem;
  }

  .total {
    flex: 1;
    font-size: 0.32rem;

    &-active {
      color: #b0352f;
    }
  }

  .order {
    width: 3.2rem;
    line-height: 1rem;
    color: #fff;
    text-align: center;
    font-size: 0.43rem;
    background-color: #b0352f;
  }
}

.toolbar {
  width: 100vw;
  height: 100px;
}
</style>