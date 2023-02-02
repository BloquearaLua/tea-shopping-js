<template>
    <div class="search-list">
        <div class="headers">
            <Header></Header>
            <ul>
                <li
                    v-for="(item,index) in searchList.data"
                    :key="index"
                    @click="handleChangeOperation(index)"
                >
                    <div 
                        :class="searchList.currentIndex === index ? 'active' : ''"
                    >
                        {{ item.name }}
                    </div>
                    <div class="search-filter" v-if="index !== 0">
                        <i
                            class="iconfont icon-arrow_up_fat"
                            :class="item.status === 1 ? 'active' : ''"
                            ></i>
                        <i
                            class="iconfont icon-arrow_down_fat"
                            :class="item.status === 2 ? 'active' : ''"
                            ></i>
                    </div>
                </li>
            </ul>
        </div>
        <section>
            <ul v-if="goodsList.length">
                <li v-for="item in goodsList" :key="item.id">
                    <img v-lazy="item.imgUrl" alt="">
                    <h3>{{ item.name }}</h3>
                    <div  class="price">
                        <div>
                            <span>￥</span>
                            <b>{{ item.price }}</b>
                        </div>
                        <div>立即购买</div>
                    </div>
                </li>
            </ul>
            <div v-else class="info">暂时相关数据...</div>
        </section>
        <TabBar/>
    </div>
</template>

<script>
import request from '@/common/api/request';

import TabBar from '@/components/common/TabBar.vue';
import Header from '@/components/search/Header.vue';
export default {
    name: 'SearchList',
    data() {
        return {
            goodsList: [],
            searchList: {
                currentIndex: 0,
                data: [
                    { name: '综合', key: 'combination' },
                    { name: '价格', status: 0, key: 'price' },
                    { name: '销量', status: 0, key: 'num'  },
                ]
            }
        }
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            console.log(this.orderBy);
            request.$axios({ 
                url: `/api/goods/shopList`,
                params: {
                    keyword: this.$route.query.keyword,
                    order: {
                        ...this.orderBy
                    }
                }
            }).then(res => {
                console.log(res);
                this.goodsList = res;
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
            const obj = this.searchList.data[this.searchList.currentIndex];
            const val = obj.status === 1 ? 'asc' : 'desc';
            return {
                [obj.key]: val
            }
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

<style scoped>
.search-list {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

.headers ul {
    display: flex;
    justify-content: space-around;
    padding: 0.33rem 0;
}

.headers ul li {
    display: flex;
    align-items: center;
}

.headers ul li > div {
    padding: 0 0.08rem;
}

.headers ul li .search-filter {
    display: flex;
    flex-direction: column;
}

section {
    flex: 1;
    overflow: hidden;
    background-color: #f5f5f5;
}

section ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

section ul li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    padding: 0.27rem;
    box-sizing: border-box;
}

section ul li h3 {
    width: 100%;
    font-size: 0.37rem;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.7);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

section ul li img {
    width: 4.53rem;
    height: 4.53rem;
}

section ul li .price {
    display: flex;
    justify-content: space-between;
    padding: 0.27rem 0;
    width: 100%;
    font-style: 14px;
}

section ul li .price div:first-child span {
    font-size: 0.32ren;
    color: #b0352f;
}

section ul li .price div:first-child b {
    color: #b0352f;
    font-size: 0.43rem;
}

section ul li .price div:last-child {
    padding: 0.08rem 0.16rem;
    color: #fff;
    background-color: #b0352f;
    border-radius: 0.16rem;
    font-size: 0.48rem;
    cursor: pointer;
}

.active {
    color: #b0352f;
}

.info {
    padding-top: 0.32rem;
    text-align: center;
}

section ul li img[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
</style>