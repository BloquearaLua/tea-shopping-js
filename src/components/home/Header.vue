<template>
    <header>
        <div class="search" @click="handleSearch">
            <van-icon name="search" />
            <span>猜您喜欢的...</span>
        </div>
    </header>
</template>

<script>

export default {
    name: 'Header',
    methods: {
        handleSearch() {
            this.$router.push('/search')
        }
    },
    components: {

    }
}
</script>

<style scoped lang="scss">
header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100vw;
    height: 1.6rem;
    // background-color: #b0352f;
    background: linear-gradient(to right bottom, #E8C4BC, #D3D3D3, #E8C4BC);

    .search {
        display: flex;
        align-items: center;
        width: 95%;
        height: 1rem;
        background-color: #fff;
        border-radius: 1.25rem;
        color: #3c3c3c;

        i {
            padding: 0 0.24rem;
        }

        span {
            font-size: 0.48rem;
        }
    }
}
</style>