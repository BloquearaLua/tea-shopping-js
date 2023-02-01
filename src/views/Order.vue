<template>
    <div class="order container">
        <Header>
           <span>提交订单</span>
        </Header>
        <section>
            <div class="delivery-info">
                <div class="info-title">收货信息</div>
                <div class="info-main" @click="handleAddressChange">
                    <span>{{ path.name }}</span>
                    <span>{{ path.tel }}</span>
                    <div class="info-address">
                        <span>{{ path.province }}</span>
                        <span>{{ path.city }}</span>
                        <span>{{ path.county }}</span>
                        <span>{{ path.address_detail }}</span>
                    </div>
                </div>
            </div>
            <div class="payment-info">
                <div class="info-title">
                    <span>支付方式</span>
                    <span class="active">选择在线支付，随机减 0-100 元</span>
                </div>
                <van-radio-group v-model="paymentType" max="1">
                    <van-radio name="wechat">微信支付</van-radio>
                    <van-radio name="ali">支付宝支付</van-radio>
                    <van-radio name="card">银联支付</van-radio>
                </van-radio-group>
            </div>
            <ul>
                <li v-for="item in selectedList" :key="item.id">
                <img :src="item.goods_imgUrl" alt="">
                <div class="goods">
                    <div class="goods-title">
                    <span>{{ item.goods_name }}</span>
                    </div>
                    <div class="goods-price">
                        <span class="active">￥{{ item.goods_price }}</span>
                        <span>{{ item.goods_num }}</span>
                    </div>
                </div>
                </li>
            </ul>
        </section>
        <footer>
            <div class="total" >
                <div>共有<span class="total-active">{{ total.num }}</span>件商品</div>
                <span>总计：</span><span class="total-active">￥{{ total.price }} + 0 茶币</span>
            </div>
            <div class="submit-order" @click="handleSubmit">提交订单</div>
        </footer>
    </div>
</template>

<script>
import qs from 'qs';
import { mapGetters, mapMutations, mapState } from 'vuex';
import { Toast } from 'vant';
import request from '@/common/api/request';
import Header from './Login/Header.vue';

export default {
    name: 'Order',
    data() {
        return {
            paymentType: 'wechat',
            path: {},
            // selectedIds: [],
        }
    },
    computed: {
      ...mapGetters(['defaultPath']),
      ...mapState({
        orderId: state => state.order.orderId,
        cartList: state => state.cart.cartList,
        selectedIds: state => state.cart.checkedList,
      }),
      selectedList() {
        return this.cartList.filter(item => this.selectedIds.indexOf(item.id) > -1);
      },
      total() {
        let price = 0;
        let num = 0;
        this.selectedList.forEach(item => {
            price += item.goods_num * item.goods_price;
            num += parseInt(item.goods_num);
        })
        return {
            price,
            num,
        }
      }
    },
    methods: {
        ...mapMutations(['initAddress', 'initSelectedList', 'handleCartList']),
        handleAddressChange() {
            this.$router.push({
                name: 'PathList',
                params: {
                    type: 'select',
                }
            });
        },
        async handleSubmit() {
            if (JSON.stringify(this.path) === '{}') {
                Toast('请选择收货地址');
            }

            const submitRes = await request.$axios({
                url: '/api/order/submit',
                methods: 'POST',
                data: {
                    orderId: this.orderId,
                    selectedIds: this.selectedIds,
                },
                headers: {
                    token: true,
                },
            })
            if (!!submitRes) {
                let newArr = [];
                this.cartList.forEach(item => {
                    newArr.push(item.goods_name);
                })
                const orderObj = {
                    orderId: this.orderId,
                    name: newArr.join(','),
                    price: this.total.price
                }
                const jumpRes = await request.$axios({
                    url: '/api/order/pay',
                    methods: 'POST',
                    data: qs.stringify(orderObj),
                    headers: {
                        token: true,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                })
                if (!!jumpRes) {
                    window.location.href = jumpRes.redirectUrl;
                }
            }
        },
        async handleAddress() {
            const data = await request.$axios({
                url: '/api/address',
                methods: 'POST',
                headers: {
                    token: true
                }
            })
            this.initAddress(data);

            if (!!this.defaultPath.length) {
                this.path = this.defaultPath[0];
            } else {
                this.path = data[0];
            }

            if (this.$route.params.type === "back") {
                console.log("address??", JSON.parse(this.$route.params.addressInfo));
                this.path = JSON.parse(this.$route.params.addressInfo);
            }
        }
    },
    async created() {
        
        
        this.handleAddress();

        if (!this.selectedList.length) {
            this.initSelectedList(this.selectedIds);
            const cartList = await request.$axios({
                url: '/api/selectCart',
                methods: 'POST',
                headers: {
                    token: true
                }
            });
            this.handleCartList(cartList);
        }
    },
    // activated() {
    //     bus.$on('changeAddress', function (addressObj) {
    //         this.path = addressObj;
    //     }.bind(this));
    // },
    components: {
        Header
    }
}
</script>

<style scoped lang="scss">
.order {
    background-color: rgb(240, 240, 240);
    section {
        .delivery-info {
            .info-title {
                padding: 0.24rem;
                font-size: 0.48rem;
            }

            .info-main {
                span {
                    margin-right: 0.24rem;
                    font-size: 0.42rem;
                }

                background-color: #fff;
                padding: 0.32rem;
            }
        }

        .payment-info {
            margin-top: 0.32rem;
            padding-bottom: 0.32rem;
            background-color: #fff;
            .info {
                &-title {
                    padding: 0.24rem;
                    font-size: 0.48rem;

                    .active {
                        margin-left: 0.24rem;
                        color: #b0352f;
                    }
                }
            }
        }

        ul {
            display: flex;
            flex-direction: column;

            li {
                display: flex;
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
                    }

                    &-price {
                        display: flex;
                        justify-content: space-between;
                        padding: 0.08rem 0;
                        
                        .active {
                            color: #b0352f;
                        }
                    }
                }
            }
        }
    }

    footer {
        display: flex;
        justify-content: space-between;
        padding-left: 0.24rem;
        height: 1.28rem;
        border-top: 1px solid #ccc;
        align-items: center;
        background-color: #fff;

        .total {
            flex: 1;
            font-size: 0.32rem;

            &-active {
            color: #b0352f;
            }
        }

        .submit-order {
            width: 3.2rem;
            line-height: 1.28rem;
            color: #fff;
            text-align: center;
            font-size: 0.43rem;
            background-color: #b0352f;
        }

        ::v-deep .van-stepper{
          text-align: right;
        }
    }

    ::v-deep .van-radio {
        margin: 0.24rem;
    }
}
</style>