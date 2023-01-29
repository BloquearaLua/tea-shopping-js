import { CART_LIST } from "./mutation-type";
export default {
    state: {
        cartList: [],
    },
    getters: {

    },
    mutations: {
        [CART_LIST](state, cartArr) {
            state.cartList = cartArr;
        }
    },
    actions: {

    }
}