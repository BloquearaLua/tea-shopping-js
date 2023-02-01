import { INIT_ORDER } from "./mutation-type";

export default {
    state: {
      list: [],
      orderId: localStorage.getItem('tea_order_id') || '',
    },
    getters: {

    },
    mutations: {
        [INIT_ORDER](state, order) {
            state.list = order;
            state.orderId = order[0].order_id;
            localStorage.setItem('tea_order_id', order[0].order_id);
        }
    },
    actions: {

    }
}