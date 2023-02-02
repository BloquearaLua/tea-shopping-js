<template>
    <div class="recommend">
        <Card></Card>
        <ul>
            <li v-for="item in recommendList" :key="item.id">
                <h2>
                    <img :src="item.imgUrl" alt="">
                </h2>
                <div>
                    <h3>{{ item.name }}</h3>
                    <p>{{ item.content }}</p>
                    <div class="price">
                        <span>￥</span>
                        <b>{{ item.price }}</b>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import Card from '@/components/home/Card.vue';
export default {
    name: 'Recommend',
    props: ['recommendList'],
    data() {
        return {
        }
    },
    components: {
        Card,
    }
}
</script>

<style scoped>
.recommend ul li {
    position: relative;
}

.recommend ul li h2 {
    text-align: center;
}
.recommend ul li > div {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.53rem;
}
.recommend ul li img {
    width: 9.6rem;
    height: 3.84rem;
    border-radius: 12px;
}

.recommend ul li > div h3 {
    font-size: .48rem;
}

.recommend ul li > div p {
    font-size: 0.42rem;
}

.price {
    margin-top: 0.67rem;
    color: #b0352f;
    text-align: right;
}
.price span {
    font-size: 0.37rem;
}

</style>