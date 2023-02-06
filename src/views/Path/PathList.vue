<template>
    <div class="path container">
        <Header title="地址管理" back="/my"></Header>
        <section ref="wrapper">
            <ul v-if="addressList.length">
                <li v-for="address in addressList" :key="address.id">
                    <div class="address">
                        <div class="base">
                            <!-- <span class="active" v-if="+address.is_default">[默认]</span> -->
                            <van-tag class="icon" color="#DB4455" v-if="+address.is_default" type="danger">默认</van-tag>
                            <span>{{address.province}}</span>
                            <span>{{address.city}}</span>
                            <span>{{address.county}}</span>
                        </div>
                        <div class="detail">{{address.address_detail}}</div>
                    </div>
                    <div class="person">
                        <span>{{address.name}}</span>
                        <span>{{address.tel}}</span>
                    </div>
                    <van-icon class="edit" name="edit" @click="handleGoDetails('edit', address)"/>
                </li>
            </ul>
            
            <van-empty
                v-else
                description="暂无地址"
            >
                <van-button color="#6091E8" @click="handleGoDetails('add')">
                    添加地址
                </van-button>
            </van-empty>
            <!-- <div class="add-path" @click="handleGoDetails('add')">添加地址</div> -->
        </section>
        <footer>
            <van-button round color="#6091E8" class="add-path" @click="handleGoDetails('add')">
                添加地址
            </van-button>
        </footer>
        <div class="toolbar"></div>
    </div>
</template>

<script>
import BetterScroll from 'better-scroll';
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
        handleGoDetails(type, item) {
            const selected_type = this.$route.params.type === 'select';
            if (selected_type) {
                // bus.$emit('changeAddress', item);
                // this.$router.back();
                console.log("???", item);
                this.$router.replace({
                    name: 'Order',
                    params: {
                        type: "back",
                        addressInfo: JSON.stringify(item)
                    }
                })
                return;
            }

            let info = item 
            ? {
                ...item,
                addressDetail: item.address_detail,
                areaCode: item.area_code,
                isDefault: !!item.is_default,
            } : null;
            this.$router.push({
                name: 'PathDetails',
                params: {
                    type,
                    data: JSON.stringify(info)
                }
            });
        },
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
        this.$nextTick(() => {
        new BetterScroll(this.$refs.wrapper, {
            click: true,
            movable: true,
            zoom: true,
            }) 
        })

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
            position: relative;
            background-color: #fff;
            margin: 0.28rem;
            padding: 0.32rem 0.4rem;
            border-radius: 10px;

            .address {
                // font-size: 0.42rem;

                .base {
                    color: #606373;
                    font-size: 12px;
                    
                    .icon {
                        margin-right: 0.2rem;
                    }

                    span {
                        padding-right: 0.16rem;
                        font-size: 0.36rem;
                    }
                }
                .detail {
                    width: 85%;
                    margin-top: 0.1rem;
                    font-size: 0.42rem;
                }

                
                .active {
                    color: #b0352f;
                }
            }

            .person {
                margin-top: 0.2rem;
                width: 85%;
                font-size: 0.36rem;
                color: #606373;

                span {
                    margin-right: 0.5rem;
                }
            }


            .edit {
                position: absolute;
                top: 50%;
                right: 20px;
                transform: translateY(-50%);
                text-align: center;
                color: #AAB2BD;
            }
            
        }
    }

    
}

footer {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100vw;
    height: 60px;
    // background-color: #b0352f;

    .add-path {
        position: absolute;
        // bottom: 10px;
        width: 90%;
        font-size: 0.42rem;
    }
}
.toolbar {
    width: 100vw;
    height: 60px;
}
</style>