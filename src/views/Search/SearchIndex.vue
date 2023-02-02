<template>
    <div class="search-index">
        <Header />
        <section>
            <div class="search-history">
                <h2>
                    <i class="iconfont icon-shijian"></i>
                    <span>历史搜索</span>
                    <span @click="handleDeleteHistory">清空历史记录</span>
                </h2>
                    
                <ul>
                    <li
                        v-for="(item,index) in searchHistory"
                        :key="index"
                        @click="goSearchList(item)"
                        >
                        {{ item }}
                    </li>
                </ul>
            </div>
        </section>
        <TabBar/>
    </div>
</template>

<script>
import TabBar from '@/components/common/TabBar.vue';
import Header from '@/components/search/Header.vue';
import { MessageBox } from 'mint-ui';

export default {
    name: 'SearchIndex',
    data() {
        return {
            searchHistory: [],
        }
    },
    methods: {
        handleDeleteHistory() {
            MessageBox({
                title: '提示',
                message: '确定清空历史记录吗？',
                showCancelButton: true
            }).then(res => {
                if (res === 'confirm') {
                    localStorage.removeItem('keywordList');
                    this.searchHistory = [];
                }
            });
        },
        goSearchList(searchName) {
            this.$router.push({
                name: 'SearchList',
                query: {
                    keyword: searchName,
                }
            })
        }
    },
    created() {
        this.searchHistory = JSON.parse(localStorage.getItem('keywordList'));
    },
    components: {
        TabBar,
        Header,
    }
}
</script>

<style scoped>
.search-index {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

section {
    flex: 1;
    overflow: hidden;
    background-color: #f5f5f5;
    overflow: hidden;
}

.search-history {
    padding: 0.53rem;
}

.search-history h2{
    position: relative;
    font-weight: 400;
    font-size: 0.48rem;
}

.search-history h2 span:last-child{
    position: absolute;
    right: 0;
}

.search-history h2 i {
    padding-right: 0.08rem;
    color: #b0352f;
    font-size: 0.48rem;
}

.search-history ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0.53rem 0;
}

.search-history ul li {
    margin: 0 0.32rem 0.27rem 0;
    padding: 0.08rem 0.16rem;
    font-size: 0.38rem;
    border: solid 1px #ccc;
}

</style>