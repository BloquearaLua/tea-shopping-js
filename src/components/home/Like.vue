<template>
    <div class="like">
        <Card><span>猜你喜欢</span></Card>
        <ul>
            <li
                v-for="item in likeList"
                :key="item.id"
                @click="handleGoDetails(item.id)"
                >
                <h2>
                    <img v-lazy="item.imgUrl" alt="">
                </h2>
                <h3>{{ item.name }}</h3>
                <div>
                    <span>￥</span>
                    <b>{{ item.price }}</b>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import Card from './Card.vue';

export default {
    name: 'Like',
    props: ['likeList'],
    data() {
        return {
        }
    },
    methods: {
        handleGoDetails(id) {
            this.$router.push({
                path: '/details',
                query: {
                    id
                }
            })
        }
    },
    components: {
        Card,
    }
}

</script>

<style scoped>
.like ul {
    display: flex;
    flex-wrap: wrap;
}

.like ul li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
}


.like ul li > div {
    width: 93%;
    padding: 0.16rem;
    text-align: left;
}

.like ul li > div span {
    font-size: 0.32rem;
}

.like ul li > div b {
    font-weight: 600;
    font-size: 0.43rem;
    color: #b0352f;
}

.like h3 {
    padding: 0 0.16rem;
    width: 93%;
    font-size: 0.37rem;
    font-weight: 400;
    color: #222;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.like img {
    width: 4.69rem;
    height: 4.69rem;
}

.like img[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
</style>