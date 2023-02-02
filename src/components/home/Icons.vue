<template>
    <ul class="icons">
        <li v-for="icon in iconsList" :key="icon.id">
            <img :src="icon.imgUrl" alt="">
            <span>{{ icon.title }}</span>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'Icons',
    props: ['iconsList'],
    data() {
        return {
        }
    },
}
</script>

<style scoped>
.icons {
    display: flex;
    justify-content: space-around;
    padding: 0.4rem 0;
}

.icons li {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.icons img {
    width: 1.01rem;
    height: 1.01rem;
}

.icons span {
    padding: 0.16rem 0;
    font-size: 0.43rem;
}
</style>