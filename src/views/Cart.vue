<template>
  <div class="cart container">
    <header>
      <i class="iconfont icon-fanhui" @click="handleReturn"></i>
      <span>购物车</span>
      <span
        @click="isEdit = !isEdit" 
        v-text="isEdit ? '完成' : '编辑'"
        >
      </span>
    </header>
    <section v-if="cartList.length">
      <div class="cart-title">
        <van-checkbox @click="handleCheckAll" :value="isCheckedAll"></van-checkbox>
        <span>商品</span>
      </div>
      <ul>
        <li v-for="item in cartList" :key="item.id">
          <div class="check">
            <van-checkbox @click="checkOne(item.id)" v-model="item.checked"></van-checkbox>
          </div>
          <img :src="item.goods_imgUrl" alt="">
          <div class="goods">
            <div class="goods-title">
              <span>{{ item.goods_name }}</span>
              <i class="iconfont icon-lajitong" @click="handleDeleteItem(item.id)"></i>
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
    <footer v-if="cartList.length">
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

      <div class="order" v-if="!isEdit">去结算</div>
      <div class="order" @click="handleDeleteItem" v-else>删除</div>
    </footer>
  </div>
</template>

<script>

import request from '@/common/api/request';
import { Toast } from 'vant';
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';

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
    })
  },
  created() {
    this.getCartList();
  },
  methods: {
    ...mapMutations(['handleCartList', 'checkOne']),
    ...mapActions(['handleCheckAll', 'handleDeleteItem']),
    handleReturn() {
      this.$router.push('/home');
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
    },
    async handleStepperChange(value, item) {
      console.log(value);
      const data = await request.$axios({
        url: '/api/cart/updateNum',
        methods: 'POST',
        data: {
          id: item.id,
          num: value,
        }
      });
    }
  },
  components: {
  },
};
</script>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1.17rem;
  background-color: #b0352f;
  color: #fff;

  i {
    padding: 0 0.4rem;
    font-size: 0.59rem;
  }

  span {
    padding: 0 0.4rem;
    font-size: 0.43rem;
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

    li {
      display: flex;
      // justify-content: space-between;
      align-items: center;
      padding: 0.16rem 0.53rem;
      margin: 0.21rem 0;
      background-color: #fff;

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
  display: flex;
  justify-content: space-between;
  height: 1.28rem;
  border-top: 1px solid #ccc;
  align-items: center;
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
    line-height: 1.28rem;
    color: #fff;
    text-align: center;
    font-size: 0.43rem;
    background-color: #b0352f;
  }
}
</style>