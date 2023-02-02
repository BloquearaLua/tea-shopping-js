<template>
    <header>
        <div class="search-return" @click="handleReturn">
            <i class="iconfont icon-fanhui"></i>
        </div>
        <!-- <div class="search-main">
            <i class="iconfont icon-fangdajing"></i>
            <nut-icon type="search" size="0.5rem" color="#d3d3de"></nut-icon>
            <form action="" onsubmit="return false">
                <input v-model="keyword" type="text" placeholder="搜索您喜欢的产品" @keyup.enter="handleSearch"/>
            </form>
        </div>
        <div class="search-btn" @click="handleSearch">搜索</div> -->
        <nut-searchbar
            v-model="val"
            placeText="ERP/姓名/邮箱"
            :hasIcon="true"
            :hasTextButton="true"
            textInfo="搜索"
            customClass="search_demo"
        ></nut-searchbar>
    </header>
</template>

<script>
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
            this.$router.go(-1);
        },
        handleSearch() {
            if (!this.keyword.trim()) return;
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
header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 1.17rem;
    color: #fff;
    background-color: #b0352f;

    .search_demo {
        width: 6.93rem;
        height: 0.84rem;
        font-size: 0.48rem;
    }

    .search-return,
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
        border-radius: 1rem;
        background-color: #fff;

        i {
            padding: 0 0.27rem;
            color: rgba(0, 0, 0, 0.8);
        }
        
        form {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;

            input {
                border: solid 1px black;
                padding-right: 0.3rem;
                width: 100%;
                line-height: 1rem;

                &::placeholder {
                    font-size: 0.5rem;
                }
            }
        }
    }
    .search-btn {
        font-size: 0.43rem;
    }
}
</style>