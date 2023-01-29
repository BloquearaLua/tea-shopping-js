import { USER_LOGIN, INIT_USER, LOGOUT } from "./mutation-type";
export default {
    state: {
        // 登录状态
        loginStatus: false,
        // token
        token: null,
        // 用户信息
        userInfo: {}
    },
    getters: {

    },
    mutations: {
        [USER_LOGIN](state, user) {
            console.log('mutations:', state, user);
            state.loginStatus = true;
            state.token = user.token;
            state.userInfo = user;

            localStorage.setItem('teaUserInfo', JSON.stringify(user));
        },
        [INIT_USER](state) {
            let userInfo = JSON.parse(localStorage.getItem('teaUserInfo'));
            if (userInfo) {
                state.loginStatus = true;
                state.token = userInfo.token;
                state.userInfo = userInfo;
            }
        },
        [LOGOUT](state) {
            state.loginStatus = false;
            state.token = null;
            state.userInfo = {};
            localStorage.removeItem('teaUserInfo');
        }
    },
    actions: {

    }
}