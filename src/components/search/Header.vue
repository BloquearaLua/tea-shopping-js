<template>
    <!-- <header>
        <div class="search-return" @click="handleReturn">
            <i class="iconfont icon-fanhui"></i>
        </div>
        <div class="search-main">
            <i class="iconfont icon-fangdajing"></i>
            <form action="" onsubmit="return false">
                <input v-model="keyword" type="text" placeholder="搜索您喜欢的产品" @keyup.enter="handleSearch"/>
            </form>
        </div>
        <div class="search-btn" @click="handleSearch">搜索</div>
    </header> -->
    <header>
        <van-icon
            class="icon-return"
            name="arrow-left"
            size="0.5rem"
            @click="handleReturn"
        />
        <van-search
            v-model="keyword"
            show-action
            placeholder="请输入搜索关键词"
            @search="handleSearch"
            >
            <template #action>
                <div @click="handleSearch">搜索</div>
            </template>
        </van-search>
    </header>
</template>

<script>
import { Toast } from 'vant';
export default {
    name: 'Header',
    data() {
        return {
            keyword: this.$route.query.keyword || '',
            keywordArr: [],
        }
    },
    methods: {
        handleReturn() {
            this.$router.back();
        },
        handleSearch() {
            if (!this.keyword.trim()) {
                Toast('请输入关键词');
                return;
            };
            // 判断之前有没有搜索的本地存储
            if (!localStorage.getItem('keywordList')) {
                localStorage.setItem('keywordList', []);
            } else {
                this.keywordArr = JSON.parse(localStorage.getItem('keywordList'));
            }
            // 增加数据
            this.keywordArr.unshift(this.keyword);
            // 去重
            let noRepeatArr = new Set(this.keywordArr);
            localStorage.setItem('keywordList', JSON.stringify(Array.from(noRepeatArr)));

            // 路径无变化就不跳转
            if (this.keyword === this.$route.query.keyword) return;

            // 跳转
            this.$router.push({
                name: 'SearchList',
                query: {
                    keyword: this.keyword,
                }
            })
        }
    },
}
</script>

<style scoped lang="scss">

.van-search  {
    width: 100%;
}

header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100vw;
    height: 50px;
    background-color: #fff;

    .icon-return {
        padding-left: .225rem;
    }
}

/* .search-return,
.search-btn {
    padding: 0 0.27rem;
}

.search-return i {
    font-size: 0.75rem;
}

.search-main {
    display: flex;
    align-items: center;
    width: 6.93rem;
    height: 0.8rem;
    border-radius: 12px;
    background-color: #fff;
}

.search-main i {
    padding: 0 0.27rem;
    color: rgba(0, 0, 0, 0.8);
}

.search-main form {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.search-main form input {
    padding-right: 0.3rem;
    width: 100%;
}

.search-btn {
    font-size: 0.43rem;
} */
</style>