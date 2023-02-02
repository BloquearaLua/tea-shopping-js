<template>
    <header>
        <div>
            <i class="iconfont icon-fanhui" @click="handleBack"></i>
        </div>
        <div>
            <slot>
                <span>登录</span>
            </slot>
        </div>
        <div>
            <i class="iconfont icon-kefu"></i>
        </div>
    </header>
</template>

<script>

export default {
    name: 'Header',
    methods: {
        handleBack() {
            this.$router.back();
        }
    }
}
</script>

<style lang="scss" scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 1.17rem;
    background-color: #b0352f;
    color: #fff;

    span {
        font-size: 0.48rem;
    }

    i {
        padding: 0 0.4rem;
        font-size: 0.59rem;
    }
}
</style>