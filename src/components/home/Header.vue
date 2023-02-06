<template>
    <header>
        <van-search
            shape="round"
            background="linear-gradient(to right bottom, #6091E8, #77A0E7, #8EAFE7, #A6BEE7)"
            placeholder="请输入搜索关键词"
            @click="handleSearch"
        />
    </header>
</template>

<script>

export default {
    name: 'Header',
    methods: {
        handleSearch() {
            this.$router.push('/search')
        }
    }
}
</script>

<style scoped lang="scss">
header {
    width: 100vw;
}
</style>