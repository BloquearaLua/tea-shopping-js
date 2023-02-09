import request from "@/common/api/request";
import { Dialog, Toast } from "vant";
import { CART_LIST, CHECK_ALL, CHECK_NONE, CHECK_ONE, INIT_SELECTED_LIST, INIT_CART_COUNT } from "./mutation-type";

export default {
    state: {
        cartList: [],
        checkedList: [],
        cartCount: 0,
    },
    getters: {
        isCheckedAll(state) {
            return state.cartList.length === state.checkedList.length;
        },
        total(state) {
            const total = {
                num: 0,
                price: 0
            }
            state.cartList.map(item => {
                if (item.checked) {
                    const { goods_num, goods_price } = item;
                    total.num += parseInt(goods_num);
                    total.price += goods_num * goods_price; 
                }
            })
            total.price = total.price.toFixed(2);
            return total;
        }
    },
    mutations: {
        [CART_LIST](state, cartArr) {
            state.cartList = cartArr;
            state.checkedList = cartArr.map(item => item.id);
            state.cartCount = cartArr.length;
        },
        [CHECK_ALL](state) {
            console.log("?????????");
            state.checkedList = state.cartList.map(item => {
                item.checked = true;
                return item.id;
            })
        },
        [CHECK_NONE](state) {
            console.log("???");
            state.cartList.map(item => {
                item.checked = false;
            })
            state.checkedList = [];
        },
        [CHECK_ONE](state, checkedId) {
            const includeIndex = state.checkedList.indexOf(checkedId);
            if (includeIndex > -1) {
                state.checkedList.splice(includeIndex, 1);
            } else {
                state.checkedList.push(checkedId);
            }
            // console.log("--------------------------checkedList:---", includeIndex, state.checkedList);
        },
        [INIT_SELECTED_LIST](state, selectedIds) {
            state.checkedList = selectedIds;
        },
        [INIT_CART_COUNT](state, count) {
            state.cartCount = count;
        }
    },
    actions: {
        handleCheckAll({ commit, getters }) {
            getters.isCheckedAll ? commit(CHECK_NONE) : commit(CHECK_ALL);
        },
        handleDeleteItem({ state }, deleteId) {
            const isOne = typeof deleteId === 'number';
            if (!isOne && !state.checkedList.length) {
                Toast({
                    message: '请选择商品',
                    duration: 1000
                });
                return;
            }

            Dialog.confirm({
                title: '提示',
                message: '确认删除商品吗？'
            }).then(async() => {
                let deleteArr = [];
                // 单选删除
                if (isOne) {
                    deleteArr.push(deleteId);
                } else {
                    deleteArr = state.checkedList;
                }
                console.log(typeof deleteId, deleteArr);
                const data = await request.$axios({
                    url: '/api/cart/delete',
                    methods: 'POST',
                    data: {
                        ids: deleteArr,
                    }
                })
                if (!!data) {
                    Toast.success('删除成功');
                    const cartRes = await request.$axios({
                        url: '/api/cart/list',
                        methods: 'POST',
                        headers: {
                            token: true
                        }
                    })
                    state.cartList = cartRes.map(item => ({
                        ...item,
                        ['checked']: true
                    }));
                    state.checkedList = [...cartRes];
                }
            })
        },
        async handleCartCount({ commit }) {
            const data = await request.$axios({
                url: '/api/cart/count',
                methods: 'POST',
                headers: {
                    token: true
                }
            });
            if (!!data) {
                console.log("count", data);
                commit(INIT_CART_COUNT, data.count);
            }
        }
    }
}