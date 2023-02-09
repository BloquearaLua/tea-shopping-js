<template>
    <div class="details container">
        <header>
            <div class="header-icons" v-show="isShow">
                <van-icon name="arrow-left" @click="handleReturn" size="0.6rem"/>
                <van-icon name="service-o" size="0.6rem" />
            </div>
            <div class="header-bar" v-show="!isShow" :style="styleOption">
                <van-icon name="arrow-left" @click="handleReturn" size="0.6rem"/>
                <div>
                    <span>商品详情</span>
                    <span>商品评价</span>
                </div>
                <van-icon name="service-o" size="0.6rem" />
            </div>
        </header>
        
        <section ref="wrapper">
            <div>
                <div class="swiper-main">
                    <van-swipe :autoplay="3000">
                        <van-swipe-item v-for="item in swiperList" :key="item.id">
                            <img v-lazy="item.imgUrl" width="100%"/>
                        </van-swipe-item>
                    </van-swipe>
                </div>

                <div class="goods-name">
                    <h1>{{ currentItem.goods_name }}</h1>
                    <div>{{ currentItem.goods_content }}</div>
                </div>
                <div class="goods-price">
                    <span class="pre-price">
                        <span>到手￥</span>
                        <b>{{ currentItem.goods_price }}</b>
                    </span>
                    <span class="now-price">
                        <span>原价￥</span>
                        <del>{{ currentItem.goods_price }}</del>
                    </span>
                </div>
                
                <div>
					<img v-lazy="swiperList[0].imgUrl" width="100%" alt="">
					<img v-lazy="swiperList[0].imgUrl" width="100%" alt="">
				</div>
            </div>
        </section>

        <footer>
            <van-goods-action>
                <van-goods-action-icon icon="chat-o" text="客服" />
                <van-goods-action-icon icon="shop-o" text="店铺" />
                <van-goods-action-button color="#A6BEE7" type="warning" @click="handleAddCart" text="加入购物车" />
                <van-goods-action-button color="#6091E8" type="danger" @click="handleBuy" text="立即购买" />
            </van-goods-action>
        </footer>
    </div>
</template>
  
<script>
import BetterScroll from 'better-scroll';
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import request from '@/common/api/request';
import { Toast } from 'vant';
import { mapMutations, mapState } from 'vuex';

export default {
    name: "Cart",
    data() {
        return {
            id: '',
            isShow: true,
            sectionScroll: '',
            styleOption: {},
            currentItem: {},
            swiperList: [
                { imgUrl: 'images/goods-list1.jpeg'},
                { imgUrl: 'images/goods-list1.jpeg'},
                { imgUrl: 'images/goods-list1.jpeg'},
                { imgUrl: 'images/goods-list1.jpeg'},
            ]
        }
    },
    computed: {
        ...mapState({
            selectedIds: state => state.cart.checkedList
        })
    },
    methods: {
        ...mapMutations(['initOrder', 'initSelectedList']),
        handleReturn() {
            this.$router.back();
        },
        async handleBuy() {
            console.log("fds555555555555", [this.currentItem]);
            const data = await request.$axios({
                url: '/api/order/add',
                methods: 'POST',
                headers: {
                    token: true,
                },
                data: {
                    goodsGroup: [{ ...this.currentItem }]
                }
            })
            console.log("order", data);
            this.initOrder(data);
            this.initSelectedList([this.currentItem.id]);
            console.log("selectedids", this.selectedIds);
            if (data[0].order_status === 1) {
                this.$router.push({
                    name: 'Order',
                    query: {
                        selectedIds: JSON.stringify([this.currentItem.id])
                    }
                });
            }
        },
        async getData() {
            const res = await request.$axios({
                url: `/api/goods/${this.id}`
            });
            this.currentItem = res[0];
            this.swiperList.unshift({imgUrl: this.currentItem.goods_imgUrl})
            console.log(this.swiperList,'sss');
            this.$nextTick(() => {
            new BetterScroll(this.$refs.wrapper, {
                    movable: true,
                    zoom: true,
                }) 
            })
        },
        async handleAddCart() {
            const goodsId = this.$route.query.id;
            console.log("goodsId", goodsId);
            const data = await request.$axios({
                url: '/api/cart/add',
                methods: 'POST',
                data: {
                    goodsId,
                },
                headers: {
                    token: true,
                }
            })
            if (!!data) {
                Toast({
                    message: '添加成功',
                    duration: 2000,
                })
            }
            console.log("details", data);
        }
    },
    created() {
        this.id = this.$route.query.id;
        this.getData();
    },
    mounted() {
        this.sectionScroll = new BetterScroll(this.$refs.wrapper, {
			probeType: 3,
			bounce: false,
			click:true
		})
        this.sectionScroll.on('scroll', (pos) => {
            // console.log(pos);
            let posY = Math.abs(pos.y);
            let opacity = posY / 180;
            
            opacity = opacity > 1 ? 1 : opacity;
            this.styleOption = {
                opacity,
            }

            this.isShow = posY > 50 ? false : true;
        })
    },
    activated() {
        if (this.id !== this.$route.query.id) {
            this.id = this.$route.query.id;
            this.getData();
            
        }
    },
    components: {
        swiper,
        swiperSlide
    }
};
</script>

<style lang="scss" scoped>
.details {
    header {
        position: fixed;
        width: 100%;
        height: 1.17rem;
        top: 0;
        left: 0;
        z-index: 10;

        .header-icons {
            display: flex;
            margin: 0.32rem;
            justify-content: space-between;
            align-items: center;

            i {
                display: block;
                width: 0.93rem;
                height: 0.93rem;
                line-height: 0.93rem;
                text-align: center;
                font-size: 0.69rem;
                color: #fff;
                border-radius: 50%;
                background-color: rgba(0, 0, 0, 0.3);

                &:hover {
                    background-color: rgba(0, 0, 0, 0.5);
                }
            }
        }

        .header-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 1.17rem;
            font-size: 0.43rem;
            background-color: #fff;
            
            span {
                padding: 0 0.27rem;
            }

            i {
                padding: 0 0.48rem;
                font-size: 0.59rem;
            }
        }
    }

    section {
        flex: 1;
        overflow: hidden;
    }

    .goods-name {
        padding: 0.53rem 0.27rem;
        border: solid 1px #ccc;
        h1 {
            font-size: 0.53rem;
            font-weight: 500;
        }

        div {
            padding: 0.08rem 0;
            font-size: 0.37rem;
            color: #999;
        }
    }

    .goods-price {
        padding: 0.53rem 0.27rem;

        .pre-price {
            color: #b0352f;

            span {
                font-size: 0.32rem;
            }
        }

        .now-price {
            margin-left: 0.1rem;
            color: #999;
            font-size: 0.37rem;
        }
    }

    footer {
        width: 100%;
        height: 50px;
        // display: flex;
        // justify-content: center;
        // align-items: center;
        // position: fixed;
        // left: 0;
        // bottom: 0;
        // width: 100%;
        // height: 1.31rem;
        // border-top: solid 1px #ccc;
        // background-color: #fff;

        // div {
        //     display: flex;
        //     justify-content: center;
        //     align-items: center;
        //     width: 50%;
        //     height: 100%;
        //     font-size: 0.43rem;
        //     background-color: #b0352f;
        //     color: #fff;
            
        //     &.add-cart {
        //         background-color: #ff9500;
        //     }
        // }
    }
}

.swiper-main {
    position: relative;

    .custom-indicator {
        position: absolute;
        right: 5px;
        bottom: 5px;
        padding: 2px 5px;
        font-size: 12px;
        background: rgba(0, 0, 0, 0.1);
    }
}

.swiper-main,
.swiper-container,
.swiper-container img {
    width: 100%;
    height: 10rem;
}

.swiper-pagination {
    width: 100%;
    bottom: 0.26rem;
    text-align: right;
    font-size: 0.43rem;
    color: #fff;
}

.swiper-pagination-fraction,
.swiper-pagination-custom,
.swiper-container-horizontal > .swiper-pagination-bullets{
	left:-0.533333rem;
}
</style>