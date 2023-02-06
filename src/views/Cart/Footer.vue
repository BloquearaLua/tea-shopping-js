<template>
    <footer>
        <van-submit-bar
            :price="parseInt(total.price)*100"
            :button-text="isEdit ? '删除' : '去结算'"
            @submit="handleSubmit"
            button-color="linear-gradient(to right, #6BB3FB, #86C1FC)"
        >
            <van-checkbox  @click="handleCheckAll" :value="isCheckedAll">全选</van-checkbox>
        </van-submit-bar>
        <div v-if="placeholder" class="toolbar"></div>
    </footer>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
import request from '@/common/api/request';

export default {
    name: 'CartFooter',
    props: ['isEdit', 'placeholder'],
    data() {
        return {
            checked: true
        }
    },
    computed: {
        ...mapState({
            cartList: state => state.cart.cartList,
            checkedList: state => state.cart.checkedList,
        }),
        ...mapGetters(['isCheckedAll', 'total']),
    },
    methods: {
        ...mapMutations(['initOrder']),
        ...mapActions(['handleCheckAll', 'handleDeleteItem']),
        handleSubmit() {
            this.isEdit ? this.handleDeleteItem() : this.handleCount();
        },
        async handleCount() {
            console.log("this.checkedList", this.checkedList);
            if (this.checkedList.length) {
                const data = await request.$axios({
                    url: '/api/order/add',
                    methods: 'POST',
                    headers: {
                        token: true,
                    },
                    data: {
                        goodsGroup: this.cartList.filter(item => this.checkedList.indexOf(item.id) > -1)
                    }
                })
                console.log("order", data);
                if (data[0].order_status === 1) {
                    this.initOrder(data);
                    this.$router.push({
                        name: 'Order',
                        query: {
                            selectedIds: JSON.stringify(this.checkedList)
                        }
                    });
                }
            } else {
                Toast('请至少选择一件商品');
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.van-submit-bar {
    width: 100vw;
    position: fixed;
    bottom: 49px;
    background-color: #fff;
}

.toolbar {
    width: 100vw;
    height: 50px;
}
</style>