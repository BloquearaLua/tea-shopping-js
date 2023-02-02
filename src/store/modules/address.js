import { INIT_ADDRESS } from "./mutation-type";
export default {
    state: {
        list: [],
    },
    getters: {
        defaultPath(state) {
            return state.list.filter(item => !!item.is_default);
        }
    },
    mutations: {
        [INIT_ADDRESS](state, addressList) {
            state.list = addressList;
        }
    },
    actions: {

    }
}