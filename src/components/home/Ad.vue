<template>
    <div class="ad">
        <ul>
            <li v-for="ad in adList" :key="ad.id">
                <img :src="ad.imgUrl" alt="">
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Ad',
    props: ['adList'],
}
</script>

<style scoped>
.ad {
    width: 100%;
}

.ad img {
    width: 100%;
    height: 100%;
}
</style>