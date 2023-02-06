<template>
    <div class="search-list container">
        <div class="header">
            <Header></Header>
            <van-dropdown-menu active-color="#1989fa">
                <van-dropdown-item @change="handleFilterChange" v-model="filterList.com[0].default" :options="filterList.com" />
                <van-dropdown-item @change="handleFilterChange" v-model="filterList.goods_price[0].default" :options="filterList.goods_price" />
                <van-dropdown-item @change="handleFilterChange" v-model="filterList.goods_sales[0].default" :options="filterList.goods_sales" />
            </van-dropdown-menu>
        </div>
        <section ref="wrapper">
            <van-grid v-if="goodsList.length" :column-num="2">
                <van-grid-item v-for="item in goodsList" :key="item.id" :to="{ path: '/details', query: { id: item.id }}">
                    <van-image :src="item.goods_imgUrl" width="100%">
                        <template v-slot:error>加载失败</template>
                    </van-image>
                    <p class="desc">{{ item.goods_content.slice(0,9) }}</p>
                    <div class="options">
                        <div class="price">
                            <span>￥</span>
                            <b>{{ item.goods_price }}</b>
                        </div>
                        <div class="cart">加入购物车</div>
                    </div>
                </van-grid-item>
            </van-grid>
            <van-empty v-else image="https://img01.yzcdn.cn/vant/custom-empty-image.png" description="暂无相关产品" />
        </section>
    </div>
</template>

<script>
import BetterScroll from 'better-scroll';
import request from '@/common/api/request';

import TabBar from '@/components/common/TabBar.vue';
import Header from '@/components/search/Header.vue';
export default {
    name: 'SearchList',
    data() {
        return {
            filterList: {
                'com': [ { text: '综合', value: 'default', default: 'default' }, ],
                'goods_price': [ 
                    { text: '价格', value: 'default', default: 'default' },
                    { text: '价格升序', value: 'asc' },
                    { text: '价格降序', value: 'desc' },
                ],
                'goods_sales': [
                    { text: '销量', value: 'default', default: 'default' },
                    { text: '销量升序', value: 'asc' },
                    { text: '销量降序', value: 'desc' },
                ]
            },
            goodsList: [],
        }
    },
    created() {
        
    },
    mounted() {
        this.getData();
    },
    methods: {
        handleFilterChange(value) {
            console.log('filter', value, this.filterList);
            this.getData()
        },
        async getData() {
            console.log('order', this.orderBy);
            const data = await request.$axios({ 
                url: `/api/goods/shopList`,
                params: {
                    keyword: this.$route.query.keyword,
                    order: {
                        ...this.orderBy
                    }
                }
            })
            if (!!data) {
                console.log("/goods", data);
                this.goodsList = data;
            }

            this.$nextTick(() => {
                this.scroll = new BetterScroll(this.$refs.wrapper, {
                    click: true,
                    movable: true,
                });
                console.log("scroll---", this.scroll);
            })
            
        },
        handleChangeOperation(index) {
            this.searchList.data.forEach((item, itemIndex) => {
                if (index !== itemIndex) {
                    item.status = 0;
                } else {
                    item.status = item.status === 1 ? 2 : 1;
                }
                this.getData();
            })
            this.searchList.currentIndex = index;
        }
    },
    computed: {
        orderBy() {
            const keys = Object.keys(this.filterList);
            const order = {};
            keys.forEach(item => {
                const result = this.filterList[item][0].default;
                if (result !== 'default') {
                    order[item] = result;
                }
            })
            return order;
        }
    },
    watch: {
        $route() {
            this.getData();
        }
    },
    components: {
        TabBar,
        Header,
    }
}
</script>

<style scoped lang="scss">
.search-list {
    background-color: #f5f5f5;

    .header {
        width: 100vw;
        height: 98px;
    }

    section {
        flex: 1;
        overflow: hidden;
        padding: .325rem 0;

        .desc {
            margin-top: .22rem;
            width: 3.8rem;
            font-size: 0.42rem;
            text-align: left;
            overflow: hidden;
            white-space: nowrap;
            color: #656D78;
        }

        .options {
            margin-top: 10px;
            display: flex;
            justify-content: space-around;
            width: 100%;
            font-size: 0.48rem;

            .price {
                color: #ee0a24;
            }

            .cart {
                padding: 2px 8px;
                border-radius: 3px;
                font-size: 0.32rem;
                cursor: pointer;
                color: #fff;
                background: linear-gradient(to right, #ff6034, #ee0a24);
            }
        }
    }
}
</style>