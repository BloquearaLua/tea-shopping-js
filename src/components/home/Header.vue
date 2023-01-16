<template>
    <header>
        <!-- <h1>
            <img src="@/assets/images/logo.png" alt="logo">
        </h1> -->
        <div class="search" @click="handleSearch">
            <i class="iconfont icon-fangdajing"></i>
            <span>猜您喜欢的...</span>
        </div>
        <div class="kefu">
            <i class="iconfont icon-kefu"></i>
        </div>
    </header>
</template>

<script>

export default {
    name: 'Header',
    data() {
        return {
            
        }
    }, 
    methods: {
        handleSearch() {
            this.$router.push('/search')
        }
    },
    components: {

    }
}
</script>

<style scoped>
header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 1.6rem;
    background-color: #b0352f;
}

header h1 {
    width: 2.27rem;
    height: 1.33rem;
}

header h1 img {
    width: 100%;
    height: 100%;
}

.search {
    display: flex;
    align-items: center;
    width: 6.56rem;
    height: 0.8rem;
    background-color: #fff;
    border-radius: 12px;
    color: #ccc;
}

.search i {
    padding: 0 0.16rem;
}

.search span {
    font-size: 0.37rem;
}

.kefu i {
    font-size: 0.96rem;
    color: #fff;
}
</style>