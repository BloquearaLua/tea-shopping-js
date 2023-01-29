import { INIT_ADDRESS } from "./mutation-type";
export default {
    state: {
        list: [],
    },
    getters: {

    },
    mutations: {
        [INIT_ADDRESS](state, addressList) {
            state.list = addressList;
        }
    },
    actions: {

    }
}