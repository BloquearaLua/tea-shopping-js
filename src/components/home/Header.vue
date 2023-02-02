<template>
    <header>
        <div class="search" @click="handleSearch">
            <span>猜您喜欢的...</span>
            
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
        focusFun() {
            this.$router.push('/search')
        },
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
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100vw;
    height: 1.6rem;
    padding: .3125rem;
    background: linear-gradient(to right bottom, #C6CFC7, #d3d3d3, #C6CFC7);

    .search {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        height: 1rem;
        background-color: #fff;
        border: solid 1px #a8a8a8;
        border-radius: 1.25rem;
        color: #a8a8a8;
        
        span {
            margin-left: .625rem;
            font-size: .37rem;
        }

        .nut-icon-search {
            position: absolute;
            right: .3125rem;
        }
    }
}
</style>