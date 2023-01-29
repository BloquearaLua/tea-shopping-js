<template>
    <div class="details">
        <header>
            <div class="header-icons" v-show="isShow">
                <i class="iconfont icon-fanhui" @click="handleReturn"></i>
                <i class="iconfont icon-kefu"></i>
            </div>
            <div class="header-bar" v-show="!isShow" :style="styleOption">
                <i class="iconfont icon-fanhui" @click="handleReturn"></i>
                <div>
                    <span>商品详情</span>
                    <span>商品评价</span>
                </div>
                <i class="iconfont icon-kefu"></i>
            </div>
        </header>
        
        <section ref="wrapper">
            <div>
                <div class="swiper-main">
                    <swiper :options="swiperOptions">
                        <swiper-slide v-for="item in swiperList" :key="item.id">
                            <img :src="item.imgUrl" alt="">
                        </swiper-slide>
                    </swiper>
                    <div class="swiper-pagination"></div>
                </div>

                <div class="goods-name">
                    <h1>{{ currentItem.name }}</h1>
                    <div>性价首选，茶感十足、鲜醇耐泡的大众口粮茶</div>
                </div>
                <div class="goods-price">
                    <div class="pre-price">
                        <span>￥</span>
                        <del>288</del>
                    </div>
                    <div class="now-price">
                        <span>价格</span>
                        <b>{{ currentItem.price }}</b>
                    </div>
                </div>
                
                <div>
					<img :src="swiperList[0].imgUrl" alt="">
					<img :src="swiperList[0].imgUrl" alt="">
				</div>
            </div>
        </section>

        <footer>
            <div class="add-cart" @click="handleAddCart">加入购物车</div>
            <div>购买</div>
        </footer>
    </div>
</template>
  
<script>
import BetterScroll from 'better-scroll';
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { Indicator, Toast } from 'mint-ui';
import request from '@/common/api/request';

export default {
    name: "Cart",
    data() {
        return {
            id: '',
            isShow: true,
            sectionScroll: '',
            styleOption: {},
            currentItem: {},
            swiperOptions: {
                autoplay: 3000,
                speed: 1000,
                pagination: {
                    el: '.swiper-pagination',
                    type: 'fraction',
                }
            },
            swiperList: [
                { imgUrl: 'images/goods-list1.jpeg'},
                { imgUrl: 'images/goods-list1.jpeg'},
                { imgUrl: 'images/goods-list1.jpeg'},
                { imgUrl: 'images/goods-list1.jpeg'},
            ]
        }
    },
    methods: {
        handleReturn() {
            this.$router.back();
        },
        async getData() {
            const res = await request.$axios({
                url: `/api/goods/${this.id}`
            });
            this.currentItem = res[0];
            this.swiperList.unshift({imgUrl: this.currentItem.imgUrl})
            console.log(this.swiperList,'sss');
        },
        async handleAddCart() {
            const goodsId = this.$route.query.id;
            // console.log(goodsId);
            const data = await request.$axios({
                url: '/api/addCart',
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
    display: flex;
	flex-direction: column;
	width: 100vw;
	height: 100vh;
	overflow: hidden;

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
            color: #999;
            font-size: 0.37rem;
        }
    }

    footer {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1.31rem;
        border-top: solid 1px #ccc;
        background-color: #fff;

        div {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50%;
            height: 100%;
            font-size: 0.43rem;
            background-color: #b0352f;
            color: #fff;
            
            &.add-cart {
                background-color: #ff9500;
            }
        }
    }
}

.swiper-main {
    position: relative;
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