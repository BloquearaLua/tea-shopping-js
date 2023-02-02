<template>
    <div class="swiper-main">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item
                v-for="item in swiperList"
                :key="item.id"
            >
                <img v-lazy="item.imgUrl" />
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
export default {
    name: 'Swiper',
    props: ['swiperList'],
}
</script>

<style scoped lang="scss">
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    text-align: center;

    img {
        width: 100%;
        height: 4.4rem;
    }
  }
</style>