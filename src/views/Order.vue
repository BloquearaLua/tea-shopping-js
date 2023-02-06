<template>
    <div class="order container">
        <Header title="提交订单"></Header>
        <section  ref="wrapper">
            <div>
                <div class="delivery" @click="handleAddressChange">
                    <div>
                        <span class="delivery-hightlight">[默认]</span>
                        <span>{{ path.province }}</span>
                        <span>{{ path.city }}</span>
                        <span>{{ path.county }}</span>
                    </div>
                    <p class="delivery-detail">{{ path.address_detail }}</p>
                    <span>{{ path.name }}</span>
                    <span>{{ path.tel }}</span>
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
                <div class="payment">
                    <div class="payment-title">
                        <span>支付方式</span>
                        <span class="active">选择在线支付，随机减 0-100 元</span>
                    </div>
                    <van-radio-group class="payment-type" v-model="paymentType" max="1">
                        <van-radio name="ali">支付宝支付</van-radio>
                        <van-radio name="wechat">微信支付</van-radio>
                    </van-radio-group>
                </div>
            </div>
            <div class="toolbar"></div>
        </section>
        <footer>
            <!-- <div class="total" >
                <div>共有<span class="total-active">{{ total.num }}</span>件商品</div>
                <span>总计：</span><span class="total-active">￥{{ total.price }} + 0 茶币</span>
            </div>
            <div class="submit-order" @click="handleSubmit">提交订单</div> -->
            <van-submit-bar
                button-text="提交订单"
                :price="total.price*100"
                button-color="linear-gradient(to right, #6BB3FB, #86C1FC)"
                @submit="handleSubmit"
            />
        </footer>
    </div>
</template>

<script>
import BetterScroll from 'better-scroll';
import qs from 'qs';
import { mapGetters, mapMutations, mapState } from 'vuex';
import { Toast } from 'vant';
import request from '@/common/api/request';
import Header from './Login/Header.vue';

export default {
    name: 'Order',
    data() {
        return {
            paymentType: 'ali',
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
        console.log("selected", this.selectedIds, this.cartList);
        return this.cartList.filter(item => this.selectedIds.indexOf(item.goods_id) > -1);
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
        },
        async initCartList() {
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
    async created() {
        this.handleAddress();
        console.log("???????????????selected", this.selectedIds);
        if (!this.selectedIds.length) {
            console.log("-------------------------");
            this.initSelectedList(this.selectedIds);
            this.initCartList();
        }
        
        this.$nextTick(() => {
            new BetterScroll(this.$refs.wrapper, {
                click: true,
                movable: true,
                zoom: true,
            });
        });
    },
    components: {
        Header
    }
}
</script>

<style scoped lang="scss">
.order {
    background-color: #F6F7FB;
    section {
        flex: 1;
        overflow: hidden;
        .delivery {
            position: relative;
            background-color: #fff;
            padding: 0.24rem 0.42rem;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            overflow: hidden;

            &::before {
                content: "";
                position: absolute;
                left: 0;
                bottom: 0;
                // width: 100%;
                right: 0;
                height: 2px;
                background: repeating-linear-gradient(-45deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
                    background-size: 80px;
            }

            span {
                font-size: 0.38rem;
                margin-right: 0.24rem;
            }

            &-hightlight {
                color: #C33865;
            }

            &-detail {
                font-size: 0.68rem;
            }
        }
        
        ul {
            display: flex;
            flex-direction: column;
            margin-top: 0.32rem;

            li {
                display: flex;
                align-items: center;
                padding: 0.16rem 0.53rem;
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

        .toolbar {
            display: flex;
            width: 100vw;
            height: 60px;
            background-color: #1989fa;
        }

        .payment {
            // margin: 0.38rem 0 30px;
            // padding-bottom: 0.32rem;
            background-color: #fff;
            border-radius: 10px;

            &-title {
                padding: 0.24rem;
                font-size: 0.48rem;

                .active {
                    margin-left: 0.24rem;
                    color: #C33865;
                }
            }

            &-type {
                display: flex;
                font-size: 0.48rem;
            }
        }
    }

    footer {
        display: flex;
        // // justify-content: space-between;
        height: 50px;
        // border-top: 1px solid #ccc;

    }

    ::v-deep .van-radio {
        margin: 0.24rem;
    }
}
</style>