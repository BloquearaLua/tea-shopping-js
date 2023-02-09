import axios from 'axios';
import store from "@/store";
import router from "@/router";
import { Toast } from 'vant';

export default {
    common: {
        methods: 'GET',
        data: {},
        params: {},
        headers: {},
    },
    $axios(options={}) {
        options.method = options.methods || this.common.methods;
        options.data = options.data || this.common.data;
        options.params = options.params || this.common.params;
        options.headers = options.headers || this.common.headers;

        // 请求前 loading...
        const loadingToast = Toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration: 0,
          });

        const { token } = options.headers;
        console.log("token", token);
        if (token) {
            console.log("user", store.state.user);
            const { token: localToken } = store.state.user;
            console.log('localToken', localToken);
            if (!localToken) {
                router.push('/login');
            } else {
                options.headers.token = localToken;
            }
        }
        
        return axios(options).then(value => {
            console.log("res", value);
            let data = value.data.data;
            let code = value.data.code;
            return new Promise((res, rej) => {
                // token 过期
                if (code === 1000) {
                    loadingToast.clear();
                    store.commit('logout');
                    router.push('/login');
                }

                if (code !== 0) {
                    loadingToast.clear();
                    Toast({
                        message: value.data.msg || 'Error',
                        duration: 3000,
                    })
                    return;
                }

                if (!value) return rej();
                
                setTimeout(() => {
                    loadingToast.clear();
                }, 500);
                console.log(data);
                res(data);
            })
        })
    }
}