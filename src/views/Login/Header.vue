<template>
    <header>
        <van-nav-bar :title="title" left-arrow @click-left="handleBack">
            <template #right>
                <van-icon name="service-o" size="0.5rem"/>
            </template>
        </van-nav-bar>
    </header>
</template>

<script>

export default {
    name: 'Header',
    props: ['title', 'back'],
    created() {
        console.log(this.title);
    },
    methods: {
        handleBack() {
            this.back ? this.$router.push(this.back) : this.$router.back();
        }
    }
}
</script>

<style lang="scss" scoped>
header {
    width: 100%;
}
</style>