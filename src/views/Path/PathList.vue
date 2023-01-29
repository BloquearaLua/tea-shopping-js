<template>
    <div class="path container">
        <Header>
            <span>地址管理</span>
        </Header>
        <section>
            <ul v-if="addressList.length">
                <li v-for="address in addressList" :key="address.id">
                    <div>
                        <span>{{address.name}}</span>
                        <span>{{address.tel}}</span>
                    </div>
                    <div>
                        <span class="active" v-if="+address.isDefault">[默认]</span>
                        <span>{{address.province}}</span>
                        <span>{{address.city}}</span>
                        <span>{{address.county}}</span>
                        <span>{{address.addressDetail}}</span>
                    </div>
                </li>
            </ul>
            <div v-else class="">暂无地址</div>
            <div class="add-path" @click="handleGoDetails">添加地址</div>
        </section>

        
    </div>
</template>

<script>
import request from "@/common/api/request";
import Header from "@/views/Login/Header.vue";
import { mapMutations, mapState } from "vuex";

export default {
    name: 'PathList',
    computed: {
        ...mapState({ addressList: state => state.address.list}),
    }, 
    methods: {
        ...mapMutations(['initAddress']),
        handleGoDetails() {
            this.$router.push('/path/details');
        }
    },
    async created() {
        const data = await request.$axios({
            url: '/api/address',
            methods: 'POST',
            headers: {
                token: true,
            }
        })
        console.log('address:', data);
        this.initAddress(data);

    },
    components: {
        Header
    }
}
</script>

<style scoped lang="scss">

section {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f7f7f7;

    ul{
        width: 100%;
        li {
            background-color: #fff;
            margin: 0.16rem 0;
            padding: 0.27rem 0.4rem;

            span {
                padding-right: 0.16rem;
                font-size: 0.43rem;
            }

            
        }
    }

    .add-path {
        margin-top: 0.33rem;
        width: 3.2rem;
        line-height: 1.07rem;
        font-size: 0.48rem;
        text-align: center;
        color: #fff;
        background-color: #b0352f;
        border-radius: 3px;
    }

    .active {
        color: #b0352f;
    }
}
</style>