<template>
    <div class="swiper-main">
        <swiper :options="swiperOptions">
            <swiper-slide v-for="item in swiperList" :key="item.id">
                <img :src="item.imgUrl" alt="">
            </swiper-slide>
        </swiper>
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
export default {
    name: 'Swiper',
    props: ['swiperList'],
    data() {
        return {
            swiperOptions: {
                autoplay: 3000,
                speed: 1000,
                pagination: {
                    el: '.swiper-pagination',
                }
            }
        }
    },
    components: {
        swiper,
        swiperSlide
    }
}
</script>

<style scoped>
.swiper-main {
    position: relative;
}

.swiper-main,
.swiper-container,
.swiper-container img {
    width: 100%;
    height: 4.4rem;
}

.swiper-pagination {
    width: 100%;
    bottom: 0;
}

::v-deep .swiper-pagination-bullet-active {
    background-color: #b0352f;
}

::v-deep .swiper-pagination-bullet {
    margin-right: 0.15rem;
}

::v-deep .ly-tabs__tab-list {
    border: none;
}

</style>